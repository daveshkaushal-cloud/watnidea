'use client'

import { EndingCTA } from '@/components/site/primitives'

/* ------------------------------------------------------------------ *
 * WorkFinalCta — Section 5 of /work
 *
 * Full-colour ending CTA on yellow surface. Honest copy, real CTAs
 * (no href="#"). The page&apos;s only dark moment was the studio
 * note above; this closes the page on a bright, inviting note.
 * ------------------------------------------------------------------ */

export function WorkFinalCta() {
  return (
    <EndingCTA
      surface="yellow"
      eyebrow="Be the first"
      title="Want to be the first case study?"
      body="Tell us what you're building — we'll tell you if it's a fit."
      primaryHref="/book-strategy-call"
      primaryLabel="Book a Strategy Call"
      secondaryHref="mailto:hello@watnidea.com"
      secondaryLabel="Email us"
    />
  )
}
