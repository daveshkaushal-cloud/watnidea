'use client'

/**
 * DhqFramework — Section 5
 * Horizontal storytelling — pinned/sticky horizontal scroller with 5 build
 * stages.
 *
 * Pattern: outer min-h-[300vh] + inner sticky top-0 h-screen overflow-hidden.
 * useScroll on the outer → useTransform to x translate a horizontal track.
 *
 * 5 stages, each its own Electric Blue visual universe:
 *   01 Discover · 02 Architect · 03 Design · 04 Build · 05 Launch
 *
 * Rules of Hooks: the horizontal track translate uses useScroll + useTransform
 * declared at the TOP of the component. The 5 panels are rendered from a data
 * array (no per-item hooks).
 *
 * COLOR IDENTITY: Electric Blue (#3B82F6) — every stage visual, ambient glow,
 * progress dot, and counter carries the blue signature hue.
 */

import { useRef, useState, useEffect, type ReactElement } from 'react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Compass,
  PenTool,
  Rocket,
  Terminal,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { SectionEyebrow, MaskLine } from '@/components/about/shared'
import { BlueGradientText, DHQ } from './shared'

const accent = DHQ

/* ===================================================================
   Content — 5 build stages.
   =================================================================== */
type Stage = {
  n: string
  name: string
  desc: string
  quote: string
  Icon: LucideIcon
  Visual: () => ReactElement
}

const stages: Stage[] = [
  {
    n: '01',
    name: 'Discover',
    desc: 'Audit, research, and map the conversion journey.',
    quote: 'we engineer attention into architecture',
    Icon: Compass,
    Visual: DiscoverVisual,
  },
  {
    n: '02',
    name: 'Architect',
    desc: 'Structure information, flows, and performance budgets.',
    quote: 'design digital systems for long-term impact',
    Icon: Workflow,
    Visual: ArchitectVisual,
  },
  {
    n: '03',
    name: 'Design',
    desc: 'Craft interfaces with soul and teeth.',
    quote: 'create digital experiences customers love',
    Icon: PenTool,
    Visual: DesignVisual,
  },
  {
    n: '04',
    name: 'Build',
    desc: 'Headless, composable, and built to scale.',
    quote: 'a 24/7 sales engine',
    Icon: Terminal,
    Visual: BuildVisual,
  },
  {
    n: '05',
    name: 'Launch',
    desc: 'Ship, measure, iterate — then scale.',
    quote: 'turn attention into action',
    Icon: Rocket,
    Visual: LaunchVisual,
  },
]

/* ===================================================================
   Visual universes — one per stage (each a self-contained blue motion
   graphic). All hooks declared unconditionally at the top of each component.
   =================================================================== */

