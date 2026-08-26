'use client'

/**
 * GrowthResults — Section 8 of /growth-alchemy
 *
 * HONEST CAPABILITIES — what the studio can set up and measure, plus the
 * verified studio-level metrics (7 services · 1 unified team) rendered
 * directly in HTML as strings. No invented revenue, ROAS, leads or
 * growth numbers. No 0→number animation — final values render as text.
 *
 * Composition:
 *   - Eyebrow: (08) · Results (GreenEyebrow)
 *   - Headline: "Growth You" + "Measure." ("Measure." emerald gradient)
 *   - Sub-copy: honest framing — what we can set up and measure for you.
 *   - Verified metrics row (rendered from getVerifiedMetrics() —
 *     "7 specialist services", "1 unified creative + growth team").
 *   - Capabilities grid — honest, non-numeric capability cards:
 *       Attribution models · Funnel dashboards · Creative testing
 *       frameworks · Server-side tracking · Landing pages · Scaling
 *       playbooks. Each card uses a small decorative motif (icon +
 *       emerald underline that grows on hover) — never a count-up.
 *   - GreenStickyRail ("Results" / "Honest").
 *
 * Honesty: per the brand content registry, only verified, attributable
 * metrics are rendered. Final values are plain strings.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  BarChart3,
  Filter,
  Gauge,
  LayoutTemplate,
  LineChart,
  Target,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import {
  GreenEyebrow,
  GreenGradientText,
  GreenStickyRail,
  MaskLine,
} from '@/components/growth/shared'
import { getVerifiedMetrics } from '@/lib/siteContent'

/* ===================================================================
   Verified metrics — rendered as plain strings (no count-up, no
   invented numbers). Source: src/lib/siteContent.ts METRICS registry.
   =================================================================== */
const verifiedMetrics = getVerifiedMetrics()

/* ===================================================================
   Capabilities — honest, non-numeric. What the studio can set up and
   measure for a performance engagement.
   =================================================================== */
type Capability = {
  n: string
  title: string
  desc: string
  Icon: LucideIcon
  accent: 'emerald' | 'neon' | 'deep'
}

const capabilities: Capability[] = [
  {
    n: '01',
    title: 'Attribution models',
    desc: 'Multi-touch attribution across ad platforms, GA4 and your CRM — so revenue signals are tied back to the spend that produced them.',
    Icon: BarChart3,
    accent: 'emerald',
  },
  {
    n: '02',
    title: 'Funnel dashboards',
    desc: 'Live dashboards that surface spend, CPL, ROAS and revenue together — not monthly PDFs, just always-on visibility.',
    Icon: LineChart,
    accent: 'neon',
  },
  {
    n: '03',
    title: 'Creative testing frameworks',
    desc: 'Structured angles, hooks and audiences tested on a refresh cadence — so creative decisions are made on signal, not guesswork.',
    Icon: Target,
    accent: 'deep',
  },
  {
    n: '04',
    title: 'Server-side tracking',
    desc: 'Server-side tagging and conversion APIs — measurement that survives iOS, ITP and ad-platform attribution windows.',
    Icon: Gauge,
    accent: 'emerald',
  },
  {
    n: '05',
    title: 'Landing pages',
    desc: 'High-conversion landing pages built to close, not bounce — designed in-step with the ads that send them traffic.',
    Icon: LayoutTemplate,
    accent: 'neon',
  },
  {
    n: '06',
    title: 'Scaling playbooks',
    desc: 'Budget ladders, audience expansion and creative refresh cadences — so spend grows without breaking what works.',
    Icon: Filter,
    accent: 'deep',
  },
]

const ACCENT_HEX: Record<Capability['accent'], string> = {
  emerald: '#10B981',
  neon: '#6ee7b7',
  deep: '#047857',
}

const ACCENT_RGB: Record<Capability['accent'], string> = {
  emerald: '16,185,129',
  neon: '110,231,183',
  deep: '4,120,87',
}

