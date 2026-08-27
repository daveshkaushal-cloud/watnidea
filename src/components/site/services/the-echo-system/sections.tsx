'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  CTAButton,
  Underline,
  FAQAccordion,
} from '@/components/site/primitives'
import { ECHO_FAQS as FAQS } from '@/lib/echo-faq-data'

const YELLOW = '#FFC83D'
const TEAL = '#157468'

const CHALLENGES = [
  ['Useful pages remain undiscovered', 'Strong services and expertise cannot help when search engines and people struggle to find the right page.'],
  ['Content answers the wrong questions', 'Pages target broad keywords but miss the specific questions customers ask before making a decision.'],
  ['The website lacks structure', 'Weak hierarchy, internal linking and technical foundations make important information difficult to interpret.'],
  ['Search is changing', 'Traditional results, featured answers and AI-assisted search experiences increasingly coexist.'],
]

const SERVICES = [
  ['01', 'Search & Question Research', 'Map search intent, customer questions, topic relationships and the language people actually use.'],
  ['02', 'Answer-Focused Content', 'Build clear responses supported by useful explanation, evidence, context and visible next steps.'],
  ['03', 'On-Page SEO', 'Improve titles, headings, copy structure, metadata and page purpose without keyword stuffing.'],
  ['04', 'Technical SEO', 'Review crawlability, indexing signals, performance, canonicals, sitemaps and technical barriers.'],
  ['05', 'Internal Linking', 'Connect related pages so people and crawlers can understand the site’s topic structure.'],
  ['06', 'AI Search Readiness', 'Make content clear, attributable and well structured without claiming control over AI citations.'],
]

const PROCESS = [
  ['1', 'Discover', 'Understand the business, customers, services, competitors and existing search footprint.'],
  ['2', 'Diagnose', 'Review content, technical foundations, indexing, intent coverage and internal structure.'],
  ['3', 'Prioritise', 'Choose the pages and questions with the clearest customer and business relevance.'],
  ['4', 'Build', 'Create or improve useful content, page structure, metadata and supporting schema where appropriate.'],
  ['5', 'Connect', 'Strengthen internal links and topic pathways across the website.'],
  ['6', 'Learn', 'Monitor what search platforms expose, identify gaps and improve the next publishing cycle.'],
]

const REASONS = [
  ['People-first content', 'Pages are written to genuinely help readers—not to hide search-engine copy inside the website.'],
  ['AEO and SEO together', 'Traditional search foundations and answer readiness are planned as one connected system.'],
  ['No ranking guarantees', 'We cannot control rankings, snippets or AI citations, and we will never pretend otherwise.'],
  ['Clear technical priorities', 'Issues are translated into practical actions instead of being buried inside oversized audit documents.'],
  ['Structured, not mass-generated', 'We build useful topic coverage without doorway pages, link schemes or uncontrolled content volume.'],
  ['Long-term improvement', 'Search work becomes an ongoing learning process rather than a one-time keyword exercise.'],
]

