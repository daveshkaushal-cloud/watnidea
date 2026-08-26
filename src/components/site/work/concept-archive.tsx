'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotionSSR } from '@/components/site/use-reduced-motion-ssr'
import { ArrowUpRight } from 'lucide-react'
import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Sticker,
  Underline,
} from '@/components/site/primitives'
import {
  CASE_STUDIES,
  SERVICES,
  type ServiceSlug,
} from '@/lib/siteContent'

/* ------------------------------------------------------------------ *
 * WorkArchive — Sections 2 + 3 of /work
 *
 * Two coupled sections sharing one client-side filter state:
 *   2. Concept board (surface="sand"):
 *        a) Featured concept cards — the TWO real CASE_STUDIES
 *           (verified=false, concept explorations) rendered as
 *           larger, clickable cards with a small preview of the
 *           designed concept visual as the cover. Each links to its
 *           real /work/[slug] route and carries a clear "View concept"
 *           call-to-action.
 *        b) Other concept tiles — FIVE additional invented concept
 *           tiles, rendered as non-clickable ConceptTile components
 *           (no <Link>, no hover-lift) and clearly labelled
 *           "Concept exploration — not client work".
 *   3. Filter row (surface="white") — chips by category.
 *
 * Honesty rules:
 *   - The TWO real CASE_STUDIES render as clickable cards with a
 *     "Concept" sticker and "View concept" CTA. They are clearly
 *     labelled as concept exploration.
 *   - The FIVE additional concept tiles render as ConceptTile —
 *     non-clickable <div>s (no Link). Explicit footer:
 *     "Concept exploration — not client work".
 *   - No invented client names, metrics or outcomes anywhere.
 *   - Empty filter categories (Growth, Search) show an honest empty
 *     state, not invented cards.
 *
 * Accessibility:
 *   - Filter chips are real <button aria-pressed="true|false">.
 *   - Min 44px touch targets.
 *   - Visible focus ring.
 *   - Featured card "View concept" is a real Link wrapping the CTA.
 *   - Decorative preview SVGs / halftone carry `aria-hidden`.
 *
 * Motion: AnimatePresence handles card mount/unmount. Reduced-motion
 * users get instant swaps (no fade).
 * ------------------------------------------------------------------ */

/* ---- Filter taxonomy ----
 * Maps each card's "category" to one of the 8 filter buckets.
 * All / Brand / Web / Content / Film / Growth / AI / Search.
 */
type Filter = 'all' | 'brand' | 'web' | 'content' | 'film' | 'growth' | 'ai' | 'search'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'brand', label: 'Brand' },
  { id: 'web', label: 'Web' },
  { id: 'content', label: 'Content' },
  { id: 'film', label: 'Film' },
  { id: 'growth', label: 'Growth' },
  { id: 'ai', label: 'AI' },
  { id: 'search', label: 'Search' },
]

/* ---- The 5 additional concept tiles (NOT real clients).
 * Each links to a service accent colour and is explicitly NOT clickable
 * (no /work/[slug] route exists for invented concepts). */
type AdditionalConcept = {
  id: string
  title: string
  category: string
  filter: Exclude<Filter, 'all'>
  serviceSlug: ServiceSlug
  issue: string
  caption: string
}

const ADDITIONAL_CONCEPTS: AdditionalConcept[] = [
  {
    id: 'social-content-frame',
    title: 'Social content frame',
    category: 'Content system',
    filter: 'content',
    serviceSlug: 'the-hype-engine',
    issue: 'ISSUE 03',
    caption: 'A reusable content-frame system for short-form video + carousels.',
  },
  {
    id: 'film-title-sequence',
    title: 'Film title sequence',
    category: 'Motion direction',
    filter: 'film',
    serviceSlug: 'kinetic-studio',
    issue: 'ISSUE 04',
    caption: 'A type-led opening-title concept built for a 60s brand film.',
  },
  {
    id: 'campaign-poster',
    title: 'Campaign poster',
    category: 'AI-assisted art direction',
    filter: 'ai',
    serviceSlug: 'synthetic-cinema',
    issue: 'ISSUE 05',
    caption: 'AI-assisted poster exploration — directed and edited by humans.',
  },
  {
    id: 'type-system-study',
    title: 'Type system study',
    category: 'Typography',
    filter: 'brand',
    serviceSlug: 'aura-architecture',
    issue: 'ISSUE 06',
    caption: 'A modular type-scale + accent study across digital surfaces.',
  },
  {
    id: 'interface-grid',
    title: 'Interface grid',
    category: 'Design system',
    filter: 'web',
    serviceSlug: 'the-digital-hq',
    issue: 'ISSUE 07',
    caption: 'A 12-column interface grid concept for marketing + product UI.',
  },
]

