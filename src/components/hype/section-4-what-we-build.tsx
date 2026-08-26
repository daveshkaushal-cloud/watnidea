'use client'

/**
 * HypeWhatWeBuild — Section 4 of /the-hype-engine
 *
 * Premium BENTO GRID — 7 service areas, each its own animated environment.
 *
 * Composition:
 *   - Eyebrow: (04) · What We Build
 *   - Headline: "Built for Momentum." ("Momentum." red gradient)
 *
 * Bento Grid layout (lg+, 3 cols):
 *   Row 1: [Social Media Strategy col-span-2] [Content Production]
 *   Row 2: [Creative Campaigns accent] [Community Mgmt] [Influencer Collabs]
 *   Row 3: [Trend Activation accent] [Content Systems col-span-2]
 *
 * Each tile:
 *   - glassmorphism (border border-white/10 bg-white/[0.035] backdrop-blur-xl)
 *   - hover lifts (y: -6 spring scale 1.03) + red/orange conic sweep + glow
 *   - unique animated micro-visual motif inside
 *   - title (font-display, text-xl md:text-2xl font-semibold) + descriptor
 *   - number 01–07 (red, font-display)
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Clapperboard,
  LayoutGrid,
  Megaphone,
  Target,
  UserCheck,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
} from '@/components/about/shared'

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
    title: 'Social Media Strategy',
    desc: 'The roadmap that turns scattered posts into a compounding attention engine — platform by platform, moment by moment.',
    Icon: Target,
    span: 2,
    accent: true,
    Visual: StrategyVisual,
  },
  {
    n: '02',
    title: 'Content Production',
    desc: 'Scroll-stopping creative at scale — video, design, copy, motion.',
    Icon: Clapperboard,
    span: 1,
    accent: false,
    Visual: ProductionVisual,
  },
  {
    n: '03',
    title: 'Creative Campaigns',
    desc: 'Big idea, multi-channel, built to break through.',
    Icon: Megaphone,
    span: 1,
    accent: true,
    Visual: CampaignsVisual,
  },
  {
    n: '04',
    title: 'Community Management',
    desc: 'Audiences into tribes. Tribes into advocates.',
    Icon: Users,
    span: 1,
    accent: false,
    Visual: CommunityVisual,
  },
  {
    n: '05',
    title: 'Influencer Collaborations',
    desc: 'Right voices, right audiences, right moment.',
    Icon: UserCheck,
    span: 1,
    accent: false,
    Visual: InfluencersVisual,
  },
  {
    n: '06',
    title: 'Trend Activation',
    desc: 'Move first. Move fast. Make the moment yours.',
    Icon: Zap,
    span: 1,
    accent: true,
    Visual: TrendsVisual,
  },
  {
    n: '07',
    title: 'Content Systems',
    desc: 'The infrastructure that lets your brand ship at the speed of culture — workflows, templates, reuse pipelines, and automation that keeps the engine running without burning out the team.',
    Icon: LayoutGrid,
    span: 2,
    accent: true,
    Visual: SystemsVisual,
  },
]

/* ===================================================================
   Micro-visuals — one per service (self-contained motion graphics).
   =================================================================== */

