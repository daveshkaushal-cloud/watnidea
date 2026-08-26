'use client'

/**
 * AuraWhatIs — Section 3
 * Full-screen visual storytelling — identity forming from chaos.
 *
 * Composition:
 *   - Eyebrow: (03) · What Is Aura Architecture
 *   - Headline: "watNidea is an Identity Lab." (lowercase w; Identity Lab. red)
 *   - Secondary: `We design "The Vibe" that makes brands impossible to ignore.`
 *     ("The Vibe" chrome+quotes; "impossible to ignore." red)
 *   - Body: the verbatim Aura Architecture description
 *
 * Visual concept — "identity forming from chaos":
 *   - Particle system: starts scattered/chaotic, organizes into a ring as
 *     you scroll.
 *   - 5 labeled nodes (Positioning / Voice / Visual Identity / Story /
 *     Market Perception) appear around a central `Aura` core.
 *   - Energy streams (SVG paths with animated strokeDashoffset) flowing
 *     between the 5 nodes and the central core. Streams pulse continuously.
 *   - Interactive: hover a node → it highlights + its stream intensifies
 *     + tooltip/label shows the element name + one-line descriptor.
 *
 * Scroll-driven: particles move from chaos → organized as scrollYProgress
 * goes 0→1.
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { SectionEyebrow, MaskLine, RedGradientText } from '@/components/about/shared'

/* ===================================================================
   Content — 5 elements of identity (premium descriptors, brand voice).
   Angles are precomputed at module scope & rounded to 3 decimals to
   guarantee identical SSR + client serialization.
   =================================================================== */
type Element = {
  label: string
  desc: string
  // position on the SVG viewBox 100x100 (relative to a center 50,50)
  x: number
  y: number
}

const elements: Element[] = [
  {
    label: 'Positioning',
    desc: "Where you stand in the market's mind.",
    // top
    x: 50,
    y: 14,
  },
  {
    label: 'Voice',
    desc: 'How you sound when the world listens.',
    // upper-right
    x: 84,
    y: 34,
  },
  {
    label: 'Visual Identity',
    desc: 'The DNA your audience sees.',
    // lower-right
    x: 78,
    y: 80,
  },
  {
    label: 'Story',
    desc: 'The narrative that makes you unforgettable.',
    // lower-left
    x: 22,
    y: 80,
  },
  {
    label: 'Market Perception',
    desc: 'How the world remembers you.',
    // upper-left
    x: 16,
    y: 34,
  },
].map((e) => ({
  ...e,
  x: Math.round(e.x * 1000) / 1000,
  y: Math.round(e.y * 1000) / 1000,
}))

/* ===================================================================
   EcosystemCanvas — particles that organize into a ring as you scroll.
   progress (0→1) drives scatter → organized.
   =================================================================== */
