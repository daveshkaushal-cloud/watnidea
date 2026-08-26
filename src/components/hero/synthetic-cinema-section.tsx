'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

/* ===================================================================
   EXISTING WatNidea copy — reused VERBATIM (no rewriting).
   Anchor content = the Synthetic Cinema service (name / category /
   description) as it already appears in the services section.
   All other text is structural/technical metadata (scene numbers,
   timecodes, format labels) — NOT authored marketing copy.
   =================================================================== */

const sectionTitle = 'AI VIDEO LAB / SYNTHETIC CINEMA'
const serviceName = 'Synthetic Cinema'
const serviceCat = 'AI Ads'
const serviceDesc =
  'AI-powered cinematic ads that scale your brand storytelling at the speed of imagination.'

// Structural metadata only (no marketing copy) — each "trailer" is a scene.
const scenes = [
  { id: 'S—01', tc: '00:00:12:04', fmt: '2.39:1 · DOLBY', render: 'AI · 4K · 24fps' },
  { id: 'S—02', tc: '00:00:24:18', fmt: '2.39:1 · DOLBY', render: 'AI · 8K · 60fps' },
  { id: 'S—03', tc: '00:00:38:07', fmt: '1.85:1 · HDR10', render: 'AI · 4K · 24fps' },
  { id: 'S—04', tc: '00:00:51:22', fmt: '2.39:1 · DOLBY', render: 'AI · 8K · 30fps' },
  { id: 'S—05', tc: '00:01:06:11', fmt: '2.39:1 · DOLBY', render: 'AI · 4K · 24fps' },
] as const

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

/** Deep red ambient lighting — cinematic studio glow. */
function CinemaAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[75vw] w-[75vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.20), rgba(229,57,53,0) 60%)',
          filter: 'blur(34px)',
          animation: 'cinema-ambient-1 10s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[-12%] left-[-6%] h-[40vw] w-[40vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.05), rgba(255,255,255,0) 70%)',
          filter: 'blur(40px)',
          animation: 'cinema-ambient-2 13s ease-in-out infinite',
        }}
      />
    </div>
  )
}

