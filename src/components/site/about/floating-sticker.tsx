'use client'

/**
 * FloatingSticker — wraps the shared `Sticker` primitive with a gentle
 * vertical bob (framer-motion). Respects `prefers-reduced-motion`.
 *
 * Used in the About hero to give the floating decorations the same
 * "alive" feel as the home hero's `FloatingTag`, while still using the
 * shared sticker visual language (tape-style label, hover tilt).
 */

import { motion } from 'framer-motion'
import { useReducedMotionSSR } from '@/components/site/use-reduced-motion-ssr'
import { Sticker } from '@/components/site/primitives'

export function FloatingSticker({
  children,
  className,
  accent,
  textColor = '#FFFFFF',
  tilt = 'none',
  duration = 5,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  accent: string
  textColor?: string
  tilt?: 'none' | 'left' | 'right'
  duration?: number
  delay?: number
}) {
  const reduce = useReducedMotionSSR()
  if (reduce) {
    return (
      <Sticker accent={accent} textColor={textColor} tilt={tilt} className={className}>
        {children}
      </Sticker>
    )
  }
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <Sticker accent={accent} textColor={textColor} tilt={tilt}>
        {children}
      </Sticker>
    </motion.div>
  )
}
