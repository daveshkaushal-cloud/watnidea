'use client'

/* ------------------------------------------------------------------ *
 * DhqFaq — Section 6 of /the-digital-hq
 *
 * Surface = paper (light). 5 honest Q&As specific to digital / web
 * engagements — no fake pricing, no invented outcomes.
 *
 * Uses the shared FAQAccordion primitive (accent = service blue).
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
    q: 'Do you build on our stack or yours?',
    a: 'Both. We work in your existing framework when there is one — Next.js, Astro, Sanity, Contentful, Shopify — and we will tell you plainly if the stack is part of the problem.',
  },
  {
    q: 'How long does a marketing site build take?',
    a: 'A focused marketing site runs 4–8 weeks depending on scope, content readiness and the design system that already exists. We will give you an honest estimate after the audit.',
  },
  {
    q: 'Do you handle design and engineering?',
    a: 'Yes — design, frontend engineering and analytics instrumentation sit in the same studio. Handoff is not a meeting; it is a conversation down the table.',
  },
  {
    q: 'What about accessibility?',
    a: 'WCAG 2.2 AA is a baseline, not a post-launch checklist. We ship with semantic HTML, keyboard nav, focus states, colour contrast and a screen-reader pass on every page.',
  },
  {
    q: 'Do we own the code and the design system?',
    a: 'Yes — code, tokens, components, content model and documentation are yours on launch. No vendor lock-in, no proprietary platform.',
  },
]

export function DhqFaq() {
  return (
    <Section surface="paper" aria-labelledby="dhq-faq-heading">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number="05" accent="#3D5AFE">
              FAQ
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="dhq-faq-heading" className="mt-5 max-w-[14ch]">
                Questions, <Underline>answered</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#5D5A54]">
                The honest version of what a digital engagement looks
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
              <FAQAccordion items={FAQS} accent="#3D5AFE" />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
