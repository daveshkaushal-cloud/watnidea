'use client'

/**
 * BookServicesSelector — Section 5 of /book-strategy-call
 *
 * INTERACTIVE SERVICES INTEREST SELECTOR — multi-select picker where
 * each of the 7 WatNidea services is rendered as a "mini universe"
 * tinted to its own service color.
 *
 * Composition:
 *   - BookingEyebrow: (05) · SERVICES (brand red — umbrella color)
 *   - Headline (MaskLine): "What Are You Building?"
 *   - Subhead: instructs the visitor to multi-select.
 *   - 7 service cards in a 4-col grid (4 + 3 + summary tile in 8th
 *     slot on lg, 2-col on sm, 1-col on mobile).
 *   - Each card: compact ~120px-square "mini universe" tinted to its
 *     service color (Aura=gold morphing mark, DigitalHQ=blue dashboard,
 *     HypeEngine=red concentric pulses, KineticStudio=orange film
 *     frames, Growth=green chart, Cinema=purple AI lattice, Echo=cyan
 *     signal waves) + service number + name + category + verbatim
 *     descriptor + ServiceColorDot.
 *   - Click toggles "interested". Selected cards get a colored border
 *     + glow halo in their service color + a corner checkmark badge.
 *     ARIA: role="checkbox" aria-checked on the button trigger.
 *   - 8th grid slot is a sticky "SelectedSummary" tile on lg showing
 *     live count + BookingMagneticButton "Continue" (disabled until
 *     ≥1 selected). Clicking Continue smooth-scrolls to #book-your-call.
 *   - BookingStickyRail ("Services" / "Interest").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Subcomponents extracted so hooks aren't called
 * inside .map() or conditionals.
 */

import { useMemo, useRef, useState, type CSSProperties } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Fingerprint,
  LayoutDashboard,
  MessageCircle,
  Clapperboard,
  TrendingUp,
  Bot,
  Radio,
  Check,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import {
  WORK_COLORS,
  ServiceColorDot,
  BookingEyebrow,
  BookingStickyRail,
  BookingMagneticButton,
  MaskLine,
  type ServiceColorKey,
} from '@/components/book/shared'

/* ===================================================================
   Verbatim service data (from hero/navbar.tsx) — name/cat/desc are
   copied EXACTLY. Each entry carries its service color key + the
   `inline` Kinetic-orange override (used because Kinetic's true accent
   is orange #F97316, NOT the hype red key).
   =================================================================== */
type InlineColor = {
  hex: string
  soft: string
  neon: string
  deep: string
  glow: string
}

type ServiceEntry = {
  n: string
  name: string
  cat: string
  desc: string
  icon: LucideIcon
  color: ServiceColorKey
  // optional inline override (used for Kinetic orange)
  inline?: InlineColor
}

const KINETIC_ORANGE: InlineColor = {
  hex: '#F97316',
  soft: '#fb923c',
  neon: '#fdba74',
  deep: '#c2410c',
  glow: 'rgba(249,115,22,0.45)',
}

