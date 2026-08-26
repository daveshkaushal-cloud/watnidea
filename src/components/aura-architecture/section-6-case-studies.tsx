'use client'

/**
 * AuraCaseStudies — Section 6 of the /aura-architecture page.
 *
 * Premium placeholder case-study showcase. No real case studies exist on the
 * site yet, so this section presents THREE archetypal brand transformations
 * (NOT real client names) using the verbatim deliverable labels from
 * Section 4 (Brand Strategy · Visual Identity · Positioning · Creative
 * Direction · Brand Systems · Messaging) and clearly illustrative metrics.
 *
 * Composition:
 *   - StickyRail (lg+): label `Case Studies`, caption `Work`
 *   - SectionEyebrow `(06) Case Studies`
 *   - 3-line headline: `Built for Brands` / `That Refuse to` / `Blend In.`
 *     ("Refuse" red gradient — verbatim from about/section-6-modern-brand)
 *   - Sub: `One studio. seven services. Zero excuse to blend in.`
 *     ("Zero excuse to blend in." white/55)
 *   - 3 large immersive cards (premium placeholders):
 *       1. Identity Rebuild / The Category Underdog
 *       2. Launch Identity / The New Entrant
 *       3. Brand System / The Scaling Challenger
 *     Each card: aspect-video visual top + content bottom (eyebrow + title +
 *     desc + metric in red gradient + tag), pulsing red play-button overlay
 *     (implies video preview feel), hover zoom (1.02) + border tightens to
 *     red + red glow bloom + "View Case" + ArrowUpRight appears.
 *   - data-cursor="View" on each card
 *
 * All hooks (useScroll/useTransform) declared unconditionally at the top of
 * the section. Per-card hover state + per-card motion values are extracted
 * into the CaseCard sub-component (Rules of Hooks).
 */

import { useRef, useState, type ReactElement } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from '@/components/about/shared'

/* ===================================================================
   Content — 3 archetypal brand transformation case studies.
   Descriptions are minimal archetypal placeholders using the verbatim
   deliverable labels from Section 4. Metrics are clearly illustrative
   (stylized as decorative, not claimed as real results).
   =================================================================== */
type CaseStudy = {
  num: string
  eyebrow: string
  title: string
  desc: string
  metric: string
  tag: string
  /** Which animated identity visual to render on the card top. */
  variant: 'rebuild' | 'launch' | 'system'
}

const studies: CaseStudy[] = [
  {
    num: '01',
    eyebrow: 'Identity Rebuild',
    title: 'The Category Underdog',
    desc: 'Repositioning a forgotten player into the brand everyone quotes.',
    metric: '+312% brand recall',
    tag: 'Brand Strategy · Visual Identity',
    variant: 'rebuild',
  },
  {
    num: '02',
    eyebrow: 'Launch Identity',
    title: 'The New Entrant',
    desc: 'Engineering a launch identity that turned a debut into a movement.',
    metric: '0 → 40K community in 90 days',
    tag: 'Positioning · Creative Direction',
    variant: 'launch',
  },
  {
    num: '03',
    eyebrow: 'Brand System',
    title: 'The Scaling Challenger',
    desc: 'A living brand system that held together across 7 markets.',
    metric: '7 markets, one identity',
    tag: 'Brand Systems · Messaging',
    variant: 'system',
  },
]

/* ===================================================================
   CaseVisual — animated identity visual unique to each case archetype.
   Each is a self-contained motion graphic that intensifies on hover.
   =================================================================== */

/* 01 Identity Rebuild — a scattered grey mark resolves into a glowing red
 * identity mark. As hover intensifies, fragments converge + the core blooms. */
