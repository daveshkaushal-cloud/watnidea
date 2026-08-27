'use client'

/**
 * BookFinalMoment — Section 8 of /book-strategy-call
 *
 * CINEMATIC MULTI-COLOR CRESCENDO — the climax of the entire booking
 * page. ALL 6 service colors (plus Kinetic orange) merge into a single
 * identity sphere, with 7 service name labels orbiting at a large
 * radius. Bigger, slower, more luminous than the hero.
 *
 * Composition:
 *   - NO BookingEyebrow (mirrors growth/echo/kinetic final CTAs).
 *   - ConvergenceSphere (size=100) — larger than hero (size=80) and
 *     the Work finale (size=90).
 *   - 7 orbiting service name labels (Aura / Digital HQ / Hype Engine
 *     / Kinetic Studio / Growth Alchemy / Synthetic Cinema / Echo
 *     System), each tinted to its own color, circling at a large
 *     radius. Kinetic uses inline orange #F97316 (its true accent).
 *   - 6 service-color stream streaks flowing INTO the sphere from the
 *     screen edges (one per WORK_COLORS entry — gold/blue/red/green/
 *     purple/cyan).
 *   - MultiColorEmberCanvas count=70 (more than hero's default 50).
 *   - 6 ambient color blobs at the screen edges (one per service).
 *   - Headline (MaskLine): "Let's Build Something Worth Remembering."
 *     "Remembering" renders with a multi-color conic gradient
 *     background clipped to text.
 *   - Manifesto subhead (verbatim): "We don't just build brands. We
 *     engineer attention, create unforgettable experiences, and design
 *     growth systems that turn businesses into category leaders."
 *   - CTAs: BookingMagneticButton variant="convergence" "Book a
 *     Strategy Call" (cursorLabel="Book") + variant="secondary"
 *     "Explore Our Work" (cursorLabel="Work", onClick → /work).
 *   - Email link: info@watnidea.com.
 *   - Meta strip: "Creative Growth Agency" · "Est. 2024 — Studio
 *     Namma" · "Now accepting selected projects".
 *   - Service tag: "Book a Strategy Call — 00 / 07".
 *   - Scroll parallax on the content (useScroll → contentY +
 *     contentOpacity).
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Pre-rounded SVG coords for hydration safety.
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
import {
  ConvergenceSphere,
  MultiColorEmberCanvas,
  ServiceColorDot,
  WORK_COLORS,
  WORK_COLOR_LIST,
  BookingMagneticButton,
  MaskLine,
  type ServiceColorKey,
} from '@/components/book/shared'

/* ===================================================================
   Verbatim copy (from hero/pricing-cta-section.tsx).
   Curly apostrophe (') preserved via \u2019.
   =================================================================== */
const finalHeadlineLines = ["Let\u2019s Build Something", 'Worth Remembering.']
const finalManifesto =
  'We don\u2019t just build brands. We engineer attention, create unforgettable experiences, and design growth systems that turn businesses into category leaders.'
const primaryCtaLabel = 'Book a Strategy Call'
const secondaryCtaLabel = 'Explore Our Work'
const contactEmail = 'info@watnidea.com'
const metaItems = ['Creative Growth Agency', 'Now accepting selected projects', 'Now accepting selected projects']
const serviceTag = 'Book a Strategy Call \u2014 00 / 07'

/* ===================================================================
   7 service labels for the orbit ring. Kinetic Studio uses inline
   orange #F97316 (its true accent), the other 6 use WORK_COLORS.
   =================================================================== */
type ServiceLabel = {
  name: string
  color: ServiceColorKey
  inlineHex?: string
}

const serviceLabels: ServiceLabel[] = [
  { name: 'Aura Architecture', color: 'aura' },
  { name: 'The Digital HQ', color: 'digital' },
  { name: 'The Hype Engine', color: 'hype' },
  { name: 'Kinetic Studio', color: 'hype', inlineHex: '#F97316' },
  { name: 'Growth Alchemy', color: 'growth' },
  { name: 'Synthetic Cinema', color: 'cinema' },
  { name: 'The Echo System', color: 'echo' },
]

function labelColor(sl: ServiceLabel) {
  return sl.inlineHex ?? WORK_COLORS[sl.color].hex
}

/* ===================================================================
   buildConicStops — builds the multi-color conic gradient stops from
   all 6 WORK_COLORS. Pre-rounded for hydration safety.
   =================================================================== */
function buildConicStops(): string {
  const stops: string[] = []
  const total = WORK_COLOR_LIST.length
  WORK_COLOR_LIST.forEach((sc, i) => {
    const a1 = Math.round((i / total) * 360 * 1000) / 1000
    const a2 = Math.round(((i + 1) / total) * 360 * 1000) / 1000
    stops.push(`${sc.hex} ${a1}deg`)
    stops.push(`${sc.hex} ${a2}deg`)
  })
  stops.push(`${WORK_COLOR_LIST[0].hex} 360deg`)
  return stops.join(', ')
}

const CONIC_STOPS = buildConicStops()

