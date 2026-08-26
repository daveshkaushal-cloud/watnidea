'use client'

/**
 * WorkFeaturedConcept — Section 5 of /work
 *
 * The ONE charcoal "featured concept" moment on the Work page
 * (per the design directive: predominantly LIGHT with at most one
 * charcoal moment). This is it.
 *
 * Honest editorial framing of a single concept exploration. NO
 * "Monarch" invented client, NO "₹2.4Cr launch-quarter revenue",
 * NO "92K-person community", NO "sold out in 36 hours" — those
 * invented metrics are gone. We render the concept overview text
 * from `CASE_STUDIES` (verified === false) and link to /work/[slug].
 *
 * If no concept exists, the section renders an honest empty state
 * (still in the charcoal wrapper, still the one dark moment).
 *
 * Composition:
 *   - .wn-dark charcoal wrapper
 *   - Eyebrow: "Featured concept" (amber)
 *   - H2: concept title (font-editorial)
 *   - Concept exploration tag (clearly NOT a real client)
 *   - Overview copy (from the concept's `overview` field)
 *   - Real Next.js <Link> to /work/[slug]
 *
 * Reduced-motion: Reveal collapses to a pure opacity fade.
 */

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/siteContent'
import { Reveal } from '@/components/home/motion'

export function WorkFeaturedConcept() {
  // Pick the first concept exploration as the featured one.
  const concept = CASE_STUDIES.find((c) => !c.verified) ?? null
  const href = concept ? (`/work/${concept.slug}` as const) : '/work'

  return (
    <section
      aria-labelledby="work-featured-heading"
      className="wn-dark relative overflow-hidden bg-[var(--wn-charcoal)] px-5 py-20 text-white sm:px-8 md:py-28"
    >
      {/* Subtle warm ambient glow — decorative only */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-[40vw] w-[40vw] max-h-[460px] max-w-[460px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(242,181,68,0.16), rgba(242,181,68,0) 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-20 h-[36vw] w-[36vw] max-h-[420px] max-w-[420px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(232,70,58,0.16), rgba(232,70,58,0) 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
          <p className="wn-eyebrow text-[var(--wn-amber)]">Featured concept</p>
        </Reveal>

        {concept ? (
          <>
            <Reveal delay={0.08} className="mt-5 block">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/70">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-[var(--wn-amber)]"
                />
                Concept exploration
              </div>
            </Reveal>

            <Reveal delay={0.12} className="block">
              <h2
                id="work-featured-heading"
                className="font-editorial text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white"
              >
                {concept.title}
              </h2>
            </Reveal>

            <Reveal delay={0.2} className="mt-7 block max-w-3xl">
              <p className="font-editorial text-lg leading-relaxed text-white/85 sm:text-xl">
                {concept.overview}
              </p>
            </Reveal>

            <Reveal delay={0.28} className="mt-8 block">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/55">
                <span>
                  <span className="wn-eyebrow mr-1.5 text-white/40">
                    Category
                  </span>
                  <span className="text-white/85">{concept.category}</span>
                </span>
                <span>
                  <span className="wn-eyebrow mr-1.5 text-white/40">Year</span>
                  <span className="text-white/85">{concept.year}</span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.36} className="mt-10 block">
              <Link
                href={href}
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--wn-charcoal)] transition-colors duration-200 hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wn-amber)]"
              >
                <span>Open concept exploration</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </>
        ) : (
          <Reveal delay={0.12} className="mt-5 block max-w-3xl">
            <h2
              id="work-featured-heading"
              className="font-editorial text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em] text-white"
            >
              Concept explorations coming soon.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              No concept explorations published yet. When the studio ships
              internal concept work, the first one will be featured here.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
