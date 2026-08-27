import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { site, getService } from '@/lib/siteContent'
import { EndingCTA } from '@/components/site/primitives'
import {
  AuraHero,
  AuraProblems,
  AuraWhatIs,
  AuraServices,
  AuraProcess,
  AuraWhyChoose,
  AuraFaq,
} from '@/components/site/services/aura-architecture/sections'
import { AURA_FAQS } from '@/lib/aura-faq-data'

const service = getService('aura-architecture')!

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Brand Identity Agency',
  serviceType: 'Brand Identity',
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
  mainEntity: AURA_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function AuraArchitecturePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />
      <main className="flex-1">
        <AuraHero />
        <AuraProblems />
        <AuraWhatIs />
        <AuraServices />
        <AuraProcess />
        <AuraWhyChoose />
        <AuraFaq />
        <EndingCTA
          surface="red"
          eyebrow="Build a brand that stands out"
          title="Build a Brand That Stands Out"
          body="Partner with a creative brand identity agency to turn your business vision into a brand people can recognize, trust, and remember."
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
