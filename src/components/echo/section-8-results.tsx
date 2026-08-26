'use client'

/**
 * EchoResults — Section 8 of /the-echo-system
 *
 * PREMIUM METRICS — animated visibility dashboard + compounding growth
 * chart. Everything counts up, draws in, or fills on whileInView.
 *
 * Composition:
 *   - Eyebrow: (08) · Results (CyanEyebrow)
 *   - Headline: "Visibility" + "Compounds" ("Compounds" cyan gradient)
 *   - 6 metric tiles with SSR-safe COUNT-UP (useInView + framer-motion
 *     animate(), starts at 0):
 *       +340% Organic Visibility Growth · 1,200+ Keywords Ranking ·
 *       8.2M Monthly Organic Reach · 47% AI Answer Presence ·
 *       12x Content ROI · 92% Top-3 Authority Coverage
 *   - Each tile: glassmorphism card, large cyan gradient count-up
 *     number, label, mini ascending-bar visual, + delta badge.
 *   - Animated compounding-growth dashboard: large SVG area chart that
 *     "draws in" on scroll (pathLength 0→1 via useTransform on
 *     scrollYProgress), cyan gradient fill under the line. Gridlines +
 *     axis labels (Q1–Q8 on X, visibility index on Y) + milestone dots.
 *   - CyanAmbient + CyanEmberCanvas for atmosphere.
 *   - CyanStickyRail ("Results" / "Proof").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Pre-rounded SVG coords for hydration safety.
 */

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
  type MotionValue,
} from 'framer-motion'
import {
  BrainCircuit,
  Gauge,
  Globe,
  Search,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import {
  CyanAmbient,
  CyanEmberCanvas,
  CyanEyebrow,
  CyanGradientText,
  CyanStickyRail,
  MaskLine,
} from '@/components/echo/shared'

/* ===================================================================
   6 metrics — count-up targets + formatting.
   =================================================================== */
type Metric = {
  n: string
  Icon: LucideIcon
  value: number
  decimals: number
  prefix: string
  suffix: string
  // optional comma grouping for large integers
  useComma?: boolean
  label: string
  delta: string
  accent: 'cyan' | 'neon' | 'deep'
}

const metrics: Metric[] = [
  {
    n: '01',
    Icon: TrendingUp,
    value: 340,
    decimals: 0,
    prefix: '+',
    suffix: '%',
    label: 'Organic Visibility Growth',
    delta: '+3yr',
    accent: 'cyan',
  },
  {
    n: '02',
    Icon: Search,
    value: 1200,
    decimals: 0,
    prefix: '',
    suffix: '+',
    useComma: true,
    label: 'Keywords Ranking',
    delta: 'top 100',
    accent: 'neon',
  },
  {
    n: '03',
    Icon: Globe,
    value: 8.2,
    decimals: 1,
    prefix: '',
    suffix: 'M',
    label: 'Monthly Organic Reach',
    delta: '+18% MoM',
    accent: 'cyan',
  },
  {
    n: '04',
    Icon: BrainCircuit,
    value: 47,
    decimals: 0,
    prefix: '',
    suffix: '%',
    label: 'AI Answer Presence',
    delta: 'AEO',
    accent: 'neon',
  },
  {
    n: '05',
    Icon: Gauge,
    value: 12,
    decimals: 0,
    prefix: '',
    suffix: 'x',
    label: 'Content ROI',
    delta: 'vs paid',
    accent: 'deep',
  },
  {
    n: '06',
    Icon: TrendingUp,
    value: 92,
    decimals: 0,
    prefix: '',
    suffix: '%',
    label: 'Top-3 Authority Coverage',
    delta: 'pillar terms',
    accent: 'cyan',
  },
]

const ACCENT_HEX: Record<Metric['accent'], string> = {
  cyan: '#06B6D4',
  neon: '#67e8f9',
  deep: '#0e7490',
}

const ACCENT_RGB: Record<Metric['accent'], string> = {
  cyan: '6,182,212',
  neon: '103,232,249',
  deep: '14,116,144',
}

/* ===================================================================
   formatNumber — comma-grouping + fixed decimals.
   =================================================================== */
function formatNumber(v: number, decimals: number, useComma?: boolean) {
  const fixed = v.toFixed(decimals)
  if (!useComma) return fixed
  const [intPart, decPart] = fixed.split('.')
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart ? `${grouped}.${decPart}` : grouped
}

/* ===================================================================
   CountUp — SSR-safe count-up via framer-motion's animate().
   Starts at 0; only animates when scrolled into view.
   =================================================================== */
function CountUp({
  value,
  decimals,
  prefix,
  suffix,
  useComma,
  accent,
}: {
  value: number
  decimals: number
  prefix: string
  suffix: string
  useComma?: boolean
  accent: Metric['accent']
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(formatNumber(v, decimals, useComma)),
    })
    return () => controls.stop()
  }, [inView, value, decimals, useComma])

  return (
    <span
      ref={ref}
      style={{
        fontFamily: 'var(--font-display), sans-serif',
        background: `linear-gradient(135deg, #ffffff 0%, ${ACCENT_HEX[accent]} 100%)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: `drop-shadow(0 0 24px rgba(${ACCENT_RGB[accent]},0.4))`,
      }}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/* ===================================================================
   MetricTile — single metric card with count-up + ascending bars.
   =================================================================== */
function MetricTile({ m, index }: { m: Metric; index: number }) {
  const { n, Icon, value, decimals, prefix, suffix, useComma, label, delta, accent } = m
  // 5 ascending mini-bars per tile (pre-rounded)
  const bars = [0.32, 0.48, 0.62, 0.78, 0.96]
  const barGeoms = bars.map((h, i) => {
    const x = Math.round((4 + i * 6.4) * 1000) / 1000
    const w = 3.6
    const barH = Math.round(h * 18 * 1000) / 1000
    const y = Math.round((22 - barH) * 1000) / 1000
    return { x, w, y, barH, i }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[#06B6D4]/50 sm:p-6"
    >
      {/* hover glow bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, rgba(${ACCENT_RGB[accent]},0.2), transparent 60%)`,
        }}
      />

      {/* top row: number + icon + delta badge */}
      <div className="relative z-10 mb-5 flex items-center justify-between">
        <span
          className="text-xs font-bold text-white/30"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          ({n})
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-[#06B6D4]/40 bg-[#06B6D4]/10 px-2 py-0.5 wn-eyebrow text-[8px] font-semibold text-[#67e8f9]">
            {delta}
          </span>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]"
            style={{ color: ACCENT_HEX[accent] }}
          >
            <Icon className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* count-up number */}
      <div className="relative z-10 text-4xl font-bold leading-none sm:text-5xl">
        <CountUp
          value={value}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          useComma={useComma}
          accent={accent}
        />
      </div>

      {/* label */}
      <p className="relative z-10 mt-3 text-xs font-medium text-white/55 sm:text-[13px]">
        {label}
      </p>

      {/* ascending mini-bars */}
      <div className="relative z-10 mt-4 h-6">
        <svg
          viewBox="0 0 36 22"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id={`bar-${n}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT_HEX[accent]} stopOpacity="0.95" />
              <stop offset="100%" stopColor={ACCENT_HEX[accent]} stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {barGeoms.map((b) => (
            <motion.rect
              key={b.i}
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.barH}
              rx={0.4}
              fill={`url(#bar-${n})`}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.3 + b.i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: `${b.x + b.w / 2}px 22px` }}
            />
          ))}
        </svg>
      </div>
    </motion.div>
  )
}

