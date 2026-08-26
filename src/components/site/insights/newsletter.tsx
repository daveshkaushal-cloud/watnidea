'use client'

/* ------------------------------------------------------------------ *
 * InsightsNewsletter — Section 4 of /insights
 *
 * A REAL, functional newsletter signup form on a mint surface.
 *
 *   - POSTs to /api/newsletter with { email, company: '' }.
 *   - `company` is the honeypot field — must remain empty. The API
 *     silently accepts a filled honeypot (returns ok:true) without
 *     writing anything to the database, so bots get a fake 200.
 *   - On success: shows the genuine confirmation panel.
 *   - On validation/network error: shows a genuine error message
 *     (the server's `error` string if present; otherwise an honest
 *     fallback that points to email).
 *   - Never fakes success. No "Join 12,400+ readers". No fake counts.
 *   - Privacy Policy + Terms links beside the submit button (real <Link>).
 *   - Mobile-first, min 44px touch targets, prefers-reduced-motion safe.
 * ------------------------------------------------------------------ */

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotionSSR } from '@/components/site/use-reduced-motion-ssr'
import { Check, Mail, AlertCircle } from 'lucide-react'
import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Sticker,
  FormField,
} from '@/components/site/primitives'
import { site } from '@/lib/siteContent'

type Status = 'idle' | 'submitting' | 'success' | 'already' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function InsightsNewsletter() {
  const reduce = useReducedMotionSSR()
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string>('')
  const [fieldError, setFieldError] = useState<string>('')

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
        // Server returns `alreadySubscribed: true` when the email is already
        // on the list — show a distinct, honest message instead of "success".
        const already = (data as { alreadySubscribed?: boolean }).alreadySubscribed
        setStatus(already ? 'already' : 'success')
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
    <Section surface="mint" ariaLabelledBy="insights-newsletter-heading">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — heading + supporting copy + sticker */}
          <div>
            <SectionLabel number="03" accent="#157468">
              Newsletter
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="insights-newsletter-heading" className="mt-5 max-w-[18ch]">
                Be the first to read new essays.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[#101010] opacity-85 sm:text-lg">
                No spam — just our writing, when it&rsquo;s ready. We send
                a short note when a new essay lands, and the occasional
                studio update. Unsubscribe in one click.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#101010] opacity-70">
                We&rsquo;re a small studio and we treat your inbox like
                it&rsquo;s our own. No rented lists, no upsells, no
                tracking pixels.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-7">
                <Sticker accent="#101010" textColor="#66DFC0" tilt="left">
                  No spam · one-click unsubscribe
                </Sticker>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — the form / success / error panel */}
          <Reveal delay={0.2}>
            <div className="rounded-[22px] border border-[rgba(16,16,16,0.18)] bg-[#FFFDF8] p-6 shadow-[0_8px_24px_-14px_rgba(16,16,16,0.18)] sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' || status === 'already' ? (
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                    transition={{ duration: reduce ? 0.001 : 0.4 }}
                    role="status"
                    aria-live="polite"
                    className="flex flex-col items-start gap-5"
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(241,61,50,0.10)] text-[#F13D32]"
                      aria-hidden="true"
                    >
                      <Check className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-editorial text-2xl font-semibold leading-snug text-[#101010]">
                        {status === 'already'
                          ? 'You\u2019re already on the list.'
                          : 'You\u2019re on the list.'}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#5D5A54]">
                        {status === 'already'
                          ? 'This email is already subscribed — nothing more to do. We\u2019ll be in touch when the first essay lands.'
                          : 'We\u2019ll be in touch when the first essay lands.'}
                        Until then, no noise.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[rgba(16,16,16,0.22)] px-5 py-2.5 text-sm font-medium text-[#101010] transition-colors hover:bg-[rgba(16,16,16,0.05)] focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ outlineColor: '#F13D32' }}
                    >
                      Subscribe another email
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    method="post"
                    action="/api/newsletter"
                    encType="application/x-www-form-urlencoded"
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0.001 : 0.3 }}
                    className="flex flex-col gap-5"
                  >
                    {/* Email */}
                    <FormField id={inputId} label="Email" required error={fieldError}>
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
                        aria-describedby={fieldError ? inputErrorId : undefined}
                        className="min-h-[44px] w-full rounded-lg border bg-[#F7F2E8] px-4 py-3 text-sm text-[#101010] placeholder:text-[#5D5A54] transition-colors focus:outline-none focus:ring-2 focus:ring-[rgba(241,61,50,0.30)]"
                        style={{
                          borderColor: fieldError
                            ? '#F13D32'
                            : 'rgba(16,16,16,0.22)',
                        }}
                      />
                    </FormField>

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
                      <p className="max-w-xs text-xs leading-relaxed text-[#5D5A54]">
                        By subscribing you agree to our{' '}
                        <Link
                          href="/privacy-policy"
                          className="font-medium text-[#101010] underline-offset-2 hover:underline"
                        >
                          Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link
                          href="/terms"
                          className="font-medium text-[#101010] underline-offset-2 hover:underline"
                        >
                          Terms
                        </Link>
                        .
                      </p>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        aria-busy={status === 'submitting'}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F13D32] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d9342a] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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
                        className="flex items-start gap-3 rounded-lg border border-[rgba(241,61,50,0.40)] bg-[rgba(241,61,50,0.06)] p-4"
                      >
                        <AlertCircle
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#F13D32]"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-relaxed text-[#101010]">
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
      </Container>
    </Section>
  )
}
