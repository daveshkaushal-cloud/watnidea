'use client'

/**
 * HypeHero — Section 1 of /the-hype-engine
 *
 * A LIVING SOCIAL ECOSYSTEM — cinematic hero where the brand's "Hype Engine"
 * pulses behind the copy. Floating glass content chips (posts, comments,
 * shares, hearts, trends, communities) drift across mouse-reactive layers;
 * canvas particles drift in red + orange + pink; SVG content streams flow
 * under ascending sparklines.
 *
 * Composition:
 *   - Eyebrow: (01) · Social Media Marketing
 *   - Service label: The Hype Engine (red) + "03 / 07"
 *   - Headline: "We Engineer" + "Attention." (MaskLine, accent red)
 *   - Descriptor: verbatim Hype Engine description
 *   - CTAs: MagneticButton primary "Book Strategy Call" + secondary
 *     "Explore Our Work"
 *   - Living ecosystem visual (behind content, mouse-reactive):
 *       floating glass content chips + SVG streams + sparklines + particles
 *   - Scroll indicator (ChevronDown bobbing, red)
 *   - Side label (lg only, vertical): The Hype Engine
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
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Hash,
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import MagneticButton from '@/components/hero/magnetic-button'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  useCursorParallax,
} from '@/components/about/shared'

/* ===================================================================
   Social content chip data — abstract representations of feed items.
   Each has a position (%), drift params, icon, color accent, and a
   short micro-content payload (avatar hue + label / count).
   =================================================================== */
type ChipKind = 'post' | 'comment' | 'heart' | 'share' | 'repeat' | 'trend' | 'hash' | 'community'

type Chip = {
  kind: ChipKind
  Icon: LucideIcon
  // viewport-relative position (%)
  left: string
  top: string
  // float duration / delay
  dur: number
  delay: number
  // accent: 'red' | 'orange' | 'pink' | 'white'
  accent: 'red' | 'orange' | 'pink' | 'white'
  // micro-content
  label: string
  meta?: string
}

const chips: Chip[] = [
  {
    kind: 'post',
    Icon: MessageCircle,
    left: '8%',
    top: '22%',
    dur: 9,
    delay: 0,
    accent: 'red',
    label: 'New drop tomorrow',
    meta: '@studio',
  },
  {
    kind: 'heart',
    Icon: Heart,
    left: '16%',
    top: '62%',
    dur: 7,
    delay: 0.6,
    accent: 'pink',
    label: '+1.2K',
    meta: 'likes',
  },
  {
    kind: 'trend',
    Icon: TrendingUp,
    left: '24%',
    top: '38%',
    dur: 10,
    delay: 1.2,
    accent: 'orange',
    label: '+340%',
    meta: '#brandlaunch',
  },
  {
    kind: 'community',
    Icon: Users,
    left: '12%',
    top: '80%',
    dur: 11,
    delay: 0.3,
    accent: 'red',
    label: '12.4K',
    meta: 'members',
  },
  {
    kind: 'comment',
    Icon: MessageCircle,
    left: '78%',
    top: '24%',
    dur: 8.5,
    delay: 0.9,
    accent: 'white',
    label: 'this is fire',
    meta: '@fan',
  },
  {
    kind: 'share',
    Icon: Share2,
    left: '86%',
    top: '58%',
    dur: 9.5,
    delay: 1.5,
    accent: 'orange',
    label: '284',
    meta: 'shares',
  },
  {
    kind: 'repeat',
    Icon: Repeat2,
    left: '72%',
    top: '78%',
    dur: 10.5,
    delay: 0.4,
    accent: 'pink',
    label: '92',
    meta: 'reposts',
  },
  {
    kind: 'hash',
    Icon: Hash,
    left: '90%',
    top: '40%',
    dur: 7.5,
    delay: 1.8,
    accent: 'red',
    label: '#hypeengine',
    meta: 'trending',
  },
]

const ACCENT_RING: Record<Chip['accent'], string> = {
  red: 'border-[#E53935]/40 text-[#ff6b63]',
  orange: 'border-[#F97316]/40 text-[#F97316]',
  pink: 'border-[#EC4899]/40 text-[#EC4899]',
  white: 'border-white/25 text-white/80',
}

const ACCENT_DOT: Record<Chip['accent'], string> = {
  red: 'bg-[#E53935]',
  orange: 'bg-[#F97316]',
  pink: 'bg-[#EC4899]',
  white: 'bg-white/70',
}

