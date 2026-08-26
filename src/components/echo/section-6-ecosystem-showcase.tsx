'use client'

/**
 * EchoEcosystemShowcase — Section 6 of /the-echo-system
 *
 * IMMERSIVE CONTENT-ECOSYSTEM NODE GRAPH + ARCHETYPE CARDS.
 *
 * Composition:
 *   - Eyebrow: (06) · The Ecosystem (CyanEyebrow)
 *   - Headline: "Content" + "Ecosystem" ("Ecosystem" cyan gradient)
 *   - Large interactive node-graph visualization:
 *       • Central "Brand Knowledge Hub" node (cyan glow core).
 *       • 6 topic clusters orbiting the hub at hex positions
 *         (Pillar Content, Topic Authority, Long-tail Discovery,
 *          Answer Engine, Search Journeys, Authority Signals).
 *       • Each cluster has 3 child article nodes positioned outward.
 *       • SVG connection lines (hub↔cluster + cluster↔children) that
 *         draw in on whileInView via pathLength, then animate
 *         strokeDashoffset for a continuous "information flow".
 *       • Cyan particles travel from hub → cluster → child repeatedly
 *         (motion.circle animating cx/cy).
 *       • Hover interaction: hovering a cluster highlights its
 *         connections (higher opacity + width) and dims all others.
 *   - 4 ecosystem archetype cards below the graph:
 *       Pillar Article · Topic Cluster · Answer Page · Distribution Asset
 *     Each with a mini-visual + illustrative metric.
 *   - CyanStickyRail ("Showcase" / "Living Network").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Math-derived positions are pre-rounded via
 * Math.round(x*1000)/1000 to avoid hydration mismatches.
 */

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import {
  Activity,
  BookOpen,
  Compass,
  FileText,
  GitBranch,
  Globe,
  Network,
  Radio,
  Search,
  Share2,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import {
  CyanAmbient,
  CyanEmberCanvas,
  CyanEyebrow,
  CyanGradientText,
  CyanStickyRail,
  MaskLine,
} from '@/components/echo/shared'

/* ===================================================================
   Ecosystem geometry — hub at (50, 50), 6 clusters at hex positions.
   All coords pre-rounded for hydration safety.
   =================================================================== */
const HUB = { x: 50, y: 50 }
const CLUSTER_R = 31
const CHILD_R = 9

type ClusterId =
  | 'pillar'
  | 'topic'
  | 'longtail'
  | 'answer'
  | 'journey'
  | 'authority'

type Cluster = {
  id: ClusterId
  label: string
  angle: number // degrees, 0 = top, clockwise
  Icon: LucideIcon
  childCount: number
}

const CLUSTERS: Cluster[] = [
  { id: 'pillar', label: 'Pillar Content', angle: 0, Icon: BookOpen, childCount: 3 },
  { id: 'topic', label: 'Topic Authority', angle: 60, Icon: Network, childCount: 4 },
  { id: 'longtail', label: 'Long-tail Discovery', angle: 120, Icon: Search, childCount: 4 },
  { id: 'answer', label: 'Answer Engine', angle: 180, Icon: Radio, childCount: 3 },
  { id: 'journey', label: 'Search Journeys', angle: 240, Icon: Compass, childCount: 4 },
  { id: 'authority', label: 'Authority Signals', angle: 300, Icon: Activity, childCount: 3 },
]

function polar(angleDeg: number, radius: number, cx = 50, cy = 50) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: Math.round((cx + radius * Math.sin(rad)) * 1000) / 1000,
    y: Math.round((cy - radius * Math.cos(rad)) * 1000) / 1000,
  }
}

type ChildNode = { x: number; y: number }

type ClusterGeom = Cluster & {
  pos: { x: number; y: number }
  children: ChildNode[]
}

const CLUSTER_GEOM: ClusterGeom[] = CLUSTERS.map((c) => {
  const pos = polar(c.angle, CLUSTER_R)
  // Children spread in an arc facing outward (away from hub).
  const spread = c.childCount === 3 ? [-24, 0, 24] : [-30, -10, 10, 30]
  const children = spread.map((off) => polar(c.angle + off, CHILD_R, pos.x, pos.y))
  return { ...c, pos, children }
})

/* ===================================================================
   EcosystemGraph — interactive SVG node-graph.
   Hover a cluster to highlight its connections + children; others dim.
   =================================================================== */
