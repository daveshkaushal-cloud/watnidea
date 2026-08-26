'use client'

/**
 * WorkRecognition — Section 9 of /work
 *
 * NO fake awards, NO "Cumulative revenue influenced crosses nine
 * figures", NO invented milestones ("180M+ reach", "₹100Cr+
 * influenced"), NO fictional client wordmark grid.
 *
 * Renders an honest "Recognition — coming soon" empty state. If real
 * awards or milestones are ever added to siteContent.ts (verified),
 * this same component will render them — but only when they are real.
 *
 * Composition:
 *   - Eyebrow: "Recognition"
 *   - H2: "Recognition — coming soon."
 *   - Subhead
 *   - Honest empty-state card
 *
 * Reduced-motion: Reveal collapses to a pure opacity fade.
 */

import {
  Eyebrow,
  SectionHeading,
  SectionShell,
} from '@/components/home/primitives'
import { Reveal } from '@/components/home/motion'

export function WorkRecognition() {
  return (
    <section
      aria-labelledby="work-recognition-heading"
      className="wn-section bg-[var(--wn-cream)] px-5 sm:px-8"
    >
      <SectionShell>
        <Reveal>
          <Eyebrow>Recognition</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} className="mt-5 block max-w-3xl">
          <SectionHeading id="work-recognition-heading">
            Recognition — coming soon.
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.16} className="mt-6 block max-w-2xl">
          <p className="text-base leading-relaxed text-[var(--wn-muted)] sm:text-lg">
            We don&apos;t list invented awards, fabricated revenue
            milestones, or fictional client partnerships. Real
            recognition — when it exists — will appear here, attributed
            and verifiable.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 block">
          <div className="rounded-2xl border border-dashed border-[var(--wn-border-strong)] bg-[var(--wn-surface)] p-8 text-center sm:p-12">
            <p className="font-editorial text-xl font-medium text-[var(--wn-body)] sm:text-2xl">
              Nothing to claim yet.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--wn-muted)]">
              The studio is young. We&apos;d rather earn recognition than
              invent it. If we win an award, ship a milestone, or sign a
              partnership worth naming, you&apos;ll read it here first —
              with the source.
            </p>
          </div>
        </Reveal>
      </SectionShell>
    </section>
  )
}
