'use client'

/**
 * BookWhyClients — Section 6 of /book-strategy-call
 *
 * PREMIUM STORYTELLING CARDS — 6 reasons founders choose WatNidea.
 * Each card is tinted to a different service color (so the multi-
 * color system is preserved: gold/blue/red/green/purple/cyan),
 * connected through the brand-red umbrella (BookingEyebrow +
 * BookingStickyRail).
 *
 * Composition:
 *   - BookingEyebrow: (06) · WHY US (brand red)
 *   - Headline (MaskLine): "Why Founders Choose WatNidea."
 *   - Subhead: partnership-philosophy line.
 *   - 6 premium storytelling cards in a 3-col grid (lg), 2-col (sm),
 *     1-col (mobile). Each card:
 *       • A large abstract visual area tinted to the card's color
 *         (motion graphic — orb + scanning grid + parallax movement).
 *       • Headline + body.
 *       • Hover expansion: card lifts, glow blooms, and a proof metric
 *         row reveals (e.g. "92% client retention" / "6.8× ROAS").
 *       • ServiceColorDot tag.
 *   - Cursor parallax on the whole card grid (useCursorParallax).
 *   - whileInView staggered reveal.
 *   - BookingStickyRail ("Why Us" / "Trust").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Subcomponents extracted so hooks aren't called
 * inside .map().
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  Boxes,
  Compass,
  Eye,
  TrendingUp,
  Wand2,
  Radar,
  type LucideIcon,
} from 'lucide-react'
import {
  WORK_COLORS,
  ServiceColorDot,
  BookingEyebrow,
  BookingStickyRail,
  MaskLine,
  useCursorParallax,
  type ServiceColorKey,
} from '@/components/book/shared'

/* ===================================================================
   Reasons — 6 reasons founders work with WatNidea, each tinted to a
   service color. Headlines + bodies verbatim from the spec.
   =================================================================== */
type Reason = {
  n: string
  headline: string
  body: string
  metric: string
  metricLabel: string
  color: ServiceColorKey
  icon: LucideIcon
}

const reasons: Reason[] = [
  {
    n: '01',
    headline: 'One System, Not Seven Vendors',
    body: 'Identity, website, content, ads, AI, SEO, growth — under one roof, compounding together.',
    metric: '7 in 1',
    metricLabel: 'Services, one team',
    color: 'hype',
    icon: Boxes,
  },
  {
    n: '02',
    headline: 'Strategy Before Tactics',
    body: 'We audit before we execute. Every move ties to a growth hypothesis.',
    metric: '90 days',
    metricLabel: 'Roadmap from call one',
    color: 'aura',
    icon: Compass,
  },
  {
    n: '03',
    headline: 'Built for Attention',
    body: 'We engineer brands that get noticed, remembered, and chosen.',
    metric: '+312%',
    metricLabel: 'Avg. conversion lift',
    color: 'digital',
    icon: Eye,
  },
  {
    n: '04',
    headline: 'Compounding Growth',
    body: 'Our systems are designed to get stronger every quarter, not just deliver this month.',
    metric: '6.8×',
    metricLabel: 'Blended ROAS',
    color: 'growth',
    icon: TrendingUp,
  },
  {
    n: '05',
    headline: 'Creative + Analytical',
    body: 'Cinematic craft meets performance rigor. Beauty that converts.',
    metric: '40 / wk',
    metricLabel: 'Ad variants shipped',
    color: 'cinema',
    icon: Wand2,
  },
  {
    n: '06',
    headline: 'Visible Everywhere',
    body: 'SEO, AEO, and content systems that put you in the answer, not just the results.',
    metric: '+340%',
    metricLabel: 'Organic visibility',
    color: 'echo',
    icon: Radar,
  },
]

/* ===================================================================
   CardVisual — abstract motion graphic tinted to the card's color.
   Each visual is a "reason orb": a slow-pulsing gradient blob +
   perspective grid + orbiting dot. No two cards look identical
   because the color tints the whole composition.
   =================================================================== */
