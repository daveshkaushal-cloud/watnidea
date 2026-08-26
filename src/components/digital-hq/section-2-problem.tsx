'use client'

/**
 * DhqProblem — Section 2
 * Editorial storytelling with scroll-driven transformation.
 *
 * Visual concept — "a world full of identical template websites":
 *   A sticky/pinned grid of identical browser-shaped cards that breaks apart
 *   as the user scrolls, until one unique site emerges as a glowing Electric
 *   Blue conversion-focused digital headquarters.
 *
 * Sticky/pinned pattern: outer min-h-[200vh] + inner sticky top-0 h-screen
 * + useScroll on the outer → useTransform drives the grid transformation.
 *
 * COLOR IDENTITY: Electric Blue (#3B82F6) — the emerging "hero" cell blooms
 * blue; the surrounding template cells fade to muted grey. Brand red is not
 * used here — the entire section reads as a "blue digital ecosystem".
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { SectionEyebrow, MaskLine } from '@/components/about/shared'
import { BlueGradientText, DHQ } from './shared'

const accent = DHQ

/* ===================================================================
   Comparison lines — three "focus on" lines with animated blue strike.
   =================================================================== */
const comparison = [
  { subject: 'Most templates', lead: 'focus on', focus: 'trends' },
  { subject: 'Most builders', lead: 'focus on', focus: 'speed' },
  { subject: 'Most agencies', lead: 'focus on', focus: 'shipping' },
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
      <span className="font-medium text-white">{c.subject}</span>
      <span className="text-white/35">{c.lead}</span>
      <span className="relative text-white/35">
        {c.focus}.
        <motion.span
          aria-hidden
          className="absolute left-0 top-1/2 h-[1.5px] w-0 -translate-y-1/2"
          style={{ background: accent.hex }}
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
   TemplateGrid — the sticky pinned grid of identical browser cards that
   breaks apart on scroll. 5x7 = 35 cards; one (index 18) becomes the
   unique blue glowing conversion site.
   =================================================================== */
const GRID_ROWS = 5
const GRID_COLS = 7
const HERO_INDEX = 18 // the cell that becomes the unique blue HQ

function TemplateCell({
  index,
  progress,
}: {
  index: number
  progress: MotionValue<number>
}) {
  const isHero = index === HERO_INDEX

  // ALL hooks declared unconditionally at the top (Rules of Hooks).
  // We compute BOTH branches and pick at render time.

  // color: white → (hero) bright blue; (others) stays muted or fades
  const heroBgOpacity = useTransform(progress, [0.3, 0.6], [0.08, 0.9])
  const otherBgOpacity = useTransform(progress, [0.3, 0.6], [0.08, 0.03])
  const heroBg = useTransform(heroBgOpacity, (o) => `rgba(${accent.rgb},${o})`)
  const otherBg = useTransform(otherBgOpacity, (o) => `rgba(255,255,255,${o})`)
  const backgroundColor = isHero ? heroBg : otherBg

  // scale: hero scales UP; others drift slightly
  const heroScale = useTransform(progress, [0.3, 0.7], [1, 1.6])
  const otherScale = useTransform(progress, [0.3, 0.7], [1, 0.7])
  const scale = isHero ? heroScale : otherScale

  // rotation: cells diverge from monotony
  const rotSeed = (index * 47) % 30 - 15
  const heroRotate = useTransform(progress, [0.3, 0.7], [0, 360])
  const otherRotate = useTransform(progress, [0.3, 0.7], [0, rotSeed])
  const rotate = isHero ? heroRotate : otherRotate

  // border radius: browser-card shapes morph
  const heroRadius = useTransform(progress, [0.3, 0.7], ['12%', '18%'])
  const otherRadius = useTransform(progress, [0.3, 0.7], ['12%', '16%'])
  const borderRadius = isHero ? heroRadius : otherRadius

  // glow (hero only): blooms as it scales
  const heroBoxShadow = useTransform(
    progress,
    [0.3, 0.7],
    [
      `0 0 0px rgba(${accent.rgb},0)`,
      `0 0 38px rgba(${accent.rgb},0.85), 0 0 80px rgba(${accent.rgb},0.45)`,
    ]
  )

  // position offset — small drift so the grid feels alive
  const dx = ((index * 13) % 9) - 4
  const dy = ((index * 7) % 9) - 4
  const x = useTransform(progress, [0.3, 0.7], [0, dx * 4])
  const y = useTransform(progress, [0.3, 0.7], [0, dy * 4])

  return (
    <motion.div
      className="relative flex aspect-square items-center justify-center"
      style={{ x, y, scale, rotate }}
    >
      <motion.div
        className="h-full w-full"
        style={
          isHero
            ? { backgroundColor, borderRadius, boxShadow: heroBoxShadow }
            : { backgroundColor, borderRadius }
        }
      />
    </motion.div>
  )
}

/* ===================================================================
   DhqProblem — Section 2 default export
   =================================================================== */
export default function DhqProblem() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // header parallax + fade
  const headerY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -40, -120])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0.3])

  // unique identity emergence fade-in (after the break)
  const identityOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1])

  const cells = Array.from(
    { length: GRID_ROWS * GRID_COLS },
    (_, i) => i
  )

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[200vh] border-t border-white/5 bg-[#050505]"
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Local ambient glow that intensifies with scroll */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${accent.rgb},0.18), rgba(${accent.rgb},0) 65%)`,
            filter: 'blur(40px)',
            opacity: useTransform(scrollYProgress, [0, 0.7], [0.3, 0.9]),
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------- LEFT: editorial copy ---------- */}
          <motion.div style={{ y: headerY, opacity: headerOpacity }}>
            <SectionEyebrow number="02" label="The Problem" accent={accent} />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Most Websites Are</MaskLine>
              <MaskLine delay={0.08}>
                <BlueGradientText glow={false}>Dead Weight.</BlueGradientText>
              </MaskLine>
            </h2>

            {/* Comparison lines */}
            <div className="mt-10 max-w-xl">
              {comparison.map((c, i) => (
                <ComparisonLine key={c.subject} c={c} index={i} />
              ))}

              {/* Pivot statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 pl-5"
                style={{ borderLeft: `2px solid ${accent.hex}` }}
              >
                <p className="text-xl font-medium leading-snug text-white sm:text-2xl">
                  We believe your website should be a{' '}
                  <span style={{ color: accent.soft }}>growth engine</span> —
                  not a digital business card.
                </p>
              </motion.div>
            </div>

            {/* Problem statement with strike-through */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-8 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
            >
              The world has enough template websites — and most of them{' '}
              <span className="relative inline-block">
                don&apos;t convert.
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-[1.5px] w-0 -translate-y-1/2"
                  style={{ background: accent.hex }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.55, delay: 0.9, ease: 'easeOut' }}
                />
              </span>
            </motion.p>
          </motion.div>

          {/* ---------- RIGHT: pinned template grid ---------- */}
          <div className="relative flex min-h-[60vh] flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-5 flex items-center justify-between"
            >
              <span className="wn-eyebrow text-[11px] font-medium text-white/50">
                Templates → Headquarters
              </span>
              <span className="text-xs text-white/30">scroll to break</span>
            </motion.div>

            {/* The grid of identical browser cards */}
            <div
              className="grid gap-2 sm:gap-3"
              style={{
                gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
              }}
            >
              {cells.map((i) => (
                <TemplateCell key={i} index={i} progress={scrollYProgress} />
              ))}
            </div>

            {/* Identity emergence caption */}
            <motion.p
              style={{ opacity: identityOpacity }}
              className="mt-6 text-center text-xs text-white/45 sm:text-left"
            >
              One site. Built to convert.{' '}
              <span className="text-white/55">
                Engineered as your digital headquarters.
              </span>
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}
