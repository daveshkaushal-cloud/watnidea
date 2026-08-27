'use client'

/**
 * The Hype Engine — Social Media service page.
 * Custom implementation. 15 visible sections + Final CTA.
 *
 * Palette per brand spec (siteContent.ts):
 *   accent  = #C8F542  (acid-green)  — primary visual accent (fills, badges, featured cards)
 *   accent2 = #111111  (ink)          — text, structure, primary buttons
 *   details = #F13D32  (red)           — underlines, dots, callout marks
 *   base    = #FFF7E9  (cream)        — surfaces
 *
 * No fake metrics, followers, campaigns or guarantees.
 * Testimonials section intentionally omitted.
 */

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import {
  Section, Container, SectionLabel, EditorialHeading, Reveal,
  CTAButton, Underline, IdeaStamp, FAQAccordion,
} from '@/components/site/primitives'
import { HYPE_FAQS as FAQS } from '@/lib/hype-faq-data'

const ACID = '#C8F542'
const INK = '#111111'
const RED = '#F13D32'

/* ============================================================
 * S1 — Hero (paper) with social-content-engine visual
 * ============================================================ */
export function HypeHero() {
  return (
    <Section
      surface="paper"
      className="relative overflow-hidden !pt-[calc(72px+3rem)] pb-16 sm:!pt-[calc(72px+4rem)] sm:pb-20 lg:pb-24"
      ariaLabelledBy="hype-hero-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#C8F542] opacity-35 blur-[105px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#F13D32] opacity-14 blur-[120px]" />
        <div className="absolute right-[38%] top-10 h-40 w-40 rounded-full bg-[#FFC83D] opacity-20 blur-[85px]" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex rotate-[-2deg] rounded-full bg-[#101010] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_3px_0_#C8F542]">
                  The Hype Engine
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5D5A54]">
                  Strategy × Content × Community
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
  <h1
    id="hype-hero-heading"
    className="max-w-[14ch] font-editorial text-[clamp(2.75rem,4.6vw,4.75rem)] font-medium leading-[0.96] tracking-[-0.04em] text-[#101010]"
  >
    A{' '}
    <strong className="font-semibold">
      Social Media Agency
    </strong>{' '}
    worth{' '}
    <span className="relative inline-block text-[#F13D32]">
      stopping for.
      <span
        aria-hidden
        className="absolute -bottom-2 left-0 h-[6px] w-full rounded-full bg-[#F13D32]"
      />
    </span>
  </h1>
</Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#5D5A54] sm:text-lg">
                We build recognisable social systems—connecting strategy, design, short-form content and community into a presence people notice and remember.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CTAButton href="/book-strategy-call" className="bg-[#111111] hover:bg-[#2a2a2a]" aria-label="Start your social project">
                  Start Your Social Project
                </CTAButton>
                <CTAButton href="#social-work" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />} aria-label="View social campaign work">
                  View Campaign Work
                </CTAButton>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wider text-[#5D5A54]">
                <span>Strategy</span><span className="h-1.5 w-1.5 rounded-full bg-[#C8F542]" />
                <span>Campaigns</span><span className="h-1.5 w-1.5 rounded-full bg-[#F13D32]" />
                <span>Reels</span><span className="h-1.5 w-1.5 rounded-full bg-[#FFC83D]" />
                <span>Community</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.18}>
              <div className="relative mx-auto max-w-[650px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] border border-[rgba(16,16,16,0.14)] bg-[#101010] shadow-[0_28px_70px_-34px_rgba(16,16,16,0.55)]">
                  <Image
                    src="/project-social-campaign.webp"
                    alt="Social media campaign system designed by watNidea"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-20">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/75">Social campaign system</p>
                    <p className="mt-1 font-editorial text-2xl font-semibold text-white">One idea. Many formats.</p>
                  </div>
                </div>

                <span className="absolute -left-4 top-8 rotate-[-6deg] rounded-full bg-[#C8F542] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#101010] shadow-[0_3px_0_#101010]">
                  Built to stop scrolls
                </span>
                <span className="absolute -bottom-5 right-8 rotate-[3deg] rounded-full bg-[#FFC83D] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#101010] shadow-[0_3px_0_#101010]">
                  Idea × Culture
                </span>
                <span aria-hidden className="wn-tape" style={{ left: '46%', top: '-14px', transform: 'rotate(-4deg)', background: 'rgba(200,245,66,0.9)' }} />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S2 — Common Social Media Challenges (white, audit board)
 * ============================================================ */
const CHALLENGES = [
  { cat: 'Consistency', text: 'Posting is irregular — long gaps followed by bursts of content' },
  { cat: 'Content', text: "The content doesn't feel connected to the brand or the audience" },
  { cat: 'Brand', text: 'Visual style and tone vary across posts and platforms' },
  { cat: 'Audience', text: "Followers aren't engaging — likes, comments and shares are low" },
  { cat: 'Content', text: "There's no clear content strategy or content calendar" },
  { cat: 'Advertising', text: "Paid posts aren't producing meaningful results" },
  { cat: 'Measurement', text: "There's no clear way to measure what's working" },
  { cat: 'Consistency', text: 'The brand feels inactive or outdated on social platforms' },
  { cat: 'Audience', text: "The wrong audience is following — or no audience at all" },
  { cat: 'Brand', text: "The social presence doesn't match the website or overall brand identity" },
]

export function HypeChallenges() {
  return (
    <Section surface="white" ariaLabelledBy="hype-challenges-heading">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01" accent={INK}>Is Your Social Media Getting Results?</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="hype-challenges-heading" className="mt-4 max-w-[18ch]">
                Common social media <Underline>challenges</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-base text-[#555255]">
                Most social media problems aren&apos;t about the platform — they&apos;re about consistency, content quality and audience connection. If any of these sound familiar, it may be time to rethink the approach.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-5">
              <p className="wn-caption text-[#555255]">Social Media Audit Board</p>
              <ul className="mt-3 space-y-2.5">
                {CHALLENGES.map((c, i) => (
                  <Reveal key={i} delay={0.16 + i * 0.04}>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-[#111111]" style={{ background: ACID }}>{c.cat}</span>
                      <span className="text-sm leading-relaxed text-[#111111]">{c.text}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
            <Reveal delay={0.5}>
              <p className="mt-4 text-sm leading-relaxed text-[#555255]">
                Social media should help people discover the brand, understand its value and take the next step. If it isn&apos;t doing all three, the strategy needs work.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S3 — What Is Social Media Marketing? (sand)
 * ============================================================ */
const FOCUS_POINTS = [
  'Audience understanding', 'Strategy-led content', 'Consistent publishing', 'Community engagement',
  'Platform-specific formats', 'Strategy-led advertising', 'Transparent measurement', 'Continuous improvement',
]
const SYSTEM = ['Audience', 'Strategy', 'Content', 'Publishing', 'Engagement', 'Advertising', 'Measurement', 'Improvement']

export function HypeWhatIs() {
  return (
    <Section surface="sand" ariaLabelledBy="hype-whatis-heading">
      <Container>
        <SectionLabel number="02" accent={INK}>What Is Social Media Marketing?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="hype-whatis-heading" className="mt-4 max-w-[20ch]">
            How social content <Underline>connects</Underline> to business.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <p className="text-base leading-relaxed text-[#111111] opacity-85">
                Social media marketing is the process of using social platforms to build awareness, connect with audiences and support business goals. It combines strategy, content creation, community management and measurement — all working together to create a consistent, engaging brand presence.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-base leading-relaxed text-[#111111] opacity-85">
                Effective social media isn&apos;t about posting for the sake of it. It&apos;s about understanding the audience, creating content that resonates, and building a presence that supports the broader brand — from discovery to action.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.24}>
              <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
                <p className="wn-caption text-[#555255]">Social Media System</p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {SYSTEM.map((part, i) => (
                    <span key={part} className="inline-flex items-center gap-1.5">
                      <span className="inline-flex items-center rounded-full border border-[rgba(17,17,17,0.14)] bg-[#FFF7E9] px-2.5 py-1 text-xs font-medium text-[#111111]">{part}</span>
                      {i < SYSTEM.length - 1 && <span style={{ color: RED }}>→</span>}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.28}><p className="mt-8 wn-caption text-[#555255]">What We Focus On</p></Reveal>
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
          {FOCUS_POINTS.map((fp, i) => (
            <Reveal key={fp} delay={0.32 + i * 0.03}>
              <div className="flex items-center gap-2 rounded-[12px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: RED }} aria-hidden />
                <span className="text-xs font-medium text-[#111111]">{fp}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S4 — Social Media Strategy (paper, strategy framework)
 * ============================================================ */
const STRATEGY_ELEMENTS = [
  { n: '01', t: 'Audience Definition', d: 'Who you are speaking to, what they care about and where they spend time.' },
  { n: '02', t: 'Platform Selection', d: 'Which platforms fit the brand and where the audience is most active.' },
  { n: '03', t: 'Content Pillars', d: 'Recurring themes that keep content focused and connected to the brand.' },
  { n: '04', t: 'Brand Voice', d: 'A consistent tone that sounds human and recognisable across every post.' },
  { n: '05', t: 'Posting Cadence', d: 'A sustainable rhythm that keeps the brand visible without burning out.' },
  { n: '06', t: 'Measurement Plan', d: 'The metrics that connect social activity to business goals — not vanity numbers.' },
]
const STRATEGY_FLOW = ['Audience', 'Platforms', 'Pillars', 'Voice', 'Cadence', 'Measurement']

export function HypeStrategy() {
  return (
    <Section surface="orange" ariaLabelledBy="hype-strategy-heading">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="03" accent={INK}>Social Media Strategy</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="hype-strategy-heading" className="mt-4 max-w-[18ch]">
                Strategy <Underline>before</Underline> content.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-base text-[#555255]">
                Posting without a plan is noise. A social media strategy defines who you are speaking to, what you want to say, where to say it and how to know if it is working — before any content is created.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-6 rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
                <p className="wn-caption text-[#555255]">Strategy Flow</p>
                <div className="mt-3 flex flex-col gap-2">
                  {STRATEGY_FLOW.map((step, i) => (
                    <div key={step} className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-editorial text-xs font-bold text-[#111111]" style={{ background: ACID }}>{i + 1}</span>
                      <span className="text-sm font-medium text-[#111111]">{step}</span>
                      {i < STRATEGY_FLOW.length - 1 && <span className="ml-auto text-[rgba(17,17,17,0.3)]">↓</span>}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {STRATEGY_ELEMENTS.map((e, i) => (
                <Reveal key={e.n} delay={0.16 + i * 0.06}>
                  <div className="flex h-full flex-col gap-1.5 rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                    <div className="flex items-center gap-2">
                      <span className="wn-bignum text-xl" style={{ color: INK }}>{e.n}</span>
                      <h3 className="font-editorial text-sm font-semibold leading-tight">{e.t}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-[#555255]">{e.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.5}>
              <p className="mt-4 text-sm leading-relaxed text-[#555255]">
                A strong strategy keeps every post, campaign and platform decision accountable to a clear purpose — not guesswork.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S5 — Social Media Marketing Services (paper, 3 groups)
 * ============================================================ */
const SERVICE_GROUPS = [
  { group: 'Strategy & Planning', items: [
    { n: '01', t: 'Social Media Management', d: 'End-to-end management of social accounts — planning, creating, publishing and monitoring.' },
    { n: '02', t: 'Social Media Marketing Services', d: 'Strategy-led social media marketing connecting content to business goals.' },
    { n: '03', t: 'Social Media Advertising', d: 'Paid social campaigns — ad creative, audience targeting, budget management and tracking.' },
  ]},
  { group: 'Content & Community', items: [
    { n: '04', t: 'Instagram Marketing', d: 'Instagram-specific content — reels, carousels, stories and grid posts built for the platform.' },
    { n: '05', t: 'Content Strategy', d: 'Content plans, themes, formats and calendars that keep social output purposeful.' },
    { n: '06', t: 'Social Media Content Creation', d: 'Visual design, copywriting and short-form video created for social platforms.' },
    { n: '07', t: 'Community Management', d: 'Monitoring, responding and building relationships with the audience across platforms.' },
  ]},
  { group: 'Campaigns & Measurement', items: [
    { n: '08', t: 'Social Media Campaigns', d: 'Campaign concepts and execution across platforms — from idea to published content.' },
    { n: '09', t: 'Social Media Analytics', d: 'Performance tracking and transparent reporting — engagement, reach, traffic and conversions.' },
  ]},
]

export function HypeServices() {
  return (
    <Section surface="paper" ariaLabelledBy="hype-services-heading">
      <Container>
        <SectionLabel number="02" accent={INK}>Social Media Marketing Services</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="hype-services-heading" className="mt-4 max-w-[20ch]">
            Nine services across <Underline>three stages</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
  <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
    As a{' '}
    <strong className="font-semibold">
      social media marketing agency
    </strong>
    , we connect strategy, content, campaigns, community management and
    measurement into one recognisable social system.
  </p>
</Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {SERVICE_GROUPS.map((g, gi) => (
            <Reveal key={g.group} delay={0.24 + gi * 0.08}>
              <div className="flex h-full flex-col gap-3">
                <span className="inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#111111]" style={{ background: ACID }}>{g.group}</span>
                {g.items.map((s) => (
                  <div key={s.n} className="flex flex-col gap-1 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                    <div className="flex items-center gap-2">
                      <span className="wn-bignum text-xl" style={{ color: INK }}>{s.n}</span>
                      <h3 className="font-editorial text-sm font-semibold leading-tight">{s.t}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-[#555255]">{s.d}</p>
                    <Link href="/book-strategy-call" className="mt-1 inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider hover:underline" style={{ color: RED }}>
                      Discuss This Service <ArrowRight className="h-3 w-3" aria-hidden />
                    </Link>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * Selected Social Campaign — real campaign visual
 * ============================================================ */
export function HypeSelectedWork() {
  return (
    <Section
      surface="ink"
      id="social-work"
      ariaLabelledBy="hype-work-heading"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionLabel number="03" accent={ACID}>Selected Social Campaign</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="hype-work-heading" className="mt-4 max-w-[17ch] text-white">
                One campaign. A <Underline>connected</Underline> visual world.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-[rgba(255,255,255,0.74)]">
                A unified campaign system designed to stay recognisable across posts, stories, carousels and promotional formats—not a collection of unrelated content.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Campaign idea', 'Art direction', 'Social formats', 'Content system'].map((item) => (
                  <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.18}>
              <div className="group relative aspect-[16/10] overflow-hidden rounded-[26px] border border-white/15 bg-[#101010] shadow-[0_28px_70px_-34px_rgba(0,0,0,0.8)]">
                <Image
                  src="/project-social-campaign.webp"
                  alt="Connected social media campaign designed by watNidea"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-20">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">Social media creative</p>
                  <p className="mt-1 font-editorial text-2xl font-semibold text-white">Campaign System</p>
                </div>
                <span className="absolute right-4 top-4 rotate-[3deg] rounded-full bg-[#C8F542] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#101010] shadow-[0_3px_0_#F13D32]">
                  Made to move
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
 * S6 — Social Media Marketing for Businesses (ink, Brand Presence System)
 * ============================================================ */
const BENEFITS = [
  'A consistent brand presence across platforms', 'Content that connects with the right audience',
  'A clear content strategy and calendar', 'Community engagement that builds relationships',
  'Strategy-led social advertising', 'Transparent performance measurement',
  'A social voice that sounds like the brand', 'Content that supports broader business goals',
]

export function HypeForBusiness() {
  return (
    <Section surface="ink" ariaLabelledBy="hype-business-heading">
      <Container>
        <SectionLabel number="05" accent={ACID}>Social Media Marketing for Businesses</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="hype-business-heading" className="mt-4 max-w-[20ch] text-white">
            The Brand Presence <Underline>System</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal delay={0.16}>
              <p className="text-base leading-relaxed text-[rgba(255,255,255,0.85)]">
                A business social media presence isn&apos;t just a feed — it&apos;s a system that connects awareness, content, engagement, traffic and relationships. When each part works together, social media becomes a channel that supports the brand, not just a place to post.
              </p>
            </Reveal>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {BENEFITS.map((b, i) => (
                <Reveal key={i} delay={0.24 + i * 0.04}>
                  <div className="flex items-center gap-2 rounded-[12px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-[#111111]" style={{ background: ACID }}>{i + 1}</span>
                    <span className="text-xs font-medium text-white">{b}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="rounded-[18px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-5">
                <p className="wn-caption text-[rgba(255,255,255,0.6)]">Brand Presence System</p>
                <div className="mt-3 flex flex-col gap-2">
                  {['Awareness', 'Content', 'Engagement', 'Traffic', 'Relationships'].map((stage, i) => (
                    <div key={stage} className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full font-editorial text-xs font-bold" style={{ background: i % 2 === 0 ? ACID : RED, color: i % 2 === 0 ? '#111111' : '#FFFFFF' }}>{i + 1}</span>
                      <span className="text-sm font-medium text-white">{stage}</span>
                      {i < 4 && <span className="ml-auto text-[rgba(255,255,255,0.4)]">↓</span>}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S7 — Social Media Marketing for Small Businesses (sand)
 * ============================================================ */
const SMB_POINTS = [
  'A focused presence on 1–2 platforms', 'A content plan that fits the team\'s capacity',
  'Posts that look professional without a big budget', 'A consistent voice that sounds like the brand',
  'Practical content creation support', 'Community engagement that fits available time',
  'Transparent reporting on what\'s working', 'Room to expand as the business grows',
]

export function HypeSmallBusiness() {
  return (
    <Section surface="lemon" ariaLabelledBy="hype-smb-heading">
      <Container>
        <SectionLabel number="06" accent={INK}>Social Media Marketing for Small Businesses</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="hype-smb-heading" className="mt-4 max-w-[20ch]">
            Practical social support that <Underline>scales</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            Small businesses don&apos;t need to be on every platform. They need a focused, practical social presence that connects with the right audience — and a plan that grows as the business grows.
          </p>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SMB_POINTS.map((p, i) => (
            <Reveal key={i} delay={0.24 + i * 0.04}>
              <div className="flex items-center gap-2 rounded-[12px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-white" style={{ background: INK }}>{i + 1}</span>
                <span className="text-xs font-medium text-[#111111]">{p}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <div className="mt-6">
            <CTAButton href="/book-strategy-call" className="bg-[#111111] hover:bg-[#2a2a2a]">Discuss Your Social Presence</CTAButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S8 — Social Media Management Services (paper, 5-step cycle)
 * ============================================================ */
const MGMT_STEPS = [
  { n: '1', t: 'Plan', d: 'Content calendar, themes and platform strategy defined.' },
  { n: '2', t: 'Create', d: 'Visuals, copy and short-form video produced.' },
  { n: '3', t: 'Publish', d: 'Content scheduled and published at the right times.' },
  { n: '4', t: 'Engage', d: 'Community monitored — comments and messages answered.' },
  { n: '5', t: 'Analyze', d: 'Performance reviewed and the cycle adjusts.' },
]

export function HypeManagement() {
  return (
    <Section surface="lime" ariaLabelledBy="hype-mgmt-heading">
      <Container>
        <SectionLabel number="04" accent={INK}>Social Media Management Services</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="hype-mgmt-heading" className="mt-4 max-w-[20ch]">
            The weekly content <Underline>cycle</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-xl text-base text-[#555255]">
            Management runs on a repeating five-step cycle — keeping the social presence consistent, responsive and improving.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {MGMT_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.24 + i * 0.06}>
              <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full font-editorial text-xs font-bold text-[#111111]" style={{ background: ACID }}>{s.n}</span>
                  {i < 4 && <span aria-hidden className="hidden h-px flex-1 bg-[rgba(17,17,17,0.15)] sm:block" />}
                </div>
                <h3 className="font-editorial text-sm font-semibold">{s.t}</h3>
                <p className="text-xs leading-relaxed text-[#555255]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S9 — What Makes Social Media Marketing Effective? (white, 5 principles)
 * ============================================================ */
const EFFECTIVE = [
  { t: 'Strong Brand Voice', d: 'A consistent tone that sounds like the brand across every post.' },
  { t: 'Relevant Content', d: 'Content the audience actually cares about — not just what the brand wants to say.' },
  { t: 'Consistent Presence', d: 'A regular cadence that keeps the brand visible without burning out.' },
  { t: 'Engaging Creatives', d: 'Visuals and formats designed to stop the scroll and earn attention.' },
  { t: 'Data-Driven Decisions', d: 'Choices based on what the numbers show — not guesswork.' },
]

export function HypeEffective() {
  return (
    <Section surface="orange" ariaLabelledBy="hype-effective-heading">
      <Container>
        <SectionLabel number="08" accent={INK}>What Makes Social Media Marketing Effective?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="hype-effective-heading" className="mt-4 max-w-[20ch]">
            Five things that make a <Underline>difference</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-2">
          {EFFECTIVE.map((e, i) => (
            <Reveal key={e.t} delay={0.16 + i * 0.06}>
              <div className="flex min-h-[80px] flex-col gap-1 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-3" style={{ minWidth: '180px' }}>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-[#111111]" style={{ background: ACID }}>{i + 1}</span>
                  <h3 className="font-editorial text-sm font-semibold">{e.t}</h3>
                </div>
                <p className="text-xs text-[#555255]">{e.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S10 — Social Media Process (sand, 6-step timeline)
 * ============================================================ */
const PROCESS = [
  { n: '1', t: 'Discovery & Research', d: 'We learn the brand, audience, market and goals.' },
  { n: '2', t: 'Social Media Strategy', d: 'Platform plan, content themes and voice defined.' },
  { n: '3', t: 'Content Planning', d: 'Content calendar, formats and topics mapped out.' },
  { n: '4', t: 'Content Creation', d: 'Visuals, copy and short-form video produced.' },
  { n: '5', t: 'Publishing & Engagement', d: 'Content published and community managed.' },
  { n: '6', t: 'Analysis & Optimization', d: 'Performance reviewed and the strategy adjusts.' },
]

export function HypeProcess() {
  return (
    <Section surface="sand" ariaLabelledBy="hype-process-heading">
      <Container>
        <SectionLabel number="09" accent={INK}>Social Media Process</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="hype-process-heading" className="mt-4 max-w-[18ch]">
            Six steps from strategy to <Underline>optimization</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PROCESS.map((s, i) => (
            <Reveal key={s.n} delay={0.2 + i * 0.05}>
              <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full font-editorial text-xs font-bold text-[#111111]" style={{ background: ACID }}>{s.n}</span>
                  {i < 5 && <span aria-hidden className="hidden h-px flex-1 bg-[rgba(17,17,17,0.15)] sm:block" />}
                </div>
                <h3 className="font-editorial text-sm font-semibold">{s.t}</h3>
                <p className="text-xs leading-relaxed text-[#555255]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S11 — Why Businesses Choose watNidea (paper, 1 featured + 5)
 * ============================================================ */
const REASONS = [
  { t: 'Strategy-Led Social Media', d: "We don't post for the sake of posting. Strategy shapes every piece of content.", featured: true },
  { t: 'Creative Content', d: 'Visuals, copy and video created to earn attention, not fill a feed.' },
  { t: 'Audience-Focused Approach', d: 'Content built around the audience, not the brand\'s internal calendar.' },
  { t: 'Platform-Specific Strategies', d: 'Each platform gets the format and tone it needs to work.' },
  { t: 'Performance Tracking', d: 'Transparent reporting on engagement, reach and traffic.' },
  { t: 'Consistent Brand Presence', d: 'A social voice that matches the brand across every platform.' },
]

export function HypeWhyChoose() {
  return (
    <Section surface="lime" ariaLabelledBy="hype-why-heading">
      <Container>
        <SectionLabel number="05" accent={INK}>Why Businesses Choose watNidea</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="hype-why-heading" className="mt-4 max-w-[20ch]">
            Six reasons brands <Underline>choose</Underline> the studio.
          </EditorialHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal delay={0.16}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] p-6 text-[#111111]" style={{ background: ACID }}>
              <span aria-hidden className="absolute right-3 top-3 h-3 w-3 rounded-full" style={{ background: RED }} />
              <div className="relative">
                <h3 className="font-editorial text-xl font-semibold leading-tight">{REASONS[0].t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgba(17,17,17,0.78)]">{REASONS[0].d}</p>
              </div>
              <div className="relative mt-4"><IdeaStamp label="Hype" size={72} color={INK} /></div>
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
 * S12 — Social Media Platforms We Work With (white, format switcher)
 * ============================================================ */
const PLATFORMS = ['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'Other Platforms']

export function HypePlatforms() {
  const [selected, setSelected] = useState(0)
  const formats: Record<number, string[]> = {
    0: ['Reels', 'Carousels', 'Stories', 'Grid posts'],
    1: ['Video posts', 'Image posts', 'Stories', 'Reels'],
    2: ['Articles', 'Text posts', 'Document carousels', 'Video'],
    3: ['Short-form video', 'Long-form video', 'Shorts', 'Community posts'],
    4: ['Platform-specific formats', 'Cross-platform content', 'Adapted campaigns'],
  }
  return (
    <Section surface="orange" ariaLabelledBy="hype-platforms-heading">
      <Container>
        <SectionLabel number="11" accent={INK}>Social Media Platforms We Work With</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="hype-platforms-heading" className="mt-4 max-w-[20ch]">
            One idea, <Underline>many formats</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-xl text-base text-[#555255]">
            The same campaign idea adapts to different platforms — each in the format that works best there. Select a platform to see how content shapes up.
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-2">
          {PLATFORMS.map((p, i) => (
            <button key={p} type="button" onClick={() => setSelected(i)} aria-pressed={selected === i} aria-label={`View ${p} formats`}
              className={`inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${selected === i ? 'text-white' : 'border border-[rgba(17,17,17,0.18)] bg-[#FFF7E9] text-[#111111]'}`}
              style={selected === i ? { background: INK } : undefined}>
              {p}
            </button>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-4 flex flex-wrap gap-2">
            {formats[selected].map((f) => (
              <span key={f} className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium text-[#111111]" style={{ background: ACID }}>{f}</span>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S13 — Social Strategies We Can Adapt (sand, compact index)
 * ============================================================ */
const INDUSTRIES = ['E-commerce', 'Healthcare', 'Education', 'Real Estate', 'Professional Services', 'Startups & Small Businesses']

export function HypeIndustries() {
  return (
    <Section surface="sand" ariaLabelledBy="hype-industries-heading">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <SectionLabel number="12" accent={INK}>Social Strategies We Can Adapt</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="hype-industries-heading" className="mt-3 max-w-[20ch] text-2xl sm:text-3xl">
                Industries we can <Underline>adapt</Underline> for.
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
 * S14 — Social Media Results That Support Business Growth (paper)
 * ============================================================ */
const RESULTS = ['Brand Awareness', 'Audience Engagement', 'Website Traffic', 'Lead Generation', 'Customer Relationships', 'Business Growth']

export function HypeResults() {
  return (
    <Section surface="lime" ariaLabelledBy="hype-results-heading">
      <Container>
        <SectionLabel number="13" accent={INK}>Social Media Results That Support Business Growth</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="hype-results-heading" className="mt-4 max-w-[20ch]">
            How social activity <Underline>supports</Underline> the business.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-xl text-base text-[#555255]">
            Social media can contribute to business growth — but it doesn&apos;t guarantee it. Here&apos;s how the work connects to broader goals, framed as potential contributions rather than promises.
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-3">
          {RESULTS.map((r, i) => (
            <Reveal key={r} delay={0.24 + i * 0.05}>
              <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: INK }}>
                {r}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S15 — FAQ (white, accessible accordion)
 * ============================================================ */
export function HypeFaq() {
  return (
    <Section surface="white" ariaLabelledBy="hype-faq-heading">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel number="06" accent={INK}>Frequently Asked Questions</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="hype-faq-heading" className="mt-4">
                Questions, <Underline>honestly</Underline> answered.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-3 max-w-sm text-sm text-[#555255]">If yours isn&apos;t here, write to us. We&apos;ll answer honestly.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={FAQS} accent={INK} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
