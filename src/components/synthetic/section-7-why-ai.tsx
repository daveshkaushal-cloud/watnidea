'use client'

/**
 * SynthWhyAI — Section 7 of /synthetic-cinema
 *
 * EDITORIAL STORYTELLING + INTERACTIVE COMPARISON VISUALIZATION.
 *
 * Mirrors the growth/section-7-data-creativity structure EXACTLY but
 * swaps emerald→purple and re-themes the fusion visualization as
 * "TRADITIONAL → SYNTHETIC" transformation.
 *
 * Composition:
 *   - Eyebrow: (07) · Why Brands Move to AI (PurpleEyebrow)
 *   - Headline: "The Future Is" + "Synthetic." (purple gradient)
 *   - 3 editorial paragraphs (verbatim from spec — Speed / Scale / Flexibility).
 *   - Interactive comparison visualization:
 *       • LEFT column  "TRADITIONAL" — Calendar/Clock/Users/Film icons
 *         floating over a fragmented red-tinted grid (slow/expensive/limited).
 *       • RIGHT column "SYNTHETIC"   — Sparkles/Wand2/Film/Zap icons
 *         floating over a flowing purple/violet gradient (fast/scalable/limitless).
 *       • CENTER: purple fusion zone where the transformation happens
 *         — streams from both sides converge as scrollYProgress advances,
 *         and the TRADITIONAL side dissolves while the SYNTHETIC side
 *         intensifies.
 *     Mouse-reactive (useCursorParallax), scroll-driven convergence.
 *   - 3 HighlightCards: "10x Faster Delivery", "100x Creative
 *     Variations", "0 Reshoots Ever".
 *   - PurpleStickyRail ("Why AI" / "Advantage").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  Calendar,
  Clock,
  Film,
  Sparkles,
  Users,
  Wand2,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  PurpleEyebrow,
  PurpleGradientText,
  PurpleStickyRail,
  MaskLine,
  useCursorParallax,
} from '@/components/synthetic/shared'

/* ===================================================================
   Editorial paragraphs — verbatim from spec.
   =================================================================== */
const paragraphs = [
  {
    lead: 'Speed:',
    body: 'what took a crew of forty and six weeks now takes a prompt and a day. The calendar stops being the bottleneck and starts being the advantage.',
  },
  {
    lead: 'Scale:',
    body: 'one concept becomes a hundred variations. One shoot becomes a thousand scenes. Your creative output compounds while your budget stays flat.',
  },
  {
    lead: 'Flexibility:',
    body: 'test five directions in the time it took to brief one. Change the lighting, the talent, the location, the language — all in post, all without re-shooting. The only limit is imagination.',
  },
]

/* ===================================================================
   Highlight cards — 3 advantages.
   =================================================================== */
type Highlight = {
  n: string
  title: string
  desc: string
  Icon: LucideIcon
  accent: 'purple' | 'violet' | 'magenta'
}

const highlights: Highlight[] = [
  {
    n: '01',
    title: '10x Faster Delivery',
    desc: 'Brief to first cut in 48 hours. Full campaign asset sets in under a week. The calendar stops being the bottleneck.',
    Icon: Zap,
    accent: 'purple',
  },
  {
    n: '02',
    title: '100x Creative Variations',
    desc: 'One concept becomes a hundred variations — different talent, lighting, locations, languages — all from a single production run.',
    Icon: Sparkles,
    accent: 'magenta',
  },
  {
    n: '03',
    title: '0 Reshoots Ever',
    desc: 'Change the lighting, the talent, the location — all in post, all without re-shooting. The only limit is imagination.',
    Icon: Wand2,
    accent: 'violet',
  },
]

const ACCENT_HEX: Record<Highlight['accent'], string> = {
  purple: '#8B5CF6',
  violet: '#a78bfa',
  magenta: '#d946ef',
}

const ACCENT_RGB: Record<Highlight['accent'], string> = {
  purple: '139,92,246',
  violet: '167,139,250',
  magenta: '217,70,239',
}

/* ===================================================================
   TRADITIONAL side icons — Calendar/Clock/Users/Film.
   SYNTHETIC side icons — Sparkles/Wand2/Film/Zap.
   Pre-rounded positions for hydration safety.
   =================================================================== */
