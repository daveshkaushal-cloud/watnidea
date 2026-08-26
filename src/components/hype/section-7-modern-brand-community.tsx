'use client'

/**
 * HypeModernBrandCommunity — Section 7 of /the-hype-engine
 *
 * EDITORIAL STORYTELLING + NETWORK EFFECTS VISUALIZATION.
 *
 * Composition:
 *   - Eyebrow: (07) · The Modern Brand Community
 *   - Headline: "Communities That" + "Compound." ("Compound." red gradient)
 *   - 2-3 editorial paragraphs (WatNidea voice).
 *   - Network visualization: 1 node → grows to 12+ nodes with connecting
 *     SVG lines pulsing red/orange. Mouse-reactive (useCursorParallax).
 *   - Floating conversation bubbles drifting upward (glass chips with
 *     micro-text like "+1", "🔥", "share", "comment").
 *   - 3 HighlightCards: "Culture Over Content", "Conversations Over
 *     Campaigns", "Community As Growth Engine" — glassmorphism + hover glow.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  Flame,
  Heart,
  MessageCircle,
  MessagesSquare,
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
  useCursorParallax,
} from '@/components/about/shared'

/* ===================================================================
   Editorial paragraphs — WatNidea voice.
   =================================================================== */
const paragraphs = [
  {
    lead: 'Culture over content.',
    body: 'Content is the artifact. Culture is the engine. We build tribes around shared taste, shared signal, and shared identity — so every post compounds into something bigger than the post itself.',
  },
  {
    lead: 'Conversations over campaigns.',
    body: 'A campaign ends. A conversation keeps going. We design always-on systems where your audience talks back, talks about, and talks up your brand — turning reach into relationship, and relationship into revenue.',
  },
  {
    lead: 'Community as growth engine.',
    body: 'When your community becomes the channel, you stop renting attention and start owning it. The Hype Engine engineers the conditions for that ownership — network effects, ritual moments, and a flywheel that spins itself.',
  },
]

/* ===================================================================
   Highlight cards — 3 principles.
   =================================================================== */
type Highlight = {
  n: string
  title: string
  desc: string
  Icon: LucideIcon
  accent: 'red' | 'orange' | 'pink'
}

const highlights: Highlight[] = [
  {
    n: '01',
    title: 'Culture Over Content',
    desc: 'Posts are perishable. Culture compounds. We engineer the conditions where your audience starts making the brand with you.',
    Icon: Sparkles,
    accent: 'red',
  },
  {
    n: '02',
    title: 'Conversations Over Campaigns',
    desc: 'Campaigns end. Conversations keep going. We turn one-way broadcasts into two-way rituals your tribe returns to.',
    Icon: MessagesSquare,
    accent: 'orange',
  },
  {
    n: '03',
    title: 'Community As Growth Engine',
    desc: 'When your community becomes the channel, you stop renting attention and start owning it. Network effects do the rest.',
    Icon: TrendingUp,
    accent: 'pink',
  },
]

const ACCENT_HEX: Record<Highlight['accent'], string> = {
  red: '#E53935',
  orange: '#F97316',
  pink: '#EC4899',
}

const ACCENT_RGB: Record<Highlight['accent'], string> = {
  red: '229,57,53',
  orange: '249,115,22',
  pink: '236,72,153',
}

/* ===================================================================
   Network viz — 12 nodes + connecting SVG lines.
   Nodes activate progressively with scroll (opacity tied to
   scrollYProgress). Mouse-reactive via useCursorParallax.
   Positions precomputed & rounded for hydration safety.
   =================================================================== */
type NetNode = {
  x: number
  y: number
  // threshold of scrollYProgress at which this node "appears"
  appearAt: number
  // node size variant
  r: number
  // color
  hue: 'red' | 'orange' | 'pink' | 'white'
}