function EcosystemCanvas({ progress }: { progress: MotionValue<number> }) {
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
        let progressVal = 0
        const reduce =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches

        type P = {
          sx: number
          sy: number
          ox: number
          oy: number
          r: number
          red: boolean
          phase: number
        }
        const ps: P[] = []

        const unsubscribe = progress.on('change', (v) => {
          progressVal = v
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

          ps.length = 0
          const n = reduce ? 0 : 90
          const cx = w / 2
          const cy = h / 2
          const radius = Math.min(w, h) * 0.38
          for (let i = 0; i < n; i++) {
            const angle = (i / n) * Math.PI * 2
            ps.push({
              sx: Math.random() * w,
              sy: Math.random() * h,
              ox: cx + Math.cos(angle) * radius,
              oy: cy + Math.sin(angle) * radius,
              r: Math.random() * 1.6 + 0.4,
              red: Math.random() < 0.32,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          const t = performance.now() / 1000
          const p = progressVal
          const ep = p * p * (3 - 2 * p) // smoothstep

          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < ps.length; i++) {
            const pt = ps[i]
            const x = pt.sx + (pt.ox - pt.sx) * ep
            const y = pt.sy + (pt.oy - pt.sy) * ep
            const breath = 1 + Math.sin(t * 0.8 + pt.phase) * 0.06 * ep
            const px = x * breath + (1 - ep) * Math.sin(t * 0.6 + pt.phase) * 4
            const py = y * breath + (1 - ep) * Math.cos(t * 0.5 + pt.phase) * 4

            const radius = pt.red ? 10 : pt.r * 2
            const g = ctx.createRadialGradient(px, py, 0, px, py, radius)
            if (pt.red) {
              const a = 0.5 * (0.6 + 0.4 * ep)
              g.addColorStop(0, `rgba(229,57,53,${a})`)
              g.addColorStop(1, 'rgba(229,57,53,0)')
            } else {
              const flick = 0.5 + 0.5 * Math.sin(t * 1.4 + pt.phase)
              const a = (0.18 + 0.5 * flick) * (0.5 + 0.5 * ep)
              g.addColorStop(0, `rgba(255,255,255,${a})`)
              g.addColorStop(1, 'rgba(255,255,255,0)')
            }
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(px, py, radius, 0, Math.PI * 2)
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
          unsubscribe()
        }
      }}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}

/* ===================================================================
   EnergyStream — single SVG path from a node to the central core.
   Continuously pulses (strokeDashoffset animation).
   On hover, intensifies (stroke + glow).
   =================================================================== */
function EnergyStream({
  el,
  active,
}: {
  el: Element
  active: boolean
}) {
  // slight curve via quadratic bezier control point
  const cx = 50
  const cy = 50
  const mx = (el.x + cx) / 2
  const my = (el.y + cy) / 2 - 4

  const stroke = active ? 'rgba(229,57,53,0.95)' : 'rgba(229,57,53,0.4)'
  const sw = active ? 0.9 : 0.5

  return (
    <motion.path
      d={`M${el.x},${el.y} Q${mx},${my} ${cx},${cy}`}
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
   ElementNode — single labeled node around the central core.
   Hoverable: scales up, glows; tooltip shows element + descriptor.
   =================================================================== */
function ElementNode({
  el,
  active,
  onEnter,
  onLeave,
  visible,
}: {
  el: Element
  active: boolean
  onEnter: () => void
  onLeave: () => void
  visible: boolean
}) {
  return (
    <div
      data-cursor="View"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1.5"
      style={{ left: `${el.x}%`, top: `${el.y}%` }}
    >
      <motion.div
        animate={{
          scale: active ? 1.18 : 1,
          boxShadow: active
            ? '0 0 22px rgba(229,57,53,0.95), 0 0 48px rgba(229,57,53,0.55)'
            : '0 0 10px rgba(229,57,53,0.55), 0 0 22px rgba(229,57,53,0.25)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-4 w-4 items-center justify-center rounded-full bg-[#E53935]"
        style={{ opacity: visible ? 1 : 0 }}
      >
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
        className="wn-eyebrow whitespace-nowrap text-[9px] font-medium text-white/80 sm:text-[10px]"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {el.label}
      </span>

      {/* tooltip on hover */}
      <motion.div
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          y: active ? 0 : 4,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute top-full mt-2 w-44 max-w-[60vw] rounded-md border border-white/10 bg-[#2E2E2E]/90 px-3 py-2 text-center backdrop-blur-md"
      >
        <p className="text-[10px] font-semibold text-white sm:text-xs">
          {el.label}
        </p>
        <p className="mt-1 text-[10px] leading-snug text-white/55">
          {el.desc}
        </p>
      </motion.div>
    </div>
  )
}

/* ===================================================================
   AuraCore — central pulsing "Aura" core with red gradient.
   =================================================================== */
function AuraCore({ visible }: { visible: boolean }) {
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
      {/* core ring */}
      <motion.div
        className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#E53935]/60 bg-[#E53935]/10 backdrop-blur-md sm:h-24 sm:w-24"
        animate={{ scale: [1, 1.06, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow:
            '0 0 30px rgba(229,57,53,0.7), inset 0 0 18px rgba(229,57,53,0.3)',
        }}
      >
        <span
          className="wn-eyebrow text-[10px] font-bold text-[#ff6b63] sm:text-xs"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          Aura
        </span>
      </motion.div>
    </div>
  )
}

/* ===================================================================
   AuraWhatIs — Section 3 default export
   =================================================================== */
export function AuraWhatIs() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // nodes + core fade in as formation organizes
  const visible = useTransform(scrollYProgress, [0.4, 0.55], [0, 1])
  const [visibleState, setVisibleState] = useState(false)

  // subscribe to visible motion value → flip a plain boolean for child
  // opacity (so children without motion-value support can react too)
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
      aria-label="What Is Aura Architecture"
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
        <SectionEyebrow number="03" label="What Is Aura Architecture" />

        {/* Massive headline */}
        <h2
          className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="lowercase">watNidea</span> is an{' '}
          </MaskLine>
          <MaskLine delay={0.12}>
            <RedGradientText>Identity Lab.</RedGradientText>
          </MaskLine>
        </h2>

        {/* Secondary masked lines */}
        <div className="mt-8 max-w-3xl">
          <h3
            className="text-2xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine>
              <span className="text-white/85">We design </span>
              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="absolute inset-0 select-none blur-[7px]"
                  style={{ color: '#E53935', opacity: 0.4 }}
                >
                  &ldquo;The&nbsp;Vibe&rdquo;
                </span>
                <span className="wn-chrome-text relative">
                  &ldquo;The&nbsp;Vibe&rdquo;
                </span>
              </span>
              <span className="text-white/85"> that makes</span>
            </MaskLine>
            <MaskLine delay={0.1}>
              <span className="text-white/85">brands </span>
              <RedGradientText>impossible to ignore.</RedGradientText>
            </MaskLine>
          </h3>
        </div>

        {/* Body — verbatim */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
        >
          We define your brand soul, positioning, and visual DNA to create a
          powerful identity that stands out with purpose and clarity.
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
            <EcosystemCanvas progress={scrollYProgress} />

            {/* SVG energy streams layer */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              {elements.map((el, i) => (
                <EnergyStream
                  key={el.label}
                  el={el}
                  active={activeIndex === i || activeIndex === null}
                />
              ))}
            </svg>

            {/* Central Aura core */}
            <AuraCore visible={visibleState} />

            {/* 5 element nodes */}
            {elements.map((el, i) => (
              <ElementNode
                key={el.label}
                el={el}
                active={activeIndex === i}
                visible={visibleState}
                onEnter={() => setActiveIndex(i)}
                onLeave={() => setActiveIndex(null)}
              />
            ))}

            {/* corner labels */}
            <div className="pointer-events-none absolute left-4 top-4 wn-eyebrow text-[10px] text-white/45">
              Identity Ecosystem
            </div>
            <div className="pointer-events-none absolute bottom-4 right-4 text-[10px] text-white/30">
              Hover a node to explore
            </div>
          </div>

          {/* element chips below the ecosystem (mobile-friendly discovery) */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {elements.map((el, i) => (
              <motion.div
                key={el.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
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
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E53935]" />
                  <span
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: 'var(--font-display), sans-serif' }}
                  >
                    {el.label}
                  </span>
                </div>
                <p className="text-xs leading-snug text-white/55">{el.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
