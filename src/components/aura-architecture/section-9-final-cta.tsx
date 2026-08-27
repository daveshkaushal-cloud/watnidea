'use client'

/**
 * AuraFinalCta — Section 9 of the /aura-architecture page.
 *
 * Premium luxury conversion finale — reuses the FinalCta copy + visual
 * treatment from pricing-cta-section.tsx (and about/section-10-final-cta),
 * built on the shared helpers (EnergySphere + EmberCanvas).
 *
 * Composition:
 *   - Full-screen min-h-[100svh]
 *   - EnergySphere (size=90, cursor-follow built into helper) +
 *     EmberCanvas (count=40) particles around it + dynamic cursor-follow
 *     red lighting overlay (useMotionTemplate). The sphere feels like "the
 *     fully-formed identity."
 *   - Eyebrow `THE INVITATION` (red wn-eyebrow, red rules both sides)
 *   - 4-line MaskLine headline: `Identity with` / `Soul.` / `Strategy
 *     with` / `Teeth.` (lines 2 + 4 red gradient)
 *   - Manifesto (curly apostrophe)
 *   - 2 MagneticButtons: primary `Book a Strategy Call` (cursorLabel
 *     `Book`, CalendarDays icon) + secondary `Explore Our Work`
 *     (cursorLabel `Explore`, ArrowUpRight icon)
 *   - Contact mailto `info@watnidea.com`
 *   - Meta row: Creative Growth Agency · Now accepting selected projects · Now accepting selected projects
 *info@watnidea.com
 * Motion: MagneticButton (built-in), cursor-follow (EnergySphere + dynamic
 * lighting overlay), MaskLine motion typography, content parallax fade as
 * you scroll past (useScroll contentY + contentOpacity).
 *
 * Rules of Hooks: all motion values declared unconditionally at the top.
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import MagneticButton from '@/components/hero/magnetic-button'
import {
  EmberCanvas,
  EnergySphere,
  MaskLine,
  RedGradientText,
} from '@/components/about/shared'

/* ===================================================================
   Verbatim copy from pricing-cta-section FinalCta.
   =================================================================== */
const finalEyebrow = 'THE INVITATION'
const finalHeadlineLines = ['Identity with', 'Soul.', 'Strategy with', 'Teeth.']
const finalManifesto =
  'We don\u2019t just build brands. We engineer attention, create unforgettable experiences, and design growth systems that turn businesses into category leaders.'
const primaryCtaLabel = 'Book a Strategy Call'
const secondaryCtaLabel = 'Explore Our Work'
const contactEmail = 'info@watnidea.com'
const metaItems = ['Creative Growth Agency', 'Now accepting selected projects', 'Now accepting selected projects']

/* ===================================================================
   AuraFinalCta — Section 9 default export.
   =================================================================== */
export default function AuraFinalCta() {
  const sectionRef = useRef<HTMLElement>(null)

  // cursor-follow parallax (all hooks declared unconditionally at top)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  // dynamic light overlay: cursor → 30%..70% position
  const lightX = useTransform(sx, [0, 1], ['30%', '70%'])
  const lightY = useTransform(sy, [0, 1], ['30%', '70%'])
  const lightGrad = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(229,57,53,0.45), rgba(229,57,53,0) 55%)`

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

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)))
    my.set(Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)))
  }
  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-t border-white/5 bg-[#050505] px-5 py-24"
      aria-label="Final CTA"
    >
      {/* Energy sphere — cursor-follow (built into helper) */}
      <EnergySphere size={90} />

      {/* Dynamic cursor-follow red lighting overlay */}
      <motion.div
        aria-hidden
        style={{ background: lightGrad }}
        className="pointer-events-none absolute inset-0 mix-blend-screen"
      />

      {/* Ember particles */}
      <EmberCanvas count={40} />

      {/* Bottom vignette for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.55) 80%, rgba(5,5,5,0.92) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-4xl text-center"
      >
        {/* Eyebrow — THE INVITATION with red rules both sides */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-7 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#E53935]" />
          <span className="wn-eyebrow text-[10px] font-medium text-[#E53935] sm:text-[11px]">
            {finalEyebrow}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#E53935]" />
        </motion.div>

        {/* 4-line headline — lines 2 + 4 red gradient */}
        <h2
          className="text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {finalHeadlineLines.map((line, i) => {
            const isAccent = i === 1 || i === 3
            return (
              <MaskLine key={i} delay={i * 0.1}>
                {isAccent ? (
                  <RedGradientText>{line}</RedGradientText>
                ) : (
                  <span className="text-white">{line}</span>
                )}
              </MaskLine>
            )
          })}
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
              <span className="wn-eyebrow text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
                {item}
              </span>
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
