'use client'

/**
 * GrowthHero — Section 1 of /growth-alchemy
 *
 * A LIVING GROWTH ENGINE — cinematic hero where a Bloomberg-terminal-meets-
 * Apple-design command center pulses behind the copy. Floating glass
 * "capability chips" (Paid search, Funnels, Attribution, Dashboards…)
 * drift across mouse-reactive layers; canvas particles drift in emerald
 * + neon-green + white; SVG data streams flow under ascending sparklines.
 *
 * Composition:
 *   - Eyebrow: (01) · Performance Marketing (GreenEyebrow)
 *   - Service label: Growth Alchemy (emerald) + "05 / 07"
 *   - Headline: "Turn Clicks Into" + "Revenue." (MaskLine, emerald gradient)
 *   - Descriptor: verbatim Growth Alchemy description
 *   - CTAs: GreenMagneticButton primary "Book Strategy Call" + secondary
 *     "Explore Our Work"
 *   - Living growth engine visual (behind content, mouse-reactive):
 *       floating glass metric chips + SVG data streams + sparklines + particles
 *   - Scroll indicator (ChevronDown bobbing, emerald)
 *   - Side label (lg only, vertical): Growth Alchemy
 *
 * Scroll parallax: content fades + moves up as you scroll past.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Canvas uses the HMR-safe __cleanup pattern.
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  DollarSign,
  Target,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  GreenEyebrow,
  GreenGradientText,
  GreenMagneticButton,
  MaskLine,
  useCursorParallax,
} from '@/components/growth/shared'

/* ===================================================================
   Metric chip data — honest, non-numeric capability labels.
   Each has a position (%), drift params, icon and a capability label.
   No invented revenue, ROAS, leads or growth numbers — final values
   are rendered as plain strings, never animated 0→number.
   =================================================================== */
type ChipKind =
  | 'roas'
  | 'cpl'
  | 'ctr'
  | 'revenue'
  | 'leads'
  | 'conversions'

type Chip = {
  kind: ChipKind
  Icon: LucideIcon
  left: string
  top: string
  dur: number
  delay: number
  // accent: 'emerald' | 'neon' | 'deep' | 'white'
  accent: 'emerald' | 'neon' | 'deep' | 'white'
  label: string
}

const chips: Chip[] = [
  { kind: 'roas', Icon: TrendingUp, left: '8%', top: '22%', dur: 9, delay: 0, accent: 'emerald', label: 'Paid search' },
  { kind: 'revenue', Icon: DollarSign, left: '15%', top: '62%', dur: 7.5, delay: 0.6, accent: 'neon', label: 'Funnels' },
  { kind: 'ctr', Icon: Target, left: '24%', top: '40%', dur: 10, delay: 1.2, accent: 'deep', label: 'Attribution' },
  { kind: 'leads', Icon: Users, left: '12%', top: '80%', dur: 11, delay: 0.3, accent: 'emerald', label: 'Landing pages' },
  { kind: 'conversions', Icon: Activity, left: '78%', top: '24%', dur: 8.5, delay: 0.9, accent: 'neon', label: 'CRO' },
  { kind: 'cpl', Icon: Zap, left: '86%', top: '58%', dur: 9.5, delay: 1.5, accent: 'emerald', label: 'Retargeting' },
  { kind: 'roas', Icon: TrendingUp, left: '72%', top: '78%', dur: 10.5, delay: 0.4, accent: 'deep', label: 'Creative testing' },
  { kind: 'revenue', Icon: DollarSign, left: '90%', top: '40%', dur: 7.5, delay: 1.8, accent: 'neon', label: 'Dashboards' },
]

const ACCENT_RING: Record<Chip['accent'], string> = {
  emerald: 'border-[#10B981]/45 text-[#6ee7b7]',
  neon: 'border-[#6ee7b7]/50 text-[#6ee7b7]',
  deep: 'border-[#047857]/55 text-[#34d399]',
  white: 'border-white/25 text-white/80',
}

const ACCENT_DOT: Record<Chip['accent'], string> = {
  emerald: 'bg-[#10B981]',
  neon: 'bg-[#6ee7b7]',
  deep: 'bg-[#047857]',
  white: 'bg-white/70',
}

