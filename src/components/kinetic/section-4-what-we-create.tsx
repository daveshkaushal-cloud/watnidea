'use client'

/**
 * KineticWhatWeCreate — Section 4 of /kinetic-studio
 *
 * Premium BENTO GRID — 8 deliverables, each its own cinematic universe.
 *
 * Composition:
 *   - Eyebrow: (04) · Deliverables (OrangeEyebrow)
 *   - Headline: "What We" + OrangeGradientText "Create" (MaskLine)
 *
 * Bento Grid layout (lg+, 3 cols, varied col-spans):
 *   Row 1: [Brand Films col-span-2 accent] [Corporate Films]
 *   Row 2: [Social Reels] [Product Videos accent] [Podcast]
 *   Row 3: [Event Coverage accent col-span-2] [Documentary]
 *   Row 4: [Founder Stories col-span-3]
 *
 * Each tile:
 *   - glassmorphism (border border-white/10 bg-white/[0.035] backdrop-blur-xl)
 *   - hover lifts (y: -6 spring scale 1.015) + orange conic sweep (accent) /
 *     orange radial glow (others) + bottom accent line orange→neon
 *   - unique animated micro-visual motif inside
 *   - title (font-display, text-xl md:text-2xl font-semibold) + descriptor
 *   - number 01–08 (orange, font-display)
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  Clapperboard,
  Film,
  Mic,
  Package,
  Smartphone,
  User,
  type LucideIcon,
} from 'lucide-react'
import {
  OrangeEyebrow,
  OrangeGradientText,
  MaskLine,
} from '@/components/kinetic/shared'

/* ===================================================================
   Micro-visuals — one per service (self-contained motion graphics).
   These are function declarations so they hoist above the `services`
   array that references them by name.
   =================================================================== */

/* 01 Brand Films — film frame with light sweep + REC dot. */
function BrandFilmsVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* film frame */}
      <div className="absolute inset-3 overflow-hidden rounded-md border border-[#F97316]/35 bg-[#1A1A1A]/80">
        {/* top + bottom film perforation strips */}
        <div className="absolute inset-x-0 top-0 h-2 bg-[#141414]/80">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="absolute top-0.5 h-1 w-1.5 rounded-[1px] bg-white/20"
              style={{ left: `${10 + i * 18}%` }}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-2 bg-[#141414]/80">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="absolute bottom-0.5 h-1 w-1.5 rounded-[1px] bg-white/20"
              style={{ left: `${10 + i * 18}%` }}
            />
          ))}
        </div>
        {/* horizon gradient scene */}
        <div
          className="absolute inset-x-1 top-3 bottom-3"
          style={{
            background:
              'linear-gradient(180deg, rgba(249,115,22,0.28) 0%, rgba(229,57,53,0.18) 55%, rgba(20,20,20,0.7) 100%)',
          }}
        />
        {/* horizon line */}
        <div className="absolute inset-x-1 top-1/2 h-px bg-white/30" />
        {/* REC dot */}
        <motion.span
          className="absolute right-1.5 top-3 h-1.5 w-1.5 rounded-full bg-[#E53935]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 6px rgba(229,57,53,0.95)' }}
        />
        {/* light sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)',
          }}
          animate={{ x: ['-100%', '180%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* timecode */}
        <span
          className="absolute bottom-2.5 left-1.5 text-[7px] font-medium text-white/55"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          00:01:24:08
        </span>
      </div>
    </div>
  )
}

