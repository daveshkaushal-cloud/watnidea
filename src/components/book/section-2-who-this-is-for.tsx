'use client'

/**
 * BookWhoThisIsFor — Section 2 of /book-strategy-call
 *
 * Editorial storytelling section with interactive audience cards.
 * Tells the visitor: "this is for serious operators."
 *
 * Composition:
 *   - BookingEyebrow (02) · WHO THIS IS FOR (brand red — umbrella)
 *   - Headline (MaskLine): "Built for Brands Ready to Move." (with the
 *     word "Move" rendered via ServiceGradientText in hype/brand red)
 *   - Subhead paragraph — who the strategy call serves.
 *   - 6 audience cards in a responsive grid (1-col mobile, 2-col sm,
 *     3-col lg). Each card uses ONE of the 6 service colors via
 *     ServiceColorDot + ServiceAmbient (hover). Each card has a
 *     hover-reveal that expands 2-3 bullet points of what that
 *     audience gets out of the call.
 *
 * Color discipline: section eyebrow = brand red (umbrella). Individual
 * audience cards each use their own service color (aura/digital/hype/
 * growth/cinema/echo).
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Hover reveals via AnimatePresence + variants.
 */

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  ArrowUpRight,
  Building2,
  Flag,
  Layers,
  Rocket,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import {
  WORK_COLORS,
  ServiceAmbient,
  ServiceColorDot,
  ServiceGradientText,
  BookingEyebrow,
  MaskLine,
  useCursorParallax,
  type ServiceColorKey,
} from '@/components/book/shared'

/* ===================================================================
   6 audience cards — one per service color.
   =================================================================== */
type Audience = {
  n: string
  name: string
  descriptor: string
  color: ServiceColorKey
  Icon: LucideIcon
  bullets: string[]
}

const audiences: Audience[] = [
  {
    n: '01',
    name: 'Founders',
    descriptor:
      'Building something from zero. You need a system, not a tactic.',
    color: 'aura',
    Icon: Flag,
    bullets: [
      'A category position that survives the launch wave',
      'A brand system that scales with you, not against you',
      'A 90-day roadmap that prioritises ruthlessly',
    ],
  },
  {
    n: '02',
    name: 'Growing Businesses',
    descriptor:
      'Past product-market fit. Now scaling brand, funnel, and demand.',
    color: 'digital',
    Icon: Building2,
    bullets: [
      'Where your funnel actually leaks (and what fixes it)',
      'A website engineered as a 24/7 sales engine',
      'A demand system that compounds month over month',
    ],
  },
  {
    n: '03',
    name: 'Creators',
    descriptor:
      'Turning audience into enterprise. You need infrastructure for influence.',
    color: 'hype',
    Icon: Sparkles,
    bullets: [
      'A brand that lives beyond the algorithm',
      'Monetisation paths that do not depend on views',
      'A content-to-commerce architecture',
    ],
  },
  {
    n: '04',
    name: 'Startups',
    descriptor:
      'Pre-launch or post-raise. You need a category-defining launch.',
    color: 'growth',
    Icon: Rocket,
    bullets: [
      'A launch narrative investors and customers repeat',
      'Paid + organic channels sequenced for momentum',
      'A measurement stack that proves ROI from day one',
    ],
  },
  {
    n: '05',
    name: 'Established Brands',
    descriptor:
      'Reigniting relevance. The market moved — you need to move faster.',
    color: 'cinema',
    Icon: Layers,
    bullets: [
      'A relevance audit across identity, content, and channels',
      'A modern brand expression without losing equity',
      'A motion + AI creative engine to keep pace',
    ],
  },
  {
    n: '06',
    name: 'Scale-Ups',
    descriptor:
      'Multi-channel, multi-market. You need compounding systems, not one-off campaigns.',
    color: 'echo',
    Icon: TrendingUp,
    bullets: [
      'A visibility stack across search, social, and AI surfaces',
      'Content systems that compound authority over time',
      'A channel architecture built for multi-market scale',
    ],
  },
]

/* ===================================================================
   AudienceCard — a single interactive audience card.
   Shows number, icon, name, descriptor by default. On hover, expands
   to reveal 2-3 bullet points of what that audience gets from the
   call. ServiceAmbient tinted to the card's color shows on hover.
   =================================================================== */
