'use client'

/**
 * Work page — shared helpers (MULTI-COLOR accent system).
 *
 * The Work page is the FIRST page in the WatNidea site that does NOT
 * have a single service accent. Instead, it showcases projects across
 * ALL six services, and each service category keeps its own visual
 * identity:
 *
 *   - Aura Architecture projects  → GOLD     #F59E0B
 *   - The Digital HQ projects     → BLUE     #3B82F6
 *   - The Hype Engine projects    → RED      #E53935  (brand)
 *   - Growth Alchemy projects     → GREEN    #10B981
 *   - Synthetic Cinema projects   → PURPLE   #8B5CF6
 *   - The Echo System projects    → CYAN     #06B6D4
 *
 * This module provides:
 *   1. A `WORK_COLORS` registry mapping each service key to its color
 *      constant (hex, rgb triplet, soft, neon, deep, glow).
 *   2. A generic `<ServiceGradientText color="...">` component that
 *      renders a gradient text span in ANY of the 6 service colors.
 *   3. A generic `<ServiceEyebrow color="..." number label>` component.
 *   4. A generic `<ServiceAmbient color="...">` component.
 *   5. A `MultiColorEmberCanvas` that emits embers in ALL 6 colors
 *      (for the hero and final CTA where all services merge).
 *   6. A `ConvergenceSphere` — the Final CTA centerpiece: a 6-color
 *      convergence sphere where all service colors flow into one
 *      white-hot identity core.
 *   7. `WorkMagneticButton` — a brand-red magnetic button (the Work
 *      page's primary CTA uses brand red since Work is the umbrella
 *      page, not a single service).
 *   8. `WorkEyebrow` — a brand-red eyebrow for section headers (the
 *      Work page section eyebrows use brand red as the unifying color).
 *
 * Color-agnostic helpers (MaskLine, useCursorParallax, MotionValue)
 * are re-exported from the shared module.
 *
 * All hooks declared unconditionally at the top of each component
 * (Rules of Hooks). Canvas helpers use the __cleanup HMR-safe pattern.
 */

import { type ReactNode, type RefObject, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  type MotionValue,
} from 'framer-motion'
import { cn } from '@/lib/utils'

/* Re-export color-agnostic helpers so sections can import everything
   from a single module. */
export { MaskLine, useCursorParallax } from '@/components/about/shared'
export type { MotionValue }

/* ===================================================================
   WORK_COLORS — registry of all 6 service accents.
   Each entry: { key, name, hex, rgb, soft, neon, deep, glow,
                  gradientFrom, gradientVia, gradientTo }
   `rgb` is the comma-separated triplet (no parens) for use inside
   rgba() templates.
   =================================================================== */
export type ServiceColorKey =
  | 'aura'
  | 'digital'
  | 'hype'
  | 'growth'
  | 'cinema'
  | 'echo'

export type ServiceColor = {
  key: ServiceColorKey
  name: string
  hex: string
  rgb: string
  soft: string
  neon: string
  deep: string
  glow: string
  gradientFrom: string
  gradientVia: string
  gradientTo: string
}

