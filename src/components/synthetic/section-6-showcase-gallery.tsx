'use client'

/**
 * SynthShowcaseGallery — Section 6 of /synthetic-cinema
 *
 * IMMERSIVE MASONRY SHOWCASE GALLERY of AI-generated cinematic "worlds".
 * Netflix meets Apple Product Films — corner-bracket viewfinder frames,
 * hover-to-reveal "GENERATED" badges, scanning render lines, mixed
 * aspect ratios, purple + magenta hover glows.
 *
 * Composition:
 *   - Eyebrow: (06) · Showcase Gallery (PurpleEyebrow)
 *   - Headline: "Worlds We've" + "Generated." ("Generated." purple gradient)
 *   - Sub: descriptor about AI-generated cinematic output.
 *   - Masonry gallery of 6 cinematic "world" cards (CSS columns).
 *       Each card has: corner brackets (viewfinder), title, category
 *       tag, mixed aspect ratio (16:9, 4:5, 1:1), a unique CSS/SVG
 *       abstract AI-world visual (purple/magenta gradients + noise),
 *       a hover "GENERATED" badge reveal, a scanning render line
 *       that sweeps top-to-bottom, and a small "GEN v3 · 4K · 24fps"
 *       meta strip.
 *   - Hover: card zooms the frame, purple/magenta glow blooms.
 *   - Live "generation" marquee at bottom: scene chips drifting L→R.
 *   - PurpleStickyRail ("Showcase" / "Worlds").
 *
 * All hooks declared UNCONDITIONALLY at the TOP of every component
 * (Rules of Hooks).
 */

import { useRef, type CSSProperties } from 'react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Aperture,
  Camera,
  Clapperboard,
  Film,
  Sparkles,
  Wand2,
  type LucideIcon,
} from 'lucide-react'
import {
  PurpleEyebrow,
  PurpleGradientText,
  PurpleStickyRail,
  MaskLine,
} from '@/components/synthetic/shared'

/* ===================================================================
   World card content — 6 cinematic AI-generated worlds.
   =================================================================== */
type Aspect = '16/9' | '4/5' | '1/1'

type World = {
  n: string
  title: string
  category: string
  aspect: Aspect
  // accent variant for the inner glow
  accent: 'purple' | 'violet' | 'magenta'
  Visual: () => JSX.Element
}

const worlds: World[] = [
  {
    n: '01',
    title: 'Neo Tokyo Drop',
    category: 'Social',
    aspect: '4/5',
    accent: 'magenta',
    Visual: NeoTokyoVisual,
  },
  {
    n: '02',
    title: 'Aurora Product Film',
    category: 'Product',
    aspect: '16/9',
    accent: 'violet',
    Visual: AuroraProductVisual,
  },
  {
    n: '03',
    title: 'The Liquid Brand World',
    category: 'Brand Film',
    aspect: '1/1',
    accent: 'purple',
    Visual: LiquidBrandVisual,
  },
  {
    n: '04',
    title: 'Quantum Launch',
    category: 'Campaign',
    aspect: '4/5',
    accent: 'violet',
    Visual: QuantumLaunchVisual,
  },
  {
    n: '05',
    title: 'Synthetic Persona 01',
    category: 'Commercial',
    aspect: '16/9',
    accent: 'magenta',
    Visual: SyntheticPersonaVisual,
  },
  {
    n: '06',
    title: 'Holographic Retail',
    category: 'Commercial',
    aspect: '1/1',
    accent: 'purple',
    Visual: HolographicRetailVisual,
  },
]

const ACCENT_HEX: Record<World['accent'], string> = {
  purple: '#8B5CF6',
  violet: '#a78bfa',
  magenta: '#d946ef',
}

const ACCENT_RGB: Record<World['accent'], string> = {
  purple: '139,92,246',
  violet: '167,139,250',
  magenta: '217,70,239',
}

/* ===================================================================
   01 Neo Tokyo Drop — cyberpunk skyline silhouette + neon grid.
   =================================================================== */
