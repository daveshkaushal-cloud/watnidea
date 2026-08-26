'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Eye, Rocket, ShieldCheck } from 'lucide-react'

/* ===================================================================
   EXACT CONTENT — do not rewrite any copy.
   =================================================================== */

const features = [
  {
    n: '01',
    title: 'Aesthetics Are Utility',
    desc: 'Eye-catching visuals that elevate your brand.',
    Icon: Eye,
    accent: true,
  },
  {
    n: '02',
    title: 'Data Protects the Art',
    desc: 'Creative ideas powered by real data.',
    Icon: ShieldCheck,
    accent: false,
  },
  {
    n: '03',
    title: 'Built for the Future',
    desc: 'Driven by AI and evolving trends.',
    Icon: Rocket,
    accent: true,
  },
]

/* ===================================================================
   Shared helpers
   =================================================================== */

/**
 * Masked line reveal — scroll-safe (observes the WRAPPER, not the clipped
 * child, to avoid the IntersectionObserver deadlock from Task 3).
 */
function MaskLine({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.span
      className={'block overflow-hidden pb-[0.12em] ' + className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: '118%' },
          show: {
            y: '0%',
            transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

/** Animated red strike-through that draws across its sibling word. */
function RedStrike({ delay = 0.4 }: { delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className="absolute left-0 top-1/2 h-[2px] w-0 -translate-y-1/2 bg-[#E53935]"
      initial={{ width: 0 }}
      whileInView={{ width: '100%' }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      style={{ boxShadow: '0 0 10px rgba(229,57,53,0.6)' }}
    />
  )
}

/** Ambient red lighting — shared fixed background for the whole manifesto. */
function AmbientLight() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[65vw] w-[65vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.20), rgba(229,57,53,0) 65%)',
          filter: 'blur(30px)',
        }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.12, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-10%] right-[-5%] h-[40vw] w-[40vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/** Abstract identity-inspired visual: concentric rings + morphing core. */
function IdentityMark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        className="relative h-[70vw] w-[70vw] max-h-[640px] max-w-[640px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {/* outer ring */}
        <div className="absolute inset-0 rounded-full border border-white/[0.07]" />
        {/* mid ring */}
        <div className="absolute inset-[12%] rounded-full border border-dashed border-[#E53935]/25" />
        {/* inner ring */}
        <div className="absolute inset-[28%] rounded-full border border-white/10" />
        {/* chrome arc */}
        <div
          className="absolute inset-[5%] rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.18) 12%, transparent 28%, transparent 60%, rgba(229,57,53,0.45) 72%, transparent 88%)',
            mask: 'radial-gradient(circle, transparent 47%, black 49%, black 50%, transparent 51%)',
            WebkitMask:
              'radial-gradient(circle, transparent 47%, black 49%, black 50%, transparent 51%)',
          }}
        />
      </motion.div>
      {/* morphing red core */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.5), rgba(229,57,53,0) 70%)',
          filter: 'blur(8px)',
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/** Small floating chrome accent. */
function FloatDot({
  className = '',
  delay = 0,
}: {
  className?: string
  delay?: number
}) {
  return (
    <motion.span
      aria-hidden
      className={'absolute h-1.5 w-1.5 rounded-full bg-[#E53935] ' + className}
      style={{
        boxShadow: '0 0 10px rgba(229,57,53,0.9), 0 0 24px rgba(229,57,53,0.5)',
      }}
      animate={{ y: [0, -16, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

/* ===================================================================
   Beats
   =================================================================== */

function BeatOne() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.04])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 sm:px-8"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex items-center justify-center gap-3"
        >
          <span className="text-xs font-medium text-[#E53935]">(03)</span>
          <span className="h-px w-8 bg-[#E53935]/60" />
          <span className="wn-eyebrow text-[11px] font-medium text-white/55 sm:text-xs">
            A Creative Manifesto
          </span>
        </motion.div>

        <h2
          className="text-[8vw] font-bold leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-6xl xl:text-7xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>The world has enough</MaskLine>
          <MaskLine delay={0.1}>agencies—and most of</MaskLine>
          <MaskLine delay={0.2}>
            them{' '}
            <span className="relative inline-block text-white/55">
              play safe.
              <RedStrike />
            </span>
          </MaskLine>
        </h2>
      </motion.div>

      <FloatDot className="left-[14%] top-[30%]" delay={0} />
      <FloatDot className="right-[18%] top-[40%]" delay={1.2} />
    </section>
  )
}

function BeatTwo() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.06])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 sm:px-8"
    >
      <IdentityMark />
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <h2
          className="text-[10vw] font-bold leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-8xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>
            <span className="lowercase">watNidea</span> is an
          </MaskLine>
          <MaskLine delay={0.12}>
            <span className="bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 28px rgba(229,57,53,0.5))' }}>
              Identity Lab.
            </span>
          </MaskLine>
        </h2>
      </motion.div>
    </section>
  )
}

