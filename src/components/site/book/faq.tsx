'use client'

import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  FAQAccordion,
  CTAButton,
  Underline,
} from '@/components/site/primitives'
import { site } from '@/lib/siteContent'
import { Mail } from 'lucide-react'

/* ------------------------------------------------------------------ *
 * BookFaq — compact FAQ on the dark "ink" moment.
 * 5 honest Q&As + a closing mailto secondary CTA.
 * One <h2> for the section title; each Q is wrapped by FAQAccordion's <h3>.
 * ------------------------------------------------------------------ */

const FAQ_ITEMS = [
  {
    q: 'How long is the call?',
    a: 'About 30 minutes. Long enough to understand your brand and goals, short enough to respect your calendar. We come prepared, so most of the time is yours.',
  },
  {
    q: 'What does it cost?',
    a: 'The strategy call itself is free — it’s how we figure out together whether we’re a fit. If we are, we’ll follow up with a scoped proposal and a transparent quote. No surprise invoices, ever.',
  },
  {
    q: 'What’s the process after the call?',
    a: 'If we’re a fit, we send a short proposal within a few business days: scope, timeline, deliverables and price. Once you sign off, we kick off with a discovery session and move into the work itself.',
  },
  {
    q: 'Do you work with early-stage startups?',
    a: 'Yes. We work with founders, D2C brands, creators and culture-led businesses at many stages. If you’re early, we’ll be honest about what’s worth doing now versus what can wait.',
  },
  {
    q: 'How do we communicate during an engagement?',
    a: 'A shared workspace, regular check-ins and direct access to the people doing the work. We keep communication tight — no account-manager layers, no status-report theatre.',
  },
] as const

export function BookFaq() {
  return (
    <Section surface="ink" ariaLabelledBy="faq-heading">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Heading column */}
          <div className="lg:col-span-5">
            <SectionLabel number="04" accent="#FFC83D">
              Before you book
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="faq-heading" className="mt-5 max-w-[18ch] text-white">
                Quick answers, <Underline>no theatre</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[rgba(255,255,255,0.72)]">
                Five things people usually want to know before they send the
                brief. If something else is on your mind, just email us — we
                reply to every message.
              </p>
            </Reveal>
          </div>

          {/* Accordion column */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="rounded-[18px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-4 sm:p-6">
                <FAQAccordion items={FAQ_ITEMS} accent="#F13D32" onDark />
              </div>
            </Reveal>

            {/* Closing mailto secondary CTA */}
            <Reveal delay={0.32}>
              <div className="mt-8 flex flex-col items-start gap-4 rounded-[18px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.03)] p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-editorial text-xl font-semibold text-white sm:text-2xl">
                    Still have a question?
                  </p>
                  <p className="mt-1 text-sm text-[rgba(255,255,255,0.70)]">
                    Email us directly — {site.email}
                  </p>
                </div>
                <CTAButton
                  href={`mailto:${site.email}`}
                  variant="secondary"
                  className="border-white/30 text-white hover:bg-white/10"
                  icon={<Mail className="h-4 w-4" />}
                >
                  Email the studio
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
