'use client'

/**
 * DhqWhatWeBuild — Section 4
 * Interactive capabilities wall — immersive chapters.
 *
 * Composition:
 *   - StickyRail (label: Build, caption: Capabilities, accent: blue)
 *   - Header "Identity Lab Built for Conversion" (Conversion = blue)
 *   - Sub-header "How We Build The Engine" (The Engine = blue, curly quotes)
 *   - 3 immersive principle cards (Design With Soul / Engineering With Teeth /
 *     Built for the Future) with hover motion graphics
 *   - 3 full-width chapters (staggered, with chapter markers + masked lead +
 *     ambient per-chapter visual)
 *
 * COLOR IDENTITY: Electric Blue (#3B82F6) — StickyRail, eyebrows, principle
 * cards' hover glows + motion graphics, chapter markers + progress lines all
 * carry the blue signature hue.
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
  Cpu,
  Layout,
  Rocket,
  type LucideIcon,
} from 'lucide-react'
import {
  MaskLine,
  SectionEyebrow,
  StickyRail,
} from '@/components/about/shared'
import { BlueGradientText, DHQ } from './shared'

const accent = DHQ

/* ===================================================================
   Content — verbatim-adjacent, on-brand copy.
   =================================================================== */
type Principle = {
  n: string
  title: string
  desc: string
  Icon: LucideIcon
  highlight: boolean
}

const principles: Principle[] = [
  {
    n: '01',
    title: 'Design With Soul',
    desc: 'Interfaces that feel alive, not assembled.',
    Icon: Layout,
    highlight: true,
  },
  {
    n: '02',
    title: 'Engineering With Teeth',
    desc: 'Performance budgets enforced, not negotiated.',
    Icon: Cpu,
    highlight: false,
  },
  {
    n: '03',
    title: 'Built for the Future',
    desc: 'AI-ready, headless, and composable.',
    Icon: Rocket,
    highlight: true,
  },
]

type Chapter = {
  eyebrow: string
  lead: string
  accentText: string // the substring to render in blue gradient
  motif: 'architecture' | 'speed' | 'conversion'
}

const chapters: Chapter[] = [
  {
    eyebrow: 'Architecture • Performance • Conversion',
    lead: 'Architecture before aesthetics.',
    accentText: 'Architecture',
    motif: 'architecture',
  },
  {
    eyebrow: 'A Build Manifesto',
    lead: 'Speed is a feature.',
    accentText: 'Speed',
    motif: 'speed',
  },
  {
    eyebrow: 'The Principles',
    lead: 'Conversion is the brief. Always.',
    accentText: 'Conversion',
    motif: 'conversion',
  },
]

/* ===================================================================
   PrincipleCard — glassmorphism card with hover motion graphic (blue).
   =================================================================== */