/* ===================================================================
   GrowthDashboard — large SVG area chart that draws in on scroll.
   pathLength driven by useTransform(scrollYProgress, [0.1, 0.55], [0, 1]).
   Cyan gradient fill under the line.
   =================================================================== */

// 8 quarters of compounding visibility growth — pre-rounded.
const GROWTH_PTS = [
  { x: 0, y: 92 },
  { x: Math.round((100 / 7) * 1000) / 1000, y: 85 },
  { x: Math.round((200 / 7) * 1000) / 1000, y: 76 },
  { x: Math.round((300 / 7) * 1000) / 1000, y: 64 },
  { x: Math.round((400 / 7) * 1000) / 1000, y: 50 },
  { x: Math.round((500 / 7) * 1000) / 1000, y: 35 },
  { x: Math.round((600 / 7) * 1000) / 1000, y: 20 },
  { x: 100, y: 8 },
]

const GROWTH_LINE = GROWTH_PTS.map((p) => `${p.x},${p.y}`).join(' ')
const GROWTH_AREA = `0,100 ${GROWTH_LINE} 100,100`

// Milestone dots — 3 peaks along the path.
const MILESTONES = [GROWTH_PTS[2], GROWTH_PTS[5], GROWTH_PTS[7]]

function GrowthDashboard({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const pathLength = useTransform(scrollYProgress, [0.1, 0.55], [0, 1])
  const areaOpacity = useTransform(scrollYProgress, [0.2, 0.55], [0, 1])

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 80%, rgba(6,182,212,0.14), transparent 65%)',
        }}
      />

      {/* Header row */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div>
          <span className="wn-eyebrow text-[11px] font-medium text-[#06B6D4]">
            Visibility Index · 8 Quarters
          </span>
          <h3
            className="mt-2 text-2xl font-semibold text-white sm:text-3xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            The Compounding Curve
          </h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#06B6D4]/40 bg-[#06B6D4]/10 px-3 py-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-[#67e8f9]" />
          <span className="wn-eyebrow text-[10px] font-semibold text-[#67e8f9]">
            +340%
          </span>
        </div>
      </div>

      {/* The chart */}
      <div className="relative z-10 h-56 w-full sm:h-72">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="echo-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(103,232,249,0.55)" />
              <stop offset="50%" stopColor="rgba(6,182,212,0.22)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0)" />
            </linearGradient>
            <linearGradient id="echo-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0e7490" />
            </linearGradient>
          </defs>

          {/* horizontal gridlines */}
          {[20, 40, 60, 80].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={0.2}
              strokeDasharray="1 1"
            />
          ))}

          {/* area fill — fades in as the line draws */}
          <motion.polygon
            points={GROWTH_AREA}
            fill="url(#echo-area)"
            style={{ opacity: areaOpacity }}
          />

          {/* the ascending line — draws in on scroll */}
          <motion.polyline
            points={GROWTH_LINE}
            fill="none"
            stroke="url(#echo-line)"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength,
              filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.7))',
            }}
          />

          {/* milestone dots — appear after the line draws in */}
          {MILESTONES.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={1.4}
              fill="#fff"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.8 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.9))' }}
            />
          ))}
        </svg>

        {/* y-axis labels (left) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-col justify-between py-1">
          {['100', '75', '50', '25', '0'].map((label) => (
            <span
              key={label}
              className="wn-eyebrow text-[8px] font-medium text-white/35"
            >
              {label}
            </span>
          ))}
        </div>
        {/* x-axis labels (bottom) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-1">
          {['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'].map((label) => (
            <span
              key={label}
              className="wn-eyebrow text-[8px] font-medium text-white/35"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Footer caption strip */}
      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/8 pt-4">
        <span className="wn-eyebrow text-[9px] font-medium text-white/40">
          Each quarter compounds the previous — visibility is exponential,
          not linear.
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#67e8f9]" />
          <span className="wn-eyebrow text-[8px] font-medium text-white/45">
            Visibility Index
          </span>
        </span>
      </div>
    </motion.div>
  )
}

