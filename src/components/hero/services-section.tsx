'use client'

import { useRef, type ReactElement, type ReactNode, type CSSProperties } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/* ===================================================================
   EXACT CONTENT — service names & descriptions kept verbatim.
   Each service ships with its own visual universe.
   =================================================================== */

type Visual = () => ReactElement

type Service = {
  n: string
  name: string
  cat: string
  desc: string
  Visual: Visual
}

const services: Service[] = [
  {
    n: '01',
    name: 'Aura Architecture',
    cat: 'Branding',
    desc: 'We define your brand soul, positioning, and visual DNA to create a powerful identity that stands out with purpose and clarity.',
    Visual: AuraVisual,
  },
  {
    n: '02',
    name: 'The Digital HQ',
    cat: 'Web Development',
    desc: 'High-speed, conversion-focused websites that act as your 24/7 sales engine and digital headquarters.',
    Visual: DigitalHQVisual,
  },
  {
    n: '03',
    name: 'The Hype Engine',
    cat: 'SMM',
    desc: 'We engineer conversations, trends, and communities that turn your audience into a loyal brand tribe.',
    Visual: HypeEngineVisual,
  },
  {
    n: '04',
    name: 'Kinetic Studio',
    cat: 'Video',
    desc: 'Cinematic brand films, reels, and visual storytelling designed to capture instant attention and engagement.',
    Visual: KineticVisual,
  },
  {
    n: '05',
    name: 'Growth Alchemy',
    cat: 'Performance',
    desc: 'Paid ads and funnel systems engineered to turn every rupee into predictable, scalable revenue.',
    Visual: GrowthVisual,
  },
  {
    n: '06',
    name: 'Synthetic Cinema',
    cat: 'AI Ads',
    desc: 'AI-powered cinematic ads that scale your brand storytelling at the speed of imagination.',
    Visual: SyntheticVisual,
  },
  {
    n: '07',
    name: 'The Echo System',
    cat: 'Omnichannel',
    desc: 'SEO, AEO, and content systems that make your brand visible everywhere your audience exists.',
    Visual: EchoVisual,
  },
]

/* ===================================================================
   Shared helpers
   =================================================================== */

/** Deadlock-safe masked line reveal (observes the wrapper, not the clipped child). */
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
            transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

/** Ambient red lighting shared across the whole section. */
function ServicesAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute left-[10%] top-[14%] h-[55vw] w-[55vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229,57,53,0.16), rgba(229,57,53,0) 65%)',
          filter: 'blur(30px)',
        }}
        animate={{ opacity: [0.45, 0.8, 0.45], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-8%] right-[6%] h-[40vw] w-[40vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.05), rgba(255,255,255,0) 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ===================================================================
   VISUAL UNIVERSES — one per service
   =================================================================== */

/* 01 — Aura Architecture: identity particles & morphing symbols */
function AuraVisual() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.14), transparent 65%)',
        }}
      />
      {/* morphing identity mark */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2"
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
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ border: '1px dashed rgba(255,255,255,0.18)' }}
      />
      {/* orbiting identity particles */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const r = 64 + i * 14
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r }}
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
      {/* red identity core */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          boxShadow:
            '0 0 18px rgba(229,57,53,0.95), 0 0 40px rgba(229,57,53,0.5)',
        }}
      />
    </div>
  )
}

