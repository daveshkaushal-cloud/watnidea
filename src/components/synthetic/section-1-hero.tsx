'use client'

/**
 * SynthHero — Section 1 of /synthetic-cinema
 *
 * A LIVING AI CINEMATIC UNIVERSE — full-screen hero where a future-first
 * creative production studio pulses behind the copy. Floating glass
 * "scene chips" (Film, Clapperboard, Camera, Sparkles, Wand2, Aperture,
 * Image, Video) drift across mouse-reactive layers; canvas particles drift
 * in purple + violet + magenta + white; SVG "scene generation streams"
 * flow under floating film viewfinder frames (16:9 with corner brackets)
 * and ascending generation-progress sparklines.
 *
 * Composition:
 *   - Eyebrow: (01) · AI Advertising (PurpleEyebrow)
 *   - Service label: Synthetic Cinema (purple) + "06 / 07"
 *   - Headline: "Stories Generated." + "Worlds Released." (MaskLine,
 *     purple gradient + glow on line 2)
 *   - Descriptor: verbatim Synthetic Cinema description
 *   - CTAs: PurpleMagneticButton primary "Book Strategy Call" + secondary
 *     "Explore Our Work"
 *   - Living AI cinematic universe visual (behind content, mouse-reactive):
 *       floating scene chips + SVG scene streams + film viewfinder frames
 *       + sparklines + particles + a subtle "REC" indicator (red brand
 *       accent — used SPARINGLY only on the camera chip)
 *   - Scroll indicator (ChevronDown bobbing, purple)
 *   - Side label (lg only, vertical): Synthetic Cinema
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
  Aperture,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Camera,
  Clapperboard,
  Film,
  Image as ImageIcon,
  Sparkles,
  Video,
  Wand2,
  type LucideIcon,
} from 'lucide-react'
import {
  PurpleEyebrow,
  PurpleGradientText,
  PurpleMagneticButton,
  MaskLine,
  useCursorParallax,
} from '@/components/synthetic/shared'

/* ===================================================================
   Scene chip data — abstract representations of AI-generated scene
   elements. Each has a position (%), drift params, icon, label.
   =================================================================== */
type ChipKind =
  | 'scene'
  | 'take'
  | 'gen'
  | 'render'
  | 'dolly'
  | 'drone'
  | 'closeup'
  | 'wide'

type Chip = {
  kind: ChipKind
  Icon: LucideIcon
  left: string
  top: string
  dur: number
  delay: number
  // accent: 'purple' | 'violet' | 'magenta' | 'deep'
  accent: 'purple' | 'violet' | 'magenta' | 'deep'
  label: string
  // tiny tag (e.g. "01", "v2", "98%")
  tag: string
  // a subtle "REC" red indicator (brand accent) — only on the camera chip
  rec?: boolean
}

const chips: Chip[] = [
  {
    kind: 'scene',
    Icon: Film,
    left: '7%',
    top: '20%',
    dur: 9,
    delay: 0,
    accent: 'purple',
    label: 'Scene',
    tag: '01',
  },
  {
    kind: 'take',
    Icon: Clapperboard,
    left: '15%',
    top: '62%',
    dur: 7.5,
    delay: 0.6,
    accent: 'magenta',
    label: 'Take',
    tag: '03',
  },
  {
    kind: 'gen',
    Icon: Sparkles,
    left: '23%',
    top: '40%',
    dur: 10,
    delay: 1.2,
    accent: 'violet',
    label: 'Gen',
    tag: 'v2',
  },
  {
    kind: 'render',
    Icon: Wand2,
    left: '11%',
    top: '82%',
    dur: 11,
    delay: 0.3,
    accent: 'deep',
    label: 'Render',
    tag: '98%',
  },
  {
    kind: 'dolly',
    Icon: Camera,
    left: '78%',
    top: '22%',
    dur: 8.5,
    delay: 0.9,
    accent: 'purple',
    label: 'Dolly',
    tag: 'REC',
    rec: true,
  },
  {
    kind: 'drone',
    Icon: Video,
    left: '88%',
    top: '56%',
    dur: 9.5,
    delay: 1.5,
    accent: 'magenta',
    label: 'Drone',
    tag: 'auto',
  },
  {
    kind: 'closeup',
    Icon: Aperture,
    left: '72%',
    top: '78%',
    dur: 10.5,
    delay: 0.4,
    accent: 'violet',
    label: 'Close-up',
    tag: 'f/1.4',
  },
  {
    kind: 'wide',
    Icon: ImageIcon,
    left: '90%',
    top: '38%',
    dur: 7.5,
    delay: 1.8,
    accent: 'deep',
    label: 'Wide',
    tag: '16:9',
  },
]