const services: ServiceEntry[] = [
  {
    n: '01',
    name: 'Aura Architecture',
    cat: 'Brand Strategy & Identity',
    desc: 'We define your brand soul, positioning, and visual DNA to create a powerful identity that stands out with purpose and clarity.',
    icon: Fingerprint,
    color: 'aura',
  },
  {
    n: '02',
    name: 'The Digital HQ',
    cat: 'Web Design & Development',
    desc: 'High-speed, conversion-focused websites that act as your 24/7 sales engine and digital headquarters.',
    icon: LayoutDashboard,
    color: 'digital',
  },
  {
    n: '03',
    name: 'The Hype Engine',
    cat: 'Social Media Marketing',
    desc: 'We engineer conversations, trends, and communities that turn your audience into a loyal brand tribe.',
    icon: MessageCircle,
    color: 'hype',
  },
  {
    n: '04',
    name: 'Kinetic Studio',
    cat: 'Video Production',
    desc: 'Cinematic brand films, reels, and visual storytelling designed to capture instant attention and engagement.',
    icon: Clapperboard,
    color: 'hype',
    inline: KINETIC_ORANGE,
  },
  {
    n: '05',
    name: 'Growth Alchemy',
    cat: 'Performance Marketing',
    desc: 'Paid ads and funnel systems engineered to turn every rupee into predictable, scalable revenue.',
    icon: TrendingUp,
    color: 'growth',
  },
  {
    n: '06',
    name: 'Synthetic Cinema',
    cat: 'AI Advertising',
    desc: 'AI-powered cinematic ads that scale your brand storytelling at the speed of imagination.',
    icon: Bot,
    color: 'cinema',
  },
  {
    n: '07',
    name: 'The Echo System',
    cat: 'SEO • AEO • Content Systems',
    desc: 'SEO, AEO, and content systems that make your brand visible everywhere your audience exists.',
    icon: Radio,
    color: 'echo',
  },
]

/* Resolve a ServiceEntry's color object — uses inline override for
   Kinetic, otherwise the WORK_COLORS registry entry. */
function resolveColor(s: ServiceEntry): InlineColor {
  if (s.inline) return s.inline
  const c = WORK_COLORS[s.color]
  return {
    hex: c.hex,
    soft: c.soft,
    neon: c.neon,
    deep: c.deep,
    glow: c.glow,
  }
}

/* ===================================================================
   MINI UNIVERSES — one per service, ~120px square, tinted to the
   service's actual accent color. Compact versions of the navbar's
   hero services-section visuals.
   =================================================================== */

