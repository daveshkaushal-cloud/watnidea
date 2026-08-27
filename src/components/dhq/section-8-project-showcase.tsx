'use client'

/**
 * DhqProjectShowcase — Section 8
 * Premium portfolio — 5 large horizontal cards with device mockups,
 * video-preview overlays, and interactive device switching on hover.
 *
 * Composition:
 *   - Eyebrow: (08) · Selected Work
 *   - Headline: "Selected Work" ("Work" red gradient) — font-display
 *   - Sub (verbatim): "Built for Brands That Refuse to Blend In."
 *     ("Refuse" red gradient)
 *
 * 5 premium placeholder projects (clearly placeholders, NOT real
 * client claims):
 *   01 Project Helios · E-Commerce · Web App
 *   02 Nova Labs    · SaaS · Marketing Site
 *   03 Atlas Studio  · Corporate · CMS
 *   04 Ember Co.    · Landing · Funnel
 *   05 Vantage       · E-Commerce · Web App
 *
 * Each card (horizontal, full-width, min-h-[360px]):
 *   - LEFT (or right — alternating): device mockup (browser frame on
 *     desktop, phone frame overlay). On hover, device switches
 *     (desktop ↔ mobile) via React state — interactive device
 *     switching.
 *   - RIGHT: project name (premium placeholder), category tag, short
 *     descriptor, "View Project ↗" label.
 *   - Video preview feel: ▶ Play overlay + REC indicator + scan-line
 *     + film-grain (cinematic motion feel; NO real video).
 *   - Hover zoom: device mockup scales 1.05, border tightens to red,
 *     red glow blooms, device switches.
 *   - Stagger reveal: whileInView, delay index*0.12.
 *   - `data-cursor="View"` on each card.
 *   - Alternating device-side (left/right) for editorial rhythm.
 *
 * Sticky rail (lg+): label `Selected Work`, caption `Projects`.
 */

import { useRef, useState, type ReactElement } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import {
  MaskLine,
  RedGradientText,
  SectionEyebrow,
  StickyRail,
} from '@/components/about/shared'

/* ===================================================================
   Content — 5 premium placeholder projects.
   Clearly placeholder names — NOT real client claims.
   =================================================================== */
type Project = {
  n: string
  name: string
  category: string
  descriptor: string
  url: string
  swatches: string[]
  accent: string
}

const projects: Project[] = [
  {
    n: '01',
    name: 'Project Helios',
    category: 'E-Commerce · Web App',
    descriptor:
      'A sun-locked storefront engineered to glow across every device — sub-second loads, conversion-tuned PDPs, and a cart flow that compounds.',
    url: 'helios.shop',
    swatches: ['#E53935', '#ff6b63', '#141414', '#ffffff', '#a8201d'],
    accent: '#ff6b63',
  },
  {
    n: '02',
    name: 'Nova Labs',
    category: 'SaaS · Marketing Site',
    descriptor:
      'A scattered product narrative reorganized into a single, navigable north star — demo-booking machine with a 4× lift on trial signups.',
    url: 'novalabs.io',
    swatches: ['#ff6b63', '#E53935', '#7a1414', '#141414', '#ffffff'],
    accent: '#E53935',
  },
  {
    n: '03',
    name: 'Atlas Studio',
    category: 'Corporate · CMS',
    descriptor:
      'A corporate HQ rebuilt from first principles — headless CMS, structured content, and a brand system that scales across 12 markets.',
    url: 'atlasstudio.co',
    swatches: ['#E53935', '#ffffff', '#a8201d', '#141414', '#ff6b63'],
    accent: '#a8201d',
  },
  {
    n: '04',
    name: 'Ember Co.',
    category: 'Landing · Funnel',
    descriptor:
      'A muted landing page stoked into a slow-burning red funnel — engineered end-to-end so every scroll compounds toward a single CTA.',
    url: 'emberco.com',
    swatches: ['#a8201d', '#E53935', '#ff6b63', '#141414', '#ffffff'],
    accent: '#ff6b63',
  },
  {
    n: '05',
    name: 'Vantage',
    category: 'E-Commerce · Web App',
    descriptor:
      'A premium commerce experience engineered to convert on mobile first — PWA, offline cart, and a one-tap checkout that closes.',
    url: 'vantage.store',
    swatches: ['#E53935', '#ffffff', '#141414', '#ff6b63', '#7a1414'],
    accent: '#E53935',
  },
]