/* 01 Discover — radar scan + audit nodes. */
function DiscoverVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(${accent.rgb},0.14), transparent 65%)`,
        }}
      />
      {/* concentric radar rings */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 60 + i * 50,
            height: 60 + i * 50,
            border: `1px solid rgba(${accent.rgb},0.3)`,
          }}
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.6,
          }}
        />
      ))}
      {/* rotating radar sweep */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{
          background: `conic-gradient(from 0deg, rgba(${accent.rgb},0.35), transparent 60deg)`,
          borderRadius: '50%',
        }}
      />
      {/* audit nodes (rounded to 3 decimals for hydration safety) */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.round((50 + Math.cos(angle) * 34) * 1000) / 1000
        const y = Math.round((50 + Math.sin(angle) * 34) * 1000) / 1000
        return (
          <motion.span
            key={i}
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/85"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              boxShadow: `0 0 8px rgba(${accent.softRgb},0.8)`,
            }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
          />
        )
      })}
      {/* center pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: accent.hex,
          boxShadow: `0 0 24px rgba(${accent.rgb},0.95), 0 0 60px rgba(${accent.rgb},0.5)`,
        }}
      />
    </div>
  )
}

/* 02 Architect — blueprint wireframe morphing. */
function ArchitectVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(${accent.rgb},0.14), transparent 60%)`,
        }}
      />
      {/* blueprint grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(${accent.softRgb},0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(${accent.softRgb},0.18) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* morphing wireframe frame */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-36 w-44 -translate-x-1/2 -translate-y-1/2"
        animate={{
          borderRadius: ['12%', '24%', '18%', '24%', '12%'],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          border: `1px solid rgba(${accent.rgb},0.5)`,
          background: `radial-gradient(circle, rgba(${accent.rgb},0.18), transparent 72%)`,
        }}
      />
      {/* inner structural nodes */}
      {[
        { l: '30%', t: '32%' },
        { l: '68%', t: '36%' },
        { l: '34%', t: '66%' },
        { l: '70%', t: '64%' },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: p.l,
            top: p.t,
            background: accent.hex,
            boxShadow: `0 0 8px rgba(${accent.rgb},0.9)`,
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      {/* connecting lines */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <motion.line
          x1="30"
          y1="32"
          x2="68"
          y2="36"
          stroke={`rgba(${accent.rgb},0.35)`}
          strokeWidth={0.4}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.line
          x1="30"
          y1="32"
          x2="34"
          y2="66"
          stroke={`rgba(${accent.rgb},0.35)`}
          strokeWidth={0.4}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.line
          x1="68"
          y1="36"
          x2="70"
          y2="64"
          stroke={`rgba(${accent.rgb},0.35)`}
          strokeWidth={0.4}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
        <motion.line
          x1="34"
          y1="66"
          x2="70"
          y2="64"
          stroke={`rgba(${accent.rgb},0.35)`}
          strokeWidth={0.4}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
        />
      </svg>
      {/* center hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ scale: [1, 1.3, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: accent.hex,
          boxShadow: `0 0 24px rgba(${accent.rgb},0.95), 0 0 60px rgba(${accent.rgb},0.5)`,
        }}
      />
    </div>
  )
}

/* 03 Design — UI components assembling. */
function DesignVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(${accent.rgb},0.14), transparent 60%)`,
        }}
      />
      {/* main interface frame */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[74%] max-w-[320px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/15 bg-[#0c0c0c]"
        style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.hex }} />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="ml-3 flex-1 rounded-md bg-white/[0.06] px-2 py-0.5 text-[8px] text-white/40">
            watnidea.studio
          </div>
        </div>
        <div className="space-y-2 p-3">
          <motion.div
            className="h-2 w-1/3 rounded"
            style={{ background: `rgba(${accent.rgb},0.6)` }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-5/6 rounded bg-white/10" />
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-10 rounded bg-white/[0.05]"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
      {/* floating UI component chips */}
      <motion.div
        className="absolute left-[12%] top-[24%] rounded-md border px-2 py-1 text-[8px] font-medium"
        style={{
          borderColor: `rgba(${accent.rgb},0.35)`,
          background: `rgba(${accent.rgb},0.08)`,
          color: accent.soft,
        }}
        animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        Button
      </motion.div>
      <motion.div
        className="absolute right-[14%] top-[28%] rounded-md border px-2 py-1 text-[8px] font-medium"
        style={{
          borderColor: `rgba(${accent.rgb},0.35)`,
          background: `rgba(${accent.rgb},0.08)`,
          color: accent.soft,
        }}
        animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        Card
      </motion.div>
      <motion.div
        className="absolute bottom-[26%] left-[20%] rounded-md border px-2 py-1 text-[8px] font-medium"
        style={{
          borderColor: `rgba(${accent.rgb},0.35)`,
          background: `rgba(${accent.rgb},0.08)`,
          color: accent.soft,
        }}
        animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        Hero
      </motion.div>
    </div>
  )
}

/* 04 Build — terminal + typing cursor + progress. */
function BuildVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(${accent.rgb},0.14), transparent 60%)`,
        }}
      />
      {/* terminal window */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[76%] max-w-[340px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/15 bg-[#0a0a0a]"
        style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.hex }} />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="ml-3 flex-1 text-[8px] text-white/40">~/digital-hq — build</div>
        </div>
        <div className="space-y-1.5 p-3 font-mono text-[9px]">
          <div className="text-white/50">
            <span style={{ color: accent.soft }}>$</span> bun run build
          </div>
          <motion.div
            className="text-white/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            ✓ compiling routes
          </motion.div>
          <motion.div
            className="text-white/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            ✓ optimizing assets
          </motion.div>
          <motion.div
            className="text-white/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            <span style={{ color: accent.soft }}>✓ deployed</span> in 1.2s
          </motion.div>
          <div className="flex items-center gap-1 pt-1 text-white/60">
            <span style={{ color: accent.soft }}>$</span>
            <motion.span
              className="inline-block h-3 w-1.5"
              style={{ background: accent.hex }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
      {/* progress bar */}
      <motion.div
        className="absolute bottom-[22%] left-1/2 h-1 w-[60%] -translate-x-1/2 overflow-hidden rounded-full bg-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: accent.hex }}
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}

/* 05 Launch — ascending trajectory + launch pulse. */
function LaunchVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 60%, rgba(${accent.rgb},0.16), transparent 60%)`,
        }}
      />
      {/* baseline */}
      <div className="absolute inset-x-[12%] bottom-[30%] h-px bg-white/10" />
      {/* ascending trajectory */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <motion.polyline
          points="10,80 28,66 46,52 64,34 82,14"
          fill="none"
          stroke={`rgba(${accent.rgb},0.9)`}
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 6px rgba(${accent.rgb},0.7))` }}
        />
      </svg>
      {/* trajectory dots */}
      {[
        { l: '10%', b: '20%' },
        { l: '28%', b: '34%' },
        { l: '46%', b: '48%' },
        { l: '64%', b: '66%' },
        { l: '82%', b: '86%' },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            left: p.l,
            bottom: p.b,
            background: accent.hex,
            boxShadow: `0 0 8px rgba(${accent.rgb},0.9)`,
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      {/* launch pulse at apex */}
      <motion.div
        className="absolute right-[14%] top-[14%] h-4 w-4 rounded-full"
        animate={{ scale: [1, 1.8, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: accent.hex,
          boxShadow: `0 0 24px rgba(${accent.rgb},0.95), 0 0 60px rgba(${accent.rgb},0.55)`,
        }}
      />
      {/* launch ring */}
      <motion.div
        className="absolute right-[14%] top-[14%] h-4 w-4 rounded-full border"
        style={{ borderColor: `rgba(${accent.rgb},0.6)` }}
        animate={{ scale: [1, 3], opacity: [0.7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
    </div>
  )
}

/* ===================================================================
   StagePanel — single stage panel (rendered inside the horizontal track).
   Hooks at the top — receives no scroll-driven motion values (all static).
   =================================================================== */
function StagePanel({ stage }: { stage: Stage }) {
  const { n, name, desc, quote, Icon, Visual } = stage
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
          background: `radial-gradient(circle, rgba(${accent.rgb},0.16), rgba(${accent.rgb},0) 65%)`,
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
              className="text-6xl font-bold sm:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif', color: accent.hex }}
            >
              {n}
            </span>
            <span className="h-px w-10" style={{ background: `rgba(${accent.rgb},0.6)` }} />
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
            className="mt-5 flex items-center gap-2 pl-4"
            style={{ borderLeft: `2px solid ${accent.hex}` }}
          >
            <Icon className="h-4 w-4" style={{ color: accent.hex }} />
            <span className="text-sm font-medium text-white/70">{quote}</span>
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
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40">
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
   DhqFramework — Section 5 default export.
   The horizontal track translate uses useScroll + useTransform declared
   unconditionally at the TOP. 5 panels rendered from the data array.
   =================================================================== */
export default function DhqFramework() {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // horizontal track translate: 0vw → -400vw.
  // 5 panels × 100vw = 500vw total track width; we translate from 0 to
  // -400vw (= -(numPanels - 1) × 100vw) so the last panel ends flush
  // with the right edge of the viewport.
  //
  // IMPORTANT: use `vw` units (NOT `%`). The motion.div is a block-level
  // flex container whose computed width matches its PARENT (the 100vw
  // viewport), not its overflowing content. With `%', -80% would be
  // interpreted relative to that 100vw parent width = -80vw, only
  // revealing ~1.2 panels. `vw` is unambiguously viewport-relative and
  // matches the `w-screen` panels exactly.
  const trackX = useTransform(scrollYProgress, [0, 1], ['0vw', '-400vw'])

  // active stage index (0..4) for the progress dots
  const activeStage = useTransform(scrollYProgress, [0, 1], [0, 4])

  return (
    <section
      ref={outerRef}
      className="relative min-h-[300vh] border-t border-white/5 bg-[#050505]"
      aria-label="The Framework — 5-stage build process"
    >
      {/* Pinned horizontal viewport */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 md:pt-28">
          <SectionEyebrow number="05" label="The Framework" accent={accent} />
          <h2
            className="mt-3 text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            How We <BlueGradientText glow={false}>Build</BlueGradientText>
          </h2>
        </div>

        {/* Horizontal track */}
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            style={{ x: trackX }}
            className="flex h-full"
          >
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
      </div>
    </section>
  )
}

/* ===================================================================
   ProgressDot — single dot in the progress indicator.
   Fills blue as the active stage index passes over it.
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
          backgroundColor: accent.hex,
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
      className="text-sm font-semibold"
      // color set via inline style to avoid dynamic class names
    >
      <span style={{ color: accent.hex }}>{text}</span>
    </motion.span>
  )
}