function NeoTokyoVisual() {
  // pre-rounded building bars
  const buildings = [
    { x: 6, w: 9, h: 32 },
    { x: 16, w: 7, h: 46 },
    { x: 24, w: 10, h: 28 },
    { x: 36, w: 8, h: 54 },
    { x: 46, w: 6, h: 38 },
    { x: 54, w: 11, h: 62 },
    { x: 67, w: 7, h: 34 },
    { x: 76, w: 9, h: 48 },
    { x: 87, w: 8, h: 40 },
  ].map((b) => ({
    x: Math.round(b.x * 1000) / 1000,
    w: b.w,
    h: Math.round(b.h * 1000) / 1000,
  }))
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* sky base — deep magenta → purple → black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(217,70,239,0.32) 0%, rgba(139,92,246,0.22) 40%, rgba(20,20,20,0.95) 100%)',
        }}
      />
      {/* neon sun */}
      <motion.div
        className="absolute left-1/2 top-[34%] h-16 w-16 -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(217,70,239,0.9), rgba(139,92,246,0.4) 50%, rgba(139,92,246,0) 75%)',
          filter: 'blur(8px)',
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* skyline silhouette */}
      <svg
        viewBox="0 0 100 80"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {buildings.map((b, i) => {
          const y = 80 - b.h
          return (
            <rect
              key={i}
              x={b.x}
              y={y}
              width={b.w}
              height={b.h}
              fill="rgba(20,20,20,0.92)"
              stroke="rgba(217,70,239,0.6)"
              strokeWidth={0.2}
            />
          )
        })}
        {/* windows (random dots) */}
        {buildings.map((b, i) => {
          const y = 80 - b.h
          const dots: { dx: number; dy: number }[] = []
          for (let r = 0; r < Math.floor(b.h / 6); r++) {
            for (let c = 0; c < Math.floor(b.w / 3); c++) {
              if ((i * 7 + r * 5 + c * 3) % 4 === 0) {
                dots.push({
                  dx: b.x + 1.5 + c * 3,
                  dy: y + 3 + r * 6,
                })
              }
            }
          }
          return dots.map((d, j) => (
            <rect
              key={`w-${i}-${j}`}
              x={d.dx}
              y={d.dy}
              width={0.7}
              height={1.5}
              fill={j % 3 === 0 ? '#d946ef' : '#a78bfa'}
              opacity={0.8}
            />
          ))
        })}
      </svg>
      {/* ground neon grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-[28%]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(217,70,239,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,0.45) 1px, transparent 1px)',
          backgroundSize: '8px 8px',
          maskImage:
            'linear-gradient(to top, black, transparent 90%)',
          WebkitMaskImage:
            'linear-gradient(to top, black, transparent 90%)',
          transform: 'perspective(120px) rotateX(50deg)',
          transformOrigin: 'bottom',
        }}
      />
      {/* neon rain streaks */}
      {[18, 38, 62, 82].map((x, i) => (
        <motion.span
          key={i}
          className="absolute w-px"
          style={{
            left: `${x}%`,
            top: 0,
            height: '40%',
            background:
              'linear-gradient(to bottom, transparent, rgba(167,139,250,0.8), transparent)',
          }}
          animate={{ y: ['-10%', '120%'], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.6 + i * 0.2,
            repeat: Infinity,
            ease: 'easeIn',
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  )
}

/* ===================================================================
   02 Aurora Product Film — floating product halo + light sweep.
   =================================================================== */
function AuroraProductVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* deep base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.28), rgba(20,20,20,0.95) 75%)',
        }}
      />
      {/* aurora ribbons (SVG) */}
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="aurora-1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(167,139,250,0)" />
            <stop offset="50%" stopColor="rgba(167,139,250,0.7)" />
            <stop offset="100%" stopColor="rgba(217,70,239,0)" />
          </linearGradient>
          <linearGradient id="aurora-2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(217,70,239,0)" />
            <stop offset="50%" stopColor="rgba(217,70,239,0.55)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -5 22 Q 30 6, 55 18 T 110 22"
          fill="none"
          stroke="url(#aurora-1)"
          strokeWidth={0.8}
          strokeLinecap="round"
          animate={{ d: ['M -5 22 Q 30 6, 55 18 T 110 22', 'M -5 26 Q 30 10, 55 22 T 110 26', 'M -5 22 Q 30 6, 55 18 T 110 22'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M -5 36 Q 30 50, 55 40 T 110 36"
          fill="none"
          stroke="url(#aurora-2)"
          strokeWidth={0.7}
          strokeLinecap="round"
          animate={{ d: ['M -5 36 Q 30 50, 55 40 T 110 36', 'M -5 32 Q 30 46, 55 36 T 110 32', 'M -5 36 Q 30 50, 55 40 T 110 36'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </svg>
      {/* product halo — concentric rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(167,139,250,0.55), rgba(139,92,246,0.2) 50%, rgba(139,92,246,0) 75%)',
            filter: 'blur(6px)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a78bfa]/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d946ef]/45"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        {/* bright product point */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ filter: 'drop-shadow(0 0 8px rgba(167,139,250,0.95))' }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      {/* light sweep (subtle scanning highlight) */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)',
        }}
        animate={{ x: ['-30%', '120%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ===================================================================
   03 The Liquid Brand World — flowing metaball blobs.
   =================================================================== */
function LiquidBrandVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      {/* base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.35), rgba(20,20,20,0.95) 70%)',
        }}
      />
      {/* SVG goo filter for liquid blobs */}
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div
        className="absolute inset-0"
        style={{ filter: 'url(#liquid-goo)' }}
      >
        {/* 3 morphing blobs */}
        <motion.div
          className="absolute left-[24%] top-[28%] h-16 w-16 rounded-full"
          style={{ background: '#8B5CF6' }}
          animate={{
            x: [0, 18, -8, 0],
            y: [0, -10, 12, 0],
            scale: [1, 1.15, 0.92, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[22%] top-[36%] h-14 w-14 rounded-full"
          style={{ background: '#a78bfa' }}
          animate={{
            x: [0, -16, 10, 0],
            y: [0, 14, -8, 0],
            scale: [1, 0.9, 1.18, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
        <motion.div
          className="absolute left-[44%] bottom-[20%] h-12 w-12 rounded-full"
          style={{ background: '#d946ef' }}
          animate={{
            x: [0, 12, -14, 0],
            y: [0, -12, 6, 0],
            scale: [1, 1.1, 0.94, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
        />
      </div>
      {/* highlight ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a78bfa]/30"
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

/* ===================================================================
   04 Quantum Launch — radial quantum burst with concentric rings.
   =================================================================== */
function QuantumLaunchVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.4), rgba(20,20,20,0.95) 70%)',
        }}
      />
      {/* concentric expanding rings */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            borderColor: i % 2 === 0 ? 'rgba(167,139,250,0.5)' : 'rgba(217,70,239,0.4)',
            boxShadow: '0 0 12px rgba(139,92,246,0.4)',
          }}
          animate={{
            scale: [0.3, 1.6],
            opacity: [0.9, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.75,
          }}
          initial={{ width: 40, height: 40 }}
        />
      ))}
      {/* central quantum core */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.95), rgba(167,139,250,0.7) 40%, rgba(139,92,246,0) 75%)',
          filter: 'blur(4px)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* radial spokes */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.g
          style={{ transformOrigin: '50px 50px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
            const rad = (deg * Math.PI) / 180
            const x1 = 50 + Math.cos(rad) * 14
            const y1 = 50 + Math.sin(rad) * 14
            const x2 = 50 + Math.cos(rad) * 44
            const y2 = 50 + Math.sin(rad) * 44
            return (
              <line
                key={i}
                x1={Math.round(x1 * 1000) / 1000}
                y1={Math.round(y1 * 1000) / 1000}
                x2={Math.round(x2 * 1000) / 1000}
                y2={Math.round(y2 * 1000) / 1000}
                stroke={i % 2 === 0 ? 'rgba(167,139,250,0.4)' : 'rgba(217,70,239,0.3)'}
                strokeWidth={0.4}
                strokeLinecap="round"
              />
            )
          })}
        </motion.g>
      </svg>
      {/* corner particle sparks */}
      {[
        { x: 18, y: 22 },
        { x: 82, y: 28 },
        { x: 22, y: 80 },
        { x: 78, y: 76 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{ left: `${p.x}%`, top: `${p.y}%`, filter: 'drop-shadow(0 0 4px rgba(167,139,250,0.9))' }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
    </div>
  )
}

/* ===================================================================
   05 Synthetic Persona 01 — portrait silhouette + scan lines.
   =================================================================== */
function SyntheticPersonaVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(139,92,246,0.22), rgba(217,70,239,0.18) 50%, rgba(20,20,20,0.95) 100%)',
        }}
      />
      {/* persona silhouette (head + shoulders) */}
      <svg
        viewBox="0 0 100 70"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="persona-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(217,70,239,0.55)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.15)" />
          </linearGradient>
        </defs>
        {/* shoulders */}
        <path
          d="M 18 70 Q 18 50, 40 46 L 60 46 Q 82 50, 82 70 Z"
          fill="url(#persona-grad)"
        />
        {/* head */}
        <ellipse
          cx="50"
          cy="30"
          rx="14"
          ry="17"
          fill="url(#persona-grad)"
          stroke="rgba(167,139,250,0.5)"
          strokeWidth="0.3"
        />
        {/* face scan nodes */}
        {[
          { x: 44, y: 24 },
          { x: 56, y: 24 },
          { x: 50, y: 30 },
          { x: 44, y: 36 },
          { x: 56, y: 36 },
        ].map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={0.6}
            fill="#d946ef"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
          />
        ))}
      </svg>
      {/* horizontal scan lines */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(167,139,250,0.18) 0px, rgba(167,139,250,0.18) 1px, transparent 1px, transparent 4px)',
        }}
      />
      {/* moving scan bar — CSS @keyframes (not Framer Motion animate) to
          avoid WAAPI errors on `top` layout-property animation. One-way
          scan (start→end then jump back) matches original 2-value array. */}
      <div
        className="absolute inset-x-0 h-12"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(167,139,250,0.35), transparent)',
          top: '-10%',
          '--scan-start': '-10%',
          '--scan-end': '100%',
          animation: 'cinema-scanline-oneway 2.8s ease-in-out infinite',
        } as CSSProperties}
      />
      {/* corner scan brackets */}
      <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-[#d946ef]/70" />
      <div className="absolute right-3 top-3 h-4 w-4 border-r border-t border-[#d946ef]/70" />
      <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#d946ef]/70" />
      <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[#d946ef]/70" />
    </div>
  )
}

