'use client'

/**
 * SynthFaq — Section 9 of /synthetic-cinema
 *
 * Premium accordion FAQ — glassmorphism, smooth height animations,
 * single-open behavior. Mirrors the growth/hype section-9 pattern
 * EXACTLY but with AI-Advertising/Synthetic-Cinema-specific Q&As and
 * purple accents.
 *
 * Composition:
 *   - Eyebrow: (09) · FAQ (PurpleEyebrow)
 *   - Headline: "Questions," + "Answered." ("Answered." purple gradient)
 *   - Sub: "Everything you need to know about Synthetic Cinema."
 *   - 8 Q&A pairs (verbatim from spec) in a single-open accordion.
 *   - Each item: glassmorphism card (rounded-2xl border-white/10
 *     bg-white/[0.05] backdrop-blur-xl).
 *   - Closed: question + Plus icon (rotates 135° on open).
 *   - Open: answer slides down via AnimatePresence (height auto + opacity),
 *     border tightens to purple, purple glow blooms, question text turns
 *     white.
 *   - One-at-a-time open. data-cursor="Open"/"Close".
 *   - Semantic dl > wrapping div > (dt + dd) per item. aria-expanded on
 *     trigger.
 *   - PurpleStickyRail ("FAQ" / "Clarity").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import {
  PurpleEyebrow,
  PurpleGradientText,
  PurpleStickyRail,
  MaskLine,
} from '@/components/synthetic/shared'

/* ===================================================================
   FAQ content — 8 AI-Advertising/Synthetic-Cinema-specific Q&A pairs
   (verbatim from spec). Curly apostrophe \u2019 preserved.
   =================================================================== */
type Faq = {
  q: string
  a: string
}

const faqs: Faq[] = [
  {
    q: 'What exactly is Synthetic Cinema?',
    a: 'Synthetic Cinema is our AI-powered creative production system. We use generative AI to produce commercials, brand films, product ads, and campaign creative — cinematic quality, without the cost and timeline of traditional production.',
  },
  {
    q: 'Does AI-generated content look cinematic?',
    a: 'Yes. We engineer every output for cinematic quality — lighting, composition, motion, color. The result is indistinguishable from high-end production at a fraction of the cost and time.',
  },
  {
    q: 'How fast can you deliver?',
    a: 'Most projects move from brief to first cuts in 48-72 hours. Full campaign asset sets in under a week. What used to take months now takes days.',
  },
  {
    q: 'Can you produce at scale?',
    a: 'That\u2019s the core advantage. One concept becomes 10, 50, or 100 variations — different talent, lighting, locations, languages — all from a single production run. Your creative output compounds.',
  },
  {
    q: 'Do you still use real footage or talent?',
    a: 'When it serves the story, yes. Synthetic Cinema is a hybrid system — we blend AI generation with live action, motion design, and editorial craft. The best results often combine all of them.',
  },
  {
    q: 'What about brand consistency and control?',
    a: 'Every generation is guided by your brand system — colors, type, tone, composition. You review and refine at every stage. Full creative control, infinite creative output.',
  },
  {
    q: 'Is AI content legally safe to use commercially?',
    a: 'Yes. We work with licensed models, cleared datasets, and proper usage rights. Every asset we deliver is cleared for commercial use across markets.',
  },
  {
    q: 'What does a typical engagement look like?',
    a: 'Brief \u2192 concept \u2192 AI generation rounds \u2192 motion + edit \u2192 campaign delivery. You get a live review dashboard, fast turnarounds, and a full asset library at the end.',
  },
]

/* ===================================================================
   FaqItem — single accordion row.
   `open` + `onToggle` owned by the parent (one-at-a-time logic).
   =================================================================== */
