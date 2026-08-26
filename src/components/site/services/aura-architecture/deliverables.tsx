'use client'

/* ------------------------------------------------------------------ *
 * AuraDeliverables — Section 3 of /aura-architecture
 *
 * Surface = sand (light). 6 deliverables as small colour-coded cards.
 * Each card carries the service accent (red / coral).
 *
 * Honest copy — names what we actually create. NO numeric claims.
 * ------------------------------------------------------------------ */

import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Sticker,
  Underline,
} from '@/components/site/primitives'

const DELIVERABLES: {
  n: string
  t: string
  d: string
  accent: string
  dark: boolean
}[] = [
  {
    n: '01',
    t: 'Brand strategy',
    d: 'Positioning, audience, message architecture — the foundation every visual decision rests on.',
    accent: '#F13D32',
    dark: false,
  },
  {
    n: '02',
    t: 'Naming & voice',
    d: 'A name that travels, and a verbal identity that holds across decks, socials and product.',
    accent: '#FF6B62',
    dark: false,
  },
  {
    n: '03',
    t: 'Visual identity',
    d: 'Wordmark, type, colour, mark — designed to behave across digital, print and motion.',
    accent: '#F13D32',
    dark: false,
  },
  {
    n: '04',
    t: 'Identity system',
    d: 'Grid, rhythm, motion principles — so any designer can extend the brand without breaking it.',
    accent: '#101010',
    dark: false,
  },
  {
    n: '05',
    t: 'Creative direction',
    d: 'Art direction for the first campaign, the first film, the first product launch.',
    accent: '#FF6B62',
    dark: false,
  },
  {
    n: '06',
    t: 'Brand guidelines',
    d: 'A practical document — not a 200-page PDF nobody opens — that keeps the brand honest at scale.',
    accent: '#F13D32',
    dark: false,
  },
]

export function AuraDeliverables() {
  return (
    <Section surface="sand" aria-labelledby="aura-deliverables-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel number="02" accent="#F13D32">
              What we create
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="aura-deliverables-heading" className="mt-5 max-w-[18ch]">
                Six deliverables. One{' '}
                <Underline>system</Underline>.
              </EditorialHeading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Sticker accent="#101010" textColor="#FFC83D" tilt="right">
              Honest by default
            </Sticker>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-5 max-w-xl text-base text-[#5D5A54]">
            Identity is a system, not a logo. Each item below ships as
            part of the same architecture — so the brand stays
            recognisable whether it appears on a deck, a billboard or an
            app icon.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((d, i) => (
            <Reveal key={d.n} delay={0.24 + i * 0.06}>
              <article
                className="relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.10)] bg-[#FFFDF8] p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span aria-hidden className="wn-halftone absolute inset-0 opacity-10" />
                <div className="relative flex items-start justify-between">
                  <span
                    className="wn-bignum text-4xl"
                    style={{ color: d.accent }}
                  >
                    {d.n}
                  </span>
                  <span
                    aria-hidden
                    className="h-3 w-3 rounded-full"
                    style={{ background: d.accent }}
                  />
                </div>
                <div className="relative">
                  <h3 className="font-editorial text-xl font-semibold leading-tight text-[#101010]">
                    {d.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5D5A54]">
                    {d.d}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