type SideIcon = {
  Icon: LucideIcon
  top: string
  delay: number
  dur: number
}

const TRADITIONAL_ICONS: SideIcon[] = [
  { Icon: Calendar, top: '14%', delay: 0, dur: 6 },
  { Icon: Clock, top: '36%', delay: 0.7, dur: 7 },
  { Icon: Users, top: '58%', delay: 1.4, dur: 6.5 },
  { Icon: Film, top: '80%', delay: 0.4, dur: 7.5 },
]

const SYNTHETIC_ICONS: SideIcon[] = [
  { Icon: Sparkles, top: '14%', delay: 0.2, dur: 7 },
  { Icon: Wand2, top: '36%', delay: 1.1, dur: 6.5 },
  { Icon: Film, top: '58%', delay: 0.5, dur: 7.5 },
  { Icon: Zap, top: '80%', delay: 1.8, dur: 6 },
]

/* ===================================================================
   ComparisonViz — interactive TRADITIONAL vs SYNTHETIC visualization.
   - LEFT TRADITIONAL column with fragmented red-tinted grid + 4 icons
     (Calendar/Clock/Users/Film).
   - RIGHT SYNTHETIC column with flowing purple gradient + 4 icons
     (Sparkles/Wand2/Film/Zap).
   - CENTER purple fusion zone where streams from both sides converge.
   - As scrollYProgress advances, TRADITIONAL side fades/dissolves
     while SYNTHETIC side intensifies (transformation).
   - Mouse-reactive parallax (useCursorParallax).
   =================================================================== */
