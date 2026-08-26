import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import {
  PageHero, Section, Container, SectionLabel, EditorialHeading,
  Reveal, CTAButton, Sticker, Underline, IdeaStamp, EndingCTA,
} from '@/components/site/primitives'
import { site } from '@/lib/siteContent'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

/* Helpers */
function isLightHex(hex: string): boolean {
  const c = hex.replace('#', ''); if (c.length !== 6) return false
  const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
}

/* ============================================================
 * S1 — About hero (paper) with Purpose / Direction specimen
 * ============================================================ */
function AboutHero() {
  return (
    <PageHero
      surface="violet"
      eyebrow="About watNidea"
      title={
        <>
          Identity With <span style={{ color: '#FFC83D' }}><Underline>Purpose</Underline></span>. Creativity With <span style={{ color: '#FFC83D' }}>Direction</span>
        </>
      }
      subtitle="watNidea is a branding and creative agency built around a simple idea: brands that mean something outlast brands that just look good. We combine strategy, design, content and performance to build brands people recognize, understand and remember."
      accent="#FFC83D"
    >
      {/* Purpose / Direction identity specimen — desktop only */}
      <div className="hidden lg:block">
        <div className="relative overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.16)] bg-[#FFFDF8] p-5 shadow-[0_10px_30px_-18px_rgba(16,16,16,0.25)]" style={{ maxWidth: '320px' }}>
          <div className="absolute -right-3 -top-3 z-10"><IdeaStamp label="Purpose" size={84} color="#F13D32" /></div>
          <p className="wn-caption text-[#5D5A54]">Identity Specimen</p>
          <p className="mt-1 font-editorial text-2xl font-bold leading-none tracking-tight text-[#101010]">wat<span style={{ color: '#F13D32' }}>N</span>idea</p>
          <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-[#5D5A54]">Branding &amp; Creative Agency</p>
          <div className="my-4 h-px bg-[rgba(16,16,16,0.12)]" />
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-[rgba(16,16,16,0.10)] bg-[#F7F2E8] p-3">
              <span className="font-editorial text-lg font-bold text-[#F13D32]">Purpose</span>
              <p className="mt-1 text-[0.6rem] text-[#5D5A54]">Why the brand exists</p>
            </div>
            <div className="rounded-lg border border-[rgba(16,16,16,0.10)] bg-[#F7F2E8] p-3">
              <span className="font-editorial text-lg font-bold text-[#3D5AFE]">Direction</span>
              <p className="mt-1 text-[0.6rem] text-[#5D5A54]">Where it&apos;s going</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['Strategy', 'Identity', 'Digital', 'Content', 'Growth'].map((label) => (
              <span key={label} className="inline-flex items-center rounded-full border border-[rgba(16,16,16,0.14)] bg-[#FFFDF8] px-2 py-0.5 text-[0.55rem] font-medium text-[#101010]">{label}</span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[rgba(16,16,16,0.10)] pt-2">
            <span className="font-editorial text-[0.65rem] italic text-[#5D5A54]">Identity with Soul. Strategy with Teeth.</span>
          </div>
        </div>
      </div>

      {/* Additional intro paragraphs */}
      <div className="mt-5 max-w-2xl space-y-4">
        <p className="text-base leading-relaxed text-[#101010] opacity-85">
          We work with founders, teams and businesses who want more than a logo — they want a brand system that works across identity, websites, content, campaigns and growth. Every project starts with understanding the business and ends with creative work that performs.
        </p>
        <p className="text-base leading-relaxed text-[#101010] opacity-85">
          From first idea to final execution, our process is built to keep strategy and creativity connected — so every design choice has a reason, and every campaign has a direction.
        </p>
      </div>

      <div className="mt-7">
        <CTAButton href="/work" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />} aria-label="Explore our work">Explore Our Work</CTAButton>
      </div>
    </PageHero>
  )
}

/* ============================================================
 * S2 — We Build Brands With Meaning (white)
 * ============================================================ */
function AboutMeaning() {
  return (
    <Section surface="white" ariaLabelledBy="about-meaning-heading">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="01" accent="#F13D32">We Build Brands With Meaning</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="about-meaning-heading" className="mt-4 max-w-[16ch]">
                A brand is how people <Underline>recognize</Underline>, understand and remember a business.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6">
                <CTAButton href="#how-we-think" variant="secondary" icon={<ArrowRight className="h-4 w-4" />} aria-label="Discover our approach">Discover Our Approach</CTAButton>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.12}>
              <p className="text-base leading-relaxed text-[#101010] opacity-85 sm:text-lg">
                A brand isn&apos;t just a logo or a colour palette. It&apos;s the full experience people have with your business — what they see, read, feel and remember. A strong brand makes that experience intentional, consistent and recognizable across every touchpoint.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-base leading-relaxed text-[#101010] opacity-85">
                At watNidea, we build brands with meaning by connecting strategy, design, content and growth. We start with what your business stands for, who it serves, and what makes it different — then turn that into identity, websites, campaigns and content that work together.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-4 text-base leading-relaxed text-[#101010] opacity-85">
                The result is a brand that doesn&apos;t just look good — it communicates clearly, builds recognition over time, and supports your business goals at every stage.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S3 — What We Do (sand, asymmetric capability grid)
 * ============================================================ */
const CAPABILITIES = [
  { n: '01', t: 'Brand Identity', d: 'Brand strategy, naming, visual identity, voice and guidelines — built so your brand stays recognizable across every surface.', href: '/aura-architecture', accent: '#F13D32' },
  { n: '02', t: 'Creative Design', d: 'Visual design, art direction, campaign concepts and creative systems that bring the brand to life across formats.', href: '/work', accent: '#FFC83D' },
  { n: '03', t: 'Website & Digital', d: 'Design systems, marketing sites and product interfaces — fast, accessible, conversion-focused and maintainable.', href: '/the-digital-hq', accent: '#3D5AFE' },
  { n: '04', t: 'Video Production', d: 'Concept, direction, edit and motion — frame-based storytelling for brand films, ads and content series.', href: '/kinetic-studio', accent: '#F97316' },
  { n: '05', t: 'Social Media', d: 'Social strategy, content engines and community building designed around how culture actually moves.', href: '/the-hype-engine', accent: '#157468' },
  { n: '06', t: 'Advertising & Search', d: 'Paid media, funnels, SEO, AEO and content networks — connected growth systems you can measure and scale.', href: null, accent: '#66DFC0', subLinks: [{ label: 'Performance Marketing', href: '/growth-alchemy' }, { label: 'Search, SEO & AEO', href: '/the-echo-system' }] },
]

function AboutWhatWeDo() {
  return (
    <Section surface="blue" ariaLabelledBy="about-whatwedo-heading">
      <Container>
        <SectionLabel number="02" accent="#FFC83D">What We Do</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="about-whatwedo-heading" className="mt-4 max-w-[20ch] text-white">
            Six capabilities. One <Underline>connected</Underline> brand system.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-white opacity-90">
            From brand identity to growth, every capability is built to work on its own or as part of one connected system. Explore the one that fits where you are now.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => {
            const isLight = isLightHex(c.accent)
            const cardContent = (
              <>
                <span aria-hidden className={isLight ? 'wn-halftone absolute inset-0 rounded-[16px] opacity-25' : 'wn-halftone-light absolute inset-0 rounded-[16px] opacity-25'} />
                <div className="relative flex items-start justify-between">
                  <span className="wn-bignum text-2xl opacity-90">{c.n}</span>
                  {c.href && <ArrowUpRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                </div>
                <div className="relative">
                  <h3 className="font-editorial text-base font-semibold leading-tight">{c.t}</h3>
                  <p className="mt-1 text-xs leading-relaxed opacity-80">{c.d}</p>
                  {c.subLinks ? (
                    <div className="mt-3 flex flex-col gap-1.5">
                      {c.subLinks.map((sl) => (
                        <Link key={sl.href} href={sl.href} className="inline-flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-wider hover:underline" style={{ color: isLight ? '#101010' : '#FFFFFF' }}>
                          {sl.label} <ArrowRight className="h-3 w-3" aria-hidden />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <span className="mt-3 inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider">
                      Explore Capability <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  )}
                </div>
              </>
            )
            return (
              <Reveal key={c.n} delay={0.24 + i * 0.05}>
                {c.href ? (
                  <Link href={c.href} className="group relative flex h-full min-h-[160px] flex-col justify-between overflow-hidden rounded-[16px] border border-[rgba(16,16,16,0.12)] p-4 transition-transform duration-300 hover:-translate-y-1" style={{ background: c.accent, color: isLight ? '#101010' : '#FFFFFF' }} aria-label={`${c.t} — explore capability`}>
                    {cardContent}
                  </Link>
                ) : (
                  <div className="group relative flex h-full min-h-[160px] flex-col justify-between overflow-hidden rounded-[16px] border border-[rgba(16,16,16,0.12)] p-4" style={{ background: c.accent, color: isLight ? '#101010' : '#FFFFFF' }}>
                    {cardContent}
                  </div>
                )}
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S4 — How We Think (ink, the ONE dark section)
 * ============================================================ */
const PRINCIPLES = [
  { n: '01', t: 'Strategy Before Execution', d: "We don't start designing until we understand the business, the audience and the goal. Strategy shapes every creative choice — so the work has a reason before it has a look." },
  { n: '02', t: 'Creativity With Purpose', d: "Creativity isn't decoration. It's how we solve problems, communicate ideas and make brands memorable. Every visual choice serves a strategic intent." },
  { n: '03', t: 'One Connected Brand', d: "Brand, website, content and campaigns shouldn't feel like separate projects. We build them as one connected system — same voice, same identity, same direction." },
  { n: '04', t: 'People First', d: 'We design for the people who use your brand — customers, teams and partners. Clarity, accessibility and honesty come before cleverness or trends.' },
]

function AboutHowWeThink() {
  return (
    <Section surface="ink" id="how-we-think" ariaLabelledBy="about-howwethink-heading">
      <Container>
        <SectionLabel number="03" accent="#FFC83D">How We Think</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="about-howwethink-heading" className="mt-4 max-w-[18ch] text-white">
            Four principles that <Underline>guide</Underline> the work.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-base text-[rgba(255,255,255,0.72)]">
            These aren&apos;t slogans. They&apos;re the decisions we make every day — about what to design, how to build, and what to say no to.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={0.24 + i * 0.08}>
              <div className="relative pl-8 sm:pl-12">
                <span className="wn-bignum absolute left-0 top-0 text-4xl sm:text-5xl" style={{ color: ['#F13D32', '#FFC83D', '#66DFC0', '#7657F6'][i] }} aria-hidden>{p.n}</span>
                <h3 className="font-editorial text-xl font-semibold leading-tight text-white sm:text-2xl">{p.t}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-[rgba(255,255,255,0.78)]">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S5 — Why Businesses Choose watNidea (paper)
 * ============================================================ */
const REASONS = [
  { t: 'Business Understanding', d: "We start with your business, market and goals — not a moodboard. Every creative choice is grounded in what you're trying to achieve.", featured: true },
  { t: 'Creative Thinking', d: 'Original ideas, not templates. We bring fresh perspectives to every project.' },
  { t: 'Multiple Capabilities', d: 'Brand, digital, content, film, ads and search — under one roof, working together.' },
  { t: 'Attention to Detail', d: 'Type, spacing, timing, tone. The small choices make a brand feel considered.' },
  { t: 'Flexible Collaboration', d: 'We adapt to how you work — project-based, retainer, or embedded with your team.' },
]

function AboutWhyChoose() {
  return (
    <Section surface="lime" ariaLabelledBy="about-why-heading">
      <Container>
        <SectionLabel number="04" accent="#F13D32">Why Businesses Choose watNidea</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="about-why-heading" className="mt-4 max-w-[20ch]">
            Five reasons brands <Underline>choose</Underline> the studio.
          </EditorialHeading>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal delay={0.16}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] bg-[#F13D32] p-6 text-white">
              <span aria-hidden className="wn-halftone-light absolute inset-0 rounded-[22px] opacity-25" />
              <div className="relative">
                <h3 className="font-editorial text-2xl font-semibold leading-tight">{REASONS[0].t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[rgba(255,255,255,0.88)]">{REASONS[0].d}</p>
              </div>
              <div className="relative mt-6"><IdeaStamp label="What an idea" size={80} color="#FFFFFF" /></div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            {REASONS.slice(1).map((r, i) => (
              <Reveal key={r.t} delay={0.24 + i * 0.06}>
                <div className="flex h-full flex-col gap-2 rounded-[18px] border border-[rgba(16,16,16,0.12)] bg-[#FFFDF8] p-5">
                  <h3 className="font-editorial text-lg font-semibold leading-tight">{r.t}</h3>
                  <p className="text-sm leading-relaxed text-[#5D5A54]">{r.d}</p>
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
 * S6 — "Our Work in Numbers" — HIDDEN (numbers not verified)
 * ============================================================ */

/* ============================================================
 * S7 — Final CTA (red)
 * ============================================================ */

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About watNidea',
  url: 'https://watnidea.com/about',
  mainEntity: {
    '@type': 'ProfessionalService',
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    description: site.longDescription,
    slogan: site.tagline,
    areaServed: 'Worldwide',
  },
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFF7E9] text-[#111111]">
      <SiteHeader tone="light" />
      <main className="flex-1">
        <AboutHero />
        <AboutMeaning />
        <AboutWhatWeDo />
        <AboutHowWeThink />
        <AboutWhyChoose />
        <EndingCTA
          surface="red"
          eyebrow="Let's build something memorable"
          title="Let's Create Something People Remember"
          body="Tell us about your brand, your goals and where you want to go. We bring the strategy, creativity and craft to get you there — together. From first idea to final execution, every step is built with purpose and direction."
          primaryHref="/book-strategy-call"
          primaryLabel="Start Your Project"
          secondaryHref="/book-strategy-call"
          secondaryLabel="Talk to Our Team"
        />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
    </div>
  )
}
