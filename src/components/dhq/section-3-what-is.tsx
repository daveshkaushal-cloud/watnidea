'use client'

/**
 * DhqWhatIs — Section 3
 * "Your website is your digital headquarters." — interactive ecosystem.
 *
 * Composition:
 *   - Eyebrow: (03) · What Is The Digital HQ
 *   - Headline (3 lines, MaskLine): "Your website is" / "your digital"
 *     / "headquarters." ("headquarters." red)
 *   - Body (verbatim): "High-speed, conversion-focused websites that
 *     act as your 24/7 sales engine and digital headquarters."
 *
 * Visual concept — "central digital ecosystem":
 *   - CENTER: a glowing glassmorphism "Website Core" panel with a
 *     browser-frame motif, pulsing red glow.
 *   - AROUND it: 7 connected system nodes (Brand, Content, SEO, Lead
 *     Generation, CRM, Performance Marketing, Customer Journey).
 *   - Animated red energy streams (SVG paths with animated
 *     strokeDashoffset) flowing BETWEEN each system node AND the
 *     central core. Streams pulse continuously in both directions.
 *   - Interactive: hover a node → it highlights + its stream
 *     intensifies + tooltip shows the system name + one-line desc.
 *   - Living ecosystem: subtle continuous motion (nodes drift,
 *     streams pulse).
 *   - Scroll-driven: nodes + streams fade/draw in as the section
 *     enters view.
 */

import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  Fingerprint,
  FileText,
  Search,
  Target,
  Users,
  Rocket,
  Route,
  type LucideIcon,
} from 'lucide-react'
import {
  SectionEyebrow,
  MaskLine,
  RedGradientText,
} from '@/components/about/shared'

/* ===================================================================
   Content — 7 systems (premium descriptors, brand voice, verbatim).
   Positions precomputed at module scope & rounded to 3 decimals to
   guarantee identical SSR + client serialization.
   7 nodes are placed on a circle around the central core.
   =================================================================== */
type System = {
  label: string
  desc: string
  Icon: LucideIcon
  // position on the SVG viewBox 100x100 (relative to center 50,50)
  x: number
  y: number
}

// 7 nodes distributed around a circle of radius 36 from center 50,50
const RADIUS = 36
const rawSystems: System[] = [
  {
    label: 'Brand',
    desc: 'Your identity, encoded into every pixel.',
    Icon: Fingerprint,
    // top
    x: 50,
    y: 50 - RADIUS,
  },
  {
    label: 'Content',
    desc: 'The narrative that converts attention into action.',
    Icon: FileText,
    // upper-right
    x: 50 + RADIUS * Math.cos((Math.PI / 4)),
    y: 50 - RADIUS * Math.sin((Math.PI / 4)),
  },
  {
    label: 'SEO',
    desc: 'Found first by the people searching for you.',
    Icon: Search,
    // right
    x: 50 + RADIUS * 1,
    y: 50,
  },
  {
    label: 'Lead Generation',
    desc: 'Every visit engineered to become an opportunity.',
    Icon: Target,
    // lower-right
    x: 50 + RADIUS * Math.cos((-Math.PI / 4)),
    y: 50 - RADIUS * Math.sin((-Math.PI / 4)),
  },
  {
    label: 'CRM',
    desc: 'Every relationship tracked, nurtured, retained.',
    Icon: Users,
    // bottom
    x: 50,
    y: 50 + RADIUS,
  },
  {
    label: 'Performance Marketing',
    desc: 'Paid traffic routed straight to conversion.',
    Icon: Rocket,
    // lower-left
    x: 50 + RADIUS * Math.cos((Math.PI * 5 / 4)),
    y: 50 - RADIUS * Math.sin((Math.PI * 5 / 4)),
  },
  {
    label: 'Customer Journey',
    desc: 'Every touchpoint mapped, optimized, intentional.',
    Icon: Route,
    // left
    x: 50 - RADIUS,
    y: 50,
  },
]

const systems: System[] = rawSystems.map((s) => ({
  ...s,
  x: Math.round(s.x * 1000) / 1000,
  y: Math.round(s.y * 1000) / 1000,
}))

/* ===================================================================
   EcosystemCanvas — particles drift + pulse around the central core.
   Continuous ambient motion (no scroll dependency — purely decorative).
   =================================================================== */
