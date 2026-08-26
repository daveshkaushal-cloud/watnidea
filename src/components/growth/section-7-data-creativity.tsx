'use client'

/**
 * GrowthDataCreativity — Section 7 of /growth-alchemy
 *
 * EDITORIAL STORYTELLING + INTERACTIVE FUSION VISUALIZATION.
 *
 * Composition:
 *   - Eyebrow: (07) · Data + Creativity (GreenEyebrow)
 *   - Headline: "Human Creativity." + "Machine Intelligence."
 *     ("Machine Intelligence." emerald gradient)
 *   - 3 editorial paragraphs (verbatim).
 *   - Interactive comparison visualization:
 *       • LEFT column  "CREATIVITY" — Sparkles/Palette/Wand/Heart icons
 *         floating over organic blob shapes.
 *       • RIGHT column "DATA"       — BarChart3/LineChart/Target/Activity
 *         icons floating over a geometric grid.
 *       • CENTER: emerald fusion core where streams from both sides
 *         converge as scrollYProgress advances.
 *     Mouse-reactive (useCursorParallax), scroll-driven convergence.
 *   - 3 HighlightCards: "Creative-Led, Data-Driven", "Test Everything,
 *     Trust Numbers", "Scale What Resonates".
 *   - GreenStickyRail ("Alchemy" / "Fusion").
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
  Activity,
  BarChart3,
  Heart,
  LineChart,
  Palette,
  Sparkles,
  Target,
  TrendingUp,
  Wand2,
  type LucideIcon,
} from 'lucide-react'
import {
  GreenEyebrow,
  GreenGradientText,
  GreenStickyRail,
  MaskLine,
  useCursorParallax,
} from '@/components/growth/shared'

/* ===================================================================
   Editorial paragraphs — verbatim from spec.
   =================================================================== */
const paragraphs = [
  {
    lead: 'Data without creativity is just numbers.',
    body: 'Creativity without data is just noise. We fuse them — every creative decision informed by performance signal, every data point amplified by human craft.',
  },
  {
    lead: 'Our strategists read the dashboard.',
    body: 'Our creatives read the culture. Together they craft campaigns that perform on paper and resonate in the feed.',
  },
  {
    lead: 'This is the alchemy —',
    body: 'the fusion of art and algorithm, intuition and attribution, story and scale.',
  },
]

/* ===================================================================
   Highlight cards — 3 principles.
   =================================================================== */
type Highlight = {
  n: string
  title: string
  desc: string
  Icon: LucideIcon
  accent: 'emerald' | 'neon' | 'deep'
}

const highlights: Highlight[] = [
  {
    n: '01',
    title: 'Creative-Led, Data-Driven',
    desc: 'Every concept earns its keep. We lead with the creative leap, then hold it accountable to the numbers until both are sharp enough to scale.',
    Icon: Sparkles,
    accent: 'emerald',
  },
  {
    n: '02',
    title: 'Test Everything, Trust Numbers',
    desc: 'We test creative angles, audiences, hooks, and funnels — relentlessly. Then we let the data decide what scales and what gets cut.',
    Icon: BarChart3,
    accent: 'neon',
  },
  {
    n: '03',
    title: 'Scale What Resonates',
    desc: 'Scale is the proof. We push the winners harder, monitor ROAS in real time, and pull budget the moment a signal softens.',
    Icon: TrendingUp,
    accent: 'deep',
  },
]

const ACCENT_HEX: Record<Highlight['accent'], string> = {
  emerald: '#10B981',
  neon: '#6ee7b7',
  deep: '#047857',
}

const ACCENT_RGB: Record<Highlight['accent'], string> = {
  emerald: '16,185,129',
  neon: '110,231,183',
  deep: '4,120,87',
}

/* ===================================================================
   CREATIVITY side — 4 icons over organic blob shapes.
   Pre-rounded positions for hydration safety.
   =================================================================== */
type SideIcon = {
  Icon: LucideIcon
  top: string
  delay: number
  dur: number
}

const CREATIVITY_ICONS: SideIcon[] = [
  { Icon: Sparkles, top: '14%', delay: 0, dur: 6 },
  { Icon: Palette, top: '36%', delay: 0.7, dur: 7 },
  { Icon: Wand2, top: '58%', delay: 1.4, dur: 6.5 },
  { Icon: Heart, top: '80%', delay: 0.4, dur: 7.5 },
]

const DATA_ICONS: SideIcon[] = [
  { Icon: BarChart3, top: '14%', delay: 0.2, dur: 7 },
  { Icon: LineChart, top: '36%', delay: 1.1, dur: 6.5 },
  { Icon: Target, top: '58%', delay: 0.5, dur: 7.5 },
  { Icon: Activity, top: '80%', delay: 1.8, dur: 6 },
]

