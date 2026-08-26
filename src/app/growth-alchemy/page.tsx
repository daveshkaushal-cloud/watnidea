/* ------------------------------------------------------------------ *
 * /growth-alchemy — Service 05 · Growth Alchemy
 *
 * Editorial Digital Playground — unified Gen-Z system.
 *
 * 12 visible sections + Final CTA. Exactly ONE <h1> (the hero).
 * All section titles are <h2> via `EditorialHeading` (default as="h2").
 * The Final CTA uses the shared `EndingCTA` primitive, which renders
 * its own <h2> (id="ending-cta-heading").
 *
 * Colour rhythm: mint (hero · colour) → paper (light) → sand (light) →
 *   paper (light) → white (light) → sand (light) → paper (light) →
 *   teal (the ONE dark/colour-block moment) → white (light) →
 *   sand (light) → paper (light) → white (light) → mint (CTA · colour).
 * ≈ 11 light/colour + 1 dark ≈ matches the "one dark section maximum" rule.
 *
 * Branded service name: "Growth Alchemy".
 * Primary copy: SEO-focused Performance Marketing content.
 *
 * Honesty:
 *   - NO fake revenue / ROAS / leads / conversion-rate numbers.
 *   - NO guaranteed outcomes; outcomes framed as goals or potential.
 *   - NO official Google/Meta partner claims — only that we run campaigns.
 *   - ROI metrics presented as an educational framework, not a fake dashboard.
 *   - "Concept interface — no client data" labels on illustrative visuals.
 *   - "measurement-led" instead of "results-focused".
 *
 * Uses ONLY shared primitives + the new section components in
 * `@/components/site/services/growth-alchemy/sections.tsx`.
 * ------------------------------------------------------------------ */

import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { EndingCTA } from '@/components/site/primitives'
import {
  GrowthHero,
  GrowthDiagnostic,
  GrowthWhatIs,
  GrowthServices,
  GrowthForBusinesses,
  GrowthForSmallBiz,
  GrowthRoi,
  GrowthProcess,
  GrowthWhyChoose,
  GrowthStages,
  GrowthApproach,
  GrowthFaq,
} from '@/components/site/services/growth-alchemy/sections'
import { GROWTH_FAQS } from '@/lib/growth-faq-data'
import { site, getService } from '@/lib/siteContent'

const service = getService('growth-alchemy')!

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Performance Marketing Agency',
  serviceType: 'Performance Marketing',
  provider: {
    '@type': 'ProfessionalService',
    name: site.legalName,
    url: site.url,
  },
  areaServed: 'Worldwide',
  description:
    'Performance marketing agency providing Google Ads, Meta advertising, PPC management, lead generation, remarketing, conversion tracking and campaign optimization.',
  offers: {
    '@type': 'Offer',
    areaServed: 'Worldwide',
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
      name: service.name,
      item: `${site.url}${service.route}`,
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: GROWTH_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function GrowthAlchemyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />

      <main className="flex-1">
        <GrowthHero />           {/* 1 · Hero (mint) */}
        <GrowthDiagnostic />     {/* 2 · Are Your Paid Campaigns Delivering Enough? (paper) */}
        <GrowthWhatIs />          {/* 3 · What Is Performance Marketing? (sand) */}
        <GrowthServices />       {/* 4 · Our Performance Marketing Services (paper) */}
        <GrowthForBusinesses />   {/* 5 · Performance Marketing Services for Businesses (white) */}
        <GrowthForSmallBiz />     {/* 6 · Performance Marketing for Small Businesses (sand) */}
        <GrowthRoi />             {/* 7 · ROI-Focused Performance Marketing Services (paper) */}
        <GrowthProcess />         {/* 8 · Performance Marketing Process (teal — ONE dark) */}
        <GrowthWhyChoose />       {/* 9 · Why Choose watNidea? (white) */}
        <GrowthStages />          {/* 10 · Advertising Solutions for Different Business Goals (sand) */}
        <GrowthApproach />        {/* 11 · What Makes Our Approach Different? (paper) */}
        <GrowthFaq />             {/* 12 · Frequently Asked Questions (white) */}

        {/* 13 · Final CTA (mint) */}
        <EndingCTA
          surface="mint"
          eyebrow="Growth Alchemy · Performance Marketing"
          title="Ready to Make Your Advertising Work Smarter?"
          body="Tell us what you’re scaling — and where it’s getting stuck. We’ll bring the system, the hypotheses and the honesty. No guaranteed growth, no fabricated metrics — just a measurement-led approach you can verify."
          primaryHref="/book-strategy-call"
          primaryLabel="Get Started with watNidea"
          secondaryHref="/book-strategy-call"
          secondaryLabel="Contact Us"
        />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
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
