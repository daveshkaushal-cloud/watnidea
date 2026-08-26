'use client'

/**
 * AuraWhatIs — Section 3 of the /aura-architecture page.
 *
 * Full-screen storytelling where identity becomes visible: particles start
 * scattered, then organize into a 5-node identity ecosystem as you scroll.
 *
 * Composition:
 *   - SectionEyebrow `(03) What Is Aura Architecture`
 *   - Headline: `watNidea is an Identity Lab.` (lowercase w preserved;
 *     "Identity Lab." red gradient + glow)
 *   - Body (verbatim Aura desc): `We define your brand soul, positioning,
 *     and visual DNA to create a powerful identity that stands out with
 *     purpose and clarity.`
 *   - Secondary line: `Everything starts with identity.` ("identity." red)
 *   - 5 interactive identity elements as orbiting nodes around a central
 *     "Identity" core, connected by energy streams (SVG paths):
 *       Positioning · Voice · Visual Identity · Story · Market Perception
 *     Each maps to a verbatim FRAGMENT lifted directly from the Aura desc:
 *       Positioning / `brand soul`
 *       Voice / `stands out with purpose and clarity`
 *       Visual Identity / `visual DNA`
 *       Story / `create a powerful identity`
 *       Market Perception / `a powerful identity that stands out`
 *
 * Visual — identity forming from chaos:
 *   - Particles start scattered, then organize into the 5-node ecosystem
 *     formation as you scroll (reuse the section-3-what-is pattern).
 *   - The central core is a pulsing red identity mark (like AuraVisual's core).
 *
 * Interactive: hover a node → it scales, glows red, the energy streams
 * to/from it intensify, and a detail label appears.
 *
 * Feeling: "Brand identity being engineered."
 */

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import {
  Crosshair,
  Eye,
  Fingerprint,
  Layers,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react'
import { SectionEyebrow, MaskLine, RedGradientText } from '@/components/about/shared'

/* ===================================================================
   Content — 5 identity elements + verbatim fragment descriptions.
   (Labels from user spec; descriptions are FRAGMENTS of the Aura desc.)
   =================================================================== */
type Element = {
  label: string
  desc: string
  Icon: LucideIcon
  angle: number
}

const elements: Element[] = [
  { label: 'Positioning', desc: 'brand soul', Icon: Crosshair, angle: -90 },
  { label: 'Voice', desc: 'stands out with purpose and clarity', Icon: MessageSquare, angle: -18 },
  { label: 'Visual Identity', desc: 'visual DNA', Icon: Eye, angle: 54 },
  { label: 'Story', desc: 'create a powerful identity', Icon: Layers, angle: 126 },
  { label: 'Market Perception', desc: 'a powerful identity that stands out', Icon: Fingerprint, angle: 198 },
]

/* ===================================================================
   EcosystemCanvas — particle system that organizes into a ring formation
   as the user scrolls. progress (0→1) drives scatter → organized.
   (Mirrors about/section-3-what-is EcosystemCanvas pattern.)
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
          // random scatter position
          sx: number
          sy: number
          // organized position (ring formation)
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
          // ease the progress for a smoother transition
          const ep = p * p * (3 - 2 * p)

          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < ps.length; i++) {
            const pt = ps[i]
            // interpolate from scatter (sx,sy) to organized (ox,oy)
            const x = pt.sx + (pt.ox - pt.sx) * ep
            const y = pt.sy + (pt.oy - pt.sy) * ep
            // add subtle breathing in organized state
            const breath = 1 + Math.sin(t * 0.8 + pt.phase) * 0.06 * ep
            const px = x * breath + (1 - ep) * Math.sin(t * 0.6 + pt.phase) * 4
            const py = y * breath + (1 - ep) * Math.cos(t * 0.5 + pt.phase) * 4

            const radius = pt.red ? 11 : pt.r * 2
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
   IdentityNode — a single orbiting identity element node.
   Interactive: hover → scales, glows red, streams intensify.
   Hooks at the top (unconditional).
   =================================================================== */
function IdentityNode({
  element,
  active,
  onHover,
  onLeave,
}: {
  element: Element
  active: boolean
  onHover: (label: string) => void
  onLeave: () => void
}) {
  const rad = (element.angle * Math.PI) / 180
  // node position as % within the ecosystem panel
  const x = Math.round((50 + Math.cos(rad) * 38) * 1000) / 1000
  const y = Math.round((50 + Math.sin(rad) * 38) * 1000) / 1000
  const { label, desc, Icon } = element

  return (
    <motion.button
      type="button"
      data-cursor="View"
      onPointerEnter={() => onHover(label)}
      onPointerLeave={onLeave}
      onFocus={() => onHover(label)}
      onBlur={onLeave}
      aria-label={`${label} — ${desc}`}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ scale: active ? 1.18 : 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 16 }}
    >
      <div className="relative flex flex-col items-center gap-1.5">
        {/* node dot + halo */}
        <span
          className="relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300"
          style={{
            borderColor: active ? 'rgba(229,57,53,0.85)' : 'rgba(255,255,255,0.18)',
            background: active
              ? 'radial-gradient(circle, rgba(229,57,53,0.32), rgba(229,57,53,0.06) 60%, transparent 80%)'
              : 'rgba(255,255,255,0.04)',
            boxShadow: active
              ? '0 0 20px rgba(229,57,53,0.7), 0 0 44px rgba(229,57,53,0.4)'
              : '0 0 0px rgba(229,57,53,0)',
          }}
        >
          <Icon
            className={`h-4 w-4 transition-colors duration-300 ${
              active ? 'text-[#ff6b63]' : 'text-white/65'
            }`}
          />
        </span>

        {/* label */}
        <span
          className={`wn-eyebrow text-[9px] font-medium transition-colors duration-300 sm:text-[10px] ${
            active ? 'text-white' : 'text-white/55'
          }`}
        >
          {label}
        </span>

        {/* detail label appears on hover */}
        <motion.span
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? 0 : -4,
          }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute top-full mt-1 w-max max-w-[180px] text-center text-[10px] font-medium leading-snug text-[#ff6b63]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {desc}
        </motion.span>
      </div>
    </motion.button>
  )
}

