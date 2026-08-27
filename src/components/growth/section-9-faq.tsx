'use client'

/**
 * GrowthFaq — Section 9 of /growth-alchemy
 *
 * Premium accordion FAQ — glassmorphism, smooth height animations,
 * single-open behavior. Mirrors the hype section-9 pattern EXACTLY
 * but with Performance-Marketing-specific Q&As and emerald accents.
 *
 * Composition:
 *   - Eyebrow: (09) · FAQ (GreenEyebrow)
 *   - Headline: "Questions," + "Answered." ("Answered." emerald gradient)
 *   - Sub: "Everything you need to know about performance marketing."
 *   - 8 Q&A pairs (verbatim from spec) in a single-open accordion.
 *   - Each item: glassmorphism card (rounded-2xl border-white/10
 *     bg-white/[0.05] backdrop-blur-xl).
 *   - Closed: question + Plus icon (rotates 135° on open).
 *   - Open: answer slides down via AnimatePresence (height auto + opacity),
 *     border tightens to emerald, emerald glow blooms, question text turns
 *     white.
 *   - One-at-a-time open. data-cursor="Open"/"Close".
 *   - Semantic dl > wrapping div > (dt + dd) per item. aria-expanded on
 *     trigger.
 *   - GreenStickyRail ("FAQ" / "Clarity").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import {
  GreenEyebrow,
  GreenGradientText,
  GreenStickyRail,
  MaskLine,
} from '@/components/growth/shared'

/* ===================================================================
   FAQ content — 8 Performance-Marketing-specific Q&A pairs (verbatim).
   Curly apostrophe \u2019 in "What's" and "That's".
   =================================================================== */
type Faq = {
  q: string
  a: string
}

const faqs: Faq[] = [
  {
    q: 'How quickly can we expect results?',
    a: 'Most campaigns see meaningful signal within 7-14 days and scaled results within 30-60 days. We optimize daily from day one.',
  },
  {
    q: 'What\u2019s your minimum ad spend budget?',
    a: 'We typically work with brands spending \u20b91L+/month on ads, but the right budget depends on your goals and category. We\u2019ll tell you honestly if we\u2019re not the right fit.',
  },
  {
    q: 'Do you work with Google Ads, Meta, or both?',
    a: 'Both — and more. Google (Search, Performance Max, YouTube), Meta (Facebook, Instagram, Advantage+), and programmatic. We go where your customers are.',
  },
  {
    q: 'How do you measure ROAS and attribution?',
    a: 'We build a unified attribution model across platforms, GA4, and your CRM. No vanity metrics — only revenue-tied signals that scale decisions.',
  },
  {
    q: 'Do you build the landing pages and funnels too?',
    a: 'Yes. Ads are only half the engine. We build high-conversion landing pages, lead funnels, and retargeting flows as part of the system.',
  },
  {
    q: 'Can you scale without hurting performance?',
    a: 'That\u2019s the whole point. Our scaling framework increases budget in controlled increments with constant monitoring, so ROAS stays stable as spend grows.',
  },
  {
    q: 'What makes Growth Alchemy different from a regular ad agency?',
    a: 'Agencies run ads. We build growth practices — connected funnels, attribution, creative testing, and scaling frameworks that turn ad spend into predictable revenue.',
  },
  {
    q: 'Do you offer reporting dashboards?',
    a: 'Always. You get a live dashboard with real-time spend, ROAS, CPL, and revenue metrics. No monthly PDF reports — just always-on visibility.',
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
            ? 'border-[#10B981]/55 bg-white/[0.07]'
            : 'border-white/10 bg-white/[0.05] hover:border-white/20'
        }`}
      >
        {/* emerald glow bloom on open */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(120% 120% at 50% 0%, rgba(16,185,129,0.18), transparent 60%)',
          }}
        />
        {isOpen && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-2xl shadow-[0_0_36px_rgba(16,185,129,0.22)]"
          />
        )}

        {/* Trigger row */}
        <dt className="m-0">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`growth-faq-panel-${index}`}
            id={`growth-faq-trigger-${index}`}
            className="relative z-10 flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-transform duration-300 hover:-translate-y-0.5 sm:px-6 sm:py-6"
          >
            <span className="flex items-baseline gap-4">
              <span
                className={`text-xs font-bold transition-colors duration-300 ${
                  isOpen ? 'text-[#10B981]' : 'text-white/35'
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
                  ? 'border-[#10B981] bg-[#10B981]/15'
                  : 'border-white/15 group-hover:border-[#10B981]/60 group-hover:bg-[#10B981]/5'
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
                      ? 'text-[#10B981]'
                      : 'text-white/55 group-hover:text-[#10B981]'
                  }`}
                  style={
                    isOpen
                      ? { filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.8))' }
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
              id={`growth-faq-panel-${index}`}
              role="region"
              aria-labelledby={`growth-faq-trigger-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 overflow-hidden"
            >
              <div className="px-5 pb-6 pl-[3.25rem] sm:px-6 sm:pl-[3.5rem]">
                {/* left emerald rule */}
                <div
                  aria-hidden
                  className="absolute bottom-5 left-5 top-0 w-px bg-gradient-to-b from-[#10B981]/60 via-[#10B981]/30 to-transparent sm:left-6"
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
   GrowthFaq — Section 9 named export.
   Single-open accordion — `openIndex` state at the top.
   =================================================================== */
export function GrowthFaq() {
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
        <GreenStickyRail label="FAQ" caption="Clarity" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(16,185,129,0.15), rgba(16,185,129,0) 65%)',
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
                  'radial-gradient(circle, rgba(110,231,183,0.12), rgba(110,231,183,0) 70%)',
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
            <GreenEyebrow number="09" label="FAQ" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Questions, </MaskLine>
              <MaskLine delay={0.1}>
                <GreenGradientText>Answered.</GreenGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Everything you need to know about performance marketing.
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
              className="text-[#10B981] underline-offset-4 transition-colors duration-300 hover:text-[#6ee7b7] hover:underline"
            >
              info@watnidea.com
            </a>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
