'use client'

/* ------------------------------------------------------------------ *
 * InsightsReadingListMarquee — Section 3 of /insights
 *
 * The ONE dark moment on the page. A horizontal "reading list"
 * marquee on the ink surface, listing the 8 topics the studio plans
 * to explore.
 *
 *   - surface="ink" (dark cinematic)
 *   - Marquee of 8 topics, each marked with an ESSAY NN tag
 *   - "Currently writing" Sticker (yellow on dark)
 *   - Editorial headline above the marquee
 *
 * No fake readership counts. The marquee is a visual "we're working on
 * this" reminder — pure typography in motion.
 * ------------------------------------------------------------------ */

import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Sticker,
  Marquee,
} from '@/components/site/primitives'

const READING_LIST: string[] = [
  'Identity systems',
  'Naming & voice',
  'The craft of the edit',
  'Performance creative',
  'AI in concepting',
  'Building content engines',
  'Search & authority',
  'Websites that perform',
]

export function InsightsReadingListMarquee() {
  return (
    <Section surface="ink" ariaLabelledBy="insights-reading-list-heading">
      <Container>
        {/* Heading row */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <SectionLabel number="02" accent="#FFC83D">
              Currently writing
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading
                id="insights-reading-list-heading"
                className="mt-5 max-w-[18ch] text-white"
              >
                The reading list, in progress.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                No archive yet — just the topics we&rsquo;re sitting with
                right now. The first essay lands when it&rsquo;s ready,
                not before.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Sticker accent="#FFC83D" textColor="#101010" tilt="left">
              Currently writing
            </Sticker>
          </Reveal>
        </div>
      </Container>

      {/* Marquee — full-bleed, dark text on dark surface but white items */}
      <Reveal delay={0.24}>
        <div className="mt-12 border-y border-white/15 py-6">
          <Marquee
            items={READING_LIST}
            separator="✦"
            className="text-white [&_.wn-marquee__track]:gap-12"
          />
        </div>
      </Reveal>

      <Container>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col gap-3 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {READING_LIST.length} threads on the studio desk ·
              <span className="ml-1 text-white/70">{READING_LIST.length} essays planned</span>
            </p>
            <p>Updated as we publish — never as we pitch.</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
