'use client'

/**
 * EchoWhatIs — Section 3 of /the-echo-system
 *
 * Full-screen storytelling. "What Is The Echo System."
 *
 * Visual concept — the content ecosystem:
 *   A central pulsing core — "The Content Engine" — sits at the center.
 *   6 glassmorphism nodes orbit around it on a slowly rotating ring:
 *     SEO · AEO · Search Visibility · Authority · Content Distribution ·
 *     Brand Discovery. Each node has an animated SVG connection line
 *     back to the core that pulses with flowing cyan particles. On
 *   hover, a node scales up, its connection line brightens, and its
 *   descriptor expands. The whole thing is mouse-reactive.
 *
 * 6 orbiting nodes (lucide icons):
 *   Search · Bot · Eye · Award · Share2 · Compass
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Canvas uses the HMR-safe __cleanup pattern.
 */

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'framer-motion'
import {
  ArrowUpRight,
  Award,
  Bot,
  Compass,
  Eye,
  Search,
  Share2,
  type LucideIcon,
} from 'lucide-react'
import {
  CyanEyebrow,
  CyanGradientText,
  CyanAmbient,
  MaskLine,
  useCursorParallax,
} from '@/components/echo/shared'

/* ===================================================================
   Content — verbatim positioning paragraphs + 6 orbiting capability
   nodes.
   =================================================================== */
const paragraphs = [
  {
    strong: 'The Echo System',
    rest: ' is your visibility operating system. Content enters the engine. SEO surfaces it. AEO tunes it for AI. Authority compounds it. Distribution amplifies it. Discovery finds it — everywhere your audience exists.',
  },
  {
    strong: '',
    rest: 'Every page has a purpose. Every cluster has a topic. Every topic has authority. Nothing publishes in isolation, and nothing stays invisible for long.',
  },
  {
    strong: '',
    rest: 'This is not content marketing. This is a discoverability engine — a living search ecosystem that turns what you create into what the internet surfaces.',
  },
]

type OrbitNode = {
  n: string
  name: string
  // angle on the ring (degrees, 0 = top, going clockwise)
  angle: number
  Icon: LucideIcon
  desc: string
}

const nodes: OrbitNode[] = [
  {
    n: '01',
    name: 'SEO',
    angle: 0,
    Icon: Search,
    desc: 'Rank where intent lives.',
  },
  {
    n: '02',
    name: 'AEO',
    angle: 60,
    Icon: Bot,
    desc: 'Become the answer AI cites.',
  },
  {
    n: '03',
    name: 'Search Visibility',
    angle: 120,
    Icon: Eye,
    desc: 'Surface across every query surface.',
  },
  {
    n: '04',
    name: 'Authority',
    angle: 180,
    Icon: Award,
    desc: 'Earn the trust that compounds.',
  },
  {
    n: '05',
    name: 'Content Distribution',
    angle: 240,
    Icon: Share2,
    desc: 'Place content where discovery happens.',
  },
  {
    n: '06',
    name: 'Brand Discovery',
    angle: 300,
    Icon: Compass,
    desc: 'Be found before the search begins.',
  },
]

// Pre-compute node positions on the ring (radius 38% of container).
// Format: x,y in viewBox 0..100 coordinates for SVG, plus % for the DOM.
const RING_RADIUS = 38
const nodePositions = nodes.map((n) => {
  const rad = ((n.angle - 90) * Math.PI) / 180 // -90 so 0deg = top
  const x = 50 + Math.cos(rad) * RING_RADIUS
  const y = 50 + Math.sin(rad) * RING_RADIUS
  return {
    ...n,
    x: Math.round(x * 1000) / 1000,
    y: Math.round(y * 1000) / 1000,
  }
})

/* ===================================================================
   OrbitRing — the rotating ring holding the 6 nodes + their
 *   connection lines to the center. The whole ring rotates slowly;
 *   each node counter-rotates to stay upright. Hover state is local
 *   per node.
 *   =================================================================== */