const NET_NODES: NetNode[] = [
  // center hub (always on)
  { x: 50, y: 50, appearAt: 0, r: 4.5, hue: 'red' },
  // ring 1 — closest, appears first
  { x: 32, y: 34, appearAt: 0.08, r: 3, hue: 'orange' },
  { x: 68, y: 36, appearAt: 0.12, r: 3, hue: 'pink' },
  { x: 30, y: 66, appearAt: 0.16, r: 3, hue: 'pink' },
  { x: 70, y: 64, appearAt: 0.2, r: 3, hue: 'orange' },
  // ring 2 — mid, appears next
  { x: 18, y: 50, appearAt: 0.28, r: 2.5, hue: 'red' },
  { x: 82, y: 50, appearAt: 0.32, r: 2.5, hue: 'red' },
  { x: 50, y: 18, appearAt: 0.36, r: 2.5, hue: 'orange' },
  { x: 50, y: 82, appearAt: 0.4, r: 2.5, hue: 'pink' },
  // outer ring — farthest, appears last
  { x: 14, y: 28, appearAt: 0.5, r: 2, hue: 'white' },
  { x: 86, y: 26, appearAt: 0.55, r: 2, hue: 'white' },
  { x: 16, y: 74, appearAt: 0.6, r: 2, hue: 'white' },
  { x: 84, y: 76, appearAt: 0.65, r: 2, hue: 'white' },
].map((n) => ({
  ...n,
  x: Math.round(n.x * 1000) / 1000,
  y: Math.round(n.y * 1000) / 1000,
}))

// edges (indices into NET_NODES) — only between consecutive + to hub
const NET_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 5], [2, 6], [3, 5], [4, 6],
  [1, 7], [2, 7], [3, 8], [4, 8],
  [5, 9], [6, 10], [5, 11], [6, 12],
  [9, 10], [11, 12], [9, 7], [10, 7],
  [11, 8], [12, 8],
]

const HUE_RGB: Record<NetNode['hue'], string> = {
  red: '229,57,53',
  orange: '249,115,22',
  pink: '236,72,153',
  white: '255,255,255',
}

/* ===================================================================
   NetEdge — single connecting line between two nodes.
   Opacity + dashoffset driven by scrollYProgress. Hooks at top.
   =================================================================== */
function NetEdge({
  a,
  b,
  i,
  scrollYProgress,
}: {
  a: NetNode
  b: NetNode
  i: number
  scrollYProgress: MotionValue<number>
}) {
  const appearAt = Math.max(a.appearAt, b.appearAt)
  const opacity = useTransform(
    scrollYProgress,
    [appearAt, appearAt + 0.06],
    [0, 0.7]
  )
  const dashOffset = useTransform(scrollYProgress, [0, 1], [0, -12])

  const stroke =
    i % 3 === 0
      ? `rgba(${HUE_RGB.red},0.65)`
      : i % 3 === 1
        ? `rgba(${HUE_RGB.orange},0.55)`
        : `rgba(${HUE_RGB.pink},0.5)`

  return (
    <motion.line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={stroke}
      strokeWidth={0.32}
      strokeDasharray="1.5 1.5"
      style={{ opacity, strokeDashoffset: dashOffset }}
    />
  )
}

/* ===================================================================
   NetNodeDot — single node in the network viz.
   Opacity + scale driven by scrollYProgress. Hooks at top.
   =================================================================== */
