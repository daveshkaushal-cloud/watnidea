'use client'

import { useRef, type ReactNode } from 'react'
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
   EXISTING WatNidea copy — reused VERBATIM (no rewriting).
   This section reframes already-established brand content as a
   cinematic philosophy / manifesto. Nothing is newly authored.
   =================================================================== */

const sectionTitle = 'IDENTITY LAB BUILT FOR GROWTH'

// Existing copy, quoted exactly as it appears elsewhere on the site.
const chapters = [
  {
    eyebrow: 'Creative • Performance • AI',
    lead: ['Identity with Soul.', 'Strategy with Teeth.'],
    body: [
      'We don\u2019t just build brands. We engineer attention, create unforgettable experiences, and design growth systems that turn businesses into category leaders.',
      'Built for Brands That Refuse to Blend In.',
    ],
    motif: 'identity' as const,
  },
  {
    eyebrow: 'A Creative Manifesto',
    lead: ['watNidea is an Identity Lab.'],
    body: [
      'The world has enough agencies\u2014and most of them play safe.',
      'We design \u201CThe Vibe\u201D that makes brands impossible to ignore.',
      'Every strategy, every visual, and every campaign is built to trigger one reaction: \u201CWhat an idea!\u201D',
    ],
    motif: 'vibe' as const,
  },
  {
    eyebrow: 'The Principles',
    lead: [
      'Aesthetics Are Utility.',
      'Data Protects the Art.',
      'Built for the Future.',
    ],
    body: [
      'Eye-catching visuals that elevate your brand.',
      'Creative ideas powered by real data.',
      'Driven by AI and evolving trends.',
    ],
    motif: 'growth' as const,
  },
]

/* ===================================================================
   Shared helpers
   =================================================================== */

