'use client'

/**
 * WorkProjectFilter — Section 3 of /work
 *
 * Interactive, working filter. Filters the visible cards on click — on
 * desktop, tablet AND mobile. Each chip is a real <button> with
 * aria-pressed state and a min 44px touch target.
 *
 * Cards = honest mix of:
 *   - Verified case studies (currently 0) — labelled "Selected work",
 *     link to /work/[slug].
 *   - Concept explorations (currently 2) — labelled "Concept
 *     exploration", link to /work/[slug].
 *   - Service service cards (7) — labelled "Practice", link to the
 *     service route (e.g. /aura-architecture).
 *
 * NO invented client names, metrics or "ROAS climbed to 6.8×".
 *
 * Filter chips are derived from the SERVICES list. Clicking a chip
 * filters cards whose `services` set includes that service slug, or
 * whose `kind === 'service'` and `service.slug === slug`. "All" shows
 * every card.
 *
 * Reduced-motion: AnimatePresence transitions collapse gracefully.
 */

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import {
  CASE_STUDIES,
  SERVICES,
  getVerifiedCaseStudies,
  type CaseStudy,
  type ServiceSlug,
} from '@/lib/siteContent'
import {
  Eyebrow,
  SectionHeading,
  SectionShell,
} from '@/components/home/primitives'
import { Reveal } from '@/components/home/motion'

type CardKind = 'verified' | 'concept' | 'service'

type Card = {
  key: string
  kind: CardKind
  title: string
  summary: string
  services: ServiceSlug[]
  href: string
  label: string
  labelTone: 'red' | 'amber' | 'muted'
}

function serviceLabel(slug: ServiceSlug): string {
  return SERVICES.find((s) => s.slug === slug)?.shortName ?? slug
}

function buildCards(): Card[] {
  const cards: Card[] = []

  // Verified case studies (real client work).
  for (const study of getVerifiedCaseStudies()) {
    cards.push({
      key: `verified-${study.slug}`,
      kind: 'verified',
      title: study.title,
      summary: study.summary,
      services: study.services,
      href: `/work/${study.slug}`,
      label: 'Selected work',
      labelTone: 'red',
    })
  }

  // Concept explorations (NOT verified).
  for (const study of CASE_STUDIES.filter((c) => !c.verified)) {
    cards.push({
      key: `concept-${study.slug}`,
      kind: 'concept',
      title: study.title,
      summary: study.summary,
      services: study.services,
      href: `/work/${study.slug}`,
      label: 'Concept exploration',
      labelTone: 'amber',
    })
  }

  // Service service cards — honest "what we practice".
  for (const service of SERVICES) {
    cards.push({
      key: `service-${service.slug}`,
      kind: 'service',
      title: service.name,
      summary: service.description,
      services: [service.slug],
      href: service.route,
      label: 'Practice',
      labelTone: 'muted',
    })
  }

  return cards
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        'inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wn-red)] ' +
        (active
          ? 'border-[var(--wn-red)] bg-[var(--wn-red)] text-white'
          : 'border-[var(--wn-border-strong)] bg-[var(--wn-surface)] text-[var(--wn-body)] hover:border-[var(--wn-red)]/60 hover:text-[var(--wn-red)]')
      }
    >
      <span>{label}</span>
      <span
        className={
          'rounded-full px-1.5 py-0.5 text-[10px] font-bold ' +
          (active ? 'bg-white/20 text-white' : 'bg-[var(--wn-surface-2)] text-[var(--wn-muted)]')
        }
      >
        {count}
      </span>
    </button>
  )
}

