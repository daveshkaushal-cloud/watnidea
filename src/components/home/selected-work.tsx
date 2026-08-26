'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  Eyebrow,
  SectionHeading,
  SectionShell,
  SecondaryLink,
} from './primitives'
import { Reveal } from './motion'
import { getVerifiedCaseStudies } from '@/lib/siteContent'

/* ------------------------------------------------------------------ *
 * Section 3 — Selected work (CREAM / SAND)
 *
 * Renders ONLY verified case studies from getVerifiedCaseStudies().
 * When no verified work exists (current state), shows an honest
 * "Selected work coming soon" card — never invents client projects.
 *
 * When verified work exists, each card is a real <Link> to
 * /work/[slug].
 * ------------------------------------------------------------------ */

export function SelectedWorkSection() {
  const caseStudies = getVerifiedCaseStudies()

  return (
    <section
      aria-labelledby="work-heading"
      className="wn-section bg-[var(--wn-cream)]"
    >
      <SectionShell>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Selected work</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="work-heading" className="mt-4">
                Real work, real results —{' '}
                <span className="text-[var(--wn-muted)]">
                  when they are signed off.
                </span>
              </SectionHeading>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <SecondaryLink
              href="/work"
              icon={<ArrowRight className="h-4 w-4" />}
              className="border-[var(--wn-border-strong)]"
            >
              View all work
            </SecondaryLink>
          </Reveal>
        </div>

        {caseStudies.length > 0 ? (
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {caseStudies.map((c, i) => (
              <li key={c.slug}>
                <Reveal delay={0.05 * (i + 1)} as="div">
                  <Link
                    href={`/work/${c.slug}`}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--wn-border-subtle)] bg-[var(--wn-surface)] p-6 transition-colors hover:border-[var(--wn-border-strong)] hover:bg-[var(--wn-surface-2)]"
                  >
                    <div>
                      <p className="wn-eyebrow">{c.category}</p>
                      <h3 className="mt-3 font-editorial text-2xl font-medium leading-snug text-[var(--wn-body)]">
                        {c.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--wn-muted)]">
                        {c.summary}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--wn-body)]">
                      View case study
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal delay={0.1}>
            <div className="mt-12 rounded-2xl border border-dashed border-[var(--wn-border-strong)] bg-[var(--wn-surface)] p-8 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl">
                  <p className="wn-eyebrow text-[var(--wn-red)]">
                    Selected work coming soon
                  </p>
                  <h3 className="mt-3 font-editorial text-2xl font-medium leading-snug text-[var(--wn-body)] sm:text-3xl">
                    Real case studies will appear here.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--wn-muted)] sm:text-base">
                    We are deliberately not showing invented projects,
                    fabricated metrics or stock-persona case studies. When
                    the first signed-off client work is ready, it will live
                    here — with the brief, the approach, and the actual
                    result.
                  </p>
                </div>
                <Link
                  href="/book-strategy-call"
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-[var(--wn-border-strong)] px-6 py-3 text-sm font-medium text-[var(--wn-body)] transition-colors hover:bg-[var(--wn-surface-2)]"
                >
                  Start the first one
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        )}
      </SectionShell>
    </section>
  )
}
