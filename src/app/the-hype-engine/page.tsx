import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { site, getService } from '@/lib/siteContent'
import { EndingCTA } from '@/components/site/primitives'
import {
  HypeHero,
  HypeChallenges,
  HypeServices,
  HypeSelectedWork,
  HypeManagement,
  HypeWhyChoose,
  HypeFaq,
} from '@/components/site/services/the-hype-engine/sections'
import { HYPE_FAQS } from '@/lib/hype-faq-data'

const service = getService('the-hype-engine')!

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Social Media Agency',
  serviceType: 'Social Media Marketing',
  provider: {
    '@type': 'ProfessionalService',
    name: site.legalName,
    url: site.url,
  },
  areaServed: 'Worldwide',
  description: service.description,
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
  mainEntity: HYPE_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function TheHypeEnginePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />
      <main className="flex-1">
        <HypeHero />
        <HypeChallenges />
        <HypeServices />
        <HypeSelectedWork />
        <HypeManagement />
        <HypeWhyChoose />
        <HypeFaq />
        <EndingCTA
          surface="lime"
          eyebrow="Make the brand worth following"
          title="Build a Social Presence People Remember"
          body="Tell us what your brand needs to say, show and achieve. We will connect the strategy, campaign idea and content system into one recognisable social presence."
          primaryHref="/book-strategy-call"
          primaryLabel="Start Your Social Project"
          secondaryHref="/work"
          secondaryLabel="Explore Our Work"
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
