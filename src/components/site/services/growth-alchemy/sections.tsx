'use client'

/**
 * Growth Alchemy — Performance Marketing service page.
 * Custom implementation. 12 visible sections + Final CTA.
 *
 * Sections:
 *  S1  mint  — Hero with campaign-system visual (8-stage chain)
 *  S2  paper — Are Your Paid Campaigns Delivering Enough? (diagnostic board, 10 problems / 6 groups)
 *  S3  sand  — What Is Performance Marketing? (9-node framework)
 *  S4  paper — Performance Marketing Services (8 services / 4 groups, asymmetric)
 *  S5  white — Performance Marketing Services for Businesses (interactive goal-selector)
 *  S6  sand  — Performance Marketing for Small Businesses (7-point compact panel)
 *  S7  paper — ROI-Focused Performance Marketing Services (5-area measurement framework)
 *  S8  teal  — Performance Marketing Process (6-step campaign loop — the ONE dark section)
 *  S9  white — Why Choose watNidea? (1 featured + 5 supporting, asymmetric)
 *  S10 sand  — Advertising Solutions for Different Business Goals (interactive stage selector)
 *  S11 paper — What Makes Our Approach Different? (5 principles + framework)
 *  S12 white — FAQ (accessible accordion, 9 Q&As)
 *
 * Honesty rules enforced:
 *  - NO fake revenue / ROAS / leads / conversion-rate numbers.
 *  - NO guaranteed outcomes; outcomes framed as goals or potential.
 *  - NO official Google/Meta partner claims — only that we run campaigns on those platforms.
 *  - ROI metrics presented as an educational framework, not a fake dashboard.
 *  - "Concept interface" labels on any illustrative dashboard visual.
 *  - "measurement-led" instead of "results-focused".
 */

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  CTAButton,
  Sticker,
  Underline,
  IdeaStamp,
  FAQAccordion,
} from '@/components/site/primitives'
import { GROWTH_FAQS as FAQS } from '@/lib/growth-faq-data'

/* Service accents */
const MINT = '#66DFC0'
const DEEP_TEAL = '#157468'
const CREAM = '#FFF7E9'
const INK = '#111111'
const RED = '#F13D32'

/* ============================================================
 * S1 — Hero (mint) with campaign-system visual
 * H1: "Performance Marketing Agency for Measurable Growth"
 * Visual: 8-stage campaign chain (Audience → Message → Creative →
 *   Channel → Landing Page → Conversion Event → Measurement →
 *   Optimization). Labels only. Clearly labelled "Concept interface".
 * ============================================================ */
const CAMPAIGN_STAGES = [
  'Audience',
  'Message',
  'Creative',
  'Channel',
  'Landing Page',
  'Conversion Event',
  'Measurement',
  'Optimization',
]