/** Deadlock-safe masked line reveal (observes the wrapper, not the clipped child). */
function MaskLine({
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

/** Deep red ambient lighting — shared fixed background for the whole section. */
function LabAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.22), rgba(229,57,53,0) 65%)',
          filter: 'blur(30px)',
        }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.14, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-12%] right-[-6%] h-[42vw] w-[42vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ===================================================================
   Floating identity particles (canvas, mouse-reactive)
   =================================================================== */

function IdentityParticles() {
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

        const pointer = { x: -9999, y: -9999 }

        const particles: {
          x: number
          y: number
          vx: number
          vy: number
          r: number
          red: boolean
          phase: number
        }[] = []

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

          particles.length = 0
          const count = reduce ? 28 : Math.min(70, Math.floor((w * h) / 16000))
          for (let i = 0; i < count; i++) {
            particles.push({
              x: Math.random() * w,
              y: Math.random() * h,
              vx: (Math.random() - 0.5) * 0.15,
              vy: (Math.random() - 0.5) * 0.15,
              r: Math.random() * 1.6 + 0.4,
              red: Math.random() < 0.25,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }

        const onMove = (e: PointerEvent) => {
          const rect = c.getBoundingClientRect()
          pointer.x = e.clientX - rect.left
          pointer.y = e.clientY - rect.top
        }
        const onLeave = () => {
          pointer.x = -9999
          pointer.y = -9999
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          const t = performance.now() / 1000

          // liquid red energy streams (additive)
          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i]
            if (!p.red) continue
            const px = p.x + Math.sin(t * 0.6 + p.phase) * 6
            const py = p.y + Math.cos(t * 0.5 + p.phase) * 6
            const g = ctx.createRadialGradient(px, py, 0, px, py, 14)
            g.addColorStop(0, 'rgba(229,57,53,0.55)')
            g.addColorStop(1, 'rgba(229,57,53,0)')
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(px, py, 14, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.globalCompositeOperation = 'source-over'

          // white identity particles
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i]
            if (p.red) continue

            p.x += p.vx
            p.y += p.vy

            const dx = pointer.x - p.x
            const dy = pointer.y - p.y
            const d2 = dx * dx + dy * dy
            if (d2 < 200 * 200 && d2 > 1) {
              const d = Math.sqrt(d2)
              const f = (1 - d / 200) * 0.6
              p.x += (dx / d) * f
              p.y += (dy / d) * f
            }

            if (p.x < -10) p.x = w + 10
            if (p.x > w + 10) p.x = -10
            if (p.y < -10) p.y = h + 10
            if (p.y > h + 10) p.y = -10

            const flick = 0.5 + 0.5 * Math.sin(t * 1.5 + p.phase)
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255,255,255,${0.25 + 0.5 * flick})`
            ctx.fill()
          }

          raf = requestAnimationFrame(draw)
        }

        resize()
        window.addEventListener('resize', resize)
        c.addEventListener('pointermove', onMove)
        c.addEventListener('pointerleave', onLeave)
        if (!reduce) raf = requestAnimationFrame(draw)

        ;(c as { __cleanup?: () => void }).__cleanup = () => {
          cancelAnimationFrame(raf)
          window.removeEventListener('resize', resize)
          c.removeEventListener('pointermove', onMove)
          c.removeEventListener('pointerleave', onLeave)
        }
      }}
      className="absolute inset-0 h-full w-full"
    />
  )
}

/* ===================================================================
   Interactive visual metaphors — one motif per chapter
   (mouse-reactive via MotionValue parallax)
   =================================================================== */

/** Chapter 1 — abstract branding ecosystem (identity mark). */
function IdentityEcosystem({
  mx,
  my,
}: {
  mx: MotionValue<number>
  my: MotionValue<number>
}) {
  const rotateX = useTransform(my, (v) => v * 12)
  const rotateY = useTransform(mx, (v) => v * 12)
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* morphing identity mark — mouse-reactive tilt */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ rotateX, rotateY, transformPerspective: 800 }}
      >
        <motion.div
          className="relative h-[44vw] w-[44vw] max-h-[440px] max-w-[440px]"
          animate={{
            borderRadius: ['28%', '50%', '46%', '50%', '28%'],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{
            border: '1px solid rgba(229,57,53,0.45)',
            background:
              'radial-gradient(circle, rgba(229,57,53,0.12), transparent 72%)',
          }}
        />
      </motion.div>

      {/* concentric rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{ width: 220 + i * 120, height: 220 + i * 120 }}
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 30 + i * 14,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#E53935]/25"
        style={{ width: 320, height: 320 }}
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      {/* red core */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow:
            '0 0 24px rgba(229,57,53,0.95), 0 0 60px rgba(229,57,53,0.5)',
        }}
      />
    </div>
  )
}

/** Chapter 2 — liquid red energy streams forming "The Vibe". */
function VibeStreams({
  mx,
  my,
}: {
  mx: MotionValue<number>
  my: MotionValue<number>
}) {
  const x = useTransform(mx, (v) => v * 20)
  const y = useTransform(my, (v) => v * 20)
  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ x, y }}
      >
        <svg
          viewBox="0 0 400 400"
          className="h-[60vw] w-[60vw] max-h-[560px] max-w-[560px]"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.path
              key={i}
              d={`M40,${80 + i * 55} C140,${40 + i * 55} 260,${120 + i * 55} 360,${80 + i * 55}`}
              fill="none"
              stroke={`rgba(229,57,53,${0.7 - i * 0.1})`}
              strokeWidth={1.4 - i * 0.15}
              strokeLinecap="round"
              animate={{
                d: [
                  `M40,${80 + i * 55} C140,${40 + i * 55} 260,${120 + i * 55} 360,${80 + i * 55}`,
                  `M40,${80 + i * 55} C140,${120 + i * 55} 260,${40 + i * 55} 360,${80 + i * 55}`,
                  `M40,${80 + i * 55} C140,${40 + i * 55} 260,${120 + i * 55} 360,${80 + i * 55}`,
                ],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(229,57,53,0.6))' }}
            />
          ))}
        </svg>
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.45), rgba(229,57,53,0) 70%)',
          filter: 'blur(10px)',
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/** Chapter 3 — growth & identity metaphor: rising light structures. */
function GrowthMetaphor({
  mx,
}: {
  mx: MotionValue<number>
  my: MotionValue<number>
}) {
  const bars = [38, 56, 72, 88, 100]
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* baseline */}
      <div className="absolute inset-x-[12%] bottom-[26%] h-px bg-white/10" />
      {/* growth line */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0.9 }}
      >
        <motion.polyline
          points="10,80 28,66 46,52 64,34 82,14"
          fill="none"
          stroke="rgba(229,57,53,0.7)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(229,57,53,0.6))' }}
        />
      </svg>
      {/* light beams */}
      <div
        className="absolute inset-x-[14%] bottom-[26%] flex items-end justify-between"
        style={{ height: '46%' }}
      >
        {bars.map((hPct, i) => (
          <Beam key={i} hPct={hPct} i={i} mx={mx} />
        ))}
      </div>
      {/* ascending identity particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/70"
          style={{ left: `${18 + i * 16}%`, bottom: '24%' }}
          animate={{ y: [0, -220], opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

/** Single light beam with mouse-reactive horizontal drift. */
function Beam({
  hPct,
  i,
  mx,
}: {
  hPct: number
  i: number
  mx: MotionValue<number>
}) {
  const drift = useTransform(mx, (v) => v * (i - 2) * 4)
  const transform = useMotionTemplate`translateX(calc(-50% + ${drift}px))`
  return (
    <div className="relative flex-1" style={{ height: `${hPct}%` }}>
      <motion.div
        className="absolute bottom-0 w-full origin-bottom rounded-t-sm"
        style={{
          background:
            'linear-gradient(to top, rgba(229,57,53,0.5), rgba(255,255,255,0.12))',
          height: '100%',
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute -top-5 left-1/2 h-10 w-1 rounded-full"
        style={{
          background: 'linear-gradient(to top, rgba(229,57,53,0.9), transparent)',
          transform,
        }}
        animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
      />
    </div>
  )
}

/* ===================================================================
   Chapter panel — full-screen cinematic storytelling
   =================================================================== */

function Chapter({
  chapter,
  index,
  total,
}: {
  chapter: (typeof chapters)[number]
  index: number
  total: number
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // parallax + cinematic opacity/scale per chapter
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0, 1, 1, 0]
  )
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.04])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])
  const contentX = useTransform(scrollYProgress, [0, 1], [40, -40])

  // mouse-reactive parallax (chapter-local)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 80, damping: 20 })
  const sy = useSpring(py, { stiffness: 80, damping: 20 })

  const Motif =
    chapter.motif === 'identity'
      ? IdentityEcosystem
      : chapter.motif === 'vibe'
        ? VibeStreams
        : GrowthMetaphor

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        px.set(((e.clientX - r.left) / r.width - 0.5) * 2)
        py.set(((e.clientY - r.top) / r.height - 0.5) * 2)
      }}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 sm:px-8"
    >
      {/* interactive visual metaphor layer */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Motif mx={sx} my={sy} />
      </motion.div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        {/* chapter marker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-center gap-3"
        >
          <span
            className="text-xs font-bold text-[#E53935]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Ch. {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-8 bg-[#E53935]/60" />
          <span className="wn-eyebrow text-[11px] font-medium text-white/55 sm:text-xs">
            {chapter.eyebrow}
          </span>
          <span className="ml-auto text-[10px] uppercase tracking-[0.3em] text-white/30">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </motion.div>

        {/* lead — large dynamic typography reveal, line by line */}
        <motion.h2
          style={{ x: contentX }}
          className="text-[8.5vw] font-bold leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {chapter.lead.map((line, i) => {
            const isAccent =
              line === 'Strategy with Teeth.' ||
              line === 'watNidea is an Identity Lab.' ||
              line === 'Built for the Future.'
            // keep the lowercase brand token verbatim
            const isBrandLine = line.toLowerCase().startsWith('watnidea')
            return (
              <MaskLine key={i} delay={i * 0.08}>
                {isBrandLine ? (
                  <span className={isAccent ? 'bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent' : ''}>
                    <span className="lowercase">watNidea</span>
                    {line.replace(/^watNidea/i, '')}
                  </span>
                ) : isAccent ? (
                  <span className="bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </MaskLine>
            )
          })}
        </motion.h2>

        {/* body — verbatim sentences */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-9 max-w-2xl space-y-4"
        >
          {chapter.body.map((p, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-white/60 sm:text-lg"
            >
              {p}
            </p>
          ))}
        </motion.div>
      </motion.div>

      {/* chapter progress line — parallax depth */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 h-12 w-px -translate-x-1/2 overflow-hidden bg-white/10"
      >
        <motion.div
          className="absolute inset-0 bg-[#E53935]"
          style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}

/* ===================================================================
   Section shell — sticky rail + scroll progress + header + chapters
   =================================================================== */

export default function IdentityLabSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      ref={containerRef}
      id="identity-lab"
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <LabAmbient />

      {/* floating identity particles — whole-section canvas */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
        <IdentityParticles />
      </div>

      <div className="lg:flex">
        {/* sticky philosophy rail (desktop) */}
        <aside className="hidden lg:block lg:w-24 lg:shrink-0">
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <span
                className="wn-eyebrow text-[11px] font-medium text-white/45 [writing-mode:vertical-rl]"
                style={{ rotate: '180deg' }}
              >
                Philosophy
              </span>
              <div className="relative h-56 w-px overflow-hidden rounded-full bg-white/10">
                <motion.div
                  style={{ scaleY: railScale }}
                  className="absolute inset-0 origin-top bg-[#E53935]"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Manifesto
              </span>
            </div>
          </div>
        </aside>

        {/* content */}
        <div className="relative min-w-0 flex-1">
          {/* section header */}
          <header className="relative px-5 pb-10 pt-28 sm:px-8 sm:pt-32">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-7 flex items-center gap-3"
              >
                <span className="text-xs font-medium text-[#E53935]">(05)</span>
                <span className="h-px w-8 bg-[#E53935]/60" />
                <span className="wn-eyebrow text-[11px] font-medium text-white/55 sm:text-xs">
                  The Philosophy
                </span>
              </motion.div>
              <h2
                className="text-[9vw] font-bold leading-[0.98] tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-7xl"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                <MaskLine>Identity Lab</MaskLine>
                <MaskLine delay={0.1}>
                  Built for{' '}
                  <span className="bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent">
                    Growth
                  </span>
                </MaskLine>
              </h2>
            </div>
          </header>

          {/* cinematic chapters */}
          {chapters.map((c, i) => (
            <Chapter
              key={i}
              chapter={c}
              index={i}
              total={chapters.length}
            />
          ))}

          {/* closing statement — reuse hero headline verbatim */}
          <footer className="relative px-5 py-24 sm:px-8 sm:py-32">
            <div className="mx-auto max-w-6xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="wn-eyebrow text-[11px] font-medium text-white/45 sm:text-xs">
                  {sectionTitle}
                </span>
                <p
                  className="mx-auto mt-5 max-w-3xl text-[7vw] font-bold leading-[1.05] tracking-[-0.02em] text-white/90 sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  <MaskLine>
                    Identity with Soul.{' '}
                    <span className="bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent">
                      Strategy with Teeth.
                    </span>
                  </MaskLine>
                </p>
              </motion.div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
