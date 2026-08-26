'use client'

/**
 * KineticCapabilities — Section 8 of /kinetic-studio
 *
 * PRODUCTION CAPABILITIES — gear + craft grid.
 *
 * Composition:
 *   - Eyebrow: (08) · Capabilities (OrangeEyebrow)
 *   - Headline: "Production" + "Capabilities" ("Capabilities" orange gradient)
 *   - 6 capability cards (glassmorphism), each with a unique animated
 *     mini-visual:
 *       01 Camera Systems     (Video)      — REC dot blinking + focus brackets
 *       02 Drone Footage      (Wind)       — drone ascending + parallax landscape
 *       03 Studio Production  (Boxes)      — pulsing studio light grid
 *       04 Lighting Setups    (Sun)        — key light sweeping a silhouette
 *       05 Motion Graphics    (Shapes)     — morphing geometric shapes
 *       06 Editing Suites     (MonitorPlay) — timeline clips + playhead
 *   - Each card: icon (orange), title, descriptor, animated mini-visual.
 *   - Hover: card lifts, orange border glow, visual animates more vigorously.
 *   - Below the grid: "and more" supporting capabilities line.
 *   - OrangeStickyRail ("Capabilities" / "The Gear").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Boxes,
  MonitorPlay,
  Shapes,
  Sun,
  Video,
  Wind,
  type LucideIcon,
} from 'lucide-react'
import {
  OrangeEyebrow,
  OrangeGradientText,
  OrangeStickyRail,
  MaskLine,
} from '@/components/kinetic/shared'

/* ===================================================================
   Capability content — 6 cards.
   =================================================================== */
type Capability = {
  n: string
  title: string
  desc: string
  Icon: LucideIcon
  Visual: () => JSX.Element
}

/* ===================================================================
   01 CameraSystemsVisual — viewfinder with REC dot + focus brackets.
   =================================================================== */
function CameraSystemsVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* viewfinder gradient bg */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.18), rgba(20,20,20,0.6) 70%)',
        }}
      />
      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      {/* REC indicator */}
      <div className="absolute left-3 top-3 flex items-center gap-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#E53935]"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 6px rgba(229,57,53,0.95)' }}
        />
        <span
          className="wn-eyebrow text-[9px] font-bold tracking-[0.2em] text-[#E53935]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          REC
        </span>
      </div>
      {/* timecode top-right */}
      <span
        className="absolute right-3 top-3 text-[9px] font-bold text-white/60"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        00:01:24
      </span>
      {/* center focus brackets (animated) */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#F97316]" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#F97316]" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#F97316]" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#F97316]" />
        <span className="absolute left-1/2 top-1/2 h-0.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316]" />
      </motion.div>
      {/* corner ticks bottom */}
      <span className="absolute bottom-3 left-3 text-[8px] font-bold text-white/40">
        4K · 24FPS
      </span>
      <span className="absolute bottom-3 right-3 text-[8px] font-bold text-white/40">
        f/2.8 · ISO 800
      </span>
    </div>
  )
}

/* ===================================================================
   02 DroneFootageVisual — ascending drone + parallax landscape.
   =================================================================== */
function DroneFootageVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden" aria-hidden>
      {/* sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(251,191,36,0.22), rgba(249,115,22,0.12) 50%, rgba(20,20,20,0.7) 100%)',
        }}
      />
      {/* parallax mountains (back layer) */}
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-[40%] w-[120%]"
      >
        <motion.g
          animate={{ x: [0, -8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <polygon
            points="0,40 12,18 24,28 38,12 52,26 68,10 82,24 100,16 100,40"
            fill="rgba(229,57,53,0.25)"
          />
        </motion.g>
      </svg>
      {/* foreground hills (front layer — faster parallax) */}
      <svg
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-[26%] w-[130%]"
      >
        <motion.g
          animate={{ x: [0, -16, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <polygon
            points="0,30 16,12 32,22 48,8 66,20 82,6 100,18 100,30"
            fill="rgba(20,20,20,0.85)"
          />
        </motion.g>
      </svg>
      {/* drone ascending */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [4, -10, 4], x: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 40 24" className="h-7 w-12">
          {/* arms */}
          <line x1="4" y1="12" x2="36" y2="12" stroke="rgba(249,115,22,0.6)" strokeWidth="1" />
          {/* rotors (spinning) */}
          <motion.g
            style={{ transformOrigin: '6px 12px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.15, repeat: Infinity, ease: 'linear' }}
          >
            <ellipse cx="6" cy="12" rx="5" ry="0.6" fill="rgba(251,191,36,0.5)" />
          </motion.g>
          <motion.g
            style={{ transformOrigin: '34px 12px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.15, repeat: Infinity, ease: 'linear' }}
          >
            <ellipse cx="34" cy="12" rx="5" ry="0.6" fill="rgba(251,191,36,0.5)" />
          </motion.g>
          {/* body */}
          <rect x="14" y="9" width="12" height="6" rx="2" fill="#F97316" />
          <circle cx="20" cy="12" r="1.2" fill="#fff" />
        </svg>
      </motion.div>
      {/* altitude chip */}
      <div className="absolute right-3 top-3 rounded border border-white/15 bg-[#202020]/85 px-1.5 py-0.5 backdrop-blur-md">
        <span className="text-[8px] font-bold text-white/70">ALT 240m</span>
      </div>
    </div>
  )
}

/* ===================================================================
   03 StudioProductionVisual — pulsing studio light grid.
   =================================================================== */
function StudioProductionVisual() {
  // 4x3 light grid with staggered pulse
  const lights = Array.from({ length: 12 }, (_, i) => ({
    x: (i % 4) * 25 + 12.5,
    y: Math.floor(i / 4) * 25 + 12.5,
    delay: (i % 4) * 0.25 + Math.floor(i / 4) * 0.15,
  }))
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(251,191,36,0.18), rgba(20,20,20,0.85) 70%)',
        }}
      />
      {/* light grid */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {lights.map((l, i) => (
          <motion.circle
            key={i}
            cx={l.x}
            cy={l.y}
            r={3}
            fill="rgba(251,191,36,0.85)"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: l.delay,
            }}
            style={{ filter: 'drop-shadow(0 0 3px rgba(251,191,36,0.9))' }}
          />
        ))}
        {/* grid frame */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          fill="none"
          stroke="rgba(249,115,22,0.2)"
          strokeWidth="0.4"
          strokeDasharray="1 1"
        />
      </svg>
      {/* subject silhouette */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <motion.g
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ellipse cx="50" cy="78" rx="14" ry="3" fill="rgba(0,0,0,0.5)" />
          <circle cx="50" cy="55" r="7" fill="rgba(20,20,20,0.85)" />
          <path
            d="M 38 80 Q 38 64 50 64 Q 62 64 62 80 Z"
            fill="rgba(20,20,20,0.85)"
          />
        </motion.g>
      </svg>
    </div>
  )
}

/* ===================================================================
   04 LightingSetupsVisual — key light sweeping a silhouette.
   =================================================================== */
function LightingSetupsVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(20,20,20,0.6), rgba(20,20,20,0.95) 80%)',
        }}
      />
      {/* key light cone — sweeps across */}
      <motion.div
        className="absolute -top-1/3 left-0 h-[200%] w-1/2 origin-top"
        style={{
          background:
            'linear-gradient(90deg, rgba(251,191,36,0) 0%, rgba(251,191,36,0.35) 50%, rgba(251,191,36,0) 100%)',
          filter: 'blur(20px)',
          transformOrigin: 'top',
          skewX: '-12deg',
        }}
        animate={{ x: ['-20%', '180%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* subject silhouette */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <ellipse cx="50" cy="86" rx="14" ry="3" fill="rgba(0,0,0,0.6)" />
        <circle cx="50" cy="48" r="9" fill="rgba(20,20,20,0.95)" />
        <path
          d="M 36 90 Q 36 64 50 64 Q 64 64 64 90 Z"
          fill="rgba(20,20,20,0.95)"
        />
        {/* rim light edge on the silhouette */}
        <motion.path
          d="M 41 56 Q 36 70 38 88"
          stroke="rgba(251,191,36,0.7)"
          strokeWidth="0.8"
          fill="none"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
      {/* light label */}
      <div className="absolute bottom-3 left-3 rounded border border-white/15 bg-[#202020]/85 px-2 py-0.5 backdrop-blur-md">
        <span className="text-[8px] font-bold text-[#FBBF24]">KEY · 5600K</span>
      </div>
    </div>
  )
}

/* ===================================================================
   05 MotionGraphicsVisual — morphing geometric shapes.
   =================================================================== */
function MotionGraphicsVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.18), rgba(20,20,20,0.85) 70%)',
        }}
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="mg-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
        {/* rotating ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="28"
          fill="none"
          stroke="url(#mg-grad)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50px 50px' }}
        />
        {/* morphing polygon — circle ↔ square via animating r on rect */}
        <motion.rect
          x="32"
          y="32"
          width="36"
          height="36"
          rx="4"
          fill="rgba(249,115,22,0.25)"
          stroke="rgba(251,191,36,0.7)"
          strokeWidth="1"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 0.85, 1, 0.85, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '50px 50px' }}
        />
        {/* orbiting dot */}
        <motion.circle
          r="2.5"
          fill="#FBBF24"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50px 50px' }}
          cx="50"
          cy="22"
        />
        {/* center bright pinpoint */}
        <motion.circle
          cx="50"
          cy="50"
          r="3"
          fill="#fff"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}

