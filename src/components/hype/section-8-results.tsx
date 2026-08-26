'use client'

/**
 * HypeResults — Section 8 of /the-hype-engine
 *
 * PREMIUM METRICS — animated growth dashboard, momentum indicators,
 * performance bars, and community growth chart. Everything counts up,
 * draws in, or fills on whileInView.
 *
 * Composition:
 *   - Eyebrow: (08) · Results
 *   - Headline: "Momentum You" + "Can Measure." ("Can Measure." red gradient)
 *   - 4 big metric cards with COUNT-UP (useInView + framer-motion animate()):
 *       4.2M+ Reach Generated · 180K Engagements Driven ·
 *       3.1x Average Follower Growth · 12K+ UGC Posts Sparked
 *   - Animated growth dashboard: large SVG area chart that "draws in"
 *     on scroll (pathLength 0→1 via useTransform on scrollYProgress),
 *     red→orange gradient fill under the line. Milestone dots at peaks.
 *   - Momentum indicators: 3 semi-circle progress arcs filling on whileInView.
 *   - Performance grid: 6 campaign bars growing on whileInView.
 *   - Community growth chart: ascending polyline with milestone dots.
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
  Heart,
  MessageCircle,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from '@/components/about/shared'

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
  accent: 'red' | 'orange' | 'pink'
}

const bigMetrics: BigMetric[] = [
  {
    n: '01',
    Icon: TrendingUp,
    value: 4.2,
    decimals: 1,
    prefix: '',
    suffix: 'M+',
    label: 'Reach Generated',
    accent: 'red',
  },
  {
    n: '02',
    Icon: Heart,
    value: 180,
    decimals: 0,
    prefix: '',
    suffix: 'K',
    label: 'Engagements Driven',
    accent: 'orange',
  },
  {
    n: '03',
    Icon: Users,
    value: 3.1,
    decimals: 1,
    prefix: '',
    suffix: 'x',
    label: 'Average Follower Growth',
    accent: 'pink',
  },
  {
    n: '04',
    Icon: MessageCircle,
    value: 12,
    decimals: 0,
    prefix: '',
    suffix: 'K+',
    label: 'UGC Posts Sparked',
    accent: 'red',
  },
]

const ACCENT_HEX: Record<BigMetric['accent'], string> = {
  red: '#E53935',
  orange: '#F97316',
  pink: '#EC4899',
}

const ACCENT_RGB: Record<BigMetric['accent'], string> = {
  red: '229,57,53',
  orange: '249,115,22',
  pink: '236,72,153',
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
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-[#E53935]/50 sm:p-7"
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

      {/* bottom mini-sparkline accent that grows on view */}
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
   GrowthDashboard — large SVG area chart that draws in on scroll.
   pathLength driven by useTransform on scrollYProgress.
   =================================================================== */

// Pre-compute ascending growth polyline (12 points, climbing).
const GROWTH_PTS = Array.from({ length: 12 }, (_, i) => {
  const x = (i / 11) * 100
  // ascending with some natural volatility
  const base = 88 - (i / 11) * 76
  const wobble = Math.sin(i * 1.4) * 4
  const y = Math.max(8, Math.round((base + wobble) * 1000) / 1000)
  return { x: Math.round(x * 1000) / 1000, y }
})

const GROWTH_LINE = GROWTH_PTS.map((p) => `${p.x},${p.y}`).join(' ')
const GROWTH_AREA = `0,100 ${GROWTH_LINE} 100,100`

// Milestone dots — 4 peaks along the path.
const MILESTONES = [GROWTH_PTS[3], GROWTH_PTS[6], GROWTH_PTS[9], GROWTH_PTS[11]]

