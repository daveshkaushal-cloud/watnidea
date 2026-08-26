'use client'

/**
 * SynthAdvantage — Section 8 of /synthetic-cinema
 *
 * PREMIUM METRICS — animated comparison dashboard (Traditional vs
 * Synthetic), advantage gauges, weekly campaign velocity bars.
 * Everything counts up, draws in, or fills on whileInView.
 *
 * Composition:
 *   - Eyebrow: (08) · The Advantage (PurpleEyebrow)
 *   - Headline: "The Synthetic" + "Advantage." (purple gradient)
 *   - 4 big metric cards with COUNT-UP (useInView + framer-motion animate()):
 *       10x Faster Delivery · 95% Lower Production Cost · 100+ Variations
 *       Per Concept · 48hr Concept-to-Campaign — purple metrics.
 *   - Animated comparison dashboard: TWO lines — Traditional Production
 *     (red, slow/flat) vs Synthetic Cinema (purple, steeply ascending).
 *     Both draw in via pathLength 0→1 driven by useTransform on
 *     scrollYProgress. Purple gradient fill under the synthetic curve.
 *     Gridlines + axis labels + milestone dots at peaks.
 *   - Advantage gauges: 3 semi-circle progress arcs filling on
 *     whileInView (Time Saved, Cost Efficiency, Creative Scale).
 *   - Campaign velocity grid: 6 weekly bars (traditional vs synthetic
 *     side-by-side) growing on whileInView.
 *   - PurpleStickyRail ("Advantage" / "Metrics").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
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
  Clock,
  Gauge,
  Layers,
  Rocket,
  type LucideIcon,
} from 'lucide-react'
import {
  PurpleEyebrow,
  PurpleGradientText,
  PurpleStickyRail,
  MaskLine,
} from '@/components/synthetic/shared'

/* ===================================================================
   4 big metrics — count-up targets + formatting.
   =================================================================== */
type BigMetric = {
  n: string
  Icon: LucideIcon
  value: number
  decimals: number
  prefix: string
  suffix: string
  label: string
  accent: 'purple' | 'violet' | 'magenta'
}

const bigMetrics: BigMetric[] = [
  {
    n: '01',
    Icon: Clock,
    value: 10,
    decimals: 0,
    prefix: '',
    suffix: 'x',
    label: 'Faster Delivery',
    accent: 'purple',
  },
  {
    n: '02',
    Icon: Gauge,
    value: 95,
    decimals: 0,
    prefix: '',
    suffix: '%',
    label: 'Lower Production Cost',
    accent: 'violet',
  },
  {
    n: '03',
    Icon: Layers,
    value: 100,
    decimals: 0,
    prefix: '',
    suffix: '+',
    label: 'Variations Per Concept',
    accent: 'magenta',
  },
  {
    n: '04',
    Icon: Rocket,
    value: 48,
    decimals: 0,
    prefix: '',
    suffix: 'hr',
    label: 'Concept-to-Campaign',
    accent: 'purple',
  },
]

const ACCENT_HEX: Record<BigMetric['accent'], string> = {
  purple: '#8B5CF6',
  violet: '#a78bfa',
  magenta: '#d946ef',
}

const ACCENT_RGB: Record<BigMetric['accent'], string> = {
  purple: '139,92,246',
  violet: '167,139,250',
  magenta: '217,70,239',
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
  accent,
}: {
  value: number
  decimals: number
  prefix: string
  suffix: string
  accent: BigMetric['accent']
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, value, decimals])

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
   BigMetricCard — single large metric card with count-up + sparkline.
   =================================================================== */
