'use client'

/**
 * GrowthFinalCta — Section 10 of /growth-alchemy
 *
 * Full-screen cinematic finale — a GIANT EMERALD GROWTH REACTOR CORE
 * with performance marketing chips orbiting around it, ember particles,
 * ambient lighting, and the WatNidea growth manifesto.
 *
 * Composition:
 *   - Full-screen (`min-h-[100svh]`) section.
 *   - Visual stack:
 *       • GreenAmbient emerald glow behind (slow pulse).
 *       • GreenEnergySphere (size=90, large) — 4-layer cursor-follow
 *         emerald sphere with dynamic lighting overlay.
 *       • OrbitingStreams — 3 SVG ring orbits with content chips
 *         (DollarSign, TrendingUp, Target, Users, Activity, Zap,
 *         BarChart, Gauge) traveling along them.
 *       • GreenEmberCanvas (count=48) — rising emerald/teal embers.
 *       • Dynamic cursor-follow emerald lighting overlay
 *         (useMotionValue → useSpring → useTransform → useMotionTemplate
 *         radial-gradient, mix-blend-screen) over the section background.
 *       • Bottom vignette for legibility.
 *   - Eyebrow: (10) · The Invitation (GreenEyebrow)
 *   - Headline (4 lines, MaskLine staggered):
 *       "Turn Clicks" / "Into Revenue." / "Build Growth." / "At Scale."
 *       — "Into Revenue." and "At Scale." in GreenGradientText.
 *   - Manifesto (verbatim, curly apostrophe in Let's).
 *   - CTAs: GreenMagneticButton primary "Book Strategy Call" + secondary
 *     "Explore Our Work".
 *   - Contact: hello@watnidea.com (mailto, hover emerald).
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
  Activity,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  DollarSign,
  Gauge,
  Target,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  GreenAmbient,
  GreenEmberCanvas,
  GreenEnergySphere,
  GreenEyebrow,
  GreenGradientText,
  GreenMagneticButton,
  MaskLine,
} from '@/components/growth/shared'

/* ===================================================================
   Verbatim copy (preserve every character — curly apostrophe in Let's).
   =================================================================== */
const manifesto =
  'Most agencies run ads. WatNidea builds growth practices — where every rupee has a path, every path has a metric, and every metric becomes visible. Let\u2019s build your growth engine.'
const primaryCtaLabel = 'Book Strategy Call'
const secondaryCtaLabel = 'Explore Our Work'
const contactEmail = 'hello@watnidea.com'
const metaItems = [
  'Creative Growth Agency',
  'Now accepting selected projects',
  'Now accepting selected projects',
]

/* ===================================================================
   Orbiting content streams — 3 SVG ring orbits with performance
   marketing chips traveling along them. Each ring rotates; chips
   counter-rotate to stay upright. Emerald gradient strokes.
   =================================================================== */
type OrbitChip = {
  Icon: LucideIcon
  // angle along the ring (degrees, 0 = right, 90 = bottom)
  angle: number
  // optional micro-label
  label?: string
}

type Orbit = {
  // viewport-relative radius (% of viewport min)
  radius: number
  // rotation duration (s)
  dur: number
  // direction: 1 = CW, -1 = CCW
  dir: 1 | -1
  // stroke color (emerald variants)
  stroke: string
  chips: OrbitChip[]
}

const orbits: Orbit[] = [
  {
    radius: 26,
    dur: 22,
    dir: 1,
    stroke: 'rgba(16,185,129,0.28)',
    chips: [
      { Icon: DollarSign, angle: 30, label: 'Funnels' },
      { Icon: TrendingUp, angle: 150, label: 'Attribution' },
      { Icon: Target, angle: 270, label: 'CRO' },
    ],
  },
  {
    radius: 34,
    dur: 28,
    dir: -1,
    stroke: 'rgba(110,231,183,0.22)',
    chips: [
      { Icon: Users, angle: 60, label: 'Audiences' },
      { Icon: Activity, angle: 200, label: 'live' },
      { Icon: Zap, angle: 320, label: 'Paid search' },
    ],
  },
  {
    radius: 42,
    dur: 34,
    dir: 1,
    stroke: 'rgba(4,120,87,0.3)',
    chips: [
      { Icon: BarChart3, angle: 90, label: 'Dashboards' },
      { Icon: Gauge, angle: 240, label: 'Scaling' },
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
                  borderColor: 'rgba(16,185,129,0.5)',
                  boxShadow: '0 0 14px rgba(16,185,129,0.3)',
                }}
              >
                <chip.Icon className="h-3 w-3 text-[#6ee7b7]" />
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
   CursorGlow — section-level cursor-follow emerald lighting overlay.
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
  const grad = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(16,185,129,0.2), rgba(110,231,183,0.08) 30%, rgba(16,185,129,0) 60%)`

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
   GrowthFinalCta — Section 10 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function GrowthFinalCta() {
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
      {/* Ambient emerald glow behind the sphere */}
      <GreenAmbient />
      {/* Extra neon-green ambient layers (Growth-specific) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[20%] h-[30vw] w-[30vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(110,231,183,0.18), rgba(110,231,183,0) 70%)',
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
            'radial-gradient(circle, rgba(4,120,87,0.22), rgba(4,120,87,0) 70%)',
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

      {/* Energy sphere — large (size=90) with built-in cursor-follow
          lighting overlay via useMotionTemplate. */}
      <GreenEnergySphere size={90} />

      {/* Orbiting content stream rings around the sphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {orbits.map((o, i) => (
          <OrbitRing key={i} orbit={o} />
        ))}
      </div>

      {/* Ember particles around the sphere */}
      <GreenEmberCanvas count={48} />

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
          <GreenEyebrow number="10" label="The Invitation" />
        </div>

        {/* Headline — 4 lines, line 2 + line 4 emerald gradient */}
        <h2
          className="text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>Turn Clicks</MaskLine>
          <MaskLine delay={0.1}>
            <GreenGradientText>Into Revenue.</GreenGradientText>
          </MaskLine>
          <MaskLine delay={0.2}>Build Growth.</MaskLine>
          <MaskLine delay={0.3}>
            <GreenGradientText>At Scale.</GreenGradientText>
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
          <GreenMagneticButton
            variant="primary"
            cursorLabel="Book"
            ariaLabel={primaryCtaLabel}
            onClick={() => {}}
          >
            <CalendarDays className="h-4 w-4" />
            {primaryCtaLabel}
          </GreenMagneticButton>
          <GreenMagneticButton
            variant="secondary"
            cursorLabel="Explore"
            ariaLabel={secondaryCtaLabel}
            onClick={() => {}}
          >
            {secondaryCtaLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </GreenMagneticButton>
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
            className="text-sm text-white/50 transition-colors duration-300 hover:text-[#10B981]"
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
              <span className="wn-eyebrow text-[10px] text-white/35">
                {item}
              </span>
              {i < metaItems.length - 1 && (
                <span className="text-[#10B981]/60">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