/* ---- Helper: lookup a service's accent colours ---- */
function accentFor(slug: ServiceSlug): { accent: string; accent2: string; serviceName: string; serviceNumber: string } {
  const svc = SERVICES.find((s) => s.slug === slug)
  return {
    accent: svc?.accent ?? '#F13D32',
    accent2: svc?.accent2 ?? '#FF6B62',
    serviceName: svc?.name ?? '',
    serviceNumber: svc?.number ?? '',
  }
}

/* ---- Helper: map a CASE_STUDY's category to a filter bucket ---- */
function filterForCaseStudy(category: string): Exclude<Filter, 'all'> {
  const c = category.toLowerCase()
  if (c.includes('brand') || c.includes('identity')) return 'brand'
  if (c.includes('website') || c.includes('web') || c.includes('site')) return 'web'
  if (c.includes('content') || c.includes('social')) return 'content'
  if (c.includes('film') || c.includes('motion')) return 'film'
  if (c.includes('growth') || c.includes('performance')) return 'growth'
  if (c.includes('ai') || c.includes('synthetic')) return 'ai'
  if (c.includes('search') || c.includes('seo')) return 'search'
  return 'brand'
}

/* ---- Helper: luminance check (kept local to this file) ---- */
function isLightHex(hex: string): boolean {
  const c = hex.replace('#', '')
  if (c.length !== 6) return false
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.6
}

/* ------------------------------------------------------------------ *
 * Concept-visual previews — small inline CSS/SVG previews used as
 * the cover of FeaturedConceptCard. Each is a compact, recognisable
 * sketch of the full concept visual that lives on /work/[slug].
 * NO images. Decorative parts carry aria-hidden.
 * ------------------------------------------------------------------ */

