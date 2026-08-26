'use client'

/**
 * AuraWhatWeBuild — Section 4
 * Premium Bento Grid — 6 deliverables, each its own visual world.
 *
 * Composition:
 *   - Eyebrow: (04) · What We Build
 *   - Headline: "What We Build" ("Build" red gradient)
 *   - Sub: "One studio. seven services. Zero excuse to blend in."
 *     (verbatim; "Zero excuse to blend in." in white/55)
 *
 * Bento Grid layout (md+):
 *   Row 1: [Brand Strategy col-span-2] [Positioning] [Visual Identity]
 *   Row 2: [Messaging] [Creative Direction] [Brand Systems col-span-2]
 *
 * Each tile:
 *   - glassmorphism (border border-white/10 bg-white/[0.035] backdrop-blur-xl
 *     rounded-2xl p-6)
 *   - hover lifts (y: -8 spring) + border tightens to red + red glow bloom
 *   - animated micro-visual inside (motion divs)
 *   - title (font-display, text-xl md:text-2xl font-semibold)
 *   - descriptor (text-sm text-white/55)
 *   - number 01–06 (red, font-display, text-xs)
 *   - hover expansion: scale up, micro-visual animates more, Explore + ↗
 *   - staggered reveal (whileInView, delay index*0.08)
 */

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
} from '@/components/about/shared'

/* ===================================================================
   Content — 6 deliverables (premium descriptors, brand voice).
   =================================================================== */
type Deliverable = {
  n: string
  title: string
  desc: string
  span: 1 | 2 // bento col-span on md+
  accent: boolean
  Visual: () => JSX.Element
}

const deliverables: Deliverable[] = [
  {
    n: '01',
    title: 'Brand Strategy',
    desc: 'The foundation that makes every decision intentional.',
    span: 2,
    accent: true,
    Visual: BrandStrategyVisual,
  },
  {
    n: '02',
    title: 'Positioning',
    desc: 'Where you stand, and why it matters.',
    span: 1,
    accent: false,
    Visual: PositioningVisual,
  },
  {
    n: '03',
    title: 'Visual Identity',
    desc: 'Logo, type, color, and the system around them.',
    span: 1,
    accent: false,
    Visual: VisualIdentityVisual,
  },
  {
    n: '04',
    title: 'Messaging',
    desc: 'The words that make you impossible to ignore.',
    span: 1,
    accent: false,
    Visual: MessagingVisual,
  },
  {
    n: '05',
    title: 'Creative Direction',
    desc: 'The north star for every creative choice.',
    span: 1,
    accent: false,
    Visual: CreativeDirectionVisual,
  },
  {
    n: '06',
    title: 'Brand Systems',
    desc: 'Guidelines that keep your aura consistent at scale.',
    span: 2,
    accent: true,
    Visual: BrandSystemsVisual,
  },
]

/* ===================================================================
   Micro-visuals — one per deliverable (self-contained motion graphics).
   =================================================================== */

