'use client'

/**
 * EchoProblem — Section 2 of /the-echo-system
 *
 * Sticky/pinned editorial storytelling. "Why Great Brands Stay Invisible."
 *
 * Visual concept — invisible → connected:
 *   As the user scrolls, a dark, disconnected "search darkness" resolves
 *   into a lit-up, connected content ecosystem. Scattered, dim content
 *   fragments drift in darkness; search-query ghosts pass by without
 *   landing; then cyan connections form, nodes light up, content
 *   surfaces everywhere — visibility compounds.
 *
 * Four editorial stages (left column), each fading in/out at scroll
 * thresholds:
 *   01 "Great content. Zero visibility."
 *   02 "Disconnected content pieces."
 *   03 "Missed discovery moments."
 *   04 "Then visibility connects."
 *
 * Right column: a single broken → connected transformation visualization
 * driven by useScroll + useTransform.
 *
 * Red is used ONLY for the "lost / wasted / ghosted" elements (subtle
 * supporting accent); cyan is the primary accent for the connected
 * visibility state.
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
import { EyeOff, Link2, Search, Sparkles } from 'lucide-react'
import {
  CyanEyebrow,
  CyanGradientText,
  CyanStickyRail,
  CyanAmbient,
  CyanEmberCanvas,
  MaskLine,
} from '@/components/echo/shared'

/* ===================================================================
   Comparison lines — three short-form truisms with animated cyan
   strike-throughs.
   =================================================================== */