/* ===================================================================
   Multi-color conic headline — "Remembering." rendered with a conic
   gradient built from all 6 service colors, clipped to text. CSS
   animation rotates the background-position for a living shimmer.
   =================================================================== */
const CONIC_KEYFRAMES_NAME = 'wn-book-conic-rotate'

function MultiColorHeadline({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ${CONIC_KEYFRAMES_NAME} {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `,
        }}
      />
      <span
        style={{
          background: `conic-gradient(from 0deg, ${CONIC_STOPS})`,
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          filter: 'drop-shadow(0 0 32px rgba(255,255,255,0.20))',
          animation: `${CONIC_KEYFRAMES_NAME} 14s ease-in-out infinite`,
        }}
      >
        {children}
      </span>
    </>
  )
}

/* ===================================================================
   ServiceStreamArcs — 6 SVG arcs flowing INTO the sphere from the
   edges of the screen, one per service color. Each arc draws in via
   strokeDashoffset + pathLength and continuously flows. Colored
   particles travel along each arc toward the core.
   =================================================================== */
type StreamArc = {
  d: string
  dur: number
  delay: number
  width: number
  colorIdx: number
}

const STREAM_ARCS: StreamArc[] = [
  // gold (aura) — from top-left
  { d: 'M 8 14 Q 28 32, 50 50', dur: 16, delay: 0, width: 0.4, colorIdx: 0 },
  // blue (digital) — from top-right
  { d: 'M 92 14 Q 72 32, 50 50', dur: 18, delay: 0.4, width: 0.4, colorIdx: 1 },
  // red (hype) — from right
  { d: 'M 96 50 Q 76 50, 50 50', dur: 20, delay: 0.8, width: 0.45, colorIdx: 2 },
  // green (growth) — from bottom-right
  { d: 'M 92 86 Q 72 68, 50 50', dur: 17, delay: 0.2, width: 0.4, colorIdx: 3 },
  // purple (cinema) — from bottom-left
  { d: 'M 8 86 Q 28 68, 50 50', dur: 19, delay: 0.6, width: 0.4, colorIdx: 4 },
  // cyan (echo) — from left
  { d: 'M 4 50 Q 24 50, 50 50', dur: 21, delay: 1.0, width: 0.45, colorIdx: 5 },
]

function ServiceStreamArcs() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      {STREAM_ARCS.map((arc, i) => {
        const sc = WORK_COLOR_LIST[arc.colorIdx]
        const gradId = `book-stream-grad-${i}`
        return (
          <g key={`arc-${i}`}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={sc.soft} stopOpacity="0.2" />
                <stop offset="100%" stopColor={sc.hex} stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <motion.path
              d={arc.d}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={arc.width}
              strokeLinecap="round"
              strokeDasharray="2 4"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                delay: 0.4 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                filter: `drop-shadow(0 0 2.4px ${sc.glow})`,
              }}
            />
            {/* traveling particle flowing toward the core */}
            <motion.circle
              r={0.8}
              fill={sc.soft}
              style={{
                filter: `drop-shadow(0 0 3px ${sc.glow})`,
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <animateMotion
                dur={`${arc.dur}s`}
                repeatCount="indefinite"
                begin={`${arc.delay}s`}
                path={arc.d}
              />
            </motion.circle>
          </g>
        )
      })}
    </svg>
  )
}

/* ===================================================================
   OrbitingServiceLabels — 7 service name labels circling the
   convergence sphere at a large radius. The whole ring rotates as
   one piece (single motion.div), and each label counter-rotates so
   the text stays upright. Kinetic Studio uses inline orange #F97316;
   the other 6 use their WORK_COLORS entry.
   =================================================================== */
function OrbitingServiceLabels() {
  // ring radius — large enough to orbit outside the sphere's core
  // glow. Using vw units so it scales with the viewport.
  const ringSizeClass = 'h-[78vw] w-[78vw] max-h-[760px] max-w-[760px]'

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${ringSizeClass}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
    >
      {serviceLabels.map((sl, i) => {
        const total = serviceLabels.length
        const angle = (i / total) * Math.PI * 2 - Math.PI / 2 // start at top
        const r = 50 // % of ring
        // Pre-round to 3 decimals to prevent SSR/client hydration mismatch.
        const x = Math.round((50 + Math.cos(angle) * r) * 1000) / 1000
        const y = Math.round((50 + Math.sin(angle) * r) * 1000) / 1000
        const hex = labelColor(sl)
        return (
          <motion.div
            key={sl.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            // counter-rotate so the label stays upright as the ring
            // spins. Using a slower counter-rotation that matches the
            // ring's rotation in the opposite direction.
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          >
            <div
              className="flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-md"
              style={{
                borderColor: `${hex}55`,
                background: 'rgba(20,20,20,0.5)',
                boxShadow: `0 0 16px ${hex}33, inset 0 0 8px ${hex}22`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: hex, boxShadow: `0 0 6px ${hex}` }}
              />
              <span
                className="whitespace-nowrap text-[10px] font-bold tracking-[0.16em] sm:text-xs"
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  color: hex,
                  textShadow: `0 0 10px ${hex}80`,
                }}
              >
                {sl.name}
              </span>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

/* ===================================================================
   CursorGlow — section-level cursor-follow multi-color lighting
   overlay. Subtle white wash that follows the cursor.
   =================================================================== */
function CursorGlow() {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 50, damping: 20 })
  const sy = useSpring(my, { stiffness: 50, damping: 20 })
  const lightX = useTransform(sx, [0, 1], ['25%', '75%'])
  const lightY = useTransform(sy, [0, 1], ['25%', '75%'])
  const grad = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(255,255,255,0.10), rgba(255,255,255,0.04) 30%, rgba(255,255,255,0) 60%)`

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)))
    my.set(Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)))
  }
  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      aria-hidden
      style={{ background: grad }}
      className="pointer-events-none absolute inset-0 mix-blend-screen"
    />
  )
}

