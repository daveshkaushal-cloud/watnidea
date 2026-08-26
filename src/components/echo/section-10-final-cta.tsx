'use client'

/**
 * EchoFinalCta — Section 10 of /the-echo-system
 *
 * Full-screen cinematic finale — a GIANT CYAN KNOWLEDGE SPHERE with
 * search-pathway arcs and discovery node chips orbiting around it,
 * ember particles, ambient lighting, and the WatNidea visibility
 * manifesto.
 *
 * Composition:
 *   - Full-screen (`min-h-[100svh]`) section.
 *   - Visual stack:
 *       • CyanAmbient cyan glow behind (slow pulse).
 *       • CyanEnergySphere (size=90, large) — 4-layer cursor-follow
 *         cyan sphere with dynamic lighting overlay = "knowledge sphere".
 *       • OrbitingStreams — 3 SVG ring orbits with discovery chips
 *         (Search, BrainCircuit, Globe, Radio, Compass, Sparkles,
 *         Layers, Activity) traveling along them — the surfaces where
 *         the brand's knowledge gets discovered.
 *       • Search-pathway arcs (SVG paths animated with strokeDashoffset)
 *         connecting the sphere to surrounding surface nodes.
 *       • CyanEmberCanvas (count=48) — rising cyan/sky/teal embers.
 *       • Dynamic cursor-follow cyan lighting overlay
 *         (useMotionValue → useSpring → useTransform → useMotionTemplate
 *         radial-gradient, mix-blend-screen) over the section background.
 *       • Bottom vignette for legibility.
 *   - Eyebrow: (10) · Begin (CyanEyebrow)
 *   - Headline (MaskLine):
 *       "Become" + CyanGradientText "Visible Everywhere."
 *   - Subheadline: "Your audience is searching, asking, comparing. We
 *     make sure they find you — everywhere."
 *   - Primary CTA: CyanMagneticButton primary "Book Strategy Call"
 *     (cursorLabel="Book") with CalendarDays icon.
 *   - Secondary CTA: CyanMagneticButton secondary "See The System".
 *   - Final micro-line: "The Echo System — 07 / 07".
 *   - Contact: hello@watnidea.com (mailto, hover cyan).
 *   - Scroll parallax: useScroll on section → contentY/contentOpacity.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
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
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  Compass,
  Globe,
  Layers,
  Radio,
  Search,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import {
  CyanAmbient,
  CyanEmberCanvas,
  CyanEnergySphere,
  CyanEyebrow,
  CyanGradientText,
  CyanMagneticButton,
  MaskLine,
} from '@/components/echo/shared'

/* ===================================================================
   Verbatim copy.
   =================================================================== */
const subheadline =
  'Your audience is searching, asking, comparing. We make sure they find you — everywhere.'
const primaryCtaLabel = 'Book Strategy Call'
const secondaryCtaLabel = 'See The System'
const contactEmail = 'hello@watnidea.com'
const serviceNumber = 'The Echo System — 07 / 07'

/* ===================================================================
   Orbiting discovery streams — 3 SVG ring orbits with discovery
   surface chips traveling along them. Each ring rotates; chips
   counter-rotate to stay upright. Cyan gradient strokes.
   =================================================================== */
type OrbitChip = {
  Icon: LucideIcon
  angle: number
  label?: string
}

type Orbit = {
  radius: number
  dur: number
  dir: 1 | -1
  stroke: string
  chips: OrbitChip[]
}

const orbits: Orbit[] = [
  {
    radius: 24,
    dur: 24,
    dir: 1,
    stroke: 'rgba(6,182,212,0.28)',
    chips: [
      { Icon: Search, angle: 30, label: 'Organic' },
      { Icon: BrainCircuit, angle: 150, label: 'AI Answers' },
      { Icon: Globe, angle: 270, label: 'Knowledge' },
    ],
  },
  {
    radius: 33,
    dur: 30,
    dir: -1,
    stroke: 'rgba(103,232,249,0.22)',
    chips: [
      { Icon: Radio, angle: 60, label: 'Voice' },
      { Icon: Compass, angle: 200, label: 'Discovery' },
      { Icon: Sparkles, angle: 320, label: 'Citations' },
    ],
  },
  {
    radius: 42,
    dur: 36,
    dir: 1,
    stroke: 'rgba(14,116,144,0.32)',
    chips: [
      { Icon: Layers, angle: 90, label: 'Clusters' },
      { Icon: Activity, angle: 240, label: 'Authority' },
    ],
  },
]

