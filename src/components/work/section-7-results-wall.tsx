'use client'

/**
 * WorkCapabilities — Section 7 of /work
 *
 * Replaces the previous fake "Results Wall" (which showed invented
 * metrics like "6.8× ROAS", "₹2.4Cr revenue", "+220% revenue") with
 * honest, non-numeric capability statements sourced from
 * `CAPABILITIES` in siteContent.ts.
 *
 * NO invented numbers. NO count-up animations. NO fake deltas.
 *
 * Composition:
 *   - Eyebrow: "What we can do"
 *   - H2: "Capabilities — honestly stated."
 *   - Subhead
 *   - Grid of 7 capability cards, each with a title + description.
 *   - Each card uses a Check icon in the brand red.
 *
 * Reduced-motion: Reveal collapses to a pure opacity fade.
 */

import { Check } from 'lucide-react'
import { CAPABILITIES } from '@/lib/siteContent'
import {
  Eyebrow,
  SectionHeading,
  SectionShell,
} from '@/components/home/primitives'
import { Reveal } from '@/components/home/motion'

export function WorkCapabilities() {
  return (
    <section
      aria-labelledby="work-capabilities-heading"
      className="wn-section bg-[var(--wn-cream)] px-5 sm:px-8"
    >
      <SectionShell>
        <Reveal>
          <Eyebrow>What we can do</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} className="mt-5 block max-w-3xl">
          <SectionHeading id="work-capabilities-heading">
            Capabilities — honestly stated.
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.16} className="mt-6 block max-w-2xl">
          <p className="text-base leading-relaxed text-[var(--wn-muted)] sm:text-lg">
            We&apos;d rather tell you what we can actually do today than
            show you numbers we can&apos;t back up. Here&apos;s the
            practice — no invented outcomes.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <Reveal
              as="li"
              key={cap.title}
              delay={Math.min(i * 0.06, 0.4)}
              className="h-full"
            >
              <div className="flex h-full flex-col rounded-2xl border border-[var(--wn-border-strong)] bg-[var(--wn-surface)] p-6 transition-colors duration-300 hover:border-[var(--wn-red)]/50">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--wn-red)]/10 text-[var(--wn-red)]">
                  <Check className="h-4 w-4" />
                </div>
                <h3 className="font-editorial text-lg font-medium leading-snug tracking-[-0.01em] text-[var(--wn-body)]">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--wn-muted)]">
                  {cap.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </SectionShell>
    </section>
  )
}
