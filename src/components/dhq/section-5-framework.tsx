'use client'

/**
 * DhqFramework — Section 5
 * Horizontal storytelling journey — pinned/sticky horizontal scroller
 * with 6 stages of the Digital HQ Framework.
 *
 * Pattern: outer min-h-[500vh] + inner sticky top-0 h-screen
 * overflow-hidden. useScroll on the outer → useTransform to x translate
 * the horizontal track.
 *
 * CRITICAL: use `vw` units for the horizontal translate, NOT `%`.
 * 6 panels × 100vw = 600vw total track width; we translate from 0 to
 * -500vw (= -(numPanels - 1) × 100vw) so the last panel ends flush
 * with the right edge of the viewport. The motion.div is a flex
 * container whose computed width matches its PARENT (100vw), not its
 * overflowing content — so `%` would resolve to ~83vw = wrong. `vw`
 * is viewport-relative and matches the `w-screen` panels exactly
 * (Task 11 fix preserved here).
 *
 * 6 stages, each its own visual universe:
 *   01 Strategy · 02 UX Planning · 03 Visual Design
 *   04 Development · 05 Optimization · 06 Launch
 *
 * Animated progression line (scaleX 0→1) at the bottom.
 * Progress dots (6) — active one fills red.
 * Stage counter "01 / 06" → "06 / 06" via motionValue.on('change') +
 * initial .get() (NOT useMotionValueEvent, which was unreliable per
 * the about-page agent's notes).
 */

import { useRef, useState, useEffect, type ReactElement } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Target,
  Route,
  Palette,
  Code2,
  Gauge,
  Rocket,
  type LucideIcon,
} from 'lucide-react'
import {
  SectionEyebrow,
  MaskLine,
  RedGradientText,
} from '@/components/about/shared'

/* ===================================================================
   Content — 6 stages (premium descriptors, brand voice, verbatim).
   =================================================================== */
type Stage = {
  n: string
  name: string
  desc: string
  Icon: LucideIcon
  Visual: () => ReactElement
}

const stages: Stage[] = [
  {
    n: '01',
    name: 'Strategy',
    desc: 'We define goals, audience, and the conversion architecture.',
    Icon: Target,
    Visual: StrategyVisual,
  },
  {
    n: '02',
    name: 'UX Planning',
    desc: 'We map every journey, every click, every decision point.',
    Icon: Route,
    Visual: UxPlanningVisual,
  },
  {
    n: '03',
    name: 'Visual Design',
    desc: 'We design the interface that makes your brand impossible to ignore.',
    Icon: Palette,
    Visual: VisualDesignVisual,
  },
  {
    n: '04',
    name: 'Development',
    desc: 'We build it fast, clean, and scalable — frontend to backend.',
    Icon: Code2,
    Visual: DevelopmentVisual,
  },
  {
    n: '05',
    name: 'Optimization',
    desc: 'We pressure-test speed, SEO, and conversion paths.',
    Icon: Gauge,
    Visual: OptimizationVisual,
  },
  {
    n: '06',
    name: 'Launch',
    desc: 'We ship, monitor, and iterate from day one.',
    Icon: Rocket,
    Visual: LaunchVisual,
  },
]

/* ===================================================================
   Visual universes — one per stage (self-contained motion graphics).
   =================================================================== */

