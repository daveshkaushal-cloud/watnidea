'use client'

/**
 * KineticFinalCta — Section 10 of /kinetic-studio
 *
 * CINEMATIC FINALE — "Let's Create Something Worth Watching."
 * A giant cinematic light source (OrangeEnergySphere) with film
 * frames orbiting around it. Orange + red energy trails.
 *
 * Composition:
 *   - Full-screen (`min-h-[100svh]`) section.
 *   - Visual stack:
 *       • OrangeAmbient layered glow behind (slow pulse).
 *       • OrangeEnergySphere (size=90, large) — 4-layer cursor-follow
 *         orange sphere with dynamic lighting overlay.
 *       • OrbitingFilmFrames — 6 glassmorphism film-frame cards
 *         with cinematic gradients, each rotating around the sphere
 *         on a different orbital path. Frames counter-rotate to
 *         stay "upright-ish" (cinematic, not literal).
 *       • EnergyTrailRings — 2-3 SVG ring paths with animated
 *         strokeDashoffset (trailing streaks around the sphere).
 *       • OrangeEmberCanvas (count=50) — rising orange/gold/red
 *         ember particles drifting upward.
 *       • CursorGlow — section-level dynamic orange+red lighting
 *         overlay (useMotionValue → useSpring → useTransform →
 *         useMotionTemplate radial-gradient, mix-blend-screen).
 *       • Bottom vignette for legibility.
 *   - Eyebrow: (10) · Begin (OrangeEyebrow)
 *   - Headline (3 lines, MaskLine staggered):
 *       "Let's Create Something" / "Worth Watching." (orange gradient)
 *   - Subheadline: "Most production houses make videos. We make
 *     stories that move people. Let's tell yours."
 *   - CTAs: OrangeMagneticButton primary "Book Strategy Call" +
 *     secondary "Watch Showreel".
 *   - Final micro-line: "Kinetic Studio — 04 / 07".
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
  Play,
} from 'lucide-react'
import {
  OrangeAmbient,
  OrangeEmberCanvas,
  OrangeEnergySphere,
  OrangeEyebrow,
  OrangeGradientText,
  OrangeMagneticButton,
  MaskLine,
} from '@/components/kinetic/shared'

/* ===================================================================
   Verbatim copy (preserve every character — curly apostrophes in
   "Let's" via \u2019 escapes).
   =================================================================== */
const subHeadline =
  'Most production houses make videos. We make stories that move people. Let\u2019s tell yours.'
const primaryCtaLabel = 'Book Strategy Call'
const secondaryCtaLabel = 'Watch Showreel'
const serviceTag = 'Kinetic Studio — 04 / 07'

/* ===================================================================
   Film frame content — 6 frames orbiting the sphere. Each frame is
   a small glassmorphism card with a cinematic gradient + film
   perforations on top + bottom edges.
   =================================================================== */
type FilmFrame = {
  // viewport-relative orbit radius (% of viewport min, before x2)
  radius: number
  // rotation duration (s)
  dur: number
  // direction: 1 = CW, -1 = CCW
  dir: 1 | -1
  // starting angle (degrees, 0 = right)
  angle: number
  // gradient fill for the "scene" inside the frame
  gradient: string
  // micro label
  label: string
  // frame aspect
  aspect: string
}

const filmFrames: FilmFrame[] = [
  {
    radius: 22,
    dur: 24,
    dir: 1,
    angle: 20,
    gradient:
      'radial-gradient(circle at 60% 40%, rgba(251,191,36,0.5), transparent 60%), linear-gradient(135deg, rgba(249,115,22,0.3), rgba(20,20,20,0.8))',
    label: 'BRAND FILM',
    aspect: '16/10',
  },
  {
    radius: 30,
    dur: 32,
    dir: -1,
    angle: 80,
    gradient:
      'radial-gradient(circle at 30% 70%, rgba(229,57,53,0.45), transparent 60%), linear-gradient(180deg, rgba(20,20,20,0.7), rgba(194,65,12,0.35))',
    label: 'PRODUCT',
    aspect: '4/5',
  },
  {
    radius: 38,
    dur: 40,
    dir: 1,
    angle: 140,
    gradient:
      'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.55), transparent 55%), linear-gradient(45deg, rgba(20,20,20,0.7), rgba(229,57,53,0.3))',
    label: 'DOC',
    aspect: '16/10',
  },
  {
    radius: 26,
    dur: 28,
    dir: -1,
    angle: 210,
    gradient:
      'radial-gradient(circle at 70% 30%, rgba(251,191,36,0.45), transparent 60%), linear-gradient(200deg, rgba(20,20,20,0.75), rgba(146,64,14,0.4))',
    label: 'REEL',
    aspect: '9/16',
  },
  {
    radius: 34,
    dur: 36,
    dir: 1,
    angle: 280,
    gradient:
      'radial-gradient(circle at 40% 60%, rgba(249,115,22,0.4), transparent 55%), linear-gradient(160deg, rgba(20,20,20,0.7), rgba(229,57,53,0.3))',
    label: 'BTS',
    aspect: '16/10',
  },
  {
    radius: 18,
    dur: 20,
    dir: -1,
    angle: 330,
    gradient:
      'radial-gradient(circle at 50% 50%, rgba(251,191,36,0.5), transparent 60%), linear-gradient(135deg, rgba(249,115,22,0.3), rgba(20,20,20,0.85))',
    label: 'SOCIAL',
    aspect: '4/5',
  },
]