/* 01 Brand Strategy — layered foundation blocks stacking. */
function BrandStrategyVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-end justify-center pb-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-sm"
            style={{
              width: `${70 - i * 14}%`,
              height: `${22 + i * 14}%`,
              bottom: `${i * 14}%`,
              background:
                i === 3
                  ? 'linear-gradient(to top, rgba(229,57,53,0.65), rgba(255,107,99,0.3))'
                  : `rgba(255,255,255,${0.06 + i * 0.03})`,
              border: '1px solid rgba(229,57,53,0.18)',
            }}
            animate={{ y: [0, -4, 0], opacity: [0.85, 1, 0.85] }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* 02 Positioning — a mark on a grid/map. */
function PositioningVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {/* grid */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            x2="100"
            y1={(i + 1) * 14}
            y2={(i + 1) * 14}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={0.4}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`v-${i}`}
            y1="0"
            y2="100"
            x1={(i + 1) * 14}
            x2={(i + 1) * 14}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={0.4}
          />
        ))}
        {/* position marker */}
        <motion.circle
          cx="50"
          cy="50"
          r="3"
          fill="rgba(229,57,53,0.95)"
          animate={{ r: [3, 5, 3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(229,57,53,0.9))' }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          fill="none"
          stroke="rgba(229,57,53,0.5)"
          strokeWidth={0.5}
          animate={{ r: [6, 14, 6], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      </svg>
    </div>
  )
}

/* 03 Visual Identity — logo morphing through variations. */
function VisualIdentityVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-14 w-14"
          animate={{
            borderRadius: ['24%', '50%', '8px', '46%', '24%'],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.6), rgba(229,57,53,0.1) 70%)',
            border: '1px solid rgba(229,57,53,0.5)',
          }}
        />
      </div>
      {/* variation dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-white/40"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* 04 Messaging — text lines typing/revealing. */
function MessagingVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex flex-col justify-center gap-2 px-3">
        {[60, 80, 45, 70].map((w, i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-full"
            style={{
              width: `${w}%`,
              background:
                i === 1
                  ? 'linear-gradient(to right, rgba(229,57,53,0.7), rgba(229,57,53,0.1))'
                  : 'rgba(255,255,255,0.12)',
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* 05 Creative Direction — a compass / north star. */
function CreativeDirectionVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.svg
          viewBox="0 0 100 100"
          className="h-20 w-20"
          animate={{ rotate: [0, 12, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.8"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="rgba(229,57,53,0.35)"
            strokeWidth="0.5"
            strokeDasharray="2 3"
          />
          {/* compass needle */}
          <polygon
            points="50,18 54,50 50,82 46,50"
            fill="rgba(229,57,53,0.95)"
            style={{ filter: 'drop-shadow(0 0 3px rgba(229,57,53,0.8))' }}
          />
          <circle cx="50" cy="50" r="2.5" fill="#fff" />
        </motion.svg>
      </div>
    </div>
  )
}

/* 06 Brand Systems — connected grid of tokens. */
function BrandSystemsVisual() {
  // 3x2 grid of tokens connected by lines
  const tokens = [
    { x: 18, y: 30 },
    { x: 50, y: 22 },
    { x: 82, y: 30 },
    { x: 18, y: 70 },
    { x: 50, y: 78 },
    { x: 82, y: 70 },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {/* connections */}
        <g stroke="rgba(229,57,53,0.35)" strokeWidth="0.4">
          <line x1="18" y1="30" x2="50" y2="22" />
          <line x1="50" y1="22" x2="82" y2="30" />
          <line x1="18" y1="30" x2="18" y2="70" />
          <line x1="82" y1="30" x2="82" y2="70" />
          <line x1="18" y1="70" x2="50" y2="78" />
          <line x1="50" y1="78" x2="82" y2="70" />
          <line x1="18" y1="30" x2="50" y2="78" />
          <line x1="82" y1="30" x2="50" y2="22" />
        </g>
        {/* tokens */}
        {tokens.map((t, i) => (
          <motion.circle
            key={i}
            cx={t.x}
            cy={t.y}
            r="2.4"
            fill="rgba(229,57,53,0.9)"
            animate={{ r: [2.4, 3.2, 2.4], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
            style={{ filter: 'drop-shadow(0 0 2px rgba(229,57,53,0.7))' }}
          />
        ))}
      </svg>
    </div>
  )
}

/* ===================================================================
   BentoTile — single deliverable tile (glassmorphism + hover effects).
   Hooks at the top — receives no scroll-driven motion values.
   =================================================================== */
function BentoTile({ d, index }: { d: Deliverable; index: number }) {
  const { n, title, desc, span, accent, Visual } = d
  return (
    <motion.article
      data-cursor="View"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-2xl border bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[#E53935]/55 hover:bg-white/[0.07] sm:p-6 ${
        span === 2 ? 'md:col-span-2' : ''
      } ${accent ? 'border-[#E53935]/25' : 'border-white/10'}`}
    >
      {/* hover glow bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: accent
            ? 'radial-gradient(120% 120% at 100% 0%, rgba(229,57,53,0.22), transparent 60%)'
            : 'radial-gradient(120% 120% at 100% 0%, rgba(229,57,53,0.14), transparent 60%)',
        }}
      />
      {/* red glow ring on hover (accent only) */}
      {accent && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 shadow-[0_0_30px_rgba(229,57,53,0.3)] transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      {/* number + Explore row */}
      <div className="relative z-10 mb-3 flex items-start justify-between">
        <span
          className={`text-xs font-bold ${
            accent
              ? 'bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent'
              : 'text-[#E53935]'
          }`}
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {n}
        </span>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#E53935] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Explore
          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {/* grid: visual + content */}
      <div
        className={`relative z-10 grid gap-4 ${
          span === 2
            ? 'grid-cols-1 sm:grid-cols-[1fr_180px]'
            : 'grid-cols-1'
        }`}
      >
        {/* content */}
        <div className="flex flex-col">
          <h3
            className="text-xl font-semibold text-white md:text-2xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            {desc}
          </p>
        </div>

        {/* micro-visual */}
        <div
          className={`relative overflow-hidden rounded-lg border border-white/10 bg-[#1A1A1A]/75 ${
            span === 2 ? 'h-32 sm:h-auto' : 'h-28'
          }`}
        >
          <Visual />
        </div>
      </div>

      {/* bottom accent line */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-transparent transition-all duration-500 group-hover:w-full"
      />
    </motion.article>
  )
}

/* ===================================================================
   AuraWhatWeBuild — Section 4 default export
   =================================================================== */
export function AuraWhatWeBuild() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#141414] px-5 py-24 sm:px-8 sm:py-32 lg:py-40"
      aria-label="What We Build"
    >
      {/* Local ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.18), rgba(229,57,53,0) 65%)',
            filter: 'blur(30px)',
          }}
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionEyebrow number="04" label="What We Build" />

        {/* Massive headline */}
        <h2
          className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            What We <RedGradientText>Build</RedGradientText>
          </MaskLine>
        </h2>

        {/* Sub — verbatim */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          One studio. seven services.{' '}
          <span className="text-white/55">Zero excuse to blend in.</span>
        </motion.p>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
          {deliverables.map((d, i) => (
            <BentoTile key={d.n} d={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
