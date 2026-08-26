'use client'

/**
 * AuraProcess — Section 5
 * Horizontal storytelling journey — pinned/sticky horizontal scroller
 * with 5 stages.
 *
 * Pattern: outer min-h-[400vh] + inner sticky top-0 h-screen overflow-hidden.
 * useScroll on the outer → useTransform to x translate the horizontal track.
 *
 * CRITICAL: use `vw` units for the horizontal translate, NOT `%`.
 * 5 panels × 100vw = 500vw total track width; we translate from 0 to
 * -400vw (= -(numPanels - 1) × 100vw) so the last panel ends flush with
 * the right edge of the viewport. The motion.div is a flex container
 * whose computed width matches its PARENT (100vw), not its overflowing
 * content — so `%` would resolve to ~80vw = wrong. `vw` is viewport-
 * relative and matches the `w-screen` panels exactly (Task 11 fix).
 *
 * 5 stages, each its own visual universe:
 *   01 Discover · 02 Define · 03 Design · 04 Refine · 05 Launch
 *
 * Animated progression line (scaleX 0→1) at the bottom.
 * Progress dots (5) — active one fills red.
 * Stage counter "01 / 05" → "05 / 05" via motionValue.on('change') +
 * initial .get() (NOT useMotionValueEvent, which was unreliable per the
 * about-page agent's notes).
 */

import { useRef, useState, useEffect, type ReactElement } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Compass,
  Crosshair,
  Layers,
  Rocket,
  Search,
  type LucideIcon,
} from 'lucide-react'
import { SectionEyebrow, MaskLine, RedGradientText } from '@/components/about/shared'

/* ===================================================================
   Content — 5 stages (premium descriptors, brand voice).
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
    name: 'Discover',
    desc: 'We audit your market, your audience, and the whitespace your brand can own.',
    Icon: Search,
    Visual: DiscoverVisual,
  },
  {
    n: '02',
    name: 'Define',
    desc: 'We lock positioning, voice, and the strategic foundation.',
    Icon: Compass,
    Visual: DefineVisual,
  },
  {
    n: '03',
    name: 'Design',
    desc: 'We craft the visual identity — logo, type, color, system.',
    Icon: Layers,
    Visual: DesignVisual,
  },
  {
    n: '04',
    name: 'Refine',
    desc: 'We pressure-test every element until it earns its place.',
    Icon: Crosshair,
    Visual: RefineVisual,
  },
  {
    n: '05',
    name: 'Launch',
    desc: 'We ship the system and arm your team to scale it.',
    Icon: Rocket,
    Visual: LaunchVisual,
  },
]

/* ===================================================================
   Visual universes — one per stage (self-contained motion graphics).
   =================================================================== */

/* 01 Discover — radar/search motif with sweeping beam + data points. */
function DiscoverVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.16), transparent 65%)',
        }}
      />
      {/* radar rings */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12"
          style={{ width: 40 + i * 50, height: 40 + i * 50 }}
        />
      ))}
      {/* sweeping beam */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-1/2 w-1/2 origin-bottom-left"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(229,57,53,0.35), transparent 60deg)',
          borderRadius: '100% 0 0 0',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      {/* data points */}
      {[
        { l: '32%', t: '28%' },
        { l: '68%', t: '40%' },
        { l: '40%', t: '66%' },
        { l: '72%', t: '70%' },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#E53935]"
          style={{
            left: p.l,
            top: p.t,
            boxShadow: '0 0 8px rgba(229,57,53,0.9)',
          }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}
      {/* center hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow: '0 0 16px rgba(229,57,53,0.9), 0 0 36px rgba(229,57,53,0.5)',
        }}
      />
    </div>
  )
}

/* 02 Define — blueprint/foundation motif (grid + anchor + lock). */
function DefineVisual() {
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
        {/* anchor cross */}
        <line x1="50" y1="22" x2="50" y2="78" stroke="rgba(229,57,53,0.6)" strokeWidth="0.6" />
        <line x1="22" y1="50" x2="78" y2="50" stroke="rgba(229,57,53,0.6)" strokeWidth="0.6" />
        <motion.rect
          x="36"
          y="36"
          width="28"
          height="28"
          fill="none"
          stroke="rgba(229,57,53,0.85)"
          strokeWidth="0.8"
          animate={{ rotate: [0, 90, 0] }}
          style={{ transformOrigin: '50px 50px' }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
      {/* foundation blocks */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-8 rounded-sm"
            style={{
              background:
                i === 1
                  ? 'rgba(229,57,53,0.85)'
                  : 'rgba(255,255,255,0.15)',
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* 03 Design — design motif (logo variations + color palette + type). */
function DesignVisual() {
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

/* 04 Refine — polish motif (iterations / magnification / layers). */
function RefineVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.16), transparent 65%)',
        }}
      />
      {/* layered iterations */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-md border"
            style={{
              width: 60 - i * 14,
              height: 60 - i * 14,
              left: -(60 - i * 14) / 2,
              top: -(60 - i * 14) / 2,
              background:
                i === 2
                  ? 'rgba(229,57,53,0.55)'
                  : 'rgba(255,255,255,0.05)',
              borderColor:
                i === 2 ? 'rgba(229,57,53,0.8)' : 'rgba(255,255,255,0.18)',
            }}
            animate={{ rotate: [0, 12, 0], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>
      {/* magnifier */}
      <motion.div
        className="absolute right-3 top-3"
        animate={{ y: [0, 6, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
          <circle
            cx="10"
            cy="10"
            r="6"
            stroke="rgba(229,57,53,0.85)"
            strokeWidth="1.5"
          />
          <line
            x1="14.5"
            y1="14.5"
            x2="20"
            y2="20"
            stroke="rgba(229,57,53,0.85)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}

/* 05 Launch — launch motif (rocket burst + rollout). */
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
    </div>
  )
}

/* ===================================================================
   StagePanel — single stage panel (rendered inside the horizontal track).
   Hooks at the top — receives no scroll-driven motion values (all static).
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
              Aura Architecture · {name}
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
              {n} / 05
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
   ActiveCounter — shows the active stage number ("01" → "05").
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
      const i = Math.max(0, Math.min(4, Math.round(v * 4)))
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
   AuraProcess — Section 5 default export.
   The horizontal track translate uses useScroll + useTransform declared
   unconditionally at the TOP. 5 panels rendered from the data array.
   =================================================================== */
export function AuraProcess() {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // horizontal track translate: 0vw → -400vw (5 panels, last ends flush).
  // IMPORTANT: use `vw` units (NOT `%`). See file header for full reasoning.
  const trackX = useTransform(scrollYProgress, [0, 1], ['0vw', '-400vw'])

  // active stage index (0..4) for the progress dots
  const activeStage = useTransform(scrollYProgress, [0, 1], [0, 4])

  // bottom progression line scaleX
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      ref={outerRef}
      className="relative min-h-[400vh] border-t border-white/5 bg-[#141414]"
      aria-label="The Process — 5-stage framework"
    >
      {/* Pinned horizontal viewport */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 md:pt-28">
          <SectionEyebrow number="05" label="The Process" />
          <h2
            className="mt-3 text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            The <RedGradientText glow={false}>Process</RedGradientText>
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

        {/* Progress indicator: 5 dots + stage counter */}
        <div className="relative z-20 mx-auto mb-8 flex w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            {stages.map((s, i) => (
              <ProgressDot key={s.n} index={i} active={activeStage} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ActiveCounter scrollYProgress={scrollYProgress} />
            <span className="text-sm text-white/40">/ 05</span>
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