/* ===================================================================
   VerifiedMetricTile — renders a verified metric (value + label) as
   a plain string. No count-up, no animation 0→number.
   =================================================================== */
function VerifiedMetricTile({
  value,
  label,
  index,
}: {
  value: string
  label: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-[#10B981]/25 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-7"
    >
      {/* hover glow bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 0%, rgba(16,185,129,0.18), transparent 60%)',
        }}
      />
      <div className="relative z-10">
        <span
          className="block text-5xl font-bold leading-none sm:text-6xl"
          style={{
            fontFamily: 'var(--font-display), sans-serif',
            background:
              'linear-gradient(135deg, #ffffff 0%, #6ee7b7 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 24px rgba(16,185,129,0.4))',
          }}
        >
          {value}
        </span>
        <p className="mt-3 text-sm font-medium text-white/55">{label}</p>
      </div>
    </motion.div>
  )
}

/* ===================================================================
   CapabilityCard — single honest capability card. No invented numbers;
   just a glassmorphism card with an icon, title, description and an
   emerald underline that fills on hover.
   =================================================================== */
function CapabilityCard({ c, index }: { c: Capability; index: number }) {
  const { n, title, desc, Icon, accent } = c
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-[#10B981]/50 hover:bg-white/[0.07] sm:p-7"
    >
      {/* hover glow bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 120% at 0% 0%, rgba(${ACCENT_RGB[accent]},0.22), transparent 60%)`,
        }}
      />

      {/* top row: number + icon */}
      <div className="relative z-10 mb-5 flex items-center justify-between">
        <span
          className="text-sm font-bold text-white/30"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          ({n})
        </span>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]"
          style={{ color: ACCENT_HEX[accent] }}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>

      {/* title */}
      <h3
        className="relative z-10 text-xl font-semibold text-white sm:text-2xl"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        {title}
      </h3>

      {/* description */}
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/55 sm:text-[15px]">
        {desc}
      </p>

      {/* bottom hairline accent that fills on hover */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{
          background: `linear-gradient(to right, ${ACCENT_HEX[accent]}, transparent)`,
        }}
      />
    </motion.article>
  )
}

/* ===================================================================
   GrowthResults — Section 8 named export.
   =================================================================== */
export function GrowthResults() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <GreenStickyRail
          label="Results"
          caption="Honest"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(16,185,129,0.16), rgba(16,185,129,0) 65%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="absolute bottom-[12%] right-[6%] h-[24vw] w-[24vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(110,231,183,0.12), rgba(110,231,183,0) 70%)',
                filter: 'blur(44px)',
              }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.4,
              }}
            />
          </div>

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-14 max-w-3xl"
          >
            <GreenEyebrow number="08" label="Results" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Growth You </MaskLine>
              <MaskLine delay={0.12}>
                <GreenGradientText>Measure.</GreenGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              No invented numbers — only the things we can{' '}
              <GreenGradientText glow={false}>set up and measure</GreenGradientText>{' '}
              for you. Attribution, funnels, creative testing and dashboards,
              built so you can see what is working and what to cut.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-4 text-[11px] uppercase tracking-[0.3em] text-white/30"
            >
              Capabilities · now accepting selected projects
            </motion.p>
          </motion.div>

          {/* Verified metrics row — plain strings, no count-up */}
          <div className="relative z-10 mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
            {verifiedMetrics.map((m, i) => (
              <VerifiedMetricTile
                key={m.label}
                value={m.value}
                label={m.label}
                index={i}
              />
            ))}
          </div>

          {/* Capabilities section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mb-8 flex items-center gap-3"
          >
            <TrendingUp className="h-4 w-4 text-[#10B981]" />
            <span
              className="wn-eyebrow text-[11px] font-medium text-[#10B981]"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              What we set up and measure
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#10B981]/40 to-transparent" />
          </motion.div>

          {/* Capabilities grid */}
          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {capabilities.map((c, i) => (
              <CapabilityCard key={c.n} c={c} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
