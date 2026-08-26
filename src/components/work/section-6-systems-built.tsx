'use client'

/**
 * WorkSystemsBuilt — Section 6 of /work
 *
 * IMMERSIVE INTERCONNECTED-SYSTEM NODE GRAPH + CYCLIC FLOW.
 *
 * The Work page is the FIRST multi-color page in the WatNidea site.
 * This section shows how WatNidea connects services — not as discrete
 * deliverables, but as a single interconnected system. Each node keeps
 * its own service color (Aura gold, Digital blue, Hype red, Growth
 * green, Cinema purple, Echo cyan); a 7th outcome node ("Growth")
 * merges brand red + white as the destination all services feed into.
 *
 * Composition:
 *   - Eyebrow: (06) · The System (WorkEyebrow — brand red)
 *   - Headline: "We Don't Deliver Services." +
 *       ServiceGradientText "We Build Systems." (red unifying)
 *   - Large interactive SVG node-graph:
 *       • Central "WatNidea System" core (brand-red radial glow +
 *         pulsing white pinpoint).
 *       • 7 nodes around it (each in its service color):
 *           1. Identity      (gold    — Aura)
 *           2. Website       (blue    — Digital HQ)
 *           3. Content       (red     — Hype Engine)
 *           4. Ads           (green   — Growth Alchemy)
 *           5. SEO           (cyan    — Echo System)
 *           6. AI            (purple  — Synthetic Cinema)
 *           7. Growth        (white/red — outcome)
 *       • Animated SVG connection lines between adjacent nodes (a
 *         cyclic chain Identity → Website → Content → Ads → SEO →
 *         AI → Growth → back to Identity), each tinted by its source
 *         service color. Lines draw in via pathLength 0→1 on useInView.
 *       • Colored particles travel along each connection (motion.circle
 *         animating cx/cy) showing information flow.
 *       • Hub→node "spokes" connect the central core to every outer
 *         node in the node's service color.
 *       • HOVER: hovering a node highlights its outgoing + incoming
 *         connections and dims all others; a tooltip shows the node's
 *         role.
 *   - Below the graph: a cyclic flow strip of 4 statements
 *     reinforcing "systems not services":
 *       • "Identity feeds Website."
 *       • "Website feeds Content."
 *       • "Content feeds Ads. Ads feed Growth."
 *       • "Growth feeds Identity. The loop compounds."
 *   - WorkStickyRail ("Systems" / "Interconnected") on lg+.
 *   - ServiceAmbient + MultiColorEmberCanvas layered for atmosphere.
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
  Bot,
  Eye,
  Fingerprint,
  Globe,
  LineChart,
  Megaphone,
  Search,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import {
  MultiColorEmberCanvas,
  ServiceAmbient,
  ServiceColorDot,
  ServiceGradientText,
  WORK_COLORS,
  WorkEyebrow,
  WorkStickyRail,
  MaskLine,
  type ServiceColorKey,
} from '@/components/work/shared'

/* ===================================================================
   Node graph geometry.
   - Hub at (50, 50)
   - 7 outer nodes evenly distributed around the hub at radius 36
   - Connection chain: Identity → Website → Content → Ads → SEO →
     AI → Growth → (back to Identity)
   - Hub→node spokes for every outer node
   All coords pre-rounded for hydration safety.
   =================================================================== */
const HUB = { x: 50, y: 50 }
const NODE_R = 36

type NodeId =
  | 'identity'
  | 'website'
  | 'content'
  | 'ads'
  | 'seo'
  | 'ai'
  | 'growth'

type SysNode = {
  id: NodeId
  label: string
  role: string
  angle: number // degrees, 0 = top, clockwise
  Icon: LucideIcon
  color: ServiceColorKey | 'growth'
}

/* The 7 nodes — 6 services + 1 outcome. Order matters: this is the
   cyclic chain order. */
