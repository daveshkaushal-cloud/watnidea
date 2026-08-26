'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowUpRight,
  Bot,
  Fingerprint,
  MousePointerClick,
  TrendingUp,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const comparison = [
  { subject: 'Most agencies', lead: 'focus on', focus: 'impressions' },
  { subject: 'Most consultants', lead: 'focus on', focus: 'strategy' },
  { subject: 'Most production houses', lead: 'focus on', focus: 'content' },
]

const paragraphs = [
  {
    strong: 'WatNidea',
    rest: ' was created to bridge the gap between branding, marketing, technology, and storytelling.',
  },
  {
    strong: '',
    rest: 'We help businesses build identities people remember, create digital experiences customers love, and launch campaigns that generate measurable growth.',
  },
  {
    strong: '',
    rest: "Whether you're launching something new or scaling something established, we create systems designed for long-term impact.",
  },
]

type Card = {
  num: string
  title: string
  desc: string
  Icon: typeof Fingerprint
  accent: boolean
}

const cards: Card[] = [
  {
    num: '01',
    title: 'Brand Identity',
    desc: 'Create a memorable foundation for your business.',
    Icon: Fingerprint,
    accent: true,
  },
  {
    num: '02',
    title: 'Digital Experiences',
    desc: 'Websites designed to convert attention into action.',
    Icon: MousePointerClick,
    accent: false,
  },
  {
    num: '03',
    title: 'Growth Systems',
    desc: 'Marketing engines built to scale.',
    Icon: TrendingUp,
    accent: false,
  },
  {
    num: '04',
    title: 'AI-Powered Content',
    desc: 'Faster production. Bigger impact.',
    Icon: Bot,
    accent: true,
  },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Masked line reveal — slides up from behind a mask on scroll-into-view.
 *
 * NOTE: `whileInView` lives on the WRAPPER (which is never clipped) and
 * propagates a variant to the inner span. Putting `whileInView` directly on
 * the translated child would deadlock: the child is fully clipped by the
 * `overflow-hidden` parent, so its IntersectionObserver intersection is 0
 * and the animation would never fire.
 */
function MaskLine({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.span
      className="block overflow-hidden pb-[0.1em]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: '115%' },
          show: {
            y: '0%',
            transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
} as const

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax for the cards cluster + decorative accents
  const cardsY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 90])
  const watermarkY = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section
      ref={sectionRef}
      id="studio"
      aria-label="Why WatNidea"
      className="relative w-full overflow-hidden border-t border-white/5 bg-[#141414]/70 px-5 py-24 backdrop-blur-sm sm:px-8 sm:py-32 lg:py-40"
    >
      {/* Local atmospheric accents */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        {/* Red glow top-right */}
        <motion.div
          aria-hidden
          className="absolute right-[-10%] top-[-10%] h-[40vw] w-[40vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.22), rgba(229,57,53,0) 70%)',
            filter: 'blur(30px)',
          }}
          animate={{ opacity: [0.6, 0.95, 0.6], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Chrome glow bottom-left */}
        <motion.div
          aria-hidden
          className="absolute bottom-[-15%] left-[-10%] h-[36vw] w-[36vw] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.08), rgba(255,255,255,0) 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Giant ghost number */}
        <motion.span
          aria-hidden
          className="absolute -right-6 top-1/2 -translate-y-1/2 select-none font-[var(--font-display)] text-[34vw] font-bold leading-none text-white/[0.025] lg:text-[26vw]"
          style={{ y: watermarkY, fontFamily: 'var(--font-display), sans-serif' }}
        >
          02
        </motion.span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Eyebrow / section index */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex items-center gap-3 sm:mb-16"
        >
          <span className="text-xs font-medium text-[#E53935]">(02)</span>
          <span className="h-px w-8 bg-[#E53935]/60" />
          <span className="wn-eyebrow text-[11px] font-medium text-white/60 sm:text-xs">
            The Studio — Who We Are
          </span>
        </motion.div>

        {/* Split-screen grid */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* ---------- LEFT: narrative ---------- */}
          <div className="flex flex-col">
            {/* Headline */}
            <h2
              className="font-[var(--font-display)] text-[10vw] font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl lg:text-[4.2rem] xl:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Built for Brands</MaskLine>
              <MaskLine delay={0.08}>
                That{' '}
                <span className="bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent">
                  Refuse
                </span>{' '}
                to
              </MaskLine>
              <MaskLine delay={0.16}>Blend In.</MaskLine>
            </h2>

            {/* Comparison block */}
            <div className="mt-12 max-w-xl">
              {comparison.map((c, i) => (
                <motion.div
                  key={c.subject}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-wrap items-baseline gap-x-2 border-b border-white/[0.06] py-3 text-lg sm:text-xl"
                >
                  <span className="font-medium text-white">{c.subject}</span>
                  <span className="text-white/35">{c.lead}</span>
                  <span className="relative text-white/35">
                    {c.focus}.
                    {/* animated strike-through in red */}
                    <motion.span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-[1.5px] w-0 -translate-y-1/2 bg-[#E53935]"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true, margin: '-8%' }}
                      transition={{ duration: 0.55, delay: 0.35 + i * 0.12, ease: 'easeOut' }}
                    />
                  </span>
                </motion.div>
              ))}

              {/* Pivot statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 border-l-2 border-[#E53935] pl-5"
              >
                <p className="text-xl font-medium leading-snug text-white sm:text-2xl">
                  We believe growth happens when{' '}
                  <span className="text-[#E53935]">all three</span> work
                  together.
                </p>
              </motion.div>
            </div>

            {/* Body paragraphs */}
            <div className="mt-12 max-w-xl space-y-5">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  {...fadeUp}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-base leading-relaxed text-white/65 sm:text-lg"
                >
                  {p.strong && (
                    <span className="font-semibold text-white">{p.strong}</span>
                  )}
                  {p.rest}
                </motion.p>
              ))}
            </div>
          </div>

          {/* ---------- RIGHT: floating highlight cards ---------- */}
          <motion.div
            style={{ y: cardsY }}
            className="relative lg:sticky lg:top-28 lg:self-start"
          >
            {/* Decorative chrome ring behind cards */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full border border-white/10 md:h-56 md:w-56"
              style={{ rotate: ringRotate }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent 45%, transparent 60%, rgba(229,57,53,0.4), transparent)',
                  mask: 'radial-gradient(circle, transparent 60%, black 62%)',
                  WebkitMask:
                    'radial-gradient(circle, transparent 60%, black 62%)',
                }}
              />
            </motion.div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-4 h-2 w-2 rounded-full bg-[#E53935]"
              style={{
                boxShadow:
                  '0 0 12px rgba(229,57,53,0.9), 0 0 30px rgba(229,57,53,0.5)',
              }}
            />

            <div className="mb-6 flex items-center justify-between">
              <span className="wn-eyebrow text-[11px] font-medium text-white/50">
                What We Do
              </span>
              <span className="text-xs text-white/30">04 capabilities</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {cards.map((card, i) => (
                <HighlightCard key={card.num} card={card} index={i} />
              ))}
            </div>

            {/* Caption under cards */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 text-center text-xs text-white/35 lg:text-left"
            >
              One studio. seven services.{' '}
              <span className="text-white/55">Zero excuse to blend in.</span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Highlight card                                                     */
/* ------------------------------------------------------------------ */

function HighlightCard({ card, index }: { card: Card; index: number }) {
  const { num, title, desc, Icon, accent } = card
  // staggered vertical offset for the floating editorial feel (desktop only)
  const offset = index % 2 === 1 ? 'lg:mt-16' : ''

  return (
    <motion.article
      data-cursor="View"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className={`group relative ${offset}`}
    >
      {/* continuous gentle float (inner wrapper keeps it independent of hover lift) */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 5 + index * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4,
        }}
        className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-md transition-colors duration-300 group-hover:border-[#E53935]/50 group-hover:bg-white/[0.07] sm:p-6"
      >
      {/* hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(120% 120% at 100% 0%, rgba(229,57,53,0.16), transparent 60%)',
        }}
      />

      {/* top row: number + icon */}
      <div className="relative z-10 mb-5 flex items-center justify-between">
        <span
          className={`font-[var(--font-display)] text-2xl font-bold ${
            accent
              ? 'bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent'
              : 'text-white/30'
          }`}
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {num}
        </span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300 ${
            accent
              ? 'border-[#E53935]/40 bg-[#E53935]/10 text-[#ff6b63]'
              : 'border-white/10 bg-white/[0.05] text-white/55 group-hover:border-white/30 group-hover:text-white'
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>

      {/* title + desc */}
      <h3 className="relative z-10 text-base font-semibold text-white sm:text-lg">
        {title}
      </h3>
      <p className="relative z-10 mt-1.5 text-sm leading-relaxed text-white/55">
        {desc}
      </p>

      {/* arrow on hover */}
      <div className="relative z-10 mt-4 flex items-center gap-1.5 text-xs font-medium text-[#E53935] opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span>Explore</span>
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      {/* bottom accent line */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-transparent transition-all duration-500 group-hover:w-full"
      />
      </motion.div>
    </motion.article>
  )
}
