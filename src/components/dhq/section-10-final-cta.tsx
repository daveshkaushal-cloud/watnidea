'use client'

/**
 * DhqFinalCta — Section 10
 * Full-screen cinematic finale — massive floating digital headquarters
 * visual with connected red energy streams radiating outward to smaller
 * system nodes (a "connected red energy network"), ember particles,
 * EnergySphere core glow, ambient lighting, masked headline.
 *
 * Composition:
 *   - Full-screen (`min-h-[100svh]`) section.
 *   - Visual: EnergySphere (size=90, large) + EmberCanvas particles +
 *     AboutAmbient red glow behind.
 *   - DigitalHQNetwork: central glowing browser-frame / HQ structure
 *     with 5 floating glassmorphism system nodes (browser frames,
 *     dashboard tiles) connected by animated red energy streams
 *     (SVG paths with animated strokeDashoffset).
 *   - Eyebrow: "THE INVITATION" (red wn-eyebrow, red rules both sides —
 *     matches the pricing-cta FinalCta eyebrow style; NOT SectionEyebrow
 *     since no `(NN)` numbering here).
 *   - Headline (4 lines, MaskLine staggered):
 *       "Identity with" / "Soul." / "Strategy with" / "Teeth."
 *       — "Soul." and "Teeth." in red gradient via RedGradientText.
 *       `text-6xl sm:text-7xl md:text-8xl font-bold leading-[0.92]` font-display.
 *   - Manifesto (verbatim, curly apostrophe in don\u2019t):
 *       "We don\u2019t just build brands. We engineer attention, create
 *       unforgettable experiences, and design growth systems that turn
 *       businesses into category leaders." — text-lg sm:text-xl text-white/65
 *       max-w-2xl mx-auto text-center.
 *   - CTAs: MagneticButton primary "Book Strategy Call" (cursorLabel "Book",
 *     CalendarDays icon) + MagneticButton secondary "Explore Our Work"
 *     (cursorLabel "Explore", ArrowUpRight icon).
 *   - Contact: info@watnidea.com (mailto link, hover red).
 *   - Meta row: "Creative Growth Agency" · "Now accepting selected projects" ·
 *     "Now accepting selected projects" (wn-eyebrow, white/35, middot separators).
 *
 * Motion: MagneticButtons (built-in), EnergySphere cursor-follow lighting
 * overlay, MaskLine line-by-line reveal, content parallax (useScroll +
 * useTransform on y/opacity), AnimatePresence-free ambient pulses.
 *
 * Content centered, z-10, max-w-4xl.
 *
 * DIGITAL/TECH visual language preserved from Sections 1-5,7,8 —
 * browser frames, dashboard tiles, glassmorphism UI panels, animated
 * red data streams.
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import MagneticButton from '@/components/hero/magnetic-button'
import {
  AboutAmbient,
  EmberCanvas,
  EnergySphere,
  MaskLine,
  RedGradientText,
} from '@/components/about/shared'

/* ===================================================================
   Verbatim copy (preserve every character — curly apostrophe in
   don\u2019t).
   =================================================================== */
const finalEyebrow = 'THE INVITATION'
const finalManifesto =
  'We don\u2019t just build brands. We engineer attention, create unforgettable experiences, and design growth systems that turn businesses into category leaders.'
const primaryCtaLabel = 'Book Strategy Call'
const secondaryCtaLabel = 'Explore Our Work'
const contactEmail = 'info@watnidea.com'
const metaItems = [
  'Creative Growth Agency',
  'Now accepting selected projects',
  'Now accepting selected projects',
]

/* ===================================================================
   Satellite positions — precomputed at module scope (all integer
   values, no hydration concerns). 5 satellites arranged in a pentagon
   around the center (50, 50).
   =================================================================== */
type Satellite = {
  x: number
  y: number
  kind: 'browser' | 'dashboard' | 'crm'
  label: string
  delay: number
}

const SATELLITES: Satellite[] = [
  { x: 50, y: 14, kind: 'browser', label: 'Landing', delay: 0 },
  { x: 84, y: 30, kind: 'dashboard', label: 'Analytics', delay: 0.4 },
  { x: 84, y: 70, kind: 'browser', label: 'Store', delay: 0.8 },
  { x: 16, y: 70, kind: 'crm', label: 'CRM', delay: 1.2 },
  { x: 16, y: 30, kind: 'browser', label: 'Blog', delay: 1.6 },
]

/* ===================================================================
   RadialBurst — one-shot/looping radial particle burst from HQ center.
   Lightweight SVG-based: 12 spokes that scale + fade outward on a loop.
   Spoke endpoints precomputed at module scope & rounded to 3 decimals
   to guarantee identical SSR + client serialization (hydration-safe).
   =================================================================== */
