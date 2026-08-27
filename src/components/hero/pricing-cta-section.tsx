'use client'

import { useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion'
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Crown,
  Sparkles,
  Zap,
  Orbit,
  Plus,
  Minus,
} from 'lucide-react'
import MagneticButton from '@/components/hero/magnetic-button'

/* ===================================================================
   EXACT WatNidea copy — reused VERBATIM (curly apostrophes preserved).
   Section header, 3 tiers, comparison matrix, strategy call band,
   final CTA, contact + meta — nothing rewritten.
   =================================================================== */

const sectionEyebrow = 'Pricing & Engagements'
const sectionTitleLine1 = 'Choose Your'
const sectionTitleLine2 = 'Orbit.'
const sectionSub =
  'Three engagement models. One philosophy. Every package is engineered to compound attention into revenue — no retainers wasted, no deliverables orphaned.'

const pricingFootnote =
  'All engagements include a strategy kickoff, brand audit, and a written growth surface map. Custom retainers available on request — info@watnidea.com'

const contactEmail = 'info@watnidea.com'

/* ----- Tier data ----- */
type Tier = {
  id: string
  name: string
  tag: string
  blurb: string
  price: string
  period: string
  priceNote: string
  icon: typeof Zap
  highlight: boolean
  badge?: string
  floatDuration: number
  floatDelay: number
  cursorLabel: string
  features: string[]
  expands: string[]
}

const tiers: Tier[] = [
  {
    id: 'spark',
    name: 'The Spark',
    tag: 'Starter Sprint',
    blurb:
      'A focused ignition. One service, executed obsessively, shipped in 2–3 weeks.',
    price: '₹75,000',
    period: '/ sprint',
    priceNote: 'One-time · 2–3 week build',
    icon: Zap,
    highlight: false,
    floatDuration: 7,
    floatDelay: 0,
    cursorLabel: 'View',
    features: [
      'One core service (Branding, Web, or Ads)',
      'Strategy kickoff + brand audit',
      '1 round of revisions',
      'Launch-ready deliverables',
      'Async support over WhatsApp',
    ],
    expands: [
      'Best for: early-stage brands finding their voice',
      'Timeline: 2–3 weeks',
      'Ownership: 100% yours',
    ],
  },
  {
    id: 'catalyst',
    name: 'The Catalyst',
    tag: 'Growth Engine',
    blurb:
      'The multi-service growth stack. Brand + Web + Performance, working as one compounding system.',
    price: '₹1,50,000',
    period: '/ month',
    priceNote: 'Monthly retainer · 3-month minimum',
    icon: Orbit,
    highlight: true,
    badge: 'Most Popular',
    floatDuration: 6,
    floatDelay: 0.8,
    cursorLabel: 'Select',
    features: [
      '3–4 services working in concert',
      'Dedicated growth strategist',
      'Bi-weekly performance reviews',
      'Unlimited async revisions',
      'AI ad creative + Synthetic Cinema drops',
      'Priority Slack channel',
    ],
    expands: [
      'Best for: brands ready to scale past 6–7 figures',
      'Timeline: monthly retainer',
      'Includes: Branding + Web + Performance + AI Ads',
    ],
  },
  {
    id: 'empire',
    name: 'The Empire',
    tag: 'Full-Stack Partnership',
    blurb:
      'The whole arsenal. Every service, every system, one elite team embedded in your growth.',
    price: 'Custom',
    period: '',
    priceNote: 'Quarterly partnership · by application',
    icon: Crown,
    highlight: false,
    floatDuration: 8,
    floatDelay: 0.4,
    cursorLabel: 'View',
    features: [
      'All 7 services, fully resourced',
      'Embedded creative + growth pod',
      'Weekly strategy war-rooms',
      'Custom AI content pipelines',
      'Quarterly brand films + launches',
      'Direct line to founders',
      'Quarterly board-level reporting',
    ],
    expands: [
      'Best for: category leaders & funded scale-ups',
      'Timeline: quarterly partnership',
      'Onboarding: application + 2-call diligence',
    ],
  },
]

