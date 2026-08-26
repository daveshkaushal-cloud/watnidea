'use client'

/* ------------------------------------------------------------------ *
 * InsightsHero — Section 1 of /insights
 *
 * Honest editorial hero on a warm-white background.
 *
 *   - Eyebrow: "Insights · From the watNidea studio"
 *   - Single <h1> "Insights" (font-editorial)
 *   - Honest subhead: essays on brand, craft and growth; we're writing
 *     our first pieces now; sign up to know when they land.
 *   - Two real CTAs: "Book a Strategy Call" + "Email the studio"
 *   - Quiet status row: "Now writing" + status
 *
 * NO "156 essays", NO "updated hourly", NO "live engagement",
 * NO readership claims, NO multi-color gradients, NO orbit ring.
 * Motion is short fade-up only, gated on prefers-reduced-motion.
 * ------------------------------------------------------------------ */

import { CalendarDays, Mail } from 'lucide-react'
import { HeroReveal } from '@/components/home/motion'
import {
  PrimaryLink,
  SecondaryLink,
  Eyebrow,
  SectionShell,
} from '@/components/home/primitives'
import { site } from '@/lib/siteContent'

export function InsightsHero() {
  return (
    <section
      aria-labelledby="insights-hero-heading"
      className="relative isolate overflow-hidden bg-[var(--wn-warm-white)]"
    >
      {/* Subtle red accent — purely decorative, low opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[var(--wn-red)] opacity-[0.08] blur-[140px]"
      />

      {/* Top spacer for fixed navbar */}
      <div className="px-5 pb-20 pt-32 sm:px-8 sm:pt-40 md:pb-28 md:pt-44">
        <SectionShell>
          {/* Eyebrow */}
          <HeroReveal delay={0.05}>
            <Eyebrow>
              Insights
              <span className="mx-3 text-[var(--wn-red)]">•</span>
              From the {site.name} studio
            </Eyebrow>
          </HeroReveal>

          {/* Single <h1> — the only <h1> on /insights */}
          <HeroReveal delay={0.12}>
            <h1
              id="insights-hero-heading"
              className="mt-6 font-editorial font-medium leading-[0.98] tracking-[-0.02em] text-[var(--wn-body)] text-[clamp(3rem,9vw,7rem)]"
            >
              Insights.
            </h1>
          </HeroReveal>

          {/* Honest subhead */}
          <HeroReveal delay={0.22}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--wn-muted)] sm:text-lg md:text-xl">
              Essays on brand, craft and growth — from the {site.name}{' '}
              studio. We&rsquo;re writing our first pieces now; sign up
              below to know when they land.
            </p>
          </HeroReveal>

          {/* CTAs */}
          <HeroReveal delay={0.34}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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
              >
                Email the studio
              </SecondaryLink>
            </div>
          </HeroReveal>

          {/* Quiet status row — honest, no fake numbers */}
          <HeroReveal delay={0.4}>
            <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--wn-border-subtle)] pt-6 text-xs text-[var(--wn-muted)]">
              <span className="wn-eyebrow !text-[0.65rem]">Now writing</span>
              <span className="text-[var(--wn-body)]">
                Identity · Craft · Growth
              </span>
              <span className="text-[var(--wn-red)]/60">•</span>
              <span>{site.status}</span>
            </div>
          </HeroReveal>
        </SectionShell>
      </div>
    </section>
  )
}