/* ===================================================================
   OrbitRing — single rotating orbit with chips.
   The ring container rotates; chips counter-rotate to stay upright.
   =================================================================== */
function OrbitRing({ orbit }: { orbit: Orbit }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: `${orbit.radius * 2}vw`,
        height: `${orbit.radius * 2}vw`,
        maxWidth: `${orbit.radius * 2 * 8}px`,
        maxHeight: `${orbit.radius * 2 * 8}px`,
      }}
      animate={{ rotate: orbit.dir === 1 ? [0, 360] : [360, 0] }}
      transition={{ duration: orbit.dur, repeat: Infinity, ease: 'linear' }}
      aria-hidden
    >
      {/* the ring stroke (SVG circle for crisp dashed line) */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke={orbit.stroke}
          strokeWidth={0.2}
          strokeDasharray="1.5 1.5"
        />
      </svg>

      {/* chips placed on the ring at their angles */}
      {orbit.chips.map((chip, i) => {
        const rad = (chip.angle * Math.PI) / 180
        const x = Math.round((50 + Math.cos(rad) * 49) * 1000) / 1000
        const y = Math.round((50 + Math.sin(rad) * 49) * 1000) / 1000
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {/* counter-rotate to keep upright */}
            <motion.div
              animate={{
                rotate: orbit.dir === 1 ? [0, -360] : [-360, 0],
              }}
              transition={{
                duration: orbit.dur,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div
                className="flex items-center gap-1.5 rounded-lg border bg-[#1A1A1A]/80 px-2 py-1 backdrop-blur-md"
                style={{
                  borderColor: 'rgba(6,182,212,0.5)',
                  boxShadow: '0 0 14px rgba(6,182,212,0.3)',
                }}
              >
                <chip.Icon className="h-3 w-3 text-[#67e8f9]" />
                {chip.label && (
                  <span className="wn-eyebrow text-[8px] font-medium text-white/85">
                    {chip.label}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        )
      })}
    </motion.div>
  )
}

/* ===================================================================
   SearchPathways — SVG arcs radiating from the sphere center,
   * representing search pathways connecting knowledge to discovery
   surfaces. Each arc draws in via strokeDashoffset and continuously
   flows (strokeDashoffset animating).
   =================================================================== */
type Pathway = {
  // path d-string in viewBox 100x100
  d: string
  dur: number
  delay: number
  width: number
}

const PATHWAYS: Pathway[] = [
  {
    d: 'M 50 50 Q 70 30, 88 18',
    dur: 18,
    delay: 0,
    width: 0.35,
  },
  {
    d: 'M 50 50 Q 80 50, 92 50',
    dur: 22,
    delay: 0.5,
    width: 0.3,
  },
  {
    d: 'M 50 50 Q 70 70, 88 82',
    dur: 20,
    delay: 1,
    width: 0.35,
  },
  {
    d: 'M 50 50 Q 30 30, 12 18',
    dur: 24,
    delay: 0.3,
    width: 0.3,
  },
  {
    d: 'M 50 50 Q 20 50, 8 50',
    dur: 19,
    delay: 0.8,
    width: 0.35,
  },
  {
    d: 'M 50 50 Q 30 70, 12 82',
    dur: 21,
    delay: 1.2,
    width: 0.3,
  },
]

function SearchPathways() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="pathway-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(6,182,212,0.85)" />
          <stop offset="100%" stopColor="rgba(103,232,249,0.4)" />
        </linearGradient>
      </defs>
      {PATHWAYS.map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          fill="none"
          stroke="url(#pathway-grad)"
          strokeWidth={p.width}
          strokeLinecap="round"
          strokeDasharray="2 4"
          initial={{ opacity: 0, pathLength: 0 }}
          whileInView={{ opacity: 1, pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.4,
            delay: 0.4 + i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
      {/* traveling particle along each pathway */}
      {PATHWAYS.map((p, i) => (
        <motion.circle
          key={`p-${i}`}
          r={0.6}
          fill="#a5f3fc"
          style={{ filter: 'drop-shadow(0 0 2px rgba(103,232,249,0.95))' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <animateMotion
            dur={`${p.dur}s`}
            repeatCount="indefinite"
            begin={`${p.delay}s`}
            path={p.d}
          />
        </motion.circle>
      ))}
    </svg>
  )
}

/* ===================================================================
   CursorGlow — section-level cursor-follow cyan lighting overlay.
   useMotionValue → useSpring → useTransform → useMotionTemplate
   radial-gradient, mix-blend-screen.
   =================================================================== */
function CursorGlow() {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 50, damping: 20 })
  const sy = useSpring(my, { stiffness: 50, damping: 20 })
  const lightX = useTransform(sx, [0, 1], ['25%', '75%'])
  const lightY = useTransform(sy, [0, 1], ['25%', '75%'])
  const grad = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(6,182,212,0.22), rgba(103,232,249,0.08) 30%, rgba(6,182,212,0) 60%)`

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
   EchoFinalCta — Section 10 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function EchoFinalCta() {
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
      {/* Ambient cyan glow behind the sphere */}
      <CyanAmbient />
      {/* Extra neon-cyan + electric-blue + deep-teal ambient layers */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[20%] h-[30vw] w-[30vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(103,232,249,0.18), rgba(103,232,249,0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.6,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[10%] bottom-[18%] h-[28vw] w-[28vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.18), rgba(59,130,246,0) 70%)',
          filter: 'blur(52px)',
        }}
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.18, 1] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[8%] bottom-[14%] h-[24vw] w-[24vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(14,116,144,0.22), rgba(14,116,144,0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.16, 1] }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.9,
        }}
      />

      {/* Energy sphere — large (size=90) with built-in cursor-follow
          lighting overlay via useMotionTemplate. */}
      <CyanEnergySphere size={90} />

      {/* Search pathway arcs radiating from the sphere center */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <SearchPathways />
      </div>

      {/* Orbiting discovery surface stream rings around the sphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {orbits.map((o, i) => (
          <OrbitRing key={i} orbit={o} />
        ))}
      </div>

      {/* Ember particles around the sphere */}
      <CyanEmberCanvas count={48} />

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
        {/* Eyebrow — (10) · Begin */}
        <div className="mb-7 flex justify-center">
          <CyanEyebrow number="10" label="Begin" />
        </div>

        {/* Headline — 2 lines, line 2 cyan gradient */}
        <h2
          className="text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>Become</MaskLine>
          <MaskLine delay={0.15}>
            <CyanGradientText>Visible Everywhere.</CyanGradientText>
          </MaskLine>
        </h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          {subheadline}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <CyanMagneticButton
            variant="primary"
            cursorLabel="Book"
            ariaLabel={primaryCtaLabel}
            onClick={() => {}}
          >
            <CalendarDays className="h-4 w-4" />
            {primaryCtaLabel}
          </CyanMagneticButton>
          <CyanMagneticButton
            variant="secondary"
            cursorLabel="Explore"
            ariaLabel={secondaryCtaLabel}
            onClick={() => {}}
          >
            {secondaryCtaLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </CyanMagneticButton>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-9"
        >
          <a
            href={`mailto:${contactEmail}`}
            className="text-sm text-white/50 transition-colors duration-300 hover:text-[#06B6D4]"
          >
            {contactEmail}
          </a>
        </motion.div>

        {/* Final micro-line — service number anchor */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#06B6D4]/60" />
          <span
            className="wn-eyebrow text-[10px] font-bold tracking-[0.3em] text-[#67e8f9]/80"
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              textShadow: '0 0 12px rgba(103,232,249,0.4)',
            }}
          >
            {serviceNumber}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#06B6D4]/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
