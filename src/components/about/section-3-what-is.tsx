'use client'

/**
 * AboutWhatIs — Section 3
 * Full-screen storytelling where identity becomes visible.
 *
 * Visual concept — "particles organize into a recognizable ecosystem":
 *   Particles start scattered/random, then as you scroll they organize into
 *   a structured orbit formation representing Strategy + Creativity +
 *   Technology + Growth. 4 labeled nodes appear around the formation.
 *
 * Scroll-driven: useScroll → particles move from random positions to
 * organized positions.
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import {
  ArrowUpRight,
  Bot,
  Fingerprint,
  MousePointerClick,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { SectionEyebrow, MaskLine, RedGradientText } from './shared'

/* ===================================================================
   Content — verbatim copy from the spec.
   =================================================================== */
const paragraphs = [
  {
    strong: 'WatNidea',
    rest: ' was created to bridge the gap between branding, marketing, technology, and storytelling.',
  },
  {
    strong: '',
    rest: 'We help businesses build identities people remember, create digital experiences customers love, and launch campaigns that generate measurable growth.',
  },
  {
    strong: '',
    rest: 'Whether you\u2019re launching something new or scaling something established, we create systems designed for long-term impact.',
  },
]

type Card = {
  num: string
  title: string
  desc: string
  Icon: LucideIcon
  accent: boolean
}

const cards: Card[] = [
  {
    num: '01',
    title: 'Brand Identity',
    desc: 'Create a memorable foundation for your business.',
    Icon: Fingerprint,
    accent: true,
  },
  {
    num: '02',
    title: 'Digital Experiences',
    desc: 'Websites designed to convert attention into action.',
    Icon: MousePointerClick,
    accent: false,
  },
  {
    num: '03',
    title: 'Growth Systems',
    desc: 'Marketing engines built to scale.',
    Icon: TrendingUp,
    accent: false,
  },
  {
    num: '04',
    title: 'AI-Powered Content',
    desc: 'Faster production. Bigger impact.',
    Icon: Bot,
    accent: true,
  },
]

const nodes = [
  { label: 'Strategy', angle: 0 },
  { label: 'Creativity', angle: 90 },
  { label: 'Technology', angle: 180 },
  { label: 'Growth', angle: 270 },
]

/* ===================================================================
   HighlightCard — reusing the established card pattern.
   =================================================================== */
function HighlightCard({ card, index }: { card: Card; index: number }) {
  const { num, title, desc, Icon, accent } = card
  return (
    <motion.article
      data-cursor="View"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 5 + index * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4,
        }}
        className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-md transition-colors duration-300 group-hover:border-[#E53935]/50 group-hover:bg-white/[0.07] sm:p-6"
      >
        {/* hover glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(120% 120% at 100% 0%, rgba(229,57,53,0.16), transparent 60%)',
          }}
        />

        {/* number + icon */}
        <div className="relative z-10 mb-5 flex items-center justify-between">
          <span
            className={`text-2xl font-bold ${
              accent
                ? 'bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent'
                : 'text-white/30'
            }`}
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {num}
          </span>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300 ${
              accent
                ? 'border-[#E53935]/40 bg-[#E53935]/10 text-[#ff6b63]'
                : 'border-white/10 bg-white/[0.05] text-white/55 group-hover:border-white/30 group-hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
        </div>

        <h3
          className="relative z-10 text-base font-semibold text-white sm:text-lg"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {title}
        </h3>
        <p className="relative z-10 mt-1.5 text-sm leading-relaxed text-white/55">
          {desc}
        </p>

        {/* arrow on hover */}
        <div className="relative z-10 mt-4 flex items-center gap-1.5 text-xs font-medium text-[#E53935] opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>Explore</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* bottom accent line */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-transparent transition-all duration-500 group-hover:w-full"
        />
      </motion.div>
    </motion.article>
  )
}

