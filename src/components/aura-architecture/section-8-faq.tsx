'use client'

/**
 * AuraFaq — Section 8 of the /aura-architecture page.
 *
 * Premium FAQ accordion. The answers are VERBATIM pricing/strategy copy from
 * pricing-cta-section.tsx (pricingFootnote, strategySub, strategySubNote,
 * tier `expands` lines) — no new copy invented.
 *
 * Composition:
 *   - StickyRail (lg+): label `FAQ`, caption `Clarity`
 *   - SectionEyebrow `(08) Frequently Asked`
 *   - Headline `Questions, answered.` ("answered." red gradient)
 *   - 5 accordion items (default: first one open):
 *       Q1: What's included in an Aura Architecture engagement?
 *           A: pricingFootnote (verbatim; em dash + mailto preserved)
 *       Q2: How does the strategy call work?
 *           A: strategySub (verbatim; em dash preserved) +
 *              strategySubNote `30 min · No deck · Just signal` (verbatim)
 *       Q3: Is Aura Architecture right for early-stage brands?
 *           A: Spark tier expand (verbatim)
 *       Q4: What about brands ready to scale?
 *           A: Catalyst tier expand (verbatim; en dash in `6–7 figures`)
 *       Q5: Do you work with category leaders?
 *           A: Empire tier expand (verbatim)
 *   - Each item: glassmorphism card (`border border-white/10 bg-white/[0.035]
 *     backdrop-blur-xl rounded-2xl`), question row (font-display) with a
 *     Plus icon that rotates 45° to become an X when open. Answer slides
 *     down via AnimatePresence (height auto + opacity). On hover: border
 *     tightens to red + subtle red glow bloom.
 *   - Only one open at a time. `aria-expanded` on the trigger,
 *     `role="region"` on the panel. `data-cursor="Open"` on each trigger.
 *
 * Rules of Hooks: all useState/useTransform hooks at the top of each
 * component, never inside `.map()`.
 */

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Plus } from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from '@/components/about/shared'

/* ===================================================================
   FAQ content — 5 Q&A. Answers are VERBATIM from pricing-cta-section.
   Curly apostrophe preserved in Q1 (`What's`).
   Em dash — preserved in A1 + A2. En dash – preserved in A4.
   =================================================================== */
type FaqItem = {
  q: string
  a: string
  /** Optional secondary line (e.g. strategySubNote). */
  note?: string
}

const faqItems: FaqItem[] = [
  {
    q: 'What\u2019s included in an Aura Architecture engagement?',
    a: 'All engagements include a strategy kickoff, brand audit, and a written growth surface map. Custom retainers available on request — info@watnidea.com',
  },
  {
    q: 'How does the strategy call work?',
    a: 'A 30-minute working session — not a sales pitch. We audit your brand, map your growth surface, and show you exactly where attention is leaking.',
    note: '30 min · No deck · Just signal',
  },
  {
    q: 'Is Aura Architecture right for early-stage brands?',
    a: 'Best for: early-stage brands finding their voice',
  },
  {
    q: 'What about brands ready to scale?',
    a: 'Best for: brands ready to scale past 6–7 figures',
  },
  {
    q: 'Do you work with category leaders?',
    a: 'Best for: category leaders & funded scale-ups',
  },
]

/* ===================================================================
   FaqRow — single accordion item.
   - `open` and `onToggle` are passed from parent (single-source-of-truth
     openIndex). All hooks/state lifted to the parent.
   - Plus icon rotates 45° to become an X when open.
   - AnimatePresence drives the height-auto + opacity reveal.
   =================================================================== */
function FaqRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const panelId = `aura-faq-panel-${index}`
  const triggerId = `aura-faq-trigger-${index}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border bg-white/[0.035] backdrop-blur-xl transition-colors duration-300 ${
          isOpen
            ? 'border-[#E53935]/45'
            : 'border-white/10 hover:border-[#E53935]/40'
        }`}
      >
        {/* hover red glow bloom (decorative) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 0%, rgba(229,57,53,0.14), transparent 60%)',
          }}
        />

        {/* Question row (trigger) */}
        <button
          id={triggerId}
          type="button"
          data-cursor="Open"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="relative z-10 flex w-full items-center justify-between gap-5 px-6 py-5 text-left sm:px-7 sm:py-6"
        >
          <span className="flex items-baseline gap-4">
            <span
              className="text-xs font-bold text-[#E53935] sm:text-sm"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
              aria-hidden
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="text-base font-semibold leading-snug text-white sm:text-lg md:text-xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {item.q}
            </span>
          </span>

          {/* Plus icon → rotates 45° to become an X when open */}
          <motion.span
            aria-hidden
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
              isOpen
                ? 'border-[#E53935] bg-[#E53935]/15 text-[#ff6b63]'
                : 'border-white/15 bg-white/[0.03] text-white/55 group-hover:border-[#E53935]/50 group-hover:text-[#ff6b63]'
            }`}
            style={{
              boxShadow: isOpen
                ? '0 0 18px rgba(229,57,53,0.35)'
                : undefined,
            }}
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          </motion.span>
        </button>

        {/* Answer panel */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="relative z-10 px-6 pb-6 pl-[3.75rem] sm:px-7 sm:pb-7 sm:pl-[4.25rem]">
                <div className="border-l-2 border-[#E53935]/45 pl-5">
                  <p className="text-sm leading-relaxed text-white/75 sm:text-base">
                    {item.a}
                  </p>
                  {item.note && (
                    <p className="wn-eyebrow mt-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[#E53935]/80">
                      {item.note}
                    </p>
                  )}
                </div>
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
   openIndex state lifted to the parent — clicking a closed item opens it
   (closing any other open item); clicking an open one closes it.
   =================================================================== */
export default function AuraFaq() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30])

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (i: number) => {
    setOpenIndex((cur) => (cur === i ? null : i))
  }

  return (
    <div
      ref={sectionRef}
      className="relative border-t border-white/5 bg-[#050505]"
    >
      <div className="lg:flex">
        <StickyRail label="FAQ" caption="Clarity" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Header block */}
          <motion.div style={{ y: headerY }} className="mb-14 max-w-3xl">
            <SectionEyebrow number="08" label="Frequently Asked" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>
                Questions, <RedGradientText glow={false}>answered.</RedGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-6 text-base leading-relaxed text-white/55 sm:text-lg"
            >
              No decks. No sales theatre. Just the answers you need.
            </motion.p>
          </motion.div>

          {/* Accordion */}
          <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:gap-4">
            {faqItems.map((item, i) => (
              <FaqRow
                key={item.q}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>

          {/* Contact nudge */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 text-center text-sm text-white/45"
          >
            Still curious?{' '}
            <a
              href="mailto:info@watnidea.com"
              className="font-medium text-[#E53935] transition-colors duration-300 hover:text-[#ff6b63]"
            >
              info@watnidea.com
            </a>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