function AudienceCard({ a, index }: { a: Audience; index: number }) {
  const [hovered, setHovered] = useState(false)
  const c = WORK_COLORS[a.color]

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.08, 0.5),
        ease: [0.16, 1, 0.3, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 sm:p-6"
      data-cursor="View"
    >
      {/* Hover ambient (ServiceAmbient tinted to this card's color) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="ambient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0"
          >
            <ServiceAmbient color={a.color} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top hairline accent (service color) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${c.hex}, transparent)`,
          opacity: 0.65,
        }}
      />
      {/* Hover glow bloom in service color */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 80% at 50% 0%, ${c.glow}, transparent 60%)`,
        }}
      />

      {/* === Card content === */}
      <div className="relative z-10">
        {/* Top row — number + dot */}
        <div className="mb-5 flex items-center justify-between">
          <span
            className="text-xs font-bold text-white/30"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            ({a.n})
          </span>
          <ServiceColorDot color={a.color} size={10} />
        </div>

        {/* Icon + name */}
        <div className="mb-3 flex items-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg border"
            style={{
              background: `rgba(${c.rgb},0.10)`,
              borderColor: `rgba(${c.rgb},0.40)`,
              color: c.soft,
            }}
          >
            <a.Icon className="h-4 w-4" />
          </span>
          <h3
            className="text-xl font-bold text-white sm:text-2xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {a.name}
          </h3>
        </div>

        {/* Descriptor */}
        <p className="text-sm leading-relaxed text-white/55 sm:text-[15px]">
          {a.descriptor}
        </p>

        {/* Hover reveal — bullet points */}
        <AnimatePresence initial={false}>
          {hovered && (
            <motion.div
              key="bullets"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-4">
                {a.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[13px] leading-snug text-white/70"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        background: c.hex,
                        boxShadow: `0 0 6px ${c.hex}`,
                      }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer — "What you get" hint */}
        <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/35 transition-colors group-hover:text-white/55">
          <span>What you get</span>
          <ArrowUpRight
            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: c.soft }}
          />
        </div>
      </div>
    </motion.article>
  )
}

/* ===================================================================
   BookWhoThisIsFor — Section 2 named export
   =================================================================== */
export function BookWhoThisIsFor() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // subtle parallax on the heading block
  const headerY = useTransform(scrollYProgress, [0, 1], [40, -40])

  // mouse parallax on the grid (subtle)
  const { sx, sy, handlers } = useCursorParallax(80, 30)
  const gridX = useTransform(sx, [0, 1], [-6, 6])
  const gridY = useTransform(sy, [0, 1], [-4, 4])

  return (
    <section
      ref={ref}
      onPointerMove={handlers.move}
      onPointerLeave={handlers.leave}
      className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-32"
      aria-label="Who this is for"
    >
      {/* === Section ambient washes (brand red, multi-color subtle) === */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[6%] h-[50vw] w-[60vw] max-w-[680px] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0.04) 50%, rgba(229,57,53,0) 75%)',
          filter: 'blur(50px)',
        }}
        animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Multi-color peripheral blobs (3 of 6 colors, low intensity) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-6%] top-[30%] h-[24vw] w-[24vw] max-w-[280px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${WORK_COLORS.aura.glow}, rgba(245,158,11,0) 70%)`,
          filter: 'blur(44px)',
        }}
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-6%] bottom-[12%] h-[22vw] w-[22vw] max-w-[260px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${WORK_COLORS.echo.glow}, rgba(6,182,212,0) 70%)`,
          filter: 'blur(46px)',
        }}
        animate={{ opacity: [0.22, 0.45, 0.22], scale: [1, 1.12, 1] }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* === Header === */}
        <motion.div style={{ y: headerY }} className="max-w-3xl">
          <BookingEyebrow number="02" label="WHO THIS IS FOR" />
          <h2
            className="mt-6 text-4xl font-bold leading-[1.04] tracking-[-0.02em] sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine>
              <span className="text-white">Built for Brands </span>
            </MaskLine>
            <MaskLine delay={0.1}>
              <span className="text-white">Ready to </span>
              <ServiceGradientText color="hype">Move.</ServiceGradientText>
            </MaskLine>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            The strategy call is a working session — not a sales pitch.
            It serves operators who are building, scaling, or reigniting
            brands with serious intent. If any of these sound like you,
            the next 30 minutes are worth the calendar slot.
          </motion.p>
        </motion.div>

        {/* === Card grid === */}
        <motion.div
          style={{ x: gridX, y: gridY }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {audiences.map((a, i) => (
            <AudienceCard key={a.n} a={a} index={i} />
          ))}
        </motion.div>

        {/* === Footer note === */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 text-center text-xs text-white/45"
        >
          <span className="wn-eyebrow uppercase tracking-[0.22em]">
            Not sure where you fit?
          </span>
          <span className="text-white/35">·</span>
          <span className="text-white/55">
            Book the call — we will tell you in the first 5 minutes.
          </span>
        </motion.div>
      </div>
    </section>
  )
}
