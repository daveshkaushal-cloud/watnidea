'use client'

/**
 * Work — Creative Portfolio page.
 * Custom implementation. 8 visible sections + Final CTA.
 *
 * Hierarchy (per brief):
 *   H1: Creative Work Built From Clear Ideas (hero, 1 only)
 *   H2: Ideas, Built to Be Used
 *   H2: Selected Creative Explorations (8 H3 concept cards)
 *   H2: Explore Work by Capability (8 H3 capability links)
 *   H2: Behind Every Strong Piece of Work (6 H3 process steps)
 *   H2: Honest Context. Better Case Studies. (3 H3 points)
 *   H2: Frequently Asked Questions (6 H3 FAQs)
 *   H2: Let's Create Work Worth Remembering (final CTA)
 *
 * Palette: cream paper base, red (#F13D32) primary accent, controlled
 * service colours (yellow/teal/blue/lime/orange/violet) as concept-card
 * accents, ink (#101010) for the ONE dark section (process).
 *
 * Honesty rules:
 *   - All 8 concept explorations labelled "Concept exploration — not client work".
 *   - NO invented clients, metrics, testimonials, awards or results.
 *   - NO fake revenue/engagement/ranking/conversion/growth figures.
 *   - Client privacy respected — no unverified client work shown.
 */

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import {
  Section, Container, SectionLabel, EditorialHeading, Reveal,
  CTAButton, Sticker, Underline, IdeaStamp, FAQAccordion,
} from '@/components/site/primitives'
import { WORK_FAQS as FAQS } from '@/lib/work-faq-data'

const RED = '#F13D32'
const INK = '#101010'

/* Compact section padding override */
const COMPACT = 'py-10 lg:!py-10'
const COMPACT_SM = 'py-8 lg:!py-8'

/* ============================================================
 * S1 — Hero (paper)
 * H1: "Creative Work Built From Clear Ideas"
 * ============================================================ */
