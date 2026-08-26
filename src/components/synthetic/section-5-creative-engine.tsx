'use client'

/**
 * SynthCreativeEngine — Section 5 of /synthetic-cinema
 *
 * Full-screen storytelling — a MASSIVE HORIZONTAL AI CONTENT REACTOR.
 * Scroll-controlled.
 *
 * Composition:
 *   - Eyebrow: (05) · The Creative Engine (PurpleEyebrow)
 *   - Headline: "The Creative Engine." (hidden header — reactor is the focus)
 *
 * Visual concept — the content reactor:
 *   Outer min-h-[300vh] + inner sticky top-0 h-screen.
 *   6 stages laid out horizontally left-to-right:
 *     Imagine → Generate → Refine → Animate → Launch → Scale.
 *   Each stage lights up purple as scrollYProgress passes its threshold;
 *   inactive stages are dim white/20. SVG connectors between stages carry
 *   flowing purple/magenta energy (animated strokeDashoffset driven by
 *   scroll). Canvas particles flow left→right along the engine path,
 *   erupting brighter near the central reactor hub (Generate stage).
 *   A live progress indicator tracks the active stage (no fake
 *   "generated scenes" counter — AI output is directed, not counted).
 *
 * Progress indicator: 6 ProgressDots (width animates 8px→32px based on
 * active stage) + ActiveStage counter subscribing to scrollYProgress
 * showing "01 Imagine" → "06 Scale".
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Canvas uses the HMR-safe __cleanup pattern.
 */

import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  Film,
  Lightbulb,
  Maximize2,
  Rocket,
  SlidersHorizontal,
  Wand2,
  type LucideIcon,
} from 'lucide-react'
import {
  PurpleEyebrow,
  PurpleGradientText,
  MaskLine,
} from '@/components/synthetic/shared'

/* ===================================================================
   Content — 6 creative engine stages.
   =================================================================== */
type Stage = {
  n: string
  name: string
  desc: string
  Icon: LucideIcon
  // x position on the horizontal pipeline (0..100)
  x: number
  // is this the central "hub" reactor stage? (Generate)
  hub?: boolean
}

const stages: Stage[] = [
  {
    n: '01',
    name: 'Imagine',
    desc: 'An idea enters the reactor.',
    Icon: Lightbulb,
    x: 6,
  },
  {
    n: '02',
    name: 'Generate',
    desc: 'AI drafts scenes for direction review.',
    Icon: Wand2,
    x: 23.6,
    hub: true,
  },
  {
    n: '03',
    name: 'Refine',
    desc: 'Style, color and composition tuned under direction.',
    Icon: SlidersHorizontal,
    x: 41.2,
  },
  {
    n: '04',
    name: 'Animate',
    desc: 'Static frames become living cinematic motion.',
    Icon: Film,
    x: 58.8,
  },
  {
    n: '05',
    name: 'Launch',
    desc: 'The campaign goes live — multi-channel, scalable.',
    Icon: Rocket,
    x: 76.4,
  },
  {
    n: '06',
    name: 'Scale',
    desc: 'Variations and formats, produced under direction.',
    Icon: Maximize2,
    x: 94,
  },
]

// Round positions (already integers but safe)
const stagePositions = stages.map((s) => ({
  ...s,
  x: Math.round(s.x * 1000) / 1000,
}))

/* ===================================================================
   ReactorCanvas — particles flowing left→right along the horizontal
 *   reactor rail. Particles erupting brighter near the central Generate
 *   hub. Density + speed intensifies with scroll progress.
 *   HMR-safe via __cleanup on the canvas element. Reduced-motion guard.
 *   =================================================================== */
