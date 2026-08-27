'use client'

/**
 * WorkFinalCta — Section 10 of /work
 *
 * Honest, LIGHT closing CTA. NO "ConvergenceSphere", NO 6-color
 * embers, NO invented "Become the next success story" framing.
 *
 * Composition:
 *   - Eyebrow: "Begin"
 *   - H2: "Have a project in mind?"
 *   - Subhead
 *   - CTAs: "Book a Strategy Call" (primary → /book-strategy-call) +
 *     "Email us" (secondary → mailto:info@watnidea.com)
 *   - Status pill: site.status
 *
 * Reduced-motion: Reveal collapses to a pure opacity fade.
 */

import { ArrowUpRight, CalendarDays, Mail } from 'lucide-react'
import {
  Eyebrow,
  PrimaryLink,
  SecondaryLink,
  SectionHeading,
  SectionShell,
} from '@/components/home/primitives'
import { Reveal } from '@/components/home/motion'
import { site } from '@/lib/siteContent'

export function WorkFinalCta() {
  return (
    <section
      aria-labelledby="work-final-cta-heading"
      className="wn-section bg-[var(--wn-sand)] px-5 sm:px-8"
    >
      <SectionShell className="max-w-4xl text-center">
        <Reveal className="flex justify-center">
          <Eyebrow>Begin</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} className="mt-5 block">
          <SectionHeading id="work-final-cta-heading" balance>
            Have a project in mind?
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.16} className="mt-6 block mx-auto max-w-2xl">
          <p className="text-base leading-relaxed text-[var(--wn-muted)] sm:text-lg">
            Tell us what you&apos;re building. We&apos;ll send back a
            short take on the brief and, if it&apos;s a fit, a path
            forward — no invented portfolio required.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-9 block">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryLink
              href="/book-strategy-call"
              icon={<CalendarDays className="h-4 w-4" />}
            >
              Book a Strategy Call
            </PrimaryLink>
            <SecondaryLink
              href={`mailto:${site.email}`}
              icon={<Mail className="h-4 w-4" />}
            >
              Email us
              <ArrowUpRight className="h-4 w-4" />
            </SecondaryLink>
          </div>
        </Reveal>
        <Reveal delay={0.32} className="mt-8 block">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--wn-border-strong)] bg-[var(--wn-surface)] px-3 py-1.5 text-xs text-[var(--wn-muted)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--wn-red)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--wn-red)]" />
            </span>
            {site.status}
          </p>
        </Reveal>
      </SectionShell>
    </section>
  )
}
