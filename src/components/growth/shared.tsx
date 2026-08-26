'use client'

/**
 * Growth Alchemy — shared helpers (Emerald accent system).
 *
 * The global WatNidea brand color is red (#E53935). The default shared
 * helpers in `@/components/about/shared` (RedGradientText, SectionEyebrow,
 * StickyRail, AboutAmbient, EmberCanvas, EnergySphere) are all red-accented.
 *
 * Growth Alchemy's service accent is EMERALD GREEN (#10B981) per the global
 * color directive. To honor that WITHOUT modifying the shared file (which
 * every other page depends on), this module provides emerald-accented
 * equivalents. Growth Alchemy section components import from HERE instead
 * of `@/components/about/shared` for anything color-tinted.
 *
 * Color-agnostic helpers (MaskLine, useCursorParallax, MotionValue) are
 * re-exported from the shared module — they don't need an accent.
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
   GROWTH color system — Emerald primary + neon + deep green supports.
   `rgb` is the comma-separated triplet (no parens) for use inside
   rgba() templates.
   =================================================================== */
export const GROWTH = {
  hex: '#10B981',
  rgb: '16,185,129',
  soft: '#34d399', // emerald-400
  neon: '#6ee7b7', // emerald-300 (neon highlight)
  deep: '#047857', // emerald-700 (dark green)
  glow: 'rgba(16,185,129,0.45)',
} as const

/* ===================================================================
   GreenGradientText — emerald gradient text span with optional glow.
   `bg-gradient-to-br from-[#6ee7b7] via-[#10B981] to-[#047857]`
   =================================================================== */
export function GreenGradientText({
  children,
  className = '',
  glow = true,
}: {
  children: ReactNode
  className?: string
  glow?: boolean
}) {
  return (
    <span
      className={
        'bg-gradient-to-br from-[#6ee7b7] via-[#10B981] to-[#047857] bg-clip-text text-transparent ' +
        (glow ? 'drop-shadow-[0_0_30px_rgba(16,185,129,0.45)] ' : '') +
        className
      }
    >
      {children}
    </span>
  )
}

/* ===================================================================
   GreenEyebrow — `(NN)` emerald number + emerald rule + label.
   =================================================================== */
export function GreenEyebrow({
  number,
  label,
}: {
  number: string
  label: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3"
    >
      <span
        className="text-xs font-bold text-[#10B981]"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        ({number})
      </span>
      <span className="h-px w-8 bg-[#10B981]/60" />
      <span className="wn-eyebrow text-[11px] font-medium text-white/60 sm:text-xs">
        {label}
      </span>
    </motion.div>
  )
}

/* ===================================================================
   GreenStickyRail — sticky vertical rail (lg+ only) with emerald
   progress line driven by useScroll on the supplied sectionRef.
   =================================================================== */
