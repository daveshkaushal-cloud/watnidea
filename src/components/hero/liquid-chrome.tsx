'use client'

import { motion } from 'framer-motion'

/**
 * Liquid chrome background.
 * Layered, morphing blobs (chrome + red) with heavy blur and screen blending
 * create the "liquid metal / energy core" atmosphere behind the hero.
 */
export default function LiquidChrome() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Deep base wash — layered neutral, not pure black */}
      <div className="absolute inset-0 bg-[#141414]" />

      {/* Radial red energy core (top center) — softened to ambient lighting */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[-12%] h-[55vw] w-[55vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(229,57,53,0.32) 0%, rgba(229,57,53,0.1) 35%, rgba(229,57,53,0) 70%)',
          filter: 'blur(50px)',
          mixBlendMode: 'screen',
        }}
        animate={{
          scale: [1, 1.1, 0.97, 1],
          opacity: [0.55, 0.7, 0.5, 0.55],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Chrome blob — left */}
      <motion.div
        aria-hidden
        className="absolute left-[-10%] top-[20%] h-[42vw] w-[42vw] rounded-full"
        style={{
          background:
            'conic-gradient(from 120deg, rgba(255,255,255,0.22), rgba(120,120,120,0.05), rgba(255,255,255,0.18), rgba(60,60,60,0.04), rgba(255,255,255,0.22))',
          filter: 'blur(60px)',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: [0, 60, -20, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.15, 0.95, 1],
          rotate: [0, 40, -10, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Chrome blob — right (red-tinted) */}
      <motion.div
        aria-hidden
        className="absolute right-[-12%] top-[30%] h-[40vw] w-[40vw] rounded-full"
        style={{
          background:
            'conic-gradient(from 300deg, rgba(229,57,53,0.4), rgba(255,255,255,0.12), rgba(229,57,53,0.28), rgba(80,80,80,0.05), rgba(229,57,53,0.4))',
          filter: 'blur(55px)',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.98, 1],
          rotate: [0, -50, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Lower chrome sheen */}
      <motion.div
        aria-hidden
        className="absolute bottom-[-20%] left-1/2 h-[40vw] w-[70vw] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0) 70%)',
          filter: 'blur(50px)',
          mixBlendMode: 'screen',
        }}
        animate={{
          opacity: [0.5, 0.85, 0.6, 0.5],
          scaleX: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Thin moving scanline sheen */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.05) 45%, rgba(229,57,53,0.06) 50%, rgba(255,255,255,0.05) 55%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        animate={{ backgroundPositionX: ['0%', '200%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

      {/* Subtle grid mesh */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Bottom fade to layered neutral for content legibility / footer */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            'linear-gradient(to bottom, rgba(20,20,20,0) 0%, rgba(20,20,20,0.65) 60%, #141414 100%)',
        }}
      />
    </div>
  )
}
