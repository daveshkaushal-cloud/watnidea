'use client'

import { Eyebrow, SectionShell } from './primitives'
import { Reveal } from './motion'

/* ------------------------------------------------------------------ *
 * Section 2 — Positioning statement (WARM-WHITE)
 *
 * One strong editorial sentence + a short paragraph. Honest,
 * confident, no invented metrics.
 * ------------------------------------------------------------------ */

export function PositioningSection() {
  return (
    <section
      aria-labelledby="positioning-heading"
      className="wn-section bg-[var(--wn-warm-white)]"
    >
      <SectionShell>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow>What we do</Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.05}>
              <h2
                id="positioning-heading"
                className="font-editorial text-3xl font-medium leading-[1.15] tracking-[-0.01em] text-[var(--wn-body)] sm:text-4xl md:text-[2.75rem]"
              >
                We are a creative growth agency.{' '}
                <span className="text-[var(--wn-muted)]">
                  Identity, websites, content and performance — under
                  one roof, built to be memorable and to convert.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--wn-body)]/85 sm:text-lg">
                Most brands split their identity, their site, their
                content and their growth across four vendors and lose
                the thread. We keep the thread. One team, one creative
                direction, one growth system — so what people feel about
                the brand is the same thing they experience on the site,
                in the feed, and at the checkout.
              </p>
            </Reveal>
          </div>
        </div>
      </SectionShell>
    </section>
  )
}
