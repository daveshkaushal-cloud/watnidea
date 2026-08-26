'use client'

/**
 * StrategyForm — the centrepiece of the booking page.
 *
 * Friendly creative brief on a white surface — NOT a corporate application.
 * Conversational labels per the redesign brief, full react-hook-form + zod
 * logic adapted from the original book/section-4-book-your-call.tsx.
 *
 * POSTs to /api/strategy-call and reflects the REAL API outcome
 * (success / validation error / network error). Never fakes success.
 *
 * Schema mirrors /api/strategy-call exactly:
 *   - name, email, business, projectType, message   (required)
 *   - website, phone, budget, preferredTime         (optional)
 *   - company                                        (honeypot, must be empty)
 *
 * Accessibility:
 *   - Every input has id + label[htmlFor] via FormField.
 *   - Inline errors role="alert" + aria-describedby linkage.
 *   - All interactive elements min-h-[44px].
 *   - Status states announced via aria-live regions.
 */

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Check, RefreshCw, ArrowUpRight } from 'lucide-react'
import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  FormField,
  Sticker,
} from '@/components/site/primitives'
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
  'w-full rounded-[12px] border border-[rgba(16,16,16,0.18)] bg-[#FFFDF8] px-4 py-3 text-[#101010] placeholder:text-[#5D5A54]/50 focus:border-[#F13D32] focus:outline-none focus:ring-2 focus:ring-[#F13D32]/25 transition-colors min-h-[44px]'

/* ---- component -------------------------------------------------------- */

