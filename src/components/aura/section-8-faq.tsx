'use client'

/**
 * AuraFaq — Section 8
 * Premium accordion — glassmorphism cards, one-at-a-time open/close.
 *
 * Composition:
 *   - Eyebrow: (08) · FAQ
 *   - Headline: "Questions, Answered." ("Answered." red gradient) — font-display
 *   - Sub: "Everything you need to know about building an aura that lasts."
 *
 * Accordion:
 *   - 6 Q&A pairs in brand voice (verbatim from spec).
 *   - Each: glassmorphism card (rounded-2xl border-white/10 bg-white/[0.05]
 *     backdrop-blur-xl).
 *   - Closed: question + Plus icon (rotates to X on open).
 *   - Open: answer slides down via AnimatePresence (height auto + opacity),
 *     border tightens to red, red glow blooms, question text turns white
 *     (from white/70).
 *   - One-at-a-time open (clicking another closes the previous).
 *   - Smooth transitions: duration 0.4, ease [0.16, 1, 0.3, 1].
 *   - Hover: question row lifts slightly, Plus icon glows red.
 *   - `data-cursor="Open"` / `data-cursor="Close"` on each toggle.
 *   - Semantic HTML: dl > (dt + dd) per item. aria-expanded on trigger.
 *
 * Sticky rail (lg+): label `FAQ`, caption `Clarity`.
 */

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from '@/components/about/shared'

/* ===================================================================
   FAQ content — 6 Q&A pairs, premium brand-voice service FAQs.
   =================================================================== */
type Faq = {
  q: string
  a: string
}

const faqs: Faq[] = [
  {
    q: 'How long does a full brand identity engagement take?',
    a: 'A complete Aura Architecture engagement runs 6–10 weeks, depending on scope. Sprints are available for focused deliverables.',
  },
  {
    q: 'Do you work with early-stage brands or only established companies?',
    a: 'Both. We\u2019ve built identities for brands finding their voice and rebranded category leaders. The process scales to where you are.',
  },
  {
    q: 'What deliverables are included?',
    a: 'Strategy, positioning, visual identity, messaging, brand systems, and guidelines. Everything your team needs to scale the aura consistently.',
  },
  {
    q: 'Do we own the final identity?',
    a: '100%. Every asset, file, and guideline is yours on launch. No lock-in, no retainers required.',
  },
  {
    q: 'Can you refresh an existing brand instead of starting from scratch?',
    a: 'Yes. We audit your current identity, preserve what\u2019s working, and rebuild what isn\u2019t. Refinement is often smarter than reinvention.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a Strategy Call. A 30-minute working session — not a sales pitch. We audit your brand and map your growth surface.',
  },
]

/* ===================================================================
   FaqItem — single accordion row.
   `open` + `onToggle` are owned by the parent (one-at-a-time logic).
   Hooks declared unconditionally at the top.
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
      // <div> wrapper around the <dt>/<dd> pair is valid HTML5 inside <dl>.
      // We do NOT use <dd> as the outer wrapper (would nest <dt> inside it).
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        data-cursor={isOpen ? 'Close' : 'Open'}
        className={`group relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors duration-400 ${
          isOpen
            ? 'border-[#E53935]/55 bg-white/[0.07]'
            : 'border-white/10 bg-white/[0.05] hover:border-white/20'
        }`}
      >
        {/* red glow bloom on open */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(120% 120% at 50% 0%, rgba(229,57,53,0.18), transparent 60%)',
          }}
        />
        {isOpen && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-2xl shadow-[0_0_36px_rgba(229,57,53,0.22)]"
          />
        )}

        {/* Trigger row */}
        <dt className="m-0">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`faq-panel-${index}`}
            id={`faq-trigger-${index}`}
            className="relative z-10 flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-transform duration-300 hover:-translate-y-0.5 sm:px-6 sm:py-6"
          >
            <span className="flex items-baseline gap-4">
              <span
                className={`text-xs font-bold transition-colors duration-300 ${
                  isOpen ? 'text-[#E53935]' : 'text-white/35'
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
                  ? 'border-[#E53935] bg-[#E53935]/15'
                  : 'border-white/15 group-hover:border-[#E53935]/60 group-hover:bg-[#E53935]/5'
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
                      ? 'text-[#E53935]'
                      : 'text-white/55 group-hover:text-[#E53935]'
                  }`}
                  style={
                    isOpen
                      ? { filter: 'drop-shadow(0 0 6px rgba(229,57,53,0.8))' }
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
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 overflow-hidden"
            >
              <div className="px-5 pb-6 pl-[3.25rem] sm:px-6 sm:pl-[3.5rem]">
                {/* left red rule */}
                <div
                  aria-hidden
                  className="absolute bottom-5 left-5 top-0 w-px bg-gradient-to-b from-[#E53935]/60 via-[#E53935]/30 to-transparent sm:left-6"
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
   AuraFaq — Section 8 default export.
   Single-open accordion — `openIndex` state at the top.
   =================================================================== */
export function AuraFaq() {
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
        <StickyRail label="FAQ" caption="Clarity" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(229,57,53,0.15), rgba(229,57,53,0) 65%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Header block */}
          <motion.div style={{ y: headerY }} className="relative z-10 mb-12 max-w-3xl">
            <SectionEyebrow number="08" label="FAQ" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Questions, </MaskLine>
              <MaskLine delay={0.1}>
                <RedGradientText>Answered.</RedGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Everything you need to know about building an aura that lasts.
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
              className="text-[#E53935] underline-offset-4 transition-colors duration-300 hover:text-[#ff6b63] hover:underline"
            >
              info@watnidea.com
            </a>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
