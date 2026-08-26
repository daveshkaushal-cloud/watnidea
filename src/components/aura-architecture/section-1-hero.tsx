'use client'

/**
 * AuraHero — Section 1 of the /aura-architecture page.
 *
 * Full-screen cinematic hero — luxury brand consultancy meets strategy.
 *
 * Composition:
 *   - SectionEyebrow `(01) Brand Strategy & Identity`
 *   - Massive 2-line headline: `Identity Lab` / `Built for Growth.` (Growth. red)
 *   - Sub: verbatim Aura Architecture description
 *   - Service metadata strip: `01 / 07` · `Branding — Engine` · `Aura Architecture`
 *   - MagneticButton primary `Book Strategy Call` + secondary `Explore Our Work`
 *   - Side vertical label (lg only)
 *   - Scroll indicator
 *   - Living identity ecosystem visual:
 *       * Hero-scale AuraVisual (morphing identity mark + dashed orbit ring
 *         + 6 orbiting particles + pulsing red core)
 *       * Floating brand glyphs (Fingerprint / Sparkles / Orbit / Hexagon /
 *         Triangle) drifting with parallax
 *       * Red energy embers (motion divs rising)
 *       * Liquid chrome blobs (radial gradients morphing scale/rotate/borderRadius)
 *       * Mouse-reactive parallax depth via useCursorParallax
 *   - Scroll-driven fade-out + y translate on the content as you scroll past
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'framer-motion'
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Fingerprint,
  Hexagon,
  Orbit,
  Sparkles,
  Triangle,
} from 'lucide-react'
import MagneticButton from '@/components/hero/magnetic-button'
import { MaskLine, RedGradientText, SectionEyebrow } from '@/components/about/shared'

/* ===================================================================
   HeroIdentityVisual — hero-scale AuraVisual motif (the morphing identity
   mark + dashed counter-rotating orbit ring + 6 orbiting particles +
   pulsing red core). Scaled up to be a hero-scale visual.
   Mouse-reactive parallax depth (foreground mark moves more than bg blobs).
   =================================================================== */
