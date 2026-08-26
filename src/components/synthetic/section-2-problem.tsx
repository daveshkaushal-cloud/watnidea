'use client'

/**
 * SynthProblem — Section 2 of /synthetic-cinema
 *
 * Sticky/pinned editorial storytelling. "Traditional Production
 * Breaks Down."
 *
 * Visual concept — broken → synthetic:
 *   As the user scrolls, a "traditional production" visualization
 *   transforms into an "AI-powered synthetic studio". Scattered,
 *   fragmented film-strip pieces, clapperboard icons, calendar/clock
 *   icons showing delays, red "BUDGET" / "DELAYED" / "CREW 40+"
 *   warning chips, and disconnected nodes resolve into a connected
 *   purple generation pipeline, floating scene frames forming, and a
 *   unified "GENERATING" dashboard.
 *
 * Sticky/pinned pattern: outer min-h-[200vh] + inner sticky top-0
 * h-screen + useScroll on the outer → useTransform drives the chaos →
 * order transformation (chaos opacity 1→0 + drift; order opacity 0→1
 * + scale).
 *
 * Red is used ONLY for the "broken/expensive/delayed" elements
 * (supporting accent); purple is the primary accent for the
 * synthetic/AI-powered state.
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
  AlertTriangle,
  CalendarClock,
  Clock,
  DollarSign,
  Film,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'
import {
  PurpleEyebrow,
  PurpleGradientText,
  MaskLine,
} from '@/components/synthetic/shared'

/* ===================================================================
   Comparison lines — three short-form honest truisms with animated
   purple strike-throughs. Non-hyperbolic: each row states a real
   acceleration AI enables under human direction.
   =================================================================== */
const comparison = [
  { left: 'Months', right: 'Days' },
  { left: 'Single concept', right: 'Many variations' },
  { left: 'One location', right: 'Many visualisations' },
]

function ComparisonLine({
  c,
  index,
}: {
  c: (typeof comparison)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-wrap items-baseline gap-x-2 border-b border-white/[0.06] py-3 text-lg sm:text-xl"
    >
      <span className="font-medium text-white">{c.left}</span>
      <span className="text-white/35">→</span>
      <span className="relative">
        <span className="font-semibold text-[#a78bfa]">{c.right}.</span>
        <motion.span
          aria-hidden
          className="absolute left-0 top-1/2 h-[1.5px] w-0 -translate-y-1/2"
          style={{
            background: 'linear-gradient(90deg, #d946ef, #8B5CF6)',
          }}
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{
            duration: 0.55,
            delay: 0.35 + index * 0.12,
            ease: 'easeOut',
          }}
        />
      </span>
    </motion.div>
  )
}

/* ===================================================================
   TraditionalProduction — the chaos state (fragmented film-strip
   pieces, clapperboard + calendar/clock icons showing delays, red
   warning chips, disconnected nodes). Fades + drifts out as scroll
   progresses (1 → 0).
   =================================================================== */
