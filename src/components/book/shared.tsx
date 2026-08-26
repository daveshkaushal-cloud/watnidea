'use client'

/**
 * Book Strategy Call page — shared helpers (MULTI-COLOR accent system).
 *
 * The /book-strategy-call page is the second MULTI-COLOR page in the
 * WatNidea site (after /work). It does NOT have a single service accent.
 * Instead, it surfaces subtle appearances of ALL 6 service colors,
 * connected through the WatNidea identity system (brand red #E53935):
 *
 *   - Aura Architecture  → GOLD     #F59E0B
 *   - The Digital HQ     → BLUE     #3B82F6
 *   - The Hype Engine    → RED      #E53935  (brand)
 *   - Growth Alchemy     → GREEN    #10B981
 *   - Synthetic Cinema   → PURPLE   #8B5CF6
 *   - The Echo System    → CYAN     #06B6D4
 *
 * To avoid duplication, this module RE-EXPORTS the color-agnostic
 * multi-color helpers already implemented in `@/components/work/shared`:
 *   - WORK_COLORS registry (+ WORK_COLOR_LIST)
 *   - ServiceGradientText, ServiceEyebrow, ServiceAmbient, ServiceColorDot
 *   - MultiColorEmberCanvas (6-color rising embers)
 *   - ConvergenceSphere (6-color convergence centerpiece for hero + final CTA)
 *
 * It then aliases 3 booking-specific helpers that use BRAND RED as the
 * unifying umbrella color (same rationale as the Work page — booking is
 * the umbrella conversion surface, not a single service):
 *   - BookingEyebrow       → brand-red eyebrow (alias of WorkEyebrow)
 *   - BookingStickyRail    → brand-red sticky rail (alias of WorkStickyRail)
 *   - BookingMagneticButton→ brand-red magnetic CTA button (alias of WorkMagneticButton)
 *
 * Color-agnostic helpers (MaskLine, useCursorParallax, MotionValue) are
 * re-exported for convenience so sections can import everything from a
 * single module.
 *
 * All hooks declared unconditionally at the top of each component
 * (Rules of Hooks). Canvas helpers use the __cleanup HMR-safe pattern.
 */

export {
  WORK_COLORS,
  WORK_COLOR_LIST,
  ServiceGradientText,
  ServiceEyebrow,
  ServiceAmbient,
  ServiceColorDot,
  MultiColorEmberCanvas,
  ConvergenceSphere,
  WorkMagneticButton as BookingMagneticButton,
  WorkEyebrow as BookingEyebrow,
  WorkStickyRail as BookingStickyRail,
} from '@/components/work/shared'

export { MaskLine, useCursorParallax } from '@/components/about/shared'
export type { MotionValue }

/* The service keys + color types so sections can type their props. */
export type {
  ServiceColorKey,
  ServiceColor,
} from '@/components/work/shared'
