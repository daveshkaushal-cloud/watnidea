'use client'

/**
 * EchoWhatWeBuild — Section 4 of /the-echo-system
 *
 * Premium BENTO GRID — 8 service areas, each its own animated universe.
 *
 * Composition:
 *   - Eyebrow: (04) · Deliverables (CyanEyebrow)
 *   - Headline: "What We" + "Build." (MaskLine, cyan gradient)
 *
 * Bento Grid layout (lg+, 3 cols):
 *   Row 1: [SEO Strategy col-span-2 accent] [AEO Optimization]
 *   Row 2: [Content Systems] [Blog Ecosystems accent] [Search Visibility]
 *   Row 3: [Topic Authority accent] [Knowledge Graph col-span-2]
 *   Row 4: [Content Distribution col-span-3 accent]
 *
 * Each tile:
 *   - glassmorphism (border border-white/10 bg-white/[0.035] backdrop-blur-xl)
 *   - hover lifts (y: -6 spring scale 1.015) + cyan conic sweep (accent) /
 *     cyan radial glow (others) + bottom accent line cyan→neon
 *   - unique animated micro-visual motif inside
 *   - title (font-display, text-xl md:text-2xl font-semibold) + descriptor
 *   - number 01–08 (cyan, font-display)
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Award,
  Bot,
  Eye,
  FileStack,
  Layers,
  Megaphone,
  MessageSquare,
  Network,
  Newspaper,
  Radar,
  Search,
  Send,
  Target,
  type LucideIcon,
} from 'lucide-react'
import {
  CyanEyebrow,
  CyanGradientText,
  MaskLine,
} from '@/components/echo/shared'

/* ===================================================================
   Micro-visuals — one per service (self-contained motion graphics).
 *   These are function declarations so they hoist above the `services`
 *   array that references them by name.
 *   =================================================================== */

