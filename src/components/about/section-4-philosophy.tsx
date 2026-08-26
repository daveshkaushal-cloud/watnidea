'use client'

/**
 * AboutPhilosophy — Section 4
 * Interactive manifesto wall — immersive chapters.
 *
 * Composition:
 *   - StickyRail (label: Philosophy, caption: Manifesto)
 *   - Header "Identity Lab Built for Growth" (Growth = red)
 *   - Sub-header "How We Build The Vibe" (The Vibe = red, curly quotes)
 *   - 3 immersive principle cards (Aesthetics Are Utility / Data Protects
 *     the Art / Built for the Future) with hover motion graphics
 *   - 3 full-width Identity Lab chapters (staggered, with chapter markers
 *     + masked lead + ambient per-chapter visual)
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'framer-motion'
import {
  ArrowUpRight,
  Eye,
  Fingerprint,
  Orbit,
  Rocket,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from './shared'

/* ===================================================================
   Content — verbatim copy.
   =================================================================== */
type Principle = {
  n: string
  title: string
  desc: string
  Icon: LucideIcon
  accent: boolean
}

const principles: Principle[] = [
  {
    n: '01',
    title: 'Aesthetics Are Utility',
    desc: 'Eye-catching visuals that elevate your brand.',
    Icon: Eye,
    accent: true,
  },
  {
    n: '02',
    title: 'Data Protects the Art',
    desc: 'Creative ideas powered by real data.',
    Icon: ShieldCheck,
    accent: false,
  },
  {
    n: '03',
    title: 'Built for the Future',
    desc: 'Driven by AI and evolving trends.',
    Icon: Rocket,
    accent: true,
  },
]

type Chapter = {
  eyebrow: string
  lead: string
  accent: string // the substring to render in red gradient
  motif: 'identity' | 'vibe' | 'growth'
}

const chapters: Chapter[] = [
  {
    eyebrow: 'Creative • Performance • AI',
    lead: 'Identity with Soul. Strategy with Teeth.',
    accent: 'Strategy with Teeth.',
    motif: 'identity',
  },
  {
    eyebrow: 'A Creative Manifesto',
    lead: 'watNidea is an Identity Lab.',
    accent: 'Identity Lab.',
    motif: 'vibe',
  },
  {
    eyebrow: 'The Principles',
    lead:
      'Aesthetics Are Utility. Data Protects the Art. Built for the Future.',
    accent: 'Built for the Future.',
    motif: 'growth',
  },
]

/* ===================================================================
   PrincipleCard — glassmorphism card with hover motion graphic.
   =================================================================== */
