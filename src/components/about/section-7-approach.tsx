'use client'

/**
 * AboutApproach — Section 7
 * Our Approach — central identity engine + 7 satellite services.
 *
 * Composition:
 *   - Eyebrow (04) + Capabilities (reused from services)
 *   - 2-line MaskLine headline `Seven services.` / `Seven universes.`
 *     ("universes." red gradient).
 *   - Sub `Each one engineered as a product experience — not a line item.`
 *
 *   DESKTOP (lg+):
 *     - Large square "orbit" visualization:
 *       · Central pulsing red node labeled `Identity Engine`
 *         (concentric pulsing rings + bright core).
 *       · 7 satellite nodes positioned in a ring around the center,
 *         each with the service number, icon, and name.
 *       · Animated red energy streams (SVG) flowing from each satellite
 *         INTO the center; streams pulse + intensify on hover.
 *       · On hover of a satellite: scale + glow + the detail panel
 *         (below the orbit) shows the service's full description.
 *       · On hover of the center: all streams pulse brighter.
 *     - Static positioning (no orbital rotation) for legibility.
 *
 *   MOBILE (<lg):
 *     - Compact identity concept at top (smaller hub + label).
 *     - Vertical list of 7 service cards.
 *
 *   - StickyRail (lg+): label `Our Approach`, caption `07 services`.
 */

import { useRef, useState, type ReactElement } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Bot,
  Clapperboard,
  Fingerprint,
  Globe,
  LayoutDashboard,
  MessageCircle,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from './shared'

/* ===================================================================
   7 services — verbatim from services-section.tsx (n / name / cat / desc).
   Icons selected to echo the home services universe.
   =================================================================== */
type Service = {
  n: string
  name: string
  cat: string
  desc: string
  Icon: LucideIcon
  accent?: boolean
}

const services: Service[] = [
  {
    n: '01',
    name: 'Aura Architecture',
    cat: 'Branding',
    desc: 'We define your brand soul, positioning, and visual DNA to create a powerful identity that stands out with purpose and clarity.',
    Icon: Fingerprint,
  },
  {
    n: '02',
    name: 'The Digital HQ',
    cat: 'Web Development',
    desc: 'High-speed, conversion-focused websites that act as your 24/7 sales engine and digital headquarters.',
    Icon: LayoutDashboard,
  },
  {
    n: '03',
    name: 'The Hype Engine',
    cat: 'SMM',
    desc: 'We engineer conversations, trends, and communities that turn your audience into a loyal brand tribe.',
    Icon: MessageCircle,
  },
  {
    n: '04',
    name: 'Kinetic Studio',
    cat: 'Video',
    desc: 'Cinematic brand films, reels, and visual storytelling designed to capture instant attention and engagement.',
    Icon: Clapperboard,
  },
  {
    n: '05',
    name: 'Growth Alchemy',
    cat: 'Performance',
    desc: 'Paid ads and funnel systems engineered to turn every rupee into predictable, scalable revenue.',
    Icon: TrendingUp,
    accent: true,
  },
  {
    n: '06',
    name: 'Synthetic Cinema',
    cat: 'AI Ads',
    desc: 'AI-powered cinematic ads that scale your brand storytelling at the speed of imagination.',
    Icon: Bot,
    accent: true,
  },
  {
    n: '07',
    name: 'The Echo System',
    cat: 'Omnichannel',
    desc: 'SEO, AEO, and content systems that make your brand visible everywhere your audience exists.',
    Icon: Globe,
  },
]

/* ===================================================================
   Precomputed satellite positions — 7 nodes evenly spaced around a
   circle (radius 36% of the container, starting at top).
   Computed at module load; rounded to 3 decimals to guarantee
   identical SSR + client serialization.
   =================================================================== */
const SATELLITE_POSITIONS = Array.from({ length: 7 }, (_, i) => {
  const angle = (i / 7) * Math.PI * 2 - Math.PI / 2
  const r = 36
  return {
    x: Math.round((50 + Math.cos(angle) * r) * 1000) / 1000,
    y: Math.round((50 + Math.sin(angle) * r) * 1000) / 1000,
  }
})

/* ===================================================================
   IdentityHub — central pulsing red node labeled "Identity Engine".
   Concentric pulsing rings + bright core (mini EnergySphere feel).
   =================================================================== */
