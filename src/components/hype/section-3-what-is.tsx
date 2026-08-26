'use client'

/**
 * HypeWhatIs — Section 3 of /the-hype-engine
 *
 * Full-screen storytelling. "What Is The Hype Engine."
 *
 * Visual concept — the connected attention ecosystem:
 *   A central red hub (the engine) with 6 ecosystem nodes orbiting around
 *   it. SVG connecting lines pulse red/orange; energy flows between
 *   systems. Mouse-reactive (useCursorParallax). A canvas with particles
 *   that scatter → organize into the network formation driven by scroll.
 *
 * 6 nodes:
 *   01 Content Creation · 02 Distribution · 03 Community Building
 *   04 Engagement · 05 Influence · 06 Brand Authority
 *
 * 6 CapabilityCards (glassmorphism) — one per node, with lucide icon
 * (PenTool / Share2 / Users / Heart / TrendingUp / Crown), name + 1-line desc.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Canvas uses the HMR-safe __cleanup pattern.
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  ArrowUpRight,
  Crown,
  Heart,
  PenTool,
  Share2,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {
  SectionEyebrow,
  MaskLine,
  RedGradientText,
  useCursorParallax,
} from '@/components/about/shared'

/* ===================================================================
   Content — verbatim paragraphs + 6 ecosystem nodes + 6 capability cards.
   =================================================================== */
const paragraphs = [
  {
    strong: 'The Hype Engine',
    rest: ' is the system that connects every piece of content, every distribution channel, and every community touchpoint into a single self-reinforcing attention loop.',
  },
  {
    strong: '',
    rest: 'It bridges content creation, distribution, community building, and engagement so momentum compounds instead of evaporating.',
  },
  {
    strong: '',
    rest: 'Every post feeds the next campaign. Every comment fuels the next trend. Every trend builds the next layer of brand authority.',
  },
]

type Node = {
  n: string
  name: string
  // angle in degrees (6 nodes at 60° intervals, starting at -90° = top)
  angle: number
  Icon: LucideIcon
  desc: string
}

const nodes: Node[] = [
  {
    n: '01',
    name: 'Content Creation',
    angle: -90,
    Icon: PenTool,
    desc: 'Scroll-stopping creative built to be shared.',
  },
  {
    n: '02',
    name: 'Distribution',
    angle: -30,
    Icon: Share2,
    desc: 'Right platform, right format, right moment.',
  },
  {
    n: '03',
    name: 'Community Building',
    angle: 30,
    Icon: Users,
    desc: 'Audiences into tribes that advocate for you.',
  },
  {
    n: '04',
    name: 'Engagement',
    angle: 90,
    Icon: Heart,
    desc: 'Conversations engineered, not left to chance.',
  },
  {
    n: '05',
    name: 'Influence',
    angle: 150,
    Icon: TrendingUp,
    desc: 'Cultural gravity that pulls the market toward you.',
  },
  {
    n: '06',
    name: 'Brand Authority',
    angle: 210,
    Icon: Crown,
    desc: 'The category-defining voice people quote.',
  },
]

// Pre-compute node positions on a circle (radius 38% of container).
// Round to 3 decimals to avoid SSR/hydration float mismatches.
const NODE_RADIUS = 38
const nodePositions = nodes.map((n) => {
  const rad = (n.angle * Math.PI) / 180
  return {
    ...n,
    x: Math.round((50 + Math.cos(rad) * NODE_RADIUS) * 1000) / 1000,
    y: Math.round((50 + Math.sin(rad) * NODE_RADIUS) * 1000) / 1000,
  }
})

type Card = {
  num: string
  title: string
  desc: string
  Icon: LucideIcon
  accent: boolean
}

const cards: Card[] = nodes.map((n, i) => ({
  num: n.n,
  title: n.name,
  desc: n.desc,
  Icon: n.Icon,
  accent: i % 2 === 0,
}))

/* ===================================================================
   HighlightCard — reusing the established card pattern.
   =================================================================== */
