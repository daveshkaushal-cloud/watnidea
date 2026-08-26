'use client'

/* ------------------------------------------------------------------ *
 * InsightsTopics — Section 2 of /insights
 *
 * Repurposed from the old "fake featured article" section into an
 * honest, editorial "What we'll write about" topic grid.
 *
 *   - Cream background.
 *   - 8 labelled topic tiles — NOT fake articles. No fake authors,
 *     no fake read counts, no fake dates.
 *   - Each tile is a static card (not a link to nowhere). When real
 *     verified articles exist in the future, they will live at
 *     /insights/[slug] and be linked from a real article grid.
 *
 * The 8 topics span the studio's seven services plus one editorial
 * thread on craft — they describe what we plan to explore, not what
 * we have published. Verified article counts come from
 * getVerifiedArticles(); until that returns items, every tile shows
 * a quiet "Coming soon" tag instead of a fabricated number.
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
import { Reveal } from '@/components/home/motion'
import {
  Eyebrow,
  SectionHeading,
  SectionShell,
} from '@/components/home/primitives'
import { getVerifiedArticles } from '@/lib/siteContent'

type Topic = {
  label: string
  blurb: string
  Icon: LucideIcon
}

const TOPICS: Topic[] = [
  {
    label: 'Identity systems',
    blurb:
      'How a brand stays recognisable across every surface — wordmark, type, voice, motion.',
    Icon: PenTool,
  },
  {
    label: 'Naming & voice',
    blurb:
      'The words a brand uses: naming, tone, and how verbal identity scales with teams.',
    Icon: Sparkles,
  },
  {
    label: 'The craft of the edit',
    blurb:
      'Frame-by-frame storytelling — direction, edit, and motion for films and ads.',
    Icon: Film,
  },
  {
    label: 'Performance creative',
    blurb:
      'Ads, funnels and landing pages engineered to convert — and to be measurable.',
    Icon: TrendingUp,
  },
  {
    label: 'AI in concepting',
    blurb:
      'Generative pipelines for variations and visualisation — under human direction.',
    Icon: BrainCircuit,
  },
  {
    label: 'Building content engines',
    blurb:
      'Social and content systems that compound — process, velocity and distribution.',
    Icon: Megaphone,
  },
  {
    label: 'Search & authority',
    blurb:
      'SEO, answer-engine optimisation, entity graphs and being discoverable.',
    Icon: Search,
  },
  {
    label: 'Websites that perform',
    blurb:
      'Site architecture, conversion design, and the web as a growth engine.',
    Icon: Globe,
  },
]

export function InsightsTopics() {
  const verifiedCount = getVerifiedArticles().length

  return (
    <section
      aria-labelledby="insights-topics-heading"
      className="wn-section bg-[var(--wn-cream)]"
    >
      <SectionShell>
        {/* Heading row */}
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>What we&rsquo;ll write about</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeading id="insights-topics-heading" className="mt-4">
              Eight threads the studio plans to explore —{' '}
              <span className="text-[var(--wn-muted)]">
                honest, opinionated, and from inside the work.
              </span>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-[var(--wn-muted)] sm:text-lg">
              Not a content calendar dressed up as a magazine. These are
              the topics we keep coming back to when we sit down to
              write — identity, craft, growth and the systems underneath
              them.
            </p>
          </Reveal>
        </div>

        {/* Topics grid */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((t, i) => (
            <li key={t.label}>
              <Reveal delay={0.04 * (i + 1)} as="div" className="h-full">
                <article className="flex h-full flex-col gap-4 rounded-2xl border border-[var(--wn-border-subtle)] bg-[var(--wn-surface)] p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--wn-sand)] text-[var(--wn-body)]"
                      aria-hidden="true"
                    >
                      <t.Icon className="h-4 w-4" />
                    </span>
                    <span className="wn-eyebrow !text-[0.6rem] text-[var(--wn-muted)]">
                      {verifiedCount > 0 ? `${verifiedCount} essays` : 'Coming soon'}
                    </span>
                  </div>
                  <h3 className="font-editorial text-lg font-medium leading-snug text-[var(--wn-body)]">
                    {t.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--wn-muted)]">
                    {t.blurb}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Honest note */}
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[var(--wn-muted)]">
            We&rsquo;d rather publish one essay we actually believe in
            than fill a grid with filler. When the first piece is ready,
            it will live here — and at{' '}
            <span className="font-medium text-[var(--wn-body)]">
              /insights/[essay]
            </span>
            .
          </p>
        </Reveal>
      </SectionShell>
    </section>
  )
}
