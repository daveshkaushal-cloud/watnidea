'use client'

/**
 * GrowthEngine — Section 5 of /growth-alchemy
 *
 * Full-screen storytelling — a MASSIVE HORIZONTAL REVENUE MACHINE.
 * Scroll-controlled.
 *
 * Composition:
 *   - Eyebrow: (05) · The Growth Engine (GreenEyebrow)
 *   - Headline: "The Growth Engine." (hidden header — wheel is the focus)
 *
 * Visual concept — the growth machine:
 *   Outer min-h-[300vh] + inner sticky top-0 h-screen.
 *   5 stages laid out horizontally left-to-right:
 *     Attract → Capture → Convert → Optimize → Scale.
 *   Each stage lights up emerald as scrollYProgress passes its threshold;
 *   inactive stages are dim white/20. SVG connectors between stages carry
 *   flowing emerald energy (animated strokeDashoffset driven by scroll).
 *   Canvas particles flow left→right along the machine path.
 *   A static honest label ("Growth, measured") sits in the progress row —
 *   no invented revenue figures, no 0→number animation.
 *
 * Progress indicator: 5 ProgressDots (width animates 8px→32px based on
 * active stage) + ActiveStage counter subscribing to scrollYProgress
 * showing "01 Attract" → "05 Scale".
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
  Filter,
  Gauge,
  Magnet,
  ShoppingCart,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import {
  GreenEyebrow,
  GreenGradientText,
  MaskLine,
} from '@/components/growth/shared'

/* ===================================================================
   Content — 5 growth engine stages.
   =================================================================== */
type Stage = {
  n: string
  name: string
  desc: string
  Icon: LucideIcon
  // x position on the horizontal pipeline (0..100)
  x: number
}

const stages: Stage[] = [
  {
    n: '01',
    name: 'Attract',
    desc: 'High-intent attention at the right cost.',
    Icon: Magnet,
    x: 8,
  },
  {
    n: '02',
    name: 'Capture',
    desc: 'Multi-step funnels that convert attention to leads.',
    Icon: Filter,
    x: 29,
  },
  {
    n: '03',
    name: 'Convert',
    desc: 'Landing experiences built to close, not bounce.',
    Icon: ShoppingCart,
    x: 50,
  },
  {
    n: '04',
    name: 'Optimize',
    desc: 'Continuous refinement of every metric that matters.',
    Icon: Gauge,
    x: 71,
  },
  {
    n: '05',
    name: 'Scale',
    desc: 'Multiply what works. Compound the wins.',
    Icon: TrendingUp,
    x: 92,
  },
]

// Round positions (already integers but safe)
const stagePositions = stages.map((s) => ({
  ...s,
  x: Math.round(s.x * 1000) / 1000,
}))

/* ===================================================================
   EngineCanvas — particles flowing left→right along the horizontal machine
   rail. Density + speed intensifies with scroll progress.
   HMR-safe via __cleanup on the canvas element. Reduced-motion guard.
   =================================================================== */
