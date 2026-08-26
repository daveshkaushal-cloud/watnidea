'use client'

/**
 * SynthWhatWeCreate — Section 4 of /synthetic-cinema
 *
 * Premium BENTO GRID — 8 service areas, each its own cinematic world.
 *
 * Composition:
 *   - Eyebrow: (04) · What We Create (PurpleEyebrow)
 *   - Headline: "Built for" + "Cinematic Scale." (MaskLine, purple gradient)
 *
 * Bento Grid layout (lg+, 3 cols):
 *   Row 1: [AI Commercials col-span-2 accent] [AI Product Ads]
 *   Row 2: [Social Creatives] [Brand Films accent] [Motion Posters]
 *   Row 3: [Product Visualizations accent] [AI Influencer Content]
 *          [Campaign Assets]
 *
 * Each tile:
 *   - glassmorphism (border border-white/10 bg-white/[0.035] backdrop-blur-xl)
 *   - hover lifts (y: -6 spring scale 1.015) + purple conic sweep (accent) /
 *     purple radial glow (others) + bottom accent line purple→magenta
 *   - unique animated micro-visual motif inside
 *   - title (font-display, text-xl md:text-2xl font-semibold) + descriptor
 *   - number 01–08 (purple, font-display)
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import {
  Aperture,
  ArrowUpRight,
  Boxes,
  Clapperboard,
  Film,
  Image as ImageIcon,
  LayoutGrid,
  Megaphone,
  Smartphone,
  User,
  Video,
  type LucideIcon,
} from 'lucide-react'
import {
  PurpleEyebrow,
  PurpleGradientText,
  MaskLine,
} from '@/components/synthetic/shared'

/* ===================================================================
   Micro-visuals — one per service (self-contained motion graphics).
   These are function declarations so they hoist above the `services`
   array that references them by name.
   =================================================================== */

/* 01 AI Commercials — cinematic 16:9 frame with corner brackets +
   scanning render line + "GEN" progress. */
function AICommercialsVisual() {
  const bars = [30, 55, 72, 88, 96]
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* 16:9 cinematic frame */}
      <div className="absolute inset-3 rounded-md border border-[#8B5CF6]/30 bg-[#1A1A1A]/80">
        {/* corner brackets */}
        <span className="absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-[#d946ef]" />
        <span className="absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-[#d946ef]" />
        <span className="absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-[#d946ef]" />
        <span className="absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-[#d946ef]" />
        {/* scanning render line — CSS @keyframes (not Framer Motion
            animate) to avoid WAAPI errors on `top` layout-property
            animation. */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a78bfa] to-transparent"
          style={{
            boxShadow: '0 0 8px rgba(167,139,250,0.9)',
            top: '0%',
            '--scan-start': '0%',
            '--scan-end': '100%',
            animation: 'cinema-scanline 3.5s ease-in-out infinite',
          } as CSSProperties}
        />
        {/* "GEN" progress label top-left */}
        <div className="absolute left-2 top-2 flex items-center gap-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#d946ef]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 6px rgba(217,70,239,0.95)' }}
          />
          <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-[#a78bfa]">
            GEN
          </span>
        </div>
        {/* render progress bars (bottom) */}
        <div className="absolute inset-x-2 bottom-2 flex h-4 items-end gap-0.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                background:
                  i === bars.length - 1
                    ? 'linear-gradient(to top, #6d28d9, #a78bfa)'
                    : 'linear-gradient(to top, rgba(139,92,246,0.4), rgba(139,92,246,0.15))',
                boxShadow:
                  i === bars.length - 1
                    ? '0 0 8px rgba(167,139,250,0.7)'
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
      </div>
    </div>
  )
}

/* 02 AI Product Ads — product silhouette with orbiting highlight rings +
   spec chips. */
function AIProductAdsVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* orbiting highlight rings */}
        {[28, 42, 56].map((r, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#8B5CF6]/25"
            style={{ width: `${r * 2}px`, height: `${r * 2}px` }}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 8 + i * 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span
              className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: i === 0 ? '#d946ef' : '#a78bfa',
                boxShadow:
                  i === 0
                    ? '0 0 8px rgba(217,70,239,0.95)'
                    : '0 0 6px rgba(167,139,250,0.85)',
              }}
            />
          </motion.div>
        ))}
        {/* product silhouette (rounded glass block) */}
        <motion.div
          className="relative h-8 w-8 rounded-md border border-[#a78bfa]/50 bg-gradient-to-br from-[#8B5CF6]/40 to-[#6d28d9]/40"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 14px rgba(139,92,246,0.5)' }}
        >
          <span className="absolute inset-1 rounded-sm bg-white/10" />
        </motion.div>
      </div>
      {/* spec chips */}
      <div className="absolute left-2 top-2 flex flex-col gap-1">
        {['spec', '4K', 'HDR'].map((c, i) => (
          <motion.span
            key={i}
            className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/8 px-1.5 py-0.5 text-[7px] font-medium text-[#a78bfa]"
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

/* 03 Social Media Creatives — stacked vertical 9:16 frames scrolling/morphing. */
function SocialCreativesVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0 flex gap-1.5"
        animate={{ y: [0, -44, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="shrink-0 rounded-md border border-white/10 bg-white/[0.06] p-1"
            style={{ width: '32px', height: '56px' }}
          >
            <div className="flex h-full flex-col gap-0.5">
              {/* 9:16 frame content */}
              <div className="h-1/2 rounded-sm bg-gradient-to-br from-[#8B5CF6]/30 to-[#6d28d9]/30" />
              <div className="flex flex-col gap-0.5">
                <div className="h-0.5 w-2/3 rounded-sm bg-white/20" />
                <div className="h-0.5 w-1/2 rounded-sm bg-white/10" />
              </div>
              {/* engagement dots */}
              <div className="mt-auto flex gap-0.5">
                <motion.span
                  className="h-1 w-1 rounded-full bg-[#d946ef]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                />
                <motion.span
                  className="h-1 w-1 rounded-full bg-[#a78bfa]"
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

/* 04 Brand Films — filmstrip with alternating frames playing. */
function BrandFilmsVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* filmstrip outline with sprocket holes */}
      <div className="absolute inset-2 rounded-md border border-[#8B5CF6]/30 bg-[#1A1A1A]/80 p-1">
        {/* sprocket holes top + bottom */}
        <div className="flex justify-between px-1">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={`top-${i}`} className="h-0.5 w-1 rounded-sm bg-[#8B5CF6]/30" />
          ))}
        </div>
        {/* 4 alternating film frames */}
        <div className="my-1 flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                background:
                  i % 2 === 0
                    ? 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(109,40,217,0.2))'
                    : 'linear-gradient(135deg, rgba(217,70,239,0.35), rgba(139,92,246,0.15))',
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.95, 1, 0.95],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between px-1">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={`bot-${i}`} className="h-0.5 w-1 rounded-sm bg-[#8B5CF6]/30" />
          ))}
        </div>
      </div>
    </div>
  )
}

/* 05 Motion Posters — poster frame with parallax layers + title text reveal. */
function MotionPostersVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-2 overflow-hidden rounded-md border border-[#8B5CF6]/30 bg-[#1A1A1A]/80">
        {/* parallax background layers */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.4), transparent 60%)',
          }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 70% 60%, rgba(217,70,239,0.3), transparent 55%)',
          }}
          animate={{ scale: [1, 1.18, 1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8,
          }}
        />
        {/* title text reveal — bars */}
        <div className="absolute inset-x-2 bottom-2 flex flex-col gap-0.5">
          <motion.div
            className="h-1 w-2/3 rounded-sm bg-white/70"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.div
            className="h-0.5 w-1/3 rounded-sm bg-[#a78bfa]"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
        </div>
        {/* small title label top-left */}
        <div className="absolute left-1.5 top-1.5 text-[6px] font-bold uppercase tracking-[0.2em] text-[#a78bfa]">
          MOTION
        </div>
      </div>
    </div>
  )
}

/* 06 Product Visualizations — 3D-ish rotating product wireframe + turntable
   dots. */