export function GreenStickyRail({
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
              className="absolute inset-0 origin-top bg-[#10B981]"
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
   GreenAmbient — layered slow-pulsing emerald + dim white glow blobs.
   pointer-events-none, absolute inset-0.
   =================================================================== */
export function GreenAmbient() {
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
      {/* intense emerald, top-center, slow pulse */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[8%] h-[68vw] w-[68vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.22), rgba(16,185,129,0.06) 40%, rgba(16,185,129,0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ opacity: [0.55, 0.95, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* secondary emerald blob, lower-left */}
      <motion.div
        aria-hidden
        className="absolute bottom-[12%] left-[-6%] h-[34vw] w-[34vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.14), rgba(16,185,129,0) 70%)',
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
   GreenEmberCanvas — rising emerald/teal embers.
   HMR-safe via __cleanup on the canvas element. Reduced-motion guard.
   Optional count prop (default 40).
   =================================================================== */
export function GreenEmberCanvas({
  className = '',
  count = 40,
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

        type Ember = {
          x: number
          y: number
          vx: number
          vy: number
          r: number
          life: number
          maxLife: number
          hue: number
        }
        const embers: Ember[] = []

        const spawn = (initial = false) => ({
          x: Math.random() * w,
          y: initial ? Math.random() * h : h + Math.random() * 40,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(0.3 + Math.random() * 0.6),
          r: Math.random() * 1.6 + 0.6,
          life: 0,
          maxLife: 240 + Math.random() * 280,
          // emerald (160) vs neon-green (150) vs teal (170)
          hue: Math.random() < 0.5 ? 160 : Math.random() < 0.5 ? 150 : 170,
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
            const alpha = 0.45 * fade
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
            grad.addColorStop(0, `hsla(${p.hue}, 80%, 58%, ${alpha})`)
            grad.addColorStop(1, `hsla(${p.hue}, 80%, 45%, 0)`)
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
   GreenEnergySphere — 4-layer cursor-follow emerald energy sphere.
   Concentric pulsing emerald glows + cursor follow via
   useMotionValue → useSpring → useTransform + dynamic lighting overlay
   via useMotionTemplate. Accepts a `size` prop for reuse at different
   scales (size = base viewport-relative width, e.g. 70 → 70vw / 680px max).
   =================================================================== */
export function GreenEnergySphere({
  size = 70,
}: {
  size?: number
}) {
  // cursor-follow parallax (all hooks declared unconditionally at top)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  const sphereX = useTransform(sx, [0, 1], [-40, 40])
  const sphereY = useTransform(sy, [0, 1], [-30, 30])

  // dynamic light overlay position
  const lightX = useTransform(sx, [0, 1], ['30%', '70%'])
  const lightY = useTransform(sy, [0, 1], ['30%', '70%'])
  const lightGrad = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(16,185,129,0.55), rgba(16,185,129,0) 55%)`

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)))
    my.set(Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)))
  }
  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  // scale all 4 layers as a ratio of `size`
  const s = size / 70
  const outer = `${size}vw`
  const outerMax = `${680 * s}px`
  const midVw = `${45 * s}vw`
  const midMax = `${440 * s}px`
  const coreVw = `${22 * s}vw`
  const coreMax = `${220 * s}px`
  const pinVw = `${6 * s}vw`
  const pinMax = `${60 * s}px`

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="pointer-events-auto absolute inset-0"
      aria-hidden
    >
      {/* Energy sphere layers */}
      <motion.div
        style={{ x: sphereX, y: sphereY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {/* outermost glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: outer,
            height: outer,
            maxWidth: outerMax,
            maxHeight: outerMax,
            background:
              'radial-gradient(circle, rgba(16,185,129,0.45), rgba(16,185,129,0.08) 40%, rgba(16,185,129,0) 70%)',
            filter: 'blur(30px)',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* middle bloom */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: midVw,
            height: midVw,
            maxWidth: midMax,
            maxHeight: midMax,
            background:
              'radial-gradient(circle, rgba(110,231,183,0.6), rgba(16,185,129,0.2) 50%, rgba(16,185,129,0) 75%)',
            filter: 'blur(20px)',
          }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8,
          }}
        />
        {/* core */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: coreVw,
            height: coreVw,
            maxWidth: coreMax,
            maxHeight: coreMax,
            background:
              'radial-gradient(circle, rgba(167,243,208,0.85), rgba(16,185,129,0.4) 60%, rgba(16,185,129,0))',
            filter: 'blur(8px)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.4,
          }}
        />
        {/* bright pinpoint center */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80"
          style={{
            width: pinVw,
            height: pinVw,
            maxWidth: pinMax,
            maxHeight: pinMax,
            filter: 'blur(2px)',
          }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Dynamic cursor-follow emerald lighting overlay */}
      <motion.div
        style={{ background: lightGrad }}
        className="pointer-events-none absolute inset-0 mix-blend-screen"
      />
    </div>
  )
}

/* ===================================================================
   GreenMagneticButton — emerald primary / outline secondary variant of
   the hero MagneticButton. Same magnetic-follow + shine + glow behavior,
   but tinted emerald so it matches the Growth Alchemy accent system.
   =================================================================== */
export function GreenMagneticButton({
  children,
  className,
  variant = 'primary',
  cursorLabel,
  onClick,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
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
          ? 'bg-[#10B981] text-[#141414]'
          : 'border border-white/25 bg-white/5 text-white backdrop-blur-md hover:border-[#10B981]/60',
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
      {/* Glow */}
      {isPrimary && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-full opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at center, rgba(16,185,129,0.7), rgba(16,185,129,0))',
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}
