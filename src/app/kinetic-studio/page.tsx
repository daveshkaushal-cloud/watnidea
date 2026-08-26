import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { site, getService } from '@/lib/siteContent'
import { EndingCTA } from '@/components/site/primitives'
import {
  KineticHero, KineticChallenges, KineticWhatIs, KineticServices, KineticPromo,
  KineticBrandVideo, KineticCorporate, KineticGreat, KineticProcess, KineticWhyChoose,
  KineticAudiences, KineticIndustries, KineticGoals, KineticFaq,
} from '@/components/site/services/kinetic-studio/sections'
import { KINETIC_FAQS } from '@/lib/kinetic-faq-data'

const service = getService('kinetic-studio')!

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Video Production Company',
  serviceType: 'Video Production',
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
        <KineticWhatIs />
        <KineticServices />
        <KineticPromo />
        <KineticBrandVideo />
        <KineticCorporate />
        <KineticGreat />
        <KineticProcess />
        <KineticWhyChoose />
        <KineticAudiences />
        <KineticIndustries />
        <KineticGoals />
        <KineticFaq />
        <EndingCTA
          surface="coral"
          eyebrow="Bring your brand to life"
          title="Bring Your Brand to Life"
          body="Partner with a creative video production company to turn your ideas into videos that communicate clearly, connect emotionally and work across every platform."
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
