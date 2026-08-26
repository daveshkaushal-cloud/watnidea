'use client'

/**
 * AuraCaseStudies — Section 6
 * Premium placeholder portfolio showcase — STYLIZED, clearly placeholders.
 *
 * Composition:
 *   - Eyebrow: (06) · Case Studies
 *   - Headline: "Selected Work" ("Work" red gradient) — font-display
 *   - Sub: "Built for Brands That Refuse to Blend In." ("Refuse" red)
 *   - 4 immersive glassmorphism cards (md+ 2-col staggered, mobile stacked)
 *
 * Each card:
 *   - `rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl`
 *     with `min-h-[460px]` + aspect-square visual area at top.
 *   - Stylized "brand transformation" visual — abstract identity mark
 *     morphing, brand color palette swatch row, logo lockup placeholder,
 *     before/after abstract treatment (grey muted → vibrant red glowing).
 *   - Project name (premium placeholder — clearly not real client claims):
 *       Project Helios · Nova Labs · Atlas Studio · Ember Co.
 *   - Category tag (e.g. "Brand Identity · Visual System").
 *   - Video preview feel: ▶ Play overlay on hover + persistent REC indicator
 *     + scan-line + film-grain effect for cinematic motion feel.
 *   - Hover zoom (scale 1.05) on visual + border tightens to red + red glow
 *     bloom + `View Case` label with ArrowUpRight appears.
 *   - Stagger reveal: whileInView, delay index*0.12.
 *   - `data-cursor="View"` on each card.
 *
 * Sticky rail (lg+): label `Case Studies`, caption `Selected`.
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from '@/components/about/shared'

/* ===================================================================
   Content — 4 premium placeholder case studies.
   These are clearly placeholder project names, NOT real client claims.
   =================================================================== */
type CaseStudy = {
  n: string
  name: string
  category: string
  descriptor: string
  Visual: () => JSX.Element
  swatches: string[]
}

const caseStudies: CaseStudy[] = [
  {
    n: '01',
    name: 'Project Helios',
    category: 'Brand Identity · Visual System',
    descriptor:
      'A sun-locked identity system engineered to glow across every touchpoint.',
    Visual: HeliosVisual,
    swatches: ['#E53935', '#ff6b63', '#141414', '#ffffff', '#a8201d'],
  },
  {
    n: '02',
    name: 'Nova Labs',
    category: 'Rebrand · Positioning',
    descriptor:
      'A scattered constellation reorganized into a single, navigable north star.',
    Visual: NovaVisual,
    swatches: ['#ff6b63', '#E53935', '#7a1414', '#141414', '#ffffff'],
  },
  {
    n: '03',
    name: 'Atlas Studio',
    category: 'Identity · Launch',
    descriptor:
      'A geometric mark rebuilt from first principles — and launched loud.',
    Visual: AtlasVisual,
    swatches: ['#E53935', '#ffffff', '#a8201d', '#141414', '#ff6b63'],
  },
  {
    n: '04',
    name: 'Ember Co.',
    category: 'Brand Identity · Visual System',
    descriptor:
      'A muted wordmark stoked into a slow-burning red signal that holds.',
    Visual: EmberVisual,
    swatches: ['#a8201d', '#E53935', '#ff6b63', '#141414', '#ffffff'],
  },
]

/* ===================================================================
   Card visuals — one per case study (self-contained motion graphics).
   Each shows a "transformation" theme: muted/grey base elements that
   bloom to vibrant red on group-hover.
   =================================================================== */

/* 01 Helios — sun/orbit motif, before/after concentric mark. */
function HeliosVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.16), transparent 65%)',
        }}
      />
      {/* orbit rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 transition-colors duration-500 group-hover:border-[#E53935]/40"
          style={{ width: 80 + i * 50, height: 80 + i * 50 }}
        />
      ))}
      {/* central sun mark — grey → red on hover */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 64,
          height: 64,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.18), rgba(255,255,255,0.04) 70%)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          width: 64,
          height: 64,
          filter: 'drop-shadow(0 0 24px rgba(229,57,53,0.85))',
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* orbiting dots */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        <span
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#E53935]"
          style={{ boxShadow: '0 0 8px rgba(229,57,53,0.9)' }}
        />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/60 transition-colors duration-500 group-hover:bg-[#ff6b63]" />
      </motion.div>
    </div>
  )
}