const NODES: SysNode[] = [
  {
    id: 'identity',
    label: 'Identity',
    role: 'Brand foundation — logo, system, voice. Every brief starts here.',
    angle: -90, // top
    Icon: Fingerprint,
    color: 'aura',
  },
  {
    id: 'website',
    label: 'Website',
    role: 'The Digital HQ — where every visit either compounds or leaks.',
    angle: -90 + 360 / 7,
    Icon: Globe,
    color: 'digital',
  },
  {
    id: 'content',
    label: 'Content',
    role: 'The Hype Engine — attention-capturing creative at scale.',
    angle: -90 + (2 * 360) / 7,
    Icon: Megaphone,
    color: 'hype',
  },
  {
    id: 'ads',
    label: 'Ads',
    role: 'Growth Alchemy — performance spend tuned to convert.',
    angle: -90 + (3 * 360) / 7,
    Icon: LineChart,
    color: 'growth',
  },
  {
    id: 'seo',
    label: 'SEO',
    role: 'The Echo System — discoverable on every surface that matters.',
    angle: -90 + (4 * 360) / 7,
    Icon: Search,
    color: 'echo',
  },
  {
    id: 'ai',
    label: 'AI',
    role: 'Synthetic Cinema — synthetic creative at the speed of thought.',
    angle: -90 + (5 * 360) / 7,
    Icon: Bot,
    color: 'cinema',
  },
  {
    id: 'growth',
    label: 'Growth',
    role: 'The outcome. Revenue, retention, momentum. Then it feeds back in.',
    angle: -90 + (6 * 360) / 7,
    Icon: Sparkles,
    color: 'growth',
  },
]

/* Outcome node — white + brand red (the destination all services
   flow into). */
const GROWTH_HEX = '#ffffff'
const GROWTH_DEEP = '#E53935'
const GROWTH_RGB = '255,255,255'

function nodeHex(node: SysNode): string {
  if (node.color === 'growth') return GROWTH_HEX
  return WORK_COLORS[node.color].hex
}
function nodeSoft(node: SysNode): string {
  if (node.color === 'growth') return '#ffe3e3'
  return WORK_COLORS[node.color].soft
}
function nodeGlow(node: SysNode): string {
  if (node.color === 'growth') return 'rgba(229,57,53,0.5)'
  return WORK_COLORS[node.color].glow
}
function nodeRGB(node: SysNode): string {
  if (node.color === 'growth') return GROWTH_RGB
  return WORK_COLORS[node.color].rgb
}

function polar(angleDeg: number, radius: number, cx = 50, cy = 50) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
    y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000,
  }
}

/* Pre-compute node positions. */
const NODE_POS: Record<NodeId, { x: number; y: number }> = NODES.reduce(
  (acc, n) => {
    acc[n.id] = polar(n.angle, NODE_R)
    return acc
  },
  {} as Record<NodeId, { x: number; y: number }>
)

/* Cyclic chain: each node links to the next, last links to first. */
const CHAIN: Array<{ from: NodeId; to: NodeId }> = NODES.map((n, i) => ({
  from: n.id,
  to: NODES[(i + 1) % NODES.length].id,
}))

/* ===================================================================
   SystemGraph — interactive SVG node-graph.
   Hover a node to highlight its connections; others dim.
   =================================================================== */
