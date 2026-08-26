'use client'

/**
 * KineticArtOfStorytelling — Section 7 of /kinetic-studio
 *
 * EDITORIAL STORYTELLING — "Every frame should serve a purpose."
 * Five pillars of cinematic craft: Emotion, Narrative, Attention,
 * Memory, Impact.
 *
 * Composition:
 *   - Eyebrow: (07) · The Craft (OrangeEyebrow)
 *   - Headline: "The Art of" + "Visual Storytelling"
 *     ("Visual Storytelling" orange gradient)
 *   - 5 editorial pillar cards in a 2+3 layout.
 *       01 Emotion     (Heart)      — "Make them feel something first."
 *       02 Narrative   (BookOpen)   — "A beginning. A middle. A change."
 *       03 Attention   (Eye)        — "Earned in the first frame."
 *       04 Memory      (Brain)      — "What they remember long after."
 *       05 Impact      (TrendingUp) — "Stories that move markets."
 *   - Each pillar: large index number (orange), icon, title, editorial
 *     copy. Cinematic reveal on scroll (fade + slight scale, like a
 *     scene transition).
 *   - "Scene change" effect between pillars — brief letterbox bar
 *     sweep that crosses the column when each card reveals.
 *   - Closing statement: "Every frame should serve a purpose. Every
 *     cut should earn its place."
 *   - OrangeAmbient for atmosphere + OrangeStickyRail ("The Craft" /
 *     "Storytelling").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  BookOpen,
  Brain,
  Eye,
  Heart,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import {
  OrangeAmbient,
  OrangeEyebrow,
  OrangeGradientText,
  OrangeStickyRail,
  MaskLine,
} from '@/components/kinetic/shared'

/* ===================================================================
   Pillar content — 5 craft pillars (verbatim editorial copy).
   =================================================================== */
type Accent = 'orange' | 'gold' | 'red' | 'deep'

type Pillar = {
  n: string
  title: string
  copy: string
  Icon: LucideIcon
  accent: Accent
}

const pillars: Pillar[] = [
  {
    n: '01',
    title: 'Emotion',
    copy: 'Make them feel something first. Logic follows.',
    Icon: Heart,
    accent: 'red',
  },
  {
    n: '02',
    title: 'Narrative',
    copy: 'A beginning. A middle. A change.',
    Icon: BookOpen,
    accent: 'orange',
  },
  {
    n: '03',
    title: 'Attention',
    copy: 'Earned in the first frame. Held till the last.',
    Icon: Eye,
    accent: 'gold',
  },
  {
    n: '04',
    title: 'Memory',
    copy: 'What they remember long after the scroll.',
    Icon: Brain,
    accent: 'orange',
  },
  {
    n: '05',
    title: 'Impact',
    copy: 'Stories that move markets, not just metrics.',
    Icon: TrendingUp,
    accent: 'deep',
  },
]

const ACCENT_HEX: Record<Accent, string> = {
  orange: '#F97316',
  gold: '#FBBF24',
  red: '#E53935',
  deep: '#c2410c',
}

const ACCENT_RGB: Record<Accent, string> = {
  orange: '249,115,22',
  gold: '251,191,36',
  red: '229,57,53',
  deep: '194,65,12',
}

/* ===================================================================
   LetterboxSweep — brief horizontal bar sweep that crosses a pillar
   card as it reveals (the "scene change" effect).
   =================================================================== */
