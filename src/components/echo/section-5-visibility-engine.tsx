'use client'

/**
 * EchoVisibilityEngine — Section 5 of /the-echo-system
 *
 * Full-screen storytelling — a LIVING VISIBILITY ENGINE.
 * Scroll-controlled. 6 stages revealed as the user scrolls.
 *
 * Composition:
 *   - Eyebrow: (05) · The Visibility Engine (CyanEyebrow)
 *   - Headline: "The Visibility Engine." (MaskLine, cyan gradient)
 *   - CyanStickyRail (label "The Engine", caption "Visibility Compounds")
 *
 * Visual concept — the visibility machine:
 *   Outer min-h-[360vh] + inner sticky top-0 h-screen.
 *   6 stages laid out horizontally left-to-right:
 *     Research → Create → Optimize → Distribute → Rank → Compound.
 *   Each stage lights up cyan as scrollYProgress passes its
 *   threshold; inactive stages are dim white/20. SVG connectors
 *   between stages carry flowing cyan energy (animated strokeDashoffset
 *   driven by scroll). Canvas particles flow left→right along the rail.
 *   A center "stage detail" panel shows the active stage's number,
 *   title, descriptor, and a unique scroll-activated visual. A live
 *   visibility counter climbs as you scroll.
 *
 * 6 stages:
 *   01 Research  "We map every question your audience asks."
 *   02 Create    "Content engineered to answer and rank."
 *   03 Optimize  "Tuned for search, AI, and humans."
 *   04 Distribute "Placed where discovery happens."
 *   05 Rank      "Visibility climbs. Authority locks in."
 *   06 Compound  "Each piece amplifies the next."
 *
 * Progress indicator: 6 ProgressDots + ActiveStage counter
 * subscribing to scrollYProgress showing "01 Research" → "06 Compound".
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Canvas uses the HMR-safe __cleanup pattern.
 * prefers-reduced-motion guard on canvas animation.
 */

import { useRef, useState, useEffect, type CSSProperties } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  Compass,
  FileText,
  Infinity as InfinityIcon,
  Layers,
  PenTool,
  Search,
  Send,
  Share2,
  SlidersHorizontal,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import {
  CyanEyebrow,
  CyanGradientText,
  CyanStickyRail,
  MaskLine,
} from '@/components/echo/shared'

/* ===================================================================
   Content — 6 visibility engine stages.
 *   =================================================================== */
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
    name: 'Research',
    desc: 'We map every question your audience asks.',
    Icon: Search,
    x: 6,
  },
  {
    n: '02',
    name: 'Create',
    desc: 'Content engineered to answer and rank.',
    Icon: PenTool,
    x: 24,
  },
  {
    n: '03',
    name: 'Optimize',
    desc: 'Tuned for search, AI, and humans.',
    Icon: SlidersHorizontal,
    x: 42,
  },
  {
    n: '04',
    name: 'Distribute',
    desc: 'Placed where discovery happens.',
    Icon: Send,
    x: 60,
  },
  {
    n: '05',
    name: 'Rank',
    desc: 'Visibility climbs. Authority locks in.',
    Icon: TrendingUp,
    x: 78,
  },
  {
    n: '06',
    name: 'Compound',
    desc: 'Each piece amplifies the next.',
    Icon: InfinityIcon,
    x: 94,
  },
]

// Round positions (already integers but safe)
const stagePositions = stages.map((s) => ({
  ...s,
  x: Math.round(s.x * 1000) / 1000,
}))

/* ===================================================================
   Per-stage micro-visuals — one per stage. Rendered inside the
 *   "stage detail" panel when that stage is active.
 *   =================================================================== */

/* 01 Research — query nodes mapping on a grid. */
function ResearchVisual() {
  const grid = Array.from({ length: 6 }, (_, i) => i)
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 grid grid-cols-3 gap-2 p-3">
        {grid.map((i) => (
          <motion.div
            key={i}
            className="relative flex items-center justify-center rounded border border-white/8 bg-white/[0.02]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            {/* search-ring pulse */}
            <motion.span
              className="absolute h-2 w-2 rounded-full border border-[#06B6D4]"
              animate={{ scale: [1, 2.2, 1], opacity: [0.9, 0, 0.9] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.25,
              }}
            />
            <span className="h-1.5 w-1.5 rounded-full bg-[#67e8f9]" />
          </motion.div>
        ))}
      </div>
      {/* scan line — CSS @keyframes (not Framer Motion animate) to
          avoid WAAPI errors on `top` layout-property animation. */}
      <div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent"
        style={{
          boxShadow: '0 0 8px rgba(6,182,212,0.8)',
          top: '8%',
          '--scan-start': '8%',
          '--scan-end': '88%',
          animation: 'cinema-scanline 4s ease-in-out infinite',
        } as CSSProperties}
      />
    </div>
  )
}

