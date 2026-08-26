'use client'

/**
 * GrowthCampaignShowcase — Section 6 of /growth-alchemy
 *
 * IMMERSIVE CAPABILITY CARDS + LIVE PRACTICE MARQUEE.
 *
 * Composition:
 *   - Eyebrow: (06) · Campaign Showcase (GreenEyebrow)
 *   - Headline: "Campaigns That" + "Compound." ("Compound." emerald gradient)
 *   - 4 immersive capability cards (md+ 2-col staggered).
 *       Each card has a unique animated visual motif — no invented
 *       performance numbers, just capability illustrations:
 *         01 The DTC Scale Engine  · E-Commerce  · Paid search
 *            → live dashboard motif: bar + line chart (decorative only)
 *         02 Lead Gen Machine 01   · B2B SaaS    · Funnels
 *            → funnel motif with particles falling through 4 stages
 *         03 The ROAS Multiplier   · DTC         · Attribution
 *            → ascending curve with milestone dots (pathLength 0→1)
 *         04 Momentum Quarter      · Always-On   · Creative testing
 *            → 4-tile snapshot of capability areas
 *   - Hover: card lifts, emerald/neon glow blooms.
 *   - Performance marquee at bottom: honest capability labels drifting L→R.
 *
 * Honesty: no invented revenue, ROAS, leads or growth numbers. Final
 * values (capability labels) are rendered as plain strings — never
 * animated 0→number.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  DollarSign,
  MousePointerClick,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {
  GreenEyebrow,
  GreenGradientText,
  GreenStickyRail,
  MaskLine,
} from '@/components/growth/shared'

/* ===================================================================
   Campaign content — 4 capability-illustration cards.
   No invented revenue, ROAS, leads or growth numbers — each card
   carries an honest capability label rendered as a plain string.
   =================================================================== */
type Campaign = {
  n: string
  name: string
  category: string
  capability: string
  Visual: () => JSX.Element
  accent: 'emerald' | 'neon' | 'deep'
}

const campaigns: Campaign[] = [
  {
    n: '01',
    name: 'The DTC Scale Engine',
    category: 'E-Commerce',
    capability: 'Paid search',
    Visual: DtcScaleVisual,
    accent: 'emerald',
  },
  {
    n: '02',
    name: 'Lead Gen Machine 01',
    category: 'B2B SaaS',
    capability: 'Funnels',
    Visual: LeadGenVisual,
    accent: 'neon',
  },
  {
    n: '03',
    name: 'The ROAS Multiplier',
    category: 'DTC',
    capability: 'Attribution',
    Visual: RoasMultiplierVisual,
    accent: 'emerald',
  },
  {
    n: '04',
    name: 'Momentum Quarter',
    category: 'Always-On',
    capability: 'Creative testing',
    Visual: MomentumSnapshotVisual,
    accent: 'neon',
  },
]

const ACCENT_HEX: Record<Campaign['accent'], string> = {
  emerald: '#10B981',
  neon: '#6ee7b7',
  deep: '#047857',
}

const ACCENT_RGB: Record<Campaign['accent'], string> = {
  emerald: '16,185,129',
  neon: '110,231,183',
  deep: '4,120,87',
}

/* ===================================================================
   01 DTC Scale Engine — dashboard motif: bar + line chart (decorative
   only). No count-up, no invented ROAS readout.
   =================================================================== */
