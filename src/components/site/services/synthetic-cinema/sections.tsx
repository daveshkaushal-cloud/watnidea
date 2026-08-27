'use client'

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
import { CINEMA_FAQS as FAQS } from '@/lib/cinema-faq-data'

const PURPLE = '#7657F6'

const CHALLENGES = [
  ['Slow creative production', 'Campaign ideas lose momentum while teams wait for every format and variation.'],
  ['Repetitive concepts', 'More output does not help when every execution is built from the same visual idea.'],
  ['Disconnected experimentation', 'Variations are produced without a clear hypothesis or human review standard.'],
  ['Unclear responsibility', 'AI-generated work reaches production without clear ownership of accuracy, rights or brand quality.'],
]

const SERVICES = [
  ['01', 'Audience Exploration', 'AI-assisted research helps organise information and identify questions worth investigating.'],
  ['02', 'Creative Concepting', 'Human-directed exploration of visual territories, hooks, narratives and campaign worlds.'],
  ['03', 'Creative Variation', 'Adapt approved ideas across formats, messages and audience contexts without losing the core concept.'],
  ['04', 'AI Video Advertising', 'Short-form campaign films and product visuals developed through AI-assisted production workflows.'],
  ['05', 'Personalisation Systems', 'Consent-aware messaging variations designed around lawful audience information.'],
  ['06', 'Analysis Support', 'AI helps surface patterns; people interpret the meaning and decide what happens next.'],
]

const PROCESS = [
  ['1', 'Brief', 'Define the business objective, audience, channels and boundaries.'],
  ['2', 'Direction', 'Human creative direction establishes the concept and visual standard.'],
  ['3', 'Exploration', 'AI assists with research, treatments and controlled creative variations.'],
  ['4', 'Review', 'People check accuracy, brand fit, copyright, consent and production quality.'],
  ['5', 'Production', 'Approved concepts are refined into final campaign-ready assets.'],
  ['6', 'Learning', 'Campaign evidence informs the next creative hypothesis and production cycle.'],
]

const REASONS = [
  ['Human-led by design', 'Strategy, direction, judgment and final approval remain with people.'],
  ['Built for brands', 'AI is used to strengthen a clear brand idea—not to replace identity with generic output.'],
  ['Transparent process', 'We explain where AI assists, what information it uses and where human review happens.'],
  ['Responsible production', 'Privacy, consent, copyright, representation and factual accuracy are reviewed before release.'],
  ['Connected execution', 'Concept, motion, copy and campaign formats are developed as one visual system.'],
  ['No invented promises', 'We test creative hypotheses without guaranteeing reach, leads, conversions or lower costs.'],
]

