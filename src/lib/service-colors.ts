/**
 * WatNidea — Service accent color system.
 *
 * The brand remains red (#E53935). Each of the 7 services carries its own
 * signature accent color, introduced ONLY as ambient glows, particle systems,
 * motion graphics, dividers, hover states, animated gradients and visual
 * storytelling — never as bright backgrounds. The base stays #050505 black.
 *
 * Centralized here so every component (service visuals, ambient layers,
 * section dividers, shared helpers) draws from a single source of truth,
 * guaranteeing consistent hues and opacity discipline across the site.
 */

export type ServiceAccent = {
  /** Signature hex, e.g. "#F59E0B" */
  hex: string
  /** "r, g, b" triplet for use inside rgba(...), e.g. "245, 158, 11" */
  rgb: string
  /** Lighter variant — bright cores, highlights, gradient tops */
  soft: string
  /** "r, g, b" triplet for the soft variant, for rgba() use */
  softRgb: string
  /** Darker variant — gradient ends, deep borders */
  deep: string
  /** Display label for dev reference */
  label: string
}

export const SERVICE_COLORS = {
  /** 01 — Aura Architecture */
  aura: {
    hex: '#F59E0B',
    rgb: '245, 158, 11',
    soft: '#FCD34D',
    softRgb: '252, 211, 77',
    deep: '#B45309',
    label: 'Amber Gold',
  },
  /** 02 — The Digital HQ */
  digitalHq: {
    hex: '#3B82F6',
    rgb: '59, 130, 246',
    soft: '#93C5FD',
    softRgb: '147, 197, 253',
    deep: '#1D4ED8',
    label: 'Electric Blue',
  },
  /** 03 — The Hype Engine (brand red) */
  hype: {
    hex: '#E53935',
    rgb: '229, 57, 53',
    soft: '#FF6B63',
    softRgb: '255, 107, 99',
    deep: '#A8201D',
    label: 'Red',
  },
  /** 04 — Kinetic Studio */
  kinetic: {
    hex: '#F97316',
    rgb: '249, 115, 22',
    soft: '#FDBA74',
    softRgb: '253, 186, 116',
    deep: '#C2410C',
    label: 'Orange',
  },
  /** 05 — Growth Alchemy */
  growth: {
    hex: '#10B981',
    rgb: '16, 185, 129',
    soft: '#6EE7B7',
    softRgb: '110, 231, 183',
    deep: '#047857',
    label: 'Emerald Green',
  },
  /** 06 — Synthetic Cinema */
  synthetic: {
    hex: '#8B5CF6',
    rgb: '139, 92, 246',
    soft: '#C4B5FD',
    softRgb: '196, 181, 253',
    deep: '#6D28D9',
    label: 'Purple',
  },
  /** 07 — The Echo System */
  echo: {
    hex: '#06B6D4',
    rgb: '6, 182, 212',
    soft: '#67E8F9',
    softRgb: '103, 232, 249',
    deep: '#0E7490',
    label: 'Cyan',
  },
} as const satisfies Record<string, ServiceAccent>

export type ServiceKey = keyof typeof SERVICE_COLORS

/**
 * Ordered list of service keys — matches the home-page services order.
 * Useful for building sequential section-transition gradients.
 */
export const SERVICE_ORDER: ServiceKey[] = [
  'aura',
  'digitalHq',
  'hype',
  'kinetic',
  'growth',
  'synthetic',
  'echo',
]

/* -----------------------------------------------------------------------
 * Convenience helpers — pre-built rgba strings at the opacity discipline
 * the premium aesthetic requires. All accents stay subtle (≤ 0.5 peak).
 * --------------------------------------------------------------------- */

/** Soft ambient glow blob, e.g. "rgba(245,158,11,0.16)" */
export function glow(accent: ServiceAccent, alpha = 0.16): string {
  return `rgba(${accent.rgb},${alpha})`
}

/** Stronger accent for focal cores / active states, e.g. "rgba(245,158,11,0.9)" */
export function core(accent: ServiceAccent, alpha = 0.9): string {
  return `rgba(${accent.rgb},${alpha})`
}

/** Hairline divider tint, e.g. "rgba(245,158,11,0.45)" */
export function hairline(accent: ServiceAccent, alpha = 0.45): string {
  return `rgba(${accent.rgb},${alpha})`
}

/** Radial ambient gradient string for a service glow. */
export function radialGlow(
  accent: ServiceAccent,
  inner = 0.18,
  outer = 0.04,
): string {
  return `radial-gradient(circle, rgba(${accent.rgb},${inner}), rgba(${accent.rgb},${outer}) 40%, rgba(${accent.rgb},0) 70%)`
}

/** Linear gradient from soft → hex → deep, for gradient text / fills. */
export function gradient(accent: ServiceAccent): string {
  return `linear-gradient(to bottom right, ${accent.soft}, ${accent.hex}, ${accent.deep})`
}

/** The brand red accent (always available as the default). */
export const BRAND_RED: ServiceAccent = SERVICE_COLORS.hype
