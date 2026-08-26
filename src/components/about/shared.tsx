'use client'

/**
 * About WatNidea — shared helpers.
 *
 * Extracted from the established cinematic patterns in:
 *   - src/components/hero/manifesto-section.tsx  (MaskLine)
 *   - src/components/hero/pricing-cta-section.tsx (EmberCanvas, EnergySphere, PricingAmbient)
 *   - src/components/hero/services-section.tsx   (StickyRail pattern)
 *   - src/components/hero/identity-lab-section.tsx (LabAmbient, Chapter header pattern)
 *
 * All hooks are declared unconditionally at the top of each component
 * (Rules of Hooks). Canvas helpers use the __cleanup HMR-safe pattern.
 */

import { type ReactNode, type RefObject } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  type MotionValue,
} from 'framer-motion'

/* ===================================================================
   MaskLine — deadlock-safe masked reveal.
   `whileInView` lives on the WRAPPER (never clipped), variants propagate
   to the inner child. Putting `whileInView` on the translated child
   deadlocks because the child is fully clipped (0 intersection).
   =================================================================== */
export function MaskLine({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.span
      className={'block overflow-hidden pb-[0.12em] ' + className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: '118%' },
          show: {
            y: '0%',
            transition: { duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

/* ===================================================================
   AboutAmbient — 2-3 layered slow-pulsing red + dim white glow blobs.
   pointer-events-none, absolute inset-0.
   =================================================================== */
export function AboutAmbient() {
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
      {/* intense red, top-center, slow pulse */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[8%] h-[68vw] w-[68vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.22), rgba(229,57,53,0.06) 40%, rgba(229,57,53,0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ opacity: [0.55, 0.95, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* secondary red blob, lower-left */}
      <motion.div
        aria-hidden
        className="absolute bottom-[12%] left-[-6%] h-[34vw] w-[34vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.14), rgba(229,57,53,0) 70%)',
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
   SectionEyebrow — `(NN)` red number + red rule + wn-eyebrow label.
   e.g. <SectionEyebrow number="02" label="The Problem" />
   =================================================================== */
export function SectionEyebrow({
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
        className="text-xs font-bold text-[#E53935]"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        ({number})
      </span>
      <span className="h-px w-8 bg-[#E53935]/60" />
      <span className="wn-eyebrow text-[11px] font-medium text-white/60 sm:text-xs">
        {label}
      </span>
    </motion.div>
  )
}

/* ===================================================================
   StickyRail — sticky vertical rail (lg+ only).
   Vertical wn-eyebrow label (writing-mode vertical-rl) + scroll-progress
   line driven by useScroll on the supplied sectionRef + caption.
   =================================================================== */
export function StickyRail({
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
   EmberCanvas — rising red/orange embers.
   HMR-safe via __cleanup on the canvas element. Reduced-motion guard.
   Optional count prop (default 40).
   =================================================================== */
export function EmberCanvas({
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
          hue: Math.random() < 0.55 ? 4 : 14, // red vs orange
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
            grad.addColorStop(0, `hsla(${p.hue}, 92%, 62%, ${alpha})`)
            grad.addColorStop(1, `hsla(${p.hue}, 92%, 50%, 0)`)
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
   EnergySphere — 4-layer cursor-follow energy sphere.
   Concentric pulsing red glows + cursor follow via
   useMotionValue → useSpring → useTransform + dynamic lighting overlay
   via useMotionTemplate. Accepts a `size` prop for reuse at different
   scales (size = base viewport-relative width, e.g. 70 → 70vw / 680px max).
   =================================================================== */
export function EnergySphere({
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
  const lightGrad = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(229,57,53,0.55), rgba(229,57,53,0) 55%)`

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
              'radial-gradient(circle, rgba(229,57,53,0.45), rgba(229,57,53,0.08) 40%, rgba(229,57,53,0) 70%)',
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
              'radial-gradient(circle, rgba(255,107,99,0.6), rgba(229,57,53,0.2) 50%, rgba(229,57,53,0) 75%)',
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
              'radial-gradient(circle, rgba(255,180,170,0.85), rgba(229,57,53,0.4) 60%, rgba(229,57,53,0))',
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

      {/* Dynamic cursor-follow red lighting overlay */}
      <motion.div
        style={{ background: lightGrad }}
        className="pointer-events-none absolute inset-0 mix-blend-screen"
      />
    </div>
  )
}

/* ===================================================================
   RedGradientText — red gradient text span with optional drop-shadow glow.
   `bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d]`
   =================================================================== */
export function RedGradientText({
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
        'bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent ' +
        (glow ? 'drop-shadow-[0_0_30px_rgba(229,57,53,0.45)] ' : '') +
        className
      }
    >
      {children}
    </span>
  )
}

/* ===================================================================
   useCursorParallax — reusable cursor-reactive parallax hook.
   Returns {mx, my, sx, sy} motion values + bind handlers.
   Usage:
     const { sx, sy, handlers } = useCursorParallax()
     const fgX = useTransform(sx, [0, 1], [-20, 20])
     <section onPointerMove={handlers.move} onPointerLeave={handlers.leave}>
   =================================================================== */
export function useCursorParallax(stiffness = 60, damping = 20) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness, damping })
  const sy = useSpring(my, { stiffness, damping })

  const move = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)))
    my.set(Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)))
  }
  const leave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return { mx, my, sx, sy, handlers: { move, leave } }
}

/* ===================================================================
   Type re-export for downstream consumers.
   =================================================================== */
export type { MotionValue }
