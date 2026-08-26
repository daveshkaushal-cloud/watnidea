'use client'

/**
 * BookYourCall — Section 4 of /book-strategy-call
 *
 * Functional, accessible, conversion-focused strategy call request form.
 * POSTs to /api/strategy-call and reflects the real API outcome
 * (success / validation error / network error). Never fakes success.
 *
 * Form fields mirror the API schema exactly:
 *   - name, email, business, projectType, message  (required)
 *   - website, phone, budget, preferredTime        (optional)
 *   - company                                       (honeypot, must be empty)
 *
 * Implementation:
 *   - react-hook-form + zod schema mirroring the server.
 *   - Every input has id + label[for] + native name attribute.
 *   - Inline errors with role="alert" + aria-describedby linkage.
 *   - States: idle → submitting → success | error.
 *   - "Other" project type reveals a small conditional text input.
 *
 * Visual: sits on the page's dark charcoal background. Card uses
 * white/[0.03] glassmorphism. Brand red (#E53935 / var(--wn-red))
 * is used for required asterisks, focus rings, and the primary CTA.
 */

import { useState } from 'react'
import Link from 'next/link'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { site } from '@/lib/siteContent'

/* ---- options ---------------------------------------------------------- */

const PROJECT_TYPES = [
  'Brand identity',
  'Website',
  'Content & social',
  'Film & motion',
  'Performance & growth',
  'AI creative',
  'Search & content',
  'Full growth system',
  'Not sure yet',
  'Other',
] as const

const BUDGET_RANGES = [
  'Under ₹2L',
  '₹2L–5L',
  '₹5L–10L',
  '₹10L+',
  'Prefer to discuss',
] as const

const PREFERRED_TIMES = [
  'This week',
  'Next 2 weeks',
  'This month',
  'Just exploring',
] as const

/* ---- schema (mirrors /api/strategy-call) ----------------------------- */

const schema = z.object({
  name: z.string().min(2, 'Please enter your name').max(120),
  email: z.string().email('Please enter a valid email').max(160),
  business: z.string().min(2, 'Please enter your brand or business name').max(160),
  projectType: z.string().min(2, 'Please select a project type').max(120),
  // Client-only convenience field — NOT sent to the API as a separate key.
  // If "Other" is selected, we compose `Other: <text>` into projectType.
  otherProjectType: z.string().max(120).optional().or(z.literal('')),
  message: z.string().min(10, 'Please tell us a little about your goals').max(2000),
  website: z.string().max(200).optional().or(z.literal('')),
  phone: z.string().max(40).optional().or(z.literal('')),
  budget: z.string().max(80).optional().or(z.literal('')),
  preferredTime: z.string().max(120).optional().or(z.literal('')),
  // Honeypot — must stay empty.
  company: z.string().max(0).optional().or(z.literal('')),
})

type FormValues = z.infer<typeof schema>

type Status = 'idle' | 'submitting' | 'success' | 'error'

/* ---- shared class names ---------------------------------------------- */

const inputCls =
  'w-full bg-white/[0.04] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-[var(--wn-red)] focus:outline-none focus:ring-2 focus:ring-[var(--wn-red)]/30 transition-colors min-h-[44px]'
const labelCls = 'text-sm text-white/70 mb-1.5 block'
const errCls = 'mt-1.5 text-xs text-[var(--wn-red)]'

/* ---- component -------------------------------------------------------- */

