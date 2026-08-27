import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { EndingCTA } from '@/components/site/primitives'
import {
  EchoHero,
  EchoChallenges,
  EchoServices,
  EchoSearchShowcase,
  EchoProcess,
  EchoWhyChoose,
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
  provider: { '@type': 'ProfessionalService', name: site.legalName, url: site.url },
  areaServed: 'Worldwide',
  description: 'AEO and SEO services including search research, answer-focused content, on-page SEO, technical SEO, internal linking and AI search readiness.',
  offers: { '@type': 'Offer', areaServed: 'Worldwide' },
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
        <EchoHero />
        <EchoChallenges />
        <EchoServices />
        <EchoSearchShowcase />
        <EchoProcess />
        <EchoWhyChoose />
        <EchoFaq />
        <EndingCTA
          surface="yellow"
          eyebrow="The Echo System · AEO & SEO"
          title="Build a Search Presence Worth Finding"
          body="Create useful content, clearer structure and stronger technical foundations for traditional and evolving search experiences—without fake rankings, shortcuts or guarantees."
          primaryHref="/book-strategy-call"
          primaryLabel="Discuss Search Strategy"
          secondaryHref="/work"
          secondaryLabel="Explore Our Work"
        />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  )
}