const BURST_SPOKES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2
  const x2 = Math.round((100 + Math.cos(angle) * 90) * 1000) / 1000
  const y2 = Math.round((100 + Math.sin(angle) * 90) * 1000) / 1000
  return { x2, y2, i }
})

function RadialBurst() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <svg viewBox="0 0 200 200" className="h-[60vw] w-[60vw] max-h-[520px] max-w-[520px]">
        {BURST_SPOKES.map(({ x2, y2, i }) => (
          <motion.line
            key={i}
            x1="100"
            y1="100"
            x2={x2}
            y2={y2}
            stroke="rgba(229,57,53,0.55)"
            strokeWidth="0.6"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 4px rgba(229,57,53,0.7))' }}
            animate={{
              opacity: [0, 0.85, 0],
              pathLength: [0, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.08,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

/* ===================================================================
   HqCore — central glowing browser-frame / HQ structure.
   Floating motion + red glow halo.
   =================================================================== */
function HqCore() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="relative w-[200px] sm:w-[240px] md:w-[280px]">
        {/* red glow halo */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.45), transparent 60%)',
            filter: 'blur(20px)',
          }}
          animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* browser frame */}
        <div className="relative overflow-hidden rounded-xl border border-[#E53935]/55 bg-[#0a0a0a]/85 backdrop-blur-md"
          style={{
            boxShadow:
              '0 0 30px rgba(229,57,53,0.45), 0 0 60px rgba(229,57,53,0.22)',
          }}
        >
          {/* chrome */}
          <div className="flex items-center gap-2 border-b border-[#E53935]/25 bg-[#E53935]/[0.08] px-3 py-2">
            <motion.span
              className="h-2 w-2 rounded-full bg-[#E53935]"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ boxShadow: '0 0 6px rgba(229,57,53,0.85)' }}
            />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <div className="ml-2 flex h-5 flex-1 items-center rounded-md border border-[#E53935]/30 bg-[#1A1A1A]/80 px-2">
              <span className="text-[9px] font-medium text-[#ff6b63]">
                watnidea.com
              </span>
            </div>
          </div>
          {/* content */}
          <div className="p-3 sm:p-4">
            <div className="flex items-center gap-1.5">
              <motion.span
                className="h-2 w-2 rounded-full bg-[#ff6b63]"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: '0 0 8px rgba(229,57,53,0.9)' }}
              />
              <span
                className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 sm:text-sm"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                Digital HQ
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-3 gap-1.5">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="h-3 rounded-sm border border-[#E53935]/25 bg-[#E53935]/8"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <motion.div
                className="rounded-sm bg-[#E53935] px-2 py-0.5 text-[8px] font-bold text-white"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: '0 0 8px rgba(229,57,53,0.6)' }}
              >
                Live
              </motion.div>
              <span className="text-[8px] uppercase tracking-[0.18em] text-white/40">
                24/7 · online
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ===================================================================
   SatelliteNode — small floating glassmorphism UI panel.
   3 kinds: browser / dashboard / crm — each a slightly different
   mini-visual, all in the DIGITAL/TECH language.
   =================================================================== */