/* 01 Strategy — blueprint / target / architecture diagram motif. */
function StrategyVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.16), transparent 65%)',
        }}
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {/* blueprint grid */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            x2="100"
            y1={(i + 1) * 11}
            y2={(i + 1) * 11}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={0.3}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`v-${i}`}
            y1="0"
            y2="100"
            x1={(i + 1) * 11}
            x2={(i + 1) * 11}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={0.3}
          />
        ))}
        {/* concentric target rings */}
        <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(229,57,53,0.45)" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(229,57,53,0.65)" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="6" fill="none" stroke="rgba(229,57,53,0.85)" strokeWidth="0.6" />
        {/* crosshair */}
        <line x1="50" y1="18" x2="50" y2="82" stroke="rgba(229,57,53,0.55)" strokeWidth="0.4" />
        <line x1="18" y1="50" x2="82" y2="50" stroke="rgba(229,57,53,0.55)" strokeWidth="0.4" />
        {/* center pulse */}
        <motion.circle
          cx="50"
          cy="50"
          r="2"
          fill="rgba(229,57,53,1)"
          animate={{ r: [2, 3.5, 2] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(229,57,53,0.9))' }}
        />
        {/* anchor points at corners */}
        {[
          { x: 22, y: 22 },
          { x: 78, y: 22 },
          { x: 22, y: 78 },
          { x: 78, y: 78 },
        ].map((p, i) => (
          <motion.rect
            key={i}
            x={p.x - 1.5}
            y={p.y - 1.5}
            width="3"
            height="3"
            fill="rgba(229,57,53,0.85)"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

/* 02 UX Planning — user flow / wireframe motif. */
function UxPlanningVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.14), transparent 65%)',
        }}
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {/* wireframe nodes + flow lines */}
        <g stroke="rgba(229,57,53,0.45)" strokeWidth="0.4" fill="none">
          <motion.path
            d="M 20 30 Q 35 30 35 50"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            strokeDasharray="3 4"
          />
          <motion.path
            d="M 35 50 Q 50 50 50 70"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
            strokeDasharray="3 4"
          />
          <motion.path
            d="M 50 70 Q 65 70 65 50"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1.0 }}
            strokeDasharray="3 4"
          />
          <motion.path
            d="M 65 50 Q 80 50 80 30"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1.5 }}
            strokeDasharray="3 4"
          />
        </g>
        {/* decision nodes */}
        {[
          { x: 20, y: 30, d: 0 },
          { x: 35, y: 50, d: 0.5 },
          { x: 50, y: 70, d: 1.0 },
          { x: 65, y: 50, d: 1.5 },
          { x: 80, y: 30, d: 2.0 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2.5"
            fill="rgba(229,57,53,0.9)"
            animate={{ r: [2.5, 3.5, 2.5], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.d,
            }}
            style={{ filter: 'drop-shadow(0 0 3px rgba(229,57,53,0.8))' }}
          />
        ))}
        {/* entry/exit labels (as small rects) */}
        <rect x="14" y="14" width="12" height="5" rx="1" fill="rgba(255,255,255,0.12)" stroke="rgba(229,57,53,0.35)" strokeWidth="0.3" />
        <rect x="74" y="14" width="12" height="5" rx="1" fill="rgba(229,57,53,0.55)" stroke="rgba(229,57,53,0.85)" strokeWidth="0.3" />
      </svg>
    </div>
  )
}

/* 03 Visual Design — design systems / color palettes / type specimens. */
function VisualDesignVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.14), transparent 65%)',
        }}
      />
      {/* morphing logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="h-14 w-14"
          animate={{
            borderRadius: ['22%', '50%', '8px', '46%', '22%'],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.65), rgba(229,57,53,0.1) 70%)',
            border: '1px solid rgba(229,57,53,0.5)',
          }}
        />
      </div>
      {/* color palette dots */}
      <div className="absolute left-3 top-3 flex gap-1.5">
        {['#E53935', '#ff6b63', '#ffffff', '#a8201d'].map((c, i) => (
          <motion.span
            key={i}
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: c }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      {/* type specimen */}
      <div className="absolute bottom-3 right-3 flex flex-col items-end gap-1">
        <motion.span
          className="text-[10px] font-bold text-white/85"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Aa
        </motion.span>
        <motion.span
          className="text-[8px] text-white/55"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
        >
          Bb
        </motion.span>
      </div>
    </div>
  )
}

