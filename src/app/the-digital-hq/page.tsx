import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { site, getService } from '@/lib/siteContent'
import { EndingCTA } from '@/components/site/primitives'
import {
  DhqHero, DhqProblems, DhqWhatIs, DhqServices, DhqWhyNeeded,
  DhqSmallBusiness, DhqEffective, DhqProcess, DhqWhyChoose,
  DhqAudiences, DhqIndustries, DhqGoals, DhqFaq,
} from '@/components/site/services/the-digital-hq/sections'
import { DHQ_FAQS } from '@/lib/dhq-faq-data'

const service = getService('the-digital-hq')!

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Website Development Agency',
  serviceType: 'Website Development',
  provider: { '@type': 'ProfessionalService', name: site.legalName, url: site.url },
  areaServed: 'Worldwide',
  description: service.description,
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    { '@type': 'ListItem', position: 2, name: service.name, item: `${site.url}${service.route}` },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: DHQ_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function TheDigitalHqPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />
      <main className="flex-1">
        <DhqHero />
        <DhqProblems />
        <DhqWhatIs />
        <DhqServices />
        <DhqWhyNeeded />
        <DhqSmallBusiness />
        <DhqEffective />
        <DhqProcess />
        <DhqWhyChoose />
        <DhqAudiences />
        <DhqIndustries />
        <DhqGoals />
        <DhqFaq />
        <EndingCTA
          surface="blue"
          eyebrow="Build a website that works"
          title="Build a Website That Works for Your Business"
          body="Partner with a creative website design and development company to create a modern, user-friendly website that supports your customers and business goals."
          primaryHref="/book-strategy-call"
          primaryLabel="Get Started with watNidea"
          secondaryHref="/book-strategy-call"
          secondaryLabel="Contact Us"
        />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  )
}
