'use client'

/**
 * The Echo System — AEO & SEO service page.
 * Custom implementation. 15 visible sections + Final CTA.
 *
 * Palette per brand spec (siteContent.ts):
 *   accent  = #FFC83D  (yellow)   — primary accent (hero/CTA blocks, badges, fills)
 *   accent2 = #157468  (deep teal) — the ONE dark section + supporting colour
 *   ink     = #111111              — text, structure, primary buttons
 *   red     = #F13D32               — restrained detail accents (underlines, dots)
 *   cream   = #FFF7E9               — base surfaces (paper/sand/white)
 *
 * Positioning: "The Echo System" is the branded service name.
 *   Primary copy: AEO and SEO services for modern search growth.
 *
 * Honesty rules enforced:
 *   - NO guarantees of rankings, traffic, AI citations, featured snippets,
 *     leads or revenue.
 *   - NO claims of control over how Google, AI assistants or answer engines
 *     select information.
 *   - Prefer "AI search readiness" over claims content is "optimized for AI".
 *   - NO fake ranking data, keyword positions, traffic charts, citations or
 *     client results.
 *   - NO "best agency" claims. Removed "Best SEO Agency for Small Businesses
 *     & Startups" — replaced with factual language.
 *   - "AEO and SEO" — not "AEO SEO".
 *   - "Build Topical Relevance" — not "Build Topical Authority" (unless
 *     authority can be demonstrated).
 *   - NO hidden SEO-only text, doorway pages, mass-generated pages, link
 *     schemes or keyword stuffing.
 *   - Structured data only when it matches visible content.
 *   - NO search-engine logos, fake Search Console/Analytics dashboards or
 *     official partnership claims.
 */

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import {
  Section, Container, SectionLabel, EditorialHeading, Reveal,
  CTAButton, Sticker, Underline, IdeaStamp, FAQAccordion,
} from '@/components/site/primitives'
import { ECHO_FAQS as FAQS } from '@/lib/echo-faq-data'

/* Compact section padding override — keeps the page within target length */
const COMPACT = 'py-8 lg:!py-8'
const COMPACT_SM = 'py-6 lg:!py-6'

const YELLOW = '#FFC83D'
const TEAL = '#157468'
const INK = '#111111'
const RED = '#F13D32'

/* ============================================================
 * S1 — Hero (yellow) with search-ecosystem visual
 * H1: "AEO and SEO Services for Modern Search Growth"
 * Visual: search ecosystem (question → intent → answer →
 *   service pages → related content → internal links →
 *   technical structure → human understanding). Label-only.
 * ============================================================ */
const ECOSYSTEM = [
  { n: '01', t: 'Customer Question', group: 'Intent' },
  { n: '02', t: 'Search Intent', group: 'Intent' },
  { n: '03', t: 'Clear Answer', group: 'Content' },
  { n: '04', t: 'Supporting Service Pages', group: 'Content' },
  { n: '05', t: 'Related Content', group: 'Content' },
  { n: '06', t: 'Internal Links', group: 'Structure' },
  { n: '07', t: 'Technical Structure', group: 'Structure' },
  { n: '08', t: 'Human Understanding', group: 'Foundation' },
]

