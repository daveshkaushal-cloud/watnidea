'use client'

/**
 * DhqWebsitesThatWork — Section 7
 * Interactive comparison — Brochure vs Asset. Scroll-driven
 * transformation: the "Brochure" side starts full, fades/greys as you
 * scroll IN; the "Asset" side is muted/empty, glows in as scroll
 * progresses. Plus parallax depth (two sides drift at different rates).
 *
 * Composition:
 *   - Eyebrow: (07) · Websites That Work
 *   - Headline: "Websites That Work." ("Work." red gradient) — font-display
 *   - Sub (verbatim): "High-speed, conversion-focused websites that act
 *     as your 24/7 sales engine and digital headquarters."
 *
 * Comparison:
 *   LEFT  — Website as Brochure (white/40 label, muted grey visual)
 *     · Static. Forgotten. Updating it is a chore.
 *     · Visitors leave. No path. No conversion.
 *     · A cost center. Not a growth engine.
 *   RIGHT — Website as Business Asset (red label, glowing red visual)
 *     · Live. Compounding. Always improving.
 *     · Every visit engineered to convert.
 *     · A 24/7 salesperson. Brand ambassador. Growth engine.
 *
 * Center divider with → arrow showing the transformation.
 *
 * Closing statement: "Your website is your digital headquarters."
 * ("digital headquarters" red gradient).
 *
 * Sticky rail (lg+): label `Websites That Work`, caption `Asset`.
 *
 * Hooks declared unconditionally at the top — useScroll + useTransform
 * on opacity/scale/parallax-Y for the two sides. Uses ref-typed
 * motion values passed down into BrochurePanel / AssetPanel.
 */

import { useRef, type ReactElement } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from '@/components/about/shared'

/* ===================================================================
   Verbatim copy (preserve every character).
   =================================================================== */
const brochureLabel = 'Website as Brochure'
const assetLabel = 'Website as Business Asset'
const brochureBullets = [
  'Static. Forgotten. Updating it is a chore.',
  'Visitors leave. No path. No conversion.',
  'A cost center. Not a growth engine.',
]
const assetBullets = [
  'Live. Compounding. Always improving.',
  'Every visit engineered to convert.',
  'A 24/7 salesperson. Brand ambassador. Growth engine.',
]

/* ===================================================================
   BrochureVisual — flat, lifeless, grey browser frame.
   =================================================================== */
function BrochureVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/70">
        {/* browser chrome — greyed out */}
        <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <div className="ml-2 h-5 flex-1 rounded-md border border-white/8 bg-[#1A1A1A]/75" />
        </div>
        {/* lifeless content — scattered grey blocks */}
        <div className="relative flex-1 p-4">
          <div className="space-y-2 opacity-50">
            <div className="h-2 w-1/2 rounded-full bg-white/15" />
            <div className="h-2 w-3/4 rounded-full bg-white/10" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 opacity-40">
            <div className="h-10 rounded-sm bg-white/6" />
            <div className="h-10 rounded-sm bg-white/6" />
            <div className="h-10 rounded-sm bg-white/6" />
          </div>
          <div className="mt-4 space-y-1.5 opacity-40">
            <div className="h-1.5 w-full rounded-full bg-white/8" />
            <div className="h-1.5 w-5/6 rounded-full bg-white/8" />
            <div className="h-1.5 w-2/3 rounded-full bg-white/8" />
          </div>
          {/* broken-traffic indicator — bouncing out */}
          <motion.div
            className="absolute right-3 top-3 flex items-center gap-1"
            animate={{ y: [0, -3, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span className="text-[8px] uppercase tracking-[0.15em] text-white/25">
              bounce
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ===================================================================
   AssetVisual — dynamic, glowing, red, alive browser frame.
   =================================================================== */
function AssetVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* red glow behind */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.35), transparent 65%)',
          filter: 'blur(28px)',
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-[#E53935]/45 bg-[#0a0a0a]/85 backdrop-blur-md">
        {/* browser chrome — glowing red dots */}
        <div className="flex items-center gap-2 border-b border-[#E53935]/25 bg-[#E53935]/[0.06] px-3 py-2">
          <motion.span
            className="h-2 w-2 rounded-full bg-[#E53935]"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 6px rgba(229,57,53,0.85)' }}
          />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <div className="ml-2 flex h-5 flex-1 items-center rounded-md border border-[#E53935]/30 bg-[#1A1A1A]/80 px-2">
            <span className="text-[9px] font-medium text-[#ff6b63]">
              your-brand.com
            </span>
          </div>
        </div>
        {/* alive content — animated red blocks */}
        <div className="relative flex-1 p-4">
          {/* hero */}
          <div className="space-y-2">
            <motion.div
              className="h-2.5 w-3/4 rounded-full bg-gradient-to-r from-[#ff6b63] to-[#E53935]"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="h-2 w-full rounded-full bg-white/18" />
            <div className="h-2 w-5/6 rounded-full bg-white/12" />
          </div>
          {/* metric tiles */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="relative h-10 rounded-sm border border-[#E53935]/30 bg-[#E53935]/8"
                animate={{ opacity: [0.6, 1, 0.6], y: [0, -2, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.25,
                }}
              >
                <div className="absolute inset-x-1 top-1 h-0.5 rounded-full bg-[#ff6b63]/65" />
                <div className="absolute inset-x-1 bottom-1 h-1 rounded-full bg-white/20" />
              </motion.div>
            ))}
          </div>
          {/* CTA + live indicator */}
          <div className="mt-4 flex items-center justify-between">
            <motion.div
              className="rounded-md bg-[#E53935] px-2.5 py-1 text-[9px] font-bold text-white"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ boxShadow: '0 0 12px rgba(229,57,53,0.7)' }}
            >
              Get Started →
            </motion.div>
            <div className="flex items-center gap-1">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400/85"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-[8px] uppercase tracking-[0.18em] text-white/45">
                live · 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===================================================================
   Bullet list for each side.
   =================================================================== */