/* ===================================================================
   06 EditingSuitesVisual — timeline clips + moving playhead.
   =================================================================== */
function EditingSuitesVisual() {
  // 3 tracks, each with a few clips
  const tracks = [
    { y: 30, clips: [
      { x: 8, w: 22, c: 'rgba(249,115,22,0.7)' },
      { x: 36, w: 14, c: 'rgba(251,191,36,0.6)' },
      { x: 56, w: 28, c: 'rgba(229,57,53,0.5)' },
    ]},
    { y: 50, clips: [
      { x: 12, w: 18, c: 'rgba(229,57,53,0.5)' },
      { x: 38, w: 30, c: 'rgba(249,115,22,0.7)' },
      { x: 76, w: 14, c: 'rgba(251,191,36,0.6)' },
    ]},
    { y: 70, clips: [
      { x: 6, w: 16, c: 'rgba(251,191,36,0.6)' },
      { x: 30, w: 20, c: 'rgba(229,57,53,0.5)' },
      { x: 58, w: 26, c: 'rgba(249,115,22,0.7)' },
    ]},
  ]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.12), rgba(20,20,20,0.9) 75%)',
        }}
      />
      {/* track grid lines */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {[20, 40, 60, 80].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.2"
          />
        ))}
        {/* clips */}
        {tracks.flatMap((t, ti) =>
          t.clips.map((c, ci) => (
            <motion.rect
              key={`${ti}-${ci}`}
              x={c.x}
              y={t.y - 5}
              width={c.w}
              height="10"
              rx="1.5"
              fill={c.c}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + ti * 0.15 + ci * 0.08 }}
            />
          ))
        )}
        {/* playhead — sweeps across */}
        <motion.line
          x1="0"
          y1="14"
          x2="0"
          y2="86"
          stroke="#FBBF24"
          strokeWidth="0.7"
          animate={{ x1: [4, 96], x2: [4, 96] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 2px rgba(251,191,36,0.9))' }}
        />
      </svg>
      {/* labels */}
      <div className="absolute left-3 top-3 flex items-center gap-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#FBBF24]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-[8px] font-bold text-[#FBBF24]">EDITING</span>
      </div>
      <span className="absolute right-3 top-3 text-[8px] font-bold text-white/50">
        24 FPS
      </span>
    </div>
  )
}

/* ===================================================================
   Capability card list.
   =================================================================== */
const capabilities: Capability[] = [
  {
    n: '01',
    title: 'Camera Systems',
    desc: 'Cinema-grade bodies. Every format. Every lens.',
    Icon: Video,
    Visual: CameraSystemsVisual,
  },
  {
    n: '02',
    title: 'Drone Footage',
    desc: 'Aerial cinematography that earns the shot.',
    Icon: Wind,
    Visual: DroneFootageVisual,
  },
  {
    n: '03',
    title: 'Studio Production',
    desc: 'Controlled environments for controlled storytelling.',
    Icon: Boxes,
    Visual: StudioProductionVisual,
  },
  {
    n: '04',
    title: 'Lighting Setups',
    desc: 'Light is the first language of cinema.',
    Icon: Sun,
    Visual: LightingSetupsVisual,
  },
  {
    n: '05',
    title: 'Motion Graphics',
    desc: 'Design that moves. Type that breathes.',
    Icon: Shapes,
    Visual: MotionGraphicsVisual,
  },
  {
    n: '06',
    title: 'Editing Suites',
    desc: 'Where the story is finally told.',
    Icon: MonitorPlay,
    Visual: EditingSuitesVisual,
  },
]

