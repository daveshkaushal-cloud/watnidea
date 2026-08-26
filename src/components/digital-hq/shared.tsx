'use client'

/**
 * The Digital HQ — shared helpers.
 *
 * This page carries the "Electric Blue" (#3B82F6) service identity. The brand
 * remains red (#E53935) at the global level (navbar, logo, scrollbar), but
 * every Digital-HQ-specific section uses Electric Blue as its signature hue —
 * introduced ONLY as ambient glows, particle systems, motion graphics,
 * dividers, hover states and animated gradients. The base stays #050505 black.
 *
 * The accent-aware helpers (MaskLine, SectionEyebrow, StickyRail, EmberCanvas,
 * EnergySphere, AboutAmbient, useCursorParallax, MotionValue) are imported
 * directly from @/components/about/shared and called with
 * accent={SERVICE_COLORS.digitalHq}. This file only adds the one helper that
 * is genuinely page-specific: a blue gradient text span.
 */

import { type ReactNode } from 'react'
import { SERVICE_COLORS } from '@/lib/service-colors'

/** The Electric Blue service accent — single source of truth for this page. */
export const DHQ = SERVICE_COLORS.digitalHq

/* ===================================================================
   BlueGradientText — Electric Blue gradient text span with optional glow.
   Mirrors RedGradientText but in the Digital HQ signature hue.
   `bg-gradient-to-br from-[#93C5FD] via-[#3B82F6] to-[#1D4ED8]`
   =================================================================== */
export function BlueGradientText({
  children,
  className = '',
  glow = true,
}: {
  children: ReactNode
  className?: string
  glow?: boolean
}) {
  return (
    <span
      className={
        'bg-gradient-to-br from-[#93C5FD] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent ' +
        (glow ? 'drop-shadow-[0_0_30px_rgba(59,130,246,0.45)] ' : '') +
        className
      }
    >
      {children}
    </span>
  )
}
