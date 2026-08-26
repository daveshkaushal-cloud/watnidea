'use client'

/**
 * EchoFutureOfSearch — Section 7 of /the-echo-system
 *
 * EDITORIAL COMPARISON: THE OLD SEARCH → THE NEW DISCOVERY.
 *
 * Composition:
 *   - Eyebrow: (07) · What's Next (CyanEyebrow)
 *   - Headline: "The Future of" + "Search" ("Search" cyan gradient)
 *   - Two-column editorial comparison that transitions as you scroll:
 *       • LEFT column (faded/legacy): "The Old Search" — Traditional
 *         SEO, keyword tables, blue links, ranking reports.
 *       • RIGHT column (vibrant cyan): "The New Discovery" — AI search,
 *         answer engines, knowledge graphs, voice, discovery platforms.
 *       • CENTER: animated transition (vertical line that draws in via
 *         scrollYProgress; per-row arrow that scales in on whileInView).
 *   - 6 comparison rows mapping old → new:
 *       Keywords              → Questions & Intent
 *       Blue Links            → Answer Engines
 *       Rank Reports          → Visibility Across Surfaces
 *       Meta Tags             → Knowledge Graphs
 *       Page One              → Everywhere Discovery Happens
 *       Traffic               → Authority That Compounds
 *   - whileInView staggered reveals; LEFT slides in from left, RIGHT
 *     from right, CENTER arrow scales in.
 *   - Closing statement: "We build for where search is going, not where
 *     it's been."
 *   - CyanStickyRail ("What's Next" / "Discovery").
 *
 * Color discipline: Cyan #06B6D4 is the primary accent throughout. The
 * LEFT (legacy) column uses desaturated white/gray with a SINGLE subtle
 * red brand touch on its column header (the rare brand-red accent per
 * color direction). Red never appears as the primary accent.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef, type CSSProperties } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Bookmark,
  Globe,
  Hash,
  Layers,
  Link2,
  Mic,
  Search,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import {
  CyanEyebrow,
  CyanGradientText,
  CyanStickyRail,
  MaskLine,
  useCursorParallax,
} from '@/components/echo/shared'

/* ===================================================================
   Comparison rows — 6 old→new mappings.
   =================================================================== */
type Row = {
  n: string
  oldLabel: string
  oldSub: string
  oldIcon: LucideIcon
  newLabel: string
  newSub: string
  newIcon: LucideIcon
}

const rows: Row[] = [
  {
    n: '01',
    oldLabel: 'Keywords',
    oldSub: 'Match the string',
    oldIcon: Hash,
    newLabel: 'Questions & Intent',
    newSub: 'Understand the asker',
    newIcon: BrainCircuit,
  },
  {
    n: '02',
    oldLabel: 'Blue Links',
    oldSub: 'Ten results, one page',
    oldIcon: Link2,
    newLabel: 'Answer Engines',
    newSub: 'Cite the source',
    newIcon: Sparkles,
  },
  {
    n: '03',
    oldLabel: 'Rank Reports',
    oldSub: 'Position #4 → #2',
    oldIcon: BarChart3,
    newLabel: 'Visibility Across Surfaces',
    oldSub: 'Wherever discovery happens',
    newIcon: Globe,
  },
  {
    n: '04',
    oldLabel: 'Meta Tags',
    oldSub: 'Title, description, H1',
    oldIcon: Bookmark,
    newLabel: 'Knowledge Graphs',
    newSub: 'Entities, relations, facts',
    newIcon: Layers,
  },
  {
    n: '05',
    oldLabel: 'Page One',
    oldSub: 'The only goal that mattered',
    oldIcon: Search,
    newLabel: 'Everywhere Discovery Happens',
    newSub: 'Search, ask, scroll, speak',
    newIcon: TrendingUp,
  },
  {
    n: '06',
    oldLabel: 'Traffic',
    oldSub: 'Clicks as the scoreboard',
    oldIcon: TrendingUp,
    newLabel: 'Authority That Compounds',
    newSub: 'Equity that accrues',
    newIcon: Mic,
  },
]

/* ===================================================================
   CenterTransitionViz — the visual layer behind the rows: a vertical
   cyan rail that draws in as the section scrolls (scaleY 0→1 via
   useTransform on scrollYProgress), with flowing particles traveling
   top→bottom along it. Sits behind the rows, mouse-reactive.
   =================================================================== */
