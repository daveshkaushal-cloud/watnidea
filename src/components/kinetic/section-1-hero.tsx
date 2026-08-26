'use client'

/**
 * KineticHero — Section 1 of /kinetic-studio
 *
 * "A movie begins."
 *
 * A cinematic, Netflix-title-sequence + Apple-product-film hero. Floating
 * glass film frames drift through mouse-reactive parallax layers; anamorphic
 * light streaks sweep across; letterbox bars breathe at top + bottom; film
 * perforations line the right edge; an OrangeEmberCanvas drops warm embers
 * (light leaks). The headline reveals word-by-word via MaskLine.
 *
 * Composition:
 *   - Eyebrow: (01) · Video Production & Visual Storytelling (OrangeEyebrow)
 *   - Service label: Kinetic Studio (orange) + "04 / 07"
 *   - Headline: "Stories That" + OrangeGradientText "Move People."
 *   - Descriptor: verbatim Kinetic Studio description from navbar
 *   - CTAs: OrangeMagneticButton primary "Book Strategy Call" +
 *     secondary "Watch Showreel"
 *   - Cinematic film-studio visual (behind content, mouse-reactive):
 *       floating film frames + anamorphic light streaks + letterbox bars +
 *       film grain + OrangeEmberCanvas + SVG film perforations strip
 *   - Scroll indicator (ChevronDown bobbing, orange)
 *   - Side label (lg only, vertical): Kinetic Studio
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
  CalendarDays,
  ChevronDown,
  Clapperboard,
  Play,
  Video,
  type LucideIcon,
} from 'lucide-react'
import {
  OrangeEyebrow,
  OrangeGradientText,
  OrangeMagneticButton,
  OrangeEmberCanvas,
  MaskLine,
  useCursorParallax,
} from '@/components/kinetic/shared'

/* ===================================================================
   Film frame data — abstract cinematic "scenes" represented as
   glassmorphism frames. Each has a position (%), drift params, an
   accent variant (orange / gold / red / neon-orange), a lucide icon,
   and a label so it reads as a film-set motif (Brand Film / Reel /
   Product / Scene).
   =================================================================== */
type FrameAccent = 'orange' | 'gold' | 'red' | 'neon'

type FilmFrame = {
  id: string
  Icon: LucideIcon
  label: string
  left: string
  top: string
  w: string // viewport width (vw or rem)
  h: string
  dur: number
  delay: number
  rotate: number
  accent: FrameAccent
}

const frames: FilmFrame[] = [
  {
    id: 'brand-film',
    Icon: Clapperboard,
    label: 'Brand Film',
    left: '6%',
    top: '20%',
    w: '15rem',
    h: '9.5rem',
    dur: 9,
    delay: 0,
    rotate: -6,
    accent: 'orange',
  },
  {
    id: 'reel',
    Icon: Video,
    label: 'Reel',
    left: '82%',
    top: '16%',
    w: '12rem',
    h: '20rem',
    dur: 7.5,
    delay: 0.6,
    rotate: 4,
    accent: 'neon',
  },
  {
    id: 'product',
    Icon: Play,
    label: 'Product',
    left: '78%',
    top: '60%',
    w: '14rem',
    h: '8.5rem',
    dur: 10,
    delay: 1.2,
    rotate: 5,
    accent: 'gold',
  },
  {
    id: 'scene',
    Icon: Clapperboard,
    label: 'Scene 04',
    left: '12%',
    top: '66%',
    w: '13rem',
    h: '8rem',
    dur: 11,
    delay: 0.3,
    rotate: -4,
    accent: 'red',
  },
  {
    id: 'cut',
    Icon: Video,
    label: 'Cut',
    left: '44%',
    top: '8%',
    w: '11rem',
    h: '7rem',
    dur: 8.5,
    delay: 0.9,
    rotate: 2,
    accent: 'neon',
  },
]

const ACCENT_BORDER: Record<FrameAccent, string> = {
  orange: 'border-[#F97316]/45 text-[#fdba74]',
  gold: 'border-[#FBBF24]/45 text-[#FBBF24]',
  red: 'border-[#E53935]/45 text-[#ff6b63]',
  neon: 'border-[#fdba74]/50 text-[#fdba74]',
}