function CardItem({ card }: { card: Card }) {
  const toneClass =
    card.labelTone === 'red'
      ? 'bg-[var(--wn-red)]/10 text-[var(--wn-red)]'
      : card.labelTone === 'amber'
        ? 'bg-[var(--wn-amber)]/15 text-[var(--wn-body)]'
        : 'bg-[var(--wn-surface-2)] text-[var(--wn-muted)]'
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <a
        href={card.href}
        aria-label={`Open: ${card.title}`}
        className="group flex h-full flex-col rounded-2xl border border-[var(--wn-border-strong)] bg-[var(--wn-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--wn-red)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wn-red)] sm:p-7"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneClass}`}
          >
            <span
              aria-hidden
              className={
                'h-1.5 w-1.5 rounded-full ' +
                (card.labelTone === 'red'
                  ? 'bg-[var(--wn-red)]'
                  : card.labelTone === 'amber'
                    ? 'bg-[var(--wn-amber)]'
                    : 'bg-[var(--wn-muted)]')
              }
            />
            {card.label}
          </span>
          <ArrowUpRight className="h-4 w-4 text-[var(--wn-muted)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--wn-red)]" />
        </div>
        <h3 className="font-editorial text-xl font-medium leading-snug tracking-[-0.01em] text-[var(--wn-body)] sm:text-2xl">
          {card.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--wn-muted)]">
          {card.summary}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-[var(--wn-border-subtle)] pt-4 text-xs text-[var(--wn-muted)]">
          <span className="wn-eyebrow text-[var(--wn-muted)]/70">Practice</span>
          <span>{card.services.map(serviceLabel).join(' · ')}</span>
        </div>
      </a>
    </motion.li>
  )
}

export function WorkProjectFilter() {
  const reduce = useReducedMotion() ?? false
  const [active, setActive] = useState<ServiceSlug | 'all'>('all')

  const cards = useMemo(() => buildCards(), [])

  // Counts per service for chip badges.
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: cards.length }
    for (const s of SERVICES) {
      map[s.slug] = cards.filter((c) => c.services.includes(s.slug)).length
    }
    return map
  }, [cards])

  const filtered = useMemo(() => {
    if (active === 'all') return cards
    return cards.filter((c) => c.services.includes(active))
  }, [active, cards])

  const transition = reduce
    ? { duration: 0.001 }
    : { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <section
      aria-labelledby="work-filter-heading"
      className="wn-section bg-[var(--wn-warm-white)] px-5 sm:px-8"
    >
      <SectionShell>
        <Reveal>
          <Eyebrow>Filter by service</Eyebrow>
        </Reveal>
        <Reveal delay={0.08} className="mt-5 block max-w-3xl">
          <SectionHeading id="work-filter-heading">
            Browse by practice.
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.16} className="mt-6 block max-w-2xl">
          <p className="text-base leading-relaxed text-[var(--wn-muted)] sm:text-lg">
            {cards.length} honest cards across {SERVICES.length} services.
            Verified work is labelled{' '}
            <span className="font-semibold text-[var(--wn-red)]">
              Selected work
            </span>
            ; concept explorations are labelled{' '}
            <span className="font-semibold text-[var(--wn-body)]">
              Concept exploration
            </span>
            .
          </p>
        </Reveal>

        {/* Filter chips — wraps on every viewport. Touch-target safe. */}
        <Reveal delay={0.2} className="mt-10 block">
          <div
            role="group"
            aria-label="Filter cards by service"
            className="flex flex-wrap items-center gap-2 sm:gap-2.5"
          >
            <FilterChip
              label="All"
              count={counts.all}
              active={active === 'all'}
              onClick={() => setActive('all')}
            />
            {SERVICES.map((s) => (
              <FilterChip
                key={s.slug}
                label={s.shortName}
                count={counts[s.slug] ?? 0}
                active={active === s.slug}
                onClick={() => setActive(s.slug)}
              />
            ))}
          </div>
        </Reveal>

        {/* Result count */}
        <div className="mt-6 flex items-center gap-3 text-xs text-[var(--wn-muted)]">
          <span className="h-px w-8 bg-[var(--wn-border-strong)]" aria-hidden />
          <span>
            Showing{' '}
            <span className="font-semibold text-[var(--wn-body)]">
              {filtered.length}
            </span>{' '}
            of {cards.length}
          </span>
        </div>

        {/* Grid */}
        <motion.ul
          layout
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((card) => (
              <CardItem key={card.key} card={card} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-[var(--wn-border-strong)] bg-[var(--wn-surface)] p-10 text-center text-[var(--wn-muted)]">
            <Check className="mx-auto mb-3 h-5 w-5 text-[var(--wn-muted)]" />
            No cards in this service yet.
          </div>
        )}
      </SectionShell>
    </section>
  )
}
