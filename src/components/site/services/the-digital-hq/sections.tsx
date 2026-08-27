'use client'

/**
 * The Digital HQ — Website Development service page.
 * Custom implementation. 13 visible sections + Final CTA.
 * Blue (#3D5AFE) accent with cream, ink and controlled supporting colours.
 *
 * No fake metrics, clients, testimonials, scores or guarantees.
 * Testimonials section intentionally omitted.
 */

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import {
  Section, Container, SectionLabel, EditorialHeading, Reveal,
  CTAButton, Underline, IdeaStamp, FAQAccordion,
} from '@/components/site/primitives'
import { DHQ_FAQS as FAQS } from '@/lib/dhq-faq-data'

/* ============================================================
 * S1 — Hero (paper) with responsive-interface visual
 * ============================================================ */
export function DhqHero() {
  return (
    <Section
      surface="paper"
      className="relative overflow-hidden !pt-[calc(72px+3rem)] pb-16 sm:!pt-[calc(72px+4rem)] sm:pb-20 lg:pb-24"
      ariaLabelledBy="dhq-hero-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#66DFC0] opacity-30 blur-[105px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#3D5AFE] opacity-15 blur-[120px]" />
        <div className="absolute right-[38%] top-10 h-40 w-40 rounded-full bg-[#FFC83D] opacity-20 blur-[85px]" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex rotate-[-2deg] rounded-full bg-[#101010] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_3px_0_#3D5AFE]">
                  The Digital HQ
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5D5A54]">
                  Strategy × Design × Development
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
  <h1
    id="dhq-hero-heading"
    className="max-w-[14ch] font-editorial text-[clamp(2.75rem,4.6vw,4.75rem)] font-medium leading-[0.96] tracking-[-0.04em] text-[#101010]"
  >
    A{' '}
    <strong className="font-semibold">
      Website Development Agency
    </strong>{' '}
    built for{' '}
    <span className="relative inline-block text-[#3D5AFE]">
      business.
      <span
        aria-hidden
        className="absolute -bottom-2 left-0 h-[6px] w-full rounded-full bg-[#3D5AFE]"
      />
    </span>
  </h1>
</Reveal>

<Reveal delay={0.16}>
  <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5D5A54] sm:text-lg">
    We design and build distinctive websites that connect brand, content
    and technology—helping people understand, trust and act.
  </p>
</Reveal>

            <Reveal delay={0.16}>
  <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
    We provide{' '}
    <strong className="font-semibold">
      professional website design for businesses
    </strong>
    —from planning and user experience to development, launch and ongoing
    support.
  </p>
</Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CTAButton href="/book-strategy-call" style={{ background: '#3D5AFE' }} aria-label="Start your website project">
                  Start Your Website Project
                </CTAButton>
                <CTAButton href="#digital-work" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />} aria-label="Explore our website work">
                  See Digital Work
                </CTAButton>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wider text-[#5D5A54]">
                <span>UX</span><span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                <span>Web Design</span><span className="h-1.5 w-1.5 rounded-full bg-[#66DFC0]" />
                <span>Development</span><span className="h-1.5 w-1.5 rounded-full bg-[#FFC83D]" />
                <span>Performance</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.18}>
              <div className="relative mx-auto max-w-[650px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] border border-[rgba(16,16,16,0.14)] bg-[#101010] shadow-[0_28px_70px_-34px_rgba(16,16,16,0.55)]">
                  <Image
                    src="/work/highway-hub-showcase.webp"
                    alt="Highway Hub website experience designed by watNidea"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-20">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/75">Website design & development</p>
                    <p className="mt-1 font-editorial text-2xl font-semibold text-white">Highway Hub</p>
                  </div>
                </div>

                <span className="absolute -left-4 top-8 rotate-[-6deg] rounded-full bg-[#C8F542] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#101010] shadow-[0_3px_0_#101010]">
                  Real project
                </span>
                <span className="absolute -bottom-5 right-8 rotate-[3deg] rounded-full bg-[#FFC83D] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#101010] shadow-[0_3px_0_#101010]">
                  Strategy × Experience
                </span>
                <span aria-hidden className="wn-tape" style={{ left: '46%', top: '-14px', transform: 'rotate(-4deg)', background: 'rgba(102,223,192,0.9)' }} />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S2 — Common Website Problems (white, audit board)
 * ============================================================ */