function NetNodeDot({
  n,
  i,
  scrollYProgress,
}: {
  n: NetNode
  i: number
  scrollYProgress: MotionValue<number>
}) {
  const opacity = useTransform(
    scrollYProgress,
    [n.appearAt, n.appearAt + 0.05],
    [0, 1]
  )
  const scale = useTransform(
    scrollYProgress,
    [n.appearAt, n.appearAt + 0.08],
    [0.4, 1]
  )

  const isHub = n.hue === 'red' && i === 0
  const rgb = HUE_RGB[n.hue]

  return (
    <motion.g
      style={{ opacity, scale }}
      animate={isHub ? { scale: [1, 1.15, 1] } : undefined}
      transition={
        isHub
          ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
    >
      {/* outer halo */}
      <circle
        cx={n.x}
        cy={n.y}
        r={n.r * 2.2}
        fill={`rgba(${rgb},0.12)`}
      />
      {/* core dot */}
      <circle
        cx={n.x}
        cy={n.y}
        r={n.r}
        fill={`rgba(${rgb},0.95)`}
        style={{
          filter: `drop-shadow(0 0 ${n.r * 1.5}px rgba(${rgb},0.85))`,
        }}
      />
      {/* bright center */}
      <circle
        cx={n.x}
        cy={n.y}
        r={n.r * 0.4}
        fill="rgba(255,255,255,0.95)"
      />
    </motion.g>
  )
}

/* ===================================================================
   NetworkViz — mouse-reactive network of nodes + connecting lines.
   Nodes activate progressively with scrollYProgress.
   =================================================================== */
function NetworkViz({
  sx,
  sy,
  scrollYProgress,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
  scrollYProgress: MotionValue<number>
}) {
  // foreground parallax (moves most)
  const fgX = useTransform(sx, [0, 1], [-22, 22])
  const fgY = useTransform(sy, [0, 1], [-18, 18])
  // mid layer (nodes)
  const mdX = useTransform(sx, [0, 1], [-12, 12])
  const mdY = useTransform(sy, [0, 1], [-10, 10])

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* ambient gradient blobs (background layer) */}
      <motion.div
        className="absolute left-[20%] top-[18%] h-[42vw] w-[42vw] max-h-[460px] max-w-[460px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(229,57,53,0.18), rgba(229,57,53,0.06) 40%, rgba(229,57,53,0) 70%)',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.14, 0.94, 1],
          rotate: [0, 26, -14, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[6%] h-[34vw] w-[34vw] max-h-[400px] max-w-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 60% 40%, rgba(249,115,22,0.16), rgba(249,115,22,0.05) 50%, rgba(249,115,22,0) 75%)',
          filter: 'blur(34px)',
        }}
        animate={{
          scale: [1, 1.2, 0.92, 1],
          rotate: [0, -28, 16, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[24%] top-[12%] h-[26vw] w-[26vw] max-h-[300px] max-w-[300px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(236,72,153,0.14), rgba(236,72,153,0.05) 50%, rgba(236,72,153,0) 75%)',
          filter: 'blur(36px)',
        }}
        animate={{
          scale: [1, 1.24, 0.9, 1],
          rotate: [0, 22, -18, 0],
        }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* SVG layer: edges + nodes — parallax mid */}
      <motion.div style={{ x: mdX, y: mdY }} className="absolute inset-0">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          {/* edges */}
          {NET_EDGES.map(([a, b], i) => (
            <NetEdge
              key={`edge-${i}`}
              a={NET_NODES[a]}
              b={NET_NODES[b]}
              i={i}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* nodes */}
          {NET_NODES.map((n, i) => (
            <NetNodeDot
              key={`node-${i}`}
              n={n}
              i={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </svg>
      </motion.div>

      {/* FOREGROUND: floating conversation bubbles drifting upward */}
      <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0">
        {CONVO_BUBBLES.map((b, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute flex items-center gap-1.5 rounded-lg border bg-white/[0.06] px-2.5 py-1.5 backdrop-blur-md"
            style={{
              left: b.left,
              top: b.top,
              borderColor: `rgba(${HUE_RGB[b.hue]},0.4)`,
              boxShadow: `0 0 18px rgba(${HUE_RGB[b.hue]},0.18)`,
            }}
            animate={{
              y: [0, -36, 0],
              opacity: [0.5, 1, 0.5],
              rotate: [0, b.rot, 0],
            }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: b.delay,
            }}
          >
            <b.Icon
              className="h-3 w-3"
              style={{ color: `rgb(${HUE_RGB[b.hue]})` }}
            />
            <span className="text-[10px] font-semibold text-white/90">
              {b.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* ===================================================================
   Floating conversation bubbles data.
   =================================================================== */
type Bubble = {
  Icon: LucideIcon
  label: string
  left: string
  top: string
  dur: number
  delay: number
  rot: number
  hue: NetNode['hue']
}

const CONVO_BUBBLES: Bubble[] = [
  { Icon: Heart, label: '+1', left: '8%', top: '78%', dur: 7, delay: 0, rot: 3, hue: 'pink' },
  { Icon: MessageCircle, label: 'comment', left: '14%', top: '40%', dur: 9, delay: 1.1, rot: -2, hue: 'red' },
  { Icon: Share2, label: 'share', left: '88%', top: '64%', dur: 8.5, delay: 0.7, rot: 4, hue: 'orange' },
  { Icon: Flame, label: '🔥', left: '82%', top: '28%', dur: 10, delay: 1.6, rot: -3, hue: 'pink' },
  { Icon: Users, label: '+24', left: '46%', top: '88%', dur: 9.5, delay: 0.4, rot: 2, hue: 'red' },
  { Icon: Heart, label: '+1.2K', left: '92%', top: '46%', dur: 11, delay: 1.9, rot: -4, hue: 'orange' },
  { Icon: MessageCircle, label: 'reply', left: '4%', top: '56%', dur: 8, delay: 2.4, rot: 3, hue: 'pink' },
  { Icon: Share2, label: 'repost', left: '76%', top: '12%', dur: 9, delay: 1.2, rot: -2, hue: 'red' },
]

/* ===================================================================
   HighlightCard — single glassmorphism principle card.
   =================================================================== */
function HighlightCard({ h, index }: { h: Highlight; index: number }) {
  const { n, title, desc, Icon, accent } = h
  return (
    <motion.article
      data-cursor={title}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-[#E53935]/50 sm:p-7"
    >
      {/* hover red/orange glow bloom */}
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
          className="text-2xl font-bold text-white/25"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {n}
        </span>
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/55 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white"
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      {/* title */}
      <h4
        className="relative z-10 text-xl font-semibold text-white sm:text-2xl"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        {title}
      </h4>

      {/* descriptor */}
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
   HypeModernBrandCommunity — Section 7 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function HypeModernBrandCommunity() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  // mouse-reactive parallax for the network viz
  const { sx, sy, handlers } = useCursorParallax(60, 20)

  return (
    <div
      ref={sectionRef}
      onPointerMove={handlers.move}
      onPointerLeave={handlers.leave}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <StickyRail
          label="Community"
          caption="Network Effects"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Network visualization — behind content, mouse-reactive */}
          <NetworkViz sx={sx} sy={sy} scrollYProgress={scrollYProgress} />

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-16 max-w-3xl"
          >
            <SectionEyebrow number="07" label="The Modern Brand Community" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Communities That </MaskLine>
              <MaskLine delay={0.12}>
                <RedGradientText>Compound.</RedGradientText>
              </MaskLine>
            </h2>
          </motion.div>

          {/* Editorial paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mb-20 flex max-w-3xl flex-col gap-8"
          >
            {paragraphs.map((p, i) => (
              <div key={i} className="flex gap-5">
                <span
                  className="mt-1 shrink-0 text-sm font-bold text-[#E53935]"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  ({String(i + 1).padStart(2, '0')})
                </span>
                <p className="text-lg leading-relaxed text-white/65 sm:text-xl">
                  <span className="font-semibold text-white">{p.lead} </span>
                  {p.body}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Highlight cards — 3 principles */}
          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {highlights.map((h, i) => (
              <HighlightCard key={h.n} h={h} index={i} />
            ))}
          </div>

          {/* Bottom hairline divider */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-16 h-px w-full origin-left bg-gradient-to-r from-[#E53935] via-[#E53935]/40 to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