function TraditionalProduction({
  progress,
}: {
  progress: MotionValue<number>
}) {
  // chaos opacity 1 → 0 over [0.15, 0.55]
  const opacity = useTransform(progress, [0.15, 0.55], [1, 0])
  // drift the whole chaos slightly up + tilted
  const y = useTransform(progress, [0.15, 0.55], [0, -36])
  const rotate = useTransform(progress, [0.15, 0.55], [0, -6])
  const scale = useTransform(progress, [0.15, 0.55], [1, 0.9])

  // 6 scattered chaos nodes — pre-computed positions (rounded)
  const chaosNodes = [
    { x: 18, y: 22, Icon: AlertTriangle, label: 'CREW 40+' },
    { x: 62, y: 14, Icon: Clock, label: 'DELAYED' },
    { x: 78, y: 42, Icon: CalendarClock, label: 'OVERDUE' },
    { x: 14, y: 58, Icon: DollarSign, label: 'BUDGET' },
    { x: 48, y: 70, Icon: Users, label: 'CALL TIME' },
    { x: 82, y: 80, Icon: AlertTriangle, label: 'OVER BUDGET' },
  ]

  return (
    <motion.div
      style={{ opacity, y, rotate, scale }}
      className="absolute inset-0"
      aria-hidden
    >
      {/* fragmented film-strip pieces + jagged descending chart */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* jagged descending fragments (red-tinted = bleeding budget) */}
        <polyline
          points="10,32 22,40 34,28 46,52 58,38 70,62 82,48 92,72"
          fill="none"
          stroke="rgba(229,57,53,0.55)"
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 1.5px rgba(229,57,53,0.6))' }}
        />
        <polyline
          points="8,68 24,60 36,76 52,64 64,82 80,72 90,86"
          fill="none"
          stroke="rgba(229,57,53,0.35)"
          strokeWidth={0.6}
          strokeLinecap="round"
          strokeDasharray="1 1.5"
        />
        {/* fragmented film-strip outline (broken/dashed) */}
        <rect
          x="6"
          y="14"
          width="88"
          height="22"
          fill="none"
          stroke="rgba(229,57,53,0.25)"
          strokeWidth={0.4}
          strokeDasharray="1.5 1.5"
        />
        {/* sprocket holes (broken film) */}
        {Array.from({ length: 10 }, (_, i) => {
          const x = 9 + i * 9
          return (
            <rect
              key={`hole-${i}`}
              x={x}
              y="17"
              width="3"
              height="2.5"
              fill="rgba(229,57,53,0.18)"
            />
          )
        })}
      </svg>

      {/* scattered chaos nodes — disconnected, red-bordered */}
      {chaosNodes.map((n, i) => (
        <motion.div
          key={`chaos-${i}`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          animate={{
            x: [0, (i % 2 === 0 ? 1 : -1) * 6, 0],
            y: [0, (i % 2 === 0 ? -1 : 1) * 4, 0],
            rotate: [0, (i % 2 === 0 ? 1 : -1) * 4, 0],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E53935]/40 bg-[#E53935]/10"
            style={{ boxShadow: '0 0 14px rgba(229,57,53,0.25)' }}
          >
            <n.Icon className="h-4 w-4 text-[#ff6b63]" />
          </div>
          {/* warning chip label */}
          <span
            className="absolute left-1/2 top-[110%] -translate-x-1/2 whitespace-nowrap rounded-full border border-[#E53935]/40 bg-[#E53935]/10 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.1em] text-[#ff6b63]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {n.label}
          </span>
        </motion.div>
      ))}

      {/* leaking budget drips — red drops falling */}
      {[
        { l: '30%', t: '40%', d: 0 },
        { l: '55%', t: '30%', d: 0.8 },
        { l: '70%', t: '60%', d: 1.4 },
        { l: '40%', t: '70%', d: 0.4 },
      ].map((p, i) => (
        <motion.span
          key={`drip-${i}`}
          className="absolute h-2 w-2 rounded-full bg-[#E53935]"
          style={{
            left: p.l,
            top: p.t,
            boxShadow: '0 0 8px rgba(229,57,53,0.85)',
          }}
          animate={{ y: [0, 60, 60], opacity: [0.9, 0.9, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeIn',
            delay: p.d,
          }}
        />
      ))}

      {/* "TRADITIONAL" alert label */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-[#E53935]/45 bg-[#E53935]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6b63]"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        <TrendingDown className="h-3 w-3" />
        Traditional Limits
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   SyntheticStudio — the order state (connected purple generation
   pipeline, floating scene frames forming, unified GENERATING
   dashboard). Fades + scales in as scroll progresses (0 → 1).
   =================================================================== */
function SyntheticStudio({ progress }: { progress: MotionValue<number> }) {
  // order opacity 0 → 1 over [0.45, 0.85]
  const opacity = useTransform(progress, [0.45, 0.85], [0, 1])
  // scale 0.85 → 1
  const scale = useTransform(progress, [0.45, 0.85], [0.85, 1])
  const y = useTransform(progress, [0.45, 0.85], [40, 0])

  // 5 synthetic pipeline nodes — pre-computed positions on a horizontal
  // arc (rounded to avoid hydration mismatch)
  const pipeline = [
    { x: 12, y: 60 },
    { x: 31, y: 48 },
    { x: 50, y: 44 },
    { x: 69, y: 48 },
    { x: 88, y: 60 },
  ]

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0"
      aria-hidden
    >
      {/* connected purple pipeline — SVG pipes + flowing energy */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="synth-pipe-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(139,92,246,0.2)" />
            <stop offset="50%" stopColor="rgba(217,70,239,0.85)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.2)" />
          </linearGradient>
        </defs>
        {/* main pipeline path through all 5 nodes */}
        <motion.path
          d={`M ${pipeline[0].x} ${pipeline[0].y} Q ${pipeline[1].x} ${pipeline[1].y - 8} ${pipeline[2].x} ${pipeline[2].y} Q ${pipeline[3].x} ${pipeline[3].y - 8} ${pipeline[4].x} ${pipeline[4].y}`}
          fill="none"
          stroke="url(#synth-pipe-grad)"
          strokeWidth={0.9}
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 2px rgba(139,92,246,0.7))' }}
        />
        {/* ascending generation progress chart (scenes completed) */}
        <motion.polyline
          points="10,82 28,72 44,60 58,46 72,30 88,16"
          fill="none"
          stroke="rgba(217,70,239,0.95)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 3px rgba(217,70,239,0.8))' }}
        />
        <polygon
          points="10,82 28,72 44,60 58,46 72,30 88,16 88,82"
          fill="rgba(139,92,246,0.12)"
        />
        {/* floating scene frames forming (16:9 outlines filling in) */}
        {[
          { x: 14, y: 16, w: 12, h: 7, delay: 0 },
          { x: 44, y: 12, w: 16, h: 9, delay: 0.4 },
          { x: 70, y: 22, w: 14, h: 8, delay: 0.8 },
        ].map((f, i) => (
          <motion.rect
            key={`frame-${i}`}
            x={f.x}
            y={f.y}
            width={f.w}
            height={f.h}
            fill="rgba(139,92,246,0.06)"
            stroke="rgba(167,139,250,0.7)"
            strokeWidth={0.3}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: f.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: `${f.x + f.w / 2}px ${f.y + f.h / 2}px` }}
          />
        ))}
      </svg>

      {/* 5 synthetic pipeline nodes — connected, purple-bordered */}
      {pipeline.map((n, i) => (
        <motion.div
          key={`pipe-${i}`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#8B5CF6]/45 bg-[#8B5CF6]/10 backdrop-blur-xl"
            style={{ boxShadow: '0 0 18px rgba(139,92,246,0.4)' }}
          >
            <span
              className="text-[10px] font-bold text-[#a78bfa]"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              0{i + 1}
            </span>
          </div>
        </motion.div>
      ))}

      {/* "GENERATING" success label */}
      <motion.div
        className="absolute left-1/2 top-[18%] flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#8B5CF6]/55 bg-[#8B5CF6]/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a78bfa]"
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        <Sparkles className="h-3 w-3" />
        Generating
        {/* tiny pulsing live dot */}
        <motion.span
          className="ml-1 h-1.5 w-1.5 rounded-full bg-[#d946ef]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 6px rgba(217,70,239,0.95)' }}
        />
      </motion.div>

      {/* small "AI-powered" floating chip bottom-right */}
      <motion.div
        className="absolute bottom-[8%] right-[6%] flex items-center gap-1.5 rounded-full border border-[#a78bfa]/40 bg-[#8B5CF6]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#a78bfa]"
        animate={{ opacity: [0.6, 1, 0.6], y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        <Film className="h-3 w-3" />
        AI-Powered
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   SynthProblem — Section 2 named export
 *   =================================================================== */
export function SynthProblem() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // header parallax + fade
  const headerY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -40, -120])
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [1, 1, 0.3]
  )

  // local ambient purple glow intensifies with scroll
  const ambientOpacity = useTransform(scrollYProgress, [0, 0.7], [0.3, 0.95])

  // emergence caption (after transformation)
  const emergenceOpacity = useTransform(scrollYProgress, [0.65, 0.9], [0, 1])

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[200vh] border-t border-white/5 bg-[#141414]"
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Local ambient glow (purple center) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.22), rgba(139,92,246,0) 65%)',
            filter: 'blur(40px)',
            opacity: ambientOpacity,
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Secondary magenta blob, lower-right */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[10%] right-[6%] h-[28vw] w-[28vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(217,70,239,0.2), rgba(217,70,239,0) 70%)',
            filter: 'blur(46px)',
            opacity: ambientOpacity,
          }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        {/* Touch of red ambient, upper-left (supporting accent only) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-[4%] top-[12%] h-[22vw] w-[22vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.13), rgba(229,57,53,0) 70%)',
            filter: 'blur(50px)',
            opacity: ambientOpacity,
          }}
          animate={{ scale: [1, 1.18, 1] }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6,
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------- LEFT: editorial copy ---------- */}
          <motion.div style={{ y: headerY, opacity: headerOpacity }}>
            <PurpleEyebrow number="02" label="The Problem" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>
                <span className="text-white">Traditional Production</span>
              </MaskLine>
              <MaskLine delay={0.12}>
                <PurpleGradientText>Breaks Down.</PurpleGradientText>
              </MaskLine>
            </h2>

            {/* Body copy — fitting the theme */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
            >
              Traditional production is slow and expensive. Large crews,
              location costs, weather delays, talent schedules,
              post-production bottlenecks. Every shoot is a gamble — every
              change a budget line.{' '}
              <span className="font-semibold text-white">
                Synthetic Cinema uses AI to accelerate concepting,
                variations and visualisation.
              </span>{' '}
              It does not replace human creative direction, editing or
              commercial-rights review — it speeds up the parts that benefit
              from speed, so direction time goes further.
            </motion.p>

            {/* Comparison lines */}
            <div className="mt-8 max-w-xl">
              {comparison.map((c, i) => (
                <ComparisonLine key={c.left} c={c} index={i} />
              ))}

              {/* Pivot statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 border-l-2 border-[#8B5CF6] pl-5"
              >
                <p className="text-xl font-medium leading-snug text-white sm:text-2xl">
                  Entering a{' '}
                  <span className="text-[#a78bfa]">future-first</span> creative
                  production studio.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* ---------- RIGHT: traditional → synthetic transformation ---------- */}
          <div className="relative flex min-h-[60vh] flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-5 flex items-center justify-between"
            >
              <span className="wn-eyebrow text-[11px] font-medium text-white/50">
                Traditional → Synthetic
              </span>
              <span className="text-xs text-white/30">scroll to transform</span>
            </motion.div>

            {/* Transformation stage — traditional + synthetic overlaid */}
            <div className="relative h-[60vh] min-h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A]/80">
              <TraditionalProduction progress={scrollYProgress} />
              <SyntheticStudio progress={scrollYProgress} />

              {/* corner labels */}
              <div className="pointer-events-none absolute left-4 top-4 wn-eyebrow text-[10px] text-white/45">
                The Synthetic Studio
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 text-[10px] text-white/30">
                Idea → Generate → Motion → Campaign
              </div>
            </div>

            {/* Emergence caption */}
            <motion.p
              style={{ opacity: emergenceOpacity }}
              className="mt-6 text-center text-xs text-white/45 sm:text-left"
            >
              Constraints soften into a directed workflow.{' '}
              <span className="text-white/55">
                AI drafts, humans direct, edit and clear rights.
              </span>
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}
