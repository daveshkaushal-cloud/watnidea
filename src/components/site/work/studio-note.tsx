'use client'

import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Underline,
  Sticker,
  IdeaStamp,
} from '@/components/site/primitives'

/* ------------------------------------------------------------------ *
 * StudioNote — Section 4 of /work
 *
 * The single dark moment of the page. Honest explanation of why
 * /work is "coming soon" — the studio values permission and real
 * outcomes over a padded portfolio. No fake metrics, no invented
 * clients, no composite testimonials.
 *
 * Surface = ink (charcoal). Yellow + red accents only. ONE h2.
 * ------------------------------------------------------------------ */

export function StudioNote() {
  return (
    <Section surface="ink" ariaLabelledBy="studio-note-heading">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel number="03" accent="#FFC83D">
              Studio note
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading
                id="studio-note-heading"
                className="mt-5 max-w-[20ch] text-white"
              >
                Why is the work page{' '}
                <Underline>coming soon?</Underline>
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[rgba(255,255,255,0.80)] sm:text-lg">
                Because we won&apos;t show work we&apos;re not allowed to
                show, and we won&apos;t invent work that didn&apos;t
                happen. A real case study means a real brief, a real
                engagement, a real outcome — and permission to publish.
                That takes time, and we&apos;d rather wait than pad the
                portfolio.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[rgba(255,255,255,0.72)]">
                Until then, this archive is a working sketchbook —
                concept explorations that show how the studio thinks,
                clearly labelled. When the first signed-off engagement
                wraps, it lives here with the brief, the approach, and
                the actual outcome. No composites.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-8 flex flex-wrap gap-2">
                <Sticker accent="#FFC83D" textColor="#101010" tilt="left">
                  Permission first
                </Sticker>
                <Sticker accent="#F13D32" textColor="#FFFFFF" tilt="right">
                  Outcomes, not theatre
                </Sticker>
                <Sticker
                  accent="rgba(255,255,255,0.08)"
                  textColor="#FFFFFF"
                  tilt="none"
                >
                  No composites
                </Sticker>
              </div>
            </Reveal>
          </div>

          {/* Right column — IdeaStamp seal */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.2}>
              <div className="relative flex min-h-[260px] items-center justify-center rounded-[22px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-8">
                <IdeaStamp label="What an idea" size={180} color="#FFC83D" />
              </div>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-4 text-center text-xs text-[rgba(255,255,255,0.56)]">
                The studio seal — conceptual, not contractual.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
