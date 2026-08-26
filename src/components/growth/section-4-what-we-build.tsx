'use client'

/**
 * GrowthWhatWeBuild — Section 4 of /growth-alchemy
 *
 * Premium BENTO GRID — 7 service areas, each its own animated tile.
 *
 * Composition:
 *   - Eyebrow: (04) · What We Build (GreenEyebrow)
 *   - Headline: "Built for" + "Scale." (MaskLine, emerald gradient)
 *
 * Bento Grid layout (lg+, 3 cols):
 *   Row 1: [Google Ads col-span-2 accent] [Meta Ads]
 *   Row 2: [Lead Gen Funnels] [CRO accent] [Retargeting]
 *   Row 3: [Analytics accent] [Scaling Frameworks col-span-2]
 *
 * Each tile:
 *   - glassmorphism (border border-white/10 bg-white/[0.035] backdrop-blur-xl)
 *   - hover lifts (y: -6 spring scale 1.015) + emerald conic sweep (accent) /
 *     emerald radial glow (others) + bottom accent line emerald→neon
 *   - unique animated micro-visual motif inside
 *   - title (font-display, text-xl md:text-2xl font-semibold) + descriptor
 *   - number 01–07 (emerald, font-display)
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BarChart3,
  Crosshair,
  Filter,
  FlaskConical,
  Maximize,
  Megaphone,
  Target,
  type LucideIcon,
} from 'lucide-react'
import {
  GreenEyebrow,
  GreenGradientText,
  MaskLine,
} from '@/components/growth/shared'

/* ===================================================================
   Micro-visuals — one per service (self-contained motion graphics).
   These are function declarations so they hoist above the `services`
   array that references them by name.
   =================================================================== */

