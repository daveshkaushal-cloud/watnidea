import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { EndingCTA } from '@/components/site/primitives'
import {
  CinemaHero,
  CinemaChallenges,
  CinemaServices,
  CinemaShowcase,
  CinemaHowSupport,
  CinemaProcess,
  CinemaWhyChoose,
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
  provider: { '@type': 'ProfessionalService', name: site.legalName, url: site.url },
  areaServed: 'Worldwide',
  description: 'Human-led, AI-assisted advertising and creative production spanning audience research, concepting, variation, personalization, automation and analysis.',
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
        <CinemaHero />
        <CinemaChallenges />
        <CinemaServices />
        <CinemaShowcase />
        <CinemaHowSupport />
        <CinemaProcess />
        <CinemaWhyChoose />
        <CinemaFaq />
        <EndingCTA
          surface="violet"
          eyebrow="Synthetic Cinema · AI Creative"
          title="Turn One Strong Idea Into a Campaign World"
          body="Bring us the brief, ambition or rough concept. We will combine human creative direction with responsible AI-assisted exploration and production to shape campaign-ready visual work."
          primaryHref="/book-strategy-call"
          primaryLabel="Discuss Your Project"
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
