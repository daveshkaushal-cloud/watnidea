'use client'

/**
 * AboutModernBrand — Section 6
 * The Modern Brand — magazine-inspired editorial composition.
 *
 * Composition:
 *   - StickyRail (label: The Modern Brand, caption: Culture)
 *   - Eyebrow (08) + The Modern Brand
 *   - 3-line MaskLine headline `Built for Brands` / `That Refuse to` / `Blend In.`
 *     ("Refuse" in red gradient).
 *   - Sub `One studio. seven services. Zero excuse to blend in.`
 *   - Asymmetric magazine grid of 5 theme tiles (glassmorphism):
 *       01 Content Creation  · Cinematic brand films, reels, and visual storytelling
 *       02 Social Ecosystems · turn your audience into a loyal brand tribe.
 *       03 AI Creativity      · Faster production. Bigger impact.            (accent)
 *       04 Digital Communities · make your brand visible everywhere
 *       05 Growth Systems     · Marketing engines built to scale.            (accent)
 *   - Each tile: glassmorphism + hover lift + red glow + animated micro-visual.
 *   - Thin red divider lines between tiles drawing in on scroll (scaleX 0→1).
 *   - Subtle scroll parallax between header and tile grid (different rates).
 */

import { useRef, type ReactElement } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Clapperboard,
  Network,
  Sparkles,
  Users,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from './shared'

/* ===================================================================
   Theme tile data — verbatim copy.
   =================================================================== */
type Theme = {
  n: string
  title: string
  desc: string
  Icon: LucideIcon
  accent: boolean
  Visual: () => ReactElement
  span: string // grid column span on lg
  row: string // grid row position on lg (magazine asymmetry)
}

const themes: Theme[] = [
  {
    n: '01',
    title: 'Content Creation',
    desc: 'Cinematic brand films, reels, and visual storytelling',
    Icon: Clapperboard,
    accent: false,
    Visual: ContentVisual,
    span: 'lg:col-span-4',
    row: 'lg:row-start-1',
  },
  {
    n: '02',
    title: 'Social Ecosystems',
    desc: 'turn your audience into a loyal brand tribe.',
    Icon: Network,
    accent: false,
    Visual: SocialVisual,
    span: 'lg:col-span-2',
    row: 'lg:row-start-1',
  },
  {
    n: '03',
    title: 'AI Creativity',
    desc: 'Faster production. Bigger impact.',
    Icon: Sparkles,
    accent: true,
    Visual: AIVisual,
    span: 'lg:col-span-2',
    row: 'lg:row-start-2',
  },
  {
    n: '04',
    title: 'Digital Communities',
    desc: 'make your brand visible everywhere',
    Icon: Users,
    accent: false,
    Visual: CommunityVisual,
    span: 'lg:col-span-2',
    row: 'lg:row-start-2',
  },
  {
    n: '05',
    title: 'Growth Systems',
    desc: 'Marketing engines built to scale.',
    Icon: TrendingUp,
    accent: true,
    Visual: GrowthVisual,
    span: 'lg:col-span-2',
    row: 'lg:row-start-2',
  },
]

/* ===================================================================
   Micro-visuals — one per theme, all motion-safe.
   =================================================================== */

