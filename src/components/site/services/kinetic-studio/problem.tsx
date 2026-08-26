'use client'

/* ------------------------------------------------------------------ *
 * KineticProblem — Section 2 of /kinetic-studio
 *
 * Surface = paper (light). Split editorial — left heading with an
 * orange hand-drawn Underline on the key phrase, right body + bullet
 * list of the client problems this service solves.
 *
 * Honest copy about the actual problems Kinetic Studio addresses —
 * pretty films with no story, motion without message, edit forgotten
 * in production, formats that do not match the channel.
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
    t: 'Pretty, no story.',
    d: 'A beautiful film nobody remembers the next day. The grade is perfect, the edit is forgettable, the message is missing.',
  },
  {
    t: 'Motion without message.',
    d: 'Animated logos and transitions that look great in a deck — and add nothing to the brand or the conversion.',
  },
  {
    t: 'Edit forgotten in production.',
    d: 'A shoot that looked great on set, then cannot be cut to anything because nobody planned the story first.',
  },
  {
    t: 'Wrong format for the channel.',
    d: 'A 90-second hero film cut down for vertical — and the vertical reads like an afterthought, because it was.',
  },
]

export function KineticProblem() {
  return (
    <Section surface="paper" aria-labelledby="kinetic-problem-heading">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01" accent="#F97316">
              The brief
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="kinetic-problem-heading" className="mt-5 max-w-[14ch]">
                Most brand films are{' '}
                <Underline>expensive wallpaper</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6">
                <Sticker accent="#F97316" textColor="#FFFFFF" tilt="right">
                  Story over polish
                </Sticker>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.16}>
              <p className="text-lg leading-relaxed text-[#101010] opacity-85">
                A film is not a deliverable — it is the moment a story
                has to land in 6, 30 or 90 seconds. When the story is
                missing, the polish cannot replace it. When the edit
                is forgotten in production, no grade can save it.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                {PROBLEMS.map((p) => (
                  <li key={p.t} className="border-l-2 border-[#F97316] pl-4">
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
