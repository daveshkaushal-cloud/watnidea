'use client'

/* ------------------------------------------------------------------ *
 * InsightsNewsletter — Section 3 of /insights
 *
 * A REAL, functional newsletter form on a sand background.
 *
 *   - POSTs to /api/newsletter with { email, company: '' }.
 *   - `company` is the honeypot field — must remain empty. The API
 *     silently accepts a filled honeypot (returns ok:true) without
 *     writing anything to the database, so bots get a fake 200.
 *   - On success: shows a genuine confirmation panel.
 *   - On validation/network error: shows a genuine error message
 *     (the server's `error` string if present; otherwise an honest
 *     fallback that points to email).
 *   - Never fakes success. No "Join 12,400+ readers". No fake counts.
 *   - Privacy Policy + Terms links beside the submit button.
 *   - Mobile-first, min 44px touch targets, prefers-reduced-motion safe.
 * ------------------------------------------------------------------ */

import { useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Mail, AlertCircle } from 'lucide-react'
import {
  Eyebrow,
  SectionHeading,
  SectionShell,
} from '@/components/home/primitives'
import { Reveal } from '@/components/home/motion'
import { site } from '@/lib/siteContent'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function InsightsNewsletter() {
  const reduce = useReducedMotion() ?? false
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string>('')
  const [fieldError, setFieldError] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  const validateEmail = (value: string): string | null => {
    const trimmed = value.trim()
    if (!trimmed) return 'Please enter your email.'
    if (trimmed.length > 160) return 'Email is too long.'
    if (!EMAIL_RE.test(trimmed)) return 'Please enter a valid email.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot: if filled, silently "succeed" without hitting the API.
    // (Mirrors server-side behaviour — bots see a 200 and move on.)
    if (honeypot) {
      setStatus('success')
      return
    }

    const emailErr = validateEmail(email)
    if (emailErr) {
      setFieldError(emailErr)
      setStatus('error')
      setError(emailErr)
      return
    }

    setFieldError('')
    setStatus('submitting')
    setError('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), company: '' }),
      })

      // Try to parse JSON safely — server should always send JSON,
      // but be defensive about non-JSON responses.
      let data: { ok?: boolean; error?: string } = {}
      try {
        data = await res.json()
      } catch {
        data = {}
      }

      if (res.ok && data.ok) {
        setStatus('success')
        return
      }

      // Genuine failure path. Never fake success.
      const serverMessage =
        typeof data.error === 'string' && data.error.length > 0
          ? data.error
          : 'We could not save your subscription. Please try again later.'
      setError(serverMessage)
      setStatus('error')
    } catch {
      // Network failure — be honest and actionable.
      setError(
        `We could not reach the server. Please try again, or email ${site.email} and we will add you manually.`,
      )
      setStatus('error')
    }
  }

  const handleReset = () => {
    setEmail('')
    setHoneypot('')
    setError('')
    setFieldError('')
    setStatus('idle')
    // Return focus to the email input for keyboard users.
    requestAnimationFrame(() => {
      const input = document.getElementById('insights-newsletter-email')
      if (input instanceof HTMLInputElement) input.focus()
    })
  }

  const inputErrorId = 'insights-newsletter-email-error'
  const inputId = 'insights-newsletter-email'
  const honeypotId = 'insights-newsletter-company'

  return (
    <section
      aria-labelledby="insights-newsletter-heading"
      className="wn-section bg-[var(--wn-sand)]"
    >
      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — heading + supporting copy */}
          <div>
            <Reveal>
              <Eyebrow>Newsletter</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading
                id="insights-newsletter-heading"
                className="mt-4"
              >
                Be the first to read new essays.
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-[var(--wn-muted)] sm:text-lg">
                No spam — just our writing, when it&rsquo;s ready. We
                send a short note when a new essay lands, and the
                occasional studio update. Unsubscribe in one click.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 text-sm leading-relaxed text-[var(--wn-muted)]">
                We&rsquo;re a small studio and we treat your inbox like
                it&rsquo;s our own. No rented lists, no upsells, no
                tracking pixels.
              </p>
            </Reveal>
          </div>

          {/* RIGHT — the form / success / error panel */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-[var(--wn-border-subtle)] bg-[var(--wn-surface)] p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                    transition={{ duration: reduce ? 0.001 : 0.4 }}
                    role="status"
                    aria-live="polite"
                    className="flex flex-col items-start gap-5"
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--wn-red)]/10 text-[var(--wn-red)]"
                      aria-hidden="true"
                    >
                      <Check className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-editorial text-2xl font-medium leading-snug text-[var(--wn-body)]">
                        You&rsquo;re on the list.
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--wn-muted)]">
                        We&rsquo;ll be in touch when the first essay
                        lands. Until then, no noise.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[var(--wn-border-strong)] px-5 py-2.5 text-sm font-medium text-[var(--wn-body)] transition-colors hover:bg-[var(--wn-surface-2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wn-red)]"
                    >
                      Subscribe another email
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0.001 : 0.3 }}
                    className="flex flex-col gap-5"
                  >
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={inputId}
                        className="wn-eyebrow !text-[0.65rem] text-[var(--wn-muted)]"
                      >
                        Email
                      </label>
                      <input
                        id={inputId}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (fieldError) setFieldError('')
                          if (status === 'error') setStatus('idle')
                        }}
                        placeholder="you@studio.com"
                        aria-invalid={!!fieldError}
                        aria-describedby={
                          fieldError ? inputErrorId : undefined
                        }
                        className="min-h-[44px] w-full rounded-lg border bg-[var(--wn-warm-white)] px-4 py-3 text-sm text-[var(--wn-body)] placeholder:text-[var(--wn-muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--wn-red)]/30"
                        style={{
                          borderColor: fieldError
                            ? 'var(--wn-red)'
                            : 'var(--wn-border-strong)',
                        }}
                      />
                      {fieldError && (
                        <p
                          id={inputErrorId}
                          role="alert"
                          className="text-xs leading-relaxed text-[var(--wn-red)]"
                        >
                          {fieldError}
                        </p>
                      )}
                    </div>

                    {/* Honeypot — visually hidden, but present in the DOM.
                        Real users never see or fill this. */}
                    <div
                      aria-hidden="true"
                      className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
                    >
                      <label htmlFor={honeypotId}>Company</label>
                      <input
                        id={honeypotId}
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {/* Submit + legal row */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-xs text-xs leading-relaxed text-[var(--wn-muted)]">
                        By subscribing you agree to our{' '}
                        <Link
                          href="/privacy-policy"
                          className="font-medium text-[var(--wn-body)] underline-offset-2 hover:underline"
                        >
                          Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link
                          href="/terms"
                          className="font-medium text-[var(--wn-body)] underline-offset-2 hover:underline"
                        >
                          Terms
                        </Link>
                        .
                      </p>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        aria-busy={status === 'submitting'}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[var(--wn-red)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--wn-red-deep)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wn-red)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {status === 'submitting' ? (
                          <>
                            <span
                              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                              aria-hidden="true"
                            />
                            Subscribing…
                          </>
                        ) : (
                          <>
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            Subscribe
                          </>
                        )}
                      </button>
                    </div>

                    {/* Genuine error banner (non-validation errors only) */}
                    {status === 'error' && !fieldError && (
                      <div
                        role="alert"
                        aria-live="assertive"
                        className="flex items-start gap-3 rounded-lg border border-[var(--wn-red)]/40 bg-[var(--wn-red)]/[0.06] p-4"
                      >
                        <AlertCircle
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--wn-red)]"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-relaxed text-[var(--wn-body)]">
                          {error}
                        </p>
                      </div>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </section>
  )
}
