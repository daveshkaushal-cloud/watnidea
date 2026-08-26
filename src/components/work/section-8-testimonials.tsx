'use client'

/**
 * WorkTestimonials — Section 8 of /work
 *
 * Renders ONLY `getVerifiedTestimonials()` — currently empty.
 * NO composite / fake testimonials. NO invented names, roles, or
 * companies. NO "Composite testimonials · representative clients"
 * label. NO drifting client wordmark marquee (those names were
 * invented).
 *
 * Composition:
 *   - Eyebrow: "Client voices"
 *   - H2: "Client stories — coming soon."
 *   - Subhead
 *   - Either a grid of real verified testimonial cards OR an honest
 *     "coming soon" empty-state card.
 *
 * Reduced-motion: Reveal collapses to a pure opacity fade.
 */

import { getVerifiedTestimonials } from '@/lib/siteContent'
import {
  Eyebrow,
  SectionHeading,
  SectionShell,
} from '@/components/home/primitives'
import { Reveal } from '@/components/home/motion'

function TestimonialCard({
  quote,
  name,
  role,
  company,
  index,
}: {
  quote: string
  name: string
  role: string
  company?: string
  index: number
}) {
  return (
    <Reveal as="li" delay={Math.min(index * 0.08, 0.4)} className="h-full">
      <figure className="flex h-full flex-col rounded-2xl border border-[var(--wn-border-strong)] bg-[var(--wn-surface)] p-6 sm:p-7">
        <blockquote className="font-editorial text-lg leading-snug text-[var(--wn-body)] sm:text-xl">
          <span aria-hidden className="mr-1 text-[var(--wn-red)]">
            &ldquo;
          </span>
          {quote}
          <span aria-hidden className="ml-0.5 text-[var(--wn-red)]">
            &rdquo;
          </span>
        </blockquote>
        <figcaption className="mt-6 border-t border-[var(--wn-border-subtle)] pt-4">
          <div className="text-sm font-semibold text-[var(--wn-body)]">
            {name}
          </div>
          <div className="text-xs text-[var(--wn-muted)]">
            {role}
            {company ? `, ${company}` : ''}
          </div>
        </figcaption>
      </figure>
    </Reveal>
  )
}

export function WorkTestimonials() {
  const verified = getVerifiedTestimonials()

  return (
    <section
      aria-labelledby="work-testimonials-heading"
      className="wn-section bg-[var(--wn-warm-white)] px-5 sm:px-8"
    >
      <SectionShell>
        <Reveal>
          <Eyebrow>Client voices</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} className="mt-5 block max-w-3xl">
          <SectionHeading id="work-testimonials-heading">
            {verified.length > 0
              ? 'Verified client voices.'
              : 'Client stories — coming soon.'}
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.16} className="mt-6 block max-w-2xl">
          <p className="text-base leading-relaxed text-[var(--wn-muted)] sm:text-lg">
            {verified.length > 0
              ? 'Real, attributable quotes from real clients — name, role, and company attached.'
              : 'We do not publish composite testimonials, invented quotes, or stock-persona clients. When a client is willing to put their name to a quote, it will appear here — verbatim, attributed, and verifiable.'}
          </p>
        </Reveal>

        {verified.length === 0 ? (
          <Reveal delay={0.2} className="mt-10 block">
            <div className="rounded-2xl border border-dashed border-[var(--wn-border-strong)] bg-[var(--wn-surface)] p-8 text-center sm:p-12">
              <p className="font-editorial text-xl font-medium text-[var(--wn-body)] sm:text-2xl">
                Client stories coming soon.
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--wn-muted)]">
                In the meantime, the capabilities above show what we
                actually do — and the concept explorations show how we
                think.
              </p>
            </div>
          </Reveal>
        ) : (
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {verified.map((t, i) => (
              <TestimonialCard
                key={`${t.name}-${i}`}
                quote={t.quote}
                name={t.name}
                role={t.role}
                company={t.company}
                index={i}
              />
            ))}
          </ul>
        )}
      </SectionShell>
    </section>
  )
}