/* 01 Content Creation — animated stacked layers / film blocks */
function ContentVisual() {
  const layers = [
    { w: '85%', h: '14%', color: 'rgba(229,57,53,0.55)', delay: 0 },
    { w: '70%', h: '12%', color: 'rgba(255,107,99,0.45)', delay: 0.4 },
    { w: '92%', h: '16%', color: 'rgba(255,255,255,0.18)', delay: 0.8 },
    { w: '60%', h: '10%', color: 'rgba(255,255,255,0.12)', delay: 1.2 },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-x-3 bottom-4 flex flex-col gap-1.5">
        {layers.map((l, i) => (
          <motion.div
            key={i}
            className="rounded-sm"
            style={{ width: l.w, height: l.h, background: l.color }}
            initial={{ opacity: 0.55, x: -6 }}
            animate={{ x: [-6, 6, -6], opacity: [0.55, 1, 0.55] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: l.delay,
            }}
          />
        ))}
      </div>
      {/* film clapperboard accent */}
      <motion.div
        className="absolute right-3 top-3 h-7 w-7 rounded-md border border-[#E53935]/40 bg-[#E53935]/10"
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* 02 Social Ecosystems — network nodes connecting */
function SocialVisual() {
  // 4 nodes around a center hub, fixed positions (no float mismatches)
  const nodes = [
    { x: 22, y: 30 },
    { x: 78, y: 28 },
    { x: 28, y: 76 },
    { x: 76, y: 74 },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {nodes.map((n, i) => (
          <motion.line
            key={`l-${i}`}
            x1="50"
            y1="52"
            x2={n.x}
            y2={n.y}
            stroke="rgba(229,57,53,0.45)"
            strokeWidth={0.6}
            animate={{ opacity: [0.25, 0.85, 0.25] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.span
          key={`n-${i}`}
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/85"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            boxShadow: '0 0 6px rgba(255,255,255,0.7)',
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}
      <motion.span
        className="absolute left-1/2 top-[52%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        style={{ boxShadow: '0 0 12px rgba(229,57,53,0.95)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* 03 AI Creativity — neural pulse motif (accent red) */
function AIVisual() {
  const nodes = [
    { x: 18, y: 24 },
    { x: 50, y: 18 },
    { x: 82, y: 26 },
    { x: 30, y: 56 },
    { x: 70, y: 56 },
    { x: 50, y: 82 },
  ]
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 4],
    [3, 5],
    [4, 5],
    [3, 4],
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {edges.map(([a, b], i) => (
          <motion.line
            key={`e-${i}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(255,107,99,0.55)"
            strokeWidth={0.5}
            animate={{ opacity: [0.2, 0.85, 0.2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.18,
            }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.span
          key={`n-${i}`}
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6b63]"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            boxShadow: '0 0 8px rgba(255,107,99,0.95)',
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.25,
          }}
        />
      ))}
    </div>
  )
}

/* 04 Digital Communities — tribe echo nodes */
function CommunityVisual() {
  const nodes = [
    { x: 30, y: 28 },
    { x: 70, y: 30 },
    { x: 22, y: 62 },
    { x: 50, y: 50 },
    { x: 78, y: 64 },
    { x: 32, y: 80 },
    { x: 68, y: 78 },
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {nodes.map((n, i) => (
          <motion.circle
            key={`r-${i}`}
            cx={n.x}
            cy={n.y}
            r="1"
            fill="none"
            stroke="rgba(229,57,53,0.5)"
            strokeWidth={0.3}
            animate={{ r: [1, 14], opacity: [0.7, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.span
          key={`n-${i}`}
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/85"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            boxShadow: '0 0 6px rgba(255,255,255,0.7)',
          }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

/* 05 Growth Systems — ascending chart (accent red) */
function GrowthVisual() {
  const bars = [38, 54, 70, 86, 100]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-x-3 bottom-4 h-[55%]">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <motion.polyline
            points="6,80 26,62 46,46 66,30 86,12"
            fill="none"
            stroke="rgba(255,107,99,0.9)"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            style={{ filter: 'drop-shadow(0 0 5px rgba(255,107,99,0.7))' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-end justify-between">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-2 origin-bottom rounded-t-sm"
              style={{
                height: `${h}%`,
                background:
                  'linear-gradient(to top, rgba(255,107,99,0.55), rgba(255,255,255,0.12))',
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ===================================================================
   ThemeTile — single glassmorphism tile with hover lift + red glow.
   Per-tile motion handled here; hooks at the top (only useState).
   =================================================================== */
function ThemeTile({ theme, index }: { theme: Theme; index: number }) {
  const { n, title, desc, Icon, accent, Visual, span, row } = theme

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
      className={`group relative ${span} ${row}`}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        className={
          'relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border bg-white/[0.035] p-6 backdrop-blur-xl transition-colors duration-300 sm:p-7 ' +
          (accent
            ? 'border-[#E53935]/40 hover:border-[#E53935]/80 '
            : 'border-white/10 hover:border-[#E53935]/50 ')
        }
        style={
          accent
            ? {
                boxShadow:
                  '0 0 0 1px rgba(229,57,53,0.18), 0 16px 60px -24px rgba(229,57,53,0.4), inset 0 0 20px rgba(229,57,53,0.06)',
              }
            : undefined
        }
      >
        {/* hover red glow bloom */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(120% 120% at 0% 0%, rgba(229,57,53,0.2), transparent 60%)',
          }}
        />

        {/* top row: number + icon */}
        <div className="relative z-10 mb-5 flex items-center justify-between">
          <span
            className={
              'text-2xl font-bold ' +
              (accent
                ? 'bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent'
                : 'text-white/25')
            }
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {n}
          </span>
          <span
            className={
              'flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300 ' +
              (accent
                ? 'border-[#E53935]/40 bg-[#E53935]/10 text-[#ff6b63]'
                : 'border-white/10 bg-white/[0.05] text-white/55 group-hover:border-white/30 group-hover:text-white')
            }
          >
            <Icon className="h-5 w-5" />
          </span>
        </div>

        {/* title + descriptor */}
        <h4
          className="relative z-10 text-xl font-semibold text-white sm:text-2xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {title}
        </h4>
        <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/55 sm:text-[15px]">
          {desc}
        </p>

        {/* micro-visual fills the rest of the card */}
        <div className="relative z-0 mt-5 flex-1">
          <Visual />
        </div>

        {/* bottom hairline accent that fills on hover */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-transparent transition-all duration-500 group-hover:w-full"
        />
      </motion.div>
    </motion.article>
  )
}

/* ===================================================================
   AboutModernBrand — Section 6 default export.
   =================================================================== */
export default function AboutModernBrand() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // subtle parallax: grid moves slower than header on scroll
  const gridY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const headerY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  // divider draw-in: each thin red line scales X 0→1 across the section
  const dividerScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1])

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <StickyRail
          label="The Modern Brand"
          caption="Culture"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Header block */}
          <motion.div style={{ y: headerY }} className="mb-14 max-w-3xl">
            <SectionEyebrow number="08" label="The Modern Brand" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Built for Brands</MaskLine>
              <MaskLine delay={0.12}>
                That <RedGradientText>Refuse</RedGradientText> to
              </MaskLine>
              <MaskLine delay={0.24}>Blend In.</MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl"
            >
              One studio. seven services.{' '}
              <span className="text-white/55">
                Zero excuse to blend in.
              </span>
            </motion.p>
          </motion.div>

          {/* Red divider that draws in on scroll */}
          <motion.div
            aria-hidden
            style={{ scaleX: dividerScale }}
            className="mb-10 h-px w-full origin-left bg-gradient-to-r from-[#E53935] via-[#E53935]/40 to-transparent"
          />

          {/* Asymmetric magazine tile grid */}
          <motion.div
            style={{ y: gridY }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6"
          >
            {themes.map((t, i) => (
              <ThemeTile key={t.n} theme={t} index={i} />
            ))}
          </motion.div>

          {/* Bottom hairline */}
          <motion.div
            aria-hidden
            style={{ scaleX: dividerScale }}
            className="mt-16 h-px w-full origin-right bg-gradient-to-l from-[#E53935] via-[#E53935]/40 to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