export function EchoHero() {
  return (
    <Section surface="paper" className="relative overflow-hidden !pt-[calc(72px+3rem)] pb-14 sm:!pt-[calc(72px+4rem)] sm:pb-20" ariaLabelledBy="echo-hero-heading">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#FFC83D] opacity-30 blur-[110px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#66DFC0] opacity-20 blur-[120px]" />
      </div>
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex rotate-[-2deg] rounded-full bg-[#111111] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_3px_0_#FFC83D]">The Echo System · AEO × SEO</span>
            </Reveal>
            <Reveal delay={0.08}>
  <h1
    id="echo-hero-heading"
    className="mt-6 max-w-[14ch] font-editorial text-[clamp(2.75rem,4.6vw,4.75rem)] font-medium leading-[0.96] tracking-[-0.04em] text-[#111111]"
  >
    <strong className="font-semibold">
      AEO and SEO Services
    </strong>{' '}
    built for modern{' '}
    <span className="relative inline-block text-[#157468]">
      search.
      <span
        aria-hidden
        className="absolute -bottom-2 left-0 h-[6px] w-full rounded-full bg-[#FFC83D]"
      />
    </span>
  </h1>
</Reveal>
            <Reveal delay={0.16}><p className="mt-8 max-w-xl text-base leading-relaxed text-[#5D5A54] sm:text-lg">AEO and SEO for modern search—combining technical foundations, useful content and answer-ready structure so people can discover and understand your expertise.</p></Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/book-strategy-call" aria-label="Discuss your search strategy">Discuss Search Strategy</CTAButton>
                <CTAButton href="#echo-services" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />} aria-label="Explore AEO and SEO services">Explore Services</CTAButton>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.18}>
              <div className="relative mx-auto max-w-[650px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] border border-[rgba(17,17,17,0.16)] bg-white shadow-[0_28px_70px_-35px_rgba(17,17,17,0.55)]">
                  <Image src="/work/echo-system-aeo.webp" alt="AEO content and modern search readiness showcase" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                </div>
                <span className="absolute -left-3 top-8 rotate-[-7deg] rounded-full bg-[#FFC83D] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#111111] shadow-[0_3px_0_#111111]">Answer-ready</span>
                <span className="absolute -bottom-4 right-6 rotate-[3deg] rounded-full bg-[#66DFC0] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#111111] shadow-[0_3px_0_#111111]">People first</span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export function EchoChallenges() {
  return (
    <Section surface="paper" ariaLabelledBy="echo-challenges-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="01" accent={TEAL}>The Search Visibility Problem</SectionLabel>
        <Reveal delay={0.08}><EditorialHeading as="h2" id="echo-challenges-heading" className="mt-4 max-w-[20ch]">Good expertise cannot work if nobody can <Underline>find it</Underline>.</EditorialHeading></Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {CHALLENGES.map(([title, body], index) => (
            <Reveal key={title} delay={0.14 + index * 0.05}>
              <article className="flex h-full gap-4 rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-white p-5"><span className="font-editorial text-xl font-bold text-[#157468]">0{index + 1}</span><div><h3 className="font-editorial text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5D5A54]">{body}</p></div></article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function EchoServices() {
  return (
    <Section surface="yellow" id="echo-services" ariaLabelledBy="echo-services-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="02" accent={TEAL}>AEO and SEO Services</SectionLabel>
        <Reveal delay={0.08}><EditorialHeading as="h2" id="echo-services-heading" className="mt-4 max-w-[20ch]">Search foundations for how people discover information <Underline>now</Underline>.</EditorialHeading></Reveal>
        <Reveal delay={0.16}>
  <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5D5A54]">
    As an{' '}
    <strong className="font-semibold text-[#111111]">
      SEO agency for small businesses and startups
    </strong>
    , we connect useful content, technical foundations, internal linking
    and AI search readiness into one long-term search system.
  </p>
</Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(([number, title, body], index) => (
            <Reveal key={title} delay={0.2 + index * 0.05}>
              <article className="group flex h-full flex-col rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFDF8] p-5 transition-transform hover:-translate-y-1"><span className="text-xs font-bold text-[#157468]">{number}</span><h3 className="mt-3 font-editorial text-xl font-semibold">{title}</h3><p className="mt-2 flex-1 text-sm leading-relaxed text-[#5D5A54]">{body}</p><Link href="/book-strategy-call" className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#F13D32] hover:underline">Discuss Service <ArrowRight className="h-3.5 w-3.5" /></Link></article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function EchoSearchShowcase() {
  return (
    <Section surface="paper" ariaLabelledBy="echo-showcase-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="03" accent={TEAL}>Modern Search Readiness</SectionLabel>
        <Reveal delay={0.08}><EditorialHeading as="h2" id="echo-showcase-heading" className="mt-4 max-w-[21ch]">Built for discovery—and for the questions behind the <Underline>search</Underline>.</EditorialHeading></Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal delay={0.16}>
            <article className="overflow-hidden rounded-[22px] border border-[rgba(17,17,17,0.12)] bg-white"><div className="relative aspect-[16/10]"><Image src="/work/echo-system-aeo.webp" alt="Answer engine optimization content showcase" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div><div className="p-5"><p className="text-xs font-bold uppercase tracking-wider text-[#157468]">AEO</p><h3 className="mt-2 font-editorial text-xl font-semibold">Clear answers with useful context</h3><p className="mt-2 text-sm leading-relaxed text-[#5D5A54]">Structure content around genuine questions, direct responses, evidence, related information and visible next steps.</p></div></article>
          </Reveal>
          <Reveal delay={0.23}>
            <article className="overflow-hidden rounded-[22px] border border-[rgba(17,17,17,0.12)] bg-white"><div className="relative aspect-[16/10]"><Image src="/work/echo-system-seo.webp" alt="Technical and content SEO strategy showcase" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div><div className="p-5"><p className="text-xs font-bold uppercase tracking-wider text-[#157468]">SEO</p><h3 className="mt-2 font-editorial text-xl font-semibold">Strong foundations and clear page purpose</h3><p className="mt-2 text-sm leading-relaxed text-[#5D5A54]">Connect research, page structure, technical accessibility and internal links into one coherent search system.</p></div></article>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

export function EchoProcess() {
  return (
    <Section surface="teal" ariaLabelledBy="echo-process-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="04" accent={YELLOW}>The Echo Process</SectionLabel>
        <Reveal delay={0.08}><EditorialHeading as="h2" id="echo-process-heading" className="mt-4 max-w-[20ch] text-white">Research, structure, publish, learn and <Underline>improve</Underline>.</EditorialHeading></Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map(([number, title, body], index) => (
            <Reveal key={title} delay={0.14 + index * 0.05}>
              <article className="flex h-full gap-4 rounded-[18px] border border-white/15 bg-white/5 p-5 text-white"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFC83D] text-xs font-bold text-[#111111]">{number}</span><div><h3 className="font-editorial text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p></div></article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function EchoWhyChoose() {
  return (
    <Section surface="sand" ariaLabelledBy="echo-why-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="05" accent={TEAL}>Why watNidea?</SectionLabel>
        <Reveal delay={0.08}><EditorialHeading as="h2" id="echo-why-heading" className="mt-4 max-w-[20ch]">Useful content, honest expectations and a clearer <Underline>system</Underline>.</EditorialHeading></Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(([title, body], index) => (
            <Reveal key={title} delay={0.14 + index * 0.05}><article className="h-full rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-white p-5"><span className="text-xs font-bold text-[#157468]">0{index + 1}</span><h3 className="mt-3 font-editorial text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5D5A54]">{body}</p></article></Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function EchoFaq() {
  return (
    <Section surface="white" ariaLabelledBy="echo-faq-heading" className="lg:!py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4"><SectionLabel number="06" accent={TEAL}>Frequently Asked Questions</SectionLabel><Reveal delay={0.08}><EditorialHeading as="h2" id="echo-faq-heading" className="mt-4">Search questions, <Underline>honestly</Underline> answered.</EditorialHeading></Reveal><Reveal delay={0.16}><p className="mt-3 max-w-sm text-sm leading-relaxed text-[#5D5A54]">Clear answers about AEO, SEO, timelines, content, technical work and what no agency can promise.</p></Reveal></div>
          <div className="lg:col-span-8"><FAQAccordion items={FAQS} accent={TEAL} /></div>
        </div>
      </Container>
    </Section>
  )
}
