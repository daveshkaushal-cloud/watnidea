'use client'

/**
 * AboutWhyClients — Section 8
 * Why Clients Choose Us — premium storytelling cards + animated stats.
 *
 * Composition:
 *   - StickyRail (label: Why WatNidea, caption: Proof)
 *   - Eyebrow (09) + Why Clients Choose Us
 *   - Headline `Why Brands Choose Us` ("Choose" red gradient)
 *   - Animated stats row (4 stats, count-up on scroll-in):
 *       40+     / brands scaled in 2024
 *       ▲ 218%  / ROAS
 *       7       / services, one identity engine
 *       Q3 2025 / booking window
 *   - 3 floating glassmorphism cards (The Spark / The Catalyst / The
 *     Empire) with eyebrow + title + body, accent on Catalyst.
 *     Cards float on infinite y-loops (desynced) + hover lift + expand
 *     detail + MagneticButton CTA `Book a Strategy Call`.
 *   - Meta strip: Creative Growth Agency · Now accepting selected projects · Now accepting selected projects
 */

import { useRef, useState, useEffect, type ReactElement } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowUpRight,
  CalendarDays,
  Crown,
  Orbit,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import MagneticButton from '@/components/hero/magnetic-button'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from './shared'

/* ===================================================================
   Stats — 4 stats. Some count up; the date is static.
   =================================================================== */
type Stat = {
  prefix?: string
  target: number | null // null = static (no count-up)
  suffix?: string
  staticLabel?: string // when target is null, render this verbatim
  label: string
}

const stats: Stat[] = [
  {
    target: 7,
    label: 'specialist services',
  },
  {
    target: 1,
    label: 'unified creative team',
  },
  {
    target: null,
    staticLabel: 'Now',
    label: 'accepting selected projects',
  },
  {
    target: null,
    staticLabel: 'Honest',
    label: 'proof, not vanity metrics',
  },
]

/* ===================================================================
   useCountUp — animates 0 → target when `inView` becomes true.
   easeOutCubic; duration configurable.
   =================================================================== */
function useCountUp(target: number, inView: boolean, duration = 1.5) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  return val
}

/* ===================================================================
   StatItem — renders a single stat with count-up.
   Uses onViewportEnter to flip `inView` state once.
   =================================================================== */
function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const value = useCountUp(stat.target ?? 0, inView, 1.6)

  const display =
    stat.target === null
      ? (stat.staticLabel ?? '')
      : `${stat.prefix ?? ''}${value}${stat.suffix ?? ''}`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => setInView(true)}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex flex-col items-center text-center"
    >
      <span
        className="text-5xl font-bold leading-none sm:text-6xl"
        style={{
          fontFamily: 'var(--font-display), sans-serif',
          background:
            'linear-gradient(to bottom right, #ffffff, #b8b8b8 60%, #8a8a8a)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {display}
      </span>
      <span className="wn-eyebrow mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 sm:text-[11px]">
        {stat.label}
      </span>
      {/* hairline under stat */}
      <span
        aria-hidden
        className="mt-4 h-px w-10 bg-gradient-to-r from-transparent via-[#E53935]/60 to-transparent"
      />
    </motion.div>
  )
}

/* ===================================================================
   Tier cards — verbatim from pricing tier `expands` first line.
   =================================================================== */
type Tier = {
  eyebrow: string
  title: string
  body: string
  Icon: LucideIcon
  accent: boolean
  badge?: string
  floatDuration: number
  floatDelay: number
}

const tiers: Tier[] = [
  {
    eyebrow: 'The Spark',
    title: 'For Early-Stage Brands',
    body: 'Best for: early-stage brands finding their voice.',
    Icon: Zap,
    accent: false,
    floatDuration: 7,
    floatDelay: 0,
  },
  {
    eyebrow: 'The Catalyst',
    title: 'For Scaling Brands',
    body: 'Best for: brands ready to scale past 6–7 figures.',
    Icon: Orbit,
    accent: true,
    badge: 'Most Popular',
    floatDuration: 6,
    floatDelay: 0.8,
  },
  {
    eyebrow: 'The Empire',
    title: 'For Category Leaders',
    body: 'Best for: category leaders & funded scale-ups.',
    Icon: Crown,
    accent: false,
    floatDuration: 8,
    floatDelay: 0.4,
  },
]

/* ===================================================================
   TierCard — floating glass card with hover lift + expandable detail.
   Infinite float on outer wrapper; hover state drives scale + shadow.
   =================================================================== */
