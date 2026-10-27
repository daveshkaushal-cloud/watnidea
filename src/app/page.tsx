
import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { HomeHero } from '@/components/site/home/hero'
import {
  PositioningSection,
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
  title: "Branding & Creative Agency in Noida, Delhi NCR | watNidea",
  description: "Branding and creative agency in Noida, Delhi NCR for brand identity, websites, video, social media, performance marketing, AI advertising and SEO.",
  alternates: {
    canonical: "https://watnidea.com/the-hype-engine",
  }
};

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
        <ServicesSection />
        <PrinciplesSection />
        <ProcessSection />
        <WhySection />
        <OutcomesSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  )
}
