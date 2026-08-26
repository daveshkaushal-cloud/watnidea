/* ------------------------------------------------------------------ *
 * /synthetic-cinema — Service 06 · Synthetic Cinema
 *
 * Positioning: "Synthetic Cinema" is the branded service name.
 *   Primary copy: AI-assisted advertising and creative-intelligence practice.
 *
 * 13 visible sections + Final CTA. Exactly ONE <h1> (the hero).
 * All section titles are <h2> via `EditorialHeading` (default as="h2").
 * Service titles and process steps use <h3>. The Final CTA uses the
 * shared `EndingCTA` primitive, which renders its own <h2> (id="ending-cta-heading").
 *
 * Colour rhythm: violet (hero · colour) → paper (light) → sand (light) →
 *   paper (light) → white (light) → sand (light) → paper (light) →
 *   ink (the ONE dark section — responsibility matrix) → sand (light) →
 *   white (light) → paper (light) → sand (light) → white (light) →
 *   violet (CTA · colour).
 * ≈ 11 light + 1 dark + 2 colour blocks. Matches "one dark section maximum"
 *   and "keep the purple controlled" rules.
 *
 * Separation from Growth Alchemy:
 *   - This page focuses on AI-assisted audience research, creative
 *     concepting, variation, personalization, automation, pattern
 *     identification, analysis and human-reviewed experimentation.
 *   - Growth Alchemy owns Google/Meta media buying, PPC, budgets,
 *     lead-gen execution, conversion tracking and ongoing optimization.
 *   - Cross-links to /growth-alchemy where relevant.
 *
 * Honesty:
 *   - NO fake metrics, campaign data, AI tools, models or results.
 *   - NO proprietary AI model claims.
 *   - NO guarantees of better targeting, lower costs, more leads or conversions.
 *   - "AI-assisted" / "data-informed" — not "AI-powered" / "data-driven".
 *   - AI supports, not replaces, human strategy, creative direction and judgment.
 *   - Privacy, consent, copyright and human oversight addressed.
 *
 * Uses ONLY shared primitives + the new section components in
 * `@/components/site/services/synthetic-cinema/sections.tsx`.
 * ------------------------------------------------------------------ */

import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { EndingCTA } from '@/components/site/primitives'
import {
  CinemaHero,
  CinemaChallenges,
  CinemaWhatIs,
  CinemaServices,
  CinemaForBusiness,
  CinemaSmallBusiness,
  CinemaStartups,
  CinemaHowSupport,
  CinemaProcess,
  CinemaWhyChoose,
  CinemaStages,
  CinemaEffective,
  CinemaFaq,
} from '@/components/site/services/synthetic-cinema/sections'
import { CINEMA_FAQS } from '@/lib/cinema-faq-data'
import { site, getService } from '@/lib/siteContent'

const service = getService('synthetic-cinema')!

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Advertising Agency',
  serviceType: 'AI Advertising',
  provider: {
    '@type': 'ProfessionalService',
    name: site.legalName,
    url: site.url,
  },
  areaServed: 'Worldwide',
  description:
    'AI advertising agency combining human strategy with AI-assisted audience research, creative variation, personalization, automation and campaign analysis.',
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
  mainEntity: CINEMA_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function SyntheticCinemaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />

      <main className="flex-1">
        <CinemaHero />            {/* 1 · Hero (violet) */}
        <CinemaChallenges />     {/* 2 · Is Your Advertising Keeping Up? (paper) */}
        <CinemaWhatIs />          {/* 3 · What Is AI Advertising? (sand) */}
        <CinemaServices />       {/* 4 · Our AI Advertising Services (paper) */}
        <CinemaForBusiness />    {/* 5 · AI-Assisted Advertising for Businesses (white) */}
        <CinemaSmallBusiness /> {/* 6 · AI Advertising for Small Businesses (sand) */}
        <CinemaStartups />       {/* 7 · AI Advertising Services for Startups (paper) */}
        <CinemaHowSupport />     {/* 8 · How AI Can Support Advertising (ink — ONE dark) */}
        <CinemaProcess />         {/* 9 · AI Advertising Process (sand) */}
        <CinemaWhyChoose />       {/* 10 · Why Choose watNidea? (white) */}
        <CinemaStages />          {/* 11 · AI Advertising for Different Business Needs (paper) */}
        <CinemaEffective />       {/* 12 · What Makes AI Advertising Effective? (sand) */}
        <CinemaFaq />             {/* 13 · Frequently Asked Questions (white) */}

        {/* 14 · Final CTA (violet) */}
        <EndingCTA
          surface="violet"
          eyebrow="Synthetic Cinema · AI Advertising"
          title="Ready to Make Your Advertising Smarter?"
          body="Use responsible AI-assisted advertising to explore relevant audiences, test creative ideas and make more informed campaign decisions — under human creative direction, review and accountability."
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
