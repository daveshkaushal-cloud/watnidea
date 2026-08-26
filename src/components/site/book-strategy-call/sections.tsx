'use client'

/**
 * Book Strategy Call — Contact / Start-a-Project page sections.
 *
 * 8 visible sections + Final CTA. Custom implementation.
 *
 * Palette: cream paper base, red (#F13D32) primary accent, controlled
 * service colours (yellow/teal/blue/violet/lime/orange) as details,
 * ink (#101010) for the ONE dark section.
 *
 * Honesty rules:
 *   - NO invented email, phone, address, office, availability or response time.
 *   - Only verified contact info shown (hello@watnidea.com confirmed).
 *   - Phone + Location hidden (not verified).
 *   - NO "free", "guaranteed" or specific-time call claims.
 *   - Success shown only after confirmed DB delivery.
 */

import Link from 'next/link'
import { ArrowUpRight, ArrowRight, Mail } from 'lucide-react'
import {
  Section, Container, SectionLabel, EditorialHeading, Reveal,
  CTAButton, Sticker, Underline, IdeaStamp, FAQAccordion,
} from '@/components/site/primitives'
import { BOOK_FAQS as FAQS } from '@/lib/book-faq-data'
import { site } from '@/lib/siteContent'

const RED = '#F13D32'
const INK = '#101010'

/* ============================================================
 * S1 — Hero (paper) with project-brief visual
 * H1: "Let's Create Something That Moves Your Brand Forward"
 * ============================================================ */
const BRIEF_LAYERS = [
  { n: '01', t: 'Idea', color: '#FFC83D' },
  { n: '02', t: 'Strategy', color: '#157468' },
  { n: '03', t: 'Identity', color: '#F13D32' },
  { n: '04', t: 'Digital', color: '#3D5AFE' },
  { n: '05', t: 'Content', color: '#C8F542' },
  { n: '06', t: 'Campaign', color: '#7657F6' },
  { n: '07', t: 'Launch', color: '#FF6B62' },
]

export function BookHero() {
  return (
    <Section surface="yellow" className="relative overflow-hidden !pt-[calc(72px+2.75rem)] pb-10 sm:!pt-[calc(72px+3.25rem)] sm:pb-12 lg:!pb-10" ariaLabelledBy="book-hero-heading">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-[240px] w-[240px] rounded-full opacity-15 blur-[100px]" style={{ background: RED }} />
        <div className="absolute right-10 top-32 h-[120px] w-[120px] rounded-full opacity-20 blur-[80px]" style={{ background: '#FFC83D' }} />
      </div>
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal><p className="wn-caption mb-3" style={{ color: RED }}>Start a Project · Contact</p></Reveal>
            <Reveal delay={0.08}>
              <h1 id="book-hero-heading" className="max-w-[18ch] font-editorial text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em]">
                Let&apos;s Create Something That Moves Your Brand <Underline>Forward</Underline>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#101010] opacity-85 sm:text-lg">
                Every great project starts with a conversation. Whether you are building a brand from scratch, redesigning your website, launching a campaign, or trying to reach more of the right people — we would like to hear about it.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#101010] opacity-85">
                Tell us what you are working on. We will review the details and continue the conversation from there — no pressure, no obligation, just an honest look at whether we can help.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#project-enquiry" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F13D32] px-6 py-3 text-sm font-semibold text-white shadow-[0_3px_0_rgba(16,16,16,0.20)] transition-transform hover:-translate-y-0.5">
                  Start Your Project <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </Reveal>
          </div>
          {/* Project-brief visual */}
          <div className="hidden lg:col-span-5 lg:block">
            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.16)] bg-[#FFFDF8] p-5 shadow-[0_10px_30px_-18px_rgba(16,16,16,0.25)]">
                <div className="absolute -right-3 -top-3 z-10"><IdeaStamp label="Brief" size={84} color={RED} /></div>
                <p className="wn-caption text-[#5D5A54]">Project Brief</p>
                {/* Layered brief sheets */}
                <div className="mt-3 flex flex-col gap-1.5">
                  {BRIEF_LAYERS.map((l) => (
                    <div key={l.n} className="relative flex items-center gap-2.5 rounded-lg border border-[rgba(16,16,16,0.10)] bg-[#F7F2E8] px-2.5 py-1.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-editorial text-[0.55rem] font-bold text-white" style={{ background: l.color }}>{l.n}</span>
                      <span className="text-[0.7rem] font-medium text-[#101010]">{l.t}</span>
                      <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: l.color }} aria-hidden />
                    </div>
                  ))}
                </div>
                {/* Handwritten annotation */}
                <p className="mt-3 font-editorial text-xs italic text-[#5D5A54]">“Start with what you know — we’ll shape the rest together.”</p>
                <p className="mt-1 text-[0.55rem] text-center uppercase tracking-wider text-[#5D5A54]">Original visual — illustrative</p>
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
 * S4 — What We Can Help You Create (sand, asymmetric service grid)
 * 6 areas + secondary AI Advertising link.
 * ============================================================ */