function Bullets({
  items,
  variant,
}: {
  items: string[]
  variant: 'brochure' | 'asset'
}) {
  const isAsset = variant === 'asset'
  return (
    <ul className="mt-5 space-y-3">
      {items.map((b, i) => (
        <motion.li
          key={b}
          initial={{ opacity: 0, x: isAsset ? 12 : -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            duration: 0.6,
            delay: 0.4 + i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-start gap-3"
        >
          <span
            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
              isAsset ? 'bg-[#E53935]' : 'bg-white/30'
            }`}
            style={
              isAsset
                ? { boxShadow: '0 0 6px rgba(229,57,53,0.7)' }
                : undefined
            }
          />
          <span
            className={`text-sm leading-relaxed sm:text-base ${
              isAsset ? 'text-white/85' : 'text-white/45'
            }`}
          >
            {b}
          </span>
        </motion.li>
      ))}
    </ul>
  )
}

/* ===================================================================
   BrochurePanel — muted/grey, fades as scroll progresses.
   =================================================================== */
function BrochurePanel({
  opacity,
  y,
}: {
  opacity: MotionValue<number>
  y: MotionValue<number>
}) {
  return (
    <motion.div
      style={{ opacity, y }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md sm:p-8"
    >
      {/* scattered grey shapes (parallax bg) */}
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
        {[
          { l: '12%', t: '18%', s: 18, r: 10 },
          { l: '78%', t: '22%', s: 14, r: -14 },
          { l: '22%', t: '72%', s: 22, r: 18 },
          { l: '70%', t: '78%', s: 16, r: -8 },
        ].map((m, i) => (
          <motion.div
            key={i}
            className="absolute rounded-md border border-white/8 bg-white/4"
            style={{
              left: m.l,
              top: m.t,
              width: m.s,
              height: m.s,
              rotate: m.r,
            }}
            animate={{ y: [0, -4, 0], opacity: [0.3, 0.55, 0.3] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* label */}
      <span className="relative wn-eyebrow text-[11px] font-medium text-white/40">
        {brochureLabel}
      </span>

      {/* visual */}
      <div className="relative mt-5 h-44 w-full sm:h-52">
        <BrochureVisual />
      </div>

      {/* bullets */}
      <Bullets items={brochureBullets} variant="brochure" />
    </motion.div>
  )
}

/* ===================================================================
   AssetPanel — vibrant red, glows in as scroll progresses.
   =================================================================== */
function AssetPanel({
  opacity,
  y,
  scale,
}: {
  opacity: MotionValue<number>
  y: MotionValue<number>
  scale: MotionValue<number>
}) {
  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="relative overflow-hidden rounded-3xl border border-[#E53935]/45 bg-[#E53935]/[0.05] p-6 shadow-[0_0_50px_rgba(229,57,53,0.18)] backdrop-blur-md sm:p-8"
    >
      {/* red glow ambient */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.28), transparent 65%)',
          filter: 'blur(30px)',
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* label */}
      <span className="relative wn-eyebrow text-[11px] font-medium text-[#E53935]">
        {assetLabel}
      </span>

      {/* visual */}
      <div className="relative mt-5 h-44 w-full sm:h-52">
        <AssetVisual />
      </div>

      {/* bullets */}
      <Bullets items={assetBullets} variant="asset" />
    </motion.div>
  )
}

/* ===================================================================
   CenterArrow — the → divider between the two panels.
   Pulses subtly to imply the transformation.
   =================================================================== */
function CenterArrow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"
    >
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#E53935]/55 bg-[#141414]/85 backdrop-blur-md">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.35), transparent 65%)',
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowRight className="h-5 w-5 text-[#ff6b63]" />
        </motion.span>
      </div>
    </div>
  )
}

/* ===================================================================
   DhqWebsitesThatWork — Section 7 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function DhqWebsitesThatWork(): ReactElement {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Brochure fades out + drifts down as we scroll IN.
  // Asset glows in + drifts up. Map scroll 0→1 to perception transition
  // centred on 0.5.
  const brochureOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.7],
    [0.95, 0.45, 0.3]
  )
  const brochureY = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.7],
    [0, 14, 28]
  )
  const assetOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.7],
    [0.35, 0.95, 1]
  )
  const assetY = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.7],
    [28, 0, -14]
  )
  const assetScale = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.7],
    [0.97, 1.01, 1.02]
  )
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <StickyRail
          label="Websites That Work"
          caption="Asset"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(229,57,53,0.18), rgba(229,57,53,0) 65%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Header block */}
          <motion.div style={{ y: headerY }} className="relative z-10 mb-14 max-w-3xl">
            <SectionEyebrow number="07" label="Websites That Work" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>
                Websites That <RedGradientText>Work.</RedGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              High-speed, conversion-focused websites that act as your
              24/7 sales engine and digital headquarters.
            </motion.p>
          </motion.div>

          {/* Comparison grid (md:grid-cols-2) */}
          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <BrochurePanel opacity={brochureOpacity} y={brochureY} />
            <AssetPanel opacity={assetOpacity} y={assetY} scale={assetScale} />
            <CenterArrow />
          </div>

          {/* Closing statement */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto mt-16 max-w-3xl text-center text-2xl font-semibold leading-snug sm:text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Your website is your{' '}
            <RedGradientText>digital headquarters.</RedGradientText>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
