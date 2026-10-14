
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
  title: "Social Media Agency in Noida, Delhi NCR | watNidea",
  description: "Social media agency in Noida, Delhi NCR for strategy, management, Instagram marketing, content and paid social. Book a call.",
  alternates: {
    canonical: "https://www.watnidea.com/the-hype-engine",
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