/* 02 — The Digital HQ: futuristic browser architecture */
function DigitalHQVisual() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(229,57,53,0.10), transparent 60%)',
        }}
      />
      {/* perspective grid floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          transform: 'perspective(300px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />
      {/* floating back panels */}
      <motion.div
        className="absolute left-[12%] top-[16%] h-28 w-40 rounded-lg border border-white/10 bg-white/[0.05]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: 'rotateY(18deg) rotateX(6deg)' }}
      />
      <motion.div
        className="absolute right-[14%] top-[24%] h-24 w-36 rounded-lg border border-[#E53935]/20 bg-[#E53935]/[0.04]"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      {/* main browser */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[72%] max-w-[340px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/15 bg-[#0c0c0c]"
        style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#E53935]/70" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <div className="ml-3 flex-1 rounded-md bg-white/[0.08] px-2 py-1 text-[9px] text-white/40">
            watnidea.studio
          </div>
        </div>
        <div className="space-y-2 p-3">
          <motion.div
            className="h-2 w-1/3 rounded bg-[#E53935]/50"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-5/6 rounded bg-white/10" />
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-10 rounded bg-white/[0.07]"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
      {/* blinking cursor */}
      <motion.span
        className="absolute left-[34%] top-[58%] h-3 w-0.5 bg-[#E53935]"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  )
}

/* 03 — The Hype Engine: social energy streams & community networks */
function HypeEngineVisual() {
  const nodes = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 - Math.PI / 2
    return { x: 50 + Math.cos(a) * 36, y: 50 + Math.sin(a) * 36 }
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
      {/* radiating energy rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E53935]/25"
          animate={{ scale: [0.4, 1.7], opacity: [0.6, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: 'easeOut' }}
          style={{ width: 120, height: 120 }}
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
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        {nodes.map((nd, i) => {
          const n2 = nodes[(i + 1) % nodes.length]
          return (
            <line
              key={'p' + i}
              x1={nd.x}
              y1={nd.y}
              x2={n2.x}
              y2={n2.y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={0.2}
            />
          )
        })}
      </svg>
      {/* center hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ boxShadow: '0 0 20px rgba(229,57,53,0.9)' }}
      />
      {/* community nodes */}
      {nodes.map((nd, i) => (
        <motion.div
          key={i}
          className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70"
          style={{
            left: `${nd.x}%`,
            top: `${nd.y}%`,
            boxShadow: '0 0 8px rgba(255,255,255,0.6)',
          }}
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </div>
  )
}

/* 04 — Kinetic Studio: cinematic frames & motion trails */
function KineticVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#141414]">
      {/* letterbox bars */}
      <div className="absolute inset-x-0 top-0 z-10 h-6 bg-[#141414]" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-6 bg-[#141414]" />
      {/* motion trails */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(229,57,53,0.9), transparent)',
            top: `${28 + i * 12}%`,
            width: 140,
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
      {/* film strip (seamless loop, identical frames) */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-1.5"
        animate={{ x: [0, -54] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-16 w-12 shrink-0 overflow-hidden rounded-sm border border-white/15 bg-gradient-to-br from-white/[0.08] to-[#E53935]/[0.08]"
          >
            <div className="h-2 w-full bg-[#262626]/85" />
          </div>
        ))}
      </motion.div>
      {/* play */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm">
          <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-white" />
        </div>
      </motion.div>
      <span className="absolute right-4 top-8 z-10 font-mono text-[10px] text-[#E53935]">
        REC ● 00:24
      </span>
      <span className="absolute left-4 bottom-8 z-10 font-mono text-[10px] text-white/40">
        f/2.8 — 24fps
      </span>
    </div>
  )
}

/* 05 — Growth Alchemy: growth graphs transforming into light structures */
function GrowthVisual() {
  const bars = [40, 58, 72, 88, 100]
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(229,57,53,0.10), transparent 60%)',
        }}
      />
      {/* baseline grid */}
      <div
        className="absolute inset-x-6 bottom-16 top-10 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '100% 20%',
        }}
      />
      {/* growth line */}
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
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
      </svg>
      {/* bars → light beams */}
      <div className="absolute inset-x-8 bottom-16 top-12 flex items-end justify-between gap-3">
        {bars.map((h, i) => (
          <div key={i} className="relative flex-1" style={{ height: `${h}%` }}>
            <motion.div
              className="absolute bottom-0 w-full origin-bottom rounded-t-sm"
              style={{
                background:
                  'linear-gradient(to top, rgba(229,57,53,0.5), rgba(255,255,255,0.12))',
                height: '100%',
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute -top-6 left-1/2 h-12 w-1 -translate-x-1/2 rounded-full"
              style={{
                background: 'linear-gradient(to top, rgba(229,57,53,0.9), transparent)',
              }}
              animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          </div>
        ))}
      </div>
      {/* ascending particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#E53935]"
          style={{ left: `${20 + i * 15}%`, bottom: 0 }}
          animate={{ y: [0, -220], opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
      <span className="absolute right-6 top-8 font-mono text-xs text-[#E53935]">
        ▲ Growth
      </span>
    </div>
  )
}

/* 06 — Synthetic Cinema: AI-generated futuristic visual worlds */
function SyntheticVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#141414]">
      {/* generative gradient blobs */}
      <motion.div
        className="absolute left-1/4 top-1/3 h-40 w-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(229,57,53,0.35), transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/4 h-32 w-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)',
          filter: 'blur(16px)',
        }}
        animate={{ x: [0, -30, 0], y: [0, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* neural grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* scanning line — CSS @keyframes (not Framer Motion animate) to
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
      {/* generating frames */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 space-y-1.5">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-2 rounded-sm bg-white/15"
            style={{ width: 60 + i * 8, transformOrigin: 'left center' }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              scaleX: [1, 1.5, 1],
            }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      {/* wireframe terrain */}
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
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </svg>
      <span className="absolute right-5 top-6 font-mono text-[10px] text-[#E53935]">
        AI · GENERATING
      </span>
    </div>
  )
}

/* 07 — The Echo System: connected omnichannel ecosystems */
function EchoVisual() {
  const channels = ['SEO', 'SOC', 'VID', 'EML', 'AEO', 'PR']
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.10), transparent 60%)',
        }}
      />
      {/* orbit rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{ width: 80 + i * 70, height: 60 + i * 52 }}
        />
      ))}
      {/* rotating satellites */}
      {[0, 1, 2].map((orbitIdx) => {
        const w = 80 + orbitIdx * 70
        const h = 60 + orbitIdx * 52
        const count = orbitIdx === 0 ? 3 : orbitIdx === 1 ? 2 : 1
        return Array.from({ length: count }).map((_, k) => {
          const idx = orbitIdx * 3 + k
          const dur = 14 + orbitIdx * 6
          return (
            <motion.div
              key={idx}
              className="absolute left-1/2 top-1/2"
              style={{ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2 }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E53935]/40 bg-[#0c0c0c] text-[8px] font-bold text-[#ff6b63]"
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
                >
                  {channels[idx % channels.length]}
                </motion.div>
              </div>
            </motion.div>
          )
        })
      })}
      {/* central hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E53935]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ boxShadow: '0 0 24px rgba(229,57,53,0.9)' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E53935]/50"
        animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
      />
    </div>
  )
}

/* ===================================================================
   Service row — editorial, alternating, hover expansion
   =================================================================== */

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const visualY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const numX = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const flip = index % 2 === 1
  const V = service.Visual

  return (
    <motion.article
      ref={ref}
      data-cursor="Experience"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-500 hover:border-[#E53935]/40 hover:bg-white/[0.035] sm:p-8 lg:p-10"
    >
      {/* giant ghost number */}
      <motion.span
        aria-hidden
        style={{ x: numX, fontFamily: 'var(--font-display), sans-serif' }}
        className="pointer-events-none absolute -right-4 -top-14 select-none text-[26vw] font-black leading-none text-white/[0.03] sm:text-[18vw] lg:text-[12vw]"
      >
        {service.n}
      </motion.span>

      {/* hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(100% 60% at 50% 0%, rgba(229,57,53,0.10), transparent 70%)',
        }}
      />

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* content */}
        <div className={flip ? 'lg:order-2' : 'lg:order-1'}>
          <div className="mb-5 flex items-center gap-3">
            <span
              className="text-sm font-bold text-[#E53935]"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              {service.n}
            </span>
            <span className="h-px w-8 bg-[#E53935]/50 transition-all duration-500 group-hover:w-14" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
              {service.cat}
            </span>
          </div>
          <h3
            className="text-[8vw] font-bold leading-[1.02] tracking-[-0.02em] sm:text-4xl lg:text-5xl xl:text-6xl"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            <MaskLine>{service.name}</MaskLine>
          </h3>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 max-w-md text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {service.desc}
          </motion.p>
          <div className="mt-7 flex items-center gap-1.5 text-xs font-medium text-[#E53935] opacity-0 transition-all duration-500 group-hover:opacity-100">
            <span>Enter experience</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
        </div>

        {/* visual universe */}
        <motion.div
          style={{ y: visualY }}
          className={
            'relative h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#080808] transition-all duration-500 group-hover:scale-[1.02] group-hover:border-[#E53935]/30 sm:h-[380px] lg:h-[440px] ' +
            (flip ? 'lg:order-1' : 'lg:order-2')
          }
        >
          <V />
          <span className="absolute left-4 top-4 z-20 text-[10px] uppercase tracking-[0.25em] text-white/35">
            {service.cat} — Engine
          </span>
          <span className="absolute right-4 top-4 z-20 font-mono text-[10px] text-[#E53935]/70">
            {service.n}/07
          </span>
        </motion.div>
      </div>
    </motion.article>
  )
}

/* ===================================================================
   Section shell — sticky rail + scroll progress + header + rows
   =================================================================== */

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      ref={containerRef}
      id="services"
      className="relative border-t border-white/5 bg-[#141414]"
    >
      <ServicesAmbient />

      <div className="lg:flex">
        {/* sticky capabilities rail (desktop) */}
        <aside className="hidden lg:block lg:w-24 lg:shrink-0">
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <span
                className="wn-eyebrow text-[11px] font-medium text-white/45 [writing-mode:vertical-rl]"
                style={{ rotate: '180deg' }}
              >
                Capabilities
              </span>
              <div className="relative h-56 w-px overflow-hidden rounded-full bg-white/10">
                <motion.div
                  style={{ scaleY: railScale }}
                  className="absolute inset-0 origin-top bg-[#E53935]"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                07 services
              </span>
            </div>
          </div>
        </aside>

        {/* content */}
        <div className="relative min-w-0 flex-1 px-5 py-24 sm:px-8 sm:py-28 lg:py-32">
          {/* header */}
          <header className="mx-auto mb-16 max-w-7xl lg:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="text-xs font-medium text-[#E53935]">(04)</span>
              <span className="h-px w-8 bg-[#E53935]/60" />
              <span className="wn-eyebrow text-[11px] font-medium text-white/55 sm:text-xs">
                Capabilities
              </span>
            </motion.div>
            <h2
              className="max-w-4xl text-[9vw] font-bold leading-[1.0] tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-7xl"
              style={{ fontFamily: 'var(--font-display), sans-serif' }}
            >
              <MaskLine>Seven services.</MaskLine>
              <MaskLine delay={0.1}>
                Seven{' '}
                <span className="bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent">
                  universes.
                </span>
              </MaskLine>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
            >
              Each one engineered as a product experience — not a line item.
              Hover to enter the universe.
            </motion.p>
          </header>

          {/* rows */}
          <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
            {services.map((s, i) => (
              <ServiceRow key={s.n} service={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
