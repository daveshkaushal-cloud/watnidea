'use client'

/**
 * HypeAttentionCurrency — Section 2 of /the-hype-engine
 *
 * Sticky/pinned editorial storytelling. "Attention Is The New Currency."
 *
 * Visual concept — the content feed:
 *   A 5×7 = 35-cell grid represents thousands of content pieces competing
 *   for attention every second. As the user scrolls, most cells fade and
 *   shrink — but ONE stream blooms: it scales up, glows red+orange, and
 *   rotates into focus. That's the engineered few.
 *
 * Sticky/pinned pattern: outer min-h-[200vh] + inner sticky top-0 h-screen
 * + useScroll on the outer → useTransform drives the grid transformation.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). We compute BOTH branches (hero vs other) and pick at
 * render time — never conditionally call hooks.
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { SectionEyebrow, MaskLine, RedGradientText } from '@/components/about/shared'

/* ===================================================================
   Comparison lines — three "they focus on X" lines with animated
   red/orange strike-through.
   =================================================================== */
const comparison = [
  { subject: 'Most feeds', lead: 'compete on', focus: 'volume' },
  { subject: 'Most brands', lead: 'compete on', focus: 'frequency' },
  { subject: 'Most agencies', lead: 'compete on', focus: 'impressions' },
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
          style={{
            background:
              index % 2 === 0
                ? 'linear-gradient(90deg, #E53935, #F97316)'
                : 'linear-gradient(90deg, #E53935, #EC4899)',
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
   FeedGrid — the sticky pinned grid of content cells. 5×7 = 35 cells.
   One (index 16) becomes the dominant stream that blooms red+orange.
   =================================================================== */
const GRID_ROWS = 5
const GRID_COLS = 7
const HERO_INDEX = 16 // the cell that blooms into the dominant stream

function FeedCell({
  index,
  progress,
}: {
  index: number
  progress: MotionValue<number>
}) {
  const isHero = index === HERO_INDEX

  // ALL hooks declared unconditionally at the top (Rules of Hooks).
  // We compute BOTH branches and pick at render time.

  // background color: hero blooms to bright red; others fade to near-invisible
  const heroBgOpacity = useTransform(progress, [0.3, 0.6], [0.08, 0.9])
  const otherBgOpacity = useTransform(progress, [0.3, 0.6], [0.08, 0.02])
  const heroBg = useTransform(heroBgOpacity, (o) => `rgba(229,57,53,${o})`)
  const otherBg = useTransform(otherBgOpacity, (o) => `rgba(255,255,255,${o})`)
  const backgroundColor = isHero ? heroBg : otherBg

  // scale: hero scales UP; others shrink
  const heroScale = useTransform(progress, [0.3, 0.7], [1, 1.6])
  const otherScale = useTransform(progress, [0.3, 0.7], [1, 0.7])
  const scale = isHero ? heroScale : otherScale

  // rotation: hero rotates slightly; others drift
  const rotSeed = (index * 47) % 22 - 11
  const heroRotate = useTransform(progress, [0.3, 0.7], [0, -8])
  const otherRotate = useTransform(progress, [0.3, 0.7], [0, rotSeed])
  const rotate = isHero ? heroRotate : otherRotate

  // border radius: shapes morph
  const heroRadius = useTransform(progress, [0.3, 0.7], ['24%', '38%'])
  const otherRadius = useTransform(progress, [0.3, 0.7], ['24%', '32%'])
  const borderRadius = isHero ? heroRadius : otherRadius

  // glow (hero only): blooms red + orange as it scales
  const heroBoxShadow = useTransform(
    progress,
    [0.3, 0.7],
    [
      '0 0 0px rgba(229,57,53,0)',
      '0 0 38px rgba(229,57,53,0.85), 0 0 80px rgba(249,115,22,0.45)',
    ]
  )

  // border color: hero turns red; others stay neutral
  const heroBorder = useTransform(
    progress,
    [0.3, 0.6],
    ['rgba(255,255,255,0.08)', 'rgba(229,57,53,0.85)']
  )
  const otherBorder = useTransform(
    progress,
    [0.3, 0.6],
    ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.04)']
  )
  const borderColor = isHero ? heroBorder : otherBorder

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
        className="h-full w-full border"
        style={
          isHero
            ? { backgroundColor, borderRadius, boxShadow: heroBoxShadow, borderColor }
            : { backgroundColor, borderRadius, borderColor }
        }
      />
    </motion.div>
  )
}

/* ===================================================================
   HypeAttentionCurrency — Section 2 named export
   =================================================================== */
export function HypeAttentionCurrency() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // header parallax + fade
  const headerY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -40, -120])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0.3])

  // dominant stream emergence caption (after the bloom)
  const emergenceOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1])

  // local ambient red + orange glow intensifies with scroll
  const ambientOpacity = useTransform(scrollYProgress, [0, 0.7], [0.3, 0.9])

  const cells = Array.from(
    { length: GRID_ROWS * GRID_COLS },
    (_, i) => i
  )

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[200vh] border-t border-white/5 bg-[#141414]"
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Local ambient glow that intensifies with scroll (red center) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.2), rgba(229,57,53,0) 65%)',
            filter: 'blur(40px)',
            opacity: ambientOpacity,
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Secondary orange blob, lower-right */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[10%] right-[6%] h-[28vw] w-[28vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.16), rgba(249,115,22,0) 70%)',
            filter: 'blur(46px)',
            opacity: ambientOpacity,
          }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        {/* Pink gradient blob, upper-left */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-[4%] top-[12%] h-[24vw] w-[24vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(236,72,153,0.14), rgba(236,72,153,0) 70%)',
            filter: 'blur(50px)',
            opacity: ambientOpacity,
          }}
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------- LEFT: editorial copy ---------- */}
          <motion.div style={{ y: headerY, opacity: headerOpacity }}>
            <SectionEyebrow number="02" label="The Currency" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Attention Is</MaskLine>
              <MaskLine delay={0.12}>
                <RedGradientText>The New Currency.</RedGradientText>
              </MaskLine>
            </h2>

            {/* Body copy — verbatim */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
            >
              Thousands of content pieces compete for attention every second.
              Most disappear. A few gain momentum.{' '}
              <span className="font-semibold text-white">
                We engineer the few.
              </span>
            </motion.p>

            {/* Comparison lines */}
            <div className="mt-8 max-w-xl">
              {comparison.map((c, i) => (
                <ComparisonLine key={c.subject} c={c} index={i} />
              ))}

              {/* Pivot statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 border-l-2 border-[#E53935] pl-5"
              >
                <p className="text-xl font-medium leading-snug text-white sm:text-2xl">
                  We compete on{' '}
                  <span className="text-[#E53935]">momentum</span>.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* ---------- RIGHT: pinned feed grid ---------- */}
          <div className="relative flex min-h-[60vh] flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-5 flex items-center justify-between"
            >
              <span className="wn-eyebrow text-[11px] font-medium text-white/50">
                Feed → Engineered Stream
              </span>
              <span className="text-xs text-white/30">scroll to focus</span>
            </motion.div>

            {/* The grid of content cells */}
            <div
              className="grid gap-2 sm:gap-3"
              style={{
                gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
              }}
            >
              {cells.map((i) => (
                <FeedCell key={i} index={i} progress={scrollYProgress} />
              ))}
            </div>

            {/* Emergence caption */}
            <motion.p
              style={{ opacity: emergenceOpacity }}
              className="mt-6 text-center text-xs text-white/45 sm:text-left"
            >
              One stream breaks through.{' '}
              <span className="text-white/55">
                We engineer which one.
              </span>
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}