/* 02 Nova — constellation, scattered dots → organized. */
function NovaVisual() {
  const points = [
    { x: 22, y: 30 },
    { x: 78, y: 26 },
    { x: 50, y: 18 },
    { x: 30, y: 70 },
    { x: 72, y: 72 },
    { x: 50, y: 50 },
  ]
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
        {/* connections — faint grey → red on hover */}
        <g
          className="transition-all duration-500"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.4"
        >
          <line x1="22" y1="30" x2="50" y2="18" className="group-hover:stroke-[#E53935]/60" />
          <line x1="50" y1="18" x2="78" y2="26" className="group-hover:stroke-[#E53935]/60" />
          <line x1="22" y1="30" x2="50" y2="50" className="group-hover:stroke-[#E53935]/60" />
          <line x1="78" y1="26" x2="50" y2="50" className="group-hover:stroke-[#E53935]/60" />
          <line x1="30" y1="70" x2="50" y2="50" className="group-hover:stroke-[#E53935]/60" />
          <line x1="72" y1="72" x2="50" y2="50" className="group-hover:stroke-[#E53935]/60" />
          <line x1="30" y1="70" x2="72" y2="72" className="group-hover:stroke-[#E53935]/60" />
        </g>
        {/* dots */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === 5 ? 2.2 : 1.6}
            fill="rgba(255,255,255,0.5)"
            className="transition-all duration-500 group-hover:fill-[#E53935]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
            style={
              i === 5
                ? { filter: 'drop-shadow(0 0 4px rgba(229,57,53,0.85))' }
                : undefined
            }
          />
        ))}
      </svg>
      {/* halo around the central node */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.4), transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* 03 Atlas — geometric mark, exploded cube assembling. */
function AtlasVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.16), transparent 65%)',
        }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* grey base square — fades on hover */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/20"
          style={{ background: 'rgba(255,255,255,0.04)' }}
          animate={{ rotate: [0, 90, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* red geometric mark — appears on hover */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <polygon
            points="50,12 88,32 88,68 50,88 12,68 12,32"
            fill="none"
            stroke="rgba(229,57,53,0.85)"
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 6px rgba(229,57,53,0.7))' }}
          />
          <polygon
            points="50,28 72,40 72,60 50,72 28,60 28,40"
            fill="rgba(229,57,53,0.35)"
            stroke="rgba(255,107,99,0.9)"
            strokeWidth="1"
          />
          <circle cx="50" cy="50" r="3" fill="#ff6b63" />
        </motion.svg>
      </div>
      {/* baseline grid for the "drafting" feel */}
      <div className="absolute bottom-3 left-3 right-3 flex justify-between">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="h-1 w-1 rounded-full bg-white/25 transition-colors duration-500 group-hover:bg-[#E53935]/60"
          />
        ))}
      </div>
    </div>
  )
}