function EngineCanvas({
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
          // 1 = emerald, 2 = neon, 3 = white
          hue: 1 | 2 | 3
          phase: number
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
          const n = reduce ? 0 : 60
          for (let i = 0; i < n; i++) {
            const roll = Math.random()
            const hue: P['hue'] = roll < 0.45 ? 1 : roll < 0.85 ? 2 : 3
            ps.push({
              t: Math.random(),
              speed: 0.001 + Math.random() * 0.003,
              r: Math.random() * 1.6 + 0.5,
              hue,
              phase: Math.random() * Math.PI * 2,
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
            const py = h * 0.5 + Math.sin(p.t * Math.PI * 3 + t) * 6
            // particles further right glow brighter (revenue emerging)
            const energyBoost = 0.5 + p.t * 0.5

            const drawR = p.hue === 3 ? p.r * 2 : 9
            const g = ctx.createRadialGradient(px, py, 0, px, py, drawR)
            if (p.hue === 1) {
              const a = (0.4 + 0.3 * Math.sin(t * 2 + p.phase)) * energyBoost
              g.addColorStop(0, `rgba(16,185,129,${a})`)
              g.addColorStop(1, 'rgba(16,185,129,0)')
            } else if (p.hue === 2) {
              const a = (0.45 + 0.3 * Math.sin(t * 2 + p.phase)) * energyBoost
              g.addColorStop(0, `rgba(110,231,183,${a})`)
              g.addColorStop(1, 'rgba(110,231,183,0)')
            } else {
              const flick = 0.5 + 0.5 * Math.sin(t * 1.4 + p.phase)
              const a = (0.2 + 0.5 * flick) * energyBoost
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
   RevenueMachine — the 5-stage horizontal machine (SVG rail + flowing
   energy + stage nodes + honest static meter).
   Receives scrollYProgress for stage activation + connector flow.
   =================================================================== */
function RevenueMachine({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  // SVG connector flow offset driven by scroll
  const flowOffset = useTransform(scrollYProgress, [0, 1], [0, -200])
  // overall machine scale-in
  const machineScale = useTransform(scrollYProgress, [0, 0.1], [0.92, 1])
  const machineOpacity = useTransform(scrollYProgress, [0, 0.08], [0.7, 1])

  return (
    <motion.div
      style={{ scale: machineScale, opacity: machineOpacity }}
      className="relative w-[min(92vw,1080px)]"
      aria-label="Growth engine — 5 stages"
    >
      {/* outer ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(16,185,129,0.18), rgba(16,185,129,0) 60%)',
          filter: 'blur(30px)',
        }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* SVG: horizontal rail + connectors between stages + flowing energy */}
      <svg
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-1/2 h-[40px] w-full -translate-y-1/2"
      >
        <defs>
          <linearGradient id="growth-rail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(16,185,129,0.15)" />
            <stop offset="50%" stopColor="rgba(110,231,183,0.85)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.15)" />
          </linearGradient>
        </defs>
        {/* base rail */}
        <line
          x1="8"
          y1="15"
          x2="92"
          y2="15"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.4"
          strokeDasharray="1 1"
        />
        {/* flowing energy line (driven by scroll) */}
        <motion.line
          x1="8"
          y1="15"
          x2="92"
          y2="15"
          stroke="url(#growth-rail)"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeDasharray="3 2"
          style={{
            strokeDashoffset: flowOffset,
            filter: 'drop-shadow(0 0 1.5px rgba(16,185,129,0.8))',
          }}
        />
      </svg>

      {/* 5 stage nodes laid out horizontally */}
      <div className="relative flex items-center justify-between px-[2%]">
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
        <EngineCanvas progress={scrollYProgress} />
      </div>
    </motion.div>
  )
}

/* ===================================================================
   StageNode — single stage node. Lights up emerald when scrollYProgress
   passes its threshold; dim white/20 when inactive.
   =================================================================== */
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
  // Stage i activates at scrollYProgress = i/4 (5 stages: 0, 0.25, 0.5, 0.75, 1).
  const threshold = index / 4
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
  const nodeScale = useTransform(scrollYProgress, [lo, hi], [1, 1.12])
  // border color: emerald when active, white/12 when inactive
  const borderColor = useTransform(
    scrollYProgress,
    [lo, hi],
    ['rgba(255,255,255,0.12)', 'rgba(16,185,129,0.7)']
  )
  // background tint
  const backgroundColor = useTransform(
    scrollYProgress,
    [lo, hi],
    ['rgba(255,255,255,0.025)', 'rgba(16,185,129,0.12)']
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
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl border backdrop-blur-xl sm:h-20 sm:w-20"
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
            background:
              'radial-gradient(circle, rgba(16,185,129,0.6), rgba(16,185,129,0) 70%)',
            filter: 'blur(10px)',
            opacity: glowOpacity,
          }}
        />
        {/* border color: emerald when active, white/12 when inactive */}
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
          className="relative z-10 h-6 w-6 text-[#6ee7b7] sm:h-7 sm:w-7"
        />
        {/* stage number badge */}
        <span
          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#10B981]/40 bg-[#141414] text-[8px] font-bold text-[#6ee7b7]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {stage.n}
        </span>
      </motion.div>

      {/* stage label + desc */}
      <div className="flex flex-col items-center gap-1 text-center">
        <span
          className="wn-eyebrow text-[11px] font-semibold text-white/85 sm:text-xs"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {stage.name}
        </span>
        <span className="hidden max-w-[120px] text-[9px] leading-tight text-white/40 sm:block">
          {stage.desc}
        </span>
      </div>

      {/* active pulse ring (only renders for the initial-active stage for SSR safety) */}
      {isActive && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-8 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#10B981]/40 sm:h-20 sm:w-20"
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  )
}

/* ===================================================================
   ProgressDot — single dot in the progress indicator.
   Fills emerald as the active stage index passes over it.
   =================================================================== */
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
          backgroundColor: 'rgb(16, 185, 129)',
          opacity: fill,
        }}
      />
    </motion.span>
  )
}

/* ===================================================================
   ActiveStage — shows the active stage number ("01" → "05") + name.
   Subscribes directly to scrollYProgress via useEffect + .on('change').
   =================================================================== */
function ActiveStage({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const [num, setNum] = useState('01')
  const [name, setName] = useState('Attract')
  useEffect(() => {
    const update = (v: number) => {
      const i = Math.max(0, Math.min(4, Math.round(v * 4)))
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
        className="text-sm font-semibold text-[#10B981]"
      >
        {num}
      </motion.span>
      <span className="text-xs text-white/60">{name}</span>
    </div>
  )
}

/* ===================================================================
   GrowthMeter — a static, honest label sitting in the progress row.
   No invented revenue figures; no 0→number animation. Renders the
   honest status string from site content as a plain string.
   =================================================================== */
function GrowthMeter() {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        Growth, measured
      </span>
      <motion.span
        aria-hidden
        className="text-sm font-bold text-[#6ee7b7]"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ●
      </motion.span>
    </div>
  )
}

/* ===================================================================
   GrowthEngine — Section 5 named export
   =================================================================== */
export function GrowthEngine() {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // active stage index (0..4) for progress dots
  const activeStage = useTransform(scrollYProgress, [0, 1], [0, 4])

  // header parallax
  const headerY = useTransform(scrollYProgress, [0, 0.4], [0, -30])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6])

  return (
    <section
      ref={outerRef}
      className="relative min-h-[300vh] border-t border-white/5 bg-[#141414]"
      aria-label="The Growth Engine"
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 md:pt-28"
        >
          <GreenEyebrow number="05" label="The Growth Engine" />
          <h2
            className="mt-3 text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine>
              <span className="text-white">The </span>
              <GreenGradientText>Growth Engine.</GreenGradientText>
            </MaskLine>
          </h2>
        </motion.div>

        {/* Revenue machine — centered */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Local ambient */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[40vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse, rgba(16,185,129,0.2), rgba(16,185,129,0) 60%)',
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
                'radial-gradient(circle, rgba(4,120,87,0.18), rgba(4,120,87,0) 70%)',
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
                'radial-gradient(circle, rgba(110,231,183,0.14), rgba(110,231,183,0) 70%)',
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

          <RevenueMachine scrollYProgress={scrollYProgress} />
        </div>

        {/* Progress indicator: 5 dots + active stage counter + honest meter */}
        <div className="relative z-20 mx-auto mb-8 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-3">
            {stages.map((s, i) => (
              <ProgressDot key={s.n} index={i} active={activeStage} />
            ))}
          </div>
          <div className="flex items-center gap-6">
            <GrowthMeter />
            <div className="flex items-center gap-2">
              <ActiveStage scrollYProgress={scrollYProgress} />
              <span className="text-sm text-white/40">/ 05</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