/* 01 Social Media Strategy — flowing strategy lines (red/orange/pink). */
function StrategyVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            d={`M-5,${10 + i * 12} C30,${4 + i * 12} 70,${18 + i * 12} 105,${8 + i * 12}`}
            fill="none"
            stroke={
              i % 3 === 0
                ? 'rgba(229,57,53,0.8)'
                : i % 3 === 1
                  ? 'rgba(249,115,22,0.7)'
                  : 'rgba(236,72,153,0.7)'
            }
            strokeWidth={0.8}
            strokeLinecap="round"
            animate={{
              d: [
                `M-5,${10 + i * 12} C30,${4 + i * 12} 70,${18 + i * 12} 105,${8 + i * 12}`,
                `M-5,${10 + i * 12} C30,${18 + i * 12} 70,${4 + i * 12} 105,${8 + i * 12}`,
                `M-5,${10 + i * 12} C30,${4 + i * 12} 70,${18 + i * 12} 105,${8 + i * 12}`,
              ],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ filter: 'drop-shadow(0 0 1.5px rgba(229,57,53,0.6))' }}
          />
        ))}
      </svg>
      {/* node markers */}
      {[
        { x: '20%', y: '30%' },
        { x: '50%', y: '55%' },
        { x: '80%', y: '40%' },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-2 rounded-full bg-[#E53935]"
          style={{
            left: p.x,
            top: p.y,
            boxShadow: '0 0 10px rgba(229,57,53,0.9)',
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  )
}

/* 02 Content Production — stacked content cards. */
function ProductionVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-[60%] rounded-md border border-white/10 bg-white/[0.06]"
            style={{
              height: '32%',
              translateY: `${(i - 1) * 18}px`,
              rotate: `${(i - 1) * 4}deg`,
              zIndex: 3 - i,
            }}
            animate={{ y: [`${(i - 1) * 18 - 4}px`, `${(i - 1) * 18 + 4}px`, `${(i - 1) * 18 - 4}px`] }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          >
            <div className="flex h-full flex-col gap-1 p-2">
              <div className="h-1.5 w-1/3 rounded-sm bg-[#E53935]/60" />
              <div className="h-1 w-2/3 rounded-sm bg-white/15" />
              <div className="h-1 w-1/2 rounded-sm bg-white/10" />
              <div className="mt-auto flex gap-1">
                <div className="h-3 w-6 rounded-sm bg-white/10" />
                <div className="h-3 w-4 rounded-sm bg-[#F97316]/40" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* 03 Creative Campaigns — burst/explosion. */
function CampaignsVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* burst rays */}
        <motion.svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const ang = (i / 12) * Math.PI * 2
            const x1 = 50 + Math.cos(ang) * 14
            const y1 = 50 + Math.sin(ang) * 14
            const x2 = 50 + Math.cos(ang) * 38
            const y2 = 50 + Math.sin(ang) * 38
            return (
              <line
                key={i}
                x1={Math.round(x1 * 1000) / 1000}
                y1={Math.round(y1 * 1000) / 1000}
                x2={Math.round(x2 * 1000) / 1000}
                y2={Math.round(y2 * 1000) / 1000}
                stroke={
                  i % 3 === 0
                    ? 'rgba(229,57,53,0.7)'
                    : i % 3 === 1
                      ? 'rgba(249,115,22,0.6)'
                      : 'rgba(236,72,153,0.55)'
                }
                strokeWidth={0.8}
                strokeLinecap="round"
              />
            )
          })}
        </motion.svg>
        {/* center burst */}
        <motion.div
          className="absolute h-7 w-7 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,180,170,0.9), rgba(229,57,53,0.4) 60%, rgba(229,57,53,0))',
            filter: 'blur(2px)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* particle dots flying out */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const ang = (i / 6) * Math.PI * 2
          return (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#ff6b63]"
              style={{
                boxShadow: '0 0 6px rgba(229,57,53,0.8)',
              }}
              animate={{
                x: [0, Math.cos(ang) * 32],
                y: [0, Math.sin(ang) * 32],
                opacity: [1, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.2,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

/* 04 Community Management — network nodes. */
function CommunityVisual() {
  // 5 nodes around center hub
  const nodes = Array.from({ length: 5 }, (_, i) => {
    const ang = (i / 5) * Math.PI * 2 - Math.PI / 2
    return {
      x: Math.round((50 + Math.cos(ang) * 28) * 1000) / 1000,
      y: Math.round((50 + Math.sin(ang) * 28) * 1000) / 1000,
    }
  })
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {nodes.map((n, i) => (
          <motion.line
            key={`l-${i}`}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="rgba(229,57,53,0.4)"
            strokeWidth={0.5}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={`n-${i}`}
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80"
          style={{ left: `${n.x}%`, top: `${n.y}%`, boxShadow: '0 0 6px rgba(255,255,255,0.7)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow: '0 0 18px rgba(229,57,53,0.95), 0 0 40px rgba(229,57,53,0.5)',
        }}
      />
    </div>
  )
}

/* 05 Influencer Collaborations — orbiting dots. */
function InfluencersVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* concentric orbits */}
        {[20, 32, 44].map((r, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{ width: `${r * 2}px`, height: `${r * 2}px` }}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 10 + i * 6,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  i === 0
                    ? '#E53935'
                    : i === 1
                      ? '#F97316'
                      : '#EC4899',
                boxShadow:
                  i === 0
                    ? '0 0 8px rgba(229,57,53,0.9)'
                    : i === 1
                      ? '0 0 8px rgba(249,115,22,0.9)'
                      : '0 0 8px rgba(236,72,153,0.9)',
              }}
            />
          </motion.div>
        ))}
        {/* center */}
        <motion.div
          className="absolute h-3 w-3 rounded-full bg-white/90"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 12px rgba(255,255,255,0.6)' }}
        />
      </div>
    </div>
  )
}