/* ===================================================================
   SurfaceBreakdown — horizontal bars showing visibility across
   discovery surfaces (organic, AI answers, knowledge graph, voice,
   discovery). Bars fill on whileInView.
   =================================================================== */
type Surface = { label: string; value: number; accent: Metric['accent'] }

const surfaces: Surface[] = [
  { label: 'Organic Search', value: 92, accent: 'cyan' },
  { label: 'AI Answer Engines', value: 47, accent: 'neon' },
  { label: 'Knowledge Graph', value: 68, accent: 'cyan' },
  { label: 'Voice & Conversational', value: 31, accent: 'neon' },
  { label: 'Discovery Platforms', value: 74, accent: 'deep' },
]

function SurfaceBreakdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="wn-eyebrow text-[11px] font-medium text-[#06B6D4]">
            Multi-Surface Presence
          </span>
          <h3
            className="mt-2 text-2xl font-semibold text-white sm:text-3xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Everywhere Discovery Happens
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {surfaces.map((s, i) => (
          <div key={s.label} className="flex items-center gap-4">
            <span className="w-44 shrink-0 text-xs font-medium text-white/55 sm:w-48">
              {s.label}
            </span>
            <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background:
                    s.accent === 'cyan'
                      ? 'linear-gradient(to right, #06B6D4, #67e8f9)'
                      : s.accent === 'neon'
                        ? 'linear-gradient(to right, #0e7490, #06B6D4)'
                        : 'linear-gradient(to right, #3B82F6, #06B6D4)',
                  boxShadow: `0 0 12px rgba(${ACCENT_RGB[s.accent]},0.5)`,
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${s.value}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
            <span
              className="w-10 shrink-0 text-right text-xs font-semibold"
              style={{ color: ACCENT_HEX[s.accent] }}
            >
              {s.value}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ===================================================================
   EchoResults — Section 8 named export.
   =================================================================== */
export function EchoResults() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <CyanStickyRail label="Results" caption="Proof" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Layered ambient + ember particles drifting upward */}
          <CyanAmbient />
          <CyanEmberCanvas count={32} />

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-14 max-w-3xl"
          >
            <CyanEyebrow number="08" label="Results" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Visibility </MaskLine>
              <MaskLine delay={0.12}>
                <CyanGradientText>Compounds</CyanGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Authority isn&apos;t a sprint — it&apos;s a curve. Every pillar
              published, every cluster interlinked, every answer cited
              compounds into{' '}
              <CyanGradientText glow={false}>
                visibility that accrues
              </CyanGradientText>{' '}
              across every surface your audience searches.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-4 text-[11px] uppercase tracking-[0.3em] text-white/30"
            >
              Illustrative metrics · representative engagements
            </motion.p>
          </motion.div>

          {/* 6 metric tiles */}
          <div className="relative z-10 mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {metrics.map((m, i) => (
              <MetricTile key={m.n} m={m} index={i} />
            ))}
          </div>

          {/* Growth dashboard + surface breakdown (2-col on lg) */}
          <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-7">
            <div className="lg:col-span-3">
              <GrowthDashboard scrollYProgress={scrollYProgress} />
            </div>
            <div className="lg:col-span-2">
              <SurfaceBreakdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
