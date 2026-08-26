'use client'

/**
 * HypeCampaignShowcase — Section 6 of /the-hype-engine
 *
 * IMMERSIVE CAMPAIGN CARDS + SOCIAL CONTENT WALLS + LIVE ENGAGEMENT FEED.
 *
 * Composition:
 *   - Eyebrow: (06) · Campaign Showcase
 *   - Headline: "Campaigns That" + "Ignite." ("Ignite." red gradient)
 *   - 4 large immersive campaign cards (md+ 2-col staggered).
 *       Each card has a unique animated visual motif:
 *         01 The Launch Sequence  · Product Launch · 4.2M reach
 *            → video preview frame + animated equalizer bars + play button
 *         02 Culture Drop 01      · Brand Film · 180K engagements
 *            → social content wall = grid of pulsing content cells (red/orange/pink)
 *         03 The Tribe Moment     · Community · 12K UGC posts
 *            → live-feed style moving metrics (counters + ticker)
 *         04 Momentum Month       · Always-On · 3.1x follower growth
 *            → ascending sparkline + milestone dots
 *   - Hover: card lifts, red/orange glow blooms, visual motif activates,
 *     metric counts up.
 *   - Live-feed marquee at bottom: "live" engagement events drifting L→R.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Canvas components use the HMR-safe __cleanup pattern.
 */

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from 'framer-motion'
import {
  ArrowUpRight,
  Heart,
  MessageCircle,
  Play,
  Repeat2,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from '@/components/about/shared'

/* ===================================================================
   Campaign content — 4 premium placeholder campaigns.
   =================================================================== */
type Campaign = {
  n: string
  name: string
  category: string
  metricLabel: string
  // count-up target + display formatting
  metricValue: number
  metricDecimals: number
  metricPrefix: string
  metricSuffix: string
  Visual: () => JSX.Element
  accent: 'red' | 'orange' | 'pink'
}

const campaigns: Campaign[] = [
  {
    n: '01',
    name: 'The Launch Sequence',
    category: 'Product Launch',
    metricLabel: 'Reach Generated',
    metricValue: 4.2,
    metricDecimals: 1,
    metricPrefix: '',
    metricSuffix: 'M',
    Visual: LaunchVisual,
    accent: 'red',
  },
  {
    n: '02',
    name: 'Culture Drop 01',
    category: 'Brand Film',
    metricLabel: 'Engagements Driven',
    metricValue: 180,
    metricDecimals: 0,
    metricPrefix: '',
    metricSuffix: 'K',
    Visual: CultureDropVisual,
    accent: 'orange',
  },
  {
    n: '03',
    name: 'The Tribe Moment',
    category: 'Community',
    metricLabel: 'UGC Posts Sparked',
    metricValue: 12,
    metricDecimals: 0,
    metricPrefix: '',
    metricSuffix: 'K+',
    Visual: TribeVisual,
    accent: 'pink',
  },
  {
    n: '04',
    name: 'Momentum Month',
    category: 'Always-On',
    metricLabel: 'Follower Growth',
    metricValue: 3.1,
    metricDecimals: 1,
    metricPrefix: '',
    metricSuffix: 'x',
    Visual: MomentumVisual,
    accent: 'red',
  },
]

const ACCENT_HEX: Record<Campaign['accent'], string> = {
  red: '#E53935',
  orange: '#F97316',
  pink: '#EC4899',
}

const ACCENT_RGB: Record<Campaign['accent'], string> = {
  red: '229,57,53',
  orange: '249,115,22',
  pink: '236,72,153',
}

/* ===================================================================
   01 Launch — video preview frame + animated equalizer bars + play btn.
   =================================================================== */
function LaunchVisual() {
  const bars = [0.55, 0.85, 0.4, 1, 0.7, 0.3, 0.9, 0.5, 0.75, 0.35, 0.95, 0.6]
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* dark base + red wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 60%, rgba(229,57,53,0.22), transparent 65%)',
        }}
      />
      {/* central play button (cinematic) */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[#1A1A1A]/80 backdrop-blur-md transition-all duration-500 group-hover:border-[#E53935] group-hover:bg-[#E53935]/15 sm:h-16 sm:w-16"
          style={{ boxShadow: '0 0 28px rgba(229,57,53,0.4)' }}
        >
          <Play className="h-5 w-5 fill-[#E53935] text-[#E53935] sm:h-6 sm:w-6" />
        </div>
      </motion.div>
      {/* equalizer bars at bottom */}
      <div className="absolute inset-x-6 bottom-6 flex h-12 items-end justify-between gap-1">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-sm"
            style={{
              background:
                i % 3 === 0
                  ? 'rgba(229,57,53,0.85)'
                  : i % 3 === 1
                    ? 'rgba(249,115,22,0.75)'
                    : 'rgba(236,72,153,0.7)',
              boxShadow: `0 0 8px rgba(${i % 3 === 0 ? '229,57,53' : i % 3 === 1 ? '249,115,22' : '236,72,153'},0.5)`,
            }}
            animate={{ scaleY: [h * 0.4, h, h * 0.6, h * 0.9, h * 0.4] }}
            transition={{
              duration: 1.4 + (i % 3) * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.06,
            }}
          />
        ))}
      </div>
      {/* corner timecode */}
      <span className="absolute left-4 top-4 wn-eyebrow text-[9px] font-medium text-white/55">
        00:42 · LIVE CUT
      </span>
    </div>
  )
}