function IdentityHub({
  size = 'lg',
  active,
}: {
  size?: 'lg' | 'sm'
  active: boolean
}) {
  const dim = size === 'lg' ? 'h-32 w-32 sm:h-40 sm:w-40' : 'h-20 w-20'
  return (
    <div
      className={
        'relative flex items-center justify-center ' + dim
      }
      aria-hidden
    >
      {/* concentric pulsing rings */}
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-[#E53935]/40"
          style={{
            width: `${50 + i * 22}%`,
            height: `${50 + i * 22}%`,
          }}
          animate={{
            scale: [1, 1.18, 1],
            opacity: active ? [0.85, 1, 0.85] : [0.45, 0.7, 0.45],
          }}
          transition={{
            duration: 3 + i * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}
      {/* bloom */}
      <motion.span
        className="absolute rounded-full"
        style={{
          width: '70%',
          height: '70%',
          background:
            'radial-gradient(circle, rgba(255,107,99,0.55), rgba(229,57,53,0.2) 50%, rgba(229,57,53,0) 75%)',
          filter: 'blur(12px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* core */}
      <motion.span
        className="absolute rounded-full"
        style={{
          width: '36%',
          height: '36%',
          background:
            'radial-gradient(circle, rgba(255,180,170,0.95), rgba(229,57,53,0.6) 60%, rgba(229,57,53,0))',
          filter: 'blur(4px)',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* pinpoint */}
      <motion.span
        className="absolute h-2 w-2 rounded-full bg-white"
        style={{ boxShadow: '0 0 12px rgba(255,255,255,0.95)' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ===================================================================
   SatelliteNode — one satellite in the orbit. All hooks are stateless;
 * the parent passes `active` to drive the highlight.
   =================================================================== */
function SatelliteNode({
  service,
  pos,
  active,
  hubActive,
  onEnter,
  onLeave,
}: {
  service: Service
  pos: { x: number; y: number }
  active: boolean
  hubActive: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const { n, name, Icon, accent } = service
  return (
    <motion.button
      type="button"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      aria-label={`${n} ${name} — hover to see description`}
      className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 outline-none"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      animate={{ scale: active ? 1.12 : 1 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
    >
      {/* the node chip */}
      <motion.div
        className={
          'flex h-16 w-16 flex-col items-center justify-center rounded-2xl border backdrop-blur-md transition-colors duration-300 sm:h-[4.5rem] sm:w-[4.5rem] ' +
          (accent
            ? 'border-[#E53935]/50 bg-[#E53935]/10 '
            : 'border-white/15 bg-white/[0.07] group-hover:border-[#E53935]/60 ')
        }
        style={{
          boxShadow: active
            ? '0 0 0 1px rgba(229,57,53,0.7), 0 0 32px rgba(229,57,53,0.55), inset 0 0 16px rgba(229,57,53,0.18)'
            : hubActive
              ? '0 0 0 1px rgba(229,57,53,0.25), 0 0 18px rgba(229,57,53,0.18)'
              : '0 8px 30px -16px rgba(0,0,0,0.8)',
        }}
      >
        <Icon
          className={
            'h-5 w-5 ' +
            (accent
              ? 'text-[#ff6b63]'
              : active
                ? 'text-[#ff6b63]'
                : 'text-white/70 group-hover:text-[#ff6b63]')
          }
        />
        <span
          className="mt-0.5 text-[9px] font-bold text-[#E53935]"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {n}
        </span>
      </motion.div>
      {/* name label below chip */}
      <span
        className={
          'max-w-[110px] text-center text-[11px] font-medium leading-tight transition-colors duration-300 ' +
          (active ? 'text-white' : 'text-white/55 group-hover:text-white')
        }
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        {name}
      </span>
    </motion.button>
  )
}

/* ===================================================================
   EnergyStreams — SVG layer with 7 lines connecting each satellite
   to the center. Each line pulses + intensifies on hover.
   =================================================================== */
function EnergyStreams({
  activeIndex,
}: {
  activeIndex: number | null
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      {SATELLITE_POSITIONS.map((pos, i) => {
        const isActive = activeIndex === i
        const hasActive = activeIndex !== null
        return (
          <motion.line
            key={i}
            x1="50"
            y1="50"
            x2={pos.x}
            y2={pos.y}
            stroke="url(#streamGrad)"
            strokeWidth={isActive ? 0.9 : 0.5}
            strokeLinecap="round"
            animate={{
              opacity: isActive ? 1 : hasActive ? 0.15 : 0.55,
            }}
            transition={{
              duration: 0.35,
              ease: 'easeOut',
            }}
            style={{
              filter: isActive
                ? 'drop-shadow(0 0 4px rgba(229,57,53,0.95))'
                : 'drop-shadow(0 0 2px rgba(229,57,53,0.5))',
            }}
          />
        )
      })}
      {/* flowing pulses along each stream */}
      {SATELLITE_POSITIONS.map((pos, i) => (
        <motion.circle
          key={`p-${i}`}
          r={0.9}
          fill="rgba(255,107,99,0.95)"
          animate={{
            cx: [pos.x, 50],
            cy: [pos.y, 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeIn',
            delay: i * 0.25,
          }}
        />
      ))}
      <defs>
        <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(229,57,53,0.1)" />
          <stop offset="100%" stopColor="rgba(255,107,99,0.95)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ===================================================================
   DetailPanel — shows the active (hovered) service's full description.
   When nothing is hovered, shows a default "Everything starts with
   identity." message.
   =================================================================== */
function DetailPanel({ activeIndex }: { activeIndex: number | null }) {
  const active = activeIndex !== null ? services[activeIndex] : null
  return (
    <motion.div
      key={active?.n ?? 'default'}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 text-center"
    >
      {active ? (
        <>
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-bold text-[#E53935]"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {active.n}
            </span>
            <span className="h-px w-6 bg-[#E53935]/60" />
            <span className="wn-eyebrow text-[10px] font-medium text-white/45">
              {active.cat}
            </span>
          </div>
          <h4
            className="text-2xl font-semibold text-white sm:text-3xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {active.name}
          </h4>
          <p className="max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            {active.desc}
          </p>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-[#E53935]/60" />
            <span className="wn-eyebrow text-[10px] font-medium text-[#E53935]">
              THE CORE
            </span>
            <span className="h-px w-6 bg-[#E53935]/60" />
          </div>
          <h4
            className="text-2xl font-semibold text-white sm:text-3xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Everything starts with{' '}
            <RedGradientText glow={false}>identity.</RedGradientText>
          </h4>
          <p className="max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
            Hover any satellite to see how each service plugs into the
            identity engine.
          </p>
        </>
      )}
    </motion.div>
  )
}

/* ===================================================================
   MobileServiceCard — vertical list item for mobile (<lg).
   =================================================================== */
function MobileServiceCard({ service }: { service: Service }) {
  const { n, name, cat, desc, Icon, accent } = service
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={
        'group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-md ' +
        (accent
          ? 'border-[#E53935]/40 bg-[#E53935]/[0.06]'
          : 'border-white/10 bg-white/[0.035]')
      }
    >
      <div className="flex items-start gap-4">
        <span
          className={
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ' +
            (accent
              ? 'border-[#E53935]/40 bg-[#E53935]/10 text-[#ff6b63]'
              : 'border-white/10 bg-white/[0.06] text-white/65')
          }
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold text-[#E53935]"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {n}
            </span>
            <span className="wn-eyebrow text-[9px] text-white/40">{cat}</span>
          </div>
          <h4
            className="mt-1 text-lg font-semibold text-white"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {name}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-white/60">{desc}</p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-transparent transition-all duration-500 group-hover:w-full"
      />
    </motion.article>
  )
}

/* ===================================================================
   OrbitNetwork — the desktop orbit visualization (square aspect
   container with absolutely-positioned satellites + SVG streams +
   central hub). Interactive via parent state.
   =================================================================== */
function OrbitNetwork({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number | null
  setActiveIndex: (i: number | null) => void
}) {
  const [hubHovered, setHubHovered] = useState(false)

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <div className="relative aspect-square w-full">
        {/* ambient glow background */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(229,57,53,0.18), rgba(229,57,53,0) 65%)',
            filter: 'blur(30px)',
          }}
          animate={{ opacity: [0.45, 0.8, 0.45], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* faint orbit ring */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10"
        />

        {/* energy streams (SVG) */}
        <EnergyStreams activeIndex={activeIndex} />

        {/* central hub (interactive) */}
        <button
          type="button"
          onPointerEnter={() => setHubHovered(true)}
          onPointerLeave={() => setHubHovered(false)}
          onFocus={() => setHubHovered(true)}
          onBlur={() => setHubHovered(false)}
          aria-label="Identity Engine — central hub"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center outline-none"
        >
          <IdentityHub active={hubHovered || activeIndex !== null} />
          <span
            className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff6b63]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Identity Engine
          </span>
        </button>

        {/* 7 satellites */}
        {services.map((s, i) => (
          <SatelliteNode
            key={s.n}
            service={s}
            pos={SATELLITE_POSITIONS[i]}
            active={activeIndex === i}
            hubActive={hubHovered}
            onEnter={() => setActiveIndex(i)}
            onLeave={() => setActiveIndex(null)}
          />
        ))}
      </div>
    </div>
  )
}

/* ===================================================================
   AboutApproach — Section 7 default export.
   =================================================================== */
export default function AboutApproach() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

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
        <StickyRail
          label="Our Approach"
          caption="07 services"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Header block */}
          <motion.div style={{ y: headerY }} className="mb-16 max-w-3xl">
            <SectionEyebrow number="04" label="Capabilities" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Seven services.</MaskLine>
              <MaskLine delay={0.12}>
                Seven <RedGradientText>universes.</RedGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl"
            >
              Each one engineered as a product experience — not a line
              item.
            </motion.p>
          </motion.div>

          {/* Desktop orbit network (lg+) */}
          <div className="hidden lg:block">
            <OrbitNetwork
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
            {/* Detail panel below the orbit */}
            <div className="mt-12">
              <DetailPanel activeIndex={activeIndex} />
            </div>
          </div>

          {/* Mobile: compact identity concept + vertical list */}
          <div className="lg:hidden">
            {/* compact identity concept */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="mb-10 flex flex-col items-center gap-3"
            >
              <IdentityHub size="sm" active={false} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff6b63]"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                Identity Engine
              </span>
              <p className="max-w-xs text-center text-xs leading-relaxed text-white/55">
                Everything starts with identity. Seven services plug
                into the engine below.
              </p>
            </motion.div>

            {/* vertical list */}
            <div className="flex flex-col gap-3">
              {services.map((s) => (
                <MobileServiceCard key={s.n} service={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
