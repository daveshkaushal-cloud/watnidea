'use client'

/**
 * DhqHero — Section 1
 * Full-screen cinematic, futuristic digital headquarters floating in a
 * dark digital universe.
 *
 * Composition:
 *   - Eyebrow: (01) · Website Design & Development
 *   - Service label: The Digital HQ (red)
 *   - Massive headline: "Identity with Soul." / "Strategy with Teeth."
 *     (Soul. / Teeth. red gradient + drop-shadow glow) via MaskLine
 *   - Descriptor (verbatim): "High-speed, conversion-focused websites
 *     that act as your 24/7 sales engine and digital headquarters."
 *   - CTAs: MagneticButton primary "Book Strategy Call" + secondary
 *     "Explore Our Work"
 *   - Digital HQ visual (behind content, mouse-reactive):
 *       floating browser/dashboard frames + glassmorphism UI panels +
 *       SVG connected nodes with animated red data streams + grid +
 *       scanning effects + canvas particles
 *   - Scroll indicator (ChevronDown bobbing)
 *   - Side label (lg only, vertical): The Digital HQ
 *
 * Scroll parallax: content fades + moves up as you scroll past.
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from 'framer-motion'
import { ArrowUpRight, CalendarDays, ChevronDown } from 'lucide-react'
import MagneticButton from '@/components/hero/magnetic-button'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  useCursorParallax,
} from '@/components/about/shared'

/* ===================================================================
   DigitalHQVisual — mouse-reactive layered futuristic visual.
   Layered parallax: background grid + blobs → mid data streams + nodes
   → foreground floating glassmorphism UI panels (browser frames,
   dashboard cards, metric tiles). Canvas particles drift in the back.
   A red glow follows the cursor (dynamic lighting).
   Accepts sx/sy (springs from useCursorParallax) for depth parallax.
   =================================================================== */