function CardVisual({
  color,
  icon: Icon,
  index,
}: {
  color: ServiceColorKey
  icon: LucideIcon
  index: number
}) {
  const c = WORK_COLORS[color]
  // Each card gets a slightly different orbit tilt + duration so the
  // grid feels organic, not synchronized. Derived deterministically
  // from index (no Math.random in render — hydration safe).
  const dur = 14 + index * 2
  const tilt = index % 2 === 0 ? -8 : 6

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: '#080808' }}
      aria-hidden
    >
      {/* base tint */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${c.glow}, transparent 65%)`,
        }}
      />
      {/* perspective grid floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          transform: `perspective(280px) rotateX(60deg) translateZ(0) rotate(${tilt}deg)`,
          transformOrigin: 'bottom',
        }}
      />
      {/* slow-pulsing orb */}
      <motion.div
        className="absolute left-1/2 top-[38%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, ${c.soft}, ${c.hex} 50%, transparent 75%)`,
          filter: 'blur(14px)',
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
      />
      {/* orbit ring + dot */}
      <motion.div
        className="absolute left-1/2 top-[38%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: `${c.hex}33` }}
        animate={{ rotate: 360 }}
        transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
      >
        <span
          className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: c.soft,
            boxShadow: `0 0 8px ${c.glow}`,
          }}
        />
      </motion.div>
      {/* inner core */}
      <motion.div
        className="absolute left-1/2 top-[38%] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm"
        style={{
          borderColor: `${c.hex}55`,
          background: 'rgba(20,20,20,0.4)',
          boxShadow: `0 0 16px ${c.glow}, inset 0 0 8px ${c.glow}`,
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon className="h-4 w-4" style={{ color: c.soft }} />
      </motion.div>
      {/* corner number */}
      <span
        className="absolute left-3 top-3 text-xs font-bold"
        style={{ color: c.hex, fontFamily: 'var(--font-display), sans-serif' }}
      >
        ({String(index + 1).padStart(2, '0')})
      </span>
    </div>
  )
}

/* ===================================================================
   ReasonCard — single premium storytelling card.
   `parallaxX`/`parallaxY` are MotionValues passed from the parent so
   the whole grid tilts together with cursor position.
   =================================================================== */
function ReasonCard({
  r,
  index,
  parallaxX,
  parallaxY,
}: {
  r: Reason
  index: number
  parallaxX: MotionValue<number>
  parallaxY: MotionValue<number>
}) {
  const c = WORK_COLORS[r.color]
  return (
    <motion.article
      data-cursor={r.headline}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.09, 0.55),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      style={{ x: parallaxX, y: parallaxY }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl transition-colors duration-300 hover:border-white/20"
    >
      {/* service-color glow bloom on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, ${c.glow}, transparent 60%)`,
        }}
      />
      {/* top accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
        style={{
          background: `linear-gradient(to right, transparent, ${c.hex}, transparent)`,
        }}
      />

      {/* visual area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/8">
        <CardVisual color={r.color} icon={r.icon} index={index} />
      </div>

      {/* text content */}
      <div className="relative z-10 flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <ServiceColorDot color={r.color} size={9} />
          <span
            className="wn-eyebrow text-[9px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: c.soft }}
          >
            {c.name}
          </span>
        </div>
        <h3
          className="text-xl font-bold leading-tight text-white sm:text-2xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {r.headline}
        </h3>
        <p className="text-sm leading-relaxed text-white/60 sm:text-base">{r.body}</p>

        {/* proof metric row — reveals on hover */}
        <div className="mt-auto overflow-hidden border-t border-white/8 pt-4">
          <motion.div
            initial={false}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            className="flex items-baseline gap-2 transition-opacity duration-300 group-hover:opacity-100"
          >
            <span
              className="text-2xl font-bold sm:text-3xl"
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                color: c.soft,
                textShadow: `0 0 18px ${c.glow}`,
              }}
            >
              {r.metric}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
              {r.metricLabel}
            </span>
          </motion.div>
        </div>

        {/* bottom fill bar */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
          style={{
            background: `linear-gradient(to right, ${c.hex}, transparent)`,
          }}
        />
      </div>
    </motion.article>
  )
}