function HighlightCard({ card, index }: { card: Card; index: number }) {
  const { num, title, desc, Icon, accent } = card
  return (
    <motion.article
      data-cursor="View"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 5 + index * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4,
        }}
        className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 group-hover:border-[#E53935]/50 group-hover:bg-white/[0.07] sm:p-6"
      >
        {/* hover glow — red + orange conic sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(120% 120% at 100% 0%, rgba(229,57,53,0.18), rgba(249,115,22,0.1) 50%, transparent 70%)',
          }}
        />

        {/* number + icon */}
        <div className="relative z-10 mb-5 flex items-center justify-between">
          <span
            className={`text-2xl font-bold ${
              accent
                ? 'bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent'
                : 'text-white/30'
            }`}
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {num}
          </span>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300 ${
              accent
                ? 'border-[#E53935]/40 bg-[#E53935]/10 text-[#ff6b63]'
                : 'border-white/10 bg-white/[0.05] text-white/55 group-hover:border-white/30 group-hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
        </div>

        <h3
          className="relative z-10 text-base font-semibold text-white sm:text-lg"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {title}
        </h3>
        <p className="relative z-10 mt-1.5 text-sm leading-relaxed text-white/55">
          {desc}
        </p>

        {/* arrow on hover */}
        <div className="relative z-10 mt-4 flex items-center gap-1.5 text-xs font-medium text-[#E53935] opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>Explore</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* bottom accent line */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-[#F97316] transition-all duration-500 group-hover:w-full"
        />
      </motion.div>
    </motion.article>
  )
}

/* ===================================================================
   EcosystemCanvas — particle system that organizes into a 6-node network
   formation as the user scrolls. progress (0→1) drives scatter → organized.
   Particles flow along the network lines (between center hub + 6 nodes).
   =================================================================== */