export const WORK_COLORS: Record<ServiceColorKey, ServiceColor> = {
  aura: {
    key: 'aura',
    name: 'Aura Architecture',
    hex: '#F59E0B',
    rgb: '245,158,11',
    soft: '#fbbf24', // amber-400
    neon: '#fcd34d', // amber-300
    deep: '#b45309', // amber-700
    glow: 'rgba(245,158,11,0.22)',
    gradientFrom: '#fcd34d',
    gradientVia: '#F59E0B',
    gradientTo: '#b45309',
  },
  digital: {
    key: 'digital',
    name: 'The Digital HQ',
    hex: '#3B82F6',
    rgb: '59,130,246',
    soft: '#60a5fa', // blue-400
    neon: '#93c5fd', // blue-300
    deep: '#1d4ed8', // blue-700
    glow: 'rgba(59,130,246,0.22)',
    gradientFrom: '#93c5fd',
    gradientVia: '#3B82F6',
    gradientTo: '#1d4ed8',
  },
  hype: {
    key: 'hype',
    name: 'The Hype Engine',
    hex: '#E53935',
    rgb: '229,57,53',
    soft: '#f87171', // red-400
    neon: '#fca5a5', // red-300
    deep: '#b91c1c', // red-700
    glow: 'rgba(229,57,53,0.22)',
    gradientFrom: '#fca5a5',
    gradientVia: '#E53935',
    gradientTo: '#b91c1c',
  },
  growth: {
    key: 'growth',
    name: 'Growth Alchemy',
    hex: '#10B981',
    rgb: '16,185,129',
    soft: '#34d399', // emerald-400
    neon: '#6ee7b7', // emerald-300
    deep: '#047857', // emerald-700
    glow: 'rgba(16,185,129,0.22)',
    gradientFrom: '#6ee7b7',
    gradientVia: '#10B981',
    gradientTo: '#047857',
  },
  cinema: {
    key: 'cinema',
    name: 'Synthetic Cinema',
    hex: '#8B5CF6',
    rgb: '139,92,246',
    soft: '#a78bfa', // violet-400
    neon: '#c4b5fd', // violet-300
    deep: '#6d28d9', // violet-700
    glow: 'rgba(139,92,246,0.22)',
    gradientFrom: '#c4b5fd',
    gradientVia: '#8B5CF6',
    gradientTo: '#6d28d9',
  },
  echo: {
    key: 'echo',
    name: 'The Echo System',
    hex: '#06B6D4',
    rgb: '6,182,212',
    soft: '#22d3ee', // cyan-400
    neon: '#67e8f9', // cyan-300
    deep: '#0e7490', // cyan-700
    glow: 'rgba(6,182,212,0.22)',
    gradientFrom: '#67e8f9',
    gradientVia: '#06B6D4',
    gradientTo: '#0e7490',
  },
}

/* Ordered list of all 6 colors (useful for iterating in convergence
   visuals, the hero floating gallery, the final CTA sphere, etc.). */
export const WORK_COLOR_LIST: ServiceColor[] = [
  WORK_COLORS.aura,
  WORK_COLORS.digital,
  WORK_COLORS.hype,
  WORK_COLORS.growth,
  WORK_COLORS.cinema,
  WORK_COLORS.echo,
]

/* ===================================================================
   ServiceGradientText — gradient text span in ANY of the 6 service
   colors. `color` is the service key. Optional `glow` (default true).
   =================================================================== */
export function ServiceGradientText({
  children,
  color = 'hype',
  className = '',
  glow = true,
}: {
  children: ReactNode
  color?: ServiceColorKey
  className?: string
  glow?: boolean
}) {
  const c = WORK_COLORS[color]
  return (
    <span
      className={
        `bg-gradient-to-br from-[${c.gradientFrom}] via-[${c.gradientVia}] to-[${c.gradientTo}] bg-clip-text text-transparent ` +
        (glow ? `drop-shadow-[0_0_30px_${c.glow}] ` : '') +
        className
      }
    >
      {children}
    </span>
  )
}

/* ===================================================================
   ServiceEyebrow — `(NN)` colored number + colored rule + label,
   in ANY of the 6 service colors.
   =================================================================== */
export function ServiceEyebrow({
  number,
  label,
  color = 'hype',
}: {
  number: string
  label: string
  color?: ServiceColorKey
}) {
  const c = WORK_COLORS[color]
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3"
    >
      <span
        className="text-xs font-bold"
        style={{ color: c.hex, fontFamily: 'var(--font-display), sans-serif' }}
      >
        ({number})
      </span>
      <span
        className="h-px w-8"
        style={{ background: c.hex, opacity: 0.6 }}
      />
      <span className="wn-eyebrow text-[11px] font-medium text-white/60 sm:text-xs">
        {label}
      </span>
    </motion.div>
  )
}