/* ===================================================================
   LivingEcosystem — mouse-reactive layered ecosystem visual.
   (bg blobs → mid SVG streams + sparklines → fg floating chips → canvas)
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
      {/* === BACKGROUND layer: red + orange + pink gradient blobs === */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <motion.div
          className="absolute left-[10%] top-[14%] h-[40vw] w-[40vw] max-h-[480px] max-w-[480px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(229,57,53,0.16), rgba(229,57,53,0.06) 40%, rgba(229,57,53,0) 70%)',
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
              'radial-gradient(circle at 60% 40%, rgba(249,115,22,0.16), rgba(249,115,22,0.06) 50%, rgba(249,115,22,0) 75%)',
            filter: 'blur(34px)',
          }}
          animate={{
            scale: [1, 1.18, 0.94, 1],
            rotate: [0, -32, 14, 0],
            borderRadius: ['50%', '38%', '58%', '50%'],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[22%] top-[16%] h-[26vw] w-[26vw] max-h-[320px] max-w-[320px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(236,72,153,0.14), rgba(236,72,153,0.05) 50%, rgba(236,72,153,0) 75%)',
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

      {/* === MID layer: SVG content streams (flowing red/orange) + sparklines === */}
      <motion.div style={{ x: mdX, y: mdY }} className="absolute inset-0">
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="hype-stream-red" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(229,57,53,0)" />
              <stop offset="50%" stopColor="rgba(229,57,53,0.65)" />
              <stop offset="100%" stopColor="rgba(229,57,53,0)" />
            </linearGradient>
            <linearGradient id="hype-stream-orange" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(249,115,22,0)" />
              <stop offset="50%" stopColor="rgba(249,115,22,0.55)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0)" />
            </linearGradient>
            <linearGradient id="hype-stream-pink" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(236,72,153,0)" />
              <stop offset="50%" stopColor="rgba(236,72,153,0.55)" />
              <stop offset="100%" stopColor="rgba(236,72,153,0)" />
            </linearGradient>
          </defs>

          {/* flowing content streams */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.path
              key={`stream-${i}`}
              d={`M-20,${160 + i * 140} C320,${60 + i * 140} 720,${260 + i * 140} 1220,${100 + i * 140}`}
              fill="none"
              stroke={
                i % 3 === 0
                  ? 'url(#hype-stream-orange)'
                  : i % 3 === 1
                    ? 'url(#hype-stream-pink)'
                    : 'url(#hype-stream-red)'
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
              style={{ filter: 'drop-shadow(0 0 5px rgba(229,57,53,0.45))' }}
            />
          ))}

          {/* ascending sparklines (trend visualizations) */}
          {[
            { x: 90, y: 640, w: 160, h: 80, color: 'rgba(229,57,53,0.85)' },
            { x: 940, y: 540, w: 200, h: 100, color: 'rgba(249,115,22,0.8)' },
            { x: 480, y: 720, w: 140, h: 60, color: 'rgba(236,72,153,0.75)' },
          ].map((s, i) => {
            // build an ascending polyline (5 points, climbing)
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
        </svg>
      </motion.div>

      {/* === FOREGROUND layer: floating glass content chips === */}
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
              style={{
                boxShadow:
                  c.accent === 'red'
                    ? '0 0 24px rgba(229,57,53,0.18)'
                    : c.accent === 'orange'
                      ? '0 0 24px rgba(249,115,22,0.18)'
                      : c.accent === 'pink'
                        ? '0 0 24px rgba(236,72,153,0.18)'
                        : '0 0 18px rgba(255,255,255,0.08)',
              }}
            >
              <span
                className={
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ' +
                  ACCENT_RING[c.accent]
                }
              >
                <c.Icon className="h-3.5 w-3.5" />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-semibold text-white">
                  {c.label}
                </span>
                {c.meta && (
                  <span className="text-[9px] text-white/45">{c.meta}</span>
                )}
              </div>
              {c.kind === 'heart' || c.kind === 'share' || c.kind === 'repeat' ? (
                <span
                  className={'ml-1 h-1.5 w-1.5 rounded-full ' + ACCENT_DOT[c.accent]}
                />
              ) : null}
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

      {/* === Canvas particles (drifting red + orange + pink, additive glow) === */}
      <EcosystemCanvas />
    </div>
  )
}

/* ===================================================================
   EcosystemCanvas — drifting red/orange/pink particles with additive glow.
   HMR-safe via __cleanup on the canvas element. Reduced-motion guard.
   =================================================================== */
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
          // 0 = white, 1 = red, 2 = orange, 3 = pink
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
              roll < 0.32 ? 1 : roll < 0.58 ? 2 : roll < 0.74 ? 3 : 0
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
                ? 'rgba(229,57,53,0.55)'
                : p.hue === 2
                  ? 'rgba(249,115,22,0.5)'
                  : 'rgba(236,72,153,0.5)'
            const fade =
              p.hue === 1
                ? 'rgba(229,57,53,0)'
                : p.hue === 2
                  ? 'rgba(249,115,22,0)'
                  : 'rgba(236,72,153,0)'
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
   HypeHero — Section 1 named export
   =================================================================== */
export function HypeHero() {
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
      aria-label="The Hype Engine — Hero"
    >
      <LivingEcosystem sx={sx} sy={sy} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-40 mx-auto w-full max-w-7xl"
      >
        {/* Eyebrow — (01) · Social Media Marketing */}
        <motion.div style={{ y: eyebrowY }}>
          <SectionEyebrow number="01" label="Social Media Marketing" />
        </motion.div>

        {/* Service label — The Hype Engine (red, small) + 03 / 07 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 flex items-center gap-3"
        >
          <span className="wn-eyebrow text-[11px] font-semibold text-[#E53935] sm:text-xs">
            The Hype Engine
          </span>
          <span className="hidden h-px w-12 bg-gradient-to-r from-[#E53935]/60 to-transparent sm:block" />
          <span className="hidden text-[10px] text-white/40 sm:inline">
            03 / 07
          </span>
        </motion.div>

        {/* Massive headline — 2 lines, MaskLine reveal, accent words red */}
        <h2
          className="mt-7 text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">We Engineer</span>
          </MaskLine>
          <MaskLine delay={0.12}>
            <RedGradientText>Attention.</RedGradientText>
          </MaskLine>
        </h2>

        {/* Descriptor — verbatim Hype Engine description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
        >
          We engineer conversations, trends, and communities that turn your
          audience into a loyal brand tribe.
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
                'from-[#F97316] to-[#7a1414]',
                'from-[#EC4899] to-[#E53935]',
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
        The Hype Engine
      </div>
    </section>
  )
}
