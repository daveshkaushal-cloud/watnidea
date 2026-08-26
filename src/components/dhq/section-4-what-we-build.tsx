'use client'

/**
 * DhqWhatWeBuild — Section 4
 * Premium Bento Grid — 7 deliverables, each its own visual world.
 *
 * Composition:
 *   - Eyebrow: (04) · What We Build
 *   - Headline: "What We Build" ("Build" red gradient)
 *   - Sub (verbatim): "One studio. seven services. Zero excuse to
 *     blend in." ("Zero excuse to blend in." in white/55)
 *
 * Bento Grid layout (md+): grid-cols-3
 *   Row 1: [Landing Pages col-span-2] [Corporate Websites]
 *   Row 2: [Personal Brands] [Portfolio Websites] [E-Commerce Stores]
 *   Row 3: [Lead Generation Funnels] [Custom Web Experiences col-span-2]
 *
 * Each tile:
 *   - glassmorphism (border border-white/10 bg-white/[0.035]
 *     backdrop-blur-xl rounded-2xl p-6)
 *   - hover lifts (y: -8 spring) + border tightens to red + red glow
 *     bloom
 *   - animated micro-visual inside (motion divs)
 *   - title (font-display, text-xl md:text-2xl font-semibold)
 *   - descriptor (text-sm text-white/55)
 *   - number 01–07 (red, font-display, text-xs)
 *   - hover expansion: scale up, micro-visual animates more, Explore
 *     + ↗ fades in
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
   Content — 7 deliverables (premium descriptors, brand voice, verbatim).
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
    title: 'Landing Pages',
    desc: 'Single-page conversion machines. Every scroll engineered to sell.',
    span: 2,
    accent: true,
    Visual: LandingPagesVisual,
  },
  {
    n: '02',
    title: 'Corporate Websites',
    desc: 'The digital HQ for your entire organization.',
    span: 1,
    accent: false,
    Visual: CorporateWebsitesVisual,
  },
  {
    n: '03',
    title: 'Personal Brands',
    desc: 'Your reputation, built into a destination.',
    span: 1,
    accent: false,
    Visual: PersonalBrandsVisual,
  },
  {
    n: '04',
    title: 'Portfolio Websites',
    desc: 'Your work, showcased like it deserves.',
    span: 1,
    accent: false,
    Visual: PortfolioVisual,
  },
  {
    n: '05',
    title: 'E-Commerce Stores',
    desc: 'Catalogs engineered for cart adds and repeat buyers.',
    span: 1,
    accent: false,
    Visual: EcommerceVisual,
  },
  {
    n: '06',
    title: 'Lead Generation Funnels',
    desc: 'Traffic in. Qualified leads out.',
    span: 1,
    accent: false,
    Visual: LeadGenVisual,
  },
  {
    n: '07',
    title: 'Custom Web Experiences',
    desc: "When the template isn't enough. We build the category.",
    span: 2,
    accent: true,
    Visual: CustomWebVisual,
  },
]

/* ===================================================================
   Micro-visuals — one per deliverable (self-contained motion graphics).
   =================================================================== */