/* 04 Development — code/terminal motif with components assembling. */
function DevelopmentVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.16), transparent 65%)',
        }}
      />
      {/* terminal */}
      <div className="absolute inset-3 rounded-md border border-white/10 bg-[#202020]/85 p-2 font-mono">
        {/* window dots */}
        <div className="mb-1.5 flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-[#E53935]/70" />
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span className="h-1 w-1 rounded-full bg-white/30" />
        </div>
        {/* code lines */}
        <div className="space-y-1">
          {[
            { w: '60%', c: 'rgba(255,255,255,0.45)' },
            { w: '80%', c: 'rgba(229,57,53,0.85)' },
            { w: '50%', c: 'rgba(255,255,255,0.35)' },
            { w: '70%', c: 'rgba(255,107,99,0.7)' },
            { w: '40%', c: 'rgba(255,255,255,0.45)' },
          ].map((l, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full"
              style={{ width: l.w, background: l.c }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        {/* cursor */}
        <motion.div
          className="mt-1 h-2 w-1.5 bg-[#ff6b63]"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      {/* assembling component block (top-right) */}
      <motion.div
        className="absolute right-4 top-4 h-6 w-6 rounded border border-[#E53935]/55 bg-[#E53935]/20"
        animate={{ rotate: [0, 90, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 12px rgba(229,57,53,0.5)' }}
      />
    </div>
  )
}

/* 05 Optimization — dashboard / metrics motif (lighthouse scores + chart). */
function OptimizationVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.14), transparent 65%)',
        }}
      />
      {/* lighthouse-style circular score */}
      <div className="absolute left-3 top-3 flex flex-col items-center">
        <svg viewBox="0 0 36 36" className="h-12 w-12">
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2.5"
          />
          <motion.circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="rgba(229,57,53,0.95)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="94.25"
            initial={{ strokeDashoffset: 94.25 }}
            animate={{ strokeDashoffset: [94.25, 11.31, 94.25] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            transform="rotate(-90 18 18)"
            style={{ filter: 'drop-shadow(0 0 3px rgba(229,57,53,0.7))' }}
          />
        </svg>
        <span
          className="mt-0.5 text-[9px] font-bold text-[#ff6b63]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          98
        </span>
      </div>
      {/* chart bars going up */}
      <div className="absolute bottom-3 left-1/2 flex h-12 -translate-x-1/2 items-end gap-1">
        {[30, 45, 35, 60, 75, 90].map((h, i) => (
          <motion.div
            key={i}
            className="w-2 rounded-sm"
            style={{
              height: `${h}%`,
              background:
                i >= 4
                  ? 'rgba(229,57,53,0.85)'
                  : 'rgba(255,255,255,0.18)',
            }}
            animate={{ height: [`${h * 0.7}%`, `${h}%`, `${h * 0.7}%`] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
      {/* arrow up */}
      <motion.div
        className="absolute right-3 top-3"
        animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="text-xs font-bold text-[#ff6b63]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          ▲
        </span>
      </motion.div>
    </div>
  )
}

/* 06 Launch — rocket / deploy / live indicator motif. */
function LaunchVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 60%, rgba(229,57,53,0.2), transparent 60%)',
        }}
      />
      {/* concentric launch rings */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E53935]/40"
          style={{ width: 40 + i * 30, height: 40 + i * 30 }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.5,
          }}
        />
      ))}
      {/* rocket burst — ascending line + dot */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [0, -22, 0], opacity: [1, 0.4, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="h-12 w-1 rounded-full bg-gradient-to-t from-transparent via-[#E53935] to-[#ff6b63]"
          style={{ filter: 'drop-shadow(0 0 8px rgba(229,57,53,0.9))' }}
        />
      </motion.div>
      {/* burst point */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6b63]"
        animate={{ scale: [1, 1.6, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow: '0 0 16px rgba(255,107,99,0.95), 0 0 36px rgba(229,57,53,0.6)',
        }}
      />
      {/* live indicator (top-right) */}
      <div className="absolute right-3 top-3 flex items-center gap-1">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#ff6b63]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span
          className="text-[9px] font-bold uppercase tracking-wider text-[#ff6b63]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          Live
        </span>
      </div>
    </div>
  )
}

/* ===================================================================
   StagePanel — single stage panel (rendered inside the horizontal
   track). Hooks at the top — receives no scroll-driven motion values.
   =================================================================== */
function StagePanel({ stage }: { stage: Stage }) {
  const { n, name, desc, Icon, Visual } = stage
  return (
    <div
      className="relative flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden px-5 sm:px-8"
      aria-label={`Stage ${n} — ${name}`}
    >
      {/* ambient glow per panel */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0) 65%)',
          filter: 'blur(40px)',
        }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* LEFT: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex items-center gap-3"
          >
            <span
              className="text-7xl font-bold text-[#E53935] sm:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {n}
            </span>
            <span className="h-px w-10 bg-[#E53935]/60" />
            <span className="wn-eyebrow text-[10px] font-medium text-white/45">
              Stage
            </span>
          </motion.div>

          <h3
            className="text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine>{name}</MaskLine>
          </h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/65"
          >
            {desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-5 flex items-center gap-2 border-l-2 border-[#E53935] pl-4"
          >
            <Icon className="h-4 w-4 text-[#E53935]" />
            <span className="text-sm font-medium text-white/70">
              The Digital HQ · {name}
            </span>
          </motion.div>
        </div>

        {/* RIGHT: visual universe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square w-full max-w-[440px] justify-self-center"
        >
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#1A1A1A]/80">
            <Visual />
            <div className="pointer-events-none absolute left-4 top-4 wn-eyebrow text-[9px] text-white/45">
              {name} universe
            </div>
            <div className="pointer-events-none absolute bottom-4 right-4 text-[9px] text-white/30">
              {n} / 06
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ===================================================================
   ProgressDot — single dot in the progress indicator.
   Fills red as the active stage index passes over it.
   Hooks at the top (unconditional).
   =================================================================== */
function ProgressDot({
  index,
  active,
}: {
  index: number
  active: ReturnType<typeof useTransform>
}) {
  const fill = useTransform(
    active,
    (v) => Math.max(0, Math.min(1, 1 - Math.abs(v - index)))
  )
  const width = useTransform(fill, [0, 1], ['8px', '36px'])

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
   ActiveCounter — shows the active stage number ("01" → "06").
   Subscribes directly to scrollYProgress via useEffect + .on('change').
   =================================================================== */
function ActiveCounter({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const [text, setText] = useState('01')
  useEffect(() => {
    const update = (v: number) => {
      const i = Math.max(0, Math.min(5, Math.round(v * 5)))
      setText(String(i + 1).padStart(2, '0'))
    }
    update(scrollYProgress.get())
    const unsub = scrollYProgress.on('change', update)
    return () => unsub()
  }, [scrollYProgress])
  return (
    <motion.span
      style={{ fontFamily: 'var(--font-display), sans-serif' }}
      className="text-sm font-semibold text-[#E53935]"
    >
      {text}
    </motion.span>
  )
}

/* ===================================================================
   DhqFramework — Section 5 named export.
   The horizontal track translate uses useScroll + useTransform declared
   unconditionally at the TOP. 6 panels rendered from the data array.
   =================================================================== */
export function DhqFramework() {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // horizontal track translate: 0vw → -500vw (6 panels, last ends flush).
  // IMPORTANT: use `vw` units (NOT `%`). See file header for full reasoning.
  const trackX = useTransform(scrollYProgress, [0, 1], ['0vw', '-500vw'])

  // active stage index (0..5) for the progress dots
  const activeStage = useTransform(scrollYProgress, [0, 1], [0, 5])

  // bottom progression line scaleX
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      ref={outerRef}
      className="relative min-h-[500vh] border-t border-white/5 bg-[#141414]"
      aria-label="The Framework — 6-stage process"
    >
      {/* Pinned horizontal viewport */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 md:pt-28">
          <SectionEyebrow number="05" label="The Framework" />
          <h2
            className="mt-3 text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            The <RedGradientText glow={false}>Framework</RedGradientText>
          </h2>
        </div>

        {/* Horizontal track */}
        <div className="relative flex-1 overflow-hidden">
          <motion.div style={{ x: trackX }} className="flex h-full">
            {stages.map((s) => (
              <StagePanel key={s.n} stage={s} />
            ))}
          </motion.div>
        </div>

        {/* Progress indicator: 6 dots + stage counter */}
        <div className="relative z-20 mx-auto mb-8 flex w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            {stages.map((s, i) => (
              <ProgressDot key={s.n} index={i} active={activeStage} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ActiveCounter scrollYProgress={scrollYProgress} />
            <span className="text-sm text-white/40">/ 06</span>
          </div>
        </div>

        {/* Bottom progression line (scaleX 0→1) */}
        <div className="relative z-20 h-px w-full bg-white/8">
          <motion.div
            style={{ scaleX: progressScaleX }}
            className="absolute left-0 top-0 h-full w-full origin-left bg-gradient-to-r from-[#E53935] via-[#ff6b63] to-[#E53935]"
          />
        </div>
      </div>
    </section>
  )
}