/** Red light streaks — animated cinematic light leaks. */
function RedStreaks() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute h-[2px] rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(229,57,53,0.85), transparent)',
            width: 220 + i * 40,
            top: `${18 + i * 16}%`,
            filter: 'blur(0.5px)',
            animation: `cinema-streak ${2.4 + i * 0.4}s ease-in ${i * 0.7}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/** Particle field canvas — floating cinematic dust + red sparks. */
function CinemaParticles() {
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

        const dust: {
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

          dust.length = 0
          const count = reduce ? 24 : Math.min(60, Math.floor((w * h) / 18000))
          for (let i = 0; i < count; i++) {
            dust.push({
              x: Math.random() * w,
              y: Math.random() * h,
              vx: (Math.random() - 0.5) * 0.12,
              vy: (Math.random() - 0.5) * 0.12,
              r: Math.random() * 1.4 + 0.3,
              red: Math.random() < 0.22,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          const t = performance.now() / 1000

          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < dust.length; i++) {
            const p = dust[i]
            if (!p.red) continue
            const px = p.x + Math.sin(t * 0.5 + p.phase) * 5
            const py = p.y + Math.cos(t * 0.4 + p.phase) * 5
            const g = ctx.createRadialGradient(px, py, 0, px, py, 12)
            g.addColorStop(0, 'rgba(229,57,53,0.5)')
            g.addColorStop(1, 'rgba(229,57,53,0)')
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(px, py, 12, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.globalCompositeOperation = 'source-over'

          for (let i = 0; i < dust.length; i++) {
            const p = dust[i]
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
            ctx.fillStyle = `rgba(255,255,255,${0.2 + 0.5 * flick})`
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
    />
  )
}

/* ===================================================================
   AI-generated visual preview — each scene's "video" content
   (animated generative gradients + scanning + wireframe terrain)
   =================================================================== */

function ScenePreview({ index, playing }: { index: number; playing: boolean }) {
  // vary palette per scene via index (all red/white/black — no blue)
  const hueShift = (index % 5) * 0.04
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#141414]">
      {/* generative gradient blobs */}
      <div
        className="absolute h-40 w-40 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(229,57,53,${0.32 + hueShift}), transparent 70%)`,
          filter: 'blur(20px)',
          left: `${20 + index * 8}%`,
          top: `${25 + (index % 3) * 10}%`,
          animation: playing ? 'cinema-blob-1 7s ease-in-out infinite' : 'none',
        }}
      />
      <div
        className="absolute h-28 w-28 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)',
          filter: 'blur(16px)',
          right: `${18 + index * 5}%`,
          bottom: `${20 + (index % 2) * 12}%`,
          animation: playing ? 'cinema-blob-2 8s ease-in-out infinite' : 'none',
        }}
      />

      {/* neural grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* scanning line — only when playing.
          Uses CSS @keyframes (not Framer Motion animate) because
          animating the `top` layout property via WAAPI can throw in
          certain browser / Next.js version combinations. CSS keyframes
          are the most stable path for layout-property animation. */}
      {playing && (
        <div
          className="absolute inset-x-0 h-px bg-[#E53935]/80"
          style={{
            boxShadow: '0 0 12px rgba(229,57,53,0.8)',
            top: '8%',
            animation: 'cinema-scanline 4s ease-in-out infinite',
          }}
        />
      )}

      {/* generating frame bars — uses scaleX (transform) instead of
          width (layout property) to avoid WAAPI errors. transformOrigin
          left so the bar grows from the left edge like a progress bar. */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 space-y-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-2 rounded-sm bg-white/15"
            style={{
              width: 56 + i * 8,
              transformOrigin: 'left center',
              opacity: playing ? undefined : 0.3,
              animation: playing
                ? `cinema-bar ${2 + i * 0.4}s ease-in-out ${i * 0.2}s infinite`
                : 'none',
            }}
          />
        ))}
      </div>

      {/* wireframe terrain */}
      <svg
        viewBox="0 0 100 40"
        className="absolute inset-x-0 bottom-0 h-1/3 w-full"
        preserveAspectRatio="none"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M0,${20 + i * 3} Q25,${10 + i * 3} 50,${18 + i * 3} T100,${16 + i * 3}`}
            fill="none"
            stroke={`rgba(229,57,53,${0.5 - i * 0.08})`}
            strokeWidth={0.3}
            style={{
              opacity: playing ? undefined : 0.3,
              animation: playing
                ? `cinema-path 3s ease-in-out ${i * 0.2}s infinite`
                : 'none',
            }}
          />
        ))}
      </svg>

      {/* center play / REC indicator */}
      {!playing && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm">
            <span className="ml-1 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white/80" />
          </div>
        </div>
      )}
      {playing && (
        <span
          className="absolute right-4 top-4 flex items-center gap-1.5 font-mono text-[10px] text-[#E53935]"
          style={{ animation: 'cinema-blink 1s ease-in-out infinite' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#E53935]" /> RENDERING
        </span>
      )}
    </div>
  )
}

/* ===================================================================
   Floating video screen — glassmorphism frame + holographic UI +
   hover-to-preview (playing state) + dynamic zoom
   =================================================================== */

function FloatingScreen({
  scene,
  index,
}: {
  scene: (typeof scenes)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // parallax depth + dynamic zoom on scroll
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94])
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 2 : -2, index % 2 === 0 ? -2 : 2])
  const labelY = useTransform(scrollYProgress, [0, 1], [20, -20])

  // mouse-reactive 3D tilt
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, (v) => v * -10), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(px, (v) => v * 10), { stiffness: 120, damping: 18 })

  return (
    <motion.article
      ref={ref}
      data-cursor="Preview"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        px.set(((e.clientX - r.left) / r.width - 0.5) * 2)
        py.set(((e.clientY - r.top) / r.height - 0.5) * 2)
      }}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
      }}
      className="group relative"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ y, scale, rotate, rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* holographic interface frame — glassmorphism */}
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl">
          {/* top status bar — holographic UI */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#1A1A1A]/80 px-4 py-2.5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#E53935]" />
              <span className="font-mono text-[10px] tracking-wider text-white/60">
                {scene.id}
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-wider text-white/40">
              {scene.tc}
            </span>
            <span className="font-mono text-[10px] tracking-wider text-[#E53935]/70">
              {scene.fmt}
            </span>
          </div>

          {/* preview area (16:9) */}
          <div className="relative aspect-video w-full overflow-hidden">
            <ScenePreview index={index} playing={true} />
            {/* group-hover intensifies the preview (dynamic zoom) */}
            <motion.div
              className="pointer-events-none absolute inset-0 origin-center"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* letterbox bars (cinematic) */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/70 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black/70 to-transparent" />
            {/* hover glassmorphism sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#E53935]/0 via-white/0 to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* bottom render bar — holographic UI */}
          <div className="flex items-center justify-between border-t border-white/10 bg-[#1A1A1A]/80 px-4 py-2.5 backdrop-blur-md">
            <span className="font-mono text-[10px] tracking-wider text-white/45">
              {scene.render}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] tracking-wider text-white/35">
                HOVER TO PREVIEW
              </span>
              <motion.span
                className="flex h-5 w-5 items-center justify-center rounded-full border border-[#E53935]/50 text-[#E53935]"
                whileHover={{ scale: 1.15 }}
              >
                <span className="ml-0.5 h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-[#E53935]" />
              </motion.span>
            </div>
          </div>
        </div>

        {/* holographic glow on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 50%, rgba(229,57,53,0.25), transparent 70%)',
          }}
        />
      </motion.div>

      {/* floating scene label */}
      <motion.div
        style={{ y: labelY }}
        className="absolute -left-2 -top-3 z-20 rounded-full border border-[#E53935]/40 bg-[#0c0c0c]/80 px-3 py-1 backdrop-blur-md"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#ff6b63]">
          SCENE {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>
    </motion.article>
  )
}

/* ===================================================================
   Director's reel — pinned scroll sequence of cinematic scene changes
   =================================================================== */

/** One scene layer in the director's reel — opacity/scale driven by scroll. */
function ReelScene({
  scene,
  index,
  sceneCount,
  scrollYProgress,
}: {
  scene: (typeof scenes)[number]
  index: number
  sceneCount: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = index / sceneCount
  const end = (index + 1) / sceneCount
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.05, start, end, end + 0.05],
    [0, 1, 1, 0]
  )
  const scale = useTransform(scrollYProgress, [start, end], [1.1, 1.0])
  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative h-[60vh] w-[80vw] max-w-4xl overflow-hidden rounded-3xl border border-white/10">
        <ScenePreview index={index} playing={true} />
        {/* cinematic letterbox */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[8%] bg-[#141414]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[8%] bg-[#141414]" />
        {/* holographic HUD */}
        <div className="absolute left-6 top-[10%] font-mono text-[11px] tracking-[0.2em] text-white/50">
          {scene.id} · {scene.fmt}
        </div>
        <div className="absolute right-6 top-[10%] font-mono text-[11px] tracking-[0.2em] text-[#E53935]">
          {scene.tc}
        </div>
        <div className="absolute bottom-[10%] left-6 font-mono text-[11px] tracking-[0.2em] text-white/40">
          {scene.render}
        </div>
        <div className="absolute bottom-[10%] right-6 font-mono text-[11px] tracking-[0.2em] text-white/40">
          SCENE {String(index + 1).padStart(2, '0')} / {String(sceneCount).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  )
}

/** One dot in the reel progress rail — opacity driven by scroll. */
function ReelDot({
  index,
  sceneCount,
  scrollYProgress,
}: {
  index: number
  sceneCount: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = index / sceneCount
  const end = (index + 1) / sceneCount
  const active = useTransform(
    scrollYProgress,
    [start - 0.02, start, end, end + 0.02],
    [0.2, 1, 1, 0.2]
  )
  return (
    <motion.div
      style={{ opacity: active }}
      className="h-1 w-10 rounded-full bg-[#E53935]"
    />
  )
}

function DirectorsReel() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const sceneCount = scenes.length

  return (
    <div ref={ref} className="relative h-[400vh]">
      {/* pinned viewport */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <RedStreaks />

        {/* background — current active scene big preview */}
        <div className="absolute inset-0 flex items-center justify-center">
          {scenes.map((s, i) => (
            <ReelScene
              key={s.id}
              scene={s}
              index={i}
              sceneCount={sceneCount}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* progress rail */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
          {scenes.map((s, i) => (
            <ReelDot
              key={s.id}
              index={i}
              sceneCount={sceneCount}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* scroll hint */}
        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] tracking-[0.3em] text-white/30 lg:block">
          SCROLL TO ADVANCE SCENES
        </div>
      </div>
    </div>
  )
}

/* ===================================================================
   Section shell — sticky rail + scroll progress + header + reel + gallery
   =================================================================== */

export default function SyntheticCinemaSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      ref={containerRef}
      id="synthetic-cinema"
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <CinemaAmbient />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
        <CinemaParticles />
      </div>

      <div className="lg:flex">
        {/* sticky rail (desktop) */}
        <aside className="hidden lg:block lg:w-24 lg:shrink-0">
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <span
                className="wn-eyebrow text-[11px] font-medium text-white/45 [writing-mode:vertical-rl]"
                style={{ rotate: '180deg' }}
              >
                AI Video Lab
              </span>
              <div className="relative h-56 w-px overflow-hidden rounded-full bg-white/10">
                <motion.div
                  style={{ scaleY: railScale }}
                  className="absolute inset-0 origin-top bg-[#E53935]"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Reel
              </span>
            </div>
          </div>
        </aside>

        {/* content */}
        <div className="relative min-w-0 flex-1">
          {/* section header — verbatim Synthetic Cinema copy */}
          <header className="relative px-5 pb-10 pt-28 sm:px-8 sm:pt-32">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-7 flex items-center gap-3"
              >
                <span className="text-xs font-medium text-[#E53935]">(06)</span>
                <span className="h-px w-8 bg-[#E53935]/60" />
                <span className="wn-eyebrow text-[11px] font-medium text-white/55 sm:text-xs">
                  {serviceCat}
                </span>
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-[#E53935]/70">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[#E53935]"
                    style={{ animation: 'cinema-blink 1s ease-in-out infinite' }}
                  />
                  REC
                </span>
              </motion.div>

              <h2
                className="text-[8.5vw] font-bold leading-[0.98] tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-7xl"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                <MaskLine>{serviceName}</MaskLine>
                <MaskLine delay={0.1}>
                  <span className="bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent">
                    Synthetic Cinema
                  </span>
                </MaskLine>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
              >
                {serviceDesc}
              </motion.p>

              <span className="mt-5 block font-mono text-[10px] tracking-[0.3em] text-white/35">
                {sectionTitle}
              </span>
            </div>
          </header>

          {/* Director's reel — pinned scroll-triggered scene changes */}
          <div className="relative">
            <DirectorsReel />
          </div>

          {/* Floating screens gallery — hover-to-preview */}
          <div className="relative px-5 py-24 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-14 flex flex-col items-center gap-3 text-center"
              >
                <span className="wn-eyebrow text-[11px] font-medium text-white/50 sm:text-xs">
                  The Reel — Hover To Preview
                </span>
                <h3
                  className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  Five Scenes From The{' '}
                  <span className="bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent">
                    Lab
                  </span>
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {scenes.map((s, i) => (
                  <FloatingScreen key={s.id} scene={s} index={i} />
                ))}
                {/* CTA tile */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#E53935]/40 bg-[#E53935]/[0.03] p-8 text-center"
                >
                  <div className="relative z-10">
                    <div
                      className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#E53935]/50 bg-[#E53935]/10"
                      style={{ animation: 'cinema-pulse 2.5s ease-in-out infinite' }}
                    >
                      <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-[#E53935]" />
                    </div>
                    <p
                      className="text-lg font-semibold text-white"
                      style={{ fontFamily: 'var(--font-display), sans-serif' }}
                    >
                      Render Your Scene
                    </p>
                    <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-white/40">
                      COMMISSION A TRAILER
                    </p>
                  </div>
                  <RedStreaks />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