function ComparisonViz({
  sx,
  sy,
  scrollYProgress,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
  scrollYProgress: MotionValue<number>
}) {
  // parallax: opposite directions for left vs right
  const leftX = useTransform(sx, [0, 1], [-18, 18])
  const leftY = useTransform(sy, [0, 1], [-14, 14])
  const rightX = useTransform(sx, [0, 1], [18, -18])
  const rightY = useTransform(sy, [0, 1], [-14, 14])
  const coreX = useTransform(sx, [0, 1], [-6, 6])
  const coreY = useTransform(sy, [0, 1], [-4, 4])

  // scroll-driven transformation:
  //   - traditional fades 1 → 0.25 as you scroll through [0.1, 0.6]
  //   - synthetic intensifies 0.4 → 1
  //   - streams converge (pathLength 0 → 1)
  //   - core scales up
  const tradOpacity = useTransform(scrollYProgress, [0.1, 0.6], [1, 0.3])
  const synthOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0.4, 1])
  const streamLen = useTransform(scrollYProgress, [0.1, 0.55], [0, 1])
  const coreOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0.35, 1])
  const coreScale = useTransform(scrollYProgress, [0.15, 0.55], [0.7, 1])

  // pre-compute stream path geometry (4 streams each side, converging to center 50,50)
  const leftStreams = [22, 36, 64, 78].map((yTop) => ({
    d: `M 14 ${yTop} Q 32 ${yTop}, 50 50`,
    yTop: Math.round(yTop * 1000) / 1000,
  }))
  const rightStreams = [22, 36, 64, 78].map((yTop) => ({
    d: `M 86 ${yTop} Q 68 ${yTop}, 50 50`,
    yTop: Math.round(yTop * 1000) / 1000,
  }))

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* === bg ambient blobs === */}
      {/* LEFT — red-tinted, slow pulse (TRADITIONAL = struggling) */}
      <motion.div
        style={{ opacity: tradOpacity }}
        className="absolute left-[12%] top-[20%] h-[34vw] w-[34vw] max-h-[400px] max-w-[400px] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.16), rgba(229,57,53,0.04) 50%, rgba(229,57,53,0) 75%)',
            filter: 'blur(34px)',
          }}
        />
      </motion.div>
      {/* RIGHT — purple-tinted, faster pulse (SYNTHETIC = alive) */}
      <motion.div
        style={{ opacity: synthOpacity }}
        className="absolute right-[12%] top-[20%] h-[34vw] w-[34vw] max-h-[400px] max-w-[400px] rounded-full"
      >
        <motion.div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.22), rgba(139,92,246,0.06) 50%, rgba(139,92,246,0) 75%)',
            filter: 'blur(34px)',
          }}
          animate={{ scale: [1, 1.18, 0.92, 1], rotate: [0, 8, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      {/* center ambient — biggest, slow pulse (purple fusion) */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[42vw] w-[42vw] max-h-[480px] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.24), rgba(139,92,246,0.07) 40%, rgba(139,92,246,0) 70%)',
          filter: 'blur(38px)',
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* === SVG convergence streams === */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="left-stream" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(229,57,53,0.7)" />
            <stop offset="50%" stopColor="rgba(229,57,53,0.5)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.85)" />
          </linearGradient>
          <linearGradient id="right-stream" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(217,70,239,0.7)" />
            <stop offset="50%" stopColor="rgba(167,139,250,0.7)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.85)" />
          </linearGradient>
        </defs>

        {/* left → center streams (red → purple as they near fusion core) */}
        {leftStreams.map((s, i) => (
          <motion.path
            key={`ls-${i}`}
            d={s.d}
            fill="none"
            stroke="url(#left-stream)"
            strokeWidth={0.34}
            strokeLinecap="round"
            style={{
              pathLength: streamLen,
              filter: 'drop-shadow(0 0 1.5px rgba(139,92,246,0.7))',
            }}
          />
        ))}
        {/* right → center streams (magenta → purple) */}
        {rightStreams.map((s, i) => (
          <motion.path
            key={`rs-${i}`}
            d={s.d}
            fill="none"
            stroke="url(#right-stream)"
            strokeWidth={0.34}
            strokeLinecap="round"
            style={{
              pathLength: streamLen,
              filter: 'drop-shadow(0 0 1.5px rgba(217,70,239,0.7))',
            }}
          />
        ))}
      </svg>

      {/* === LEFT TRADITIONAL column === */}
      <motion.div
        style={{ x: leftX, y: leftY, opacity: tradOpacity }}
        className="absolute left-[4%] top-1/2 hidden h-[70%] -translate-y-1/2 md:block lg:left-[6%]"
      >
        <div className="relative flex h-full flex-col justify-between py-4">
          {/* fragmented red-tinted grid behind icons (slow/expensive/limited) */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[260px] w-[160px] -translate-x-1/2 -translate-y-1/2 opacity-55"
            style={{
              backgroundImage:
                'linear-gradient(rgba(229,57,53,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(229,57,53,0.2) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
              maskImage:
                'radial-gradient(circle at center, black 30%, transparent 75%)',
              WebkitMaskImage:
                'radial-gradient(circle at center, black 30%, transparent 75%)',
            }}
          />
          {/* column label */}
          <span
            className="wn-eyebrow absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-semibold tracking-[0.35em] text-[#E53935]/70"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            TRADITIONAL
          </span>

          {/* floating icons */}
          {TRADITIONAL_ICONS.map((ic, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-xl border border-[#E53935]/35 bg-white/[0.06] backdrop-blur-md"
              style={{ top: ic.top }}
              animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
              transition={{
                duration: ic.dur,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: ic.delay,
              }}
            >
              <ic.Icon className="h-5 w-5 text-[#E53935]" />
            </motion.div>
          ))}

          {/* status chips (fragmented) */}
          <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {['slow', 'expensive', 'limited'].map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#E53935]/30 bg-[#E53935]/10 px-2 py-0.5 wn-eyebrow text-[8px] font-medium text-[#E53935]/85"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* === RIGHT SYNTHETIC column === */}
      <motion.div
        style={{ x: rightX, y: rightY, opacity: synthOpacity }}
        className="absolute right-[4%] top-1/2 hidden h-[70%] -translate-y-1/2 md:block lg:right-[6%]"
      >
        <div className="relative flex h-full flex-col justify-between py-4">
          {/* flowing purple gradient behind icons */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[260px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.22), rgba(139,92,246,0) 70%)',
              filter: 'blur(20px)',
            }}
            animate={{
              scale: [1, 1.2, 0.92, 1],
              rotate: [0, 12, -8, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* column label */}
          <span
            className="wn-eyebrow absolute -right-2 top-1/2 -translate-y-1/2 rotate-90 text-[10px] font-semibold tracking-[0.35em] text-[#a78bfa]/80"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            SYNTHETIC
          </span>

          {/* floating icons */}
          {SYNTHETIC_ICONS.map((ic, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-xl border border-[#8B5CF6]/40 bg-white/[0.06] backdrop-blur-md"
              style={{ top: ic.top }}
              animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
              transition={{
                duration: ic.dur,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: ic.delay,
              }}
            >
              <ic.Icon className="h-5 w-5 text-[#a78bfa]" />
            </motion.div>
          ))}

          {/* status chips (flowing) */}
          <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {['fast', 'scalable', 'limitless'].map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-2 py-0.5 wn-eyebrow text-[8px] font-medium text-[#a78bfa]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* === CENTER fusion core === */}
      <motion.div
        style={{ x: coreX, y: coreY, opacity: coreOpacity, scale: coreScale }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {/* outer glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.55), rgba(139,92,246,0.1) 50%, rgba(139,92,246,0) 75%)',
            filter: 'blur(14px)',
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* core bloom */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(196,181,253,0.85), rgba(139,92,246,0.5) 50%, rgba(139,92,246,0) 80%)',
            filter: 'blur(8px)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
        />
        {/* bright pinpoint center */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ filter: 'blur(1px)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* fusion label */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span
            className="wn-eyebrow text-[9px] font-bold tracking-[0.35em] text-[#a78bfa]"
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              textShadow: '0 0 14px rgba(167,139,250,0.9)',
            }}
          >
            SYNTHESIZE
          </span>
        </div>
      </motion.div>
    </div>
  )
}

/* ===================================================================
   HighlightCard — single glassmorphism advantage card.
   =================================================================== */
function HighlightCard({ h, index }: { h: Highlight; index: number }) {
  const { n, title, desc, Icon, accent } = h
  return (
    <motion.article
      data-cursor={title}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-[#8B5CF6]/50 sm:p-7"
    >
      {/* hover purple glow bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 120% at 0% 0%, rgba(${ACCENT_RGB[accent]},0.22), transparent 60%)`,
        }}
      />

      {/* top row: number + icon */}
      <div className="relative z-10 mb-5 flex items-center justify-between">
        <span
          className="text-2xl font-bold text-white/25"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {n}
        </span>
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/55 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white"
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      {/* title */}
      <h4
        className="relative z-10 text-xl font-semibold text-white sm:text-2xl"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        {title}
      </h4>

      {/* descriptor */}
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/55 sm:text-[15px]">
        {desc}
      </p>

      {/* bottom hairline accent that fills on hover */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{
          background: `linear-gradient(to right, ${ACCENT_HEX[accent]}, transparent)`,
        }}
      />
    </motion.article>
  )
}

/* ===================================================================
   SynthWhyAI — Section 7 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function SynthWhyAI() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  // mouse-reactive parallax for the comparison viz
  const { sx, sy, handlers } = useCursorParallax(60, 20)

  return (
    <div
      ref={sectionRef}
      onPointerMove={handlers.move}
      onPointerLeave={handlers.leave}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <PurpleStickyRail
          label="Why AI"
          caption="Advantage"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Comparison visualization — behind content, mouse-reactive */}
          <ComparisonViz sx={sx} sy={sy} scrollYProgress={scrollYProgress} />

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-16 max-w-3xl"
          >
            <PurpleEyebrow number="07" label="Why Brands Move to AI" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>The Future Is </MaskLine>
              <MaskLine delay={0.12}>
                <PurpleGradientText>Synthetic.</PurpleGradientText>
              </MaskLine>
            </h2>
          </motion.div>

          {/* Editorial paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mb-20 flex max-w-3xl flex-col gap-8"
          >
            {paragraphs.map((p, i) => (
              <div key={i} className="flex gap-5">
                <span
                  className="mt-1 shrink-0 text-sm font-bold text-[#8B5CF6]"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  ({String(i + 1).padStart(2, '0')})
                </span>
                <p className="text-lg leading-relaxed text-white/65 sm:text-xl">
                  <span className="font-semibold text-white">{p.lead} </span>
                  {p.body}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Highlight cards — 3 advantages */}
          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {highlights.map((h, i) => (
              <HighlightCard key={h.n} h={h} index={i} />
            ))}
          </div>

          {/* Bottom hairline divider */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-16 h-px w-full origin-left bg-gradient-to-r from-[#8B5CF6] via-[#8B5CF6]/40 to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