function DtcScaleVisual() {
  // 8 ascending bars — pre-rounded coordinates
  const bars = [0.45, 0.62, 0.38, 0.78, 0.55, 0.92, 0.7, 0.85]
  const barGeoms = bars.map((h, i) => {
    const x = Math.round((4 + i * 11.5) * 1000) / 1000
    const w = 7
    const barH = Math.round(h * 36 * 1000) / 1000
    const y = Math.round((48 - barH) * 1000) / 1000
    return { x, w, y, barH, i }
  })
  // ascending line overlay — pre-rounded
  const linePts = barGeoms
    .map((b) => {
      const cx = Math.round((b.x + b.w / 2) * 1000) / 1000
      const cy = Math.round((b.y - 4) * 1000) / 1000
      return `${cx},${cy}`
    })
    .join(' ')

  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.2), transparent 65%)',
        }}
      />
      {/* LIVE status (top-left) */}
      <div className="absolute left-4 top-4 flex items-center gap-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#10B981]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 6px rgba(16,185,129,0.95)' }}
        />
        <span className="wn-eyebrow text-[9px] font-medium text-white/55">
          LIVE · DASHBOARD
        </span>
      </div>
      {/* capability readout (top-right) */}
      <div className="absolute right-4 top-4 flex flex-col items-end">
        <span
          className="text-2xl font-bold text-[#6ee7b7]"
          style={{
            fontFamily: 'var(--font-display), sans-serif',
            textShadow: '0 0 16px rgba(110,231,183,0.55)',
          }}
        >
          Paid search
        </span>
        <span className="wn-eyebrow text-[8px] font-medium text-white/45">
          CAPABILITY
        </span>
      </div>
      {/* chart area */}
      <div className="absolute inset-x-6 bottom-6 top-16">
        <svg
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="dtc-bars" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(16,185,129,0.85)" />
              <stop offset="100%" stopColor="rgba(4,120,87,0.4)" />
            </linearGradient>
            <linearGradient id="dtc-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          {/* bars */}
          {barGeoms.map((b) => (
            <motion.rect
              key={b.i}
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.barH}
              rx={0.6}
              fill="url(#dtc-bars)"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: b.i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: `${b.x + b.w / 2}px 48px` }}
            />
          ))}
          {/* ascending line overlay */}
          <motion.polyline
            points={linePts}
            fill="none"
            stroke="url(#dtc-line)"
            strokeWidth={0.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            style={{ filter: 'drop-shadow(0 0 3px rgba(110,231,183,0.7))' }}
          />
        </svg>
      </div>
    </div>
  )
}

/* ===================================================================
   02 Lead Gen Machine — funnel with particles falling through stages.
   =================================================================== */
type Stage = {
  label: string
  w: number
  value: string
  conv: string
}

const FUNNEL_STAGES: Stage[] = [
  { label: 'Reach', w: 92, value: '', conv: '' },
  { label: 'Clicks', w: 72, value: '', conv: '' },
  { label: 'Leads', w: 52, value: '', conv: '' },
  { label: 'Conversions', w: 32, value: '', conv: '' },
]

function LeadGenVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(110,231,183,0.18), transparent 65%)',
        }}
      />
      <div className="absolute left-4 top-4 flex items-center gap-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#6ee7b7]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 6px rgba(110,231,183,0.95)' }}
        />
        <span className="wn-eyebrow text-[9px] font-medium text-white/55">
          FUNNEL · LIVE
        </span>
      </div>

      {/* Funnel shape — stacked shrinking bars */}
      <div className="absolute inset-x-6 top-12 bottom-6 flex flex-col justify-center gap-1.5">
        {FUNNEL_STAGES.map((s, i) => {
          const marginX = (92 - s.w) / 2
          return (
            <motion.div
              key={i}
              className="relative flex h-[24%] items-center justify-between overflow-hidden rounded-md border border-white/10 px-3"
              style={{
                width: `${s.w}%`,
                marginLeft: `${marginX}%`,
                background:
                  i % 2 === 0
                    ? 'linear-gradient(180deg, rgba(16,185,129,0.32), rgba(16,185,129,0.1))'
                    : 'linear-gradient(180deg, rgba(110,231,183,0.28), rgba(16,185,129,0.08))',
              }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span
                className="text-[10px] font-semibold text-white/85"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                {s.label}
              </span>
              {/* particle falling through */}
              <motion.span
                className="absolute h-1 w-1 rounded-full bg-[#6ee7b7]"
                style={{
                  left: '50%',
                  top: 0,
                  filter: 'drop-shadow(0 0 4px rgba(110,231,183,0.95))',
                }}
                animate={{ y: [0, 22, 0], opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeIn',
                  delay: i * 0.3,
                }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ===================================================================
   03 ROAS Multiplier — ascending curve motif with milestone dots.
   pathLength 0→1 on whileInView. No invented revenue figures — the
   curve is a decorative motif, not a real performance claim.
   =================================================================== */
function RoasMultiplierVisual() {
  const pts = [
    { x: 8, y: 84 },
    { x: 24, y: 70 },
    { x: 40, y: 58 },
    { x: 56, y: 42 },
    { x: 72, y: 28 },
    { x: 88, y: 12 },
  ].map((p) => ({
    x: Math.round(p.x * 1000) / 1000,
    y: Math.round(p.y * 1000) / 1000,
  }))
  const line = pts.map((p) => `${p.x},${p.y}`).join(' ')
  const area = `8,90 ${line} 88,90`

  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 80%, rgba(16,185,129,0.2), transparent 65%)',
        }}
      />
      <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-[#10B981]/40 bg-[#10B981]/10 px-2.5 py-1">
        <TrendingUp className="h-3 w-3 text-[#6ee7b7]" />
        <span className="wn-eyebrow text-[9px] font-semibold text-[#6ee7b7]">
          Attribution
        </span>
      </div>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="roas-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(110,231,183,0.5)" />
            <stop offset="60%" stopColor="rgba(16,185,129,0.2)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </linearGradient>
          <linearGradient id="roas-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        <motion.polygon
          points={area}
          fill="url(#roas-area)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
        />
        <motion.polyline
          points={line}
          fill="none"
          stroke="url(#roas-line)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.6))' }}
        />
        {pts.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={1.6}
            fill="#fff"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.6 + i * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.9))' }}
          />
        ))}
      </svg>

      <span className="absolute left-4 top-4 wn-eyebrow text-[9px] font-medium text-white/55">
        ATTRIBUTION CURVE
      </span>
    </div>
  )
}