const ACCENT_GLOW: Record<Chip['accent'], string> = {
  emerald: '0 0 24px rgba(16,185,129,0.22)',
  neon: '0 0 26px rgba(110,231,183,0.28)',
  deep: '0 0 22px rgba(4,120,87,0.28)',
  white: '0 0 18px rgba(255,255,255,0.08)',
}

/* ===================================================================
   LivingGrowthEngine — mouse-reactive layered visual.
   (bg emerald + deep-green + red blobs → mid SVG data streams +
   ascending sparklines → fg floating metric chips → canvas particles)
   Accepts sx/sy (springs from useCursorParallax) for depth parallax.
   =================================================================== */
function LivingGrowthEngine({
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
      {/* === BACKGROUND layer: emerald + deep-green + touch of red blobs === */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <motion.div
          className="absolute left-[10%] top-[14%] h-[40vw] w-[40vw] max-h-[480px] max-w-[480px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(16,185,129,0.20), rgba(16,185,129,0.06) 40%, rgba(16,185,129,0) 70%)',
            filter: 'blur(30px)',
          }}
          animate={{
            scale: [1, 1.12, 0.96, 1],
            rotate: [0, 28, -16, 0],
            borderRadius: ['42%', '60%', '46%', '42%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[12%] right-[8%] h-[34vw] w-[34vw] max-h-[420px] max-w-[420px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 60% 40%, rgba(4,120,87,0.22), rgba(4,120,87,0.08) 50%, rgba(4,120,87,0) 75%)',
            filter: 'blur(34px)',
          }}
          animate={{
            scale: [1, 1.18, 0.94, 1],
            rotate: [0, -32, 14, 0],
            borderRadius: ['50%', '38%', '58%', '50%'],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* touch of red — supporting accent only */}
        <motion.div
          className="absolute right-[22%] top-[16%] h-[24vw] w-[24vw] max-h-[300px] max-w-[300px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.13), rgba(229,57,53,0.04) 50%, rgba(229,57,53,0) 75%)',
            filter: 'blur(36px)',
          }}
          animate={{
            scale: [1, 1.22, 0.9, 1],
            rotate: [0, 22, -18, 0],
            borderRadius: ['46%', '54%', '40%', '46%'],
          }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* === MID layer: SVG data streams (emerald/neon flowing) + sparklines === */}
      <motion.div style={{ x: mdX, y: mdY }} className="absolute inset-0">
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="growth-stream-emerald" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(16,185,129,0)" />
              <stop offset="50%" stopColor="rgba(16,185,129,0.7)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0)" />
            </linearGradient>
            <linearGradient id="growth-stream-neon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(110,231,183,0)" />
              <stop offset="50%" stopColor="rgba(110,231,183,0.6)" />
              <stop offset="100%" stopColor="rgba(110,231,183,0)" />
            </linearGradient>
            <linearGradient id="growth-stream-deep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(4,120,87,0)" />
              <stop offset="50%" stopColor="rgba(4,120,87,0.6)" />
              <stop offset="100%" stopColor="rgba(4,120,87,0)" />
            </linearGradient>
          </defs>

          {/* flowing data streams */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.path
              key={`stream-${i}`}
              d={`M-20,${160 + i * 140} C320,${60 + i * 140} 720,${260 + i * 140} 1220,${100 + i * 140}`}
              fill="none"
              stroke={
                i % 3 === 0
                  ? 'url(#growth-stream-neon)'
                  : i % 3 === 1
                    ? 'url(#growth-stream-deep)'
                    : 'url(#growth-stream-emerald)'
              }
              strokeWidth={1.6 - i * 0.12}
              strokeLinecap="round"
              animate={{
                d: [
                  `M-20,${160 + i * 140} C320,${60 + i * 140} 720,${260 + i * 140} 1220,${100 + i * 140}`,
                  `M-20,${160 + i * 140} C320,${260 + i * 140} 720,${60 + i * 140} 1220,${100 + i * 140}`,
                  `M-20,${160 + i * 140} C320,${60 + i * 140} 720,${260 + i * 140} 1220,${100 + i * 140}`,
                ],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ filter: 'drop-shadow(0 0 5px rgba(16,185,129,0.55))' }}
            />
          ))}

          {/* ascending sparklines (growth charts) */}
          {[
            { x: 90, y: 640, w: 160, h: 80, color: 'rgba(16,185,129,0.9)' },
            { x: 940, y: 540, w: 200, h: 100, color: 'rgba(110,231,183,0.8)' },
            { x: 480, y: 720, w: 140, h: 60, color: 'rgba(4,120,87,0.85)' },
          ].map((s, i) => {
            const pts = Array.from({ length: 5 }, (_, k) => {
              const px = s.x + (k / 4) * s.w
              const climb = (k / 4) * s.h
              const wobble = Math.sin(k * 1.3 + i) * 8
              const py = s.y - climb + wobble
              return `${Math.round(px * 1000) / 1000},${Math.round(py * 1000) / 1000}`
            }).join(' ')
            return (
              <motion.polyline
                key={`spark-${i}`}
                points={pts}
                fill="none"
                stroke={s.color}
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0.7, 1] }}
                transition={{
                  pathLength: { duration: 2.2, delay: 0.8 + i * 0.4, ease: 'easeOut' },
                  opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
                style={{ filter: `drop-shadow(0 0 6px ${s.color})` }}
              />
            )
          })}

          {/* emerald area fills under sparklines (climbing growth shape) */}
          {[
            { x: 90, y: 640, w: 160, h: 80 },
            { x: 940, y: 540, w: 200, h: 100 },
          ].map((s, i) => {
            const pts = Array.from({ length: 5 }, (_, k) => {
              const px = s.x + (k / 4) * s.w
              const climb = (k / 4) * s.h
              const wobble = Math.sin(k * 1.3 + i) * 8
              const py = s.y - climb + wobble
              return `${Math.round(px * 1000) / 1000},${Math.round(py * 1000) / 1000}`
            }).join(' ')
            return (
              <polygon
                key={`area-${i}`}
                points={`${pts} ${Math.round((s.x + s.w) * 1000) / 1000},${s.y} ${s.x},${s.y}`}
                fill="rgba(16,185,129,0.08)"
              />
            )
          })}
        </svg>
      </motion.div>

      {/* === FOREGROUND layer: floating glass metric chips === */}
      <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0">
        {chips.map((c, i) => (
          <motion.div
            key={`chip-${i}`}
            className="absolute"
            style={{ left: c.left, top: c.top }}
            animate={{ y: [0, -16, 0], rotate: [0, 2.5, 0] }}
            transition={{
              duration: c.dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: c.delay,
            }}
          >
            <div
              className={
                'flex items-center gap-2.5 rounded-xl border bg-white/[0.035] px-3 py-2 backdrop-blur-xl ' +
                ACCENT_RING[c.accent]
              }
              style={{ boxShadow: ACCENT_GLOW[c.accent] }}
            >
              <span
                className={
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ' +
                  ACCENT_RING[c.accent]
                }
              >
                <c.Icon className="h-3.5 w-3.5" />
              </span>
              <span className="text-[11px] font-semibold text-white/90">
                {c.label}
              </span>
              <span
                className={
                  'h-1.5 w-1.5 rounded-full ' + ACCENT_DOT[c.accent]
                }
                style={{ boxShadow: '0 0 6px rgba(110,231,183,0.9)' }}
              />
            </div>
          </motion.div>
        ))}

        {/* small chrome dots — energy particles in foreground */}
        {[
          { l: '32%', t: '44%', d: 0 },
          { l: '68%', t: '62%', d: 1.4 },
          { l: '82%', t: '18%', d: 2.2 },
          { l: '44%', t: '72%', d: 0.8 },
          { l: '58%', t: '28%', d: 1.6 },
        ].map((p, i) => (
          <motion.span
            key={`dot-${i}`}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#6ee7b7]"
            style={{
              left: p.l,
              top: p.t,
              boxShadow:
                '0 0 10px rgba(110,231,183,0.95), 0 0 24px rgba(16,185,129,0.55)',
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

      {/* === Canvas particles (drifting emerald + neon + white, additive glow) === */}
      <EngineCanvas />
    </div>
  )
}

/* ===================================================================
   EngineCanvas — drifting emerald/neon/white particles with additive glow.
   HMR-safe via __cleanup on the canvas element. Reduced-motion guard.
   =================================================================== */
function EngineCanvas() {
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
          // 0 = white, 1 = emerald, 2 = neon, 3 = deep-green
          hue: 0 | 1 | 2 | 3
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
          const n = reduce ? 0 : Math.min(64, Math.floor((w * h) / 22000))
          for (let i = 0; i < n; i++) {
            const roll = Math.random()
            const hue: P['hue'] =
              roll < 0.4 ? 1 : roll < 0.7 ? 2 : roll < 0.85 ? 3 : 0
            ps.push({
              x: Math.random() * w,
              y: Math.random() * h,
              vx: (Math.random() - 0.5) * 0.14,
              vy: (Math.random() - 0.5) * 0.14,
              r: Math.random() * 1.6 + 0.4,
              hue,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          const t = performance.now() / 1000

          // colored particles (additive glow)
          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
            if (p.hue === 0) continue
            const px = p.x + Math.sin(t * 0.55 + p.phase) * 5
            const py = p.y + Math.cos(t * 0.45 + p.phase) * 5
            const g = ctx.createRadialGradient(px, py, 0, px, py, 12)
            const color =
              p.hue === 1
                ? 'rgba(16,185,129,0.55)'
                : p.hue === 2
                  ? 'rgba(110,231,183,0.55)'
                  : 'rgba(4,120,87,0.55)'
            const fade =
              p.hue === 1
                ? 'rgba(16,185,129,0)'
                : p.hue === 2
                  ? 'rgba(110,231,183,0)'
                  : 'rgba(4,120,87,0)'
            g.addColorStop(0, color)
            g.addColorStop(1, fade)
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(px, py, 12, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.globalCompositeOperation = 'source-over'

          // white particles
          for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
            if (p.hue !== 0) continue
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
   GrowthHero — Section 1 named export
   =================================================================== */
export function GrowthHero() {
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
      aria-label="Growth Alchemy — Hero"
    >
      <LivingGrowthEngine sx={sx} sy={sy} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-40 mx-auto w-full max-w-7xl"
      >
        {/* Eyebrow — (01) · Performance Marketing */}
        <motion.div style={{ y: eyebrowY }}>
          <GreenEyebrow number="01" label="Performance Marketing" />
        </motion.div>

        {/* Service label — Growth Alchemy (emerald) + 05 / 07 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 flex items-center gap-3"
        >
          <span className="wn-eyebrow text-[11px] font-semibold text-[#10B981] sm:text-xs">
            Growth Alchemy
          </span>
          <span className="hidden h-px w-12 bg-gradient-to-r from-[#10B981]/60 to-transparent sm:block" />
          <span className="hidden text-[10px] text-white/40 sm:inline">
            05 / 07
          </span>
        </motion.div>

        {/* Massive headline — 2 lines, MaskLine reveal, accent words emerald */}
        <h2
          className="mt-7 text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">Turn Clicks Into</span>
          </MaskLine>
          <MaskLine delay={0.12}>
            <GreenGradientText>Revenue.</GreenGradientText>
          </MaskLine>
        </h2>

        {/* Descriptor — verbatim Growth Alchemy description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
        >
          Paid media, landing pages, funnels and analytics — set up as a
          practice you can measure, refine and scale.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <GreenMagneticButton
            variant="primary"
            cursorLabel="Book"
            ariaLabel="Book Strategy Call"
            onClick={() => {}}
          >
            <CalendarDays className="h-4 w-4" />
            Book Strategy Call
          </GreenMagneticButton>
          <GreenMagneticButton
            variant="secondary"
            cursorLabel="Explore"
            ariaLabel="Explore Our Work"
            onClick={() => {}}
          >
            Explore Our Work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </GreenMagneticButton>

          {/* Honest evergreen note — capability framing, no invented metrics */}
          <div className="ml-0 hidden items-center gap-3 sm:ml-4 lg:flex">
            <div className="flex -space-x-2">
              {[
                'from-[#6ee7b7] to-[#047857]',
                'from-[#10B981] to-[#047857]',
                'from-[#34d399] to-[#10B981]',
              ].map((g, i) => (
                <span
                  key={i}
                  className={`h-8 w-8 rounded-full border-2 border-[#141414] bg-gradient-to-br ${g}`}
                />
              ))}
            </div>
            <div className="text-xs leading-tight text-white/60">
              <span className="font-semibold text-white">Now accepting</span>
              <br />
              selected projects
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
          <ChevronDown className="h-4 w-4 text-[#10B981]" />
        </motion.span>
      </motion.div>

      {/* Side label — vertical (lg only) */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.4em] text-white/30 lg:block">
        Growth Alchemy
      </div>
    </section>
  )
}
