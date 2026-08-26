'use client'

/* ------------------------------------------------------------------ *
 * KineticFaq — Section 6 of /kinetic-studio
 *
 * Surface = paper (light). 5 honest Q&As specific to film / motion
 * engagements — no fake pricing, no invented outcomes.
 *
 * Uses the shared FAQAccordion primitive. Accent = service orange.
 * ------------------------------------------------------------------ */

import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Underline,
  FAQAccordion,
  CTAButton,
} from '@/components/site/primitives'

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Do you shoot, or just direct and edit?',
    a: 'Both. We have an in-house production capability for smaller shoots, and we direct on set for larger productions where a specialised crew is brought in. The story stays with us either way.',
  },
  {
    q: 'How long does a brand film take?',
    a: 'A focused 60–90 second brand film typically runs 4–8 weeks from kickoff to final delivery, depending on shoot complexity, locations and the number of channel cuts.',
  },
  {
    q: 'Can you work with our existing footage?',
    a: 'Yes — we regularly take raw footage and turn it into a finished film. We will be honest about what the footage can support and what it cannot.',
  },
  {
    q: 'Do you handle motion design and animation?',
    a: 'Yes — motion design, type animation, transitions and explainer animation. Motion is treated as part of the story, not a sticker on top of it.',
  },
  {
    q: 'What about rights, music and licensing?',
    a: 'Music licensing, talent rights and usage windows are handled in production — not discovered in delivery. You get a film you can actually use, on the channels you need.',
  },
]

export function KineticFaq() {
  return (
    <Section surface="paper" aria-labelledby="kinetic-faq-heading">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number="05" accent="#F97316">
              FAQ
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="kinetic-faq-heading" className="mt-5 max-w-[14ch]">
                Questions, <Underline>answered</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#5D5A54]">
                The honest version of what a film engagement looks like.
                If something is missing, write to us — we will answer
                plainly.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-6">
                <CTAButton
                  href="mailto:hello@watnidea.com"
                  variant="secondary"
                  aria-label="Email the studio at hello@watnidea.com"
                >
                  hello@watnidea.com
                </CTAButton>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.16}>
              <FAQAccordion items={FAQS} accent="#F97316" />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
