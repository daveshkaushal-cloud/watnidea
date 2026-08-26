import type { Metadata } from 'next'
import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { InsightsCoverHero } from '@/components/site/insights/cover-hero'
import { InsightsTopicsGrid } from '@/components/site/insights/topics-grid'
import { InsightsReadingListMarquee } from '@/components/site/insights/reading-list-marquee'
import { InsightsNewsletter } from '@/components/site/insights/newsletter'
import { EndingCTA } from '@/components/site/primitives'

/* ------------------------------------------------------------------ *
 * /insights — Gen-Z studio zine "Editorial Digital Playground"
 *
 * As of today, getVerifiedArticles() returns []. There are no real
 * published essays. Rather than fabricate articles, readership numbers
 * or invented authors, this page surfaces an honest "we're writing our
 * first pieces now" experience across 5 zine-style sections:
 *
 *   1. Cover hero        — paper (light), single <h1>, "Coming soon" sticker,
 *                          IdeaStamp, big "ISSUE 01" graphical number
 *   2. Topics grid       — sand (light), 8 colour-coded topic cards
 *                          with "ESSAY 0X" issue-number styling
 *   3. Reading list      — ink (DARK — the ONE dark moment on the page),
 *                          Marquee of the 8 topics with "Currently writing" sticker
 *   4. Newsletter        — mint (light colour), REAL functional form that
 *                          POSTs to /api/newsletter. Email + honeypot
 *                          `company`. Privacy + Terms links (real <Link>).
 *   5. Final CTA         — red (colour), "Have a project in mind?"
 *
 * Colour rhythm: paper → sand → ink → mint → red.
 *   - 3 light / colour surfaces (paper, sand, mint)
 *   - 1 colour block (red)
 *   - 1 dark moment (ink)
 * Exactly ONE <h1> (the cover). Section titles are <h2>.
 *
 * NO fake articles, NO fake authors, NO fake readership numbers.
 * NO LiquidChrome / ParticleField / CustomCursor / old Navbar/Footer.
 * Shared primitives only.
 *
 * The page is a SERVER component so we can export unique <Metadata>.
 * Each section below is a small client component (for Framer Motion).
 * ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: 'Insights · watNidea',
  description:
    'Essays on brand, craft and growth from the watNidea studio.',
  alternates: { canonical: '/insights' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Insights · watNidea',
    description:
      'Essays on brand, craft and growth from the watNidea studio.',
    type: 'website',
    url: '/insights',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights · watNidea',
    description:
      'Essays on brand, craft and growth from the watNidea studio.',
  },
}

export default function InsightsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />
      <main className="flex-1">
        <InsightsCoverHero />
        <InsightsTopicsGrid />
        <InsightsReadingListMarquee />
        <InsightsNewsletter />
        <EndingCTA
          surface="red"
          eyebrow="Project enquiry"
          title="Have a project in mind?"
          body="Tell us what you're building."
          primaryHref="/book-strategy-call"
          primaryLabel="Book a Strategy Call"
          secondaryHref="mailto:hello@watnidea.com"
          secondaryLabel="Email us"
        />
      </main>
      <SiteFooter />
    </div>
  )
}