const SERVICE_AREAS = [
  { t: 'Build a Stronger Brand', d: 'Brand identity, strategy and visual systems that make your business recognisable.', href: '/aura-architecture', accent: '#F13D32' },
  { t: 'Create a Digital Experience', d: 'Websites and product interfaces designed to perform — fast, accessible and conversion-focused.', href: '/the-digital-hq', accent: '#3D5AFE', featured: true },
  { t: 'Tell Your Story', d: 'Film, motion and edit-led storytelling for brand films, ads and content series.', href: '/kinetic-studio', accent: '#F97316' },
  { t: 'Connect With Your Audience', d: 'Social strategy, content engines and community building around how culture moves.', href: '/the-hype-engine', accent: '#C8F542' },
  { t: 'Improve Your Online Visibility', d: 'AEO and SEO services so your brand is discoverable where audiences search.', href: '/the-echo-system', accent: '#FFC83D' },
  { t: 'Run Smarter Campaigns', d: 'Performance marketing across Google and Meta — measurement-led, not guesswork.', href: '/growth-alchemy', accent: '#66DFC0' },
]

export function BookServiceAreas() {
  return (
    <Section surface="mint" ariaLabelledBy="book-services-heading" className="py-10 lg:!py-10">
      <Container>
        <SectionLabel number="02" accent={RED}>What We Can Help You Create</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="book-services-heading" className="mt-4 max-w-[20ch]">
            Six ways we can <Underline>help</Underline>.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_AREAS.map((s, i) => (
            <Reveal key={s.t} delay={0.16 + i * 0.05}>
              <Link
                href={s.href}
                className="group flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(16,16,16,0.12)] bg-[#FFFDF8] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(16,16,16,0.20)] hover:shadow-[0_8px_24px_-14px_rgba(16,16,16,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.accent }} aria-hidden />
                  <h3 className="font-editorial text-sm font-semibold leading-tight">{s.t}</h3>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-[#5D5A54] transition-colors group-hover:text-[#101010]" aria-hidden />
                </div>
                <p className="text-xs leading-relaxed text-[#5D5A54]">{s.d}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <div className="mt-4 flex items-center gap-2 rounded-[14px] border border-dashed border-[rgba(16,16,16,0.20)] bg-[#FFFDF8] p-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: '#7657F6' }} aria-hidden />
            <p className="text-sm text-[#5D5A54]">
              Exploring AI-assisted advertising?{' '}
              <Link href="/synthetic-cinema" className="font-semibold underline-offset-2 hover:underline" style={{ color: '#7657F6' }}>
                Explore Synthetic Cinema
              </Link>
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S5 — Why Start With a Conversation? (ink — the ONE dark section, conversation flow)
 * 4 principles as a conversation flow.
 * ============================================================ */
const PRINCIPLES = [
  { n: '01', t: 'We Listen First', d: 'Before we suggest anything, we listen to what you are trying to achieve and where it is getting stuck.' },
  { n: '02', t: 'We Find the Right Approach', d: 'Not every project needs the same solution. We figure out what fits your goals, budget and stage.' },
  { n: '03', t: 'We Keep Things Clear', d: 'No jargon, no hidden steps. You will always know what we are doing and why.' },
  { n: '04', t: 'We Build With Purpose', d: 'Every decision connects back to your business goals — not to what is easy for us.' },
]

export function BookWhyConversation() {
  return (
    <Section surface="ink" ariaLabelledBy="book-conversation-heading" className="py-10 lg:!py-10">
      <Container>
        <SectionLabel number="03" accent="#FFC83D">Why Start With a Conversation?</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading as="h2" id="book-conversation-heading" className="mt-4 max-w-[20ch] text-white">
            A conversation, <Underline>not</Underline> a pitch.
          </EditorialHeading>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={0.16 + i * 0.06}>
              <div className="relative flex h-full flex-col gap-2 rounded-[16px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full font-editorial text-xs font-bold text-[#101010]" style={{ background: '#FFC83D' }}>{p.n}</span>
                  {i < 3 && <span aria-hidden className="hidden h-px flex-1 bg-[rgba(255,255,255,0.2)] sm:block" />}
                </div>
                <h3 className="font-editorial text-sm font-semibold text-white">{p.t}</h3>
                <p className="text-xs leading-relaxed text-[rgba(255,255,255,0.72)]">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ============================================================
 * S6 — Direct Contact Information (paper, email-only card)
 * Only verified info: hello@watnidea.com. Phone + Location hidden.
 * ============================================================ */
export function BookDirectContact() {
  return (
    <Section surface="violet" ariaLabelledBy="book-contact-heading" className="py-10 lg:!py-10">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel number="04" accent="#FFC83D">Direct Contact</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="book-contact-heading" className="mt-4 max-w-[18ch] text-white">
                Let&apos;s Talk About Your <Underline>Next</Underline> Idea
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-md text-base text-white opacity-90">
                Prefer email? Reach out directly and we will continue the conversation. We review every enquiry personally — no automated replies, no call centres.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-[22px] border border-[rgba(255,255,255,0.16)] bg-[#FFFFFF] p-6 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.25)]">
                <div className="absolute right-4 top-4"><Sticker accent="#F13D32" textColor="#FFFFFF" tilt="right">Reach us</Sticker></div>
                <p className="wn-caption text-[#555255]">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 inline-flex items-center gap-3 font-editorial text-xl font-semibold text-[#111111] underline-offset-4 hover:underline sm:text-2xl"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F13D32] text-white" aria-hidden>
                    <Mail className="h-4 w-4" />
                  </span>
                  {site.email}
                </a>
                <p className="mt-4 text-sm leading-relaxed text-[#555255]">
                  Write to us about your project, your goals and your timeline. We will reply personally and continue from there.
                </p>
                <div className="mt-5">
                  <a href="#project-enquiry" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                    Get in Touch <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
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
 * S7 — Frequently Asked Questions (sand, accessible accordion)
 * 6 Q&As.
 * ============================================================ */
export function BookFaq() {
  return (
    <Section surface="paper" ariaLabelledBy="book-faq-heading" className="py-10 lg:!py-10">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel number="05" accent={RED}>Frequently Asked Questions</SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="book-faq-heading" className="mt-4">
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
 * H2: "Have an Idea? Let's Make It Real."
 * ============================================================ */
export function BookFinalCta() {
  return (
    <Section surface="red" ariaLabelledBy="book-final-heading" className="relative overflow-hidden py-12 lg:!py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-0 h-[240px] w-[240px] rounded-full opacity-20 blur-[100px]" style={{ background: INK }} />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="wn-caption mx-auto mb-4 text-[rgba(255,255,255,0.8)]">Start a Project</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="book-final-heading" className="font-editorial text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-white">
              Have an Idea? Let&apos;s Make It Real.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-base text-[rgba(255,255,255,0.88)] sm:text-lg">
              Share what you are building. We will review the details and continue the conversation — no pressure, no obligation.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mx-auto mt-3 max-w-xl text-base text-[rgba(255,255,255,0.88)]">
              The enquiry form takes about two minutes. That is all we need to start.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#project-enquiry" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#101010] px-7 py-3 text-sm font-semibold text-white shadow-[0_3px_0_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5">
                Start Your Project <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={`mailto:${site.email}`}
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
