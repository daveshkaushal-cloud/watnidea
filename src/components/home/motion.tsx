'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/* ------------------------------------------------------------------ *
 * Motion helpers — all gated on `prefers-reduced-motion`.
 *
 * Homepage motion policy (Task 10):
 *   - Subtle fade-up only. No 0→number count-ups.
 *   - Hero entrance: 0.5s with delays in 0.05–0.4s only.
 *   - Section reveals: 0.6s, once, on viewport enter.
 *   - When reduced-motion is requested: instant, no transform.
 * ------------------------------------------------------------------ */

export function usePrefersReducedMotion() {
  return useReducedMotion() ?? false
}

/** Fade-up entrance variants. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

type RevealProps = {
  children: ReactNode
  /** delay in seconds */
  delay?: number
  /** duration in seconds — defaults to 0.6 */
  duration?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'p' | 'span'
  /** Render once when scrolled into view (default true). */
  once?: boolean
  /** viewport root margin for triggering */
  margin?: string
}

/**
 * Single fade-up reveal. Honors `prefers-reduced-motion` by
 * replacing y-transform with a pure opacity fade.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  className,
  as = 'div',
  once = true,
  margin = '-80px 0px',
}: RevealProps) {
  const reduce = usePrefersReducedMotion()
  const MotionTag = motion[as]
  const variants = reduce ? reducedFade : fadeUp
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      transition={{
        duration: reduce ? 0.001 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Hero entrance — uses `animate` (immediate, not viewport-gated)
 * so it plays on load. Short and snappy (max 0.5s, delays 0.05–0.4s).
 */
export function HeroReveal({
  children,
  delay = 0.05,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'p' | 'span' | 'h1'
}) {
  const reduce = usePrefersReducedMotion()
  const MotionTag = motion[as]
  const variants = reduce ? reducedFade : fadeUp
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: reduce ? 0.001 : 0.5,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