/* ===================================================================
   CapabilityCard — single glassmorphism card with animated mini-visual.
   =================================================================== */
function CapabilityCard({ c, index }: { c: Capability; index: number }) {
  const { n, title, desc, Icon, Visual } = c
  return (
    <motion.article
      data-cursor={title}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.75,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl transition-colors duration-500 hover:border-[#F97316]/55"
    >
      {/* hover glow bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 0%, rgba(249,115,22,0.22), transparent 60%)',
        }}
      />

      {/* === Visual layer (16:10) === */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/8">
        {/* the mini-visual fills the frame */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Visual />
        </motion.div>

        {/* dark bottom gradient for legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent"
        />

        {/* number badge top-left */}
        <span
          className="absolute left-3 top-3 text-xs font-bold text-white/35"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          ({n})
        </span>
      </div>

      {/* === Content layer === */}
      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        {/* icon row */}
        <div className="mb-4 flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#F97316]/30 bg-[#F97316]/8 text-[#F97316] transition-all duration-300 group-hover:border-[#F97316] group-hover:bg-[#F97316]/15"
          >
            <Icon className="h-5 w-5" />
          </span>
          <h3
            className="text-xl font-semibold text-white sm:text-2xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {title}
          </h3>
        </div>

        {/* descriptor */}
        <p className="text-sm leading-relaxed text-white/55 sm:text-[15px]">
          {desc}
        </p>

        {/* bottom hairline accent that fills on hover */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
          style={{
            background:
              'linear-gradient(to right, #F97316, #FBBF24, transparent)',
          }}
        />
      </div>
    </motion.article>
  )
}

/* ===================================================================
   KineticCapabilities — Section 8 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function KineticCapabilities() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <OrangeStickyRail
          label="Capabilities"
          caption="The Gear"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(249,115,22,0.16), rgba(249,115,22,0) 65%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="absolute right-[8%] bottom-[12%] h-[26vw] w-[26vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(251,191,36,0.12), rgba(251,191,36,0) 70%)',
                filter: 'blur(44px)',
              }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.2,
              }}
            />
            <motion.div
              aria-hidden
              className="absolute left-[6%] bottom-[20%] h-[22vw] w-[22vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(229,57,53,0.1), rgba(229,57,53,0) 70%)',
                filter: 'blur(42px)',
              }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.12, 1] }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.6,
              }}
            />
          </div>

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-14 max-w-3xl"
          >
            <OrangeEyebrow number="08" label="Capabilities" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Production </MaskLine>
              <MaskLine delay={0.12}>
                <OrangeGradientText>Capabilities</OrangeGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              From the lens to the timeline. Every capability an in-house
              production studio needs to shoot, light, capture, animate,
              and finish{' '}
              <OrangeGradientText glow={false}>cinematic work</OrangeGradientText>
              {' '}— without outsourcing a single frame.
            </motion.p>
          </motion.div>

          {/* 3-col grid of capability cards */}
          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {capabilities.map((c, i) => (
              <CapabilityCard key={c.n} c={c} index={i} />
            ))}
          </div>

          {/* "And more" supporting capabilities */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-white/8 bg-white/[0.025] px-6 py-5 backdrop-blur-md"
          >
            <span className="wn-eyebrow text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
              And more
            </span>
            <span className="h-3 w-px bg-white/15" />
            {[
              'Color Grading',
              'Sound Design',
              'Color Correction',
              'Subtitling',
              'Format Adaptation',
            ].map((label, i) => (
              <span
                key={label}
                className="flex items-center gap-2 text-sm text-white/65"
              >
                <span
                  className="h-1 w-1 rounded-full bg-[#F97316]"
                  style={{ boxShadow: '0 0 6px rgba(249,115,22,0.9)' }}
                />
                {label}
                {i < 4 && <span className="ml-1 text-white/20">·</span>}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
