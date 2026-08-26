'use client'

/**
 * DhqHero — Section 1
 * Full-screen cinematic introduction to "The Digital HQ".
 *
 * Visual concept — a living digital headquarters ecosystem in Electric Blue:
 *   - perspective grid floor (digital infrastructure)
 *   - floating browser/code panels (the HQ itself)
 *   - SVG blue data streams (information flow)
 *   - canvas particles (white + electric blue drifting dots)
 *   - mouse-reactive layered parallax (foreground > mid > background)
 *
 * Scroll-driven parallax: as you scroll past, content fades and moves up.
 *
 * COLOR IDENTITY: Electric Blue (#3B82F6). The brand red is reserved for the
 * navbar CTA / logo (global chrome) — every Digital-HQ-specific ambient glow,
 * particle, stream and hover state here is blue.
 */

import { useRef } from 'react'
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
  CalendarDays,
  ChevronDown,
  Code2,
  Cpu,
  Globe,
  MousePointer2,
} from 'lucide-react'
import MagneticButton from '@/components/hero/magnetic-button'
import {
  MaskLine,
  SectionEyebrow,
} from '@/components/about/shared'
import { BlueGradientText, DHQ } from './shared'

const accent = DHQ // Electric Blue — single source of truth for this section

/* ===================================================================
   DigitalEcosystem — mouse-reactive layered HQ visual
   (perspective grid + floating panels + SVG data streams + canvas)
   =================================================================== */
