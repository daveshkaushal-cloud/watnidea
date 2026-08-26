import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { site } from '@/lib/siteContent'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name').max(120),
  email: z.string().email('Please enter a valid email').max(160),
  business: z.string().min(2, 'Please enter your brand or business name').max(160),
  projectType: z.string().min(2, 'Please select a project type').max(120),
  message: z.string().min(10, 'Please tell us a little about your goals').max(2000),
  website: z.string().max(200).optional().or(z.literal('')),
  phone: z.string().max(40).optional().or(z.literal('')),
  budget: z.string().max(80).optional().or(z.literal('')),
  preferredTime: z.string().max(120).optional().or(z.literal('')),
  // Honeypot field — must stay empty. Bots fill hidden fields.
  company: z.string().max(0).optional().or(z.literal('')),
})

/* ------------------------------------------------------------------ *
 * Simple in-memory rate limiter (per-IP).
 * 5 submissions per 10 minutes per IP. Enough for real visitors,
 * blocks brute-force spam. Resets on server restart (acceptable for
 * a low-traffic agency site; for higher volume use Upstash/Redis).
 * ------------------------------------------------------------------ */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const RATE_LIMIT_MAX = 5
const rateMap = new Map<string, { count: number; firstAt: number }>()

function rateLimit(ip: string): { ok: boolean; retryAfterSec: number } {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now - entry.firstAt > RATE_LIMIT_WINDOW_MS) {
    rateMap.set(ip, { count: 1, firstAt: now })
    return { ok: true, retryAfterSec: 0 }
  }
  entry.count += 1
  if (entry.count > RATE_LIMIT_MAX) {
    const retryAfterSec = Math.ceil((entry.firstAt + RATE_LIMIT_WINDOW_MS - now) / 1000)
    return { ok: false, retryAfterSec }
  }
  return { ok: true, retryAfterSec: 0 }
}

function getClientIP(req: NextRequest): string {
  const xf = req.headers.get('x-forwarded-for')
  if (xf) return xf.split(',')[0]!.trim()
  const xr = req.headers.get('x-real-ip')
  if (xr) return xr.trim()
  return 'unknown'
}

export async function POST(req: NextRequest) {
  // Rate limit check
  const ip = getClientIP(req)
  const rl = rateLimit(ip)
  if (!rl.ok) {
    if (acceptsRedirect(req)) {
      return NextResponse.redirect(new URL('/book-strategy-call?status=rate-limited', req.url))
    }
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    )
  }

  // Parse body — supports both JSON (JS fetch) and form-encoded (no-JS POST).
  let json: unknown
  const contentType = req.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      json = await req.json()
    } catch {
      return badRequest(req, 'Invalid request')
    }
  } else {
    // form-encoded (no-JS fallback) — Next.js parses FormData
    try {
      const fd = await req.formData()
      json = Object.fromEntries(fd.entries())
    } catch {
      return badRequest(req, 'Invalid request')
    }
  }

  const parsed = schema.safeParse(json)
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    if (acceptsRedirect(req)) {
      return NextResponse.redirect(new URL('/book-strategy-call?status=invalid', req.url))
    }
    return NextResponse.json({ ok: false, error: 'Validation failed', fieldErrors }, { status: 422 })
  }

  const d = parsed.data

  // Honeypot tripped — pretend success so bots go away, but do nothing.
  if (d.company && d.company.length > 0) {
    return acceptsRedirect(req)
      ? NextResponse.redirect(new URL('/book-strategy-call?status=success', req.url))
      : NextResponse.json({ ok: true })
  }

  try {
    await db.strategyCallSubmission.create({
      data: {
        name: d.name,
        email: d.email,
        business: d.business,
        projectType: d.projectType,
        message: d.message,
        website: d.website || null,
        phone: d.phone || null,
        budget: d.budget || null,
        preferredTime: d.preferredTime || null,
      },
    })
  } catch (err) {
    // Persistence failed — never fake a success message.
    console.error('strategy-call submission failed', err)
    if (acceptsRedirect(req)) {
      return NextResponse.redirect(new URL('/book-strategy-call?status=error', req.url))
    }
    return NextResponse.json(
      { ok: false, error: 'We could not save your request. Please email us directly at ' + site.email },
      { status: 500 },
    )
  }

  // Optional email notification — only if configured.
  // If no provider is configured, the submission is still stored safely.
  const notifyEmail = process.env.STRATEGY_CALL_NOTIFY_EMAIL
  if (notifyEmail && process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: process.env.RESEND_FROM || 'watNidea <onboarding@resend.dev>',
        to: notifyEmail,
        subject: `New strategy call request — ${d.business}`,
        replyTo: d.email,
        text: [
          `Name: ${d.name}`,
          `Email: ${d.email}`,
          `Business: ${d.business}`,
          `Project type: ${d.projectType}`,
          `Website: ${d.website || '—'}`,
          `Phone: ${d.phone || '—'}`,
          `Budget: ${d.budget || '—'}`,
          `Preferred time: ${d.preferredTime || '—'}`,
          '',
          'Message:',
          d.message,
        ].join('\n'),
      })
    } catch (err) {
      // Email delivery failure must NOT mask a successful DB save.
      console.error('strategy-call notification email failed', err)
    }
  }

  // No-JS fallback: redirect back with success status.
  if (acceptsRedirect(req)) {
    return NextResponse.redirect(new URL('/book-strategy-call?status=success', req.url))
  }
  return NextResponse.json({ ok: true })
}

/* ------------------------------------------------------------------ *
 * Helpers for the no-JS form-POST fallback.
 * When JS is disabled, the browser POSTs the form natively (HTML form
 * submission). In that case we respond with a redirect back to the
 * booking page with a ?status= query param so the page can show the
 * right message. When JS is enabled (fetch), we return JSON.
 * ------------------------------------------------------------------ */
function acceptsRedirect(req: NextRequest): boolean {
  // fetch requests send `application/json` in Accept; native form POSTs
  // send `text/html`. Use that to distinguish.
  const accept = req.headers.get('accept') || ''
  return accept.includes('text/html') && !accept.includes('application/json')
}

function badRequest(req: NextRequest, msg: string) {
  if (acceptsRedirect(req)) {
    return NextResponse.redirect(new URL('/book-strategy-call?status=invalid', req.url))
  }
  return NextResponse.json({ ok: false, error: msg }, { status: 400 })
}