/* ===================================================================
   06 Holographic Retail — 3D wireframe cube + grid.
   =================================================================== */
function HolographicRetailVisual() {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.3), rgba(20,20,20,0.95) 70%)',
        }}
      />
      {/* floor grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-[50%]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(167,139,250,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.35) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
          transform: 'perspective(140px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />
      {/* central wireframe cube (SVG) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.g
          style={{ transformOrigin: '50px 50px' }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        >
          {/* front face */}
          <rect
            x="35"
            y="35"
            width="30"
            height="30"
            fill="rgba(139,92,246,0.18)"
            stroke="rgba(167,139,250,0.85)"
            strokeWidth="0.4"
          />
          {/* back face offset */}
          <rect
            x="42"
            y="28"
            width="30"
            height="30"
            fill="none"
            stroke="rgba(217,70,239,0.7)"
            strokeWidth="0.4"
          />
          {/* connecting edges */}
          <line x1="35" y1="35" x2="42" y2="28" stroke="rgba(167,139,250,0.6)" strokeWidth="0.3" />
          <line x1="65" y1="35" x2="72" y2="28" stroke="rgba(167,139,250,0.6)" strokeWidth="0.3" />
          <line x1="35" y1="65" x2="42" y2="58" stroke="rgba(217,70,239,0.6)" strokeWidth="0.3" />
          <line x1="65" y1="65" x2="72" y2="58" stroke="rgba(217,70,239,0.6)" strokeWidth="0.3" />
        </motion.g>
      </svg>
      {/* center beacon */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ filter: 'drop-shadow(0 0 8px rgba(167,139,250,0.95))' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* HUD ticks */}
      <span className="absolute left-3 top-3 wn-eyebrow text-[8px] font-medium text-[#a78bfa]/70">
        RENDER · v3.2
      </span>
      <span className="absolute right-3 top-3 wn-eyebrow text-[8px] font-medium text-[#d946ef]/70">
        4K · 24FPS
      </span>
    </div>
  )
}