function ProductVizVisual() {
  // pre-compute turntable dots (8 around a circle)
  const dots = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    const r = 22
    return {
      x: Math.round((Math.cos(angle) * r) * 1000) / 1000,
      y: Math.round((Math.sin(angle) * r * 0.4) * 1000) / 1000, // squashed = 3D perspective
    }
  })
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* turntable ellipse */}
        <svg
          viewBox="-32 -16 64 32"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full"
        >
          {/* turntable ring */}
          <ellipse
            cx="0"
            cy="0"
            rx="22"
            ry="8"
            fill="none"
            stroke="rgba(139,92,246,0.4)"
            strokeWidth="0.4"
            strokeDasharray="1 1"
          />
          {/* inner ring */}
          <ellipse
            cx="0"
            cy="0"
            rx="14"
            ry="5"
            fill="none"
            stroke="rgba(167,139,250,0.3)"
            strokeWidth="0.3"
          />
          {/* turntable dots (rotating) */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: 'center' }}
          >
            {dots.map((d, i) => (
              <circle
                key={i}
                cx={d.x}
                cy={d.y}
                r="0.8"
                fill="rgba(217,70,239,0.85)"
              />
            ))}
          </motion.g>
          {/* 3D wireframe cube (product) */}
          <motion.g
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: 'center' }}
          >
            {/* front face */}
            <rect
              x="-6"
              y="-6"
              width="12"
              height="12"
              fill="rgba(139,92,246,0.15)"
              stroke="rgba(167,139,250,0.85)"
              strokeWidth="0.4"
            />
            {/* top face (perspective) */}
            <polygon
              points="-6,-6 -3,-9 9,-9 6,-6"
              fill="rgba(139,92,246,0.1)"
              stroke="rgba(167,139,250,0.6)"
              strokeWidth="0.3"
            />
            {/* right face (perspective) */}
            <polygon
              points="6,-6 9,-9 9,3 6,6"
              fill="rgba(139,92,246,0.2)"
              stroke="rgba(167,139,250,0.6)"
              strokeWidth="0.3"
            />
          </motion.g>
        </svg>
      </div>
      {/* turntable label */}
      <div className="absolute left-2 top-2 text-[7px] font-bold uppercase tracking-[0.15em] text-[#a78bfa]">
        360°
      </div>
    </div>
  )
}

/* 07 AI Influencer Content — avatar portrait frame with engagement metrics
   floating. */
function AIInfluencerVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* portrait frame */}
      <div className="absolute inset-2 overflow-hidden rounded-md border border-[#8B5CF6]/30 bg-[#1A1A1A]/80">
        {/* avatar portrait (gradient silhouette) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-10 w-10 rounded-full border-2 border-[#a78bfa]/60 bg-gradient-to-br from-[#8B5CF6]/50 to-[#6d28d9]/50"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 14px rgba(139,92,246,0.5)' }}
          >
            {/* subtle face indicator */}
            <span className="absolute left-1/2 top-1/3 h-1 w-1 -translate-x-1/2 rounded-full bg-white/60" />
            <span className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-white/40" />
          </motion.div>
        </div>
        {/* floating engagement metrics */}
        <motion.div
          className="absolute left-1 top-1 flex items-center gap-0.5 rounded-full border border-[#d946ef]/40 bg-[#d946ef]/12 px-1 py-0.5 text-[6px] font-bold text-[#e879f9]"
          animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ♥ 12K
        </motion.div>
        <motion.div
          className="absolute right-1 top-2 flex items-center gap-0.5 rounded-full border border-[#a78bfa]/40 bg-[#8B5CF6]/12 px-1 py-0.5 text-[6px] font-bold text-[#a78bfa]"
          animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6,
          }}
        >
          💬 840
        </motion.div>
        <motion.div
          className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded-full border border-[#8B5CF6]/40 bg-[#8B5CF6]/12 px-1 py-0.5 text-[6px] font-bold text-[#a78bfa]"
          animate={{ y: [0, 3, 0], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.2,
          }}
        >
          ▷ 45K
        </motion.div>
      </div>
    </div>
  )
}

