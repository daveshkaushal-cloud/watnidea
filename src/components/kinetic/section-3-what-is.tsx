'use client'

/**
 * KineticWhatIs — Section 3 of /kinetic-studio
 *
 * Full-screen storytelling. "What Is Kinetic Studio."
 *
 * Visual concept — the production pipeline:
 *   A horizontal film-production pipeline — story flows IN from the left
 *   (Concept), passes through 6 connected stages (Concept → Script →
 *   Production → Editing → Motion Graphics → Distribution), and emerges
 *   as a finished film on the right. Each stage is a node connected by
 *   SVG pipes with flowing orange energy. Particles travel along the
 *   pipes (driven by time). Mouse-reactive (useCursorParallax).
 *
 *   At the center of the pipeline sits "The Story Engine" — a pulsing
 *   core (OrangeEnergySphere at smaller scale) that radiates cinematic
 *   warmth and represents the living creative system uniting every stage.
 *
 * 6 stages:
 *   01 Concept · 02 Script · 03 Production · 04 Editing
 *   05 Motion Graphics · 06 Distribution
 *
 * 6 StageCards (glassmorphism) — one per stage, with lucide icon
 * (Lightbulb / PenLine / Camera / Scissors / Wand2 / Share2), name +
 * 1-line desc.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Canvas uses the HMR-safe __cleanup pattern.
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  ArrowUpRight,
  Camera,
  Film,
  Lightbulb,
  PenLine,
  Scissors,
  Share2,
  Sparkles,
  Wand2,
  type LucideIcon,
} from 'lucide-react'
import {
  OrangeEyebrow,
  OrangeGradientText,
  OrangeEnergySphere,
  MaskLine,
  useCursorParallax,
} from '@/components/kinetic/shared'

/* ===================================================================
   Content — verbatim paragraphs + 6 pipeline stages + 6 capability cards.
   =================================================================== */
const paragraphs = [
  {
    strong: 'Kinetic Studio',
    rest: ' is your complete production ecosystem. Concept enters. Script shapes it. Production captures it. Editing refines it. Motion graphics elevate it. Distribution releases it — every stage connected, every story engineered to move people.',
  },
  {
    strong: '',
    rest: 'Every frame has a purpose. Every cut has a reason. Every transition serves the story. Nothing is left to chance, and nothing is left unmeasured.',
  },
  {
    strong: '',
    rest: 'This is not a video agency. This is a storytelling powerhouse — a film production studio that turns ideas into cinematic experiences designed to capture attention and never let go.',
  },
]

type Stage = {
  n: string
  name: string
  // x position on the pipeline (0..100, left→right)
  x: number
  y: number
  Icon: LucideIcon
  desc: string
}

const stages: Stage[] = [
  {
    n: '01',
    name: 'Concept',
    x: 8,
    y: 50,
    Icon: Lightbulb,
    desc: 'The seed of the story.',
  },
  {
    n: '02',
    name: 'Script',
    x: 22.4,
    y: 38,
    Icon: PenLine,
    desc: 'Words that become worlds.',
  },
  {
    n: '03',
    name: 'Production',
    x: 36.8,
    y: 50,
    Icon: Camera,
    desc: 'Where the story is captured.',
  },
  {
    n: '04',
    name: 'Editing',
    x: 56.2,
    y: 38,
    Icon: Scissors,
    desc: 'Where the story is shaped.',
  },
  {
    n: '05',
    name: 'Motion Graphics',
    x: 75.6,
    y: 50,
    Icon: Wand2,
    desc: 'Where the story is elevated.',
  },
  {
    n: '06',
    name: 'Distribution',
    x: 90,
    y: 38,
    Icon: Share2,
    desc: 'Where the story is released.',
  },
]

// Round all stage coordinates to 3 decimals (hydration safety)
const stagePositions = stages.map((s) => ({
  ...s,
  x: Math.round(s.x * 1000) / 1000,
  y: Math.round(s.y * 1000) / 1000,
}))

type Card = {
  num: string
  title: string
  desc: string
  Icon: LucideIcon
  accent: boolean
}

const cards: Card[] = stagePositions.map((s, i) => ({
  num: s.n,
  title: s.name,
  desc: s.desc,
  Icon: s.Icon,
  accent: i % 2 === 0,
}))

