'use client'

/**
 * AuraHero — Section 1
 * Full-screen cinematic, luxury meets strategy.
 *
 * Composition:
 *   - Eyebrow: (01) · Brand Strategy & Identity
 *   - Service label: Aura Architecture (red)
 *   - Massive headline: "Identity with Soul." / "Strategy with Teeth."
 *     (Soul. / Teeth. red gradient + drop-shadow glow) via MaskLine
 *   - Descriptor: the verbatim Aura Architecture description
 *   - CTAs: MagneticButton primary "Book Strategy Call" + secondary
 *     "Explore Our Work"
 *   - Living identity ecosystem visual (behind content, mouse-reactive):
 *       floating glyphs + liquid chrome blobs + red particles + SVG streams
 *   - Scroll indicator (ChevronDown bobbing)
 *   - Side label (lg only, vertical): Aura Architecture
 *
 * Scroll parallax: content fades + moves up as you scroll past.
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
  Fingerprint,
  Hexagon,
  Orbit,
  Sparkles,
  Triangle,
} from 'lucide-react'
import MagneticButton from '@/components/hero/magnetic-button'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  useCursorParallax,
} from '@/components/about/shared'

/* ===================================================================
   LivingEcosystem — mouse-reactive layered ecosystem visual.
   (canvas particles + floating glyphs + SVG streams + gradient blobs)
   Accepts sx/sy (springs from useCursorParallax) for depth parallax.
   =================================================================== */
