'use client'

/**
 * HypeFinalCta — Section 10 of /the-hype-engine
 *
 * Full-screen cinematic finale — a GIANT RED SOCIAL ENERGY CORE with
 * content streams orbiting around it, ember particles, ambient lighting,
 * and the WatNidea manifesto.
 *
 * Composition:
 *   - Full-screen (`min-h-[100svh]`) section.
 *   - Visual stack:
 *       • AboutAmbient red glow behind (slow pulse).
 *       • EnergySphere (size=90, large) — 4-layer cursor-follow red
 *         sphere with dynamic lighting overlay.
 *       • OrbitingStreams — 3 SVG ring orbits with content chips
 *         (red/orange/pink gradients) traveling along them.
 *       • EmberCanvas (count=48) — rising red/orange embers.
 *       • Dynamic cursor-follow lighting overlay (useMotionValue →
 *         useSpring → useTransform → useMotionTemplate radial-gradient,
 *         mix-blend-screen) over the section background.
 *       • Bottom vignette for legibility.
 *   - Eyebrow: (10) · The Invitation
 *   - Headline (4 lines, MaskLine staggered):
 *       "We Engineer" / "Attention." / "We Build" / "Movements."
 *       — "Attention." and "Movements." in RedGradientText.
 *   - Manifesto (verbatim): "We don't just build brands. We engineer
 *     attention, create unforgettable experiences, and design growth
 *     systems that turn businesses into category leaders."
 *   - CTAs: MagneticButton primary "Book Strategy Call" + secondary
 *     "Explore Our Work".
 *   - Contact: hello@watnidea.com (mailto, hover red).
 *   - Meta row: "Creative Growth Agency · Now accepting selected projects ·
 *     Now accepting selected projects".
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
  ArrowUpRight,
  CalendarDays,
  Flame,
  Hash,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import MagneticButton from '@/components/hero/magnetic-button'
import {
  AboutAmbient,
  EmberCanvas,
  EnergySphere,
  MaskLine,
  RedGradientText,
  SectionEyebrow,
} from '@/components/about/shared'

/* ===================================================================
   Verbatim copy (preserve every character — curly apostrophe in don't).
   =================================================================== */
const manifesto =
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
   Orbiting content streams — 3 SVG ring orbits with content chips
   traveling along them. Each ring rotates; chips counter-rotate
   to stay upright. Red/orange/pink gradient strokes.
   =================================================================== */
type OrbitChip = {
  Icon: LucideIcon
  // angle along the ring (degrees, 0 = right, 90 = bottom)
  angle: number
  // accent
  hue: 'red' | 'orange' | 'pink'
  // optional micro-label
  label?: string
}

type Orbit = {
  // viewport-relative radius (% of min(w,h))
  radius: number
  // rotation duration (s)
  dur: number
  // direction: 1 = CW, -1 = CCW
  dir: 1 | -1
  // stroke color
  stroke: string
  chips: OrbitChip[]
}

const HUE_HEX: Record<OrbitChip['hue'], string> = {
  red: '#E53935',
  orange: '#F97316',
  pink: '#EC4899',
}

const HUE_RGB: Record<OrbitChip['hue'], string> = {
  red: '229,57,53',
  orange: '249,115,22',
  pink: '236,72,153',
}

const orbits: Orbit[] = [
  {
    radius: 26,
    dur: 22,
    dir: 1,
    stroke: 'rgba(229,57,53,0.28)',
    chips: [
      { Icon: Heart, angle: 30, hue: 'pink', label: '+1.2K' },
      { Icon: MessageCircle, angle: 150, hue: 'red', label: 'reply' },
      { Icon: TrendingUp, angle: 270, hue: 'orange', label: '+340%' },
    ],
  },
  {
    radius: 34,
    dur: 28,
    dir: -1,
    stroke: 'rgba(249,115,22,0.22)',
    chips: [
      { Icon: Share2, angle: 60, hue: 'orange', label: '284' },
      { Icon: Users, angle: 200, hue: 'red', label: '12K' },
      { Icon: Hash, angle: 320, hue: 'pink', label: '#hype' },
    ],
  },
  {
    radius: 42,
    dur: 34,
    dir: 1,
    stroke: 'rgba(236,72,153,0.2)',
    chips: [
      { Icon: Sparkles, angle: 90, hue: 'red', label: 'drop' },
      { Icon: Flame, angle: 240, hue: 'orange', label: 'fire' },
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
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
      >
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
        // position on a circle of radius 50% (the ring), centered at 50,50
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
                  borderColor: `rgba(${HUE_RGB[chip.hue]},0.5)`,
                  boxShadow: `0 0 14px rgba(${HUE_RGB[chip.hue]},0.3)`,
                }}
              >
                <chip.Icon
                  className="h-3 w-3"
                  style={{ color: HUE_HEX[chip.hue] }}
                />
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
   CursorGlow — section-level cursor-follow lighting overlay.
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
  const grad = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(229,57,53,0.18), rgba(249,115,22,0.08) 30%, rgba(229,57,53,0) 60%)`

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
   HypeFinalCta — Section 10 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function HypeFinalCta() {
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
      {/* Ambient red + orange + pink glow blobs behind the sphere */}
      <AboutAmbient />
      {/* Extra orange + pink ambient layers (Hype-specific) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[20%] h-[30vw] w-[30vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(249,115,22,0.18), rgba(249,115,22,0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[10%] bottom-[18%] h-[28vw] w-[28vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(236,72,153,0.16), rgba(236,72,153,0) 70%)',
          filter: 'blur(52px)',
        }}
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.18, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      />

      {/* Energy sphere — large (size=90) with built-in cursor-follow
          lighting overlay via useMotionTemplate. */}
      <EnergySphere size={90} />

      {/* Orbiting content stream rings around the sphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {orbits.map((o, i) => (
          <OrbitRing key={i} orbit={o} />
        ))}
      </div>

      {/* Ember particles around the sphere */}
      <EmberCanvas count={48} />

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
        {/* Eyebrow — (10) · The Invitation */}
        <div className="mb-7 flex justify-center">
          <SectionEyebrow number="10" label="The Invitation" />
        </div>

        {/* Headline — 4 lines, line 2 + line 4 red gradient */}
        <h2
          className="text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>We Engineer</MaskLine>
          <MaskLine delay={0.1}>
            <RedGradientText>Attention.</RedGradientText>
          </MaskLine>
          <MaskLine delay={0.2}>We Build</MaskLine>
          <MaskLine delay={0.3}>
            <RedGradientText>Movements.</RedGradientText>
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
          {manifesto}
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