const PROBLEMS = [
  { cat: 'Design', text: 'Your website looks outdated or inconsistent with your brand' },
  { cat: 'Usability', text: "Visitors can't find what they need within the first few seconds" },
  { cat: 'Mobile', text: "The site doesn't work well on phones or tablets" },
  { cat: 'Performance', text: 'Pages load slowly, and visitors leave before they see content' },
  { cat: 'Content', text: "The content doesn't clearly explain what you do or why it matters" },
  { cat: 'SEO', text: "The site isn't structured for search engines to find and understand" },
  { cat: 'Maintenance', text: 'Updates are difficult, and the site breaks when you try to change things' },
  { cat: 'Design', text: "There's no clear call-to-action guiding visitors to the next step" },
  { cat: 'Usability', text: 'The navigation is confusing or overly complex' },
  { cat: 'Performance', text: "You have no idea how the site is performing or where visitors drop off" },
]

export function DhqProblems() {
  return (
    <Section surface="bluemist" ariaLabelledBy="dhq-problems-heading">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01" accent="#3D5AFE">Is Your Website Holding You Back?</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="dhq-problems-heading" className="mt-4 max-w-[18ch]">
                Common website <Underline>problems</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-base text-[#555255]">
                Most website problems aren&apos;t about technology — they&apos;re about clarity, usability and performance. If any of these sound familiar, it may be time to rebuild.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-5">
              <p className="wn-caption text-[#555255]">Website Audit Board</p>
              <ul className="mt-3 space-y-2.5">
                {PROBLEMS.map((p, i) => (
                  <Reveal key={i} delay={0.16 + i * 0.04}>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full bg-[#3D5AFE] px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-white">{p.cat}</span>
                      <span className="text-sm leading-relaxed text-[#111111]">{p.text}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
            <Reveal delay={0.5}>
              <p className="mt-4 text-sm leading-relaxed text-[#555255]">
                A website should communicate value, build confidence and guide action. If it isn&apos;t doing all three, it&apos;s holding the business back.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S3 — What Is Website Development? (sand)
 * ============================================================ */
const FOCUS_POINTS = [
  'Clear and simple navigation', 'Mobile-friendly experiences', 'Reliable website performance', 'SEO-friendly structure',
  'Strong user experience', 'Consistent brand presentation', 'Secure and scalable development', 'Easy content management',
]
const ARCHITECTURE = ['Strategy', 'Content', 'UX', 'Design', 'Development', 'Performance', 'Maintenance']

export function DhqWhatIs() {
  return (
    <Section surface="sand" ariaLabelledBy="dhq-whatis-heading">
      <Container>
        <SectionLabel number="02" accent="#3D5AFE">What Is Website Development?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="dhq-whatis-heading" className="mt-4 max-w-[20ch]">
            How your website <Underline>works</Underline> — not just how it looks.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <p className="text-base leading-relaxed text-[#111111] opacity-85">
                Website development is the process of building and maintaining a website — from planning the structure and designing the user experience to writing the code, setting up the content management system and making sure the site is fast, secure and reliable.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-base leading-relaxed text-[#111111] opacity-85">
                A well-developed website doesn&apos;t just look good — it loads quickly, works on every device, is easy to manage, and supports your business goals across search, content and conversions.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.24}>
              <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
                <p className="wn-caption text-[#555255]">Website Architecture</p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {ARCHITECTURE.map((part, i) => (
                    <span key={part} className="inline-flex items-center gap-1.5">
                      <span className="inline-flex items-center rounded-full border border-[rgba(17,17,17,0.14)] bg-[#FFF7E9] px-2.5 py-1 text-xs font-medium text-[#111111]">{part}</span>
                      {i < ARCHITECTURE.length - 1 && <span className="text-[#3D5AFE]">→</span>}
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
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#3D5AFE' }} aria-hidden />
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
 * S4 — Complete Website Design & Development Services (paper, 3 groups)
 * ============================================================ */
const SERVICE_GROUPS = [
  { group: 'Plan & Design', items: [
    { n: '01', t: 'Custom Website Development', d: 'Websites built from the ground up to fit your brand, content and business goals — not a template.' },
    { n: '02', t: 'Website Design Services', d: 'Visual design, layout and user interface design that communicates your brand clearly.' },
    { n: '03', t: 'Responsive Web Design', d: 'Designs that adapt cleanly across desktop, tablet and mobile — tested at real breakpoints.' },
  ]},
  { group: 'Build & Launch', items: [
    { n: '04', t: 'UI/UX Design', d: 'User flows, wireframes and interface design that guide visitors from first impression to action.' },
    { n: '05', t: 'WordPress Website Development', d: 'WordPress builds for marketing sites, content publications and businesses that need an easy CMS.' },
    { n: '06', t: 'Website Development Services', d: 'Front-end and back-end development using modern, maintainable and accessible code.' },
    { n: '07', t: 'E-commerce Website Development', d: 'Online stores built to sell — product pages, checkout, payments and inventory integration.' },
  ]},
  { group: 'Improve & Support', items: [
    { n: '08', t: 'Website Redesign', d: 'Redesign and rebuild existing websites to improve design, performance and usability.' },
    { n: '09', t: 'Website Maintenance & Support', d: 'Ongoing updates, security, backups and technical support to keep the site running.' },
  ]},
]

export function DhqServices() {
  return (
    <Section surface="blue" ariaLabelledBy="dhq-services-heading">
      <Container>
        <SectionLabel number="02" accent="#3D5AFE">Complete Website Design &amp; Development Services</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="dhq-services-heading" className="mt-4 max-w-[20ch]">
            Nine services across <Underline>three stages</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#111111] opacity-85">
            From planning and design to build, launch and ongoing support — each service works on its own or as part of a complete website project.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {SERVICE_GROUPS.map((g, gi) => (
            <Reveal key={g.group} delay={0.24 + gi * 0.08}>
              <div className="flex h-full flex-col gap-3">
                <span className="inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white" style={{ background: '#3D5AFE' }}>{g.group}</span>
                {g.items.map((s) => (
                  <div key={s.n} className="flex flex-col gap-1 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-4">
                    <div className="flex items-center gap-2">
                      <span className="wn-bignum text-xl" style={{ color: '#3D5AFE' }}>{s.n}</span>
                      <h3 className="font-editorial text-sm font-semibold leading-tight">{s.t}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-[#555255]">{s.d}</p>
                    <Link href="/book-strategy-call" className="mt-1 inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#3D5AFE] hover:underline">
                      Discuss Your Requirement <ArrowRight className="h-3 w-3" aria-hidden />
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
 * Selected Digital Work — real project proof
 * ============================================================ */
export function DhqSelectedWork() {
  return (
    <Section
      surface="paper"
      id="digital-work"
      ariaLabelledBy="dhq-work-heading"
    >
      <Container>
        <SectionLabel number="03" accent="#3D5AFE">Selected Digital Work</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="dhq-work-heading" className="mt-4 max-w-[19ch]">
            Websites shaped around <Underline>real businesses</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[#5D5A54]">
            Two different businesses, two different challenges—and two digital systems designed around clarity, structure and a stronger experience.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal delay={0.22}>
            <article className="group h-full overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.12)] bg-white shadow-[0_18px_40px_-28px_rgba(16,16,16,0.35)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#101010]">
                <Image
                  src="/work/highway-hub-showcase.webp"
                  alt="Highway Hub website design showcase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#0C3048] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                  Digital experience
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-editorial text-2xl font-semibold text-[#101010]">Highway Hub</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5D5A54]">
                  A premium digital experience presenting India&apos;s organised highway retail ecosystem through clear storytelling and immersive visual design.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.3}>
            <article className="group h-full overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.12)] bg-white shadow-[0_18px_40px_-28px_rgba(16,16,16,0.35)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#101010]">
                <Image
                  src="/work/saransh-website-transformation.webp"
                  alt="Saransh Raj and Associates website before-and-after transformation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#8C1D35] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                  Website transformation
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-editorial text-2xl font-semibold text-[#101010]">Saransh Raj &amp; Associates</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5D5A54]">
                  A clearer hierarchy and a more distinctive editorial system designed to make complex legal expertise easier to understand.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S5 — Why Your Business Needs a Professional Website (ink, 6 outcomes)
 * ============================================================ */
const OUTCOMES = [
  { t: 'Build Customer Trust', d: 'A professional website signals credibility and reliability.' },
  { t: 'Make Information Easy to Find', d: 'Clear structure helps visitors find what they need quickly.' },
  { t: 'Generate More Enquiries', d: 'Strategic calls-to-action guide visitors toward contact.' },
  { t: 'Support Search Visibility', d: 'A well-built site helps search engines find and understand you.' },
  { t: 'Improve Mobile Experience', d: 'Responsive design works cleanly across every device.' },
  { t: 'Support Future Growth', d: 'A scalable foundation that grows with the business.' },
]

export function DhqWhyNeeded() {
  return (
    <Section surface="ink" ariaLabelledBy="dhq-whyneeded-heading">
      <Container>
        <SectionLabel number="04" accent="#3D5AFE">Why Your Business Needs a Professional Website</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="dhq-whyneeded-heading" className="mt-4 max-w-[20ch] text-white">
            From first impression to <Underline>action</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.t} delay={0.2 + i * 0.05}>
              <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-4">
                <span className="wn-bignum text-3xl" style={{ color: ['#3D5AFE', '#FFC83D', '#66DFC0', '#F13D32', '#7657F6', '#FF6B62'][i] }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-editorial text-base font-semibold text-white">{o.t}</h3>
                <p className="text-xs leading-relaxed text-[rgba(255,255,255,0.72)]">{o.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S6 — Website Development for Small Businesses (sand)
 * ============================================================ */
const SMB_BENEFITS = [
  'Affordable scope that fits where you are now',
  'A website that grows with the business',
  'Easy-to-manage content without technical skills',
  'Mobile-friendly design that works on every phone',
  'Clear messaging that explains what you do',
  'Search-friendly structure for local discovery',
  'Fast loading that keeps visitors engaged',
  'Professional design that builds trust quickly',
]

export function DhqSmallBusiness() {
  return (
    <Section surface="bluemist" ariaLabelledBy="dhq-smb-heading">
      <Container>
        <SectionLabel number="05" accent="#3D5AFE">Website Development for Small Businesses</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="dhq-smb-heading" className="mt-4 max-w-[20ch]">
            Built for where you are <Underline>now</Underline> — and where you&apos;re going.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal delay={0.16}>
              <p className="text-base leading-relaxed text-[#111111] opacity-85">
                A small business website shouldn&apos;t be a stripped-down version of a bigger site. It should be a focused, practical tool that communicates clearly, loads fast and is easy to manage — with room to grow as the business grows.
              </p>
            </Reveal>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SMB_BENEFITS.map((b, i) => (
                <Reveal key={i} delay={0.24 + i * 0.04}>
                  <div className="flex items-center gap-2 rounded-[12px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3D5AFE] font-editorial text-[0.6rem] font-bold text-white">{i + 1}</span>
                    <span className="text-xs font-medium text-[#111111]">{b}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.5}>
              <div className="mt-6">
                <CTAButton href="/book-strategy-call" style={{ background: '#3D5AFE' }}>Discuss Your Website</CTAButton>
              </div>
            </Reveal>
          </div>
          {/* Modular blocks visual */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="rounded-[18px] border border-[rgba(17,17,17,0.12)] bg-[#FFFFFF] p-5">
                <p className="wn-caption text-[#555255]">Modular Website Blocks</p>
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 rounded-lg border border-[rgba(61,90,254,0.3)] bg-[rgba(61,90,254,0.08)] p-2"><span className="h-4 w-4 rounded bg-[#3D5AFE]" aria-hidden /><span className="text-xs font-medium">Core pages</span></div>
                  <div className="flex items-center gap-2 rounded-lg border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-2"><span className="h-4 w-4 rounded bg-[#FFC83D]" aria-hidden /><span className="text-xs font-medium">Blog / content</span></div>
                  <div className="flex items-center gap-2 rounded-lg border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-2"><span className="h-4 w-4 rounded bg-[#66DFC0]" aria-hidden /><span className="text-xs font-medium">E-commerce</span></div>
                  <div className="flex items-center gap-2 rounded-lg border border-dashed border-[rgba(17,17,17,0.18)] bg-transparent p-2"><span className="h-4 w-4 rounded border-2 border-[rgba(17,17,17,0.20)]" aria-hidden /><span className="text-xs text-[#555255]">Add as you grow</span></div>
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
 * S7 — What Makes a Website Truly Effective? (paper, 5 principles)
 * ============================================================ */
const EFFECTIVE = [
  { t: 'Clear Brand Message', d: 'Visitors understand what you do within seconds.' },
  { t: 'Simple User Journey', d: 'Navigation guides visitors to the right information.' },
  { t: 'Mobile-Friendly Experience', d: 'The site works cleanly on every device.' },
  { t: 'Strong Visual Presentation', d: 'Design that builds trust and communicates quality.' },
  { t: 'Meaningful Calls to Action', d: 'Every page guides the visitor toward the next step.' },
]

export function DhqEffective() {
  return (
    <Section surface="blue" ariaLabelledBy="dhq-effective-heading">
      <Container>
        <SectionLabel number="06" accent="#3D5AFE">What Makes a Website Truly Effective?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="dhq-effective-heading" className="mt-4 max-w-[20ch]">
            Five things that make a <Underline>difference</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-2">
          {EFFECTIVE.map((e, i) => (
            <Reveal key={e.t} delay={0.16 + i * 0.06}>
              <div className="flex min-h-[80px] flex-col gap-1 rounded-[14px] border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-3" style={{ minWidth: '180px' }}>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3D5AFE] font-editorial text-[0.6rem] font-bold text-white">{i + 1}</span>
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
 * S8 — Website Development Process (white, 6-step timeline)
 * ============================================================ */
const PROCESS = [
  { n: '1', t: 'Discovery & Research', d: 'We learn your business, audience, market and goals.' },
  { n: '2', t: 'Strategy & Planning', d: 'Site structure, content plan and technical approach defined.' },
  { n: '3', t: 'UI/UX Design', d: 'Wireframes, visual design and user flows created and refined.' },
  { n: '4', t: 'Development', d: 'Front-end and back-end built with modern, maintainable code.' },
  { n: '5', t: 'Testing & Optimization', d: 'Cross-device, performance and accessibility testing.' },
  { n: '6', t: 'Launch & Support', d: 'Site goes live with ongoing maintenance and support.' },
]

export function DhqProcess() {
  return (
    <Section surface="white" ariaLabelledBy="dhq-process-heading">
      <Container>
        <SectionLabel number="04" accent="#3D5AFE">Website Development Process</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="dhq-process-heading" className="mt-4 max-w-[18ch]">
            Six steps from brief to <Underline>live</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PROCESS.map((s, i) => (
            <Reveal key={s.n} delay={0.2 + i * 0.05}>
              <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(17,17,17,0.12)] bg-[#FFF7E9] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3D5AFE] font-editorial text-xs font-bold text-white">{s.n}</span>
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
 * S9 — Why Businesses Choose watNidea (sand, 1 featured + 5)
 * ============================================================ */
const REASONS = [
  { t: 'Strategy Before Development', d: "We don't start building until we understand the business. Strategy shapes every technical choice.", featured: true },
  { t: 'Design With a Purpose', d: 'Design that serves the user, not just the aesthetic.' },
  { t: 'Technology That Fits Your Business', d: 'The right tools for the job — not the trendiest stack.' },
  { t: 'SEO-Friendly Foundation', d: 'Clean structure, semantic HTML and fast loading built in.' },
  { t: 'Built for Growth', d: 'Sites that scale — add pages, features and content as you grow.' },
  { t: 'Clear Communication', d: 'We explain the technical side in language you can use.' },
]

export function DhqWhyChoose() {
  return (
    <Section surface="bluemist" ariaLabelledBy="dhq-why-heading">
      <Container>
        <SectionLabel number="05" accent="#3D5AFE">Why Businesses Choose watNidea</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="dhq-why-heading" className="mt-4 max-w-[20ch]">
            Six reasons brands <Underline>choose</Underline> the studio.
          </EditorialHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal delay={0.16}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] p-6 text-white" style={{ background: '#3D5AFE' }}>
              <span aria-hidden className="wn-halftone-light absolute inset-0 rounded-[22px] opacity-25" />
              <div className="relative">
                <h3 className="font-editorial text-xl font-semibold leading-tight">{REASONS[0].t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgba(255,255,255,0.88)]">{REASONS[0].d}</p>
              </div>
              <div className="relative mt-4"><IdeaStamp label="Digital" size={72} color="#FFFFFF" /></div>
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
 * S10 — Website Solutions for Different Business Needs (paper)
 * ============================================================ */
const AUDIENCES = ['Startups', 'Small Businesses', 'Service Companies', 'E-commerce Brands', 'Professional Businesses', 'Growing Companies']

export function DhqAudiences() {
  return (
    <Section surface="blue" ariaLabelledBy="dhq-audiences-heading">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <SectionLabel number="09" accent="#3D5AFE">Website Solutions for Different Business Needs</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="dhq-audiences-heading" className="mt-3 max-w-[20ch] text-2xl sm:text-3xl">
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
 * S11 — Website Solutions We Can Tailor (white, compact index)
 * ============================================================ */
const INDUSTRIES = ['Healthcare', 'Education', 'E-commerce & Retail', 'Real Estate', 'Professional Services', 'Technology']

export function DhqIndustries() {
  return (
    <Section surface="white" ariaLabelledBy="dhq-industries-heading">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <SectionLabel number="10" accent="#3D5AFE">Website Solutions We Can Tailor</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="dhq-industries-heading" className="mt-3 max-w-[20ch] text-2xl sm:text-3xl">
                Industries we can tailor for.
              </EditorialHeading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((ind) => (
                <span key={ind} className="inline-flex items-center rounded-full border border-[rgba(17,17,17,0.18)] bg-[#FFF7E9] px-4 py-2 text-sm font-medium text-[#111111]">{ind}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S12 — Websites That Support Real Business Goals (sand)
 * ============================================================ */
const GOALS = ['Better User Experience', 'Stronger Performance', 'Better Mobile Accessibility', 'More Conversion Opportunities', 'Long-Term Flexibility']

export function DhqGoals() {
  return (
    <Section surface="bluemist" ariaLabelledBy="dhq-goals-heading">
      <Container>
        <SectionLabel number="11" accent="#3D5AFE">Websites That Support Real Business Goals</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="dhq-goals-heading" className="mt-4 max-w-[20ch]">
            Five outcomes the work is <Underline>built for</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-xl text-base text-[#555255]">
            A website built with purpose supports the business across user experience, performance, accessibility and growth — without making promises it can&apos;t keep.
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-3">
          {GOALS.map((g, i) => (
            <Reveal key={g} delay={0.24 + i * 0.05}>
              <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: '#3D5AFE' }}>
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
 * S13 — FAQ (paper, accessible accordion)
 * ============================================================ */
export function DhqFaq() {
  return (
    <Section surface="paper" ariaLabelledBy="dhq-faq-heading">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel number="06" accent="#3D5AFE">Frequently Asked Questions</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="dhq-faq-heading" className="mt-4">
                Questions, <Underline>honestly</Underline> answered.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-3 max-w-sm text-sm text-[#555255]">If yours isn&apos;t here, write to us. We&apos;ll answer honestly.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={FAQS} accent="#3D5AFE" />
          </div>
        </div>
      </Container>
    </Section>
  )
}