const comparison = [
  { left: 'Content', right: 'Visibility' },
  { left: 'Keywords', right: 'Discoverability' },
  { left: 'Traffic', right: 'Authority' },
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
      <span className="text-white/35">≠</span>
      <span className="relative text-white/35">
        {c.right}.
        <motion.span
          aria-hidden
          className="absolute left-0 top-1/2 h-[1.5px] w-0 -translate-y-1/2"
          style={{
            background: 'linear-gradient(90deg, #67e8f9, #06B6D4)',
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
   Stages — editorial copy for the 4 scroll-driven statements.
   =================================================================== */
const stageCopy = [
  {
    n: '01',
    title: 'Great content. Zero visibility.',
    body: 'You ship articles, pages, and posts. They sit in the dark — indexed but invisible. Search engines don\u2019t surface them. AI doesn\u2019t cite them. Your audience never sees them.',
  },
  {
    n: '02',
    title: 'Disconnected content pieces.',
    body: 'Each asset lives in isolation. No topic clusters. No internal authority. No knowledge graph. One page can\u2019t strengthen another because nothing links, nothing compounds, nothing echoes.',
  },
  {
    n: '03',
    title: 'Missed discovery moments.',
    body: 'Every minute, your audience searches, asks, and compares. Your brand isn\u2019t there. The query ghosts pass by without landing. The intent never reaches you.',
  },
  {
    n: '04',
    title: 'Then visibility connects.',
    body: 'We connect every node. Content links to content. Authority flows through clusters. Search, AI, and discovery engines surface you everywhere — and visibility starts to compound.',
  },
]

/* ===================================================================
   StageStatement — single stage statement, fades in/out at its scroll
   threshold range.
   =================================================================== */
function StageStatement({
  stage,
  index,
  progress,
}: {
  stage: (typeof stageCopy)[number]
  index: number
  progress: MotionValue<number>
}) {
  // Each stage is "active" over a 0.25-wide window centered on its threshold.
  const thresholds = [0.12, 0.32, 0.52, 0.78]
  const t = thresholds[index]
  const opacity = useTransform(progress, [t - 0.1, t, t + 0.08, t + 0.18], [0, 1, 1, 0])
  const y = useTransform(progress, [t - 0.1, t, t + 0.18], [16, 0, -16])

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col gap-4"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span
          className="text-2xl font-bold text-[#06B6D4]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {stage.n}
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-[#06B6D4]/60 to-transparent" />
      </div>
      <h3
        className="text-2xl font-bold leading-tight tracking-[-0.01em] text-white sm:text-3xl md:text-4xl"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        {stage.title}
      </h3>
      <p className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
        {stage.body}
      </p>
    </motion.div>
  )
}

/* ===================================================================
   InvisibleSystem — the darkness state (scattered dim fragments,
   passing query ghosts). Fades + drifts out as scroll progresses
   (1 → 0).
   =================================================================== */
function InvisibleSystem({ progress }: { progress: MotionValue<number> }) {
  // darkness opacity 1 → 0 over [0.15, 0.6]
  const opacity = useTransform(progress, [0.15, 0.6], [1, 0])
  const y = useTransform(progress, [0.15, 0.6], [0, -36])
  const rotate = useTransform(progress, [0.15, 0.6], [0, -4])
  const scale = useTransform(progress, [0.15, 0.6], [1, 0.92])

  // 6 scattered dim content fragments — pre-computed + rounded
  const darkNodes = [
    { x: 18, y: 22 },
    { x: 62, y: 14 },
    { x: 78, y: 42 },
    { x: 14, y: 58 },
    { x: 48, y: 70 },
    { x: 82, y: 80 },
  ].map((n) => ({
    x: Math.round(n.x * 1000) / 1000,
    y: Math.round(n.y * 1000) / 1000,
  }))

  return (
    <motion.div
      style={{ opacity, y, rotate, scale }}
      className="absolute inset-0"
      aria-hidden
    >
      {/* dim descending "unseen traffic" fragments */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* jagged disconnected fragments — white/low */}
        <polyline
          points="10,32 22,40 34,28 46,52 58,38 70,62 82,48 92,72"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={0.6}
          strokeLinecap="round"
          strokeDasharray="0.8 1.2"
        />
        <polyline
          points="8,68 24,60 36,76 52,64 64,82 80,72 90,86"
          fill="none"
          stroke="rgba(229,57,53,0.32)"
          strokeWidth={0.5}
          strokeLinecap="round"
          strokeDasharray="0.8 1.4"
          style={{ filter: 'drop-shadow(0 0 0.8px rgba(229,57,53,0.4))' }}
        />
      </svg>

      {/* scattered dim content fragments — white/low, disconnected */}
      {darkNodes.map((n, i) => (
        <motion.div
          key={`dark-${i}`}
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
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025]"
            style={{ boxShadow: '0 0 12px rgba(255,255,255,0.04)' }}
          >
            <EyeOff className="h-4 w-4 text-white/35" />
          </div>
        </motion.div>
      ))}

      {/* passing search-query ghosts — red-tinted, drifting right */}
      {[
        { l: '6%', t: '34%', d: 0, label: 'best...' },
        { l: '14%', t: '62%', d: 0.8, label: 'how to...' },
        { l: '4%', t: '78%', d: 1.4, label: 'near me' },
      ].map((p, i) => (
        <motion.span
          key={`ghost-${i}`}
          className="absolute rounded-full border border-[#E53935]/30 bg-[#E53935]/8 px-2 py-0.5 text-[9px] font-medium text-[#ff6b63]/80"
          style={{ left: p.l, top: p.t }}
          animate={{ x: [0, 220, 220], opacity: [0, 0.9, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeIn',
            delay: p.d,
          }}
        >
          {p.label}
        </motion.span>
      ))}

      {/* "INVISIBLE" alert label */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55"
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.04, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        <EyeOff className="h-3 w-3" />
        Invisible
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   ConnectedSystem — the visibility state (connected cyan network,
   surfacing content nodes, ascending discovery chart). Fades + scales
   in as scroll progresses (0 → 1).
   =================================================================== */
function ConnectedSystem({ progress }: { progress: MotionValue<number> }) {
  // visibility opacity 0 → 1 over [0.5, 0.9]
  const opacity = useTransform(progress, [0.5, 0.9], [0, 1])
  const scale = useTransform(progress, [0.5, 0.9], [0.85, 1])
  const y = useTransform(progress, [0.5, 0.9], [40, 0])

  // 5 connected content nodes — horizontal arc
  const network = [
    { x: 12, y: 60 },
    { x: 31, y: 48 },
    { x: 50, y: 44 },
    { x: 69, y: 48 },
    { x: 88, y: 60 },
  ].map((n) => ({
    x: Math.round(n.x * 1000) / 1000,
    y: Math.round(n.y * 1000) / 1000,
  }))

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0"
      aria-hidden
    >
      {/* connected cyan network — SVG pipes + flowing energy */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="echo-pipe-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(6,182,212,0.2)" />
            <stop offset="50%" stopColor="rgba(103,232,249,0.85)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.2)" />
          </linearGradient>
        </defs>
        {/* main network path through all 5 nodes */}
        <motion.path
          d={`M ${network[0].x} ${network[0].y} Q ${network[1].x} ${network[1].y - 8} ${network[2].x} ${network[2].y} Q ${network[3].x} ${network[3].y - 8} ${network[4].x} ${network[4].y}`}
          fill="none"
          stroke="url(#echo-pipe-grad)"
          strokeWidth={0.9}
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 2px rgba(6,182,212,0.7))' }}
        />
        {/* ascending visibility chart */}
        <motion.polyline
          points="10,82 28,72 44,60 58,46 72,30 88,16"
          fill="none"
          stroke="rgba(103,232,249,0.95)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 3px rgba(103,232,249,0.8))' }}
        />
        <polygon
          points="10,82 28,72 44,60 58,46 72,30 88,16 88,82"
          fill="rgba(6,182,212,0.14)"
        />
      </svg>

      {/* 5 connected content nodes — cyan-bordered */}
      {network.map((n, i) => (
        <motion.div
          key={`net-${i}`}
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
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#06B6D4]/45 bg-[#06B6D4]/10 backdrop-blur-xl"
            style={{ boxShadow: '0 0 18px rgba(6,182,212,0.45)' }}
          >
            <span
              className="text-[10px] font-bold text-[#67e8f9]"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              0{i + 1}
            </span>
          </div>
        </motion.div>
      ))}

      {/* "VISIBLE" success label */}
      <motion.div
        className="absolute left-1/2 top-[18%] flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#06B6D4]/55 bg-[#06B6D4]/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#67e8f9]"
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        <Sparkles className="h-3 w-3" />
        Visibility Connected
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   EchoProblem — Section 2 named export
 *   =================================================================== */
export function EchoProblem() {
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

  // local ambient cyan glow intensifies with scroll
  const ambientOpacity = useTransform(scrollYProgress, [0, 0.7], [0.3, 0.95])

  // emergence caption (after transformation)
  const emergenceOpacity = useTransform(scrollYProgress, [0.7, 0.92], [0, 1])

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[220vh] border-t border-white/5 bg-[#141414] lg:flex"
    >
      <CyanStickyRail
        label="The Problem"
        caption="Invisible Brands"
        sectionRef={sectionRef}
      />

      {/* Pinned viewport — lg:flex-1 so it sits beside the rail (not below
          it). Without lg:flex on the parent + lg:flex-1 here, the rail
          aside (h-screen) would stack ABOVE this viewport as a block,
          pushing it down 900px and breaking the sticky pin range. */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden lg:flex-1 lg:min-w-0">
        {/* Ambient layers (driven by scroll) */}
        <motion.div aria-hidden style={{ opacity: ambientOpacity }} className="absolute inset-0">
          <CyanAmbient />
        </motion.div>
        <CyanEmberCanvas count={28} />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------- LEFT: editorial copy + stage statements ---------- */}
          <motion.div style={{ y: headerY, opacity: headerOpacity }}>
            <CyanEyebrow number="02" label="The Problem" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>
                <span className="text-white">Why Great Brands</span>
              </MaskLine>
              <MaskLine delay={0.12}>
                <span className="text-white">Stay </span>
                <CyanGradientText>Invisible.</CyanGradientText>
              </MaskLine>
            </h2>

            {/* Stage statements — relative container, absolutely-stacked, fade with scroll */}
            <div className="relative mt-10 min-h-[260px] sm:min-h-[240px]">
              {stageCopy.map((s, i) => (
                <StageStatement
                  key={s.n}
                  stage={s}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>

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
                className="mt-7 border-l-2 border-[#06B6D4] pl-5"
              >
                <p className="text-xl font-medium leading-snug text-white sm:text-2xl">
                  We compete on{' '}
                  <span className="text-[#06B6D4]">visibility</span>.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* ---------- RIGHT: invisible → connected transformation ---------- */}
          <div className="relative flex min-h-[60vh] flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-5 flex items-center justify-between"
            >
              <span className="wn-eyebrow text-[11px] font-medium text-white/50">
                Invisible → Connected
              </span>
              <span className="text-xs text-white/30">scroll to connect</span>
            </motion.div>

            {/* Transformation stage — invisible + connected overlaid */}
            <div className="relative h-[60vh] min-h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A]/80">
              <InvisibleSystem progress={scrollYProgress} />
              <ConnectedSystem progress={scrollYProgress} />

              {/* corner labels */}
              <div className="pointer-events-none absolute left-4 top-4 wn-eyebrow text-[10px] text-white/45">
                The Visibility Network
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 text-[10px] text-white/30">
                <Link2 className="h-3 w-3" />
                Content · Authority · Discovery
              </div>
              <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-1.5 text-[10px] text-white/30">
                <Search className="h-3 w-3" />
                Search · Ask · Compare · Decide
              </div>
            </div>

            {/* Emergence caption */}
            <motion.p
              style={{ opacity: emergenceOpacity }}
              className="mt-6 text-center text-xs text-white/45 sm:text-left"
            >
              Darkness resolves into a connected content ecosystem.{' '}
              <span className="text-white/55">
                Visibility starts to compound.
              </span>
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}