function GrowthDashboard({
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
      {/* hover/ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 80%, rgba(229,57,53,0.12), transparent 65%)',
        }}
      />

      {/* Header row */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div>
          <span className="wn-eyebrow text-[11px] font-medium text-[#E53935]">
            Community Growth · 12 Months
          </span>
          <h3
            className="mt-2 text-2xl font-semibold text-white sm:text-3xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            The Compounding Curve
          </h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#E53935]/40 bg-[#E53935]/10 px-3 py-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-[#ff6b63]" />
          <span className="wn-eyebrow text-[10px] font-semibold text-[#ff6b63]">
            +312%
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
            <linearGradient id="growth-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(229,57,53,0.5)" />
              <stop offset="50%" stopColor="rgba(249,115,22,0.2)" />
              <stop offset="100%" stopColor="rgba(229,57,53,0)" />
            </linearGradient>
            <linearGradient id="growth-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#E53935" />
              <stop offset="100%" stopColor="#EC4899" />
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
            fill="url(#growth-area)"
            style={{ opacity: areaOpacity }}
          />

          {/* the ascending line — draws in on scroll */}
          <motion.polyline
            points={GROWTH_LINE}
            fill="none"
            stroke="url(#growth-line)"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength, filter: 'drop-shadow(0 0 4px rgba(229,57,53,0.7))' }}
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
              style={{ filter: 'drop-shadow(0 0 4px rgba(229,57,53,0.9))' }}
            />
          ))}
        </svg>

        {/* y-axis labels (left) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-col justify-between py-1">
          {['100K', '75K', '50K', '25K', '0'].map((label) => (
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
   MomentumGauge — semi-circle progress arc filling on whileInView.
   =================================================================== */
function MomentumGauge({
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
  // strokeDasharray = 125.66, strokeDashoffset animates 125.66 → 125.66*(1-pct/100)
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
   PerformanceBars — 6 campaign bars growing on whileInView.
   =================================================================== */
const PERF_BARS = [
  { label: 'Launch Seq.', value: 92, accent: 'red' as const },
  { label: 'Culture Drop', value: 78, accent: 'orange' as const },
  { label: 'Tribe Moment', value: 86, accent: 'pink' as const },
  { label: 'Momentum Mo.', value: 95, accent: 'red' as const },
  { label: 'Echo Series', value: 64, accent: 'orange' as const },
  { label: 'Signal 02', value: 71, accent: 'pink' as const },
]

function PerformanceBars() {
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
          <span className="wn-eyebrow text-[11px] font-medium text-[#E53935]">
            Campaign Performance
          </span>
          <h3
            className="mt-2 text-2xl font-semibold text-white sm:text-3xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Drop By Drop
          </h3>
        </div>
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-4">
        {PERF_BARS.map((b, i) => (
          <div key={b.label} className="flex items-center gap-4">
            <span className="w-28 shrink-0 text-xs font-medium text-white/55">
              {b.label}
            </span>
            <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${ACCENT_HEX[b.accent]}, ${b.accent === 'red' ? '#ff6b63' : b.accent === 'orange' ? '#fbbf24' : '#f472b6'})`,
                  boxShadow: `0 0 12px rgba(${ACCENT_RGB[b.accent]},0.5)`,
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${b.value}%` }}
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
              style={{ color: ACCENT_HEX[b.accent] }}
            >
              {b.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ===================================================================
   HypeResults — Section 8 named export.
   =================================================================== */
export function HypeResults() {
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
        <StickyRail label="Results" caption="Momentum" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0) 65%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="absolute right-[6%] bottom-[10%] h-[26vw] w-[26vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(236,72,153,0.12), rgba(236,72,153,0) 70%)',
                filter: 'blur(44px)',
              }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            />
          </div>

          {/* Header block */}
          <motion.div style={{ y: headerY }} className="relative z-10 mb-14 max-w-3xl">
            <SectionEyebrow number="08" label="Results" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Momentum You </MaskLine>
              <MaskLine delay={0.12}>
                <RedGradientText>Can Measure.</RedGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Beyond vanity metrics. Every campaign leaves a measurable
              trace — reach that compounds, engagement that converts,
              communities that grow themselves.
            </motion.p>
          </motion.div>

          {/* 4 big metric cards */}
          <div className="relative z-10 mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {bigMetrics.map((m, i) => (
              <BigMetricCard key={m.n} m={m} index={i} />
            ))}
          </div>

          {/* Growth dashboard + Performance bars (2-col on lg) */}
          <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-7">
            <div className="lg:col-span-3">
              <GrowthDashboard scrollYProgress={scrollYProgress} />
            </div>
            <div className="lg:col-span-2">
              <PerformanceBars />
            </div>
          </div>

          {/* Momentum gauges (3-up) */}
          <div className="relative z-10 mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
            <MomentumGauge
              label="Engagement Rate"
              pct={87}
              accent="red"
              delay={0}
            />
            <MomentumGauge
              label="Sentiment Score"
              pct={94}
              accent="orange"
              delay={0.15}
            />
            <MomentumGauge
              label="Share Velocity"
              pct={76}
              accent="pink"
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