function PrincipleCard({ p, index }: { p: Principle; index: number }) {
  const { n, title, desc, Icon, accent } = p

  return (
    <motion.article
      data-cursor="Principle"
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.14,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 5 + index * 0.7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.5,
        }}
        className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md transition-colors duration-300 group-hover:border-[#E53935]/50 group-hover:bg-white/[0.07] sm:p-8"
      >
        {/* hover glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(120% 120% at 100% 0%, rgba(229,57,53,0.18), transparent 60%)',
          }}
        />

        {/* INTERACTIVE MOTION GRAPHIC: animated gradient sweep on hover */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, transparent 0%, rgba(229,57,53,0.18) 25%, transparent 50%, rgba(255,107,99,0.14) 75%, transparent 100%)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        {/* pulsing red ring on hover */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E53935]/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          animate={{ scale: [0.6, 1.8], opacity: [0.7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />

        <div className="relative z-10 mb-6 flex items-center justify-between">
          <span
            className={
              'text-3xl font-bold ' +
              (accent
                ? 'bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent'
                : 'text-white/25')
            }
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {n}
          </span>
          <span
            className={
              'flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300 ' +
              (accent
                ? 'border-[#E53935]/40 bg-[#E53935]/10 text-[#ff6b63]'
                : 'border-white/10 bg-white/[0.05] text-white/55 group-hover:border-white/30 group-hover:text-white')
            }
          >
            <Icon className="h-5 w-5" />
          </span>
        </div>

        <h4
          className="relative z-10 text-xl font-semibold text-white sm:text-2xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {title}
        </h4>
        <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/55 sm:text-base">
          {desc}
        </p>

        <div className="relative z-10 mt-6 flex items-center gap-1.5 text-xs font-medium text-[#E53935] opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>Explore</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-transparent transition-all duration-500 group-hover:w-full"
        />
      </motion.div>
    </motion.article>
  )
}

/* ===================================================================
   Chapter visuals — one motif per chapter, mouse-reactive.
   =================================================================== */
function IdentityMotif({
  sx,
  sy,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  const fgX = useTransform(sx, [0, 1], [-20, 20])
  const fgY = useTransform(sy, [0, 1], [-15, 15])
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <motion.div
        style={{ x: fgX, y: fgY }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {/* morphing identity mark */}
        <motion.div
          className="relative h-[36vw] w-[36vw] max-h-[360px] max-w-[360px]"
          animate={{
            borderRadius: ['28%', '50%', '46%', '50%', '28%'],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{
            border: '1px solid rgba(229,57,53,0.45)',
            background:
              'radial-gradient(circle, rgba(229,57,53,0.12), transparent 72%)',
          }}
        />
      </motion.div>
      {/* floating glyphs */}
      <motion.div
        className="absolute left-[15%] top-[24%]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Fingerprint className="h-8 w-8 text-[#E53935]/40" />
      </motion.div>
      <motion.div
        className="absolute right-[16%] top-[28%]"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Orbit className="h-10 w-10 text-white/30" />
      </motion.div>
      <motion.div
        className="absolute bottom-[26%] left-[22%]"
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="h-6 w-6 text-[#ff6b63]/70" />
      </motion.div>
    </div>
  )
}

function VibeMotif({
  sx,
  sy,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  const x = useTransform(sx, [0, 1], [-20, 20])
  const y = useTransform(sy, [0, 1], [-15, 15])
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <motion.div
        style={{ x, y }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <svg viewBox="0 0 400 400" className="h-[50vw] w-[50vw] max-h-[460px] max-w-[460px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.path
              key={i}
              d={`M40,${80 + i * 55} C140,${40 + i * 55} 260,${120 + i * 55} 360,${80 + i * 55}`}
              fill="none"
              stroke={`rgba(229,57,53,${0.7 - i * 0.1})`}
              strokeWidth={1.4 - i * 0.15}
              strokeLinecap="round"
              animate={{
                d: [
                  `M40,${80 + i * 55} C140,${40 + i * 55} 260,${120 + i * 55} 360,${80 + i * 55}`,
                  `M40,${80 + i * 55} C140,${120 + i * 55} 260,${40 + i * 55} 360,${80 + i * 55}`,
                  `M40,${80 + i * 55} C140,${40 + i * 55} 260,${120 + i * 55} 360,${80 + i * 55}`,
                ],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(229,57,53,0.6))' }}
            />
          ))}
        </svg>
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.45), rgba(229,57,53,0) 70%)',
          filter: 'blur(10px)',
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function GrowthMotif({
  sx,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  const bars = [38, 56, 72, 88, 100]
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute inset-x-[12%] bottom-[26%] h-px bg-white/10" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0.9 }}
      >
        <motion.polyline
          points="10,80 28,66 46,52 64,34 82,14"
          fill="none"
          stroke="rgba(229,57,53,0.7)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(229,57,53,0.6))' }}
        />
      </svg>
      <div
        className="absolute inset-x-[14%] bottom-[26%] flex items-end justify-between"
        style={{ height: '46%' }}
      >
        {bars.map((hPct, i) => (
          <GrowthBeam key={i} hPct={hPct} i={i} sx={sx} />
        ))}
      </div>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/70"
          style={{ left: `${18 + i * 16}%`, bottom: '24%' }}
          animate={{ y: [0, -220], opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

function GrowthBeam({
  hPct,
  i,
  sx,
}: {
  hPct: number
  i: number
  sx: MotionValue<number>
}) {
  const drift = useTransform(sx, (v) => v * (i - 2) * 4)
  const transform = useTransform(
    drift,
    (v) => `translateX(calc(-50% + ${v}px))`
  )
  return (
    <div className="relative flex-1" style={{ height: `${hPct}%` }}>
      <motion.div
        className="absolute bottom-0 w-full origin-bottom rounded-t-sm"
        style={{
          background:
            'linear-gradient(to top, rgba(229,57,53,0.5), rgba(255,255,255,0.12))',
          height: '100%',
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute -top-5 left-1/2 h-10 w-1 rounded-full"
        style={{
          background: 'linear-gradient(to top, rgba(229,57,53,0.9), transparent)',
          transform,
        }}
        animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
      />
    </div>
  )
}

const MotifMap = {
  identity: IdentityMotif,
  vibe: VibeMotif,
  growth: GrowthMotif,
} as const

/* ===================================================================
   ChapterPanel — full-width cinematic chapter.
   =================================================================== */
function ChapterPanel({
  chapter,
  index,
  total,
}: {
  chapter: Chapter
  index: number
  total: number
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0, 1, 1, 0]
  )
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.04])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])
  const contentX = useTransform(scrollYProgress, [0, 1], [40, -40])

  // chapter-local mouse parallax
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 80, damping: 20 })
  const sy = useSpring(py, { stiffness: 80, damping: 20 })

  const Motif = MotifMap[chapter.motif]

  // build the lead with the accent substring highlighted
  const renderLead = () => {
    const lead = chapter.lead
    const accent = chapter.accent
    const isBrandLine = lead.toLowerCase().startsWith('watnidea')

    if (isBrandLine) {
      // "watNidea is an Identity Lab." — lowercase w preserved
      const rest = lead.replace(/^watNidea/i, '')
      const restHasAccent = rest.includes(accent)
      if (restHasAccent) {
        const [before, after] = rest.split(accent)
        return (
          <MaskLine delay={0.1}>
            <span className="lowercase">watNidea</span>
            {before}
            <RedGradientText>{accent}</RedGradientText>
            {after}
          </MaskLine>
        )
      }
      return (
        <MaskLine delay={0.1}>
          <span className="lowercase">watNidea</span>
          {rest}
        </MaskLine>
      )
    }

    if (lead.includes(accent)) {
      const [before, after] = lead.split(accent)
      return (
        <MaskLine delay={0.1}>
          {before}
          <RedGradientText>{accent}</RedGradientText>
          {after}
        </MaskLine>
      )
    }
    return <MaskLine delay={0.1}>{lead}</MaskLine>
  }

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        px.set(((e.clientX - r.left) / r.width - 0.5) * 2)
        py.set(((e.clientY - r.top) / r.height - 0.5) * 2)
      }}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
      }}
      className="relative flex min-h-[90svh] items-center overflow-hidden border-t border-white/5 px-5 sm:px-8"
    >
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Motif sx={sx} sy={sy} />
      </motion.div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        {/* chapter marker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-center gap-3"
        >
          <span
            className="text-xs font-bold text-[#E53935]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Ch. {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-8 bg-[#E53935]/60" />
          <span className="wn-eyebrow text-[11px] font-medium text-white/55 sm:text-xs">
            {chapter.eyebrow}
          </span>
          <span className="ml-auto text-[10px] uppercase tracking-[0.3em] text-white/30">
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(total).padStart(2, '0')}
          </span>
        </motion.div>

        {/* lead — large dynamic typography */}
        <motion.h3
          style={{ x: contentX, fontFamily: 'var(--font-display), sans-serif' }}
          className="text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {renderLead()}
        </motion.h3>
      </motion.div>

      {/* chapter progress line */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 h-12 w-px -translate-x-1/2 overflow-hidden bg-white/10"
      >
        <motion.div
          className="absolute inset-0 bg-[#E53935]"
          style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}