function LivingEcosystem({
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
      {/* === BACKGROUND layer: liquid metallic gradient blobs === */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <motion.div
          className="absolute left-[12%] top-[16%] h-[38vw] w-[38vw] max-h-[460px] max-w-[460px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.10), rgba(229,57,53,0.10) 40%, rgba(229,57,53,0) 70%)',
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
          className="absolute bottom-[14%] right-[10%] h-[32vw] w-[32vw] max-h-[400px] max-w-[400px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 60% 40%, rgba(229,57,53,0.18), rgba(168,32,29,0.10) 50%, rgba(229,57,53,0) 75%)',
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

      {/* === MID layer: SVG red energy streams (flowing) === */}
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
              stroke={`rgba(229,57,53,${0.55 - i * 0.08})`}
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
              style={{ filter: 'drop-shadow(0 0 5px rgba(229,57,53,0.55))' }}
            />
          ))}
        </svg>
      </motion.div>

      {/* === FOREGROUND layer: floating identity glyphs === */}
      <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0">
        {/* Fingerprint top-left */}
        <motion.div
          className="absolute left-[10%] top-[20%]"
          animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Fingerprint className="h-10 w-10 text-[#E53935]/40" />
        </motion.div>
        {/* Orbit mid-right */}
        <motion.div
          className="absolute right-[14%] top-[28%]"
          animate={{ y: [0, 16, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Orbit className="h-12 w-12 text-white/30" />
        </motion.div>
        {/* Sparkles lower-left */}
        <motion.div
          className="absolute bottom-[22%] left-[18%]"
          animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="h-7 w-7 text-[#ff6b63]/70" />
        </motion.div>
        {/* Hexagon upper-right */}
        <motion.div
          className="absolute right-[22%] top-[18%]"
          animate={{ y: [0, 12, 0], rotate: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Hexagon className="h-8 w-8 text-white/25" />
        </motion.div>
        {/* Triangle lower-right */}
        <motion.div
          className="absolute bottom-[26%] right-[16%]"
          animate={{ y: [0, -14, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Triangle className="h-9 w-9 text-[#E53935]/35" />
        </motion.div>
        {/* small chrome dots */}
        {[
          { l: '24%', t: '40%', d: 0 },
          { l: '70%', t: '60%', d: 1.4 },
          { l: '82%', t: '20%', d: 2.2 },
          { l: '38%', t: '70%', d: 0.8 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#E53935]"
            style={{
              left: p.l,
              top: p.t,
              boxShadow:
                '0 0 10px rgba(229,57,53,0.9), 0 0 24px rgba(229,57,53,0.5)',
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

      {/* === Canvas particles (drifting white/red dots) === */}
      <EcosystemCanvas />
    </div>
  )
}

/* Canvas particles — drifting white/red dots with sine wave. */
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
          const n = reduce ? 0 : Math.min(56, Math.floor((w * h) / 22000))
          for (let i = 0; i < n; i++) {
            ps.push({
              x: Math.random() * w,
              y: Math.random() * h,
              vx: (Math.random() - 0.5) * 0.12,
              vy: (Math.random() - 0.5) * 0.12,
              r: Math.random() * 1.6 + 0.4,
              red: Math.random() < 0.28,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          const t = performance.now() / 1000

          // red particles (additive glow)
          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
            if (!p.red) continue
            const px = p.x + Math.sin(t * 0.55 + p.phase) * 5
            const py = p.y + Math.cos(t * 0.45 + p.phase) * 5
            const g = ctx.createRadialGradient(px, py, 0, px, py, 12)
            g.addColorStop(0, 'rgba(229,57,53,0.55)')
            g.addColorStop(1, 'rgba(229,57,53,0)')
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(px, py, 12, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.globalCompositeOperation = 'source-over'

          // white particles
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
   AuraHero — Section 1 default export
   =================================================================== */
export function AuraHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [0, -160])

  // mouse-reactive parallax (declared unconditionally at top)
  const { sx, sy, handlers } = useCursorParallax(60, 20)

  return (
    <section
      ref={ref}
      onPointerMove={handlers.move}
      onPointerLeave={handlers.leave}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-24 pt-28 sm:px-8 md:pt-32"
      aria-label="Aura Architecture — Hero"
    >
      <LivingEcosystem sx={sx} sy={sy} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-40 mx-auto w-full max-w-7xl"
      >
        {/* Eyebrow — (01) · Brand Strategy & Identity */}
        <motion.div style={{ y: eyebrowY }}>
          <SectionEyebrow number="01" label="Brand Strategy & Identity" />
        </motion.div>

        {/* Service label — Aura Architecture (red, small) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 flex items-center gap-3"
        >
          <span className="wn-eyebrow text-[11px] font-semibold text-[#E53935] sm:text-xs">
            Aura Architecture
          </span>
          <span className="hidden h-px w-12 bg-gradient-to-r from-[#E53935]/60 to-transparent sm:block" />
          <span className="hidden text-[10px] text-white/40 sm:inline">
            The Aura Design System
          </span>
        </motion.div>

        {/* Massive headline — 2 lines, MaskLine reveal, accent words red */}
        <h2
          className="mt-7 text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">Identity with </span>
            <RedGradientText>Soul.</RedGradientText>
          </MaskLine>
          <MaskLine delay={0.12}>
            <span className="text-white">Strategy with </span>
            <RedGradientText>Teeth.</RedGradientText>
          </MaskLine>
        </h2>

        {/* Descriptor — verbatim Aura Architecture description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
        >
          We define your brand soul, positioning, and visual DNA to create a
          powerful identity that stands out with purpose and clarity.
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
            ariaLabel="Book Strategy Call"
            onClick={() => {}}
          >
            <CalendarDays className="h-4 w-4" />
            Book Strategy Call
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
                'from-[#E53935] to-[#7a1414]',
                'from-white to-white/40',
                'from-[#ff6b63] to-[#E53935]',
              ].map((g, i) => (
                <span
                  key={i}
                  className={`h-8 w-8 rounded-full border-2 border-[#141414] bg-gradient-to-br ${g}`}
                />
              ))}
            </div>
            <div className="text-xs leading-tight text-white/60">
              <span className="font-semibold text-white">Now</span>
              <br />
              accepting selected projects
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
        <span className="wn-eyebrow text-[10px] font-medium">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4 text-[#E53935]" />
        </motion.span>
      </motion.div>

      {/* Side label — vertical (lg only) */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.4em] text-white/30 lg:block">
        Aura Architecture
      </div>
    </section>
  )
}