/* 01 SEO Strategy — ascending ranking bars + rank-position chips. */
function SeoStrategyVisual() {
  const bars = [40, 58, 72, 84, 96]
  const chips = ['rank #1', 'on-page', 'technical', 'backlinks']
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
                  ? 'linear-gradient(to top, #0e7490, #67e8f9)'
                  : 'linear-gradient(to top, rgba(6,182,212,0.4), rgba(6,182,212,0.15))',
              boxShadow:
                i === bars.length - 1
                  ? '0 0 12px rgba(103,232,249,0.6)'
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
            className="rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/8 px-1.5 py-0.5 text-[7px] font-medium text-[#67e8f9]"
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

/* 02 AEO Optimization — query → answer flow. */
function AeoVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* question chip on the left */}
      <motion.div
        className="absolute left-3 top-3 rounded-lg border border-white/15 bg-white/[0.06] px-2 py-1 text-[8px] font-medium text-white/70"
        animate={{ opacity: [0.5, 1, 0.5], x: [0, 2, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        Q: what is AEO?
      </motion.div>
      {/* flowing dots from Q to A */}
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.path
          d="M 18 18 Q 50 18 50 40"
          fill="none"
          stroke="rgba(6,182,212,0.5)"
          strokeWidth={0.8}
          strokeDasharray="2 1.2"
          animate={{ strokeDashoffset: [0, -6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
      {/* answer chip on the bottom-right */}
      <motion.div
        className="absolute bottom-3 right-3 max-w-[70%] rounded-lg border border-[#06B6D4]/45 bg-[#06B6D4]/10 px-2 py-1 text-[8px] font-medium text-[#67e8f9]"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.02, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        A: Answer Engine Optimization — making content citable by AI.
      </motion.div>
      {/* little AI icon pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#06B6D4]/50 bg-[#06B6D4]/10"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Bot className="h-3 w-3 text-[#67e8f9]" />
      </motion.div>
    </div>
  )
}

/* 03 Content Systems — stacked layers shifting. */
function ContentSystemsVisual() {
  const layers = [
    { w: 92, color: 'rgba(6,182,212,0.18)' },
    { w: 76, color: 'rgba(6,182,212,0.28)' },
    { w: 60, color: 'rgba(6,182,212,0.42)' },
    { w: 44, color: 'rgba(103,232,249,0.6)' },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
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
                  ? '0 0 12px rgba(103,232,249,0.6)'
                  : 'none',
            }}
            animate={{ x: [0, i % 2 === 0 ? 4 : -4, 0], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* 04 Blog Ecosystems — scrolling feed of article cards. */
function BlogEcosystemsVisual() {
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
              <div className="h-5 w-5 shrink-0 rounded-sm bg-gradient-to-br from-[#06B6D4] to-[#0e7490]" />
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="h-1 w-2/3 rounded-sm bg-white/20" />
                <div className="h-0.5 w-1/2 rounded-sm bg-white/10" />
              </div>
              <motion.span
                className="h-1 w-1 rounded-full bg-[#67e8f9]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* 05 Search Visibility — radar sweep with detected query dots. */
function SearchVisibilityVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* concentric radar rings */}
        {[14, 24, 34].map((r, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#06B6D4]/20"
            style={{ width: `${r * 2}px`, height: `${r * 2}px` }}
          />
        ))}
        {/* rotating sweep */}
        <motion.div
          className="absolute h-[68px] w-[68px] rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(6,182,212,0.4), rgba(6,182,212,0) 60deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        {/* detected query dots */}
        {[
          { l: '32%', t: '38%', d: 0 },
          { l: '64%', t: '44%', d: 0.8 },
          { l: '48%', t: '64%', d: 1.4 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#67e8f9]"
            style={{ left: p.l, top: p.t, boxShadow: '0 0 8px rgba(103,232,249,0.95)' }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: p.d }}
          />
        ))}
        {/* center target */}
        <motion.div
          className="absolute h-3 w-3 rounded-full border-2 border-[#06B6D4] bg-[#06B6D4]/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 12px rgba(6,182,212,0.7)' }}
        />
      </div>
    </div>
  )
}

/* 06 Topic Authority — authority meter filling up. */
function TopicAuthorityVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex flex-col justify-center gap-2 p-3">
        {/* meter label */}
        <div className="flex items-center justify-between text-[8px]">
          <span className="font-medium text-white/55">Authority Score</span>
          <motion.span
            className="font-bold text-[#67e8f9]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            94 / 100
          </motion.span>
        </div>
        {/* meter track */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0e7490] via-[#06B6D4] to-[#67e8f9]"
            initial={{ width: 0 }}
            whileInView={{ width: '94%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ boxShadow: '0 0 12px rgba(103,232,249,0.7)' }}
          />
        </div>
        {/* sub-ticks */}
        <div className="mt-1 flex justify-between text-[7px] text-white/35">
          {['Topic', 'Cluster', 'Entity', 'Citation'].map((t, i) => (
            <motion.span
              key={t}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
        {/* authority badge */}
        <motion.div
          className="mt-2 flex w-fit items-center gap-1 rounded-full border border-[#06B6D4]/45 bg-[#06B6D4]/10 px-2 py-0.5 text-[8px] font-bold text-[#67e8f9]"
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.03, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Award className="h-2.5 w-2.5" />
          Verified Authority
        </motion.div>
      </div>
    </div>
  )
}

/* 07 Knowledge Graph Optimization — connected nodes lighting up. */
function KnowledgeGraphVisual() {
  // 5 fixed nodes in a pentagon-ish layout
  const knodes = [
    { x: 18, y: 32 },
    { x: 50, y: 18 },
    { x: 82, y: 32 },
    { x: 68, y: 72 },
    { x: 32, y: 72 },
  ].map((n) => ({
    x: Math.round(n.x * 1000) / 1000,
    y: Math.round(n.y * 1000) / 1000,
  }))
  const kconns: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
    [0, 2],
    [1, 3],
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* connection lines */}
        {kconns.map(([a, b], i) => (
          <motion.line
            key={`k-${i}`}
            x1={knodes[a].x}
            y1={knodes[a].y}
            x2={knodes[b].x}
            y2={knodes[b].y}
            stroke="rgba(6,182,212,0.45)"
            strokeWidth={0.5}
            strokeLinecap="round"
            strokeDasharray="1.5 1"
            animate={{ strokeDashoffset: [0, -4, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{
              duration: 2.5 + (i % 3),
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.2,
            }}
            style={{ filter: 'drop-shadow(0 0 0.6px rgba(6,182,212,0.6))' }}
          />
        ))}
        {/* nodes */}
        {knodes.map((n, i) => (
          <motion.circle
            key={`kn-${i}`}
            cx={n.x}
            cy={n.y}
            r={1.4}
            fill={i === 0 ? 'rgba(103,232,249,0.95)' : 'rgba(6,182,212,0.85)'}
            animate={{ r: [1.2, 1.8, 1.2], opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
            style={{ filter: 'drop-shadow(0 0 1.5px rgba(103,232,249,0.85))' }}
          />
        ))}
      </svg>
      {/* entity label */}
      <div className="absolute left-3 top-3 rounded border border-[#06B6D4]/35 bg-[#06B6D4]/8 px-1.5 py-0.5 text-[8px] font-bold text-[#67e8f9]">
        ENTITY GRAPH
      </div>
    </div>
  )
}

/* 08 Content Distribution — expanding waves from a central send point. */
function ContentDistributionVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* expanding waves */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute rounded-full border border-[#06B6D4]/40"
            style={{ width: '24px', height: '24px' }}
            animate={{
              scale: [1, 5, 5],
              opacity: [0.7, 0, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeOut',
              delay: i * 0.75,
            }}
          />
        ))}
        {/* center send hub */}
        <motion.div
          className="absolute flex h-8 w-8 items-center justify-center rounded-full border border-[#06B6D4]/60 bg-[#06B6D4]/15"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 16px rgba(6,182,212,0.7)' }}
        >
          <Send className="h-3.5 w-3.5 text-[#67e8f9]" />
        </motion.div>
        {/* channel labels */}
        {[
          { l: '12%', t: '24%', label: 'SEO' },
          { l: '78%', t: '20%', label: 'SOC' },
          { l: '14%', t: '70%', label: 'EML' },
          { l: '80%', t: '72%', label: 'PR' },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/8 px-1.5 py-0.5 text-[7px] font-bold text-[#67e8f9]"
            style={{ left: p.l, top: p.t }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            {p.label}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

/* ===================================================================
   Content — 8 service areas (premium descriptors, brand voice).
 *   =================================================================== */
type Service = {
  n: string
  title: string
  desc: string
  Icon: LucideIcon
  span: 1 | 2 | 3 // bento col-span on lg+
  accent: boolean
  Visual: () => JSX.Element
}

const services: Service[] = [
  {
    n: '01',
    title: 'SEO Strategy',
    desc: 'Technical, on-page, and authority SEO engineered to rank your brand where intent already lives — every keyword, every cluster, every page accountable to visibility, not vanity.',
    Icon: Target,
    span: 2,
    accent: true,
    Visual: SeoStrategyVisual,
  },
  {
    n: '02',
    title: 'AEO Optimization',
    desc: 'Optimization for AI answer engines — ChatGPT, Perplexity, Google AI Overviews.',
    Icon: Bot,
    span: 1,
    accent: false,
    Visual: AeoVisual,
  },
  {
    n: '03',
    title: 'Content Systems',
    desc: 'Scalable content architectures that turn scattered posts into a connected library.',
    Icon: Layers,
    span: 1,
    accent: false,
    Visual: ContentSystemsVisual,
  },
  {
    n: '04',
    title: 'Blog Ecosystems',
    desc: 'Topic-clustered blog networks engineered to compound authority — pillar pages, supporting articles, internal links, and refresh cadences that keep content alive and climbing.',
    Icon: Newspaper,
    span: 1,
    accent: true,
    Visual: BlogEcosystemsVisual,
  },
  {
    n: '05',
    title: 'Search Visibility',
    desc: 'Omnichannel visibility tracking across SERPs, AI, and discovery surfaces.',
    Icon: Radar,
    span: 1,
    accent: false,
    Visual: SearchVisibilityVisual,
  },
  {
    n: '06',
    title: 'Topic Authority',
    desc: 'Authority built one cluster at a time — measured, verified, and compounded.',
    Icon: Award,
    span: 1,
    accent: true,
    Visual: TopicAuthorityVisual,
  },
  {
    n: '07',
    title: 'Knowledge Graph Optimization',
    desc: 'Entity mapping, structured data, and schema that make your brand legible to search and AI alike — turning disconnected pages into a knowledge graph that surfaces in every relevant query, snippet, and answer.',
    Icon: Network,
    span: 2,
    accent: false,
    Visual: KnowledgeGraphVisual,
  },
  {
    n: '08',
    title: 'Content Distribution',
    desc: 'Every asset placed where discovery happens — SEO, social, email, PR, syndication, and AI surfaces — engineered as one distribution system so content doesn\u2019t just publish, it propagates. Each piece amplifies the next, and visibility compounds across every channel where your audience already exists.',
    Icon: Megaphone,
    span: 3,
    accent: true,
    Visual: ContentDistributionVisual,
  },
]

/* ===================================================================
   BentoTile — single service tile (glassmorphism + hover effects).
 *   Hooks at the top — receives no scroll-driven motion values.
 *   =================================================================== */
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
      className={`group relative overflow-hidden rounded-2xl border bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[#06B6D4]/55 hover:bg-white/[0.07] sm:p-6 ${
        span === 2
          ? 'lg:col-span-2'
          : span === 3
            ? 'lg:col-span-3'
            : ''
      } ${accent ? 'border-[#06B6D4]/25' : 'border-white/10'}`}
    >
      {/* hover glow — cyan conic sweep (accent) / radial glow (others) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: accent
            ? 'conic-gradient(from 220deg at 50% 50%, rgba(6,182,212,0.22), rgba(103,232,249,0.16), rgba(14,116,144,0.14), rgba(6,182,212,0.22))'
            : 'radial-gradient(120% 120% at 100% 0%, rgba(6,182,212,0.18), rgba(103,232,249,0.08) 50%, transparent 70%)',
        }}
      />
      {/* cyan glow ring on hover (accent only) */}
      {accent && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      {/* pulsing ring (accent only) */}
      {accent && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl border border-[#06B6D4]/30"
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
                ? 'border-[#06B6D4]/40 bg-[#06B6D4]/10 text-[#67e8f9]'
                : 'border-white/15 bg-white/[0.05] text-white/70'
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span
            className={`text-xs font-bold ${
              accent
                ? 'bg-gradient-to-br from-[#67e8f9] via-[#06B6D4] to-[#0e7490] bg-clip-text text-transparent'
                : 'text-[#06B6D4]'
            }`}
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {n}
          </span>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#06B6D4] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Explore
          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {/* grid: content + visual */}
      <div
        className={`relative z-10 grid gap-4 ${
          span === 3
            ? 'grid-cols-1 sm:grid-cols-[1fr_280px]'
            : span === 2
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
            span === 3 ? 'h-32 sm:h-auto' : span === 2 ? 'h-32 sm:h-auto' : 'h-28'
          }`}
        >
          <Visual />
        </div>
      </div>

      {/* bottom accent line — cyan → neon */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#06B6D4] to-[#67e8f9] transition-all duration-500 group-hover:w-full"
      />
    </motion.article>
  )
}

/* ===================================================================
   EchoWhatWeBuild — Section 4 named export
 *   =================================================================== */
export function EchoWhatWeBuild() {
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
              'radial-gradient(circle, rgba(6,182,212,0.18), rgba(6,182,212,0) 65%)',
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
              'radial-gradient(circle, rgba(59,130,246,0.18), rgba(59,130,246,0) 70%)',
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
              'radial-gradient(circle, rgba(103,232,249,0.12), rgba(103,232,249,0) 70%)',
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
        <CyanEyebrow number="04" label="Deliverables" />

        {/* Massive headline */}
        <h2
          className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">What We </span>
            <CyanGradientText>Build.</CyanGradientText>
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
          seven services. One visibility engine.{' '}
          <span className="text-white/55">
            Every asset built to compound discovery.
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
