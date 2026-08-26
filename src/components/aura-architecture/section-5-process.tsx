'use client'

/**
 * AuraProcess — Section 5 of the /aura-architecture page.
 *
 * The Process — horizontal storytelling journey through the 5-stage
 * "How We Think" framework (verbatim from about/section-5-how-we-think).
 *
 * Pattern (with the Task 11-fix `vw` unit lesson baked in):
 *   - Outer `min-h-[400vh]` (tall enough for 5 panels), inner
 *     `sticky top-0 h-screen overflow-hidden`.
 *   - `useScroll({ target: outerRef, offset: ['start start', 'end end'] })`
 *   - `const trackX = useTransform(scrollYProgress, [0, 1], ['0vw', '-400vw'])`
 *     CRITICAL: use `vw` units, NOT `%`. The motion.div is a block-level
 *     flex container whose computed width matches its PARENT (the 100vw
 *     viewport), not its overflowing content. With `%`, the translate
 *     would be interpreted relative to that 100vw parent width = only
 *     ~1.2 panels visible. `vw` is unambiguously viewport-relative.
 *
 * 5 stages (verbatim from about/section-5):
 *   01 Identity       — `Create a memorable foundation for your business.`
 *                        quote: `watNidea is an Identity Lab.` (Fingerprint)
 *                        ← THIS IS THE AURA STAGE — hero/first
 *   02 Experience     — `Websites designed to convert attention into action.`
 *                        quote: `create digital experiences customers love`
 *                        (Globe)
 *   03 Attention      — `capture instant attention and engagement.`
 *                        quote: `We engineer attention` (Zap)
 *   04 Growth         — `Marketing engines built to scale.`
 *                        quote: `design growth systems` (TrendingUp)
 *   05 Community      — `turn your audience into a loyal brand tribe.`
 *                        (Users)
 *
 * Progress indicator at bottom: 5 dots, active one fills red. Stage
 * counter `01 / 05`. Animated progression line: a horizontal red line at
 * the bottom that fills as you scroll (scaleX from 0 to 1, synced to
 * scrollYProgress).
 */

import { useRef, useState, useEffect, type ReactElement } from 'react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Fingerprint,
  Globe,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { SectionEyebrow, MaskLine, RedGradientText } from '@/components/about/shared'

/* ===================================================================
   Content — 5 stages assembled from existing brand copy (verbatim quotes).
   Stage 01 Identity is the Aura stage — flagged as `primary`.
   =================================================================== */
type Stage = {
  n: string
  name: string
  desc: string
  quote: string
  Icon: LucideIcon
  Visual: () => ReactElement
  primary?: boolean
}

const stages: Stage[] = [
  {
    n: '01',
    name: 'Identity',
    desc: 'Create a memorable foundation for your business.',
    quote: 'watNidea is an Identity Lab.',
    Icon: Fingerprint,
    Visual: IdentityVisual,
    primary: true,
  },
  {
    n: '02',
    name: 'Experience',
    desc: 'Websites designed to convert attention into action.',
    quote: 'create digital experiences customers love',
    Icon: Globe,
    Visual: ExperienceVisual,
  },
  {
    n: '03',
    name: 'Attention',
    desc: 'capture instant attention and engagement.',
    quote: 'We engineer attention',
    Icon: Zap,
    Visual: AttentionVisual,
  },
  {
    n: '04',
    name: 'Growth',
    desc: 'Marketing engines built to scale.',
    quote: 'design growth systems',
    Icon: TrendingUp,
    Visual: GrowthVisual,
  },
  {
    n: '05',
    name: 'Community',
    desc: 'turn your audience into a loyal brand tribe.',
    quote: 'a loyal brand tribe',
    Icon: Users,
    Visual: CommunityVisual,
  },
]

/* ===================================================================
   Visual universes — one per stage (each a self-contained motion graphic).
   (Copied verbatim from about/section-5-how-we-think.)
   =================================================================== */

