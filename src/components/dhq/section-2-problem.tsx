'use client'

/**
 * DhqProblem — Section 2
 * "Why Most Websites Fail." — scroll-driven transformation.
 *
 * Visual concept — "fragmented systems reorganize into a structured
 * digital HQ":
 *   4 problem tiles start scattered/rotated/overlapping (chaos), then
 *   as the user scrolls they animate into a clean structured 2x2 grid
 *   (the digital HQ). A central "Digital HQ" core node appears in the
 *   center as the tiles align, with connecting lines drawing in.
 *
 * Sticky/pinned pattern: outer min-h-[200vh] + inner sticky top-0
 * h-screen + useScroll on the outer → useTransform drives each tile's
 * x/y/rotation/opacity + the central core fade + connecting line draw.
 *
 * Verbatim copy:
 *   - Eyebrow: (02) · The Problem
 *   - Headline (3 lines, MaskLine): "Why Most" / "Websites" / "Fail."
 *     ("Fail." red)
 *   - 4 problem tiles:
 *       1. Broken Funnels — Visitors land. They leave. No path to conversion.
 *       2. Disconnected Systems — Website, CRM, analytics, ads — none of them talking.
 *       3. Slow Websites — Every second of load time costs you customers.
 *       4. Poor User Journeys — Beautiful on the surface. Confusing underneath.
 *   - Statement: "Most websites are brochures. Yours should be an asset."
 *     ("asset" red)
 *   - Caption: "Built for Brands That Refuse to Blend In." ("Refuse" red)
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Unplug, Gauge, Route, FilterX } from 'lucide-react'
import {
  SectionEyebrow,
  MaskLine,
  RedGradientText,
} from '@/components/about/shared'

/* ===================================================================
   Content — 4 problems (premium descriptors, brand voice, verbatim).
   Each has a scattered start position + rotation, and a target 2x2
   grid position (relative to center, in vw/vh).
   =================================================================== */
type Problem = {
  n: string
  title: string
  desc: string
  Icon: typeof Unplug
  // scattered start (in vw / vh, relative to center)
  startX: number
  startY: number
  startRot: number
  // target 2x2 grid position (relative to center)
  endX: number
  endY: number
  endRot: number
}

const problems: Problem[] = [
  {
    n: '01',
    title: 'Broken Funnels',
    desc: 'Visitors land. They leave. No path to conversion.',
    Icon: FilterX,
    // start: top-left scattered (kept within canvas bounds so tiles
    // are visible during the chaos phase, not clipped by overflow-hidden)
    startX: -14,
    startY: -14,
    startRot: -14,
    // end: top-left of 2x2 grid (±8vw keeps 300px tiles fully inside
    // the ~547px right-column canvas at common viewport widths)
    endX: -8,
    endY: -11,
    endRot: 0,
  },
  {
    n: '02',
    title: 'Disconnected Systems',
    desc: 'Website, CRM, analytics, ads — none of them talking.',
    Icon: Unplug,
    // start: top-right scattered
    startX: 14,
    startY: -15,
    startRot: 16,
    // end: top-right of 2x2 grid
    endX: 8,
    endY: -11,
    endRot: 0,
  },
  {
    n: '03',
    title: 'Slow Websites',
    desc: 'Every second of load time costs you customers.',
    Icon: Gauge,
    // start: bottom-left scattered
    startX: -14,
    startY: 14,
    startRot: 12,
    // end: bottom-left of 2x2 grid
    endX: -8,
    endY: 11,
    endRot: 0,
  },
  {
    n: '04',
    title: 'Poor User Journeys',
    desc: 'Beautiful on the surface. Confusing underneath.',
    Icon: Route,
    // start: bottom-right scattered
    startX: 14,
    startY: 15,
    startRot: -18,
    // end: bottom-right of 2x2 grid
    endX: 8,
    endY: 11,
    endRot: 0,
  },
]

/* ===================================================================
   ProblemTile — single scattered → structured tile.
   Hooks at the top — receives scrollYProgress.
   Transform window [0.15, 0.55] drives chaos → grid.
   =================================================================== */
