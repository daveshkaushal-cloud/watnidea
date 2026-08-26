'use client'

/* ------------------------------------------------------------------ *
 * KineticProcess — Section 4 of /kinetic-studio
 *
 * Surface = ink (dark cinematic moment). 4-step process — Story, Shoot,
 * Cut, Finish — as numbered cards with orange accents. White serif
 * type on ink. Each step carries a "scene" label.
 *
 * Art direction: cinematic, frame-based.
 * ------------------------------------------------------------------ */

import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Underline,
} from '@/components/site/primitives'

const STEPS: { n: string; t: string; d: string; accent: string; scene: string }[] = [
  {
    n: '01',
    t: 'Story',
    d: 'Beat sheet, treatment, scene structure. The film is written before the shoot is planned — not the other way around.',
    accent: '#F97316',
    scene: 'Pre-production',
  },
  {
    n: '02',
    t: 'Shoot',
    d: 'Direction on set — performance, framing, pace. The story kept in the room, not just on the call sheet.',
    accent: '#F97316',
    scene: 'Production',
  },
  {
    n: '03',
    t: 'Cut',
    d: 'The edit. Pace, rhythm, the moment a film actually becomes a film. Where most films are won or lost.',
    accent: '#F97316',
    scene: 'Post',
  },
  {
    n: '04',
    t: 'Finish',
    d: 'Grade, sound, channel cuts. The layer that makes a film feel finished — and ready for every surface it has to live on.',
    accent: '#F97316',
    scene: 'Finish',
  },
]

export function KineticProcess() {
  return (
    <Section surface="ink" aria-labelledby="kinetic-process-heading">
      <Container>
        <SectionLabel number="03" accent="#F97316">
          Process
        </SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading id="kinetic-process-heading" className="mt-5 max-w-[18ch] text-white">
            Four scenes. One{' '}
            <Underline>cut</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[rgba(255,255,255,0.72)] sm:text-lg">
            The same loop on every film engagement — story before
            shoot, cut before finish, channel cuts before delivery.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.2 + i * 0.06}>
              <div className="flex h-full min-h-[240px] flex-col justify-between rounded-[22px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-6">
                <div className="flex items-start justify-between">
                  <span
                    className="wn-bignum text-5xl"
                    style={{ color: s.accent }}
                  >
                    {s.n}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider"
                    style={{
                      background: s.accent,
                      color: '#FFFFFF',
                    }}
                  >
                    {s.scene}
                  </span>
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-semibold leading-tight text-white">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[rgba(255,255,255,0.72)]">
                    {s.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