/* ===================================================================
   FusionViz — interactive comparison visualization.
   - LEFT CREATIVITY column with organic blob + 4 floating icons
   - RIGHT DATA column with geometric grid + 4 floating icons
   - CENTER emerald fusion core
   - SVG streams (4 from each side) extend toward center, growing
     via pathLength as scrollYProgress advances.
   - Mouse-reactive parallax (useCursorParallax) on left/right/core.
   =================================================================== */
function FusionViz({
  sx,
  sy,
  scrollYProgress,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
  scrollYProgress: MotionValue<number>
}) {
  // parallax: opposite directions for left vs right
  const leftX = useTransform(sx, [0, 1], [-18, 18])
  const leftY = useTransform(sy, [0, 1], [-14, 14])
  const rightX = useTransform(sx, [0, 1], [18, -18])
  const rightY = useTransform(sy, [0, 1], [-14, 14])
  const coreX = useTransform(sx, [0, 1], [-6, 6])
  const coreY = useTransform(sy, [0, 1], [-4, 4])

  // scroll-driven convergence
  const streamLen = useTransform(scrollYProgress, [0.1, 0.55], [0, 1])
  const coreOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0.35, 1])
  const coreScale = useTransform(scrollYProgress, [0.15, 0.55], [0.7, 1])

  // pre-compute stream path geometry (4 streams each side, converging to center 50,50)
  const leftStreams = [22, 36, 64, 78].map((yTop) => ({
    d: `M 14 ${yTop} Q 32 ${yTop}, 50 50`,
    yTop: Math.round(yTop * 1000) / 1000,
  }))
  const rightStreams = [22, 36, 64, 78].map((yTop) => ({
    d: `M 86 ${yTop} Q 68 ${yTop}, 50 50`,
    yTop: Math.round(yTop * 1000) / 1000,
  }))

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* === bg ambient blobs === */}
      <motion.div
        className="absolute left-[12%] top-[20%] h-[34vw] w-[34vw] max-h-[400px] max-w-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.18), rgba(16,185,129,0.05) 50%, rgba(16,185,129,0) 75%)',
          filter: 'blur(34px)',
        }}
        animate={{
          scale: [1, 1.18, 0.92, 1],
          rotate: [0, 22, -16, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[12%] top-[20%] h-[34vw] w-[34vw] max-h-[400px] max-w-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(110,231,183,0.16), rgba(110,231,183,0.05) 50%, rgba(110,231,183,0) 75%)',
          filter: 'blur(34px)',
        }}
        animate={{
          scale: [1, 1.2, 0.9, 1],
          rotate: [0, -22, 18, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* center ambient — biggest, slow pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[42vw] w-[42vw] max-h-[480px] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.22), rgba(16,185,129,0.07) 40%, rgba(16,185,129,0) 70%)',
          filter: 'blur(38px)',
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* === SVG convergence streams === */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="left-stream" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(16,185,129,0.7)" />
            <stop offset="100%" stopColor="rgba(110,231,183,0.85)" />
          </linearGradient>
          <linearGradient id="right-stream" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(110,231,183,0.7)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.85)" />
          </linearGradient>
        </defs>

        {/* left → center streams */}
        {leftStreams.map((s, i) => (
          <motion.path
            key={`ls-${i}`}
            d={s.d}
            fill="none"
            stroke="url(#left-stream)"
            strokeWidth={0.34}
            strokeLinecap="round"
            style={{
              pathLength: streamLen,
              filter: 'drop-shadow(0 0 1.5px rgba(16,185,129,0.7))',
            }}
          />
        ))}
        {/* right → center streams */}
        {rightStreams.map((s, i) => (
          <motion.path
            key={`rs-${i}`}
            d={s.d}
            fill="none"
            stroke="url(#right-stream)"
            strokeWidth={0.34}
            strokeLinecap="round"
            style={{
              pathLength: streamLen,
              filter: 'drop-shadow(0 0 1.5px rgba(110,231,183,0.7))',
            }}
          />
        ))}
      </svg>

      {/* === LEFT CREATIVITY column === */}
      <motion.div
        style={{ x: leftX, y: leftY }}
        className="absolute left-[4%] top-1/2 hidden h-[70%] -translate-y-1/2 md:block lg:left-[6%]"
      >
        <div className="relative flex h-full flex-col justify-between py-4">
          {/* organic blob behind icons */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[260px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.18), rgba(16,185,129,0) 70%)',
              filter: 'blur(20px)',
            }}
            animate={{
              scale: [1, 1.2, 0.92, 1],
              rotate: [0, 12, -8, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* column label */}
          <span
            className="wn-eyebrow absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-semibold tracking-[0.35em] text-[#10B981]/70"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            CREATIVITY
          </span>

          {/* floating icons */}
          {CREATIVITY_ICONS.map((ic, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-xl border border-[#10B981]/35 bg-white/[0.06] backdrop-blur-md"
              style={{ top: ic.top }}
              animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
              transition={{
                duration: ic.dur,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: ic.delay,
              }}
            >
              <ic.Icon className="h-5 w-5 text-[#6ee7b7]" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* === RIGHT DATA column === */}
      <motion.div
        style={{ x: rightX, y: rightY }}
        className="absolute right-[4%] top-1/2 hidden h-[70%] -translate-y-1/2 md:block lg:right-[6%]"
      >
        <div className="relative flex h-full flex-col justify-between py-4">
          {/* geometric grid behind icons */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[260px] w-[160px] -translate-x-1/2 -translate-y-1/2 opacity-50"
            style={{
              backgroundImage:
                'linear-gradient(rgba(110,231,183,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.18) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              maskImage:
                'radial-gradient(circle at center, black 30%, transparent 75%)',
              WebkitMaskImage:
                'radial-gradient(circle at center, black 30%, transparent 75%)',
            }}
          />
          {/* column label */}
          <span
            className="wn-eyebrow absolute -right-2 top-1/2 -translate-y-1/2 rotate-90 text-[10px] font-semibold tracking-[0.35em] text-[#6ee7b7]/70"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            DATA
          </span>

          {/* floating icons */}
          {DATA_ICONS.map((ic, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-xl border border-[#6ee7b7]/35 bg-white/[0.06] backdrop-blur-md"
              style={{ top: ic.top }}
              animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
              transition={{
                duration: ic.dur,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: ic.delay,
              }}
            >
              <ic.Icon className="h-5 w-5 text-[#10B981]" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* === CENTER fusion core === */}
      <motion.div
        style={{ x: coreX, y: coreY, opacity: coreOpacity, scale: coreScale }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {/* outer glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(16,185,129,0.5), rgba(16,185,129,0.1) 50%, rgba(16,185,129,0) 75%)',
            filter: 'blur(14px)',
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* core bloom */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(167,243,208,0.85), rgba(16,185,129,0.5) 50%, rgba(16,185,129,0) 80%)',
            filter: 'blur(8px)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
        />
        {/* bright pinpoint center */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ filter: 'blur(1px)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* fusion label */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span
            className="wn-eyebrow text-[9px] font-bold tracking-[0.35em] text-[#6ee7b7]"
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              textShadow: '0 0 14px rgba(110,231,183,0.9)',
            }}
          >
            FUSION
          </span>
        </div>
      </motion.div>
    </div>
  )
}

/* ===================================================================
   HighlightCard — single glassmorphism principle card.
   =================================================================== */
function HighlightCard({ h, index }: { h: Highlight; index: number }) {
  const { n, title, desc, Icon, accent } = h
  return (
    <motion.article
      data-cursor={title}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-[#10B981]/50 sm:p-7"
    >
      {/* hover emerald/neon glow bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 120% at 0% 0%, rgba(${ACCENT_RGB[accent]},0.22), transparent 60%)`,
        }}
      />

      {/* top row: number + icon */}
      <div className="relative z-10 mb-5 flex items-center justify-between">
        <span
          className="text-2xl font-bold text-white/25"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {n}
        </span>
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/55 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white"
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      {/* title */}
      <h4
        className="relative z-10 text-xl font-semibold text-white sm:text-2xl"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        {title}
      </h4>

      {/* descriptor */}
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/55 sm:text-[15px]">
        {desc}
      </p>

      {/* bottom hairline accent that fills on hover */}
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
   GrowthDataCreativity — Section 7 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function GrowthDataCreativity() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  // mouse-reactive parallax for the fusion viz
  const { sx, sy, handlers } = useCursorParallax(60, 20)

  return (
    <div
      ref={sectionRef}
      onPointerMove={handlers.move}
      onPointerLeave={handlers.leave}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <GreenStickyRail
          label="Alchemy"
          caption="Fusion"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Fusion visualization — behind content, mouse-reactive */}
          <FusionViz sx={sx} sy={sy} scrollYProgress={scrollYProgress} />

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-16 max-w-3xl"
          >
            <GreenEyebrow number="07" label="Data + Creativity" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Human Creativity.</MaskLine>
              <MaskLine delay={0.12}>
                <GreenGradientText>Machine Intelligence.</GreenGradientText>
              </MaskLine>
            </h2>
          </motion.div>

          {/* Editorial paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mb-20 flex max-w-3xl flex-col gap-8"
          >
            {paragraphs.map((p, i) => (
              <div key={i} className="flex gap-5">
                <span
                  className="mt-1 shrink-0 text-sm font-bold text-[#10B981]"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  ({String(i + 1).padStart(2, '0')})
                </span>
                <p className="text-lg leading-relaxed text-white/65 sm:text-xl">
                  <span className="font-semibold text-white">{p.lead} </span>
                  {p.body}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Highlight cards — 3 principles */}
          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {highlights.map((h, i) => (
              <HighlightCard key={h.n} h={h} index={i} />
            ))}
          </div>

          {/* Bottom hairline divider */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-16 h-px w-full origin-left bg-gradient-to-r from-[#10B981] via-[#10B981]/40 to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
