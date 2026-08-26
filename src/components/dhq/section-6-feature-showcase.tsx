'use client'

/**
 * DhqFeatureShowcase — Section 6
 * Six large immersive feature cards — each its own animated browser
 * environment / dashboard visual.
 *
 * Composition:
 *   - Eyebrow: (06) · Features
 *   - Headline: "Built to Perform." ("Perform." red gradient) — font-display
 *   - Sub (verbatim): "Every site we ship is engineered against six
 *     non-negotiable standards."
 *
 * 6 feature cards (premium brand-voice, verbatim from spec):
 *   01 Speed — Sub-second loads. Every millisecond optimized.
 *   02 Mobile Responsiveness — Flawless on every screen, every device.
 *   03 SEO Readiness — Structured, indexed, and ready to rank.
 *   04 Conversion Optimization — Every element engineered to convert.
 *   05 Scalability — Built to grow from launch to category leader.
 *   06 Security — Hardened, monitored, and always-on.
 *
 * Each card:
 *   - Large glassmorphism container (rounded-3xl border border-white/10
 *     bg-white/[0.05] backdrop-blur-xl overflow-hidden), min-h-[320px].
 *   - Animated browser-environment visual (browser frame: URL bar,
 *     traffic lights, content area showing the feature's metric/visual).
 *   - md+ side-by-side (visual + content), mobile stacked. Alternate
 *     visual side (left/right) for editorial rhythm — even cards
 *     `md:flex-row` (visual left), odd cards `md:flex-row-reverse`.
 *   - Hover: browser frame's content animates more intensely, border
 *     tightens to red, red glow blooms, "See it live" / "Explore" label
 *     with ArrowUpRight appears.
 *   - Staggered reveal: whileInView, delay index*0.1.
 *   - `data-cursor="View"` on each card.
 *
 * Sticky rail (lg+): label `Features`, caption `Standards`.
 *
 * DIGITAL/TECH visual language preserved from Sections 1-5 — browser
 * frames, dashboard tiles, glassmorphism UI panels, animated red
 * metrics, system indicators.
 */

import { useRef, type ReactElement } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from '@/components/about/shared'

/* ===================================================================
   Content — 6 features (premium, brand voice, verbatim from spec).
   =================================================================== */
type Feature = {
  n: string
  title: string
  desc: string
  url: string
  cta: string
  Visual: () => ReactElement
}

const features: Feature[] = [
  {
    n: '01',
    title: 'Speed',
    desc: 'Sub-second loads. Every millisecond optimized.',
    url: 'watnidea.com/performance',
    cta: 'See it live',
    Visual: SpeedVisual,
  },
  {
    n: '02',
    title: 'Mobile Responsiveness',
    desc: 'Flawless on every screen, every device.',
    url: 'watnidea.com/responsive',
    cta: 'Explore',
    Visual: ResponsiveVisual,
  },
  {
    n: '03',
    title: 'SEO Readiness',
    desc: 'Structured, indexed, and ready to rank.',
    url: 'watnidea.com/seo',
    cta: 'See it live',
    Visual: SeoVisual,
  },
  {
    n: '04',
    title: 'Conversion Optimization',
    desc: 'Every element engineered to convert.',
    url: 'watnidea.com/convert',
    cta: 'Explore',
    Visual: ConversionVisual,
  },
  {
    n: '05',
    title: 'Scalability',
    desc: 'Built to grow from launch to category leader.',
    url: 'watnidea.com/scale',
    cta: 'See it live',
    Visual: ScalabilityVisual,
  },
  {
    n: '06',
    title: 'Security',
    desc: 'Hardened, monitored, and always-on.',
    url: 'watnidea.com/security',
    cta: 'Explore',
    Visual: SecurityVisual,
  },
]

/* ===================================================================
   BrowserFrame — shared browser shell: traffic lights + URL bar.
   Used inside every feature visual.
   =================================================================== */
