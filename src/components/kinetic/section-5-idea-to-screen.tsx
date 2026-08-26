'use client'

/**
 * KineticIdeaToScreen — Section 5 of /kinetic-studio
 *
 * Full-screen storytelling — the FILM PRODUCTION TIMELINE.
 * Scroll-controlled.
 *
 * Composition:
 *   - Eyebrow: (05) · The Pipeline (OrangeEyebrow)
 *   - Headline: "From Idea to" + OrangeGradientText "Screen." (hidden
 *     header — the wheel is the focus)
 *
 * Visual concept — the production timeline:
 *   Outer min-h-[300vh] + inner sticky top-0 h-screen.
 *   5 stages laid out horizontally left-to-right:
 *     Concept → Pre-Production → Production → Post-Production → Launch.
 *   Each stage lights up orange as scrollYProgress passes its threshold;
 *   inactive stages are dim white/20. SVG connectors between stages carry
 *   flowing orange energy (animated strokeDashoffset driven by scroll).
 *   Canvas particles flow left→right along the timeline path.
 *   A film-strip progress bar tracks which stage is active.
 *
 *   A "StageDetail" panel beneath the wheel shows the active stage's
 *   large stage number + title + descriptor + a unique scroll-activated
 *   visual (lightbulb glow / storyboard fill / camera viewfinder /
 *   edit timeline / rocket launch).
 *
 * Progress indicator: 5 ProgressDots (width animates 8px→32px based on
 * active stage) + ActiveStage counter subscribing to scrollYProgress
 * showing "01 Concept" → "05 Launch".
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Canvas uses the HMR-safe __cleanup pattern.
 */

import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion'
import {
  Camera,
  ClipboardList,
  Lightbulb,
  Rocket,
  Scissors,
  type LucideIcon,
} from 'lucide-react'
import {
  OrangeEyebrow,
  OrangeGradientText,
  OrangeStickyRail,
  OrangeAmbient,
  OrangeEmberCanvas,
  MaskLine,
} from '@/components/kinetic/shared'

/* ===================================================================
   Content — 5 production timeline stages.
   =================================================================== */
type Stage = {
  n: string
  name: string
  desc: string
  Icon: LucideIcon
  // x position on the horizontal timeline (0..100)
  x: number
  // short tagline shown under the wheel
  tagline: string
}

const stages: Stage[] = [
  {
    n: '01',
    name: 'Concept',
    desc: 'The idea. The why. The story worth telling.',
    Icon: Lightbulb,
    x: 8,
    tagline: 'The spark',
  },
  {
    n: '02',
    name: 'Pre-Production',
    desc: 'Scripts, storyboards, schedules, locations, cast.',
    Icon: ClipboardList,
    x: 29,
    tagline: 'The plan',
  },
  {
    n: '03',
    name: 'Production',
    desc: 'The shoot. Lights, camera, action — captured cinematically.',
    Icon: Camera,
    x: 50,
    tagline: 'The capture',
  },
  {
    n: '04',
    name: 'Post-Production',
    desc: 'Edit, color, sound, motion graphics. The story takes shape.',
    Icon: Scissors,
    x: 71,
    tagline: 'The shape',
  },
  {
    n: '05',
    name: 'Launch',
    desc: 'Released to the world. Measured. Optimized. Scaled.',
    Icon: Rocket,
    x: 92,
    tagline: 'The release',
  },
]

// Round positions (already integers but safe)
const stagePositions = stages.map((s) => ({
  ...s,
  x: Math.round(s.x * 1000) / 1000,
}))

/* ===================================================================
   TimelineCanvas — particles flowing left→right along the horizontal
   timeline rail. Density + speed intensifies with scroll progress.
   HMR-safe via __cleanup on the canvas element. Reduced-motion guard.
   =================================================================== */