/* 01 Identity — fingerprint/orbit motifs, red identity ring. */
function IdentityVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.14), transparent 65%)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2"
        animate={{
          borderRadius: ['24%', '50%', '46%', '50%', '24%'],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          border: '1px solid rgba(229,57,53,0.5)',
          background:
            'radial-gradient(circle, rgba(229,57,53,0.18), transparent 72%)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ border: '1px dashed rgba(255,255,255,0.18)' }}
      />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const r = 64 + i * 14
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r }}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span
              className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/85"
              style={{ boxShadow: '0 0 8px rgba(255,255,255,0.7)' }}
            />
          </motion.div>
        )
      })}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow:
            '0 0 24px rgba(229,57,53,0.95), 0 0 60px rgba(229,57,53,0.5)',
        }}
      />
    </div>
  )
}

/* 02 Experience — browser/HQ abstract with conversion flow lines. */
function ExperienceVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), transparent 60%)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 w-[78%] max-w-[340px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-md"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E53935]" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="ml-2 rounded-full bg-white/5 px-2 py-0.5 text-[8px] text-white/40">
            watnidea.studio
          </span>
        </div>
        <div className="space-y-2 p-3">
          <div className="h-3 w-1/3 rounded-sm bg-white/15" />
          <div className="h-2 w-2/3 rounded-sm bg-white/8" />
          <div className="mt-3 flex gap-2">
            <div className="h-6 w-16 rounded-md bg-[#E53935]/40" />
            <div className="h-6 w-12 rounded-md border border-white/15" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <div className="h-8 rounded-sm bg-white/[0.06]" />
            <div className="h-8 rounded-sm bg-white/[0.06]" />
            <div className="h-8 rounded-sm bg-[#E53935]/15" />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="absolute left-[8%] top-[30%]"
        animate={{ y: [0, 14, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-[#E53935] to-transparent" />
      </motion.div>
      <motion.div
        className="absolute right-[8%] bottom-[24%]"
        animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-[#ff6b63] to-transparent" />
      </motion.div>
    </div>
  )
}

/* 03 Attention — hype waves, trending arrows, red pulse. */
function AttentionVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 60%, rgba(229,57,53,0.18), transparent 60%)',
        }}
      />
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E53935]/30"
          style={{ width: 60 + i * 50, height: 60 + i * 50 }}
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.6,
          }}
        />
      ))}
      <motion.svg
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 100 100"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.polyline
          points="20,75 40,55 55,65 80,30"
          fill="none"
          stroke="rgba(229,57,53,0.9)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(229,57,53,0.8))' }}
        />
        <motion.polygon
          points="80,30 70,32 78,40"
          fill="rgba(229,57,53,0.9)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.4 }}
        />
      </motion.svg>
      <motion.div
        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow:
            '0 0 24px rgba(229,57,53,0.95), 0 0 60px rgba(229,57,53,0.55)',
        }}
      />
    </div>
  )
}