/* ----- Comparison matrix ----- */
type MatrixRow = {
  capability: string
  spark: string
  catalyst: string
  empire: string
}

const matrixRows: MatrixRow[] = [
  { capability: 'Core services', spark: '1', catalyst: '3–4', empire: 'All 7' },
  { capability: 'Dedicated strategist', spark: '—', catalyst: '✓', empire: 'Pod' },
  { capability: 'AI ad creative', spark: 'Add-on', catalyst: '✓', empire: 'Unlimited' },
  { capability: 'Performance reviews', spark: 'Handoff', catalyst: 'Bi-weekly', empire: 'Weekly' },
  { capability: 'Revisions', spark: '1 round', catalyst: 'Unlimited async', empire: 'Live' },
  { capability: 'Brand films', spark: '—', catalyst: 'Quarterly', empire: 'Monthly' },
  { capability: 'Support channel', spark: 'WhatsApp', catalyst: 'Slack', empire: 'Direct line' },
]

/* ----- Strategy call band ----- */
const strategyEyebrow = 'STRATEGY CALL'
const strategyTitle = 'Book a Strategy Call.'
const strategySub =
  'A 30-minute working session — not a sales pitch. We audit your brand, map your growth surface, and show you exactly where attention is leaking.'
const strategySubNote = '30 min · No deck · Just signal'

/* ----- Final CTA ----- */
const finalEyebrow = 'THE INVITATION'
const finalHeadlineLines = ['Ready to', 'Build?', "Let's", 'Talk.']
const finalManifesto =
  'seven services, one studio, one decision. Pick your starting point above — or book a call and we\u2019ll map the rest together.'
const primaryCtaLabel = 'Book a Strategy Call'
const secondaryCtaLabel = 'Explore Our Work'
const metaItems = ['Creative Growth Agency', 'Now accepting selected projects', 'Now accepting selected projects']

/* ===================================================================
   MaskLine — deadlock-safe masked reveal
   =================================================================== */
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
            transition: { duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

/* ===================================================================
   PricingAmbient — layered slow-pulsing red + dim white glow blobs
   =================================================================== */
function PricingAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* intense red, top-center, slow pulse */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[8%] h-[68vw] w-[68vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.22), rgba(229,57,53,0.06) 40%, rgba(229,57,53,0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ opacity: [0.55, 0.95, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* wider dim white wash */}
      <motion.div
        aria-hidden
        className="absolute bottom-[4%] left-1/2 h-[80vw] w-[100vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.05), rgba(255,255,255,0) 60%)',
          filter: 'blur(60px)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* secondary red blob, lower-left */}
      <motion.div
        aria-hidden
        className="absolute bottom-[12%] left-[-6%] h-[34vw] w-[34vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.14), rgba(229,57,53,0) 70%)',
          filter: 'blur(45px)',
        }}
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.12, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      />
    </div>
  )
}

/* ===================================================================
   EmberCanvas — rising red/orange embers around the energy sphere.
   HMR-safe via __cleanup on the canvas element. Reduced-motion guard.
   =================================================================== */
