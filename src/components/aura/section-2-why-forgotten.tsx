'use client'

/**
 * AuraWhyForgotten — Section 2
 * Editorial storytelling with scroll-driven transformation.
 *
 * Visual concept — "thousands of identical abstract brand marks":
 *   A dense grid of identical simple abstract marks; as the user scrolls,
 *   ONE unique identity emerges — it shifts color to red, scales up, glows,
 *   and morphs into a distinct shape. The rest stay muted grey.
 *
 * Sticky/pinned pattern: outer min-h-[200vh] + inner sticky top-0 h-screen
 * + useScroll on the outer → useTransform drives the grid transformation.
 *
 * Verbatim copy:
 *   - Eyebrow: (02) · The Problem
 *   - Headline (3 lines, MaskLine): "Most brands" / "are" / "forgotten."
 *     ("forgotten." red)
 *   - Statement: "The world has enough agencies—and most of them play safe."
 *     (em dash; "play safe." struck through)
 *   - Pivot: "The market rewards memorable brands." ("memorable" red)
 *   - Secondary pivot: "We believe growth happens when all three work
 *     together." ("all three" red)
 *   - Caption: "Built for Brands That Refuse to Blend In." ("Refuse" red)
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Fingerprint } from 'lucide-react'
import { SectionEyebrow, MaskLine, RedGradientText } from '@/components/about/shared'

/* ===================================================================
   MonotonyGrid — sticky pinned grid of identical abstract marks.
   One cell (HERO_INDEX) becomes the unique red glowing identity as the
   user scrolls.
   =================================================================== */
const GRID_ROWS = 7
const GRID_COLS = 10
const HERO_INDEX = 32 // the cell that becomes the unique red identity

function MonotonyCell({
  index,
  progress,
}: {
  index: number
  progress: MotionValue<number>
}) {
  const isHero = index === HERO_INDEX

  // ALL hooks declared unconditionally at the top (Rules of Hooks).
  // We compute BOTH branches and pick at render time.

  // color: white-muted → (hero) bright red; (others) fades toward very dim
  const heroBgOpacity = useTransform(progress, [0.35, 0.65], [0.10, 0.95])
  const otherBgOpacity = useTransform(progress, [0.35, 0.65], [0.10, 0.025])
  const heroBg = useTransform(heroBgOpacity, (o) => `rgba(229,57,53,${o})`)
  const otherBg = useTransform(otherBgOpacity, (o) => `rgba(255,255,255,${o})`)
  const backgroundColor = isHero ? heroBg : otherBg

  // scale: hero scales UP; others shrink slightly
  const heroScale = useTransform(progress, [0.35, 0.7], [1, 1.9])
  const otherScale = useTransform(progress, [0.35, 0.7], [1, 0.72])
  const scale = isHero ? heroScale : otherScale

  // rotation: hero spins to feel "alive"; others drift slightly
  const rotSeed = (index * 47) % 30 - 15
  const heroRotate = useTransform(progress, [0.35, 0.7], [0, 220])
  const otherRotate = useTransform(progress, [0.35, 0.7], [0, rotSeed])
  const rotate = isHero ? heroRotate : otherRotate

  // border radius: shapes morph — hero becomes a fingerprint-like blob
  const heroRadius = useTransform(progress, [0.35, 0.7], ['22%', '50%'])
  const otherRadius = useTransform(progress, [0.35, 0.7], ['22%', '32%'])
  const borderRadius = isHero ? heroRadius : otherRadius

  // glow (hero only): blooms as it scales
  const heroBoxShadow = useTransform(
    progress,
    [0.35, 0.7],
    [
      '0 0 0px rgba(229,57,53,0)',
      '0 0 38px rgba(229,57,53,0.85), 0 0 80px rgba(229,57,53,0.45)',
    ]
  )

  // position offset — small drift so the grid feels alive
  const dx = ((index * 13) % 9) - 4
  const dy = ((index * 7) % 9) - 4
  const x = useTransform(progress, [0.35, 0.7], [0, dx * 4])
  const y = useTransform(progress, [0.35, 0.7], [0, dy * 4])

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
   AuraWhyForgotten — Section 2 default export
   =================================================================== */
export function AuraWhyForgotten() {
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

  // unique identity emergence fade-in (after the break)
  const identityOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1])

  // caption fade-in
  const captionOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1])

  const cells = Array.from({ length: GRID_ROWS * GRID_COLS }, (_, i) => i)

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
              <MaskLine>Most brands</MaskLine>
              <MaskLine delay={0.08}>are</MaskLine>
              <MaskLine delay={0.16}>
                <RedGradientText>forgotten.</RedGradientText>
              </MaskLine>
            </h2>

            {/* Problem statement with strike-through */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
            >
              The world has enough agencies—and most of them{' '}
              <span className="relative inline-block">
                play safe.
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-[1.5px] w-0 -translate-y-1/2 bg-[#E53935]"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.55, delay: 0.45, ease: 'easeOut' }}
                />
              </span>
            </motion.p>

            {/* Pivot statement — verbatim */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl border-l-2 border-[#E53935] pl-5"
            >
              <p className="text-xl font-medium leading-snug text-white sm:text-2xl">
                The market rewards <span className="text-[#E53935]">memorable</span> brands.
              </p>
            </motion.div>

            {/* Secondary pivot — verbatim */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-xl border-l-2 border-white/15 pl-5"
            >
              <p className="text-base leading-snug text-white/70 sm:text-lg">
                We believe growth happens when{' '}
                <span className="text-[#E53935]">all three</span> work together.
              </p>
            </motion.div>
          </motion.div>

          {/* ---------- RIGHT: pinned monotony grid ---------- */}
          <div className="relative flex min-h-[60vh] flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-5 flex items-center justify-between"
            >
              <span className="wn-eyebrow text-[11px] font-medium text-white/50">
                Monotony → Identity
              </span>
              <span className="text-xs text-white/30">scroll to break</span>
            </motion.div>

            {/* The grid of identical shapes */}
            <div
              className="grid gap-1.5 sm:gap-2"
              style={{
                gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
              }}
            >
              {cells.map((i) => (
                <MonotonyCell key={i} index={i} progress={scrollYProgress} />
              ))}
            </div>

            {/* Identity emergence — fingerprint icon blooms */}
            <motion.div
              style={{ opacity: identityOpacity }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Fingerprint
                  className="h-16 w-16 text-white/85"
                  style={{
                    filter:
                      'drop-shadow(0 0 18px rgba(229,57,53,0.85)) drop-shadow(0 0 36px rgba(229,57,53,0.45))',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Caption — verbatim */}
            <motion.p
              style={{ opacity: captionOpacity }}
              className="mt-6 text-center text-base text-white/55 sm:text-left sm:text-lg"
            >
              Built for Brands That <RedGradientText glow={false}>Refuse</RedGradientText> to Blend In.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}