/* ===================================================================
   EcosystemCanvas — particle system that organizes into a ring formation
   as the user scrolls. progress (0→1) drives scatter → organized.
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
          const n = reduce ? 0 : 80
          const cx = w / 2
          const cy = h / 2
          const radius = Math.min(w, h) * 0.36
          for (let i = 0; i < n; i++) {
            const angle = (i / n) * Math.PI * 2
            ps.push({
              sx: Math.random() * w,
              sy: Math.random() * h,
              ox: cx + Math.cos(angle) * radius,
              oy: cy + Math.sin(angle) * radius,
              r: Math.random() * 1.6 + 0.4,
              red: Math.random() < 0.28,
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

            const radius = pt.red ? 10 : pt.r * 2
            const g = ctx.createRadialGradient(px, py, 0, px, py, radius)
            if (pt.red) {
              const a = 0.45 * (0.6 + 0.4 * ep)
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
   AboutWhatIs — Section 3 default export
   =================================================================== */
export default function AboutWhatIs() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // nodes fade in as formation organizes
  const nodesOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1])
  // nodes label rotation for orbit effect
  const nodesRotate = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#141414]/70 px-5 py-24 backdrop-blur-sm sm:px-8 sm:py-32 lg:py-40"
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
        <SectionEyebrow number="03" label="What Is WatNidea" />

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
        <div className="mt-10 max-w-3xl space-y-2">
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
              <span className="text-white/85"> that</span>
            </MaskLine>
            <MaskLine delay={0.1}>
              <span className="text-white/85">makes brands </span>
              <RedGradientText>impossible to ignore.</RedGradientText>
            </MaskLine>
          </h3>

          <h3
            className="text-2xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine delay={0.2}>
              <span className="text-white/85">
                Every strategy, every visual, and every campaign is built to
                trigger one reaction:{' '}
              </span>
              <span className="text-white">&ldquo;What an </span>
              <RedGradientText>idea!</RedGradientText>
              <span className="text-white">&rdquo;</span>
            </MaskLine>
          </h3>
        </div>

        {/* Split: body paragraphs (left) + particle ecosystem (right) */}
        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* LEFT: body paragraphs */}
          <div className="max-w-xl space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-base leading-relaxed text-white/65 sm:text-lg"
              >
                {p.strong && (
                  <span className="font-semibold text-white">{p.strong}</span>
                )}
                {p.rest}
              </motion.p>
            ))}
          </div>

          {/* RIGHT: particle ecosystem that organizes into a ring */}
          <div className="relative">
            <div className="relative h-[60vh] min-h-[400px] overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A]/80">
              <EcosystemCanvas progress={scrollYProgress} />

              {/* 4 labeled nodes appear around the formation */}
              <motion.div
                style={{ opacity: nodesOpacity }}
                className="pointer-events-none absolute inset-0"
              >
                <motion.div
                  style={{ rotate: nodesRotate }}
                  className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2"
                >
                  {nodes.map((n) => {
                    const rad = (n.angle * Math.PI) / 180
                    const x = 50 + Math.cos(rad) * 50
                    const y = 50 + Math.sin(rad) * 50
                    return (
                      <div
                        key={n.label}
                        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#E53935]"
                          style={{
                            boxShadow:
                              '0 0 10px rgba(229,57,53,0.9), 0 0 24px rgba(229,57,53,0.5)',
                          }}
                        />
                        <span className="wn-eyebrow text-[9px] font-medium text-white/70 sm:text-[10px]">
                          {n.label}
                        </span>
                      </div>
                    )
                  })}
                </motion.div>
              </motion.div>

              {/* corner labels */}
              <div className="pointer-events-none absolute left-4 top-4 wn-eyebrow text-[10px] text-white/45">
                Identity Ecosystem
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 text-[10px] text-white/30">
                Strategy · Creativity · Technology · Growth
              </div>
            </div>
          </div>
        </div>

        {/* 4 highlight cards */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <HighlightCard key={card.num} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
