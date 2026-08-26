'use client'

/**
 * Synthetic Cinema — AI Advertising service page.
 * Custom implementation. 13 visible sections + Final CTA.
 *
 * Palette per brand spec (siteContent.ts):
 *   accent  = #7657F6  (purple)   — primary accent (fills, badges, hero/CTA blocks)
 *   accent2 = #3D5AFE  (blue)     — restrained supporting colour (use sparingly)
 *   ink     = #111111              — text, structure, primary buttons, ONE dark section
 *   red     = #F13D32              — detail accents (underlines, dots, callout marks)
 *   cream   = #FFF7E9              — base surfaces (paper/sand/white)
 *
 * Positioning: "Synthetic Cinema" is the branded service name.
 *   Primary copy: AI-assisted advertising and creative-intelligence practice.
 *
 * Separation from Growth Alchemy:
 *   - This page focuses on AI-assisted audience research, creative concepting,
 *     variation, personalization, automation, pattern identification, analysis
 *     and human-reviewed experimentation.
 *   - Growth Alchemy owns Google/Meta media buying, PPC, budgets, lead-gen
 *     execution, conversion tracking and ongoing paid-media optimization.
 *   - Cross-links to /growth-alchemy where relevant.
 *
 * Honesty rules enforced:
 *   - NO fake metrics, campaign data, AI tools, models or results.
 *   - NO proprietary AI model claims.
 *   - NO guarantees of better targeting, lower costs, more leads or conversions.
 *   - "AI-assisted" and "data-informed" — not "AI-powered" or "data-driven".
 *   - AI presented as supporting, not replacing, human strategy and judgment.
 *   - Privacy, consent, copyright and human oversight addressed.
 *   - NO neon AI gradients, glowing brains, robots, circuit boards or fake dashboards.
 */

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import {
  Section, Container, SectionLabel, EditorialHeading, Reveal,
  CTAButton, Sticker, Underline, IdeaStamp, FAQAccordion,
} from '@/components/site/primitives'
import { CINEMA_FAQS as FAQS } from '@/lib/cinema-faq-data'

/* Compact section padding override — reduces padding at all breakpoints */
const COMPACT = 'py-10 lg:!py-10'
const COMPACT_SM = 'py-8 lg:!py-8'

const PURPLE = '#7657F6'
const BLUE = '#3D5AFE'
const INK = '#111111'
const RED = '#F13D32'

/* ============================================================
 * S1 — Hero (violet) with human-in-the-loop advertising visual
 * H1: "AI Advertising Agency for Smarter Digital Growth"
 * Visual: 8-step human-in-the-loop workflow (brief → audience →
 *   human strategy → AI exploration → variations → human review →
 *   activation → learning). Label-only, no fake numbers.
 * ============================================================ */
const LOOP_STEPS = [
  { n: '01', t: 'Business Brief', human: true },
  { n: '02', t: 'Audience Information', human: true },
  { n: '03', t: 'Human Strategy', human: true },
  { n: '04', t: 'AI-Assisted Exploration', human: false },
  { n: '05', t: 'Creative Variations', human: false },
  { n: '06', t: 'Human Review', human: true },
  { n: '07', t: 'Campaign Activation', human: true },
  { n: '08', t: 'Learning & Refinement', human: false },
]

