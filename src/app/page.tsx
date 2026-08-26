import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { HomeHero } from '@/components/site/home/hero'
import {
  PositioningSection,
  StatsSection,
  ServicesSection,
  PrinciplesSection,
  ProcessSection,
  WhySection,
  OutcomesSection,
  FaqSection,
  FinalCtaSection,
} from '@/components/site/home/sections'
import { HOME_FAQS } from '@/components/site/home/faq-data'

export const metadata = {
  title: 'Branding and Creative Agency | watNidea',
  description:
    'watNidea is a branding and creative agency providing brand identity, websites, video production, social media creative, performance marketing, AI advertising, AEO, SEO and digital campaigns.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Branding and Creative Agency | watNidea',
    description:
      'watNidea is a branding and creative agency providing brand identity, websites, video production, social media creative, performance marketing, AI advertising, AEO, SEO and digital campaigns.',
    type: 'website',
    url: '/',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'watNidea — Branding and Creative Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Branding and Creative Agency | watNidea',
    description:
      'watNidea is a branding and creative agency providing brand identity, websites, video production, social media creative, performance marketing, AI advertising, AEO, SEO and digital campaigns.',
    images: ['/og-image.png'],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFF7E9] text-[#111111]">
      <SiteHeader tone="light" />
      <main className="flex-1">
        <HomeHero />
        <PositioningSection />
        <StatsSection />
        <ServicesSection />
        <PrinciplesSection />
        <ProcessSection />
        <WhySection />
        <OutcomesSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  )
}
