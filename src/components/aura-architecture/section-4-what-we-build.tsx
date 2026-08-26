'use client'

/**
 * AuraWhatWeBuild — Section 4 of the /aura-architecture page.
 *
 * Premium Bento Grid of deliverables — each tile is its own visual world.
 *
 * Composition:
 *   - SectionEyebrow `(04) What We Build`
 *   - Headline: `What We Build` ("Build" red gradient)
 *   - Sub: `Create a memorable foundation for your business.` (verbatim from
 *     the story-section Brand Identity card)
 *   - Bento Grid — 6 deliverable tiles (asymmetric magazine grid):
 *       01 Brand Strategy   / `brand soul`                              (Fingerprint)
 *       02 Positioning      / `positioning`                             (Crosshair)
 *       03 Visual Identity  / `visual DNA`                              (Palette)
 *       04 Messaging        / `stands out with purpose and clarity`     (MessageSquare)
 *       05 Creative Direction / `Create a memorable foundation for your business.` (Compass)
 *       06 Brand Systems    / `a powerful identity`                     (Layers)
 *
 * Tile layout (asymmetric):
 *   - md:grid-cols-4
 *   - Tile 1 (Brand Strategy): col-span-2 row-span-2 (hero tile, accent)
 *   - Tiles 2-6 fill the remaining 2x2 + bottom strip in a mix of 1x1
 *     and 1x2 spans.
 *
 * Each tile:
 *   - glassmorphism border + bg + backdrop-blur
 *   - red number + lucide icon + deliverable name (font-display) +
 *     verbatim fragment desc
 *   - animated micro-visual inside (motion divs with gradient sweeps /
 *     pulsing rings / morphing shapes) — each unique
 *   - hover: tile scales 1.02, border tightens to red, red glow blooms,
 *     micro-visual animates more intensely, `Explore` + ArrowUpRight
 *     appears
 *   - data-cursor="View"
 */

import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Compass,
  Crosshair,
  Fingerprint,
  Layers,
  MessageSquare,
  Palette,
  type LucideIcon,
} from 'lucide-react'
import { SectionEyebrow, MaskLine, RedGradientText } from '@/components/about/shared'

/* ===================================================================
   Content — 6 deliverables. Descriptions are VERBATIM FRAGMENTS lifted
   directly from the Aura Architecture description.
   =================================================================== */
type Deliverable = {
  num: string
  name: string
  desc: string
  Icon: LucideIcon
  accent: boolean
  /** Bento layout spans (md+). */
  colSpan: string
  rowSpan: string
  /** Visual variant — drives which micro-visual renders inside the tile. */
  variant: 'soul' | 'positioning' | 'dna' | 'messaging' | 'direction' | 'systems'
}

const deliverables: Deliverable[] = [
  {
    num: '01',
    name: 'Brand Strategy',
    desc: 'brand soul',
    Icon: Fingerprint,
    accent: true,
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    variant: 'soul',
  },
  {
    num: '02',
    name: 'Positioning',
    desc: 'positioning',
    Icon: Crosshair,
    accent: false,
    colSpan: '',
    rowSpan: '',
    variant: 'positioning',
  },
  {
    num: '03',
    name: 'Visual Identity',
    desc: 'visual DNA',
    Icon: Palette,
    accent: false,
    colSpan: '',
    rowSpan: '',
    variant: 'dna',
  },
  {
    num: '04',
    name: 'Messaging',
    desc: 'stands out with purpose and clarity',
    Icon: MessageSquare,
    accent: false,
    colSpan: 'md:col-span-2',
    rowSpan: '',
    variant: 'messaging',
  },
  {
    num: '05',
    name: 'Creative Direction',
    desc: 'Create a memorable foundation for your business.',
    Icon: Compass,
    accent: true,
    colSpan: '',
    rowSpan: '',
    variant: 'direction',
  },
  {
    num: '06',
    name: 'Brand Systems',
    desc: 'a powerful identity',
    Icon: Layers,
    accent: false,
    colSpan: '',
    rowSpan: '',
    variant: 'systems',
  },
]