function HeroIdentityVisual({
  sx,
  sy,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
}) {
  // foreground parallax (moves most)
  const fgX = useTransform(sx, [0, 1], [-30, 30])
  const fgY = useTransform(sy, [0, 1], [-22, 22])
  // mid layer
  const mdX = useTransform(sx, [0, 1], [-16, 16])
  const mdY = useTransform(sy, [0, 1], [-12, 12])
  // background (moves least)
  const bgX = useTransform(sx, [0, 1], [-8, 8])
  const bgY = useTransform(sy, [0, 1], [-6, 6])

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* === BACKGROUND: liquid chrome blobs === */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
        <motion.div
          className="absolute left-[14%] top-[18%] h-[34vw] w-[34vw] max-h-[420px] max-w-[420px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.10), rgba(229,57,53,0.10) 40%, rgba(229,57,53,0) 70%)',
            filter: 'blur(30px)',
          }}
          animate={{
            scale: [1, 1.14, 0.94, 1],
            rotate: [0, 28, -16, 0],
            borderRadius: ['42%', '60%', '46%', '42%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[12%] right-[10%] h-[30vw] w-[30vw] max-h-[380px] max-w-[380px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 60% 40%, rgba(229,57,53,0.22), rgba(168,32,29,0.12) 50%, rgba(229,57,53,0) 75%)',
            filter: 'blur(34px)',
          }}
          animate={{
            scale: [1, 1.18, 0.94, 1],
            rotate: [0, -32, 14, 0],
            borderRadius: ['50%', '38%', '58%', '50%'],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* === MID: floating brand glyphs === */}
      <motion.div style={{ x: mdX, y: mdY }} className="absolute inset-0">
        <motion.div
          className="absolute left-[12%] top-[26%]"
          animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Fingerprint className="h-12 w-12 text-[#E53935]/45" />
        </motion.div>
        <motion.div
          className="absolute right-[14%] top-[30%]"
          animate={{ y: [0, 18, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Orbit className="h-14 w-14 text-white/30" />
        </motion.div>
        <motion.div
          className="absolute bottom-[24%] left-[18%]"
          animate={{ y: [0, -10, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="h-8 w-8 text-[#ff6b63]/70" />
        </motion.div>
        <motion.div
          className="absolute right-[20%] bottom-[22%]"
          animate={{ y: [0, 12, 0], rotate: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Hexagon className="h-10 w-10 text-white/20" />
        </motion.div>
        <motion.div
          className="absolute left-[40%] top-[16%]"
          animate={{ y: [0, -8, 0], rotate: [0, -16, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Triangle className="h-7 w-7 text-[#E53935]/30" />
        </motion.div>
      </motion.div>

      {/* === FOREGROUND: hero-scale AuraVisual === */}
      <motion.div
        style={{ x: fgX, y: fgY }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative h-[60vw] w-[60vw] max-h-[620px] max-w-[620px]">
          {/* radial red base glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.18), transparent 65%)',
            }}
          />
          {/* morphing identity mark */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2"
            animate={{
              borderRadius: ['24%', '50%', '46%', '50%', '24%'],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            style={{
              border: '1px solid rgba(229,57,53,0.55)',
              background:
                'radial-gradient(circle, rgba(229,57,53,0.22), transparent 72%)',
            }}
          />
          {/* dashed counter-rotating orbit ring */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[32%] w-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            style={{ border: '1px dashed rgba(255,255,255,0.20)' }}
          />
          {/* 6 orbiting particles at increasing radii */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const r = 100 + i * 26
            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: r * 2,
                  height: r * 2,
                  marginLeft: -r,
                  marginTop: -r,
                }}
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 12 + i * 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <span
                  className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/85"
                  style={{ boxShadow: '0 0 8px rgba(255,255,255,0.7)' }}
                />
              </motion.div>
            )
          })}
          {/* pulsing red identity core */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              boxShadow:
                '0 0 18px rgba(229,57,53,0.95), 0 0 40px rgba(229,57,53,0.5)',
            }}
          />
        </div>
      </motion.div>

      {/* === Floating red embers (rising motion divs) === */}
      {[
        { l: '22%', t: '70%', d: 0 },
        { l: '70%', t: '62%', d: 1.2 },
        { l: '82%', t: '72%', d: 2.4 },
        { l: '38%', t: '78%', d: 0.6 },
        { l: '60%', t: '80%', d: 1.8 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#E53935]"
          style={{
            left: p.l,
            top: p.t,
            boxShadow:
              '0 0 10px rgba(229,57,53,0.9), 0 0 24px rgba(229,57,53,0.5)',
          }}
          animate={{ y: [0, -120], opacity: [0, 1, 0] }}
          transition={{
            duration: 6 + p.d,
            repeat: Infinity,
            ease: 'easeOut',
            delay: p.d,
          }}
        />
      ))}
    </div>
  )
}

/* ===================================================================
   AuraHero — Section 1 default export
   =================================================================== */
export default function AuraHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [0, -160])

  // mouse-reactive parallax (hooks declared unconditionally at top)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)))
    my.set(Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)))
  }
  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <section
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-24 pt-28 sm:px-8 md:pt-32"
      aria-label="Aura Architecture — Immersive Hero"
    >
      <HeroIdentityVisual sx={sx} sy={sy} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-40 mx-auto w-full max-w-7xl"
      >
        {/* Eyebrow */}
        <motion.div style={{ y: eyebrowY }} className="mb-7">
          <SectionEyebrow number="01" label="Brand Strategy & Identity" />
        </motion.div>

        {/* Massive 2-line headline */}
        <h2
          className="text-6xl font-bold leading-[0.92] tracking-[-0.02em] sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>Identity Lab</MaskLine>
          <MaskLine delay={0.12}>
            Built for <RedGradientText>Growth.</RedGradientText>
          </MaskLine>
        </h2>

        {/* Sub — verbatim Aura description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
        >
          We define your brand soul, positioning, and visual DNA to create a
          powerful identity that stands out with purpose and clarity.
        </motion.p>

        {/* Service metadata strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-5"
        >
          <span
            className="font-mono text-xs font-semibold text-[#E53935]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            01 / 07
          </span>
          <span className="text-[#E53935]/70">·</span>
          <span className="wn-eyebrow text-[10px] font-medium text-white/45 sm:text-[11px]">
            Branding — Engine
          </span>
          <span className="text-[#E53935]/70">·</span>
          <span
            className="text-base font-semibold text-white"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Aura Architecture
          </span>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
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
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4 text-[#E53935]" />
        </motion.span>
      </motion.div>

      {/* Side label — vertical (lg only) */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.4em] text-white/30 lg:block">
        Aura Architecture
      </div>
    </section>
  )
}
