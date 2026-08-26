'use client'

/* ------------------------------------------------------------------ *
 * AuraFaq — Section 6 of /aura-architecture
 *
 * Surface = paper (light). 5 honest Q&As specific to brand identity
 * engagements — no fake pricing, no invented outcomes.
 *
 * Uses the shared FAQAccordion primitive (accent = service red).
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
    q: 'How long does a brand identity engagement take?',
    a: 'A full identity system runs roughly 6–10 weeks depending on scope. Sprints are available for focused deliverables — a naming pass, a visual refresh, a single surface.',
  },
  {
    q: 'Do you work with early-stage brands or only established ones?',
    a: 'Both. We build identities for brands finding their voice, and rebrand category leaders. The process scales to where you are — the rigour does not.',
  },
  {
    q: 'Do we own the final identity?',
    a: 'Yes — every asset, working file and guideline is yours on launch. No lock-in, no retainers required to keep using the system.',
  },
  {
    q: 'Can you refresh an existing brand instead of starting from scratch?',
    a: 'Yes. We audit what you have, preserve what is working, and rebuild what is not. Refinement is often smarter than reinvention.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a Strategy Call. A 30-minute working session — not a sales pitch — where we look at what you have and map what the system needs to do.',
  },
]

export function AuraFaq() {
  return (
    <Section surface="paper" aria-labelledby="aura-faq-heading">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number="05" accent="#F13D32">
              FAQ
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="aura-faq-heading" className="mt-5 max-w-[14ch]">
                Questions, <Underline>answered</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#5D5A54]">
                The honest version of what an identity engagement looks
                like. If something is missing, write to us — we will
                answer plainly.
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
              <FAQAccordion items={FAQS} accent="#F13D32" />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