export function BookYourCall() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      business: '',
      projectType: '',
      otherProjectType: '',
      message: '',
      website: '',
      phone: '',
      budget: '',
      preferredTime: '',
      company: '',
    },
  })

  const projectType = useWatch({ control, name: 'projectType' })

  const onSubmit = async (values: FormValues) => {
    setStatus('submitting')
    setErrorMessage('')

    // Compose final projectType — if "Other", embed the user's text.
    let finalProjectType = values.projectType
    if (
      values.projectType === 'Other' &&
      values.otherProjectType &&
      values.otherProjectType.trim().length > 0
    ) {
      const composed = `Other: ${values.otherProjectType.trim()}`
      // Hard-cap to API max (120 chars) — never exceed server constraint.
      finalProjectType = composed.slice(0, 120)
    }

    const payload = {
      name: values.name,
      email: values.email,
      business: values.business,
      projectType: finalProjectType,
      message: values.message,
      website: values.website || '',
      phone: values.phone || '',
      budget: values.budget || '',
      preferredTime: values.preferredTime || '',
      // Honeypot — included in payload, must be empty for a real submission.
      company: values.company || '',
    }

    try {
      const res = await fetch('/api/strategy-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      // Parse JSON safely — server always returns JSON, but guard anyway.
      let data: { ok?: boolean; error?: string; fieldErrors?: unknown } = {}
      try {
        data = await res.json()
      } catch {
        data = {}
      }

      if (res.ok && data.ok) {
        setStatus('success')
        reset()
        return
      }

      // Non-ok response — NEVER fake success. Surface server's message.
      setStatus('error')
      setErrorMessage(
        (data && typeof data.error === 'string' && data.error) ||
          'Something went wrong. Please try again or email us.'
      )
    } catch {
      // Network failure — actionable fallback pointing to direct email.
      setStatus('error')
      setErrorMessage(
        `We couldn't reach the server. Please check your connection and try again, or email us directly at ${site.email}.`
      )
    }
  }

  return (
    <section
      id="book-your-call"
      aria-labelledby="book-your-call-heading"
      className="relative z-40 mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 md:py-28"
    >
      {/* Heading block */}
      <div className="mb-10 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--wn-red)] mb-4">
          04 · Book Your Call
        </p>
        <h2
          id="book-your-call-heading"
          className="font-editorial text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1]"
        >
          Tell us about your project.
        </h2>
        <p className="mt-4 text-white/60 text-base md:text-lg leading-relaxed">
          A few details and we&apos;ll have a working session on the calendar
          within 1–2 business days. Required fields are marked with{' '}
          <span className="text-[var(--wn-red)]" aria-hidden="true">
            *
          </span>
          .
        </p>
      </div>

      {/* Card */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
        {status === 'success' ? (
          /* ------------------------------------------------------ success */
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-start gap-6"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--wn-red)] text-white"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M4 10l4 4 8-8" />
                </svg>
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white">
                We&apos;ll be in touch.
              </h3>
            </div>

            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Thanks — we&apos;ve received your request. We&apos;ll reply within
              1–2 business days with a short note and a few times to choose from.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center rounded-full bg-[var(--wn-red)] hover:bg-[var(--wn-red-deep)] text-white px-8 py-3.5 font-medium transition-colors min-h-[44px]"
              >
                Email {site.email}
              </a>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="inline-flex items-center justify-center rounded-full border border-white/20 hover:border-white/40 text-white px-8 py-3.5 font-medium transition-colors min-h-[44px]"
              >
                Submit another request
              </button>
            </div>
          </div>
        ) : (
          /* --------------------------------------------------------- form */
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Honeypot — visually hidden, must stay empty for real users. */}
            <div aria-hidden="true" className="sr-only">
              <label htmlFor="company">Company (leave blank)</label>
              <input
                id="company"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                {...register('company')}
              />
            </div>

            {/* Error banner */}
            {status === 'error' && (
              <div
                role="alert"
                className="mb-6 rounded-lg border border-[var(--wn-red)]/50 bg-[var(--wn-red)]/10 px-4 py-3 text-sm text-white"
              >
                {errorMessage}
              </div>
            )}

            {/* Short fields — two-column on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className={labelCls}>
                  Name{' '}
                  <span className="text-[var(--wn-red)]" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputCls}
                  {...register('name')}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className={errCls}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelCls}>
                  Email{' '}
                  <span className="text-[var(--wn-red)]" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@brand.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputCls}
                  {...register('email')}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className={errCls}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Business */}
              <div>
                <label htmlFor="business" className={labelCls}>
                  Business or brand name{' '}
                  <span className="text-[var(--wn-red)]" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="business"
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Studio"
                  aria-invalid={!!errors.business}
                  aria-describedby={
                    errors.business ? 'business-error' : undefined
                  }
                  className={inputCls}
                  {...register('business')}
                />
                {errors.business && (
                  <p id="business-error" role="alert" className={errCls}>
                    {errors.business.message}
                  </p>
                )}
              </div>

              {/* Website (optional) */}
              <div>
                <label htmlFor="website" className={labelCls}>
                  Website{' '}
                  <span className="text-white/40 text-xs">(optional)</span>
                </label>
                <input
                  id="website"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="https://your-site.com"
                  className={inputCls}
                  {...register('website')}
                />
              </div>

              {/* Project type */}
              <div>
                <label htmlFor="projectType" className={labelCls}>
                  Project type{' '}
                  <span className="text-[var(--wn-red)]" aria-hidden="true">
                    *
                  </span>
                </label>
                <select
                  id="projectType"
                  aria-invalid={!!errors.projectType}
                  aria-describedby={
                    errors.projectType ? 'projectType-error' : undefined
                  }
                  className={inputCls}
                  defaultValue=""
                  {...register('projectType')}
                >
                  <option value="" disabled>
                    Select a project type…
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p id="projectType-error" role="alert" className={errCls}>
                    {errors.projectType.message}
                  </p>
                )}
              </div>

              {/* Phone (optional) */}
              <div>
                <label htmlFor="phone" className={labelCls}>
                  Phone{' '}
                  <span className="text-white/40 text-xs">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+91 90000 00000"
                  className={inputCls}
                  {...register('phone')}
                />
              </div>

              {/* Other project type — conditional */}
              {projectType === 'Other' && (
                <div className="md:col-span-2">
                  <label htmlFor="otherProjectType" className={labelCls}>
                    What kind of project?{' '}
                    <span className="text-[var(--wn-red)]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="otherProjectType"
                    type="text"
                    placeholder="Briefly describe your project type"
                    className={inputCls}
                    {...register('otherProjectType')}
                  />
                  <p className="mt-1.5 text-xs text-white/40">
                    We&apos;ll include this in your request.
                  </p>
                </div>
              )}

              {/* Budget range (optional) */}
              <div>
                <label htmlFor="budget" className={labelCls}>
                  Budget range{' '}
                  <span className="text-white/40 text-xs">(optional)</span>
                </label>
                <select
                  id="budget"
                  className={inputCls}
                  defaultValue=""
                  {...register('budget')}
                >
                  <option value="">Select a range…</option>
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred time (optional) */}
              <div>
                <label htmlFor="preferredTime" className={labelCls}>
                  Preferred time{' '}
                  <span className="text-white/40 text-xs">(optional)</span>
                </label>
                <select
                  id="preferredTime"
                  className={inputCls}
                  defaultValue=""
                  {...register('preferredTime')}
                >
                  <option value="">When should we start?</option>
                  {PREFERRED_TIMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message — full width */}
            <div className="mt-5">
              <label htmlFor="message" className={labelCls}>
                Goals / message{' '}
                <span className="text-[var(--wn-red)]" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="What are you trying to achieve? Any context that would help us prepare for the call."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${inputCls} resize-y min-h-[140px]`}
                {...register('message')}
              />
              {errors.message && (
                <p id="message-error" role="alert" className={errCls}>
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit row — full width */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === 'submitting'}
                aria-busy={status === 'submitting'}
                className="inline-flex items-center justify-center bg-[var(--wn-red)] hover:bg-[var(--wn-red-deep)] text-white rounded-full px-8 py-3.5 font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-colors min-h-[44px]"
              >
                {status === 'submitting' ? 'Sending…' : 'Send request'}
              </button>
              <p className="text-xs text-white/50 max-w-md leading-relaxed">
                By submitting you agree to our{' '}
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-2 hover:text-white/80 transition-colors"
                >
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  href="/terms"
                  className="underline underline-offset-2 hover:text-white/80 transition-colors"
                >
                  Terms
                </Link>
                .
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