export function CinemaHero() {
  return (
    <Section surface="violet" className="relative overflow-hidden !pt-[calc(72px+2.75rem)] pb-8 sm:!pt-[calc(72px+3.25rem)] sm:pb-10 lg:!pb-10" ariaLabelledBy="cinema-hero-heading">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-[240px] w-[240px] rounded-full opacity-25 blur-[100px]" style={{ background: INK }} />
        <div className="absolute right-10 top-32 h-[120px] w-[120px] rounded-full opacity-20 blur-[80px]" style={{ background: RED }} />
      </div>
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal><p className="wn-caption mb-3 text-white">Synthetic Cinema · AI Advertising</p></Reveal>
            <Reveal delay={0.08}>
              <h1 id="cinema-hero-heading" className="max-w-[18ch] font-editorial text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white">
                AI Advertising Agency for <Underline>Smarter</Underline> Digital Growth
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[rgba(255,255,255,0.88)] sm:text-lg">
                watNidea is a human-led, AI-assisted advertising practice. We use AI to support audience research, creative variation, personalization, automation and analysis — under human creative direction, review and accountability. AI accelerates the work; people own the decisions.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-3 max-w-xl text-base font-medium text-white">
                Make your advertising smarter. Turn information into better decisions.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CTAButton href="/book-strategy-call" className="bg-[#111111] text-white hover:bg-[#2a2a2a]" aria-label="Discuss an AI advertising project">Discuss an AI Advertising Project</CTAButton>
                <Link href="/growth-alchemy" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.30)] bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[rgba(255,255,255,0.08)]">
                  Explore Growth Alchemy <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>
          {/* Human-in-the-loop advertising visual */}
          <div className="hidden lg:col-span-5 lg:block">
            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-[22px] border border-[rgba(255,255,255,0.20)] bg-[rgba(17,17,17,0.22)] p-5 shadow-[0_10px_30px_-18px_rgba(17,17,17,0.45)]">
                <div className="absolute -right-3 -top-3 z-10"><IdeaStamp label="Cinema" size={84} color="#FFFFFF" /></div>
                <p className="wn-caption text-[rgba(255,255,255,0.66)]">Human-in-the-Loop Workflow</p>
                <div className="mt-3 flex flex-col gap-1.5">
                  {LOOP_STEPS.map((s) => (
                    <div key={s.n} className="flex items-center gap-2.5 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-2.5 py-1.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-editorial text-[0.55rem] font-bold" style={{ background: s.human ? RED : '#FFFFFF', color: INK }}>{s.n}</span>
                      <span className="text-[0.7rem] font-medium text-white">{s.t}</span>
                      <span className="ml-auto text-[0.5rem] font-bold uppercase tracking-wider" style={{ color: s.human ? '#FF9D97' : '#FFFFFF' }}>{s.human ? 'Human' : 'AI'}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[0.55rem] text-center uppercase tracking-wider text-[rgba(255,255,255,0.5)]">Concept workflow — illustrative</p>
              </div>
              <span aria-hidden className="wn-tape" style={{ left: '50%', top: '-10px', transform: 'translateX(-50%) rotate(-3deg)', background: 'rgba(255,255,255,0.85)' }} />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S2 — Is Your Advertising Keeping Up With Your Business? (paper, diagnosis board)
 * 10 challenges grouped into 5 categories.
 * ============================================================ */
const CHALLENGE_GROUPS = [
  { cat: 'Audience Understanding', items: [
    'Audience research takes too long or surfaces the same insights repeatedly',
    'Audience segments are broad and difficult to personalise for',
  ]},
  { cat: 'Creative Production', items: [
    'Creative output cannot keep pace with the number of platforms and formats',
    'Variations are produced manually, limiting how many ideas get tested',
  ]},
  { cat: 'Campaign Operations', items: [
    'Campaign setup and repetitive tasks slow the team down',
    'Personalization is limited by manual workflow constraints',
  ]},
  { cat: 'Analysis', items: [
    'Performance data is scattered and hard to synthesise into clear patterns',
    'Learning from each campaign does not feed reliably into the next one',
  ]},
  { cat: 'Decision-Making', items: [
    'There is no structured way to decide where AI should assist and where humans must lead',
    'Approvals and reviews are inconsistent across campaigns and teams',
  ]},
]

export function CinemaChallenges() {
  return (
    <Section surface="lilac" ariaLabelledBy="cinema-challenges-heading" className={COMPACT}>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01" accent={PURPLE}>Is Your Advertising Keeping Up With Your Business?</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="cinema-challenges-heading" className="mt-4 max-w-[18ch]">
                Common advertising <Underline>challenges</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-base text-[#555255]">
                As advertising grows more complex, teams struggle to keep up with audience research, creative production, campaign operations, analysis and decision-making. These are structural challenges — not a measure of your advertising.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
              <p className="wn-caption text-[#555255]">Editorial Workflow Diagnosis</p>
              <div className="mt-3 flex flex-col gap-3">
                {CHALLENGE_GROUPS.map((g, gi) => (
                  <Reveal key={g.cat} delay={0.16 + gi * 0.06}>
                    <div className="rounded-[14px] border border-[rgba(17,17,17,0.10)] bg-[#FFF7E9] p-3">
                      <p className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-wider" style={{ color: PURPLE }}>{g.cat}</p>
                      <ul className="space-y-1">
                        {g.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: RED }} aria-hidden />
                            <span className="text-xs leading-relaxed text-[#111111]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S3 — What Is AI Advertising? (sand, 8-node framework)
 * ============================================================ */
const FOCUS_POINTS = [
  'AI supports human decisions', 'Audience research assistance', 'Creative variation',
  'Personalization with consent', 'Workflow automation', 'Pattern identification',
  'Campaign analysis', 'Human-reviewed experimentation',
]
const FRAMEWORK = ['Data', 'Audience', 'Strategy', 'Creative', 'Automation', 'Analysis', 'Human Review', 'Optimization']

export function CinemaWhatIs() {
  return (
    <Section surface="sand" ariaLabelledBy="cinema-whatis-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="02" accent={PURPLE}>What Is AI Advertising?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="cinema-whatis-heading" className="mt-4 max-w-[20ch]">
            AI supports <Underline>human</Underline> decisions.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <p className="text-base leading-relaxed text-[#111111] opacity-85">
                AI advertising uses AI tools to support — not replace — the people responsible for advertising strategy, creative direction, brand judgment and campaign outcomes. AI can process information, surface patterns, generate variations and help analyse performance. Humans define objectives, approve creative, safeguard consent and brand, and remain accountable for results.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-base leading-relaxed text-[#111111] opacity-85">
                AI works only with data the business has lawfully collected or provided. It does not have access to private information it has not been given. Used responsibly, AI helps teams move faster and explore more options — under consistent human oversight.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.24}>
              <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
                <p className="wn-caption text-[#555255]">AI Advertising Framework</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {FRAMEWORK.map((node, i) => (
                    <div key={node} className="flex items-center gap-2 rounded-[12px] border border-[rgba(17,17,17,0.10)] bg-[#FFF7E9] p-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-white" style={{ background: node === 'Human Review' ? RED : PURPLE }}>{i + 1}</span>
                      <span className="text-xs font-medium text-[#111111]">{node}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[0.6rem] uppercase tracking-wider text-[#555255]">Human Review connects every step</p>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.28}><p className="mt-6 wn-caption text-[#555255]">What We Focus On</p></Reveal>
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
 * S4 — Our AI Advertising Services (paper, 9 services / 4 groups, directed workflow)
 * ============================================================ */
const SERVICE_GROUPS = [
  { group: 'Research & Audience', items: [
    { n: '01', t: 'AI Advertising Services', d: 'The umbrella practice — AI-assisted research, creative, automation and analysis under human direction.' },
    { n: '02', t: 'AI-Assisted Advertising', d: 'Advertising where AI supports specific tasks while humans own strategy, approval and accountability.' },
    { n: '03', t: 'AI Audience Targeting', d: 'AI-assisted audience research and segmentation using lawfully collected data the client provides.' },
  ]},
  { group: 'Creative & Variation', items: [
    { n: '04', t: 'AI Ad Creative', d: 'AI-assisted creative concepting and variation — visual, copy and format exploration under human review.' },
    { n: '05', t: 'AI Ad Campaigns', d: 'Campaign concepts built with AI-assisted exploration, approved and activated by human teams.' },
  ]},
  { group: 'Workflow & Automation', items: [
    { n: '06', t: 'AI-Assisted Personalization', d: 'Personalization designed with consent — AI helps tailor messaging where lawful data and permission exist.' },
    { n: '07', t: 'Automated Advertising Workflows', d: 'Repetitive setup and production tasks supported by AI, with human checkpoints at approval stages.' },
  ]},
  { group: 'Analysis & Learning', items: [
    { n: '08', t: 'AI Campaign Optimization', d: 'AI-assisted pattern identification and analysis — humans decide what to act on. No automatic performance improvements.' },
    { n: '09', t: 'AI Marketing Analytics', d: 'Performance analysis supported by AI — surfacing patterns for human review, not autonomous decisions.' },
  ]},
]

export function CinemaServices() {
  return (
    <Section surface="violet" ariaLabelledBy="cinema-services-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="03" accent={PURPLE}>Our AI Advertising Services</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="cinema-services-heading" className="mt-4 max-w-[20ch]">
            Nine services across <Underline>four stages</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            From audience research and creative variation to workflow automation and campaign analysis — each service is AI-assisted and human-reviewed. Every CTA connects to a strategy conversation.
          </p>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {SERVICE_GROUPS.map((g, gi) => (
            <Reveal key={g.group} delay={0.24 + gi * 0.08}>
              <div className="flex h-full flex-col gap-3">
                <span className="inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white" style={{ background: PURPLE }}>{g.group}</span>
                {g.items.map((s) => (
                  <div key={s.n} className="flex flex-col gap-1 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                    <div className="flex items-center gap-2">
                      <span className="wn-bignum text-xl" style={{ color: PURPLE }}>{s.n}</span>
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
 * S5 — AI-Assisted Advertising for Businesses (white, human vs AI comparison)
 * 5 areas, comparison between people-led and AI-supported tasks.
 * ============================================================ */
const COMPARISON = [
  { area: 'Audience Insights', people: 'Define research questions, interpret meaning, set direction.', ai: 'Process data, surface patterns, suggest segments.' },
  { area: 'Creative Testing', people: 'Set creative objectives, approve final assets, guard brand.', ai: 'Generate variations, explore formats, support rapid iteration.' },
  { area: 'Campaign Analysis', people: 'Decide what results mean, set next actions, own outcomes.', ai: 'Synthesise performance data, flag anomalies, identify patterns.' },
  { area: 'Personalized Advertising', people: 'Ensure consent, approve messaging, safeguard ethics.', ai: 'Tailor content where lawful data and permission exist.' },
  { area: 'Campaign Management', people: 'Set strategy, approve workflows, oversee quality.', ai: 'Automate repetitive tasks, support consistency, assist scheduling.' },
]

export function CinemaForBusiness() {
  return (
    <Section surface="lilac" ariaLabelledBy="cinema-business-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="04" accent={PURPLE}>AI-Assisted Advertising for Businesses</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="cinema-business-heading" className="mt-4 max-w-[20ch]">
            People lead. AI <Underline>supports</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#555255]">
            AI-assisted advertising works best when tasks are clearly divided — people own objectives, judgment, approval and ethics; AI assists with processing, variation and analysis. Here is how the responsibilities split across five areas.
          </p>
        </Reveal>
        <div className="mt-6 overflow-hidden rounded-[18px] border border-[rgba(17,17,17,0.12)]">
          <div className="grid grid-cols-[1fr_1.2fr_1.2fr] bg-[#111111]">
            <div className="p-3 text-[0.65rem] font-bold uppercase tracking-wider text-white">Area</div>
            <div className="border-l border-[rgba(255,255,255,0.16)] p-3 text-[0.65rem] font-bold uppercase tracking-wider text-white">Led by People</div>
            <div className="border-l border-[rgba(255,255,255,0.16)] p-3 text-[0.65rem] font-bold uppercase tracking-wider" style={{ color: '#C8B5FF' }}>Supported by AI</div>
          </div>
          {COMPARISON.map((c, i) => (
            <Reveal key={c.area} delay={0.24 + i * 0.05}>
              <div className={`grid grid-cols-[1fr_1.2fr_1.2fr] ${i % 2 === 0 ? 'bg-[#FFF7E9]' : 'bg-[#FFFFFF]'}`}>
                <div className="p-3"><h3 className="font-editorial text-sm font-semibold">{c.area}</h3></div>
                <div className="border-l border-[rgba(17,17,17,0.08)] p-3"><p className="text-xs leading-relaxed text-[#555255]">{c.people}</p></div>
                <div className="border-l border-[rgba(17,17,17,0.08)] p-3"><p className="text-xs leading-relaxed text-[#111111]">{c.ai}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S6 — AI Advertising for Small Businesses (sand, 8-point feature panel)
 * ============================================================ */
const SMB_POINTS = [
  'AI used only where it creates genuine value',
  'Focused audience research, not full automation',
  'Creative variations to test without a large team',
  'Practical workflow support for repetitive tasks',
  'Clear scope — no unnecessary technical complexity',
  'Analysis that surfaces patterns for human review',
  'Personalization only where consent and data exist',
  'Room to expand AI assistance as the business grows',
]

export function CinemaSmallBusiness() {
  return (
    <Section surface="sand" ariaLabelledBy="cinema-smb-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="05" accent={PURPLE}>AI Advertising for Small Businesses</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="cinema-smb-heading" className="mt-4 max-w-[20ch]">
            Practical AI support, <Underline>not</Underline> complexity.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            Small businesses do not need a fully automated AI advertising stack. They need practical AI support where it creates genuine operational or creative value — and human craft everywhere else. AI is used selectively, not as a shortcut to better results.
          </p>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SMB_POINTS.map((p, i) => (
            <Reveal key={i} delay={0.24 + i * 0.04}>
              <div className="flex items-center gap-2 rounded-[12px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-white" style={{ background: PURPLE }}>{i + 1}</span>
                <span className="text-xs font-medium text-[#111111]">{p}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <div className="mt-6">
            <CTAButton href="/book-strategy-call" className="bg-[#111111] text-white hover:bg-[#2a2a2a]">Explore a Practical AI Workflow</CTAButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S7 — AI Advertising Services for Startups (paper, experimentation loop)
 * 5 components as a startup experimentation loop.
 * ============================================================ */
const STARTUP_STEPS = [
  { n: '1', t: 'Market & Audience Research', d: 'AI-assisted research to explore markets, audiences and potential positioning — human teams interpret findings.' },
  { n: '2', t: 'Campaign Testing', d: 'Test hypotheses across audiences and creative with AI-assisted variation — humans approve what runs.' },
  { n: '3', t: 'Creative Development', d: 'AI supports concepting and variation; human creative direction shapes the final work.' },
  { n: '4', t: 'Performance Analysis', d: 'AI helps synthesise results and surface patterns; humans decide what they mean.' },
  { n: '5', t: 'Growth Opportunities', d: 'AI-assisted pattern identification flags potential opportunities — humans evaluate and choose.' },
]

export function CinemaStartups() {
  return (
    <Section surface="violet" ariaLabelledBy="cinema-startups-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="06" accent={PURPLE}>AI Advertising Services for Startups</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="cinema-startups-heading" className="mt-4 max-w-[20ch]">
            A startup <Underline>experimentation</Underline> loop.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#555255]">
            AI helps startups test hypotheses and explore directions faster. Product-market fit, growth and scalable performance cannot be determined from advertising data alone — human judgment remains central at every step.
          </p>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {STARTUP_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.24 + i * 0.06}>
              <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full font-editorial text-xs font-bold text-white" style={{ background: PURPLE }}>{s.n}</span>
                  {i < 4 && <span aria-hidden className="hidden h-px flex-1 bg-[rgba(17,17,17,0.15)] sm:block" />}
                </div>
                <h3 className="font-editorial text-sm font-semibold">{s.t}</h3>
                <p className="text-xs leading-relaxed text-[#555255]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <p className="mt-4 text-sm leading-relaxed text-[#555255]">
            <Link href="/growth-alchemy" className="font-semibold underline-offset-2 hover:underline" style={{ color: PURPLE }}>Need complete paid-media management? Explore Growth Alchemy.</Link>
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S8 — How AI Can Support Advertising (ink — the ONE dark section, responsibility matrix)
 * 6 concepts + human-and-AI responsibility matrix.
 * ============================================================ */
const SUPPORT_CONCEPTS = [
  { t: 'Faster Insights', d: 'AI helps process data and surface patterns more quickly — humans interpret meaning.' },
  { t: 'Relevant Personalization', d: 'AI tailors content where lawful data and consent exist — humans approve messaging.' },
  { t: 'More Creative Variations', d: 'AI generates more options to explore — humans select and refine what fits the brand.' },
  { t: 'Optimization Support', d: 'AI flags patterns and potential opportunities — humans decide what to act on.' },
  { t: 'Greater Efficiency', d: 'AI automates repetitive tasks — humans focus on strategy, judgment and quality.' },
  { t: 'Scalable Workflows', d: 'AI supports consistency across volume — humans set the standards and checkpoints.' },
]
const RESPONSIBILITY = [
  { ai: 'Processing information', human: 'Setting objectives' },
  { ai: 'Pattern discovery', human: 'Judgment & approval' },
  { ai: 'Creative variation', human: 'Ethics & brand quality' },
]

export function CinemaHowSupport() {
  return (
    <Section surface="ink" ariaLabelledBy="cinema-support-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="07" accent="#C8B5FF">How AI Can Support Advertising</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="cinema-support-heading" className="mt-4 max-w-[20ch] text-white">
            AI assists. Humans <Underline>remain</Underline> responsible.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SUPPORT_CONCEPTS.map((c, i) => (
                <Reveal key={c.t} delay={0.16 + i * 0.05}>
                  <div className="flex h-full flex-col gap-1 rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-[#111111]" style={{ background: '#C8B5FF' }}>{i + 1}</span>
                      <h3 className="font-editorial text-sm font-semibold text-white">{c.t}</h3>
                    </div>
                    <p className="text-xs text-[rgba(255,255,255,0.72)]">{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="rounded-[18px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-5">
                <p className="wn-caption text-[rgba(255,255,255,0.6)]">Responsibility Matrix</p>
                <div className="mt-3 flex flex-col gap-2">
                  {RESPONSIBILITY.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-[12px] border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] p-3">
                      <div className="flex-1">
                        <p className="text-[0.55rem] font-bold uppercase tracking-wider" style={{ color: '#C8B5FF' }}>AI assists</p>
                        <p className="text-xs font-medium text-white">{r.ai}</p>
                      </div>
                      <span className="text-[rgba(255,255,255,0.4)]">→</span>
                      <div className="flex-1">
                        <p className="text-[0.55rem] font-bold uppercase tracking-wider" style={{ color: RED }}>Humans own</p>
                        <p className="text-xs font-medium text-white">{r.human}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[0.6rem] uppercase tracking-wider text-[rgba(255,255,255,0.5)]">Objectives, judgment, approval, ethics and brand quality stay human</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S9 — AI Advertising Process (sand, 6-step circular learning process)
 * ============================================================ */
const PROCESS_STEPS = [
  { n: '1', t: 'Business & Audience Discovery', d: 'We learn the brand, audience, objectives and lawful data available. Human-led.' },
  { n: '2', t: 'AI & Marketing Strategy', d: 'Strategy shaped with AI-assisted research — humans define direction and priorities.' },
  { n: '3', t: 'Creative & Campaign Planning', d: 'AI supports concepting and variation; human creative direction approves the plan.' },
  { n: '4', t: 'AI-Assisted Campaign Setup', d: 'Setup supported by AI automation — human checkpoints before anything goes live.' },
  { n: '5', t: 'Data & Performance Analysis', d: 'AI helps synthesise data and surface patterns — humans interpret and decide.' },
  { n: '6', t: 'Optimization & Learning', d: 'Refinements fed by analysis — looping back to strategy. Human-approved at every cycle.' },
]

export function CinemaProcess() {
  return (
    <Section surface="lilac" ariaLabelledBy="cinema-process-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="08" accent={PURPLE}>AI Advertising Process</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="cinema-process-heading" className="mt-4 max-w-[20ch]">
            A circular <Underline>learning</Underline> process.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-xl text-base text-[#555255]">
            The process is a loop — not an autonomous pipeline. Each cycle feeds learning back into strategy, with human approval at every checkpoint. On mobile, steps run vertically without forced horizontal scrolling.
          </p>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.24 + i * 0.05}>
              <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full font-editorial text-xs font-bold text-white" style={{ background: PURPLE }}>{s.n}</span>
                  {i < 5 && <span aria-hidden className="hidden h-px flex-1 bg-[rgba(17,17,17,0.15)] sm:block" />}
                </div>
                <h3 className="font-editorial text-sm font-semibold">{s.t}</h3>
                <p className="text-xs leading-relaxed text-[#555255]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <div className="mt-4 flex items-center gap-2 rounded-[14px] border border-dashed border-[rgba(17,17,17,0.20)] bg-[#FFFFFF] p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-white" style={{ background: RED }}>↻</span>
            <p className="text-xs text-[#555255]">Step 6 loops back to Step 2 — learning refines strategy each cycle, under human approval.</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S10 — Why Choose watNidea? (white, asymmetric editorial grid)
 * 6 principles, human judgment as central theme.
 * ============================================================ */
const REASONS = [
  { t: 'AI With Human Strategy', d: 'AI assists the work — strategy, objectives and direction stay human.', featured: true },
  { t: 'Business-Focused Approach', d: 'We start from business goals, not from what AI can do.' },
  { t: 'Creative & Data Together', d: 'Creative craft and data-informed analysis work side by side.' },
  { t: 'Continuous Testing', d: 'We test hypotheses with AI-assisted variation — humans evaluate results.' },
  { t: 'Practical AI Adoption', d: 'AI used where it adds genuine value, not as a novelty.' },
  { t: 'Transparent Approach', d: 'We are honest about where AI helps and where human craft matters more.' },
]

export function CinemaWhyChoose() {
  return (
    <Section surface="violet" ariaLabelledBy="cinema-why-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="09" accent={PURPLE}>Why Choose watNidea?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="cinema-why-heading" className="mt-4 max-w-[20ch]">
            Human judgment at the <Underline>centre</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <Reveal delay={0.16}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] p-6 text-white" style={{ background: PURPLE }}>
              <span aria-hidden className="absolute right-3 top-3 h-3 w-3 rounded-full" style={{ background: RED }} />
              <div className="relative">
                <h3 className="font-editorial text-xl font-semibold leading-tight">{REASONS[0].t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgba(255,255,255,0.88)]">{REASONS[0].d}</p>
              </div>
              <div className="relative mt-4"><IdeaStamp label="Cinema" size={72} color="#FFFFFF" /></div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            {REASONS.slice(1).map((r, i) => (
              <Reveal key={r.t} delay={0.24 + i * 0.06}>
                <div className="flex h-full flex-col gap-1.5 rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-4">
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
 * S11 — AI Advertising for Different Business Needs (paper, stage selector)
 * Interactive selector, 6 stages.
 * ============================================================ */
const STAGES = ['Startups', 'Small Businesses', 'E-commerce Brands', 'Service Businesses', 'Growing Companies', 'Established Brands']
const STAGE_DETAILS: Record<number, string> = {
  0: 'AI-assisted research and experimentation to explore markets, test hypotheses and shape direction — without overcommitting budget.',
  1: 'Practical AI support focused on where it creates real value — selective automation, creative variation and analysis.',
  2: 'AI-assisted creative variation, personalization with consent and performance analysis across product categories.',
  3: 'AI-supported audience research and content variation to connect with service-led audiences.',
  4: 'AI-assisted workflows that scale creative testing and analysis as advertising grows in complexity.',
  5: 'AI supports pattern identification and campaign analysis across larger portfolios — humans own brand consistency.',
}

export function CinemaStages() {
  const [selected, setSelected] = useState(0)
  return (
    <Section surface="paper" ariaLabelledBy="cinema-stages-heading" className={COMPACT_SM}>
      <Container>
        <SectionLabel number="10" accent={PURPLE}>AI Advertising for Different Business Needs</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="cinema-stages-heading" className="mt-4 max-w-[20ch]">
            One practice, <Underline>many</Underline> stages.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-xl text-base text-[#555255]">
            AI-assisted advertising adapts to where a business is — without fabricating example campaigns, audiences or performance. Select a stage to see how the focus shifts.
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-2">
          {STAGES.map((s, i) => (
            <button key={s} type="button" onClick={() => setSelected(i)} aria-pressed={selected === i} aria-label={`View ${s} focus`}
              className={`inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${selected === i ? 'text-white' : 'border border-[rgba(17,17,17,0.18)] bg-[#FFFFFF] text-[#111111]'}`}
              style={selected === i ? { background: PURPLE } : undefined}>
              {s}
            </button>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-4 rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
            <p className="wn-caption" style={{ color: PURPLE }}>{STAGES[selected]}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#111111]">{STAGE_DETAILS[selected]}</p>
            <p className="mt-3 text-[0.6rem] uppercase tracking-wider text-[#555255]">Qualitative focus — no sample campaigns or performance figures</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S12 — What Makes AI Advertising Effective? (sand, 5 requirements + responsible-use note)
 * ============================================================ */
const REQUIREMENTS = [
  { t: 'Quality Data', d: 'AI needs accurate, lawfully collected data to be useful. Poor data produces poor output.' },
  { t: 'Clear Objectives', d: 'AI assists best when goals are defined. Vague objectives produce vague results.' },
  { t: 'Strong Creative', d: 'AI generates variations — humans craft the creative direction that makes them work.' },
  { t: 'Human Oversight', d: 'Every AI output needs human review. Accountability cannot be automated.' },
  { t: 'Continuous Learning', d: 'Each cycle should feed learning back into strategy — not run once and forget.' },
]
const RESPONSIBLE_USE = [
  'Personal information requires lawful collection and consent',
  'Sensitive traits must not be used for discriminatory targeting',
  'AI-generated creative requires human review for accuracy and brand safety',
  'Copyright, usage rights and brand safety must be checked before publishing',
  'Automated decisions must include appropriate human oversight',
]

export function CinemaEffective() {
  return (
    <Section surface="lilac" ariaLabelledBy="cinema-effective-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="11" accent={PURPLE}>What Makes AI Advertising Effective?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="cinema-effective-heading" className="mt-4 max-w-[20ch]">
            Five requirements — and <Underline>responsibility</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {REQUIREMENTS.map((r, i) => (
                <Reveal key={r.t} delay={0.16 + i * 0.05}>
                  <div className="flex h-full flex-col gap-1 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-white" style={{ background: PURPLE }}>{i + 1}</span>
                      <h3 className="font-editorial text-sm font-semibold">{r.t}</h3>
                    </div>
                    <p className="text-xs text-[#555255]">{r.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="rounded-[18px] border border-[rgba(17,17,17,0.14)] bg-[#111111] p-5 text-white">
                <p className="wn-caption text-[rgba(255,255,255,0.66)]">Responsible-Use Note</p>
                <ul className="mt-3 space-y-2">
                  {RESPONSIBLE_USE.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: RED }} aria-hidden />
                      <span className="text-xs leading-relaxed text-[rgba(255,255,255,0.88)]">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.6rem] uppercase tracking-wider text-[rgba(255,255,255,0.5)]">Integrated into how we work — not a separate legal page</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S13 — Frequently Asked Questions (white, accessible accordion)
 * 10 Q&As, real buttons, aria-expanded, aria-controls, keyboard nav.
 * ============================================================ */
export function CinemaFaq() {
  return (
    <Section surface="white" ariaLabelledBy="cinema-faq-heading" className={COMPACT}>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel number="12" accent={PURPLE}>Frequently Asked Questions</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="cinema-faq-heading" className="mt-4">
                Questions, <Underline>honestly</Underline> answered.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-3 max-w-sm text-sm text-[#555255]">If yours isn&apos;t here, write to us. We&apos;ll answer honestly — including where AI cannot help.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={FAQS} accent={PURPLE} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
