/* ------------------------------------------------------------------ *
 * /work — Creative Portfolio page.
 *
 * 8 visible sections + Final CTA. Exactly ONE <h1> (the hero).
 * All section titles are <h2> via `EditorialHeading`.
 * Concept titles, capability titles, process steps and FAQs use <h3>.
 * The Final CTA renders its own <h2> (id="work-final-heading").
 *
 * Colour rhythm: paper (hero) → sand (ideas) → paper (explorations) →
 *   white (capabilities) → ink (process — the ONE dark section) →
 *   sand (honest context) → paper (FAQ) → red (final CTA).
 * ≈ 5 light + 1 dark + 1 colour block. Matches "one dark section maximum".
 *
 * Honesty:
 *   - All 8 concept explorations labelled "Concept exploration — not client work".
 *   - NO invented clients, metrics, testimonials, awards or results.
 *   - NO fake revenue/engagement/ranking/conversion/growth figures.
 *   - Client privacy respected — no unverified client work shown.
 *
 * Uses ONLY shared primitives + the new section components in
 * `@/components/site/work/sections.tsx`.
 * ------------------------------------------------------------------ */

import type { Metadata } from 'next'
import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import {
  WorkHero,
  WorkIdeas,
  WorkExplorations,
  WorkCapabilities,
  WorkProcess,
  WorkHonestContext,
  WorkFaq,
  WorkFinalCta,
} from '@/components/site/work/sections'
import { WORK_FAQS } from '@/lib/work-faq-data'
import { site } from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Creative Work & Concept Explorations · watNidea',
  description:
    'Explore watNidea’s creative work — brand identity, websites, social content, video, performance marketing, AI advertising, AEO and SEO, and digital marketing concept explorations.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Creative Work · watNidea',
    description:
      'Explore watNidea’s creative work and concept explorations across branding, digital, content, video, advertising and search.',
    url: `${site.url}/work`,
    type: 'website',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Work',
      item: `${site.url}/work`,
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: WORK_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFF7E9] text-[#111111]">
      <SiteHeader tone="light" />

      <main className="flex-1">
        <WorkHero />            {/* 1 · Hero (paper) */}
        <WorkIdeas />           {/* 2 · Ideas, Built to Be Used (sand) */}
        <WorkExplorations />   {/* 3 · Selected Creative Explorations (paper) */}
        <WorkCapabilities />    {/* 4 · Explore Work by Capability (white) */}
        <WorkProcess />         {/* 5 · Behind Every Strong Piece of Work (ink — ONE dark) */}
        <WorkHonestContext />  {/* 6 · Honest Context. Better Case Studies. (sand) */}
        <WorkFaq />             {/* 7 · Frequently Asked Questions (paper) */}
        <WorkFinalCta />        {/* 8 · Final CTA (red) */}
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  )
}