/* ===================================================================
   02 Culture Drop — social content wall: grid of pulsing content cells.
   =================================================================== */
function CultureDropVisual() {
  // 6x4 grid of cells, each with a color + pulse delay
  const cells = Array.from({ length: 24 }, (_, i) => {
    const roll = i % 4
    const color =
      roll === 0
        ? 'rgba(229,57,53,0.55)'
        : roll === 1
          ? 'rgba(249,115,22,0.5)'
          : roll === 2
            ? 'rgba(236,72,153,0.5)'
            : 'rgba(255,255,255,0.1)'
    return { color, i }
  })
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.18), transparent 65%)',
        }}
      />
      <div className="absolute inset-5 grid grid-cols-6 gap-1.5">
        {cells.map((c) => (
          <motion.div
            key={c.i}
            className="rounded-sm"
            style={{ background: c.color }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.92, 1, 0.92] }}
            transition={{
              duration: 1.8 + (c.i % 5) * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (c.i % 7) * 0.18,
            }}
          />
        ))}
      </div>
      {/* trending tag overlay */}
      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-[#1A1A1A]/80 px-2.5 py-1 backdrop-blur-md">
        <Sparkles className="h-3 w-3 text-[#F97316]" />
        <span className="wn-eyebrow text-[9px] font-medium text-white/85">
          TRENDING #01
        </span>
      </div>
    </div>
  )
}

/* ===================================================================
   03 Tribe — live-feed style moving metrics.
   =================================================================== */