/* ===================================================================
   HighlightCard — orange-hover glassmorphism card.
   =================================================================== */
function HighlightCard({ card, index }: { card: Card; index: number }) {
  const { num, title, desc, Icon, accent } = card
  return (
    <motion.article
      data-cursor="View"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 5 + index * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4,
        }}
        className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 group-hover:border-[#F97316]/50 group-hover:bg-white/[0.07] sm:p-6"
      >
        {/* hover glow — orange conic sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(120% 120% at 100% 0%, rgba(249,115,22,0.22), rgba(253,186,116,0.10) 50%, transparent 70%)',
          }}
        />

        {/* number + icon */}
        <div className="relative z-10 mb-5 flex items-center justify-between">
          <span
            className={`text-2xl font-bold ${
              accent
                ? 'bg-gradient-to-br from-[#fdba74] via-[#F97316] to-[#c2410c] bg-clip-text text-transparent'
                : 'text-white/30'
            }`}
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {num}
          </span>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300 ${
              accent
                ? 'border-[#F97316]/40 bg-[#F97316]/10 text-[#fdba74]'
                : 'border-white/10 bg-white/[0.05] text-white/55 group-hover:border-white/30 group-hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
        </div>

        <h3
          className="relative z-10 text-base font-semibold text-white sm:text-lg"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {title}
        </h3>
        <p className="relative z-10 mt-1.5 text-sm leading-relaxed text-white/55">
          {desc}
        </p>

        {/* arrow on hover */}
        <div className="relative z-10 mt-4 flex items-center gap-1.5 text-xs font-medium text-[#F97316] opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>Explore</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* bottom accent line */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#F97316] to-[#fdba74] transition-all duration-500 group-hover:w-full"
        />
      </motion.div>
    </motion.article>
  )
}

/* ===================================================================
   PipelineCanvas — particles flowing along the horizontal production
   pipeline. HMR-safe via __cleanup. Reduced-motion guard. Particles
   travel left→right along the zig-zag pipeline path.
   =================================================================== */