/* ===================================================================
   WorldCard — single cinematic frame card.
   Corner brackets + hover-zoom + GENERATED badge + scan render line.
   =================================================================== */
function WorldCard({ w, index }: { w: World; index: number }) {
  const { n, title, category, aspect, accent, Visual } = w
  // aspect-ratio CSS value
  const aspectClass =
    aspect === '16/9'
      ? 'aspect-[16/9]'
      : aspect === '4/5'
        ? 'aspect-[4/5]'
        : 'aspect-square'

  return (
    <motion.article
      data-cursor="View"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl transition-colors duration-500 hover:border-[#8B5CF6]/55"
    >
      {/* purple/magenta glow bloom on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 50px rgba(${ACCENT_RGB[accent]},0.32)` }}
      />

      {/* === Visual layer === */}
      <div className={`relative ${aspectClass} w-full overflow-hidden`}>
        <div className="absolute inset-0 bg-[#1A1A1A]/80" />
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Visual />
        </motion.div>

        {/* corner brackets (viewfinder) */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-white/40 transition-colors duration-500 group-hover:border-[#a78bfa]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-white/40 transition-colors duration-500 group-hover:border-[#a78bfa]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-white/40 transition-colors duration-500 group-hover:border-[#a78bfa]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-white/40 transition-colors duration-500 group-hover:border-[#a78bfa]"
        />

        {/* scanning render line — sweeps on hover. CSS @keyframes (not
            Framer Motion animate) to avoid WAAPI errors on `top`
            layout-property animation. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-16 opacity-0 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(180deg, transparent, rgba(167,139,250,0.4) 50%, transparent)',
            top: '-10%',
            '--scan-start': '-10%',
            '--scan-end': '110%',
            animation: 'cinema-scanline-oneway 1.4s linear infinite',
          } as CSSProperties}
        />

        {/* scan-line cinematic overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
          }}
        />

        {/* REC dot (top-left, subtle red per spec) */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 pl-7">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#E53935]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 6px rgba(229,57,53,0.85)' }}
          />
          <span className="wn-eyebrow text-[9px] font-medium text-white/55">
            REC
          </span>
        </div>

        {/* category chip (top-right) */}
        <div className="absolute right-3 top-3 mr-7 rounded-full border border-white/15 bg-[#1A1A1A]/80 px-2.5 py-1 backdrop-blur-md">
          <span className="wn-eyebrow text-[9px] font-medium text-white/85">
            {category}
          </span>
        </div>

        {/* corner number */}
        <span
          className="absolute bottom-3 left-3 pl-7 text-xs font-bold text-white/30"
          style={{ fontFamily: 'var(--font-display), sans-serif' }}
        >
          ({n})
        </span>

        {/* GENERATED badge — revealed on hover (group-hover) */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 mr-7 flex items-center gap-1.5 rounded-full border border-[#d946ef]/60 bg-[#d946ef]/15 px-2.5 py-1 backdrop-blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#d946ef]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 6px rgba(217,70,239,0.95)' }}
          />
          <span className="wn-eyebrow text-[9px] font-semibold text-[#d946ef]">
            GENERATED
          </span>
        </div>

        {/* bottom fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent"
        />
      </div>

      {/* === Content layer === */}
      <div className="relative flex flex-col gap-2 p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className="text-lg font-semibold text-white sm:text-xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            {title}
          </h3>
          <span
            className="wn-eyebrow text-[10px] font-medium"
            style={{ color: ACCENT_HEX[accent] }}
          >
            GEN v3
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-white/8 pt-3">
          <span className="wn-eyebrow text-[9px] font-medium text-white/45">
            4K · 24FPS · 16-bit
          </span>
          <span
            className="wn-eyebrow text-[9px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: ACCENT_HEX[accent] }}
          >
            {category}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ===================================================================
   Generation marquee — scene chips drifting L→R.
   =================================================================== */
type SceneChip = {
  Icon: LucideIcon
  text: string
  accent: World['accent']
}

const sceneChips: SceneChip[] = [
  { Icon: Film, text: 'Scene 01 rendered · 4K · 24fps', accent: 'purple' },
  { Icon: Sparkles, text: 'GEN v3 · batch 0148', accent: 'magenta' },
  { Icon: Camera, text: 'Neo Tokyo Drop · lighting pass', accent: 'violet' },
  { Icon: Clapperboard, text: 'Aurora Product Film · final cut', accent: 'purple' },
  { Icon: Wand2, text: 'Prompt → 12 variations', accent: 'magenta' },
  { Icon: Aperture, text: 'Quantum Launch · hero render', accent: 'violet' },
  { Icon: Film, text: 'Dream Sequence · 8K master', accent: 'purple' },
  { Icon: Sparkles, text: 'Persona 01 · talent swap', accent: 'magenta' },
  { Icon: Camera, text: 'Holographic Retail · AR pass', accent: 'violet' },
  { Icon: Clapperboard, text: 'Future Heritage · grade v2', accent: 'purple' },
]

function GenMarqueeRow() {
  return (
    <div className="flex w-max items-center gap-3">
      {sceneChips.map((c, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 backdrop-blur-md"
        >
          <c.Icon
            className="h-3.5 w-3.5"
            style={{ color: ACCENT_HEX[c.accent] }}
          />
          <span className="text-[11px] font-medium text-white/85">
            {c.text}
          </span>
          <span
            className="h-1 w-1 rounded-full"
            style={{ background: ACCENT_HEX[c.accent] }}
          />
        </div>
      ))}
    </div>
  )
}

function GenMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] py-4 backdrop-blur-md"
    >
      {/* left/right edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#141414] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#141414] to-transparent"
      />
      {/* LIVE indicator */}
      <div className="absolute left-5 top-1/2 z-20 flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-[#8B5CF6]/40 bg-[#141414]/85 px-2.5 py-1 backdrop-blur-md">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 6px rgba(139,92,246,0.95)' }}
        />
        <span className="wn-eyebrow text-[9px] font-semibold text-[#8B5CF6]">
          GENERATING
        </span>
      </div>
      {/* marquee track — duplicated for seamless loop */}
      <div className="wn-marquee-track pl-32">
        <GenMarqueeRow />
        <GenMarqueeRow />
      </div>
    </motion.div>
  )
}

/* ===================================================================
   SynthShowcaseGallery — Section 6 named export.
   =================================================================== */
export function SynthShowcaseGallery() {
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
        <PurpleStickyRail
          label="Showcase"
          caption="Worlds"
          sectionRef={sectionRef}
        />

        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 lg:py-32">
          {/* Local ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute left-1/3 top-1/4 h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(139,92,246,0.16), rgba(139,92,246,0) 65%)',
                filter: 'blur(40px)',
              }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="absolute right-[8%] bottom-[12%] h-[28vw] w-[28vw] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(217,70,239,0.14), rgba(217,70,239,0) 70%)',
                filter: 'blur(44px)',
              }}
              animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.15, 1] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.2,
              }}
            />
          </div>

          {/* Header block */}
          <motion.div
            style={{ y: headerY }}
            className="relative z-10 mb-14 max-w-3xl"
          >
            <PurpleEyebrow number="06" label="Showcase Gallery" />

            <h2
              className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.02em] sm:text-6xl md:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Worlds We&apos;ve </MaskLine>
              <MaskLine delay={0.12}>
                <PurpleGradientText>Generated.</PurpleGradientText>
              </MaskLine>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
            >
              Commercials, brand films, product worlds, and campaign
              visuals — every frame is{' '}
              <PurpleGradientText glow={false}>
                AI-generated
              </PurpleGradientText>{' '}
              and engineered for cinematic scale.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-4 text-[11px] uppercase tracking-[0.3em] text-white/30"
            >
              Stylized worlds · representative AI outputs
            </motion.p>
          </motion.div>

          {/* Masonry gallery — CSS columns for true masonry */}
          <div className="relative z-10 columns-1 gap-6 md:columns-2 lg:gap-7">
            {worlds.map((w, i) => (
              <WorldCard key={w.n} w={w} index={i} />
            ))}
          </div>

          {/* Generation marquee */}
          <div className="relative z-10">
            <GenMarquee />
          </div>
        </div>
      </div>
    </div>
  )
}