function BeatThree() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.04])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40])
  // interactive typography: "The Vibe" drifts horizontally with scroll
  const vibeX = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 30])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 sm:px-8"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <h2
          className="text-[7.5vw] font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl xl:text-7xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          <MaskLine>We design</MaskLine>
          <MaskLine delay={0.1}>
            <motion.span
              style={{ x: vibeX }}
              className="relative inline-block"
            >
              {/* red glow duplicate (subtle red halo behind chrome) */}
              <span
                aria-hidden
                className="absolute inset-0 select-none blur-[7px]"
                style={{ color: '#E53935', opacity: 0.4 }}
              >
                &ldquo;The&nbsp;Vibe&rdquo;
              </span>
              {/* chrome text on top */}
              <span className="wn-chrome-text relative">
                &ldquo;The&nbsp;Vibe&rdquo;
              </span>
            </motion.span>{' '}
            that
          </MaskLine>
          <MaskLine delay={0.2}>
            makes brands
          </MaskLine>
          <MaskLine delay={0.3}>
            <span className="bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent">
              impossible to ignore.
            </span>
          </MaskLine>
        </h2>
      </motion.div>

      <FloatDot className="left-[10%] bottom-[26%]" delay={0.6} />
      <FloatDot className="right-[12%] top-[28%]" delay={1.8} />
    </section>
  )
}

function BeatClimax() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.8, 1], [0, 1, 1, 0.2])
  // dramatic scale for the climax
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1.08, 1.2])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60])
  // red glow intensifies at center of the beat
  const glow = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0.35, 1, 0.4])
  const glowFilter = useTransform(
    glow,
    (v) => `drop-shadow(0 0 ${30 * v}px rgba(229,57,53,${0.85 * v}))`
  )

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 sm:px-8"
    >
      {/* climax red burst */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.35), rgba(229,57,53,0) 60%)',
          filter: 'blur(40px)',
          opacity: glow,
        }}
      />

      <motion.div
        style={{ opacity: opacity, y }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg md:text-xl"
        >
          Every strategy, every visual, and every campaign is built to trigger
          one reaction:
        </motion.p>

        <motion.h2
          style={{ scale, filter: glowFilter }}
          className="text-[18vw] font-bold leading-[0.9] tracking-[-0.04em] sm:text-[15vw] lg:text-[12vw] xl:text-[11rem]"
        >
          <motion.span
            className="block overflow-hidden"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              className="block"
              variants={{
                hidden: { y: '118%' },
                show: {
                  y: '0%',
                  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <span className="text-white">&ldquo;What an</span>{' '}
              <span className="bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent">
                idea!
              </span>
              <span className="text-white">&rdquo;</span>
            </motion.span>
          </motion.span>
        </motion.h2>
      </motion.div>
    </section>
  )
}

/* ---------- Feature blocks ---------- */

function FeatureBlocks() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      ref={ref}
      id="manifesto-features"
      aria-label="Why WatNidea"
      className="relative overflow-hidden px-5 pb-28 pt-12 sm:px-8 sm:pb-36"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          style={{ y: headerY }}
          className="mb-14 flex flex-col items-center gap-3 text-center"
        >
          <span className="wn-eyebrow text-[11px] font-medium text-white/50 sm:text-xs">
            The Principles
          </span>
          <h3
            className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            How We Build{' '}
            <span className="bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent">
              The Vibe
            </span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.n}
              data-cursor="Principle"
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{
                duration: 0.7,
                delay: i * 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* continuous float wrapper */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5 + i * 0.7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
                className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md transition-colors duration-300 group-hover:border-[#E53935]/50 group-hover:bg-white/[0.07] sm:p-8"
              >
                {/* hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(120% 120% at 100% 0%, rgba(229,57,53,0.18), transparent 60%)',
                  }}
                />

                <div className="relative z-10 mb-6 flex items-center justify-between">
                  <span
                    className={
                      'font-[var(--font-display)] text-3xl font-bold ' +
                      (f.accent
                        ? 'bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent'
                        : 'text-white/25')
                    }
                    style={{ fontFamily: 'var(--font-display), sans-serif' }}
                  >
                    {f.n}
                  </span>
                  <span
                    className={
                      'flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300 ' +
                      (f.accent
                        ? 'border-[#E53935]/40 bg-[#E53935]/10 text-[#ff6b63]'
                        : 'border-white/10 bg-white/[0.05] text-white/55 group-hover:border-white/30 group-hover:text-white')
                    }
                  >
                    <f.Icon className="h-5 w-5" />
                  </span>
                </div>

                <h4
                  className="relative z-10 text-xl font-semibold text-white sm:text-2xl"
                  style={{ fontFamily: 'var(--font-display), sans-serif' }}
                >
                  {f.title}
                </h4>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/55 sm:text-base">
                  {f.desc}
                </p>

                <div className="relative z-10 mt-6 flex items-center gap-1.5 text-xs font-medium text-[#E53935] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span>Explore</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-transparent transition-all duration-500 group-hover:w-full"
                />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===================================================================
   Section shell — sticky ABOUT WATNIDEA rail + scroll progress + beats
   =================================================================== */

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      ref={containerRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <AmbientLight />

      <div className="lg:flex">
        {/* Sticky ABOUT WATNIDEA rail with scroll progress (desktop only) */}
        <aside className="hidden lg:block lg:w-24 lg:shrink-0">
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <span
                className="wn-eyebrow text-[11px] font-medium text-white/45 [writing-mode:vertical-rl]"
                style={{ rotate: '180deg' }}
              >
                About WatNidea
              </span>
              <div className="relative h-56 w-px overflow-hidden rounded-full bg-white/10">
                <motion.div
                  style={{ scaleY: railScale }}
                  className="absolute inset-0 origin-top bg-[#E53935]"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Manifesto
              </span>
            </div>
          </div>
        </aside>

        {/* Beats */}
        <div className="relative min-w-0 flex-1">
          <BeatOne />
          <BeatTwo />
          <BeatThree />
          <BeatClimax />
          <FeatureBlocks />
        </div>
      </div>
    </div>
  )
}
