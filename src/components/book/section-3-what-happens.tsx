'use client'

/**
 * BookWhatHappensOnCall — Section 3 of /book-strategy-call
 *
 * Full-screen scroll-driven storytelling experience. A clear process
 * with no uncertainty.
 *
 * Structure: sticky pinned section (min-h-[300vh]) with BookingStickyRail
 * (lg+ only). Inner viewport = h-screen. Inside:
 *   - LEFT column (lg: ~5/12): the active stage's statement — name +
 *     descriptor, swapped via AnimatePresence as scrollYProgress passes
 *     each stage's threshold.
 *   - RIGHT column (lg: ~7/12): interactive journey map — a vertical
 *     SVG pathway connecting 6 nodes, each lighting up in a different
 *     service color (DISCOVER=aura gold, AUDIT=digital blue, STRATEGY=
 *     hype red, OPPORTUNITY=growth green, ROADMAP=cinema purple,
 *     PARTNERSHIP=echo cyan). A flowing energy line fills along the
 *     pathway as scroll progresses (strokeDashoffset). A canvas particle
 *     stream flows downward along the path.
 *   - Bottom strip: 6 progress dots + active stage counter ("01 → 06").
 *
 * Color service: section eyebrow + sticky rail use brand red
 * (umbrella). Individual stage nodes use their own service color so the
 * journey reads as a multi-color progression through all seven services.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks). Canvas uses the HMR-safe __cleanup pattern.
 * prefers-reduced-motion guard on the canvas.
 * SSR-safe: stage 0 active on first paint, listener attaches in effect.
 */

import { useRef, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  Compass,
  ScanLine,
  Map,
  Target,
  ListChecks,
  Handshake,
  type LucideIcon,
} from 'lucide-react'
import {
  WORK_COLORS,
  WORK_COLOR_LIST,
  BookingEyebrow,
  BookingStickyRail,
  ServiceGradientText,
  MaskLine,
  type ServiceColorKey,
} from '@/components/book/shared'

/* ===================================================================
   6 journey stages. Each maps to a service color so the entire journey
   reads as a multi-color progression through all seven services.
   =================================================================== */
type Stage = {
  n: string
  name: string
  desc: string
  Icon: LucideIcon
  color: ServiceColorKey
  // y position along the SVG vertical path (in viewBox units 0..100)
  y: number
}

const stages: Stage[] = [
  {
    n: '01',
    name: 'Discover',
    desc: 'We learn your business, market, and what\u2019s actually at stake.',
    Icon: Compass,
    color: 'aura',
    y: 10,
  },
  {
    n: '02',
    name: 'Audit',
    desc: 'We pressure-test your brand, funnel, content, and ads against where attention actually lives.',
    Icon: ScanLine,
    color: 'digital',
    y: 26,
  },
  {
    n: '03',
    name: 'Strategy',
    desc: 'We map the system \u2014 identity, website, content, ads, AI, SEO, growth \u2014 to your opportunity.',
    Icon: Map,
    color: 'hype',
    y: 42,
  },
  {
    n: '04',
    name: 'Opportunity',
    desc: 'We surface the 2\u20133 highest-leverage moves you can make in the next 90 days.',
    Icon: Target,
    color: 'growth',
    y: 58,
  },
  {
    n: '05',
    name: 'Roadmap',
    desc: 'You leave with a sequenced plan \u2014 what to do first, what to defer, what to ignore.',
    Icon: ListChecks,
    color: 'cinema',
    y: 74,
  },
  {
    n: '06',
    name: 'Partnership',
    desc: 'If we\u2019re a fit, we talk about what working together looks like. If not, you still leave with the roadmap.',
    Icon: Handshake,
    color: 'echo',
    y: 90,
  },
]

// Pre-round stage positions for hydration safety
const stagePos = stages.map((s) => ({
  ...s,
  y: Math.round(s.y * 1000) / 1000,
}))

const STAGE_COUNT = stages.length // 6
const LAST_INDEX = STAGE_COUNT - 1 // 5

/* ===================================================================
   JourneyCanvas — vertical particle stream flowing along the SVG path
   from top (y=10) to bottom (y=90) on the journey map. Density + speed
   intensifies with scroll progress. HMR-safe via __cleanup. Reduced-
   motion guard.
   =================================================================== */
