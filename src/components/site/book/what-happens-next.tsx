'use client'

import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Sticker,
} from '@/components/site/primitives'

/* ------------------------------------------------------------------ *
 * WhatHappensNext — three small honest steps on sand.
 * "Compact, honest" — small numerals, short copy.
 * ------------------------------------------------------------------ */

const STEPS = [
  {
    n: '1',
    t: 'We read your note',
    d: 'A real human reads your brief — not an automated filter.',
  },
  {
    n: '2',
    t: 'We reply within 1–2 business days',
    d: 'A short note back with a few times to choose from.',
  },
  {
    n: '3',
    t: 'We book a 30-min call',
    d: 'No deck, no script. A working conversation about your brand.',
  },
] as const

export function WhatHappensNext() {
  return (
    <Section surface="sand" ariaLabelledBy="whats-next-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel number="01" accent="#F13D32">
              What happens next
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="whats-next-heading" className="mt-5 max-w-[18ch]">
                Three small steps. No surprises.
              </EditorialHeading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Sticker accent="#FFFDF8" textColor="#101010" tilt="right">
              Honest by default
            </Sticker>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.2 + i * 0.08}>
              <div className="flex h-full flex-col gap-3 rounded-[18px] border border-[rgba(16,16,16,0.12)] bg-[#FFFDF8] p-6 shadow-[0_8px_24px_-14px_rgba(16,16,16,0.18)]">
                <span
                  className="font-editorial text-5xl font-bold leading-none text-[#F13D32]"
                  aria-hidden
                >
                  {s.n}
                </span>
                <h3 className="font-editorial text-xl font-semibold leading-tight text-[#101010]">
                  {s.t}
                </h3>
                <p className="text-sm leading-relaxed text-[#5D5A54]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