const ACCENT_RING: Record<Chip['accent'], string> = {
  purple: 'border-[#8B5CF6]/45 text-[#a78bfa]',
  violet: 'border-[#a78bfa]/50 text-[#c4b5fd]',
  magenta: 'border-[#d946ef]/50 text-[#e879f9]',
  deep: 'border-[#6d28d9]/55 text-[#a78bfa]',
}

const ACCENT_DOT: Record<Chip['accent'], string> = {
  purple: 'bg-[#8B5CF6]',
  violet: 'bg-[#a78bfa]',
  magenta: 'bg-[#d946ef]',
  deep: 'bg-[#6d28d9]',
}

const ACCENT_GLOW: Record<Chip['accent'], string> = {
  purple: '0 0 24px rgba(139,92,246,0.22)',
  violet: '0 0 26px rgba(167,139,250,0.28)',
  magenta: '0 0 26px rgba(217,70,239,0.28)',
  deep: '0 0 22px rgba(109,40,217,0.28)',
}

/* ===================================================================
   LivingCinematicUniverse — mouse-reactive layered visual.
 *   (bg purple + violet + magenta blobs → mid SVG scene streams +
 *   floating film viewfinder frames + ascending generation sparklines
 *   → fg floating scene chips → canvas particles)
 *   Accepts sx/sy (springs from useCursorParallax) for depth parallax.
 *   =================================================================== */
