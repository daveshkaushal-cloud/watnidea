'use client'

/**
 * Aura Architecture — Brand Identity service page.
 * Custom implementation. 9 visible sections + Final CTA.
 *
 * Sections:
 *  S1  paper — hero with identity-system visual
 *  S2  white — Common Branding Problems (diagnostic checklist)
 *  S3  sand  — What Is Brand Identity Design? (diagram + benefits)
 *  S4  paper — Our Brand Identity & Branding Services (8 asymmetric cards)
 *  S5  ink   — Brand Identity Design Process (6-step timeline, the ONE dark section)
 *  S6  sand  — Why Choose watNidea? (1 featured + 5 supporting)
 *  S7  paper — Industries We Can Support (compact typographic index)
 *  S8  white — FAQ (accessible accordion)
 *  S9  red   — Final CTA
 *
 * No fake metrics, clients, testimonials, or "best" claims.
 */

import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import {
  Section, Container, SectionLabel, EditorialHeading, Reveal,
  CTAButton, Sticker, Underline, IdeaStamp, FAQAccordion,
} from '@/components/site/primitives'
import { AURA_FAQS as FAQS } from '@/lib/aura-faq-data'

function isLightHex(hex: string): boolean {
  const c = hex.replace('#', ''); if (c.length !== 6) return false
  const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
}

/* ============================================================
 * S1 — Hero (paper) with identity-system visual
 * ============================================================ */
