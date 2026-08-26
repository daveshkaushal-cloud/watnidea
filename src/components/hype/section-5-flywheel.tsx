'use client'

/**
 * HypeFlywheel — Section 5 of /the-hype-engine
 *
 * Full-screen storytelling — a MASSIVE CIRCULAR MOMENTUM ENGINE.
 * Scroll-controlled.
 *
 * Composition:
 *   - Eyebrow: (05) · The Content Flywheel
 *   - Headline: "The Content Flywheel." ("Flywheel." red gradient)
 *
 * Visual concept — the content flywheel:
 *   Outer min-h-[300vh] + inner sticky top-0 h-screen.
 *   A massive wheel ROTATES with scroll (0→360deg). 6 stages arranged
 *   around the circle (Create → Publish → Amplify → Engage → Convert →
 *   Repeat) at 60° intervals. Central pulsing red energy hub labeled
 *   "MOMENTUM". SVG lines from center to each node + arcs between
 *   consecutive nodes. Canvas particles flow along the circle. A progress
 *   indicator at the bottom shows which stage is "active".
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Canvas uses the HMR-safe __cleanup pattern.
 *
 * NOTE: rotate uses degrees (NOT vw). The spec's `vw` rule applies to
 * horizontal scroll, not to rotation. We follow the spec: "rotate uses
 * degrees".
 */

import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  Heart,
  Megaphone,
  PenTool,
  Repeat2,
  Send,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import {
  SectionEyebrow,
  MaskLine,
  RedGradientText,
} from '@/components/about/shared'

/* ===================================================================
   Content — 6 flywheel stages.
   =================================================================== */
type Stage = {
  n: string
  name: string
  Icon: LucideIcon
  // angle in degrees (6 nodes at 60° intervals, starting at -90° = top)
  angle: number
}

const stages: Stage[] = [
  { n: '01', name: 'Create', Icon: PenTool, angle: -90 },
  { n: '02', name: 'Publish', Icon: Send, angle: -30 },
  { n: '03', name: 'Amplify', Icon: Megaphone, angle: 30 },
  { n: '04', name: 'Engage', Icon: Heart, angle: 90 },
  { n: '05', name: 'Convert', Icon: TrendingUp, angle: 150 },
  { n: '06', name: 'Repeat', Icon: Repeat2, angle: 210 },
]

// Pre-compute node positions on a circle (radius 42% of container).
// Round to 3 decimals to avoid SSR/hydration float mismatches.
const NODE_RADIUS = 42
const stagePositions = stages.map((s) => {
  const rad = (s.angle * Math.PI) / 180
  return {
    ...s,
    x: Math.round((50 + Math.cos(rad) * NODE_RADIUS) * 1000) / 1000,
    y: Math.round((50 + Math.sin(rad) * NODE_RADIUS) * 1000) / 1000,
  }
})

/* ===================================================================
   FlywheelCanvas — particles flowing along the circular flywheel path.
   HMR-safe via __cleanup on the canvas element. Reduced-motion guard.
   The wheel rotation is fed in so particles can drift along with it.
   =================================================================== */
