'use client'

/**
 * KineticShowreel — Section 6 of /kinetic-studio
 *
 * HONEST "SHOWREEL COMING SOON" SECTION.
 *
 * There is no real studio showreel asset yet. Per the brief, we do NOT
 * display fake video thumbnails or playable-video mocks presented as
 * completed films, and we do NOT ship a non-functional "Watch Showreel"
 * button. Instead this section is an honest, editorial "coming soon"
 * block with a CSS-only stylised frame-mock (clearly a mock — no play
 * button, no runtime, no poster image, no <video> element).
 *
 * Composition:
 *   - Eyebrow: (06) · Showreel (OrangeEyebrow)
 *   - Headline (font-editorial): "Showreel coming soon"
 *   - Honest paragraph: "We're cutting our studio reel. In the
 *     meantime, see how we approach film in the sections above, or
 *     ask us about recent frames."
 *   - Real link to /book-strategy-call (min 44px touch target).
 *   - CSS-only stylised frame-mock: 16:9 frame with corner brackets,
 *     sprocket holes, a "Coming Soon" badge + a clapperboard mark, slow
 *     gradient drift. NO play button, NO runtime, NO poster image,
 *     NO <video>. Explicitly labelled "Stylised frame-mock · not a
 *     playable video".
 *   - OrangeStickyRail ("Showreel" / "Selected Work") on lg+.
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Clapperboard } from 'lucide-react'
import {
  OrangeEyebrow,
  OrangeGradientText,
  OrangeStickyRail,
  MaskLine,
} from '@/components/kinetic/shared'

/* ===================================================================
   FrameMock — CSS-only stylised 16:9 frame-mock. Clearly a mock, not
   a playable video: no play button, no runtime, no poster image, no
   <video> element. Just a slow-drifting orange/gold/red gradient with
   sprocket holes, corner brackets, a "Coming Soon" badge and an
   explicit "Stylised frame-mock · not a playable video" caption.
   =================================================================== */
function FrameMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl"
      aria-hidden
    >
      {/* orange glow bloom */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-60"
        style={{ boxShadow: '0 0 60px rgba(249,115,22,0.28)' }}
      />

      {/* 16:9 frame */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {/* slow-drifting gradient — clearly a stylised mock, not a video preview */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 30% 40%, rgba(251,191,36,0.4), transparent 55%), radial-gradient(circle at 75% 70%, rgba(229,57,53,0.35), transparent 55%), radial-gradient(circle at 50% 50%, rgba(249,115,22,0.3), rgba(20,20,20,0.95) 70%)',
          }}
          animate={{ scale: [1, 1.06, 1], rotate: [0, 0.8, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* dark overlay for legibility */}
        <div className="absolute inset-0 bg-[#1A1A1A]/70" />

        {/* scan-line texture (cinematic frame feel, not a video) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
          }}
        />

        {/* vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(20,20,20,0.6) 100%)',
          }}
        />

        {/* film-strip sprocket holes (top + bottom) — reinforces "film frame", not "video" */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-5 items-center gap-2 bg-black/40 px-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={`sprocket-top-${i}`} className="h-2 w-3 rounded-[1px] bg-white/20" />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-5 items-center gap-2 bg-black/40 px-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={`sprocket-bot-${i}`} className="h-2 w-3 rounded-[1px] bg-white/20" />
          ))}
        </div>

        {/* corner viewfinder brackets */}
        <div className="pointer-events-none absolute inset-4 sm:inset-6">
          <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-[#F97316]/70" />
          <span className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-[#F97316]/70" />
          <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-[#F97316]/70" />
          <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-[#F97316]/70" />
        </div>

        {/* center "Coming Soon" badge (clapperboard mark, NOT a play button) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <motion.span
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F97316]/50 bg-[#F97316]/10 backdrop-blur-md sm:h-14 sm:w-14"
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.06, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ boxShadow: '0 0 24px rgba(249,115,22,0.4)' }}
            >
              <Clapperboard className="h-5 w-5 text-[#F97316] sm:h-6 sm:w-6" />
            </motion.span>
            <span
              className="rounded-full border border-[#F97316]/60 bg-[#202020]/85 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#F97316] backdrop-blur-md sm:text-[11px]"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              Coming Soon
            </span>
            <span className="wn-eyebrow text-[9px] uppercase tracking-[0.25em] text-white/40 sm:text-[10px]">
              Stylised frame-mock · not a playable video
            </span>
          </div>
        </div>

        {/* bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent"
        />
      </div>
    </motion.div>
  )
}

/* ===================================================================
   KineticShowreel — Section 6 named export.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function KineticShowreel() {
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
          label="Showreel"
          caption="Selected Work"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/3 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
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
              className="absolute right-[8%] bottom-[12%] h-[28vw] w-[28vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(229,57,53,0.14), rgba(229,57,53,0) 70%)',
                filter: 'blur(44px)',
              }}
              animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.15, 1] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.2,
              }}
            />
            <motion.div
              aria-hidden
              className="absolute left-[6%] top-[60%] h-[22vw] w-[22vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(251,191,36,0.12), rgba(251,191,36,0) 70%)',
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
            className="relative z-10 mb-12 max-w-3xl"
          >
            <OrangeEyebrow number="06" label="Showreel" />

            <h2 className="mt-7 font-editorial text-5xl font-semibold leading-[1.02] tracking-[-0.01em] sm:text-6xl md:text-7xl">
              <MaskLine>
                <span className="text-white">Showreel </span>
                <OrangeGradientText>coming soon</OrangeGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              We&rsquo;re cutting our studio reel. In the meantime, see how
              we approach film in the sections above, or ask us about recent
              frames.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <Link
                href="/book-strategy-call"
                data-cursor="Book"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#F97316] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#141414] transition-colors duration-300 hover:bg-[#fb923c]"
              >
                Ask about recent frames
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-4 text-[11px] uppercase tracking-[0.3em] text-white/30"
            >
              No showreel asset yet · stylised frame-mock only
            </motion.p>
          </motion.div>

          {/* CSS-only stylised frame-mock (not a playable video) */}
          <div className="relative z-10">
            <FrameMock />
          </div>
        </div>
      </div>
    </div>
  )
}