export function StrategyForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
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
      message: '',
      website: '',
      phone: '',
      budget: '',
      preferredTime: '',
      company: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    setStatus('submitting')
    setErrorMessage('')

    const payload = {
      name: values.name,
      email: values.email,
      business: values.business,
      projectType: values.projectType,
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
      // Special-case 429 rate limit with a clearer message.
      setStatus('error')
      if (res.status === 429) {
        setErrorMessage(
          "You've sent a few requests quickly. Please wait a few minutes and try again, or email us directly.",
        )
      } else {
        setErrorMessage(
          (data && typeof data.error === 'string' && data.error) ||
            'Something went wrong. Please try again or email us.',
        )
      }
    } catch {
      // Network failure — actionable fallback pointing to direct email.
      setStatus('error')
      setErrorMessage(
        `We couldn't reach the server. Please check your connection and try again, or email us directly at ${site.email}.`,
      )
    }
  }

  const retry = () => {
    setStatus('idle')
    setErrorMessage('')
  }

  return (
    <Section surface="white" id="book-your-call" ariaLabelledBy="strategy-form-heading">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Heading block */}
          <div className="mb-10">
            <SectionLabel number="02" accent="#F13D32">
              The brief
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="strategy-form-heading" className="mt-5 max-w-[20ch]">
                A few honest details. That’s all we need to start.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5D5A54]">
                Think of this as a short creative brief, not an application.
                Tell us what you’re building, what you want to change, and we’ll
                take it from there. Required fields are marked with{' '}
                <span className="text-[#F13D32]" aria-hidden="true">*</span>.
              </p>
            </Reveal>
          </div>

          {/* Card */}
          <div className="relative rounded-[24px] border border-[rgba(16,16,16,0.12)] bg-[#FFFDF8] p-6 shadow-[0_8px_24px_-14px_rgba(16,16,16,0.18)] sm:p-10">
            <Reveal>
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="wn-caption text-[#5D5A54]">
                  Takes ~3 minutes
                </p>
                <Sticker accent="#101010" textColor="#FFC83D" tilt="right">
                  Real humans reply
                </Sticker>
              </div>
            </Reveal>

            {status === 'success' ? (
              /* ----------------------------------------------------- success */
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-start gap-6 py-6"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F13D32] text-white"
                  >
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="font-editorial text-2xl font-semibold text-[#101010] sm:text-3xl">
                    We’ll be in touch.
                  </h3>
                </div>

                <p className="max-w-xl text-base leading-relaxed text-[#101010] opacity-85 sm:text-lg">
                  Thanks — we’ve received your request. We’ll reply within
                  1–2 business days with a short note and a few times to choose
                  from.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F13D32] px-6 py-3 text-sm font-semibold text-white shadow-[0_3px_0_rgba(16,16,16,0.20)] transition-transform hover:-translate-y-0.5"
                  >
                    <Mail className="h-4 w-4" />
                    {site.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[rgba(16,16,16,0.22)] bg-transparent px-6 py-3 text-sm font-semibold text-[#101010] transition-colors hover:bg-[rgba(16,16,16,0.05)]"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              /* -------------------------------------------------------- form
               * Production-ready: method="post" + action="/api/strategy-call"
               * as a no-JavaScript fallback. When JS is enabled, react-hook-form
               * intercepts onSubmit via fetch (e.target.reset prevented). When
               * JS is disabled, the browser POSTs the form natively to the API
               * route, which accepts both JSON and form-encoded bodies and
               * redirects back with a status. Lead data never appears in the URL.
               */
              <form
                onSubmit={handleSubmit(onSubmit)}
                method="post"
                action="/api/strategy-call"
                encType="application/x-www-form-urlencoded"
                noValidate
              >
                {/* Honeypot — visually hidden, must stay empty for real users. */}
                <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
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
                    aria-live="assertive"
                    className="mb-6 rounded-[12px] border border-[#F13D32]/40 bg-[#F13D32]/8 px-4 py-3 text-sm text-[#101010]"
                  >
                    <p>{errorMessage}</p>
                    <button
                      type="button"
                      onClick={retry}
                      className="mt-2 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[rgba(16,16,16,0.22)] bg-white px-5 py-2.5 text-sm font-semibold text-[#101010] transition-colors hover:bg-[rgba(16,16,16,0.05)]"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Try again
                    </button>
                  </div>
                )}

                {/* Short fields — two-column on md+ */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Name */}
                  <FormField
                    id="name"
                    label="What should we call you?"
                    required
                    error={errors.name?.message}
                  >
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={inputCls}
                      {...register('name')}
                    />
                  </FormField>

                  {/* Email */}
                  <FormField
                    id="email"
                    label="Where can we reach you?"
                    required
                    error={errors.email?.message}
                  >
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@brand.com"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={inputCls}
                      {...register('email')}
                    />
                  </FormField>

                  {/* Business */}
                  <FormField
                    id="business"
                    label="What are you building?"
                    required
                    error={errors.business?.message}
                  >
                    <input
                      id="business"
                      type="text"
                      autoComplete="organization"
                      placeholder="Brand or business name"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.business}
                      aria-describedby={errors.business ? 'business-error' : undefined}
                      className={inputCls}
                      {...register('business')}
                    />
                  </FormField>

                  {/* Project type */}
                  <FormField
                    id="projectType"
                    label="Which part needs help?"
                    required
                    error={errors.projectType?.message}
                  >
                    <select
                      id="projectType"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.projectType}
                      aria-describedby={errors.projectType ? 'projectType-error' : undefined}
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
                  </FormField>

                  {/* Website (optional) */}
                  <FormField id="website" label="Website" optional>
                    <input
                      id="website"
                      type="url"
                      inputMode="url"
                      autoComplete="url"
                      placeholder="https://your-site.com"
                      className={inputCls}
                      {...register('website')}
                    />
                  </FormField>

                  {/* Phone (optional) */}
                  <FormField id="phone" label="Phone" optional>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+91 90000 00000"
                      className={inputCls}
                      {...register('phone')}
                    />
                  </FormField>

                  {/* Budget range (optional) */}
                  <FormField id="budget" label="What kind of budget are we working with?" optional>
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
                  </FormField>

                  {/* Preferred time (optional) */}
                  <FormField id="preferredTime" label="Preferred time" optional>
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
                  </FormField>
                </div>

                {/* Message — full width */}
                <div className="mt-5">
                  <FormField
                    id="message"
                    label="What do you want to change?"
                    required
                    error={errors.message?.message}
                  >
                    <textarea
                      id="message"
                      rows={5}
                      required
                      aria-required="true"
                      placeholder="Tell us about your goals, your audience, what’s working and what isn’t. Anything that helps us prepare for the call."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`${inputCls} resize-y min-h-[140px]`}
                      {...register('message')}
                    />
                  </FormField>
                </div>

                {/* Submit row — full width */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    aria-busy={status === 'submitting'}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F13D32] px-7 py-3 text-sm font-semibold text-white shadow-[0_3px_0_rgba(16,16,16,0.20)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send the brief'}
                    {status !== 'submitting' && <ArrowUpRight className="h-4 w-4" />}
                  </button>
                  <p className="max-w-md text-xs leading-relaxed text-[#5D5A54]">
                    By submitting you agree to our{' '}
                    <Link
                      href="/privacy-policy"
                      className="font-medium text-[#101010] underline underline-offset-2 hover:text-[#F13D32]"
                    >
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/terms"
                      className="font-medium text-[#101010] underline underline-offset-2 hover:text-[#F13D32]"
                    >
                      Terms
                    </Link>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