/* 02 Create — documents forming (stacked cards materializing). */
function CreateVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-md border border-[#06B6D4]/35 bg-[#06B6D4]/8 backdrop-blur-sm"
            style={{
              width: '60%',
              height: '40%',
              boxShadow: '0 0 12px rgba(6,182,212,0.2)',
            }}
            initial={{ opacity: 0, y: -20, rotate: -6 }}
            whileInView={{ opacity: 1, y: (i - 1.5) * 8, rotate: (i - 1.5) * 3 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.15,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* doc lines */}
            <div className="flex h-full flex-col gap-1 p-2">
              <div className="h-1 w-1/2 rounded bg-[#67e8f9]/60" />
              <div className="h-0.5 w-3/4 rounded bg-white/15" />
              <div className="h-0.5 w-2/3 rounded bg-white/10" />
              <div className="h-0.5 w-3/5 rounded bg-white/10" />
            </div>
          </motion.div>
        ))}
      </div>
      {/* writing cursor */}
      <motion.div
        className="absolute h-3 w-px bg-[#67e8f9]"
        style={{ boxShadow: '0 0 8px rgba(103,232,249,0.9)' }}
        animate={{ x: ['20%', '70%', '20%'], y: ['40%', '55%', '40%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* 03 Optimize — sliders tuning + gauge filling. */
function OptimizeVisual() {
  const sliders = [
    { label: 'SEO', val: 88 },
    { label: 'AEO', val: 76 },
    { label: 'Readability', val: 92 },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex flex-col justify-center gap-3 p-3">
        {sliders.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-16 text-[8px] font-medium text-white/55">
              {s.label}
            </span>
            <div className="relative h-1.5 flex-1 rounded-full bg-white/8">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0e7490] to-[#67e8f9]"
                initial={{ width: 0 }}
                whileInView={{ width: `${s.val}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ boxShadow: '0 0 8px rgba(103,232,249,0.7)' }}
              />
              {/* slider thumb */}
              <motion.div
                className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-[#06B6D4] bg-[#141414]"
                initial={{ left: '0%' }}
                whileInView={{ left: `calc(${s.val}% - 5px)` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                animate={{ scale: [1, 1.2, 1] }}
                style={{ boxShadow: '0 0 6px rgba(6,182,212,0.9)' }}
              />
            </div>
            <motion.span
              className="w-8 text-right text-[8px] font-bold text-[#67e8f9]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.2 }}
            >
              {s.val}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 04 Distribute — distribution waves radiating to channel dots. */
function DistributeVisual() {
  const channels = [
    { l: '15%', t: '22%', label: 'SEO' },
    { l: '78%', t: '20%', label: 'SOC' },
    { l: '12%', t: '72%', label: 'EML' },
    { l: '82%', t: '70%', label: 'PR' },
    { l: '46%', t: '12%', label: 'AEO' },
    { l: '50%', t: '84%', label: 'SYN' },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {channels.map((c, i) => (
          <motion.line
            key={i}
            x1="50"
            y1="30"
            x2={parseFloat(c.l)}
            y2={parseFloat(c.t) * 0.6}
            stroke="rgba(6,182,212,0.5)"
            strokeWidth={0.5}
            strokeDasharray="1.2 1"
            animate={{ strokeDashoffset: [0, -4, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{
              duration: 1.8 + (i % 3) * 0.4,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.2,
            }}
            style={{ filter: 'drop-shadow(0 0 0.6px rgba(6,182,212,0.6))' }}
          />
        ))}
      </svg>
      {/* center hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#06B6D4]/60 bg-[#06B6D4]/15"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 16px rgba(6,182,212,0.7)' }}
      >
        <Send className="h-3 w-3 text-[#67e8f9]" />
      </motion.div>
      {/* channel dots */}
      {channels.map((c, i) => (
        <motion.span
          key={c.label}
          className="absolute flex items-center justify-center rounded-full border border-[#06B6D4]/40 bg-[#06B6D4]/10 px-1 py-0.5 text-[6px] font-bold text-[#67e8f9]"
          style={{ left: c.l, top: c.t, transform: 'translate(-50%, -50%)' }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        >
          {c.label}
        </motion.span>
      ))}
    </div>
  )
}

/* 05 Rank — ascending bar chart with rank positions. */
function RankVisual() {
  const bars = [30, 42, 58, 74, 88, 100]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute bottom-3 left-3 right-3 flex h-[75%] items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="relative flex-1 rounded-t-sm"
            style={{
              background:
                i === bars.length - 1
                  ? 'linear-gradient(to top, #0e7490, #67e8f9)'
                  : 'linear-gradient(to top, rgba(6,182,212,0.4), rgba(6,182,212,0.15))',
              boxShadow:
                i === bars.length - 1 ? '0 0 14px rgba(103,232,249,0.7)' : 'none',
            }}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* rank label on top bar */}
            {i === bars.length - 1 && (
              <motion.span
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#67e8f9]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                #1
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
      {/* trophy in corner */}
      <motion.div
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-[#06B6D4]/55 bg-[#06B6D4]/12"
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 14px rgba(6,182,212,0.6)' }}
      >
        <Trophy className="h-3.5 w-3.5 text-[#67e8f9]" />
      </motion.div>
    </div>
  )
}

/* 06 Compound — network growing exponentially (nodes multiplying). */
function CompoundVisual() {
  // 3 rings of expanding nodes
  const rings = [
    { r: 8, count: 4 },
    { r: 16, count: 8 },
    { r: 24, count: 12 },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {rings.map((ring, ri) =>
          Array.from({ length: ring.count }, (_, i) => {
            const angle = (i / ring.count) * Math.PI * 2
            const px = Math.cos(angle) * ring.r
            const py = Math.sin(angle) * ring.r
            return (
              <motion.span
                key={`r${ri}-n${i}`}
                className="absolute h-1 w-1 rounded-full bg-[#67e8f9]"
                style={{
                  x: px,
                  y: py,
                  boxShadow: '0 0 6px rgba(103,232,249,0.85)',
                }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.3, 0.8] }}
                transition={{
                  duration: 2 + (ri % 2),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1 + ri * 0.4,
                }}
              />
            )
          })
        )}
        {/* center infinity symbol */}
        <motion.div
          className="absolute flex h-8 w-8 items-center justify-center rounded-full border border-[#06B6D4]/55 bg-[#06B6D4]/12"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
          }}
          style={{ boxShadow: '0 0 18px rgba(6,182,212,0.7)' }}
        >
          <InfinityIcon className="h-3.5 w-3.5 text-[#67e8f9]" />
        </motion.div>
      </div>
    </div>
  )
}

const STAGE_VISUALS = [
  ResearchVisual,
  CreateVisual,
  OptimizeVisual,
  DistributeVisual,
  RankVisual,
  CompoundVisual,
]

/* ===================================================================
   EngineCanvas — particles flowing left→right along the horizontal
 *   machine rail. Density + speed intensify with scroll progress.
 *   HMR-safe via __cleanup on the canvas element. Reduced-motion guard.
 *   =================================================================== */
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
          t: number
          speed: number
          r: number
          hue: 0 | 1 | 2 | 3 // 0=white, 1=cyan, 2=neon, 3=blue
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
          const n = reduce ? 0 : 70
          for (let i = 0; i < n; i++) {
            const roll = Math.random()
            const hue: P['hue'] = roll < 0.4 ? 1 : roll < 0.75 ? 2 : roll < 0.9 ? 3 : 0
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
            const px = p.t * w
            const py = h * 0.5 + Math.sin(p.t * Math.PI * 3 + t) * 6
            const energyBoost = 0.5 + p.t * 0.5

            const drawR = p.hue === 0 ? p.r * 2 : 9
            const g = ctx.createRadialGradient(px, py, 0, px, py, drawR)
            if (p.hue === 1) {
              const a = (0.4 + 0.3 * Math.sin(t * 2 + p.phase)) * energyBoost
              g.addColorStop(0, `rgba(6,182,212,${a})`)
              g.addColorStop(1, 'rgba(6,182,212,0)')
            } else if (p.hue === 2) {
              const a = (0.45 + 0.3 * Math.sin(t * 2 + p.phase)) * energyBoost
              g.addColorStop(0, `rgba(103,232,249,${a})`)
              g.addColorStop(1, 'rgba(103,232,249,0)')
            } else if (p.hue === 3) {
              const a = (0.4 + 0.3 * Math.sin(t * 2 + p.phase)) * energyBoost
              g.addColorStop(0, `rgba(59,130,246,${a})`)
              g.addColorStop(1, 'rgba(59,130,246,0)')
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
   VisibilityMachine — the 6-stage horizontal machine (SVG rail +
 *   flowing energy + stage nodes). Receives scrollYProgress for stage
 *   activation + connector flow.
 *   =================================================================== */
function VisibilityMachine({
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
      className="relative w-[min(94vw,1080px)]"
      aria-label="Visibility engine — 6 stages"
    >
      {/* outer ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(6,182,212,0.18), rgba(6,182,212,0) 60%)',
          filter: 'blur(30px)',
        }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* SVG: horizontal rail + flowing energy line */}
      <svg
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-1/2 h-[40px] w-full -translate-y-1/2"
      >
        <defs>
          <linearGradient id="echo-rail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(6,182,212,0.15)" />
            <stop offset="50%" stopColor="rgba(103,232,249,0.85)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.15)" />
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
          stroke="url(#echo-rail)"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeDasharray="3 2"
          style={{
            strokeDashoffset: flowOffset,
            filter: 'drop-shadow(0 0 1.5px rgba(6,182,212,0.8))',
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
        <EngineCanvas progress={scrollYProgress} />
      </div>
    </motion.div>
  )
}

/* ===================================================================
   StageNode — single stage node. Lights up cyan when scrollYProgress
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
  // 6 stages: activate at 0, 0.2, 0.4, 0.6, 0.8, 1.0
  const threshold = index / 5
  const lo = threshold - 0.06
  const hi = threshold + 0.06
  const activeOpacity = useTransform(scrollYProgress, [lo, hi], [0.25, 1])
  const glowOpacity = useTransform(
    scrollYProgress,
    [threshold - 0.1, hi],
    [0.15, 0.9]
  )
  const nodeScale = useTransform(scrollYProgress, [lo, hi], [1, 1.12])
  const borderColor = useTransform(
    scrollYProgress,
    [lo, hi],
    ['rgba(255,255,255,0.12)', 'rgba(6,182,212,0.7)']
  )
  const backgroundColor = useTransform(
    scrollYProgress,
    [lo, hi],
    ['rgba(255,255,255,0.025)', 'rgba(6,182,212,0.12)']
  )

  const isActive = index === 0

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
            background:
              'radial-gradient(circle, rgba(6,182,212,0.6), rgba(6,182,212,0) 70%)',
            filter: 'blur(10px)',
            opacity: glowOpacity,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-2xl border"
          style={{ borderColor }}
        />
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ backgroundColor }}
        />
        <stage.Icon
          className="relative z-10 h-5 w-5 text-[#67e8f9] sm:h-6 sm:w-6"
        />
        {/* stage number badge */}
        <span
          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#06B6D4]/40 bg-[#141414] text-[8px] font-bold text-[#67e8f9]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {stage.n}
        </span>
      </motion.div>

      {/* stage label */}
      <div className="flex flex-col items-center gap-1 text-center">
        <span
          className="wn-eyebrow text-[10px] font-semibold text-white/85 sm:text-[11px]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {stage.name}
        </span>
      </div>

      {/* active pulse ring (only for initial-active stage for SSR safety) */}
      {isActive && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-7 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#06B6D4]/40 sm:h-16 sm:w-16"
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  )
}

/* ===================================================================
   ProgressDot — single dot in the progress indicator.
 *   Fills cyan as the active stage index passes over it.
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
          backgroundColor: 'rgb(6, 182, 212)',
          opacity: fill,
        }}
      />
    </motion.span>
  )
}

/* ===================================================================
   ActiveStageDetail — shows the active stage's number, title,
 *   descriptor, and unique visual. Subscribes directly to
 *   scrollYProgress via useEffect + .on('change').
 *   =================================================================== */
function ActiveStageDetail({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const update = (v: number) => {
      const i = Math.max(0, Math.min(5, Math.round(v * 5)))
      setIdx(i)
    }
    update(scrollYProgress.get())
    const unsub = scrollYProgress.on('change', update)
    return () => unsub()
  }, [scrollYProgress])

  const stage = stages[idx]
  const Visual = STAGE_VISUALS[idx]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
      {/* left: number + title + descriptor */}
      <div className="flex flex-col gap-3">
        <motion.div
          key={`num-${idx}`}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <span
            className="text-6xl font-bold leading-none text-[#06B6D4] sm:text-7xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {stage.n}
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-[#06B6D4] to-transparent" />
        </motion.div>
        <motion.h3
          key={`title-${idx}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-bold leading-tight tracking-[-0.01em] text-white sm:text-4xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {stage.name}
        </motion.h3>
        <motion.p
          key={`desc-${idx}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md text-base leading-relaxed text-white/65 sm:text-lg"
        >
          {stage.desc}
        </motion.p>
      </div>

      {/* right: unique per-stage visual */}
      <motion.div
        key={`visual-${idx}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A]/80 sm:h-[260px]"
      >
        <Visual />
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 text-[9px] text-white/35">
          <Layers className="h-3 w-3" />
          stage {stage.n} / 06
        </div>
      </motion.div>
    </div>
  )
}

/* ===================================================================
   ActiveStageCounter — shows the active stage number ("01" → "06")
 *   + name in the bottom progress row.
 *   =================================================================== */
function ActiveStageCounter({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const [num, setNum] = useState('01')
  const [name, setName] = useState('Research')
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
        className="text-sm font-semibold text-[#06B6D4]"
      >
        {num}
      </motion.span>
      <span className="text-xs text-white/60">{name}</span>
    </div>
  )
}

/* ===================================================================
   VisibilityCounter — live visibility counter that climbs as you
 *   scroll. Subscribes to scrollYProgress.
 *   =================================================================== */
function VisibilityCounter({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const [val, setVal] = useState('0%')
  useEffect(() => {
    const update = (v: number) => {
      // 0 → +312% over the scroll
      const pct = Math.round(v * 312)
      setVal(`+${pct}%`)
    }
    update(scrollYProgress.get())
    const unsub = scrollYProgress.on('change', update)
    return () => unsub()
  }, [scrollYProgress])
  return (
    <div className="flex items-baseline gap-2">
      <span
        className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        Visibility Gained
      </span>
      <motion.span
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
        className="text-sm font-bold text-[#67e8f9]"
      >
        {val}
      </motion.span>
    </div>
  )
}

/* ===================================================================
   EchoVisibilityEngine — Section 5 named export
 *   =================================================================== */
export function EchoVisibilityEngine() {
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
      className="relative min-h-[360vh] border-t border-white/5 bg-[#141414] lg:flex"
      aria-label="The Visibility Engine"
    >
      <CyanStickyRail
        label="The Engine"
        caption="Visibility Compounds"
        sectionRef={outerRef}
      />

      {/* Pinned viewport — lg:flex-1 so it sits beside the rail (not below
          it). Without lg:flex on the parent + lg:flex-1 here, the rail
          aside (h-screen) would stack ABOVE this viewport as a block,
          pushing it down 900px and breaking the sticky pin range. */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden lg:flex-1 lg:min-w-0">
        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 md:pt-28"
        >
          <CyanEyebrow number="05" label="The Visibility Engine" />
          <h2
            className="mt-3 text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine>
              <span className="text-white">The </span>
              <CyanGradientText>Visibility Engine.</CyanGradientText>
            </MaskLine>
          </h2>
        </motion.div>

        {/* Visibility machine — centered */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Local ambient */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[40vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse, rgba(6,182,212,0.2), rgba(6,182,212,0) 60%)',
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
                'radial-gradient(circle, rgba(14,116,144,0.18), rgba(14,116,144,0) 70%)',
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
                'radial-gradient(circle, rgba(103,232,249,0.14), rgba(103,232,249,0) 70%)',
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

          <VisibilityMachine scrollYProgress={scrollYProgress} />
        </div>

        {/* Active stage detail panel */}
        <div className="relative z-20 mx-auto mb-6 w-full max-w-5xl px-5 sm:px-8">
          <ActiveStageDetail scrollYProgress={scrollYProgress} />
        </div>

        {/* Progress indicator: 6 dots + active stage counter + visibility counter */}
        <div className="relative z-20 mx-auto mb-8 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-3">
            {stages.map((s, i) => (
              <ProgressDot key={s.n} index={i} active={activeStage} />
            ))}
          </div>
          <div className="flex items-center gap-6">
            <VisibilityCounter scrollYProgress={scrollYProgress} />
            <div className="flex items-center gap-2">
              <ActiveStageCounter scrollYProgress={scrollYProgress} />
              <span className="text-sm text-white/40">/ 06</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