export function GrowthHero() {
  return (
    <Section
      surface="paper"
      ariaLabelledBy="growth-hero-heading"
      className="relative overflow-hidden !pt-[calc(72px+3rem)] pb-14 sm:!pt-[calc(72px+4rem)] sm:pb-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#66DFC0] opacity-30 blur-[110px]" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#FFC83D] opacity-20 blur-[120px]" />
      </div>
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex rotate-[-2deg] rounded-full bg-[#101010] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_3px_0_#66DFC0]">
                Growth Alchemy · Paid Media
              </span>
            </Reveal>
            <Reveal delay={0.08}>
  <h1
    id="growth-hero-heading"
    className="mt-6 max-w-[14ch] font-editorial text-[clamp(2.75rem,4.6vw,4.75rem)] font-medium leading-[0.96] tracking-[-0.04em] text-[#101010]"
  >
    A{' '}
    <strong className="font-semibold">
      Performance Marketing Agency
    </strong>{' '}
    for clearer{' '}
    <span className="relative inline-block text-[#157468]">
      decisions.
      <span
        aria-hidden
        className="absolute -bottom-2 left-0 h-[6px] w-full rounded-full bg-[#66DFC0]"
      />
    </span>
  </h1>
</Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#5D5A54] sm:text-lg">
                We connect strategy, creative, paid media and tracking into one
                campaign system—so you can see what is working, understand what
                is not and decide what to test next.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CTAButton
                  href="/book-strategy-call"
                  className="bg-[#157468] text-white hover:bg-[#0F5C52]"
                  aria-label="Discuss your campaign"
                >
                  Discuss Your Campaign
                </CTAButton>
                <CTAButton
                  href="/work"
                  variant="secondary"
                  icon={<ArrowUpRight className="h-4 w-4" />}
                  aria-label="Explore our work"
                >
                  Explore Our Work
                </CTAButton>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wider text-[#5D5A54]">
                <span>Google Ads</span><span className="h-1.5 w-1.5 rounded-full bg-[#66DFC0]" />
                <span>Meta Ads</span><span className="h-1.5 w-1.5 rounded-full bg-[#FFC83D]" />
                <span>Tracking</span><span className="h-1.5 w-1.5 rounded-full bg-[#F13D32]" />
                <span>Optimisation</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <div className="relative mx-auto max-w-[650px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] border border-[rgba(16,16,16,0.16)] bg-[#101010] shadow-[0_28px_70px_-35px_rgba(16,16,16,0.55)]">
                  <Image
                    src="/work/performance-marketing-results.webp"
                    alt="Performance marketing campaign dashboards and reporting collage"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <span className="absolute -left-3 top-8 rotate-[-7deg] rounded-full bg-[#66DFC0] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#101010] shadow-[0_3px_0_#101010]">
                  Measure what matters
                </span>
                <span className="absolute -bottom-4 right-6 rotate-[3deg] rounded-full bg-[#FFC83D] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#101010] shadow-[0_3px_0_#101010]">
                  Test · Learn · Improve
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S2 — Are Your Paid Campaigns Delivering Enough? (paper, diagnostic board)
 * 10 problems grouped into 6 categories: Targeting, Creative, Campaign
 * Structure, Tracking, Budget, Optimization.
 * ============================================================ */
const DIAGNOSTIC_GROUPS: { group: string; items: string[] }[] = [
  {
    group: 'Targeting',
    items: [
      'Audiences are too broad or too narrow — ads reach people who will never buy',
      'Lookalike and retargeting layers are stacked without a clear purpose',
    ],
  },
  {
    group: 'Creative',
    items: [
      'Ad creative is reused across every campaign with no testing',
    ],
  },
  {
    group: 'Campaign Structure',
    items: [
      'Campaigns and ad groups are tangled — budgets fight each other inside the same account',
    ],
  },
  {
    group: 'Tracking',
    items: [
      'Conversion tracking is missing, broken, or reports different numbers than your sales tool',
      'Attribution credits the wrong channel and hides what actually drove the sale',
    ],
  },
  {
    group: 'Budget',
    items: [
      'Spend is spread across too many channels to read any signal',
      'Budgets scale before the underlying campaign has earned it',
    ],
  },
  {
    group: 'Optimization',
    items: [
      'No fixed review cadence — campaigns run for weeks without a real decision',
      'Losing ads keep running because nobody has paused them',
    ],
  },
]

export function GrowthDiagnostic() {
  return (
    <Section surface="paper" ariaLabelledBy="growth-diagnostic-heading" className="lg:!py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01" accent={DEEP_TEAL}>
              Are Your Paid Campaigns Delivering Enough?
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading
                as="h2"
                id="growth-diagnostic-heading"
                className="mt-4 max-w-[18ch]"
              >
                Most campaigns spend money. Few spend it{' '}
                <Underline>deliberately</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[#555255]">
                Paid campaigns rarely fail because the platform didn&rsquo;t
                work. They drift because the targeting, creative, structure,
                tracking, budget and optimisation were never treated as one
                system. When any of these slip, spend keeps going out while
                clarity about what it bought quietly disappears.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#555255]">
                A performance marketing agency researches the audience,
                measures what each campaign produces, and improves the next
                cycle based on real signal — not on gut, and not on vanity
                metrics.
              </p>
            </Reveal>
          </div>

          {/* Diagnostic board */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.2}>
              <div className="rounded-[18px] border border-[rgba(17,17,17,0.14)] bg-[#FFFFFF] p-5">
                <div className="flex items-center justify-between">
                  <p className="wn-caption text-[#555255]">
                    Common advertising problems
                  </p>
                  <Sticker accent={DEEP_TEAL} textColor="#FFFFFF" tilt="left">
                    Diagnostic board
                  </Sticker>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {DIAGNOSTIC_GROUPS.map((g, i) => (
                    <Reveal key={g.group} delay={0.24 + i * 0.05}>
                      <div className="flex h-full flex-col rounded-[12px] border border-[rgba(17,17,17,0.10)] bg-[#FFF7E9] p-4">
                        <div className="flex items-center gap-2">
                          <span
                            aria-hidden
                            className="flex h-6 w-6 items-center justify-center rounded-full text-[0.6rem] font-bold"
                            style={{ background: MINT, color: DEEP_TEAL }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <h3 className="font-editorial text-sm font-semibold text-[#111111]">
                            {g.group}
                          </h3>
                        </div>
                        <ul className="mt-2 space-y-2">
                          {g.items.map((it) => (
                            <li
                              key={it}
                              className="flex items-start gap-2 text-xs leading-relaxed text-[#555255]"
                            >
                              <span
                                aria-hidden
                                className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#F13D32]"
                              />
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-wider text-[#555255]">
                  A structural checklist — not an account inspection
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S3 — What Is Performance Marketing? (sand, 9-node framework)
 * ============================================================ */
const FRAMEWORK_NODES = [
  'Research',
  'Strategy',
  'Advertising',
  'Creative',
  'Tracking',
  'Testing',
  'Budget',
  'Reporting',
  'Improvement',
]
const FOCUS_POINTS = [
  'Reaching the right audience — not the biggest one',
  'Creative built around a hypothesis, not a hunch',
  'Tracking that survives browser privacy changes',
  'Testing one variable at a time',
  'Reporting that answers &ldquo;what next?&rdquo;',
]

export function GrowthWhatIs() {
  return (
    <Section surface="lime" ariaLabelledBy="growth-whatis-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="02" accent={DEEP_TEAL}>
          What Is Performance Marketing?
        </SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading
            as="h2"
            id="growth-whatis-heading"
            className="mt-4 max-w-[22ch]"
          >
            Advertising that is built to be{' '}
            <Underline>measured</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <p className="text-base leading-relaxed text-[#111111] opacity-85">
                Performance marketing is a measurement-led approach to paid
                advertising. Instead of paying for attention and hoping,
                performance marketing pays for defined actions &mdash; clicks,
                leads, conversions &mdash; and then measures, tests and
                improves the next cycle against what actually happened.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-base leading-relaxed text-[#111111] opacity-85">
                It covers the whole system: research, strategy, advertising,
                creative, tracking, testing, budget, reporting and improvement
                &mdash; connected in a loop, not a line.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-4 text-sm leading-relaxed text-[#555255]">
                Measurable outcomes depend on the offer, the market, the
                budget, tracking quality, the sales process and other business
                factors. Advertising is one part of a larger system &mdash; it
                can be measured and improved, but it cannot guarantee outcomes
                on its own.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.24}>
              <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
                <p className="wn-caption text-[#555255]">
                  Performance marketing framework
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FRAMEWORK_NODES.map((n, i) => (
                    <span
                      key={n}
                      className="inline-flex items-center gap-2 rounded-full border border-[rgba(17,17,17,0.14)] bg-[#FFF7E9] px-3 py-1.5 text-xs font-medium text-[#111111]"
                    >
                      <span
                        aria-hidden
                        className="font-editorial text-[0.6rem] font-bold"
                        style={{ color: DEEP_TEAL }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {n}
                    </span>
                  ))}
                </div>
                <div className="my-4 h-px bg-[rgba(17,17,17,0.10)]" />
                <p className="wn-caption text-[#555255]">What we focus on</p>
                <ul className="mt-2 space-y-2">
                  {FOCUS_POINTS.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-sm leading-relaxed text-[#111111]"
                      dangerouslySetInnerHTML={{ __html: `<span aria-hidden class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style="background:${DEEP_TEAL}"></span>${p}` }}
                    />
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S4 — Performance Marketing Services (paper, asymmetric 4-group architecture)
 * 8 services in 4 groups: Reach · Convert · Measure · Improve.
 * ============================================================ */
type ServiceItem = { n: string; t: string; d: string }
type ServiceGroup = {
  group: string
  intent: string
  accent: string
  items: ServiceItem[]
}

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    group: 'Reach',
    intent: 'Find the right audience on the right platform.',
    accent: MINT,
    items: [
      {
        n: '01',
        t: 'Google Ads Management',
        d: 'Search, Display and Performance Max campaigns set up under your account — keyword research, campaign structure, ad copy and conversion tracking.',
      },
      {
        n: '02',
        t: 'Meta Advertising',
        d: 'Paid campaigns on Facebook and Instagram — audience targeting, ad creative, pixel setup and reporting inside your own Meta Ads Manager.',
      },
    ],
  },
  {
    group: 'Convert',
    intent: 'Turn attention into action.',
    accent: '#4FC9AE',
    items: [
      {
        n: '03',
        t: 'PPC Management',
        d: 'Ongoing management of pay-per-click campaigns — bid strategy, keyword and audience refinement, ad copy testing and budget allocation.',
      },
      {
        n: '04',
        t: 'Paid Advertising',
        d: 'Cross-platform paid media planning and execution — campaign sequencing, channel mix and creative alignment with the landing page.',
      },
      {
        n: '05',
        t: 'Lead Generation Campaigns',
        d: 'Campaigns built around a defined lead action — form fills, calls or sign-ups — with lead-quality tracking, not just volume.',
      },
    ],
  },
  {
    group: 'Measure',
    intent: 'Know what each campaign actually produced.',
    accent: '#1F8E78',
    items: [
      {
        n: '06',
        t: 'Conversion Tracking',
        d: 'GA4, server-side tagging, pixel and event setup — so leads, conversions and revenue can be attributed reliably, with privacy-respecting consent.',
      },
    ],
  },
  {
    group: 'Improve',
    intent: 'Make the next cycle better than the last.',
    accent: DEEP_TEAL,
    items: [
      {
        n: '07',
        t: 'Remarketing',
        d: 'Retargeting layers built on first-party audiences — visitors, leads, past buyers — with clear frequency caps and fresh creative.',
      },
      {
        n: '08',
        t: 'Campaign Optimization',
        d: 'Weekly and monthly optimisation — scale what shows signal, pause what doesn&rsquo;t, queue the next test against a documented hypothesis.',
      },
    ],
  },
]

export function GrowthServices() {
  return (
    <Section surface="paper" ariaLabelledBy="growth-services-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="02" accent={DEEP_TEAL}>
          Our Performance Marketing Services
        </SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading
            as="h2"
            id="growth-services-heading"
            className="mt-4 max-w-[22ch]"
          >
            Eight services. Four <Underline>stages</Underline>. One system.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
  <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
    Our{' '}
    <strong className="font-semibold">
      performance marketing services for businesses
    </strong>{' '}
    connect paid media, creative testing, conversion tracking, remarketing
    and campaign analysis into one measurable system.
  </p>
</Reveal>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Reach — featured wide card, 2 items */}
          <Reveal delay={0.2} className="lg:col-span-7">
            <ServiceGroupCard group={SERVICE_GROUPS[0]} variant="wide" />
          </Reveal>
          {/* Measure — tall card, 1 item */}
          <Reveal delay={0.26} className="lg:col-span-5">
            <ServiceGroupCard group={SERVICE_GROUPS[2]} variant="tall" />
          </Reveal>
          {/* Convert — wide card, 3 items */}
          <Reveal delay={0.32} className="lg:col-span-7">
            <ServiceGroupCard group={SERVICE_GROUPS[1]} variant="wide" />
          </Reveal>
          {/* Improve — tall card, 2 items */}
          <Reveal delay={0.38} className="lg:col-span-5">
            <ServiceGroupCard group={SERVICE_GROUPS[3]} variant="tall" />
          </Reveal>
        </div>

        <Reveal delay={0.44}>
          <p className="mt-6 text-xs leading-relaxed text-[#555255]">
            watNidea runs campaigns on Google and Meta platforms. We are not
            an official Google or Meta partner &mdash; we set up and manage
            campaigns inside your own ad accounts.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

export function GrowthSelectedProof() {
  return (
    <Section surface="sand" ariaLabelledBy="growth-proof-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="03" accent={DEEP_TEAL}>
          Campaign Evidence
        </SectionLabel>
        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-[rgba(17,17,17,0.14)] bg-[#101010] shadow-[0_24px_60px_-32px_rgba(17,17,17,0.5)]">
              <Image
                src="/work/performance-marketing-results.webp"
                alt="Paid media dashboards showing campaign reporting and optimisation work"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="growth-proof-heading" className="max-w-[18ch]">
                Reporting that leads to the <Underline>next decision</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 text-base leading-relaxed text-[#555255]">
                We organise campaign data so the useful signals are visible:
                audience response, creative performance, cost movement and the
                path from click to business outcome.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <ul className="mt-6 space-y-3">
                {[
                  'Clear account and campaign structure',
                  'Documented tests and optimisation decisions',
                  'Reporting connected to verified business outcomes',
                ].map((item, index) => (
                  <li key={item} className="flex gap-3 rounded-[14px] border border-[rgba(17,17,17,0.11)] bg-white/70 p-3 text-sm text-[#111111]">
                    <span className="font-bold text-[#157468]">0{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-5 text-xs leading-relaxed text-[#555255]">
                Visuals show campaign interfaces from performance work. Past
                performance is not a guarantee of future results; sensitive
                account information should be anonymised before publication.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function ServiceGroupCard({
  group,
  variant,
}: {
  group: ServiceGroup
  variant: 'wide' | 'tall'
}) {
  const isDark = group.accent === DEEP_TEAL || group.accent === '#1F8E78'
  const cardText = isDark ? '#FFFFFF' : INK
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[rgba(17,17,17,0.12)] p-4 ${
        variant === 'tall' ? 'min-h-[220px]' : 'min-h-[170px]'
      }`}
      style={{ background: group.accent, color: cardText }}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[22px] opacity-20 ${
          isDark ? 'wn-halftone-light' : 'wn-halftone'
        }`}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <h3 className="font-editorial text-xl font-semibold leading-tight">
            {group.group}
          </h3>
          <p
            className="mt-1 text-xs leading-relaxed"
            style={{ opacity: 0.78 }}
          >
            {group.intent}
          </p>
        </div>
        <span className="wn-bignum font-editorial text-2xl opacity-90">
          {group.items.length}
        </span>
      </div>
      <div className="relative mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {group.items.map((s) => (
          <div
            key={s.n}
            className="flex flex-col rounded-[12px] border p-3"
            style={{
              borderColor: isDark
                ? 'rgba(255,255,255,0.18)'
                : 'rgba(17,17,17,0.14)',
              background: isDark
                ? 'rgba(255,255,255,0.06)'
                : 'rgba(255,253,248,0.7)',
            }}
          >
            <div className="flex items-baseline gap-2">
              <span
                className="font-editorial text-[0.7rem] font-bold"
                style={{ color: isDark ? MINT : DEEP_TEAL }}
                aria-hidden
              >
                {s.n}
              </span>
              <h4 className="font-editorial text-sm font-semibold leading-tight">
                {s.t}
              </h4>
            </div>
            <p
              className="mt-1 text-xs leading-relaxed"
              style={{ opacity: 0.82 }}
              dangerouslySetInnerHTML={{ __html: s.d }}
            />
            <Link
              href="/book-strategy-call"
              className="mt-2 inline-flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-wider hover:underline"
            >
              Discuss This Service{' '}
              <ArrowRight className="h-2.5 w-2.5" aria-hidden />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
 * S5 — Performance Marketing Services for Businesses (white, goal-selector)
 * 5 business objectives; selecting one changes the adjacent qualitative
 * campaign approach. No fabricated budgets or forecasts.
 * ============================================================ */
type Goal = {
  key: string
  title: string
  summary: string
  approach: string[]
}

const GOALS: Goal[] = [
  {
    key: 'leads',
    title: 'Generate Quality Leads',
    summary: 'Acquire leads that your sales team can actually work.',
    approach: [
      'High-intent search campaigns on Google',
      'Lead-focused landing pages with a single clear action',
      'Form length and fields tuned for lead quality, not just volume',
      'Lead-source attribution connected to your CRM or sales tool',
    ],
  },
  {
    key: 'conversions',
    title: 'Increase Conversions',
    summary: 'Lift the share of visitors who complete the desired action.',
    approach: [
      'Conversion-focused ad creative aligned to a landing page',
      'Remarketing to re-engage visitors who did not convert',
      'A/B testing on headlines, CTAs and page sections',
      'Conversion tracking that mirrors your real definition of a win',
    ],
  },
  {
    key: 'products',
    title: 'Promote Products',
    summary: 'Put specific products in front of buyers with active intent.',
    approach: [
      'Product feed campaigns where the catalog supports them',
      'Shopping ads on Google for product-level visibility',
      'Visual Meta ads built around the product, not the brand',
      'Inventory-aware budget allocation so spend follows stock',
    ],
  },
  {
    key: 'awareness',
    title: 'Build Brand Awareness',
    summary: 'Reach new audiences and make the brand recognisable.',
    approach: [
      'Reach-focused campaigns with broad-but-defined audiences',
      'Video and short-form formats on Meta where they fit',
      'Frequency-capped creative built for recall, not clicks',
      'Awareness measured alongside downstream conversion signal',
    ],
  },
  {
    key: 'efficiency',
    title: 'Improve Advertising Efficiency',
    summary: 'Spend less to produce the same or better outcomes.',
    approach: [
      'Budget reallocation away from losing campaigns',
      'Audience pruning and negative keyword expansion',
      'Bid strategy tuned to the right conversion event',
      'Creative refresh cadence to fight ad fatigue',
    ],
  },
]

export function GrowthForBusinesses() {
  const [active, setActive] = useState(0)
  const goal = GOALS[active]
  return (
    <Section surface="softmint" ariaLabelledBy="growth-businesses-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="04" accent={DEEP_TEAL}>
          Performance Marketing Services for Businesses
        </SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading
            as="h2"
            id="growth-businesses-heading"
            className="mt-4 max-w-[22ch]"
          >
            Pick a goal. See the{' '}
            <Underline>campaign approach</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            These are campaign objectives &mdash; not promised results. The
            approach for each is qualitative; real budgets and forecasts come
            out of a strategy call, not a webpage.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Goal selector — left/top */}
          <div className="lg:col-span-5">
            <p className="wn-caption text-[#555255]">Business objective</p>
            <div
              role="tablist"
              aria-label="Business objectives"
              className="mt-3 flex flex-col gap-2"
            >
              {GOALS.map((g, i) => {
                const isActive = i === active
                return (
                  <button
                    key={g.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`goal-panel-${g.key}`}
                    id={`goal-tab-${g.key}`}
                    onClick={() => setActive(i)}
                    className="flex items-center justify-between gap-3 rounded-[12px] border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      borderColor: isActive
                        ? DEEP_TEAL
                        : 'rgba(17,17,17,0.14)',
                      background: isActive ? MINT : '#FFFFFF',
                      color: INK,
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="font-editorial text-xs font-bold"
                        style={{ color: DEEP_TEAL }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-editorial text-sm font-semibold leading-tight">
                        {g.title}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0"
                      style={{
                        color: isActive ? DEEP_TEAL : '#555255',
                        transform: isActive ? 'translateX(2px)' : 'none',
                      }}
                      aria-hidden
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Approach panel — right/bottom */}
          <div className="lg:col-span-7">
            <div
              role="tabpanel"
              id={`goal-panel-${goal.key}`}
              aria-labelledby={`goal-tab-${goal.key}`}
              className="flex h-full min-h-[200px] flex-col rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-editorial text-lg font-semibold leading-tight text-[#111111]">
                    {goal.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#555255]">
                    {goal.summary}
                  </p>
                </div>
                <Sticker accent={DEEP_TEAL} textColor="#FFFFFF" tilt="right">
                  Approach
                </Sticker>
              </div>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {goal.approach.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-[10px] border border-[rgba(17,17,17,0.08)] bg-[#FFFFFF] px-3 py-2 text-xs leading-relaxed text-[#111111]"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.55rem] font-bold"
                      style={{ background: MINT, color: DEEP_TEAL }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-4 text-[0.65rem] font-semibold uppercase tracking-wider text-[#555255]">
                Qualitative approach &mdash; no fabricated budgets or
                forecasts
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S6 — Performance Marketing for Small Businesses (sand, 7-point panel)
 * Compact feature panel focused on careful budgeting, gradual testing,
 * understandable measurement. Acknowledges suitability depends on goals,
 * offer, budget, readiness.
 * ============================================================ */
const SMALL_BIZ_POINTS = [
  'Start with a clear offer — paid ads amplify what already works; they don&rsquo;t fix a weak one.',
  'Begin with a focused budget — test one or two channels before spreading spend.',
  'Set up tracking before spending — know what a conversion is and where it comes from.',
  'Test one variable at a time — creative, audience or landing page, not all at once.',
  'Watch the right metrics — cost per lead and conversion quality, not just clicks.',
  'Review on a fixed cadence — weekly reads, monthly decisions, no impulsive scaling.',
  'Pause what doesn&rsquo;t earn — kill losing ads early and reallocate to what shows signal.',
]

export function GrowthForSmallBiz() {
  return (
    <Section surface="lime" ariaLabelledBy="growth-smallbiz-heading" className="lg:!py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="05" accent={DEEP_TEAL}>
              Performance Marketing for Small Businesses
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading
                as="h2"
                id="growth-smallbiz-heading"
                className="mt-4 max-w-[20ch]"
              >
                Small budgets, careful <Underline>testing</Underline>, clear
                measurement.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#555255]">
                Performance marketing for small businesses is built around
                focused budgets, gradual testing and measurement you can
                actually understand. The aim is to make a small spend
                defensible &mdash; not to chase scale before the system has
                earned it.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 max-w-md text-xs leading-relaxed text-[#555255]">
                Suitability depends on your goals, your offer, your budget and
                your readiness. Paid advertising is not always the right first
                step &mdash; and we will tell you when it isn&rsquo;t.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-6">
                <CTAButton
                  href="/book-strategy-call"
                  className="bg-[#157468] text-white hover:bg-[#0F5C52]"
                  aria-label="Plan a focused campaign"
                >
                  Plan a Focused Campaign
                </CTAButton>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.2}>
              <div className="rounded-[18px] border border-[rgba(17,17,17,0.14)] bg-[#FFFFFF] p-5">
                <div className="flex items-center justify-between">
                  <p className="wn-caption text-[#555255]">
                    Seven points for small-business campaigns
                  </p>
                  <Sticker accent={INK} textColor={MINT} tilt="right">
                    Compact panel
                  </Sticker>
                </div>
                <ol className="mt-4 space-y-2">
                  {SMALL_BIZ_POINTS.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-[12px] border border-[rgba(17,17,17,0.08)] bg-[#FFF7E9] px-3 py-2.5"
                      dangerouslySetInnerHTML={{
                        __html: `<span aria-hidden class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold" style="background:${MINT};color:${DEEP_TEAL}">${String(i + 1).padStart(2, '0')}</span><span class="text-xs leading-relaxed text-[#111111]">${p}</span>`,
                      }}
                    />
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S7 — ROI-Focused Performance Marketing Services (paper, 5-area framework)
 * Educational measurement framework, not a fake dashboard.
 * ============================================================ */
const ROI_AREAS = [
  {
    n: '01',
    t: 'Cost Per Lead',
    abbr: 'CPL',
    d: 'Total ad spend divided by leads generated in the same window. Depends on accurate lead tracking and a consistent definition of what counts as a lead.',
  },
  {
    n: '02',
    t: 'Conversion Rate',
    abbr: 'CR',
    d: 'Share of visitors who complete the desired action. Depends on landing page quality, tracking quality and how narrowly the audience was targeted.',
  },
  {
    n: '03',
    t: 'Return on Ad Spend',
    abbr: 'ROAS',
    d: 'Revenue attributed to ads divided by ad spend. Only meaningful where revenue attribution is available and reliable &mdash; not a number to report without it.',
  },
  {
    n: '04',
    t: 'Customer Acquisition Cost',
    abbr: 'CAC',
    d: 'Total marketing and sales cost divided by new customers acquired. Requires both ad spend and sales-side data &mdash; ad platforms alone cannot compute it.',
  },
  {
    n: '05',
    t: 'Campaign Performance',
    abbr: 'CP',
    d: 'Overall health signal &mdash; reach, engagement, click-through rate, conversions and cost trends read together, not in isolation.',
  },
]

export function GrowthRoi() {
  return (
    <Section surface="softmint" ariaLabelledBy="growth-roi-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="06" accent={DEEP_TEAL}>
          ROI-Focused Performance Marketing Services
        </SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading
            as="h2"
            id="growth-roi-heading"
            className="mt-4 max-w-[22ch]"
          >
            The five metrics we <Underline>read together</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#111111] opacity-85">
            ROI-focused marketing is an educational framework, not a live
            dashboard. These five metrics depend on accurate tracking and
            reliable business data. We read them together &mdash; and we keep
            advertising-platform reporting separate from verified sales and
            revenue.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ROI_AREAS.map((m, i) => (
            <Reveal key={m.abbr} delay={0.2 + i * 0.05}>
              <div className="flex h-full min-h-[200px] flex-col justify-between rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                <div className="flex items-start justify-between">
                  <span
                    className="font-editorial text-2xl font-bold"
                    style={{ color: DEEP_TEAL }}
                    aria-hidden
                  >
                    {m.n}
                  </span>
                  <span
                    aria-hidden
                    className="rounded-md px-2 py-0.5 font-mono text-[0.6rem] font-bold"
                    style={{ background: MINT, color: DEEP_TEAL }}
                  >
                    {m.abbr}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-editorial text-sm font-semibold leading-tight text-[#111111]">
                    {m.t}
                  </h3>
                  <p
                    className="mt-1 text-xs leading-relaxed text-[#555255]"
                    dangerouslySetInnerHTML={{ __html: m.d }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.52}>
          <div className="mt-6 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#EAE0D1] p-4">
            <p className="text-xs leading-relaxed text-[#111111]">
              <strong className="font-editorial">How we read these:</strong>{' '}
              advertising-platform metrics (clicks, impressions, platform-reported
              conversions) are kept separate from verified business outcomes
              (leads qualified by sales, revenue booked in your finance tool).
              We do not claim ROI or profitability based only on
              advertising-platform reporting. ROAS is only shown where revenue
              attribution is genuinely available.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S8 — Performance Marketing Process (teal — the ONE dark section)
 * 6 steps as a measurable campaign loop. Step 6 (Optimization) feeds back
 * to step 2 (Strategy) and step 3 (Creative).
 * ============================================================ */
const PROCESS_STEPS = [
  {
    n: '1',
    t: 'Research & Discovery',
    d: 'Business, audience, market, competitors, current tracking and offer. We document what exists before we touch what comes next.',
  },
  {
    n: '2',
    t: 'Strategy & Planning',
    d: 'Campaign objectives, channel mix, audience map, budget allocation, hypothesis and the metrics each test will be read against.',
  },
  {
    n: '3',
    t: 'Creative & Ad Development',
    d: 'Ad copy, creative variants, landing page alignment, tracking events and naming conventions &mdash; built so testing is clean.',
  },
  {
    n: '4',
    t: 'Campaign Setup',
    d: 'Accounts, campaigns, audiences, conversions, pixels and consent-respecting tracking go live as one connected system.',
  },
  {
    n: '5',
    t: 'Tracking & Analysis',
    d: 'Read against the hypothesis &mdash; what produced signal, what didn&rsquo;t, what was inconclusive, and what to test next.',
  },
  {
    n: '6',
    t: 'Optimization & Growth',
    d: 'Scale what earned it, pause what didn&rsquo;t, queue the next test. Findings feed back into strategy and creative &mdash; closing the loop.',
  },
]

export function GrowthProcess() {
  return (
    <Section surface="teal" ariaLabelledBy="growth-process-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="04" accent={MINT}>
          Performance Marketing Process
        </SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading
            as="h2"
            id="growth-process-heading"
            className="mt-4 max-w-[22ch] text-white"
          >
            Six steps. One measurable{' '}
            <Underline>campaign loop</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[rgba(255,255,255,0.82)]">
            Not a one-time timeline. Findings from optimisation return to
            strategy and creative testing &mdash; so each cycle starts from
            real signal, not from scratch.
          </p>
        </Reveal>

        {/* Loop visual — vertical on mobile, ring on desktop */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.2 + i * 0.06}>
              <div className="relative flex h-full min-h-[150px] flex-col justify-between rounded-[18px] border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.05)] p-4">
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full font-editorial text-sm font-bold"
                    style={{ background: MINT, color: DEEP_TEAL }}
                    aria-hidden
                  >
                    {s.n}
                  </span>
                  <span
                    aria-hidden
                    className="font-mono text-[0.6rem] uppercase tracking-wider text-[rgba(255,255,255,0.55)]"
                  >
                    Step {s.n}/6
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-editorial text-base font-semibold leading-tight text-white">
                    {s.t}
                  </h3>
                  <p
                    className="mt-1.5 text-xs leading-relaxed text-[rgba(255,255,255,0.72)]"
                    dangerouslySetInnerHTML={{ __html: s.d }}
                  />
                </div>
                {/* Loop arrow back from step 6 → step 2 */}
                {i === 5 && (
                  <span
                    aria-hidden
                    className="absolute -bottom-2 left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-[#66DFC0] px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-[#157468] lg:flex"
                  >
                    <ArrowRight className="h-2.5 w-2.5" /> Loops back to Strategy
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Loop caption */}
        <Reveal delay={0.64}>
          <p className="mt-8 flex items-center gap-2 text-xs leading-relaxed text-[rgba(255,255,255,0.66)]">
            <ArrowRight className="h-3 w-3" aria-hidden />
            Mobile: vertical sequence &mdash; no forced horizontal scroll.
            Desktop: the loop closes when step 6 feeds step 2.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S9 — Why Choose watNidea? (white, asymmetric grid)
 * 1 featured + 5 supporting. No generic checkmarks/trophies/partner badges.
 * ============================================================ */
const WHY_REASONS = [
  {
    t: 'Strategy Before Spending',
    d: 'We understand the business, offer and audience before a single rupee of ad spend goes live. Strategy shapes every creative choice.',
    featured: true,
  },
  {
    t: 'Data-Led Optimisation',
    d: 'Decisions read against documented hypotheses &mdash; not against gut, and not against vanity metrics.',
  },
  {
    t: 'Google & Meta Campaigns',
    d: 'We run paid campaigns on Google and Meta. We are not an official partner &mdash; we set up and manage inside your own accounts.',
  },
  {
    t: 'Business-Focused Approach',
    d: 'Campaign decisions tied to business goals &mdash; leads, sales and revenue &mdash; not to platform-side metrics alone.',
  },
  {
    t: 'Clear Reporting',
    d: 'Reporting you can open, read and act on. Advertising metrics kept separate from verified business outcomes.',
  },
  {
    t: 'Continuous Improvement',
    d: 'A fixed cadence of reviews and tests &mdash; so the campaign is never done, only on its next iteration.',
  },
]

export function GrowthWhyChoose() {
  return (
    <Section surface="softmint" ariaLabelledBy="growth-why-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="05" accent={DEEP_TEAL}>
          Why Choose watNidea?
        </SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading
            as="h2"
            id="growth-why-heading"
            className="mt-4 max-w-[22ch]"
          >
            Six reasons brands choose the{' '}
            <Underline>studio</Underline>.
          </EditorialHeading>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Featured card */}
          <Reveal delay={0.16}>
            <div className="relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-[22px] p-6 text-white"
              style={{ background: DEEP_TEAL }}
            >
              <span
                aria-hidden
                className="wn-halftone-light pointer-events-none absolute inset-0 rounded-[22px] opacity-20"
              />
              <div className="relative">
                <h3 className="font-editorial text-xl font-semibold leading-tight">
                  {WHY_REASONS[0].t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgba(255,255,255,0.86)]">
                  {WHY_REASONS[0].d}
                </p>
              </div>
              <div className="relative mt-4">
                <IdeaStamp label="What an idea" size={72} color={MINT} />
              </div>
            </div>
          </Reveal>

          {/* 5 supporting cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            {WHY_REASONS.slice(1).map((r, i) => (
              <Reveal key={r.t} delay={0.24 + i * 0.05}>
                <div className="flex h-full min-h-[140px] flex-col rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-3">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="flex h-6 w-6 items-center justify-center rounded-full text-[0.6rem] font-bold"
                      style={{ background: MINT, color: DEEP_TEAL }}
                    >
                      {String(i + 2).padStart(2, '0')}
                    </span>
                    <h3 className="font-editorial text-sm font-semibold leading-tight text-[#111111]">
                      {r.t}
                    </h3>
                  </div>
                  <p
                    className="text-xs leading-relaxed text-[#555255]"
                    dangerouslySetInnerHTML={{ __html: r.d }}
                  />
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
 * S10 — Advertising Solutions for Different Business Goals (sand, stage selector)
 * 6 categories. Interactive selector — selecting a stage shows the
 * relevant approach. No invented sample campaign results.
 * ============================================================ */
type Stage = {
  key: string
  title: string
  summary: string
  focus: string
}

const STAGES: Stage[] = [
  {
    key: 'startups',
    title: 'Startups',
    summary: 'New brands that need to find their first signal.',
    focus: 'Focused tests on one or two channels; learn what audience and message produce real signal before scaling spend.',
  },
  {
    key: 'small',
    title: 'Small Businesses',
    summary: 'Local or niche businesses with a tight budget.',
    focus: 'High-intent search campaigns and lead-focused landing pages; measurement set up before spend grows.',
  },
  {
    key: 'ecommerce',
    title: 'E-commerce Brands',
    summary: 'Catalog-driven brands selling direct.',
    focus: 'Product feed campaigns, shopping ads, conversion-rate-focused landing pages and inventory-aware budget allocation.',
  },
  {
    key: 'service',
    title: 'Service Businesses',
    summary: 'High-consideration services with a longer cycle.',
    focus: 'Lead-quality tracking, remarketing to in-market visitors, and hand-off alignment with the sales team.',
  },
  {
    key: 'growing',
    title: 'Growing Companies',
    summary: 'Brands ready to move from one channel to a mix.',
    focus: 'Channel-mix planning, cross-channel attribution, and budget reallocation toward what shows signal.',
  },
  {
    key: 'established',
    title: 'Established Brands',
    summary: 'Brands with existing spend that needs structure.',
    focus: 'Account restructure, creative refresh cadence, and reporting that separates platform metrics from business outcomes.',
  },
]

export function GrowthStages() {
  const [active, setActive] = useState(0)
  const stage = STAGES[active]
  return (
    <Section surface="lime" ariaLabelledBy="growth-stages-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="09" accent={DEEP_TEAL}>
          Advertising Solutions for Different Business Goals
        </SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading
            as="h2"
            id="growth-stages-heading"
            className="mt-4 max-w-[22ch]"
          >
            Where your business <Underline>sits</Underline> shapes the approach.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            The same campaign structure does not fit a startup and an
            established brand. Select a business stage to see the qualitative
            approach &mdash; not a sample campaign result.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Stage selector chips */}
          <div className="lg:col-span-5">
            <p className="wn-caption text-[#555255]">Business stage</p>
            <div
              role="tablist"
              aria-label="Business stages"
              className="mt-3 flex flex-wrap gap-2"
            >
              {STAGES.map((s, i) => {
                const isActive = i === active
                return (
                  <button
                    key={s.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`stage-panel-${s.key}`}
                    id={`stage-tab-${s.key}`}
                    onClick={() => setActive(i)}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      borderColor: isActive
                        ? DEEP_TEAL
                        : 'rgba(17,17,17,0.18)',
                      background: isActive ? MINT : '#FFFFFF',
                      color: INK,
                    }}
                  >
                    <span
                      aria-hidden
                      className="font-editorial text-[0.65rem] font-bold"
                      style={{ color: DEEP_TEAL }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.title}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Stage approach panel */}
          <div className="lg:col-span-7">
            <div
              role="tabpanel"
              id={`stage-panel-${stage.key}`}
              aria-labelledby={`stage-tab-${stage.key}`}
              className="flex h-full min-h-[180px] flex-col rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-editorial text-lg font-semibold leading-tight text-[#111111]">
                    {stage.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#555255]">
                    {stage.summary}
                  </p>
                </div>
                <Sticker accent={INK} textColor={MINT} tilt="left">
                  Stage {String(active + 1).padStart(2, '0')}
                </Sticker>
              </div>
              <div className="mt-4 rounded-[12px] border border-[rgba(17,17,17,0.08)] bg-[#FFF7E9] p-4">
                <p className="wn-caption text-[#555255]">Approach focus</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#111111]">
                  {stage.focus}
                </p>
              </div>
              <p className="mt-auto pt-4 text-[0.65rem] font-semibold uppercase tracking-wider text-[#555255]">
                Qualitative approach &mdash; no sample campaign results
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S11 — What Makes Our Approach Different? (paper, 5 principles)
 * Visual "right audience, right message, right stage" framework.
 * ============================================================ */
const PRINCIPLES = [
  {
    n: '01',
    t: 'Relevant Audience',
    d: 'We target the audience most likely to act &mdash; not the largest one the platform will allow.',
  },
  {
    n: '02',
    t: 'Strong Messaging',
    d: 'Ad copy and landing page say the same thing to the same person. No message gaps between click and arrival.',
  },
  {
    n: '03',
    t: 'Creative Testing',
    d: 'Creative decisions are tested against a hypothesis &mdash; not asserted as better without comparison data.',
  },
  {
    n: '04',
    t: 'Meaningful Data',
    d: 'We measure what changes decisions. Vanity metrics are reported separately from metrics that move budget.',
  },
  {
    n: '05',
    t: 'Continuous Testing',
    d: 'One test at a time, on a fixed cadence. Testing is a discipline &mdash; not proof that performance will always improve.',
  },
]

const APPROACH_LAYERS = [
  { label: 'Right audience', caption: 'Who sees it' },
  { label: 'Right message', caption: 'What they hear' },
  { label: 'Right stage', caption: 'When they see it' },
]

export function GrowthApproach() {
  return (
    <Section surface="softmint" ariaLabelledBy="growth-approach-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="10" accent={DEEP_TEAL}>
          What Makes Our Approach Different?
        </SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading
            as="h2"
            id="growth-approach-heading"
            className="mt-4 max-w-[22ch]"
          >
            Right audience. Right message.{' '}
            <Underline>Right stage</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#111111] opacity-85">
            Our approach is built on five principles &mdash; each one keeps the
            campaign honest. We do not present testing as proof that
            performance will always improve; we present it as a discipline that
            gives the next cycle a real chance to.
          </p>
        </Reveal>

        {/* Visual framework — three layers */}
        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-stretch">
            {APPROACH_LAYERS.map((l, i) => (
              <div
                key={l.label}
                className="flex flex-1 items-center gap-3 rounded-[14px] border border-[rgba(17,17,17,0.12)] p-4"
                style={{
                  background: i === 0 ? MINT : i === 1 ? '#4FC9AE' : DEEP_TEAL,
                  color: i === 2 ? '#FFFFFF' : INK,
                }}
              >
                <span
                  aria-hidden
                  className="font-editorial text-2xl font-bold opacity-90"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-editorial text-sm font-semibold leading-tight">
                    {l.label}
                  </p>
                  <p
                    className="text-[0.65rem] leading-relaxed"
                    style={{ opacity: 0.78 }}
                  >
                    {l.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 5 principle cards */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={0.32 + i * 0.05}>
              <div className="flex h-full min-h-[140px] flex-col rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-3">
                <span
                  className="font-editorial text-2xl font-bold"
                  style={{ color: DEEP_TEAL }}
                  aria-hidden
                >
                  {p.n}
                </span>
                <h3 className="mt-2 font-editorial text-sm font-semibold leading-tight text-[#111111]">
                  {p.t}
                </h3>
                <p
                  className="mt-1 text-xs leading-relaxed text-[#555255]"
                  dangerouslySetInnerHTML={{ __html: p.d }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S12 — FAQ (white, accessible accordion)
 * 9 honest Q&As. FAQPage structured data is added in page.tsx.
 * ============================================================ */
export function GrowthFaq() {
  return (
    <Section surface="white" ariaLabelledBy="growth-faq-heading" className="lg:!py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel number="06" accent={DEEP_TEAL}>
              Frequently Asked Questions
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading
                as="h2"
                id="growth-faq-heading"
                className="mt-4"
              >
                Questions, <Underline>honestly</Underline> answered.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-3 max-w-sm text-sm text-[#555255]">
                Nine things founders and marketing leads tend to ask before
                signing on for performance work. If yours isn&rsquo;t here,
                write to us &mdash; we&rsquo;ll answer honestly.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={FAQS} accent={DEEP_TEAL} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