function TribeVisual() {
  const events = [
    { Icon: Heart, label: '+128', color: 'rgba(236,72,153,0.9)' },
    { Icon: MessageCircle, label: '@fan commented', color: 'rgba(229,57,53,0.9)' },
    { Icon: Share2, label: '42 shares', color: 'rgba(249,115,22,0.9)' },
    { Icon: Repeat2, label: 'reposted', color: 'rgba(236,72,153,0.9)' },
    { Icon: Users, label: '+24 joined', color: 'rgba(229,57,53,0.9)' },
    { Icon: Heart, label: '+312', color: 'rgba(249,115,22,0.9)' },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(236,72,153,0.18), transparent 65%)',
        }}
      />
      {/* central node — pulsing community core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="h-12 w-12 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(236,72,153,0.9), rgba(229,57,53,0.5) 50%, transparent 80%)',
            filter: 'blur(2px)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Users className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-white" />
      </div>
      {/* orbiting event chips — drifting around the core */}
      {events.map((e, i) => {
        const ang = (i / events.length) * Math.PI * 2
        const dist = 70 + (i % 3) * 14
        const x = Math.round(Math.cos(ang) * dist * 1000) / 1000
        const y = Math.round(Math.sin(ang) * dist * 1000) / 1000
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#1A1A1A]/80 px-2 py-1 backdrop-blur-md"
            style={{
              x: x - 50,
              y: y - 12,
              transform: `translate(${x}px, ${y}px)`,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            <e.Icon className="h-3 w-3" style={{ color: e.color }} />
            <span className="wn-eyebrow text-[8px] font-medium text-white/85">
              {e.label}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ===================================================================
   04 Momentum — ascending sparkline with milestone dots.
   =================================================================== */
function MomentumVisual() {
  // 6 ascending points, precomputed & rounded for hydration safety
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
            'radial-gradient(circle at 50% 80%, rgba(229,57,53,0.2), transparent 65%)',
        }}
      />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="mom-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(229,57,53,0.45)" />
            <stop offset="60%" stopColor="rgba(249,115,22,0.18)" />
            <stop offset="100%" stopColor="rgba(229,57,53,0)" />
          </linearGradient>
          <linearGradient id="mom-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#E53935" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        {/* area fill */}
        <motion.polygon
          points={area}
          fill="url(#mom-area)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
        />
        {/* ascending line — draws in */}
        <motion.polyline
          points={line}
          fill="none"
          stroke="url(#mom-line)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(229,57,53,0.6))' }}
        />
        {/* milestone dots */}
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
            style={{ filter: 'drop-shadow(0 0 4px rgba(229,57,53,0.9))' }}
          />
        ))}
      </svg>
      {/* trailing badge */}
      <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-[#E53935]/40 bg-[#E53935]/10 px-2.5 py-1">
        <TrendingUp className="h-3 w-3 text-[#ff6b63]" />
        <span className="wn-eyebrow text-[9px] font-semibold text-[#ff6b63]">
          +312%
        </span>
      </div>
    </div>
  )
}

/* ===================================================================
   MetricCounter — SSR-safe count-up via framer-motion's animate().
   Starts at 0; only animates when scrolled into view.
   =================================================================== */
