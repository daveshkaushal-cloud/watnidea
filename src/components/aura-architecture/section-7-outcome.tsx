'use client'

/**
 * AuraOutcome — Section 7 of the /aura-architecture page.
 *
 * The Outcome — large editorial section: before vs after perception,
 * animated count-up metrics, identity evolution timeline, closing kicker.
 *
 * Composition:
 *   - StickyRail (lg+): label `The Outcome`, caption `Transformation`
 *   - SectionEyebrow `(07) The Outcome`
 *   - 4-line headline: `Identity with` / `Soul.` / `Strategy with` / `Teeth.`
 *     ("Soul." + "Teeth." red gradient — verbatim brand tagline)
 *   - Manifesto body (verbatim, curly apostrophe)
 *   - Before vs After perception — two-column comparison:
 *       LEFT (Before): muted/grey, `Forgettable.` headline (struck through),
 *         4 muted bullets (`Identical to competitors` / `No clear
 *         positioning` / `Invisible in the market` / `Random visuals, no
 *         system`)
 *       RIGHT (After): vibrant/red, `Unforgettable.` headline (red gradient),
 *         4 bullets with red check icons (verbatim fragments: `Stands out
 *         with purpose and clarity` / `A powerful identity` / `Impossible to
 *         ignore` / `A living brand system`)
 *       Center divider with a pulsing red morphing arrow `→`.
 *   - Animated metrics (4 stats, count-up on scroll-in):
 *       40+ / brands scaled in 2024
 *       ▲ 218% / ROAS
 *       7 / services, one identity engine
 *       Q3 2025 / booking window
 *   - Identity evolution visual — horizontal 3-stage timeline:
 *       Stage 1: scattered/grey mark (Chaos)
 *       Stage 2: organized/grey mark (Clarity)
 *       Stage 3: glowing red identity mark (Identity)
 *       Scroll-driven transforms (parallax depth, the marks transform as you scroll).
 *   - Closing kicker: `A movement.` / `Not an agency.`
 *     ("movement." red gradient, "Not an agency." white — verbatim from
 *     about/section-9-final-manifesto)
 *
 * Rules of Hooks: per-item motion values are extracted into sub-components
 * (StatItem, EvolutionStage). All section-level hooks at the top, unconditional.
 */

import { useRef, useState, useEffect, type ReactElement } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from '@/components/about/shared'

/* ===================================================================
   Manifesto (verbatim, curly apostrophe).
   =================================================================== */
const manifesto =
  'We don\u2019t just build brands. We engineer attention, create unforgettable experiences, and design growth systems that turn businesses into category leaders.'

/* ===================================================================
   Before / After content.
   "Before" bullets are illustrative (muted/grey).
   "After" bullets use verbatim fragments lifted from the Aura desc +
   the manifesto.
   =================================================================== */
const beforeBullets = [
  'Identical to competitors',
  'No clear positioning',
  'Invisible in the market',
  'Random visuals, no system',
]

const afterBullets = [
  'Stands out with purpose and clarity',
  'A powerful identity',
  'Impossible to ignore',
  'A living brand system',
]

/* ===================================================================
   Stats — honest, verified studio facts. No invented performance
   metrics, no "40+ brands scaled", no "218% ROAS", no "Q3 2025".
   Values render directly in the HTML (count-up only on verified
   whole numbers, never on fabricated outcomes).
   =================================================================== */
type Stat = {
  prefix?: string
  target: number | null
  suffix?: string
  staticLabel?: string
  label: string
}

const stats: Stat[] = [
  { target: 7, label: 'specialist services' },
  { target: 1, label: 'unified creative team' },
  { target: null, staticLabel: 'Now', label: 'accepting selected projects' },
  { target: null, staticLabel: 'Honest', label: 'proof, not vanity metrics' },
]

/* ===================================================================
   useCountUp — easeOutCubic, animates 0 → target when `inView` flips true.
   (Copied from about/section-8-why-clients — exact pattern reuse.)
   =================================================================== */
function useCountUp(target: number, inView: boolean, duration = 1.5) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  return val
}

/* ===================================================================
   StatItem — single stat with count-up animation.
   onViewportEnter flips inView; useCountUp runs to target.
   =================================================================== */
function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const value = useCountUp(stat.target ?? 0, inView, 1.6)

  const display =
    stat.target === null
      ? (stat.staticLabel ?? '')
      : `${stat.prefix ?? ''}${value}${stat.suffix ?? ''}`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => setInView(true)}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex flex-col items-center text-center"
    >
      <span
        className="text-5xl font-bold leading-none sm:text-6xl"
        style={{
          fontFamily: 'var(--font-display), sans-serif',
          background:
            'linear-gradient(to bottom right, #ffffff, #b8b8b8 60%, #8a8a8a)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {display}
      </span>
      <span className="wn-eyebrow mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 sm:text-[11px]">
        {stat.label}
      </span>
      <span
        aria-hidden
        className="mt-4 h-px w-10 bg-gradient-to-r from-transparent via-[#E53935]/60 to-transparent"
      />
    </motion.div>
  )
}

