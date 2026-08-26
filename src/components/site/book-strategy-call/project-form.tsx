'use client'

/**
 * ProjectForm — the project enquiry form for /book-strategy-call.
 *
 * Secure POST-based delivery to /api/strategy-call (JSON via fetch when JS
 * is enabled; native form-POST fallback when JS is disabled). Lead data
 * never appears in URLs.
 *
 * Fields (per brief):
 *   - name (required)
 *   - business (required)
 *   - email (required)
 *   - phone (optional)
 *   - projectType (required select)
 *   - message (required textarea)
 *
 * Removed per brief: budget, preferredTime, website.
 *
 * Accessibility:
 *   - Visible labels via FormField (not placeholder-as-label).
 *   - aria-invalid on invalid fields.
 *   - aria-describedby linking errors.
 *   - role="alert" for field errors.
 *   - aria-live for form status.
 *   - Focus moves to status message after submission.
 *   - All interactive elements min-h-[44px].
 *   - Honeypot: aria-hidden wrapper, tabindex=-1, autocomplete=off,
 *     positioned off-screen (NOT display:none).
 *
 * Security:
 *   - Client + server validation (zod on both sides).
 *   - Honeypot field (company) — bots fill it, real users do not.
 *   - Rate limiting handled server-side.
 *   - No analytics on submitted details.
 *   - No console logging of PII.
 *   - Secrets/destination addresses stay server-side.
 *   - Success shown ONLY after confirmed DB delivery.
 */

import { useState, useRef, useEffect } from 'react'
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

/* ---- project type options (per brief) -------------------------------- */
const PROJECT_TYPES = [
  'Brand Identity',
  'Branding & Packaging',
  'Website Development',
  'Video Production',
  'Social Media',
  'AEO & SEO',
  'AI Advertising',
  'Performance Marketing',
  'Digital Marketing',
  'Creative Campaigns',
  'Other',
] as const

/* ---- schema (mirrors /api/strategy-call) ----------------------------- */
const schema = z.object({
  name: z.string().min(2, 'Please enter your name').max(120),
  business: z.string().min(2, 'Please enter your business name').max(160),
  email: z.string().email('Please enter a valid email address').max(160),
  phone: z.string().max(40).optional().or(z.literal('')),
  projectType: z.string().min(2, 'Please select a service').max(120),
  message: z.string().min(10, 'Please tell us a little about your project').max(2000),
  // Honeypot — must stay empty.
  company: z.string().max(0).optional().or(z.literal('')),
})

type FormValues = z.infer<typeof schema>

type Status = 'idle' | 'submitting' | 'success' | 'error'

/* ---- shared input class ---------------------------------------------- */
const inputCls =
  'w-full rounded-[12px] border border-[rgba(16,16,16,0.18)] bg-[#FFFDF8] px-4 py-3 text-[#101010] placeholder:text-[#5D5A54]/50 focus:border-[#F13D32] focus:outline-none focus:ring-2 focus:ring-[#F13D32]/25 transition-colors min-h-[44px]'

