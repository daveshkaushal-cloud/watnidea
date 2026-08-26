'use client'

/**
 * WorkHero — Section 1 of /work
 *
 * Light, editorial hero. NO floating cards with invented client names.
 * NO LiquidChrome / ParticleField. Just honest copy + 2 real CTAs.
 *
 * Exactly ONE <h1> on the entire /work page lives here.
 *
 * Composition:
 *   - Eyebrow: "Work"
 *   - H1: "Selected Work" (font-editorial, clamp-responsive)
 *   - Subhead: honest framing — we don't publish invented case studies.
 *   - CTAs: "Book a Strategy Call" (primary → /book-strategy-call) +
 *     "View concept explorations" (secondary → anchor on this page)
 *   - Status pill: site.status ("Now accepting selected projects")
 *
 * Reduced-motion: HeroReveal collapses to a pure opacity fade.
 */

import Link from 'next/link'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { Eyebrow, PrimaryLink, SecondaryLink, SectionShell } from '@/components/home/primitives'
import { HeroReveal } from '@/components/home/motion'
import { site } from '@/lib/siteContent'

export function WorkHero() {
  return (
    <section
      aria-labelledby="work-hero-heading"
      className="wn-section relative overflow-hidden px-5 pt-32 sm:px-8 md:pt-40"
    >
      {/* Subtle warm ambient glow — decorative only, no client imagery */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-[40vw] w-[40vw] max-h-[480px] max-w-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(232,70,58,0.10), rgba(232,70,58,0) 70%)',
          filter: 'blur(40px)',
        }}
      />

      <SectionShell className="relative">
        <HeroReveal delay={0.05}>
          <Eyebrow className="text-[var(--wn-red)]">Work</Eyebrow>
        </HeroReveal>

        <HeroReveal delay={0.12} className="mt-5 block">
          <h1
            id="work-hero-heading"
            className="font-editorial text-[clamp(2.75rem,8vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em] text-[var(--wn-body)]"
          >
            Selected Work.
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.22} className="mt-7 block max-w-2xl">
          <p className="text-lg leading-relaxed text-[var(--wn-muted)] sm:text-xl">
            Brands, websites, content systems and performance — built to be
            memorable and engineered to convert. We don&apos;t publish
            invented case studies, fabricated metrics or stock-persona
            testimonials. When the first signed-off client work is ready, it
            will live here with the brief, the approach, and the actual
            result.
          </p>
        </HeroReveal>

        <HeroReveal delay={0.32} className="mt-9 block">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <PrimaryLink href="/book-strategy-call" icon={<CalendarDays className="h-4 w-4" />}>
              Book a Strategy Call
            </PrimaryLink>
            <SecondaryLink
              href="#concept-explorations"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              View concept explorations
            </SecondaryLink>
          </div>
        </HeroReveal>

        <HeroReveal delay={0.4} className="mt-8 block">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--wn-border-strong)] bg-[var(--wn-surface)] px-3 py-1.5 text-xs text-[var(--wn-muted)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--wn-red)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--wn-red)]" />
            </span>
            {site.status}
          </p>
        </HeroReveal>
      </SectionShell>
    </section>
  )
}
