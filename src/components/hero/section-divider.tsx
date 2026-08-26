'use client'

import { motion } from 'framer-motion'
import { BRAND_RED, type ServiceAccent } from '@/lib/service-colors'

/**
 * SectionDivider — a thin gradient seam that blends one service hue into the
 * next, reinforcing section identity as the user scrolls between sections.
 *
 * Kept deliberately subtle (1px, ≤0.7 opacity) so it reads as a cinematic
 * color transition rather than a rainbow. Never a bright background.
 *
 * Usage:
 *   <SectionDivider from={SERVICE_COLORS.aura} to={SERVICE_COLORS.digitalHq} />
 */
export function SectionDivider({
  from = BRAND_RED,
  to = BRAND_RED,
  delay = 0,
}: {
  from?: ServiceAccent
  to?: ServiceAccent
  delay?: number
}) {
  return (
    <div aria-hidden className="relative w-full">
      {/* soft ambient wash either side of the line for a cinematic bloom */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-12 h-24"
        style={{
          background: `radial-gradient(ellipse 50% 100% at 50% 100%, rgba(${from.rgb},0.05), transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{
          background: `radial-gradient(ellipse 50% 100% at 50% 0%, rgba(${to.rgb},0.05), transparent 70%)`,
        }}
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.7 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto h-px w-full origin-center"
        style={{
          background: `linear-gradient(90deg, rgba(${from.rgb},0.55) 0%, rgba(${to.rgb},0.55) 100%)`,
        }}
      />
    </div>
  )
}
