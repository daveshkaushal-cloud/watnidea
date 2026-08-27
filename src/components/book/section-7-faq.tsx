'use client'

/**
 * BookFaq — Section 7 of /book-strategy-call
 *
 * PREMIUM GLASSMORPHISM ACCORDION FAQ — single-open behavior. Mirrors
 * the canonical FAQ pattern (kinetic/section-9-faq, growth/section-9-
 * faq, echo/section-9-faq) but uses BRAND-RED (#E53935) as the accent
 * color for the open item (because the booking page's umbrella color
 * is brand red, not a single service color).
 *
 * Composition:
 *   - BookingEyebrow: (07) · FAQ (brand red)
 *   - Headline (MaskLine): "Questions, Answered." — "Answered." red
 *   - Subhead: "The things founders ask before booking a strategy call."
 *   - 6 Q&A pairs (verbatim) in a single-open accordion.
 *   - Each item: glassmorphism card. Closed: question + Plus icon
 *     (rotates 135° on open). Open: answer slides down via
 *     AnimatePresence (height auto + opacity), border tightens to
 *     brand red, red glow blooms, question text turns white.
 *   - One-at-a-time open. data-cursor="Open"/"Close".
 *   - Semantic dl > wrapping div > (dt + dd) per item. aria-expanded
 *     on trigger.
 *   - BookingStickyRail ("FAQ" / "Clarity").
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
  BookingEyebrow,
  BookingStickyRail,
  MaskLine,
} from '@/components/book/shared'

/* ===================================================================
   FAQ content — 6 verbatim Q&A pairs about booking a strategy call.
   Curly apostrophes (') preserved via \u2019 escapes; en-dashes (—)
   via \u2014.
   =================================================================== */
type Faq = {
  q: string
  a: string
}

const faqs: Faq[] = [
  {
    q: 'How long is the strategy call?',
    a: '30 minutes. It\u2019s a working session, not a sales pitch \u2014 we audit your brand and map your growth surface in real time. Come with your top 2-3 questions ready.',
  },
  {
    q: 'What does it cost?',
    a: 'The strategy call is free. If we decide to work together, engagements start at \u20B950K/month for a single service and scale up to full-system retainers. We\u2019ll share exact pricing on the call based on your scope.',
  },
  {
    q: 'What\u2019s the process after the call?',
    a: 'If we\u2019re a fit, we send a proposal within 48 hours \u2014 scope, timeline, pricing, and the team you\u2019d work with. Onboarding typically starts within 1-2 weeks of signing.',
  },
  {
    q: 'What deliverables do I get from the call?',
    a: 'You leave with a 90-day roadmap \u2014 the 2-3 highest-leverage moves for your brand, sequenced by impact. Whether or not we work together, the roadmap is yours to keep.',
  },
  {
    q: 'Do you work with early-stage startups?',
    a: 'Yes. We work with founders at every stage \u2014 pre-launch, post-raise, scaling, and established brands reigniting relevance. The call is structured to meet you where you are.',
  },
  {
    q: 'How do we communicate during an engagement?',
    a: 'Every client gets a dedicated Slack channel, a weekly sync, and async updates via our dashboard. You\u2019ll always know what\u2019s happening, what\u2019s next, and why.',
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
            ? 'border-[#E53935]/55 bg-white/[0.07]'
            : 'border-white/10 bg-white/[0.05] hover:border-white/20'
        }`}
      >
        {/* brand-red glow bloom on open */}
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
            aria-controls={`book-faq-panel-${index}`}
            id={`book-faq-trigger-${index}`}
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
              id={`book-faq-panel-${index}`}
              role="region"
              aria-labelledby={`book-faq-trigger-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 overflow-hidden"
            >
              <div className="px-5 pb-6 pl-[3.25rem] sm:px-6 sm:pl-[3.5rem]">
                {/* left brand-red rule */}
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
   BookFaq — Section 7 named export.
   Single-open accordion — `openIndex` state at the top.
   Hooks declared unconditionally at the top.
   =================================================================== */
export function BookFaq() {
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
        <BookingStickyRail label="FAQ" caption="Clarity" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient — brand red wash + warm gold hint */}
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
            <motion.div
              aria-hidden
              className="absolute bottom-[12%] right-[8%] h-[24vw] w-[24vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(245,158,11,0.10), rgba(245,158,11,0) 70%)',
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
            <BookingEyebrow number="07" label="FAQ" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Questions, </MaskLine>
              <MaskLine delay={0.1}>
                <span className="bg-gradient-to-br from-[#ff6b63] to-[#E53935] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(229,57,53,0.45)]">
                  Answered.
                </span>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              The things founders ask before booking a strategy call.
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
            Still have questions?{' '}
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
