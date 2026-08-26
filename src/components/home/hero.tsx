'use client'

import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { HeroReveal } from './motion'
import { PrimaryLink, SecondaryLink } from './primitives'
import { site } from '@/lib/siteContent'

/* ------------------------------------------------------------------ *
 * Section 1 — Hero (CHARCOAL, the one dark anchor)
 *
 * Full-bleed charcoal background, big editorial headline, short
 * subhead, two real CTAs (no MagneticButton, no fake metrics).
 * Subtle red accent glow only. Motion = quick fade-up (0.5s,
 * delays 0.05–0.4s only) and respects prefers-reduced-motion.
 * ------------------------------------------------------------------ */

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="wn-dark relative isolate overflow-hidden bg-[var(--wn-charcoal)] text-white"
    >
      {/* Subtle red accent glow — purely decorative, low opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-[var(--wn-red)] opacity-[0.18] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[var(--wn-red)] opacity-[0.10] blur-[120px]"
      />

      {/* Top spacer for fixed navbar (h-20 navbar + breathing room) */}
      <div className="px-5 pb-20 pt-32 sm:px-8 sm:pt-40 md:pb-28 md:pt-44">
        <div className="mx-auto w-full max-w-6xl">
          {/* Eyebrow */}
          <HeroReveal delay={0.05}>
            <p className="wn-eyebrow text-white/65">
              {site.description}
              <span className="mx-3 text-[var(--wn-red)]">•</span>
              {site.status}
            </p>
          </HeroReveal>

          {/* H1 — the only <h1> on the page */}
          <HeroReveal delay={0.12}>
            <h1
              id="hero-heading"
              className="mt-6 font-editorial font-medium leading-[0.98] tracking-[-0.02em] text-white text-[clamp(2.75rem,8vw,6.5rem)]"
            >
              Identity with{' '}
              <span className="text-[var(--wn-red)]">Soul.</span>
              <br className="hidden sm:block" />
              <span className="sm:ml-4">Strategy with </span>
              <span className="text-[var(--wn-red)]">Teeth.</span>
            </h1>
          </HeroReveal>

          {/* Subhead */}
          <HeroReveal delay={0.22}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
              {site.name} is a creative growth agency. Brand identity,
              websites, content systems and performance — built under
              one roof to be memorable, and engineered to convert.
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
                href="/work"
                icon={<ArrowUpRight className="h-4 w-4" />}
                aria-label="Explore our work"
                className="border-white/25 text-white hover:bg-white/10"
              >
                Explore Our Work
              </SecondaryLink>
            </div>
          </HeroReveal>

          {/* Quiet trust row — honest, no fake numbers */}
          <HeroReveal delay={0.4}>
            <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/50">
              <span className="wn-eyebrow !text-[0.65rem] text-white/45">
                Under one roof
              </span>
              {['Identity', 'Websites', 'Content', 'Performance'].map((t, i) => (
                <span key={t} className="flex items-center gap-3">
                  <span className="text-white/70">{t}</span>
                  {i < 3 && <span className="text-[var(--wn-red)]/60">•</span>}
                </span>
              ))}
            </div>
          </HeroReveal>
        </div>
      </div>
    </section>
  )
}
