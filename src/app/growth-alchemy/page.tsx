import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { EndingCTA } from '@/components/site/primitives'
import {
  GrowthHero,
  GrowthDiagnostic,
  GrowthServices,
  GrowthSelectedProof,
  GrowthProcess,
  GrowthWhyChoose,
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
        <GrowthHero />
        <GrowthDiagnostic />
        <GrowthServices />
        <GrowthSelectedProof />
        <GrowthProcess />
        <GrowthWhyChoose />
        <GrowthFaq />

        <EndingCTA
          surface="mint"
          eyebrow="Growth Alchemy · Performance Marketing"
          title="Make Every Campaign Decision Clearer"
          body="Tell us what you are promoting, where performance is getting stuck and what you can measure. We will connect strategy, creative, media and tracking into one accountable campaign system."
          primaryHref="/book-strategy-call"
          primaryLabel="Discuss Your Campaign"
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
