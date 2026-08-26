'use client'

/**
 * SynthFinalCta — Section 10 of /synthetic-cinema
 *
 * Full-screen cinematic finale — a GIANT PURPLE CREATIVE REACTOR CORE
 * with generated-world chips orbiting around it, ember particles,
 * ambient lighting, and the Synthetic Cinema manifesto.
 *
 * Composition:
 *   - Full-screen (`min-h-[100svh]`) section.
 *   - Visual stack:
 *       • PurpleAmbient purple glow behind (slow pulse).
 *       • PurpleEnergySphere (size=90, large) — 4-layer cursor-follow
 *         purple sphere with dynamic lighting overlay.
 *       • OrbitingStreams — 3 SVG ring orbits with generated-world
 *         chips (Film, Clapperboard, Camera, Video, Sparkles, Wand2,
 *         Image, Aperture) traveling along them.
 *       • PurpleEmberCanvas (count=48) — rising purple/violet/magenta
 *         embers.
 *       • Dynamic cursor-follow purple lighting overlay
 *         (useMotionValue → useSpring → useTransform → useMotionTemplate
 *         radial-gradient, mix-blend-screen) over the section background.
 *       • Bottom vignette for legibility.
 *   - Eyebrow: (10) · The Invitation (PurpleEyebrow)
 *   - Headline (4 lines, MaskLine staggered, font-editorial):
 *       "Concepts Visualised." / "Variations Explored." /
 *       "Imagination," / "Directed." — lines 1, 2, 4 in
 *       PurpleGradientText. Honest framing — AI visualises and varies,
 *       humans direct.
 *   - Manifesto (curly apostrophe in Let's): honest tone — AI
 *     accelerates concepting / variations / visualisation under human
 *     direction, editing and commercial-rights review.
 *   - CTAs: PurpleMagneticButton primary "Book Strategy Call" →
 *     /book-strategy-call + secondary "Explore Our Work" → /work.
 *     Real client-side navigation (no href="#", no no-op onClick).
 *   - Contact: hello@watnidea.com (mailto, hover purple).
 *   - Meta row: "Creative Growth Agency · Now accepting selected projects ·
 *     Now accepting selected projects".
 *   - Scroll parallax: useScroll on section → contentY/contentOpacity.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from 'framer-motion'
import {
  Aperture,
  ArrowUpRight,
  CalendarDays,
  Camera,
  Clapperboard,
  Film,
  Image as ImageIcon,
  Sparkles,
  Video,
  Wand2,
  type LucideIcon,
} from 'lucide-react'
import {
  PurpleAmbient,
  PurpleEmberCanvas,
  PurpleEnergySphere,
  PurpleEyebrow,
  PurpleGradientText,
  PurpleMagneticButton,
  MaskLine,
} from '@/components/synthetic/shared'

/* ===================================================================
   Honest, confident copy (curly apostrophe in Let's).
   AI accelerates concepting, variations and visualisation — always
   under human creative direction, editing and commercial-rights
   review. No "removes every constraint" / "speed of thought" language.
   =================================================================== */
const manifesto =
  'Traditional production is slow and expensive. Synthetic Cinema uses AI to accelerate concepting, variations and visualisation — always under human creative direction, editing and commercial-rights review. Let\u2019s build your next concept.'
const primaryCtaLabel = 'Book Strategy Call'
const primaryCtaHref = '/book-strategy-call'
const secondaryCtaLabel = 'Explore Our Work'
const secondaryCtaHref = '/work'
const contactEmail = 'hello@watnidea.com'
const metaItems = [
  'Creative Growth Agency',
  'Now accepting selected projects',
  'Now accepting selected projects',
]

