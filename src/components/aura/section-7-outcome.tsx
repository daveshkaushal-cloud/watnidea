'use client'

/**
 * AuraOutcome — Section 7
 * The Outcome — large editorial section, before/after perception,
 * animated count-up metrics, identity evolution strip.
 *
 * Composition:
 *   - Eyebrow: (07) · The Outcome
 *   - Headline: "The Outcome" ("Outcome" red gradient) — font-display
 *   - Sub: verbatim — "We help businesses build identities people remember,
 *     create digital experiences customers love, and launch campaigns that
 *     generate measurable growth."
 *
 * Visual layers:
 *   - Before vs After perception layout (md+ 2-col, mobile stacked):
 *       Before (white/40, muted, scattered, generic)
 *         "Identical. Forgettable. Invisible."
 *       After (red, vibrant, organized, glowing, distinct)
 *         "Distinct. Memorable. Unmissable."
 *       Center divider with → arrow.
 *   - Scroll-driven: Before fades/mutes, After glows in (useScroll +
 *     useTransform on opacity/scale).
 *   - Animated metrics (4 stats, count-up on whileInView):
 *       40+   / brands scaled
 *       ▲ 218% / avg ROAS uplift
 *       7     / services, one identity engine
 *       100%  / ownership of your identity
 *   - Identity evolution strip: horizontal strip showing a brand mark
 *     evolving grey/basic → red/refined → glowing/final (scroll-driven).
 *
 * Sticky rail (lg+): label `The Outcome`, caption `Impact`.
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from '@/components/about/shared'

/* ===================================================================
   Stats — 4 metrics. `value` is the numeric target; `prefix`/`suffix`
   decorate the rendered number (e.g. "▲ 218%"). The single real stat
   (40+) is verbatim from the codebase; the rest are decorative/derived.
   =================================================================== */
type Stat = {
  prefix?: string
  value: number
  suffix?: string
  label: string
}

const stats: Stat[] = [
  { value: 7, label: 'specialist services' },
  { value: 1, label: 'unified creative team' },
  { value: 100, suffix: '%', label: 'ownership of your identity' },
  { prefix: 'Now', value: 0, suffix: '', label: 'accepting selected projects' },
]

/* ===================================================================
   useCountUp — animates 0 → target on `inView` (easeOutCubic).
   Re-runs only if `inView` flips to true (once:true semantics caller-side).
   =================================================================== */
function useCountUp(target: number, inView: boolean, duration = 1.5) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      setVal(Math.round(target * (1 - Math.pow(1 - t, 3)))) // easeOutCubic
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  return val
}

/* ===================================================================
   StatItem — single stat card with count-up.
   Hooks declared unconditionally at the top.
   =================================================================== */
function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const [inView, setInView] = useState(false)
  const count = useCountUp(stat.value, inView, 1.6)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      onViewportEnter={() => setInView(true)}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl sm:p-7"
    >
      {/* hover red tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 0%, rgba(229,57,53,0.18), transparent 60%)',
        }}
      />
      {/* number */}
      <div
        className="relative text-5xl font-bold leading-none sm:text-6xl"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        <RedGradientText>
          {stat.prefix}
          {count}
          {stat.suffix}
        </RedGradientText>
      </div>
      {/* label */}
      <span className="relative mt-3 block text-sm text-white/55 wn-eyebrow">
        {stat.label}
      </span>
    </motion.div>
  )
}

/* ===================================================================
   BeforePanel — "forgotten brand" state. Muted/grey, scattered, generic.
   opacity dims as scroll progresses (driven by parent).
   =================================================================== */