export function AuraHero() {
  return (
    <Section surface="red" className="relative overflow-hidden !pt-[calc(72px+2.75rem)] pb-10 sm:!pt-[calc(72px+3.25rem)] sm:pb-16" ariaLabelledBy="aura-hero-heading">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-[240px] w-[240px] rounded-full opacity-15 blur-[100px]" style={{ background: '#FF6B62' }} />
      </div>
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal><p className="wn-caption mb-3 text-white">Aura Architecture · Brand Identity</p></Reveal>
            <Reveal delay={0.08}>
              <h1 id="aura-hero-heading" className="max-w-[16ch] font-editorial text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white">
                Brand Identity Agency for <span style={{ color: '#FFC83D' }}><Underline>Memorable</Underline></span> Business Brands
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white opacity-90 sm:text-lg">
                A brand is more than a logo. It&apos;s how your business is recognized, understood and remembered. At watNidea, we build brand identities that combine strategy, design and storytelling — creating a presence that connects with your audience and stands out in your market.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-3 max-w-xl text-base font-medium text-white">
                Build a brand people remember with watNidea.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CTAButton href="/book-strategy-call" className="bg-[#111111] text-white hover:bg-[#2a2a2a]" aria-label="Start your brand project">Start Your Brand Project</CTAButton>
                <CTAButton href="/work" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />} className="border-white/40 text-white hover:bg-white/10" aria-label="Explore our work">Explore Our Work</CTAButton>
              </div>
            </Reveal>
          </div>
          {/* Identity-system visual */}
          <div className="hidden lg:col-span-5 lg:block">
            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-[22px] border border-[rgba(17,17,17,0.16)] bg-[#FFFFFF] p-5 shadow-[0_10px_30px_-18px_rgba(17,17,17,0.25)]">
                <div className="absolute -right-3 -top-3 z-10"><IdeaStamp label="Identity" size={84} color="#F13D32" /></div>
                <p className="wn-caption text-[#555255]">Identity System</p>
                {/* Wordmark variations */}
                <div className="mt-3 space-y-2">
                  <p className="font-editorial text-3xl font-bold tracking-tight text-[#111111]">wat<span style={{ color: '#F13D32' }}>N</span>idea</p>
                  <p className="font-editorial text-lg font-medium text-[#555255]">watNidea</p>
                  <div className="flex items-center gap-1.5"><span className="h-6 w-6 rounded border-2 border-[#F13D32]" aria-hidden /><span className="text-xs text-[#555255]">Mark</span></div>
                </div>
                <div className="my-4 h-px bg-[rgba(17,17,17,0.12)]" />
                {/* Colour tokens */}
                <p className="wn-caption text-[#555255]">Colour tokens</p>
                <div className="mt-2 flex gap-2">
                  <span className="h-8 w-8 rounded-lg" style={{ background: '#F13D32' }} aria-hidden />
                  <span className="h-8 w-8 rounded-lg" style={{ background: '#FF6B62' }} aria-hidden />
                  <span className="h-8 w-8 rounded-lg" style={{ background: '#111111' }} aria-hidden />
                  <span className="h-8 w-8 rounded-lg border border-[rgba(17,17,17,0.12)]" style={{ background: '#FFF7E9' }} aria-hidden />
                </div>
                <div className="my-4 h-px bg-[rgba(17,17,17,0.12)]" />
                {/* Typography samples */}
                <p className="wn-caption text-[#555255]">Typography</p>
                <div className="mt-2 flex flex-col gap-1">
                  <span className="font-editorial text-2xl font-bold leading-none">Aa</span>
                  <span className="font-editorial text-sm font-medium leading-none">Aa</span>
                  <span className="text-xs leading-none text-[#555255]">Aa</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[rgba(17,17,17,0.10)] pt-3">
                  <span className="font-editorial text-xs italic text-[#555255]">Strategy · Identity · Guidelines</span>
                </div>
              </div>
              <span aria-hidden className="wn-tape" style={{ left: '50%', top: '-10px', transform: 'translateX(-50%) rotate(-3deg)' }} />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S2 — Common Branding Problems (white, diagnostic checklist)
 * ============================================================ */
const PROBLEMS = [
  'Your logo looks outdated or no longer reflects what the business does',
  "Customers can't tell what you do within the first few seconds",
  'Your brand looks different across website, social media and print',
  'Competitors have stronger, more memorable brand identities',
  "You're launching a new product or entering a new market",
  'Your team struggles to explain what makes the brand different',
  "Your visual identity doesn't feel professional or trustworthy",
]

export function AuraProblems() {
  return (
    <Section surface="blush" ariaLabelledBy="aura-problems-heading">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01" accent="#F13D32">Common Branding Problems</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="aura-problems-heading" className="mt-4 max-w-[18ch]">
                Your brand may need a <Underline>change</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-base text-[#555255]">
                Most brand problems aren&apos;t about aesthetics — they&apos;re about clarity, consistency and recognition. If any of these sound familiar, it may be time to look at your brand identity.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-5">
              <p className="wn-caption text-[#555255]">Your Brand May Need a Change If</p>
              <ul className="mt-3 space-y-3">
                {PROBLEMS.map((p, i) => (
                  <Reveal key={i} delay={0.16 + i * 0.05}>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-[#F13D32]" aria-hidden />
                      <span className="text-sm leading-relaxed text-[#111111]">{p}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S3 — What Is Brand Identity Design? (sand, diagram + benefits)
 * ============================================================ */
const SYSTEM_PARTS = ['Strategy', 'Logo', 'Colour', 'Typography', 'Imagery', 'Messaging', 'Guidelines', 'Applications']
const BENEFITS = [
  { t: 'Recognition', d: 'Be identified instantly across every touchpoint.' },
  { t: 'Trust', d: 'A consistent brand signals reliability and professionalism.' },
  { t: 'Differentiation', d: 'Stand apart from competitors with a distinct identity.' },
  { t: 'Clarity', d: 'Communicate what you do and who you serve quickly.' },
  { t: 'Loyalty', d: 'Memorable brands build emotional connections over time.' },
  { t: 'Value', d: 'A strong identity increases perceived business value.' },
]

export function AuraWhatIs() {
  return (
    <Section surface="sand" ariaLabelledBy="aura-whatis-heading">
      <Container>
        <SectionLabel number="02" accent="#F13D32">What Is Brand Identity Design?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="aura-whatis-heading" className="mt-4 max-w-[20ch]">
            The system behind how your brand <Underline>looks and feels</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <p className="text-base leading-relaxed text-[#111111] opacity-85">
                Brand identity design is the visual and strategic system that defines how your business is recognized. It includes your logo, colour palette, typography, imagery, messaging and the guidelines that keep everything consistent.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-base leading-relaxed text-[#111111] opacity-85">
                A well-designed brand identity doesn&apos;t just look good — it communicates what your business stands for, builds trust with your audience, and creates a memorable impression that lasts.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.24}>
              <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
                <p className="wn-caption text-[#555255]">Brand System</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SYSTEM_PARTS.map((part) => (
                    <span key={part} className="inline-flex items-center rounded-full border border-[rgba(17,17,17,0.14)] bg-[#FFF7E9] px-3 py-1.5 text-xs font-medium text-[#111111]">{part}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.t} delay={0.28 + i * 0.04}>
              <div className="rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                <h3 className="font-editorial text-base font-semibold text-[#111111]">{b.t}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#555255]">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S4 — Our Brand Identity & Branding Services (paper, asymmetric)
 * ============================================================ */
const SERVICES_LIST = [
  { n: '01', t: 'Logo Design & Brand Mark', d: 'A distinctive logo and brand mark designed to be recognizable, scalable and timeless across every application.', accent: '#F13D32', specimen: 'logo' },
  { n: '02', t: 'Brand Strategy', d: 'Positioning, messaging architecture and brand foundations that define what your business stands for and why it matters.', accent: '#FFC83D', specimen: null },
  { n: '03', t: 'Visual Identity Design', d: 'Colour palettes, typography, imagery direction and design elements that form the complete visual language of your brand.', accent: '#3D5AFE', specimen: 'colour' },
  { n: '04', t: 'Brand Guidelines', d: 'Clear, usable guidelines that keep your brand consistent across teams, agencies and platforms.', accent: '#7657F6', specimen: 'type' },
  { n: '05', t: 'Brand Messaging', d: 'Voice, tone and key messages that communicate your brand consistently across every channel.', accent: '#157468', specimen: null },
  { n: '06', t: 'Packaging Design', d: 'Packaging concepts and dielines that extend the brand system into physical products and retail.', accent: '#FF6B62', specimen: 'packaging' },
  { n: '07', t: 'Rebranding', d: 'Refresh or reposition an existing brand — keeping what works, rebuilding what doesn&apos;t.', accent: '#F97316', specimen: null },
  { n: '08', t: 'Brand Collateral Design', d: 'Business cards, stationery, presentations and templates that keep the brand consistent in everyday use.', accent: '#66DFC0', specimen: null },
]

export function AuraServices() {
  return (
    <Section surface="red" ariaLabelledBy="aura-services-heading">
      <Container>
        <SectionLabel number="03" accent="#F13D32">Our Brand Identity &amp; Branding Services</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="aura-services-heading" className="mt-4 max-w-[20ch]">
            Eight ways to build your <Underline>brand</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            From logo design to brand guidelines, each service is built to work on its own or as part of a complete brand system. Explore the one that fits where you are now.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_LIST.map((s, i) => {
            const isLight = isLightHex(s.accent)
            return (
              <Reveal key={s.n} delay={0.24 + i * 0.04}>
                <div className="group relative flex h-full min-h-[150px] flex-col justify-between overflow-hidden rounded-[16px] border border-[rgba(17,17,17,0.12)] p-4" style={{ background: s.accent, color: isLight ? '#111111' : '#FFFFFF' }}>
                  <span aria-hidden className={isLight ? 'wn-halftone absolute inset-0 rounded-[16px] opacity-25' : 'wn-halftone-light absolute inset-0 rounded-[16px] opacity-25'} />
                  <div className="relative flex items-start justify-between">
                    <span className="wn-bignum text-2xl opacity-90">{s.n}</span>
                  </div>
                  <div className="relative">
                    <h3 className="font-editorial text-base font-semibold leading-tight">{s.t}</h3>
                    <p className="mt-1 text-xs leading-relaxed opacity-80">{s.d}</p>
                    {s.specimen === 'logo' && <div className="mt-2 flex items-center gap-1.5"><span className="h-4 w-4 rounded border-2" style={{ borderColor: isLight ? '#111111' : '#FFFFFF' }} aria-hidden /><span className="text-[0.55rem] opacity-70">Mark</span></div>}
                    {s.specimen === 'colour' && <div className="mt-2 flex gap-1">{['#F13D32', '#3D5AFE', '#FFC83D', '#111111'].map((c) => <span key={c} className="h-4 w-4 rounded" style={{ background: c }} aria-hidden />)}</div>}
                    {s.specimen === 'type' && <div className="mt-2"><span className="font-editorial text-lg font-bold leading-none">Aa</span></div>}
                    {s.specimen === 'packaging' && <div className="mt-2"><span className="inline-block h-6 w-8 rounded border-2" style={{ borderColor: isLight ? '#111111' : '#FFFFFF' }} aria-hidden /></div>}
                    <Link href="/book-strategy-call" className="mt-3 inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider hover:underline">
                      Discuss This Requirement <ArrowRight className="h-3 w-3" aria-hidden />
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S5 — Brand Identity Design Process (ink, 6-step timeline)
 * ============================================================ */
const PROCESS_STEPS = [
  { n: '1', t: 'Discovery', d: 'We learn your business, audience, market and goals. Research, audits and conversations that inform the brand direction.' },
  { n: '2', t: 'Brand Research', d: 'Competitive analysis, audience insights and market positioning research to understand where your brand fits.' },
  { n: '3', t: 'Brand Strategy', d: 'Positioning, messaging architecture and brand personality defined before design begins.' },
  { n: '4', t: 'Creative Direction', d: 'Art direction, visual references and creative concepts that translate strategy into design language.' },
  { n: '5', t: 'Identity Design', d: 'Logo, colour, typography, imagery and brand system designed and refined across applications.' },
  { n: '6', t: 'Brand Launch', d: 'Guidelines, assets and handover — everything your team needs to launch and maintain the brand.' },
]

export function AuraProcess() {
  return (
    <Section surface="ink" ariaLabelledBy="aura-process-heading">
      <Container>
        <SectionLabel number="04" accent="#FFC83D">Brand Identity Design Process</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="aura-process-heading" className="mt-4 max-w-[18ch] text-white">
            Six steps. One <Underline>connected</Underline> process.
          </EditorialHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.2 + i * 0.05}>
              <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F13D32] font-editorial text-xs font-bold text-white">{s.n}</span>
                  {i < 5 && <span aria-hidden className="hidden h-px flex-1 bg-[rgba(255,255,255,0.2)] sm:block" />}
                </div>
                <h3 className="mt-1 font-editorial text-sm font-semibold text-white">{s.t}</h3>
                <p className="text-xs leading-relaxed text-[rgba(255,255,255,0.72)]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S6 — Why Choose watNidea? (sand, 1 featured + 5 supporting)
 * ============================================================ */
const REASONS = [
  { t: 'Strategy Before Design', d: "We don't start designing until we understand the business. Strategy shapes every creative choice.", featured: true },
  { t: 'Creative & Practical Thinking', d: 'Design that looks good and works hard — across digital and print.' },
  { t: 'Consistent Brand Experience', d: 'Identity systems that stay consistent across every touchpoint and platform.' },
  { t: 'Business-Focused Branding', d: 'Brand decisions tied to business goals, not aesthetic trends.' },
  { t: 'Flexible Brand Systems', d: 'Guidelines that adapt as your business grows and evolves.' },
  { t: 'One Creative Partner', d: 'Strategy, design and production under one roof — no handoff gaps.' },
]

export function AuraWhyChoose() {
  return (
    <Section surface="blush" ariaLabelledBy="aura-why-heading">
      <Container>
        <SectionLabel number="05" accent="#F13D32">Why Choose watNidea?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="aura-why-heading" className="mt-4 max-w-[20ch]">
            Six reasons brands <Underline>choose</Underline> the studio.
          </EditorialHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal delay={0.16}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] bg-[#F13D32] p-6 text-white">
              <span aria-hidden className="wn-halftone-light absolute inset-0 rounded-[22px] opacity-25" />
              <div className="relative">
                <h3 className="font-editorial text-xl font-semibold leading-tight">{REASONS[0].t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgba(255,255,255,0.88)]">{REASONS[0].d}</p>
              </div>
              <div className="relative mt-4"><IdeaStamp label="What an idea" size={72} color="#FFFFFF" /></div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            {REASONS.slice(1).map((r, i) => (
              <Reveal key={r.t} delay={0.24 + i * 0.06}>
                <div className="flex h-full flex-col gap-1.5 rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                  <h3 className="font-editorial text-base font-semibold leading-tight">{r.t}</h3>
                  <p className="text-xs leading-relaxed text-[#555255]">{r.d}</p>
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
 * S7 — Industries We Can Support (paper, compact index)
 * ============================================================ */
const INDUSTRIES = ['Startups', 'Technology Businesses', 'E-commerce & Retail', 'Professional Services', 'Healthcare', 'Education']

export function AuraIndustries() {
  return (
    <Section surface="red" ariaLabelledBy="aura-industries-heading">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <SectionLabel number="06" accent="#F13D32">Industries We Can Support</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="aura-industries-heading" className="mt-3 max-w-[20ch] text-2xl sm:text-3xl">
                Where we can help.
              </EditorialHeading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((ind) => (
                <span key={ind} className="inline-flex items-center rounded-full border border-[rgba(17,17,17,0.18)] bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#111111]">{ind}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S8 — FAQ (white, accessible accordion)
 * ============================================================ */
export function AuraFaq() {
  return (
    <Section surface="white" ariaLabelledBy="aura-faq-heading">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel number="07" accent="#F13D32">Frequently Asked Questions</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="aura-faq-heading" className="mt-4">
                Questions, <Underline>honestly</Underline> answered.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-3 max-w-sm text-sm text-[#555255]">If yours isn&apos;t here, write to us. We&apos;ll answer honestly.</p>
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
