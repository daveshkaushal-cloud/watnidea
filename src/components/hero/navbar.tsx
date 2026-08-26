'use client'

/**
 * WatNidea — Premium Navigation System
 * ------------------------------------
 * Floating glassmorphism navbar with:
 *   - 3-zone layout (logo / center nav links / CTA + status badge)
 *   - Scroll-shrink behavior (80px → 64px, bg more opaque)
 *   - Animated underlines + text glow + micro-lift on link hover
 *   - MagneticButton CTA (variant="primary", cursorLabel="Book")
 *   - Desktop Services mega menu: fullscreen two-column editorial
 *       LEFT  — "What We Build" + 7 service rows (number + name + cat)
 *       RIGHT — large glassmorphism preview panel with crossfade
 *               between per-service mini visual universes + description
 *   - Mobile fullscreen overlay with morphing menu icon, staggered link
 *     reveal, expandable Services section, full-width CTA
 *
 * State:
 *   scrolled            — past 40px scroll
 *   megaOpen            — desktop Services mega menu
 *   mobileOpen          — mobile fullscreen overlay
 *   servicesExpanded    — mobile Services expandable
 *   activeService       — hovered/default service index in mega menu
 *
 * Interactions:
 *   - Hover-intent (~150ms) on mega menu open/close
 *   - Body scroll lock when megaOpen || mobileOpen
 *   - Escape closes any open menu
 *   - Route change closes any open menu + collapses mobile Services
 *   - Custom cursor labels on every interactive element via data-cursor
 *
 * The Navbar is mounted in both `/` (page.tsx) and `/about` (about/page.tsx),
 * inside the root wrapper, before <main>. The root wrapper uses
 * `overflow-clip` (NOT `overflow-hidden`) — preserved by Task 10.
 */

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactElement, type CSSProperties } from 'react'
import {
  ArrowUpRight,
  Bot,
  CalendarDays,
  ChevronDown,
  Clapperboard,
  Fingerprint,
  Globe,
  LayoutDashboard,
  MessageCircle,
  Radio,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { AboutAmbient, EmberCanvas } from '@/components/about/shared'
import MagneticButton from './magnetic-button'
import { cn } from '@/lib/utils'

/* ===================================================================
   SERVICE DATA — verbatim name + description from services-section.tsx.
   Categories are the user-specified editorial labels (slightly different
   from the home-page services-section categories).
   =================================================================== */

type Service = {
  n: string
  name: string
  cat: string
  desc: string
  icon: LucideIcon
  Visual: () => ReactElement
  href: string
}

const services: Service[] = [
  {
    n: '01',
    name: 'Aura Architecture',
    cat: 'Brand Strategy & Identity',
    desc: 'We define your brand soul, positioning, and visual DNA to create a powerful identity that stands out with purpose and clarity.',
    icon: Fingerprint,
    Visual: AuraMini,
    href: '/aura-architecture',
  },
  {
    n: '02',
    name: 'The Digital HQ',
    cat: 'Web Design & Development',
    desc: 'High-speed, conversion-focused websites that act as your 24/7 sales engine and digital headquarters.',
    icon: LayoutDashboard,
    Visual: DigitalHQMini,
    href: '/the-digital-hq',
  },
  {
    n: '03',
    name: 'The Hype Engine',
    cat: 'Social Media Marketing',
    desc: 'We engineer conversations, trends, and communities that turn your audience into a loyal brand tribe.',
    icon: MessageCircle,
    Visual: HypeEngineMini,
    href: '/the-hype-engine',
  },
  {
    n: '04',
    name: 'Kinetic Studio',
    cat: 'Video Production',
    desc: 'Cinematic brand films, reels, and visual storytelling designed to capture instant attention and engagement.',
    icon: Clapperboard,
    Visual: KineticMini,
    href: '/kinetic-studio',
  },
  {
    n: '05',
    name: 'Growth Alchemy',
    cat: 'Performance Marketing',
    desc: 'Paid ads and funnel systems engineered to turn every rupee into predictable, scalable revenue.',
    icon: TrendingUp,
    Visual: GrowthMini,
    href: '/growth-alchemy',
  },
  {
    n: '06',
    name: 'Synthetic Cinema',
    cat: 'AI Advertising',
    desc: 'AI-powered cinematic ads that scale your brand storytelling at the speed of imagination.',
    icon: Bot,
    Visual: SyntheticMini,
    href: '/synthetic-cinema',
  },
  {
    n: '07',
    name: 'The Echo System',
    cat: 'SEO • AEO • Content Systems',
    desc: 'SEO, AEO, and content systems that make your brand visible everywhere your audience exists.',
    icon: Radio,
    Visual: EchoMini,
    href: '/the-echo-system',
  },
]

/* ===================================================================
   MINI VISUAL UNIVERSES — one per service, compact versions of the
   services-section visuals. Designed to fit inside a ~4/3 aspect panel.
   All function declarations are hoisted, so they can be referenced
   from the `services` array above.
   =================================================================== */

/* 01 — Aura Architecture: morphing identity mark + orbit rings + core */
function AuraMini() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.16), transparent 65%)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2"
        animate={{
          borderRadius: ['24%', '50%', '46%', '50%', '24%'],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          border: '1px solid rgba(229,57,53,0.5)',
          background:
            'radial-gradient(circle, rgba(229,57,53,0.18), transparent 72%)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ border: '1px dashed rgba(255,255,255,0.2)' }}
      />
      {[0, 1, 2, 3, 4].map((i) => {
        const r = 50 + i * 12
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: r * 2,
              height: r * 2,
              marginLeft: -r,
              marginTop: -r,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span
              className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/85"
              style={{ boxShadow: '0 0 8px rgba(255,255,255,0.7)' }}
            />
          </motion.div>
        )
      })}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow:
            '0 0 18px rgba(229,57,53,0.95), 0 0 40px rgba(229,57,53,0.5)',
        }}
      />
    </div>
  )
}

