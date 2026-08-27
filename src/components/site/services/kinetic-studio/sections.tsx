'use client'

/**
 * Kinetic Studio — Video Production service page.
 * Custom implementation. 14 visible sections + Final CTA.
 * Orange/coral accent with cream, ink and red details.
 *
 * No fake showreel, footage, clients, testimonials, awards or metrics.
 */

import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import {
  Section, Container, SectionLabel, EditorialHeading, Reveal,
  CTAButton, Underline, IdeaStamp, FAQAccordion,
} from '@/components/site/primitives'
import { KINETIC_FAQS as FAQS } from '@/lib/kinetic-faq-data'

/* ============================================================
 * S1 — Hero (paper) with cinematic visual
 * ============================================================ */
export function KineticHero() {
  return (
    <Section
      surface="paper"
      className="relative overflow-hidden !pt-[calc(72px+3rem)] pb-16 sm:!pt-[calc(72px+4rem)] sm:pb-20 lg:pb-24"
      ariaLabelledBy="kinetic-hero-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#F97316] opacity-24 blur-[105px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#F13D32] opacity-14 blur-[120px]" />
        <div className="absolute right-[38%] top-10 h-40 w-40 rounded-full bg-[#FFC83D] opacity-20 blur-[85px]" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex rotate-[-2deg] rounded-full bg-[#101010] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_3px_0_#F97316]">
                  Kinetic Studio
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5D5A54]">
                  Concept × Motion × Edit
                </span>
              </div>
            </Reveal>

           <Reveal delay={0.08}>
  <h1
    id="kinetic-hero-heading"
    className="max-w-[14ch] font-editorial text-[clamp(2.75rem,4.6vw,4.75rem)] font-medium leading-[0.96] tracking-[-0.04em] text-[#101010]"
  >
    A{' '}
    <strong className="font-semibold">
      Video Production Company
    </strong>{' '}
    bringing ideas to{' '}
    <span className="relative inline-block text-[#F97316]">
      life.
      <span
        aria-hidden
        className="absolute -bottom-2 left-0 h-[6px] w-full rounded-full bg-[#F97316]"
      />
    </span>
  </h1>
</Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-[#5D5A54] sm:text-lg">
                We turn brand ideas into focused video stories—combining concept, editing, motion and sound for social, campaigns and digital experiences.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CTAButton href="/book-strategy-call" style={{ background: '#F97316' }} aria-label="Start your video project">
                  Start Your Video Project
                </CTAButton>
                <CTAButton href="#motion-work" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />} aria-label="Watch the showreel">
                  Watch Showreel
                </CTAButton>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wider text-[#5D5A54]">
                <span>Concept</span><span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
                <span>Editing</span><span className="h-1.5 w-1.5 rounded-full bg-[#F13D32]" />
                <span>Motion</span><span className="h-1.5 w-1.5 rounded-full bg-[#FFC83D]" />
                <span>Delivery</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.18}>
              <div className="relative mx-auto max-w-[650px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] border border-[rgba(16,16,16,0.16)] bg-[#101010] shadow-[0_28px_70px_-34px_rgba(16,16,16,0.6)]">
                  <video autoPlay muted loop playsInline preload="metadata" aria-label="Kinetic Studio motion showreel" className="absolute inset-0 h-full w-full object-cover">
                    <source src="/watnidea-ai-campaign-loop-1600x1000.mp4" type="video/mp4" />
                  </video>

                  <div className="pointer-events-none absolute bottom-0 left-0 z-10 p-4 sm:p-5">
                    <div className="rounded-full bg-[#101010] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg">
                      Kinetic Studio Showreel
                    </div>
                  </div>

                  <span className="absolute right-4 top-4 rotate-[3deg] rounded-full bg-[#FFC83D] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#101010] shadow-[0_3px_0_#F97316]">
                    6 sec loop
                  </span>
                </div>

                <span className="absolute -bottom-5 right-8 rotate-[3deg] rounded-full bg-[#F97316] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_3px_0_#101010]">
                  Stories in motion
                </span>
                <span aria-hidden className="wn-tape" style={{ left: '46%', top: '-14px', transform: 'rotate(-4deg)', background: 'rgba(249,115,22,0.9)' }} />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S2 — Common Video Challenges (white, diagnosis board)
 * ============================================================ */
const CHALLENGES = [
  { cat: 'Message', text: "The video doesn't clearly communicate what the business does" },
  { cat: 'Story', text: "There's no narrative — just disconnected clips or talking heads" },
  { cat: 'Visual Quality', text: "The footage looks amateur or inconsistent with the brand" },
  { cat: 'Brand Consistency', text: "The video style doesn't match the website or other brand assets" },
  { cat: 'Production', text: 'Videos take too long to produce or cost more than expected' },
  { cat: 'Platform Fit', text: "The video doesn't work well on the platforms where it's shared" },
  { cat: 'Message', text: 'The call-to-action is unclear or missing entirely' },
  { cat: 'Story', text: 'The video is too long and loses attention before the key message' },
  { cat: 'Visual Quality', text: 'Sound quality is poor — bad audio undermines good visuals' },
  { cat: 'Production', text: "There's no clear process from brief to final delivery" },
]

export function KineticChallenges() {
  return (
    <Section surface="violet" ariaLabelledBy="kinetic-challenges-heading">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01" accent="#F97316">Is Your Brand Getting Lost in the Crowd?</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="kinetic-challenges-heading" className="mt-4 max-w-[18ch]">
                Common video <Underline>challenges</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-base text-[#555255]">
                Most video problems aren&apos;t about the camera — they&apos;re about message, story and consistency. If any of these sound familiar, it may be time to rethink the approach.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-5">
              <p className="wn-caption text-[#555255]">Video Diagnosis Board</p>
              <ul className="mt-3 space-y-2.5">
                {CHALLENGES.map((c, i) => (
                  <Reveal key={i} delay={0.16 + i * 0.04}>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full bg-[#F97316] px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-white">{c.cat}</span>
                      <span className="text-sm leading-relaxed text-[#111111]">{c.text}</span>
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
 * S3 — What Is Video Production? (sand, diagram + focus)
 * ============================================================ */
const FOCUS_POINTS = [
  'Clear creative direction', 'Strategic storytelling', 'Brand-consistent visuals', 'Platform-specific formats',
  'Professional editing', 'Motion graphics', 'Sound and colour', 'Efficient production',
]
const SYSTEM = ['Concept', 'Script', 'Storyboard', 'Planning', 'Filming', 'Editing', 'Motion', 'Sound', 'Colour', 'Delivery']

export function KineticWhatIs() {
  return (
    <Section surface="sand" ariaLabelledBy="kinetic-whatis-heading">
      <Container>
        <SectionLabel number="02" accent="#F97316">What Is Video Production?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="kinetic-whatis-heading" className="mt-4 max-w-[20ch]">
            How a video gets <Underline>made</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <p className="text-base leading-relaxed text-[#111111] opacity-85">
                Video production is the process of creating video content — from concept and script to filming, editing and final delivery. It combines creative direction, storytelling, visual craft and technical production to communicate a message that connects with the audience.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-base leading-relaxed text-[#111111] opacity-85">
                At watNidea, we handle creative direction, scripting, editing and post-production in-house. For physical filming that requires crew, equipment or location shoots, we coordinate with trusted production partners — so the production quality stays high without inflating the overhead.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.24}>
              <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
                <p className="wn-caption text-[#555255]">Production System</p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {SYSTEM.map((part, i) => (
                    <span key={part} className="inline-flex items-center gap-1.5">
                      <span className="inline-flex items-center rounded-full border border-[rgba(17,17,17,0.14)] bg-[#FFF7E9] px-2.5 py-1 text-xs font-medium text-[#111111]">{part}</span>
                      {i < SYSTEM.length - 1 && <span className="text-[#F97316]">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.28}><p className="mt-8 wn-caption text-[#555255]">Our Video Production Focus</p></Reveal>
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
          {FOCUS_POINTS.map((fp, i) => (
            <Reveal key={fp} delay={0.32 + i * 0.03}>
              <div className="flex items-center gap-2 rounded-[12px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#F97316' }} aria-hidden />
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
 * S4 — Video Production Services (paper, 3 groups)
 * ============================================================ */
const SERVICE_GROUPS = [
  { group: 'Concept & Direction', items: [
    { n: '01', t: 'Video Production Services', d: 'End-to-end video production — from concept to final delivery.' },
    { n: '02', t: 'Corporate Video Production', d: 'Company profiles, interviews, brand films and internal communication.' },
    { n: '03', t: 'Promotional Video Production', d: 'Promotional videos for products, services, launches and campaigns.' },
  ]},
  { group: 'Production', items: [
    { n: '04', t: 'Brand Video Production', d: 'Brand films that tell the story and build emotional connection.' },
    { n: '05', t: 'Product Video Production', d: 'Product demos, showcases and feature videos.' },
    { n: '06', t: 'Social Media Video Production', d: 'Short-form video built for social platforms — reels, stories, ads.' },
    { n: '07', t: 'Explainer Video Production', d: 'Explainer videos that make complex ideas simple and clear.' },
  ]},
  { group: 'Editing & Delivery', items: [
    { n: '08', t: 'Event Video Production', d: 'Event coverage, highlights and recap videos.' },
    { n: '09', t: 'Video Editing & Post-Production', d: 'Editing, motion graphics, sound and colour — post-production services.' },
  ]},
]

export function KineticServices() {
  return (
    <Section surface="coral" ariaLabelledBy="kinetic-services-heading">
      <Container>
        <SectionLabel number="02" accent="#F97316">Our Video Production Services</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="kinetic-services-heading" className="mt-4 max-w-[20ch]">
            Nine services across <Underline>three stages</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
  <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
    Our{' '}
    <strong className="font-semibold">
      video production services
    </strong>{' '}
    connect creative direction, filming, editing, motion, sound and delivery
    into one complete production process.
  </p>
</Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {SERVICE_GROUPS.map((g, gi) => (
            <Reveal key={g.group} delay={0.24 + gi * 0.08}>
              <div className="flex h-full flex-col gap-3">
                <span className="inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white" style={{ background: '#F97316' }}>{g.group}</span>
                {g.items.map((s) => (
                  <div key={s.n} className="flex flex-col gap-1 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                    <div className="flex items-center gap-2">
                      <span className="wn-bignum text-xl" style={{ color: '#F97316' }}>{s.n}</span>
                      <h3 className="font-editorial text-sm font-semibold leading-tight">{s.t}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-[#555255]">{s.d}</p>
                    <Link href="/book-strategy-call" className="mt-1 inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#F97316] hover:underline">
                      Discuss This Video <ArrowRight className="h-3 w-3" aria-hidden />
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
 * Selected Motion Work — showreel
 * ============================================================ */
export function KineticSelectedWork() {
  return (
    <Section surface="ink" id="motion-work" ariaLabelledBy="kinetic-work-heading">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionLabel number="03" accent="#F97316">Selected Motion Work</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="kinetic-work-heading" className="mt-4 max-w-[17ch] text-white">
                Multiple ideas. One fast-moving <Underline>showreel</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-[rgba(255,255,255,0.74)]">
                A compact collection of website, product, fashion and architectural motion—edited into one seamless loop for digital portfolios and campaign surfaces.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Creative direction', 'Video editing', 'Motion', 'Multi-format delivery'].map((item) => (
                  <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.18}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] border border-white/15 bg-[#101010] shadow-[0_28px_70px_-34px_rgba(0,0,0,0.85)]">
                <video autoPlay muted loop playsInline preload="metadata" aria-label="watNidea video editing and motion showreel" className="absolute inset-0 h-full w-full object-cover">
                  <source
  src="/watnidea-ai-campaign-loop-1600x1000.mp4"
  type="video/mp4"
/>
                </video>

                <div className="pointer-events-none absolute bottom-0 left-0 z-10 p-4 sm:p-5">
                  <div className="rounded-full bg-[#101010] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg">
                    Kinetic Studio Showreel
                  </div>
                </div>

                <span className="absolute right-4 top-4 rounded-full bg-[#F97316] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_3px_0_#101010]">
                  Concept × Edit × Motion
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
 * S5 — Promotional Video Production for Businesses (ink, matrix)
 * ============================================================ */
const PROMO_APPS = ['Products', 'Services', 'Launches', 'Offers', 'Campaigns', 'Social Media', 'Websites', 'Advertising', 'Events']

export function KineticPromo() {
  return (
    <Section surface="ink" ariaLabelledBy="kinetic-promo-heading">
      <Container>
        <SectionLabel number="04" accent="#F97316">Promotional Video Production for Businesses</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="kinetic-promo-heading" className="mt-4 max-w-[20ch] text-white">
            One video, <Underline>many applications</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[rgba(255,255,255,0.72)]">
            Promotional videos work across the business — from product launches to social media, websites and advertising. Here&apos;s where a single promotional video can be used.
          </p>
        </Reveal>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {PROMO_APPS.map((app, i) => (
            <Reveal key={app} delay={0.24 + i * 0.04}>
              <div className="flex items-center justify-center rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-4 text-center">
                <span className="font-editorial text-sm font-semibold text-white">{app}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S6 — Brand Video Production Services (sand, 4-part storyboard)
 * ============================================================ */
const BRAND_COMPONENTS = [
  { n: '1', t: 'Brand Storytelling', d: 'Videos that communicate what the brand stands for — its purpose, values and direction.' },
  { n: '2', t: 'Visual Brand Experience', d: 'A visual style that feels like the brand — consistent colour, type and motion.' },
  { n: '3', t: 'Authentic Communication', d: 'A voice that sounds real, not scripted — building trust through honesty.' },
  { n: '4', t: 'Emotional Connection', d: 'Stories that resonate — helping the audience feel something, not just see something.' },
]

export function KineticBrandVideo() {
  return (
    <Section surface="violet" ariaLabelledBy="kinetic-brand-heading">
      <Container>
        <SectionLabel number="05" accent="#F97316">Brand Video Production Services</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="kinetic-brand-heading" className="mt-4 max-w-[20ch]">
            From purpose to <Underline>connection</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            A brand video is more than a product showcase. It&apos;s how purpose becomes message, message becomes scenes, and scenes become a connection with the audience.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_COMPONENTS.map((b, i) => (
            <Reveal key={b.n} delay={0.24 + i * 0.06}>
              <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F97316] font-editorial text-xs font-bold text-white">{b.n}</span>
                  {i < 3 && <span aria-hidden className="hidden h-px flex-1 bg-[rgba(17,17,17,0.15)] sm:block" />}
                </div>
                <h3 className="font-editorial text-sm font-semibold">{b.t}</h3>
                <p className="text-xs leading-relaxed text-[#555255]">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S7 — Corporate Video Production Services (paper, format index)
 * ============================================================ */
const CORP_FORMATS = ['Company profiles', 'Interviews', 'Brand films', 'Product demonstrations', 'Recruitment videos', 'Training videos', 'Leadership videos', 'Event coverage', 'Internal communication']

export function KineticCorporate() {
  return (
    <Section surface="coral" ariaLabelledBy="kinetic-corp-heading">
      <Container>
        <SectionLabel number="06" accent="#F97316">Corporate Video Production Services</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="kinetic-corp-heading" className="mt-4 max-w-[20ch]">
            Corporate video <Underline>formats</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            Corporate videos serve internal and external communication. We handle creative direction and post-production in-house, coordinating filming through trusted partners when needed.
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-2">
          {CORP_FORMATS.map((f, i) => (
            <Reveal key={f} delay={0.24 + i * 0.03}>
              <span className="inline-flex items-center rounded-full border border-[rgba(17,17,17,0.14)] bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#111111]">{f}</span>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S8 — What Makes a Great Business Video? (white, 6 principles)
 * ============================================================ */
const GREAT = [
  { t: 'Clear Message', d: 'The viewer understands the point within the first few seconds.' },
  { t: 'Strong Storytelling', d: 'A narrative structure that holds attention from start to finish.' },
  { t: 'Professional Visuals', d: 'Clean, consistent footage that looks intentional.' },
  { t: 'Consistent Branding', d: 'Visual style that matches the brand across every touchpoint.' },
  { t: 'Audience-Focused Content', d: 'Built for the audience, not the brand\'s internal checklist.' },
  { t: 'Clear Call to Action', d: 'The viewer knows what to do after watching.' },
]

export function KineticGreat() {
  return (
    <Section surface="violet" ariaLabelledBy="kinetic-great-heading">
      <Container>
        <SectionLabel number="07" accent="#F97316">What Makes a Great Business Video?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="kinetic-great-heading" className="mt-4 max-w-[20ch]">
            Six things that make a <Underline>difference</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-2">
          {GREAT.map((g, i) => (
            <Reveal key={g.t} delay={0.16 + i * 0.05}>
              <div className="flex min-h-[80px] flex-col gap-1 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-3" style={{ minWidth: '180px' }}>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F97316] font-editorial text-[0.6rem] font-bold text-white">{i + 1}</span>
                  <h3 className="font-editorial text-sm font-semibold">{g.t}</h3>
                </div>
                <p className="text-xs text-[#555255]">{g.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S9 — Video Production Process (sand, 6-step timeline)
 * ============================================================ */
const PROCESS = [
  { n: '1', t: 'Discovery & Brief', d: 'We learn the brand, the message and the goal.' },
  { n: '2', t: 'Concept & Script', d: 'Creative concept, script and storyboard developed.' },
  { n: '3', t: 'Pre-Production', d: 'Planning, scheduling and production coordination.' },
  { n: '4', t: 'Production', d: 'Filming — in-house or coordinated with trusted partners.' },
  { n: '5', t: 'Editing & Post-Production', d: 'Edit, motion graphics, sound and colour.' },
  { n: '6', t: 'Review & Delivery', d: 'Final export, formats and handover.' },
]

export function KineticProcess() {
  return (
    <Section surface="sand" ariaLabelledBy="kinetic-process-heading">
      <Container>
        <SectionLabel number="04" accent="#F97316">Video Production Process</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="kinetic-process-heading" className="mt-4 max-w-[18ch]">
            Six steps from brief to <Underline>final export</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PROCESS.map((s, i) => (
            <Reveal key={s.n} delay={0.2 + i * 0.05}>
              <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F97316] font-editorial text-xs font-bold text-white">{s.n}</span>
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
 * S10 — Why Businesses Choose watNidea (paper, 1 featured + 5)
 * ============================================================ */
const REASONS = [
  { t: 'Strategy Before Production', d: "We don't start filming until the strategy is clear. Concept shapes every creative choice.", featured: true },
  { t: 'Creative Storytelling', d: 'Narrative structure that holds attention and communicates clearly.' },
  { t: 'Coordinated Production', d: 'Filming coordinated through trusted partners when crew or location is needed.' },
  { t: 'Brand-Focused Content', d: 'Videos that look and feel like the brand, not generic stock footage.' },
  { t: 'Complete Post-Production', d: 'Editing, motion, sound and colour handled in-house.' },
  { t: 'Multi-Platform Content', d: 'Videos built to work across social, web and advertising.' },
]

export function KineticWhyChoose() {
  return (
    <Section surface="coral" ariaLabelledBy="kinetic-why-heading">
      <Container>
        <SectionLabel number="05" accent="#F97316">Why Businesses Choose watNidea</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="kinetic-why-heading" className="mt-4 max-w-[20ch]">
            Six reasons brands <Underline>choose</Underline> the studio.
          </EditorialHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal delay={0.16}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] p-6 text-white" style={{ background: '#F97316' }}>
              <span aria-hidden className="wn-halftone-light absolute inset-0 rounded-[22px] opacity-25" />
              <div className="relative">
                <h3 className="font-editorial text-xl font-semibold leading-tight">{REASONS[0].t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgba(255,255,255,0.88)]">{REASONS[0].d}</p>
              </div>
              <div className="relative mt-4"><IdeaStamp label="Kinetic" size={72} color="#FFFFFF" /></div>
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
 * S11 — Video Solutions for Different Business Needs (white)
 * ============================================================ */
const AUDIENCES = ['Startups', 'Small Businesses', 'Growing Companies', 'E-commerce Brands', 'Professional Services', 'Established Brands']

export function KineticAudiences() {
  return (
    <Section surface="violet" ariaLabelledBy="kinetic-audiences-heading">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <SectionLabel number="10" accent="#F97316">Video Solutions for Different Business Needs</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="kinetic-audiences-heading" className="mt-3 max-w-[20ch] text-2xl sm:text-3xl">
                Wherever you are, we fit.
              </EditorialHeading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <div className="flex flex-wrap gap-2">
              {AUDIENCES.map((a) => (
                <span key={a} className="inline-flex items-center rounded-full border border-[rgba(17,17,17,0.18)] bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#111111]">{a}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S12 — Video Solutions We Can Adapt (sand, compact index)
 * ============================================================ */
const INDUSTRIES = ['Technology', 'Healthcare', 'Education', 'Real Estate', 'E-commerce & Retail', 'Professional Services']

export function KineticIndustries() {
  return (
    <Section surface="sand" ariaLabelledBy="kinetic-industries-heading">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <SectionLabel number="11" accent="#F97316">Video Solutions We Can Adapt</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="kinetic-industries-heading" className="mt-3 max-w-[20ch] text-2xl sm:text-3xl">
                Industries we can adapt for.
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
 * S13 — Videos That Support Business Goals (paper)
 * ============================================================ */
const GOALS = ['Build Brand Awareness', 'Explain Your Services', 'Promote Products', 'Increase Engagement', 'Build Brand Trust', 'Support Marketing Campaigns']

export function KineticGoals() {
  return (
    <Section surface="coral" ariaLabelledBy="kinetic-goals-heading">
      <Container>
        <SectionLabel number="12" accent="#F97316">Videos That Support Business Goals</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="kinetic-goals-heading" className="mt-4 max-w-[20ch]">
            How video <Underline>supports</Underline> the business.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-xl text-base text-[#555255]">
            Video can contribute to business growth — but it doesn&apos;t guarantee it. Here&apos;s how the work connects to broader goals, framed as potential purposes rather than promises.
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-3">
          {GOALS.map((g, i) => (
            <Reveal key={g} delay={0.24 + i * 0.05}>
              <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: '#F97316' }}>
                {g}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S14 — FAQ (white, accessible accordion)
 * ============================================================ */
export function KineticFaq() {
  return (
    <Section surface="white" ariaLabelledBy="kinetic-faq-heading">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel number="06" accent="#F97316">Frequently Asked Questions</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="kinetic-faq-heading" className="mt-4">
                Questions, <Underline>honestly</Underline> answered.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-3 max-w-sm text-sm text-[#555255]">If yours isn&apos;t here, write to us. We&apos;ll answer honestly.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={FAQS} accent="#F97316" />
          </div>
        </div>
      </Container>
    </Section>
  )
}