const ACCENT_GLOW: Record<FrameAccent, string> = {
  orange: '0 0 28px rgba(249,115,22,0.30)',
  gold: '0 0 28px rgba(251,191,36,0.26)',
  red: '0 0 26px rgba(229,57,53,0.24)',
  neon: '0 0 30px rgba(253,186,116,0.32)',
}

const ACCENT_BAR: Record<FrameAccent, string> = {
  orange: 'from-[#F97316] to-[#c2410c]',
  gold: 'from-[#FBBF24] to-[#d97706]',
  red: 'from-[#E53935] to-[#9b1c1c]',
  neon: 'from-[#fdba74] to-[#F97316]',
}

/* ===================================================================
   CinematicBackdrop — mouse-reactive layered visual.
 *   (bg orange + deep-red + warm-gold blobs → mid SVG anamorphic light
 *   streaks + film perforations → fg floating film frames → canvas
 *   ember particles + breathing letterbox bars + film grain overlay)
 *   Accepts sx/sy (springs from useCursorParallax) for depth parallax.
 *   =================================================================== */
function CinematicBackdrop({
  sx,
  sy,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  // foreground parallax (moves most)
  const fgX = useTransform(sx, [0, 1], [-28, 28])
  const fgY = useTransform(sy, [0, 1], [-22, 22])
  // mid layer
  const mdX = useTransform(sx, [0, 1], [-16, 16])
  const mdY = useTransform(sy, [0, 1], [-12, 12])
  // background (moves least)
  const bgX = useTransform(sx, [0, 1], [-10, 10])
  const bgY = useTransform(sy, [0, 1], [-8, 8])

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* === BACKGROUND layer: orange + deep-red + warm-gold blobs === */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <motion.div
          className="absolute left-[8%] top-[14%] h-[42vw] w-[42vw] max-h-[520px] max-w-[520px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(249,115,22,0.22), rgba(249,115,22,0.06) 40%, rgba(249,115,22,0) 70%)',
            filter: 'blur(32px)',
          }}
          animate={{
            scale: [1, 1.12, 0.96, 1],
            rotate: [0, 28, -16, 0],
            borderRadius: ['42%', '60%', '46%', '42%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[6%] h-[36vw] w-[36vw] max-h-[440px] max-w-[440px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 60% 40%, rgba(229,57,53,0.20), rgba(229,57,53,0.07) 50%, rgba(229,57,53,0) 75%)',
            filter: 'blur(34px)',
          }}
          animate={{
            scale: [1, 1.18, 0.94, 1],
            rotate: [0, -32, 14, 0],
            borderRadius: ['50%', '38%', '58%', '50%'],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* warm gold highlight */}
        <motion.div
          className="absolute right-[26%] top-[20%] h-[22vw] w-[22vw] max-h-[280px] max-w-[280px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(251,191,36,0.16), rgba(251,191,36,0.05) 50%, rgba(251,191,36,0) 75%)',
            filter: 'blur(38px)',
          }}
          animate={{
            scale: [1, 1.22, 0.9, 1],
            rotate: [0, 22, -18, 0],
            borderRadius: ['46%', '54%', '40%', '46%'],
          }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* === MID layer: SVG anamorphic light streaks + film perforations === */}
      <motion.div style={{ x: mdX, y: mdY }} className="absolute inset-0">
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="kinetic-streak-orange" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(249,115,22,0)" />
              <stop offset="50%" stopColor="rgba(253,186,116,0.85)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0)" />
            </linearGradient>
            <linearGradient id="kinetic-streak-gold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(251,191,36,0)" />
              <stop offset="50%" stopColor="rgba(251,191,36,0.65)" />
              <stop offset="100%" stopColor="rgba(251,191,36,0)" />
            </linearGradient>
            <linearGradient id="kinetic-streak-red" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(229,57,53,0)" />
              <stop offset="50%" stopColor="rgba(229,57,53,0.55)" />
              <stop offset="100%" stopColor="rgba(229,57,53,0)" />
            </linearGradient>
          </defs>

          {/* anamorphic light streaks — horizontal motion (lens flares) */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const y = 120 + i * 110
            const grad =
              i % 3 === 0
                ? 'url(#kinetic-streak-orange)'
                : i % 3 === 1
                  ? 'url(#kinetic-streak-gold)'
                  : 'url(#kinetic-streak-red)'
            return (
              <motion.rect
                key={`streak-${i}`}
                x={-300}
                y={y}
                width={420}
                height={1.5 + (i % 3) * 0.4}
                fill={grad}
                initial={{ x: -300 }}
                animate={{ x: [0, 1400, 1400] }}
                transition={{
                  duration: 6 + i * 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 1.1,
                }}
                style={{ filter: 'blur(0.6px) drop-shadow(0 0 4px rgba(249,115,22,0.55))' }}
              />
            )
          })}

          {/* slow rising "scene transitions" — vertical light sweeps */}
          {[0, 1].map((i) => (
            <motion.rect
              key={`sweep-${i}`}
              x={i === 0 ? 180 : 880}
              y={820}
              width={2}
              height={420}
              fill="url(#kinetic-streak-orange)"
              initial={{ y: 820, opacity: 0 }}
              animate={{ y: [-40, -820, -820], opacity: [0, 0.6, 0] }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 4.5,
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* === FOREGROUND layer: floating glass film frames === */}
      <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0">
        {frames.map((f, i) => (
          <motion.div
            key={f.id}
            className="absolute"
            style={{ left: f.left, top: f.top, width: f.w, height: f.h }}
            animate={{ y: [0, -18, 0], rotate: [f.rotate, f.rotate + 2.5, f.rotate] }}
            transition={{
              duration: f.dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: f.delay,
            }}
          >
            {/* glassmorphism frame */}
            <div
              className={
                'relative h-full w-full overflow-hidden rounded-md border bg-white/[0.035] backdrop-blur-xl ' +
                ACCENT_BORDER[f.accent]
              }
              style={{ boxShadow: ACCENT_GLOW[f.accent] }}
            >
              {/* top accent bar (like a film frame label) */}
              <div
                className={
                  'absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ' +
                  ACCENT_BAR[f.accent]
                }
              />
              {/* subtle scanline sheen */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)',
                }}
                animate={{ x: ['-100%', '180%'] }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: f.delay + 0.5,
                }}
              />
              {/* film grain dots inside frame */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(255,255,255,0.5) 0.5px, transparent 0.5px)',
                  backgroundSize: '4px 4px',
                }}
              />

              {/* label header */}
              <div className="absolute left-2 top-2 flex items-center gap-1.5">
                <span
                  className={
                    'flex h-5 w-5 items-center justify-center rounded border ' +
                    ACCENT_BORDER[f.accent]
                  }
                >
                  <f.Icon className="h-3 w-3" />
                </span>
                <span className="wn-eyebrow text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70">
                  {f.label}
                </span>
              </div>

              {/* simulated scene — abstract gradient horizon */}
              <div
                className="absolute inset-x-3 bottom-3 top-9 rounded-sm"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(249,115,22,0.18) 0%, rgba(229,57,53,0.10) 60%, rgba(20,20,20,0.6) 100%)',
                }}
              />
              {/* horizon line */}
              <div className="absolute inset-x-3 top-1/2 h-px bg-white/15" />

              {/* timecode badge bottom-right */}
              <span
                className="absolute bottom-1.5 right-2 text-[8px] font-medium text-white/55"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                00:0{i}:{(i * 12) % 60 < 10 ? '0' : ''}
                {(i * 12) % 60}
              </span>
              {/* REC dot top-right (only on first frame) */}
              {i === 0 && (
                <motion.span
                  className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#E53935]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ boxShadow: '0 0 6px rgba(229,57,53,0.85)' }}
                />
              )}
            </div>
          </motion.div>
        ))}

        {/* small chrome + orange dots — energy particles in foreground */}
        {[
          { l: '32%', t: '44%', d: 0, c: '#fdba74' },
          { l: '68%', t: '62%', d: 1.4, c: '#FBBF24' },
          { l: '82%', t: '22%', d: 2.2, c: '#F97316' },
          { l: '46%', t: '72%', d: 0.8, c: '#fdba74' },
          { l: '58%', t: '30%', d: 1.6, c: '#FBBF24' },
        ].map((p, i) => (
          <motion.span
            key={`dot-${i}`}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: p.l,
              top: p.t,
              background: p.c,
              boxShadow: `0 0 10px ${p.c}, 0 0 22px rgba(249,115,22,0.55)`,
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

      {/* === Canvas particles (drifting orange + gold + white embers) === */}
      <OrangeEmberCanvas count={36} />

      {/* === Letterbox bars (top + bottom) breathing === */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[7vh] bg-gradient-to-b from-[#141414] via-[#141414]/85 to-transparent"
        animate={{ height: ['7vh', '8.5vh', '7vh'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[7vh] bg-gradient-to-t from-[#141414] via-[#141414]/85 to-transparent"
        animate={{ height: ['7vh', '8.5vh', '7vh'] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4,
        }}
      />

      {/* === Film perforations strip on the right edge === */}
      <svg
        viewBox="0 0 24 800"
        preserveAspectRatio="none"
        className="absolute right-0 top-0 h-full w-6 opacity-40"
        aria-hidden
      >
        <rect x="0" y="0" width="24" height="800" fill="rgba(20,20,20,0.55)" />
        {Array.from({ length: 22 }).map((_, i) => (
          <rect
            key={`perf-${i}`}
            x="6"
            y={10 + i * 36}
            width="12"
            height="14"
            rx="2"
            fill="rgba(20,20,20,1)"
            stroke="rgba(249,115,22,0.25)"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* === Film grain overlay (uses global .wn-grain-style noise) === */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '120px 120px',
        }}
      />
    </div>
  )
}

/* ===================================================================
   KineticHero — Section 1 named export
 *   =================================================================== */
export function KineticHero() {
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
      aria-label="Kinetic Studio — Hero"
    >
      <CinematicBackdrop sx={sx} sy={sy} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-40 mx-auto w-full max-w-7xl"
      >
        {/* Eyebrow — (01) · Video Production & Visual Storytelling */}
        <motion.div style={{ y: eyebrowY }}>
          <OrangeEyebrow number="01" label="Video Production & Visual Storytelling" />
        </motion.div>

        {/* Service label — Kinetic Studio (orange) + 04 / 07 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 flex items-center gap-3"
        >
          <span className="wn-eyebrow text-[11px] font-semibold text-[#F97316] sm:text-xs">
            Kinetic Studio
          </span>
          <span className="hidden h-px w-12 bg-gradient-to-r from-[#F97316]/60 to-transparent sm:block" />
          <span className="hidden text-[10px] text-white/40 sm:inline">
            04 / 07
          </span>
        </motion.div>

        {/* Massive headline — 2 lines, MaskLine reveal, accent words orange */}
        <h2
          className="mt-7 text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">Stories That</span>
          </MaskLine>
          <MaskLine delay={0.12}>
            <OrangeGradientText>Move People.</OrangeGradientText>
          </MaskLine>
        </h2>

        {/* Descriptor — verbatim Kinetic Studio description from navbar */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
        >
          Cinematic brand films, reels, and visual storytelling designed to
          capture instant attention and engagement.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <OrangeMagneticButton
            variant="primary"
            cursorLabel="Book"
            ariaLabel="Book Strategy Call"
            onClick={() => {}}
          >
            <CalendarDays className="h-4 w-4" />
            Book Strategy Call
          </OrangeMagneticButton>
          <OrangeMagneticButton
            variant="secondary"
            cursorLabel="Watch"
            ariaLabel="Watch Showreel"
            onClick={() => {}}
          >
            <Play className="h-4 w-4" />
            Watch Showreel
          </OrangeMagneticButton>

          {/* Inline proof — avatar stack (orange + gold + red gradients) + showreel badge */}
          <div className="ml-0 hidden items-center gap-3 sm:ml-4 lg:flex">
            <div className="flex -space-x-2">
              {[
                'from-[#fdba74] to-[#c2410c]',
                'from-[#F97316] to-[#9a3412]',
                'from-[#FBBF24] to-[#d97706]',
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
          <ChevronDown className="h-4 w-4 text-[#F97316]" />
        </motion.span>
      </motion.div>

      {/* Side label — vertical (lg only) */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.4em] text-white/30 lg:block">
        Kinetic Studio
      </div>
    </section>
  )
}