/* ===================================================================
   ColorLegend — small horizontal legend row showing all 6 service
   colors converging. Sits below the headline.
   =================================================================== */
function ColorLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="mt-7 flex items-center justify-center gap-2"
    >
      {WORK_COLOR_LIST.map((sc, i) => (
        <div key={sc.key} className="flex items-center gap-2">
          <ServiceColorDot color={sc.key as never} size={8} />
          {i < WORK_COLOR_LIST.length - 1 && (
            <span className="h-px w-4 bg-white/15" aria-hidden />
          )}
        </div>
      ))}
    </motion.div>
  )
}

/* ===================================================================
   BookFinalMoment — Section 8 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function BookFinalMoment() {
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

  const handleExplore = () => {
    try {
      window.location.href = '/work'
    } catch {
      /* no-op */
    }
  }

  return (
    <section
      ref={sectionRef}
      aria-label="The Convergence — Book a Strategy Call"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24"
    >
      {/* Subtle wide white wash (the sphere provides its own colored glow) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.06), rgba(255,255,255,0) 60%)',
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* 6 ambient color blobs at the edges (one per service) */}
      {WORK_COLOR_LIST.map((sc, i) => {
        const positions = [
          { left: '6%', top: '12%' },
          { right: '6%', top: '12%' },
          { right: '4%', bottom: '18%' },
          { left: '4%', bottom: '18%' },
          { left: '12%', bottom: '38%' },
          { right: '12%', bottom: '38%' },
        ]
        const pos = positions[i]
        return (
          <motion.div
            key={sc.key}
            aria-hidden
            className="pointer-events-none absolute h-[24vw] w-[24vw] rounded-full"
            style={{
              ...pos,
              background: `radial-gradient(circle, ${sc.glow}, rgba(0,0,0,0) 70%)`,
              filter: 'blur(50px)',
            }}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.15, 1] }}
            transition={{
              duration: 11 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        )
      })}

      {/* ConvergenceSphere — LARGER than hero (size=100) */}
      <ConvergenceSphere size={100} />

      {/* 7 orbiting service name labels circling the sphere */}
      <OrbitingServiceLabels />

      {/* 6 service-color stream arcs flowing into the sphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <ServiceStreamArcs />
      </div>

      {/* Multi-color ember particles drifting upward — more than hero */}
      <MultiColorEmberCanvas count={70} />

      {/* Dynamic cursor-follow lighting overlay (section-level) */}
      <CursorGlow />

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
        {/* NO eyebrow — mirrors growth/echo/kinetic final CTAs */}

        {/* Headline — 2 lines, line 2 multi-color conic gradient */}
        <h2
          className="text-5xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>{finalHeadlineLines[0]} </MaskLine>
          <MaskLine delay={0.15}>
            <MultiColorHeadline>{finalHeadlineLines[1]}</MultiColorHeadline>
          </MaskLine>
        </h2>

        {/* Color legend row */}
        <ColorLegend />

        {/* Manifesto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          {finalManifesto}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <BookingMagneticButton
            variant="convergence"
            cursorLabel="Book"
            ariaLabel={primaryCtaLabel}
            onClick={() => {}}
          >
            <CalendarDays className="h-4 w-4" />
            {primaryCtaLabel}
          </BookingMagneticButton>
          <BookingMagneticButton
            variant="secondary"
            cursorLabel="Work"
            ariaLabel={secondaryCtaLabel}
            onClick={handleExplore}
          >
            {secondaryCtaLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </BookingMagneticButton>
        </motion.div>

        {/* Contact email */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-9"
        >
          <a
            href={`mailto:${contactEmail}`}
            className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
          >
            {contactEmail}
          </a>
        </motion.div>

        {/* Meta strip — 3 meta items */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.95 }}
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

        {/* Service tag — mirrors the kinetic final CTA pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#E53935]/60" />
          <span
            className="wn-eyebrow text-[10px] font-bold tracking-[0.3em] text-white/60"
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              textShadow: '0 0 12px rgba(255,255,255,0.18)',
            }}
          >
            {serviceTag}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#E53935]/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