/* ===================================================================
   04 Momentum Quarter — 4-tile snapshot of capability areas.
   Static honest labels — no invented numbers, no live ticking.
   =================================================================== */
type Tile = {
  label: string
  value: string
  accent: 'emerald' | 'neon'
}

const SNAPSHOT_TILES: Tile[] = [
  { label: 'CHANNEL', value: 'Paid search', accent: 'emerald' },
  { label: 'FUNNEL', value: 'Multi-step', accent: 'neon' },
  { label: 'ATTRIBUTION', value: 'Multi-touch', accent: 'emerald' },
  { label: 'TESTING', value: 'Always-on', accent: 'neon' },
]

function TickTile({ tile, index }: { tile: Tile; index: number }) {
  const color = tile.accent === 'emerald' ? '#10B981' : '#6ee7b7'
  const rgb = tile.accent === 'emerald' ? '16,185,129' : '110,231,183'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex flex-col justify-center rounded-lg border border-white/10 bg-[#1A1A1A]/75 px-3 backdrop-blur-md"
      style={{ boxShadow: `inset 0 0 20px rgba(${rgb},0.08)` }}
    >
      <span className="wn-eyebrow text-[8px] font-medium text-white/45">
        {tile.label}
      </span>
      <span
        className="text-base font-bold leading-tight"
        style={{
          fontFamily: 'var(--font-display), sans-serif',
          color,
          textShadow: `0 0 12px rgba(${rgb},0.55)`,
        }}
      >
        {tile.value}
      </span>
    </motion.div>
  )
}

function MomentumSnapshotVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.2), transparent 65%)',
        }}
      />
      <div className="absolute left-4 top-4 flex items-center gap-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#10B981]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 6px rgba(16,185,129,0.95)' }}
        />
        <span className="wn-eyebrow text-[9px] font-medium text-white/55">
          CAPABILITIES
        </span>
      </div>

      <div className="absolute inset-x-6 top-12 bottom-6 grid grid-cols-2 gap-2">
        {SNAPSHOT_TILES.map((t, i) => (
          <TickTile key={t.label} tile={t} index={i} />
        ))}
      </div>
    </div>
  )
}

/* ===================================================================
   CampaignCard — single immersive glassmorphism card.
   Displays an honest capability label (no invented metric).
   =================================================================== */