function FlywheelCanvas({
  rotation,
}: {
  rotation: MotionValue<number>
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
        let rotationVal = 0
        const reduce =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches

        type P = {
          // angle along the circle (radians)
          theta: number
          // angular velocity
          v: number
          r: number
          // 1 = red, 2 = orange, 3 = pink
          hue: 1 | 2 | 3
          phase: number
        }
        const ps: P[] = []

        const unsubscribe = rotation.on('change', (v) => {
          rotationVal = v
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
          const n = reduce ? 0 : 48
          for (let i = 0; i < n; i++) {
            const roll = Math.random()
            const hue: P['hue'] =
              roll < 0.5 ? 1 : roll < 0.8 ? 2 : 3
            ps.push({
              theta: Math.random() * Math.PI * 2,
              v: 0.004 + Math.random() * 0.008,
              r: Math.random() * 1.4 + 0.6,
              hue,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          const t = performance.now() / 1000
          const cx = w / 2
          const cy = h / 2
          const radius = Math.min(w, h) * 0.42
          // base rotation from scroll (degrees → radians)
          const baseRot = (rotationVal * Math.PI) / 180

          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
            p.theta += p.v
            const ang = p.theta + baseRot
            const px = cx + Math.cos(ang) * radius
            const py = cy + Math.sin(ang) * radius
            const flick = 0.6 + 0.4 * Math.sin(t * 2 + p.phase)
            const drawR = p.r * 6
            const g = ctx.createRadialGradient(px, py, 0, px, py, drawR)
            if (p.hue === 1) {
              g.addColorStop(0, `rgba(229,57,53,${0.5 * flick})`)
              g.addColorStop(1, 'rgba(229,57,53,0)')
            } else if (p.hue === 2) {
              g.addColorStop(0, `rgba(249,115,22,${0.45 * flick})`)
              g.addColorStop(1, 'rgba(249,115,22,0)')
            } else {
              g.addColorStop(0, `rgba(236,72,153,${0.45 * flick})`)
              g.addColorStop(1, 'rgba(236,72,153,0)')
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
   Flywheel — the rotating wheel itself (SVG lines + arcs + nodes + core).
   Receives wheelRotate + nodeCounterRotate motion values.
   =================================================================== */
function Flywheel({
  wheelRotate,
  nodeCounterRotate,
}: {
  wheelRotate: MotionValue<number>
  nodeCounterRotate: MotionValue<number>
}) {
  return (
    <div
      className="relative aspect-square w-[min(86vw,560px)]"
      aria-label="Content flywheel — 6 stages"
    >
      {/* outer ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0) 60%)',
          filter: 'blur(30px)',
        }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* rotating wheel container */}
      <motion.div
        style={{ rotate: wheelRotate }}
        className="absolute inset-0"
      >
        {/* SVG: lines from center to each node + arcs between consecutive nodes + outer ring */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
        >
          {/* outer ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.3"
            strokeDasharray="1 1"
          />
          {/* inner ring */}
          <circle
            cx="50"
            cy="50"
            r="18"
            fill="none"
            stroke="rgba(229,57,53,0.2)"
            strokeWidth="0.3"
          />
          {/* lines from center to each node */}
          {stagePositions.map((s, i) => (
            <motion.line
              key={`line-${i}`}
              x1="50"
              y1="50"
              x2={s.x}
              y2={s.y}
              stroke={
                i % 2 === 0
                  ? 'rgba(229,57,53,0.5)'
                  : 'rgba(249,115,22,0.45)'
              }
              strokeWidth={0.4}
              animate={{ opacity: [0.25, 0.8, 0.25] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.18,
              }}
              style={{ filter: 'drop-shadow(0 0 1px rgba(229,57,53,0.6))' }}
            />
          ))}
          {/* arcs between consecutive nodes */}
          {stagePositions.map((s, i) => {
            const next = stagePositions[(i + 1) % stagePositions.length]
            return (
              <motion.path
                key={`arc-${i}`}
                d={`M ${s.x} ${s.y} A 42 42 0 0 1 ${next.x} ${next.y}`}
                fill="none"
                stroke={
                  i % 3 === 0
                    ? 'rgba(229,57,53,0.4)'
                    : i % 3 === 1
                      ? 'rgba(249,115,22,0.35)'
                      : 'rgba(236,72,153,0.3)'
                }
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeDasharray="2 2"
                animate={{ strokeDashoffset: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.2,
                }}
              />
            )
          })}
        </svg>

        {/* 6 stage nodes — counter-rotated so content stays upright */}
        {stagePositions.map((s, i) => (
          <motion.div
            key={`stage-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <motion.div
              style={{ rotate: nodeCounterRotate }}
              className="flex flex-col items-center gap-1.5"
            >
              {/* node chip */}
              <motion.div
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl sm:h-16 sm:w-16"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3.5 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.25,
                }}
                style={{
                  boxShadow:
                    i % 3 === 0
                      ? '0 0 20px rgba(229,57,53,0.4)'
                      : i % 3 === 1
                        ? '0 0 20px rgba(249,115,22,0.35)'
                        : '0 0 20px rgba(236,72,153,0.35)',
                }}
              >
                <s.Icon
                  className={
                    i % 3 === 0
                      ? 'h-5 w-5 text-[#ff6b63] sm:h-6 sm:w-6'
                      : i % 3 === 1
                        ? 'h-5 w-5 text-[#F97316] sm:h-6 sm:w-6'
                        : 'h-5 w-5 text-[#EC4899] sm:h-6 sm:w-6'
                  }
                />
                {/* stage number badge */}
                <span
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#E53935]/40 bg-[#141414] text-[8px] font-bold text-[#ff6b63]"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  {s.n}
                </span>
              </motion.div>
              {/* label */}
              <span
                className="wn-eyebrow text-[10px] font-semibold text-white/80 sm:text-[11px]"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                {s.name}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Central core — pulsing red energy hub */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* outermost glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.4), rgba(229,57,53,0) 70%)',
            filter: 'blur(18px)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* middle bloom */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,107,99,0.6), rgba(229,57,53,0.2) 50%, rgba(229,57,53,0))',
            filter: 'blur(8px)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* core solid */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            boxShadow:
              '0 0 28px rgba(229,57,53,0.95), 0 0 60px rgba(229,57,53,0.5)',
          }}
        />
        {/* MOMENTUM label */}
        <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
          <span
            className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/85 sm:text-[10px]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            MOM
            <br />
            ENTUM
          </span>
        </div>
      </div>

      {/* Particles flowing along the circle */}
      <FlywheelCanvas rotation={wheelRotate} />
    </div>
  )
}

/* ===================================================================
   ProgressDot — single dot in the progress indicator.
   Fills red as the active stage index passes over it.
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
          backgroundColor: 'rgb(229, 57, 53)',
          opacity: fill,
        }}
      />
    </motion.span>
  )
}

/* ===================================================================
   ActiveStage — shows the active stage number ("01" → "06") + name.
   Subscribes directly to scrollYProgress via useEffect + .on('change').
   =================================================================== */
function ActiveStage({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const [num, setNum] = useState('01')
  const [name, setName] = useState('Create')
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
        className="text-sm font-semibold text-[#E53935]"
      >
        {num}
      </motion.span>
      <span className="text-xs text-white/60">{name}</span>
    </div>
  )
}

/* ===================================================================
   HypeFlywheel — Section 5 named export.
   =================================================================== */
export function HypeFlywheel() {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // wheel rotates 0 → 360deg over the full scroll
  const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  // nodes counter-rotate to stay upright
  const nodeCounterRotate = useTransform(scrollYProgress, [0, 1], [0, -360])
  // active stage index (0..5) for progress dots
  const activeStage = useTransform(scrollYProgress, [0, 1], [0, 5])

  return (
    <section
      ref={outerRef}
      className="relative min-h-[300vh] border-t border-white/5 bg-[#141414]"
      aria-label="The Content Flywheel"
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 md:pt-28">
          <SectionEyebrow number="05" label="The Content Flywheel" />
          <h2
            className="mt-3 text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine>
              <span className="text-white">The Content </span>
              <RedGradientText>Flywheel.</RedGradientText>
            </MaskLine>
          </h2>
        </div>

        {/* Wheel — centered */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Local ambient */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(229,57,53,0.2), rgba(229,57,53,0) 60%)',
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
                'radial-gradient(circle, rgba(249,115,22,0.14), rgba(249,115,22,0) 70%)',
              filter: 'blur(44px)',
            }}
            animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.15, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[6%] bottom-[18%] h-[20vw] w-[20vw] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(236,72,153,0.12), rgba(236,72,153,0) 70%)',
              filter: 'blur(46px)',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.18, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          />

          <Flywheel
            wheelRotate={wheelRotate}
            nodeCounterRotate={nodeCounterRotate}
          />
        </div>

        {/* Progress indicator: 6 dots + active stage counter */}
        <div className="relative z-20 mx-auto mb-8 flex w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            {stages.map((s, i) => (
              <ProgressDot key={s.n} index={i} active={activeStage} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ActiveStage scrollYProgress={scrollYProgress} />
            <span className="text-sm text-white/40">/ 06</span>
          </div>
        </div>
      </div>
    </section>
  )
}