function ReactorCanvas({
  progress,
}: {
  progress: MotionValue<number>
}) {
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
        let progressVal = 0
        const reduce =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches

        type P = {
          // 0..1 position along the rail (left→right)
          t: number
          speed: number
          r: number
          // 1 = purple, 2 = violet, 3 = magenta, 4 = white
          hue: 1 | 2 | 3 | 4
          phase: number
          // small vertical offset for visual variety
          offsetY: number
        }
        const ps: P[] = []

        const unsubscribe = progress.on('change', (v) => {
          progressVal = v
        })

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
          const n = reduce ? 0 : 70
          for (let i = 0; i < n; i++) {
            const roll = Math.random()
            const hue: P['hue'] =
              roll < 0.35 ? 1 : roll < 0.6 ? 2 : roll < 0.85 ? 3 : 4
            ps.push({
              t: Math.random(),
              speed: 0.001 + Math.random() * 0.003,
              r: Math.random() * 1.6 + 0.5,
              hue,
              phase: Math.random() * Math.PI * 2,
              offsetY: (Math.random() - 0.5) * 18,
            })
          }
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          const t = performance.now() / 1000
          // particles travel faster as scroll progresses
          const speedMul = 0.4 + progressVal * 1.8

          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
            p.t += p.speed * speedMul
            if (p.t >= 1) p.t = 0
            // rail y: slightly wavy
            const px = p.t * w
            const py = h * 0.5 + Math.sin(p.t * Math.PI * 3 + t) * 6 + p.offsetY
            // particles erupting brighter near the Generate hub (t≈0.236)
            const hubBoost =
              0.18 < p.t && p.t < 0.3 ? 1.8 : 0.5 + p.t * 0.5

            const drawR = p.hue === 4 ? p.r * 2 : 9
            const g = ctx.createRadialGradient(px, py, 0, px, py, drawR)
            if (p.hue === 1) {
              const a = Math.min(1, (0.4 + 0.3 * Math.sin(t * 2 + p.phase)) * hubBoost)
              g.addColorStop(0, `rgba(139,92,246,${a})`)
              g.addColorStop(1, 'rgba(139,92,246,0)')
            } else if (p.hue === 2) {
              const a = Math.min(1, (0.45 + 0.3 * Math.sin(t * 2 + p.phase)) * hubBoost)
              g.addColorStop(0, `rgba(167,139,250,${a})`)
              g.addColorStop(1, 'rgba(167,139,250,0)')
            } else if (p.hue === 3) {
              const a = Math.min(1, (0.5 + 0.3 * Math.sin(t * 2 + p.phase)) * hubBoost)
              g.addColorStop(0, `rgba(217,70,239,${a})`)
              g.addColorStop(1, 'rgba(217,70,239,0)')
            } else {
              const flick = 0.5 + 0.5 * Math.sin(t * 1.4 + p.phase)
              const a = Math.min(1, (0.2 + 0.5 * flick) * hubBoost)
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
          unsubscribe()
        }
      }}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}

/* ===================================================================
   ContentReactor — the 6-stage horizontal reactor (SVG rail + flowing
 *   energy + stage nodes + central reactor hub + live counter).
 *   Receives scrollYProgress for stage activation + connector flow.
 *   =================================================================== */
