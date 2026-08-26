'use client'

import { motion, type Variants } from 'framer-motion'

type Word = { text: string; accent?: boolean }

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const word: Variants = {
  hidden: { y: '110%', rotate: 6, opacity: 0 },
  show: {
    y: '0%',
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 140, damping: 18 },
  },
}

/**
 * Dynamic, masked word-by-word headline reveal.
 * Accepts an array of lines; each line is an array of words.
 * Accent words render in red.
 */
export default function AnimatedHeadline({
  lines,
}: {
  lines: Word[][]
}) {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="font-[var(--font-display)] text-[13vw] font-bold leading-[0.92] tracking-[-0.03em] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.2vw] xl:text-[6.6rem]"
      style={{ fontFamily: 'var(--font-display), sans-serif' }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.06em]">
          <span className="flex flex-wrap items-baseline gap-x-[0.25em]">
            {line.map((w, wi) => (
              <span key={wi} className="inline-block overflow-hidden">
                <motion.span
                  variants={word}
                  className={
                    'inline-block ' +
                    (w.accent
                      ? 'bg-gradient-to-br from-[#ff6b63] via-[#E53935] to-[#a8201d] bg-clip-text text-transparent'
                      : 'text-white')
                  }
                  style={
                    w.accent
                      ? {
                          filter:
                            'drop-shadow(0 0 22px rgba(229,57,53,0.55))',
                        }
                      : undefined
                  }
                >
                  {w.text}
                </motion.span>
              </span>
            ))}
          </span>
        </span>
      ))}
    </motion.h1>
  )
}