/* ===================================================================
   ReasonCardSlot — wraps ReasonCard and creates per-card parallax
   MotionValues (so each card drifts slightly differently with the
   cursor — staggered, not synchronized). Hooks declared at the top
   of this wrapper, so they're unconditional per-card.
   =================================================================== */
function ReasonCardSlot({
  r,
  index,
  sx,
  sy,
}: {
  r: Reason
  index: number
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  // each card drifts by ±(4..10)px depending on index — slight
  // staggering for an organic feel.
  const mag = 4 + (index % 3) * 2
  const parallaxX = useTransform(sx, [0, 1], [-mag, mag])
  const parallaxY = useTransform(sy, [0, 1], [-mag * 0.6, mag * 0.6])
  return <ReasonCard r={r} index={index} parallaxX={parallaxX} parallaxY={parallaxY} />
}

/* ===================================================================
   BookWhyClients — Section 6 named export.
   All hooks declared UNCONDITIONALLY at the top.
   =================================================================== */
export function BookWhyClients() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  // cursor parallax for the card grid — whole grid tilts together.
  const { sx, sy, handlers } = useCursorParallax(45, 18)

  return (
    <div
      ref={sectionRef}
      onPointerMove={handlers.move}
      onPointerLeave={handlers.leave}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <BookingStickyRail label="Why Us" caption="Trust" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient — multi-color wash from all 6 service colors */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {(['aura', 'digital', 'hype', 'growth', 'cinema', 'echo'] as ServiceColorKey[]).map(
              (key, i) => {
                const c = WORK_COLORS[key]
                const pos = [
                  { left: '8%', top: '12%' },
                  { right: '8%', top: '12%' },
                  { left: '12%', bottom: '15%' },
                  { right: '12%', bottom: '15%' },
                  { left: '40%', top: '8%' },
                  { right: '40%', bottom: '8%' },
                ][i]
                return (
                  <motion.div
                    key={key}
                    aria-hidden
                    className="absolute h-[22vw] w-[22vw] rounded-full"
                    style={{
                      ...pos,
                      background: `radial-gradient(circle, ${c.glow}, transparent 70%)`,
                      filter: 'blur(46px)',
                      opacity: 0.5,
                    }}
                    animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.12, 1] }}
                    transition={{
                      duration: 11 + i,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.4,
                    }}
                  />
                )
              }
            )}
          </div>

          {/* Header block */}
          <motion.div style={{ y: headerY }} className="relative z-10 mb-12 max-w-3xl">
            <BookingEyebrow number="06" label="WHY US" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Why Founders </MaskLine>
              <MaskLine delay={0.1}>
                <span className="bg-gradient-to-br from-[#ff6b63] to-[#E53935] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(229,57,53,0.45)]">
                  Choose WatNidea.
                </span>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              We don&apos;t sell deliverables. We partner on the system — strategy, craft,
              and compounding growth under one roof. Here&apos;s what that feels like in
              practice.
            </motion.p>
          </motion.div>

          {/* Card grid — 3 cols on lg, 2 on sm, 1 on mobile.
              Each card has its own slight cursor parallax drift. */}
          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {reasons.map((r, i) => (
              <ReasonCardSlot key={r.n} r={r} index={i} sx={sx} sy={sy} />
            ))}
          </div>

          {/* footer line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative z-10 mt-10 text-sm text-white/40"
          >
            Want the longer version? Read the{' '}
            <a
              href="/work"
              className="text-[#E53935] underline-offset-4 transition-colors duration-300 hover:text-[#ff6b63] hover:underline"
            >
              case studies
            </a>{' '}
            — every metric above comes from a real engagement.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
