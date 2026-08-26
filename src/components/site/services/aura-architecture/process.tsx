'use client'

/* ------------------------------------------------------------------ *
 * AuraProcess — Section 4 of /aura-architecture
 *
 * Surface = ink (the ONE dark cinematic moment on the page).
 * 4-step process — Discover, Define, Design, Refine — as numbered
 * cards with red / coral accents.
 *
 * Art direction: editorial, typographic. White serif type on ink.
 * ------------------------------------------------------------------ */

import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Underline,
} from '@/components/site/primitives'

const STEPS: { n: string; t: string; d: string; accent: string }[] = [
  {
    n: '01',
    t: 'Discover',
    d: 'We audit the market, the audience and the whitespace the brand can honestly own.',
    accent: '#FF6B62',
  },
  {
    n: '02',
    t: 'Define',
    d: 'Positioning, voice, message architecture — locked before any pixel is moved.',
    accent: '#F13D32',
  },
  {
    n: '03',
    t: 'Design',
    d: 'Visual identity built across type, mark, colour, grid and motion — pressure-tested as a system.',
    accent: '#FF6B62',
  },
  {
    n: '04',
    t: 'Refine',
    d: 'We tighten the work until every element earns its place, then hand over guidelines the team will actually use.',
    accent: '#F13D32',
  },
]

export function AuraProcess() {
  return (
    <Section surface="ink" aria-labelledby="aura-process-heading">
      <Container>
        <SectionLabel number="03" accent="#F13D32">
          Process
        </SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading id="aura-process-heading" className="mt-5 max-w-[18ch] text-white">
            Four steps. <Underline>No theatre</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[rgba(255,255,255,0.72)] sm:text-lg">
            The same loop on every identity engagement — strategy
            first, system second, surface last.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.2 + i * 0.06}>
              <div className="flex h-full min-h-[220px] flex-col justify-between rounded-[22px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-6">
                <div className="flex items-start justify-between">
                  <span
                    className="wn-bignum text-5xl"
                    style={{ color: s.accent }}
                  >
                    {s.n}
                  </span>
                  <span
                    aria-hidden
                    className="h-3 w-3 rounded-full"
                    style={{ background: s.accent }}
                  />
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