function DigitalEcosystem({
  sx,
  sy,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  // foreground parallax (moves most)
  const fgX = useTransform(sx, [0, 1], [-26, 26])
  const fgY = useTransform(sy, [0, 1], [-20, 20])
  // mid layer
  const mdX = useTransform(sx, [0, 1], [-14, 14])
  const mdY = useTransform(sy, [0, 1], [-10, 10])
  // background (moves least)
  const bgX = useTransform(sx, [0, 1], [-8, 8])
  const bgY = useTransform(sy, [0, 1], [-6, 6])

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* === BACKGROUND layer: blue gradient blobs morphing === */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <motion.div
          className="absolute left-[14%] top-[18%] h-[36vw] w-[36vw] max-h-[420px] max-w-[420px] rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.10), rgba(${accent.rgb},0.12) 40%, rgba(${accent.rgb},0) 70%)`,
            filter: 'blur(28px)',
          }}
          animate={{
            scale: [1, 1.12, 0.96, 1],
            rotate: [0, 28, -16, 0],
            borderRadius: ['42%', '60%', '46%', '42%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[14%] right-[12%] h-[30vw] w-[30vw] max-h-[360px] max-w-[360px] rounded-full"
          style={{
            background: `radial-gradient(circle at 60% 40%, rgba(${accent.rgb},0.22), rgba(${accent.deep},0.12) 50%, rgba(${accent.rgb},0) 75%)`,
            filter: 'blur(32px)',
          }}
          animate={{
            scale: [1, 1.18, 0.94, 1],
            rotate: [0, -32, 14, 0],
            borderRadius: ['50%', '38%', '58%', '50%'],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* === MID layer: SVG blue data streams (flowing) === */}
      <motion.div style={{ x: mdX, y: mdY }} className="absolute inset-0">
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.path
              key={i}
              d={`M-20,${180 + i * 130} C320,${80 + i * 130} 720,${260 + i * 130} 1220,${120 + i * 130}`}
              fill="none"
              stroke={`rgba(${accent.rgb},${0.55 - i * 0.08})`}
              strokeWidth={1.4 - i * 0.12}
              strokeLinecap="round"
              animate={{
                d: [
                  `M-20,${180 + i * 130} C320,${80 + i * 130} 720,${260 + i * 130} 1220,${120 + i * 130}`,
                  `M-20,${180 + i * 130} C320,${260 + i * 130} 720,${80 + i * 130} 1220,${120 + i * 130}`,
                  `M-20,${180 + i * 130} C320,${80 + i * 130} 720,${260 + i * 130} 1220,${120 + i * 130}`,
                ],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ filter: `drop-shadow(0 0 5px rgba(${accent.rgb},0.55))` }}
            />
          ))}
        </svg>

        {/* perspective grid floor — digital infrastructure */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(${accent.softRgb},0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(${accent.softRgb},0.18) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'perspective(320px) rotateX(62deg)',
            transformOrigin: 'bottom',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
          }}
        />
      </motion.div>

      {/* === FOREGROUND layer: floating HQ panels + code glyphs === */}
      <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0">
        {/* Floating back browser panel */}
        <motion.div
          className="absolute left-[10%] top-[20%] h-24 w-36 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm"
          animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: 'rotateY(16deg) rotateX(4deg)' }}
        >
          <div className="flex items-center gap-1 border-b border-white/10 px-2 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.hex }} />
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
          <div className="space-y-1 p-2">
            <div className="h-1.5 w-2/3 rounded-sm" style={{ background: `rgba(${accent.rgb},0.5)` }} />
            <div className="h-1.5 w-full rounded-sm bg-white/10" />
            <div className="h-1.5 w-1/2 rounded-sm bg-white/8" />
          </div>
        </motion.div>

        {/* Floating code glyph panel */}
        <motion.div
          className="absolute right-[12%] top-[26%] rounded-lg border p-3 backdrop-blur-sm"
          style={{
            borderColor: `rgba(${accent.rgb},0.25)`,
            background: `rgba(${accent.rgb},0.05)`,
          }}
          animate={{ y: [0, 16, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Code2 className="h-8 w-8" style={{ color: accent.soft }} />
        </motion.div>

        {/* Cpu glyph lower-left */}
        <motion.div
          className="absolute bottom-[24%] left-[18%]"
          animate={{ y: [0, -10, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Cpu className="h-8 w-8 text-white/35" />
        </motion.div>

        {/* Globe glyph mid-right */}
        <motion.div
          className="absolute right-[16%] bottom-[28%]"
          animate={{ y: [0, 12, 0], rotate: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Globe className="h-10 w-10" style={{ color: `rgba(${accent.rgb},0.5)` }} />
        </motion.div>

        {/* MousePointer cursor glyph */}
        <motion.div
          className="absolute left-[40%] top-[58%]"
          animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MousePointer2 className="h-6 w-6" style={{ color: accent.soft }} />
        </motion.div>

        {/* small blue dots */}
        {[
          { l: '24%', t: '40%', d: 0 },
          { l: '70%', t: '60%', d: 1.4 },
          { l: '82%', t: '20%', d: 2.2 },
          { l: '38%', t: '70%', d: 0.8 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: p.l,
              top: p.t,
              background: accent.hex,
              boxShadow: `0 0 10px rgba(${accent.rgb},0.9), 0 0 24px rgba(${accent.rgb},0.5)`,
            }}
            animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 4 + p.d,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.d,
            }}
          />
        ))}
      </motion.div>

      {/* === Canvas particles (always on top of bg, no parallax) === */}
      <EcosystemCanvas />
    </div>
  )
}

/* Canvas particles — drifting white/blue dots with sine wave. */
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
          blue: boolean
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
          const n = reduce ? 0 : Math.min(56, Math.floor((w * h) / 22000))
          for (let i = 0; i < n; i++) {
            ps.push({
              x: Math.random() * w,
              y: Math.random() * h,
              vx: (Math.random() - 0.5) * 0.12,
              vy: (Math.random() - 0.5) * 0.12,
              r: Math.random() * 1.6 + 0.4,
              blue: Math.random() < 0.32,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          const t = performance.now() / 1000

          // blue particles (additive glow)
          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
            if (!p.blue) continue
            const px = p.x + Math.sin(t * 0.55 + p.phase) * 5
            const py = p.y + Math.cos(t * 0.45 + p.phase) * 5
            const g = ctx.createRadialGradient(px, py, 0, px, py, 12)
            g.addColorStop(0, `rgba(${accent.rgb},0.55)`)
            g.addColorStop(1, `rgba(${accent.rgb},0)`)
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(px, py, 12, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.globalCompositeOperation = 'source-over'

          // white particles
          for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
            if (p.blue) continue
            p.x += p.vx
            p.y += p.vy
            if (p.x < -10) p.x = w + 10
            if (p.x > w + 10) p.x = -10
            if (p.y < -10) p.y = h + 10
            if (p.y > h + 10) p.y = -10

            const flick = 0.5 + 0.5 * Math.sin(t * 1.4 + p.phase)
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255,255,255,${0.22 + 0.55 * flick})`
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
   DhqHero — Section 1 default export
   =================================================================== */
export default function DhqHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [0, -160])

  // mouse-reactive parallax motion values (declared unconditionally at top)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)))
    my.set(Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)))
  }
  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <section
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-24 pt-28 sm:px-8 md:pt-32"
      aria-label="The Digital HQ — Immersive Opening"
    >
      <DigitalEcosystem sx={sx} sy={sy} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-40 mx-auto w-full max-w-7xl"
      >
        {/* Eyebrow — service number + label */}
        <motion.div
          style={{ y: eyebrowY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: accent.hex }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: accent.hex }}
            />
          </span>
          <span className="wn-eyebrow text-[11px] font-medium text-white/70 sm:text-xs">
            02 / 07
            <span className="mx-2" style={{ color: accent.hex }}>•</span>
            The Digital HQ
            <span className="mx-2" style={{ color: accent.hex }}>•</span>
            Web Design &amp; Development
          </span>
          <span className="hidden h-px w-16 bg-gradient-to-r from-white/30 to-transparent sm:block" />
          <span className="hidden text-[11px] text-white/40 sm:inline">
            Your 24/7 Sales Engine
          </span>
        </motion.div>

        {/* Massive headline — 2 lines, MaskLine reveal, accent words blue */}
        <h2
          className="text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">Your Brand&apos;s </span>
            <BlueGradientText>Digital</BlueGradientText>
          </MaskLine>
          <MaskLine delay={0.12}>
            <BlueGradientText>Headquarters.</BlueGradientText>
          </MaskLine>
        </h2>

        {/* Subheadline — verbatim Digital HQ description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl"
        >
          High-speed, conversion-focused websites that act as your{' '}
          <span className="font-medium text-white">24/7 sales engine</span> and{' '}
          <span className="font-medium" style={{ color: accent.soft }}>
            digital headquarters.
          </span>
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <MagneticButton
            variant="primary"
            cursorLabel="Book"
            ariaLabel="Book a Strategy Call"
            onClick={() => {}}
          >
            <CalendarDays className="h-4 w-4" />
            Book a Strategy Call
          </MagneticButton>
          <MagneticButton
            variant="secondary"
            cursorLabel="Explore"
            ariaLabel="Explore Our Work"
            onClick={() => {}}
          >
            Explore Our Work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          {/* Inline proof */}
          <div className="ml-0 hidden items-center gap-3 sm:ml-4 lg:flex">
            <div className="flex -space-x-2">
              {[
                `linear-gradient(to bottom right, ${accent.hex}, ${accent.deep})`,
                'linear-gradient(to bottom right, #ffffff, rgba(255,255,255,0.4))',
                `linear-gradient(to bottom right, ${accent.soft}, ${accent.hex})`,
              ].map((g, i) => (
                <span
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-[#050505]"
                  style={{ background: g }}
                />
              ))}
            </div>
            <div className="text-xs leading-tight text-white/60">
              <span className="font-semibold text-white">Sub-second</span> load
              <br />
              by design
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4" style={{ color: accent.hex }} />
        </motion.span>
      </motion.div>

      {/* Side label — vertical (lg only) */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.4em] text-white/30 lg:block">
        The Digital HQ — WatNidea
      </div>
    </section>
  )
}
