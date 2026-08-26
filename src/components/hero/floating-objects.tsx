'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Floating chrome / energy objects scattered around the hero.
 * Each object has its own idle motion plus a subtle scroll parallax.
 */
export default function FloatingObjects() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yUp = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yDown = useTransform(scrollYProgress, [0, 1], [0, 140])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ opacity: fade }}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-30"
    >
      {/* Chrome ring — top right */}
      <motion.div
        className="absolute right-[8%] top-[14%] h-28 w-28 rounded-full border border-white/20 md:h-40 md:w-40"
        style={{ y: yUp }}
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.35), transparent 40%, transparent 60%, rgba(229,57,53,0.5), transparent)',
            mask: 'radial-gradient(circle, transparent 58%, black 60%)',
            WebkitMask: 'radial-gradient(circle, transparent 58%, black 60%)',
          }}
        />
      </motion.div>

      {/* Red orb — mid left */}
      <motion.div
        className="absolute left-[6%] top-[40%] h-3 w-3 rounded-full md:h-4 md:w-4"
        style={{ y: yDown }}
        animate={{
          y: [0, -24, 0],
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: '#E53935',
            boxShadow:
              '0 0 14px rgba(229,57,53,0.9), 0 0 40px rgba(229,57,53,0.5)',
          }}
        />
      </motion.div>

      {/* Chrome shard — bottom left */}
      <motion.div
        className="absolute bottom-[16%] left-[12%] h-16 w-16 md:h-24 md:w-24"
        style={{ y: yUp }}
        animate={{ rotate: [0, 20, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="h-full w-full rounded-[14px] border border-white/15"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 40%, rgba(229,57,53,0.18) 100%)',
            backdropFilter: 'blur(2px)',
          }}
        />
      </motion.div>

      {/* Wireframe ring — bottom right */}
      <motion.div
        className="absolute bottom-[20%] right-[14%] h-20 w-20 md:h-28 md:w-28"
        style={{ y: yDown }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="h-full w-full rounded-full border border-dashed border-[#E53935]/40"
          style={{}}
        />
        <div className="absolute inset-2 rounded-full border border-white/10" />
        <div className="absolute inset-5 rounded-full border border-white/5" />
      </motion.div>

      {/* Small chrome dot cluster — top left */}
      <motion.div
        className="absolute left-[20%] top-[20%] flex gap-2"
        style={{ y: yUp }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#E53935]" />
      </motion.div>

      {/* Vertical chrome line — right */}
      <motion.div
        className="absolute right-[4%] top-1/2 hidden h-40 w-px -translate-y-1/2 lg:block"
        style={{ y: yUp }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(229,57,53,0.7), transparent)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}