function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const { eyebrow, title, body, Icon, accent, badge, floatDuration, floatDelay } = tier
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      // outer wrapper carries the infinite float (independent of hover)
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: floatDuration,
        delay: floatDelay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="relative"
      style={{ zIndex: accent ? 20 : 10 }}
    >
      {/* badge above the highlighted card */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-gradient-to-r from-[#ff5a52] to-[#E53935] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_24px_rgba(229,57,53,0.55)]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {badge}
          </div>
        </motion.div>
      )}

      <motion.article
        data-cursor={eyebrow}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.9,
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
        animate={{
          scale: hovered ? (accent ? 1.06 : 1.03) : accent ? 1.04 : 1,
          y: hovered ? -6 : 0,
        }}
        style={{
          boxShadow: accent
            ? hovered
              ? '0 0 0 1px rgba(229,57,53,0.7), 0 24px 80px -20px rgba(229,57,53,0.55), 0 0 80px rgba(229,57,53,0.35), inset 0 0 24px rgba(229,57,53,0.18)'
              : '0 0 0 1px rgba(229,57,53,0.45), 0 16px 50px -20px rgba(229,57,53,0.35), 0 0 48px rgba(229,57,53,0.22), inset 0 0 18px rgba(229,57,53,0.1)'
            : hovered
              ? '0 0 0 1px rgba(229,57,53,0.45), 0 18px 60px -22px rgba(229,57,53,0.4), 0 0 36px rgba(229,57,53,0.18)'
              : '0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px -22px rgba(0,0,0,0.8)',
        }}
        className={
          'group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[1.75rem] p-7 backdrop-blur-xl sm:p-8 ' +
          (accent
            ? 'border border-[#E53935]/45 bg-white/[0.08] '
            : 'border border-white/10 bg-white/[0.035] transition-colors duration-500 hover:border-[#E53935]/30 ')
        }
      >
        {/* top inner highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[1.75rem] bg-gradient-to-b from-white/10 to-transparent"
        />
        {/* radial red glow top-right */}
        <div
          aria-hidden
          className={
            'pointer-events-none absolute right-[-30%] top-[-30%] h-[60%] w-[60%] rounded-full transition-opacity duration-500 ' +
            (accent ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')
          }
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.45), rgba(229,57,53,0) 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* icon + eyebrow */}
        <div className="relative z-10 mb-6 flex items-center justify-between">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-300"
            style={{
              borderColor: accent ? 'rgba(229,57,53,0.4)' : 'rgba(255,255,255,0.12)',
              background: accent ? 'rgba(229,57,53,0.1)' : 'rgba(255,255,255,0.04)',
              color: accent ? '#ff6b63' : 'rgba(255,255,255,0.7)',
            }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span
            className="wn-eyebrow text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E53935]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {eyebrow}
          </span>
        </div>

        {/* title + body */}
        <h4
          className="relative z-10 text-2xl font-semibold leading-tight text-white sm:text-[1.65rem]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {title}
        </h4>
        <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/65 sm:text-[15px]">
          {body}
        </p>

        {/* expandable detail (height auto on hover) */}
        <motion.div
          className="relative z-10 mt-5 overflow-hidden"
          animate={{
            height: hovered ? 'auto' : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="border-t border-white/10 pt-4">
            <p className="text-xs leading-relaxed text-white/55">
              {accent
                ? 'Multi-service growth stack — Branding + Web + Performance working as one compounding system.'
                : eyebrow === 'The Spark'
                  ? 'One core service, executed obsessively, shipped in 2–3 weeks.'
                  : 'The whole arsenal. Every service, every system, one elite team embedded in your growth.'}
            </p>
          </div>
        </motion.div>

        {/* magnetic CTA — visible always, highlighted on hover */}
        <div className="relative z-10 mt-auto pt-6">
          <MagneticButton
            variant={accent ? 'primary' : 'secondary'}
            cursorLabel="Book"
            ariaLabel="Book a Strategy Call"
            onClick={() => {}}
            className="w-full sm:w-auto"
          >
            <CalendarDays className="h-4 w-4" />
            Book a Strategy Call
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </div>
      </motion.article>
    </motion.div>
  )
}

/* ===================================================================
   AboutWhyClients — Section 8 default export.
   =================================================================== */
export default function AboutWhyClients() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  const metaItems = [
    'Creative Growth Agency',
    'Now accepting selected projects',
    'Now accepting selected projects',
  ]

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <StickyRail
          label="Why WatNidea"
          caption="Proof"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Header block */}
          <motion.div style={{ y: headerY }} className="mb-16 max-w-3xl">
            <SectionEyebrow number="09" label="Why Clients Choose Us" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Why Brands </MaskLine>
              <MaskLine delay={0.12}>
                <RedGradientText>Choose</RedGradientText> Us
              </MaskLine>
            </h2>
          </motion.div>

          {/* Stats row */}
          <div className="mb-24 grid grid-cols-2 gap-8 border-y border-white/8 py-12 sm:py-14 lg:grid-cols-4 lg:gap-6">
            {stats.map((s, i) => (
              <StatItem key={s.label} stat={s} index={i} />
            ))}
          </div>

          {/* 3 floating tier cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
            {tiers.map((t, i) => (
              <TierCard key={t.eyebrow} tier={t} index={i} />
            ))}
          </div>

          {/* Meta strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 border-t border-white/8 pt-10"
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
        </div>
      </div>
    </div>
  )
}