function JourneyCanvas({
  progress,
}: {
  progress: MotionValue<number>
}) {
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

        // The 6 service colors as rgb triplets (matching the stage colors)
        type P = {
          // 0..1 position along the path (top→bottom)
          t: number
          speed: number
          r: number
          // index into WORK_COLORS palette (0..5)
          colorIdx: number
          phase: number
        }
        const ps: P[] = []
        const rgbTriples = WORK_COLOR_LIST.map((c) => c.rgb)

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
          const n = reduce ? 0 : 40
          for (let i = 0; i < n; i++) {
            ps.push({
              t: Math.random(),
              speed: 0.0015 + Math.random() * 0.003,
              r: Math.random() * 1.6 + 0.5,
              colorIdx: Math.floor(Math.random() * rgbTriples.length),
              phase: Math.random() * Math.PI * 2,
            })
          }
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          const t = performance.now() / 1000
          // particles flow faster as scroll progresses
          const speedMul = 0.4 + progressVal * 1.6
          // path covers y=10% to y=90% of the canvas height
          const yStart = h * 0.1
          const yEnd = h * 0.9
          const xMid = w * 0.5

          ctx.globalCompositeOperation = 'lighter'
          for (let i = 0; i < ps.length; i++) {
            const p = ps[i]
            p.t += p.speed * speedMul
            if (p.t >= 1) {
              p.t = 0
              // re-randomize color on respawn
              p.colorIdx = Math.floor(Math.random() * rgbTriples.length)
            }
            const px = xMid + Math.sin(p.t * Math.PI * 4 + t + p.phase) * 4
            const py = yStart + p.t * (yEnd - yStart)
            const energyBoost = 0.45 + p.t * 0.55
            const drawR = 9

            const a =
              (0.35 + 0.3 * Math.sin(t * 2 + p.phase)) * energyBoost
            const rgb = rgbTriples[p.colorIdx]
            const g = ctx.createRadialGradient(px, py, 0, px, py, drawR)
            g.addColorStop(0, `rgba(${rgb},${a})`)
            g.addColorStop(1, `rgba(${rgb},0)`)
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(px, py, drawR, 0, Math.PI * 2)
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
   StageNode — single node on the SVG vertical pathway.
   Lights up its service color when scrollYProgress passes its threshold;
   dim white when inactive. All transforms are conditional on the
   scrollYProgress range — declared unconditionally at the top.
   =================================================================== */
function StageNode({
  stage,
  index,
  scrollYProgress,
}: {
  stage: Stage
  index: number
  scrollYProgress: MotionValue<number>
}) {
  // 6 stages → thresholds at 0, 0.2, 0.4, 0.6, 0.8, 1.0
  const threshold = index / LAST_INDEX
  const lo = threshold - 0.06
  const hi = threshold + 0.06
  const c = WORK_COLORS[stage.color]

  // active opacity: 0.3 → 1 as scroll crosses threshold
  const activeOpacity = useTransform(scrollYProgress, [lo, hi], [0.35, 1])
  // glow halo intensity
  const glowOpacity = useTransform(
    scrollYProgress,
    [threshold - 0.08, hi],
    [0.15, 0.9]
  )
  // scale bump when active
  const nodeScale = useTransform(scrollYProgress, [lo, hi], [1, 1.14])
  // border color: service color when active, white/12 when inactive
  const borderColor = useTransform(
    scrollYProgress,
    [lo, hi],
    ['rgba(255,255,255,0.12)', `rgba(${c.rgb},0.75)`]
  )
  // background tint
  const backgroundColor = useTransform(
    scrollYProgress,
    [lo, hi],
    ['rgba(255,255,255,0.025)', `rgba(${c.rgb},0.14)`]
  )

  // active pulse ring (only rendered for the initially-active stage 0
  // to keep SSR deterministic)
  const isActive = index === 0

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: '50%', top: `${stage.y}%`, opacity: activeOpacity }}
    >
      {/* node chip */}
      <motion.div
        style={{ scale: nodeScale }}
        className="relative flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-xl sm:h-14 sm:w-14"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 3 + index * 0.25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.2,
        }}
      >
        {/* glow halo (driven by scroll) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-xl"
          style={{
            background: `radial-gradient(circle, rgba(${c.rgb},0.65), rgba(${c.rgb},0) 70%)`,
            filter: 'blur(10px)',
            opacity: glowOpacity,
          }}
        />
        {/* border (color shifts with scroll) */}
        <motion.div
          className="absolute inset-0 rounded-xl border"
          style={{ borderColor }}
        />
        {/* background tint */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ backgroundColor }}
        />
        <stage.Icon
          className="relative z-10 h-5 w-5 sm:h-6 sm:w-6"
          style={{ color: c.soft }}
        />
        {/* stage number badge */}
        <span
          className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full border bg-[#141414] text-[8px] font-bold sm:h-5 sm:w-5"
          style={{
            borderColor: `rgba(${c.rgb},0.55)`,
            color: c.soft,
            fontFamily: 'var(--font-display), sans-serif',
          }}
        >
          {stage.n}
        </span>
      </motion.div>

      {/* active pulse ring (SSR-safe: only stage 0) */}
      {isActive && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-xl border sm:h-14 sm:w-14"
          style={{ borderColor: `rgba(${c.rgb},0.4)` }}
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.18, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  )
}