function MetricCounter({
  value,
  decimals,
  prefix,
  suffix,
  accent,
}: {
  value: number
  decimals: number
  prefix: string
  suffix: string
  accent: Campaign['accent']
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay(v.toFixed(decimals))
      },
    })
    return () => controls.stop()
  }, [inView, value, decimals])

  return (
    <span
      ref={ref}
      className="text-4xl font-bold leading-none sm:text-5xl"
      style={{
        fontFamily: 'var(--font-display), sans-serif',
        color: ACCENT_HEX[accent],
        textShadow: `0 0 30px rgba(${ACCENT_RGB[accent]},0.5)`,
      }}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/* ===================================================================
   CampaignCard — single immersive glassmorphism card.
   =================================================================== */
function CampaignCard({ c, index }: { c: Campaign; index: number }) {
  const { n, name, category, metricLabel, metricValue, metricDecimals,
    metricPrefix, metricSuffix, Visual, accent } = c
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
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl transition-colors duration-500 hover:border-[#E53935]/55"
    >
      {/* red/orange glow bloom on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 50px rgba(${ACCENT_RGB[accent]},0.28)`,
        }}
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

        {/* REC indicator (top-left) */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#E53935]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 6px rgba(229,57,53,0.85)' }}
          />
          <span className="wn-eyebrow text-[9px] font-medium text-white/55 transition-colors duration-300 group-hover:text-white/85">
            REC
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
        {/* campaign name */}
        <h3
          className="text-2xl font-semibold text-white sm:text-3xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {name}
        </h3>

        {/* metric counter */}
        <div className="mt-5 flex items-baseline gap-2">
          <MetricCounter
            value={metricValue}
            decimals={metricDecimals}
            prefix={metricPrefix}
            suffix={metricSuffix}
            accent={accent}
          />
          <span className="wn-eyebrow text-[10px] font-medium text-white/45">
            {metricLabel}
          </span>
        </div>

        {/* View Campaign row */}
        <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Campaign
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#E53935] opacity-70 transition-opacity duration-300 group-hover:opacity-100">
            View Campaign
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ===================================================================
   LiveFeed — horizontal marquee of "live" engagement events.
   Uses .wn-marquee-track CSS animation (28s linear infinite).
   =================================================================== */
type FeedEvent = {
  Icon: LucideIcon
  text: string
  ago: string
  accent: Campaign['accent']
}

const feedEvents: FeedEvent[] = [
  { Icon: Heart, text: '@maya_liked this', ago: '2s ago', accent: 'pink' },
  { Icon: Share2, text: '+128 shares', ago: '6s ago', accent: 'orange' },
  { Icon: MessageCircle, text: '@fan dropped a comment', ago: '11s ago', accent: 'red' },
  { Icon: TrendingUp, text: 'trending #03', ago: '14s ago', accent: 'red' },
  { Icon: Repeat2, text: '92 reposts', ago: '19s ago', accent: 'pink' },
  { Icon: Users, text: '+24 joined the tribe', ago: '23s ago', accent: 'orange' },
  { Icon: Sparkles, text: '@studio launched a drop', ago: '28s ago', accent: 'red' },
  { Icon: Heart, text: '+1.2K likes', ago: '32s ago', accent: 'pink' },
  { Icon: Share2, text: '284 shares', ago: '37s ago', accent: 'orange' },
  { Icon: MessageCircle, text: 'this is fire', ago: '42s ago', accent: 'red' },
]

function LiveFeedRow() {
  return (
    <div className="flex w-max items-center gap-3">
      {feedEvents.map((e, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 backdrop-blur-md"
        >
          <e.Icon
            className="h-3.5 w-3.5"
            style={{ color: ACCENT_HEX[e.accent] }}
          />
          <span className="text-[11px] font-medium text-white/85">
            {e.text}
          </span>
          <span className="wn-eyebrow text-[9px] text-white/35">· {e.ago}</span>
          <span
            className="h-1 w-1 rounded-full"
            style={{ background: ACCENT_HEX[e.accent] }}
          />
        </div>
      ))}
    </div>
  )
}

function LiveFeed() {
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
      <div className="absolute left-5 top-1/2 z-20 flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-[#E53935]/40 bg-[#141414]/85 px-2.5 py-1 backdrop-blur-md">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#E53935]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 6px rgba(229,57,53,0.95)' }}
        />
        <span className="wn-eyebrow text-[9px] font-semibold text-[#E53935]">
          LIVE
        </span>
      </div>
      {/* marquee track — duplicated for seamless loop */}
      <div className="wn-marquee-track pl-32">
        <LiveFeedRow />
        <LiveFeedRow />
      </div>
    </motion.div>
  )
}

/* ===================================================================
   HypeCampaignShowcase — Section 6 named export.
   =================================================================== */
export function HypeCampaignShowcase() {
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
        <StickyRail
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
                  'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0) 65%)',
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
                  'radial-gradient(circle, rgba(249,115,22,0.14), rgba(249,115,22,0) 70%)',
                filter: 'blur(44px)',
              }}
              animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.15, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            />
          </div>

          {/* Header block */}
          <motion.div style={{ y: headerY }} className="relative z-10 mb-14 max-w-3xl">
            <SectionEyebrow number="06" label="Campaign Showcase" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Campaigns That </MaskLine>
              <MaskLine delay={0.12}>
                <RedGradientText>Ignite.</RedGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              A brand becoming{' '}
              <RedGradientText glow={false}>impossible to ignore.</RedGradientText>{' '}
              Drops engineered to detonate, communities built to compound,
              and always-on systems that turn minutes into momentum.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-4 text-[11px] uppercase tracking-[0.3em] text-white/30"
            >
              Stylized campaigns · representative engagements
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

          {/* Live engagement feed */}
          <div className="relative z-10">
            <LiveFeed />
          </div>
        </div>
      </div>
    </div>
  )
}