function BigMetricCard({ m, index }: { m: BigMetric; index: number }) {
  const { n, Icon, value, decimals, prefix, suffix, label, accent } = m
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-[#8B5CF6]/50 sm:p-7"
    >
      {/* hover glow bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, rgba(${ACCENT_RGB[accent]},0.18), transparent 60%)`,
        }}
      />

      {/* top row: number + icon */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <span
          className="text-sm font-bold text-white/30"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          ({n})
        </span>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]"
          style={{ color: ACCENT_HEX[accent] }}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>

      {/* count-up number */}
      <div className="relative z-10 text-5xl font-bold leading-none sm:text-6xl">
        <CountUp
          value={value}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          accent={accent}
        />
      </div>

      {/* label */}
      <p className="relative z-10 mt-3 text-sm font-medium text-white/55">
        {label}
      </p>

      {/* bottom mini-sparkline that grows on view */}
      <div className="relative z-10 mt-5 h-6">
        <svg
          viewBox="0 0 100 24"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <motion.polyline
            points="0,20 18,16 32,18 48,10 64,14 78,6 100,2"
            fill="none"
            stroke={ACCENT_HEX[accent]}
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 4px rgba(${ACCENT_RGB[accent]},0.6))` }}
          />
        </svg>
      </div>
    </motion.div>
  )
}

/* ===================================================================
   ComparisonDashboard — large SVG chart with TWO lines:
   - Traditional Production: red, slow/flat (barely climbing)
   - Synthetic Cinema: purple, steeply ascending
   Both draw in via pathLength 0→1 driven by useTransform on
   scrollYProgress. Purple gradient fill under the synthetic curve.
   =================================================================== */

// Pre-compute TRADITIONAL line (12 points, slow flat climb).
const TRAD_PTS = Array.from({ length: 12 }, (_, i) => {
  const x = (i / 11) * 100
  // slow flat climb: 82 → 70 (only 12 units of climb across 12 steps)
  const base = 82 - (i / 11) * 12
  const wobble = Math.sin(i * 1.1) * 2
  const y = Math.max(8, Math.round((base + wobble) * 1000) / 1000)
  return { x: Math.round(x * 1000) / 1000, y }
})

// Pre-compute SYNTHETIC line (12 points, steeply ascending).
const SYNTH_PTS = Array.from({ length: 12 }, (_, i) => {
  const x = (i / 11) * 100
  // steep exponential-ish ascent: 86 → 10
  const t = i / 11
  const base = 86 - Math.pow(t, 1.4) * 76
  const wobble = Math.sin(i * 1.4) * 3
  const y = Math.max(8, Math.round((base + wobble) * 1000) / 1000)
  return { x: Math.round(x * 1000) / 1000, y }
})

const TRAD_LINE = TRAD_PTS.map((p) => `${p.x},${p.y}`).join(' ')
const SYNTH_LINE = SYNTH_PTS.map((p) => `${p.x},${p.y}`).join(' ')
const SYNTH_AREA = `0,100 ${SYNTH_LINE} 100,100`

// Milestone dots — 4 peaks along the synthetic path.
const MILESTONES = [SYNTH_PTS[3], SYNTH_PTS[6], SYNTH_PTS[9], SYNTH_PTS[11]]

function ComparisonDashboard({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  // pathLength 0→1 as the section scrolls through
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
            'radial-gradient(circle at 50% 80%, rgba(139,92,246,0.12), transparent 65%)',
        }}
      />

      {/* Header row */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div>
          <span className="wn-eyebrow text-[11px] font-medium text-[#8B5CF6]">
            Production Velocity · 12 Months
          </span>
          <h3
            className="mt-2 text-2xl font-semibold text-white sm:text-3xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            The Synthetic Curve
          </h3>
        </div>
        {/* legend */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-3 rounded-sm bg-[#E53935]/70" />
            <span className="wn-eyebrow text-[9px] font-medium text-white/55">
              Traditional
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-3 rounded-sm bg-[#8B5CF6]" />
            <span className="wn-eyebrow text-[9px] font-medium text-[#a78bfa]">
              Synthetic
            </span>
          </div>
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
            <linearGradient id="synth-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(167,139,250,0.5)" />
              <stop offset="50%" stopColor="rgba(139,92,246,0.22)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </linearGradient>
            <linearGradient id="synth-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
            <linearGradient id="trad-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(229,57,53,0.55)" />
              <stop offset="100%" stopColor="rgba(229,57,53,0.75)" />
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

          {/* synthetic area fill — fades in as the line draws */}
          <motion.polygon
            points={SYNTH_AREA}
            fill="url(#synth-area)"
            style={{ opacity: areaOpacity }}
          />

          {/* traditional line (red, flat) — draws in on scroll */}
          <motion.polyline
            points={TRAD_LINE}
            fill="none"
            stroke="url(#trad-line)"
            strokeWidth={0.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1.5 1"
            style={{ pathLength }}
          />

          {/* synthetic line (purple, ascending) — draws in on scroll */}
          <motion.polyline
            points={SYNTH_LINE}
            fill="none"
            stroke="url(#synth-line)"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength, filter: 'drop-shadow(0 0 4px rgba(139,92,246,0.7))' }}
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
              style={{ filter: 'drop-shadow(0 0 4px rgba(139,92,246,0.9))' }}
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
          {['M1', 'M3', 'M6', 'M9', 'M12'].map((label) => (
            <span
              key={label}
              className="wn-eyebrow text-[8px] font-medium text-white/35"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ===================================================================
   AdvantageGauge — semi-circle progress arc filling on whileInView.
   =================================================================== */
function AdvantageGauge({
  label,
  pct,
  accent,
  delay,
}: {
  label: string
  pct: number
  accent: BigMetric['accent']
  delay: number
}) {
  // semi-circle arc: r=40, from (10,50) to (90,50) over the top
  // arc length for semi = π * r = π * 40 ≈ 125.66
  const arcLen = Math.round(Math.PI * 40 * 1000) / 1000
  const offset = Math.round(arcLen * (1 - pct / 100) * 1000) / 1000

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl"
    >
      <div className="relative h-24 w-40">
        <svg viewBox="0 0 100 50" className="h-full w-full">
          {/* track */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={3}
            strokeLinecap="round"
          />
          {/* fill */}
          <motion.path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={ACCENT_HEX[accent]}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={arcLen}
            initial={{ strokeDashoffset: arcLen }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 6px rgba(${ACCENT_RGB[accent]},0.7))` }}
          />
        </svg>
        {/* center pct label */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span
            className="text-2xl font-bold"
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              color: ACCENT_HEX[accent],
            }}
          >
            {pct}%
          </span>
        </div>
      </div>
      <p className="mt-3 text-center text-xs font-medium text-white/55">
        {label}
      </p>
    </motion.div>
  )
}