/* 04 Growth — ascending chart, alchemy glow, ▲ Growth decorative. */
function GrowthVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 70%, rgba(229,57,53,0.16), transparent 60%)',
        }}
      />
      <div className="absolute inset-x-[12%] bottom-[30%] h-px bg-white/10" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.polyline
          points="10,80 28,66 46,52 64,34 82,14"
          fill="none"
          stroke="rgba(229,57,53,0.9)"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(229,57,53,0.7))' }}
        />
      </svg>
      <div
        className="absolute inset-x-[14%] bottom-[30%] flex items-end justify-between"
        style={{ height: '40%' }}
      >
        {[38, 56, 72, 88, 100].map((h, i) => (
          <motion.div
            key={i}
            className="w-3 origin-bottom rounded-t-sm"
            style={{
              background:
                'linear-gradient(to top, rgba(229,57,53,0.55), rgba(255,255,255,0.12))',
              height: '100%',
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </div>
      <motion.div
        className="absolute right-[14%] top-[26%] rounded-full border border-[#E53935]/40 bg-[#E53935]/10 px-3 py-1 text-[10px] font-semibold text-[#ff6b63]"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
        animate={{ y: [0, -6, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        ▲ Growth
      </motion.div>
    </div>
  )
}

/* 05 Community — tribe/echo nodes connecting, network graph. */
function CommunityVisual() {
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2
    return {
      x: Math.round((50 + Math.cos(angle) * 32) * 1000) / 1000,
      y: Math.round((50 + Math.sin(angle) * 32) * 1000) / 1000,
    }
  })
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.14), transparent 60%)',
        }}
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {nodes.map((n, i) => (
          <motion.line
            key={`l-${i}`}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="rgba(229,57,53,0.35)"
            strokeWidth={0.4}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={`n-${i}`}
          className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80"
          style={{ left: `${n.x}%`, top: `${n.y}%`, boxShadow: '0 0 8px rgba(255,255,255,0.7)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow:
            '0 0 24px rgba(229,57,53,0.95), 0 0 60px rgba(229,57,53,0.5)',
        }}
      />
    </div>
  )
}

/* ===================================================================
   StagePanel — single stage panel (rendered inside the horizontal track).
   Hooks at the top — receives no scroll-driven motion values (all static).
   Stage 01 Identity is the Aura/primary stage — visually emphasized.
   =================================================================== */
function StagePanel({ stage }: { stage: Stage }) {
  const { n, name, desc, quote, Icon, Visual, primary } = stage
  return (
    <div
      className="relative flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden px-5 sm:px-8"
      aria-label={`Stage ${n} — ${name}`}
    >
      {/* ambient glow per panel — intensified for the primary Aura stage */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: primary
            ? 'radial-gradient(circle, rgba(229,57,53,0.24), rgba(229,57,53,0) 65%)'
            : 'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0) 65%)',
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
              className="text-6xl font-bold text-[#E53935] sm:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {n}
            </span>
            <span className="h-px w-10 bg-[#E53935]/60" />
            <span className="wn-eyebrow text-[10px] font-medium text-white/45">
              Stage
            </span>
            {primary && (
              <span className="ml-2 rounded-full border border-[#E53935]/50 bg-[#E53935]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#ff6b63] wn-eyebrow">
                Aura Stage
              </span>
            )}
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
            <Icon className="h-4 w-4 shrink-0 text-[#E53935]" />
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
          <div
            className={`relative h-full w-full overflow-hidden rounded-3xl border bg-black/40 ${
              primary ? 'border-[#E53935]/40 wn-glow-ring' : 'border-white/10'
            }`}
          >
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
   The animated progression line at the bottom scales with scrollYProgress.
   =================================================================== */
export default function AuraProcess() {
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
  // CRITICAL (Task 11-fix lesson): use `vw` units (NOT `%`). The
  // motion.div is a block-level flex container whose computed width
  // matches its PARENT (the 100vw viewport), not its overflowing content.
  // With `%`, -80% would be interpreted relative to that 100vw parent
  // width = -80vw, only revealing ~1.2 panels. `vw` is unambiguously
  // viewport-relative and matches the `w-screen` panels exactly.
  const trackX = useTransform(scrollYProgress, [0, 1], ['0vw', '-400vw'])

  // active stage index (0..4) for the progress dots
  const activeStage = useTransform(scrollYProgress, [0, 1], [0, 4])

  // animated progression line — fills as you scroll
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      ref={outerRef}
      className="relative min-h-[400vh] border-t border-white/5 bg-[#050505]"
      aria-label="The Process — How We Think (5-stage framework)"
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
            How We <RedGradientText glow={false}>Think</RedGradientText>
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

        {/* Animated progression line (full-width red fill, syncs to scroll) */}
        <div className="relative z-20 mx-auto mb-3 w-full max-w-7xl px-5 sm:px-8">
          <div className="relative h-px w-full overflow-hidden bg-white/10">
            <motion.div
              style={{ scaleX: lineScaleX, transformOrigin: 'left' }}
              className="absolute inset-0 bg-gradient-to-r from-[#E53935] to-[#ff6b63]"
            />
          </div>
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
