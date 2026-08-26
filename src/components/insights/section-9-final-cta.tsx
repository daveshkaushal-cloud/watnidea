'use client'

/* ------------------------------------------------------------------ *
 * InsightsFinalCta — Section 4 of /insights (the charcoal moment)
 *
 * Honest, single charcoal close — the only dark surface on the page.
 *
 *   - Eyebrow: "Project enquiry"
 *   - <h2>: "Have a project in mind?"
 *   - Sub: short, no fake metrics, no countdown timer, no urgency tricks
 *   - CTAs: Book a Strategy Call (primary red) + Email us (secondary outline)
 *
 * Mirrors the homepage FinalCtaSection pattern exactly: subtle red
 * accent glow, motion gated on prefers-reduced-motion, no fake numbers.
 * ------------------------------------------------------------------ */

import { ArrowUpRight, CalendarDays, Mail } from 'lucide-react'
import { HeroReveal } from '@/components/home/motion'
import { PrimaryLink, SecondaryLink, Eyebrow } from '@/components/home/primitives'
import { site } from '@/lib/siteContent'

export function InsightsFinalCta() {
  return (
    <section
      aria-labelledby="insights-final-cta-heading"
      className="wn-dark relative isolate overflow-hidden bg-[var(--wn-charcoal)] text-white"
    >
      {/* Subtle red accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[460px] w-[460px] rounded-full bg-[var(--wn-red)] opacity-[0.16] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[var(--wn-red)] opacity-[0.10] blur-[120px]"
      />

      <div className="wn-section relative px-5 sm:px-8">
        <div className="mx-auto w-full max-w-4xl text-center">
          <HeroReveal delay={0.05}>
            <Eyebrow className="text-white/65">Project enquiry</Eyebrow>
          </HeroReveal>

          <HeroReveal delay={0.12}>
            <h2
              id="insights-final-cta-heading"
              className="mt-5 font-editorial text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl"
            >
              Have a project in mind?
            </h2>
          </HeroReveal>

          <HeroReveal delay={0.22}>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Tell us where you are and where you want to go. We&rsquo;ll
              come back with a clear point of view on how to get there —
              identity, site, content and growth.
            </p>
          </HeroReveal>

          <HeroReveal delay={0.34}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryLink
                href="/book-strategy-call"
                icon={<CalendarDays className="h-4 w-4" />}
                aria-label="Book a strategy call"
              >
                Book a Strategy Call
              </PrimaryLink>
              <SecondaryLink
                href={`mailto:${site.email}`}
                icon={<Mail className="h-4 w-4" />}
                aria-label={`Email ${site.email}`}
                className="border-white/25 text-white hover:bg-white/10"
              >
                Email the studio
              </SecondaryLink>
            </div>
          </HeroReveal>

          <HeroReveal delay={0.4}>
            <p className="mt-10 flex items-center justify-center gap-2 text-xs text-white/45">
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              {site.status}
            </p>
          </HeroReveal>
        </div>
      </div>
    </section>
  )
}