function EcosystemCanvas({ progress }: { progress: MotionValue<number> }) {
  return (
    <canvas
      ref={(c) => {
        if (!c) return
        const prev = (c as { __cleanup?: () => void }).__cleanup
        if (prev) prev()
        const ctx = c.getContext('2d')
        if (!ctx) return

        let raf = 0
        let w = 0
        let h = 0
        let dpr = 1
        let progressVal = 0
        const reduce =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches

        type P = {
          // scatter position
          sx: number
          sy: number
          // organized position (on a line from center to one of 6 nodes)
          ox: number
          oy: number
          // travel param 0..1 along the line (flows toward the node)
          t: number
          tSpeed: number
          r: number
          // 1 = red, 2 = orange, 3 = pink, 0 = white
          hue: 0 | 1 | 2 | 3
          phase: number
        }
        const ps: P[] = []

        const unsubscribe = progress.on('change', (v) => {
          progressVal = v
        })

        const resize = () => {
          const parent = c.parentElement
          if (!parent) return
          dpr = Math.min(window.devicePixelRatio || 1, 2)
          w = parent.clientWidth
          h = parent.clientHeight
          c.width = w * dpr
          c.height = h * dpr
          c.style.width = w + 'px'
          c.style.height = h + 'px'
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

          ps.length = 0
          const n = reduce ? 0 : 90
          const cx = w / 2
          const cy = h / 2
          const radius = Math.min(w, h) * 0.36
          for (let i = 0; i < n; i++) {
            const nodeIdx = i % 6
            const ang = (nodes[nodeIdx].angle * Math.PI) / 180
            const nx = cx + Math.cos(ang) * radius
            const ny = cy + Math.sin(ang) * radius
            const roll = Math.random()
            const hue: P['hue'] =
              roll < 0.4 ? 1 : roll < 0.7 ? 2 : roll < 0.85 ? 3 : 0
            ps.push({
              sx: Math.random() * w,
              sy: Math.random() * h,
              ox: nx,
              oy: ny,
              t: Math.random(),
              tSpeed: 0.002 + Math.random() * 0.004,
              r: Math.random() * 1.6 + 0.4,
              hue,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          const t = performance.now() / 1000
          const p = progressVal
          // ease the progress for a smoother transition
          const ep = p * p * (3 - 2 * p)
          const cx = w / 2
          const cy = h / 2

          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < ps.length; i++) {
            const pt = ps[i]
            // advance travel param when organized
            pt.t += pt.tSpeed * (0.3 + 0.7 * ep)
            if (pt.t >= 1) pt.t = 0
            // position: lerp scatter → organized (which is itself a point
            // along the line from center to node, driven by pt.t)
            const orgX = cx + (pt.ox - cx) * pt.t
            const orgY = cy + (pt.oy - cy) * pt.t
            const x = pt.sx + (orgX - pt.sx) * ep
            const y = pt.sy + (orgY - pt.sy) * ep
            // subtle breathing
            const px = x + (1 - ep) * Math.sin(t * 0.6 + pt.phase) * 4
            const py = y + (1 - ep) * Math.cos(t * 0.5 + pt.phase) * 4

            const radius = pt.hue === 0 ? pt.r * 2 : 10
            const g = ctx.createRadialGradient(px, py, 0, px, py, radius)
            if (pt.hue === 1) {
              const a = 0.45 * (0.6 + 0.4 * ep)
              g.addColorStop(0, `rgba(229,57,53,${a})`)
              g.addColorStop(1, 'rgba(229,57,53,0)')
            } else if (pt.hue === 2) {
              const a = 0.42 * (0.6 + 0.4 * ep)
              g.addColorStop(0, `rgba(249,115,22,${a})`)
              g.addColorStop(1, 'rgba(249,115,22,0)')
            } else if (pt.hue === 3) {
              const a = 0.42 * (0.6 + 0.4 * ep)
              g.addColorStop(0, `rgba(236,72,153,${a})`)
              g.addColorStop(1, 'rgba(236,72,153,0)')
            } else {
              const flick = 0.5 + 0.5 * Math.sin(t * 1.4 + pt.phase)
              const a = (0.18 + 0.5 * flick) * (0.5 + 0.5 * ep)
              g.addColorStop(0, `rgba(255,255,255,${a})`)
              g.addColorStop(1, 'rgba(255,255,255,0)')
            }
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(px, py, radius, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.globalCompositeOperation = 'source-over'

          raf = requestAnimationFrame(draw)
        }

        resize()
        window.addEventListener('resize', resize)
        if (!reduce) raf = requestAnimationFrame(draw)

        ;(c as { __cleanup?: () => void }).__cleanup = () => {
          cancelAnimationFrame(raf)
          window.removeEventListener('resize', resize)
          unsubscribe()
        }
      }}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}

/* ===================================================================
   NetworkVisual — the central red hub + 6 orbiting nodes with SVG lines.
   Mouse-reactive (uses sx/sy springs from useCursorParallax for depth).
   =================================================================== */
function NetworkVisual({
  sx,
  sy,
  progress,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
  progress: MotionValue<number>
}) {
  // parallax: hub moves least, nodes move more, lines mid
  const hubX = useTransform(sx, [0, 1], [-6, 6])
  const hubY = useTransform(sy, [0, 1], [-4, 4])
  const nodeX = useTransform(sx, [0, 1], [-14, 14])
  const nodeY = useTransform(sy, [0, 1], [-10, 10])
  const lineX = useTransform(sx, [0, 1], [-9, 9])
  const lineY = useTransform(sy, [0, 1], [-6, 6])

  // nodes fade in as the formation organizes
  const nodesOpacity = useTransform(progress, [0.3, 0.55], [0, 1])
  // slow orbit rotation
  const orbitRotate = useTransform(progress, [0, 1], [-12, 12])

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* SVG connecting lines (pulse red/orange) */}
      <motion.div style={{ x: lineX, y: lineY }} className="absolute inset-0">
        <motion.div
          style={{ opacity: nodesOpacity }}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            {nodePositions.map((n, i) => (
              <motion.line
                key={`line-${i}`}
                x1="50"
                y1="50"
                x2={n.x}
                y2={n.y}
                stroke={
                  i % 2 === 0
                    ? 'rgba(229,57,53,0.45)'
                    : 'rgba(249,115,22,0.4)'
                }
                strokeWidth={0.4}
                animate={{ opacity: [0.25, 0.85, 0.25] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.18,
                }}
                style={{ filter: 'drop-shadow(0 0 1px rgba(229,57,53,0.6))' }}
              />
            ))}
            {/* arcs between consecutive nodes */}
            {nodePositions.map((n, i) => {
              const next = nodePositions[(i + 1) % nodePositions.length]
              return (
                <motion.path
                  key={`arc-${i}`}
                  d={`M ${n.x} ${n.y} Q 50 50 ${next.x} ${next.y}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={0.25}
                  strokeDasharray="1 1.5"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                />
              )
            })}
          </svg>
        </motion.div>
      </motion.div>

      {/* Orbiting nodes */}
      <motion.div
        style={{ x: nodeX, y: nodeY, opacity: nodesOpacity, rotate: orbitRotate }}
        className="absolute inset-0"
      >
        {nodePositions.map((n, i) => (
          <div
            key={`node-${i}`}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <motion.div
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.035] backdrop-blur-xl"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4 + i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
              style={{
                boxShadow:
                  i % 3 === 0
                    ? '0 0 18px rgba(229,57,53,0.35)'
                    : i % 3 === 1
                      ? '0 0 18px rgba(249,115,22,0.3)'
                      : '0 0 18px rgba(236,72,153,0.3)',
              }}
            >
              <n.Icon
                className={
                  i % 3 === 0
                    ? 'h-4 w-4 text-[#ff6b63]'
                    : i % 3 === 1
                      ? 'h-4 w-4 text-[#F97316]'
                      : 'h-4 w-4 text-[#EC4899]'
                }
              />
            </motion.div>
            <span className="wn-eyebrow text-[9px] font-medium text-white/70 sm:text-[10px]">
              {n.name}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Central hub — pulsing red energy core */}
      <motion.div
        style={{ x: hubX, y: hubY }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.45), rgba(229,57,53,0) 70%)',
            filter: 'blur(16px)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,180,170,0.7), rgba(229,57,53,0.3) 60%, rgba(229,57,53,0))',
            filter: 'blur(6px)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
          animate={{ scale: [1, 1.4, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            boxShadow:
              '0 0 24px rgba(229,57,53,0.95), 0 0 60px rgba(229,57,53,0.5)',
          }}
        />
      </motion.div>
    </div>
  )
}

/* ===================================================================
   HypeWhatIs — Section 3 named export
   =================================================================== */
export function HypeWhatIs() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // mouse-reactive parallax (declared unconditionally at top)
  const { sx, sy, handlers } = useCursorParallax(60, 20)

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlers.move}
      onPointerLeave={handlers.leave}
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#141414]/70 px-5 py-24 backdrop-blur-sm sm:px-8 sm:py-32 lg:py-40"
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
          className="absolute right-[8%] bottom-[10%] h-[26vw] w-[26vw] rounded-full"
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
          className="absolute left-[6%] top-[14%] h-[22vw] w-[22vw] rounded-full"
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
        <SectionEyebrow number="03" label="What Is The Hype Engine" />

        {/* Massive headline */}
        <h2
          className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">The Hype Engine is your</span>
          </MaskLine>
          <MaskLine delay={0.12}>
            <RedGradientText>Attention Engine.</RedGradientText>
          </MaskLine>
        </h2>

        {/* Split: body paragraphs (left) + network ecosystem (right) */}
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* LEFT: body paragraphs */}
          <div className="max-w-xl space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-base leading-relaxed text-white/65 sm:text-lg"
              >
                {p.strong && (
                  <span className="font-semibold text-white">{p.strong}</span>
                )}
                {p.rest}
              </motion.p>
            ))}

            {/* Sub-manifesto line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 border-l-2 border-[#E53935] pl-5"
            >
              <p
                className="text-xl font-medium leading-snug text-white sm:text-2xl"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                Six systems.{' '}
                <RedGradientText glow={false}>One engine.</RedGradientText>{' '}
                Compounding attention.
              </p>
            </motion.div>
          </div>

          {/* RIGHT: network ecosystem that organizes from scatter */}
          <div className="relative">
            <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A]/80">
              <EcosystemCanvas progress={scrollYProgress} />
              <NetworkVisual sx={sx} sy={sy} progress={scrollYProgress} />

              {/* corner labels */}
              <div className="pointer-events-none absolute left-4 top-4 wn-eyebrow text-[10px] text-white/45">
                The Attention Ecosystem
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 text-[10px] text-white/30">
                Content · Distribution · Community · Engagement · Influence · Authority
              </div>
            </div>
          </div>
        </div>

        {/* 6 capability cards */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <HighlightCard key={card.num} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