export function EchoHero() {
  return (
    <Section surface="yellow" className="relative overflow-hidden !pt-[calc(72px+2.75rem)] pb-6 sm:!pt-[calc(72px+3.25rem)] sm:pb-8 lg:!pb-8" ariaLabelledBy="echo-hero-heading">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-[240px] w-[240px] rounded-full opacity-25 blur-[100px]" style={{ background: TEAL }} />
        <div className="absolute right-10 top-32 h-[120px] w-[120px] rounded-full opacity-15 blur-[80px]" style={{ background: RED }} />
      </div>
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal><p className="wn-caption mb-3" style={{ color: INK }}>The Echo System · AEO & SEO</p></Reveal>
            <Reveal delay={0.08}>
              <h1 id="echo-hero-heading" className="max-w-[18ch] font-editorial text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em]">
                AEO and SEO Services for <Underline>Modern</Underline> Search Growth
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#111111] opacity-85 sm:text-lg">
                Search has changed. People still use search engines, but they also ask AI assistants and answer engines for direct responses. AEO and SEO services help your website get found, understood and trusted across both — through useful content, clear structure and honest optimization.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#111111] opacity-85">
                We do not guarantee rankings, traffic or AI citations. We help you build a search presence that is useful to people first — and ready for modern search as it evolves.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <p className="mt-3 max-w-xl text-base font-medium text-[#111111]">
                Get found. Give better answers. Grow with modern search.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CTAButton href="/book-strategy-call" className="bg-[#111111] text-white hover:bg-[#2a2a2a]" aria-label="Discuss your search strategy">Discuss Your Search Strategy</CTAButton>
                <CTAButton href="/work" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />} aria-label="Explore our work">Explore Our Work</CTAButton>
              </div>
            </Reveal>
          </div>
          {/* Search-ecosystem visual */}
          <div className="hidden lg:col-span-5 lg:block">
            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-[22px] border border-[rgba(17,17,17,0.16)] bg-[#FFFFFF] p-5 shadow-[0_10px_30px_-18px_rgba(17,17,17,0.25)]">
                <div className="absolute -right-3 -top-3 z-10"><IdeaStamp label="Echo" size={84} color={TEAL} /></div>
                <p className="wn-caption text-[#555255]">Search Ecosystem</p>
                <div className="mt-3 flex flex-col gap-1.5">
                  {ECOSYSTEM.map((e) => (
                    <div key={e.n} className="flex items-center gap-2.5 rounded-lg border border-[rgba(17,17,17,0.10)] bg-[#FFF7E9] px-2.5 py-1.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-editorial text-[0.55rem] font-bold text-white" style={{ background: e.group === 'Foundation' ? RED : TEAL }}>{e.n}</span>
                      <span className="text-[0.7rem] font-medium text-[#111111]">{e.t}</span>
                      <span className="ml-auto text-[0.5rem] font-bold uppercase tracking-wider text-[#555255]">{e.group}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[0.55rem] text-center uppercase tracking-wider text-[#555255]">Original visual — illustrative</p>
              </div>
              <span aria-hidden className="wn-tape" style={{ left: '50%', top: '-10px', transform: 'translateX(-50%) rotate(-3deg)', background: 'rgba(255,200,61,0.85)' }} />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S2 — Is Your Website Getting the Visibility It Deserves? (paper, audit board)
 * 10 challenges grouped into 7 categories.
 * ============================================================ */
const CHALLENGE_GROUPS = [
  { cat: 'Visibility', items: [
    'Your website is not appearing where your audience is searching',
  ]},
  { cat: 'Search Intent', items: [
    'Content does not match what people are actually searching for',
  ]},
  { cat: 'Content Quality', items: [
    'Pages are thin, duplicated or not genuinely useful to readers',
  ]},
  { cat: 'Website Structure', items: [
    'The site is hard for search engines and people to navigate',
  ]},
  { cat: 'Internal Linking', items: [
    'Important pages are not connected well to supporting content',
  ]},
  { cat: 'Topic Coverage', items: [
    'The website does not cover related questions and topics comprehensively',
  ]},
  { cat: 'AI Search Readiness', items: [
    'Content is not structured for answer engines and AI assistants to understand',
    'There is no clear plan for how the site adapts as search changes',
  ]},
]

export function EchoChallenges() {
  return (
    <Section surface="softmint" ariaLabelledBy="echo-challenges-heading" className={COMPACT}>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01" accent={TEAL}>Is Your Website Getting the Visibility It Deserves?</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="echo-challenges-heading" className="mt-4 max-w-[18ch]">
                Common search <Underline>challenges</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-base text-[#555255]">
                Most search visibility problems are not about a single keyword — they are about content quality, structure, intent and how the site adapts to modern search. These are structural challenges, not a measure of your website.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
              <p className="wn-caption text-[#555255]">Content & Structure Audit Board</p>
              <div className="mt-3 flex flex-col gap-2">
                {CHALLENGE_GROUPS.map((g, gi) => (
                  <Reveal key={g.cat} delay={0.16 + gi * 0.05}>
                    <div className="rounded-[12px] border border-[rgba(17,17,17,0.10)] bg-[#FFF7E9] p-3">
                      <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-wider" style={{ color: TEAL }}>{g.cat}</p>
                      <ul className="space-y-0.5">
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
              <Reveal delay={0.5}>
                <p className="mt-3 text-sm leading-relaxed text-[#555255]">
                  Useful, relevant and well-organised content matters because it helps people find what they need, understand it clearly and trust the source — the foundation of both SEO and AEO.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S3 — What Are AEO and SEO? (sand, side-by-side comparison)
 * ============================================================ */
const COMPARISON = [
  { aspect: 'Focus', seo: 'Discoverability, structure and organic search fundamentals.', aeo: 'Clear questions, direct answers, context and information structure.' },
  { aspect: 'Target', seo: 'Search engine results pages.', aeo: 'Answer engines and AI assistants.' },
  { aspect: 'Content', seo: 'Keyword-relevant, well-structured pages.', aeo: 'Question-focused, directly answered content.' },
  { aspect: 'Outcome', seo: 'Improved discoverability over time.', aeo: 'Improved clarity for answer engines.' },
]

export function EchoWhatIs() {
  return (
    <Section surface="sand" ariaLabelledBy="echo-whatis-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="02" accent={TEAL}>What Are AEO and SEO?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="echo-whatis-heading" className="mt-4 max-w-[20ch]">
            Two practices, <Underline>one</Underline> foundation.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            AEO and SEO are distinct but connected. SEO helps your website get found in search engines. AEO helps your content be understood by answer engines and AI assistants. A combined strategy places useful human content at the center of both.
          </p>
        </Reveal>
        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Reveal delay={0.24}>
            <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white" style={{ background: TEAL }}>Search Engine Optimization</span>
              <p className="mt-3 text-sm leading-relaxed text-[#111111]">SEO supports discoverability, structure and organic search fundamentals — helping pages get found in search results.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white" style={{ background: INK }}>Answer Engine Optimization</span>
              <p className="mt-3 text-sm leading-relaxed text-[#111111]">AEO supports clear questions, direct answers, context and information structure — helping content be understood by answer engines.</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.36}>
          <div className="mt-4 rounded-[18px] border border-[rgba(17,17,17,0.14)] p-5 text-center" style={{ background: YELLOW }}>
            <p className="font-editorial text-base font-semibold text-[#111111]">A Combined Search Strategy</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#111111] opacity-85">Places useful human content at the center — the foundation both SEO and AEO build on.</p>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-4 text-sm leading-relaxed text-[#555255]">
            Neither AEO nor SEO can guarantee that Google, AI assistants or answer engines will rank, surface or cite your content. They decide independently what to use.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S4 — AEO and SEO Services (paper, 8 services / 4 groups, search map)
 * ============================================================ */
const SERVICE_GROUPS = [
  { group: 'Research', items: [
    { n: '01', t: 'Keyword Research', d: 'Keyword and question research aligned to how real people search and what they need to know.' },
    { n: '02', t: 'Search Intent Optimization', d: 'Content shaped around the intent behind a search — not just the words.' },
  ]},
  { group: 'Content', items: [
    { n: '03', t: 'AEO Services', d: 'Answer-focused content structured for clarity, context and answer engines.' },
    { n: '04', t: 'Content Optimization', d: 'Improving existing content to be more useful, relevant and well-structured.' },
    { n: '05', t: 'Answer Engine Optimization', d: 'Structuring information so answer engines can understand and use it clearly.' },
  ]},
  { group: 'Structure', items: [
    { n: '06', t: 'SEO Services', d: 'The umbrella practice — discoverability, structure and organic search fundamentals.' },
    { n: '07', t: 'Internal Linking', d: 'Descriptive internal links connecting service pages, content and related topics.' },
  ]},
  { group: 'Technical Foundations', items: [
    { n: '08', t: 'Technical SEO', d: 'Crawlability, site structure, performance and the foundations search engines need.' },
    { n: '09', t: 'AI Search Readiness', d: 'Helping content be structured for answer engines — readiness, not guaranteed placement.' },
  ]},
]

export function EchoServices() {
  return (
    <Section surface="yellow" ariaLabelledBy="echo-services-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="03" accent={TEAL}>AEO and SEO Services</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="echo-services-heading" className="mt-4 max-w-[20ch]">
            A search <Underline>map</Underline>, not a checklist.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            From research and content to structure and technical foundations — each service works on its own or as part of a connected AEO and SEO plan. Every CTA connects to a strategy conversation.
          </p>
        </Reveal>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {SERVICE_GROUPS.map((g, gi) => (
            <Reveal key={g.group} delay={0.24 + gi * 0.06}>
              <div className="flex h-full flex-col gap-2">
                <span className="inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white" style={{ background: TEAL }}>{g.group}</span>
                {g.items.map((s) => (
                  <div key={s.n} className="flex flex-col gap-1 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-3">
                    <div className="flex items-center gap-2">
                      <span className="wn-bignum text-lg" style={{ color: TEAL }}>{s.n}</span>
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
 * S5 — AEO Services That Focus on Better Answers (white, interactive answer-composition)
 * Interactive: Question → Direct Answer → Explanation → Evidence → Related → Next Step
 * ============================================================ */
const ANSWER_STEPS = ['Question', 'Direct Answer', 'Explanation', 'Supporting Evidence', 'Related Topics', 'Next Step']
const ANSWER_DETAILS: Record<number, string> = {
  0: 'Start from a real question your audience asks — written in plain language.',
  1: 'A clear, concise answer placed where readers and answer engines can find it.',
  2: 'Context that explains the answer — why it is correct and how it helps.',
  3: 'Supporting evidence, examples or data that make the answer trustworthy.',
  4: 'Related questions and topics that build context around the core answer.',
  5: 'A clear next step — what the reader should do or explore next.',
}

export function EchoAeoServices() {
  const [selected, setSelected] = useState(0)
  return (
    <Section surface="softmint" ariaLabelledBy="echo-aeo-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="04" accent={TEAL}>AEO Services That Focus on Better Answers</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="echo-aeo-heading" className="mt-4 max-w-[20ch]">
            Compose a <Underline>better</Underline> answer.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#555255]">
            AEO is about structuring content so answers are clear, supported and useful. Select a step to see how each part of an answer composes together. This is an educational illustration — content length, question formatting or schema do not automatically earn AI citations.
          </p>
        </Reveal>
        <div className="mt-4 flex flex-wrap gap-2">
          {ANSWER_STEPS.map((s, i) => (
            <button key={s} type="button" onClick={() => setSelected(i)} aria-pressed={selected === i} aria-label={`View ${s} step`}
              className={`inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${selected === i ? 'text-white' : 'border border-[rgba(17,17,17,0.18)] bg-[#FFF7E9] text-[#111111]'}`}
              style={selected === i ? { background: TEAL } : undefined}>
              {s}
            </button>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-4 rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
            <p className="wn-caption" style={{ color: TEAL }}>{ANSWER_STEPS[selected]}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#111111]">{ANSWER_DETAILS[selected]}</p>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-4 rounded-[14px] border border-dashed border-[rgba(17,17,17,0.20)] bg-[#FFF7E9] p-4">
            <p className="wn-caption text-[#555255]">Example Question (educational illustration)</p>
            <p className="mt-1 font-editorial text-base italic text-[#111111]">“What does an AEO and SEO agency do?”</p>
            <p className="mt-2 text-xs leading-relaxed text-[#555255]">An AEO and SEO agency helps make content useful, discoverable and well-structured for both search engines and answer engines — without guaranteeing placements.</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S6 — SEO Services Built Around Your Business (sand, connected foundation)
 * 6 services as a connected website foundation.
 * ============================================================ */
const SEO_SERVICES = [
  { n: '1', t: 'Keyword Strategy', d: 'Research and planning around how your audience actually searches.' },
  { n: '2', t: 'On-Page SEO', d: 'Optimising pages — content, structure, headings and metadata — for relevance and clarity.' },
  { n: '3', t: 'Technical SEO', d: 'Crawlability, performance and the foundations search engines need to access your site.' },
  { n: '4', t: 'Content Strategy', d: 'Planning content that serves people and search together — not separately.' },
  { n: '5', t: 'Internal Linking', d: 'Descriptive links connecting service pages, content and related topics.' },
  { n: '6', t: 'Ongoing Optimization', d: 'Reviewing, refining and improving based on genuine data — not guesswork.' },
]

export function EchoSeoServices() {
  return (
    <Section surface="yellow" ariaLabelledBy="echo-seo-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="05" accent={TEAL}>SEO Services Built Around Your Business</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="echo-seo-heading" className="mt-4 max-w-[20ch]">
            A connected <Underline>foundation</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            These six services work as a connected website foundation — not six isolated tactics. Where technical website work is required, we connect to development support.
          </p>
        </Reveal>
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SEO_SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={0.24 + i * 0.05}>
              <div className="flex h-full flex-col gap-1.5 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-white" style={{ background: TEAL }}>{s.n}</span>
                  <h3 className="font-editorial text-sm font-semibold">{s.t}</h3>
                </div>
                <p className="text-xs leading-relaxed text-[#555255]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <p className="mt-4 text-sm leading-relaxed text-[#555255]">
            <Link href="/the-digital-hq" className="font-semibold underline-offset-2 hover:underline" style={{ color: TEAL }}>Need development support? Explore The Digital HQ.</Link>
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S7 — AEO and SEO Services for Businesses (paper, search-growth framework)
 * 9 benefits as potential objectives.
 * ============================================================ */
const BENEFITS = [
  'A website that is genuinely useful to your audience',
  'Content that matches real search intent',
  'Clear answers to customer questions',
  'Improved discoverability in organic search',
  'Better internal linking and site structure',
  'Content organised around topics, not isolated keywords',
  'AI search readiness as search evolves',
  'A foundation for long-term improvement',
  'Clearer understanding of what is and is not working',
]

export function EchoForBusiness() {
  return (
    <Section surface="softmint" ariaLabelledBy="echo-business-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="06" accent={TEAL}>AEO and SEO Services for Businesses</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="echo-business-heading" className="mt-4 max-w-[20ch]">
            Potential <Underline>objectives</Underline>, not promises.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#555255]">
            AEO and SEO can contribute to search growth — but they do not guarantee it. Here is how the work connects to broader goals, framed as potential objectives rather than promises.
          </p>
        </Reveal>
        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {BENEFITS.map((b, i) => (
                <Reveal key={i} delay={0.24 + i * 0.04}>
                  <div className="flex items-center gap-2 rounded-[12px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-white" style={{ background: TEAL }}>{i + 1}</span>
                    <span className="text-xs font-medium text-[#111111]">{b}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
                <p className="wn-caption text-[#555255]">Search-Growth Framework</p>
                <div className="mt-3 flex flex-col gap-2">
                  {['Useful Content', 'Discoverability', 'Understanding', 'Long-Term Improvement'].map((stage, i) => (
                    <div key={stage} className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full font-editorial text-xs font-bold text-white" style={{ background: i === 0 ? YELLOW : i === 3 ? RED : TEAL }}>{i + 1}</span>
                      <span className="text-sm font-medium text-[#111111]">{stage}</span>
                      {i < 3 && <span className="ml-auto text-[rgba(17,17,17,0.3)]">↓</span>}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[0.6rem] uppercase tracking-wider text-[#555255]">Framework — no fabricated growth charts</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S8 — AEO and SEO Services for Small Businesses (white, content-plan visual)
 * 5 components.
 * ============================================================ */
const SMB_POINTS = [
  { t: 'Clear Service Pages', d: 'Pages that explain what you offer in language your customers use.' },
  { t: 'Customer-Focused Content', d: 'Content built around what your audience needs to know — not what is easy to write.' },
  { t: 'Relevant Search Topics', d: 'Topics connected to your business and your audience\'s real questions.' },
  { t: 'Better Website Structure', d: 'A site that is easy for people and search engines to navigate.' },
  { t: 'Sustainable Growth', d: 'Improvement over time — not a one-time push that fades.' },
]

export function EchoSmallBusiness() {
  return (
    <Section surface="yellow" ariaLabelledBy="echo-smb-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="07" accent={TEAL}>AEO and SEO Services for Small Businesses</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="echo-smb-heading" className="mt-4 max-w-[20ch]">
            A practical search <Underline>foundation</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#555255]">
            Small businesses do not need to outperform larger competitors overnight. They need a practical search foundation — clear content, relevant topics and a site that is genuinely useful. Smaller businesses will not rank immediately or automatically outrank larger competitors.
          </p>
        </Reveal>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {SMB_POINTS.map((p, i) => (
            <Reveal key={p.t} delay={0.24 + i * 0.05}>
              <div className="flex h-full flex-col gap-1.5 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-white" style={{ background: TEAL }}>{i + 1}</span>
                <h3 className="font-editorial text-sm font-semibold leading-tight">{p.t}</h3>
                <p className="text-xs leading-relaxed text-[#555255]">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S9 — Search Strategy for Startups (paper, 9 requirements)
 * ============================================================ */
const STARTUP_REQS = [
  'A clear understanding of who you are trying to reach',
  'Keyword and question research grounded in real search behaviour',
  'A content foundation that is useful, not stuffed with keywords',
  'A technical foundation that search engines can access and understand',
  'Content that answers real questions your audience asks',
  'A realistic understanding of how long search growth takes',
  'A willingness to improve content over time',
  'A focus on strategy, useful content, technical foundations and long-term improvement — not simply keyword placement',
  'Honest expectations about what AEO and SEO can and cannot achieve',
]

export function EchoStartups() {
  return (
    <Section surface="softmint" ariaLabelledBy="echo-startups-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="08" accent={TEAL}>Search Strategy for Startups</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="echo-startups-heading" className="mt-4 max-w-[20ch]">
            Build for <Underline>long-term</Underline> search.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#555255]">
            For startups and small businesses, the focus should be on strategy, useful content, technical foundations and long-term improvement — not simply keyword placement. Here is what a honest startup search strategy requires.
          </p>
        </Reveal>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {STARTUP_REQS.map((r, i) => (
            <Reveal key={i} delay={0.24 + i * 0.04}>
              <div className="flex items-start gap-2 rounded-[12px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-editorial text-[0.55rem] font-bold text-white" style={{ background: TEAL }}>{i + 1}</span>
                <span className="text-xs leading-relaxed text-[#111111]">{r}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <div className="mt-6">
            <CTAButton href="/book-strategy-call" className="bg-[#111111] text-white hover:bg-[#2a2a2a]">Plan Your Search Foundation</CTAButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S10 — Making Content Ready for Modern Search (sand, search journey pathway)
 * Search journey + 3 components, visual pathway.
 * ============================================================ */
const JOURNEY = ['Find your business', 'Understand your expertise', 'Get useful answers', 'Build confidence', 'Take action']
const PATHWAY = [
  { t: 'Traditional Search', d: 'People search and discover pages through search engines.', color: TEAL },
  { t: 'AI and Answer Search', d: 'People ask answer engines for direct responses — content must be structured for clarity.', color: INK },
  { t: 'Human Experience', d: 'Useful, trustworthy content remains the foundation for both.', color: RED },
]

export function EchoModernSearch() {
  return (
    <Section surface="yellow" ariaLabelledBy="echo-modern-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="09" accent={TEAL}>Making Content Ready for Modern Search</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="echo-modern-heading" className="mt-4 max-w-[20ch]">
            Human usefulness <Underline>first</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            Modern search combines traditional results with AI and answer engines. The search journey is the same — people find your business, understand your expertise, get useful answers, build confidence and take action. Human usefulness remains the foundation for both SEO and AEO.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-4 rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
            <p className="wn-caption text-[#555255]">Search Journey</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {JOURNEY.map((step, i) => (
                <span key={step} className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-[rgba(17,17,17,0.14)] bg-[#FFF7E9] px-3 py-1.5 text-xs font-medium text-[#111111]">{step}</span>
                  {i < JOURNEY.length - 1 && <span style={{ color: RED }}>→</span>}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PATHWAY.map((p, i) => (
            <Reveal key={p.t} delay={0.3 + i * 0.06}>
              <div className="flex h-full flex-col gap-1.5 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full font-editorial text-xs font-bold text-white" style={{ background: p.color }}>{i + 1}</span>
                <h3 className="font-editorial text-sm font-semibold">{p.t}</h3>
                <p className="text-xs leading-relaxed text-[#555255]">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <p className="mt-4 text-sm leading-relaxed text-[#555255]">
            We do not claim that AI systems will recommend or cite your website. We help make content clear, useful and well-structured — the factors that support visibility.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S11 — AEO and SEO Process (teal — the ONE dark/deep-teal section, recurring loop)
 * 6 steps as a recurring search-improvement loop.
 * ============================================================ */
const PROCESS_STEPS = [
  { n: '1', t: 'Discovery & Analysis', d: 'We review the website, content, structure and current search presence. Human-led.' },
  { n: '2', t: 'Keyword & Question Research', d: 'Research grounded in real search behaviour and real audience questions.' },
  { n: '3', t: 'Strategy & Planning', d: 'A plan for content, structure and technical work — connected to business goals.' },
  { n: '4', t: 'Content & Website Optimization', d: 'Content improved and structured for people first, search second.' },
  { n: '5', t: 'Monitoring & Analysis', d: 'Genuine connected data — no fake Search Console, Analytics or ranking figures.' },
  { n: '6', t: 'Continuous Improvement', d: 'Refinements based on what the data shows. Loops back to discovery.' },
]

export function EchoProcess() {
  return (
    <Section surface="teal" ariaLabelledBy="echo-process-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="10" accent={YELLOW}>AEO and SEO Process</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="echo-process-heading" className="mt-4 max-w-[20ch] text-white">
            A recurring <Underline>improvement</Underline> loop.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-xl text-base text-[rgba(255,255,255,0.82)]">
            The process is a recurring loop — not a one-time project. Each cycle uses genuine data to refine the next. On mobile, steps run vertically without forced horizontal scrolling. Monitoring uses real connected data only.
          </p>
        </Reveal>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.24 + i * 0.05}>
              <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full font-editorial text-xs font-bold text-[#111111]" style={{ background: YELLOW }}>{s.n}</span>
                  {i < 5 && <span aria-hidden className="hidden h-px flex-1 bg-[rgba(255,255,255,0.2)] sm:block" />}
                </div>
                <h3 className="font-editorial text-sm font-semibold text-white">{s.t}</h3>
                <p className="text-xs leading-relaxed text-[rgba(255,255,255,0.72)]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <div className="mt-4 flex items-center gap-2 rounded-[14px] border border-dashed border-[rgba(255,255,255,0.28)] bg-[rgba(255,255,255,0.04)] p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-white" style={{ background: RED }}>↻</span>
            <p className="text-xs text-[rgba(255,255,255,0.82)]">Step 6 loops back to Step 1 — search improvement is ongoing, with genuine data at every cycle.</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S12 — Why Businesses Choose watNidea (white, editorial manifesto)
 * 7 reasons, "Human-Friendly Content" featured.
 * ============================================================ */
const REASONS = [
  { t: 'Human-Friendly Content', d: 'Content written for people first — useful, clear and genuinely helpful. Search engines reward what people value.', featured: true },
  { t: 'Strategy Before Optimization', d: 'We start from business goals, not from a keyword list.' },
  { t: 'SEO and AEO Together', d: 'Traditional search and answer engines addressed as one connected system.' },
  { t: 'No Keyword Stuffing', d: 'We do not stuff pages with unnatural exact-match phrases. Readability comes first.' },
  { t: 'Business-Focused Thinking', d: 'Search work connected to real business objectives — not vanity metrics.' },
  { t: 'Clear Communication', d: 'We explain what we are doing and why, in plain language.' },
  { t: 'Long-Term Approach', d: 'Sustainable improvement over time, not quick fixes that fade.' },
]

export function EchoWhyChoose() {
  return (
    <Section surface="softmint" ariaLabelledBy="echo-why-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="11" accent={TEAL}>Why Businesses Choose watNidea</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="echo-why-heading" className="mt-4 max-w-[20ch]">
            An editorial <Underline>manifesto</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <Reveal delay={0.16}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] p-6 text-white" style={{ background: TEAL }}>
              <span aria-hidden className="absolute right-3 top-3 h-3 w-3 rounded-full" style={{ background: YELLOW }} />
              <div className="relative">
                <h3 className="font-editorial text-xl font-semibold leading-tight">{REASONS[0].t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgba(255,255,255,0.88)]">{REASONS[0].d}</p>
              </div>
              <div className="relative mt-4"><IdeaStamp label="Echo" size={72} color={YELLOW} /></div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-2">
            {REASONS.slice(1).map((r, i) => (
              <Reveal key={r.t} delay={0.24 + i * 0.05}>
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
 * S13 — What Can AEO and SEO Help You Achieve? (paper, 6 objectives)
 * "Build Topical Relevance" — not "Build Topical Authority".
 * ============================================================ */
const OBJECTIVES = [
  { t: 'Improve Search Visibility', d: 'Help your content be discovered by people searching for what you offer.' },
  { t: 'Answer Customer Questions', d: 'Structure content to answer real questions clearly and usefully.' },
  { t: 'Build Topical Relevance', d: 'Cover related topics comprehensively so your site reads as relevant.' },
  { t: 'Improve User Experience', d: 'A faster, clearer, better-organised site that serves people first.' },
  { t: 'Attract Relevant Traffic', d: 'Reach people whose intent matches what you actually offer.' },
  { t: 'Prepare for AI Search', d: 'Build AI search readiness — structured, clear content for answer engines.' },
]

export function EchoAchieve() {
  return (
    <Section surface="yellow" ariaLabelledBy="echo-achieve-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="12" accent={TEAL}>What Can AEO and SEO Help You Achieve?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="echo-achieve-heading" className="mt-4 max-w-[20ch]">
            Potential <Underline>objectives</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#555255]">
            These are potential objectives — not guaranteed results. AEO and SEO can contribute to each, depending on content, market, competition and how search evolves. We do not display invented keyword, traffic or visibility data.
          </p>
        </Reveal>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OBJECTIVES.map((o, i) => (
            <Reveal key={o.t} delay={0.24 + i * 0.05}>
              <div className="flex h-full flex-col gap-1.5 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-white" style={{ background: TEAL }}>{i + 1}</span>
                  <h3 className="font-editorial text-sm font-semibold">{o.t}</h3>
                </div>
                <p className="text-xs leading-relaxed text-[#555255]">{o.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S14 — What Makes a Strong Search Strategy? (sand, structural diagram)
 * 5 foundations supporting one another.
 * ============================================================ */
const FOUNDATIONS = [
  { t: 'Useful Content', d: 'Content that genuinely helps people — the foundation everything builds on.', level: 0 },
  { t: 'Search Intent', d: 'Understanding what people actually mean when they search.', level: 1 },
  { t: 'Clear Structure', d: 'A site organised so people and search engines can navigate it.', level: 1 },
  { t: 'Technical Foundation', d: 'Crawlability, performance and access — the base layer.', level: 1 },
  { t: 'Consistent Improvement', d: 'Refining and improving based on genuine data over time.', level: 2 },
]

export function EchoStrongStrategy() {
  return (
    <Section surface="softmint" ariaLabelledBy="echo-strong-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="13" accent={TEAL}>What Makes a Strong Search Strategy?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="echo-strong-heading" className="mt-4 max-w-[20ch]">
            Five <Underline>foundations</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            A strong search strategy is built on foundations that support one another. No hidden SEO-only text, no doorway pages, no mass-generated pages, no link schemes and no keyword stuffing — just useful content, clear structure and honest improvement.
          </p>
        </Reveal>
        <div className="mt-4 rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
          <p className="wn-caption text-[#555255]">Structural Diagram</p>
          <div className="mt-3 flex flex-col gap-3">
            {/* Foundation layer */}
            <div className="flex flex-wrap gap-2">
              {FOUNDATIONS.filter((f) => f.level === 0).map((f) => (
                <div key={f.t} className="flex-1 rounded-[14px] border-2 p-3" style={{ background: YELLOW, borderColor: INK }}>
                  <h3 className="font-editorial text-sm font-bold">{f.t}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#111111] opacity-80">{f.d}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center text-[rgba(17,17,17,0.3)]">↑ supports</div>
            {/* Support layer */}
            <div className="flex flex-wrap gap-2">
              {FOUNDATIONS.filter((f) => f.level === 1).map((f) => (
                <div key={f.t} className="flex-1 rounded-[14px] border border-[rgba(17,17,17,0.14)] bg-[#FFF7E9] p-3">
                  <h3 className="font-editorial text-sm font-semibold">{f.t}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#555255]">{f.d}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center text-[rgba(17,17,17,0.3)]">↑ refines</div>
            {/* Improvement layer */}
            <div className="flex flex-wrap gap-2">
              {FOUNDATIONS.filter((f) => f.level === 2).map((f) => (
                <div key={f.t} className="flex-1 rounded-[14px] border border-[rgba(17,17,17,0.14)] p-3 text-white" style={{ background: TEAL }}>
                  <h3 className="font-editorial text-sm font-semibold">{f.t}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[rgba(255,255,255,0.85)]">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S15 — Frequently Asked Questions (white, accessible accordion)
 * 10 Q&As, real buttons, aria-expanded, aria-controls, keyboard nav.
 * ============================================================ */
export function EchoFaq() {
  return (
    <Section surface="white" ariaLabelledBy="echo-faq-heading" className={COMPACT}>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel number="14" accent={TEAL}>Frequently Asked Questions</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="echo-faq-heading" className="mt-4">
                Questions, <Underline>honestly</Underline> answered.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-3 max-w-sm text-sm text-[#555255]">If yours isn&apos;t here, write to us. We&apos;ll answer honestly — including where we cannot guarantee results.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={FAQS} accent={TEAL} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