/* 08 Campaign Assets — grid of asset thumbnails generating one-by-one. */
function CampaignAssetsVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-2 grid grid-cols-3 gap-1">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-sm border border-[#8B5CF6]/30 bg-white/[0.05]"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* tiny scene content */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  i % 3 === 0
                    ? 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(109,40,217,0.2))'
                    : i % 3 === 1
                      ? 'linear-gradient(135deg, rgba(217,70,239,0.35), rgba(139,92,246,0.15))'
                      : 'linear-gradient(135deg, rgba(167,139,250,0.35), rgba(109,40,217,0.15))',
              }}
            />
            {/* "GEN" progress dot */}
            <motion.span
              className="absolute right-0.5 top-0.5 h-1 w-1 rounded-full bg-[#d946ef]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.18,
              }}
              style={{ boxShadow: '0 0 5px rgba(217,70,239,0.95)' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ===================================================================
   Content — 8 service areas (premium descriptors, brand voice).
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
    title: 'AI Commercials',
    desc: 'Cinematic AI-generated commercials — full 16:9 broadcast-grade spots with virtual cameras, digital environments, and post-production polish. Endless variations. One unified brand story.',
    Icon: Clapperboard,
    span: 2,
    accent: true,
    Visual: AICommercialsVisual,
  },
  {
    n: '02',
    title: 'AI Product Ads',
    desc: 'Hero product shots that defy physics.',
    Icon: Boxes,
    span: 1,
    accent: false,
    Visual: AIProductAdsVisual,
  },
  {
    n: '03',
    title: 'Social Media Creatives',
    desc: 'Vertical 9:16 creatives engineered for scroll-stopping. AI-generated scenes, captions, and motion graphics formatted for every platform — at the speed of imagination.',
    Icon: Smartphone,
    span: 1,
    accent: false,
    Visual: SocialCreativesVisual,
  },
  {
    n: '04',
    title: 'Brand Films',
    desc: 'Long-form cinematic storytelling.',
    Icon: Film,
    span: 1,
    accent: true,
    Visual: BrandFilmsVisual,
  },
  {
    n: '05',
    title: 'Motion Posters',
    desc: 'Living key-art. Static posters transformed into layered motion pieces — parallax depth, title reveals, and atmospheric light, generated in minutes.',
    Icon: Aperture,
    span: 1,
    accent: false,
    Visual: MotionPostersVisual,
  },
  {
    n: '06',
    title: 'Product Visualizations',
    desc: '360° turntable renders. Impossible camera moves. Photoreal product visualizations generated without a physical shoot — every angle, every environment, infinite variations.',
    Icon: Video,
    span: 1,
    accent: true,
    Visual: ProductVizVisual,
  },
  {
    n: '07',
    title: 'AI Influencer Content',
    desc: 'Synthetic talent. Always-on.',
    Icon: User,
    span: 1,
    accent: false,
    Visual: AIInfluencerVisual,
  },
  {
    n: '08',
    title: 'Campaign Assets',
    desc: 'The full asset library — generated. Every cutdown, every format, every localization, every variant — produced in a single render pass. A complete campaign, engineered at the speed of imagination.',
    Icon: LayoutGrid,
    span: 1,
    accent: false,
    Visual: CampaignAssetsVisual,
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
      className={`group relative overflow-hidden rounded-2xl border bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[#8B5CF6]/55 hover:bg-white/[0.07] sm:p-6 ${
        span === 2 ? 'lg:col-span-2' : ''
      } ${accent ? 'border-[#8B5CF6]/25' : 'border-white/10'}`}
    >
      {/* hover glow — purple conic sweep (accent) / radial glow (others) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: accent
            ? 'conic-gradient(from 220deg at 50% 50%, rgba(139,92,246,0.24), rgba(217,70,239,0.18), rgba(109,40,217,0.14), rgba(139,92,246,0.24))'
            : 'radial-gradient(120% 120% at 100% 0%, rgba(139,92,246,0.2), rgba(217,70,239,0.1) 50%, transparent 70%)',
        }}
      />
      {/* purple glow ring on hover (accent only) */}
      {accent && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      {/* pulsing ring (accent only) */}
      {accent && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl border border-[#8B5CF6]/30"
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
                ? 'border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-[#a78bfa]'
                : 'border-white/15 bg-white/[0.05] text-white/70'
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span
            className={`text-xs font-bold ${
              accent
                ? 'bg-gradient-to-br from-[#a78bfa] via-[#8B5CF6] to-[#6d28d9] bg-clip-text text-transparent'
                : 'text-[#8B5CF6]'
            }`}
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {n}
          </span>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#8B5CF6] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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

      {/* bottom accent line — purple → magenta */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#8B5CF6] to-[#d946ef] transition-all duration-500 group-hover:w-full"
      />
    </motion.article>
  )
}

/* ===================================================================
   SynthWhatWeCreate — Section 4 named export
 *   =================================================================== */
export function SynthWhatWeCreate() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#141414] px-5 py-24 sm:px-8 sm:py-32 lg:py-40"
      aria-label="What We Create"
    >
      {/* Local ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.18), rgba(139,92,246,0) 65%)',
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
              'radial-gradient(circle, rgba(217,70,239,0.18), rgba(217,70,239,0) 70%)',
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
              'radial-gradient(circle, rgba(167,139,250,0.12), rgba(167,139,250,0) 70%)',
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
        <PurpleEyebrow number="04" label="What We Create" />

        {/* Massive headline */}
        <h2
          className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">Built for </span>
            <PurpleGradientText>Cinematic Scale.</PurpleGradientText>
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
          Every asset becomes a cinematic world.{' '}
          <span className="text-white/55">
            seven services. One synthetic studio. Zero limits.
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
