'use client'

/**
 * EchoFaq — Section 9 of /the-echo-system
 *
 * Premium accordion FAQ — glassmorphism, smooth height animations,
 * single-open behavior. Mirrors the growth section-9 pattern EXACTLY
 * but with SEO/AEO/content-systems Q&As and cyan accents.
 *
 * Composition:
 *   - Eyebrow: (09) · Questions (CyanEyebrow)
 *   - Headline: "Frequently" + "Asked" ("Asked" cyan gradient)
 *   - Sub: "Everything you need to know about engineering visibility."
 *   - 6 Q&A pairs in a single-open accordion.
 *   - Each item: glassmorphism card (rounded-2xl border-white/10
 *     bg-white/[0.05] backdrop-blur-xl).
 *   - Closed: question + Plus icon (rotates 135° on open).
 *   - Open: answer slides down via AnimatePresence (height auto + opacity),
 *     border tightens to cyan, cyan glow blooms, question text turns white.
 *   - One-at-a-time open. data-cursor="Open"/"Close".
 *   - Semantic dl > wrapping div > (dt + dd) per item. aria-expanded on
 *     trigger.
 *   - CyanStickyRail ("FAQ" / "Clarity").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import {
  CyanAmbient,
  CyanEyebrow,
  CyanGradientText,
  CyanStickyRail,
  MaskLine,
} from '@/components/echo/shared'

/* ===================================================================
   FAQ content — 6 SEO/AEO/content-systems Q&A pairs.
   Curly apostrophes \u2019 in "What's", "We'll".
   =================================================================== */
type Faq = {
  q: string
  a: string
}

const faqs: Faq[] = [
  {
    q: 'How is The Echo System different from traditional SEO?',
    a: 'Traditional SEO optimizes for keywords on a single surface — Google search. The Echo System engineers visibility across every surface where discovery happens: organic search, AI answer engines, knowledge graphs, voice, and discovery platforms. It\u2019s AEO (answer engine optimization) plus content systems plus compounding authority — not just rank reports.',
  },
  {
    q: 'How quickly will we see results?',
    a: 'Early signals arrive in 60\u201390 days — indexed pages, keyword movement, initial AI citations. Compounding visibility builds over 6\u201312 months as pillar content matures, topic clusters interlink, and authority accrues across surfaces. SEO is a curve, not a switch; we engineer for the curve.',
  },
  {
    q: 'Do you optimize for AI search and answer engines?',
    a: 'Yes — AEO is core to the system, not an add-on. We structure content for citation: clear answer formatting, schema markup, entity-rich writing, knowledge graph signals, and source-worthy authority. The goal isn\u2019t just to rank — it\u2019s to be the source AI engines quote.',
  },
  {
    q: 'What\u2019s the content production cadence?',
    a: 'We engineer cadence around topic clusters and authority gaps — not arbitrary volume. A typical system runs 1 pillar article (2,400+ words) plus 8\u201312 supporting cluster articles per quarter, plus answer pages and distribution assets. Cadence scales with your category\u2019s competitive density.',
  },
  {
    q: 'Can you work with our existing content team?',
    a: 'Yes — we plug in as a system layer, not a replacement. We bring the strategy (pillar mapping, cluster architecture, AEO framework, distribution system), your team brings execution capacity. We train, brief, and quality-control; they scale output. Most engagements end up hybrid.',
  },
  {
    q: 'How do you measure visibility?',
    a: 'Multi-surface, not single-metric. We track organic rank and traffic, AI answer presence and citation share, knowledge graph entity coverage, brand search volume, and discovery-platform visibility. Every metric ties back to compounding authority — not vanity numbers.',
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
            ? 'border-[#06B6D4]/55 bg-white/[0.07]'
            : 'border-white/10 bg-white/[0.05] hover:border-white/20'
        }`}
      >
        {/* cyan glow bloom on open */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(120% 120% at 50% 0%, rgba(6,182,212,0.18), transparent 60%)',
          }}
        />
        {isOpen && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-2xl shadow-[0_0_36px_rgba(6,182,212,0.22)]"
          />
        )}

        {/* Trigger row */}
        <dt className="m-0">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`echo-faq-panel-${index}`}
            id={`echo-faq-trigger-${index}`}
            className="relative z-10 flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-transform duration-300 hover:-translate-y-0.5 sm:px-6 sm:py-6"
          >
            <span className="flex items-baseline gap-4">
              <span
                className={`text-xs font-bold transition-colors duration-300 ${
                  isOpen ? 'text-[#06B6D4]' : 'text-white/35'
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
                  ? 'border-[#06B6D4] bg-[#06B6D4]/15'
                  : 'border-white/15 group-hover:border-[#06B6D4]/60 group-hover:bg-[#06B6D4]/5'
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
                      ? 'text-[#06B6D4]'
                      : 'text-white/55 group-hover:text-[#06B6D4]'
                  }`}
                  style={
                    isOpen
                      ? { filter: 'drop-shadow(0 0 6px rgba(6,182,212,0.8))' }
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
              id={`echo-faq-panel-${index}`}
              role="region"
              aria-labelledby={`echo-faq-trigger-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 overflow-hidden"
            >
              <div className="px-5 pb-6 pl-[3.25rem] sm:px-6 sm:pl-[3.5rem]">
                {/* left cyan rule */}
                <div
                  aria-hidden
                  className="absolute bottom-5 left-5 top-0 w-px bg-gradient-to-b from-[#06B6D4]/60 via-[#06B6D4]/30 to-transparent sm:left-6"
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
   EchoFaq — Section 9 named export.
   Single-open accordion — `openIndex` state at the top.
   =================================================================== */
export function EchoFaq() {
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
        <CyanStickyRail label="FAQ" caption="Clarity" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Layered ambient */}
          <CyanAmbient />

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-12 max-w-3xl"
          >
            <CyanEyebrow number="09" label="Questions" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Frequently </MaskLine>
              <MaskLine delay={0.1}>
                <CyanGradientText>Asked</CyanGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Everything you need to know about engineering visibility.
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
              href="mailto:info@watnidea.com"
              className="text-[#06B6D4] underline-offset-4 transition-colors duration-300 hover:text-[#67e8f9] hover:underline"
            >
              info@watnidea.com
            </a>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