/* ===================================================================
   JourneyMap — the vertical SVG pathway + 6 nodes + canvas particles.
   =================================================================== */
function JourneyMap({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  // flowing energy line strokeDashoffset (drives a downward sweep)
  const flowOffset = useTransform(scrollYProgress, [0, 1], [0, -240])
  // overall map scale-in
  const mapScale = useTransform(scrollYProgress, [0, 0.08], [0.94, 1])
  const mapOpacity = useTransform(scrollYProgress, [0, 0.06], [0.7, 1])

  // path geometry — vertical line from y=10 to y=90 at x=50
  // (pre-rounded for hydration safety)
  const xMid = 50
  const yStart = stagePos[0].y
  const yEnd = stagePos[LAST_INDEX].y

  return (
    <motion.div
      style={{ scale: mapScale, opacity: mapOpacity }}
      className="relative mx-auto w-[min(86vw,360px)]"
      aria-label="Strategy call journey — 6 stages"
    >
      {/* outer ambient glow (multi-color wash) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(229,57,53,0.16), rgba(229,57,53,0) 60%)',
          filter: 'blur(28px)',
        }}
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* === SVG pathway (base rail + flowing energy) === */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="journey-rail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={WORK_COLORS.aura.hex} stopOpacity="0.85" />
            <stop offset="20%" stopColor={WORK_COLORS.digital.hex} stopOpacity="0.85" />
            <stop offset="40%" stopColor={WORK_COLORS.hype.hex} stopOpacity="0.85" />
            <stop offset="60%" stopColor={WORK_COLORS.growth.hex} stopOpacity="0.85" />
            <stop offset="80%" stopColor={WORK_COLORS.cinema.hex} stopOpacity="0.85" />
            <stop offset="100%" stopColor={WORK_COLORS.echo.hex} stopOpacity="0.85" />
          </linearGradient>
        </defs>
        {/* base rail (dashed) */}
        <line
          x1={xMid}
          y1={yStart}
          x2={xMid}
          y2={yEnd}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.4"
          strokeDasharray="1 1.2"
        />
        {/* flowing energy line (driven by scroll) */}
        <motion.line
          x1={xMid}
          y1={yStart}
          x2={xMid}
          y2={yEnd}
          stroke="url(#journey-rail)"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeDasharray="3 2"
          style={{
            strokeDashoffset: flowOffset,
            filter: 'drop-shadow(0 0 1.5px rgba(229,57,53,0.7))',
          }}
        />
      </svg>

      {/* === 6 stage nodes laid out vertically === */}
      <div className="relative h-[80vh] max-h-[640px] min-h-[440px]">
        {stagePos.map((s, i) => (
          <StageNode
            key={s.n}
            stage={s}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Canvas particles flowing along the path */}
        <div className="pointer-events-none absolute inset-0">
          <JourneyCanvas progress={scrollYProgress} />
        </div>
      </div>
    </motion.div>
  )
}

/* ===================================================================
   StageStatement — the active stage's headline + descriptor. Swaps
   content via AnimatePresence as `activeIndex` changes.
   =================================================================== */
function StageStatement({ activeIndex }: { activeIndex: number }) {
  const stage = stages[activeIndex]
  const c = WORK_COLORS[stage.color]

  return (
    <div className="relative min-h-[260px] sm:min-h-[300px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.n}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* stage number + name row */}
          <div className="flex items-center gap-3">
            <span
              className="text-3xl font-bold sm:text-4xl"
              style={{
                color: c.hex,
                fontFamily: 'var(--font-display), sans-serif',
              }}
            >
              {stage.n}
            </span>
            <span
              className="h-px w-10"
              style={{ background: c.hex, opacity: 0.6 }}
              aria-hidden
            />
            <span
              className="wn-eyebrow text-xs font-bold uppercase tracking-[0.24em] sm:text-sm"
              style={{ color: c.soft }}
            >
              {stage.name}
            </span>
          </div>

          {/* descriptor */}
          <p
            className="mt-6 text-2xl font-semibold leading-[1.18] tracking-[-0.01em] text-white sm:text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {stage.desc}
          </p>

          {/* service-color mini-chip indicating which service lights up */}
          <div className="mt-6 flex items-center gap-2.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: c.hex, boxShadow: `0 0 8px ${c.hex}` }}
              aria-hidden
            />
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">
              {c.name}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ===================================================================
   ProgressDots — 6 dots showing scroll progress, with the active one
   expanding + tinting to its service color.
   =================================================================== */
function ProgressDot({
  index,
  active,
}: {
  index: number
  active: MotionValue<number>
}) {
  const fill = useTransform(
    active,
    (v) => Math.max(0, Math.min(1, 1 - Math.abs(v - index)))
  )
  const width = useTransform(fill, [0, 1], ['8px', '28px'])
  const c = WORK_COLORS[stages[index].color]
  const opacityTint = useTransform(fill, [0, 1], [0.18, 1])

  return (
    <motion.span
      className="h-2 rounded-full"
      style={{ width, backgroundColor: 'rgba(255,255,255,0.16)' }}
    >
      <motion.span
        className="block h-full rounded-full"
        style={{
          width: '100%',
          backgroundColor: c.hex,
          opacity: opacityTint,
        }}
      />
    </motion.span>
  )
}

/* ===================================================================
   ActiveStageCounter — shows the active stage number ("01" → "06") +
   name. Subscribes to scrollYProgress via .on('change').
   =================================================================== */
function ActiveStageCounter({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const [num, setNum] = useState('01')
  const [name, setName] = useState('Discover')
  const [colorIdx, setColorIdx] = useState(0)

  useEffect(() => {
    const update = (v: number) => {
      const i = Math.max(0, Math.min(LAST_INDEX, Math.round(v * LAST_INDEX)))
      setNum(String(i + 1).padStart(2, '0'))
      setName(stages[i].name)
      setColorIdx(i)
    }
    update(scrollYProgress.get())
    const unsub = scrollYProgress.on('change', update)
    return () => unsub()
  }, [scrollYProgress])

  const c = WORK_COLORS[stages[colorIdx].color]

  return (
    <div className="flex items-baseline gap-2">
      <motion.span
        className="text-sm font-bold"
        style={{ color: c.hex, fontFamily: 'var(--font-display), sans-serif' }}
      >
        {num}
      </motion.span>
      <span className="text-xs text-white/60">{name}</span>
      <span className="text-xs text-white/30">/ 06</span>
    </div>
  )
}

/* ===================================================================
   BookWhatHappensOnCall — Section 3 named export
   =================================================================== */
export function BookWhatHappensOnCall() {
  const outerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // active stage index (0..5) — drives progress dots + active counter
  const activeStage = useTransform(scrollYProgress, [0, 1], [0, LAST_INDEX])

  // header parallax
  const headerY = useTransform(scrollYProgress, [0, 0.4], [0, -30])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.65])

  // active stage index for the StageStatement (subscribed via useEffect)
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    const update = (v: number) => {
      const i = Math.max(0, Math.min(LAST_INDEX, Math.round(v * LAST_INDEX)))
      setActiveIndex(i)
    }
    update(scrollYProgress.get())
    const unsub = scrollYProgress.on('change', update)
    return () => unsub()
  }, [scrollYProgress])

  return (
    <section
      ref={outerRef}
      className="relative min-h-[300vh] border-t border-white/5 bg-[#141414]"
      aria-label="What happens on the call"
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* === Top header (eyebrow + headline) === */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8 md:pt-28"
        >
          <BookingEyebrow number="03" label="WHAT HAPPENS ON THE CALL" />
          <h2
            className="mt-4 text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine>
              <span className="text-white">A Clear Process. </span>
              <ServiceGradientText color="hype">No Uncertainty.</ServiceGradientText>
            </MaskLine>
          </h2>
        </motion.div>

        {/* === Main split: stage statement (left) + journey map (right) === */}
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center gap-6 px-5 py-6 sm:px-8 lg:gap-12">
          {/* BookingStickyRail (lg+) — brand-red progress line */}
          <BookingStickyRail
            label="Book · Process"
            caption="6 stages"
            sectionRef={outerRef}
          />

          {/* LEFT: stage statement (lg: 5/12, base: full width below map on mobile) */}
          <div className="order-2 w-full lg:order-1 lg:w-5/12">
            <StageStatement activeIndex={activeIndex} />
          </div>

          {/* RIGHT: journey map (lg: 7/12) */}
          <div className="order-1 w-full lg:order-2 lg:flex-1">
            <JourneyMap scrollYProgress={scrollYProgress} />
          </div>
        </div>

        {/* === Bottom progress strip === */}
        <div className="relative z-20 mx-auto mb-8 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            {stages.map((s, i) => (
              <ProgressDot key={s.n} index={i} active={activeStage} />
            ))}
          </div>
          <ActiveStageCounter scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  )
}
