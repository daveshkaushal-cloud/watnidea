import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { site, getService } from '@/lib/siteContent'
import { EndingCTA } from '@/components/site/primitives'
import {
  HypeHero, HypeChallenges, HypeWhatIs, HypeStrategy, HypeServices, HypeForBusiness,
  HypeSmallBusiness, HypeManagement, HypeEffective, HypeProcess, HypeWhyChoose,
  HypePlatforms, HypeIndustries, HypeResults, HypeFaq,
} from '@/components/site/services/the-hype-engine/sections'
import { HYPE_FAQS } from '@/lib/hype-faq-data'

const service = getService('the-hype-engine')!

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Social Media Agency',
  serviceType: 'Social Media Marketing',
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
        <HypeWhatIs />
        <HypeStrategy />
        <HypeServices />
        <HypeForBusiness />
        <HypeSmallBusiness />
        <HypeManagement />
        <HypeEffective />
        <HypeProcess />
        <HypeWhyChoose />
        <HypePlatforms />
        <HypeIndustries />
        <HypeResults />
        <HypeFaq />
        <EndingCTA
          surface="lime"
          eyebrow="Ready to grow?"
          title="Ready to Grow Your Social Presence?"
          body="Partner with a creative social media agency to build a presence that gets noticed, connects with the right audience and supports your business goals — without the noise."
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
