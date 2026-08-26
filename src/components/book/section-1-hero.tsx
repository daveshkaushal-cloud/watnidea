'use client'

/**
 * BookHero — Section 1 of /book-strategy-call
 *
 * Full-screen cinematic introduction. The beginning of a growth journey.
 *
 * Composition:
 *   - BookingEyebrow (01) · BOOK • STRATEGY CALL (brand red — umbrella)
 *   - Headline (MaskLine): "Book a " + MultiColorGradientText "Strategy" +
 *     " Call." — the word "Strategy" cycles through ALL 6 service colors
 *     (gold → blue → red → green → purple → cyan) to telegraph that the
 *     call is the umbrella conversion surface over all seven services.
 *   - Subheadline (verbatim): "A 30-minute working session — not a
 *     sales pitch. We audit your brand, map your growth surface, and
 *     show you exactly where attention is leaking."
 *   - Sub-note (verbatim): "30 min · No deck · Just signal"
 *   - CTAs: BookingMagneticButton primary "Book Strategy Call" +
 *     secondary "Explore Our Work"
 *   - Meta strip at bottom: Creative Growth Agency · Est. 2024 — Studio
 *     Namma · Now accepting selected projects
 *
 * Visual centerpiece:
 *   - <ConvergenceSphere size={80} /> behind/around the headline — all
 *     6 service colors flowing into a single white-hot identity core.
 *   - 7 orbiting service-name labels (Identity, Website, Content, Ads,
 *     AI, SEO, Growth) circling the convergence sphere on a slow
 *     rotating ring. Each label uses its corresponding service color.
 *   - <MultiColorEmberCanvas count={50} /> ambient rising embers.
 *   - Cursor parallax on headline + orbiting labels.
 *   - Scroll indicator at bottom (animated "SCROLL" + chevron).
 *
 * Color service: the page's umbrella color is brand red — section
 * eyebrow + primary CTA use brand red. The headline accent + orbiting
 * labels + ambient + embers are multi-color (all 6 service colors).
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Canvas helpers use the HMR-safe __cleanup pattern.
 * prefers-reduced-motion guard on the canvas (handled internally).
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from 'framer-motion'
import {
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  ChevronDown,
  Globe,
  Megaphone,
  PenTool,
  Search,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import {
  WORK_COLORS,
  WORK_COLOR_LIST,
  ConvergenceSphere,
  MultiColorEmberCanvas,
  BookingEyebrow,
  BookingMagneticButton,
  MaskLine,
  useCursorParallax,
} from '@/components/book/shared'

/* ===================================================================
   7 orbiting service-name labels.
   Position on the ring is computed at render — each label gets an
   angle (i/7 * 360deg), an icon, a service-color key, and the verbatim
   label text.
   =================================================================== */
type OrbitLabel = {
  label: string
  color: keyof typeof WORK_COLORS
  Icon: LucideIcon
}

const orbitLabels: OrbitLabel[] = [
  { label: 'Identity', color: 'aura', Icon: PenTool },
  { label: 'Website', color: 'digital', Icon: Globe },
  { label: 'Content', color: 'hype', Icon: Sparkles },
  { label: 'Ads', color: 'growth', Icon: Megaphone },
  { label: 'AI', color: 'cinema', Icon: BrainCircuit },
  { label: 'SEO', color: 'echo', Icon: Search },
  { label: 'Growth', color: 'hype', Icon: TrendingUp },
]

/* ===================================================================
   MultiColorGradientText — inline helper for the hero headline accent.
   Renders a span whose background is a linear-gradient cycling through
   ALL 6 service colors, clipped to text. Slow animated background-
   position sweep so the colors drift across the word.
   =================================================================== */
function MultiColorGradientText({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  // build a single linear-gradient stop list from the 6 service colors
  const stops = WORK_COLOR_LIST.map(
    (c, i) => `${c.hex} ${(i / (WORK_COLOR_LIST.length - 1)) * 100}%`
  ).join(', ')
  return (
    <motion.span
      className={`relative inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${stops})`,
        backgroundSize: '300% 100%',
        filter: 'drop-shadow(0 0 28px rgba(229,57,53,0.25))',
      }}
      animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.span>
  )
}