function BrowserFrame({
  url,
  children,
}: {
  url: string
  children: ReactElement | ReactElement[]
}) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
      {/* browser chrome — traffic lights + URL bar */}
      <div className="flex items-center gap-3 border-b border-white/8 bg-white/[0.025] px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#E53935]/80" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <div className="flex h-5 flex-1 items-center rounded-md border border-white/8 bg-[#1A1A1A]/80 px-2">
          <span className="text-[9px] font-medium text-white/45" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
            {url}
          </span>
        </div>
      </div>
      {/* content area */}
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

/* ===================================================================
   Feature visuals — one per feature. Each renders inside a
   BrowserFrame. All hooks declared unconditionally at the top.
   =================================================================== */

/* 01 Speed — lighthouse-style gauge + progress bar. */
function SpeedVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center gap-4 p-4" aria-hidden>
      {/* circular gauge */}
      <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#speedGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="263.9"
            initial={{ strokeDashoffset: 263.9 }}
            animate={{ strokeDashoffset: [263.9, 5.3] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 4px rgba(229,57,53,0.7))' }}
          />
          <defs>
            <linearGradient id="speedGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff6b63" />
              <stop offset="100%" stopColor="#a8201d" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-xl font-bold text-white sm:text-2xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            98
          </motion.span>
          <span className="text-[8px] uppercase tracking-[0.15em] text-white/40">
            score
          </span>
        </div>
      </div>
      {/* right side — metric bars */}
      <div className="flex-1 space-y-2">
        {[
          { l: 'FCP', w: '88%' },
          { l: 'LCP', w: '94%' },
          { l: 'TBT', w: '76%' },
          { l: 'CLS', w: '92%' },
        ].map((m, i) => (
          <div key={m.l} className="flex items-center gap-2">
            <span className="w-7 text-[9px] font-medium text-white/45">{m.l}</span>
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#ff6b63] to-[#E53935]"
                initial={{ width: 0 }}
                animate={{ width: m.w }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
            </div>
          </div>
        ))}
        {/* tiny lighthouse glyph */}
        <div className="flex items-center gap-1 pt-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#ff6b63]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/40">
            Lighthouse · pass
          </span>
        </div>
      </div>
    </div>
  )
}