function LivingCinematicUniverse({
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

  // Pre-compute film viewfinder frame positions (16:9 rectangles)
  // 4 floating frames at various positions + sizes — rounded for hydration safety
  const frames = [
    { x: 110, y: 130, w: 220, h: 124, rot: -8, delay: 0 },
    { x: 820, y: 110, w: 280, h: 158, rot: 6, delay: 0.8 },
    { x: 480, y: 540, w: 200, h: 112, rot: 4, delay: 1.4 },
    { x: 880, y: 540, w: 240, h: 135, rot: -5, delay: 0.4 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* === BACKGROUND layer: purple + violet + touch of red blobs === */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <motion.div
          className="absolute left-[10%] top-[14%] h-[40vw] w-[40vw] max-h-[480px] max-w-[480px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(139,92,246,0.22), rgba(139,92,246,0.06) 40%, rgba(139,92,246,0) 70%)',
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
              'radial-gradient(circle at 60% 40%, rgba(167,139,250,0.22), rgba(167,139,250,0.08) 50%, rgba(167,139,250,0) 75%)',
            filter: 'blur(34px)',
          }}
          animate={{
            scale: [1, 1.18, 0.94, 1],
            rotate: [0, -32, 14, 0],
            borderRadius: ['50%', '38%', '58%', '50%'],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* magenta nebula blob — "where films are born" */}
        <motion.div
          className="absolute left-[34%] top-[28%] h-[28vw] w-[28vw] max-h-[360px] max-w-[360px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(217,70,239,0.18), rgba(217,70,239,0.05) 50%, rgba(217,70,239,0) 75%)',
            filter: 'blur(36px)',
          }}
          animate={{
            scale: [1, 1.22, 0.9, 1],
            rotate: [0, 22, -18, 0],
            borderRadius: ['46%', '54%', '40%', '46%'],
          }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* touch of red — supporting accent only */}
        <motion.div
          className="absolute right-[22%] top-[16%] h-[20vw] w-[20vw] max-h-[260px] max-w-[260px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.12), rgba(229,57,53,0.03) 50%, rgba(229,57,53,0) 75%)',
            filter: 'blur(38px)',
          }}
          animate={{
            scale: [1, 1.2, 0.92, 1],
            rotate: [0, 18, -14, 0],
            borderRadius: ['46%', '54%', '40%', '46%'],
          }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* === MID layer: SVG scene streams (purple/magenta flowing) +
           floating film viewfinder frames + sparklines === */}
      <motion.div style={{ x: mdX, y: mdY }} className="absolute inset-0">
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="synth-stream-purple" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(139,92,246,0)" />
              <stop offset="50%" stopColor="rgba(139,92,246,0.7)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </linearGradient>
            <linearGradient id="synth-stream-violet" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(167,139,250,0)" />
              <stop offset="50%" stopColor="rgba(167,139,250,0.6)" />
              <stop offset="100%" stopColor="rgba(167,139,250,0)" />
            </linearGradient>
            <linearGradient id="synth-stream-magenta" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(217,70,239,0)" />
              <stop offset="50%" stopColor="rgba(217,70,239,0.6)" />
              <stop offset="100%" stopColor="rgba(217,70,239,0)" />
            </linearGradient>
          </defs>

          {/* flowing scene generation streams */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.path
              key={`stream-${i}`}
              d={`M-20,${160 + i * 140} C320,${60 + i * 140} 720,${260 + i * 140} 1220,${100 + i * 140}`}
              fill="none"
              stroke={
                i % 3 === 0
                  ? 'url(#synth-stream-violet)'
                  : i % 3 === 1
                    ? 'url(#synth-stream-magenta)'
                    : 'url(#synth-stream-purple)'
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
              style={{ filter: 'drop-shadow(0 0 5px rgba(139,92,246,0.55))' }}
            />
          ))}

          {/* floating film viewfinder frames (16:9 rectangles with corner brackets) */}
          {frames.map((f, i) => {
            const r = 4 // corner bracket length
            const cx1 = f.x
            const cx2 = f.x + f.w
            const cy1 = f.y
            const cy2 = f.y + f.h
            // corner bracket path
            const cornerPath = `M ${cx1 + r} ${cy1} L ${cx1} ${cy1} L ${cx1} ${cy1 + r} M ${cx2 - r} ${cy1} L ${cx2} ${cy1} L ${cx2} ${cy1 + r} M ${cx1 + r} ${cy2} L ${cx1} ${cy2} L ${cx1} ${cy2 - r} M ${cx2 - r} ${cy2} L ${cx2} ${cy2} L ${cx2} ${cy2 - r}`
            return (
              <motion.g
                key={`frame-${i}`}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.04, 1],
                  rotate: [f.rot - 1, f.rot + 1, f.rot - 1],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: f.delay,
                }}
                style={{ transformOrigin: `${f.x + f.w / 2}px ${f.y + f.h / 2}px` }}
              >
                {/* faint film frame outline */}
                <rect
                  x={cx1}
                  y={cy1}
                  width={f.w}
                  height={f.h}
                  fill="none"
                  stroke="rgba(139,92,246,0.18)"
                  strokeWidth={0.8}
                  strokeDasharray="3 2"
                />
                {/* corner brackets — film viewfinder */}
                <path
                  d={cornerPath}
                  fill="none"
                  stroke="rgba(217,70,239,0.85)"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 3px rgba(217,70,239,0.7))' }}
                />
                {/* tiny crosshair dot in center */}
                <circle
                  cx={Math.round((f.x + f.w / 2) * 1000) / 1000}
                  cy={Math.round((f.y + f.h / 2) * 1000) / 1000}
                  r={1.4}
                  fill="rgba(167,139,250,0.7)"
                />
              </motion.g>
            )
          })}

          {/* ascending generation progress sparklines */}
          {[
            { x: 90, y: 640, w: 160, h: 80, color: 'rgba(139,92,246,0.9)' },
            { x: 940, y: 540, w: 200, h: 100, color: 'rgba(217,70,239,0.8)' },
            { x: 480, y: 720, w: 140, h: 60, color: 'rgba(167,139,250,0.85)' },
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

          {/* purple area fills under sparklines (generation progress shape) */}
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
                fill="rgba(139,92,246,0.08)"
              />
            )
          })}
        </svg>
      </motion.div>

      {/* === FOREGROUND layer: floating glass scene chips === */}
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
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-semibold text-white">
                  {c.label}
                </span>
                <span className="text-[9px] text-white/45">{c.kind}</span>
              </div>
              {/* tiny tag */}
              <span
                className={
                  'ml-1 rounded-full border px-1.5 py-0.5 text-[8px] font-bold ' +
                  ACCENT_RING[c.accent]
                }
                style={{ background: 'rgba(139,92,246,0.08)' }}
              >
                {c.tag}
              </span>
              {/* REC indicator (red brand accent — only on camera chip) */}
              {c.rec && (
                <span className="ml-0.5 flex items-center gap-1">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-[#E53935]"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{ boxShadow: '0 0 6px rgba(229,57,53,0.95)' }}
                  />
                </span>
              )}
              {/* accent dot */}
              {!c.rec && (
                <span
                  className={
                    'ml-0.5 h-1.5 w-1.5 rounded-full ' + ACCENT_DOT[c.accent]
                  }
                  style={{ boxShadow: '0 0 6px rgba(167,139,250,0.9)' }}
                />
              )}
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
            className="absolute h-1.5 w-1.5 rounded-full bg-[#a78bfa]"
            style={{
              left: p.l,
              top: p.t,
              boxShadow:
                '0 0 10px rgba(167,139,250,0.95), 0 0 24px rgba(139,92,246,0.55)',
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

      {/* === Canvas particles (drifting purple/violet/magenta/white, additive glow) === */}
      <UniverseCanvas />
    </div>
  )
}

/* ===================================================================
   UniverseCanvas — drifting purple/violet/magenta/white particles with
 *   additive glow on colored + standard rendering for white.
 *   HMR-safe via __cleanup on the canvas element. Reduced-motion guard.
 *   =================================================================== */
function UniverseCanvas() {
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
          // 0 = white, 1 = purple, 2 = violet, 3 = magenta
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
              roll < 0.35 ? 1 : roll < 0.65 ? 2 : roll < 0.85 ? 3 : 0
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
                ? 'rgba(139,92,246,0.55)'
                : p.hue === 2
                  ? 'rgba(167,139,250,0.55)'
                  : 'rgba(217,70,239,0.55)'
            const fade =
              p.hue === 1
                ? 'rgba(139,92,246,0)'
                : p.hue === 2
                  ? 'rgba(167,139,250,0)'
                  : 'rgba(217,70,239,0)'
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
   SynthHero — Section 1 named export
 *   =================================================================== */
export function SynthHero() {
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
      aria-label="Synthetic Cinema — Hero"
    >
      <LivingCinematicUniverse sx={sx} sy={sy} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-40 mx-auto w-full max-w-7xl"
      >
        {/* Eyebrow — (01) · AI Advertising */}
        <motion.div style={{ y: eyebrowY }}>
          <PurpleEyebrow number="01" label="AI Advertising" />
        </motion.div>

        {/* Service label — Synthetic Cinema (purple) + 06 / 07 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 flex items-center gap-3"
        >
          <span className="wn-eyebrow text-[11px] font-semibold text-[#8B5CF6] sm:text-xs">
            Synthetic Cinema
          </span>
          <span className="hidden h-px w-12 bg-gradient-to-r from-[#8B5CF6]/60 to-transparent sm:block" />
          <span className="hidden text-[10px] text-white/40 sm:inline">
            06 / 07
          </span>
        </motion.div>

        {/* Massive headline — 2 lines, MaskLine reveal, accent words purple */}
        <h2
          className="mt-7 text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">Stories Generated.</span>
          </MaskLine>
          <MaskLine delay={0.12}>
            <PurpleGradientText>Worlds Released.</PurpleGradientText>
          </MaskLine>
        </h2>

        {/* Descriptor — verbatim Synthetic Cinema description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
        >
          AI-powered cinematic ads that scale your brand storytelling at the
          speed of imagination.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <PurpleMagneticButton
            variant="primary"
            cursorLabel="Book"
            ariaLabel="Book Strategy Call"
            onClick={() => {}}
          >
            <CalendarDays className="h-4 w-4" />
            Book Strategy Call
          </PurpleMagneticButton>
          <PurpleMagneticButton
            variant="secondary"
            cursorLabel="Explore"
            ariaLabel="Explore Our Work"
            onClick={() => {}}
          >
            Explore Our Work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </PurpleMagneticButton>

          {/* Inline proof — avatar stack (purple gradients) + films shipped */}
          <div className="ml-0 hidden items-center gap-3 sm:ml-4 lg:flex">
            <div className="flex -space-x-2">
              {[
                'from-[#a78bfa] to-[#6d28d9]',
                'from-[#8B5CF6] to-[#6d28d9]',
                'from-[#c4b5fd] to-[#8B5CF6]',
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
          <ChevronDown className="h-4 w-4 text-[#8B5CF6]" />
        </motion.span>
      </motion.div>

      {/* Side label — vertical (lg only) */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.4em] text-white/30 lg:block">
        Synthetic Cinema
      </div>
    </section>
  )
}