/* 02 — The Digital HQ: floating browser + perspective grid floor */
function DigitalHQMini() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(229,57,53,0.10), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          transform: 'perspective(300px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />
      <motion.div
        className="absolute left-[14%] top-[20%] h-20 w-28 rounded-lg border border-white/10 bg-white/[0.05]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[16%] top-[28%] h-16 w-24 rounded-lg border border-[#E53935]/20 bg-[#E53935]/[0.04]"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 w-[68%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/15 bg-[#0c0c0c]"
        style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E53935]/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="ml-2 flex-1 rounded bg-white/[0.08] px-1.5 py-0.5 text-[8px] text-white/40">
            watnidea.studio
          </div>
        </div>
        <div className="space-y-1.5 p-2.5">
          <motion.div
            className="h-1.5 w-1/3 rounded bg-[#E53935]/50"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-5/6 rounded bg-white/10" />
          <div className="grid grid-cols-3 gap-1.5 pt-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-8 rounded bg-white/[0.07]"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
      <motion.span
        className="absolute left-[36%] top-[58%] h-2.5 w-0.5 bg-[#E53935]"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  )
}

/* 03 — The Hype Engine: social conversation nodes + energy rings */
function HypeEngineMini() {
  const nodes = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 - Math.PI / 2
    return { x: 50 + Math.cos(a) * 34, y: 50 + Math.sin(a) * 34 }
  })
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.10), transparent 60%)',
        }}
      />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E53935]/25"
          animate={{ scale: [0.4, 1.7], opacity: [0.6, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: 'easeOut',
          }}
          style={{ width: 110, height: 110 }}
        />
      ))}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {nodes.map((nd, i) => (
          <motion.line
            key={i}
            x1={50}
            y1={50}
            x2={nd.x}
            y2={nd.y}
            stroke="rgba(229,57,53,0.35)"
            strokeWidth={0.3}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </svg>
      <motion.div
        className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ boxShadow: '0 0 20px rgba(229,57,53,0.9)' }}
      />
      {nodes.map((nd, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70"
          style={{
            left: `${nd.x}%`,
            top: `${nd.y}%`,
            boxShadow: '0 0 8px rgba(255,255,255,0.6)',
          }}
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.25,
          }}
        />
      ))}
    </div>
  )
}

/* 04 — Kinetic Studio: letterbox bars + motion trails + film strip */
function KineticMini() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#141414]">
      <div className="absolute inset-x-0 top-0 z-10 h-5 bg-[#141414]" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-5 bg-[#141414]" />
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(229,57,53,0.9), transparent)',
            top: `${28 + i * 12}%`,
            width: 120,
          }}
          animate={{ x: ['-20%', '120%'], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.8 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeIn',
          }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-1.5"
        animate={{ x: [0, -54] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-14 w-10 shrink-0 overflow-hidden rounded-sm border border-white/15 bg-gradient-to-br from-white/[0.08] to-[#E53935]/[0.08]"
          >
            <div className="h-1.5 w-full bg-[#262626]/85" />
          </div>
        ))}
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm">
          <span className="ml-1 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
        </div>
      </motion.div>
      <span className="absolute right-3 top-7 z-10 font-mono text-[10px] text-[#E53935]">
        REC ● 00:24
      </span>
    </div>
  )
}