function SystemGraph() {
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
      {/* multi-color ambient wash inside the graph card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.10), rgba(229,57,53,0) 55%), radial-gradient(circle at 20% 80%, rgba(245,158,11,0.08), transparent 60%), radial-gradient(circle at 80% 20%, rgba(6,182,212,0.08), transparent 60%)',
        }}
      />

      {/* top status row */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-7">
        <div className="flex items-center gap-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#E53935]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 6px rgba(229,57,53,0.95)' }}
          />
          <span className="wn-eyebrow text-[9px] font-semibold text-[#fca5a5]">
            LIVE · WATNIDEA SYSTEM
          </span>
        </div>
        <span className="wn-eyebrow text-[9px] font-medium text-white/40">
          {NODES.length} nodes · {CHAIN.length} connections
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
            {/* hub radial gradient — brand red */}
            <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(252,165,165,0.95)" />
              <stop offset="40%" stopColor="rgba(229,57,53,0.55)" />
              <stop offset="100%" stopColor="rgba(229,57,53,0)" />
            </radialGradient>

            {/* one gradient per service color, for chain links */}
            {NODES.map((n) => {
              const hex = nodeHex(n)
              const soft = nodeSoft(n)
              return (
                <linearGradient
                  key={`grad-${n.id}`}
                  id={`chain-grad-${n.id}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor={soft} stopOpacity="0.95" />
                  <stop offset="100%" stopColor={hex} stopOpacity="0.55" />
                </linearGradient>
              )
            })}

            {/* spoke gradients — service color to faded white */}
            {NODES.map((n) => {
              const hex = nodeHex(n)
              return (
                <linearGradient
                  key={`spoke-grad-${n.id}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="rgba(229,57,53,0.6)" />
                  <stop offset="100%" stopColor={hex} stopOpacity="0.5" />
                </linearGradient>
              )
            })}
          </defs>

          {/* === hub→node spokes (draw in via pathLength) === */}
          {NODES.map((n, i) => {
            const isHot = hovered === null || hovered === i
            const opacity = isHot ? 0.55 : 0.12
            const width = hovered === i ? 0.7 : 0.45
            const pos = NODE_POS[n.id]
            return (
              <motion.line
                key={`spoke-${n.id}`}
                x1={HUB.x}
                y1={HUB.y}
                x2={pos.x}
                y2={pos.y}
                stroke={`url(#spoke-grad-${n.id})`}
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
                    duration: 0.9,
                    delay: 0.15 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: { duration: 0.4 },
                }}
                style={{
                  filter: isHot
                    ? `drop-shadow(0 0 1.4px ${nodeGlow(n)})`
                    : 'none',
                }}
              />
            )
          })}

          {/* === cyclic chain connection lines === */}
          {CHAIN.map((c, i) => {
            const fromNode = NODES.find((n) => n.id === c.from)!
            const fromIdx = NODES.findIndex((n) => n.id === c.from)
            const toIdx = NODES.findIndex((n) => n.id === c.to)
            const isHot =
              hovered === null || hovered === fromIdx || hovered === toIdx
            const opacity = isHot ? 0.95 : 0.18
            const width = hovered === fromIdx || hovered === toIdx ? 0.9 : 0.55
            const from = NODE_POS[c.from]
            const to = NODE_POS[c.to]
            return (
              <motion.line
                key={`chain-${c.from}-${c.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={`url(#chain-grad-${c.from})`}
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
                    delay: 0.5 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: { duration: 0.4 },
                }}
                style={{
                  filter:
                    hovered === fromIdx || hovered === toIdx
                      ? `drop-shadow(0 0 1.6px ${nodeGlow(fromNode)})`
                      : 'none',
                }}
              />
            )
          })}

          {/* === flowing particles along the cyclic chain === */}
          {inView &&
            CHAIN.map((c, i) => {
              const fromNode = NODES.find((n) => n.id === c.from)!
              const fromIdx = NODES.findIndex((n) => n.id === c.from)
              const isHot = hovered === null || hovered === fromIdx
              const from = NODE_POS[c.from]
              const to = NODE_POS[c.to]
              return (
                <motion.circle
                  key={`fp-${c.from}-${c.to}`}
                  r={0.8}
                  fill={nodeSoft(fromNode)}
                  initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                  animate={{
                    cx: [from.x, to.x],
                    cy: [from.y, to.y],
                    opacity: isHot ? [0, 1, 0] : [0, 0.2, 0],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.2 + i * 0.3,
                    times: [0, 0.5, 1],
                  }}
                  style={{
                    filter: `drop-shadow(0 0 2.4px ${nodeGlow(fromNode)})`,
                  }}
                />
              )
            })}

          {/* === hub→node spoke particles (information flowing in) === */}
          {inView &&
            NODES.map((n, i) => {
              const pos = NODE_POS[n.id]
              const isHot = hovered === null || hovered === i
              return (
                <motion.circle
                  key={`spoke-p-${n.id}`}
                  r={0.6}
                  fill={nodeSoft(n)}
                  initial={{ cx: pos.x, cy: pos.y, opacity: 0 }}
                  animate={{
                    cx: [pos.x, HUB.x],
                    cy: [pos.y, HUB.y],
                    opacity: isHot ? [0, 1, 0] : [0, 0.2, 0],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.6 + i * 0.25,
                    times: [0, 0.5, 1],
                  }}
                  style={{ filter: `drop-shadow(0 0 2px ${nodeGlow(n)})` }}
                />
              )
            })}

          {/* === hub node === */}
          <g>
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              r={9.5}
              fill="url(#hub-glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
            />
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              r={3.6}
              fill="#b91c1c"
              stroke="#fca5a5"
              strokeWidth={0.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
            />
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              r={1.3}
              fill="#ffffff"
              animate={{ scale: [1, 1.35, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
            />
            {/* outer rotating accent ring on the hub */}
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              r={6.5}
              fill="none"
              stroke="rgba(229,57,53,0.45)"
              strokeWidth={0.25}
              strokeDasharray="1.2 1.4"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              style={{
                transformOrigin: `${HUB.x}px ${HUB.y}px`,
              }}
            />
          </g>

          {/* === outer nodes (interactive hit targets) === */}
          {NODES.map((n, i) => {
            const pos = NODE_POS[n.id]
            const isHot = hovered === null || hovered === i
            const nodeOpacity = isHot ? 1 : 0.45
            const hex = nodeHex(n)
            const rgb = nodeRGB(n)
            const glow = nodeGlow(n)
            return (
              <g key={`nd-${n.id}`}>
                {/* outer ring */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={hovered === i ? 5.6 : 4.4}
                  fill={`rgba(${rgb}, 0.16)`}
                  stroke={isHot ? hex : `rgba(${rgb}, 0.4)`}
                  strokeWidth={hovered === i ? 0.65 : 0.45}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: nodeOpacity } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    transformOrigin: `${pos.x}px ${pos.y}px`,
                    filter: hovered === i ? `drop-shadow(0 0 3px ${glow})` : 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                />
                {/* inner dot */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={1.5}
                  fill={hex}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: nodeOpacity } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                  pointerEvents="none"
                />
                {/* tiny rotating accent on hover */}
                {hovered === i && (
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={7.2}
                    fill="none"
                    stroke={hex}
                    strokeWidth={0.18}
                    strokeDasharray="0.8 1.2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6, rotate: 360 }}
                    transition={{
                      opacity: { duration: 0.3 },
                      rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                    }}
                    style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                  />
                )}
              </g>
            )
          })}
        </svg>

        {/* === HTML overlay labels (absolute-positioned over the SVG) === */}
        <div className="pointer-events-none absolute inset-0">
          {/* hub label */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: '50%', marginTop: '9%' }}
          >
            <div className="flex flex-col items-center">
              <span
                className="wn-eyebrow text-[8px] font-bold tracking-[0.3em] text-[#fca5a5]"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                WATNIDEA
              </span>
              <span
                className="wn-eyebrow mt-0.5 text-[7px] font-medium tracking-[0.3em] text-white/40"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                SYSTEM CORE
              </span>
            </div>
          </div>

          {/* node labels */}
          {NODES.map((n, i) => {
            // position label slightly outward from node center
            const rad = (n.angle * Math.PI) / 180
            const lx = Math.round((50 + (NODE_R + 11) * Math.cos(rad)) * 1000) / 1000
            const ly = Math.round((50 + (NODE_R + 11) * Math.sin(rad)) * 1000) / 1000
            const isHot = hovered === null || hovered === i
            const hex = nodeHex(n)
            return (
              <div
                key={`lb-${n.id}`}
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
                    hovered === i ? 'border-white/40' : 'border-white/10'
                  }`}
                  style={
                    hovered === i
                      ? { boxShadow: `0 0 14px ${nodeGlow(n)}` }
                      : undefined
                  }
                >
                  <n.Icon
                    className="h-3 w-3"
                    style={{ color: hex }}
                  />
                  <span
                    className="wn-eyebrow text-[8px] font-semibold text-white/85"
                    style={{ fontFamily: 'var(--font-display), sans-serif' }}
                  >
                    {n.label}
                  </span>
                </div>
              </div>
            )
          })}

          {/* === tooltip for hovered node === */}
          {hovered !== null && (
            <div
              className="absolute -translate-x-1/2"
              style={{
                left: `${NODE_POS[NODES[hovered].id].x}%`,
                top: `${NODE_POS[NODES[hovered].id].y + 9}%`,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="max-w-[180px] rounded-lg border border-white/15 bg-black/85 px-3 py-2 backdrop-blur-md"
                style={{ boxShadow: `0 0 18px ${nodeGlow(NODES[hovered])}` }}
              >
                <div className="flex items-center gap-1.5">
                  <ServiceColorDot
                    color={NODES[hovered].color === 'growth' ? 'hype' : NODES[hovered].color}
                    size={8}
                  />
                  <span
                    className="wn-eyebrow text-[9px] font-bold tracking-[0.18em]"
                    style={{ color: nodeHex(NODES[hovered]) }}
                  >
                    {NODES[hovered].label.toUpperCase()}
                  </span>
                </div>
                <p className="mt-1.5 text-[10px] leading-snug text-white/75">
                  {NODES[hovered].role}
                </p>
              </motion.div>
            </div>
          )}
        </div>

        {/* corner brackets — viewfinder aesthetic */}
        <CornerBracket pos="tl" />
        <CornerBracket pos="tr" />
        <CornerBracket pos="bl" />
        <CornerBracket pos="br" />
      </motion.div>

      {/* bottom legend strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 px-5 py-4 sm:px-7">
        <span className="wn-eyebrow text-[9px] font-medium text-white/40">
          Hover a node to trace its connections
        </span>
        <div className="flex items-center gap-3">
          {NODES.slice(0, 6).map((n) => (
            <span key={n.id} className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: nodeHex(n), boxShadow: `0 0 6px ${nodeGlow(n)}` }}
              />
              <span className="wn-eyebrow text-[8px] font-medium text-white/45">
                {n.label}
              </span>
            </span>
          ))}
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
      className={`pointer-events-none absolute h-4 w-4 border-[#E53935]/40 ${map[pos]}`}
    />
  )
}

/* ===================================================================
   CyclicFlowStrip — 4 short statements reinforcing "systems not
   services" arranged as a cyclic flow.
   =================================================================== */
type FlowStmt = {
  n: string
  text: string
  color: ServiceColorKey | 'growth'
}

const flowStatements: FlowStmt[] = [
  { n: '01', text: 'Identity feeds Website.', color: 'aura' },
  { n: '02', text: 'Website feeds Content.', color: 'digital' },
  { n: '03', text: 'Content feeds Ads. Ads feed Growth.', color: 'growth' },
  { n: '04', text: 'Growth feeds Identity. The loop compounds.', color: 'hype' },
]

function stmtHex(c: ServiceColorKey | 'growth'): string {
  if (c === 'growth') return GROWTH_DEEP
  return WORK_COLORS[c].hex
}

function CyclicFlowStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-md sm:p-7"
    >
      {/* subtle multi-color wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 0% 50%, rgba(245,158,11,0.06), transparent 30%), radial-gradient(circle at 100% 50%, rgba(229,57,53,0.06), transparent 30%)',
        }}
      />

      <div className="relative z-10 mb-5 flex items-center gap-2">
        <Eye className="h-3.5 w-3.5 text-[#fca5a5]" />
        <span className="wn-eyebrow text-[10px] font-semibold text-white/55">
          THE CYCLIC FLOW
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {flowStatements.map((s, i) => {
          const hex = stmtHex(s.color)
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-xl border border-white/10 bg-white/[0.05] p-4 transition-colors duration-300 hover:border-white/20"
              style={{
                boxShadow: `inset 0 -1px 0 0 ${hex}00`,
              }}
            >
              {/* top accent dot */}
              <div
                aria-hidden
                className="absolute left-4 top-4 h-1.5 w-1.5 rounded-full"
                style={{
                  background: hex,
                  boxShadow: `0 0 6px ${hex}`,
                }}
              />
              <div className="flex items-baseline gap-2 pl-5">
                <span
                  className="text-[10px] font-bold text-white/30"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  ({s.n})
                </span>
              </div>
              <p
                className="mt-2 text-sm font-medium leading-snug text-white/85"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                {s.text}
              </p>
              {/* arrow to next statement (except last → loops back) */}
              {i < flowStatements.length - 1 && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-2 top-1/2 z-20 hidden -translate-y-1/2 lg:block"
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3">
                    <path
                      d="M 4 8 L 12 8 M 9 5 L 12 8 L 9 11"
                      fill="none"
                      stroke={hex}
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.55"
                    />
                  </svg>
                </div>
              )}
              {i === flowStatements.length - 1 && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-2 top-1/2 z-20 hidden -translate-y-1/2 lg:block"
                >
                  <svg viewBox="0 0 24 16" className="h-3 w-5">
                    <path
                      d="M 20 8 C 14 2, 6 2, 2 8"
                      fill="none"
                      stroke={hex}
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeDasharray="1.4 1.6"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ===================================================================
   WorkSystemsBuilt — Section 6 named export.
   =================================================================== */
export function WorkSystemsBuilt() {
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
        <WorkStickyRail
          label="Systems"
          caption="Interconnected"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-16 sm:px-8 lg:py-24">
          {/* Layered ambient + multi-color ember particles */}
          <ServiceAmbient color="hype" />
          <MultiColorEmberCanvas count={28} />

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-12 max-w-3xl"
          >
            <WorkEyebrow number="06" label="The System" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>We Don&apos;t Deliver Services. </MaskLine>
              <MaskLine delay={0.12}>
                <ServiceGradientText color="hype">
                  We Build Systems.
                </ServiceGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Identity feeds Website. Website feeds Content. Content feeds
              Ads. Ads feed Growth. Growth feeds Identity. Every service
              we ship is a{' '}
              <ServiceGradientText color="hype" glow={false}>
                node in one living system
              </ServiceGradientText>{' '}
              — and the loop compounds.
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

          {/* Interactive system graph */}
          <div className="relative z-10">
            <SystemGraph />
          </div>

          {/* Cyclic flow strip */}
          <div className="relative z-10">
            <CyclicFlowStrip />
          </div>
        </div>
      </div>
    </div>
  )
}
