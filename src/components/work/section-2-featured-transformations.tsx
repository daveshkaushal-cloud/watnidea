'use client'

/**
 * WorkConceptExplorations — Section 2 of /work
 *
 * Honest grid of concept explorations. Renders `CASE_STUDIES` items
 * where `verified === false` behind an explicit "Concept exploration"
 * label. Each card links to its /work/[slug] dynamic route (the route
 * renders the concept page without fake metrics).
 *
 * NO invented client names. NO "ROAS climbed to 6.8×". NO composite
 * testimonials. NO fake results.
 *
 * Composition:
 *   - Eyebrow: "Concept explorations"
 *   - H2: "In the studio — concept explorations"
 *   - Subhead: honest framing
 *   - Grid of concept cards (currently 2), each:
 *       • "Concept exploration" tag (amber dot + label)
 *       • Title (font-editorial)
 *       • Summary
 *       • Category + services
 *       • Real Next.js <Link> to /work/[slug]
 *
 * Reduced-motion: Reveal collapses to a pure opacity fade.
 */

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CASE_STUDIES, SERVICES, type CaseStudy } from '@/lib/siteContent'
import {
  Eyebrow,
  SectionHeading,
  SectionShell,
} from '@/components/home/primitives'
import { Reveal } from '@/components/home/motion'

function serviceNames(slugs: CaseStudy['services']): string {
  return slugs
    .map((s) => SERVICES.find((svc) => svc.slug === s)?.shortName ?? s)
    .join(' · ')
}

function ConceptCard({ study, index }: { study: CaseStudy; index: number }) {
  const href = `/work/${study.slug}` as const
  return (
    <Reveal
      as="li"
      delay={Math.min(index * 0.08, 0.4)}
      className="h-full"
    >
      <Link
        href={href}
        aria-label={`Open concept exploration: ${study.title}`}
        className="group relative flex h-full flex-col rounded-2xl border border-[var(--wn-border-strong)] bg-[var(--wn-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--wn-red)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wn-red)] sm:p-7"
      >
        {/* Concept label — clearly NOT a real client */}
        <div className="mb-4 flex items-center gap-2">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-[var(--wn-amber)]"
          />
          <span className="wn-eyebrow text-[var(--wn-muted)]">
            Concept exploration
          </span>
        </div>

        <h3 className="font-editorial text-2xl font-medium leading-tight tracking-[-0.01em] text-[var(--wn-body)] sm:text-3xl">
          {study.title}
        </h3>

        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--wn-muted)]">
          {study.summary}
        </p>

        {/* Meta row */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--wn-border-subtle)] pt-4 text-xs text-[var(--wn-muted)]">
          <span>
            <span className="wn-eyebrow mr-1.5 text-[var(--wn-muted)]/70">
              Category
            </span>
            {study.category}
          </span>
          <span>
            <span className="wn-eyebrow mr-1.5 text-[var(--wn-muted)]/70">
              Practice
            </span>
            {serviceNames(study.services)}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-[var(--wn-red)]">
            Open concept
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

export function WorkConceptExplorations() {
  const concepts = CASE_STUDIES.filter((c) => !c.verified)

  return (
    <section
      id="concept-explorations"
      aria-labelledby="work-concepts-heading"
      className="wn-section bg-[var(--wn-cream)] px-5 sm:px-8"
    >
      <SectionShell>
        <Reveal>
          <Eyebrow>Concept explorations</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} className="mt-5 block max-w-3xl">
          <SectionHeading id="work-concepts-heading">
            In the studio — concept explorations.
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.16} className="mt-6 block max-w-2xl">
          <p className="text-base leading-relaxed text-[var(--wn-muted)] sm:text-lg">
            These are explorations — internal concept work showing how a
            system could behave. They are not signed-off client projects
            and carry no attributed outcomes. Real client work goes here
            once it&apos;s verified.
          </p>
        </Reveal>

        {concepts.length === 0 ? (
          <Reveal delay={0.2} className="mt-10 block">
            <div className="rounded-2xl border border-dashed border-[var(--wn-border-strong)] bg-[var(--wn-surface)] p-8 text-center text-[var(--wn-muted)] sm:p-12">
              No concept explorations published yet.
            </div>
          </Reveal>
        ) : (
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {concepts.map((study, i) => (
              <ConceptCard key={study.slug} study={study} index={i} />
            ))}
          </ul>
        )}
      </SectionShell>
    </section>
  )
}