/* ===================================================================
   WorkEyebrow — brand-red eyebrow for the Work page's own section
   headers (Work is the umbrella page, so its section eyebrows use
   brand red as the unifying color).
   =================================================================== */
export function WorkEyebrow({
  number,
  label,
}: {
  number: string
  label: string
}) {
  return <ServiceEyebrow number={number} label={label} color="hype" />
}

/* ===================================================================
   ServiceAmbient — layered slow-pulsing glow blobs in ANY of the 6
   service colors. Used to tint a section's atmosphere to match the
   service category of the projects it shows.
   =================================================================== */
export function ServiceAmbient({
  color = 'hype',
}: {
  color?: ServiceColorKey
}) {
  const c = WORK_COLORS[color]
  // build rgba strings from the rgb triplet
  const rgb = c.rgb
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* wide dim white wash */}
      <motion.div
        aria-hidden
        className="absolute bottom-[6%] left-1/2 h-[80vw] w-[100vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.05), rgba(255,255,255,0) 60%)',
          filter: 'blur(60px)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* intense service-color, top-center, slow pulse */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[8%] h-[68vw] w-[68vw] -translate-x-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${rgb},0.22), rgba(${rgb},0.06) 40%, rgba(${rgb},0) 70%)`,
          filter: 'blur(50px)',
        }}
        animate={{ opacity: [0.55, 0.95, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* secondary service-color blob, lower-left */}
      <motion.div
        aria-hidden
        className="absolute bottom-[12%] left-[-6%] h-[34vw] w-[34vw] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${rgb},0.14), rgba(${rgb},0) 70%)`,
          filter: 'blur(45px)',
        }}
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.12, 1] }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
      />
    </div>
  )
}

/* ===================================================================
   MultiColorEmberCanvas — rising embers cycling through ALL 6 service
   colors. Used in the hero (floating gallery) and the final CTA
   (convergence). HMR-safe via __cleanup. Reduced-motion guard.
   Optional count prop (default 50).
   =================================================================== */
export function MultiColorEmberCanvas({
  className = '',
  count = 50,
}: {
  className?: string
  count?: number
}) {
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

        // The 6 service colors as [hue, saturation, lightness] HSL
        // triplets. Hue approximations:
        //   aura gold    → 40
        //   digital blue → 217
        //   hype red     → 1
        //   growth green → 160
        //   cinema purple→ 258
        //   echo cyan    → 190
        const palette: Array<[number, number, number]> = [
          [40, 92, 52], // aura gold
          [217, 91, 60], // digital blue
          [1, 78, 57], // hype red
          [160, 84, 45], // growth green
          [258, 90, 66], // cinema purple
          [190, 85, 50], // echo cyan
        ]

        type Ember = {
          x: number
          y: number
          vx: number
          vy: number
          r: number
          life: number
          maxLife: number
          hsl: [number, number, number]
        }
        const embers: Ember[] = []

        const spawn = (initial = false): Ember => {
          const hsl = palette[Math.floor(Math.random() * palette.length)]
          return {
            x: Math.random() * w,
            y: initial ? Math.random() * h : h + Math.random() * 40,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -(0.3 + Math.random() * 0.6),
            r: Math.random() * 1.6 + 0.6,
            life: 0,
            maxLife: 240 + Math.random() * 280,
            hsl,
          }
        }

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

          embers.length = 0
          const n = reduce ? 0 : count
          for (let i = 0; i < n; i++) embers.push(spawn(true))
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          ctx.globalCompositeOperation = 'lighter'

          for (let i = 0; i < embers.length; i++) {
            const p = embers[i]
            p.life += 1
            p.x += p.vx + Math.sin(p.life * 0.04) * 0.18
            p.y += p.vy
            p.vy *= 0.998

            const t = p.life / p.maxLife
            if (t >= 1) {
              embers[i] = spawn(false)
              continue
            }
            const fade = Math.sin(t * Math.PI) // 0 → 1 → 0
            const alpha = 0.5 * fade
            const [hue, sat, light] = p.hsl
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
            grad.addColorStop(0, `hsla(${hue}, ${sat}%, ${light + 8}%, ${alpha})`)
            grad.addColorStop(1, `hsla(${hue}, ${sat}%, ${light}%, 0)`)
            ctx.fillStyle = grad
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
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
        }
      }}
      className={'absolute inset-0 h-full w-full ' + className}
      aria-hidden
    />
  )
}

