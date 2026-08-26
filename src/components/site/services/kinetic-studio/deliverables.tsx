'use client'

/* ------------------------------------------------------------------ *
 * KineticDeliverables — Section 3 of /kinetic-studio
 *
 * Surface = sand (light). 6 deliverables as colour-coded cards with
 * orange / ink accents. Each card carries a "scene" label (film-frame
 * motif).
 *
 * Honest copy — names what we actually ship. NO fake metrics.
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
  scene: string
  accent: string
}[] = [
  {
    n: '01',
    t: 'Concept',
    d: 'The story before the shoot. Beat sheet, treatment, the scene structure every frame hangs on.',
    scene: 'Pre-production',
    accent: '#F97316',
  },
  {
    n: '02',
    t: 'Direction',
    d: 'On-set creative direction — performance, framing, pace. The story kept in the room, not just on the call sheet.',
    scene: 'Production',
    accent: '#F97316',
  },
  {
    n: '03',
    t: 'Edit',
    d: 'The cut. The pace. The moment the film actually becomes a film — and the place most films are won or lost.',
    scene: 'Post-production',
    accent: '#F97316',
  },
  {
    n: '04',
    t: 'Motion design',
    d: 'Type, graphics, transitions. Designed to belong to the brand, not borrowed from a template.',
    scene: 'Motion',
    accent: '#101010',
  },
  {
    n: '05',
    t: 'Sound & grade',
    d: 'Music, sound design, colour. The layer that makes a film feel finished — not just delivered.',
    scene: 'Finish',
    accent: '#101010',
  },
  {
    n: '06',
    t: 'Channel cuts',
    d: 'Hero film, vertical, 6-second, 15-second — cut from the same story, not resized from the same file.',
    scene: 'Delivery',
    accent: '#F97316',
  },
]

export function KineticDeliverables() {
  return (
    <Section surface="sand" aria-labelledby="kinetic-deliverables-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel number="02" accent="#F97316">
              What we create
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="kinetic-deliverables-heading" className="mt-5 max-w-[18ch]">
                Six deliverables. One{' '}
                <Underline>cut</Underline>.
              </EditorialHeading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Sticker accent="#101010" textColor="#F97316" tilt="right">
              Concept to final cut
            </Sticker>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-5 max-w-xl text-base text-[#5D5A54]">
            A film is a system, not a deliverable. Each item below ships
            as part of one story — from beat sheet to final channel
            cut.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((d, i) => (
            <Reveal key={d.n} delay={0.24 + i * 0.06}>
              <article
                className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.10)] bg-[#FFFDF8] p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="wn-bignum text-4xl"
                    style={{ color: d.accent }}
                  >
                    {d.n}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider"
                    style={{
                      background: 'rgba(16,16,16,0.06)',
                      color: d.accent,
                    }}
                  >
                    {d.scene}
                  </span>
                </div>
                <div>
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
