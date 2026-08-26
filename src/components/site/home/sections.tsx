'use client'

import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import {
  Section, Container, SectionLabel, EditorialHeading, Reveal,
  CTAButton, Sticker, Underline, IdeaStamp, FAQAccordion,
} from '@/components/site/primitives'
import { HOME_FAQS as FAQS } from '@/components/site/home/faq-data'

function isLightHex(hex: string): boolean {
  const c = hex.replace('#', ''); if (c.length !== 6) return false
  const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
}

/* ============================================================
 * 2. Ideas That Become Stronger Brands
 * ============================================================ */
export function PositioningSection() {
  return (
    <Section surface="paper">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01" accent="#F13D32">Ideas That Become Stronger Brands</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" className="mt-4 max-w-[16ch]">
                We turn ideas into brands that <Underline>connect</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 text-sm font-medium text-[#F13D32]">watNidea — branding and marketing agency.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.12}>
              <p className="text-base leading-relaxed text-[#111111] opacity-85 sm:text-lg">
                Great brands don&apos;t happen by accident. They are built on clear ideas, expressed through design, content, and experiences that feel consistent across every touchpoint. At watNidea, we help businesses find the idea that makes them memorable — then turn it into branding, websites, campaigns, and content that work together.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-base leading-relaxed text-[#111111] opacity-85">
                Whether you are launching a new brand, refreshing an existing one, or scaling your marketing, we bring strategy and creativity together. Our work is grounded in research, shaped by design thinking, and delivered to perform across digital platforms.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-4 text-base leading-relaxed text-[#111111] opacity-85">
                From brand identity to digital campaigns, every project starts with understanding your business and ends with creative work that moves people.
              </p>
            </Reveal>
            <Reveal delay={0.36}>
              <div className="mt-6">
                <CTAButton href="/work" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>Explore Our Work</CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * 3. Our Work in Numbers (HIDDEN — numbers not verified)
 * Per brief: "Publish these numbers only if they are verified."
 * Replaced with a compact capabilities strip.
 * ============================================================ */
export function StatsSection() {
  const capabilities = [
    { label: 'Brand Identity', accent: '#FFC83D' },
    { label: 'Digital Design', accent: '#F13D32' },
    { label: 'Content & Film', accent: '#C8F542' },
    { label: 'Growth & Ads', accent: '#FF7A1A' },
  ]
  return (
    <Section surface="blue">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel number="02" accent="#FFC83D">Our Work in Numbers</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" className="mt-4 max-w-[20ch] text-white">
                What the studio can <Underline>set up, make and measure</Underline>.
              </EditorialHeading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Sticker accent="#FFC83D" textColor="#111111" tilt="right">Now accepting selected projects</Sticker>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-sm text-[rgba(255,255,255,0.80)]">
            Verified case studies and metrics will appear here once engagements wrap. In the meantime, these are the creative capabilities we bring under one roof.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.label} delay={0.24 + i * 0.05}>
              <div className="flex min-h-[100px] flex-col justify-center rounded-[16px] p-4" style={{ background: c.accent, color: isLightHex(c.accent) ? '#111111' : '#FFFFFF' }}>
                <span aria-hidden className={isLightHex(c.accent) ? 'wn-halftone absolute inset-0 rounded-[16px] opacity-25' : 'wn-halftone-light absolute inset-0 rounded-[16px] opacity-25'} />
                <span className="relative font-editorial text-xl font-bold">{c.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * 4. Creative Services Built Around Your Brand
 * ============================================================ */
const HOME_SERVICES = [
  { n: '01', name: 'AEO and SEO Services', desc: 'Answer-engine optimisation and search visibility — so your brand is found where audiences actually look.', href: '/the-echo-system', accent: '#FFC83D' },
  { n: '02', name: 'AI Advertising Agency', desc: 'AI-assisted creative concepting, variations and visualisation — directed by humans, edited and rights-cleared.', href: '/synthetic-cinema', accent: '#7657F6' },
  { n: '03', name: 'Performance Marketing', desc: 'Paid media, funnels, landing pages and analytics — set up as a system you can measure, optimise and scale.', href: '/growth-alchemy', accent: '#66DFC0' },
  { n: '04', name: 'Video Production', desc: 'Concept, direction, edit and motion — frame-based storytelling for brand films, ads and content series.', href: '/kinetic-studio', accent: '#F97316' },
  { n: '05', name: 'Social Media Creative', desc: 'Social strategy, content engines and community building designed around how culture actually moves.', href: '/the-hype-engine', accent: '#C8F542' },
  { n: '06', name: 'Website Development', desc: 'Design systems, marketing sites and product interfaces — fast, accessible and built to convert.', href: '/the-digital-hq', accent: '#3D5AFE' },
  { n: '07', name: 'Brand Identity', desc: 'Brand strategy, naming, visual identity, verbal identity and guidelines — built to stay recognisable.', href: '/aura-architecture', accent: '#F13D32' },
  { n: '08', name: 'Digital Campaigns', desc: 'Integrated campaigns across channels — concepted, produced and measured end-to-end.', href: '/book-strategy-call', accent: '#FF6B62' },
]

export function ServicesSection() {
  return (
    <Section surface="lilac" id="services">
      <Container>
        <SectionLabel number="03" accent="#F13D32">Creative Services</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" className="mt-4 max-w-[20ch]">
            Built around <Underline>your brand</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            From brand identity to AI advertising, every service is built to work on its own or as part of a connected brand system. Explore the one that fits where you are now.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_SERVICES.map((s, i) => {
            const isLight = isLightHex(s.accent)
            return (
              <Reveal key={s.n} delay={0.24 + i * 0.04}>
                <Link
                  href={s.href}
                  className="group relative flex h-full min-h-[180px] flex-col justify-between overflow-hidden rounded-[18px] border border-[rgba(17,17,17,0.12)] p-4 transition-transform duration-300 hover:-translate-y-1"
                  style={{ background: s.accent, color: isLight ? '#111111' : '#FFFFFF' }}
                  aria-label={`${s.name} — Explore Service`}
                >
                  <span aria-hidden className={isLight ? 'wn-halftone absolute inset-0 rounded-[18px] opacity-25' : 'wn-halftone-light absolute inset-0 rounded-[18px] opacity-25'} />
                  <div className="relative flex items-start justify-between">
                    <span className="wn-bignum text-3xl opacity-90">{s.n}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="relative">
                    <h3 className="font-editorial text-base font-semibold leading-tight">{s.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed opacity-80">{s.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider">
                      Explore Service <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * 5. Creativity With a Clear Purpose
 * ============================================================ */
const PRINCIPLES = [
  { n: '01', title: 'Understand Before We Create', desc: 'We start with your business, audience and goals — not a moodboard. Research and insight shape every creative choice.', accent: '#F13D32' },
  { n: '02', title: 'Strategy Guides Creativity', desc: 'Positioning, message and art direction are agreed before design begins. Strategy keeps creativity purposeful.', accent: '#3D5AFE' },
  { n: '03', title: 'Consistency Builds Recognition', desc: 'A brand is built by repetition. We create systems that stay consistent across every surface and campaign.', accent: '#7657F6' },
  { n: '04', title: 'Designed for Real People', desc: 'We design for the people who use your brand — customers, teams and partners. Clarity over cleverness.', accent: '#157468' },
]

export function PrinciplesSection() {
  return (
    <Section surface="lime">
      <Container>
        <SectionLabel number="04" accent="#F13D32">Creativity With a Clear Purpose</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" className="mt-4 max-w-[20ch]">
            Four principles that <Underline>guide</Underline> the work.
          </EditorialHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={0.2 + i * 0.06}>
              <div className="flex h-full flex-col gap-2 rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-5" style={{ transform: i % 2 === 0 ? 'translateY(0)' : 'translateY(8px)' }}>
                <span className="wn-bignum text-4xl" style={{ color: p.accent }}>{p.n}</span>
                <h3 className="font-editorial text-lg font-semibold leading-tight">{p.title}</h3>
                <p className="text-sm leading-relaxed text-[#555255]">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * 6. From First Idea to Final Execution
 * ============================================================ */
const PROCESS_STEPS = [
  { n: '1', t: 'Discover', d: 'We learn your business, audience, market and goals. Research, audits and conversations that inform everything after.' },
  { n: '2', t: 'Define', d: 'We agree positioning, message and creative direction. Strategy and art direction are set before design begins.' },
  { n: '3', t: 'Create', d: 'We design the brand, site, content and campaigns. The creative work is built by the same team in the same room.' },
  { n: '4', t: 'Refine', d: 'We review, test and polish. Feedback rounds sharpen the work until every detail earns its place.' },
  { n: '5', t: 'Deliver', d: 'We ship the final assets, systems and guidelines. Everything you need to move forward — handed over clearly.' },
]

export function ProcessSection() {
  return (
    <Section surface="ink">
      <Container>
        <SectionLabel number="05" accent="#FFC83D">From First Idea to Final Execution</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" className="mt-4 max-w-[18ch] text-white">
            Five steps. One <Underline>connected</Underline> process.
          </EditorialHeading>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.2 + i * 0.06}>
              <div className="relative flex h-full flex-col gap-2 rounded-[18px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F13D32] font-editorial text-sm font-bold text-white">{s.n}</span>
                  {i < 4 && <span aria-hidden className="hidden h-px flex-1 bg-[rgba(255,255,255,0.2)] lg:block" />}
                </div>
                <h3 className="mt-2 font-editorial text-lg font-semibold text-white">{s.t}</h3>
                <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.72)]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * 7. Creative Support for Every Stage of Business
 * ============================================================ */
const AUDIENCES = ['Startups', 'Small Businesses', 'Growing Brands', 'Established Businesses', 'New Products']

export function AudienceSection() {
  return (
    <Section surface="violet">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <SectionLabel number="06" accent="#FFC83D">Creative Support for Every Stage</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" className="mt-3 max-w-[20ch] text-2xl text-white sm:text-3xl">
                Wherever you are, we fit.
              </EditorialHeading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <div className="flex flex-wrap gap-2">
              {AUDIENCES.map((a) => (
                <span key={a} className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.30)] bg-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-medium text-white">{a}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * 8. Why Businesses Work With watNidea
 * ============================================================ */
const WHY_POINTS = [
  { t: 'Strategy and Creativity Together', d: "We don't separate thinking from making. Strategy shapes the creative work, and the creative work sharpens the strategy.", featured: true },
  { t: 'One Connected Brand Experience', d: 'Brand, site, content and campaigns built by one team, speaking one language.' },
  { t: 'Original Creative Thinking', d: 'No templates, no recycled ideas. Every project starts from your business and your audience.' },
  { t: 'Attention to Detail', d: 'Type, spacing, timing, tone. The small choices are what make a brand feel considered.' },
  { t: 'Clear Communication', d: 'We explain our thinking, share work in progress, and keep you informed at every stage.' },
]

export function WhySection() {
  return (
    <Section surface="mint">
      <Container>
        <SectionLabel number="07" accent="#F13D32">Why Businesses Work With watNidea</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" className="mt-4 max-w-[20ch]">
            Five reasons brands <Underline>choose</Underline> the studio.
          </EditorialHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal delay={0.16}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] bg-[#F13D32] p-6 text-white">
              <span aria-hidden className="wn-halftone-light absolute inset-0 rounded-[22px] opacity-25" />
              <div className="relative">
                <h3 className="font-editorial text-2xl font-semibold leading-tight">{WHY_POINTS[0].t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[rgba(255,255,255,0.88)]">{WHY_POINTS[0].d}</p>
              </div>
              <div className="relative mt-6"><IdeaStamp label="What an idea" size={80} color="#FFFFFF" /></div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            {WHY_POINTS.slice(1).map((w, i) => (
              <Reveal key={w.t} delay={0.24 + i * 0.06}>
                <div className="flex h-full flex-col gap-2 rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
                  <h3 className="font-editorial text-lg font-semibold leading-tight">{w.t}</h3>
                  <p className="text-sm leading-relaxed text-[#555255]">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * 9. Branding That Connects With People
 * ============================================================ */
const OUTCOMES = ['Build Recognition', 'Communicate Clearly', 'Create Differentiation', 'Build Confidence', 'Strengthen Connections', 'Support Growth']

export function OutcomesSection() {
  return (
    <Section surface="orange">
      <Container>
        <SectionLabel number="08" accent="#FFC83D">Branding That Connects With People</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" className="mt-4 max-w-[20ch] text-white">
            Six outcomes the work is <Underline>built for</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 wn-marquee">
            <div className="wn-marquee__track">
              {[0, 1].map((dup) => (
                <span key={dup} className="flex items-center gap-6" aria-hidden={dup === 1}>
                  {OUTCOMES.map((o) => (
                    <span key={o} className="flex items-center gap-6">
                      <span className="font-editorial text-xl font-semibold text-white sm:text-2xl">{o}</span>
                      <span className="text-[#FFC83D]">✦</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <noscript>
          <div className="mt-6 flex flex-wrap gap-3">
            {OUTCOMES.map((o) => (
              <span key={o} className="rounded-full border border-[rgba(17,17,17,0.18)] bg-[#FFFFFF] px-4 py-2 text-sm font-medium">{o}</span>
            ))}
          </div>
        </noscript>
      </Container>
    </Section>
  )
}

/* ============================================================
 * 10. What Our Clients Say — HIDDEN (no real testimonials)
 * Per brief: "Keep this section hidden from the production homepage"
 * ============================================================ */

/* ============================================================
 * 11. Frequently Asked Questions
 * ============================================================ */
export function FaqSection() {
  return (
    <Section surface="paper">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel number="09" accent="#F13D32">Frequently Asked Questions</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" className="mt-4">
                Questions, <Underline>honestly</Underline> answered.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-3 max-w-sm text-sm text-[#555255]">
                If yours isn&apos;t here, write to us. We&apos;ll answer honestly.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={FAQS} accent="#F13D32" />
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * 12. Final CTA
 * ============================================================ */
export function FinalCtaSection() {
  return (
    <Section surface="red">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="wn-caption mx-auto mb-5 text-[rgba(255,255,255,0.8)]">Let&apos;s build something memorable</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-editorial text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-white">
              Let&apos;s Create Something People Remember
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-base opacity-90 sm:text-lg">
              Tell us about your brand, your goals and where you want to go. We&apos;ll bring the strategy, creativity and craft to get you there — together.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTAButton href="/book-strategy-call" className="bg-white text-[#F13D32] hover:bg-[#FFFFFF]">Start Your Project</CTAButton>
              <CTAButton href="/book-strategy-call" variant="secondary" className="border-white/40 text-white hover:bg-white/10">Talk to Our Creative Team</CTAButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
