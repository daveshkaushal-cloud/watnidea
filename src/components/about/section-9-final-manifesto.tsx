'use client'

/**
 * AboutFinalManifesto — Section 9
 * Full-screen cinematic manifesto — massive typography + dark ambient
 * + large red energy sphere + ember particles + radial particle burst.
 *
 * Composition:
 *   - Full-screen min-h-[100svh]
 *   - EnergySphere (large) + EmberCanvas + radial particle burst layer
 *   - Eyebrow `THE MOVEMENT` (red wn-eyebrow, red rules both sides)
 *   - 4-line MaskLine headline: `Identity with` / `Soul.` / `Strategy
 *     with` / `Teeth.` (lines 2 + 4 red gradient)
 *   - Manifesto body (curly apostrophe)
 *   - Closing kicker: `A movement.` / `Not an agency.`
 *     ("movement." red gradient, "Not an agency." white) — MaskLine.
 *   - No CTAs (Final CTA section follows immediately).
 *
 * All hooks (useScroll/useTransform) at top, unconditional.
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  EmberCanvas,
  EnergySphere,
  MaskLine,
  RedGradientText,
} from './shared'

/* ===================================================================
   BurstCanvas — one-time radial particle burst from the sphere center.
   Particles fly outward + fade. HMR-safe via __cleanup. Reduced-motion
   guard returns an empty canvas.
   =================================================================== */
function BurstCanvas() {
  return (
    <canvas
      ref={(c) => {
        if (!c) return
        const prev = (c as { __cleanup?: () => void }).__cleanup
        if (prev) prev()
        const ctx = c.getContext('2d')
        if (!ctx) return

        const reduce =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches

        let raf = 0
        let w = 0
        let h = 0
        let dpr = 1

        type P = {
          x: number
          y: number
          vx: number
          vy: number
          r: number
          life: number
          max: number
          hue: number
        }
        let particles: P[] = []
        let cycleStart = 0
        const CYCLE = 4200 // ms between bursts

        const spawnBurst = () => {
          particles = []
          const n = 36
          for (let i = 0; i < n; i++) {
            const a = (i / n) * Math.PI * 2 + Math.random() * 0.18
            const sp = 0.6 + Math.random() * 1.4
            particles.push({
              x: w / 2,
              y: h / 2,
              vx: Math.cos(a) * sp,
              vy: Math.sin(a) * sp,
              r: 1.2 + Math.random() * 1.4,
              life: 0,
              max: 90 + Math.random() * 70,
              hue: Math.random() < 0.55 ? 4 : 14,
            })
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
          cycleStart = performance.now()
          spawnBurst()
        }

        const draw = (now: number) => {
          ctx.clearRect(0, 0, w, h)
          ctx.globalCompositeOperation = 'lighter'

          if (now - cycleStart > CYCLE) {
            cycleStart = now
            spawnBurst()
          }

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i]
            p.life += 1
            p.x += p.vx
            p.y += p.vy
            p.vx *= 0.985
            p.vy *= 0.985
            const t = p.life / p.max
            if (t >= 1) continue
            const fade = Math.sin(t * Math.PI)
            const alpha = 0.7 * fade
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
            grad.addColorStop(0, `hsla(${p.hue}, 92%, 65%, ${alpha})`)
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
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}

/* ===================================================================
   AboutFinalManifesto — Section 9 default export.
   =================================================================== */
export default function AboutFinalManifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80])
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.3, 1, 1, 0.3]
  )

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-t border-white/5 bg-[#141414] px-5 py-24"
      aria-label="Final Manifesto"
    >
      {/* Large energy sphere — cursor-follow */}
      <EnergySphere size={90} />

      {/* Ember particles around the sphere */}
      <EmberCanvas count={36} />

      {/* Radial particle burst overlay */}
      <BurstCanvas />

      {/* Bottom + top vignette for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 25%, rgba(20,20,20,0.55) 78%, rgba(20,20,20,0.92) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-4xl text-center"
      >
        {/* Eyebrow — THE MOVEMENT with red rules both sides */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#E53935]" />
          <span className="wn-eyebrow text-[10px] font-medium text-[#E53935] sm:text-[11px]">
            THE MOVEMENT
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#E53935]" />
        </motion.div>

        {/* 4-line headline */}
        <h2
          className="text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>Identity with</MaskLine>
          <MaskLine delay={0.1}>
            <RedGradientText>Soul.</RedGradientText>
          </MaskLine>
          <MaskLine delay={0.2}>Strategy with</MaskLine>
          <MaskLine delay={0.3}>
            <RedGradientText>Teeth.</RedGradientText>
          </MaskLine>
        </h2>

        {/* Manifesto body (curly apostrophe) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          We don&rsquo;t just build brands. We engineer attention, create
          unforgettable experiences, and design growth systems that turn
          businesses into category leaders.
        </motion.p>

        {/* Closing kicker — A movement. / Not an agency. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <h3
            className="text-3xl font-bold leading-[0.95] tracking-[-0.01em] sm:text-4xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine delay={0.05}>
              A <RedGradientText>movement.</RedGradientText>
            </MaskLine>
            <MaskLine delay={0.18}>
              <span className="text-white">Not an agency.</span>
            </MaskLine>
          </h3>
        </motion.div>
      </motion.div>
    </section>
  )
}