/* ===================================================================
   OrbitRing — the slow-rotating ring of 7 service-name labels.
   Each label counter-rotates so its text stays upright while the
   parent ring rotates. Accepts sx/sy for cursor parallax.
   =================================================================== */
function OrbitRing({
  sx,
  sy,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  // ring radius (in % of the parent) — labels sit at 38% from center
  const R = 38
  // pre-compute label positions (angles in radians, i/7 * 2π)
  const positions = orbitLabels.map((_, i) => {
    const angle = (i / orbitLabels.length) * Math.PI * 2 - Math.PI / 2
    const x = Math.round((50 + Math.cos(angle) * R) * 1000) / 1000
    const y = Math.round((50 + Math.sin(angle) * R) * 1000) / 1000
    return { x, y }
  })

  // ring rotation driver — slow continuous spin (40s)
  // (declared unconditionally at top)
  const ringRotate = useTransform(sx, [0, 1], [-3, 3]) // subtle tilt w/ cursor

  return (
    <motion.div
      style={{ rotate: ringRotate }}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      {/* the rotating ring container */}
      <motion.div
        className="relative h-[min(76vw,560px)] w-[min(76vw,560px)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {/* the faint guide ring */}
        <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[8%] rounded-full border border-white/[0.04]" />

        {/* 7 labels — each is positioned absolutely + counter-rotates */}
        {orbitLabels.map((lbl, i) => {
          const pos = positions[i]
          const c = WORK_COLORS[lbl.color]
          return (
            <motion.div
              key={lbl.label + i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              {/* counter-rotate so text stays upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="flex items-center gap-1.5 rounded-full border bg-[#1A1A1A]/80 px-2.5 py-1 backdrop-blur-md"
                style={{
                  borderColor: `rgba(${c.rgb},0.45)`,
                  boxShadow: `0 0 16px ${c.glow}`,
                }}
              >
                <lbl.Icon className="h-3 w-3" style={{ color: c.soft }} />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: c.soft }}
                >
                  {lbl.label}
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: c.hex,
                    boxShadow: `0 0 6px ${c.hex}`,
                  }}
                />
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   CursorGlow — dynamic cursor-follow multi-color lighting overlay.
   Uses useMotionValue → useSpring → useMotionTemplate to compose a
   radial-gradient that follows the cursor and is tinted toward brand
   red (unifying umbrella color).
   =================================================================== */
function CursorGlow({
  sx,
  sy,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  const px = useTransform(sx, [0, 1], ['0%', '100%'])
  const py = useTransform(sy, [0, 1], ['0%', '100%'])
  const bg = useMotionTemplate`radial-gradient(640px circle at ${px} ${py}, rgba(229,57,53,0.12), rgba(229,57,53,0) 60%)`
  return (
    <motion.div
      aria-hidden
      style={{ background: bg }}
      className="pointer-events-none absolute inset-0 mix-blend-screen"
    />
  )
}

/* ===================================================================
   BookHero — Section 1 named export
   =================================================================== */
export function BookHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // scroll parallax — content fades + lifts as you scroll past
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [0, -160])
  // convergence sphere drifts opposite (parallax depth)
  const sphereY = useTransform(scrollYProgress, [0, 1], [0, 60])

  // mouse-reactive parallax (declared unconditionally at top)
  const { sx, sy, handlers } = useCursorParallax(60, 20)

  // verbatim copy
  const headline = 'Book a Strategy Call.'
  const sub =
    'A 30-minute working session — not a sales pitch. We audit your brand, map your growth surface, and show you exactly where attention is leaking.'
  const subNote = '30 min · No deck · Just signal'
  const metaItems = [
    'Creative Growth Agency',
    'Now accepting selected projects',
    'Now accepting selected projects',
  ]

  return (
    <section
      ref={ref}
      onPointerMove={handlers.move}
      onPointerLeave={handlers.leave}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-24 pt-28 sm:px-8 md:pt-32"
      aria-label="Book a Strategy Call — Hero"
    >
      {/* === Visual centerpiece: convergence sphere + orbit ring + embers === */}
      {/* Convergence sphere (absolute inset-0, self-contained cursor-follow) */}
      <motion.div
        aria-hidden
        style={{ y: sphereY }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <ConvergenceSphere size={80} />
      </motion.div>

      {/* Orbit ring of 7 service-name labels */}
      <motion.div
        aria-hidden
        style={{ y: sphereY }}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      >
        <OrbitRing sx={sx} sy={sy} />
      </motion.div>

      {/* Multi-color rising embers across the hero */}
      <MultiColorEmberCanvas count={50} />

      {/* Cursor-follow brand-red lighting overlay */}
      <CursorGlow sx={sx} sy={sy} />

      {/* === CONTENT === */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-40 mx-auto w-full max-w-7xl"
      >
        {/* Eyebrow — (01) · BOOK • STRATEGY CALL */}
        <motion.div style={{ y: eyebrowY }}>
          <BookingEyebrow number="01" label="BOOK • STRATEGY CALL" />
        </motion.div>

        {/* Massive headline — single line with multi-color "Strategy" */}
        <h2
          className="mt-7 text-5xl font-bold leading-[0.94] tracking-[-0.02em] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">
              Book a{' '}
              <MultiColorGradientText>Strategy</MultiColorGradientText>
              <span className="text-white"> Call.</span>
            </span>
          </MaskLine>
        </h2>

        {/* Subheadline (verbatim) */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          {sub}
        </motion.p>

        {/* Sub-note (verbatim) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex items-center gap-3"
        >
          <span
            className="h-px w-10 bg-gradient-to-r from-[#E53935]/80 to-transparent"
            aria-hidden
          />
          <span className="wn-eyebrow text-[11px] font-medium uppercase tracking-[0.22em] text-[#E53935] sm:text-xs">
            {subNote}
          </span>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <BookingMagneticButton
            variant="primary"
            cursorLabel="Book"
            ariaLabel="Book Strategy Call"
            onClick={() => {
              if (typeof window !== 'undefined') {
                const el = document.getElementById('book-your-call')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <CalendarDays className="h-4 w-4" />
            Book Strategy Call
          </BookingMagneticButton>
          <BookingMagneticButton
            variant="secondary"
            cursorLabel="Work"
            ariaLabel="Explore Our Work"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/work'
              }
            }}
          >
            Explore Our Work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </BookingMagneticButton>

          {/* Inline proof — 6-color dot stack + caption */}
          <div className="ml-0 hidden items-center gap-3 sm:ml-4 lg:flex">
            <div className="flex -space-x-1.5">
              {WORK_COLOR_LIST.map((c) => (
                <span
                  key={c.key}
                  className="h-3.5 w-3.5 rounded-full border-2 border-[#141414]"
                  style={{ background: c.hex, boxShadow: `0 0 8px ${c.glow}` }}
                />
              ))}
            </div>
            <div className="text-xs leading-tight text-white/55">
              <span className="font-semibold text-white">7 services</span>
              <br />
              <span className="text-white/40">one 30-minute call</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* === Meta strip at bottom === */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/40 sm:gap-3 sm:text-[11px]"
      >
        {metaItems.map((m, i) => (
          <span key={m} className="flex items-center gap-2 sm:gap-3">
            <span className="whitespace-nowrap">{m}</span>
            {i < metaItems.length - 1 && (
              <span
                aria-hidden
                className="h-1 w-1 rounded-full bg-[#E53935]/70"
              />
            )}
          </span>
        ))}
      </motion.div>

      {/* === Scroll indicator === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-20 right-6 z-40 hidden flex-col items-center gap-2 text-white/40 lg:flex"
      >
        <span className="wn-eyebrow text-[10px] font-medium [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.span
          aria-hidden
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4 text-[#E53935]" />
        </motion.span>
      </motion.div>

      {/* === Side label — vertical (lg only) === */}
      <div
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.4em] text-white/30 lg:block"
        aria-hidden
      >
        Book
      </div>
    </section>
  )
}