function PrincipleCard({ p, index }: { p: Principle; index: number }) {
  const { n, title, desc, Icon, highlight } = p

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
        className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-colors duration-300 sm:p-8"
        style={
          {
            '--svc-rgb': accent.rgb,
          } as React.CSSProperties
        }
      >
        {/* hover glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(120% 120% at 100% 0%, rgba(${accent.rgb},0.18), transparent 60%)`,
          }}
        />

        {/* INTERACTIVE MOTION GRAPHIC: animated blue gradient sweep on hover */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, rgba(${accent.rgb},0.18) 25%, transparent 50%, rgba(${accent.softRgb},0.14) 75%, transparent 100%)`,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        {/* pulsing blue ring on hover */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ border: `1px solid rgba(${accent.rgb},0.5)` }}
          animate={{ scale: [0.6, 1.8], opacity: [0.7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />

        <div className="relative z-10 mb-6 flex items-center justify-between">
          <span
            className={
              'text-3xl font-bold ' +
              (highlight
                ? 'bg-gradient-to-br from-[#93C5FD] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent'
                : 'text-white/25')
            }
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {n}
          </span>
          <span
            className={
              'flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300 ' +
              (highlight
                ? ''
                : 'border-white/10 bg-white/[0.03] text-white/55 group-hover:border-white/30 group-hover:text-white')
            }
            style={
              highlight
                ? {
                    borderColor: `rgba(${accent.rgb},0.4)`,
                    background: `rgba(${accent.rgb},0.1)`,
                    color: accent.soft,
                  }
                : undefined
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

        <div
          className="relative z-10 mt-6 flex items-center gap-1.5 text-xs font-medium opacity-0 transition-all duration-300 group-hover:opacity-100"
          style={{ color: accent.soft }}
        >
          <span>Explore</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
          style={{
            background: `linear-gradient(to right, ${accent.hex}, transparent)`,
          }}
        />
      </motion.div>
    </motion.article>
  )
}

/* ===================================================================
   Chapter visuals — one motif per chapter, mouse-reactive (blue).
   =================================================================== */

/* Architecture motif — blueprint grid + structural nodes. */
function ArchitectureMotif({
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
      <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0">
        {/* blueprint grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(rgba(${accent.softRgb},0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(${accent.softRgb},0.16) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* structural morphing frame */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[36vw] w-[36vw] max-h-[360px] max-w-[360px] -translate-x-1/2 -translate-y-1/2"
          animate={{
            borderRadius: ['12%', '24%', '18%', '24%', '12%'],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{
            border: `1px solid rgba(${accent.rgb},0.45)`,
            background: `radial-gradient(circle, rgba(${accent.rgb},0.12), transparent 72%)`,
          }}
        />
        {/* structural nodes */}
        {[
          { l: '24%', t: '30%' },
          { l: '70%', t: '34%' },
          { l: '30%', t: '68%' },
          { l: '72%', t: '66%' },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: p.l,
              top: p.t,
              background: accent.hex,
              boxShadow: `0 0 10px rgba(${accent.rgb},0.9)`,
            }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </motion.div>
    </div>
  )
}

/* Speed motif — velocity lines + performance pulse. */
function SpeedMotif({
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
              stroke={`rgba(${accent.rgb},${0.7 - i * 0.1})`}
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
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ filter: `drop-shadow(0 0 6px rgba(${accent.rgb},0.6))` }}
            />
          ))}
        </svg>
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${accent.rgb},0.45), rgba(${accent.rgb},0) 70%)`,
          filter: 'blur(10px)',
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* velocity ticks */}
      <motion.div
        className="absolute right-[14%] top-[28%] rounded-full border px-3 py-1 text-[10px] font-semibold"
        style={{
          borderColor: `rgba(${accent.rgb},0.4)`,
          background: `rgba(${accent.rgb},0.1)`,
          color: accent.soft,
          fontFamily: 'var(--font-display), sans-serif',
        }}
        animate={{ y: [0, -6, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        &lt; 1.0s LCP
      </motion.div>
    </div>
  )
}

/* Conversion motif — funnel + ascending action. */
function ConversionMotif({
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
          stroke={`rgba(${accent.rgb},0.7)`}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 4px rgba(${accent.rgb},0.6))` }}
        />
      </svg>
      <div
        className="absolute inset-x-[14%] bottom-[26%] flex items-end justify-between"
        style={{ height: '46%' }}
      >
        {bars.map((hPct, i) => (
          <ConvBeam key={i} hPct={hPct} i={i} sx={sx} />
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

function ConvBeam({
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
          background: `linear-gradient(to top, rgba(${accent.rgb},0.5), rgba(255,255,255,0.12))`,
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
          background: `linear-gradient(to top, ${accent.hex}, transparent)`,
          transform,
        }}
        animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
      />
    </div>
  )
}

const MotifMap = {
  architecture: ArchitectureMotif,
  speed: SpeedMotif,
  conversion: ConversionMotif,
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
    const accentText = chapter.accentText
    if (lead.includes(accentText)) {
      const [before, after] = lead.split(accentText)
      return (
        <MaskLine delay={0.1}>
          {before}
          <BlueGradientText>{accentText}</BlueGradientText>
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
            className="text-xs font-bold"
            style={{ fontFamily: 'var(--font-display), sans-serif', color: accent.hex }}
          >
            Ch. {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-8" style={{ background: `rgba(${accent.rgb},0.6)` }} />
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
          className="absolute inset-0"
          style={{ scaleY: scrollYProgress, transformOrigin: 'top', background: accent.hex }}
        />
      </motion.div>
    </section>
  )
}

/* ===================================================================
   DhqWhatWeBuild — Section 4 default export
   =================================================================== */
export default function DhqWhatWeBuild() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#050505]"
    >
      <div className="lg:flex">
        <StickyRail
          label="Build"
          caption="Capabilities"
          sectionRef={sectionRef}
          accent={accent}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Header block */}
          <motion.div style={{ y: headerY }} className="mb-16">
            <SectionEyebrow number="04" label="What We Build" accent={accent} />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Identity Lab Built for </MaskLine>
              <MaskLine delay={0.12}>
                <BlueGradientText>Conversion</BlueGradientText>
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
              <BlueGradientText glow={false}>&ldquo;The Engine&rdquo;</BlueGradientText>
            </motion.p>
          </motion.div>

          {/* 3 immersive principle cards */}
          <div className="mb-32 grid grid-cols-1 gap-5 md:grid-cols-3">
            {principles.map((p, i) => (
              <PrincipleCard key={p.n} p={p} index={i} />
            ))}
          </div>

          {/* 3 full-width chapters */}
          <div className="mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="h-px w-8" style={{ background: `linear-gradient(to right, transparent, ${accent.hex})` }} />
              <span
                className="wn-eyebrow text-[10px] font-medium"
                style={{ color: accent.hex }}
              >
                The Build Manifesto
              </span>
              <span className="h-px flex-1" style={{ background: `linear-gradient(to right, rgba(${accent.rgb},0.4), transparent)` }} />
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