/* 01 — Aura: morphing identity mark + orbit rings */
function AuraMiniUniverse({ color }: { color: InlineColor }) {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color.glow}, transparent 65%)`,
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2"
        animate={{
          borderRadius: ['24%', '50%', '46%', '50%', '24%'],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          border: `1px solid ${color.hex}80`,
          background: `radial-gradient(circle, ${color.glow}, transparent 72%)`,
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ border: `1px dashed ${color.hex}40` }}
      />
      {[0, 1, 2].map((i) => {
        const r = 22 + i * 8
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: r * 2,
              height: r * 2,
              marginLeft: -r,
              marginTop: -r,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span
              className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-white/85"
              style={{ boxShadow: `0 0 6px ${color.glow}` }}
            />
          </motion.div>
        )
      })}
      <motion.div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ scale: [1, 1.4, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: color.hex,
          boxShadow: `0 0 12px ${color.glow}, 0 0 24px ${color.glow}`,
        }}
      />
    </div>
  )
}

/* 02 — Digital HQ: floating browser + perspective grid floor */
function DigitalHQMiniUniverse({ color }: { color: InlineColor }) {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${color.glow}, transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          transform: 'perspective(240px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />
      <motion.div
        className="absolute left-[14%] top-[20%] h-10 w-14 rounded-lg border border-white/10 bg-white/[0.05]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[16%] top-[28%] h-8 w-12 rounded-lg border bg-white/[0.05]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ borderColor: `${color.hex}40` }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 w-[68%] max-w-[180px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/15 bg-[#0c0c0c]"
        style={{ boxShadow: '0 14px 36px rgba(0,0,0,0.6)' }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-2.5 py-1.5">
          <span className="h-1 w-1 rounded-full" style={{ background: `${color.hex}b0` }} />
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <div className="ml-1.5 flex-1 rounded bg-white/[0.08] px-1.5 py-0.5 text-[7px] text-white/40">
            watnidea.studio
          </div>
        </div>
        <div className="space-y-1.5 p-2">
          <motion.div
            className="h-1.5 w-1/3 rounded"
            style={{ background: `${color.hex}80` }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-5/6 rounded bg-white/10" />
          <div className="grid grid-cols-3 gap-1 pt-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-5 rounded bg-white/[0.07]"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* 03 — Hype Engine: concentric pulses + social conversation nodes */
function HypeEngineMiniUniverse({ color }: { color: InlineColor }) {
  const nodes = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2 - Math.PI / 2
        return {
          x: Math.round((50 + Math.cos(a) * 30) * 1000) / 1000,
          y: Math.round((50 + Math.sin(a) * 30) * 1000) / 1000,
        }
      }),
    []
  )
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color.glow}, transparent 60%)`,
        }}
      />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          animate={{ scale: [0.4, 1.6], opacity: [0.6, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: 'easeOut',
          }}
          style={{ width: 80, height: 80, borderColor: `${color.hex}40` }}
        />
      ))}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        {nodes.map((nd, i) => (
          <motion.line
            key={i}
            x1={50}
            y1={50}
            x2={nd.x}
            y2={nd.y}
            stroke={`${color.hex}59`}
            strokeWidth={0.3}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>
      <motion.div
        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ background: color.hex, boxShadow: `0 0 14px ${color.glow}` }}
      />
      {nodes.map((nd, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70"
          style={{ left: `${nd.x}%`, top: `${nd.y}%`, boxShadow: '0 0 6px rgba(255,255,255,0.6)' }}
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </div>
  )
}

/* 04 — Kinetic Studio: letterbox bars + film strip + REC label */
function KineticMiniUniverse({ color }: { color: InlineColor }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#141414]">
      <div className="absolute inset-x-0 top-0 z-10 h-3 bg-[#141414]" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-3 bg-[#141414]" />
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[1.5px] rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color.hex}, transparent)`,
            top: `${28 + i * 12}%`,
            width: 80,
          }}
          animate={{ x: ['-20%', '120%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: 'easeIn' }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-1"
        animate={{ x: [0, -40] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-7 shrink-0 overflow-hidden rounded-sm border border-white/15 bg-gradient-to-br from-white/[0.08]"
            style={{ backgroundImage: `linear-gradient(135deg, ${color.glow}, transparent)` }}
          >
            <div className="h-1 w-full bg-[#262626]/85" />
          </div>
        ))}
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm">
          <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
        </div>
      </motion.div>
      <span className="absolute right-2 top-4 z-10 font-mono text-[8px]" style={{ color: color.hex }}>
        REC ● 00:24
      </span>
    </div>
  )
}

/* 05 — Growth Alchemy: ascending chart + bars + ROAS label */
function GrowthMiniUniverse({ color }: { color: InlineColor }) {
  const bars = [40, 58, 72, 88, 100]
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to top, ${color.glow}, transparent 60%)` }}
      />
      <div
        className="absolute inset-x-4 bottom-10 top-8 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '100% 20%',
        }}
      />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        <motion.polyline
          points="10,75 28,60 46,45 64,30 82,12"
          fill="none"
          stroke={`${color.hex}b3`}
          strokeWidth={1.2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-x-6 bottom-10 top-10 flex items-end justify-between gap-1.5">
        {bars.map((h, i) => (
          <div key={i} className="relative flex-1" style={{ height: `${h}%` }}>
            <motion.div
              className="absolute bottom-0 w-full origin-bottom rounded-t-sm"
              style={{
                background: `linear-gradient(to top, ${color.hex}80, rgba(255,255,255,0.12))`,
                height: '100%',
              }}
              animate={{ scaleY: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            />
          </div>
        ))}
      </div>
      <span className="absolute right-3 top-5 font-mono text-[10px]" style={{ color: color.hex }}>
        ▲ Growth
      </span>
    </div>
  )
}

/* 06 — Synthetic Cinema: AI gradient blobs + scanning line + spark lattice */
function SyntheticCinemaMiniUniverse({ color }: { color: InlineColor }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#141414]">
      <motion.div
        className="absolute left-1/4 top-1/3 h-20 w-20 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color.glow}, transparent 70%)`,
          filter: 'blur(16px)',
        }}
        animate={{ x: [0, 24, 0], y: [0, -12, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
      <motion.div
        className="absolute inset-x-0 h-px"
        style={{ background: `${color.hex}b3`, boxShadow: `0 0 10px ${color.glow}` }}
        animate={{ top: ['10%', '90%', '10%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 space-y-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-sm bg-white/15"
            style={{ width: 40 + i * 6 }}
            animate={{ opacity: [0.1, 0.7, 0.1], width: [40 + i * 6, 60 + i * 6, 40 + i * 6] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <span className="absolute right-3 top-5 font-mono text-[8px]" style={{ color: color.hex }}>
        AI · GENERATING
      </span>
    </div>
  )
}

/* 07 — Echo System: signal waves + orbit rings + central hub */
function EchoMiniUniverse({ color }: { color: InlineColor }) {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 50%, ${color.glow}, transparent 60%)` }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{ width: 50 + i * 36, height: 36 + i * 26 }}
        />
      ))}
      <svg
        viewBox="0 0 100 50"
        className="absolute inset-x-0 bottom-3 h-1/3 w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            d={`M0,${24 + i * 2} Q25,${14 + i * 2} 50,${22 + i * 2} T100,${20 + i * 2}`}
            fill="none"
            stroke={`${color.hex}${Math.round((0.5 - i * 0.07) * 255).toString(16).padStart(2, '0')}`}
            strokeWidth={0.3}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </svg>
      <motion.div
        className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ background: color.hex, boxShadow: `0 0 16px ${color.glow}` }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        animate={{ scale: [1, 2], opacity: [0.6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        style={{ borderColor: `${color.hex}80` }}
      />
    </div>
  )
}

/* Map service index → mini universe component */
const MINI_COMPONENTS = [
  AuraMiniUniverse,
  DigitalHQMiniUniverse,
  HypeEngineMiniUniverse,
  KineticMiniUniverse,
  GrowthMiniUniverse,
  SyntheticCinemaMiniUniverse,
  EchoMiniUniverse,
]

/* ===================================================================
   ServiceCard — single selectable card.
   `selected` + `onToggle` owned by the parent.
   All hooks declared unconditionally at the top.
   =================================================================== */
function ServiceCard({
  s,
  index,
  selected,
  onToggle,
}: {
  s: ServiceEntry
  index: number
  selected: boolean
  onToggle: () => void
}) {
  const color = resolveColor(s)
  const Icon = s.icon
  const Mini = MINI_COMPONENTS[index]

  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={selected}
      aria-label={`${selected ? 'Deselect' : 'Select'} ${s.name}`}
      data-cursor={selected ? 'Remove' : 'Select'}
      onClick={onToggle}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.07, 0.5),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left transition-colors duration-300 ${
        selected
          ? 'bg-white/[0.08]'
          : 'border-white/10 bg-white/[0.025] hover:border-white/20'
      }`}
      style={{
        borderColor: selected ? `${color.hex}99` : undefined,
        boxShadow: selected
          ? `0 0 0 1px ${color.hex}40, 0 16px 40px -10px ${color.glow}, inset 0 1px 0 0 ${color.hex}33`
          : undefined,
      }}
    >
      {/* service-color glow bloom — always rendered (opacity animates) */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-500 ${
          selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
        }`}
        style={{
          background: `radial-gradient(120% 100% at 50% 0%, ${color.glow}, transparent 60%)`,
        }}
      />

      {/* top accent line — visible when selected or hovered */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, transparent, ${color.hex}, transparent)`,
          opacity: selected ? 0.9 : 0.35,
        }}
      />

      {/* corner checkmark badge — visible when selected */}
      <div
        aria-hidden
        className={`pointer-events-none absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
          selected
            ? 'scale-100 opacity-100'
            : 'scale-75 opacity-0 group-hover:opacity-40'
        }`}
        style={{
          background: selected ? color.hex : 'rgba(255,255,255,0.05)',
          borderColor: selected ? color.soft : 'rgba(255,255,255,0.18)',
          boxShadow: selected ? `0 0 14px ${color.glow}` : undefined,
        }}
      >
        {selected && <Check className="h-3.5 w-3.5 text-[#141414]" strokeWidth={3} />}
      </div>

      {/* mini universe visual */}
      <div
        className="relative z-10 aspect-[4/3] w-full overflow-hidden border-b border-white/8"
        style={{ background: '#080808' }}
        aria-hidden
      >
        <Mini color={color} />
      </div>

      {/* text content */}
      <div className="relative z-10 flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <ServiceColorDot color={s.color} size={8} className={s.inline ? 'opacity-0' : ''} />
          {s.inline && (
            <span
              aria-hidden
              className="inline-block rounded-full"
              style={{
                width: 8,
                height: 8,
                background: color.hex,
                boxShadow: `0 0 8px ${color.glow}, 0 0 16px ${color.glow}`,
              }}
            />
          )}
          <span
            className="wn-eyebrow text-[9px] font-bold tracking-[0.18em]"
            style={{ color: color.soft, fontFamily: 'var(--font-display), sans-serif' }}
          >
            ({s.n})
          </span>
          <span
            className="ml-auto text-[9px] font-medium uppercase tracking-[0.16em] text-white/40"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {s.cat}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 shrink-0" style={{ color: color.soft }} aria-hidden />
          <h3
            className="text-base font-bold leading-tight text-white"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {s.name}
          </h3>
        </div>
        <p className="text-xs leading-relaxed text-white/55">{s.desc}</p>

        {/* bottom row: state pill */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span
            className="wn-eyebrow text-[9px] font-semibold tracking-[0.18em] transition-colors duration-300"
            style={{
              color: selected ? color.hex : 'rgba(255,255,255,0.35)',
              fontFamily: 'var(--font-display), sans-serif',
            }}
          >
            {selected ? 'INTERESTED' : 'TAP TO SELECT'}
          </span>
          <span
            aria-hidden
            className="h-px flex-1"
            style={{
              background: selected
                ? `linear-gradient(to right, ${color.hex}, transparent)`
                : 'rgba(255,255,255,0.08)',
            }}
          />
        </div>
      </div>
    </motion.button>
  )
}

/* ===================================================================
   SelectedSummary — live count + Continue CTA. Sits in the 8th grid
   slot on lg, otherwise appears as a sticky footer bar on smaller
   screens. Always rendered (so the parent's scroll target is stable).
   =================================================================== */
function SelectedSummary({
  count,
  total,
  selectedSet,
  onContinue,
}: {
  count: number
  total: number
  selectedSet: Set<number>
  onContinue: () => void
}) {
  const hasSelection = count > 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.55, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex h-full flex-col items-stretch justify-between gap-5 overflow-hidden rounded-2xl border border-[#E53935]/30 bg-gradient-to-br from-[#E53935]/[0.06] via-white/[0.03] to-white/[0.01] p-5 backdrop-blur-xl"
      style={{ boxShadow: 'inset 0 1px 0 0 rgba(229,57,53,0.18)' }}
    >
      {/* ambient red glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-70"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 100%, rgba(229,57,53,0.18), transparent 65%)',
        }}
      />
      <div className="relative z-10 flex flex-col gap-1">
        <span
          className="wn-eyebrow text-[10px] font-bold tracking-[0.22em] text-[#E53935]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          YOUR INTEREST
        </span>
        <div className="mt-3 flex items-baseline gap-2">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-bold leading-none text-white"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {String(count).padStart(2, '0')}
          </motion.span>
          <span className="text-sm text-white/45">/ {String(total).padStart(2, '0')} services</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-white/55">
          {hasSelection
            ? 'Tailored to what you actually need — no generic decks.'
            : 'Tap the cards above to mark the services you\u2019re considering.'}
        </p>
      </div>

      {/* selected color chips — all 7 dots always rendered; selected
          ones bright + glowing, unselected ones dim. Reflects live
          multi-select state at a glance. */}
      <div className="relative z-10 flex flex-wrap items-center gap-1.5">
        {services.map((s, i) => {
          const c = resolveColor(s)
          const on = selectedSet.has(i)
          return (
            <span
              key={s.n}
              aria-hidden
              className="h-2 w-2 rounded-full transition-all duration-300"
              style={{
                background: c.hex,
                opacity: on ? 1 : 0.18,
                boxShadow: on ? `0 0 6px ${c.glow}, 0 0 12px ${c.glow}` : 'none',
                transform: on ? 'scale(1.15)' : 'scale(1)',
              }}
            />
          )
        })}
      </div>

      <div className="relative z-10 mt-auto">
        <BookingMagneticButton
          variant="primary"
          cursorLabel={hasSelection ? 'Continue' : 'Select'}
          ariaLabel="Continue to booking form"
          onClick={onContinue}
          className={hasSelection ? '' : 'pointer-events-none opacity-40'}
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </BookingMagneticButton>
        <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/30">
          {hasSelection ? 'Jump to the form' : 'Pick at least 1 to continue'}
        </p>
      </div>
    </motion.div>
  )
}

/* ===================================================================
   BookServicesSelector — Section 5 named export.
   All hooks declared UNCONDITIONALLY at the top.
   =================================================================== */
export function BookServicesSelector() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  // multi-select: Set of service indices
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const handleContinue = () => {
    if (selected.size === 0) return
    try {
      const el = document.getElementById('book-your-call')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    } catch {
      /* graceful no-op — Section 4 may not yet be present */
    }
    // fallback: scroll to the top of this section so the user lands
    // somewhere intentional rather than nothing happening.
    try {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    } catch {
      /* no-op */
    }
  }

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <BookingStickyRail label="Services" caption="Interest" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient — subtle brand-red wash + a multi-color dot row */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(229,57,53,0.14), rgba(229,57,53,0) 65%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="absolute bottom-[12%] right-[8%] h-[24vw] w-[24vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%)',
                filter: 'blur(44px)',
              }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
              transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            />
          </div>

          {/* Header block */}
          <motion.div style={{ y: headerY }} className="relative z-10 mb-12 max-w-3xl">
            <BookingEyebrow number="05" label="SERVICES" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>What Are You </MaskLine>
              <MaskLine delay={0.1}>
                <span className="bg-gradient-to-br from-[#ff6b63] to-[#E53935] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(229,57,53,0.45)]">
                  Building?
                </span>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Select the services you&apos;re considering. We&apos;ll tailor the call to
              what you actually need — no generic decks.
            </motion.p>
          </motion.div>

          {/* Services grid — 7 cards + summary panel as 8th cell on lg */}
          <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {services.map((s, i) => (
              <ServiceCard
                key={s.n}
                s={s}
                index={i}
                selected={selected.has(i)}
                onToggle={() => toggle(i)}
              />
            ))}

            {/* 8th cell — sticky summary panel (lg+ only spans the last
                column; on sm and mobile it appears as the last grid row) */}
            <SelectedSummary
              count={selected.size}
              total={services.length}
              selectedSet={selected}
              onContinue={handleContinue}
            />
          </div>

          {/* Live counter line below the grid (mobile-friendly) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative z-10 mt-8 flex flex-wrap items-center gap-3 text-xs text-white/40"
          >
            <span
              className="wn-eyebrow text-[10px] font-semibold tracking-[0.22em]"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {String(selected.size).padStart(2, '0')} SELECTED
            </span>
            <span className="h-px w-8 bg-white/10" aria-hidden />
            <span className="text-white/35">
              {selected.size === 0
                ? 'Tap any card to begin — multi-select.'
                : selected.size === 1
                  ? '1 service in scope.'
                  : `${selected.size} services in scope.`}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