function BeforePanel({ opacity }: { opacity: ReturnType<typeof useTransform> }) {
  return (
    <motion.div
      style={{ opacity }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md sm:p-10"
    >
      {/* scattered grey marks */}
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden>
        {[
          { l: '12%', t: '18%', s: 22, r: 8 },
          { l: '78%', t: '22%', s: 18, r: -12 },
          { l: '22%', t: '70%', s: 26, r: 18 },
          { l: '68%', t: '76%', s: 20, r: -8 },
          { l: '46%', t: '12%', s: 16, r: 4 },
        ].map((m, i) => (
          <motion.div
            key={i}
            className="absolute rounded-md"
            style={{
              left: m.l,
              top: m.t,
              width: m.s,
              height: m.s,
              rotate: m.r,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            animate={{ y: [0, -4, 0], opacity: [0.5, 0.8, 0.5] }}
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
        Before
      </span>

      {/* copy */}
      <p
        className="relative mt-6 text-2xl font-bold leading-tight text-white/45 sm:text-3xl"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        Identical. Forgettable. Invisible.
      </p>

      {/* muted descriptor */}
      <p className="relative mt-4 text-sm leading-relaxed text-white/30">
        The brand blends into the noise. No positioning. No signal. No recall.
      </p>

      {/* generic grey logo lockup placeholder */}
      <div className="relative mt-6 flex items-center gap-2 opacity-50">
        <div className="h-6 w-6 rounded-full bg-white/15" />
        <div className="h-2 w-20 rounded-full bg-white/15" />
      </div>
    </motion.div>
  )
}

/* ===================================================================
   AfterPanel — "aura-built brand" state. Vibrant red, organized, glowing.
   opacity + scale bloom as scroll progresses (driven by parent).
   =================================================================== */
function AfterPanel({
  opacity,
  scale,
}: {
  opacity: ReturnType<typeof useTransform>
  scale: ReturnType<typeof useTransform>
}) {
  return (
    <motion.div
      style={{ opacity, scale }}
      className="relative overflow-hidden rounded-2xl border border-[#E53935]/40 bg-[#E53935]/[0.04] p-8 shadow-[0_0_50px_rgba(229,57,53,0.18)] backdrop-blur-md sm:p-10"
    >
      {/* red glow ambient */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.25), transparent 65%)',
          filter: 'blur(30px)',
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* organized red identity mark */}
      <div className="pointer-events-none absolute right-6 top-6 opacity-90" aria-hidden>
        <motion.div
          className="h-12 w-12 rounded-lg"
          style={{
            background:
              'radial-gradient(circle, rgba(255,107,99,0.95), rgba(229,57,53,0.4) 70%)',
            border: '1px solid rgba(255,107,99,0.7)',
            boxShadow: '0 0 20px rgba(229,57,53,0.7)',
          }}
          animate={{ rotate: [0, 90, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* label */}
      <span className="relative wn-eyebrow text-[11px] font-medium text-[#E53935]">
        After
      </span>

      {/* copy */}
      <p
        className="relative mt-6 text-2xl font-bold leading-tight sm:text-3xl"
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        <span className="text-white">Distinct. Memorable.</span>{' '}
        <RedGradientText>Unmissable.</RedGradientText>
      </p>

      {/* descriptor */}
      <p className="relative mt-4 text-sm leading-relaxed text-white/65">
        The brand commands attention. Sharp positioning. Visual DNA you feel.
        Recall that compounds.
      </p>

      {/* vibrant red logo lockup */}
      <div className="relative mt-6 flex items-center gap-2">
        <div
          className="h-6 w-6 rounded-full"
          style={{
            background:
              'radial-gradient(circle, #ff6b63, #E53935 70%)',
            boxShadow: '0 0 12px rgba(229,57,53,0.8)',
          }}
        />
        <div
          className="h-2 w-24 rounded-full"
          style={{
            background:
              'linear-gradient(to right, #E53935, rgba(229,57,53,0.2))',
          }}
        />
      </div>
    </motion.div>
  )
}

/* ===================================================================
   IdentityEvolutionStrip — horizontal strip showing a brand mark
   evolving through stages. Scroll-driven progression (scaleX line).
   =================================================================== */
function IdentityEvolutionStrip({
  progress,
}: {
  progress: ReturnType<typeof useTransform>
}) {
  const stages = [
    { label: 'Generic', desc: 'muted' },
    { label: 'Defined', desc: 'positioned' },
    { label: 'Refined', desc: 'designed' },
    { label: 'Aura', desc: 'unmissable' },
  ]
  return (
    <div className="relative mt-16 sm:mt-20">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-8 bg-[#E53935]/60" />
        <span className="wn-eyebrow text-[10px] font-medium text-white/45">
          Identity evolution
        </span>
      </div>

      <div className="relative grid grid-cols-4 gap-3 sm:gap-5">
        {/* progression line */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-7 h-px bg-white/8"
        >
          <motion.div
            style={{ scaleX: progress }}
            className="absolute left-0 top-0 h-full w-full origin-left bg-gradient-to-r from-white/15 via-[#ff6b63] to-[#E53935]"
          />
        </div>

        {stages.map((s, i) => {
          const isFinal = i === stages.length - 1
          const isMid = i >= 1
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col items-center"
            >
              {/* mark */}
              <div className="relative mb-4 h-14 w-14">
                {/* dot base */}
                <div
                  className="absolute inset-0 rounded-full border"
                  style={{
                    borderColor: isFinal
                      ? 'rgba(229,57,53,0.85)'
                      : isMid
                        ? 'rgba(255,107,99,0.5)'
                        : 'rgba(255,255,255,0.18)',
                    background: isFinal
                      ? 'radial-gradient(circle, rgba(255,107,99,0.95), rgba(229,57,53,0.4) 70%)'
                      : isMid
                        ? 'rgba(229,57,53,0.18)'
                        : 'rgba(255,255,255,0.05)',
                    boxShadow: isFinal
                      ? '0 0 24px rgba(229,57,53,0.75)'
                      : 'none',
                  }}
                />
                {isFinal && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-[#E53935]/40"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                )}
              </div>
              {/* label */}
              <span
                className="text-sm font-semibold"
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  color: isFinal
                    ? '#ff6b63'
                    : isMid
                      ? 'rgba(255,255,255,0.85)'
                      : 'rgba(255,255,255,0.4)',
                }}
              >
                {s.label}
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-white/30">
                {s.desc}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ===================================================================
   AuraOutcome — Section 7 default export.
   =================================================================== */
export function AuraOutcome() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Before fades out as we scroll IN; After glows in.
  // Map scroll 0→1 to perception transition centred on 0.5.
  const beforeOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.7],
    [0.95, 0.5, 0.35]
  )
  const afterOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.7],
    [0.4, 0.95, 1]
  )
  const afterScale = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.7],
    [0.97, 1.01, 1.02]
  )
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])
  // evolution strip progression line — drives as the strip enters view
  const evolutionProgress = useTransform(scrollYProgress, [0.45, 0.85], [0, 1])

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <StickyRail
          label="The Outcome"
          caption="Impact"
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
          <motion.div style={{ y: headerY }} className="relative z-10 mb-16 max-w-3xl">
            <SectionEyebrow number="07" label="The Outcome" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>
                The <RedGradientText>Outcome</RedGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              We help businesses build identities people remember, create
              digital experiences customers love, and launch campaigns that
              generate measurable growth.
            </motion.p>
          </motion.div>

          {/* === Before vs After === */}
          <div className="relative z-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-4">
            <BeforePanel opacity={beforeOpacity} />

            {/* center divider with arrow */}
            <div className="flex items-center justify-center py-2 md:py-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E53935]/45 bg-[#E53935]/10 backdrop-blur-md"
                style={{ boxShadow: '0 0 24px rgba(229,57,53,0.35)' }}
              >
                <ArrowRight className="h-5 w-5 text-[#E53935]" />
              </motion.div>
            </div>

            <AfterPanel opacity={afterOpacity} scale={afterScale} />
          </div>

          {/* === Animated metrics === */}
          <div className="relative z-10 mt-20">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#E53935]/60" />
              <span className="wn-eyebrow text-[10px] font-medium text-white/45">
                The numbers
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
              {stats.map((s, i) => (
                <StatItem key={s.label} stat={s} index={i} />
              ))}
            </div>
          </div>

          {/* === Identity evolution strip === */}
          <div className="relative z-10">
            <IdentityEvolutionStrip progress={evolutionProgress} />
          </div>
        </div>
      </div>
    </div>
  )
}
