'use client'

/* ------------------------------------------------------------------ *
 * DhqDeliverables — Section 3 of /the-digital-hq
 *
 * Surface = sand (light). 6 deliverables as colour-coded cards with
 * blue / electric blue accents. "Blueprint" feel — each card carries
 * a small grid overlay.
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

const DELIVERABLES: { n: string; t: string; d: string; accent: string }[] = [
  {
    n: '01',
    t: 'Design systems',
    d: 'A token, component and pattern library that lets any designer extend the product without breaking it.',
    accent: '#3D5AFE',
  },
  {
    n: '02',
    t: 'Marketing sites',
    d: 'Fast, accessible, conversion-led — built so marketing can publish without engineering every time.',
    accent: '#3D5AFE',
  },
  {
    n: '03',
    t: 'Product interfaces',
    d: 'Application UI — dashboards, onboarding, settings — designed for real workflows, not just for screens.',
    accent: '#3D5AFE',
  },
  {
    n: '04',
    t: 'Component libraries',
    d: 'Versioned, documented, accessible. Ship once, reuse across web, app and partner surfaces.',
    accent: '#101010',
  },
  {
    n: '05',
    t: 'Performance budgets',
    d: 'Bundle, image and runtime budgets set up front — and enforced in CI, not discovered in the wild.',
    accent: '#3D5AFE',
  },
  {
    n: '06',
    t: 'Analytics + a11y',
    d: 'Real event instrumentation and an accessibility baseline that ships with the build, not after it.',
    accent: '#101010',
  },
]

export function DhqDeliverables() {
  return (
    <Section surface="sand" aria-labelledby="dhq-deliverables-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel number="02" accent="#3D5AFE">
              What we create
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="dhq-deliverables-heading" className="mt-5 max-w-[18ch]">
                Six deliverables. One{' '}
                <Underline>architecture</Underline>.
              </EditorialHeading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Sticker accent="#101010" textColor="#C8F542" tilt="right">
              Built to be maintained
            </Sticker>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-5 max-w-xl text-base text-[#5D5A54]">
            Treat the website as a system, not a project. Each item
            below ships as part of one architecture — so launch is the
            beginning, not the end.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((d, i) => (
            <Reveal key={d.n} delay={0.24 + i * 0.06}>
              <article
                className="relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.10)] bg-[#FFFDF8] p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Blueprint grid overlay */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #3D5AFE 1px, transparent 1px), linear-gradient(to bottom, #3D5AFE 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
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
