'use client'

/**
 * KineticFaq — Section 9 of /kinetic-studio
 *
 * PREMIUM ACCORDION FAQ — glassmorphism cards, smooth animations,
 * single-open behavior. Mirrors the growth section-9 pattern exactly
 * but with Video-Production-specific Q&As and orange accents.
 *
 * Composition:
 *   - Eyebrow: (09) · Questions (OrangeEyebrow)
 *   - Headline: "Frequently" + "Asked" ("Asked." orange gradient)
 *   - Sub: "Everything you need to know about cinematic production."
 *   - 6 Q&A pairs (verbatim from spec) in a single-open accordion.
 *   - Each item: glassmorphism card. Closed: question + Plus icon
 *     (rotates 135° on open). Open: answer slides down via
 *     AnimatePresence (height auto + opacity), border tightens to
 *     orange, orange glow blooms, question text turns white.
 *   - One-at-a-time open. data-cursor="Open"/"Close".
 *   - Semantic dl > wrapping div > (dt + dd) per item. aria-expanded
 *     on trigger.
 *   - OrangeStickyRail ("FAQ" / "Clarity").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { Plus } from 'lucide-react'
import {
  OrangeEyebrow,
  OrangeGradientText,
  OrangeStickyRail,
  MaskLine,
} from '@/components/kinetic/shared'

/* ===================================================================
   FAQ content — 6 Video-Production-specific Q&A pairs (verbatim).
   Curly apostrophes preserved via \u2019 escapes.
   =================================================================== */
type Faq = {
  q: string
  a: string
}

const faqs: Faq[] = [
  {
    q: 'What types of videos do you produce?',
    a: 'Brand films, corporate films, social reels, product videos, podcasts, event coverage, documentary-style stories, and founder films. If it can be shot, edited, and watched \u2014 we can produce it.',
  },
  {
    q: 'How long does a typical production take?',
    a: 'Concept to delivery typically runs 3\u20138 weeks depending on scope. Short-form social reels move faster; full brand films and documentary-style work take longer. We\u2019ll give you an honest timeline in the first call.',
  },
  {
    q: 'Do you handle the entire production or just specific stages?',
    a: 'Both. We can run the full-stack pipeline \u2014 concept, scripting, pre-production, shoot, edit, color, sound, delivery \u2014 or plug into specific stages if you already have a crew, a script, or a director in place.',
  },
  {
    q: 'Can you shoot on location or only in-studio?',
    a: 'Both. Location scouting is part of pre-production. Whether you need a controlled studio environment, a real-world setting, or aerial coverage \u2014 we plan, permit, and shoot accordingly.',
  },
  {
    q: 'Do you provide the raw footage?',
    a: 'Yes, on request. Delivery packages are customizable \u2014 from a clean master cut and social adaptations all the way to the full raw footage archive handed off on a drive.',
  },
  {
    q: 'How do you measure the success of a video?',
    a: 'Beyond views: attention held, story recalled, action taken. We tie every video to a business outcome \u2014 a click, a sign-up, a sale, a sentiment shift \u2014 not a vanity counter.',
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
            ? 'border-[#F97316]/55 bg-white/[0.07]'
            : 'border-white/10 bg-white/[0.05] hover:border-white/20'
        }`}
      >
        {/* orange glow bloom on open */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(120% 120% at 50% 0%, rgba(249,115,22,0.18), transparent 60%)',
          }}
        />
        {isOpen && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-2xl shadow-[0_0_36px_rgba(249,115,22,0.22)]"
          />
        )}

        {/* Trigger row */}
        <dt className="m-0">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`kinetic-faq-panel-${index}`}
            id={`kinetic-faq-trigger-${index}`}
            className="relative z-10 flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-transform duration-300 hover:-translate-y-0.5 sm:px-6 sm:py-6"
          >
            <span className="flex items-baseline gap-4">
              <span
                className={`text-xs font-bold transition-colors duration-300 ${
                  isOpen ? 'text-[#F97316]' : 'text-white/35'
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
                  ? 'border-[#F97316] bg-[#F97316]/15'
                  : 'border-white/15 group-hover:border-[#F97316]/60 group-hover:bg-[#F97316]/5'
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
                      ? 'text-[#F97316]'
                      : 'text-white/55 group-hover:text-[#F97316]'
                  }`}
                  style={
                    isOpen
                      ? { filter: 'drop-shadow(0 0 6px rgba(249,115,22,0.8))' }
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
              id={`kinetic-faq-panel-${index}`}
              role="region"
              aria-labelledby={`kinetic-faq-trigger-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 overflow-hidden"
            >
              <div className="px-5 pb-6 pl-[3.25rem] sm:px-6 sm:pl-[3.5rem]">
                {/* left orange rule */}
                <div
                  aria-hidden
                  className="absolute bottom-5 left-5 top-0 w-px bg-gradient-to-b from-[#F97316]/60 via-[#F97316]/30 to-transparent sm:left-6"
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
   KineticFaq — Section 9 named export.
   Single-open accordion — `openIndex` state at the top.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function KineticFaq() {
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
        <OrangeStickyRail label="FAQ" caption="Clarity" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(249,115,22,0.15), rgba(249,115,22,0) 65%)',
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
                  'radial-gradient(circle, rgba(251,191,36,0.1), rgba(251,191,36,0) 70%)',
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
            <OrangeEyebrow number="09" label="Questions" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Frequently </MaskLine>
              <MaskLine delay={0.1}>
                <OrangeGradientText>Asked</OrangeGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Everything you need to know about cinematic production at
              Kinetic Studio.
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
              className="text-[#F97316] underline-offset-4 transition-colors duration-300 hover:text-[#fdba74] hover:underline"
            >
              hello@watnidea.com
            </a>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
