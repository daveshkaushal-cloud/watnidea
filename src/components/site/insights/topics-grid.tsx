'use client'

/* ------------------------------------------------------------------ *
 * InsightsTopicsGrid — Section 2 of /insights
 *
 * "What we'll write about" — a Gen-Z zine grid of 8 colour-coded
 * topic cards on a sand surface.
 *
 *   - 8 topics, each a different accent colour (red, blue, yellow,
 *     lime, violet, teal, mint, coral).
 *   - Magazine issue-number styling: "ESSAY 01", "ESSAY 02", etc.
 *   - Honest: NO fake authors, NO fake read counts, NO fake dates.
 *     Each card is a static frame describing a topic the studio plans
 *     to explore — not a published article. When real verified
 *     articles exist in the future, they will live at /insights/[slug]
 *     and be linked from a real article grid.
 *
 * The 8 topics span the studio's seven services plus one editorial
 * thread on craft — they describe what we plan to explore, not what
 * we have published.
 * ------------------------------------------------------------------ */

import {
  BrainCircuit,
  Globe,
  Megaphone,
  PenTool,
  Search,
  Sparkles,
  TrendingUp,
  Film,
  type LucideIcon,
} from 'lucide-react'
import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Sticker,
  Underline,
} from '@/components/site/primitives'
import { getVerifiedArticles } from '@/lib/siteContent'

type Topic = {
  label: string
  blurb: string
  Icon: LucideIcon
  accent: string
  accent2: string
  /** Readable text colour on top of `accent`. */
  textColor: string
}

const TOPICS: Topic[] = [
  {
    label: 'Identity systems',
    blurb:
      'How a brand stays recognisable across every surface — wordmark, type, voice, motion.',
    Icon: PenTool,
    accent: '#F13D32',
    accent2: '#FF6B62',
    textColor: '#FFFFFF',
  },
  {
    label: 'Naming & voice',
    blurb:
      'The words a brand uses: naming, tone, and how verbal identity scales with teams.',
    Icon: Sparkles,
    accent: '#3D5AFE',
    accent2: '#3D5AFE',
    textColor: '#FFFFFF',
  },
  {
    label: 'The craft of the edit',
    blurb:
      'Frame-by-frame storytelling — direction, edit, and motion for films and ads.',
    Icon: Film,
    accent: '#FFC83D',
    accent2: '#157468',
    textColor: '#101010',
  },
  {
    label: 'Performance creative',
    blurb:
      'Ads, funnels and landing pages built to convert — and to be measurable.',
    Icon: TrendingUp,
    accent: '#C8F542',
    accent2: '#101010',
    textColor: '#101010',
  },
  {
    label: 'AI in concepting',
    blurb:
      'Generative pipelines for variations and visualisation — under human direction.',
    Icon: BrainCircuit,
    accent: '#7657F6',
    accent2: '#3D5AFE',
    textColor: '#FFFFFF',
  },
  {
    label: 'Building content engines',
    blurb:
      'Social and content systems that compound — process, velocity and distribution.',
    Icon: Megaphone,
    accent: '#157468',
    accent2: '#66DFC0',
    textColor: '#FFFFFF',
  },
  {
    label: 'Search & authority',
    blurb:
      'SEO, answer-engine optimisation, entity graphs and being discoverable.',
    Icon: Search,
    accent: '#66DFC0',
    accent2: '#157468',
    textColor: '#101010',
  },
  {
    label: 'Websites that perform',
    blurb:
      'Site architecture, conversion design, and the web as a growth engine.',
    Icon: Globe,
    accent: '#FF6B62',
    accent2: '#101010',
    textColor: '#101010',
  },
]

export function InsightsTopicsGrid() {
  // Verified article count — currently 0. Honest: each card shows
  // "Coming soon" until real articles exist.
  const verifiedCount = getVerifiedArticles().length

  return (
    <Section surface="sand" ariaLabelledBy="insights-topics-heading">
      <Container>
        {/* Heading row */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <SectionLabel number="01" accent="#F13D32">
              What we&rsquo;ll write about
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading id="insights-topics-heading" className="mt-5 max-w-[18ch]">
                Eight threads the studio plans to{' '}
                <Underline>explore</Underline>.
              </EditorialHeading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#101010] opacity-80 sm:text-lg">
                Not a content calendar dressed up as a magazine. These
                are the topics we keep coming back to when we sit down
                to write — identity, craft, growth and the systems
                underneath them.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Sticker accent="#101010" textColor="#FFC83D" tilt="right">
              {verifiedCount > 0 ? `${verifiedCount} essays live` : 'Coming soon'}
            </Sticker>
          </Reveal>
        </div>

        {/* Topics grid — 1 col mobile, 2 sm, 4 lg */}
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((t, i) => {
            const issueNumber = String(i + 1).padStart(2, '0')
            return (
              <li key={t.label}>
                <Reveal delay={0.04 * (i + 1)}>
                  <article
                    className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.14)] p-5 transition-transform duration-300 hover:-translate-y-1"
                    style={{ background: t.accent, color: t.textColor }}
                  >
                    {/* Halftone overlay for depth */}
                    <span
                      aria-hidden
                      className={
                        t.textColor === '#101010'
                          ? 'wn-halftone pointer-events-none absolute inset-0 opacity-30'
                          : 'wn-halftone-light pointer-events-none absolute inset-0 opacity-25'
                      }
                    />
                    {/* Header — issue number + icon */}
                    <div className="relative flex items-center justify-between">
                      <span
                        className="wn-caption"
                        style={{ color: t.textColor, opacity: 0.78 }}
                      >
                        Essay {issueNumber}
                      </span>
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full"
                        style={{
                          background:
                            t.textColor === '#101010'
                              ? 'rgba(16,16,16,0.10)'
                              : 'rgba(255,255,255,0.18)',
                        }}
                        aria-hidden
                      >
                        <t.Icon className="h-4 w-4" />
                      </span>
                    </div>
                    {/* Title + blurb */}
                    <div className="relative">
                      <h3 className="font-editorial text-xl font-semibold leading-tight">
                        {t.label}
                      </h3>
                      <p
                        className="mt-2 text-sm leading-relaxed"
                        style={{ color: t.textColor, opacity: 0.82 }}
                      >
                        {t.blurb}
                      </p>
                      {/* Issue sticker — bottom-left small */}
                      <span
                        className="mt-4 inline-flex items-center rounded-full px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider"
                        style={{
                          background:
                            t.textColor === '#101010'
                              ? 'rgba(16,16,16,0.10)'
                              : 'rgba(255,255,255,0.20)',
                        }}
                      >
                        Coming soon
                      </span>
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>

        {/* Honest note */}
        <Reveal delay={0.12}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[#5D5A54]">
            We&rsquo;d rather publish one essay we actually believe in
            than fill a grid with filler. When the first piece is ready,
            it will live here — and at{' '}
            <span className="font-medium text-[#101010]">/insights/[essay]</span>.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
