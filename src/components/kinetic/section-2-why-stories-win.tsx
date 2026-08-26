'use client'

/**
 * KineticWhyStoriesWin — Section 2 of /kinetic-studio
 *
 * Sticky/pinned editorial storytelling. "People remember stories, not content."
 *
 * Visual concept — feed chaos → single story dominates:
 *   As the user scrolls, a fast-moving stream of small desaturated content
 *   tiles (the social feed) flows past. Most get scrolled past. Then ONE
 *   cinematic story frame breaks through: it grows large, sharpens, and
 *   lights up orange — commanding attention. The other tiles dissolve into
 *   ambient orange embers. Stories are remembered. Content is forgotten.
 *
 * Four editorial stages (left column), each fading in/out at scroll
 * thresholds:
 *   01 "Thousands of posts. Every second."
 *   02 "Most get scrolled past."
 *   03 "Then a story stops them."
 *   04 "Stories are remembered. Content is forgotten."
 *
 * Right column: a single ScrollStream → DominantStory transformation
 * visualization driven by useScroll + useTransform.
 *
 * Red is used ONLY for the "lost / scrolled past / forgotten" elements
 * (subtle supporting accent); orange is the primary accent for the
 * remembered-story state.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Eye, Flame, Sparkles } from 'lucide-react'
import {
  OrangeEyebrow,
  OrangeGradientText,
  OrangeStickyRail,
  OrangeAmbient,
  OrangeEmberCanvas,
  MaskLine,
} from '@/components/kinetic/shared'

/* ===================================================================
   Comparison lines — three short-form truisms with animated orange
   strike-throughs.
   =================================================================== */
const comparison = [
  { left: 'Content', right: 'Memory' },
  { left: 'Views', right: 'Attention' },
  { left: 'Posts', right: 'Stories' },
]

function ComparisonLine({
  c,
  index,
}: {
  c: (typeof comparison)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-wrap items-baseline gap-x-2 border-b border-white/[0.06] py-3 text-lg sm:text-xl"
    >
      <span className="font-medium text-white">{c.left}</span>
      <span className="text-white/35">≠</span>
      <span className="relative text-white/35">
        {c.right}.
        <motion.span
          aria-hidden
          className="absolute left-0 top-1/2 h-[1.5px] w-0 -translate-y-1/2"
          style={{
            background: 'linear-gradient(90deg, #fdba74, #F97316)',
          }}
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{
            duration: 0.55,
            delay: 0.35 + index * 0.12,
            ease: 'easeOut',
          }}
        />
      </span>
    </motion.div>
  )
}

/* ===================================================================
   Stages — editorial copy for the 4 scroll-driven statements.
   =================================================================== */
const stageCopy = [
  {
    n: '01',
    title: 'Thousands of posts. Every second.',
    body: 'The feed never stops. Endless thumbnails, infinite scrolls, autoplay on autoplay. Attention is fragmented across millions of frames competing for the same second of human focus.',
  },
  {
    n: '02',
    title: 'Most get scrolled past.',
    body: 'Beautiful videos die in 0.4 seconds. Polished posts vanish between thumb swipes. No memory. No recall. No return. The algorithm moves on — and so does everyone else.',
  },
  {
    n: '03',
    title: 'Then a story stops them.',
    body: 'A frame breaks the scroll. A face, a moment, a hook, a beat — something cinematic and human that demands the thumb freeze. The story has captured attention. Now it can move people.',
  },
  {
    n: '04',
    title: 'Stories are remembered. Content is forgotten.',
    body: 'Stories travel. They get shared, saved, re-watched, quoted, and felt long after the post disappears. We engineer those kinds of stories — frames built to be remembered, not just seen.',
  },
]

/* ===================================================================
   StageStatement — single stage statement, fades in/out at its scroll
   threshold range.
   =================================================================== */
function StageStatement({
  stage,
  index,
  progress,
}: {
  stage: (typeof stageCopy)[number]
  index: number
  progress: MotionValue<number>
}) {
  // Each stage is "active" over a 0.25-wide window centered on its threshold.
  const thresholds = [0.12, 0.34, 0.56, 0.80]
  const t = thresholds[index]
  const opacity = useTransform(progress, [t - 0.1, t, t + 0.08, t + 0.18], [0, 1, 1, 0])
  const y = useTransform(progress, [t - 0.1, t, t + 0.18], [16, 0, -16])

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col gap-4"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span
          className="text-2xl font-bold text-[#F97316]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {stage.n}
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-[#F97316]/60 to-transparent" />
      </div>
      <h3
        className="text-2xl font-bold leading-tight tracking-[-0.01em] text-white sm:text-3xl md:text-4xl"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        {stage.title}
      </h3>
      <p className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
        {stage.body}
      </p>
    </motion.div>
  )
}