/* ===================================================================
   FilmPerforations — top + bottom row of small holes to sell the
   "film strip" look on each frame.
   =================================================================== */
function FilmPerforations() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 flex h-1.5 items-center justify-around bg-[#262626]/90"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="h-0.5 w-1 rounded-sm bg-white/30" />
        ))}
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 flex h-1.5 items-center justify-around bg-[#262626]/90"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="h-0.5 w-1 rounded-sm bg-white/30" />
        ))}
      </div>
    </>
  )
}

/* ===================================================================
   FilmFrameOrbit — single rotating orbit with one film frame card.
   The orbit container rotates; the frame counter-rotates to stay
   roughly upright.
   =================================================================== */
function FilmFrameOrbit({ frame }: { frame: FilmFrame }) {
  // place the frame at the given starting angle on the orbit ring
  const rad = (frame.angle * Math.PI) / 180
  const x = Math.round((50 + Math.cos(rad) * 49) * 1000) / 1000
  const y = Math.round((50 + Math.sin(rad) * 49) * 1000) / 1000

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: `${frame.radius * 2}vw`,
        height: `${frame.radius * 2}vw`,
        maxWidth: `${frame.radius * 2 * 9}px`,
        maxHeight: `${frame.radius * 2 * 9}px`,
      }}
      animate={{ rotate: frame.dir === 1 ? [0, 360] : [360, 0] }}
      transition={{ duration: frame.dur, repeat: Infinity, ease: 'linear' }}
      aria-hidden
    >
      {/* orbit ring (faint dashed) */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="rgba(249,115,22,0.18)"
          strokeWidth={0.18}
          strokeDasharray="1 1.5"
        />
      </svg>

      {/* the film frame card placed at the angle */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${x}%`, top: `${y}%` }}
      >
        {/* counter-rotate to keep upright */}
        <motion.div
          animate={{
            rotate: frame.dir === 1 ? [0, -360] : [-360, 0],
          }}
          transition={{
            duration: frame.dur,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div
            className="relative w-[clamp(54px,8vw,92px)] overflow-hidden rounded-md border bg-[#1A1A1A]/80 backdrop-blur-md"
            style={{
              aspectRatio: frame.aspect,
              borderColor: 'rgba(249,115,22,0.4)',
              boxShadow: '0 0 18px rgba(249,115,22,0.25)',
            }}
          >
            {/* "scene" gradient inside the frame */}
            <div
              className="absolute inset-0"
              style={{ background: frame.gradient }}
            />
            {/* film perforations top + bottom */}
            <FilmPerforations />
            {/* subtle scan grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)',
              }}
            />
            {/* micro label */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 wn-eyebrow text-[7px] font-bold tracking-[0.2em] text-white/70"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {frame.label}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ===================================================================
   EnergyTrailRings — 2-3 SVG rings with animated strokeDashoffset
   to create trailing orange/red energy streaks around the sphere.
   =================================================================== */
function EnergyTrailRings() {
  // pre-rounded dasharrays for hydration safety
  const dash1 = Math.round(220 * 1000) / 1000
  const gap1 = Math.round(140 * 1000) / 1000
  const dash2 = Math.round(160 * 1000) / 1000
  const gap2 = Math.round(180 * 1000) / 1000
  const dash3 = Math.round(110 * 1000) / 1000
  const gap3 = Math.round(220 * 1000) / 1000

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="trail-orange" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(249,115,22,0)" />
            <stop offset="40%" stopColor="rgba(249,115,22,0.55)" />
            <stop offset="70%" stopColor="rgba(251,191,36,0.75)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0)" />
          </linearGradient>
          <linearGradient id="trail-red" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(229,57,53,0)" />
            <stop offset="40%" stopColor="rgba(229,57,53,0.5)" />
            <stop offset="80%" stopColor="rgba(249,115,22,0.65)" />
            <stop offset="100%" stopColor="rgba(229,57,53,0)" />
          </linearGradient>
        </defs>

        {/* outer trail ring (CW) */}
        <motion.circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="url(#trail-orange)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeDasharray={`${dash1} ${gap1}`}
          animate={{ strokeDashoffset: [0, -360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 2px rgba(249,115,22,0.7))' }}
        />
        {/* middle trail ring (CCW) */}
        <motion.circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="url(#trail-red)"
          strokeWidth="0.4"
          strokeLinecap="round"
          strokeDasharray={`${dash2} ${gap2}`}
          animate={{ strokeDashoffset: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 2px rgba(229,57,53,0.7))' }}
        />
        {/* inner trail ring (CW) */}
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="url(#trail-orange)"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeDasharray={`${dash3} ${gap3}`}
          animate={{ strokeDashoffset: [0, -300] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 2px rgba(251,191,36,0.7))' }}
        />
      </svg>
    </div>
  )
}

/* ===================================================================
   CursorGlow — section-level cursor-follow orange lighting overlay.
   useMotionValue → useSpring → useTransform → useMotionTemplate
   radial-gradient (orange + warm red), mix-blend-screen.
   =================================================================== */
function CursorGlow() {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 50, damping: 20 })
  const sy = useSpring(my, { stiffness: 50, damping: 20 })
  const lightX = useTransform(sx, [0, 1], ['25%', '75%'])
  const lightY = useTransform(sy, [0, 1], ['25%', '75%'])
  const grad = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(249,115,22,0.22), rgba(251,191,36,0.08) 30%, rgba(229,57,53,0.05) 50%, rgba(249,115,22,0) 65%)`

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
   KineticFinalCta — Section 10 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function KineticFinalCta() {
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
      aria-label="Begin — Final CTA"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24"
    >
      {/* Ambient orange glow behind the sphere */}
      <OrangeAmbient />

      {/* Extra cinematic ambient layers */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[20%] h-[30vw] w-[30vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.18), rgba(229,57,53,0) 70%)',
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
            'radial-gradient(circle, rgba(251,191,36,0.16), rgba(251,191,36,0) 70%)',
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
      <OrangeEnergySphere size={90} />

      {/* Orbiting film frames around the sphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {filmFrames.map((frame, i) => (
          <FilmFrameOrbit key={i} frame={frame} />
        ))}
      </div>

      {/* Energy trail rings (orange + red streaks) */}
      <EnergyTrailRings />

      {/* Ember particles around the sphere */}
      <OrangeEmberCanvas count={50} />

      {/* Dynamic cursor-follow lighting overlay (section-level) */}
      <CursorGlow />

      {/* Bottom vignette for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(20,20,20,0.55) 80%, rgba(20,20,20,0.9) 100%)',
        }}
      />

      {/* === Content (centered, z-10, max-w-4xl) === */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-4xl text-center"
      >
        {/* Eyebrow — (10) · Begin */}
        <div className="mb-7 flex justify-center">
          <OrangeEyebrow number="10" label="Begin" />
        </div>

        {/* Headline — 2 lines, line 2 orange gradient */}
        <h2
          className="text-5xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>Let’s Create Something</MaskLine>
          <MaskLine delay={0.15}>
            <OrangeGradientText>Worth Watching.</OrangeGradientText>
          </MaskLine>
        </h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          {subHeadline}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <OrangeMagneticButton
            variant="primary"
            cursorLabel="Book"
            ariaLabel={primaryCtaLabel}
            onClick={() => {}}
          >
            <CalendarDays className="h-4 w-4" />
            {primaryCtaLabel}
          </OrangeMagneticButton>
          <OrangeMagneticButton
            variant="secondary"
            cursorLabel="Watch"
            ariaLabel={secondaryCtaLabel}
            onClick={() => {}}
          >
            <Play className="h-4 w-4" fill="currentColor" />
            {secondaryCtaLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </OrangeMagneticButton>
        </motion.div>

        {/* Service tag — final micro-line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span
            className="h-px w-10 bg-gradient-to-r from-transparent to-[#F97316]/60"
            aria-hidden
          />
          <span
            className="wn-eyebrow text-[10px] font-medium uppercase tracking-[0.35em] text-white/45"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {serviceTag}
          </span>
          <span
            className="h-px w-10 bg-gradient-to-l from-transparent to-[#F97316]/60"
            aria-hidden
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