/* ===================================================================
   MicroVisual — animated illustration unique to each deliverable.
   Variant drives which mini-graphic renders.
   =================================================================== */
function MicroVisual({ variant }: { variant: Deliverable['variant'] }) {
  switch (variant) {
    case 'soul':
      // morphing identity mark + dashed orbit ring + red core
      return (
        <div className="relative h-full w-full" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.16), transparent 65%)',
            }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
            animate={{
              borderRadius: ['24%', '50%', '46%', '50%', '24%'],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            style={{
              border: '1px solid rgba(229,57,53,0.55)',
              background:
                'radial-gradient(circle, rgba(229,57,53,0.20), transparent 72%)',
            }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{ border: '1px dashed rgba(255,255,255,0.20)' }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              boxShadow:
                '0 0 18px rgba(229,57,53,0.95), 0 0 40px rgba(229,57,53,0.5)',
            }}
          />
        </div>
      )

    case 'positioning':
      // crosshair rings converging on a target
      return (
        <div className="relative h-full w-full" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.14), transparent 60%)',
            }}
          />
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E53935]/40"
              style={{ width: 32 + i * 28, height: 32 + i * 28 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
          {/* crosshair lines */}
          <div className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/2 -translate-y-1/2 bg-[#E53935]/30" />
          <div className="absolute left-1/2 top-1/2 h-24 w-px -translate-x-1/2 -translate-y-1/2 bg-[#E53935]/30" />
          {/* target dot */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 14px rgba(229,57,53,0.9)' }}
          />
        </div>
      )

    case 'dna':
      // palette swatches morphing
      return (
        <div className="relative h-full w-full" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 70%, rgba(229,57,53,0.12), transparent 60%)',
            }}
          />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-1.5">
            {[
              'from-[#ff6b63] to-[#E53935]',
              'from-[#E53935] to-[#a8201d]',
              'from-white to-white/40',
              'from-[#7a1414] to-[#050505]',
            ].map((g, i) => (
              <motion.div
                key={i}
                className={`h-12 w-6 rounded-md bg-gradient-to-b ${g}`}
                animate={{ scaleY: [0.7, 1, 0.7], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </div>
      )

    case 'messaging':
      // flowing message bubbles + connection lines
      return (
        <div className="relative h-full w-full" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 30% 50%, rgba(229,57,53,0.12), transparent 60%)',
            }}
          />
          <svg viewBox="0 0 100 40" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M5,${10 + i * 10} Q40,${4 + i * 10} 95,${10 + i * 10}`}
                fill="none"
                stroke={`rgba(229,57,53,${0.6 - i * 0.15})`}
                strokeWidth={0.5}
                animate={{ opacity: [0.3, 0.85, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            ))}
          </svg>
          {/* message bubbles */}
          {[
            { l: '8%', t: '20%' },
            { l: '70%', t: '50%' },
            { l: '30%', t: '70%' },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute h-4 w-7 rounded-md bg-[#E53935]/30 border border-[#E53935]/40"
              style={{ left: p.l, top: p.t }}
              animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      )

    case 'direction':
      // compass needle spinning + radial markers
      return (
        <div className="relative h-full w-full" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.14), transparent 60%)',
            }}
          />
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
          {/* radial markers */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
            const r = (deg * Math.PI) / 180
            const x = 50 + Math.cos(r) * 32
            const y = 50 + Math.sin(r) * 32
            return (
              <span
                key={i}
                className="absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
                style={{ left: `${x}%`, top: `${y}%` }}
              />
            )
          })}
          {/* compass needle */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-12 w-1 origin-bottom -translate-x-1/2 -translate-y-full"
            style={{
              background:
                'linear-gradient(to top, transparent, rgba(229,57,53,0.9))',
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 12px rgba(229,57,53,0.9)' }}
          />
        </div>
      )

    case 'systems':
      // layered cards stacking
      return (
        <div className="relative h-full w-full" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.12), transparent 60%)',
            }}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute h-12 w-16 rounded-md border border-[#E53935]/40 bg-[#E53935]/10"
                style={{
                  left: `${i * 8}px`,
                  top: `${i * 6}px`,
                }}
                animate={{ y: [0, -4, 0], opacity: [0.5, 0.85, 0.5] }}
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

    default:
      return null
  }
}

/* ===================================================================
   BentoTile — single bento grid tile.
   =================================================================== */
function BentoTile({ d, index }: { d: Deliverable; index: number }) {
  const { num, name, desc, Icon, accent, colSpan, rowSpan, variant } = d
  const isHero = colSpan.includes('col-span-2') && rowSpan.includes('row-span-2')

  return (
    <motion.article
      data-cursor="View"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.02 }}
      className={`group relative ${colSpan} ${rowSpan}`}
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 group-hover:border-[#E53935]/60 sm:p-6 ${
          isHero ? 'min-h-[420px] md:min-h-[520px]' : 'min-h-[240px]'
        }`}
      >
        {/* hover glow bloom */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(120% 120% at 50% 0%, rgba(229,57,53,0.18), transparent 60%)',
          }}
        />

        {/* Micro-visual — fills the upper area of the tile */}
        <div
          className={`relative w-full overflow-hidden rounded-xl border border-white/[0.06] bg-black/30 ${
            isHero ? 'mb-6 h-[60%]' : 'mb-5 h-32'
          }`}
        >
          <MicroVisual variant={variant} />
        </div>

        {/* number + icon */}
        <div className="relative z-10 mb-3 flex items-center justify-between">
          <span
            className={`text-2xl font-bold sm:text-3xl ${
              accent
                ? 'bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent'
                : 'text-white/30'
            }`}
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {num}
          </span>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300 ${
              accent
                ? 'border-[#E53935]/40 bg-[#E53935]/10 text-[#ff6b63]'
                : 'border-white/10 bg-white/[0.03] text-white/55 group-hover:border-white/30 group-hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
        </div>

        {/* name + desc */}
        <h3
          className={`relative z-10 font-semibold text-white ${
            isHero ? 'text-2xl sm:text-3xl' : 'text-base sm:text-lg'
          }`}
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {name}
        </h3>
        <p
          className={`relative z-10 mt-1.5 leading-relaxed text-white/55 ${
            isHero ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
          }`}
        >
          {desc}
        </p>

        {/* arrow on hover */}
        <div className="relative z-10 mt-auto flex items-center gap-1.5 pt-4 text-xs font-medium text-[#E53935] opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>Explore</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* bottom accent line */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-transparent transition-all duration-500 group-hover:w-full"
        />
      </div>
    </motion.article>
  )
}

/* ===================================================================
   AuraWhatWeBuild — Section 4 default export
   =================================================================== */
export default function AuraWhatWeBuild() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#050505]/70 px-5 py-24 backdrop-blur-sm sm:px-8 sm:py-32 lg:py-40"
      aria-label="What We Build — Aura Architecture deliverables"
    >
      {/* Local ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute right-[-10%] top-[-10%] h-[40vw] w-[40vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.20), rgba(229,57,53,0) 70%)',
            filter: 'blur(30px)',
          }}
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionEyebrow number="04" label="What We Build" />

        {/* Headline + sub */}
        <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2
            className="text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine>
              What We <RedGradientText glow={false}>Build</RedGradientText>
            </MaskLine>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg leading-relaxed text-white/60 sm:text-xl"
          >
            Create a memorable foundation for your business.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[220px]">
          {deliverables.map((d, i) => (
            <BentoTile key={d.num} d={d} index={i} />
          ))}
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 text-center text-xs text-white/35 sm:text-sm"
        >
          Six deliverables. One identity engine. Every output engineered as a
          product experience — not a line item.
        </motion.p>
      </div>
    </section>
  )
}