/* ===================================================================
   EnergyStreams — SVG paths connecting all 5 nodes to the center AND to
   each other. Pulsing opacity + intensity boost on the active node's links.
   =================================================================== */
function EnergyStreams({ activeLabel }: { activeLabel: string | null }) {
  // build node coordinates in 100×100 svg space (matches IdentityNode %)
  const nodes = elements.map((e) => {
    const rad = (e.angle * Math.PI) / 180
    return {
      label: e.label,
      x: Math.round((50 + Math.cos(rad) * 38) * 1000) / 1000,
      y: Math.round((50 + Math.sin(rad) * 38) * 1000) / 1000,
    }
  })
  const cx = 50
  const cy = 50

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      {/* spokes: node → center */}
      {nodes.map((n, i) => {
        const isActive = activeLabel === n.label
        return (
          <motion.line
            key={`spoke-${i}`}
            x1={n.x}
            y1={n.y}
            x2={cx}
            y2={cy}
            stroke={isActive ? 'rgba(229,57,53,0.95)' : 'rgba(229,57,53,0.35)'}
            strokeWidth={isActive ? 0.6 : 0.3}
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.18,
            }}
          />
        )
      })}
      {/* ring: each node → next node (closing the loop) */}
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % nodes.length]
        const isActive =
          activeLabel === n.label || activeLabel === next.label
        return (
          <motion.line
            key={`ring-${i}`}
            x1={n.x}
            y1={n.y}
            x2={next.x}
            y2={next.y}
            stroke={
              isActive ? 'rgba(255,107,99,0.75)' : 'rgba(255,255,255,0.12)'
            }
            strokeWidth={isActive ? 0.4 : 0.2}
            strokeDasharray="1.5 1.5"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
          />
        )
      })}
    </svg>
  )
}

/* ===================================================================
   IdentityCore — central pulsing red identity mark.
   =================================================================== */
function IdentityCore() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      {/* morphing identity mark (smaller variant of AuraVisual core) */}
      <motion.div
        className="relative h-20 w-20 sm:h-24 sm:w-24"
        animate={{
          borderRadius: ['24%', '50%', '46%', '50%', '24%'],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          border: '1px solid rgba(229,57,53,0.55)',
          background:
            'radial-gradient(circle, rgba(229,57,53,0.18), transparent 72%)',
        }}
      />
      {/* dashed counter-rotating ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ border: '1px dashed rgba(255,255,255,0.20)' }}
      />
      {/* pulsing red core */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow:
            '0 0 18px rgba(229,57,53,0.95), 0 0 40px rgba(229,57,53,0.5)',
        }}
      />
    </div>
  )
}