/* 01 Landing Pages — scrolling browser frame with animated content. */
function LandingPagesVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[80%] overflow-hidden rounded-md border border-white/10 bg-[#1A1A1A]/80">
          {/* browser chrome */}
          <div className="flex items-center gap-1 border-b border-white/10 px-2 py-1">
            <span className="h-1 w-1 rounded-full bg-[#E53935]/70" />
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="h-1 w-1 rounded-full bg-white/30" />
          </div>
          {/* scrolling content strip */}
          <div className="relative h-20 overflow-hidden">
            <motion.div
              className="absolute inset-x-2 space-y-1.5"
              animate={{ y: [0, -38, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1">
                  <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
                  <div
                    className="h-1.5 w-1/2 rounded-full"
                    style={{
                      background:
                        i % 2 === 0
                          ? 'rgba(229,57,53,0.6)'
                          : 'rgba(255,255,255,0.12)',
                    }}
                  />
                  <div className="h-4 w-full rounded-sm bg-white/5" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      {/* conversion arrow */}
      <motion.div
        className="absolute right-3 top-3"
        animate={{ y: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowUpRight className="h-4 w-4 text-[#ff6b63]" />
      </motion.div>
    </div>
  )
}

/* 02 Corporate Websites — multi-section sitemap / org structure. */
function CorporateWebsitesVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {/* root node */}
        <motion.circle
          cx="50"
          cy="20"
          r="3"
          fill="rgba(229,57,53,0.95)"
          animate={{ r: [3, 4, 3], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 3px rgba(229,57,53,0.8))' }}
        />
        {/* connector lines */}
        <g stroke="rgba(255,255,255,0.18)" strokeWidth="0.4">
          <line x1="50" y1="20" x2="22" y2="55" />
          <line x1="50" y1="20" x2="50" y2="55" />
          <line x1="50" y1="20" x2="78" y2="55" />
          <line x1="22" y1="55" x2="22" y2="82" />
          <line x1="50" y1="55" x2="50" y2="82" />
          <line x1="78" y1="55" x2="78" y2="82" />
        </g>
        {/* sub nodes */}
        {[
          { x: 22, y: 55, d: 0 },
          { x: 50, y: 55, d: 0.4 },
          { x: 78, y: 55, d: 0.8 },
          { x: 22, y: 82, d: 1.2 },
          { x: 50, y: 82, d: 1.6 },
          { x: 78, y: 82, d: 2.0 },
        ].map((n, i) => (
          <motion.rect
            key={i}
            x={n.x - 4}
            y={n.y - 2.5}
            width="8"
            height="5"
            rx="1"
            fill="rgba(255,255,255,0.12)"
            stroke="rgba(229,57,53,0.35)"
            strokeWidth="0.3"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: n.d,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

/* 03 Personal Brands — single portrait/initial in a glowing frame. */
function PersonalBrandsVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E53935]/55 bg-[#E53935]/10 backdrop-blur-md"
          animate={{ scale: [1, 1.08, 1], boxShadow: [
            '0 0 18px rgba(229,57,53,0.55), 0 0 36px rgba(229,57,53,0.25)',
            '0 0 26px rgba(229,57,53,0.85), 0 0 50px rgba(229,57,53,0.4)',
            '0 0 18px rgba(229,57,53,0.55), 0 0 36px rgba(229,57,53,0.25)',
          ] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            className="text-lg font-bold text-white"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            W
          </span>
        </motion.div>
      </div>
      {/* orbiting dots */}
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-[#ff6b63]"
          style={{ transformOrigin: '0 0' }}
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  )
}

/* 04 Portfolio Websites — grid of work tiles. */
function PortfolioVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 grid grid-cols-2 gap-1.5 p-3">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="rounded-sm border border-white/10"
            style={{
              background:
                i === 0
                  ? 'linear-gradient(135deg, rgba(229,57,53,0.45), rgba(229,57,53,0.1))'
                  : 'rgba(255,255,255,0.06)',
            }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.04, 1] }}
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

/* 05 E-Commerce Stores — product grid + cart add. */
function EcommerceVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 grid grid-cols-3 gap-1.5 p-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="relative rounded-sm border border-white/10 bg-white/5"
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          >
            <div
              className="h-2/3 rounded-t-sm"
              style={{
                background:
                  i === 2
                    ? 'rgba(229,57,53,0.5)'
                    : 'rgba(255,255,255,0.04)',
              }}
            />
            <div className="space-y-0.5 p-1">
              <div className="h-0.5 w-3/4 rounded-full bg-white/15" />
              <div className="h-0.5 w-1/2 rounded-full bg-[#E53935]/45" />
            </div>
            {/* cart-add indicator on hovered product */}
            {i === 2 && (
              <motion.div
                className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#E53935]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* 06 Lead Generation Funnels — funnel narrowing with traffic in, lead out. */
function LeadGenVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {/* funnel layers */}
        <motion.path
          d="M 20 20 L 80 20 L 65 50 L 35 50 Z"
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(229,57,53,0.45)"
          strokeWidth="0.4"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 35 50 L 65 50 L 58 75 L 42 75 Z"
          fill="rgba(229,57,53,0.25)"
          stroke="rgba(229,57,53,0.65)"
          strokeWidth="0.4"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <motion.path
          d="M 42 75 L 58 75 L 50 92 Z"
          fill="rgba(229,57,53,0.6)"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          style={{ filter: 'drop-shadow(0 0 3px rgba(229,57,53,0.6))' }}
        />
        {/* traffic input dots */}
        {[
          { x: 25, y: 14, d: 0 },
          { x: 50, y: 12, d: 0.5 },
          { x: 75, y: 14, d: 1.0 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1.5"
            fill="rgba(255,107,99,0.9)"
            animate={{ opacity: [0.4, 1, 0.4], cy: [p.y, p.y + 3, p.y] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.d,
            }}
          />
        ))}
        {/* lead output dot */}
        <motion.circle
          cx="50"
          cy="92"
          r="2"
          fill="rgba(255,255,255,0.95)"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' }}
        />
      </svg>
    </div>
  )
}

/* 07 Custom Web Experiences — abstract 3D depth / category-defining motif. */
function CustomWebVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* nested rotating rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${50 - i * 14}px`,
              height: `${50 - i * 14}px`,
              borderColor:
                i === 1
                  ? 'rgba(229,57,53,0.6)'
                  : 'rgba(255,255,255,0.18)',
              borderWidth: '1px',
              borderStyle: i === 1 ? 'dashed' : 'solid',
            }}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
        {/* core */}
        <motion.div
          className="h-3 w-3 rounded-full bg-[#ff6b63]"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            boxShadow: '0 0 10px rgba(229,57,53,0.9), 0 0 24px rgba(229,57,53,0.5)',
          }}
        />
      </div>
      {/* corner glyphs */}
      <div className="absolute left-2 top-2 h-1 w-1 rounded-full bg-white/30" />
      <div className="absolute right-2 top-2 h-1 w-1 rounded-full bg-white/30" />
      <div className="absolute bottom-2 left-2 h-1 w-1 rounded-full bg-white/30" />
      <div className="absolute bottom-2 right-2 h-1 w-1 rounded-full bg-white/30" />
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
   DhqWhatWeBuild — Section 4 named export
   =================================================================== */
export function DhqWhatWeBuild() {
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

        {/* Bento grid (md:grid-cols-3 so 7 tiles + 2 spans fit cleanly:
            Row 1: [01 span-2][02]
            Row 2: [03][04][05]
            Row 3: [06][07 span-2] */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {deliverables.map((d, i) => (
            <BentoTile key={d.n} d={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