/* ===================================================================
   ConvergenceSphere — the Final CTA centerpiece. A 6-color convergence
   sphere where all service color streams flow inward into a single
   white-hot identity core. 6 orbiting color satellites (one per
   service) circle the core, each leaving a trailing arc. Cursor-
   follow parallax on the whole sphere. `size` prop scales everything.
   =================================================================== */
export function ConvergenceSphere({
  size = 80,
}: {
  size?: number
}) {
  // cursor-follow parallax (all hooks declared unconditionally at top)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  const sphereX = useTransform(sx, [0, 1], [-30, 30])
  const sphereY = useTransform(sy, [0, 1], [-22, 22])

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)))
    my.set(Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)))
  }
  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  const s = size / 80
  const coreOuter = `${size}vw`
  const coreOuterMax = `${760 * s}px`
  const midVw = `${52 * s}vw`
  const midMax = `${500 * s}px`
  const coreVw = `${26 * s}vw`
  const coreMax = `${260 * s}px`
  const pinVw = `${7 * s}vw`
  const pinMax = `${68 * s}px`

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="pointer-events-auto absolute inset-0"
      aria-hidden
    >
      {/* Orbiting satellites — 6 service color dots circling the core.
          Each is a motion.div with a rotating parent. */}
      <motion.div
        style={{ x: sphereX, y: sphereY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {/* outermost multi-color wash — a conic gradient blending all 6 */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: coreOuter,
            height: coreOuter,
            maxWidth: coreOuterMax,
            maxHeight: coreOuterMax,
            background: `conic-gradient(from 0deg, ${WORK_COLORS.aura.glow}, ${WORK_COLORS.digital.glow}, ${WORK_COLORS.hype.glow}, ${WORK_COLORS.growth.glow}, ${WORK_COLORS.cinema.glow}, ${WORK_COLORS.echo.glow}, ${WORK_COLORS.aura.glow})`,
            filter: 'blur(40px)',
            opacity: 0.7,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        {/* middle bloom — white-hot */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: midVw,
            height: midVw,
            maxWidth: midMax,
            maxHeight: midMax,
            background:
              'radial-gradient(circle, rgba(255,255,255,0.6), rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 75%)',
            filter: 'blur(20px)',
          }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
        {/* core — bright white */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: coreVw,
            height: coreVw,
            maxWidth: coreMax,
            maxHeight: coreMax,
            background:
              'radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0.3) 60%, rgba(255,255,255,0))',
            filter: 'blur(8px)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        {/* pinpoint */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{
            width: pinVw,
            height: pinVw,
            maxWidth: pinMax,
            maxHeight: pinMax,
            filter: 'blur(2px)',
          }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Orbit ring with 6 satellites — one per service color */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: midVw, height: midVw, maxWidth: midMax, maxHeight: midMax }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {WORK_COLOR_LIST.map((sc, i) => {
            const angle = (i / 6) * Math.PI * 2
            const r = 40 // % of the orbit ring
            // Pre-round to 3 decimals to prevent SSR/client hydration
            // mismatch (floating-point precision differs between Node
            // SSR serialization and browser V8).
            const x = Math.round((50 + Math.cos(angle) * r) * 1000) / 1000
            const y = Math.round((50 + Math.sin(angle) * r) * 1000) / 1000
            return (
              <motion.div
                key={sc.key}
                className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  background: sc.hex,
                  boxShadow: `0 0 16px ${sc.hex}, 0 0 32px ${sc.glow}`,
                }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.4,
                }}
              />
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ===================================================================
   WorkStickyRail — sticky vertical rail (lg+ only) with BRAND-RED
   progress line (the Work page's unifying color). Driven by useScroll
   on the supplied sectionRef.
   =================================================================== */
export function WorkStickyRail({
  label,
  caption,
  sectionRef,
}: {
  label: string
  caption: string
  sectionRef: RefObject<HTMLElement | null> | RefObject<HTMLDivElement | null>
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <aside className="hidden lg:block lg:w-24 lg:shrink-0">
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <span
            className="wn-eyebrow text-[11px] font-medium text-white/45 [writing-mode:vertical-rl]"
            style={{ rotate: '180deg' }}
          >
            {label}
          </span>
          <div className="relative h-56 w-px overflow-hidden rounded-full bg-white/10">
            <motion.div
              style={{ scaleY: railScale }}
              className="absolute inset-0 origin-top bg-[#E53935]"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            {caption}
          </span>
        </div>
      </div>
    </aside>
  )
}

/* ===================================================================
   WorkMagneticButton — brand-red magnetic button (the Work page's
   primary CTA uses brand red as the unifying umbrella color).
   variant="primary" → solid red; variant="secondary" → outline.
   variant="convergence" → special: white bg with multi-color glow
   (for the final CTA where all services merge).
   =================================================================== */
export function WorkMagneticButton({
  children,
  className,
  variant = 'primary',
  cursorLabel,
  onClick,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'convergence'
  cursorLabel?: string
  onClick?: () => void
  ariaLabel?: string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    setPos({ x: x * 0.35, y: y * 0.35 })
  }

  const reset = () => setPos({ x: 0, y: 0 })

  const isPrimary = variant === 'primary'
  const isConvergence = variant === 'convergence'

  return (
    <motion.button
      ref={ref}
      aria-label={ariaLabel}
      data-cursor={cursorLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300',
        isPrimary
          ? 'bg-[#E53935] text-white'
          : isConvergence
            ? 'bg-white text-[#141414]'
            : 'border border-white/25 bg-white/5 text-white backdrop-blur-md hover:border-[#E53935]/60',
        className
      )}
    >
      {/* Shine sweep */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out',
          'group-hover:translate-x-full'
        )}
      />
      {/* Glow — primary red */}
      {isPrimary && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-full opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at center, rgba(229,57,53,0.7), rgba(229,57,53,0))',
          }}
        />
      )}
      {/* Glow — convergence multi-color */}
      {isConvergence && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-full opacity-70 blur-lg transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `conic-gradient(from 0deg, ${WORK_COLORS.aura.glow}, ${WORK_COLORS.digital.glow}, ${WORK_COLORS.hype.glow}, ${WORK_COLORS.growth.glow}, ${WORK_COLORS.cinema.glow}, ${WORK_COLORS.echo.glow}, ${WORK_COLORS.aura.glow})`,
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}

/* ===================================================================
   ServiceColorDot — a small colored dot/badge in any service color.
   Used as a visual category indicator next to project titles, filter
   chips, etc. `size` in px (default 10).
   =================================================================== */
export function ServiceColorDot({
  color = 'hype',
  size = 10,
  className = '',
}: {
  color?: ServiceColorKey
  size?: number
  className?: string
}) {
  const c = WORK_COLORS[color]
  return (
    <span
      aria-hidden
      className={'inline-block rounded-full ' + className}
      style={{
        width: size,
        height: size,
        background: c.hex,
        boxShadow: `0 0 ${size}px ${c.glow}, 0 0 ${size * 2}px ${c.glow}`,
      }}
    />
  )
}
