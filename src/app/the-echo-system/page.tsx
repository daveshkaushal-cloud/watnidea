/* ------------------------------------------------------------------ *
 * /the-echo-system — Service 07 · The Echo System
 *
 * Positioning: "The Echo System" is the branded service name.
 *   Primary copy: AEO and SEO services for modern search growth.
 *
 * 15 visible sections + Final CTA. Exactly ONE <h1> (the hero).
 * All section titles are <h2> via `EditorialHeading` (default as="h2").
 * Service titles and process steps use <h3>. The Final CTA uses the
 * shared `EndingCTA` primitive, which renders its own <h2> (id="ending-cta-heading").
 *
 * Colour rhythm: yellow (hero · light colour) → paper (light) →
 *   sand (light) → paper (light) → white (light) → sand (light) →
 *   paper (light) → white (light) → paper (light) → sand (light) →
 *   teal (the ONE dark/deep-teal section — process) → white (light) →
 *   paper (light) → sand (light) → white (light) → yellow (CTA · colour).
 * ≈ 12 light/colour + 1 dark/deep-teal. Matches "one dark or deep-teal
 *   section maximum" rule.
 *
 * Honesty:
 *   - NO guarantees of rankings, traffic, AI citations, featured snippets,
 *     leads or revenue.
 *   - NO claims of control over how Google, AI assistants or answer engines
 *     select information.
 *   - Prefer "AI search readiness" over claims content is "optimized for AI".
 *   - NO fake ranking data, keyword positions, traffic charts, citations or
 *     client results.
 *   - NO "best agency" claims. "Build Topical Relevance" not "Authority".
 *   - NO hidden SEO-only text, doorway pages, mass-generated pages, link
 *     schemes or keyword stuffing.
 *   - Structured data only when it matches visible content.
 *
 * Uses ONLY shared primitives + the new section components in
 * `@/components/site/services/the-echo-system/sections.tsx`.
 * ------------------------------------------------------------------ */

import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { EndingCTA } from '@/components/site/primitives'
import {
  EchoHero,
  EchoChallenges,
  EchoWhatIs,
  EchoServices,
  EchoAeoServices,
  EchoSeoServices,
  EchoForBusiness,
  EchoSmallBusiness,
  EchoStartups,
  EchoModernSearch,
  EchoProcess,
  EchoWhyChoose,
  EchoAchieve,
  EchoStrongStrategy,
  EchoFaq,
} from '@/components/site/services/the-echo-system/sections'
import { ECHO_FAQS } from '@/lib/echo-faq-data'
import { site, getService } from '@/lib/siteContent'

const service = getService('the-echo-system')!

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AEO and SEO Services',
  serviceType: 'AEO and SEO',
  provider: {
    '@type': 'ProfessionalService',
    name: site.legalName,
    url: site.url,
  },
  areaServed: 'Worldwide',
  description:
    'AEO and SEO services including keyword research, answer-focused content, on-page SEO, technical SEO, internal linking and AI search readiness.',
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
  mainEntity: ECHO_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function TheEchoSystemPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />

      <main className="flex-1">
        <EchoHero />            {/* 1 · Hero (yellow) */}
        <EchoChallenges />     {/* 2 · Is Your Website Getting the Visibility? (paper) */}
        <EchoWhatIs />          {/* 3 · What Are AEO and SEO? (sand) */}
        <EchoServices />       {/* 4 · AEO and SEO Services (paper) */}
        <EchoAeoServices />     {/* 5 · AEO Services That Focus on Better Answers (white) */}
        <EchoSeoServices />    {/* 6 · SEO Services Built Around Your Business (sand) */}
        <EchoForBusiness />    {/* 7 · AEO and SEO Services for Businesses (paper) */}
        <EchoSmallBusiness /> {/* 8 · AEO and SEO Services for Small Businesses (white) */}
        <EchoStartups />        {/* 9 · Search Strategy for Startups (paper) */}
        <EchoModernSearch />    {/* 10 · Making Content Ready for Modern Search (sand) */}
        <EchoProcess />         {/* 11 · AEO and SEO Process (teal — ONE dark) */}
        <EchoWhyChoose />       {/* 12 · Why Businesses Choose watNidea (white) */}
        <EchoAchieve />         {/* 13 · What Can AEO and SEO Help You Achieve? (paper) */}
        <EchoStrongStrategy /> {/* 14 · What Makes a Strong Search Strategy? (sand) */}
        <EchoFaq />             {/* 15 · Frequently Asked Questions (white) */}

        {/* 16 · Final CTA (yellow) */}
        <EndingCTA
          surface="yellow"
          eyebrow="The Echo System · AEO & SEO"
          title="Ready to Grow Your Search Presence?"
          body="Build a search presence that is useful to people first — and ready for modern search as it evolves. We bring the strategy, the content structure and the honesty. No guaranteed rankings, no fake metrics — just useful content, clear structure and long-term improvement."
          primaryHref="/book-strategy-call"
          primaryLabel="Get Started with watNidea"
          secondaryHref="/book-strategy-call"
          secondaryLabel="Talk to Us"
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