function TimelineCanvas({
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
          // 1 = orange, 2 = neon-orange, 3 = gold, 4 = white
          hue: 1 | 2 | 3 | 4
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
          const n = reduce ? 0 : 64
          for (let i = 0; i < n; i++) {
            const roll = Math.random()
            const hue: P['hue'] =
              roll < 0.45 ? 1 : roll < 0.75 ? 2 : roll < 0.92 ? 3 : 4
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
            // particles further right glow brighter (film emerging)
            const energyBoost = 0.5 + p.t * 0.5

            const drawR = p.hue === 4 ? p.r * 2 : 9
            const g = ctx.createRadialGradient(px, py, 0, px, py, drawR)
            if (p.hue === 1) {
              const a = (0.4 + 0.3 * Math.sin(t * 2 + p.phase)) * energyBoost
              g.addColorStop(0, `rgba(249,115,22,${a})`)
              g.addColorStop(1, 'rgba(249,115,22,0)')
            } else if (p.hue === 2) {
              const a = (0.45 + 0.3 * Math.sin(t * 2 + p.phase)) * energyBoost
              g.addColorStop(0, `rgba(253,186,116,${a})`)
              g.addColorStop(1, 'rgba(253,186,116,0)')
            } else if (p.hue === 3) {
              const a = (0.4 + 0.3 * Math.sin(t * 2 + p.phase)) * energyBoost
              g.addColorStop(0, `rgba(251,191,36,${a})`)
              g.addColorStop(1, 'rgba(251,191,36,0)')
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
   TimelineMachine — the 5-stage horizontal timeline (SVG rail +
   flowing energy + stage nodes). Receives scrollYProgress for stage
   activation + connector flow.
   =================================================================== */
function TimelineMachine({
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
      aria-label="Production timeline — 5 stages"
    >
      {/* outer ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(249,115,22,0.18), rgba(249,115,22,0) 60%)',
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
          <linearGradient id="kinetic-rail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(249,115,22,0.15)" />
            <stop offset="50%" stopColor="rgba(253,186,116,0.85)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0.15)" />
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
          stroke="url(#kinetic-rail)"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeDasharray="3 2"
          style={{
            strokeDashoffset: flowOffset,
            filter: 'drop-shadow(0 0 1.5px rgba(249,115,22,0.8))',
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
        <TimelineCanvas progress={scrollYProgress} />
      </div>
    </motion.div>
  )
}

/* ===================================================================
   StageNode — single stage node. Lights up orange when scrollYProgress
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
  // 5 stages: 0, 0.25, 0.5, 0.75, 1.
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
  // border color: orange when active, white/12 when inactive
  const borderColor = useTransform(
    scrollYProgress,
    [lo, hi],
    ['rgba(255,255,255,0.12)', 'rgba(249,115,22,0.7)']
  )
  // background tint
  const backgroundColor = useTransform(
    scrollYProgress,
    [lo, hi],
    ['rgba(255,255,255,0.025)', 'rgba(249,115,22,0.12)']
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
              'radial-gradient(circle, rgba(249,115,22,0.6), rgba(249,115,22,0) 70%)',
            filter: 'blur(10px)',
            opacity: glowOpacity,
          }}
        />
        {/* border color: orange when active, white/12 when inactive */}
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
          className="relative z-10 h-6 w-6 text-[#fdba74] sm:h-7 sm:w-7"
        />
        {/* stage number badge */}
        <span
          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#F97316]/40 bg-[#141414] text-[8px] font-bold text-[#fdba74]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {stage.n}
        </span>
      </motion.div>

      {/* stage label + tagline */}
      <div className="flex flex-col items-center gap-1 text-center">
        <span
          className="wn-eyebrow text-[11px] font-semibold text-white/85 sm:text-xs"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {stage.name}
        </span>
        <span className="hidden max-w-[120px] text-[9px] leading-tight text-white/40 sm:block">
          {stage.tagline}
        </span>
      </div>

      {/* active pulse ring (only renders for the initial-active stage for SSR safety) */}
      {isActive && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-8 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#F97316]/40 sm:h-20 sm:w-20"
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  )
}

/* ===================================================================
   ProgressDot — single dot in the film-strip progress indicator.
   Fills orange as the active stage index passes over it.
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
          backgroundColor: 'rgb(249, 115, 22)',
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
  const [name, setName] = useState('Concept')
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
        className="text-sm font-semibold text-[#F97316]"
      >
        {num}
      </motion.span>
      <span className="text-xs text-white/60">{name}</span>
    </div>
  )
}

/* ===================================================================
   EditLedLabel — honest, non-numeric statement about the studio's
   edit-led approach. Replaces the previous fake 0 → 240+ "films
   delivered" counter. No animated metric for an unverified number.
   =================================================================== */
function EditLedLabel() {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        Edit-led
      </span>
      <span className="text-xs text-white/55">· frame by frame</span>
    </div>
  )
}

/* ===================================================================
   StageVisual — renders the active stage's unique scroll-activated
   visual. Subscribes to scrollYProgress to track which stage is
   active, then renders the corresponding motion graphic inside an
   AnimatePresence so visuals cross-fade as the active stage changes.
   =================================================================== */
function StageVisual({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    const update = (v: number) => {
      const i = Math.max(0, Math.min(4, Math.round(v * 4)))
      setActiveIndex(i)
    }
    update(scrollYProgress.get())
    const unsub = scrollYProgress.on('change', update)
    return () => unsub()
  }, [scrollYProgress])

  const stage = stages[activeIndex]
  const stageKey = stage.n

  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A]/80 sm:h-[220px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={stageKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {/* Stage header — number + name + tagline */}
          <div className="absolute left-4 top-3 z-10 flex items-center gap-3">
            <span
              className="text-3xl font-bold text-[#F97316]"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {stage.n}
            </span>
            <div className="flex flex-col leading-tight">
              <span
                className="wn-eyebrow text-[11px] font-bold uppercase tracking-[0.18em] text-white sm:text-xs"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                {stage.name}
              </span>
              <span className="text-[10px] text-white/45">
                {stage.tagline}
              </span>
            </div>
          </div>

          {/* Visual area — fill below header */}
          <div className="absolute inset-x-0 bottom-0 top-12">
            {activeIndex === 0 && <ConceptVisual />}
            {activeIndex === 1 && <PreProductionVisual />}
            {activeIndex === 2 && <ProductionVisual />}
            {activeIndex === 3 && <PostProductionVisual />}
            {activeIndex === 4 && <LaunchVisual />}
          </div>

          {/* Descriptor overlay bottom-right */}
          <div className="absolute bottom-3 right-4 z-10 max-w-[60%] text-right">
            <p className="text-[11px] leading-relaxed text-white/65 sm:text-xs">
              {stage.desc}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ===================================================================
   Per-stage unique scroll-activated visuals.
   =================================================================== */

/* 01 Concept — lightbulb glowing on. */
function ConceptVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative flex h-24 w-24 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* expanding glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(251,191,36,0.55), rgba(249,115,22,0.15) 50%, transparent 70%)',
              filter: 'blur(12px)',
            }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* bulb ring */}
          <motion.div
            className="absolute h-14 w-14 rounded-full border-2 border-[#FBBF24]"
            animate={{
              boxShadow: [
                '0 0 14px rgba(251,191,36,0.6)',
                '0 0 28px rgba(251,191,36,0.95)',
                '0 0 14px rgba(251,191,36,0.6)',
              ],
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* bulb center */}
          <motion.div
            className="absolute h-8 w-8 rounded-full bg-gradient-to-br from-[#fde68a] to-[#FBBF24]"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 22px rgba(251,191,36,0.95)' }}
          />
          {/* filament icon */}
          <Lightbulb className="relative z-10 h-6 w-6 text-[#141414]" />
          {/* idea sparks rising */}
          {[
            { l: '15%', d: 0 },
            { l: '85%', d: 0.6 },
            { l: '30%', d: 1.2 },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[#FBBF24]"
              style={{ left: p.l, bottom: '20%' }}
              animate={{ y: [0, -40, -40], opacity: [1, 1, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeIn',
                delay: p.d,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* 02 Pre-Production — storyboard grid filling in. */
function PreProductionVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-x-3 inset-y-3 grid grid-cols-4 grid-rows-2 gap-1.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-sm border border-[#F97316]/30 bg-[#1A1A1A]/80"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* abstract scene gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  i % 3 === 0
                    ? 'linear-gradient(135deg, rgba(249,115,22,0.30), rgba(20,20,20,0.6))'
                    : i % 3 === 1
                      ? 'linear-gradient(135deg, rgba(229,57,53,0.20), rgba(20,20,20,0.7))'
                      : 'linear-gradient(135deg, rgba(251,191,36,0.20), rgba(20,20,20,0.7))',
              }}
            />
            {/* horizon line */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/20" />
            {/* shot number */}
            <span
              className="absolute left-1 top-0.5 text-[7px] font-bold text-white/55"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {i + 1}
            </span>
            {/* checkmark fill sweep */}
            <motion.div
              className="absolute inset-0 bg-[#F97316]/15"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.4] }}
              transition={{
                duration: 0.8,
                delay: 0.5 + i * 0.08,
                ease: 'easeOut',
              }}
            />
          </motion.div>
        ))}
      </div>
      {/* "storyboard complete" badge */}
      <motion.div
        className="absolute right-3 top-1.5 rounded-full border border-[#F97316]/50 bg-[#F97316]/12 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-[#fdba74]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        Storyboard · 8 shots
      </motion.div>
    </div>
  )
}

/* 03 Production — camera viewfinder with REC indicator. */
function ProductionVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-3 overflow-hidden rounded-md border border-[#F97316]/35 bg-[#1A1A1A]/80">
        {/* viewfinder corner brackets */}
        <div className="absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-[#F97316]/80" />
        <div className="absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-[#F97316]/80" />
        <div className="absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-[#F97316]/80" />
        <div className="absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-[#F97316]/80" />
        {/* center crosshair */}
        <div className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-[#F97316]/60" />
        <div className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-[#F97316]/60" />

        {/* simulated scene */}
        <div
          className="absolute inset-x-3 inset-y-3"
          style={{
            background:
              'linear-gradient(180deg, rgba(249,115,22,0.28), rgba(229,57,53,0.18) 60%, rgba(20,20,20,0.8))',
          }}
        />
        {/* horizon */}
        <div className="absolute inset-x-3 top-[55%] h-px bg-white/30" />

        {/* REC indicator top-left */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <motion.span
            className="h-2 w-2 rounded-full bg-[#E53935]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 8px rgba(229,57,53,0.95)' }}
          />
          <span
            className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#ff6b63]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            REC
          </span>
        </div>

        {/* timecode top-right */}
        <motion.span
          className="absolute right-3 top-3 text-[9px] font-medium text-white/70"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          00:04:18:22
        </motion.span>

        {/* battery + ISO bottom strip */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[8px] font-medium text-white/55">
          <span>ISO 800 · f/2.8 · 1/50</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-4 rounded-sm border border-white/30" />
            <span>87%</span>
          </span>
        </div>

        {/* light sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
          }}
          animate={{ x: ['-100%', '180%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

/* 04 Post-Production — timeline with clips sliding into place. */
function PostProductionVisual() {
  const clips = [
    { y: 0, w: 28, color: 'rgba(249,115,22,0.55)' },
    { y: 0, w: 18, color: 'rgba(253,186,116,0.55)' },
    { y: 0, w: 22, color: 'rgba(229,57,53,0.45)' },
    { y: 0, w: 16, color: 'rgba(251,191,36,0.5)' },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-x-3 inset-y-3 flex flex-col gap-1.5">
        {/* timeline tracks — 4 tracks, each clip slides in */}
        {clips.map((c, i) => (
          <div
            key={i}
            className="relative flex h-6 items-center rounded border border-white/10 bg-white/[0.05]"
          >
            {/* track label */}
            <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[7px] font-medium text-white/45">
              V{i + 1}
            </span>
            {/* clip */}
            <motion.div
              className="absolute h-3 rounded-sm"
              style={{
                background: c.color,
                boxShadow: '0 0 8px rgba(249,115,22,0.4)',
              }}
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              // position the clip at a moving offset
            >
              <div
                className="absolute left-1 top-1/2 -translate-y-1/2 text-[6px] font-bold text-white/85"
                style={{ width: `${c.w * 3}px` }}
              >
                CLIP {i + 1}
              </div>
            </motion.div>
            {/* playhead line — animated */}
            <motion.div
              className="absolute top-0 bottom-0 w-px bg-[#F97316]"
              animate={{ left: ['10%', '70%', '10%'] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ boxShadow: '0 0 6px rgba(249,115,22,0.9)' }}
            />
          </div>
        ))}
        {/* audio waveform track */}
        <div className="relative flex h-6 items-center gap-0.5 rounded border border-white/10 bg-white/[0.05] px-1">
          <span className="mr-1 text-[7px] font-medium text-white/45">A1</span>
          {Array.from({ length: 32 }).map((_, i) => {
            const h = 20 + Math.abs(Math.sin(i * 0.6)) * 70
            return (
              <motion.span
                key={i}
                className="flex-1 rounded-full bg-[#fdba74]/60"
                style={{ height: `${h}%` }}
                animate={{ opacity: [0.3, 0.85, 0.3] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.04,
                }}
              />
            )
          })}
        </div>
      </div>
      {/* "EDITING" label top-right */}
      <motion.div
        className="absolute right-3 top-1.5 flex items-center gap-1.5 rounded-full border border-[#F97316]/50 bg-[#F97316]/12 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-[#fdba74]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        <Scissors className="h-2.5 w-2.5" />
        Editing
      </motion.div>
    </div>
  )
}

/* 05 Launch — rocket launching with trail. */
function LaunchVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-end justify-center pb-4">
        {/* launch pad */}
        <div className="absolute bottom-2 h-1 w-24 rounded-full bg-white/20" />
        <div className="absolute bottom-2 h-1.5 w-16 rounded-full bg-[#F97316]/40" />

        {/* rocket with trail */}
        <motion.div
          className="relative"
          animate={{ y: [60, -40, -40] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeOut',
            times: [0, 0.7, 1],
          }}
        >
          {/* rocket body */}
          <div className="relative flex h-12 w-7 flex-col items-center">
            {/* nose cone */}
            <div
              className="h-3 w-3 rounded-t-full bg-gradient-to-b from-[#fde68a] to-[#F97316]"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
            {/* body */}
            <div
              className="h-6 w-5 rounded-sm bg-gradient-to-b from-[#fdba74] via-[#F97316] to-[#c2410c]"
              style={{ boxShadow: '0 0 12px rgba(249,115,22,0.7)' }}
            />
            {/* fins */}
            <div className="relative h-3 w-7">
              <div
                className="absolute left-0 top-0 h-3 w-3 bg-gradient-to-br from-[#F97316] to-[#c2410c]"
                style={{ clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)' }}
              />
              <div
                className="absolute right-0 top-0 h-3 w-3 bg-gradient-to-bl from-[#F97316] to-[#c2410c]"
                style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%)' }}
              />
            </div>
          </div>

          {/* exhaust trail — flickering */}
          <motion.div
            className="absolute left-1/2 top-full -translate-x-1/2"
            animate={{ opacity: [0.6, 1, 0.6], scaleY: [0.9, 1.1, 0.9] }}
            transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="mx-auto h-10 w-3 rounded-b-full"
              style={{
                background:
                  'linear-gradient(180deg, rgba(251,191,36,0.95), rgba(249,115,22,0.7) 40%, rgba(229,57,53,0.4) 80%, transparent)',
                filter: 'blur(2px)',
              }}
            />
            <div
              className="mx-auto -mt-8 h-8 w-2 rounded-b-full"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(251,191,36,0.6) 60%, transparent)',
                filter: 'blur(1px)',
              }}
            />
          </motion.div>

          {/* spark particles emitting downward */}
          {[
            { l: -8, d: 0 },
            { l: 6, d: 0.2 },
            { l: -2, d: 0.4 },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-full h-1 w-1 rounded-full bg-[#FBBF24]"
              style={{ marginLeft: p.l }}
              animate={{ y: [0, 30, 30], opacity: [1, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeIn',
                delay: p.d,
              }}
            />
          ))}
        </motion.div>

        {/* release rings expanding */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute bottom-3 h-3 w-3 rounded-full border border-[#F97316]/40"
            animate={{ scale: [1, 8, 8], opacity: [0.7, 0, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeOut',
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
      {/* "LIVE" badge top-right */}
      <motion.div
        className="absolute right-3 top-1.5 flex items-center gap-1.5 rounded-full border border-[#F97316]/55 bg-[#F97316]/15 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-[#fdba74]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        <Rocket className="h-2.5 w-2.5" />
        Released
      </motion.div>
    </div>
  )
}

/* ===================================================================
   KineticIdeaToScreen — Section 5 named export
 *   =================================================================== */
export function KineticIdeaToScreen() {
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
      aria-label="From Idea to Screen"
    >
      <OrangeStickyRail
        label="The Pipeline"
        caption="Idea To Screen"
        sectionRef={outerRef}
      />

      {/* Pinned viewport */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Ambient layers */}
        <div aria-hidden className="absolute inset-0">
          <OrangeAmbient />
        </div>
        <OrangeEmberCanvas count={24} />

        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 md:pt-28"
        >
          <OrangeEyebrow number="05" label="The Pipeline" />
          <h2
            className="mt-3 text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine>
              <span className="text-white">From Idea to </span>
              <OrangeGradientText>Screen.</OrangeGradientText>
            </MaskLine>
          </h2>
        </motion.div>

        {/* Timeline machine — centered */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Local ambient (centered horizontal wash) */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[40vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse, rgba(249,115,22,0.2), rgba(249,115,22,0) 60%)',
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
                'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0) 70%)',
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
                'radial-gradient(circle, rgba(251,191,36,0.14), rgba(251,191,36,0) 70%)',
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

          <TimelineMachine scrollYProgress={scrollYProgress} />
        </div>

        {/* StageDetail panel — large number + title + descriptor + unique visual */}
        <div className="relative z-20 mx-auto mb-4 w-full max-w-3xl px-5 sm:px-8">
          <StageVisual scrollYProgress={scrollYProgress} />
        </div>

        {/* Progress indicator: 5 dots + active stage counter + films counter */}
        <div className="relative z-20 mx-auto mb-8 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-3">
            {stages.map((s, i) => (
              <ProgressDot key={s.n} index={i} active={activeStage} />
            ))}
          </div>
          <div className="flex items-center gap-6">
            <EditLedLabel />
            <div className="flex items-center gap-2">
              <ActiveStage scrollYProgress={scrollYProgress} />
              <span className="text-sm text-white/40">/ 05</span>
            </div>
          </div>
        </div>

        {/* subtle film-strip footer accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 flex h-3 items-center gap-1 bg-[#141414]/60 px-2"
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-2 rounded-[1px] bg-white/15"
              style={{ marginLeft: i === 0 ? 0 : 4 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