function SatelliteNode({ s }: { s: Satellite }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        left: `${s.x}%`,
        top: `${s.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
      transition={{
        duration: 4 + s.delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: s.delay,
      }}
    >
      <div
        className="relative w-[68px] overflow-hidden rounded-md border border-white/12 bg-[#0a0a0a]/80 backdrop-blur-md sm:w-[80px] md:w-[88px]"
        style={{ boxShadow: '0 4px 18px rgba(0,0,0,0.55)' }}
      >
        {/* tiny chrome */}
        <div className="flex items-center gap-1 border-b border-white/8 px-1.5 py-1">
          <span className="h-1 w-1 rounded-full bg-[#E53935]/80" />
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="ml-1 text-[7px] font-medium text-white/40">
            {s.label}
          </span>
        </div>
        {/* content area */}
        <div className="p-1.5">
          {s.kind === 'browser' && (
            <div className="space-y-0.5">
              <motion.div
                className="h-1 w-2/3 rounded-full bg-[#ff6b63]"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
              />
              <div className="h-0.5 w-full rounded-full bg-white/15" />
              <div className="h-0.5 w-3/4 rounded-full bg-white/12" />
              <div className="mt-1 grid grid-cols-2 gap-0.5">
                <div className="h-2 rounded-sm bg-white/8" />
                <div className="h-2 rounded-sm bg-[#E53935]/30" />
              </div>
            </div>
          )}
          {s.kind === 'dashboard' && (
            <div>
              <div className="flex items-end gap-0.5">
                {[3, 5, 4, 6, 7].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: h * 1.6,
                      background: i >= 3 ? '#E53935' : 'rgba(255,255,255,0.15)',
                    }}
                    animate={{ height: [h * 0.7, h * 1.6, h * 1.3] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.12 + s.delay,
                    }}
                  />
                ))}
              </div>
              <div className="mt-1 h-0.5 w-2/3 rounded-full bg-white/15" />
            </div>
          )}
          {s.kind === 'crm' && (
            <div className="space-y-0.5">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-[#E53935]/55" />
                <div className="h-0.5 flex-1 rounded-full bg-white/15" />
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-[#ff6b63]/65" />
                <div className="h-0.5 flex-1 rounded-full bg-white/12" />
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-white/30" />
                <div className="h-0.5 flex-1 rounded-full bg-white/10" />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ===================================================================
   EnergyStreams — SVG with 5 animated red data-stream lines from each
   satellite to the central HQ (50, 50).
   =================================================================== */
function EnergyStreams() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {SATELLITES.map((s, i) => (
        <motion.line
          key={i}
          x1={s.x}
          y1={s.y}
          x2={50}
          y2={50}
          stroke="rgba(229,57,53,0.55)"
          strokeWidth="0.18"
          strokeLinecap="round"
          strokeDasharray="1 1.6"
          style={{ filter: 'drop-shadow(0 0 1px rgba(229,57,53,0.8))' }}
          animate={{ strokeDashoffset: [0, -2.6] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.18,
          }}
        />
      ))}
    </svg>
  )
}

/* ===================================================================
   DigitalHQNetwork — the full floating digital headquarters visual
   (central HQ + 5 satellites + energy streams). Composes the layers.
   =================================================================== */
function DigitalHQNetwork() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-70 sm:opacity-80"
    >
      <EnergyStreams />
      {SATELLITES.map((s, i) => (
        <SatelliteNode key={i} s={s} />
      ))}
      <HqCore />
    </div>
  )
}

/* ===================================================================
   DhqFinalCta — Section 10 named export.
   Hooks declared unconditionally at the top (useScroll + useTransform
   for content parallax).
   =================================================================== */
export function DhqFinalCta() {
  const sectionRef = useRef<HTMLElement>(null)

  // slow parallax fade as user scrolls past
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60])
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.4, 1, 1, 0.4]
  )

  return (
    <section
      ref={sectionRef}
      aria-label="The Invitation — Final CTA"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24"
    >
      {/* Ambient red glow behind the sphere */}
      <AboutAmbient />

      {/* Energy sphere — large (size=90) with built-in cursor-follow
          lighting overlay via useMotionTemplate. */}
      <EnergySphere size={90} />

      {/* Radial particle burst from sphere center */}
      <RadialBurst />

      {/* The floating digital headquarters network */}
      <DigitalHQNetwork />

      {/* Ember particles around the sphere */}
      <EmberCanvas count={48} />

      {/* Bottom vignette for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(20,20,20,0.5) 80%, rgba(20,20,20,0.85) 100%)',
        }}
      />

      {/* === Content (centered, z-10, max-w-4xl) === */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-4xl text-center"
      >
        {/* Eyebrow — "THE INVITATION" with red rules both sides
            (matches pricing-cta FinalCta style; NOT SectionEyebrow
            since no (NN) numbering). */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-7 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#E53935]" />
          <span className="wn-eyebrow text-[10px] font-medium text-[#E53935] sm:text-xs">
            {finalEyebrow}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#E53935]" />
        </motion.div>

        {/* Headline — 4 lines, line 2 + line 4 red gradient */}
        <h2
          className="text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>Identity with</MaskLine>
          <MaskLine delay={0.1}>
            <RedGradientText>Soul.</RedGradientText>
          </MaskLine>
          <MaskLine delay={0.2}>Strategy with</MaskLine>
          <MaskLine delay={0.3}>
            <RedGradientText>Teeth.</RedGradientText>
          </MaskLine>
        </h2>

        {/* Manifesto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          {finalManifesto}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            variant="primary"
            cursorLabel="Book"
            ariaLabel={primaryCtaLabel}
            onClick={() => {}}
          >
            <CalendarDays className="h-4 w-4" />
            {primaryCtaLabel}
          </MagneticButton>
          <MagneticButton
            variant="secondary"
            cursorLabel="Explore"
            ariaLabel={secondaryCtaLabel}
            onClick={() => {}}
          >
            {secondaryCtaLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-9"
        >
          <a
            href={`mailto:${contactEmail}`}
            className="text-sm text-white/50 transition-colors duration-300 hover:text-[#E53935]"
          >
            {contactEmail}
          </a>
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
        >
          {metaItems.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              <span className="wn-eyebrow text-[10px] text-white/35">{item}</span>
              {i < metaItems.length - 1 && (
                <span className="text-[#E53935]/60">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