function CampaignCard({ c, index }: { c: Campaign; index: number }) {
  const { n, name, category, capability, Visual, accent } = c
  return (
    <motion.article
      data-cursor="View"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl transition-colors duration-500 hover:border-[#10B981]/55"
    >
      {/* emerald/neon glow bloom on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 50px rgba(${ACCENT_RGB[accent]},0.28)` }}
      />

      {/* === Visual layer === */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-[#1A1A1A]/80" />
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Visual />
        </motion.div>

        {/* scan-line cinematic overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
          }}
        />

        {/* ACTIVE indicator (top-left) */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#10B981]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 6px rgba(16,185,129,0.85)' }}
          />
          <span className="wn-eyebrow text-[9px] font-medium text-white/55 transition-colors duration-300 group-hover:text-white/85">
            ACTIVE
          </span>
        </div>

        {/* corner number */}
        <span
          className="absolute bottom-4 left-4 text-xs font-bold text-white/30"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          ({n})
        </span>

        {/* category chip top-right */}
        <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-[#1A1A1A]/80 px-2.5 py-1 backdrop-blur-md">
          <span className="wn-eyebrow text-[9px] font-medium text-white/85">
            {category}
          </span>
        </div>

        {/* bottom fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent"
        />
      </div>

      {/* === Content layer === */}
      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <h3
          className="text-2xl font-semibold text-white sm:text-3xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {name}
        </h3>

        <div className="mt-5 flex items-baseline gap-2">
          <span
            className="text-3xl font-bold leading-none sm:text-4xl"
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              color: ACCENT_HEX[accent],
              textShadow: `0 0 30px rgba(${ACCENT_RGB[accent]},0.5)`,
            }}
          >
            {capability}
          </span>
          <span className="wn-eyebrow text-[10px] font-medium text-white/45">
            CAPABILITY
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Capability showcase
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#10B981] opacity-70 transition-opacity duration-300 group-hover:opacity-100">
            Explore
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ===================================================================
   Performance marquee — horizontal chips drifting L→R.
   Uses .wn-marquee-track CSS animation (28s linear infinite).
   =================================================================== */
type PerfChip = {
  Icon: LucideIcon
  text: string
  accent: Campaign['accent']
}

const perfChips: PerfChip[] = [
  { Icon: TrendingUp, text: 'Paid search', accent: 'emerald' },
  { Icon: DollarSign, text: 'Funnels', accent: 'neon' },
  { Icon: MousePointerClick, text: 'Attribution', accent: 'emerald' },
  { Icon: BarChart3, text: 'Landing pages', accent: 'neon' },
  { Icon: Target, text: 'Retargeting', accent: 'emerald' },
  { Icon: Users, text: 'CRO', accent: 'neon' },
  { Icon: Activity, text: 'Dashboards', accent: 'emerald' },
  { Icon: TrendingUp, text: 'Creative testing', accent: 'neon' },
  { Icon: DollarSign, text: 'Scaling frameworks', accent: 'emerald' },
  { Icon: MousePointerClick, text: 'Server-side tracking', accent: 'neon' },
]

function PerfMarqueeRow() {
  return (
    <div className="flex w-max items-center gap-3">
      {perfChips.map((c, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 backdrop-blur-md"
        >
          <c.Icon
            className="h-3.5 w-3.5"
            style={{ color: ACCENT_HEX[c.accent] }}
          />
          <span className="text-[11px] font-medium text-white/85">
            {c.text}
          </span>
          <span
            className="h-1 w-1 rounded-full"
            style={{ background: ACCENT_HEX[c.accent] }}
          />
        </div>
      ))}
    </div>
  )
}

function PerfMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] py-4 backdrop-blur-md"
    >
      {/* left/right edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#141414] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#141414] to-transparent"
      />
      {/* LIVE indicator */}
      <div className="absolute left-5 top-1/2 z-20 flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-[#10B981]/40 bg-[#141414]/85 px-2.5 py-1 backdrop-blur-md">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#10B981]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 6px rgba(16,185,129,0.95)' }}
        />
        <span className="wn-eyebrow text-[9px] font-semibold text-[#10B981]">
          LIVE
        </span>
      </div>
      {/* marquee track — duplicated for seamless loop */}
      <div className="wn-marquee-track pl-32">
        <PerfMarqueeRow />
        <PerfMarqueeRow />
      </div>
    </motion.div>
  )
}

/* ===================================================================
   GrowthCampaignShowcase — Section 6 named export.
   =================================================================== */
export function GrowthCampaignShowcase() {
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
          label="Campaigns"
          caption="Selected"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/3 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
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
              className="absolute right-[8%] bottom-[12%] h-[28vw] w-[28vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(110,231,183,0.12), rgba(110,231,183,0) 70%)',
                filter: 'blur(44px)',
              }}
              animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.15, 1] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.2,
              }}
            />
          </div>

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-14 max-w-3xl"
          >
            <GreenEyebrow number="06" label="Campaign Showcase" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Campaigns That </MaskLine>
              <MaskLine delay={0.12}>
                <GreenGradientText>Compound.</GreenGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Every engagement is a{' '}
              <GreenGradientText glow={false}>
                connected practice
              </GreenGradientText>{' '}
              — paid search, funnels, attribution and creative testing,
              set up so what is working becomes visible, repeatable and
              scalable.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-4 text-[11px] uppercase tracking-[0.3em] text-white/30"
            >
              Capability showcases · illustrative motifs
            </motion.p>
          </motion.div>

          {/* Staggered 2-col grid */}
          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
            {campaigns.map((c, i) => (
              <div
                key={c.n}
                className={i % 2 === 1 ? 'md:mt-16' : ''}
              >
                <CampaignCard c={c} index={i} />
              </div>
            ))}
          </div>

          {/* Performance marquee */}
          <div className="relative z-10">
            <PerfMarquee />
          </div>
        </div>
      </div>
    </div>
  )
}