/* 05 — Growth Alchemy: ascending chart + bars + ROAS label */
function GrowthMini() {
  const bars = [40, 58, 72, 88, 100]
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(229,57,53,0.10), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-x-6 bottom-14 top-10 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '100% 20%',
        }}
      />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.polyline
          points="10,75 28,60 46,45 64,30 82,12"
          fill="none"
          stroke="rgba(229,57,53,0.7)"
          strokeWidth={1.2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-x-8 bottom-14 top-12 flex items-end justify-between gap-2">
        {bars.map((h, i) => (
          <div key={i} className="relative flex-1" style={{ height: `${h}%` }}>
            <motion.div
              className="absolute bottom-0 w-full origin-bottom rounded-t-sm"
              style={{
                background:
                  'linear-gradient(to top, rgba(229,57,53,0.5), rgba(255,255,255,0.12))',
                height: '100%',
              }}
              animate={{ scaleY: [0.6, 1, 0.6] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute -top-5 left-1/2 h-10 w-1 -translate-x-1/2 rounded-full"
              style={{
                background:
                  'linear-gradient(to top, rgba(229,57,53,0.9), transparent)',
              }}
              animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.9, 1.1, 0.9] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          </div>
        ))}
      </div>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#E53935]"
          style={{ left: `${20 + i * 15}%`, bottom: 0 }}
          animate={{ y: [0, -180], opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
      <span className="absolute right-5 top-7 font-mono text-xs text-[#E53935]">
        ▲ Growth
      </span>
    </div>
  )
}

/* 06 — Synthetic Cinema: AI-generated gradient blobs + scanning line */
function SyntheticMini() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#141414]">
      <motion.div
        className="absolute left-1/4 top-1/3 h-32 w-32 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.35), transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{ x: [0, 36, 0], y: [0, -18, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/4 h-28 w-28 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)',
          filter: 'blur(16px)',
        }}
        animate={{ x: [0, -26, 0], y: [0, 14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Scanning line — CSS @keyframes (not Framer Motion animate) to
          avoid WAAPI errors on layout-property animation. */}
      <div
        className="absolute inset-x-0 h-px bg-[#E53935]/70"
        style={{
          boxShadow: '0 0 12px rgba(229,57,53,0.8)',
          top: '10%',
          '--scan-start': '10%',
          '--scan-end': '90%',
          animation: 'cinema-scanline 5s ease-in-out infinite',
        } as CSSProperties}
      />
      <div className="absolute left-5 top-1/2 -translate-y-1/2 space-y-1.5">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-2 rounded-sm bg-white/15"
            style={{ width: 56 + i * 8, transformOrigin: 'left center' }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              scaleX: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <svg
        viewBox="0 0 100 40"
        className="absolute inset-x-0 bottom-0 h-1/3 w-full"
        preserveAspectRatio="none"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.path
            key={i}
            d={`M0,${20 + i * 3} Q25,${10 + i * 3} 50,${18 + i * 3} T100,${16 + i * 3}`}
            fill="none"
            stroke={`rgba(229,57,53,${0.5 - i * 0.07})`}
            strokeWidth={0.3}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>
      <span className="absolute right-4 top-6 font-mono text-[10px] text-[#E53935]">
        AI · GENERATING
      </span>
    </div>
  )
}

/* 07 — The Echo System: orbit rings + rotating satellites + central hub */
function EchoMini() {
  const channels = ['SEO', 'SOC', 'VID', 'EML', 'AEO', 'PR']
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.10), transparent 60%)',
        }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{ width: 70 + i * 60, height: 50 + i * 44 }}
        />
      ))}
      {[0, 1, 2].map((orbitIdx) => {
        const w = 70 + orbitIdx * 60
        const h = 50 + orbitIdx * 44
        const count = orbitIdx === 0 ? 3 : orbitIdx === 1 ? 2 : 1
        return Array.from({ length: count }).map((_, k) => {
          const idx = orbitIdx * 3 + k
          const dur = 14 + orbitIdx * 6
          return (
            <motion.div
              key={idx}
              className="absolute left-1/2 top-1/2"
              style={{
                width: w,
                height: h,
                marginLeft: -w / 2,
                marginTop: -h / 2,
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-[#E53935]/40 bg-[#0c0c0c] text-[7px] font-bold text-[#ff6b63]"
                  animate={{ rotate: [0, -360] }}
                  transition={{
                    duration: dur,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {channels[idx % channels.length]}
                </motion.div>
              </div>
            </motion.div>
          )
        })
      })}
      <motion.div
        className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ boxShadow: '0 0 24px rgba(229,57,53,0.9)' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E53935]/50"
        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
      />
    </div>
  )
}

/* ===================================================================
   NAV LINK — animated underline + text glow + micro-lift
   =================================================================== */

function NavLink({
  href,
  label,
  cursorLabel,
  active,
  onClick,
}: {
  href: string
  label: string
  cursorLabel: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <motion.a
      href={href}
      data-cursor={cursorLabel}
      onClick={onClick}
      whileHover={{ y: -1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        'group relative px-3 py-2 text-sm font-medium transition-colors duration-300',
        active ? 'text-white' : 'text-white/70 hover:text-white'
      )}
    >
      <span
        className={cn(
          'transition-all duration-300',
          active
            ? 'drop-shadow-[0_0_8px_rgba(229,57,53,0.5)]'
            : 'group-hover:drop-shadow-[0_0_8px_rgba(229,57,53,0.5)]'
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'absolute bottom-1 left-3 right-3 h-px origin-left bg-[#E53935] transition-transform duration-300',
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        )}
      />
    </motion.a>
  )
}

/* ===================================================================
   SERVICE ROW (mega menu LEFT column)
   =================================================================== */

function ServiceRow({
  service,
  active,
  onHover,
  onSelect,
}: {
  service: Service
  active: boolean
  onHover: () => void
  onSelect: () => void
}) {
  return (
    <Link
      href={service.href}
      data-cursor="View"
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onSelect}
      className={cn(
        'group flex items-center gap-4 rounded-xl px-4 py-3 transition-colors duration-300',
        active ? 'bg-white/[0.06]' : 'hover:bg-white/[0.02]'
      )}
    >
      <span
        className={cn(
          'font-[var(--font-display)] text-xs font-bold transition-colors duration-300',
          active ? 'text-[#E53935]' : 'text-white/30'
        )}
        style={{ fontFamily: 'var(--font-display), sans-serif' }}
      >
        {service.n}
      </span>
      <div className="flex-1">
        <motion.h3
          animate={{ x: active ? 4 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className={cn(
            'text-2xl font-semibold transition-colors duration-300 md:text-[1.7rem]',
            active
              ? 'text-white drop-shadow-[0_0_12px_rgba(229,57,53,0.45)]'
              : 'text-white/80 group-hover:text-white'
          )}
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          {service.name}
        </motion.h3>
        <p
          className={cn(
            'mt-0.5 text-sm transition-colors duration-300',
            active ? 'text-white/55' : 'text-white/45'
          )}
        >
          {service.cat}
        </p>
      </div>
      <motion.div
        animate={{ opacity: active ? 1 : 0, x: active ? 0 : -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="text-[#E53935]"
      >
        <ArrowUpRight className="h-5 w-5" />
      </motion.div>
    </Link>
  )
}

/* ===================================================================
   SERVICE PREVIEW (mega menu RIGHT column) — crossfade on hover change
   =================================================================== */

function ServicePreview({ service }: { service: Service }) {
  const Icon = service.icon
  const V = service.Visual
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={service.n}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl md:aspect-[4/3]"
        >
          {/* Header */}
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E53935]/30 bg-[#E53935]/10">
                <Icon className="h-4 w-4 text-[#E53935]" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                {service.cat}
              </span>
            </div>
            <span className="font-mono text-xs text-[#E53935]/70">
              {service.n}/07
            </span>
          </div>

          {/* Visual universe */}
          <div className="absolute inset-0">
            <V />
          </div>

          {/* Bottom description card */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
            <div className="rounded-2xl border border-white/10 bg-[#141414]/70 p-4 backdrop-blur-md">
              <p className="text-sm leading-relaxed text-white/75">
                {service.desc}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="wn-eyebrow text-[10px] text-white/40">
                  Featured Work
                </span>
                <Link
                  href="/about"
                  data-cursor="View"
                  onClick={() => setMegaOpen(false)}
                  className="flex items-center gap-1 text-xs font-medium text-[#E53935] transition-colors hover:text-[#ff6b63]"
                >
                  <span>{service.name}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ===================================================================
   MORPHING MENU ICON — two lines that morph into an X
   =================================================================== */

function MorphingIcon({ open }: { open: boolean }) {
  return (
    <div className="relative flex h-4 w-5 flex-col justify-between">
      <motion.span
        className="block h-0.5 w-5 rounded-full bg-white"
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <motion.span
        className="block h-0.5 w-5 rounded-full bg-white"
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
    </div>
  )
}

/* ===================================================================
   MAIN NAVBAR
   =================================================================== */

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesExpanded, setServicesExpanded] = useState(false)
  const [activeService, setActiveService] = useState(0)

  const goToBookStrategyCall = () => {
    if (pathname !== '/book-strategy-call') router.push('/book-strategy-call')
  }

  const openTimer = useRef<number | null>(null)
  const closeTimer = useRef<number | null>(null)

  /* Scroll listener — toggle `scrolled` past 40px */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Body scroll lock when any menu is open */
  useEffect(() => {
    if (megaOpen || mobileOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [megaOpen, mobileOpen])

  /* Escape closes any open menu */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false)
        setMobileOpen(false)
        setServicesExpanded(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Clear hover-intent timers on unmount */
  useEffect(() => {
    return () => {
      if (openTimer.current) window.clearTimeout(openTimer.current)
      if (closeTimer.current) window.clearTimeout(closeTimer.current)
    }
  }, [])

  /* Hover-intent open/close (150ms delay on close to prevent flicker) */
  const openMega = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setMegaOpen(true)
  }
  const closeMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 150)
  }

  /* Mobile menu close helper */
  const closeMobile = () => {
    setMobileOpen(false)
    setServicesExpanded(false)
  }

  return (
    <>
      {/* ============================================================
          FLOATING GLASSMORPHISM NAVBAR
          ============================================================ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 22,
          delay: 0.1,
        }}
        className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2"
      >
        <div
          className={cn(
            'group relative flex items-center justify-between rounded-2xl border border-[#E53935]/15 px-4 backdrop-blur-[24px] transition-all duration-300 sm:px-6',
            scrolled ? 'h-16 bg-[#141414]/92' : 'h-20 bg-[#141414]/70'
          )}
          style={{
            boxShadow: scrolled
              ? '0 0 18px rgba(229,57,53,0.10)'
              : '0 0 24px rgba(229,57,53,0.08)',
          }}
        >
          {/* LEFT — Logo */}
          <Link
            href="/"
            data-cursor="Home"
            aria-label="WatNidea home"
            className="group flex items-center gap-2.5"
          >
            {/* Brand logo — watNidea logo with light bulb icon + wordmark */}
            <span className="relative flex items-center transition-transform duration-500 group-hover:scale-[1.03]">
              <Image
                src="/watnidea-logo-navbar.png"
                alt="WatNidea"
                width={150}
                height={26}
                priority
                className={cn(
                  'h-auto w-auto transition-all duration-300',
                  scrolled ? 'h-6 sm:h-7' : 'h-7 sm:h-8'
                )}
                style={{ filter: 'drop-shadow(0 0 12px rgba(229,57,53,0.15))' }}
              />
            </span>
          </Link>

          {/* CENTER — Nav links (md+) */}
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
            aria-label="Primary navigation"
          >
            <NavLink
              href="/"
              label="Home"
              cursorLabel="Home"
              active={pathname === '/'}
              onClick={() => setMegaOpen(false)}
            />
            <NavLink
              href="/about"
              label="About"
              cursorLabel="About"
              active={pathname === '/about'}
              onClick={() => setMegaOpen(false)}
            />

            {/* Services trigger (dropdown caret) */}
            <motion.button
              type="button"
              data-cursor="Services"
              aria-expanded={megaOpen}
              aria-haspopup="true"
              aria-label="Services — open mega menu"
              onClick={() => setMegaOpen((o) => !o)}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              whileHover={{ y: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={cn(
                'group relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-300',
                megaOpen ? 'text-white' : 'text-white/70 hover:text-white'
              )}
            >
              <span
                className={cn(
                  'transition-all duration-300',
                  megaOpen
                    ? 'drop-shadow-[0_0_8px_rgba(229,57,53,0.5)]'
                    : 'group-hover:drop-shadow-[0_0_8px_rgba(229,57,53,0.5)]'
                )}
              >
                Services
              </span>
              <motion.span
                animate={{ rotate: megaOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="inline-flex"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
              <span
                className={cn(
                  'absolute bottom-1 left-3 right-3 h-px origin-left bg-[#E53935] transition-transform duration-300',
                  megaOpen
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                )}
              />
            </motion.button>

            <NavLink
              href="/work"
              label="Work"
              cursorLabel="Work"
              active={pathname === '/work'}
              onClick={() => setMegaOpen(false)}
            />
            <NavLink
              href="/insights"
              label="Insights"
              cursorLabel="Insights"
              active={pathname === '/insights'}
              onClick={() => setMegaOpen(false)}
            />
            <NavLink
              href="/book-strategy-call"
              label="Contact"
              cursorLabel="Contact"
              active={pathname === '/book-strategy-call'}
              onClick={() => setMegaOpen(false)}
            />
          </nav>

          {/* RIGHT — Status badge (xl+) + CTA (md+) + Mobile trigger */}
          <div className="flex items-center gap-3">
            {/* Status badge — xl+ only */}
            <span className="hidden items-center gap-2 text-xs text-white/60 xl:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E53935] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E53935]" />
              </span>
              <span className="font-medium tracking-wide">Now accepting selected projects</span>
            </span>

            {/* CTA — md+ */}
            <MagneticButton
              variant="primary"
              cursorLabel="Book"
              ariaLabel="Book a Strategy Call"
              onClick={goToBookStrategyCall}
              className="hidden md:inline-flex px-5 py-2.5 text-sm"
            >
              <CalendarDays className="h-4 w-4" />
              Book Strategy Call
            </MagneticButton>

            {/* Mobile menu trigger — below md */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              data-cursor="Menu"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-[#E53935]/60 hover:bg-[#E53935]/10 md:hidden"
            >
              <MorphingIcon open={false} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ============================================================
          DESKTOP SERVICES MEGA MENU (fullscreen two-column editorial)
          z-40 — below the navbar (z-50)
          ============================================================ */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            key="mega-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            onMouseMove={openMega}
            onClick={(e) => {
              // Click on backdrop (not content) closes
              if (e.target === e.currentTarget) setMegaOpen(false)
            }}
            className="fixed inset-0 z-[45] bg-[#141414]/95 backdrop-blur-2xl"
            role="menu"
            aria-label="Services mega menu"
          >
            {/* Ambient backgrounds */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <AboutAmbient />
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-50">
              <EmberCanvas count={20} />
            </div>

            {/* Editorial content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.05,
              }}
              className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:pt-36"
            >
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                {/* LEFT — "What We Build" + service list */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mb-8 flex items-center gap-3"
                  >
                    <span className="h-px w-8 bg-[#E53935]" />
                    <span className="wn-eyebrow text-xs font-medium text-[#E53935]">
                      What We Build
                    </span>
                  </motion.div>

                  <div
                    className="space-y-1"
                    onMouseLeave={() => setActiveService(0)}
                  >
                    {services.map((s, i) => (
                      <motion.div
                        key={s.n}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.15 + i * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <ServiceRow
                          service={s}
                          active={activeService === i}
                          onHover={() => setActiveService(i)}
                          onSelect={() => setMegaOpen(false)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* RIGHT — visual preview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ServicePreview service={services[activeService]} />
                </motion.div>
              </div>

              {/* Footer hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-10 flex items-center justify-between border-t border-white/10 pt-6"
              >
                <span className="text-xs text-white/40">
                  Hover any service to preview — click to enter.
                </span>
                <span className="text-xs text-white/40">
                  Press{' '}
                  <kbd className="rounded border border-white/20 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/70">
                    Esc
                  </kbd>{' '}
                  to close
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          MOBILE FULLSCREEN OVERLAY
          z-[60] — covers the navbar
          ============================================================ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[60] bg-[#141414]"
            role="dialog"
            aria-label="Mobile navigation menu"
            aria-modal="true"
          >
            {/* Ambient backgrounds */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <AboutAmbient />
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-50">
              <EmberCanvas count={20} />
            </div>

            {/* Top bar — logo + close */}
            <div className="relative flex items-center justify-between px-5 py-5">
              <Link
                href="/"
                data-cursor="Home"
                onClick={closeMobile}
                aria-label="WatNidea home"
                className="flex items-center gap-2.5"
              >
                <Image
                  src="/watnidea-logo-navbar.png"
                  alt="WatNidea"
                  width={150}
                  height={26}
                  priority
                  className="h-8 w-auto"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(229,57,53,0.15))' }}
                />
              </Link>
              <button
                type="button"
                onClick={closeMobile}
                data-cursor="Close"
                aria-label="Close navigation menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-[#E53935]/60 hover:bg-[#E53935]/10"
              >
                <MorphingIcon open={true} />
              </button>
            </div>

            {/* Nav links (staggered from right) */}
            <nav
              className="relative flex h-[calc(100%-88px)] flex-col overflow-y-auto px-5 pb-8 pt-4"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-1">
                {[
                  { label: 'Home', href: '/', cursor: 'Home' },
                  { label: 'About', href: '/about', cursor: 'About' },
                ].map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      data-cursor={l.cursor}
                      onClick={closeMobile}
                      className="group block border-b border-white/10 py-4"
                    >
                      <span className="block text-3xl font-semibold text-white/80 transition-colors group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(229,57,53,0.4)]">
                        <span
                          style={{
                            fontFamily: 'var(--font-display), sans-serif',
                          }}
                        >
                          {l.label}
                        </span>
                      </span>
                      <span className="mt-1 block h-px w-0 origin-left bg-[#E53935] transition-all duration-300 group-hover:w-16" />
                    </Link>
                  </motion.div>
                ))}

                {/* Services expandable */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setServicesExpanded((s) => !s)}
                    aria-expanded={servicesExpanded}
                    aria-label="Toggle Services list"
                    className="group flex w-full items-center justify-between border-b border-white/10 py-4"
                  >
                    <span className="block text-3xl font-semibold text-white/80 transition-colors group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(229,57,53,0.4)]">
                      <span
                        style={{
                          fontFamily: 'var(--font-display), sans-serif',
                        }}
                      >
                        Services
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: servicesExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[#E53935]"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>

                  {/* Nested services */}
                  <AnimatePresence initial={false}>
                    {servicesExpanded && (
                      <motion.div
                        key="mobile-services"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-0 py-2 pl-4">
                          {services.map((s, i) => (
                            <motion.div
                              key={s.n}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.04 * i,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              <Link
                                href={s.href}
                                data-cursor="View"
                                onClick={closeMobile}
                                className="group flex items-center gap-3 border-b border-white/5 py-3"
                              >
                                <span
                                  className="font-[var(--font-display)] text-xs font-bold text-[#E53935]"
                                  style={{
                                    fontFamily:
                                      'var(--font-display), sans-serif',
                                  }}
                                >
                                  {s.n}
                                </span>
                                <span className="flex-1 text-xl font-medium text-white/70 transition-colors group-hover:text-white">
                                  <span
                                    style={{
                                      fontFamily:
                                        'var(--font-display), sans-serif',
                                    }}
                                  >
                                    {s.name}
                                  </span>
                                </span>
                                <ArrowUpRight className="h-4 w-4 text-[#E53935] opacity-0 transition-opacity group-hover:opacity-100" />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {[
                  { label: 'Work', href: '/work', cursor: 'Work' },
                  { label: 'Insights', href: '/insights', cursor: 'Insights' },
                  { label: 'Contact', href: '/book-strategy-call', cursor: 'Contact' },
                ].map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.28 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      data-cursor={l.cursor}
                      onClick={closeMobile}
                      className="group block border-b border-white/10 py-4"
                    >
                      <span className="block text-3xl font-semibold text-white/80 transition-colors group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(229,57,53,0.4)]">
                        <span
                          style={{
                            fontFamily: 'var(--font-display), sans-serif',
                          }}
                        >
                          {l.label}
                        </span>
                      </span>
                      <span className="mt-1 block h-px w-0 origin-left bg-[#E53935] transition-all duration-300 group-hover:w-16" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                className="mt-auto pt-8"
              >
                <MagneticButton
                  variant="primary"
                  cursorLabel="Book"
                  ariaLabel="Book a Strategy Call"
                  onClick={goToBookStrategyCall}
                  className="w-full justify-center px-5 py-3.5"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book Strategy Call
                </MagneticButton>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E53935] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E53935]" />
                  </span>
                  Now accepting selected projects
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