/* 02 Mobile Responsiveness — three device frames morphing. */
function ResponsiveVisual() {
  return (
    <div className="relative flex h-full w-full items-end justify-center gap-2 p-3 sm:gap-3 sm:p-4" aria-hidden>
      {/* phone */}
      <motion.div
        className="relative w-9 rounded-md border border-white/15 bg-[#1A1A1A]/80 sm:w-11"
        animate={{ height: ['70%', '78%', '70%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-x-1 top-1 h-1 rounded-full bg-white/15" />
        <div className="absolute inset-x-1.5 top-3 space-y-1">
          <div className="h-1 w-2/3 rounded-full bg-[#E53935]/55" />
          <div className="h-1 w-1/2 rounded-full bg-white/15" />
          <div className="h-1 w-3/4 rounded-full bg-white/15" />
          <div className="mt-1 h-3 rounded-sm bg-white/8" />
        </div>
      </motion.div>
      {/* tablet */}
      <motion.div
        className="relative w-14 rounded-md border border-white/15 bg-[#1A1A1A]/80 sm:w-16"
        animate={{ height: ['78%', '88%', '78%'] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        <div className="absolute inset-x-1.5 top-1 h-1 rounded-full bg-white/15" />
        <div className="absolute inset-x-2 top-3 space-y-1">
          <div className="h-1 w-1/2 rounded-full bg-[#E53935]/55" />
          <div className="h-1 w-3/4 rounded-full bg-white/15" />
          <div className="mt-1 grid grid-cols-2 gap-1">
            <div className="h-3 rounded-sm bg-white/8" />
            <div className="h-3 rounded-sm bg-white/8" />
          </div>
        </div>
      </motion.div>
      {/* desktop */}
      <motion.div
        className="relative w-24 rounded-md border border-white/15 bg-[#1A1A1A]/80 sm:w-28"
        animate={{ height: ['88%', '96%', '88%'] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <div className="absolute inset-x-2 top-1.5 h-1 rounded-full bg-white/15" />
        <div className="absolute inset-x-2 top-4 space-y-1">
          <div className="h-1 w-1/3 rounded-full bg-[#E53935]/55" />
          <div className="h-1 w-2/3 rounded-full bg-white/15" />
          <div className="mt-1 grid grid-cols-3 gap-1">
            <div className="h-4 rounded-sm bg-white/8" />
            <div className="h-4 rounded-sm bg-white/8" />
            <div className="h-4 rounded-sm bg-white/8" />
          </div>
        </div>
        {/* monitor base */}
        <div className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-b-sm bg-white/20" />
      </motion.div>
      {/* scan overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.04, 0.18, 0.04] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(0deg, transparent, rgba(229,57,53,0.25), transparent)',
        }}
      />
    </div>
  )
}

/* 03 SEO Readiness — search results climbing + meta tags + schema. */
function SeoVisual() {
  return (
    <div className="relative flex h-full w-full flex-col gap-2 p-3" aria-hidden>
      {/* search bar */}
      <div className="flex items-center gap-2 rounded-md border border-white/8 bg-[#1A1A1A]/80 px-2.5 py-1.5">
        <motion.span
          className="h-2 w-2 rounded-full bg-[#E53935]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-[9px] text-white/45">your brand · #1 result</span>
      </div>
      {/* search results — rank climbing */}
      <div className="space-y-1.5">
        {[
          { rank: 1, you: true },
          { rank: 2, you: false },
          { rank: 3, you: false },
        ].map((r) => (
          <motion.div
            key={r.rank}
            className="flex items-center gap-2 rounded-md border px-2 py-1.5"
            style={{
              borderColor: r.you ? 'rgba(229,57,53,0.5)' : 'rgba(255,255,255,0.08)',
              background: r.you ? 'rgba(229,57,53,0.08)' : 'rgba(255,255,255,0.02)',
            }}
            animate={r.you ? { y: [3, 0, 3] } : { opacity: [0.6, 0.85, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span
              className="text-[10px] font-bold"
              style={{
                color: r.you ? '#E53935' : 'rgba(255,255,255,0.3)',
                fontFamily: 'var(--font-display), sans-serif',
              }}
            >
              #{r.rank}
            </span>
            <div className="flex-1 space-y-0.5">
              <div className="h-1 w-3/4 rounded-full" style={{ background: r.you ? 'rgba(229,57,53,0.55)' : 'rgba(255,255,255,0.18)' }} />
              <div className="h-1 w-full rounded-full bg-white/8" />
              <div className="h-1 w-1/2 rounded-full bg-white/8" />
            </div>
          </motion.div>
        ))}
      </div>
      {/* meta + schema row */}
      <div className="mt-auto flex gap-2">
        {/* meta tag block */}
        <div className="flex-1 rounded-md border border-white/8 bg-[#1A1A1A]/80 p-1.5">
          <div className="text-[8px] uppercase tracking-[0.15em] text-white/30">meta</div>
          <div className="mt-0.5 space-y-0.5">
            <div className="h-0.5 w-full rounded-full bg-[#E53935]/45" />
            <div className="h-0.5 w-3/4 rounded-full bg-white/15" />
          </div>
        </div>
        {/* schema block */}
        <div className="flex-1 rounded-md border border-white/8 bg-[#1A1A1A]/80 p-1.5">
          <div className="text-[8px] uppercase tracking-[0.15em] text-white/30">schema</div>
          <div className="mt-0.5 font-mono text-[8px] leading-tight text-[#ff6b63]/75">
            {'{ "@type":' }<br />
            {'  "Organization" }'}
          </div>
        </div>
      </div>
    </div>
  )
}

/* 04 Conversion Optimization — funnel + CTA ripple + heatmap. */
function ConversionVisual() {
  return (
    <div className="relative h-full w-full p-3" aria-hidden>
      {/* funnel + heatmap grid */}
      <div className="grid h-full grid-cols-[1fr_auto] gap-2">
        {/* funnel */}
        <div className="flex flex-col justify-center gap-1.5">
          {[
            { w: '100%', l: 'Visitors', c: 'rgba(255,255,255,0.12)' },
            { w: '70%', l: 'Engaged', c: 'rgba(229,57,53,0.4)' },
            { w: '42%', l: 'Leads', c: 'rgba(229,57,53,0.65)' },
            { w: '18%', l: 'Sales', c: 'rgba(229,57,53,0.95)' },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              className="flex items-center justify-between rounded-sm px-1.5 py-1"
              style={{ width: s.w, background: s.c }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            >
              <span className="text-[8px] font-medium text-white/85">{s.l}</span>
              <span className="text-[8px] font-bold text-white/95">{s.w}</span>
            </motion.div>
          ))}
        </div>
        {/* CTA button + ripple */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-md bg-[#E53935]/40"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            />
            <div className="relative rounded-md bg-[#E53935] px-2.5 py-1.5 text-[9px] font-bold text-white">
              CTA
            </div>
          </div>
          {/* heatmap dots */}
          <div className="grid grid-cols-3 gap-0.5">
            {[
              [1, 0.9], [0.5, 0.7], [0.3, 0.4],
              [0.8, 0.6], [1, 1], [0.6, 0.5],
              [0.4, 0.3], [0.7, 0.8], [0.5, 0.4],
            ].map(([size, alpha], i) => (
              <motion.span
                key={i}
                className="rounded-full bg-[#E53935]"
                style={{ width: 4 + size * 3, height: 4 + size * 3, opacity: alpha }}
                animate={{ opacity: [alpha * 0.5, alpha, alpha * 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* 05 Scalability — ascending chart + multiplying server nodes. */
function ScalabilityVisual() {
  return (
    <div className="relative flex h-full w-full flex-col gap-2 p-3" aria-hidden>
      {/* ascending bar chart */}
      <div className="flex flex-1 items-end gap-1.5">
        {[35, 50, 42, 68, 80, 95].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              background: i >= 4
                ? 'linear-gradient(180deg, #ff6b63, #E53935)'
                : 'rgba(255,255,255,0.12)',
            }}
            initial={{ height: '8%' }}
            animate={{ height: [`8%`, `${h}%`, `${h * 0.92}%`] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 0.12,
            }}
          />
        ))}
      </div>
      {/* server nodes — multiplying row */}
      <div className="flex items-center justify-between rounded-md border border-white/8 bg-[#1A1A1A]/80 px-2 py-1.5">
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="flex h-4 w-4 items-center justify-center rounded-sm border border-[#E53935]/45 bg-[#E53935]/8"
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1, 0.9] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.18,
              }}
            >
              <span className="h-1 w-1 rounded-full bg-[#ff6b63]" />
            </motion.div>
          ))}
          <motion.span
            className="ml-1 text-[8px] font-bold text-[#E53935]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            + node
          </motion.span>
        </div>
        <div className="flex items-center gap-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400/85"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[8px] uppercase tracking-[0.15em] text-white/45">
            99.99% uptime
          </span>
        </div>
      </div>
    </div>
  )
}

/* 06 Security — shield + lock + status indicators. */
function SecurityVisual() {
  return (
    <div className="relative flex h-full w-full items-center gap-4 p-4" aria-hidden>
      {/* shield + lock */}
      <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(229,57,53,0.3), transparent 65%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <motion.path
            d="M 50 12 L 78 22 L 78 50 Q 78 76 50 88 Q 22 76 22 50 L 22 22 Z"
            fill="rgba(229,57,53,0.15)"
            stroke="rgba(229,57,53,0.7)"
            strokeWidth="2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(229,57,53,0.5))' }}
          />
          {/* checkmark */}
          <motion.path
            d="M 38 50 L 46 60 L 64 38"
            fill="none"
            stroke="#ff6b63"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>
      {/* status indicators */}
      <div className="flex-1 space-y-1.5">
        {[
          { l: 'HTTPS · TLS 1.3', ok: true },
          { l: 'WAF · Active', ok: true },
          { l: 'DDoS Shield', ok: true },
          { l: '24/7 Monitor', ok: true },
        ].map((s) => (
          <motion.div
            key={s.l}
            className="flex items-center gap-2 rounded-md border border-white/8 bg-[#1A1A1A]/75 px-2 py-1"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="flex h-3 w-3 items-center justify-center rounded-full border border-[#E53935]/55 bg-[#E53935]/15">
              <motion.span
                className="h-1 w-1 rounded-full bg-[#ff6b63]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
            <span className="text-[10px] font-medium text-white/75">{s.l}</span>
            <span className="ml-auto text-[8px] font-bold uppercase tracking-[0.15em] text-[#ff6b63]">
              {s.ok ? 'live' : ''}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ===================================================================
   FeatureCard — single feature card.
   Even index → md:flex-row (visual left, content right).
   Odd index → md:flex-row-reverse (visual right, content left).
   Hooks declared unconditionally at the top.
   =================================================================== */
function FeatureCard({ f, index }: { f: Feature; index: number }) {
  const reversed = index % 2 === 1
  return (
    <motion.article
      data-cursor="View"
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl transition-colors duration-500 hover:border-[#E53935]/55 md:flex md:min-h-[320px] ${
        reversed ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* hover red glow bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 shadow-[0_0_50px_rgba(229,57,53,0.22)] transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* hover radial tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 0%, rgba(229,57,53,0.14), transparent 60%)',
        }}
      />

      {/* === Visual area (browser environment) === */}
      <div className="relative w-full overflow-hidden border-b border-white/8 bg-[#1A1A1A]/75 p-4 sm:p-5 md:w-1/2 md:border-b-0 md:border-r md:border-white/8">
        <div className={reversed ? 'md:border-r-0 md:border-l' : ''} />
        <div className="relative h-44 w-full sm:h-52 md:h-full md:min-h-[260px]">
          <motion.div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
            transition={{ ease: [0.16, 1, 0.3, 1] }}
          >
            <BrowserFrame url={f.url}>
              <f.Visual />
            </BrowserFrame>
          </motion.div>
        </div>
        {/* corner number */}
        <span
          className="absolute left-5 top-5 text-xs font-bold text-white/25 transition-colors duration-300 group-hover:text-[#E53935]/60"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          ({f.n})
        </span>
      </div>

      {/* === Content area === */}
      <div className="relative flex w-full flex-1 flex-col justify-between p-5 sm:p-6 md:w-1/2 md:p-7">
        <div>
          <h3
            className="text-2xl font-semibold text-white sm:text-3xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {f.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
            {f.desc}
          </p>
        </div>

        {/* See it live / Explore row */}
        <div className="mt-6 flex items-center gap-2 text-[11px] font-semibold text-[#E53935] opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>{f.cta}</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* bottom accent line */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-transparent transition-all duration-500 group-hover:w-full"
        />
      </div>
    </motion.article>
  )
}

/* ===================================================================
   DhqFeatureShowcase — Section 6 named export
   =================================================================== */
export function DhqFeatureShowcase() {
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
        <StickyRail label="Features" caption="Standards" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0) 65%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Header block */}
          <motion.div style={{ y: headerY }} className="relative z-10 mb-14 max-w-3xl">
            <SectionEyebrow number="06" label="Features" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>
                Built to <RedGradientText>Perform.</RedGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Every site we ship is engineered against six non-negotiable
              standards.
            </motion.p>
          </motion.div>

          {/* Feature grid — md:grid-cols-2 */}
          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((f, i) => (
              <FeatureCard key={f.n} f={f} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