/* ===================================================================
   VelocityBars — 6 weekly bars, each traditional vs synthetic
   side-by-side, growing on whileInView.
   =================================================================== */
type WeekBar = {
  label: string
  // traditional value (small)
  trad: number
  // synthetic value (large)
  synth: number
}

const VELOCITY_BARS: WeekBar[] = [
  { label: 'Week 1', trad: 18, synth: 32 },
  { label: 'Week 2', trad: 22, synth: 48 },
  { label: 'Week 3', trad: 20, synth: 65 },
  { label: 'Week 4', trad: 24, synth: 78 },
  { label: 'Week 5', trad: 22, synth: 88 },
  { label: 'Week 6', trad: 26, synth: 96 },
]

function VelocityBars() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="wn-eyebrow text-[11px] font-medium text-[#8B5CF6]">
            Weekly Campaign Velocity
          </span>
          <h3
            className="mt-2 text-2xl font-semibold text-white sm:text-3xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Traditional vs Synthetic
          </h3>
        </div>
        {/* legend */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-3 rounded-sm bg-[#E53935]/70" />
            <span className="wn-eyebrow text-[9px] font-medium text-white/55">
              Traditional
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-3 rounded-sm bg-[#8B5CF6]" />
            <span className="wn-eyebrow text-[9px] font-medium text-[#a78bfa]">
              Synthetic
            </span>
          </div>
        </div>
      </div>

      {/* Bars grid */}
      <div className="grid grid-cols-6 gap-3 sm:gap-4">
        {VELOCITY_BARS.map((b, i) => (
          <div key={b.label} className="flex flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end justify-center gap-1 sm:h-40 sm:gap-1.5">
              {/* traditional bar */}
              <motion.div
                className="w-2 rounded-t-sm sm:w-3"
                style={{
                  background: 'linear-gradient(to top, rgba(229,57,53,0.5), rgba(229,57,53,0.85))',
                  boxShadow: '0 0 8px rgba(229,57,53,0.3)',
                }}
                initial={{ height: 0 }}
                whileInView={{ height: `${b.trad}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.2 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
              {/* synthetic bar */}
              <motion.div
                className="w-2 rounded-t-sm sm:w-3"
                style={{
                  background: 'linear-gradient(to top, #8B5CF6, #a78bfa)',
                  boxShadow: '0 0 12px rgba(139,92,246,0.5)',
                }}
                initial={{ height: 0 }}
                whileInView={{ height: `${b.synth}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  delay: 0.3 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
            <span className="wn-eyebrow text-[9px] font-medium text-white/45">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ===================================================================
   SynthAdvantage — Section 8 named export.
   =================================================================== */
export function SynthAdvantage() {
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
        <PurpleStickyRail
          label="Advantage"
          caption="Metrics"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(139,92,246,0.16), rgba(139,92,246,0) 65%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="absolute bottom-[12%] right-[6%] h-[24vw] w-[24vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(217,70,239,0.12), rgba(217,70,239,0) 70%)',
                filter: 'blur(44px)',
              }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.4,
              }}
            />
          </div>

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-14 max-w-3xl"
          >
            <PurpleEyebrow number="08" label="The Advantage" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>The Synthetic </MaskLine>
              <MaskLine delay={0.12}>
                <PurpleGradientText>Advantage.</PurpleGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              What took a crew of forty and six weeks now takes a prompt and a
              day. Synthetic Cinema removes every production limit — turning{' '}
              <PurpleGradientText glow={false}>
                imagination into output
              </PurpleGradientText>{' '}
              at the speed of thought.
            </motion.p>
          </motion.div>

          {/* 4 big metric cards */}
          <div className="relative z-10 mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {bigMetrics.map((m, i) => (
              <BigMetricCard key={m.n} m={m} index={i} />
            ))}
          </div>

          {/* Comparison dashboard + Velocity bars (2-col on lg) */}
          <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-7">
            <div className="lg:col-span-3">
              <ComparisonDashboard scrollYProgress={scrollYProgress} />
            </div>
            <div className="lg:col-span-2">
              <VelocityBars />
            </div>
          </div>

          {/* Advantage gauges (3-up) */}
          <div className="relative z-10 mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
            <AdvantageGauge
              label="Time Saved"
              pct={90}
              accent="purple"
              delay={0}
            />
            <AdvantageGauge
              label="Cost Efficiency"
              pct={95}
              accent="violet"
              delay={0.15}
            />
            <AdvantageGauge
              label="Creative Scale"
              pct={98}
              accent="magenta"
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