function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: Faq
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.06, 0.5),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        data-cursor={isOpen ? 'Close' : 'Open'}
        className={`group relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors duration-400 ${
          isOpen
            ? 'border-[#8B5CF6]/55 bg-white/[0.07]'
            : 'border-white/10 bg-white/[0.05] hover:border-white/20'
        }`}
      >
        {/* purple glow bloom on open */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(120% 120% at 50% 0%, rgba(139,92,246,0.18), transparent 60%)',
          }}
        />
        {isOpen && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-2xl shadow-[0_0_36px_rgba(139,92,246,0.22)]"
          />
        )}

        {/* Trigger row */}
        <dt className="m-0">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`synth-faq-panel-${index}`}
            id={`synth-faq-trigger-${index}`}
            className="relative z-10 flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-transform duration-300 hover:-translate-y-0.5 sm:px-6 sm:py-6"
          >
            <span className="flex items-baseline gap-4">
              <span
                className={`text-xs font-bold transition-colors duration-300 ${
                  isOpen ? 'text-[#8B5CF6]' : 'text-white/35'
                }`}
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={`text-base font-semibold transition-colors duration-300 sm:text-lg ${
                  isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                {faq.q}
              </span>
            </span>

            <span
              className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                isOpen
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/15'
                  : 'border-white/15 group-hover:border-[#8B5CF6]/60 group-hover:bg-[#8B5CF6]/5'
              }`}
            >
              <motion.span
                animate={{ rotate: isOpen ? 135 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                <Plus
                  className={`h-4 w-4 transition-colors duration-300 ${
                    isOpen
                      ? 'text-[#8B5CF6]'
                      : 'text-white/55 group-hover:text-[#8B5CF6]'
                  }`}
                  style={
                    isOpen
                      ? { filter: 'drop-shadow(0 0 6px rgba(139,92,246,0.8))' }
                      : undefined
                  }
                />
              </motion.span>
            </span>
          </button>
        </dt>

        {/* Answer panel — AnimatePresence height auto + opacity */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="panel"
              id={`synth-faq-panel-${index}`}
              role="region"
              aria-labelledby={`synth-faq-trigger-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 overflow-hidden"
            >
              <div className="px-5 pb-6 pl-[3.25rem] sm:px-6 sm:pl-[3.5rem]">
                {/* left purple rule */}
                <div
                  aria-hidden
                  className="absolute bottom-5 left-5 top-0 w-px bg-gradient-to-b from-[#8B5CF6]/60 via-[#8B5CF6]/30 to-transparent sm:left-6"
                />
                <dd className="m-0">
                  <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                    {faq.a}
                  </p>
                </dd>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ===================================================================
   SynthFaq — Section 9 named export.
   Single-open accordion — `openIndex` state at the top.
   =================================================================== */
export function SynthFaq() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  // single-open accordion: only one index open at a time
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <div className="lg:flex">
        <PurpleStickyRail label="FAQ" caption="Clarity" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(139,92,246,0.15), rgba(139,92,246,0) 65%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="absolute bottom-[12%] right-[8%] h-[24vw] w-[24vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(217,70,239,0.12), rgba(217,70,239,0) 70%)',
                filter: 'blur(44px)',
              }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.2,
              }}
            />
          </div>

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-12 max-w-3xl"
          >
            <PurpleEyebrow number="09" label="FAQ" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Questions, </MaskLine>
              <MaskLine delay={0.1}>
                <PurpleGradientText>Answered.</PurpleGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Everything you need to know about Synthetic Cinema.
            </motion.p>
          </motion.div>

          {/* Accordion list — semantic dl */}
          <motion.dl
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 flex flex-col gap-3 sm:gap-4"
          >
            {faqs.map((f, i) => (
              <FaqItem
                key={f.q}
                faq={f}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </motion.dl>

          {/* footer line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative z-10 mt-10 text-sm text-white/40"
          >
            Still curious?{' '}
            <a
              href="mailto:hello@watnidea.com"
              className="text-[#8B5CF6] underline-offset-4 transition-colors duration-300 hover:text-[#a78bfa] hover:underline"
            >
              hello@watnidea.com
            </a>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
