import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const schema = z.object({
  email: z.string().email('Please enter a valid email').max(160),
  // Honeypot — must stay empty.
  company: z.string().max(0).optional().or(z.literal('')),
})

/* ---- helpers for no-JS form-POST fallback (same pattern as strategy-call) ---- */
function acceptsRedirect(req: NextRequest): boolean {
  const accept = req.headers.get('accept') || ''
  return accept.includes('text/html') && !accept.includes('application/json')
}

export async function POST(req: NextRequest) {
  // Parse body — JSON (JS fetch) or form-encoded (no-JS POST).
  let json: unknown
  const contentType = req.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      json = await req.json()
    } catch {
      if (acceptsRedirect(req)) {
        return NextResponse.redirect(new URL('/insights?status=invalid', req.url))
      }
      return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 })
    }
  } else {
    try {
      const fd = await req.formData()
      json = Object.fromEntries(fd.entries())
    } catch {
      if (acceptsRedirect(req)) {
        return NextResponse.redirect(new URL('/insights?status=invalid', req.url))
      }
      return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 })
    }
  }

  const parsed = schema.safeParse(json)
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    if (acceptsRedirect(req)) {
      return NextResponse.redirect(new URL('/insights?status=invalid', req.url))
    }
    return NextResponse.json({ ok: false, error: 'Validation failed', fieldErrors }, { status: 422 })
  }

  const d = parsed.data

  // Honeypot tripped — pretend success so bots go away.
  if (d.company && d.company.length > 0) {
    return acceptsRedirect(req)
      ? NextResponse.redirect(new URL('/insights?status=success', req.url))
      : NextResponse.json({ ok: true })
  }

  // Check if already subscribed — return a distinct status so the form can
  // show an "already subscribed" message without re-inserting.
  let alreadySubscribed = false
  try {
    const existing = await db.newsletterSubscriber.findUnique({
      where: { email: d.email },
      select: { id: true },
    })
    alreadySubscribed = !!existing
    if (!alreadySubscribed) {
      await db.newsletterSubscriber.create({
        data: { email: d.email },
      })
    }
  } catch (err) {
    // If the error is a unique-constraint violation, the email is already
    // subscribed — treat as already-subscribed, not a failure.
    if (String(err).includes('Unique constraint')) {
      alreadySubscribed = true
    } else {
      console.error('newsletter subscription failed', err)
      if (acceptsRedirect(req)) {
        return NextResponse.redirect(new URL('/insights?status=error', req.url))
      }
      return NextResponse.json(
        { ok: false, error: 'We could not save your subscription. Please try again later.' },
        { status: 500 },
      )
    }
  }

  if (acceptsRedirect(req)) {
    const q = alreadySubscribed ? 'already-subscribed' : 'success'
    return NextResponse.redirect(new URL(`/insights?status=${q}`, req.url))
  }
  return NextResponse.json({ ok: true, alreadySubscribed })
}