/* ===================================================================
   EvolutionStage — single stage in the identity evolution timeline.
   `progress` is a MotionValue (0..1 across the timeline section) — used
   to drive the stage's mark opacity/scale (chaos → clarity → identity).
   Hooks at the top (unconditional).
   =================================================================== */
type Stage = {
  n: string
  label: string
  /** active range of `progress` for this stage (start, end). */
  range: [number, number]
  Visual: () => ReactElement
}

function EvolutionStage({
  stage,
  progress,
  index,
}: {
  stage: Stage
  progress: MotionValue<number>
  index: number
}) {
  // For each stage, opacity peaks within its `range`, fades outside it.
  const [a, b] = stage.range
  const opacity = useTransform(progress, [a - 0.15, a, b, b + 0.15], [0.3, 1, 1, 0.3])
  const scale = useTransform(progress, [a - 0.15, a, b, b + 0.15], [0.88, 1, 1, 0.92])
  // stage number color: red when active, grey otherwise.
  const numColor = useTransform(
    progress,
    [a - 0.1, (a + b) / 2, b + 0.1],
    ['rgba(255,255,255,0.25)', '#E53935', 'rgba(255,255,255,0.25)']
  )
  const labelColor = useTransform(
    progress,
    [a - 0.1, (a + b) / 2, b + 0.1],
    ['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.35)']
  )

  const { Visual } = stage

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex flex-1 flex-col items-center text-center"
    >
      {/* stage number */}
      <motion.span
        style={{
          color: numColor,
          fontFamily: 'var(--font-display), sans-serif',
        }}
        className="mb-3 text-2xl font-bold sm:text-3xl"
      >
        {stage.n}
      </motion.span>
      {/* visual */}
      <motion.div
        style={{ opacity, scale }}
        className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl border border-white/10 bg-black/40"
      >
        <Visual />
      </motion.div>
      {/* label */}
      <motion.span
        style={{
          color: labelColor,
          fontFamily: 'var(--font-display), sans-serif',
        }}
        className="wn-eyebrow mt-4 text-[10px] font-medium uppercase tracking-[0.22em] sm:text-[11px]"
      >
        {stage.label}
      </motion.span>
    </motion.div>
  )
}

/* 3 stage visuals — chaos → clarity → identity. */