function CenterTransitionViz({
  scrollYProgress,
  sx,
  sy,
}: {
  scrollYProgress: MotionValue<number>
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  // rail draws top→bottom as user scrolls through the section
  const railScale = useTransform(scrollYProgress, [0.08, 0.7], [0, 1])
  // subtle parallax for the column accents
  const leftX = useTransform(sx, [0, 1], [10, -10])
  const rightX = useTransform(sx, [0, 1], [-10, 10])
  const leftY = useTransform(sy, [0, 1], [6, -6])
  const rightY = useTransform(sy, [0, 1], [-6, 6])

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* LEFT ambient (gray, de-saturated) */}
      <motion.div
        style={{ x: leftX, y: leftY }}
        className="absolute left-[2%] top-1/2 h-[60%] w-[36%] -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* RIGHT ambient (vibrant cyan) */}
      <motion.div
        style={{ x: rightX, y: rightY }}
        className="absolute right-[2%] top-1/2 h-[60%] w-[36%] -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.22), rgba(6,182,212,0) 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Center vertical rail — draws in via scrollYProgress */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2">
        <div className="absolute inset-0 bg-white/8" />
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-[#06B6D4] via-[#67e8f9] to-[#0e7490]"
          style={{ scaleY: railScale, height: '100%', filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.6))' }}
        />
        {/* moving particle along the rail — CSS @keyframes (not Framer
            Motion animate) to avoid WAAPI errors on `top` layout-property
            animation. Opacity is included in the same keyframe. */}
        <div
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#67e8f9]"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(103,232,249,0.95))',
            '--scan-start': '0%',
            '--scan-end': '100%',
            animation: 'cinema-scanline-fall 4s ease-in-out infinite',
          } as CSSProperties}
        />
        <div
          className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white"
          style={{
            '--scan-start': '0%',
            '--scan-end': '100%',
            animation: 'cinema-scanline-fall 4s ease-in-out infinite 1.6s',
          } as CSSProperties}
        />
      </div>
    </div>
  )
}

/* ===================================================================
   ComparisonRow — single old→new row.
   - LEFT cell: slides in from -30px (legacy, dimmed)
   - CENTER: animated arrow that scales in
   - RIGHT cell: slides in from +30px (vibrant cyan)
   =================================================================== */
