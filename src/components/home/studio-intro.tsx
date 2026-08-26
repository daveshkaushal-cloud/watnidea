'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Eyebrow, SectionShell } from './primitives'
import { Reveal } from './motion'

/* ------------------------------------------------------------------ *
 * Section 7 — Short studio intro (WARM-WHITE)
 *
 * 2–3 honest, human, confident sentences about the studio
 * philosophy. Links to /about for the full story.
 * ------------------------------------------------------------------ */

export function StudioIntroSection() {
  return (
    <section
      aria-labelledby="studio-heading"
      className="wn-section bg-[var(--wn-warm-white)]"
    >
      <SectionShell>
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow>The studio</Eyebrow>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.05}>
              <h2
                id="studio-heading"
                className="font-editorial text-3xl font-medium leading-[1.2] tracking-[-0.01em] text-[var(--wn-body)] sm:text-4xl md:text-[2.5rem]"
              >
                We believe a brand should{' '}
                <span className="text-[var(--wn-red)]">feel</span> like
                something — and{' '}
                <span className="text-[var(--wn-red)]">work</span> like
                a system.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--wn-body)]/85 sm:text-lg">
                watNidea is a small, senior team. We don&apos;t hand the
                work off to juniors after the pitch. The people who
                scope the brief are the people who design, write, ship
                and measure it — so the soul of the brand makes it all
                the way to the conversion.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Link
                href="/about"
                className="group mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--wn-body)]"
              >
                Read the studio philosophy
                <ArrowRight className="h-4 w-4 text-[var(--wn-red)] transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </SectionShell>
    </section>
  )
}