function ChaosVisual() {
  // scattered grey dots, jittering
  const dots = [
    { x: 18, y: 22 },
    { x: 72, y: 16 },
    { x: 42, y: 40 },
    { x: 22, y: 70 },
    { x: 78, y: 64 },
    { x: 56, y: 80 },
    { x: 30, y: 50 },
    { x: 64, y: 38 },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-2 rounded-full bg-white/30"
          style={{ left: `${d.x}%`, top: `${d.y}%` }}
          animate={{
            x: [0, (Math.sin(i) * 6) - 3, 0],
            y: [0, (Math.cos(i) * 6) - 3, 0],
            opacity: [0.3, 0.55, 0.3],
          }}
          transition={{
            duration: 2 + (i % 4) * 0.4,
            delay: i * 0.15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function ClarityVisual() {
  // organized grid of grey dots
  const cols = 4
  const rows = 4
  const dots: { x: number; y: number }[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({
        x: 22 + c * 18,
        y: 22 + r * 18,
      })
    }
  }
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {dots.map((d, i) =>
          dots.slice(i + 1).map((d2, j) => {
            const dist = Math.hypot(d.x - d2.x, d.y - d2.y)
            if (dist > 25) return null
            return (
              <line
                key={`${i}-${j}`}
                x1={d.x}
                y1={d.y}
                x2={d2.x}
                y2={d2.y}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.3"
              />
            )
          })
        )}
      </svg>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55"
          style={{ left: `${d.x}%`, top: `${d.y}%` }}
          animate={{ opacity: [0.45, 0.85, 0.45] }}
          transition={{
            duration: 2.5,
            delay: i * 0.06,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function IdentityVisual() {
  // glowing red morphing identity mark + dashed orbit + pulsing core
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.22), transparent 65%)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2"
        animate={{
          borderRadius: ['24%', '50%', '46%', '50%', '24%'],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          border: '1px solid rgba(229,57,53,0.6)',
          background:
            'radial-gradient(circle, rgba(229,57,53,0.22), transparent 72%)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{ border: '1px dashed rgba(255,255,255,0.2)' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow:
            '0 0 22px rgba(229,57,53,0.95), 0 0 50px rgba(229,57,53,0.5)',
        }}
      />
    </div>
  )
}

const evolutionStages: Stage[] = [
  { n: '01', label: 'Chaos', range: [0.1, 0.35], Visual: ChaosVisual },
  { n: '02', label: 'Clarity', range: [0.4, 0.65], Visual: ClarityVisual },
  { n: '03', label: 'Identity', range: [0.7, 0.95], Visual: IdentityVisual },
]

/* ===================================================================
   AuraOutcome — Section 7 default export.
   =================================================================== */
export default function AuraOutcome() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])
  // parallax depth — left column (Before) drifts down faster than right
  const beforeY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const afterY = useTransform(scrollYProgress, [0, 1], [-20, 30])

  // identity evolution timeline container ref + its own scrollYProgress
  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineProgress = useTransform(scrollYProgress, (v) => v)

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#050505]"
    >
      <div className="lg:flex">
        <StickyRail
          label="The Outcome"
          caption="Transformation"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Header block */}
          <motion.div style={{ y: headerY }} className="mb-16 max-w-3xl">
            <SectionEyebrow number="07" label="The Outcome" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Identity with</MaskLine>
              <MaskLine delay={0.1}>
                <RedGradientText>Soul.</RedGradientText>
              </MaskLine>
              <MaskLine delay={0.2}>Strategy with</MaskLine>
              <MaskLine delay={0.3}>
                <RedGradientText>Teeth.</RedGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              {manifesto}
            </motion.p>
          </motion.div>

          {/* ===== Before vs After perception ===== */}
          <div className="relative mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
            {/* LEFT: Before */}
            <motion.div
              style={{ y: beforeY }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl border border-white/8 bg-white/[0.02] p-7 backdrop-blur-md sm:p-9"
            >
              <span className="wn-eyebrow text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Before
              </span>
              <h3
                className="mt-4 text-4xl font-bold leading-none tracking-[-0.02em] text-white/40 line-through decoration-[#E53935]/40 decoration-2 sm:text-5xl"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                Forgettable.
              </h3>
              <ul className="mt-7 space-y-3">
                {beforeBullets.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-start gap-3 text-sm text-white/40 sm:text-base"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1 w-3 shrink-0 rounded-full bg-white/20"
                    />
                    <span className="line-through decoration-white/15">{b}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CENTER: morphing arrow divider */}
            <div className="flex items-center justify-center lg:py-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E53935]/50 bg-[#E53935]/10 backdrop-blur-md"
                style={{
                  boxShadow:
                    '0 0 24px rgba(229,57,53,0.4), inset 0 0 14px rgba(229,57,53,0.18)',
                }}
              >
                <motion.span
                  animate={{ x: [-2, 4, -2] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowRight
                    className="h-6 w-6 text-[#ff6b63]"
                    strokeWidth={2.5}
                  />
                </motion.span>
              </motion.div>
            </div>

            {/* RIGHT: After */}
            <motion.div
              style={{ y: afterY }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl border border-[#E53935]/40 bg-[#E53935]/[0.05] p-7 backdrop-blur-md sm:p-9"
            >
              {/* corner glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-1/4 -top-1/4 h-3/4 w-3/4 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(229,57,53,0.3), transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
              <span className="wn-eyebrow relative z-10 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E53935]">
                After
              </span>
              <h3
                className="relative z-10 mt-4 text-4xl font-bold leading-none tracking-[-0.02em] sm:text-5xl"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                <RedGradientText>Unforgettable.</RedGradientText>
              </h3>
              <ul className="relative z-10 mt-7 space-y-3">
                {afterBullets.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.35 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-start gap-3 text-sm text-white/85 sm:text-base"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E53935]/25"
                    >
                      <Check
                        className="h-3 w-3 text-[#E53935]"
                        strokeWidth={3}
                      />
                    </span>
                    <span>{b}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ===== Animated metrics ===== */}
          <div className="mt-24 grid grid-cols-2 gap-8 border-y border-white/8 py-12 sm:py-14 lg:grid-cols-4 lg:gap-6">
            {stats.map((s, i) => (
              <StatItem key={s.label} stat={s} index={i} />
            ))}
          </div>

          {/* ===== Identity evolution timeline ===== */}
          <motion.div
            ref={timelineRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="mt-24"
          >
            <div className="mb-10 text-center">
              <span className="wn-eyebrow text-[10px] font-medium uppercase tracking-[0.22em] text-[#E53935]">
                Identity Evolution
              </span>
              <h3
                className="mt-3 text-2xl font-bold tracking-[-0.01em] text-white sm:text-3xl"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                From chaos to identity.
              </h3>
            </div>

            <div className="relative">
              {/* horizontal connecting line behind the stages */}
              <div
                aria-hidden
                className="absolute left-1/2 top-[calc(40px+0.75rem)] hidden h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-white/10 via-[#E53935]/40 to-white/10 md:block"
              />
              <motion.div
                aria-hidden
                style={{ scaleX: timelineProgress, transformOrigin: 'left' }}
                className="absolute left-[10%] top-[calc(40px+0.75rem)] hidden h-px w-[80%] bg-gradient-to-r from-[#E53935] to-[#ff6b63] md:block"
              />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
                {evolutionStages.map((s, i) => (
                  <EvolutionStage
                    key={s.n}
                    stage={s}
                    progress={scrollYProgress}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ===== Closing kicker ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-24 text-center"
          >
            <h3
              className="text-3xl font-bold leading-[0.95] tracking-[-0.01em] sm:text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>
                A <RedGradientText>movement.</RedGradientText>
              </MaskLine>
              <MaskLine delay={0.12}>
                <span className="text-white">Not an agency.</span>
              </MaskLine>
            </h3>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