function LetterboxSweep({ accent }: { accent: Accent }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1.5 origin-left"
      style={{
        background: `linear-gradient(90deg, ${ACCENT_HEX[accent]}, transparent)`,
        boxShadow: `0 0 16px rgba(${ACCENT_RGB[accent]},0.7)`,
      }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

/* ===================================================================
   PillarCard — single editorial pillar row.
   Large index, icon, title, editorial copy. Cinematic reveal
   (fade + slight scale) + letterbox sweep on entry.
   =================================================================== */
function PillarCard({ p, index }: { p: Pillar; index: number }) {
  const { n, title, copy, Icon, accent } = p
  return (
    <motion.article
      data-cursor={title}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{
        duration: 0.85,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-colors duration-500 hover:border-[#F97316]/55 sm:p-8"
    >
      {/* letterbox sweep on entry */}
      <LetterboxSweep accent={accent} />

      {/* hover glow bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 120% at 0% 0%, rgba(${ACCENT_RGB[accent]},0.22), transparent 60%)`,
        }}
      />

      {/* === Top row: large index + icon === */}
      <div className="relative z-10 mb-6 flex items-start justify-between">
        <span
          className="text-6xl font-bold leading-none sm:text-7xl"
          style={{
            fontFamily: 'var(--font-display), sans-serif',
            color: ACCENT_HEX[accent],
            textShadow: `0 0 30px rgba(${ACCENT_RGB[accent]},0.45)`,
          }}
        >
          {n}
        </span>
        <motion.span
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/55 backdrop-blur-md transition-colors duration-300 group-hover:border-white/30 group-hover:text-white"
          whileHover={{ rotate: 4 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Icon className="h-5 w-5" />
        </motion.span>
      </div>

      {/* === Title === */}
      <h3
        className="relative z-10 text-3xl font-semibold leading-tight text-white sm:text-4xl"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        {title}
      </h3>

      {/* === Editorial copy === */}
      <p className="relative z-10 mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
        {copy}
      </p>

      {/* === Bottom hairline accent that fills on hover === */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{
          background: `linear-gradient(to right, ${ACCENT_HEX[accent]}, transparent)`,
        }}
      />
    </motion.article>
  )
}

/* ===================================================================
   SceneTransitionDivider — a thin letterbox band between the two
   pillar rows. Cinematic letterbox top + bottom black bars + a
   central orange flash that sweeps across as it scrolls into view.
   =================================================================== */
function SceneTransitionDivider() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-20%' }}
      transition={{ duration: 0.8 }}
      className="relative my-10 h-px w-full sm:my-14"
    >
      {/* center orange flash */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[2px] w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, #F97316, #FBBF24, #F97316, transparent)',
          boxShadow: '0 0 16px rgba(249,115,22,0.7)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* faint letterbox ticks left + right */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white/8 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white/8 to-transparent" />
    </motion.div>
  )
}

/* ===================================================================
   KineticArtOfStorytelling — Section 7 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function KineticArtOfStorytelling() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  // first 2 pillars (top row), last 3 pillars (bottom row)
  const topRow = pillars.slice(0, 2)
  const bottomRow = pillars.slice(2)

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      {/* Ambient orange atmosphere */}
      <OrangeAmbient />

      <div className="lg:flex">
        <OrangeStickyRail
          label="The Craft"
          caption="Storytelling"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* === Header block === */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-16 max-w-3xl"
          >
            <OrangeEyebrow number="07" label="The Craft" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>The Art of </MaskLine>
              <MaskLine delay={0.12}>
                <OrangeGradientText>Visual Storytelling</OrangeGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Cinema is a language. We speak it fluently — and refuse to
              waste a single frame. These are the five principles every
              Kinetic film is engineered against.
            </motion.p>
          </motion.div>

          {/* === Top row — 2 wide pillars (Emotion, Narrative) === */}
          <div className="relative z-10 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {topRow.map((p, i) => (
              <PillarCard key={p.n} p={p} index={i} />
            ))}
          </div>

          {/* === Scene transition divider === */}
          <div className="relative z-10">
            <SceneTransitionDivider />
          </div>

          {/* === Bottom row — 3 pillars (Attention, Memory, Impact) === */}
          <div className="relative z-10 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
            {bottomRow.map((p, i) => (
              <PillarCard key={p.n} p={p} index={i} />
            ))}
          </div>

          {/* === Closing statement === */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-16 max-w-3xl"
          >
            <div className="flex items-start gap-4 border-l-2 border-[#F97316]/60 pl-5 sm:pl-7">
              <p
                className="text-2xl font-semibold leading-snug text-white sm:text-3xl"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                Every frame should serve a purpose.{' '}
                <OrangeGradientText>
                  Every cut should earn its place.
                </OrangeGradientText>
              </p>
            </div>
          </motion.div>

          {/* === Bottom hairline divider === */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-16 h-px w-full origin-left bg-gradient-to-r from-[#F97316] via-[#F97316]/40 to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