/* 02 Corporate Films — building outline with windows lighting up. */
function CorporateVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-3 flex items-end justify-center gap-1.5">
        {[40, 70, 55, 85, 60].map((h, i) => (
          <motion.div
            key={i}
            className="relative flex-1 rounded-t-sm border border-[#F97316]/25 bg-white/[0.06]"
            style={{ height: `${h}%` }}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* windows */}
            {[0, 1, 2].map((r) =>
              [0, 1].map((c) => (
                <motion.span
                  key={`${r}-${c}`}
                  className="absolute h-1 w-1 rounded-[1px] bg-[#F97316]"
                  style={{ left: `${25 + c * 35}%`, top: `${20 + r * 28}%` }}
                  animate={{ opacity: [0.3, 0.95, 0.3] }}
                  transition={{
                    duration: 1.8 + i * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: r * 0.4 + c * 0.3 + i * 0.1,
                  }}
                />
              ))
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* 03 Social Media Reels — vertical swipe-up animation with frame. */
function SocialReelsVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[85%] w-[42%] overflow-hidden rounded-lg border border-[#F97316]/35 bg-[#1A1A1A]/80">
          {/* frame gradient */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(249,115,22,0.35), rgba(229,57,53,0.20), rgba(20,20,20,0.85))',
            }}
            animate={{ y: ['-100%', '0%', '0%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* vertical swipe-up handle */}
          <motion.div
            className="absolute left-1/2 top-3 h-1 w-8 -translate-x-1/2 rounded-full bg-white/30"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* center play triangle */}
          <motion.div
            className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#F97316]/70 bg-[#141414]/70"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 14px rgba(249,115,22,0.7)' }}
          >
            <span className="ml-0.5 h-0 w-0 border-y-[4px] border-l-[7px] border-y-transparent border-l-[#F97316]" />
          </motion.div>
          {/* bottom label + dots */}
          <div className="absolute bottom-2 left-1.5 right-1.5 flex items-center justify-between">
            <span className="text-[7px] font-medium text-white/70">REEL</span>
            <div className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-0.5 w-2 rounded-full bg-[#fdba74]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
          {/* light sweep */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
            }}
            animate={{ y: ['-100%', '180%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  )
}

/* 04 Product Videos — product rotating on a turntable. */
function ProductVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* turntable ellipse */}
        <motion.div
          className="absolute bottom-5 h-3 w-[80%] rounded-[50%] border border-[#F97316]/40 bg-[#F97316]/8"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-3 h-2 w-[60%] rounded-[50%] border border-[#fdba74]/30"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        {/* rotating product box */}
        <motion.div
          className="relative"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="h-10 w-10 rounded-md border border-[#F97316]/55 bg-gradient-to-br from-[#fdba74]/30 via-[#F97316]/25 to-[#c2410c]/30"
            style={{
              boxShadow:
                '0 0 18px rgba(249,115,22,0.5), inset 0 0 12px rgba(253,186,116,0.25)',
            }}
          >
            {/* product highlight sweep */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-md"
              style={{
                background:
                  'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
              }}
              animate={{ x: ['-100%', '180%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
        {/* ambient glow under product */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-2 h-4 w-32 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(249,115,22,0.5), rgba(249,115,22,0) 70%)',
            filter: 'blur(8px)',
          }}
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

/* 05 Podcast Production — animated waveform bars. */
function PodcastVisual() {
  const bars = [40, 70, 50, 85, 30, 60, 90, 45, 75, 35, 80, 55, 65, 25, 70]
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center gap-0.5 px-3">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-full"
            style={{
              background:
                i % 3 === 0
                  ? 'linear-gradient(to top, #c2410c, #F97316)'
                  : i % 3 === 1
                    ? 'linear-gradient(to top, #F97316, #fdba74)'
                    : 'linear-gradient(to top, #d97706, #FBBF24)',
            }}
            animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
            transition={{
              duration: 1.2 + (i % 4) * 0.15,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.05,
            }}
          />
        ))}
      </div>
      {/* REC dot top-left */}
      <motion.span
        className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-[#E53935]"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 6px rgba(229,57,53,0.95)' }}
      />
      <span
        className="absolute left-4 top-1.5 text-[7px] font-bold uppercase tracking-[0.2em] text-[#ff6b63]"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        REC
      </span>
    </div>
  )
}

/* 06 Event Coverage — flashing camera shutters. */
function EventVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 p-1.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-sm border border-white/10 bg-[#1A1A1A]/80"
          >
            {/* simulated scene gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  i % 3 === 0
                    ? 'linear-gradient(135deg, rgba(249,115,22,0.32), rgba(20,20,20,0.6))'
                    : i % 3 === 1
                      ? 'linear-gradient(135deg, rgba(229,57,53,0.22), rgba(20,20,20,0.7))'
                      : 'linear-gradient(135deg, rgba(251,191,36,0.20), rgba(20,20,20,0.7))',
              }}
            />
            {/* flashing shutter overlay */}
            <motion.div
              className="absolute inset-0 bg-white"
              animate={{ opacity: [0, 0.85, 0] }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.5,
                repeatDelay: 2 + (i % 3) * 0.6,
              }}
            />
            {/* center play triangle */}
            <div className="absolute left-1/2 top-1/2 flex h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-[#1A1A1A]/80">
              <span className="ml-px h-0 w-0 border-y-[2px] border-l-[3px] border-y-transparent border-l-white/80" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 07 Documentary Style Content — open book with lines illuminating. */
function DocumentaryVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-3 flex flex-col justify-center gap-1.5 rounded-md border border-[#F97316]/25 bg-[#1A1A1A]/75 p-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="h-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, rgba(249,115,22,${0.4 - i * 0.05}), rgba(253,186,116,${0.5 - i * 0.06}))`,
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${88 - i * 6}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
        {/* small accent quote mark */}
        <motion.div
          className="mt-1 flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.18em] text-[#fdba74]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <span className="h-1 w-1 rounded-full bg-[#F97316]" />
          A True Story
        </motion.div>
      </div>
    </div>
  )
}

/* 08 Founder Stories — portrait frame with focus pull. */
function FounderVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-3 flex items-center justify-center">
        <motion.div
          className="relative h-[85%] w-[55%] overflow-hidden rounded-md border border-[#F97316]/40 bg-[#1A1A1A]/80"
          animate={{ boxShadow: ['0 0 14px rgba(249,115,22,0.25)', '0 0 22px rgba(249,115,22,0.55)', '0 0 14px rgba(249,115,22,0.25)'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* abstract portrait silhouette */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: '60%',
              background:
                'radial-gradient(ellipse at 50% 20%, rgba(253,186,116,0.55) 0%, rgba(249,115,22,0.30) 30%, rgba(20,20,20,0) 65%)',
            }}
          />
          <div
            className="absolute left-1/2 top-[28%] h-3 w-3 -translate-x-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(253,186,116,0.9), rgba(249,115,22,0.3))',
              boxShadow: '0 0 8px rgba(253,186,116,0.85)',
            }}
          />
          {/* focus-pull blur layer — animates blur in and out */}
          <motion.div
            className="pointer-events-none absolute inset-0 backdrop-blur-[1px]"
            animate={{ opacity: [0.8, 0, 0, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* corner brackets (focus frame) */}
          <div className="absolute left-1 top-1 h-2 w-2 border-l border-t border-[#F97316]/80" />
          <div className="absolute right-1 top-1 h-2 w-2 border-r border-t border-[#F97316]/80" />
          <div className="absolute bottom-1 left-1 h-2 w-2 border-b border-l border-[#F97316]/80" />
          <div className="absolute bottom-1 right-1 h-2 w-2 border-b border-r border-[#F97316]/80" />
          {/* name strip */}
          <div className="absolute bottom-1 left-1 right-1 rounded-sm bg-[#262626]/85 px-1 py-0.5">
            <div className="h-0.5 w-2/3 rounded-sm bg-[#fdba74]" />
            <div className="mt-0.5 h-0.5 w-1/2 rounded-sm bg-white/30" />
          </div>
        </motion.div>
      </div>
      {/* focus-pull label */}
      <motion.span
        className="absolute left-2 top-2 text-[7px] font-bold uppercase tracking-[0.22em] text-[#fdba74]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        Focus Pull
      </motion.span>
    </div>
  )
}

/* ===================================================================
   Content — 8 deliverables (premium descriptors, brand voice).
   =================================================================== */
type Service = {
  n: string
  title: string
  desc: string
  Icon: LucideIcon
  span: 1 | 2 | 3 // bento col-span on lg+
  accent: boolean
  Visual: () => JSX.Element
}

const services: Service[] = [
  {
    n: '01',
    title: 'Brand Films',
    desc: 'Cinematic stories that define what a brand stands for — the kind of films that play in keynotes, on homepages, in investor decks, and at every moment that matters.',
    Icon: Clapperboard,
    span: 2,
    accent: true,
    Visual: BrandFilmsVisual,
  },
  {
    n: '02',
    title: 'Corporate Films',
    desc: 'Internal and external films with purpose and polish.',
    Icon: Briefcase,
    span: 1,
    accent: false,
    Visual: CorporateVisual,
  },
  {
    n: '03',
    title: 'Social Media Reels',
    desc: 'Vertical stories built to stop the scroll.',
    Icon: Smartphone,
    span: 1,
    accent: false,
    Visual: SocialReelsVisual,
  },
  {
    n: '04',
    title: 'Product Videos',
    desc: 'Every product, shown like a hero shot.',
    Icon: Package,
    span: 1,
    accent: true,
    Visual: ProductVisual,
  },
  {
    n: '05',
    title: 'Podcast Production',
    desc: 'Full-stack podcast production, from booth to broadcast.',
    Icon: Mic,
    span: 1,
    accent: false,
    Visual: PodcastVisual,
  },
  {
    n: '06',
    title: 'Event Coverage',
    desc: 'Live moments, captured cinematically — multi-cam, multi-angle, multi-day coverage engineered to relive the energy long after the lights go down.',
    Icon: CalendarDays,
    span: 2,
    accent: true,
    Visual: EventVisual,
  },
  {
    n: '07',
    title: 'Documentary Style Content',
    desc: 'Real stories, told with craft and restraint.',
    Icon: BookOpen,
    span: 1,
    accent: false,
    Visual: DocumentaryVisual,
  },
  {
    n: '08',
    title: 'Founder Stories',
    desc: 'The human story behind the brand — long-form, short-form, and ambient films that turn founders into characters, companies into narratives, and products into chapters people want to follow.',
    Icon: User,
    span: 3,
    accent: true,
    Visual: FounderVisual,
  },
]

/* ===================================================================
   BentoTile — single service tile (glassmorphism + hover effects).
   Hooks at the top — receives no scroll-driven motion values.
   =================================================================== */
function BentoTile({ s, index }: { s: Service; index: number }) {
  const { n, title, desc, Icon, span, accent, Visual } = s
  return (
    <motion.article
      data-cursor="View"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { type: 'spring', stiffness: 300, damping: 22 },
      }}
      className={`group relative overflow-hidden rounded-2xl border bg-white/[0.035] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[#F97316]/55 hover:bg-white/[0.07] sm:p-6 ${
        span === 2 ? 'lg:col-span-2' : span === 3 ? 'lg:col-span-3' : ''
      } ${accent ? 'border-[#F97316]/25' : 'border-white/10'}`}
    >
      {/* hover glow — orange conic sweep (accent) / radial glow (others) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: accent
            ? 'conic-gradient(from 220deg at 50% 50%, rgba(249,115,22,0.24), rgba(253,186,116,0.16), rgba(229,57,53,0.14), rgba(251,191,36,0.14), rgba(249,115,22,0.24))'
            : 'radial-gradient(120% 120% at 100% 0%, rgba(249,115,22,0.18), rgba(253,186,116,0.08) 50%, transparent 70%)',
        }}
      />
      {/* orange glow ring on hover (accent only) */}
      {accent && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      {/* pulsing ring (accent only) */}
      {accent && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl border border-[#F97316]/30"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* number + Explore row */}
      <div className="relative z-10 mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
              accent
                ? 'border-[#F97316]/40 bg-[#F97316]/10 text-[#fdba74]'
                : 'border-white/15 bg-white/[0.05] text-white/70'
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span
            className={`text-xs font-bold ${
              accent
                ? 'bg-gradient-to-br from-[#fdba74] via-[#F97316] to-[#c2410c] bg-clip-text text-transparent'
                : 'text-[#F97316]'
            }`}
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {n}
          </span>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#F97316] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Explore
          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {/* grid: content + visual */}
      <div
        className={`relative z-10 grid gap-4 ${
          span === 2 || span === 3
            ? span === 3
              ? 'grid-cols-1 sm:grid-cols-[1fr_320px]'
              : 'grid-cols-1 sm:grid-cols-[1fr_200px]'
            : 'grid-cols-1'
        }`}
      >
        {/* content */}
        <div className="flex flex-col">
          <h3
            className="text-xl font-semibold text-white md:text-2xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">{desc}</p>
        </div>

        {/* micro-visual */}
        <div
          className={`relative overflow-hidden rounded-lg border border-white/10 bg-[#1A1A1A]/75 ${
            span === 3
              ? 'h-32 sm:h-auto'
              : span === 2
                ? 'h-32 sm:h-auto'
                : 'h-28'
          }`}
        >
          <Visual />
        </div>
      </div>

      {/* bottom accent line — orange → neon */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#F97316] to-[#fdba74] transition-all duration-500 group-hover:w-full"
      />
    </motion.article>
  )
}

/* ===================================================================
   KineticWhatWeCreate — Section 4 named export
 *   =================================================================== */
export function KineticWhatWeCreate() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#141414] px-5 py-24 sm:px-8 sm:py-32 lg:py-40"
      aria-label="What We Create"
    >
      {/* Local ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.18), rgba(249,115,22,0) 65%)',
            filter: 'blur(30px)',
          }}
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute right-[10%] bottom-[12%] h-[26vw] w-[26vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0) 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.15, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6,
          }}
        />
        <motion.div
          aria-hidden
          className="absolute left-[8%] top-[16%] h-[22vw] w-[22vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(251,191,36,0.12), rgba(251,191,36,0) 70%)',
            filter: 'blur(44px)',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.18, 1] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.2,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <OrangeEyebrow number="04" label="Deliverables" />

        {/* Massive headline */}
        <h2
          className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="text-white">What We </span>
            <OrangeGradientText>Create</OrangeGradientText>
          </MaskLine>
        </h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          Eight formats. One storytelling studio.{' '}
          <span className="text-white/55">
            Every deliverable built to capture attention and never let go.
          </span>
        </motion.p>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map((s, i) => (
            <BentoTile key={s.n} s={s} index={i} />
          ))}
        </div>

        {/* subtle film-strip accent line under grid */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <Film className="h-3 w-3 text-[#F97316]" />
          <span>End of reel — every format above is produced in-house</span>
          <Film className="h-3 w-3 text-[#F97316]" />
        </motion.div>
      </div>
    </section>
  )
}