/* Aura preview — paper card with wordmark, tiny type ladder, swatch row */
function AuraPreview() {
  const INK = '#101010'
  const RED = '#F13D32'
  const CORAL = '#FF6B62'
  const PAPER = '#F7F2E8'
  const MUTED = '#5D5A54'
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#F7F2E8] p-5"
      aria-hidden
    >
      <span className="pointer-events-none absolute inset-0 wn-halftone opacity-[0.15]" />
      <div className="relative">
        {/* Caption row */}
        <div className="flex items-center justify-between">
          <span className="wn-caption" style={{ color: MUTED, fontSize: '0.55rem' }}>
            Specimen · Aura
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-wider"
            style={{ background: INK, color: RED }}
          >
            Concept
          </span>
        </div>
        {/* Wordmark */}
        <div
          className="mt-3 font-editorial font-medium leading-none tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2rem, 6vw, 2.75rem)', color: INK }}
        >
          wat<span style={{ color: RED }}>N</span>idea
        </div>
        {/* Tiny type ladder */}
        <div className="mt-4 flex flex-col gap-1.5">
          {[
            { s: '1.1rem', w: 500 },
            { s: '0.85rem', w: 600 },
            { s: '0.7rem', w: 400 },
          ].map((t, i) => (
            <span
              key={i}
              className="font-editorial leading-none"
              style={{ fontSize: t.s, fontWeight: t.w, color: INK, letterSpacing: '-0.01em' }}
            >
              Idea
            </span>
          ))}
        </div>
        {/* Swatch row */}
        <div className="mt-4 flex items-center gap-1.5">
          {[RED, CORAL, INK, PAPER].map((hex) => (
            <span
              key={hex}
              className="h-6 w-6 rounded-[4px]"
              style={{ background: hex, boxShadow: 'inset 0 0 0 1px rgba(16,16,16,0.10)' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* Digital HQ preview — paper card with a small browser frame + 3 features */
function DigitalHqPreview() {
  const INK = '#101010'
  const BLUE = '#3D5AFE'
  const PAPER = '#F7F2E8'
  const MUTED = '#5D5A54'
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#F7F2E8] p-5"
      aria-hidden
    >
      <span className="pointer-events-none absolute inset-0 wn-halftone opacity-[0.15]" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="wn-caption" style={{ color: MUTED, fontSize: '0.55rem' }}>
            Architecture · Digital HQ
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-wider"
            style={{ background: INK, color: BLUE }}
          >
            Concept
          </span>
        </div>
        {/* Mini browser frame */}
        <div
          className="mt-3 overflow-hidden rounded-[8px] border"
          style={{ borderColor: 'rgba(16,16,16,0.18)', background: PAPER }}
        >
          {/* Chrome */}
          <div
            className="flex items-center gap-1.5 border-b px-2 py-1.5"
            style={{ borderColor: 'rgba(16,16,16,0.10)', background: '#FFFDF8' }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#FF6B62' }} />
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#FFC83D' }} />
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#66DFC0' }} />
            <span
              className="ml-1 flex-1 rounded-[3px] px-1.5 py-0.5 text-[0.45rem] font-medium"
              style={{ background: PAPER, color: MUTED, border: '1px solid rgba(16,16,16,0.10)' }}
            >
              concept.watnidea.com
            </span>
          </div>
          {/* Wireframe body */}
          <div className="space-y-1.5 p-2">
            {/* Hero */}
            <div className="rounded-[4px] border border-[rgba(16,16,16,0.10)] bg-[#FFFDF8] p-1.5">
              <div className="rounded-[2px]" style={{ height: 4, width: '12%', background: BLUE, marginBottom: 4 }} />
              <div className="rounded-[2px]" style={{ height: 7, width: '78%', background: INK, marginBottom: 2 }} />
              <div className="rounded-[2px]" style={{ height: 7, width: '52%', background: INK, marginBottom: 5 }} />
              <div className="flex items-center gap-1.5">
                <div className="rounded-full" style={{ height: 10, width: 32, background: BLUE }} />
                <div className="rounded-[2px]" style={{ height: 5, width: 22, background: 'rgba(16,16,16,0.20)' }} />
              </div>
            </div>
            {/* 3 features */}
            <div className="grid grid-cols-3 gap-1.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-[4px] border border-[rgba(16,16,16,0.10)] bg-[#FFFDF8] p-1.5"
                >
                  <div className="rounded-[2px]" style={{ height: 6, width: '40%', background: BLUE, marginBottom: 3 }} />
                  <div className="rounded-[2px]" style={{ height: 4, width: '90%', background: INK, marginBottom: 2 }} />
                  <div className="rounded-[2px]" style={{ height: 3, width: '70%', background: 'rgba(16,16,16,0.22)' }} />
                </div>
              ))}
            </div>
            {/* CTA band */}
            <div className="rounded-[4px] p-1.5" style={{ background: BLUE }}>
              <div className="rounded-[2px]" style={{ height: 5, width: '40%', background: '#FFFFFF', marginBottom: 3 }} />
              <div className="rounded-full" style={{ height: 8, width: 28, background: '#FFFFFF' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Registry: which preview component to use for which case-study slug */
const FEATURED_PREVIEWS: Record<string, () => JSX.Element> = {
  'aura-brand-system-exploration': AuraPreview,
  'digital-hq-marketing-site-concept': DigitalHqPreview,
}

/* ------------------------------------------------------------------ *
 * FeaturedConceptCard — larger, clickable card for the 2 real
 * CASE_STUDIES (concept explorations). Renders a small preview of the
 * concept visual as the cover, with a clear "View concept" CTA.
 * ------------------------------------------------------------------ */
function FeaturedConceptCard({
  href,
  title,
  category,
  issue,
  accent,
  accent2,
  summary,
  slug,
  index,
}: {
  href: string
  title: string
  category: string
  issue: string
  accent: string
  accent2: string
  summary: string
  slug: string
  index: number
}) {
  const Preview = FEATURED_PREVIEWS[slug]
  const isLight = isLightHex(accent)
  const isAccent2Light = isLightHex(accent2)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.36, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        href={href}
        className="wn-card group flex h-full flex-col overflow-hidden rounded-[22px] focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-label={`View concept: ${title} — ${category}. Concept exploration — not client work.`}
      >
        {/* Cover area — preview visual */}
        <div className="relative aspect-[5/4] overflow-hidden border-b border-[rgba(16,16,16,0.10)]">
          {Preview ? <Preview /> : null}
          {/* Issue sticker (top-left over preview) */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[rgba(255,253,248,0.92)] px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-[#101010]">
            {issue}
          </span>
          {/* Concept label sticker (top-right over preview) */}
          <span
            className="absolute right-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wider"
            style={{ background: accent2, color: isAccent2Light ? '#101010' : '#FFFFFF' }}
          >
            Concept
          </span>
        </div>

        {/* Meta + title + summary + CTA */}
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="wn-caption text-[#5D5A54]">{category}</span>
            <span
              aria-hidden
              className="h-2 w-2 rounded-full"
              style={{ background: accent }}
            />
          </div>
          <h3 className="font-editorial text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.01em] text-[#101010]">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-[#5D5A54]">{summary}</p>
          {/* View concept CTA */}
          <div className="mt-auto pt-2">
            <span
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 group-hover:translate-x-0.5"
              style={{ background: accent, color: isLight ? '#101010' : '#FFFFFF' }}
            >
              <span>View concept</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
          {/* Honesty footer */}
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
            Concept exploration — not client work
          </p>
        </div>
      </a>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ *
 * ConceptTile — non-clickable visual magazine-cover tile.
 * Used for the 5 additional invented concept explorations.
 *
 * Looks like a ProjectCard (same cover, issue sticker, concept label,
 * meta strip) but is a <div>, not a <Link>. NO hover-lift. The footer
 * reads "Concept exploration — not client work" so no one mistakes
 * these for signed-off engagements.
 * ------------------------------------------------------------------ */
function ConceptTile({ concept, index }: { concept: AdditionalConcept; index: number }) {
  const { accent, accent2, serviceName, serviceNumber } = accentFor(concept.serviceSlug)
  const isLight = isLightHex(accent)
  const isAccent2Light = isLightHex(accent2)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.10)] bg-[#FFFDF8]"
      aria-label={`${concept.title} — concept tile, not clickable.`}
    >
      {/* Cover area */}
      <div
        className="relative aspect-[4/5] overflow-hidden"
        style={{ background: accent, color: isLight ? '#101010' : '#FFFFFF' }}
      >
        <span
          aria-hidden
          className={`absolute inset-0 opacity-25 ${isLight ? 'wn-halftone' : 'wn-halftone-light'}`}
        />
        {/* Issue sticker */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-[rgba(255,253,248,0.92)] px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-wider text-[#101010]">
          {concept.issue}
        </span>
        {/* Concept label sticker */}
        <span
          className="absolute right-3 top-3 inline-flex items-center rounded-full px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-wider"
          style={{ background: accent2, color: isAccent2Light ? '#101010' : '#FFFFFF' }}
        >
          Concept
        </span>
        {/* Service number watermark */}
        <span
          aria-hidden
          className="absolute right-3 top-1/2 -translate-y-1/2 font-editorial text-[4rem] font-bold leading-none opacity-15"
          style={{ color: isLight ? '#101010' : '#FFFFFF' }}
        >
          {serviceNumber}
        </span>
        {/* Big title */}
        <div className="absolute inset-x-4 bottom-4">
          <span className="font-editorial text-[1.6rem] font-bold leading-[0.95] tracking-[-0.02em]">
            {concept.title}
          </span>
        </div>
      </div>

      {/* Meta strip */}
      <div className="flex flex-col gap-1 border-t border-[rgba(16,16,16,0.10)] px-4 py-2.5">
        <div className="flex items-center justify-between">
          <span className="wn-caption text-[#5D5A54]">{concept.category}</span>
          <span
            aria-hidden
            className="h-2 w-2 rounded-full"
            style={{ background: accent }}
          />
        </div>
        <p className="text-[0.7rem] leading-snug text-[#5D5A54]">{concept.caption}</p>
      </div>

      {/* Honesty footer */}
      <div className="border-t border-[rgba(16,16,16,0.10)] px-4 py-1.5">
        <p className="text-[0.55rem] font-bold uppercase tracking-[0.14em] text-[#F13D32]">
          Concept exploration — not client work
        </p>
      </div>
    </motion.div>
  )
}

/* ---- Final card type unified for rendering ---- */
type FeaturedCard = {
  kind: 'case-study'
  id: string
  title: string
  category: string
  filter: Exclude<Filter, 'all'>
  issue: string
  accent: string
  accent2: string
  href: string
  conceptLabel: string
  summary: string
  slug: string
}

type OtherCard = {
  kind: 'additional'
  id: string
  title: string
  category: string
  filter: Exclude<Filter, 'all'>
  issue: string
  accent: string
  accent2: string
  conceptLabel: string
  concept: AdditionalConcept
}

type AnyCard = FeaturedCard | OtherCard

/* ---- Build the unified card list ---- */
function buildCards(): { featured: FeaturedCard[]; others: OtherCard[] } {
  const featured: FeaturedCard[] = []
  const others: OtherCard[] = []

  // The 2 real CASE_STUDIES (verified=false, concept explorations)
  CASE_STUDIES.forEach((cs, i) => {
    const svc = SERVICES.find((s) => s.slug === cs.services[0])
    featured.push({
      kind: 'case-study',
      id: cs.slug,
      title: cs.title,
      category: cs.category,
      filter: filterForCaseStudy(cs.category),
      issue: `ISSUE ${String(i + 1).padStart(2, '0')}`,
      accent: svc?.accent ?? '#F13D32',
      accent2: svc?.accent2 ?? '#FF6B62',
      href: `/work/${cs.slug}`,
      conceptLabel: 'Concept',
      summary: cs.summary,
      slug: cs.slug,
    })
  })

  // The 5 additional concept tiles
  ADDITIONAL_CONCEPTS.forEach((concept) => {
    const { accent, accent2 } = accentFor(concept.serviceSlug)
    others.push({
      kind: 'additional',
      id: concept.id,
      title: concept.title,
      category: concept.category,
      filter: concept.filter,
      issue: concept.issue,
      accent,
      accent2,
      conceptLabel: 'Concept',
      concept,
    })
  })

  return { featured, others }
}

/* ---- Component ---- */
export function WorkArchive() {
  const [active, setActive] = useState<Filter>('all')
  const reduce = useReducedMotionSSR()

  const all = useMemo(() => buildCards(), [])
  const featured = useMemo(
    () => (active === 'all' ? all.featured : all.featured.filter((c) => c.filter === active)),
    [all, active],
  )
  const others = useMemo(
    () => (active === 'all' ? all.others : all.others.filter((c) => c.filter === active)),
    [all, active],
  )
  const totalVisible = featured.length + others.length

  return (
    <>
      {/* ---- Section 2: Concept board (sand) ---- */}
      <Section surface="sand" ariaLabelledBy="concept-board-heading">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel number="01" accent="#F13D32">
                Concept board
              </SectionLabel>
              <Reveal delay={0.08}>
                <EditorialHeading
                  id="concept-board-heading"
                  className="mt-5 max-w-[20ch]"
                >
                  A wall of <Underline>concept</Underline> explorations.
                </EditorialHeading>
              </Reveal>
            </div>
            <Reveal delay={0.16}>
              <Sticker accent="#FFC83D" textColor="#101010" tilt="left">
                Magazine covers
              </Sticker>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-base text-[#101010] opacity-80">
              Treat each frame as an issue of the same magazine — same
              grid, same type, its own accent. Two of these have a real
              <span className="font-medium"> /work/[slug]</span> page with
              a designed concept visual — featured below, larger, with a{' '}
              <span className="font-medium text-[#F13D32]">View concept</span>{' '}
              link. The rest are visual tiles, clearly marked as{' '}
              <span className="font-medium text-[#F13D32]">
                concept exploration — not client work
              </span>
              .
            </p>
          </Reveal>

          {/* ---- Featured concept cards (the 2 CASE_STUDIES) ---- */}
          <div className="mt-10">
            <div className="flex items-baseline justify-between gap-3">
              <p className="wn-caption text-[#5D5A54]">
                Featured concepts · with designed visual
              </p>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#5D5A54]">
                Click to view
              </span>
            </div>
            <motion.div
              layout
              className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
              <AnimatePresence mode="popLayout">
                {featured.map((card, i) => (
                  <FeaturedConceptCard
                    key={card.id}
                    href={card.href}
                    title={card.title}
                    category={card.category}
                    issue={card.issue}
                    accent={card.accent}
                    accent2={card.accent2}
                    summary={card.summary}
                    slug={card.slug}
                    index={i}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ---- Other concept tiles (non-clickable) ---- */}
          <div className="mt-12">
            <div className="flex items-baseline justify-between gap-3">
              <p className="wn-caption text-[#5D5A54]">
                Other concept tiles · visual only, not clickable
              </p>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#5D5A54]">
                Visual tiles
              </span>
            </div>
            <motion.div
              layout
              className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            >
              <AnimatePresence mode="popLayout">
                {others.map((card, i) => (
                  <ConceptTile key={card.id} concept={card.concept} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Honest empty state for filters with no cards (e.g. Growth, Search) */}
          {totalVisible === 0 && (
            <div className="mt-12 rounded-[22px] border border-dashed border-[rgba(16,16,16,0.24)] bg-[rgba(255,253,248,0.6)] p-10 text-center">
              <p className="font-editorial text-2xl font-semibold">
                No concept in this category yet.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#5D5A54]">
                Honest empty state — we&apos;d rather show nothing than
                invent a client. Try another filter, or talk to us about
                being the first.
              </p>
            </div>
          )}

          {/* Visible-card count */}
          <p
            className="mt-6 text-xs font-medium text-[#5D5A54]"
            aria-live="polite"
          >
            Showing {totalVisible} of {all.featured.length + all.others.length} concepts
            {active !== 'all' ? ` · ${FILTERS.find((f) => f.id === active)?.label}` : ''}
          </p>
        </Container>
      </Section>

      {/* ---- Section 3: Filter row (white) ---- */}
      <Section surface="white" ariaLabelledBy="filter-row-heading">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <SectionLabel number="02" accent="#F13D32">
                Filter
              </SectionLabel>
              <Reveal delay={0.08}>
                <h2
                  id="filter-row-heading"
                  className="mt-4 font-editorial text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium leading-tight tracking-[-0.01em]"
                >
                  Refine the board.
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.16}>
              <div
                role="group"
                aria-label="Filter concepts by category"
                className="flex flex-wrap gap-2"
              >
                {FILTERS.map((f) => {
                  const pressed = active === f.id
                  return (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => setActive(f.id)}
                      className={
                        'inline-flex min-h-[44px] items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ' +
                        (pressed
                          ? 'border-[#F13D32] bg-[#F13D32] text-white'
                          : 'border-[rgba(16,16,16,0.18)] bg-transparent text-[#101010] hover:bg-[rgba(16,16,16,0.05)]')
                      }
                    >
                      {f.label}
                    </button>
                  )
                })}
              </div>
            </Reveal>
          </div>

          <p className="mt-5 max-w-xl text-sm text-[#5D5A54]">
            Click a category to narrow the board above. Categories with
            no concept yet show an honest empty state — never an
            invented client.
          </p>
        </Container>
      </Section>
    </>
  )
}