function ComparisonRow({ row, index }: { row: Row; index: number }) {
  const { n, oldLabel, oldSub, oldIcon: OldIcon, newLabel, newSub, newIcon: NewIcon } = row
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative grid grid-cols-[1fr_auto_1fr] items-stretch gap-3 sm:gap-5"
    >
      {/* === LEFT — legacy === */}
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.6, delay: index * 0.08 + 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.015] px-4 py-4 backdrop-blur-md sm:px-5 sm:py-5"
        style={{ filter: 'saturate(0.55)' }}
      >
        {/* faded number */}
        <span
          className="text-[10px] font-bold text-white/25"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {n}
        </span>
        {/* faded icon — strikethrough feel */}
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/40">
          <OldIcon className="h-4 w-4" />
          {/* tiny strikethrough line over the icon */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 rotate-[-28deg] bg-white/30"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4
              className="truncate text-base font-semibold text-white/55 sm:text-lg"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {oldLabel}
            </h4>
          </div>
          <p className="mt-0.5 truncate text-xs text-white/30 sm:text-[13px]">
            {oldSub}
          </p>
        </div>
      </motion.div>

      {/* === CENTER — animated arrow === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{
          duration: 0.55,
          delay: index * 0.08 + 0.18,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex items-center justify-center px-1"
      >
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#06B6D4]/40 bg-[#06B6D4]/10 backdrop-blur-md transition-all duration-300 group-hover:border-[#06B6D4] group-hover:bg-[#06B6D4]/20 sm:h-11 sm:w-11">
          <motion.span
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="block"
          >
            <ArrowRight
              className="h-4 w-4 text-[#67e8f9] sm:h-5 sm:w-5"
              style={{ filter: 'drop-shadow(0 0 6px rgba(103,232,249,0.85))' }}
            />
          </motion.span>
        </div>
      </motion.div>

      {/* === RIGHT — vibrant cyan === */}
      <motion.div
        initial={{ opacity: 0, x: 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.6, delay: index * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center gap-3 overflow-hidden rounded-2xl border border-[#06B6D4]/30 bg-[#06B6D4]/[0.06] px-4 py-4 backdrop-blur-md transition-colors duration-300 hover:border-[#06B6D4]/70 hover:bg-[#06B6D4]/[0.1] sm:px-5 sm:py-5"
      >
        {/* cyan glow bloom on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100"
          style={{
            background:
              'radial-gradient(120% 120% at 50% 0%, rgba(6,182,212,0.22), transparent 60%)',
          }}
        />
        {/* cyan icon */}
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#06B6D4]/40 bg-[#06B6D4]/10 text-[#67e8f9] sm:h-10 sm:w-10">
          <NewIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="relative min-w-0 flex-1">
          <h4
            className="truncate text-base font-semibold text-white sm:text-lg"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {newLabel}
          </h4>
          <p className="mt-0.5 truncate text-xs text-[#67e8f9]/80 sm:text-[13px]">
            {newSub}
          </p>
        </div>
        {/* delta badge */}
        <span
          className="absolute right-3 top-3 hidden rounded-full border border-[#06B6D4]/50 bg-[#141414]/60 px-1.5 py-0.5 wn-eyebrow text-[8px] font-bold text-[#67e8f9] sm:inline-block"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          +EVOLVE
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   EchoFutureOfSearch — Section 7 named export.
   =================================================================== */
export function EchoFutureOfSearch() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  // mouse-reactive parallax for the center transition viz
  const { sx, sy, handlers } = useCursorParallax(50, 18)

  return (
    <div
      ref={sectionRef}
      onPointerMove={handlers.move}
      onPointerLeave={handlers.leave}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <CyanStickyRail
          label="What's Next"
          caption="Discovery"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient + transition viz layer */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(6,182,212,0.14), rgba(6,182,212,0) 65%)',
                filter: 'blur(42px)',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="absolute bottom-[10%] right-[8%] h-[26vw] w-[26vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(59,130,246,0.12), rgba(59,130,246,0) 70%)',
                filter: 'blur(46px)',
              }}
              animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.15, 1] }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.2,
              }}
            />
          </div>

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-14 max-w-3xl"
          >
            <CyanEyebrow number="07" label="What's Next" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>The Future of </MaskLine>
              <MaskLine delay={0.12}>
                <CyanGradientText>Search</CyanGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Search stopped being a list of blue links. Today your audience
              asks, scrolls, speaks, and gets answers from engines that
              synthesize.{' '}
              <CyanGradientText glow={false}>Discovery is plural</CyanGradientText>{' '}
              — and The Echo System is built for all of its surfaces.
            </motion.p>
          </motion.div>

          {/* Column-title row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mb-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5"
          >
            {/* LEFT column title (faded, with single subtle red touch) */}
            <div className="flex items-center gap-2 px-4 sm:px-5">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[#E53935]/70"
                style={{ boxShadow: '0 0 6px rgba(229,57,53,0.7)' }}
              />
              <span
                className="wn-eyebrow text-[10px] font-bold tracking-[0.35em] text-white/40"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                THE OLD SEARCH
              </span>
              <span className="wn-eyebrow text-[8px] font-medium text-white/25">
                · LEGACY
              </span>
            </div>
            <div className="flex justify-center px-1">
              <span
                className="wn-eyebrow text-[9px] font-bold tracking-[0.3em] text-[#06B6D4]/70"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                EVOLUTION
              </span>
            </div>
            {/* RIGHT column title (vibrant cyan) */}
            <div className="flex items-center justify-end gap-2 px-4 sm:px-5">
              <span className="wn-eyebrow text-[8px] font-medium text-[#67e8f9]/70">
                FUTURE ·
              </span>
              <span
                className="wn-eyebrow text-[10px] font-bold tracking-[0.35em] text-[#67e8f9]"
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  textShadow: '0 0 12px rgba(103,232,249,0.5)',
                }}
              >
                THE NEW DISCOVERY
              </span>
            </div>
          </motion.div>

          {/* Comparison rows + center transition viz */}
          <div className="relative z-10">
            <CenterTransitionViz
              scrollYProgress={scrollYProgress}
              sx={sx}
              sy={sy}
            />
            <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
              {rows.map((r, i) => (
                <ComparisonRow key={r.n} row={r} index={i} />
              ))}
            </div>
          </div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-16"
          >
            <div
              className="relative overflow-hidden rounded-2xl border border-[#06B6D4]/25 bg-[#06B6D4]/[0.05] px-6 py-8 backdrop-blur-xl sm:px-10 sm:py-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(6,182,212,0.18), transparent 65%)',
                }}
              />
              <p
                className="relative z-10 text-center text-2xl font-semibold leading-snug text-white sm:text-3xl md:text-4xl"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                We build for where search is{' '}
                <CyanGradientText>going</CyanGradientText>, not where
                it&apos;s been.
              </p>
              <div className="relative z-10 mt-5 flex items-center justify-center gap-2">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#06B6D4]/60" />
                <Sparkles className="h-3.5 w-3.5 text-[#67e8f9]" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#06B6D4]/60" />
              </div>
            </div>
          </motion.div>

          {/* Bottom hairline divider */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-14 h-px w-full origin-left bg-gradient-to-r from-[#06B6D4] via-[#06B6D4]/40 to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