export function CinemaHero() {
  return (
    <Section surface="paper" className="relative overflow-hidden !pt-[calc(72px+3rem)] pb-14 sm:!pt-[calc(72px+4rem)] sm:pb-20" ariaLabelledBy="cinema-hero-heading">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#7657F6] opacity-20 blur-[110px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#F13D32] opacity-15 blur-[120px]" />
      </div>
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex rotate-[-2deg] rounded-full bg-[#111111] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_3px_0_#7657F6]">
                Synthetic Cinema · AI Creative
              </span>
            </Reveal>
            <Reveal delay={0.08}>
  <h1
    id="cinema-hero-heading"
    className="mt-6 max-w-[14ch] font-editorial text-[clamp(2.75rem,4.6vw,4.75rem)] font-medium leading-[0.96] tracking-[-0.04em] text-[#111111]"
  >
    An{' '}
    <strong className="font-semibold">
      AI Advertising Agency
    </strong>{' '}
    expanding human{' '}
    <span className="relative inline-block text-[#7657F6]">
      ideas.
      <span
        aria-hidden
        className="absolute -bottom-2 left-0 h-[6px] w-full rounded-full bg-[#F13D32]"
      />
    </span>
  </h1>
</Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#5D5A54] sm:text-lg">
                AI-assisted advertising and visual storytelling shaped by human strategy, creative direction and accountability—from the first concept to the final campaign asset.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/book-strategy-call" aria-label="Discuss an AI creative project">Discuss Your Project</CTAButton>
                <CTAButton href="/work" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />} aria-label="Explore our creative work">Explore Our Work</CTAButton>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.18}>
              <div className="relative mx-auto max-w-[650px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] border border-[rgba(17,17,17,0.16)] bg-[#111111] shadow-[0_28px_70px_-35px_rgba(17,17,17,0.6)]">
                  <video autoPlay muted loop playsInline preload="metadata" aria-label="AI-assisted fashion and product advertising showcase" className="absolute inset-0 h-full w-full object-cover">
                    <source src="/work/synthetic-cinema-branded-loop.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-0 left-0 z-10 min-w-[52%] bg-gradient-to-r from-[#111111] via-[#111111]/95 to-transparent px-5 pb-5 pt-14">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">watNidea · Synthetic Cinema</p>
                    <p className="mt-1 font-editorial text-xl font-semibold text-white">AI-assisted campaign worlds</p>
                  </div>
                </div>
                <span className="absolute -right-3 top-7 rotate-[5deg] rounded-full bg-[#C8F542] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#111111] shadow-[0_3px_0_#111111]">Human directed</span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export function CinemaChallenges() {
  return (
    <Section surface="paper" ariaLabelledBy="cinema-challenges-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="01" accent={PURPLE}>The Creative Challenge</SectionLabel>
        <Reveal delay={0.08}><EditorialHeading as="h2" id="cinema-challenges-heading" className="mt-4 max-w-[20ch]">More content is not the same as a better <Underline>idea</Underline>.</EditorialHeading></Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {CHALLENGES.map(([title, body], index) => (
            <Reveal key={title} delay={0.14 + index * 0.05}>
              <article className="flex h-full gap-4 rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-white p-5">
                <span className="font-editorial text-xl font-bold text-[#7657F6]">0{index + 1}</span>
                <div><h3 className="font-editorial text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5D5A54]">{body}</p></div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function CinemaServices() {
  return (
    <Section surface="lilac" ariaLabelledBy="cinema-services-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="02" accent={PURPLE}>AI-Assisted Creative Services</SectionLabel>
        <Reveal delay={0.08}><EditorialHeading as="h2" id="cinema-services-heading" className="mt-4 max-w-[20ch]">One creative system. Six ways AI can <Underline>assist</Underline>.</EditorialHeading></Reveal>
        <Reveal delay={0.16}>
  <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5D5A54]">
    Our{' '}
    <strong className="font-semibold text-[#111111]">
      AI advertising solutions for small businesses
    </strong>{' '}
    support research, creative exploration, campaign variation and visual
    production under human strategy, direction and review.
  </p>
</Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(([number, title, body], index) => (
            <Reveal key={title} delay={0.2 + index * 0.05}>
              <article className="group flex h-full flex-col rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFDF8] p-5 transition-transform hover:-translate-y-1">
                <span className="text-xs font-bold text-[#7657F6]">{number}</span>
                <h3 className="mt-3 font-editorial text-xl font-semibold">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5D5A54]">{body}</p>
                <Link href="/book-strategy-call" className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#F13D32] hover:underline">Discuss Service <ArrowRight className="h-3.5 w-3.5" /></Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function CinemaShowcase() {
  return (
    <Section surface="paper" ariaLabelledBy="cinema-showcase-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="03" accent={PURPLE}>Ideas in Motion</SectionLabel>
        <Reveal delay={0.08}><EditorialHeading as="h2" id="cinema-showcase-heading" className="mt-4 max-w-[21ch]">Two AI-assisted campaign <Underline>explorations</Underline>.</EditorialHeading></Reveal>
        <Reveal delay={0.16}><p className="mt-4 max-w-2xl text-base text-[#5D5A54]">Visual experiments showing how a single creative direction can expand across fashion, product, advertising and cinematic formats.</p></Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal delay={0.2}>
            <article className="overflow-hidden rounded-[22px] border border-[rgba(17,17,17,0.12)] bg-[#111111]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <video autoPlay muted loop playsInline preload="metadata" aria-label="AI-assisted branded campaign montage" className="absolute inset-0 h-full w-full object-cover">
                  <source src="/work/synthetic-cinema-branded-loop.mp4" type="video/mp4" />
                </video>
                <div className="absolute bottom-0 left-0 min-w-[55%] bg-[#111111]/95 px-4 py-3 text-white">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-white/65">watNidea concept film</p>
                  <p className="font-editorial text-lg font-semibold">Fashion × Product</p>
                </div>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.27}>
            <article className="overflow-hidden rounded-[22px] border border-[rgba(17,17,17,0.12)] bg-[#111111]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <video autoPlay muted loop playsInline preload="metadata" aria-label="watNidea AI advertising campaign reel" className="absolute inset-0 h-full w-full object-cover">
                  <source src="/watnidea-ai-campaign-loop-1600x1000.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-14 text-white">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-white/65">AI advertising showcase</p>
                  <p className="font-editorial text-lg font-semibold">Campaign worlds in motion</p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-[#5D5A54]">Concept work is shown as creative exploration. AI supports production; human teams remain responsible for direction, review, rights and release approval.</p>
      </Container>
    </Section>
  )
}

export function CinemaHowSupport() {
  return (
    <Section surface="ink" ariaLabelledBy="cinema-support-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="04" accent="#C8B5FF">Human Responsibility</SectionLabel>
        <Reveal delay={0.08}><EditorialHeading as="h2" id="cinema-support-heading" className="mt-4 max-w-[20ch] text-white">AI assists. Humans remain <Underline>accountable</Underline>.</EditorialHeading></Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {[
            ['AI can explore', 'Research patterns, visual directions, copy options and production variations.'],
            ['People must decide', 'Objectives, meaning, taste, accuracy, brand fit and whether an idea should exist.'],
            ['Teams must verify', 'Consent, copyright, representation, factual claims, privacy and final quality.'],
          ].map(([title, body], index) => (
            <Reveal key={title} delay={0.16 + index * 0.07}>
              <article className="h-full rounded-[18px] border border-white/15 bg-white/5 p-5 text-white">
                <span className="text-xs font-bold text-[#C8B5FF]">0{index + 1}</span><h3 className="mt-3 font-editorial text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function CinemaProcess() {
  return (
    <Section surface="sand" ariaLabelledBy="cinema-process-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="05" accent={PURPLE}>Creative Process</SectionLabel>
        <Reveal delay={0.08}><EditorialHeading as="h2" id="cinema-process-heading" className="mt-4 max-w-[20ch]">From human brief to approved <Underline>campaign</Underline>.</EditorialHeading></Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map(([number, title, body], index) => (
            <Reveal key={title} delay={0.14 + index * 0.05}>
              <article className="flex h-full gap-4 rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7657F6] text-xs font-bold text-white">{number}</span>
                <div><h3 className="font-editorial text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5D5A54]">{body}</p></div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function CinemaWhyChoose() {
  return (
    <Section surface="lilac" ariaLabelledBy="cinema-why-heading" className="lg:!py-16">
      <Container>
        <SectionLabel number="06" accent={PURPLE}>Why watNidea?</SectionLabel>
        <Reveal delay={0.08}><EditorialHeading as="h2" id="cinema-why-heading" className="mt-4 max-w-[20ch]">Technology with taste, direction and <Underline>judgment</Underline>.</EditorialHeading></Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(([title, body], index) => (
            <Reveal key={title} delay={0.14 + index * 0.05}>
              <article className="h-full rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFDF8] p-5"><span className="text-xs font-bold text-[#7657F6]">0{index + 1}</span><h3 className="mt-3 font-editorial text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5D5A54]">{body}</p></article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export function CinemaFaq() {
  return (
    <Section surface="white" ariaLabelledBy="cinema-faq-heading" className="lg:!py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel number="07" accent={PURPLE}>Frequently Asked Questions</SectionLabel>
            <Reveal delay={0.08}><EditorialHeading as="h2" id="cinema-faq-heading" className="mt-4">Questions, <Underline>honestly</Underline> answered.</EditorialHeading></Reveal>
            <Reveal delay={0.16}><p className="mt-3 max-w-sm text-sm leading-relaxed text-[#5D5A54]">Clear answers about AI-assisted creative work, human oversight, rights, privacy and where AI is—or is not—useful.</p></Reveal>
          </div>
          <div className="lg:col-span-8"><FAQAccordion items={FAQS} accent={PURPLE} /></div>
        </div>
      </Container>
    </Section>
  )
}
