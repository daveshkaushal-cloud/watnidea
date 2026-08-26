'use client'

/* ------------------------------------------------------------------ *
 * DhqProcess — Section 4 of /the-digital-hq
 *
 * Surface = ink (the ONE dark cinematic moment on the page).
 * 4-step process — Audit, Architect, Build, Measure — as numbered
 * cards with blue accents.
 *
 * Art direction: grid-led blueprint feel. White serif type on ink.
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
    t: 'Audit',
    d: 'We map the current site — performance, analytics, accessibility, content hierarchy — before proposing a single fix.',
    accent: '#3D5AFE',
  },
  {
    n: '02',
    t: 'Architect',
    d: 'Design tokens, component primitives, content model and conversion paths — agreed before any surface is built.',
    accent: '#3D5AFE',
  },
  {
    n: '03',
    t: 'Build',
    d: 'Marketing site or product interface shipped on the architecture — fast, accessible, instrumented from day one.',
    accent: '#3D5AFE',
  },
  {
    n: '04',
    t: 'Measure',
    d: 'Real events, real funnels, real baselines. The system gets refined by what users actually do — not opinions.',
    accent: '#3D5AFE',
  },
]

export function DhqProcess() {
  return (
    <Section surface="ink" aria-labelledby="dhq-process-heading">
      <Container>
        <SectionLabel number="03" accent="#3D5AFE">
          Process
        </SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading id="dhq-process-heading" className="mt-5 max-w-[18ch] text-white">
            Build it like a{' '}
            <Underline>system</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[rgba(255,255,255,0.72)] sm:text-lg">
            The same loop on every digital engagement — audit before
            propose, architect before build, measure before scale.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.2 + i * 0.06}>
              <div className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[22px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-6">
                {/* Blueprint grid overlay */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.10]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(61,90,254,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(61,90,254,0.55) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div className="relative flex items-start justify-between">
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
                <div className="relative">
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