/* 06 Trend Activation — ascending sparkline. */
function TrendsVisual() {
  // ascending polyline points (5 points climbing)
  const pts = Array.from({ length: 6 }, (_, k) => {
    const px = 8 + (k / 5) * 84
    const climb = (k / 5) * 60
    const wobble = Math.sin(k * 1.4) * 4
    const py = 78 - climb + wobble
    return `${Math.round(px * 1000) / 1000},${Math.round(py * 1000) / 1000}`
  }).join(' ')
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {/* baseline */}
        <line x1="6" y1="80" x2="94" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth={0.4} />
        {/* ascending polyline */}
        <motion.polyline
          points={pts}
          fill="none"
          stroke="rgba(229,57,53,0.95)"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 3px rgba(229,57,53,0.8))' }}
        />
        {/* area under line */}
        <motion.polygon
          points={`${pts} 92,80 8,80`}
          fill="rgba(229,57,53,0.12)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        {/* end dot */}
        <motion.circle
          cx="92"
          cy="18"
          r="2.5"
          fill="rgba(249,115,22,1)"
          animate={{ r: [2.5, 4, 2.5], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(249,115,22,0.9))' }}
        />
      </svg>
      {/* ▲ trend badge */}
      <motion.div
        className="absolute right-2 top-2 rounded-full border border-[#F97316]/50 bg-[#F97316]/10 px-2 py-0.5 text-[8px] font-bold text-[#F97316]"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
        animate={{ y: [0, -3, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        ▲ viral
      </motion.div>
    </div>
  )
}

/* 07 Content Systems — grid of pulsing cells. */
function SystemsVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1.5 p-2">
        {Array.from({ length: 12 }).map((_, i) => {
          const isAccent =
            i === 0 || i === 5 || i === 7 || i === 10
          return (
            <motion.div
              key={i}
              className="rounded-sm border"
              style={{
                background: isAccent
                  ? 'rgba(229,57,53,0.25)'
                  : 'rgba(255,255,255,0.04)',
                borderColor: isAccent
                  ? 'rgba(229,57,53,0.5)'
                  : 'rgba(255,255,255,0.08)',
              }}
              animate={{
                opacity: isAccent
                  ? [0.5, 1, 0.5]
                  : [0.3, 0.6, 0.3],
                scale: isAccent ? [1, 1.08, 1] : [1, 1, 1],
              }}
              transition={{
                duration: 2 + (i % 4) * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

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
      whileHover={{ y: -6, scale: 1.015, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      className={`group relative overflow-hidden rounded-2xl border bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[#E53935]/55 hover:bg-white/[0.07] sm:p-6 ${
        span === 2 ? 'lg:col-span-2' : ''
      } ${accent ? 'border-[#E53935]/25' : 'border-white/10'}`}
    >
      {/* hover glow bloom — red + orange conic sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: accent
            ? 'conic-gradient(from 220deg at 50% 50%, rgba(229,57,53,0.18), rgba(249,115,22,0.14), rgba(236,72,153,0.12), rgba(229,57,53,0.18))'
            : 'radial-gradient(120% 120% at 100% 0%, rgba(229,57,53,0.16), rgba(249,115,22,0.08) 50%, transparent 70%)',
        }}
      />
      {/* red glow ring on hover (accent only) */}
      {accent && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 shadow-[0_0_30px_rgba(229,57,53,0.3)] transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      {/* pulsing ring (accent only) */}
      {accent && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl border border-[#E53935]/30"
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
                ? 'border-[#E53935]/40 bg-[#E53935]/10 text-[#ff6b63]'
                : 'border-white/15 bg-white/[0.05] text-white/70'
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span
            className={`text-xs font-bold ${
              accent
                ? 'bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent'
                : 'text-[#E53935]'
            }`}
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {n}
          </span>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#E53935] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            {desc}
          </p>
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

      {/* bottom accent line */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-[#F97316] transition-all duration-500 group-hover:w-full"
      />
    </motion.article>
  )
}

/* ===================================================================
   HypeWhatWeBuild — Section 4 named export
   =================================================================== */
export function HypeWhatWeBuild() {
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
              'radial-gradient(circle, rgba(229,57,53,0.18), rgba(229,57,53,0) 65%)',
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
              'radial-gradient(circle, rgba(249,115,22,0.14), rgba(249,115,22,0) 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
        <motion.div
          aria-hidden
          className="absolute left-[8%] top-[16%] h-[22vw] w-[22vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(236,72,153,0.12), rgba(236,72,153,0) 70%)',
            filter: 'blur(44px)',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.18, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionEyebrow number="04" label="What We Build" />

        {/* Massive headline */}
        <h2
          className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">Built for </span>
            <RedGradientText>Momentum.</RedGradientText>
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
          seven services. One engine.{' '}
          <span className="text-white/55">
            Every asset built to compound attention.
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
