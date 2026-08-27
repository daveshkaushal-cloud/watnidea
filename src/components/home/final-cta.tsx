'use client'

import { Mail } from 'lucide-react'
import { HeroReveal } from './motion'
import { PrimaryLink, SecondaryLink } from './primitives'
import { site } from '@/lib/siteContent'

/* ------------------------------------------------------------------ *
 * Section 8 — Final CTA (CHARCOAL — second dark moment)
 *
 * "Let's build something memorable." + Book a Strategy Call button
 * → /book-strategy-call. Secondary "Email us" → mailto:info@watnidea.com.
 *
 * Same charcoal surface tokens as the hero, with a quiet red accent
 * glow. No fake metrics, no countdown timer, no dark-pattern urgency.
 * ------------------------------------------------------------------ */

export function FinalCtaSection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
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
            <p className="wn-eyebrow text-white/65">
              Let&apos;s build
            </p>
          </HeroReveal>

          <HeroReveal delay={0.12}>
            <h2
              id="final-cta-heading"
              className="mt-5 font-editorial text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl"
            >
              Let&apos;s build something{' '}
              <span className="text-[var(--wn-red)]">memorable.</span>
            </h2>
          </HeroReveal>

          <HeroReveal delay={0.22}>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Tell us where you are and where you want to go. We&apos;ll
              come back with a clear point of view on how to get there —
              identity, site, content and growth.
            </p>
          </HeroReveal>

          <HeroReveal delay={0.34}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryLink href="/book-strategy-call">
                Book a Strategy Call
              </PrimaryLink>
              <SecondaryLink
                href={`mailto:${site.email}`}
                icon={<Mail className="h-4 w-4" />}
                aria-label={`Email ${site.email}`}
                className="border-white/25 text-white hover:bg-white/10"
              >
                Email us
              </SecondaryLink>
            </div>
          </HeroReveal>

          <HeroReveal delay={0.4}>
            <p className="mt-10 text-xs text-white/45">
              {site.status}
            </p>
          </HeroReveal>
        </div>
      </div>
    </section>
  )
}