function ProblemTile({
  p,
  progress,
}: {
  p: Problem
  progress: MotionValue<number>
}) {
  // x/y translate from scattered → grid (vw / vh units)
  const x = useTransform(
    progress,
    [0.15, 0.55],
    [`${p.startX}vw`, `${p.endX}vw`]
  )
  const y = useTransform(
    progress,
    [0.15, 0.55],
    [`${p.startY}vh`, `${p.endY}vh`]
  )
  const rotate = useTransform(
    progress,
    [0.15, 0.55],
    [p.startRot, p.endRot]
  )
  // tiles scale up slightly + brighten as they align
  const scale = useTransform(progress, [0.15, 0.55], [0.92, 1])
  // fade tiles in immediately at scroll start so the chaos state is visible
  const opacity = useTransform(progress, [0.0, 0.08], [0, 1])

  const { n, title, desc, Icon } = p

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ x, y, rotate, scale, opacity }}
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="group relative w-[260px] max-w-[78vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl sm:w-[300px]"
        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
      >
        {/* hover glow bloom */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(120% 120% at 50% 0%, rgba(229,57,53,0.18), transparent 60%)',
          }}
        />
        <div className="relative z-10">
          <div className="mb-3 flex items-center justify-between">
            <span
              className="text-xs font-bold text-[#E53935]"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {n}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Icon className="h-4 w-4 text-[#ff6b63]" />
            </span>
          </div>
          <h3
            className="text-lg font-semibold text-white sm:text-xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            {desc}
          </p>
        </div>
        {/* bottom accent line */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-transparent transition-all duration-500 group-hover:w-full"
        />
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   CentralCore — the "Digital HQ" core node that appears in the center
   as the tiles align. Fades in + scales in via opacity transform.
   =================================================================== */
function CentralCore({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.55, 0.75], [0, 1])
  const scale = useTransform(progress, [0.55, 0.75], [0.6, 1])

  return (
    <motion.div
      style={{ opacity, scale }}
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
    >
      {/* halo */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '16vw',
          height: '16vw',
          maxWidth: '160px',
          maxHeight: '160px',
          background:
            'radial-gradient(circle, rgba(229,57,53,0.45), rgba(229,57,53,0) 70%)',
          filter: 'blur(20px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* core */}
      <motion.div
        className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[#E53935]/60 bg-[#E53935]/10 backdrop-blur-md sm:h-24 sm:w-24"
        animate={{ scale: [1, 1.06, 1], rotate: [0, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow:
            '0 0 30px rgba(229,57,53,0.7), inset 0 0 18px rgba(229,57,53,0.3)',
        }}
      >
        <div className="flex flex-col items-center gap-0.5">
          {/* browser frame glyph */}
          <div className="flex items-center gap-0.5">
            <span className="h-1 w-1 rounded-full bg-[#ff6b63]" />
            <span className="h-1 w-1 rounded-full bg-white/60" />
            <span className="h-1 w-1 rounded-full bg-white/40" />
          </div>
          <span
            className="wn-eyebrow text-[8px] font-bold text-[#ff6b63] sm:text-[10px]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Digital HQ
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   ConnectingLines — SVG lines from the central core to each tile's
   target grid position. They draw in (pathLength 0→1) as tiles align.
   =================================================================== */
function ConnectingLines({ progress }: { progress: MotionValue<number> }) {
  const drawProgress = useTransform(progress, [0.55, 0.8], [0, 1])

  return (
    <motion.div
      style={{ opacity: drawProgress }}
      className="pointer-events-none absolute left-0 top-0"
      aria-hidden
    >
      {problems.map((p, i) => (
        <ConnectingLine
          key={i}
          x2={p.endX}
          y2={p.endY}
          draw={drawProgress}
        />
      ))}
    </motion.div>
  )
}

/* ConnectingLine — single line drawn as a rotated gradient bar from
   center (0,0) outward to (x2,y2) (in vw/vh). Length + angle computed
   at module render so it can be styled as a div. We use absolutely
   positioned motion.divs instead — simpler + reliably SSR-safe. */
function ConnectingLine({
  x2,
  y2,
  draw,
}: {
  x2: number
  y2: number
  draw: MotionValue<number>
}) {
  // length (in vw) and angle (deg) from origin to (x2vw, y2vh)
  // We approximate vh as 0.6*vw for relative scaling on common screens
  // — only used for visual length, exactness not required.
  const lenVw = Math.sqrt(x2 * x2 + (y2 / 0.6) * (y2 / 0.6))
  const angle = (Math.atan2(y2 / 0.6, x2) * 180) / Math.PI
  const scaleX = draw

  return (
    <motion.div
      aria-hidden
      className="absolute left-0 top-0 h-px origin-left"
      style={{
        width: `${lenVw}vw`,
        rotate: `${angle}deg`,
        scaleX,
        background:
          'linear-gradient(to right, rgba(229,57,53,0.85), rgba(229,57,53,0.1))',
        boxShadow: '0 0 6px rgba(229,57,53,0.6)',
      }}
    />
  )
}

/* ===================================================================
   DhqProblem — Section 2 named export
   =================================================================== */
export function DhqProblem() {
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

  // caption fade-in
  const captionOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1])

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[200vh] border-t border-white/5 bg-[#141414]"
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Local ambient glow that intensifies with scroll */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.18), rgba(229,57,53,0) 65%)',
            filter: 'blur(40px)',
            opacity: useTransform(scrollYProgress, [0, 0.7], [0.3, 0.9]),
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------- LEFT: editorial copy ---------- */}
          <motion.div style={{ y: headerY, opacity: headerOpacity }}>
            <SectionEyebrow number="02" label="The Problem" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Why Most</MaskLine>
              <MaskLine delay={0.08}>Websites</MaskLine>
              <MaskLine delay={0.16}>
                <RedGradientText>Fail.</RedGradientText>
              </MaskLine>
            </h2>

            {/* Statement — verbatim */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 max-w-xl text-lg leading-relaxed text-white/55 sm:text-xl"
            >
              Most websites are brochures. Yours should be an{' '}
              <span className="relative inline-block">
                <RedGradientText>asset.</RedGradientText>
              </span>
            </motion.p>

            {/* Pivot callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl border-l-2 border-[#E53935] pl-5"
            >
              <p className="text-base leading-snug text-white/70 sm:text-lg">
                A digital HQ doesn&apos;t just look good — it converts,
                connects, and compounds.
              </p>
            </motion.div>

            {/* Caption — verbatim */}
            <motion.p
              style={{ opacity: captionOpacity }}
              className="mt-7 max-w-xl text-base text-white/55 sm:text-lg"
            >
              Built for Brands That{' '}
              <RedGradientText glow={false}>Refuse</RedGradientText> to Blend In.
            </motion.p>
          </motion.div>

          {/* ---------- RIGHT: pinned scattered→grid canvas ---------- */}
          <div className="relative flex min-h-[60vh] flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-5 flex items-center justify-between"
            >
              <span className="wn-eyebrow text-[11px] font-medium text-white/50">
                Chaos → Structure
              </span>
              <span className="text-xs text-white/30">scroll to reorganize</span>
            </motion.div>

            {/* The transformation canvas */}
            <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A]/75">
              {/* faint grid background */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                  maskImage:
                    'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.8), rgba(0,0,0,0) 75%)',
                  WebkitMaskImage:
                    'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.8), rgba(0,0,0,0) 75%)',
                }}
              />

              {/* connecting lines (draw in as tiles align) */}
              <div className="absolute left-1/2 top-1/2">
                <ConnectingLines progress={scrollYProgress} />
              </div>

              {/* central core */}
              <CentralCore progress={scrollYProgress} />

              {/* the 4 problem tiles */}
              {problems.map((p) => (
                <ProblemTile
                  key={p.n}
                  p={p}
                  progress={scrollYProgress}
                />
              ))}

              {/* corner labels */}
              <div className="pointer-events-none absolute left-4 top-4 wn-eyebrow text-[10px] text-white/45">
                Systems Recomposition
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 text-[10px] text-white/30">
                {''}
                HQ Core online
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