function ContentReactor({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  // SVG connector flow offset driven by scroll
  const flowOffset = useTransform(scrollYProgress, [0, 1], [0, -200])
  // overall reactor scale-in
  const reactorScale = useTransform(scrollYProgress, [0, 0.1], [0.92, 1])
  const reactorOpacity = useTransform(scrollYProgress, [0, 0.08], [0.7, 1])
  // central hub pulse intensity driven by scroll (activates mid-scroll)
  const hubGlow = useTransform(scrollYProgress, [0.05, 0.5, 1], [0.3, 1, 1])

  return (
    <motion.div
      style={{ scale: reactorScale, opacity: reactorOpacity }}
      className="relative w-[min(92vw,1080px)]"
      aria-label="Creative engine — 6 stages"
    >
      {/* outer ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(139,92,246,0.2), rgba(139,92,246,0) 60%)',
          filter: 'blur(30px)',
        }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* central reactor hub — pulsing purple core between stages 2 + 3 */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(217,70,239,0.5), rgba(139,92,246,0.2) 50%, rgba(139,92,246,0) 75%)',
          filter: 'blur(8px)',
          opacity: hubGlow,
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* SVG: horizontal rail + connectors between stages + flowing energy */}
      <svg
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-1/2 h-[40px] w-full -translate-y-1/2"
      >
        <defs>
          <linearGradient id="synth-rail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(139,92,246,0.15)" />
            <stop offset="40%" stopColor="rgba(217,70,239,0.85)" />
            <stop offset="60%" stopColor="rgba(167,139,250,0.85)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.15)" />
          </linearGradient>
        </defs>
        {/* base rail */}
        <line
          x1="6"
          y1="15"
          x2="94"
          y2="15"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.4"
          strokeDasharray="1 1"
        />
        {/* flowing energy line (driven by scroll) */}
        <motion.line
          x1="6"
          y1="15"
          x2="94"
          y2="15"
          stroke="url(#synth-rail)"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeDasharray="3 2"
          style={{
            strokeDashoffset: flowOffset,
            filter: 'drop-shadow(0 0 1.5px rgba(139,92,246,0.8))',
          }}
        />
      </svg>

      {/* 6 stage nodes laid out horizontally */}
      <div className="relative flex items-center justify-between px-[1%]">
        {stagePositions.map((s, i) => (
          <StageNode
            key={s.n}
            stage={s}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Canvas particles flowing along the rail */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[80px] -translate-y-1/2">
        <ReactorCanvas progress={scrollYProgress} />
      </div>
    </motion.div>
  )
}

/* ===================================================================
   StageNode — single stage node. Lights up purple when scrollYProgress
 *   passes its threshold; dim white/20 when inactive.
 *   =================================================================== */
function StageNode({
  stage,
  index,
  scrollYProgress,
}: {
  stage: (typeof stages)[number]
  index: number
  scrollYProgress: MotionValue<number>
}) {
  // Each stage activates over a threshold range.
  // Stage i activates at scrollYProgress = i/5 (6 stages: 0, 0.2, 0.4, 0.6, 0.8, 1).
  const threshold = index / 5
  const lo = threshold - 0.05
  const hi = threshold + 0.05
  // active opacity: 0.25 → 1 as scroll crosses threshold
  const activeOpacity = useTransform(scrollYProgress, [lo, hi], [0.25, 1])
  // glow intensity
  const glowOpacity = useTransform(
    scrollYProgress,
    [threshold - 0.08, hi],
    [0.15, 0.9]
  )
  // scale bump when active
  const nodeScale = useTransform(scrollYProgress, [lo, hi], [1, stage.hub ? 1.16 : 1.12])
  // border color: purple when active, white/12 when inactive
  const borderColor = useTransform(
    scrollYProgress,
    [lo, hi],
    ['rgba(255,255,255,0.12)', 'rgba(139,92,246,0.7)']
  )
  // background tint
  const backgroundColor = useTransform(
    scrollYProgress,
    [lo, hi],
    ['rgba(255,255,255,0.025)', 'rgba(139,92,246,0.14)']
  )

  const isActive = index === 0 // stage 0 starts active visually

  return (
    <motion.div
      className="relative flex flex-col items-center gap-3"
      style={{ opacity: activeOpacity }}
    >
      {/* stage node chip */}
      <motion.div
        style={{ scale: nodeScale }}
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-xl sm:h-16 sm:w-16"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 3.5 + index * 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.25,
        }}
      >
        {/* glow halo (driven by scroll) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-2xl"
          style={{
            background: stage.hub
              ? 'radial-gradient(circle, rgba(217,70,239,0.7), rgba(139,92,246,0) 70%)'
              : 'radial-gradient(circle, rgba(139,92,246,0.6), rgba(139,92,246,0) 70%)',
            filter: 'blur(10px)',
            opacity: glowOpacity,
          }}
        />
        {/* border color: purple when active, white/12 when inactive */}
        <motion.div
          className="absolute inset-0 rounded-2xl border"
          style={{ borderColor }}
        />
        {/* background tint */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ backgroundColor }}
        />
        <stage.Icon
          className="relative z-10 h-5 w-5 text-[#a78bfa] sm:h-6 sm:w-6"
        />
        {/* stage number badge */}
        <span
          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#8B5CF6]/40 bg-[#141414] text-[8px] font-bold text-[#a78bfa]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {stage.n}
        </span>
        {/* hub pulse ring */}
        {stage.hub && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-1.5 rounded-2xl border border-[#d946ef]/40"
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.18, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>

      {/* stage label + desc */}
      <div className="flex flex-col items-center gap-1 text-center">
        <span
          className="wn-eyebrow text-[11px] font-semibold text-white/85 sm:text-xs"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {stage.name}
        </span>
        <span className="hidden max-w-[110px] text-[9px] leading-tight text-white/40 sm:block">
          {stage.desc}
        </span>
      </div>

      {/* active pulse ring (only renders for the initial-active stage for SSR safety) */}
      {isActive && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-7 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#8B5CF6]/40 sm:h-16 sm:w-16"
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  )
}

/* ===================================================================
   ProgressDot — single dot in the progress indicator.
 *   Fills purple as the active stage index passes over it.
 *   =================================================================== */
function ProgressDot({
  index,
  active,
}: {
  index: number
  active: MotionValue<number>
}) {
  const fill = useTransform(
    active,
    (v) => Math.max(0, Math.min(1, 1 - Math.abs(v - index)))
  )
  const width = useTransform(fill, [0, 1], ['8px', '32px'])

  return (
    <motion.span
      className="h-2 rounded-full bg-white/15"
      style={{ width, backgroundColor: 'rgba(255,255,255,0.18)' }}
    >
      <motion.span
        className="block h-full rounded-full"
        style={{
          width: '100%',
          backgroundColor: 'rgb(139, 92, 246)',
          opacity: fill,
        }}
      />
    </motion.span>
  )
}

/* ===================================================================
   ActiveStage — shows the active stage number ("01" → "06") + name.
 *   Subscribes directly to scrollYProgress via useEffect + .on('change').
 *   =================================================================== */
function ActiveStage({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const [num, setNum] = useState('01')
  const [name, setName] = useState('Imagine')
  useEffect(() => {
    const update = (v: number) => {
      const i = Math.max(0, Math.min(5, Math.round(v * 5)))
      setNum(String(i + 1).padStart(2, '0'))
      setName(stages[i].name)
    }
    update(scrollYProgress.get())
    const unsub = scrollYProgress.on('change', update)
    return () => unsub()
  }, [scrollYProgress])
  return (
    <div className="flex items-baseline gap-2">
      <motion.span
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
        className="text-sm font-semibold text-[#8B5CF6]"
      >
        {num}
      </motion.span>
      <span className="text-xs text-white/60">{name}</span>
    </div>
  )
}

/* ===================================================================
   DirectedLabel — honest, non-numeric statement that AI is assistive,
   not autonomous. Replaces the previous fake 0 → 500+ "Scenes
   Generated" / "AI films shipped" counter. No animated metric for an
   unverified number.
   =================================================================== */
function DirectedLabel() {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        AI-assisted
      </span>
      <span className="text-xs text-white/55">· human-directed</span>
    </div>
  )
}

/* ===================================================================
   SynthCreativeEngine — Section 5 named export
 *   =================================================================== */
export function SynthCreativeEngine() {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // active stage index (0..5) for progress dots
  const activeStage = useTransform(scrollYProgress, [0, 1], [0, 5])

  // header parallax
  const headerY = useTransform(scrollYProgress, [0, 0.4], [0, -30])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6])

  return (
    <section
      ref={outerRef}
      className="relative min-h-[300vh] border-t border-white/5 bg-[#141414]"
      aria-label="The Creative Engine"
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 md:pt-28"
        >
          <PurpleEyebrow number="05" label="The Creative Engine" />
          <h2
            className="mt-3 text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine>
              <span className="text-white">The </span>
              <PurpleGradientText>Creative Engine.</PurpleGradientText>
            </MaskLine>
          </h2>
        </motion.div>

        {/* Content reactor — centered */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Local ambient */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[40vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse, rgba(139,92,246,0.22), rgba(139,92,246,0) 60%)',
              filter: 'blur(40px)',
            }}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[8%] top-[20%] h-[22vw] w-[22vw] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(109,40,217,0.2), rgba(109,40,217,0) 70%)',
              filter: 'blur(44px)',
            }}
            animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.15, 1] }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8,
            }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[6%] bottom-[18%] h-[20vw] w-[20vw] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(217,70,239,0.16), rgba(217,70,239,0) 70%)',
              filter: 'blur(46px)',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.18, 1] }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.4,
            }}
          />

          <ContentReactor scrollYProgress={scrollYProgress} />
        </div>

        {/* Progress indicator: 6 dots + active stage counter + scenes counter */}
        <div className="relative z-20 mx-auto mb-8 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            {stages.map((s, i) => (
              <ProgressDot key={s.n} index={i} active={activeStage} />
            ))}
          </div>
          <div className="flex items-center gap-6">
            <DirectedLabel />
            <div className="flex items-center gap-2">
              <ActiveStage scrollYProgress={scrollYProgress} />
              <span className="text-sm text-white/40">/ 06</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
