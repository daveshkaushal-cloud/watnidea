'use client'

/* ------------------------------------------------------------------ *
 * DhqConcepts — Section 5 of /the-digital-hq
 *
 * Surface = white (light). Honest "Concept exploration — not client
 * work" label. Shows 1-2 concept tiles, clearly labelled as concept
 * (not real client work). Links to /work.
 *
 * Reads from siteContent.CASE_STUDIES — items with
 * services.includes('the-digital-hq') and verified=false.
 * NO fake clients, NO fake metrics.
 * ------------------------------------------------------------------ */

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Sticker,
  Underline,
  CTAButton,
} from '@/components/site/primitives'
import { CASE_STUDIES } from '@/lib/siteContent'

const DHQ_CONCEPTS = CASE_STUDIES.filter(
  (c) => c.services.includes('the-digital-hq') && !c.verified,
)

export function DhqConcepts() {
  return (
    <Section surface="white" aria-labelledby="dhq-concepts-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel number="04" accent="#3D5AFE">
              Concept exploration
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="dhq-concepts-heading" className="mt-5 max-w-[18ch]">
                Concepts on the <Underline>grid</Underline>.
              </EditorialHeading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Sticker accent="#101010" textColor="#C8F542" tilt="right">
              Not client work
            </Sticker>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-5 max-w-xl text-base text-[#5D5A54]">
            Concept exploration — not client work. Real case studies
            appear here, with permission, once engagements wrap. In the
            meantime, these are studio-side explorations of how a
            marketing site can be fast, accessible and maintainable.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {DHQ_CONCEPTS.map((c, i) => (
            <Reveal key={c.slug} delay={0.24 + i * 0.08}>
              <Link
                href="/work"
                className="group block rounded-[22px] border border-[rgba(16,16,16,0.14)] bg-[#FFFDF8] p-1 shadow-[0_8px_24px_-14px_rgba(16,16,16,0.20)] transition-transform duration-300 hover:-translate-y-1"
                aria-label={`${c.title} — ${c.conceptLabel ?? c.category}`}
              >
                <div
                  className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[18px] p-5"
                  style={{ background: '#3D5AFE', color: '#FFFFFF' }}
                >
                  {/* Blueprint grid overlay */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.18]"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.55) 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="wn-caption text-[rgba(255,255,255,0.85)]">
                      Issue 02 · Digital HQ
                    </span>
                    <span className="rounded-full bg-[rgba(255,253,248,0.92)] px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-[#101010]">
                      {c.conceptLabel ?? 'Concept'}
                    </span>
                  </div>
                  <div className="relative">
                    <span className="font-editorial text-2xl font-bold leading-tight">
                      {c.title}
                    </span>
                    <span className="mt-2 block text-xs opacity-80">
                      {c.summary}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="wn-caption text-[#5D5A54]">
                    {c.category}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#101010] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-10">
            <CTAButton href="/work" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
              See the full concept board
            </CTAButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