function DigitalHQVisual({
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
      {/* === BACKGROUND layer: dark digital universe + dim grid + blobs === */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        {/* faint perspective grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.9), rgba(0,0,0,0) 70%)',
            WebkitMaskImage:
              'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.9), rgba(0,0,0,0) 70%)',
          }}
        />
        {/* liquid metallic gradient blobs (background depth) */}
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

      {/* === MID layer: SVG connected nodes + animated red data streams === */}
      <motion.div style={{ x: mdX, y: mdY }} className="absolute inset-0">
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          {/* connection lines (faint) */}
          {[
            { x1: 220, y1: 220, x2: 600, y2: 400 },
            { x1: 600, y1: 400, x2: 980, y2: 220 },
            { x1: 600, y1: 400, x2: 220, y2: 580 },
            { x1: 600, y1: 400, x2: 980, y2: 580 },
            { x1: 220, y1: 220, x2: 980, y2: 220 },
            { x1: 220, y1: 580, x2: 980, y2: 580 },
          ].map((l, i) => (
            <line
              key={`l-${i}`}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="rgba(229,57,53,0.18)"
              strokeWidth={1}
              strokeDasharray="4 6"
            />
          ))}
          {/* animated red data streams flowing along the lines */}
          {[
            { x1: 220, y1: 220, x2: 600, y2: 400, d: 0 },
            { x1: 600, y1: 400, x2: 980, y2: 220, d: 1.2 },
            { x1: 600, y1: 400, x2: 220, y2: 580, d: 0.6 },
            { x1: 600, y1: 400, x2: 980, y2: 580, d: 1.8 },
            { x1: 220, y1: 220, x2: 980, y2: 220, d: 0.9 },
            { x1: 220, y1: 580, x2: 980, y2: 580, d: 2.2 },
          ].map((s, i) => (
            <motion.line
              key={`s-${i}`}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="rgba(229,57,53,0.85)"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeDasharray="40 240"
              animate={{ strokeDashoffset: [0, -280] }}
              transition={{
                duration: 3 + s.d,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ filter: 'drop-shadow(0 0 5px rgba(229,57,53,0.65))' }}
            />
          ))}
          {/* system nodes (pulsing) */}
          {[
            { x: 220, y: 220, r: 5, d: 0 },
            { x: 980, y: 220, r: 5, d: 0.5 },
            { x: 220, y: 580, r: 5, d: 1.0 },
            { x: 980, y: 580, r: 5, d: 1.5 },
            { x: 600, y: 400, r: 8, d: 0.2 },
          ].map((n, i) => (
            <motion.circle
              key={`n-${i}`}
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="rgba(229,57,53,0.95)"
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.25, 1] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: n.d,
              }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(229,57,53,0.9))' }}
            />
          ))}
        </svg>
        {/* scanning sweep line (subtle horizontal sweep) */}
        <motion.div
          className="absolute inset-x-0 h-px"
          style={{
            top: '50%',
            background:
              'linear-gradient(to right, transparent, rgba(229,57,53,0.4), transparent)',
            boxShadow: '0 0 12px rgba(229,57,53,0.5)',
          }}
          animate={{ y: ['-40vh', '40vh', '-40vh'] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* === FOREGROUND layer: floating glassmorphism UI panels === */}
      <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0">
        {/* Floating browser frame — top-left */}
        <motion.div
          className="absolute left-[8%] top-[18%] w-[200px] max-w-[28vw] rounded-lg border border-white/15 bg-white/[0.06] backdrop-blur-md sm:w-[240px]"
          animate={{ y: [0, -14, 0], rotate: [-3, 1, -3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
        >
          {/* browser chrome */}
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#E53935]/70" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="ml-2 h-3 flex-1 rounded-sm bg-white/5" />
          </div>
          {/* fake content rows */}
          <div className="space-y-2 p-3">
            <div className="h-2 w-3/4 rounded-full bg-white/15" />
            <div className="h-2 w-1/2 rounded-full bg-[#E53935]/40" />
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              <div className="h-8 rounded bg-white/8" />
              <div className="h-8 rounded bg-white/8" />
              <div className="h-8 rounded bg-[#E53935]/25" />
            </div>
          </div>
        </motion.div>

        {/* Floating dashboard metric tile — top-right */}
        <motion.div
          className="absolute right-[10%] top-[22%] w-[170px] max-w-[24vw] rounded-xl border border-white/15 bg-white/[0.07] p-3 backdrop-blur-md sm:w-[200px]"
          animate={{ y: [0, 16, 0], rotate: [2, -2, 2] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/55">
              Conversions
            </span>
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#E53935]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              218
            </span>
            <span className="text-[10px] font-semibold text-[#ff6b63]">▲</span>
          </div>
          {/* mini bar chart */}
          <div className="mt-2 flex h-8 items-end gap-1">
            {[40, 55, 35, 70, 60, 90, 75].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === 5
                      ? 'rgba(229,57,53,0.85)'
                      : 'rgba(255,255,255,0.15)',
                }}
                animate={{ height: [`${h}%`, `${h * 1.15}%`, `${h}%`] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating command panel — bottom-left */}
        <motion.div
          className="absolute bottom-[18%] left-[14%] w-[180px] max-w-[26vw] rounded-lg border border-white/15 bg-white/[0.06] p-3 backdrop-blur-md sm:w-[210px]"
          animate={{ y: [0, -10, 0], rotate: [-1, 3, -1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b63]" />
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/55">
              Live Traffic
            </span>
          </div>
          {/* sparkline */}
          <svg viewBox="0 0 100 32" className="h-8 w-full">
            <motion.polyline
              points="0,24 12,18 24,22 36,12 48,16 60,8 72,14 84,4 100,10"
              fill="none"
              stroke="rgba(229,57,53,0.85)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 0 3px rgba(229,57,53,0.7))' }}
            />
            <motion.circle
              cx="100"
              cy="10"
              r="2"
              fill="rgba(255,107,99,1)"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
          <div className="mt-2 flex justify-between text-[9px] text-white/50">
            <span>0</span>
            <span>now</span>
          </div>
        </motion.div>

        {/* Floating status tile — bottom-right */}
        <motion.div
          className="absolute bottom-[22%] right-[12%] w-[160px] max-w-[24vw] rounded-lg border border-white/15 bg-white/[0.06] p-3 backdrop-blur-md sm:w-[190px]"
          animate={{ y: [0, 12, 0], rotate: [3, -1, 3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/55">
              System
            </span>
            <span className="text-[9px] font-semibold text-[#ff6b63]">
              ONLINE
            </span>
          </div>
          {/* metric rows */}
          <div className="space-y-1.5">
            {[
              { l: 'Speed', v: '98/100' },
              { l: 'SEO', v: 'A+' },
              { l: 'Uptime', v: '99.9%' },
            ].map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-[10px]"
              >
                <span className="text-white/55">{m.l}</span>
                <span
                  className="font-semibold text-white"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  {m.v}
                </span>
              </div>
            ))}
          </div>
          {/* progress bar */}
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#E53935] to-[#ff6b63]"
              animate={{ width: ['30%', '85%', '30%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* small chrome dots with red glow */}
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

      {/* === Cursor-following red glow (dynamic lighting) === */}
      <CursorGlow sx={sx} sy={sy} />

      {/* === Canvas particles (drifting white/red dots) === */}
      <ParticlesCanvas />
    </div>
  )
}

/* CursorGlow — red radial glow that follows the cursor. */
function CursorGlow({
  sx,
  sy,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  const gx = useTransform(sx, [0, 1], ['30%', '70%'])
  const gy = useTransform(sy, [0, 1], ['30%', '70%'])
  const grad = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(229,57,53,0.28), rgba(229,57,53,0) 55%)`
  return (
    <motion.div
      aria-hidden
      style={{ background: grad }}
      className="pointer-events-none absolute inset-0 mix-blend-screen"
    />
  )
}

/* ParticlesCanvas — drifting white/red dots with sine wave. */
function ParticlesCanvas() {
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
   DhqHero — Section 1 named export
   =================================================================== */
export function DhqHero() {
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
      aria-label="The Digital HQ — Hero"
    >
      <DigitalHQVisual sx={sx} sy={sy} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-40 mx-auto w-full max-w-7xl"
      >
        {/* Eyebrow — (01) · Website Design & Development */}
        <motion.div style={{ y: eyebrowY }}>
          <SectionEyebrow number="01" label="Website Design & Development" />
        </motion.div>

        {/* Service label — The Digital HQ (red, small) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 flex items-center gap-3"
        >
          <span className="wn-eyebrow text-[11px] font-semibold text-[#E53935] sm:text-xs">
            The Digital HQ
          </span>
          <span className="hidden h-px w-12 bg-gradient-to-r from-[#E53935]/60 to-transparent sm:block" />
          <span className="hidden text-[10px] text-white/40 sm:inline">
            Your 24/7 Sales Engine
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

        {/* Descriptor — verbatim Digital HQ description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
        >
          High-speed, conversion-focused websites that act as your 24/7 sales
          engine and digital headquarters.
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
              <span className="font-semibold text-white">Now</span> live
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
        The Digital HQ
      </div>
    </section>
  )
}