/* ===================================================================
   AuraWhatIs — Section 3 default export
   =================================================================== */
export default function AuraWhatIs() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // nodes fade in as formation organizes
  const nodesOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1])
  const nodesRotate = useTransform(scrollYProgress, [0, 1], [-20, 20])

  // hover state (active node label)
  const [activeLabel, setActiveLabel] = useState<string | null>(null)

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#050505]/70 px-5 py-24 backdrop-blur-sm sm:px-8 sm:py-32 lg:py-40"
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

        {/* Massive headline — lowercase watNidea preserved */}
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

        {/* Body (verbatim Aura desc) */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          We define your brand soul, positioning, and visual DNA to create a
          powerful identity that stands out with purpose and clarity.
        </motion.p>

        {/* Secondary line */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 text-2xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-3xl md:text-4xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            Everything starts with <RedGradientText glow={false}>identity.</RedGradientText>
          </MaskLine>
        </motion.h3>

        {/* Split: 5 identity elements list (left) + ecosystem (right) */}
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* ---------- LEFT: 5 identity elements list ---------- */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#E53935]/60" />
              <span className="wn-eyebrow text-[11px] font-medium text-white/55 sm:text-xs">
                Five Elements Of Identity
              </span>
            </motion.div>

            <div className="space-y-3">
              {elements.map((e, i) => {
                const isActive = activeLabel === e.label
                return (
                  <motion.div
                    key={e.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-8%' }}
                    transition={{
                      duration: 0.55,
                      delay: 0.05 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onPointerEnter={() => setActiveLabel(e.label)}
                    onPointerLeave={() => setActiveLabel(null)}
                    className="group cursor-pointer"
                  >
                    <div
                      className="flex items-start gap-4 rounded-xl border px-4 py-3.5 backdrop-blur-md transition-all duration-300"
                      style={{
                        borderColor: isActive
                          ? 'rgba(229,57,53,0.55)'
                          : 'rgba(255,255,255,0.08)',
                        background: isActive
                          ? 'rgba(229,57,53,0.06)'
                          : 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <span
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${
                          isActive
                            ? 'border-[#E53935]/60 bg-[#E53935]/15 text-[#ff6b63]'
                            : 'border-white/10 bg-white/[0.03] text-white/55'
                        }`}
                      >
                        <e.Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-3">
                          <span
                            className="text-[11px] font-bold text-[#E53935]"
                            style={{ fontFamily: 'var(--font-display), sans-serif' }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <h4
                            className="text-base font-semibold text-white sm:text-lg"
                            style={{ fontFamily: 'var(--font-display), sans-serif' }}
                          >
                            {e.label}
                          </h4>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-white/55">
                          {e.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-7 text-xs text-white/40 sm:text-sm"
            >
              Hover any element to trace its energy through the identity ecosystem.
            </motion.p>
          </div>

          {/* ---------- RIGHT: identity ecosystem that organizes into a ring ---------- */}
          <div className="relative">
            <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <EcosystemCanvas progress={scrollYProgress} />

              {/* Energy streams (always behind nodes) */}
              <motion.div
                style={{ opacity: nodesOpacity }}
                className="pointer-events-none absolute inset-0"
              >
                <EnergyStreams activeLabel={activeLabel} />
              </motion.div>

              {/* Central identity core */}
              <motion.div
                style={{ opacity: nodesOpacity }}
                className="pointer-events-none absolute inset-0"
              >
                <IdentityCore />
              </motion.div>

              {/* 5 labeled identity nodes appear around the formation */}
              <motion.div
                style={{ opacity: nodesOpacity, rotate: nodesRotate }}
                className="absolute inset-0"
              >
                {elements.map((el) => (
                  <IdentityNode
                    key={el.label}
                    element={el}
                    active={activeLabel === el.label}
                    onHover={setActiveLabel}
                    onLeave={() => setActiveLabel(null)}
                  />
                ))}
              </motion.div>

              {/* corner labels */}
              <div className="pointer-events-none absolute left-4 top-4 wn-eyebrow text-[10px] text-white/45">
                Identity Ecosystem
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 text-[10px] text-white/30">
                Positioning · Voice · Visual · Story · Perception
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