function EcosystemGraph() {
  const [hovered, setHovered] = useState<number | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { once: true, amount: 0.3 })

  // Soft cursor-follow parallax for the whole graph (subtle drift)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 50, damping: 22 })
  const sy = useSpring(my, { stiffness: 50, damping: 22 })
  const graphX = useTransform(sx, [0, 1], [-8, 8])
  const graphY = useTransform(sy, [0, 1], [-6, 6])

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)))
    my.set(Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)))
  }
  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={wrapRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-xl"
    >
      {/* cyan ambient wash inside the graph card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.12), rgba(6,182,212,0) 65%)',
        }}
      />

      {/* top status row */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-7">
        <div className="flex items-center gap-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 6px rgba(6,182,212,0.95)' }}
          />
          <span className="wn-eyebrow text-[9px] font-semibold text-[#67e8f9]">
            LIVE · KNOWLEDGE GRAPH
          </span>
        </div>
        <span className="wn-eyebrow text-[9px] font-medium text-white/40">
          {CLUSTER_GEOM.length} clusters ·{' '}
          {CLUSTER_GEOM.reduce((n, c) => n + c.children.length, 0)} nodes
        </span>
      </div>

      {/* the SVG graph */}
      <motion.div
        style={{ x: graphX, y: graphY }}
        className="relative aspect-square w-full sm:aspect-[16/11]"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(165,243,252,0.95)" />
              <stop offset="40%" stopColor="rgba(6,182,212,0.55)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0)" />
            </radialGradient>
            <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(6,182,212,0.85)" />
              <stop offset="100%" stopColor="rgba(103,232,249,0.85)" />
            </linearGradient>
            <linearGradient id="line-grad-dim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(6,182,212,0.4)" />
              <stop offset="100%" stopColor="rgba(103,232,249,0.4)" />
            </linearGradient>
          </defs>

          {/* === hub→cluster connection lines === */}
          {CLUSTER_GEOM.map((c, i) => {
            const isHot = hovered === null || hovered === i
            const opacity = isHot ? 0.95 : 0.18
            const width = hovered === i ? 0.9 : 0.55
            return (
              <motion.line
                key={`hc-${c.id}`}
                x1={HUB.x}
                y1={HUB.y}
                x2={c.pos.x}
                y2={c.pos.y}
                stroke={isHot ? 'url(#line-grad)' : 'url(#line-grad-dim)'}
                strokeWidth={width}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  inView
                    ? { pathLength: 1, opacity }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  pathLength: {
                    duration: 1.1,
                    delay: 0.2 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: { duration: 0.4 },
                }}
                style={{
                  filter: isHot
                    ? 'drop-shadow(0 0 1.2px rgba(6,182,212,0.85))'
                    : 'none',
                }}
              />
            )
          })}

          {/* === cluster→child connection lines === */}
          {CLUSTER_GEOM.map((c, ci) =>
            c.children.map((ch, chi) => {
              const isHot = hovered === null || hovered === ci
              const opacity = isHot ? 0.7 : 0.12
              const width = hovered === ci ? 0.6 : 0.35
              return (
                <motion.line
                  key={`cc-${c.id}-${chi}`}
                  x1={c.pos.x}
                  y1={c.pos.y}
                  x2={ch.x}
                  y2={ch.y}
                  stroke="rgba(103,232,249,0.85)"
                  strokeWidth={width}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    inView
                      ? { pathLength: 1, opacity }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    pathLength: {
                      duration: 0.7,
                      delay: 0.7 + ci * 0.06 + chi * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    },
                    opacity: { duration: 0.4 },
                  }}
                />
              )
            })
          )}

          {/* === flowing particles along hub→cluster === */}
          {inView &&
            CLUSTER_GEOM.map((c, i) => (
              <motion.circle
                key={`fp-${c.id}`}
                r={0.7}
                fill="#a5f3fc"
                initial={{ cx: HUB.x, cy: HUB.y, opacity: 0 }}
                animate={{
                  cx: [HUB.x, c.pos.x],
                  cy: [HUB.y, c.pos.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.2 + i * 0.35,
                  times: [0, 0.5, 1],
                }}
                style={{ filter: 'drop-shadow(0 0 2px rgba(103,232,249,0.95))' }}
              />
            ))}

          {/* === hub node === */}
          <g>
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              r={9}
              fill="url(#hub-glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
            />
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              r={3.4}
              fill="#0e7490"
              stroke="#67e8f9"
              strokeWidth={0.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
            />
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              r={1.2}
              fill="#ffffff"
              animate={{ scale: [1, 1.3, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
            />
          </g>

          {/* === cluster nodes + child nodes === */}
          {CLUSTER_GEOM.map((c, ci) => {
            const isHot = hovered === null || hovered === ci
            const clusterOpacity = isHot ? 1 : 0.45
            return (
              <g key={`cl-${c.id}`}>
                {/* children */}
                {c.children.map((ch, chi) => (
                  <motion.circle
                    key={`ch-${c.id}-${chi}`}
                    cx={ch.x}
                    cy={ch.y}
                    r={0.9}
                    fill={isHot ? '#67e8f9' : 'rgba(103,232,249,0.4)'}
                    stroke="rgba(6,182,212,0.5)"
                    strokeWidth={0.18}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.85 + ci * 0.06 + chi * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ transformOrigin: `${ch.x}px ${ch.y}px` }}
                  />
                ))}
                {/* cluster body — interactive hit target */}
                <motion.circle
                  cx={c.pos.x}
                  cy={c.pos.y}
                  r={hovered === ci ? 5.4 : 4.2}
                  fill="rgba(6,182,212,0.18)"
                  stroke={isHot ? '#06B6D4' : 'rgba(6,182,212,0.4)'}
                  strokeWidth={hovered === ci ? 0.6 : 0.4}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: clusterOpacity } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + ci * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    transformOrigin: `${c.pos.x}px ${c.pos.y}px`,
                    filter:
                      hovered === ci
                        ? 'drop-shadow(0 0 3px rgba(6,182,212,0.95))'
                        : 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHovered(ci)}
                  onMouseLeave={() => setHovered(null)}
                />
                <motion.circle
                  cx={c.pos.x}
                  cy={c.pos.y}
                  r={1.4}
                  fill="#67e8f9"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: clusterOpacity } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + ci * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: `${c.pos.x}px ${c.pos.y}px` }}
                  pointerEvents="none"
                />
              </g>
            )
          })}
        </svg>

        {/* === HTML overlay labels (absolute-positioned over the SVG) === */}
        <div className="pointer-events-none absolute inset-0">
          {/* hub label */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: '50%', marginTop: '8.5%' }}
          >
            <div className="flex flex-col items-center">
              <span
                className="wn-eyebrow text-[8px] font-bold tracking-[0.3em] text-[#67e8f9]"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                BRAND HUB
              </span>
            </div>
          </div>

          {/* cluster labels */}
          {CLUSTER_GEOM.map((c, ci) => {
            // position label slightly outward from cluster center
            const rad = (c.angle * Math.PI) / 180
            const lx = 50 + (CLUSTER_R + 9) * Math.sin(rad)
            const ly = 50 - (CLUSTER_R + 9) * Math.cos(rad)
            const isHot = hovered === null || hovered === ci
            return (
              <div
                key={`lb-${c.id}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${lx}%`,
                  top: `${ly}%`,
                  opacity: isHot ? 1 : 0.55,
                  transition: 'opacity 300ms ease',
                }}
              >
                <div
                  className={`flex items-center gap-1.5 rounded-md border bg-black/55 px-2 py-1 backdrop-blur-md transition-colors duration-300 ${
                    hovered === ci
                      ? 'border-[#06B6D4]/70'
                      : 'border-white/10'
                  }`}
                  style={
                    hovered === ci
                      ? { boxShadow: '0 0 14px rgba(6,182,212,0.4)' }
                      : undefined
                  }
                >
                  <c.Icon
                    className="h-3 w-3"
                    style={{ color: hovered === ci ? '#67e8f9' : '#06B6D4' }}
                  />
                  <span
                    className="wn-eyebrow text-[8px] font-semibold text-white/85"
                    style={{ fontFamily: 'var(--font-display), sans-serif' }}
                  >
                    {c.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* corner brackets — viewfinder aesthetic */}
        <CornerBracket pos="tl" />
        <CornerBracket pos="tr" />
        <CornerBracket pos="bl" />
        <CornerBracket pos="br" />
      </motion.div>

      {/* bottom legend strip */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/8 px-5 py-4 sm:px-7">
        <span className="wn-eyebrow text-[9px] font-medium text-white/40">
          Hover a cluster to trace its discovery paths
        </span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#67e8f9]" />
            <span className="wn-eyebrow text-[8px] font-medium text-white/45">
              Cluster
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-white/70" />
            <span className="wn-eyebrow text-[8px] font-medium text-white/45">
              Article
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
            <span className="wn-eyebrow text-[8px] font-medium text-white/45">
              Hub
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ===================================================================
   CornerBracket — small viewfinder corner accent on the graph card.
   =================================================================== */
function CornerBracket({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const map = {
    tl: 'top-3 left-3 border-t border-l',
    tr: 'top-3 right-3 border-t border-r',
    bl: 'bottom-3 left-3 border-b border-l',
    br: 'bottom-3 right-3 border-b border-r',
  } as const
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute h-4 w-4 border-[#06B6D4]/40 ${map[pos]}`}
    />
  )
}

/* ===================================================================
   Archetype cards — 4 content archetypes with mini-visual + metric.
   =================================================================== */
type Archetype = {
  n: string
  name: string
  desc: string
  metric: string
  metricLabel: string
  Icon: LucideIcon
}

const archetypes: Archetype[] = [
  {
    n: '01',
    name: 'Pillar Article',
    desc: 'Long-form foundational content that anchors a topic cluster and earns authority at the source.',
    metric: '2,400+',
    metricLabel: 'words engineered',
    Icon: BookOpen,
  },
  {
    n: '02',
    name: 'Topic Cluster',
    desc: '8–12 supporting articles that orbit a pillar, interlinked to compound topical authority.',
    metric: '12x',
    metricLabel: 'authority multiplier',
    Icon: GitBranch,
  },
  {
    n: '03',
    name: 'Answer Page',
    desc: 'AEO-formatted Q&A built for answer engines — structured, citable, citation-worthy.',
    metric: '47%',
    metricLabel: 'AI answer presence',
    Icon: Radio,
  },
  {
    n: '04',
    name: 'Distribution Asset',
    desc: 'One idea, repurposed across every surface — social, video, audio, newsletter, voice.',
    metric: '6',
    metricLabel: 'surfaces per asset',
    Icon: Share2,
  },
]

function ArchetypeCard({ a, index }: { a: Archetype; index: number }) {
  return (
    <motion.article
      data-cursor={a.name}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-[#06B6D4]/55"
    >
      {/* cyan glow bloom on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 0%, rgba(6,182,212,0.22), transparent 60%)',
        }}
      />

      {/* top row: number + icon */}
      <div className="relative z-10 mb-5 flex items-center justify-between">
        <span
          className="text-sm font-bold text-white/30"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          ({a.n})
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[#06B6D4] transition-colors duration-300 group-hover:border-[#06B6D4]/50 group-hover:text-[#67e8f9]">
          <a.Icon className="h-5 w-5" />
        </span>
      </div>

      {/* mini visual — small node cluster motif */}
      <div className="relative z-10 mb-4 h-10">
        <svg viewBox="0 0 100 24" className="h-full w-full" aria-hidden>
          <line
            x1="10"
            y1="12"
            x2="40"
            y2="12"
            stroke="rgba(6,182,212,0.5)"
            strokeWidth="0.6"
          />
          <line
            x1="40"
            y1="12"
            x2="65"
            y2="6"
            stroke="rgba(103,232,249,0.4)"
            strokeWidth="0.4"
          />
          <line
            x1="40"
            y1="12"
            x2="65"
            y2="18"
            stroke="rgba(103,232,249,0.4)"
            strokeWidth="0.4"
          />
          <line
            x1="65"
            y1="6"
            x2="90"
            y2="6"
            stroke="rgba(103,232,249,0.3)"
            strokeWidth="0.3"
          />
          <line
            x1="65"
            y1="18"
            x2="90"
            y2="18"
            stroke="rgba(103,232,249,0.3)"
            strokeWidth="0.3"
          />
          <circle cx="10" cy="12" r="2.4" fill="#06B6D4" />
          <circle cx="40" cy="12" r="1.6" fill="#67e8f9" />
          <circle cx="65" cy="6" r="1.2" fill="#67e8f9" />
          <circle cx="65" cy="18" r="1.2" fill="#67e8f9" />
          <circle cx="90" cy="6" r="0.9" fill="#ffffff" opacity="0.85" />
          <circle cx="90" cy="18" r="0.9" fill="#ffffff" opacity="0.85" />
        </svg>
      </div>

      {/* title */}
      <h4
        className="relative z-10 text-xl font-semibold text-white sm:text-2xl"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        {a.name}
      </h4>

      {/* descriptor */}
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/55">
        {a.desc}
      </p>

      {/* metric */}
      <div className="relative z-10 mt-5 flex items-baseline gap-2 border-t border-white/8 pt-4">
        <span
          className="text-2xl font-bold text-[#67e8f9]"
          style={{
            fontFamily: 'var(--font-display), sans-serif',
            textShadow: '0 0 16px rgba(103,232,249,0.5)',
          }}
        >
          {a.metric}
        </span>
        <span className="wn-eyebrow text-[10px] font-medium text-white/45">
          {a.metricLabel}
        </span>
      </div>

      {/* bottom hairline accent that fills on hover */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{
          background: 'linear-gradient(to right, #06B6D4, transparent)',
        }}
      />
    </motion.article>
  )
}

/* ===================================================================
   Live discovery marquee — drifting L→R chips.
   Uses .wn-marquee-track CSS animation.
   =================================================================== */
type DiscoChip = { Icon: LucideIcon; text: string }

const discoChips: DiscoChip[] = [
  { Icon: Search, text: 'Organic' },
  { Icon: Radio, text: 'AI Answers' },
  { Icon: Globe, text: 'Knowledge Graph' },
  { Icon: Sparkles, text: 'Voice' },
  { Icon: Compass, text: 'Discovery' },
  { Icon: Activity, text: 'Authority' },
  { Icon: FileText, text: 'Pillar' },
  { Icon: Network, text: 'Cluster' },
  { Icon: Share2, text: 'Distribution' },
  { Icon: BookOpen, text: 'Long-tail' },
]

function DiscoMarqueeRow() {
  return (
    <div className="flex w-max items-center gap-3">
      {discoChips.map((c, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 backdrop-blur-md"
        >
          <c.Icon className="h-3.5 w-3.5 text-[#06B6D4]" />
          <span className="text-[11px] font-medium text-white/85">{c.text}</span>
          <span className="h-1 w-1 rounded-full bg-[#67e8f9]" />
        </div>
      ))}
    </div>
  )
}

function DiscoMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] py-4 backdrop-blur-md"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#141414] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#141414] to-transparent"
      />
      <div className="absolute left-5 top-1/2 z-20 flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-[#06B6D4]/40 bg-[#141414]/85 px-2.5 py-1 backdrop-blur-md">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 6px rgba(6,182,212,0.95)' }}
        />
        <span className="wn-eyebrow text-[9px] font-semibold text-[#06B6D4]">
          DISCOVERABLE
        </span>
      </div>
      <div className="wn-marquee-track pl-32">
        <DiscoMarqueeRow />
        <DiscoMarqueeRow />
      </div>
    </motion.div>
  )
}

/* ===================================================================
   EchoEcosystemShowcase — Section 6 named export.
   =================================================================== */
export function EchoEcosystemShowcase() {
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
        <CyanStickyRail
          label="Showcase"
          caption="Living Network"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Layered ambient + ember particles */}
          <CyanAmbient />
          <CyanEmberCanvas count={28} />

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-12 max-w-3xl"
          >
            <CyanEyebrow number="06" label="The Ecosystem" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Content </MaskLine>
              <MaskLine delay={0.12}>
                <CyanGradientText>Ecosystem</CyanGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Pillar content, topic clusters, answer pages, distribution assets
              — all wired into one{' '}
              <CyanGradientText glow={false}>living network</CyanGradientText>{' '}
              where every node compounds the visibility of every other.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-4 text-[11px] uppercase tracking-[0.3em] text-white/30"
            >
              Stylized graph · representative architecture
            </motion.p>
          </motion.div>

          {/* Interactive ecosystem graph */}
          <div className="relative z-10">
            <EcosystemGraph />
          </div>

          {/* 4 archetype cards */}
          <div className="relative z-10 mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {archetypes.map((a, i) => (
              <ArchetypeCard key={a.n} a={a} index={i} />
            ))}
          </div>

          {/* Discovery marquee */}
          <div className="relative z-10">
            <DiscoMarquee />
          </div>
        </div>
      </div>
    </div>
  )
}