/* ===================================================================
   ScrollStream — the chaos state. A stream of small desaturated content
   tiles flowing past rapidly (like a social feed). Fades + accelerates
   as scroll progresses (1 → 0).
   =================================================================== */
function ScrollStream({ progress }: { progress: MotionValue<number> }) {
  // stream opacity 1 → 0 over [0.1, 0.65]
  const opacity = useTransform(progress, [0.1, 0.65], [1, 0])
  const y = useTransform(progress, [0.1, 0.65], [0, -50])
  const scale = useTransform(progress, [0.1, 0.65], [1, 0.85])

  // Pre-computed feed tile positions (rounded for hydration safety)
  const tiles = [
    { x: 12, y: 12, w: 22, h: 28 },
    { x: 40, y: 8, w: 18, h: 22 },
    { x: 64, y: 16, w: 24, h: 30 },
    { x: 8, y: 48, w: 20, h: 24 },
    { x: 36, y: 42, w: 22, h: 26 },
    { x: 64, y: 52, w: 18, h: 22 },
    { x: 14, y: 80, w: 24, h: 18 },
    { x: 44, y: 76, w: 20, h: 22 },
    { x: 70, y: 82, w: 18, h: 18 },
  ].map((n) => ({
    x: Math.round(n.x * 1000) / 1000,
    y: Math.round(n.y * 1000) / 1000,
    w: n.w,
    h: n.h,
  }))

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0"
      aria-hidden
    >
      {/* streaming feed tiles — desaturated, blurred, scrolling fast */}
      <motion.div
        className="absolute inset-0"
        animate={{ y: [0, -120, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
      >
        {tiles.map((n, i) => (
          <motion.div
            key={`tile-${i}`}
            className="absolute overflow-hidden rounded-md border border-white/10 bg-white/[0.06]"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              width: `${n.w}%`,
              height: `${n.h}%`,
              filter: 'blur(1.4px) saturate(0.45)',
            }}
            animate={{ opacity: [0.4, 0.75, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.18,
            }}
          >
            {/* abstract scene inside tile */}
            <div
              className="absolute inset-x-0 top-0 h-1/2"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.10), transparent)',
              }}
            />
            <div className="absolute inset-x-1 bottom-1 space-y-0.5">
              <div className="h-0.5 w-2/3 rounded-sm bg-white/15" />
              <div className="h-0.5 w-1/2 rounded-sm bg-white/10" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ghost "scrolled past" markers — small red dots racing upward */}
      {[
        { l: '24%', d: 0 },
        { l: '52%', d: 0.6 },
        { l: '78%', d: 1.2 },
        { l: '36%', d: 1.8 },
      ].map((p, i) => (
        <motion.span
          key={`ghost-${i}`}
          className="absolute h-1 w-1 rounded-full bg-[#E53935]"
          style={{
            left: p.l,
            bottom: '6%',
            boxShadow: '0 0 6px rgba(229,57,53,0.85)',
          }}
          animate={{ y: [0, -260, -260], opacity: [0.8, 0.8, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeIn',
            delay: p.d,
          }}
        />
      ))}

      {/* "SCROLL PAST" alert label */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-[#E53935]/40 bg-[#E53935]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6b63]"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.04, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        <Eye className="h-3 w-3" />
        Scroll Past
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   DominantStory — the cinematic story frame that breaks through the
   feed. Scales in + lights up orange + sharpens as scroll progresses
   (0 → 1).
   =================================================================== */
function DominantStory({ progress }: { progress: MotionValue<number> }) {
  // dominant opacity 0 → 1 over [0.5, 0.85]
  const opacity = useTransform(progress, [0.5, 0.85], [0, 1])
  const scale = useTransform(progress, [0.5, 0.85], [0.55, 1])
  const y = useTransform(progress, [0.5, 0.85], [60, 0])
  // sharpness (blur removal) tied to scroll
  const blur = useTransform(progress, [0.5, 0.8], ['6px', '0px'])
  const filter = useTransform(blur, (b) => `blur(${b}) saturate(1.25)`)

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      <motion.div
        style={{ filter }}
        className="relative aspect-[16/9] w-[78%] max-w-[460px] overflow-hidden rounded-lg border border-[#F97316]/55 bg-[#141414]/80 backdrop-blur-xl"
      >
        {/* outer orange glow halo */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-2xl"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.55), rgba(249,115,22,0) 70%)',
            filter: 'blur(20px)',
          }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* top accent bar */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#fdba74] via-[#F97316] to-[#c2410c]" />

        {/* simulated cinematic scene inside the frame */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(249,115,22,0.22) 0%, rgba(229,57,53,0.16) 40%, rgba(251,191,36,0.10) 70%, rgba(20,20,20,0.75) 100%)',
          }}
        />
        {/* horizon line */}
        <div className="absolute inset-x-3 top-[55%] h-px bg-white/25" />
        {/* scanline sheen sweep */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
          }}
          animate={{ x: ['-100%', '180%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* header — REC + label */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <motion.span
            className="h-2 w-2 rounded-full bg-[#E53935]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 8px rgba(229,57,53,0.95)' }}
          />
          <span
            className="wn-eyebrow text-[9px] font-bold uppercase tracking-[0.22em] text-[#fdba74]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            REC · The Story
          </span>
        </div>

        {/* center "play" pulse — invites the hold */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#F97316]/70 bg-[#141414]/60"
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 22px rgba(249,115,22,0.7)' }}
        >
          <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-[#F97316]" />
        </motion.div>

        {/* footer timecode */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9px] font-medium text-white/65">
          <span style={{ fontFamily: 'var(--font-display), sans-serif' }}>
            00:00:12:04
          </span>
          <span className="rounded border border-[#F97316]/40 bg-[#F97316]/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-[#fdba74]">
            Captured
          </span>
        </div>
      </motion.div>

      {/* "STORY CAPTURED" success label above the frame */}
      <motion.div
        className="absolute left-1/2 top-[10%] flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#F97316]/55 bg-[#F97316]/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#fdba74]"
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        <Flame className="h-3 w-3" />
        Story Captured
      </motion.div>

      {/* "REMEMBERED" badge below the frame */}
      <motion.div
        className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#FBBF24]/55 bg-[#FBBF24]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FBBF24]"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.04, 1] }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.6,
        }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        <Sparkles className="h-3 w-3" />
        Remembered
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   KineticWhyStoriesWin — Section 2 named export
 *   =================================================================== */
export function KineticWhyStoriesWin() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // header parallax + fade
  const headerY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -40, -120])
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [1, 1, 0.3]
  )

  // local ambient orange glow intensifies with scroll
  const ambientOpacity = useTransform(scrollYProgress, [0, 0.7], [0.3, 0.95])

  // emergence caption (after transformation)
  const emergenceOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1])

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[220vh] border-t border-white/5 bg-[#141414]"
    >
      <OrangeStickyRail
        label="Why Stories Win"
        caption="Attention Captured"
        sectionRef={sectionRef}
      />

      {/* Pinned viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Ambient layers (driven by scroll) */}
        <motion.div aria-hidden style={{ opacity: ambientOpacity }} className="absolute inset-0">
          <OrangeAmbient />
        </motion.div>
        <OrangeEmberCanvas count={28} />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------- LEFT: editorial copy + stage statements ---------- */}
          <motion.div style={{ y: headerY, opacity: headerOpacity }}>
            <OrangeEyebrow number="02" label="Why Stories Win" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>
                <span className="text-white">Stories Win.</span>
              </MaskLine>
              <MaskLine delay={0.12}>
                <span className="text-white">Content </span>
                <OrangeGradientText>Doesn&rsquo;t.</OrangeGradientText>
              </MaskLine>
            </h2>

            {/* Stage statements — relative container, absolutely-stacked, fade with scroll */}
            <div className="relative mt-10 min-h-[260px] sm:min-h-[240px]">
              {stageCopy.map((s, i) => (
                <StageStatement
                  key={s.n}
                  stage={s}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>

            {/* Comparison lines */}
            <div className="mt-8 max-w-xl">
              {comparison.map((c, i) => (
                <ComparisonLine key={c.left} c={c} index={i} />
              ))}

              {/* Pivot statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 border-l-2 border-[#F97316] pl-5"
              >
                <p className="text-xl font-medium leading-snug text-white sm:text-2xl">
                  We compete on{' '}
                  <span className="text-[#F97316]">memory</span>.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* ---------- RIGHT: scroll-stream → dominant-story transformation ---------- */}
          <div className="relative flex min-h-[60vh] flex-col justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-5 flex items-center justify-between"
            >
              <span className="wn-eyebrow text-[11px] font-medium text-white/50">
                Feed → Story
              </span>
              <span className="text-xs text-white/30">scroll to capture</span>
            </motion.div>

            {/* Transformation stage — stream + dominant overlaid */}
            <div className="relative h-[60vh] min-h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A]/80">
              <ScrollStream progress={scrollYProgress} />
              <DominantStory progress={scrollYProgress} />

              {/* corner labels */}
              <div className="pointer-events-none absolute left-4 top-4 wn-eyebrow text-[10px] text-white/45">
                The Attention Capture
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 text-[10px] text-white/30">
                Feed · Scroll · Story · Memory
              </div>
            </div>

            {/* Emergence caption */}
            <motion.p
              style={{ opacity: emergenceOpacity }}
              className="mt-6 text-center text-xs text-white/45 sm:text-left"
            >
              The chaos resolves into a single captured story.{' '}
              <span className="text-white/55">
                The frame people remember.
              </span>
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}