/* ===================================================================
   Orbiting generated-world streams — 3 SVG ring orbits with chips
   traveling along them. Each ring rotates; chips counter-rotate
   to stay upright. Purple gradient strokes.
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
  // stroke color (purple variants)
  stroke: string
  chips: OrbitChip[]
}

const orbits: Orbit[] = [
  {
    radius: 26,
    dur: 22,
    dir: 1,
    stroke: 'rgba(139,92,246,0.32)',
    chips: [
      { Icon: Film, angle: 30, label: 'Scene 01' },
      { Icon: Clapperboard, angle: 150, label: 'Take 12' },
      { Icon: Camera, angle: 270, label: '4K' },
    ],
  },
  {
    radius: 34,
    dur: 28,
    dir: -1,
    stroke: 'rgba(167,139,250,0.26)',
    chips: [
      { Icon: Video, angle: 60, label: '24fps' },
      { Icon: Sparkles, angle: 200, label: 'GEN v3' },
      { Icon: Wand2, angle: 320, label: 'prompt' },
    ],
  },
  {
    radius: 42,
    dur: 34,
    dir: 1,
    stroke: 'rgba(217,70,239,0.24)',
    chips: [
      { Icon: ImageIcon, angle: 90, label: 'render' },
      { Icon: Aperture, angle: 240, label: 'grade' },
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
                  borderColor: 'rgba(139,92,246,0.55)',
                  boxShadow: '0 0 14px rgba(139,92,246,0.3)',
                }}
              >
                <chip.Icon className="h-3 w-3 text-[#a78bfa]" />
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
   CursorGlow — section-level cursor-follow purple lighting overlay.
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
  const grad = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(139,92,246,0.22), rgba(217,70,239,0.1) 30%, rgba(139,92,246,0) 60%)`

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
   SynthFinalCta — Section 10 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function SynthFinalCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const router = useRouter()

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
      {/* Ambient purple glow behind the sphere */}
      <PurpleAmbient />
      {/* Extra magenta + violet ambient layers (Synthetic-specific) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[20%] h-[30vw] w-[30vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(217,70,239,0.18), rgba(217,70,239,0) 70%)',
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
            'radial-gradient(circle, rgba(167,139,250,0.22), rgba(167,139,250,0) 70%)',
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
      {/* subtle red ambient (brand accent, SPARINGLY per spec) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[44%] top-[8%] h-[14vw] w-[14vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0) 70%)',
          filter: 'blur(48px)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Energy sphere — large (size=90) with built-in cursor-follow
          lighting overlay via useMotionTemplate. */}
      <PurpleEnergySphere size={90} />

      {/* Orbiting generated-world stream rings around the sphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {orbits.map((o, i) => (
          <OrbitRing key={i} orbit={o} />
        ))}
      </div>

      {/* Ember particles around the sphere */}
      <PurpleEmberCanvas count={48} />

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
          <PurpleEyebrow number="10" label="The Invitation" />
        </div>

        {/* Headline — 4 lines (font-editorial). Lines 1, 2, 4 purple gradient.
            Honest framing: AI visualises concepts + explores variations,
            under human direction. */}
        <h2 className="font-editorial text-6xl font-semibold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl">
          <MaskLine>
            <PurpleGradientText>Concepts Visualised.</PurpleGradientText>
          </MaskLine>
          <MaskLine delay={0.1}>
            <PurpleGradientText>Variations Explored.</PurpleGradientText>
          </MaskLine>
          <MaskLine delay={0.2}>Imagination,</MaskLine>
          <MaskLine delay={0.3}>
            <PurpleGradientText>Directed.</PurpleGradientText>
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
          <PurpleMagneticButton
            variant="primary"
            cursorLabel="Book"
            ariaLabel={primaryCtaLabel}
            onClick={() => router.push(primaryCtaHref)}
          >
            <CalendarDays className="h-4 w-4" />
            {primaryCtaLabel}
          </PurpleMagneticButton>
          <PurpleMagneticButton
            variant="secondary"
            cursorLabel="Explore"
            ariaLabel={secondaryCtaLabel}
            onClick={() => router.push(secondaryCtaHref)}
          >
            {secondaryCtaLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </PurpleMagneticButton>
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
            className="text-sm text-white/50 transition-colors duration-300 hover:text-[#8B5CF6]"
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
                <span className="text-[#8B5CF6]/60">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
