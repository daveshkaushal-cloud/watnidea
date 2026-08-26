'use client'

/* ------------------------------------------------------------------ *
 * DhqProblem — Section 2 of /the-digital-hq
 *
 * Surface = white (light). Split editorial — left heading with a blue
 * hand-drawn Underline on the key phrase, right body + bullet list of
 * the client problems this service solves.
 *
 * Honest copy about the actual problems Digital HQ addresses — broken
 * funnels, slow sites, disconnected systems, beautiful-on-the-surface
 * but confusing-underneath user journeys.
 * ------------------------------------------------------------------ */

import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Underline,
  Sticker,
} from '@/components/site/primitives'

const PROBLEMS: { t: string; d: string }[] = [
  {
    t: 'Broken funnels.',
    d: 'Visitors land. They leave. There is no clear path from arrival to action — and no analytics surface to show why.',
  },
  {
    t: 'Slow websites.',
    d: 'Every extra second of load time costs real customers. Most marketing sites ship with a third of the bundle unused.',
  },
  {
    t: 'Disconnected systems.',
    d: 'Website, CRM, analytics, ads — none of them talking. Each team holding its own spreadsheet of the truth.',
  },
  {
    t: 'Beautiful on the surface.',
    d: 'Polished in the deck, confusing underneath. No design system, no component library, no way to scale without breaking.',
  },
]

export function DhqProblem() {
  return (
    <Section surface="white" aria-labelledby="dhq-problem-heading">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01" accent="#3D5AFE">
              The brief
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="dhq-problem-heading" className="mt-5 max-w-[14ch]">
                Most websites are{' '}
                <Underline>brochures</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6">
                <Sticker accent="#3D5AFE" textColor="#FFFFFF" tilt="right">
                  Yours should be an asset
                </Sticker>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.16}>
              <p className="text-lg leading-relaxed text-[#101010] opacity-85">
                A website is not a brochure. It is the front door of the
                business, the moment of conversion, and the system that
                lets marketing ship without engineering debt. When it is
                treated as a one-off project, every team after launch
                pays for it.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                {PROBLEMS.map((p) => (
                  <li key={p.t} className="border-l-2 border-[#3D5AFE] pl-4">
                    <p className="font-editorial text-base font-semibold leading-tight text-[#101010]">
                      {p.t}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#5D5A54]">
                      {p.d}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