function PipelineCanvas() {
  return (
    <canvas
      ref={(c) => {
        if (!c) return
        const prev = (c as { __cleanup?: () => void }).__cleanup
        if (prev) prev()
        const ctx = c.getContext('2d')
        if (!ctx) return

        let raf = 0
        let w = 0
        let h = 0
        let dpr = 1
        const reduce =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches

        type P = {
          // progress 0..1 along the pipeline
          t: number
          speed: number
          r: number
          // 1 = orange, 2 = neon-orange, 3 = gold, 4 = white
          hue: 1 | 2 | 3 | 4
          phase: number
        }
        const ps: P[] = []

        // Pre-compute pipeline path points (mirror the SVG path y-coordinates,
        // but here in canvas pixels). 6-stage zig-zag.
        const samplePath = (t: number): { x: number; y: number } => {
          const xs = [0.08, 0.224, 0.368, 0.562, 0.756, 0.90]
          const ys = [0.50, 0.38, 0.50, 0.38, 0.50, 0.38]
          const seg = t * (xs.length - 1)
          const i = Math.min(xs.length - 2, Math.floor(seg))
          const f = seg - i
          return {
            x: (xs[i] + (xs[i + 1] - xs[i]) * f) * w,
            y: (ys[i] + (ys[i + 1] - ys[i]) * f) * h,
          }
        }

        const resize = () => {
          const parent = c.parentElement
          if (!parent) return
          dpr = Math.min(window.devicePixelRatio || 1, 2)
          w = parent.clientWidth
          h = parent.clientHeight
          c.width = w * dpr
          c.height = h * dpr
          c.style.width = w + 'px'
          c.style.height = h + 'px'
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

          ps.length = 0
          const n = reduce ? 0 : 75
          for (let i = 0; i < n; i++) {
            const roll = Math.random()
            const hue: P['hue'] =
              roll < 0.45 ? 1 : roll < 0.75 ? 2 : roll < 0.92 ? 3 : 4
            ps.push({
              t: Math.random(),
              speed: 0.0012 + Math.random() * 0.003,
              r: Math.random() * 1.6 + 0.5,
              hue,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          const t = performance.now() / 1000

          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
            p.t += p.speed
            if (p.t >= 1) p.t = 0
            const pos = samplePath(p.t)
            // subtle breathing
            const px = pos.x + Math.sin(t * 0.6 + p.phase) * 2
            const py = pos.y + Math.cos(t * 0.5 + p.phase) * 2

            const drawR = p.hue === 4 ? p.r * 2 : 8
            const g = ctx.createRadialGradient(px, py, 0, px, py, drawR)
            if (p.hue === 1) {
              const a = 0.5 + 0.3 * Math.sin(t * 2 + p.phase)
              g.addColorStop(0, `rgba(249,115,22,${a})`)
              g.addColorStop(1, 'rgba(249,115,22,0)')
            } else if (p.hue === 2) {
              const a = 0.55 + 0.3 * Math.sin(t * 2 + p.phase)
              g.addColorStop(0, `rgba(253,186,116,${a})`)
              g.addColorStop(1, 'rgba(253,186,116,0)')
            } else if (p.hue === 3) {
              const a = 0.45 + 0.3 * Math.sin(t * 2 + p.phase)
              g.addColorStop(0, `rgba(251,191,36,${a})`)
              g.addColorStop(1, 'rgba(251,191,36,0)')
            } else {
              const flick = 0.5 + 0.5 * Math.sin(t * 1.4 + p.phase)
              const a = 0.2 + 0.5 * flick
              g.addColorStop(0, `rgba(255,255,255,${a})`)
              g.addColorStop(1, 'rgba(255,255,255,0)')
            }
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(px, py, drawR, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.globalCompositeOperation = 'source-over'

          raf = requestAnimationFrame(draw)
        }

        resize()
        window.addEventListener('resize', resize)
        if (!reduce) raf = requestAnimationFrame(draw)

        ;(c as { __cleanup?: () => void }).__cleanup = () => {
          cancelAnimationFrame(raf)
          window.removeEventListener('resize', resize)
        }
      }}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}

/* ===================================================================
   PipelineVisual — the horizontal production pipeline (SVG pipes +
   nodes + "idea in" / "film out" labels). Mouse-reactive parallax.
   A central pulsing "Story Engine" core overlays the middle of the
   pipeline as the living creative system.
   =================================================================== */
function PipelineVisual({
  sx,
  sy,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  const pipeX = useTransform(sx, [0, 1], [-10, 10])
  const pipeY = useTransform(sy, [0, 1], [-6, 6])
  const nodeX = useTransform(sx, [0, 1], [-16, 16])
  const nodeY = useTransform(sy, [0, 1], [-10, 10])

  // Build the SVG pipe path through all 6 stage nodes (zig-zag)
  const pathD = stagePositions
    .map((s, i) => {
      if (i === 0) return `M ${s.x} ${s.y}`
      const prev = stagePositions[i - 1]
      const midX = Math.round(((prev.x + s.x) / 2) * 1000) / 1000
      return `Q ${midX} ${prev.y} ${s.x} ${s.y}`
    })
    .join(' ')

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* SVG pipes */}
      <motion.div style={{ x: pipeX, y: pipeY }} className="absolute inset-0">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="kinetic-pipe-flow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(249,115,22,0.15)" />
              <stop offset="50%" stopColor="rgba(253,186,116,0.85)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0.15)" />
            </linearGradient>
          </defs>
          {/* main pipe path */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#kinetic-pipe-flow)"
            strokeWidth={0.7}
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{ filter: 'drop-shadow(0 0 1.5px rgba(249,115,22,0.7))' }}
          />
          {/* dashed underlay pipe */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(249,115,22,0.2)"
            strokeWidth={0.4}
            strokeDasharray="1 1.5"
          />
        </svg>
      </motion.div>

      {/* Central "Story Engine" core (OrangeEnergySphere at small size) */}
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 sm:h-44 sm:w-44">
        <OrangeEnergySphere size={28} />
        {/* center label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <Sparkles className="h-4 w-4 text-[#fdba74] sm:h-5 sm:w-5" />
          <span
            className="mt-1 wn-eyebrow text-[8px] font-bold uppercase tracking-[0.22em] text-[#fdba74] sm:text-[9px]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Story Engine
          </span>
        </div>
      </div>

      {/* Stage nodes */}
      <motion.div
        style={{ x: nodeX, y: nodeY }}
        className="absolute inset-0"
      >
        {stagePositions.map((s, i) => (
          <motion.div
            key={`stage-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F97316]/40 bg-white/[0.06] backdrop-blur-xl sm:h-14 sm:w-14"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.25,
              }}
              style={{
                boxShadow:
                  i % 2 === 0
                    ? '0 0 22px rgba(249,115,22,0.45)'
                    : '0 0 22px rgba(253,186,116,0.4)',
              }}
            >
              <s.Icon className="h-5 w-5 text-[#fdba74] sm:h-6 sm:w-6" />
              {/* stage number badge */}
              <span
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#F97316]/40 bg-[#141414] text-[8px] font-bold text-[#fdba74]"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                {s.n}
              </span>
            </motion.div>
            {/* stage label */}
            <span
              className="absolute left-1/2 top-[120%] -translate-x-1/2 whitespace-nowrap wn-eyebrow text-[10px] font-semibold text-white/80 sm:text-[11px]"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {s.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* "Idea In" label on the left */}
      <motion.div
        className="absolute left-[1%] top-1/2 -translate-y-1/2 rounded-full border border-[#F97316]/30 bg-[#F97316]/8 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#fdba74]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        Idea In
      </motion.div>

      {/* "Film Out" label on the right */}
      <motion.div
        className="absolute right-[1%] top-1/2 -translate-y-1/2 rounded-full border border-[#fdba74]/45 bg-[#fdba74]/12 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#fdba74]"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        Film Out
      </motion.div>
    </div>
  )
}

/* ===================================================================
   KineticWhatIs — Section 3 named export
 *   =================================================================== */
export function KineticWhatIs() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // mouse-reactive parallax (declared unconditionally at top)
  const { sx, sy, handlers } = useCursorParallax(60, 20)

  // Subtle headline parallax driven by scroll
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -20])

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlers.move}
      onPointerLeave={handlers.leave}
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#141414]/70 px-5 py-24 backdrop-blur-sm sm:px-8 sm:py-32 lg:py-40"
      aria-label="What Is Kinetic Studio"
    >
      {/* Local ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.18), rgba(249,115,22,0) 65%)',
            filter: 'blur(30px)',
          }}
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute right-[8%] bottom-[10%] h-[26vw] w-[26vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0) 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.15, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6,
          }}
        />
        <motion.div
          aria-hidden
          className="absolute left-[6%] top-[14%] h-[22vw] w-[22vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(251,191,36,0.12), rgba(251,191,36,0) 70%)',
            filter: 'blur(44px)',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.18, 1] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.2,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <OrangeEyebrow number="03" label="The Studio" />

        {/* Massive headline */}
        <motion.h2
          style={{ y: headerY }}
          className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
        >
          <MaskLine>
            <span
              className="text-white"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              What Is
            </span>
          </MaskLine>
          <MaskLine delay={0.12}>
            <OrangeGradientText>Kinetic Studio</OrangeGradientText>
          </MaskLine>
        </motion.h2>

        {/* Split: body paragraphs (left) + pipeline visual (right) */}
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* LEFT: body paragraphs */}
          <div className="max-w-xl space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-base leading-relaxed text-white/65 sm:text-lg"
              >
                {p.strong && (
                  <span className="font-semibold text-white">{p.strong}</span>
                )}
                {p.rest}
              </motion.p>
            ))}

            {/* Sub-manifesto line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 border-l-2 border-[#F97316] pl-5"
            >
              <p
                className="text-xl font-medium leading-snug text-white sm:text-2xl"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                Six stages.{' '}
                <OrangeGradientText glow={false}>One engine.</OrangeGradientText>{' '}
                Stories that move people.
              </p>
            </motion.div>
          </div>

          {/* RIGHT: production pipeline visual */}
          <div className="relative">
            <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A]/80">
              <PipelineCanvas />
              <PipelineVisual sx={sx} sy={sy} />

              {/* corner labels */}
              <div className="pointer-events-none absolute left-4 top-4 wn-eyebrow text-[10px] text-white/45">
                The Production Pipeline
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 text-[10px] text-white/30">
                <Film className="h-3 w-3" />
                Concept · Script · Production · Editing · Motion · Distribution
              </div>
            </div>
          </div>
        </div>

        {/* 6 capability cards */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <HighlightCard key={card.num} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