function RebuildVisual() {
  // 6 scattered fragment dots positioned around a center mark.
  const fragments = [
    { x: -38, y: -22, d: 0 },
    { x: 32, y: -34, d: 0.3 },
    { x: -28, y: 30, d: 0.6 },
    { x: 42, y: 24, d: 0.9 },
    { x: 8, y: -42, d: 1.2 },
    { x: -10, y: 38, d: 1.5 },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.16), transparent 65%)',
        }}
      />
      {/* scattered grey fragments drift toward center */}
      {fragments.map((f, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-white/25"
          style={{ marginLeft: f.x, marginTop: f.y }}
          animate={{
            x: [0, -f.x * 0.25, 0],
            y: [0, -f.y * 0.25, 0],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 4,
            delay: f.d,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* morphing identity mark at the center */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2"
        animate={{
          borderRadius: ['24%', '50%', '46%', '50%', '24%'],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          border: '1px solid rgba(229,57,53,0.55)',
          background:
            'radial-gradient(circle, rgba(229,57,53,0.22), transparent 72%)',
        }}
      />
      {/* dashed orbit ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{ border: '1px dashed rgba(255,255,255,0.18)' }}
      />
      {/* pulsing red core */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow:
            '0 0 20px rgba(229,57,53,0.95), 0 0 48px rgba(229,57,53,0.5)',
        }}
      />
    </div>
  )
}

/* 02 Launch Identity — vertical energy lines rising + a launch arrow
 * ascending + red particle sparks. */
function LaunchVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 80%, rgba(229,57,53,0.20), transparent 60%)',
        }}
      />
      {/* vertical rising energy lines */}
      {[-30, -10, 10, 30].map((x, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 h-20 w-px"
          style={{ marginLeft: x, marginTop: -10 }}
          animate={{ y: [12, -12, 12], opacity: [0.15, 0.7, 0.15] }}
          transition={{
            duration: 2.2 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.18,
          }}
        >
          <div
            className="h-full w-full"
            style={{
              background:
                'linear-gradient(to top, transparent, rgba(229,57,53,0.85), transparent)',
            }}
          />
        </motion.div>
      ))}
      {/* ascending launch arrow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [4, -10, 4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden
        >
          <motion.path
            d="M28 44 V14 M16 26 L28 14 L40 26"
            stroke="rgba(229,57,53,0.95)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
      {/* red sparks */}
      {[
        { l: '38%', t: '60%' },
        { l: '62%', t: '50%' },
        { l: '50%', t: '38%' },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#ff6b63]"
          style={{ left: p.l, top: p.t }}
          animate={{ scale: [0, 1.3, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.8,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* 03 Brand System — organized constellation grid with red lines connecting
 * nodes. Implies a coherent brand system holding together. */
function SystemVisual() {
  // 5 nodes positioned in a pentagon arrangement
  const nodes = [
    { x: 50, y: 18 },
    { x: 82, y: 42 },
    { x: 70, y: 80 },
    { x: 30, y: 80 },
    { x: 18, y: 42 },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.14), transparent 60%)',
        }}
      />
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {/* connection lines (pentagon edges + center spokes) */}
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length]
          return (
            <motion.line
              key={`edge-${i}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(229,57,53,0.4)"
              strokeWidth="0.4"
              animate={{ opacity: [0.25, 0.7, 0.25] }}
              transition={{
                duration: 2.4,
                delay: i * 0.18,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )
        })}
        {nodes.map((n, i) => (
          <motion.line
            key={`spoke-${i}`}
            x1={50}
            y1={50}
            x2={n.x}
            y2={n.y}
            stroke="rgba(229,57,53,0.25)"
            strokeWidth="0.3"
            strokeDasharray="1 1.5"
            animate={{ opacity: [0.15, 0.55, 0.15] }}
            transition={{
              duration: 2,
              delay: i * 0.22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
      {/* nodes */}
      {nodes.map((n, i) => (
        <motion.span
          key={i}
          className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 2,
            delay: i * 0.25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* center core */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80"
        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(0.5px)' }}
      />
    </div>
  )
}

function CaseVisual({ variant }: { variant: CaseStudy['variant'] }): ReactElement {
  switch (variant) {
    case 'rebuild':
      return <RebuildVisual />
    case 'launch':
      return <LaunchVisual />
    case 'system':
      return <SystemVisual />
  }
}

/* ===================================================================
   CaseCard — single immersive case study card.
   All hooks declared at the top (Rules of Hooks). Hover state drives the
   border/glow/zoom + the "View Case" reveal + the play-button intensity.
   =================================================================== */
function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      data-cursor="View"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.02 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl transition-colors duration-300 hover:border-[#E53935]/60"
    >
      {/* hover red glow bloom (decorative) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, rgba(229,57,53,0.22), transparent 60%)',
        }}
      />

      {/* Visual top — aspect-video on lg, fixed height on mobile for layout parity */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-white/[0.06] bg-black/40">
        <motion.div
          aria-hidden
          className="absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.4 }}
        >
          <CaseVisual variant={study.variant} />
        </motion.div>

        {/* large card number in the corner (decorative) */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-4 top-4 text-3xl font-bold text-white/15 transition-colors duration-300 group-hover:text-[#E53935]/40 sm:text-4xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {study.num}
        </span>

        {/* "Preview" label top-right */}
        <span className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 backdrop-blur-md">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-[#E53935]"
            style={{
              boxShadow: '0 0 8px rgba(229,57,53,0.9)',
            }}
          />
          Preview
        </span>

        {/* Pulsing red play-button overlay (center) — implies video preview */}
        <motion.button
          type="button"
          aria-label={`Preview ${study.title} case study`}
          tabIndex={-1}
          className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E53935]/60 bg-[#E53935]/15 backdrop-blur-md"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: '0 0 24px rgba(229,57,53,0.6)',
            }}
          />
          <Play
            className="h-5 w-5 translate-x-0.5 fill-[#ff6b63] text-[#ff6b63]"
            aria-hidden
          />
        </motion.button>

        {/* Bottom gradient for legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent"
        />
      </div>

      {/* Content bottom */}
      <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7">
        {/* eyebrow */}
        <span
          className="wn-eyebrow text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E53935]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {study.eyebrow}
        </span>

        {/* title */}
        <h3
          className="mt-3 text-2xl font-bold leading-tight tracking-[-0.01em] text-white sm:text-3xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {study.title}
        </h3>

        {/* desc */}
        <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
          {study.desc}
        </p>

        {/* metric — large, red gradient, illustrative */}
        <div className="mt-5 flex items-baseline gap-2">
          <span
            aria-hidden
            className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40"
          >
            Illustrative
          </span>
          <span
            className="bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-xl font-bold text-transparent sm:text-2xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {study.metric}
          </span>
        </div>

        {/* tag + view-case CTA */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
            {study.tag}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#E53935] opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span>View Case</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        {/* bottom accent line — grows on hover */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-transparent transition-all duration-500 group-hover:w-full"
        />
      </div>
    </motion.article>
  )
}

/* ===================================================================
   AuraCaseStudies — Section 6 default export.
   StickyRail (lg+) + header + 3-card grid.
   =================================================================== */
export default function AuraCaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#050505]"
    >
      <div className="lg:flex">
        <StickyRail
          label="Case Studies"
          caption="Work"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Header block */}
          <motion.div style={{ y: headerY }} className="mb-14 max-w-3xl">
            <SectionEyebrow number="06" label="Case Studies" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Built for Brands</MaskLine>
              <MaskLine delay={0.12}>
                That <RedGradientText glow={false}>Refuse</RedGradientText> to
              </MaskLine>
              <MaskLine delay={0.24}>Blend In.</MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl"
            >
              One studio. seven services.{' '}
              <span className="text-white/55">
                Zero excuse to blend in.
              </span>
            </motion.p>
          </motion.div>

          {/* 3-card immersive grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {studies.map((s, i) => (
              <CaseCard key={s.num} study={s} index={i} />
            ))}
          </div>

          {/* Caption — clarifies illustrative intent */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 text-center text-xs text-white/35 sm:text-sm"
          >
            Archetypal case studies — illustrative of the transformations we
            engineer. Metrics shown are not client results.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