/* ===================================================================
   AboutPhilosophy — Section 4 default export
   =================================================================== */
export default function AboutPhilosophy() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <StickyRail
          label="Philosophy"
          caption="Manifesto"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Header block */}
          <motion.div style={{ y: headerY }} className="mb-16">
            <SectionEyebrow number="05" label="The Philosophy" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Identity Lab Built for </MaskLine>
              <MaskLine delay={0.12}>
                <RedGradientText>Growth</RedGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-2xl text-white/70"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              How We Build{' '}
              <RedGradientText glow={false}>&ldquo;The Vibe&rdquo;</RedGradientText>
            </motion.p>
          </motion.div>

          {/* 3 immersive principle cards */}
          <div className="mb-32 grid grid-cols-1 gap-5 md:grid-cols-3">
            {principles.map((p, i) => (
              <PrincipleCard key={p.n} p={p} index={i} />
            ))}
          </div>

          {/* 3 full-width Identity Lab chapters */}
          <div className="mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#E53935]" />
              <span className="wn-eyebrow text-[10px] font-medium text-[#E53935]">
                The Manifesto
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#E53935]/40 to-transparent" />
            </motion.div>

            {chapters.map((c, i) => (
              <ChapterPanel
                key={i}
                chapter={c}
                index={i}
                total={chapters.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