/* 04 Ember — flame/ember mark, muted → glowing. */
function EmberVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 60%, rgba(229,57,53,0.2), transparent 60%)',
        }}
      />
      {/* muted base flame */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-500 group-hover:opacity-0"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 40 56" className="h-16 w-12">
          <path
            d="M20 4 C 12 18, 8 26, 8 36 C 8 46, 14 52, 20 52 C 26 52, 32 46, 32 36 C 32 26, 28 18, 20 4 Z"
            fill="rgba(255,255,255,0.18)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.8"
          />
        </svg>
      </motion.div>
      {/* vibrant red flame — appears on hover */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        animate={{ y: [0, -6, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 40 56" className="h-20 w-14">
          <path
            d="M20 4 C 12 18, 8 26, 8 36 C 8 46, 14 52, 20 52 C 26 52, 32 46, 32 36 C 32 26, 28 18, 20 4 Z"
            fill="url(#emberGrad)"
            stroke="rgba(255,107,99,0.95)"
            strokeWidth="0.8"
            style={{ filter: 'drop-shadow(0 0 10px rgba(229,57,53,0.85))' }}
          />
          <defs>
            <linearGradient id="emberGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6b63" />
              <stop offset="60%" stopColor="#E53935" />
              <stop offset="100%" stopColor="#a8201d" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      {/* rising sparks */}
      {[
        { l: '32%', t: '60%', d: 0 },
        { l: '50%', t: '70%', d: 0.4 },
        { l: '68%', t: '62%', d: 0.8 },
      ].map((s, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#ff6b63]"
          style={{ left: s.l, top: s.t }}
          animate={{ y: [0, -28, -56], opacity: [0, 1, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: s.d,
          }}
        />
      ))}
    </div>
  )
}

/* ===================================================================
   CaseStudyCard — single immersive glassmorphism card.
   Hooks at the top — no scroll-driven motion values per item.
   =================================================================== */
function CaseStudyCard({ c, index }: { c: CaseStudy; index: number }) {
  const { n, name, category, descriptor, Visual, swatches } = c
  return (
    <motion.article
      data-cursor="View"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl transition-colors duration-500 hover:border-[#E53935]/55"
    >
      {/* red glow bloom on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 shadow-[0_0_50px_rgba(229,57,53,0.25)] transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* === Visual layer === */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/8">
        {/* dark base */}
        <div className="absolute inset-0 bg-[#1A1A1A]/80" />

        {/* the visual itself — zooms on hover */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Visual />
        </motion.div>

        {/* scan-line cinematic overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
          }}
        />
        {/* film-grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0, transparent 1.2px), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.5) 0, transparent 1px), radial-gradient(circle at 40% 70%, rgba(255,255,255,0.4) 0, transparent 1px), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.5) 0, transparent 1px)',
            backgroundSize: '60px 60px, 90px 90px, 70px 70px, 80px 80px',
          }}
        />

        {/* REC indicator (top-left, always-on subtle, intensifies on hover) */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#E53935]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 6px rgba(229,57,53,0.85)' }}
          />
          <span className="wn-eyebrow text-[9px] font-medium text-white/55 transition-colors duration-300 group-hover:text-white/85">
            REC
          </span>
        </div>

        {/* ▶ Play overlay (top-right, appears on hover) */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-[#1A1A1A]/80 px-2.5 py-1 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
          <Play className="h-3 w-3 fill-[#E53935] text-[#E53935]" />
          <span className="wn-eyebrow text-[9px] font-medium text-white/85">
            PREVIEW
          </span>
        </div>

        {/* corner number badge */}
        <span
          className="absolute bottom-4 left-4 text-xs font-bold text-white/30"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          ({n})
        </span>

        {/* color palette swatch row (bottom-right, appears on hover) */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {swatches.map((sw, i) => (
            <span
              key={i}
              className="h-3 w-3 rounded-full ring-1 ring-white/20"
              style={{ background: sw }}
            />
          ))}
        </div>

        {/* bottom gradient fade into the content */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent"
        />
      </div>

      {/* === Content layer === */}
      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        {/* category tag */}
        <span className="wn-eyebrow text-[11px] font-medium text-[#E53935]">
          {category}
        </span>

        {/* project name */}
        <h3
          className="mt-3 text-2xl font-semibold text-white sm:text-3xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {name}
        </h3>

        {/* descriptor */}
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          {descriptor}
        </p>

        {/* View Case row */}
        <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Case Study
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#E53935] opacity-70 transition-opacity duration-300 group-hover:opacity-100">
            View Case
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ===================================================================
   AuraCaseStudies — Section 6 default export.
   Sticky rail + 2-col staggered grid of 4 premium placeholder cards.
   =================================================================== */
export function AuraCaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <StickyRail
          label="Case Studies"
          caption="Selected"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/3 h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0) 65%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Header block */}
          <motion.div style={{ y: headerY }} className="relative z-10 mb-14 max-w-3xl">
            <SectionEyebrow number="06" label="Case Studies" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>
                Selected <RedGradientText>Work</RedGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Built for Brands That{' '}
              <RedGradientText glow={false}>Refuse</RedGradientText> to Blend In.
            </motion.p>

            {/* placeholder disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-4 text-[11px] uppercase tracking-[0.3em] text-white/30"
            >
              Stylized case studies · representative engagements
            </motion.p>
          </motion.div>

          {/* Staggered grid of 4 cards (md+ 2-col with offset on col 2) */}
          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
            {caseStudies.map((c, i) => (
              <div
                key={c.n}
                className={
                  // staggered offset on md+ (even-indexed cards translate down)
                  i % 2 === 1 ? 'md:mt-16' : ''
                }
              >
                <CaseStudyCard c={c} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