/* ===================================================================
   DesktopMockup — browser frame showing a stylized website preview
   rendered as abstract premium shapes (color palette, hero section,
   nav, content blocks).
   =================================================================== */
function DesktopMockup({
  p,
  isHovered,
}: {
  p: Project
  isHovered: boolean
}) {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/15 bg-[#0a0a0a]/85 backdrop-blur-md"
      style={{
        boxShadow: isHovered
          ? '0 0 28px rgba(229,57,53,0.4), 0 0 60px rgba(229,57,53,0.18)'
          : '0 8px 24px rgba(0,0,0,0.5)',
        transition: 'box-shadow 0.5s ease',
      }}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.025] px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#E53935]/80" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </div>
        <div className="ml-2 flex h-5 flex-1 items-center rounded-md border border-white/8 bg-[#1A1A1A]/80 px-2">
          <span className="text-[9px] font-medium text-white/55" style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}>
            {p.url}
          </span>
        </div>
        {/* device toggle hint */}
        <span className="rounded-sm border border-white/8 bg-[#1A1A1A]/80 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.15em] text-white/40">
          desktop
        </span>
      </div>
      {/* content area — abstract premium website preview */}
      <div className="relative flex-1 overflow-hidden">
        {/* nav strip */}
        <div className="flex items-center justify-between border-b border-white/5 px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ background: p.accent, boxShadow: `0 0 6px ${p.accent}` }} />
            <div className="h-1.5 w-12 rounded-full bg-white/25" />
          </div>
          <div className="flex items-center gap-1">
            <div className="h-1 w-5 rounded-full bg-white/15" />
            <div className="h-1 w-5 rounded-full bg-white/15" />
            <div className="h-1 w-5 rounded-full bg-white/15" />
          </div>
        </div>
        {/* hero — big abstract mark */}
        <div className="relative p-3">
          <motion.div
            className="h-2 w-2/3 rounded-full"
            style={{ background: p.accent }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-full rounded-full bg-white/18" />
            <div className="h-1.5 w-5/6 rounded-full bg-white/12" />
          </div>
          <motion.div
            className="mt-3 inline-block rounded-sm bg-[#E53935] px-2.5 py-1 text-[8px] font-bold text-white"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 10px rgba(229,57,53,0.6)' }}
          >
            Shop Now →
          </motion.div>
        </div>
        {/* product / content grid */}
        <div className="grid grid-cols-3 gap-1.5 px-3 pb-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="rounded-sm border border-white/8 bg-white/[0.06]"
              style={{
                background:
                  i === 1
                    ? `linear-gradient(135deg, ${p.accent}66, ${p.accent}1a)`
                    : 'rgba(255,255,255,0.04)',
              }}
              animate={{ y: [0, -2, 0], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.18,
              }}
            >
              <div className="h-6 rounded-t-sm" style={{ background: i === 1 ? `${p.accent}40` : 'rgba(255,255,255,0.05)' }} />
              <div className="space-y-0.5 p-1">
                <div className="h-0.5 w-3/4 rounded-full bg-white/20" />
                <div className="h-0.5 w-1/2 rounded-full" style={{ background: `${p.accent}99` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ===================================================================
   MobileMockup — phone frame overlay, same brand preview.
   =================================================================== */
function MobileMockup({
  p,
  isHovered,
}: {
  p: Project
  isHovered: boolean
}) {
  return (
    <div
      className="relative mx-auto flex h-full w-full max-w-[180px] flex-col items-center justify-center"
      aria-hidden
    >
      <motion.div
        className="relative w-full overflow-hidden rounded-[1.5rem] border-2 border-white/20 bg-[#0a0a0a]/90 backdrop-blur-md"
        style={{
          aspectRatio: '9/16',
          boxShadow: isHovered
            ? '0 0 28px rgba(229,57,53,0.45), 0 0 60px rgba(229,57,53,0.2)'
            : '0 8px 24px rgba(0,0,0,0.55)',
          transition: 'box-shadow 0.5s ease',
        }}
      >
        {/* phone notch */}
        <div className="absolute left-1/2 top-0 z-10 h-3 w-12 -translate-x-1/2 rounded-b-md bg-[#2E2E2E]/90" />
        {/* content area */}
        <div className="relative flex h-full flex-col overflow-hidden">
          {/* nav bar */}
          <div className="flex items-center justify-between px-2 pt-3.5">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
              <div className="h-1 w-8 rounded-full bg-white/25" />
            </div>
            <div className="space-y-0.5">
              <div className="h-0.5 w-3 rounded-full bg-white/20" />
              <div className="h-0.5 w-3 rounded-full bg-white/20" />
            </div>
          </div>
          {/* hero */}
          <div className="p-2">
            <motion.div
              className="h-1.5 w-3/4 rounded-full"
              style={{ background: p.accent }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="mt-1.5 space-y-0.5">
              <div className="h-1 w-full rounded-full bg-white/18" />
              <div className="h-1 w-2/3 rounded-full bg-white/12" />
            </div>
            <motion.div
              className="mt-2 inline-block rounded-sm bg-[#E53935] px-1.5 py-0.5 text-[7px] font-bold text-white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              Buy →
            </motion.div>
          </div>
          {/* product grid */}
          <div className="grid grid-cols-2 gap-1 px-2 pb-2">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="rounded-sm border border-white/8 bg-white/5"
                style={{
                  background:
                    i === 0
                      ? `linear-gradient(135deg, ${p.accent}66, ${p.accent}1a)`
                      : 'rgba(255,255,255,0.05)',
                }}
                animate={{ y: [0, -1.5, 0], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              >
                <div className="h-4 rounded-t-sm" style={{ background: i === 0 ? `${p.accent}40` : 'rgba(255,255,255,0.05)' }} />
                <div className="space-y-0.5 p-0.5">
                  <div className="h-0.5 w-3/4 rounded-full bg-white/20" />
                  <div className="h-0.5 w-1/2 rounded-full" style={{ background: `${p.accent}99` }} />
                </div>
              </motion.div>
            ))}
          </div>
          {/* bottom nav */}
          <div className="mt-auto flex items-center justify-around border-t border-white/8 px-2 py-1.5">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="h-1 w-1 rounded-full"
                style={{
                  background: i === 0 ? p.accent : 'rgba(255,255,255,0.3)',
                }}
                animate={i === 0 ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ===================================================================
   ProjectCard — single project showcase card.
   Even index → md:flex-row (device left, content right).
   Odd index → md:flex-row-reverse (device right, content left).
   Local `hovered` state toggles device between desktop and mobile.
   =================================================================== */
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const reversed = index % 2 === 1

  return (
    <motion.article
      data-cursor="View"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl transition-colors duration-500 hover:border-[#E53935]/55 md:flex md:min-h-[360px] ${
        reversed ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* red glow bloom on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 shadow-[0_0_50px_rgba(229,57,53,0.25)] transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* === Device mockup area === */}
      <div className="relative w-full overflow-hidden border-b border-white/8 bg-[#1A1A1A]/75 p-6 sm:p-8 md:w-1/2 md:border-b-0 md:border-r md:border-white/8">
        {/* hover zoom wrapper */}
        <motion.div
          className="relative h-56 w-full sm:h-64 md:h-full md:min-h-[300px]"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* device switches desktop ↔ mobile on hover */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: hovered ? 0 : 1,
              scale: hovered ? 0.92 : 1,
              rotateY: hovered ? -12 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'center' }}
          >
            <DesktopMockup p={p} isHovered={hovered} />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 1.08,
              rotateY: hovered ? 0 : 12,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'center' }}
          >
            <MobileMockup p={p} isHovered={hovered} />
          </motion.div>
        </motion.div>

        {/* scan-line cinematic overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
          }}
        />
        {/* film-grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0, transparent 1.2px), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.5) 0, transparent 1px), radial-gradient(circle at 40% 70%, rgba(255,255,255,0.4) 0, transparent 1px), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.5) 0, transparent 1px)',
            backgroundSize: '60px 60px, 90px 90px, 70px 70px, 80px 80px',
          }}
        />

        {/* REC indicator (top-left) */}
        <div className="absolute left-5 top-5 flex items-center gap-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#E53935]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 6px rgba(229,57,53,0.85)' }}
          />
          <span className="wn-eyebrow text-[9px] font-medium text-white/55 transition-colors duration-300 group-hover:text-white/85">
            REC
          </span>
        </div>

        {/* ▶ Play overlay (top-right, appears on hover) */}
        <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-white/15 bg-[#1A1A1A]/80 px-2.5 py-1 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
          <Play className="h-3 w-3 fill-[#E53935] text-[#E53935]" />
          <span className="wn-eyebrow text-[9px] font-medium text-white/85">
            PREVIEW
          </span>
        </div>

        {/* corner number */}
        <span
          className="absolute bottom-5 left-5 text-xs font-bold text-white/30 transition-colors duration-300 group-hover:text-[#E53935]/70"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          ({p.n})
        </span>

        {/* color palette swatch row (bottom-right, on hover) */}
        <div className="absolute bottom-5 right-5 flex items-center gap-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {p.swatches.map((sw, i) => (
            <span
              key={i}
              className="h-3 w-3 rounded-full ring-1 ring-white/20"
              style={{ background: sw }}
            />
          ))}
        </div>

        {/* device-switch hint */}
        <div className="absolute right-5 bottom-12 flex items-center gap-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="rounded-sm border border-[#E53935]/40 bg-[#1A1A1A]/80 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.15em] text-[#ff6b63]">
            → mobile
          </span>
        </div>
      </div>

      {/* === Content area === */}
      <div className="relative flex w-full flex-1 flex-col justify-between p-6 sm:p-8 md:w-1/2 md:p-10">
        <div>
          {/* category tag */}
          <span className="wn-eyebrow text-[11px] font-medium text-[#E53935]">
            {p.category}
          </span>

          {/* project name */}
          <h3
            className="mt-3 text-3xl font-semibold text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {p.name}
          </h3>

          {/* descriptor */}
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
            {p.descriptor}
          </p>
        </div>

        {/* View Project ↗ */}
        <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#E53935]">
          <span>View Project</span>
          <motion.span
            animate={hovered ? { x: 4, y: -4 } : { x: 0, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.span>
        </div>

        {/* bottom accent line */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#E53935] to-transparent transition-all duration-500 group-hover:w-full"
        />
      </div>
    </motion.article>
  )
}

/* ===================================================================
   DhqProjectShowcase — Section 8 named export
   =================================================================== */
export function DhqProjectShowcase(): ReactElement {
  const sectionRef = useRef<HTMLDivElement>(null)
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
        <StickyRail label="Selected Work" caption="Projects" sectionRef={sectionRef} />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(229,57,53,0.18), rgba(229,57,53,0) 65%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Header block */}
          <motion.div style={{ y: headerY }} className="relative z-10 mb-14 max-w-3xl">
            <SectionEyebrow number="08" label="Selected Work" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>
                Selected <RedGradientText>Work</RedGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Built for Brands That <RedGradientText glow={false}>Refuse</RedGradientText> to Blend In.
            </motion.p>
          </motion.div>

          {/* Projects — vertical stack of horizontal cards */}
          <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
            {projects.map((p, i) => (
              <ProjectCard key={p.n} p={p} index={i} />
            ))}
          </div>

          {/* footer line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative z-10 mt-10 text-sm text-white/40"
          >
            Placeholder work, real craft.{' '}
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
