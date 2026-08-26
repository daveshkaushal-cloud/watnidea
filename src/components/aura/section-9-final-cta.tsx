'use client'

/**
 * AuraFinalCta — Section 9
 * Full-screen cinematic finale — massive glowing red identity sphere,
 * ember particles, ambient lighting, masked headline.
 *
 * Composition:
 *   - Full-screen (`min-h-[100svh]`) section.
 *   - Visual: EnergySphere (size=90, large) + EmberCanvas particles
 *     around it. AboutAmbient red glow behind.
 *   - Eyebrow: "THE INVITATION" (red wn-eyebrow, red rules both sides —
 *     matches the pricing-cta FinalCta eyebrow style; NOT SectionEyebrow
 *     since no `(NN)` numbering here).
 *   - Headline (4 lines, MaskLine staggered):
 *       "Identity with" / "Soul." / "Strategy with" / "Teeth."
 *       — "Soul." and "Teeth." in red gradient via RedGradientText.
 *       `text-6xl sm:text-7xl md:text-8xl font-bold leading-[0.92]` font-display.
 *   - Manifesto (verbatim from pricing-cta finalManifesto, curly apostrophe
 *     in don\u2019t): "We don\u2019t just build brands. We engineer attention,
 *     create unforgettable experiences, and design growth systems that turn
 *     businesses into category leaders." — text-lg sm:text-xl text-white/65
 *     max-w-2xl mx-auto text-center.
 *   - CTAs: MagneticButton primary "Book Strategy Call" (cursorLabel "Book",
 *     CalendarDays icon) + MagneticButton secondary "Explore Our Work"
 *     (cursorLabel "Explore", ArrowUpRight icon).
 *   - Contact: hello@watnidea.com (mailto link, hover red).
 *   - Meta row: "Creative Growth Agency" · "Now accepting selected projects" ·
 *     "Now accepting selected projects" (wn-eyebrow, white/35, middot separators).
 *
 * Motion: MagneticButtons (built-in), EnergySphere cursor-follow lighting
 * overlay, MaskLine line-by-line reveal, content parallax (useScroll +
 * useTransform on y/opacity), AnimatePresence-free ambient pulses.
 *
 * Content centered, z-10, max-w-4xl.
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
   Verbatim copy (preserve every character — curly apostrophe in don\u2019t).
   =================================================================== */
const finalEyebrow = 'THE INVITATION'
const finalManifesto =
  'We don\u2019t just build brands. We engineer attention, create unforgettable experiences, and design growth systems that turn businesses into category leaders.'
const primaryCtaLabel = 'Book Strategy Call'
const secondaryCtaLabel = 'Explore Our Work'
const contactEmail = 'hello@watnidea.com'
const metaItems = [
  'Creative Growth Agency',
  'Now accepting selected projects',
  'Now accepting selected projects',
]

/* ===================================================================
   RadialBurst — one-shot/looping radial particle burst from sphere center.
   Lightweight SVG-based: 12 spokes that scale + fade outward on a loop.
   Spoke endpoints are precomputed at module scope & rounded to 3 decimals
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
   AuraFinalCta — Section 9 default export.
   Hooks declared unconditionally at the top (useScroll + useTransform
   for content parallax).
   =================================================================== */
export function AuraFinalCta() {
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