/* 01 Google Ads — ascending bars + search-term chips. */
function GoogleAdsVisual() {
  const bars = [40, 58, 72, 84, 96]
  const chips = ['brand search', '+keyword', 'intent', 'remarketing']
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* ascending bar chart */}
      <div className="absolute bottom-3 left-3 right-3 flex h-[60%] items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              background:
                i === bars.length - 1
                  ? 'linear-gradient(to top, #047857, #6ee7b7)'
                  : 'linear-gradient(to top, rgba(16,185,129,0.4), rgba(16,185,129,0.15))',
              boxShadow:
                i === bars.length - 1
                  ? '0 0 12px rgba(110,231,183,0.6)'
                  : 'none',
            }}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </div>
      {/* search-term chips */}
      <div className="absolute left-3 top-3 flex flex-wrap gap-1">
        {chips.map((c, i) => (
          <motion.span
            key={i}
            className="rounded-full border border-[#10B981]/30 bg-[#10B981]/8 px-1.5 py-0.5 text-[7px] font-medium text-[#6ee7b7]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          >
            {c}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

/* 02 Meta Ads — scrolling feed cards with engagement dots. */
function MetaAdsVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0 flex flex-col gap-1.5"
        animate={{ y: [0, -44, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="shrink-0 rounded-md border border-white/10 bg-white/[0.06] p-1.5"
            style={{ height: '40px' }}
          >
            <div className="flex h-full items-center gap-1.5">
              <div className="h-5 w-5 shrink-0 rounded-sm bg-gradient-to-br from-[#10B981] to-[#047857]" />
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="h-1 w-2/3 rounded-sm bg-white/20" />
                <div className="h-0.5 w-1/2 rounded-sm bg-white/10" />
              </div>
              <div className="flex gap-0.5">
                <motion.span
                  className="h-1 w-1 rounded-full bg-[#6ee7b7]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                />
                <motion.span
                  className="h-1 w-1 rounded-full bg-[#10B981]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2 + 0.3,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* 03 Lead Generation Funnels — funnel shape with particles falling through. */
function LeadGenVisual() {
  // funnel layers (top wide → bottom narrow)
  const layers = [
    { w: 100, color: 'rgba(16,185,129,0.18)' },
    { w: 76, color: 'rgba(16,185,129,0.28)' },
    { w: 52, color: 'rgba(16,185,129,0.42)' },
    { w: 30, color: 'rgba(110,231,183,0.6)' },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        {layers.map((l, i) => (
          <motion.div
            key={i}
            className="rounded-sm"
            style={{
              width: `${l.w}%`,
              height: '14%',
              background: l.color,
              boxShadow:
                i === layers.length - 1
                  ? '0 0 12px rgba(110,231,183,0.6)'
                  : 'none',
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      {/* particles falling through */}
      {[
        { l: '50%', d: 0 },
        { l: '45%', d: 0.8 },
        { l: '55%', d: 1.4 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#6ee7b7]"
          style={{
            left: p.l,
            top: '8%',
            boxShadow: '0 0 6px rgba(110,231,183,0.9)',
          }}
          animate={{ y: [0, 80, 80], opacity: [1, 1, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeIn',
            delay: p.d,
          }}
        />
      ))}
    </div>
  )
}

/* 04 Conversion Optimization — A/B test split + rising conversion curve. */
function CROVisual() {
  const pts = Array.from({ length: 5 }, (_, k) => {
    const px = 12 + (k / 4) * 76
    const climb = (k / 4) * 48
    const py = 78 - climb
    return `${Math.round(px * 1000) / 1000},${Math.round(py * 1000) / 1000}`
  }).join(' ')
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* A/B split header */}
      <div className="absolute left-3 top-3 flex gap-1">
        <span className="rounded border border-white/20 bg-white/5 px-1.5 py-0.5 text-[8px] font-bold text-white/60">
          A
        </span>
        <span className="rounded border border-[#10B981]/45 bg-[#10B981]/10 px-1.5 py-0.5 text-[8px] font-bold text-[#6ee7b7]">
          B
        </span>
      </div>
      {/* A baseline */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <line
          x1="8"
          y1="62"
          x2="92"
          y2="58"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={0.6}
          strokeDasharray="1 1"
        />
        {/* rising conversion curve (B) */}
        <motion.polyline
          points={pts}
          fill="none"
          stroke="rgba(110,231,183,0.95)"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 3px rgba(110,231,183,0.8))' }}
        />
        <polygon
          points={`${pts} 92,78 12,78`}
          fill="rgba(16,185,129,0.12)"
        />
        {/* end dot */}
        <motion.circle
          cx="88"
          cy="30"
          r="2"
          fill="rgba(110,231,183,1)"
          animate={{ r: [2, 3.5, 2], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}

/* 05 Retargeting Systems — orbiting dots returning to center target. */
function RetargetingVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* concentric orbit rings */}
        {[18, 30, 42].map((r, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#10B981]/20"
            style={{ width: `${r * 2}px`, height: `${r * 2}px` }}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 8 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span
              className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: i === 0 ? '#6ee7b7' : '#10B981',
                boxShadow:
                  i === 0
                    ? '0 0 8px rgba(110,231,183,0.95)'
                    : '0 0 6px rgba(16,185,129,0.85)',
              }}
            />
          </motion.div>
        ))}
        {/* center target */}
        <motion.div
          className="absolute h-4 w-4 rounded-full border-2 border-[#10B981] bg-[#10B981]/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 14px rgba(16,185,129,0.7)' }}
        />
      </div>
    </div>
  )
}

/* 06 Analytics — live dashboard with bar chart + line chart + metric tiles. */
function AnalyticsVisual() {
  const bars = [50, 70, 45, 85, 60, 95]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex flex-col gap-1.5 p-2">
        {/* metric tiles row */}
        <div className="flex gap-1.5">
          {[
            { v: '6.8x', l: 'ROAS' },
            { v: '+34%', l: 'CVR' },
            { v: '₹34', l: 'CPL' },
          ].map((m, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded border border-white/10 bg-white/[0.06] p-1"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            >
              <div className="text-[8px] font-bold text-[#6ee7b7]">{m.v}</div>
              <div className="text-[6px] text-white/40">{m.l}</div>
            </motion.div>
          ))}
        </div>
        {/* bar chart */}
        <div className="flex h-[40%] items-end gap-1 rounded border border-white/10 bg-white/[0.06] p-1.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-[#047857] to-[#10B981]"
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}
        </div>
        {/* line chart */}
        <div className="relative h-[40%] rounded border border-white/10 bg-white/[0.06] p-1">
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <motion.polyline
              points="5,32 22,26 38,28 55,18 72,14 95,6"
              fill="none"
              stroke="rgba(110,231,183,0.95)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ filter: 'drop-shadow(0 0 2px rgba(110,231,183,0.8))' }}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

/* 07 Scaling Frameworks — expanding concentric rings + ascending staircase. */
function ScalingVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* expanding concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-[#10B981]/30"
            style={{ width: '24px', height: '24px' }}
            animate={{
              scale: [1, 4.5, 4.5],
              opacity: [0.7, 0, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeOut',
              delay: i * 1,
            }}
          />
        ))}
        {/* center */}
        <motion.div
          className="absolute h-3 w-3 rounded-full bg-[#10B981]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 14px rgba(16,185,129,0.9)' }}
        />
      </div>
      {/* ascending staircase (bottom-right) */}
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[60%] w-full"
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 10 + i * 16
          const y = 50 - i * 9
          return (
            <motion.rect
              key={i}
              x={x}
              y={y}
              width="14"
              height={50 - y + 10}
              fill="rgba(16,185,129,0.25)"
              stroke="rgba(110,231,183,0.6)"
              strokeWidth={0.4}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}

/* ===================================================================
   Content — 7 service areas (premium descriptors, brand voice).
   =================================================================== */
type Service = {
  n: string
  title: string
  desc: string
  Icon: LucideIcon
  span: 1 | 2 // bento col-span on lg+
  accent: boolean
  Visual: () => JSX.Element
}

const services: Service[] = [
  {
    n: '01',
    title: 'Google Ads',
    desc: 'High-intent search, shopping, and Performance Max campaigns set up to capture demand the moment it forms — every keyword, every bid, every rupee accountable to revenue.',
    Icon: Target,
    span: 2,
    accent: true,
    Visual: GoogleAdsVisual,
  },
  {
    n: '02',
    title: 'Meta Ads',
    desc: 'Facebook + Instagram funnels built to scale.',
    Icon: Megaphone,
    span: 1,
    accent: false,
    Visual: MetaAdsVisual,
  },
  {
    n: '03',
    title: 'Lead Generation Funnels',
    desc: 'Multi-step funnels that turn cold traffic into qualified leads — landing pages, forms, qualifiers, and nurture flows built for conversion.',
    Icon: Filter,
    span: 1,
    accent: false,
    Visual: LeadGenVisual,
  },
  {
    n: '04',
    title: 'Conversion Optimization',
    desc: 'A/B tests, landing page redesigns, and friction-killing experiments that lift conversion rates without lifting spend.',
    Icon: FlaskConical,
    span: 1,
    accent: true,
    Visual: CROVisual,
  },
  {
    n: '05',
    title: 'Retargeting Systems',
    desc: 'Bring back the ones who got away.',
    Icon: Crosshair,
    span: 1,
    accent: false,
    Visual: RetargetingVisual,
  },
  {
    n: '06',
    title: 'Analytics & Attribution',
    desc: 'Server-side tracking, multi-touch attribution, and revenue dashboards that tell you exactly what is working — and what is leaking.',
    Icon: BarChart3,
    span: 1,
    accent: true,
    Visual: AnalyticsVisual,
  },
  {
    n: '07',
    title: 'Scaling Frameworks',
    desc: 'The repeatable systems that take a winning campaign from ₹1L to ₹1Cr/month without breaking — budget ladders, creative refresh cadences, audience expansion playbooks, and the operational discipline to compound what works while killing what doesn\u2019t.',
    Icon: Maximize,
    span: 2,
    accent: true,
    Visual: ScalingVisual,
  },
]

/* ===================================================================
   BentoTile — single service tile (glassmorphism + hover effects).
   Hooks at the top — receives no scroll-driven motion values.
   =================================================================== */
function BentoTile({ s, index }: { s: Service; index: number }) {
  const { n, title, desc, Icon, span, accent, Visual } = s
  return (
    <motion.article
      data-cursor="View"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { type: 'spring', stiffness: 300, damping: 22 },
      }}
      className={`group relative overflow-hidden rounded-2xl border bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[#10B981]/55 hover:bg-white/[0.07] sm:p-6 ${
        span === 2 ? 'lg:col-span-2' : ''
      } ${accent ? 'border-[#10B981]/25' : 'border-white/10'}`}
    >
      {/* hover glow — emerald conic sweep (accent) / radial glow (others) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: accent
            ? 'conic-gradient(from 220deg at 50% 50%, rgba(16,185,129,0.22), rgba(110,231,183,0.16), rgba(4,120,87,0.14), rgba(16,185,129,0.22))'
            : 'radial-gradient(120% 120% at 100% 0%, rgba(16,185,129,0.18), rgba(110,231,183,0.08) 50%, transparent 70%)',
        }}
      />
      {/* emerald glow ring on hover (accent only) */}
      {accent && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      {/* pulsing ring (accent only) */}
      {accent && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl border border-[#10B981]/30"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* number + Explore row */}
      <div className="relative z-10 mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
              accent
                ? 'border-[#10B981]/40 bg-[#10B981]/10 text-[#6ee7b7]'
                : 'border-white/15 bg-white/[0.05] text-white/70'
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span
            className={`text-xs font-bold ${
              accent
                ? 'bg-gradient-to-br from-[#6ee7b7] via-[#10B981] to-[#047857] bg-clip-text text-transparent'
                : 'text-[#10B981]'
            }`}
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {n}
          </span>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#10B981] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Explore
          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {/* grid: content + visual */}
      <div
        className={`relative z-10 grid gap-4 ${
          span === 2
            ? 'grid-cols-1 sm:grid-cols-[1fr_200px]'
            : 'grid-cols-1'
        }`}
      >
        {/* content */}
        <div className="flex flex-col">
          <h3
            className="text-xl font-semibold text-white md:text-2xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">{desc}</p>
        </div>

        {/* micro-visual */}
        <div
          className={`relative overflow-hidden rounded-lg border border-white/10 bg-[#1A1A1A]/75 ${
            span === 2 ? 'h-32 sm:h-auto' : 'h-28'
          }`}
        >
          <Visual />
        </div>
      </div>

      {/* bottom accent line — emerald → neon */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#10B981] to-[#6ee7b7] transition-all duration-500 group-hover:w-full"
      />
    </motion.article>
  )
}

/* ===================================================================
   GrowthWhatWeBuild — Section 4 named export
   =================================================================== */
export function GrowthWhatWeBuild() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#141414] px-5 py-24 sm:px-8 sm:py-32 lg:py-40"
      aria-label="What We Build"
    >
      {/* Local ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(16,185,129,0.18), rgba(16,185,129,0) 65%)',
            filter: 'blur(30px)',
          }}
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute right-[10%] bottom-[12%] h-[26vw] w-[26vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(4,120,87,0.18), rgba(4,120,87,0) 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.15, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6,
          }}
        />
        <motion.div
          aria-hidden
          className="absolute left-[8%] top-[16%] h-[22vw] w-[22vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(110,231,183,0.12), rgba(110,231,183,0) 70%)',
            filter: 'blur(44px)',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.18, 1] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.2,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <GreenEyebrow number="04" label="What We Build" />

        {/* Massive headline */}
        <h2
          className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">Built for </span>
            <GreenGradientText>Scale.</GreenGradientText>
          </MaskLine>
        </h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          Seven services. One revenue engine.{' '}
          <span className="text-white/55">
            Every asset built to grow with you.
          </span>
        </motion.p>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map((s, i) => (
            <BentoTile key={s.n} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
