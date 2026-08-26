'use client'

/**
 * WorkVerifiedGrid — Section 4 of /work
 *
 * Renders ONLY `getVerifiedCaseStudies()` as real client work cards.
 * Currently returns [] — the page renders an honest "Selected work
 * coming soon" state. When verified work is added to siteContent.ts,
 * this same component will render real /work/[slug] cards without any
 * future code change.
 *
 * NO invented client names, metrics, or "Browse the full archive"
 * controls that point nowhere. NO href="#".
 *
 * Composition:
 *   - Eyebrow: "Selected work"
 *   - H2: "Verified work — coming soon."
 *   - Subhead: honest empty-state copy
 *   - Either a grid of real verified cards OR an honest empty-state card
 *     with a real CTA to /book-strategy-call.
 *
 * Reduced-motion: Reveal collapses to a pure opacity fade.
 */

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
  getVerifiedCaseStudies,
  SERVICES,
  type CaseStudy,
} from '@/lib/siteContent'
import {
  Eyebrow,
  PrimaryLink,
  SectionHeading,
  SectionShell,
} from '@/components/home/primitives'
import { Reveal } from '@/components/home/motion'

function serviceNames(slugs: CaseStudy['services']): string {
  return slugs
    .map((s) => SERVICES.find((svc) => svc.slug === s)?.shortName ?? s)
    .join(' · ')
}

function VerifiedCard({ study, index }: { study: CaseStudy; index: number }) {
  const href = `/work/${study.slug}` as const
  return (
    <Reveal as="li" delay={Math.min(index * 0.08, 0.4)} className="h-full">
      <Link
        href={href}
        aria-label={`Open case study: ${study.title}`}
        className="group relative flex h-full flex-col rounded-2xl border border-[var(--wn-red)]/40 bg-[var(--wn-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--wn-red)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wn-red)] sm:p-7"
      >
        <div className="mb-4 flex items-center gap-2">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-[var(--wn-red)]"
          />
          <span className="wn-eyebrow text-[var(--wn-red)]">
            Selected work
          </span>
        </div>

        <h3 className="font-editorial text-2xl font-medium leading-tight tracking-[-0.01em] text-[var(--wn-body)] sm:text-3xl">
          {study.title}
        </h3>

        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--wn-muted)]">
          {study.summary}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--wn-border-subtle)] pt-4 text-xs text-[var(--wn-muted)]">
          <span>
            <span className="wn-eyebrow mr-1.5 text-[var(--wn-muted)]/70">
              Client
            </span>
            {study.client}
          </span>
          <span>
            <span className="wn-eyebrow mr-1.5 text-[var(--wn-muted)]/70">
              Practice
            </span>
            {serviceNames(study.services)}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-[var(--wn-red)]">
            Open case study
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

export function WorkVerifiedGrid() {
  const verified = getVerifiedCaseStudies()

  return (
    <section
      aria-labelledby="work-verified-heading"
      className="wn-section bg-[var(--wn-sand)] px-5 sm:px-8"
    >
      <SectionShell>
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} className="mt-5 block max-w-3xl">
          <SectionHeading id="work-verified-heading">
            {verified.length > 0
              ? 'Verified client work.'
              : 'Verified work — coming soon.'}
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.16} className="mt-6 block max-w-2xl">
          <p className="text-base leading-relaxed text-[var(--wn-muted)] sm:text-lg">
            {verified.length > 0
              ? 'Signed-off client work — with the brief, the approach, and the actual result.'
              : 'We deliberately do not show invented projects, fabricated metrics or stock-persona case studies. When the first signed-off client work is ready, it will live here.'}
          </p>
        </Reveal>

        {verified.length === 0 ? (
          <Reveal delay={0.2} className="mt-10 block">
            <div className="rounded-2xl border border-dashed border-[var(--wn-border-strong)] bg-[var(--wn-surface)] p-8 sm:p-12">
              <p className="font-editorial text-xl font-medium text-[var(--wn-body)] sm:text-2xl">
                Selected work coming soon.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--wn-muted)]">
                In the meantime, the concept explorations above show how we
                think about identity systems and marketing-site architecture
                — and the discipline cards below show what we actually
                practise today.
              </p>
              <div className="mt-6">
                <PrimaryLink href="/book-strategy-call">
                  Start the first one
                </PrimaryLink>
              </div>
            </div>
          </Reveal>
        ) : (
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {verified.map((study, i) => (
              <VerifiedCard key={study.slug} study={study} index={i} />
            ))}
          </ul>
        )}
      </SectionShell>
    </section>
  )
}
