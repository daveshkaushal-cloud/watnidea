'use client'

/* ------------------------------------------------------------------ *
 * KineticConcepts — Section 5 of /kinetic-studio
 *
 * Surface = white (light). Honest "Concept exploration — not client
 * work" label. Shows 1-2 concept tiles, clearly labelled as concept
 * (not real client work). Links to /work.
 *
 * There are no verified case studies tagged 'kinetic-studio' yet,
 * so these are studio-side concept frames — explicitly NOT real
 * client work. NO fake clients, NO fake metrics.
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

const CONCEPT_FRAMES: {
  slug: string
  title: string
  summary: string
  accent: string
  dark: boolean
}[] = [
  {
    slug: 'kinetic-brand-film-frame',
    title: 'Brand film frame',
    summary:
      'A concept frame for a 60-second brand film — beat sheet, scene structure, and the edit principle that would hold it together across every cut-down.',
    accent: '#F97316',
    dark: false,
  },
  {
    slug: 'kinetic-content-series-frame',
    title: 'Content series frame',
    summary:
      'A concept frame for a recurring content series — the format, the cadence and the editorial hook that could let a brand ship weekly without burning out.',
    accent: '#101010',
    dark: true,
  },
]

export function KineticConcepts() {
  return (
    <Section surface="white" aria-labelledby="kinetic-concepts-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel number="04" accent="#F97316">
              Concept exploration
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="kinetic-concepts-heading" className="mt-5 max-w-[18ch]">
                Frames from the{' '}
                <Underline>cutting room</Underline>.
              </EditorialHeading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Sticker accent="#101010" textColor="#F97316" tilt="right">
              Not client work
            </Sticker>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-5 max-w-xl text-base text-[#5D5A54]">
            Concept exploration — not client work. Real case studies
            appear here, with permission, once engagements wrap. In the
            meantime, these are studio-side concept frames for what a
            story-led brand film or content series could look like.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {CONCEPT_FRAMES.map((c, i) => (
            <Reveal key={c.slug} delay={0.24 + i * 0.08}>
              <Link
                href="/work"
                className="group block rounded-[22px] border border-[rgba(16,16,16,0.14)] bg-[#FFFDF8] p-1 shadow-[0_8px_24px_-14px_rgba(16,16,16,0.20)] transition-transform duration-300 hover:-translate-y-1"
                aria-label={`${c.title} — Concept exploration`}
              >
                <div
                  className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[18px] p-5"
                  style={{
                    background: c.accent,
                    color: c.dark ? '#FFFFFF' : '#101010',
                  }}
                >
                  <span
                    aria-hidden
                    className={
                      c.dark
                        ? 'wn-halftone-light absolute inset-0 opacity-25'
                        : 'wn-halftone absolute inset-0 opacity-25'
                    }
                  />
                  {/* Film frame corners */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2"
                    style={{ borderColor: c.dark ? 'rgba(255,255,255,0.4)' : 'rgba(16,16,16,0.4)' }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2"
                    style={{ borderColor: c.dark ? 'rgba(255,255,255,0.4)' : 'rgba(16,16,16,0.4)' }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2"
                    style={{ borderColor: c.dark ? 'rgba(255,255,255,0.4)' : 'rgba(16,16,16,0.4)' }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2"
                    style={{ borderColor: c.dark ? 'rgba(255,255,255,0.4)' : 'rgba(16,16,16,0.4)' }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span
                      className="wn-caption"
                      style={{
                        color: c.dark ? 'rgba(255,255,255,0.85)' : 'rgba(16,16,16,0.66)',
                      }}
                    >
                      Issue 04 · Kinetic
                    </span>
                    <span
                      className="rounded-full px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider"
                      style={{
                        background: c.dark ? 'rgba(255,253,248,0.92)' : 'rgba(16,16,16,0.10)',
                        color: '#101010',
                      }}
                    >
                      Concept
                    </span>
                  </div>
                  <div className="relative">
                    <span className="font-editorial text-2xl font-bold leading-tight">
                      {c.title}
                    </span>
                    <span
                      className="mt-2 block text-xs"
                      style={{ opacity: 0.78 }}
                    >
                      {c.summary}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="wn-caption text-[#5D5A54]">
                    Concept frame
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
