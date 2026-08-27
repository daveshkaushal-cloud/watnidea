import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { site, getService } from '@/lib/siteContent'
import { EndingCTA } from '@/components/site/primitives'
import {
  KineticHero,
  KineticChallenges,
  KineticServices,
  KineticSelectedWork,
  KineticProcess,
  KineticWhyChoose,
  KineticFaq,
} from '@/components/site/services/kinetic-studio/sections'
import { KINETIC_FAQS } from '@/lib/kinetic-faq-data'

const service = getService('kinetic-studio')!

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Video Production Company',
  serviceType: 'Video Production',
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
  mainEntity: KINETIC_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function KineticStudioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />
      <main className="flex-1">
        <KineticHero />
        <KineticChallenges />
        <KineticServices />
        <KineticSelectedWork />
        <KineticProcess />
        <KineticWhyChoose />
        <KineticFaq />
        <EndingCTA
          surface="coral"
          eyebrow="Bring the idea to life"
          title="Create Video People Want to Watch"
          body="Tell us the message, audience and platform. We will shape the concept, editing and motion into a focused video experience built for where it needs to perform."
          primaryHref="/book-strategy-call"
          primaryLabel="Start Your Video Project"
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