function EcosystemCanvas() {
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
        const reduce =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches

        type P = {
          x: number
          y: number
          vx: number
          vy: number
          r: number
          red: boolean
          phase: number
        }
        const ps: P[] = []

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
          const n = reduce ? 0 : 70
          for (let i = 0; i < n; i++) {
            ps.push({
              x: Math.random() * w,
              y: Math.random() * h,
              vx: (Math.random() - 0.5) * 0.18,
              vy: (Math.random() - 0.5) * 0.18,
              r: Math.random() * 1.4 + 0.4,
              red: Math.random() < 0.32,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          const t = performance.now() / 1000

          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
            if (!p.red) continue
            const px = p.x + Math.sin(t * 0.55 + p.phase) * 5
            const py = p.y + Math.cos(t * 0.45 + p.phase) * 5
            const g = ctx.createRadialGradient(px, py, 0, px, py, 10)
            g.addColorStop(0, 'rgba(229,57,53,0.5)')
            g.addColorStop(1, 'rgba(229,57,53,0)')
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(px, py, 10, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.globalCompositeOperation = 'source-over'

          for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
            if (p.red) continue
            p.x += p.vx
            p.y += p.vy
            if (p.x < -10) p.x = w + 10
            if (p.x > w + 10) p.x = -10
            if (p.y < -10) p.y = h + 10
            if (p.y > h + 10) p.y = -10

            const flick = 0.5 + 0.5 * Math.sin(t * 1.4 + p.phase)
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255,255,255,${0.18 + 0.45 * flick})`
            ctx.fill()
          }

          raf = requestAnimationFrame(draw)
        }

        resize()
        window.addEventListener('resize', resize)
        if (!reduce) raf = requestAnimationFrame(draw)

        ;(c as { __cleanup?: () => void }).__cleanup = () => {
          cancelAnimationFrame(raf)
          window.removeEventListener('resize', resize)
        }
      }}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}

/* ===================================================================
   EnergyStream — single SVG path from a system node to the central
   core. Continuously pulses (strokeDashoffset animation in both
   directions). On hover, intensifies (stroke + glow).
   =================================================================== */
function EnergyStream({
  s,
  active,
}: {
  s: System
  active: boolean
}) {
  // slight curve via quadratic bezier control point
  const cx = 50
  const cy = 50
  const mx = (s.x + cx) / 2
  const my = (s.y + cy) / 2 - 3

  const stroke = active ? 'rgba(229,57,53,0.95)' : 'rgba(229,57,53,0.4)'
  const sw = active ? 0.9 : 0.5

  return (
    <motion.path
      d={`M${s.x},${s.y} Q${mx},${my} ${cx},${cy}`}
      fill="none"
      stroke={stroke}
      strokeWidth={sw}
      strokeLinecap="round"
      animate={{
        strokeDashoffset: [0, -24],
        opacity: active ? [0.85, 1, 0.85] : [0.35, 0.65, 0.35],
      }}
      transition={{
        duration: active ? 1.2 : 2,
        repeat: Infinity,
        ease: 'linear',
      }}
      strokeDasharray="3 4"
      style={{
        filter: active
          ? 'drop-shadow(0 0 4px rgba(229,57,53,0.9))'
          : 'drop-shadow(0 0 2px rgba(229,57,53,0.5))',
      }}
    />
  )
}

/* ===================================================================
   SystemNode — single labeled node around the central core.
   Hoverable: scales up, glows; tooltip shows system + descriptor.
   =================================================================== */
function SystemNode({
  s,
  active,
  onEnter,
  onLeave,
  visible,
}: {
  s: System
  active: boolean
  onEnter: () => void
  onLeave: () => void
  visible: boolean
}) {
  const { Icon } = s
  return (
    <div
      data-cursor="View"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1.5"
      style={{ left: `${s.x}%`, top: `${s.y}%` }}
    >
      <motion.div
        animate={{
          scale: active ? 1.18 : 1,
          boxShadow: active
            ? '0 0 22px rgba(229,57,53,0.95), 0 0 48px rgba(229,57,53,0.55)'
            : '0 0 10px rgba(229,57,53,0.55), 0 0 22px rgba(229,57,53,0.25)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#E53935]/50 bg-[#141414]/80 backdrop-blur-md sm:h-12 sm:w-12"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <Icon
          className={`h-4 w-4 sm:h-5 sm:w-5 ${
            active ? 'text-white' : 'text-[#ff6b63]'
          }`}
        />
        {/* pulsing ring */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-[#E53935]/60"
          animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.div>

      <span
        className="wn-eyebrow whitespace-nowrap text-[8px] font-medium text-white/80 sm:text-[9px]"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {s.label}
      </span>

      {/* tooltip on hover */}
      <motion.div
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          y: active ? 0 : 4,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute top-full mt-3 w-44 max-w-[60vw] rounded-md border border-white/10 bg-black/85 px-3 py-2 text-center backdrop-blur-md"
      >
        <p className="text-[10px] font-semibold text-white sm:text-xs">
          {s.label}
        </p>
        <p className="mt-1 text-[10px] leading-snug text-white/55">
          {s.desc}
        </p>
      </motion.div>
    </div>
  )
}

/* ===================================================================
   WebsiteCore — central glowing "Website Core" panel with a browser
   frame motif. Pulsing red glow + slow rotate.
   =================================================================== */
function WebsiteCore({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* halo */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '14vw',
          height: '14vw',
          maxWidth: '140px',
          maxHeight: '140px',
          background:
            'radial-gradient(circle, rgba(229,57,53,0.4), rgba(229,57,53,0) 70%)',
          filter: 'blur(20px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* browser-frame core */}
      <motion.div
        className="relative flex h-28 w-36 flex-col overflow-hidden rounded-xl border border-[#E53935]/55 bg-[#0a0a0a]/90 backdrop-blur-md sm:h-32 sm:w-44"
        animate={{ scale: [1, 1.04, 1], y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow:
            '0 0 30px rgba(229,57,53,0.7), 0 0 60px rgba(229,57,53,0.35), inset 0 0 18px rgba(229,57,53,0.18)',
        }}
      >
        {/* browser chrome */}
        <div className="flex items-center gap-1 border-b border-white/10 bg-white/[0.02] px-2 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E53935]/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <div className="ml-1.5 h-2 flex-1 rounded-sm bg-white/5" />
        </div>
        {/* fake content */}
        <div className="flex flex-1 flex-col gap-1.5 p-2.5">
          <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
          <div className="h-1.5 w-1/2 rounded-full bg-[#E53935]/55" />
          <div className="mt-auto flex gap-1">
            <div className="h-3 flex-1 rounded-sm bg-white/8" />
            <div className="h-3 flex-1 rounded-sm bg-white/8" />
            <div className="h-3 flex-1 rounded-sm bg-[#E53935]/35" />
          </div>
        </div>
        {/* center label */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            className="wn-eyebrow text-[9px] font-bold text-[#ff6b63] sm:text-[10px]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Website Core
          </span>
        </div>
      </motion.div>
    </div>
  )
}

/* ===================================================================
   DhqWhatIs — Section 3 named export
   =================================================================== */
export function DhqWhatIs() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // nodes + core fade in as section enters view
  const visible = useTransform(scrollYProgress, [0.35, 0.55], [0, 1])
  const [visibleState, setVisibleState] = useState(false)

  useEffect(() => {
    const update = (v: number) => setVisibleState(v > 0.5)
    update(visible.get())
    const unsub = visible.on('change', update)
    return () => unsub()
  }, [visible])

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#141414]/70 px-5 py-24 backdrop-blur-sm sm:px-8 sm:py-32 lg:py-40"
      aria-label="What Is The Digital HQ"
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
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionEyebrow number="03" label="What Is The Digital HQ" />

        {/* Massive headline */}
        <h2
          className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>Your website is</MaskLine>
          <MaskLine delay={0.08}>your digital</MaskLine>
          <MaskLine delay={0.16}>
            <RedGradientText>headquarters.</RedGradientText>
          </MaskLine>
        </h2>

        {/* Body — verbatim */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
        >
          High-speed, conversion-focused websites that act as your 24/7 sales
          engine and digital headquarters.
        </motion.p>

        {/* The interactive ecosystem */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <div className="relative mx-auto aspect-square w-full max-w-[640px] overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A]/80">
            <EcosystemCanvas />

            {/* SVG energy streams layer */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              {systems.map((s, i) => (
                <EnergyStream
                  key={s.label}
                  s={s}
                  active={activeIndex === i || activeIndex === null}
                />
              ))}
            </svg>

            {/* Central Website core */}
            <WebsiteCore visible={visibleState} />

            {/* 7 system nodes */}
            {systems.map((s, i) => (
              <SystemNode
                key={s.label}
                s={s}
                active={activeIndex === i}
                visible={visibleState}
                onEnter={() => setActiveIndex(i)}
                onLeave={() => setActiveIndex(null)}
              />
            ))}

            {/* corner labels */}
            <div className="pointer-events-none absolute left-4 top-4 wn-eyebrow text-[10px] text-white/45">
              Digital HQ Ecosystem
            </div>
            <div className="pointer-events-none absolute bottom-4 right-4 text-[10px] text-white/30">
              Hover a node to explore
            </div>
          </div>

          {/* system chips below the ecosystem (mobile-friendly discovery) */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {systems.map((s, i) => {
              const { Icon } = s
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{
                    duration: 0.6,
                    delay: (i % 4) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onPointerEnter={() => setActiveIndex(i)}
                  onPointerLeave={() => setActiveIndex(null)}
                  className={`group rounded-lg border p-3 transition-colors duration-300 ${
                    activeIndex === i
                      ? 'border-[#E53935]/60 bg-[#E53935]/10'
                      : 'border-white/10 bg-white/[0.025] hover:border-white/25'
                  }`}
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-[#ff6b63]" />
                    <span
                      className="text-sm font-semibold text-white"
                      style={{ fontFamily: 'var(--font-display), sans-serif' }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <p className="text-xs leading-snug text-white/55">{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