export function WorkHero() {
  return (
    <Section
      surface="paper"
      className="relative overflow-hidden !pt-[calc(72px+3rem)] pb-12 sm:!pt-[calc(72px+4rem)] sm:pb-16 lg:pb-20"
      ariaLabelledBy="work-hero-heading"
    >
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#FFC83D] opacity-35 blur-[90px]" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#F13D32] opacity-15 blur-[110px]" />
        <div className="absolute right-[38%] top-10 h-32 w-32 rounded-full bg-[#66DFC0] opacity-25 blur-[70px]" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">

          {/* Left content */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex rotate-[-2deg] rounded-full bg-[#101010] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_3px_0_#F13D32]">
                  Work · Creative Portfolio
                </span>

                <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#5D5A54]">
                  Selected projects and explorations
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                id="work-hero-heading"
                className="max-w-[11ch] font-editorial text-[clamp(3.2rem,6.2vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-[#101010]"
              >
                Ideas made{' '}
                <span className="relative inline-block text-[#F13D32]">
                  visible.
                  <span
                    aria-hidden
                    className="absolute -bottom-2 left-0 h-[7px] w-full rounded-full bg-[#F13D32]"
                  />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#5D5A54] sm:text-lg">
                A focused selection of branding, websites, social campaigns
                and AI-assisted advertising—built from clear ideas and shaped
                for real-world use.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#selected-work"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#F13D32] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_0_#101010] transition-transform hover:-translate-y-1"
                >
                  Explore Selected Work
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>

                <Link
                  href="/book-strategy-call"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[rgba(16,16,16,0.20)] bg-white px-6 py-3 text-sm font-semibold text-[#101010] transition-colors hover:border-[#F13D32] hover:text-[#F13D32]"
                >
                  Start Your Project
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-wider text-[#5D5A54]">
                <span>Branding</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#F13D32]" />
                <span>Digital</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                <span>Campaigns</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#7657F6]" />
                <span>AI Creative</span>
              </div>
            </Reveal>
          </div>

          {/* Right-side portfolio collage */}
          <div className="lg:col-span-6">
            <Reveal delay={0.18}>
              <div className="relative mx-auto max-w-[650px]">

                {/* Main AI campaign video */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] border border-[rgba(16,16,16,0.16)] bg-[#101010] shadow-[0_28px_70px_-35px_rgba(16,16,16,0.55)]">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="watNidea AI advertising campaign showcase"
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source
                      src="/watnidea-ai-campaign-loop-1600x1000.mp4"
                      type="video/mp4"
                    />
                  </video>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                      AI-Assisted Creative
                    </p>
                    <p className="mt-1 font-editorial text-2xl font-semibold text-white">
                      Ideas in motion
                    </p>
                  </div>
                </div>

                {/* Branding image */}
                <div className="absolute -bottom-12 -left-8 hidden w-[42%] rotate-[-4deg] overflow-hidden rounded-[18px] border-[6px] border-[#FFF7E9] bg-white shadow-[0_18px_45px_-20px_rgba(16,16,16,0.55)] sm:block">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src="/project-branding.webp"
                      alt="Brand transformation project by watNidea"
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Website image */}
                <div className="absolute -right-7 -top-8 hidden w-[38%] rotate-[4deg] overflow-hidden rounded-[18px] border-[6px] border-[#FFF7E9] bg-white shadow-[0_18px_45px_-20px_rgba(16,16,16,0.55)] sm:block">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src="/project-website.webp"
                      alt="Website project by watNidea"
                      fill
                      sizes="260px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Decorative labels */}
                <span className="absolute -left-3 top-8 rotate-[-8deg] rounded-full bg-[#C8F542] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#101010] shadow-[0_3px_0_#101010]">
                  Built with purpose
                </span>

                <span className="absolute -bottom-4 right-6 rotate-[3deg] rounded-full bg-[#FFC83D] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#101010] shadow-[0_3px_0_#101010]">
                  Strategy × Creativity
                </span>

                <span
                  aria-hidden
                  className="wn-tape"
                  style={{
                    left: '44%',
                    top: '-16px',
                    transform: 'rotate(-4deg)',
                    background: 'rgba(255,200,61,0.9)',
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S2 — Ideas, Built to Be Used (sand)
 * ============================================================ */
export function WorkIdeas() {
  return (
    <Section surface="orange" ariaLabelledBy="work-ideas-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="01" accent="#FFC83D">Ideas, Built to Be Used</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="work-ideas-heading" className="mt-4 max-w-[20ch] text-white">
            Good-looking work is only the <Underline>beginning</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal delay={0.16}>
              <p className="text-base leading-relaxed text-white opacity-90">
                At watNidea, we create ideas that can become practical brand systems, responsive websites, repeatable content formats, focused campaigns, and meaningful experiences.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 text-base leading-relaxed text-white opacity-90">
                Every creative direction starts with a clear question:
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-3 rounded-[14px] border-l-4 border-[#FFC83D] bg-[rgba(255,255,255,0.10)] py-3 pl-4 pr-3 font-editorial text-lg font-semibold italic text-white">
                What should people understand, feel, remember, or do?
              </p>
            </Reveal>
            <Reveal delay={0.36}>
              <p className="mt-4 text-base leading-relaxed text-white opacity-90">
                That question helps us connect business goals with creative thinking. It also ensures that every color, typeface, message, layout, interaction, frame, and campaign asset has a reason to exist.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.24}>
              <div className="rounded-[18px] border border-[rgba(16,16,16,0.12)] bg-[#FFFDF8] p-5">
                <p className="wn-caption text-[#5D5A54]">The selected work below demonstrates how we approach different creative challenges across:</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['Branding', 'Digital', 'Content', 'Video', 'Advertising', 'Search'].map((tag) => (
                    <span key={tag} className="inline-flex items-center rounded-full border border-[rgba(16,16,16,0.14)] bg-[#F7F2E8] px-2.5 py-1 text-xs font-medium text-[#101010]">{tag}</span>
                  ))}
                </div>
                <div className="mt-4">
                  <CTAButton href="/about" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />} aria-label="Discover our approach">Discover Our Approach</CTAButton>
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
 * S3 — Selected Creative Explorations (paper, 8 concept cards)
 * Each H3 with project type label + capability + description + CTA.
 * ============================================================ */
const EXPLORATIONS = [
  {
    title: 'Digital Experience',
    capability: 'Website Design & Development',
    description:
      'A responsive website experience combining clear content hierarchy, distinctive visual direction and focused user journeys.',
    mediaType: 'image',
    media: '/project-website.webp',
    route: '/the-digital-hq',
    accent: '#3D5AFE',
  },
  {
    title: 'Brand Transformation',
    capability: 'Brand Identity & Strategy',
    description:
      'A before-and-after brand transformation exploring identity, typography, colour and a more memorable visual presence.',
    mediaType: 'image',
    media: '/project-branding.webp',
    route: '/aura-architecture',
    accent: '#F13D32',
  },
  {
    title: 'Social Campaign System',
    capability: 'Social Media Creative',
    description:
      'A connected social-media campaign designed to remain recognisable across posts, stories and promotional formats.',
    mediaType: 'image',
    media: '/project-social-campaign.webp',
    route: '/the-hype-engine',
    accent: '#C8F542',
  },
  {
    title: 'AI Advertising Campaign',
    capability: 'AI-Assisted Creative',
    description:
      'A human-directed AI advertising showcase combining multiple visual concepts into one fast, cinematic campaign loop.',
    mediaType: 'video',
    media: '/watnidea-ai-campaign-loop-1600x1000.mp4',
    route: '/synthetic-cinema',
    accent: '#7657F6',
  },
] as const
  
export function WorkExplorations() {
  return (
    <Section
      surface="paper"
      id="selected-work"
      ariaLabelledBy="work-explorations-heading"
      className={COMPACT}
    >
      <Container>
        <SectionLabel number="02" accent={RED}>
          Selected Work
        </SectionLabel>

        <Reveal delay={0.08}>
          <EditorialHeading
            as="h2"
            id="work-explorations-heading"
            className="mt-4 max-w-[20ch]"
          >
            Four creative <Underline>projects</Underline>.
          </EditorialHeading>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#5D5A54]">
            A focused selection of digital, branding, social and AI-assisted
            creative work. Each project demonstrates how one clear idea can
            become a distinctive visual experience.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {EXPLORATIONS.map((project, index) => (
            <Reveal key={project.title} delay={0.2 + index * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.12)] bg-[#FFFDF8] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(16,16,16,0.30)]">

                <div className="relative aspect-[16/10] overflow-hidden bg-[#101010]">
                  {project.mediaType === 'video' ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label="watNidea AI advertising campaign showcase"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    >
                      <source src={project.media} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={project.media}
                      alt={`${project.title} project by watNidea`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}

                  <div className="absolute left-4 top-4">
                    <span
                      className="inline-flex rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-sm"
                      style={{ background: project.accent }}
                    >
                      {project.capability}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-editorial text-2xl font-semibold leading-tight text-[#101010]">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#5D5A54]">
                    {project.description}
                  </p>

                  <Link
                    href={project.route}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#101010] hover:underline"
                  >
                    Explore Project
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S4 — Explore Work by Capability (white, 8 capability links)
 * ============================================================ */
const CAPABILITIES = [
  { t: 'Brand Identity', d: 'Create a distinctive and flexible identity through brand strategy, logo design, typography, colors, messaging, guidelines, and creative direction.', href: '/aura-architecture', accent: '#F13D32' },
  { t: 'Website Development', d: 'Build responsive digital experiences that combine brand identity, content, usability, visual design, and clear conversion paths.', href: '/the-digital-hq', accent: '#3D5AFE' },
  { t: 'Social Media', d: 'Develop recognizable social content, campaign concepts, platform-specific assets, and visual systems that can evolve with your brand.', href: '/the-hype-engine', accent: '#C8F542' },
  { t: 'Video Production', d: 'Transform an idea into an engaging visual story through concepts, scripts, storyboards, filming, editing, sound, and motion graphics.', href: '/kinetic-studio', accent: '#F97316' },
  { t: 'Performance Marketing', d: 'Connect advertising creative with targeting, landing pages, conversion tracking, campaign testing, and ongoing optimization.', href: '/growth-alchemy', accent: '#66DFC0' },
  { t: 'AI Advertising', d: 'Use AI-supported insights and creative tools to explore ideas, build variations, personalize communication, and develop more informed campaigns.', href: '/synthetic-cinema', accent: '#7657F6' },
  { t: 'AEO and SEO', d: 'Improve discoverability through useful content, technical improvements, search strategy, structured information, and answer-focused experiences.', href: '/the-echo-system', accent: '#FFC83D' },
  { t: 'Digital Marketing', d: 'Bring content, social media, search, advertising, websites, and campaigns together through one connected digital strategy.', href: '/digital-marketing', accent: '#FF6B62' },
]

export function WorkCapabilities() {
  return (
    <Section surface="lime" ariaLabelledBy="work-capabilities-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="03" accent={RED}>Explore Work by Capability</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="work-capabilities-heading" className="mt-4 max-w-[20ch]">
            Different projects, <Underline>different</Underline> capabilities.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#5D5A54]">
            Some require one focused service, while others benefit from a connected creative team working across multiple touchpoints.
          </p>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.t} delay={0.24 + i * 0.04}>
              <Link
                href={c.href}
                className="group flex h-full flex-col gap-2 rounded-[14px] border border-[rgba(16,16,16,0.12)] bg-[#F7F2E8] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(16,16,16,0.20)] hover:shadow-[0_8px_24px_-14px_rgba(16,16,16,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.accent }} aria-hidden />
                  <h3 className="font-editorial text-sm font-semibold leading-tight">{c.t}</h3>
                  <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-[#5D5A54] transition-colors group-hover:text-[#101010]" aria-hidden />
                </div>
                <p className="text-xs leading-relaxed text-[#5D5A54]">{c.d}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S5 — Behind Every Strong Piece of Work (ink — the ONE dark section, process)
 * 6 process steps.
 * ============================================================ */
const PROCESS_STEPS = [
  { n: '01', t: 'Understand the Context', d: 'We begin by learning about the business, audience, market, competitors, challenges, goals, and practical requirements behind the project.' },
  { n: '02', t: 'Define the Direction', d: 'We establish the central idea, message, visual language, tone, priorities, and creative principles that will guide the work.' },
  { n: '03', t: 'Build the Creative System', d: 'We develop the core identity, design, content, interface, film, or campaign components needed to bring the direction to life.' },
  { n: '04', t: 'Connect Every Touchpoint', d: 'We consider how the idea should adapt across websites, social media, presentations, packaging, advertising, video, and other brand interactions.' },
  { n: '05', t: 'Refine the Details', d: 'We review typography, messaging, layouts, transitions, interactions, visual consistency, and other details that influence how the work is experienced.' },
  { n: '06', t: 'Prepare for Real Use', d: 'Final assets are organized and prepared for the formats, platforms, teams, and situations in which they will be used.' },
]

export function WorkProcess() {
  return (
    <Section surface="ink" ariaLabelledBy="work-process-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="04" accent="#FFC83D">Behind Every Strong Piece of Work</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="work-process-heading" className="mt-4 max-w-[20ch] text-white">
            The final visual is <Underline>one part</Underline> of the story.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[rgba(255,255,255,0.82)]">
            Our process considers what the work needs to communicate, where it will be used, and how it can remain effective as the brand develops.
          </p>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={0.24 + i * 0.05}>
              <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full font-editorial text-xs font-bold text-[#101010]" style={{ background: '#FFC83D' }}>{s.n}</span>
                  <h3 className="font-editorial text-sm font-semibold text-white">{s.t}</h3>
                </div>
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
 * S6 — Honest Context. Better Case Studies. (sand, 3 points)
 * ============================================================ */
const HONESTY_POINTS = [
  { t: 'Clear Project Labels', d: 'Internal explorations are clearly labelled as concepts. Completed client work will be identified as client work only when that description is accurate and approved.' },
  { t: 'No Invented Results', d: 'We do not attach imaginary revenue, engagement, ranking, conversion, or growth figures to creative concepts. Results should only be published when they are documented and verified.' },
  { t: 'Client Privacy Comes First', d: 'Some projects cannot be shared publicly because of confidentiality, commercial sensitivity, or client preference. Work is only published when the appropriate permission has been given.' },
]

export function WorkHonestContext() {
  return (
    <Section surface="violet" ariaLabelledBy="work-honest-heading" className={COMPACT}>
      <Container>
        <SectionLabel number="05" accent="#FFC83D">Honest Context. Better Case Studies.</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="work-honest-heading" className="mt-4 max-w-[20ch] text-white">
            Trust matters in <Underline>creative</Underline> work.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-white opacity-90">
            A portfolio should inspire potential clients without creating a misleading impression.
          </p>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {HONESTY_POINTS.map((h, i) => (
            <Reveal key={h.t} delay={0.24 + i * 0.06}>
              <div className="flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.06)] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full font-editorial text-[0.6rem] font-bold text-[#111111]" style={{ background: '#FFC83D' }}>{i + 1}</span>
                  <h3 className="font-editorial text-sm font-semibold text-white">{h.t}</h3>
                </div>
                <p className="text-xs leading-relaxed text-[rgba(255,255,255,0.80)]">{h.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S7 — Frequently Asked Questions (paper, accessible accordion)
 * 6 Q&As.
 * ============================================================ */
export function WorkFaq() {
  return (
    <Section surface="paper" ariaLabelledBy="work-faq-heading" className={COMPACT}>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel number="06" accent={RED}>Frequently Asked Questions</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="work-faq-heading" className="mt-4">
                Questions, <Underline>honestly</Underline> answered.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-3 max-w-sm text-sm text-[#5D5A54]">If yours isn&apos;t here, write to us. We&apos;ll answer honestly.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={FAQS} accent={RED} />
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S8 — Final CTA (red, paper texture)
 * H2: "Let's Create Work Worth Remembering"
 * ============================================================ */
export function WorkFinalCta() {
  return (
    <Section surface="red" ariaLabelledBy="work-final-heading" className="relative overflow-hidden py-12 lg:!py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-0 h-[240px] w-[240px] rounded-full opacity-20 blur-[100px]" style={{ background: INK }} />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="wn-caption mx-auto mb-4 text-[rgba(255,255,255,0.8)]">Start a Project</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="work-final-heading" className="font-editorial text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-white">
              Let&apos;s Create Work Worth <Underline>Remembering</Underline>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-base text-[rgba(255,255,255,0.88)] sm:text-lg">
              Have a brand idea, digital requirement, campaign, or creative challenge in mind? Let&apos;s turn it into work that feels distinctive, communicates clearly, and gives people a reason to remember your brand.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mx-auto mt-3 max-w-xl text-base text-[rgba(255,255,255,0.88)]">
              Whether you need one focused creative service or a complete connected experience, watNidea can help you define the direction and bring it to life.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTAButton href="/book-strategy-call" className="bg-[#101010] text-white hover:bg-[#2a2a2a]">Start Your Project</CTAButton>
              <a
                href="mailto:info@watnidea.com"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.35)] bg-transparent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[rgba(255,255,255,0.10)]"
              >
                Talk to Our Creative Team
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