function OrbitRing({
  sx,
  sy,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  // mouse parallax on the whole ring
  const ringX = useTransform(sx, [0, 1], [-10, 10])
  const ringY = useTransform(sy, [0, 1], [-6, 6])

  return (
    <motion.div
      style={{ x: ringX, y: ringY }}
      className="absolute inset-0"
      aria-hidden
    >
      {/* Rotating ring container — holds SVG connection lines + node wrappers */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        {/* SVG: connection lines from each node to center + dashed orbit ring */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {/* dashed orbit ring */}
          <circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(6,182,212,0.18)"
            strokeWidth={0.18}
            strokeDasharray="0.6 0.8"
          />
          {/* secondary inner ring */}
          <circle
            cx="50"
            cy="50"
            r={RING_RADIUS * 0.62}
            fill="none"
            stroke="rgba(103,232,249,0.10)"
            strokeWidth={0.14}
            strokeDasharray="0.4 0.9"
          />

          {/* connection lines from each node to center (animated dash flow) */}
          {nodePositions.map((n, i) => (
            <motion.line
              key={`conn-${i}`}
              x1={n.x}
              y1={n.y}
              x2="50"
              y2="50"
              stroke={
                i % 2 === 0
                  ? 'url(#echo-orbit-line-cyan)'
                  : 'url(#echo-orbit-line-neon)'
              }
              strokeWidth={0.3}
              strokeLinecap="round"
              strokeDasharray="1.5 1"
              animate={{ strokeDashoffset: [0, -6, 0] }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ filter: 'drop-shadow(0 0 0.6px rgba(6,182,212,0.6))' }}
            />
          ))}

          <defs>
            <linearGradient id="echo-orbit-line-cyan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(6,182,212,0.6)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0)" />
            </linearGradient>
            <linearGradient id="echo-orbit-line-neon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(103,232,249,0.6)" />
              <stop offset="100%" stopColor="rgba(103,232,249,0)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Node wrappers — positioned around the ring */}
        {nodePositions.map((n, i) => (
          <OrbitNodeCard key={n.n} node={n} index={i} />
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   OrbitNodeCard — single orbiting node. Counter-rotates to stay
 *   upright. Tracks local hover state to scale up + brighten the
 *   connecting line (via a sibling overlay since the SVG line lives
 *   in the parent).
 *   =================================================================== */
function OrbitNodeCard({
  node,
  index,
}: {
  node: (typeof nodePositions)[number]
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  // counter-rotate to keep the card upright as the ring spins.
  // The ring rotates clockwise over 90s, so we counter-rotate -360 over 90s.
  // Doing it this way (with a parent rotating div) keeps the card readable.
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Counter-rotation wrapper so the card stays upright */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        {/* Glow halo (brightens on hover) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-2xl"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.55), rgba(6,182,212,0) 70%)',
            filter: 'blur(10px)',
          }}
          animate={{ opacity: hovered ? 1 : 0.35, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        <motion.button
          type="button"
          data-cursor="View"
          aria-label={`${node.name} — ${node.desc}`}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          animate={{
            y: [0, -6, 0],
            scale: hovered ? 1.1 : 1,
          }}
          transition={{
            y: {
              duration: 4 + index * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2,
            },
            scale: { duration: 0.3, ease: 'easeOut' },
          }}
          className={
            'group relative flex flex-col items-center gap-2 rounded-2xl border bg-white/[0.06] px-3 py-3 backdrop-blur-xl transition-colors duration-300 ' +
            (hovered
              ? 'border-[#06B6D4]/65 bg-white/[0.07]'
              : 'border-[#06B6D4]/30')
          }
          style={{
            boxShadow: hovered
              ? '0 0 28px rgba(6,182,212,0.55)'
              : '0 0 14px rgba(6,182,212,0.25)',
          }}
        >
          {/* number badge */}
          <span
            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#06B6D4]/45 bg-[#141414] text-[8px] font-bold text-[#67e8f9]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {node.n}
          </span>

          <span
            className={
              'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300 ' +
              (hovered
                ? 'border-[#06B6D4]/55 bg-[#06B6D4]/15 text-[#67e8f9]'
                : 'border-[#06B6D4]/35 bg-[#06B6D4]/8 text-[#67e8f9]')
            }
          >
            <node.Icon className="h-4 w-4" />
          </span>

          <span
            className="whitespace-nowrap text-[11px] font-semibold text-white sm:text-xs"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {node.name}
          </span>

          {/* expandable descriptor */}
          <motion.span
            className="block max-w-[140px] text-center text-[9px] leading-tight text-white/55"
            animate={{
              opacity: hovered ? 1 : 0.55,
              height: hovered ? 'auto' : 'auto',
            }}
            transition={{ duration: 0.3 }}
          >
            {node.desc}
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   CentralCore — the pulsing "Content Engine" core at the center.
 *   3-layer concentric glow + a CyanEnergySphere-style pinpoint. The
 *   ring + nodes rotate around this; the core stays fixed.
 *   =================================================================== */
function CentralCore({
  sx,
  sy,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  // subtle parallax — moves opposite to the ring for depth
  const coreX = useTransform(sx, [0, 1], [6, -6])
  const coreY = useTransform(sy, [0, 1], [4, -4])

  return (
    <motion.div
      style={{ x: coreX, y: coreY }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      {/* outermost glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(28vw, 280px)',
          height: 'min(28vw, 280px)',
          background:
            'radial-gradient(circle, rgba(6,182,212,0.35), rgba(6,182,212,0.05) 45%, rgba(6,182,212,0) 70%)',
          filter: 'blur(20px)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* mid bloom */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(16vw, 160px)',
          height: 'min(16vw, 160px)',
          background:
            'radial-gradient(circle, rgba(103,232,249,0.55), rgba(6,182,212,0.2) 55%, rgba(6,182,212,0) 80%)',
          filter: 'blur(12px)',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
      {/* core chip */}
      <motion.div
        className="relative flex flex-col items-center justify-center gap-1 rounded-2xl border border-[#06B6D4]/55 bg-[#06B6D4]/12 backdrop-blur-xl"
        style={{
          width: 'min(22vw, 200px)',
          height: 'min(22vw, 200px)',
          boxShadow:
            '0 0 30px rgba(6,182,212,0.45), inset 0 0 24px rgba(103,232,249,0.18)',
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* bright pinpoint center */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ filter: 'blur(1px)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span
          className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#67e8f9]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          Content Engine
        </span>
        <span className="mt-1 text-[9px] text-white/55">visibility compounds</span>
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   HighlightCard — cyan-hover glassmorphism card (used for the 6
 *   capabilities listed below the orbit visual).
 *   =================================================================== */
type Card = {
  num: string
  title: string
  desc: string
  Icon: LucideIcon
  accent: boolean
}

const cards: Card[] = nodePositions.map((s, i) => ({
  num: s.n,
  title: s.name,
  desc: s.desc,
  Icon: s.Icon,
  accent: i % 2 === 0,
}))

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
        className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 group-hover:border-[#06B6D4]/50 group-hover:bg-white/[0.07] sm:p-6"
      >
        {/* hover glow — cyan conic sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(120% 120% at 100% 0%, rgba(6,182,212,0.22), rgba(103,232,249,0.1) 50%, transparent 70%)',
          }}
        />

        {/* number + icon */}
        <div className="relative z-10 mb-5 flex items-center justify-between">
          <span
            className={`text-2xl font-bold ${
              accent
                ? 'bg-gradient-to-br from-[#67e8f9] via-[#06B6D4] to-[#0e7490] bg-clip-text text-transparent'
                : 'text-white/30'
            }`}
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {num}
          </span>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300 ${
              accent
                ? 'border-[#06B6D4]/40 bg-[#06B6D4]/10 text-[#67e8f9]'
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
        <div className="relative z-10 mt-4 flex items-center gap-1.5 text-xs font-medium text-[#06B6D4] opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>Explore</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* bottom accent line */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#06B6D4] to-[#67e8f9] transition-all duration-500 group-hover:w-full"
        />
      </motion.div>
    </motion.article>
  )
}

/* ===================================================================
   EchoWhatIs — Section 3 named export
 *   =================================================================== */
export function EchoWhatIs() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // mouse-reactive parallax (declared unconditionally at top)
  const { sx, sy, handlers } = useCursorParallax(60, 20)

  // Subtle headline parallax driven by scroll
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -20])

  // internal mouse motion value for the orbit visual (separate from
  // the section-wide parallax so we can layer them). Declared
  // unconditionally at top.
  const orbitMx = useMotionValue(0.5)
  const orbitMy = useMotionValue(0.5)
  const orbitSx = useSpring(orbitMx, { stiffness: 60, damping: 20 })
  const orbitSy = useSpring(orbitMy, { stiffness: 60, damping: 20 })

  const handleOrbitMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    orbitMx.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)))
    orbitMy.set(Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)))
  }
  const handleOrbitLeave = () => {
    orbitMx.set(0.5)
    orbitMy.set(0.5)
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlers.move}
      onPointerLeave={handlers.leave}
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#141414]/70 px-5 py-24 backdrop-blur-sm sm:px-8 sm:py-32 lg:py-40"
      aria-label="What Is The Echo System"
    >
      {/* Local ambient */}
      <CyanAmbient />

      <div className="relative z-10 mx-auto max-w-7xl">
        <CyanEyebrow number="03" label="The System" />

        {/* Massive headline */}
        <motion.h2
          style={{ y: headerY }}
          className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
        >
          <MaskLine>
            <span className="text-white" style={{ fontFamily: 'var(--font-display), sans-serif' }}>
              What Is
            </span>
          </MaskLine>
          <MaskLine delay={0.12}>
            <CyanGradientText>The Echo System.</CyanGradientText>
          </MaskLine>
        </motion.h2>

        {/* Split: body paragraphs (left) + orbit visual (right) */}
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
              className="mt-8 border-l-2 border-[#06B6D4] pl-5"
            >
              <p
                className="text-xl font-medium leading-snug text-white sm:text-2xl"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                Six nodes.{' '}
                <CyanGradientText glow={false}>One engine.</CyanGradientText>{' '}
                Visibility that compounds.
              </p>
            </motion.div>
          </div>

          {/* RIGHT: orbit visual — central core + 6 orbiting nodes */}
          <div className="relative">
            <div
              onPointerMove={handleOrbitMove}
              onPointerLeave={handleOrbitLeave}
              className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A]/80"
            >
              {/* SVG connection lines + rotating ring + nodes */}
              <OrbitRing sx={orbitSx} sy={orbitSy} />

              {/* Central core (sits above the rotating ring) */}
              <CentralCore sx={orbitSx} sy={orbitSy} />

              {/* corner labels */}
              <div className="pointer-events-none absolute left-4 top-4 wn-eyebrow text-[10px] text-white/45">
                The Content Ecosystem
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 text-[10px] text-white/30">
                SEO · AEO · Visibility · Authority · Distribution · Discovery
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