function EmberCanvas() {
  return (
    <canvas
      ref={(c) => {
        if (!c) return
        const prev = (c as { __cleanup?: () => void }).__cleanup
        if (prev) prev()
        const ctx = c.getContext('2d')
        if (!ctx) return

        let raf = 0
        let w = 0
        let h = 0
        let dpr = 1
        const reduce =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches

        type Ember = {
          x: number
          y: number
          vx: number
          vy: number
          r: number
          life: number
          maxLife: number
          hue: number
        }
        const embers: Ember[] = []

        const spawn = (initial = false) => ({
          x: Math.random() * w,
          y: initial ? Math.random() * h : h + Math.random() * 40,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(0.3 + Math.random() * 0.6),
          r: Math.random() * 1.6 + 0.6,
          life: 0,
          maxLife: 240 + Math.random() * 280,
          hue: Math.random() < 0.55 ? 4 : 14, // red vs orange
        })

        const resize = () => {
          const parent = c.parentElement
          if (!parent) return
          dpr = Math.min(window.devicePixelRatio || 1, 2)
          w = parent.clientWidth
          h = parent.clientHeight
          c.width = w * dpr
          c.height = h * dpr
          c.style.width = w + 'px'
          c.style.height = h + 'px'
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

          embers.length = 0
          const count = reduce ? 0 : 40
          for (let i = 0; i < count; i++) embers.push(spawn(true))
        }

        const draw = () => {
          ctx.clearRect(0, 0, w, h)
          ctx.globalCompositeOperation = 'lighter'

          for (let i = 0; i < embers.length; i++) {
            const p = embers[i]
            p.life += 1
            p.x += p.vx + Math.sin(p.life * 0.04) * 0.18
            p.y += p.vy
            p.vy *= 0.998

            const t = p.life / p.maxLife
            if (t >= 1) {
              embers[i] = spawn(false)
              continue
            }
            const fade = Math.sin(t * Math.PI) // 0 → 1 → 0
            const alpha = 0.45 * fade
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
            grad.addColorStop(0, `hsla(${p.hue}, 92%, 62%, ${alpha})`)
            grad.addColorStop(1, `hsla(${p.hue}, 92%, 50%, 0)`)
            ctx.fillStyle = grad
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
            ctx.fill()
          }

          ctx.globalCompositeOperation = 'source-over'
          raf = requestAnimationFrame(draw)
        }

        resize()
        window.addEventListener('resize', resize)
        if (!reduce) raf = requestAnimationFrame(draw)

        ;(c as { __cleanup?: () => void }).__cleanup = () => {
          cancelAnimationFrame(raf)
          window.removeEventListener('resize', resize)
        }
      }}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}

/* ===================================================================
   EnergySphere — layered radial gradients + bright pinpoint core,
   cursor-follow parallax. Motion values declared in FinalCta and
   passed in (hooks service).
   =================================================================== */
function EnergySphere({
  x,
  y,
}: {
  x: ReturnType<typeof useSpring>
  y: ReturnType<typeof useSpring>
}) {
  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      {/* outermost glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '70vw',
          height: '70vw',
          maxWidth: '680px',
          maxHeight: '680px',
          background:
            'radial-gradient(circle, rgba(229,57,53,0.45), rgba(229,57,53,0.08) 40%, rgba(229,57,53,0) 70%)',
          filter: 'blur(30px)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* middle bloom */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '45vw',
          height: '45vw',
          maxWidth: '440px',
          maxHeight: '440px',
          background:
            'radial-gradient(circle, rgba(255,107,99,0.6), rgba(229,57,53,0.2) 50%, rgba(229,57,53,0) 75%)',
          filter: 'blur(20px)',
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      {/* core */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '22vw',
          height: '22vw',
          maxWidth: '220px',
          maxHeight: '220px',
          background:
            'radial-gradient(circle, rgba(255,180,170,0.85), rgba(229,57,53,0.4) 60%, rgba(229,57,53,0))',
          filter: 'blur(8px)',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
      {/* bright pinpoint center */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80"
        style={{
          width: '6vw',
          height: '6vw',
          maxWidth: '60px',
          maxHeight: '60px',
          filter: 'blur(2px)',
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

/* ===================================================================
   TierCard — floating glassmorphism pricing card with hover expansion.
   Floats on an infinite y-loop (per-card phase), expands engagement
   detail box on hover with AnimatePresence.
   =================================================================== */
function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const Icon = tier.icon
  const [hovered, setHovered] = useState(false)

  const baseScale = tier.highlight ? 1.05 : 1
  const hoverScale = tier.highlight ? 1.08 : 1.03

  return (
    <motion.div
      // outer wrapper carries the infinite float (independent of hover)
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: tier.floatDuration,
        delay: tier.floatDelay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="relative"
      style={{ zIndex: tier.highlight ? 20 : 10 }}
    >
      {/* Most Popular badge — floats above the highlighted card */}
      {tier.badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-gradient-to-r from-[#ff5a52] to-[#E53935] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_24px_rgba(229,57,53,0.55)]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <Sparkles className="h-3 w-3" />
            {tier.badge}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.9,
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
      <motion.article
        data-cursor={tier.cursorLabel}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          scale: hovered ? hoverScale : baseScale,
          y: hovered ? -6 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={
          tier.highlight
            ? {
                boxShadow: hovered
                  ? '0 0 0 1px rgba(229,57,53,0.7), 0 24px 80px -20px rgba(229,57,53,0.55), 0 0 80px rgba(229,57,53,0.35), inset 0 0 24px rgba(229,57,53,0.18)'
                  : '0 0 0 1px rgba(229,57,53,0.45), 0 16px 50px -20px rgba(229,57,53,0.35), 0 0 48px rgba(229,57,53,0.22), inset 0 0 18px rgba(229,57,53,0.1)',
              }
            : {
                boxShadow: hovered
                  ? '0 0 0 1px rgba(229,57,53,0.45), 0 18px 60px -22px rgba(229,57,53,0.4), 0 0 36px rgba(229,57,53,0.18)'
                  : '0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px -22px rgba(0,0,0,0.8)',
              }
        }
        className={
          'group relative overflow-hidden rounded-[1.75rem] p-7 backdrop-blur-xl sm:p-8 ' +
          (tier.highlight
            ? 'border border-[#E53935]/45 bg-white/[0.08] '
            : 'border border-white/10 bg-white/[0.035] transition-colors duration-500 hover:border-[#E53935]/30 ')
        }
      >
        {/* top inner highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[1.75rem] bg-gradient-to-b from-white/10 to-transparent"
        />
        {/* faint radial red glow inside top-right corner, brightens on hover */}
        <div
          aria-hidden
          className={
            'pointer-events-none absolute right-[-30%] top-[-30%] h-[60%] w-[60%] rounded-full transition-opacity duration-500 ' +
            (tier.highlight ? 'opacity-100' : 'opacity-50 group-hover:opacity-100')
          }
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.32), rgba(229,57,53,0) 70%)',
            filter: 'blur(20px)',
          }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            animate={{ rotate: hovered ? -3 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className={
              'mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors duration-300 ' +
              (tier.highlight
                ? 'border-[#E53935]/40 bg-[#E53935]/15'
                : 'border-[#E53935]/30 bg-[#E53935]/10 group-hover:border-[#E53935]/55')
            }
          >
            <Icon
              className={
                'h-6 w-6 transition-all duration-300 ' +
                (tier.highlight
                  ? 'text-[#ff6b63]'
                  : 'text-[#E53935] group-hover:text-[#ff6b63]')
              }
              style={{
                filter: hovered
                  ? 'drop-shadow(0 0 10px rgba(229,57,53,0.85))'
                  : 'drop-shadow(0 0 4px rgba(229,57,53,0.35))',
              }}
            />
          </motion.div>

          {/* Tier name */}
          <h3
            className="text-2xl font-semibold text-white"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {tier.name}
          </h3>
          {/* Tag */}
          <p className="wn-eyebrow mt-1.5 text-[10px] text-white/50">{tier.tag}</p>
          {/* Blurb */}
          <p className="mt-4 text-sm leading-relaxed text-white/60">{tier.blurb}</p>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-2">
            <span
              className="text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {tier.price}
            </span>
            {tier.period && (
              <span className="text-sm text-white/50">{tier.period}</span>
            )}
          </div>
          <p className="mt-1.5 text-xs text-white/40">{tier.priceNote}</p>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-gradient-to-r from-white/10 via-white/15 to-transparent" />

          {/* Features */}
          <ul className="space-y-3">
            {tier.features.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.12 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-start gap-3 text-sm text-white/75"
              >
                <span
                  className={
                    'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ' +
                    (tier.highlight ? 'bg-[#E53935]/25' : 'bg-[#E53935]/15')
                  }
                >
                  <Check className="h-3 w-3 text-[#E53935]" strokeWidth={3} />
                </span>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* Expandable engagement detail — reveal on hover */}
          <div className="mt-5">
            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait" initial={false}>
                {hovered ? (
                  <motion.span
                    key="minus"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Minus className="h-3.5 w-3.5 text-[#E53935]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="plus"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus className="h-3.5 w-3.5 text-[#E53935]" />
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="wn-eyebrow text-[9px] text-white/40">
                Engagement Detail
              </span>
            </div>

            <AnimatePresence initial={false}>
              {hovered && (
                <motion.div
                  key="detail"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 border-t border-white/8 pt-3">
                    <dl className="space-y-2">
                      {tier.expands.map((line) => {
                        const [k, ...rest] = line.split(':')
                        return (
                          <div key={line} className="flex flex-col">
                            <dt className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                              {k.trim()}
                            </dt>
                            <dd className="text-xs text-white/70">
                              {rest.join(':').trim()}
                            </dd>
                          </div>
                        )
                      })}
                    </dl>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="mt-7">
            <MagneticButton
              variant={tier.highlight ? 'primary' : 'secondary'}
              cursorLabel={tier.highlight ? 'Book' : 'Inquire'}
              ariaLabel={`${primaryCtaLabel} — ${tier.name}`}
              className="w-full justify-center"
              onClick={() => {}}
            >
              {tier.highlight && <CalendarDays className="h-4 w-4" />}
              {primaryCtaLabel}
            </MagneticButton>
          </div>
        </div>
      </motion.article>
      </motion.div>
    </motion.div>
  )
}

/* ===================================================================
   ComparisonMatrix — luxury spec sheet, interactive row hover.
   =================================================================== */
function ComparisonMatrix() {
  return (
    <div className="mx-auto mt-20 max-w-6xl md:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 flex items-center gap-3"
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#E53935]" />
        <span className="wn-eyebrow text-[10px] font-medium text-[#E53935]">
          Capability Matrix
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-[#E53935]/40 to-transparent" />
      </motion.div>

      <div className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-xl [scrollbar-width:thin]">
        <div className="min-w-[640px]">
          {/* Header row */}
          <div className="grid grid-cols-4 gap-2 border-b border-white/10 px-4 py-5 sm:px-6">
            <div className="wn-eyebrow self-end text-[10px] text-white/45">
              Capability
            </div>
            <div className="text-center">
              <span
                className="text-sm font-semibold text-white/80"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                The Spark
              </span>
            </div>
            <div className="text-center">
              <span
                className="inline-block text-sm font-semibold text-white"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                The Catalyst
              </span>
              <span className="mx-auto mt-1 block h-0.5 w-10 rounded-full bg-[#E53935]" />
            </div>
            <div className="text-center">
              <span
                className="text-sm font-semibold text-white/80"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                The Empire
              </span>
            </div>
          </div>

          {/* Data rows */}
          {matrixRows.map((row, i) => (
            <motion.div
              key={row.capability}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                'group grid grid-cols-4 items-center gap-2 border-b border-white/[0.06] px-4 py-4 transition-colors duration-300 hover:bg-[#E53935]/[0.04] sm:px-6 ' +
                (i % 2 === 1 ? 'bg-white/[0.015]' : '')
              }
            >
              <div className="text-sm text-white/70">{row.capability}</div>
              <MatrixCell value={row.spark} />
              <MatrixCell value={row.catalyst} highlight />
              <MatrixCell value={row.empire} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footnote */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-white/40"
      >
        {pricingFootnote.split('—').map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && (
              <span className="mx-1.5 text-[#E53935]/70">—</span>
            )}
          </span>
        ))}
      </motion.p>
    </div>
  )
}

/* Per-cell renderer for the matrix — renders ✓ / — / text. */
function MatrixCell({
  value,
  highlight = false,
}: {
  value: string
  highlight?: boolean
}) {
  if (value === '✓') {
    return (
      <div className="flex justify-center">
        <span
          className={
            'flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ' +
            (highlight
              ? 'bg-[#E53935]/30 group-hover:bg-[#E53935]/45 group-hover:shadow-[0_0_14px_rgba(229,57,53,0.6)]'
              : 'bg-[#E53935]/15')
          }
        >
          <Check className="h-3.5 w-3.5 text-[#E53935]" strokeWidth={3} />
        </span>
      </div>
    )
  }
  if (value === '—') {
    return (
      <div className="text-center text-sm text-white/25">{value}</div>
    )
  }
  return (
    <div
      className={
        'text-center text-sm transition-colors duration-300 ' +
        (highlight
          ? 'font-medium text-white group-hover:text-[#ff6b63]'
          : 'text-white/60')
      }
    >
      {value}
    </div>
  )
}

/* ===================================================================
   StrategyBand — cinematic call band with sweeping light streak.
   =================================================================== */
function StrategyBand() {
  return (
    <section className="relative my-20 px-5 sm:my-28 md:my-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#E53935]/20 bg-gradient-to-br from-[#1a0606] via-[#0a0303] to-[#141414] px-6 py-16 sm:px-12 md:py-24">
        {/* pulsing top radial */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[60%] w-[80%] -translate-x-1/2 -translate-y-1/3 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.45), rgba(229,57,53,0) 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* sweeping horizontal light streak */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 h-[2px] w-1/2 -translate-y-1/2"
          style={{
            background:
              'linear-gradient(to right, rgba(229,57,53,0), rgba(229,57,53,0.9), rgba(255,107,99,0.95), rgba(229,57,53,0))',
            filter: 'blur(0.5px)',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: '300%' }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 1.2,
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#E53935]" />
            <span className="wn-eyebrow text-[10px] font-medium text-[#E53935]">
              {strategyEyebrow}
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#E53935]" />
          </motion.div>

          <h2
            className="mb-7 text-4xl font-bold leading-[1.0] tracking-[-0.02em] sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine>
              <span className="text-white">{strategyTitle}</span>
            </MaskLine>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            {strategySub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-col items-center gap-3"
          >
            <MagneticButton
              variant="primary"
              cursorLabel="Book"
              ariaLabel={primaryCtaLabel}
              onClick={() => {}}
            >
              <CalendarDays className="h-4 w-4" />
              {primaryCtaLabel}
            </MagneticButton>
            <span className="wn-eyebrow text-[10px] text-white/40">
              {strategySubNote}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ===================================================================
   FinalCta — full-screen cinematic finale with energy sphere +
   dynamic cursor lighting + ember particles + masked headline.
   =================================================================== */
function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null)

  // cursor-follow parallax (all hooks declared unconditionally at top)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  // sphere parallax: cursor 0..1 → -40..40 / -30..30
  const sphereX = useTransform(sx, [0, 1], [-40, 40])
  const sphereY = useTransform(sy, [0, 1], [-30, 30])

  // dynamic light overlay: cursor → 30%..70% position
  const lightX = useTransform(sx, [0, 1], ['30%', '70%'])
  const lightY = useTransform(sy, [0, 1], ['30%', '70%'])
  const lightGrad = useMotionTemplate`radial-gradient(circle at ${lightX} ${lightY}, rgba(229,57,53,0.55), rgba(229,57,53,0) 55%)`

  // slow parallax fade as user scrolls past
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60])
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.4, 1, 1, 0.4]
  )

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)))
    my.set(Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)))
  }
  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24"
    >
      {/* Energy sphere — layered radial gradients + cursor parallax */}
      <EnergySphere x={sphereX} y={sphereY} />

      {/* Dynamic cursor-following red lighting overlay */}
      <motion.div
        aria-hidden
        style={{ background: lightGrad }}
        className="pointer-events-none absolute inset-0 mix-blend-screen"
      />

      {/* Ember particles around the sphere */}
      <EmberCanvas />

      {/* Bottom vignette for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(20,20,20,0.5) 80%, rgba(20,20,20,0.85) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-4xl text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-7 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#E53935]" />
          <span className="wn-eyebrow text-[10px] font-medium text-[#E53935]">
            {finalEyebrow}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#E53935]" />
        </motion.div>

        {/* Headline — 4 lines, line 2 + line 4 red gradient */}
        <h2
          className="text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-7xl md:text-8xl"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {finalHeadlineLines.map((line, i) => {
            const isAccent = i === 1 || i === 3
            return (
              <MaskLine key={i} delay={i * 0.1}>
                {isAccent ? (
                  <span className="bg-gradient-to-br from-[#ff6b63] to-[#E53935] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(229,57,53,0.45)]">
                    {line}
                  </span>
                ) : (
                  <span className="text-white">{line}</span>
                )}
              </MaskLine>
            )
          })}
        </h2>

        {/* Manifesto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          {finalManifesto}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            variant="primary"
            cursorLabel="Book"
            ariaLabel={primaryCtaLabel}
            onClick={() => {}}
          >
            <CalendarDays className="h-4 w-4" />
            {primaryCtaLabel}
          </MagneticButton>
          <MagneticButton
            variant="secondary"
            cursorLabel="Explore"
            ariaLabel={secondaryCtaLabel}
            onClick={() => {}}
          >
            {secondaryCtaLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-9"
        >
          <a
            href={`mailto:${contactEmail}`}
            className="text-sm text-white/50 transition-colors duration-300 hover:text-[#E53935]"
          >
            {contactEmail}
          </a>
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
        >
          {metaItems.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              <span className="wn-eyebrow text-[10px] text-white/35">{item}</span>
              {i < metaItems.length - 1 && (
                <span className="text-[#E53935]/60">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ===================================================================
   PricingCtaSection — default export. Composes the three sub-blocks:
   pricing (header + floating glass tier cards + comparison matrix +
   footnote), strategy call band, and final CTA. Sticky desktop rail
   with vertical label + scroll-progress line.
   =================================================================== */
export default function PricingCtaSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const railScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1])

  return (
    <div
      ref={containerRef}
      id="pricing"
      className="relative bg-[#141414]"
    >
      <PricingAmbient />

      <div className="lg:flex">
        {/* Sticky desktop rail */}
        <aside className="hidden lg:block lg:w-24 lg:shrink-0">
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <span
                className="wn-eyebrow text-[11px] font-medium text-white/45 [writing-mode:vertical-rl]"
                style={{ rotate: '180deg' }}
              >
                Engagement Models
              </span>
              <div className="relative h-56 w-px overflow-hidden rounded-full bg-white/10">
                <motion.div
                  style={{ scaleY: railScale }}
                  className="absolute inset-0 origin-top bg-[#E53935]"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                03 tiers
              </span>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="relative min-w-0 flex-1 px-5 py-28 sm:px-8 lg:py-36">
          {/* Section header */}
          <div className="mb-16 text-center md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="mb-6 flex items-center justify-center gap-3"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#E53935]" />
              <span className="wn-eyebrow text-[10px] font-medium text-[#E53935]">
                {sectionEyebrow}
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#E53935]" />
            </motion.div>

            <h2
              className="mb-7 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>
                <span className="text-white">{sectionTitleLine1}</span>
              </MaskLine>
              <MaskLine delay={0.12}>
                <span className="bg-gradient-to-br from-[#ff6b63] to-[#E53935] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(229,57,53,0.45)]">
                  {sectionTitleLine2}
                </span>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto max-w-2xl text-base text-white/55 sm:text-lg"
            >
              {sectionSub}
            </motion.p>
          </div>

          {/* Floating glass tier cards */}
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
            {tiers.map((tier, i) => (
              <TierCard key={tier.id} tier={tier} index={i} />
            ))}
          </div>

          {/* Comparison matrix + footnote */}
          <ComparisonMatrix />

          {/* Strategy call band */}
          <StrategyBand />

          {/* Final CTA */}
          <FinalCta />
        </div>
      </div>
    </div>
  )
}
