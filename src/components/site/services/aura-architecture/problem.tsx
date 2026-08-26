'use client'

/* ------------------------------------------------------------------ *
 * AuraProblem — Section 2 of /aura-architecture
 *
 * Surface = paper (light). Split editorial — left heading with a red
 * hand-drawn Underline on the key phrase, right body + bullet list of
 * the client problems this service solves.
 *
 * Honest copy: about the actual problem Aura Architecture addresses —
 * brands that look fine but sound forgettable, identity that doesn't
 * scale, logos that feel template. NO invented metrics.
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
    t: 'Looks fine, sounds forgettable.',
    d: 'The deck is polished, the logo is decent — but nobody can describe the brand without using its category.',
  },
  {
    t: 'Identity that doesn\u2019t scale.',
    d: 'A wordmark that works on a deck breaks on a billboard, an app icon, or a packaging label.',
  },
  {
    t: 'Inconsistent across surfaces.',
    d: 'Different type on the website, the socials, the pitch — every team pulling in its own direction.',
  },
  {
    t: 'No verbal identity.',
    d: 'The visual is locked, the voice is not. Every post reads like a different brand wrote it.',
  },
]

export function AuraProblem() {
  return (
    <Section surface="paper" aria-labelledby="aura-problem-heading">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01" accent="#F13D32">
              The brief
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="aura-problem-heading" className="mt-5 max-w-[14ch]">
                Most brands look fine. They sound{' '}
                <Underline>forgettable</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6">
                <Sticker accent="#F13D32" textColor="#FFFFFF" tilt="right">
                  Identity gap
                </Sticker>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.16}>
              <p className="text-lg leading-relaxed text-[#101010] opacity-85">
                A brand is not a logo. It is the system that lets one
                team, one product, one campaign after another sound
                like the same idea — across every surface it touches.
                When that system is missing, the brand slowly dissolves
                into its category.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                {PROBLEMS.map((p) => (
                  <li key={p.t} className="border-l-2 border-[#F13D32] pl-4">
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
