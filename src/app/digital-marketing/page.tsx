/* ------------------------------------------------------------------ *
 * /digital-marketing — "Digital Marketing" umbrella service page
 *
 * Connects all specialist services without duplicating their content.
 * Uses the same shared component system as other service pages.
 * Accent = coral (#FF6B62) + signal red (#F13D32).
 * ------------------------------------------------------------------ */

import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { EndingCTA } from '@/components/site/primitives'
import { PageHero } from '@/components/site/primitives'
import { Section, Container, SectionLabel, EditorialHeading, Reveal, CTAButton, Underline, FAQAccordion } from '@/components/site/primitives'
import { getService } from '@/lib/siteContent'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const service = getService('digital-marketing')!

const CONNECTED_SERVICES = [
  { name: 'SEO and AEO', desc: 'Search visibility and answer engine readiness.', href: '/the-echo-system' },
  { name: 'Social Media', desc: 'Content, community and cultural presence.', href: '/the-hype-engine' },
  { name: 'Performance Marketing', desc: 'Google and Meta paid campaigns.', href: '/growth-alchemy' },
  { name: 'Website Development', desc: 'Fast, accessible, conversion-focused sites.', href: '/the-digital-hq' },
  { name: 'Brand Identity', desc: 'Strategy, logo, visual identity and guidelines.', href: '/aura-architecture' },
  { name: 'Video Production', desc: 'Brand films, ads and content series.', href: '/kinetic-studio' },
  { name: 'AI Advertising', desc: 'AI-assisted creative and campaign analysis.', href: '/synthetic-cinema' },
]

const FAQS = [
  { q: 'What does a digital marketing agency do?', a: 'A digital marketing agency plans, creates, manages and measures marketing across digital channels — search, social, content, advertising and websites. The agency connects channels into one strategy so that each supports the others.' },
  { q: 'What are digital marketing services?', a: 'Digital marketing services include SEO, AEO, social media marketing, performance marketing, Google advertising, Meta advertising, content marketing, AI search readiness and website marketing.' },
  { q: 'Do you provide digital marketing services for small businesses?', a: 'Yes. We work with small businesses to build a practical, prioritized digital presence. The scope fits where the business is now.' },
  { q: 'Do you work with startups?', a: 'Yes. We help startups build a digital marketing foundation — clear positioning, useful content and a strategy that can scale.' },
  { q: 'Can digital marketing help generate leads?', a: 'Digital marketing can contribute to lead generation, but results depend on many factors. We focus on strategy-led work, not guaranteed leads.' },
  { q: 'How long does digital marketing take to show results?', a: 'Results vary depending on the channels, market, budget and starting point. Some paid campaigns produce data within weeks; organic search takes months.' },
]

const PROCESS = [
  { n: '1', t: 'Discovery', d: 'We learn the business, goals and audience.' },
  { n: '2', t: 'Research', d: 'We research the market, competition and audience.' },
  { n: '3', t: 'Strategy', d: 'We plan which channels to use and how they connect.' },
  { n: '4', t: 'Creation', d: 'We create campaigns, content and assets.' },
  { n: '5', t: 'Launch', d: 'We launch, monitor and optimize.' },
  { n: '6', t: 'Growth', d: 'We report transparently and feed findings back.' },
]

export default function DigitalMarketingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />
      <main className="flex-1">
        {/* Hero */}
        <PageHero
          surface="coral"
          eyebrow="Digital Campaigns · Integrated Marketing"
          title={<>Digital Marketing Services for <span style={{ color: '#F13D32' }}>Business Growth</span></>}
          subtitle="Reach the right people. Build your presence. Grow with purpose. watNidea connects search, social, content, advertising and websites into one connected digital strategy."
          accent="#F13D32"
        >
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/book-strategy-call" style={{ background: '#F13D32' }}>Build Your Digital Strategy</CTAButton>
            <CTAButton href="#digital-services" variant="secondary" className="border-[rgba(16,16,16,0.30)] text-[#101010]">Explore Our Services</CTAButton>
          </div>
        </PageHero>

        {/* What Is Digital Marketing */}
        <Section surface="paper">
          <Container>
            <SectionLabel number="01" accent="#F13D32">What Is Digital Marketing?</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" className="mt-4 max-w-[20ch]">How channels <Underline>connect</Underline>.</EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-2xl text-base text-[#101010] opacity-85">
                Digital marketing is the practice of using connected online channels — search, social, content, advertising and websites — to reach audiences, communicate value and support business growth. The right combination depends on the business, audience, budget and goals.
              </p>
            </Reveal>
          </Container>
        </Section>

        {/* Connected Services */}
        <Section surface="sand" id="digital-services">
          <Container>
            <SectionLabel number="02" accent="#F13D32">Connected Services</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" className="mt-4 max-w-[20ch]">Seven specialist <Underline>services</Underline>.</EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-2xl text-base text-[#101010] opacity-85">
                Each service connects to a specialist page with deeper detail. This page is the hub — not the repeat.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CONNECTED_SERVICES.map((s, i) => (
                <Reveal key={s.name} delay={0.24 + i * 0.04}>
                  <Link href={s.href} className="group flex h-full min-h-[100px] flex-col justify-between rounded-[16px] border border-[rgba(16,16,16,0.12)] bg-[#FFFDF8] p-4 transition-transform duration-300 hover:-translate-y-1" aria-label={`${s.name} — explore service`}>
                    <div>
                      <h3 className="font-editorial text-sm font-semibold">{s.name}</h3>
                      <p className="mt-1 text-xs text-[#5D5A54]">{s.desc}</p>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#F13D32]">
                      Explore Service <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Process */}
        <Section surface="ink">
          <Container>
            <SectionLabel number="03" accent="#FFC83D">Digital Marketing Strategy Process</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" className="mt-4 max-w-[18ch] text-white">A recurring <Underline>strategy loop</Underline>.</EditorialHeading>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {PROCESS.map((s, i) => (
                <Reveal key={s.n} delay={0.2 + i * 0.05}>
                  <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F13D32] font-editorial text-xs font-bold text-white">{s.n}</span>
                    </div>
                    <h3 className="font-editorial text-sm font-semibold text-white">{s.t}</h3>
                    <p className="text-xs leading-relaxed text-[rgba(255,255,255,0.72)]">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section surface="paper">
          <Container>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <SectionLabel number="04" accent="#F13D32">Frequently Asked Questions</SectionLabel>
                <Reveal delay={0.08}>
                  <EditorialHeading as="h2" className="mt-4">Questions, <Underline>honestly</Underline> answered.</EditorialHeading>
                </Reveal>
              </div>
              <div className="lg:col-span-8">
                <FAQAccordion items={FAQS} accent="#F13D32" />
              </div>
            </div>
          </Container>
        </Section>

        {/* Final CTA */}
        <EndingCTA
          surface="coral"
          eyebrow="Grow your digital presence"
          title="Ready to Grow Your Digital Presence?"
          body="Build a stronger online presence with connected digital marketing services designed around your audience, goals and stage of growth."
          primaryHref="/book-strategy-call"
          primaryLabel="Get Started with watNidea"
          secondaryHref="/book-strategy-call"
          secondaryLabel="Talk to Us"
        />
      </main>
      <SiteFooter />
    </div>
  )
}
