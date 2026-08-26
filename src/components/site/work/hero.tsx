'use client'

import {
  PageHero,
  Sticker,
  IdeaStamp,
} from '@/components/site/primitives'

/* ------------------------------------------------------------------ *
 * WorkHero — Section 1 of /work
 *
 * Editorial "studio archive" hero on paper surface. Honest copy:
 *   - Eyebrow: "Studio archive"
 *   - Title (ONE h1): "Selected work, coming soon."
 *   - Subtitle: explicit about why (we are selective; concept
 *     explorations only until engagements wrap, with permission)
 *
 * Decorative motifs (all from shared primitives):
 *   - Sticker "Coming soon" tilted right
 *   - IdeaStamp top-right ("What an idea")
 *
 * Honesty: no invented client names, metrics, or testimonials.
 * ------------------------------------------------------------------ */

export function WorkHero() {
  return (
    <div className="relative">
      <PageHero
        surface="paper"
        eyebrow="Studio archive"
        accent="#F13D32"
        title={
          <span>
            Selected work,{' '}
            <span style={{ color: '#F13D32' }}>coming soon.</span>
          </span>
        }
        subtitle={
          <>
            We&apos;re selective about what we show. Real case studies
            appear here, with permission, once engagements wrap. Until
            then — concept explorations, clearly labelled.
          </>
        }
      >
        {/* Sticker — Coming soon, tilted right */}
        <div className="inline-block">
          <Sticker
            accent="#101010"
            textColor="#FFC83D"
            tilt="right"
            style={{ fontSize: '0.85rem', fontWeight: 700 }}
          >
            Coming soon
          </Sticker>
        </div>
      </PageHero>

      {/* IdeaStamp — top-right corner of the hero section (desktop only) */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-[88px] hidden lg:block xl:right-12"
      >
        <IdeaStamp label="What an idea" size={112} color="#F13D32" />
      </span>
    </div>
  )
}