export function ProjectForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const statusRef = useRef<HTMLDivElement>(null)

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
      business: '',
      email: '',
      phone: '',
      projectType: '',
      message: '',
      company: '',
    },
  })

  /* Move keyboard focus to the status message after submission. */
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      statusRef.current?.focus()
    }
  }, [status])

  const onSubmit = async (values: FormValues) => {
    setStatus('submitting')
    setErrorMessage('')

    const payload = {
      name: values.name,
      business: values.business,
      email: values.email,
      phone: values.phone || '',
      projectType: values.projectType,
      message: values.message,
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
      setStatus('error')
      if (res.status === 429) {
        setErrorMessage(
          "You've sent a few requests quickly. Please wait a few minutes and try again, or email us directly.",
        )
      } else {
        setErrorMessage(
          (data && typeof data.error === 'string' && data.error) ||
            "We couldn't send your enquiry. Please try again or contact us by email.",
        )
      }
    } catch {
      // Network failure — actionable fallback. Preserves entered information.
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
    <Section surface="lilac" id="project-enquiry" ariaLabelledBy="project-form-heading" className="py-10 lg:!py-10">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Heading block */}
          <div className="mb-8">
            <SectionLabel number="01" accent="#F13D32">
              Project Enquiry
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="project-form-heading" className="mt-4 max-w-[20ch]">
                Tell Us What You&apos;re <span className="wn-underline-hand">Building</span>
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5D5A54]">
                Share a few details about your business and project. This is the start of a
                conversation, not a commitment. We will review what you share and continue from
                there. Required fields are marked with{' '}
                <span className="text-[#F13D32]" aria-hidden="true">*</span>.
              </p>
            </Reveal>
          </div>

          {/* Card */}
          <div className="relative rounded-[24px] border border-[rgba(16,16,16,0.12)] bg-[#FFFDF8] p-6 shadow-[0_8px_24px_-14px_rgba(16,16,16,0.18)] sm:p-8">
            <Reveal>
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="wn-caption text-[#5D5A54]">
                  Takes ~2 minutes
                </p>
                <Sticker accent="#101010" textColor="#FFC83D" tilt="right">
                  Real humans reply
                </Sticker>
              </div>
            </Reveal>

            {status === 'success' ? (
              /* ----------------------------------------------------- success */
              <div
                ref={statusRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="flex flex-col items-start gap-5 py-6 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F13D32] text-white"
                  >
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="font-editorial text-2xl font-semibold text-[#101010] sm:text-3xl">
                    Enquiry received
                  </h3>
                </div>

                <p className="max-w-xl text-base leading-relaxed text-[#101010] opacity-85 sm:text-lg">
                  Thank you—your enquiry has been received. We&apos;ll use the details you provided
                  to continue the conversation.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F13D32] px-6 py-3 text-sm font-semibold text-white shadow-[0_3px_0_rgba(16,16,16,0.20)] transition-transform hover:-translate-y-0.5"
                  >
                    <Mail className="h-4 w-4" />
                    Email us directly
                  </a>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[rgba(16,16,16,0.22)] bg-transparent px-6 py-3 text-sm font-semibold text-[#101010] transition-colors hover:bg-[rgba(16,16,16,0.05)]"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Submit another enquiry
                  </button>
                </div>
              </div>
            ) : (
              /* -------------------------------------------------------- form
               * Production-ready: method="post" + action="/api/strategy-call"
               * as a no-JavaScript fallback. Lead data never appears in the URL.
               */
              <form
                onSubmit={handleSubmit(onSubmit)}
                method="post"
                action="/api/strategy-call"
                encType="application/x-www-form-urlencoded"
                noValidate
              >
                {/* Status message region (focus target after submission) */}
                <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
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
                </div>

                {/* Honeypot — visually hidden off-screen (NOT display:none).
                    aria-hidden wrapper, tabindex=-1, autocomplete=off. */}
                <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
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

                {/* Short fields — two-column on md+ */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Name */}
                  <FormField
                    id="name"
                    label="Name"
                    required
                    error={errors.name?.message}
                  >
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your name"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={inputCls}
                      {...register('name')}
                    />
                  </FormField>

                  {/* Business Name */}
                  <FormField
                    id="business"
                    label="Business Name"
                    required
                    error={errors.business?.message}
                  >
                    <input
                      id="business"
                      type="text"
                      autoComplete="organization"
                      placeholder="Enter your business name"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.business}
                      aria-describedby={errors.business ? 'business-error' : undefined}
                      className={inputCls}
                      {...register('business')}
                    />
                  </FormField>

                  {/* Email Address */}
                  <FormField
                    id="email"
                    label="Email Address"
                    required
                    error={errors.email?.message}
                  >
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="Enter your email address"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={inputCls}
                      {...register('email')}
                    />
                  </FormField>

                  {/* Phone Number (optional) */}
                  <FormField id="phone" label="Phone Number" optional>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="Enter your phone number"
                      className={inputCls}
                      {...register('phone')}
                    />
                  </FormField>
                </div>

                {/* Project Type — full width select */}
                <div className="mt-5">
                  <FormField
                    id="projectType"
                    label="What Can We Help You With?"
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
                        Select a service
                      </option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>

                {/* Message — full width textarea */}
                <div className="mt-5">
                  <FormField
                    id="message"
                    label="Tell Us About Your Project"
                    required
                    error={errors.message?.message}
                  >
                    <textarea
                      id="message"
                      rows={5}
                      required
                      aria-required="true"
                      placeholder="Tell us about your business, project requirements, goals, and timeline…"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : 'message-guideline'}
                      className={`${inputCls} resize-y min-h-[140px]`}
                      {...register('message')}
                    />
                  </FormField>
                  <p id="message-guideline" className="mt-1.5 text-xs text-[#5D5A54]">
                    A few sentences are enough — share what you know and we will ask the rest.
                  </p>
                </div>

                {/* Submit row — full width */}
                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    aria-busy={status === 'submitting'}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F13D32] px-7 py-3 text-sm font-semibold text-white shadow-[0_3px_0_rgba(16,16,16,0.20)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send Your Enquiry'}
                    {status !== 'submitting' && <ArrowUpRight className="h-4 w-4" />}
                  </button>
                  <p className="max-w-md text-xs leading-relaxed text-[#5D5A54]">
                    By submitting this form, you agree to our{' '}
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
