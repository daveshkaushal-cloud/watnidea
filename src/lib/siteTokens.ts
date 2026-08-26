/**
 * watNidea — Central design-token system.
 * ------------------------------------------------------------
 * ONE source of truth for the "Editorial Digital Playground"
 * system: colours, typography, spacing, radius, borders,
 * shadows, motion timing/easing and per-service accents.
 *
 * Every page + component reads from these tokens so the site
 * reads as one recognisable system while each service keeps
 * its own accent identity.
 *
 * Colour discipline:
 *   ~55% light editorial surfaces (paper / sand / white)
 *   ~25% strong colour-block sections
 *   ~20% dark cinematic sections
 *   Dark = contrast + impact, never the default.
 */

export const tokens = {
  color: {
    // Base — paper & ink
    paper: '#F7F2E8',
    sand: '#EAE0D1',
    white: '#FFFDF8',
    ink: '#101010',
    mutedInk: '#5D5A54',
    // Signal
    red: '#F13D32',
    // Youth accents
    electricBlue: '#3D5AFE',
    acidLime: '#C8F542',
    sunnyYellow: '#FFC83D',
    hotCoral: '#FF6B62',
    digitalViolet: '#7657F6',
    freshMint: '#66DFC0',
    deepTeal: '#157468',
    // Legacy aliases kept for back-compat with existing CSS vars
    charcoal: '#101010',
    warmWhite: '#F7F2E8',
    cream: '#EFE9DC',
    body: '#101010',
    muted: '#5D5A54',
  },

  font: {
    // Two families only.
    display: 'var(--font-editorial), Georgia, "Times New Roman", serif',
    sans: 'var(--font-geist-sans), system-ui, sans-serif',
  },

  /** Spacing scale (px). Section rhythm uses the larger values. */
  space: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 40,
    xl: 64,
    '2xl': 96,
    '3xl': 128,
    sectionY: 96,
    sectionYLg: 128,
  },

  radius: {
    sm: 8,
    md: 14,
    lg: 22,
    xl: 32,
    pill: 999,
  },

  border: {
    subtle: 'rgba(16,16,16,0.10)',
    strong: 'rgba(16,16,16,0.20)',
    subtleDark: 'rgba(255,255,255,0.12)',
    strongDark: 'rgba(255,255,255,0.22)',
  },

  shadow: {
    card: '0 1px 0 rgba(16,16,16,0.04), 0 8px 24px -12px rgba(16,16,16,0.18)',
    cardHover: '0 1px 0 rgba(16,16,16,0.05), 0 18px 40px -16px rgba(16,16,16,0.28)',
    sticker: '0 6px 0 rgba(16,16,16,0.12), 0 10px 20px -6px rgba(16,16,16,0.25)',
    stamp: '0 2px 0 rgba(16,16,16,0.10)',
  },

  motion: {
    duration: {
      fast: 180,
      base: 280,
      reveal: 460,
      slow: 640,
    },
    ease: {
      out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
} as const

/* ------------------------------------------------------------------ *
 * SURFACE TOKENS — semantic aliases used by SectionShell + components.
 * A surface describes the visual treatment of a whole section, so a
 * page can declare <Section surface="ink"> without reaching into the
 * raw colour palette.
 * ------------------------------------------------------------------ */

export type Surface =
  | 'paper' // default light editorial (Warm Paper #FFF7E9)
  | 'sand' // warmer light
  | 'white' // clean light
  | 'ink' // dark cinematic
  | 'red' // signal red block
  | 'yellow' // sunny yellow block
  | 'lime' // acid lime block (dark text)
  | 'blue' // cobalt blue block
  | 'violet' // digital violet block
  | 'teal' // deep teal block
  | 'mint' // fresh mint block (dark text)
  | 'coral' // hot coral block
  | 'orange' // signal orange block
  | 'blush' // coral blush soft tint (dark text)
  | 'bluemist' // blue mist soft tint (dark text)
  | 'softmint' // soft mint tint (dark text)
  | 'lemon' // lemon wash soft tint (dark text)
  | 'lilac' // soft lilac tint (dark text)

export type SurfaceStyle = {
  bg: string
  fg: string
  muted: string
  border: string
  /** True when this surface is a light colour → dark accents/ink read well. */
  isLight: boolean
}

export const SURFACES: Record<Surface, SurfaceStyle> = {
  paper: { bg: '#FFF7E9', fg: '#111111', muted: '#555255', border: 'rgba(17,17,17,0.12)', isLight: true },
  sand: { bg: '#EAE0D1', fg: '#111111', muted: '#555255', border: 'rgba(17,17,17,0.14)', isLight: true },
  white: { bg: '#FFFFFF', fg: '#111111', muted: '#555255', border: 'rgba(17,17,17,0.10)', isLight: true },
  ink: { bg: '#111111', fg: '#FFFFFF', muted: 'rgba(255,255,255,0.66)', border: 'rgba(255,255,255,0.16)', isLight: false },
  red: { bg: '#F13D32', fg: '#FFFFFF', muted: 'rgba(255,255,255,0.82)', border: 'rgba(255,255,255,0.28)', isLight: false },
  yellow: { bg: '#FFC83D', fg: '#111111', muted: 'rgba(17,17,17,0.66)', border: 'rgba(17,17,17,0.18)', isLight: true },
  lime: { bg: '#C8F542', fg: '#111111', muted: 'rgba(17,17,17,0.66)', border: 'rgba(17,17,17,0.18)', isLight: true },
  blue: { bg: '#3D5AFE', fg: '#FFFFFF', muted: 'rgba(255,255,255,0.80)', border: 'rgba(255,255,255,0.26)', isLight: false },
  violet: { bg: '#7657F6', fg: '#FFFFFF', muted: 'rgba(255,255,255,0.80)', border: 'rgba(255,255,255,0.26)', isLight: false },
  teal: { bg: '#157468', fg: '#FFFFFF', muted: 'rgba(255,255,255,0.78)', border: 'rgba(255,255,255,0.24)', isLight: false },
  mint: { bg: '#66DFC0', fg: '#111111', muted: 'rgba(17,17,17,0.66)', border: 'rgba(17,17,17,0.18)', isLight: true },
  coral: { bg: '#FF6B62', fg: '#111111', muted: 'rgba(17,17,17,0.70)', border: 'rgba(17,17,17,0.18)', isLight: true },
  orange: { bg: '#FF7A1A', fg: '#FFFFFF', muted: 'rgba(255,255,255,0.80)', border: 'rgba(255,255,255,0.26)', isLight: false },
  blush: { bg: '#FFE1DC', fg: '#111111', muted: 'rgba(17,17,17,0.60)', border: 'rgba(17,17,17,0.14)', isLight: true },
  bluemist: { bg: '#E3EAFF', fg: '#111111', muted: 'rgba(17,17,17,0.60)', border: 'rgba(17,17,17,0.14)', isLight: true },
  softmint: { bg: '#DCF8EE', fg: '#111111', muted: 'rgba(17,17,17,0.60)', border: 'rgba(17,17,17,0.14)', isLight: true },
  lemon: { bg: '#FFF1B8', fg: '#111111', muted: 'rgba(17,17,17,0.60)', border: 'rgba(17,17,17,0.14)', isLight: true },
  lilac: { bg: '#E9E4FF', fg: '#111111', muted: 'rgba(17,17,17,0.60)', border: 'rgba(17,17,17,0.14)', isLight: true },
}

export function surface(s: Surface): SurfaceStyle {
  return SURFACES[s] ?? SURFACES.paper
}

/* ------------------------------------------------------------------ *
 * SERVICE ACCENTS — keyed by slug, mirrors siteContent.SERVICES.
 * Each service keeps one recognisable accent + a contrast colour.
 * ------------------------------------------------------------------ */

export type ServiceAccentToken = {
  slug: string
  accent: string
  accent2: string
  surface: Surface
  isLightAccent: boolean
}

export const SERVICE_ACCENTS: Record<string, ServiceAccentToken> = {
  'aura-architecture': { slug: 'aura-architecture', accent: '#F13D32', accent2: '#FF6B62', surface: 'red', isLightAccent: false },
  'the-digital-hq': { slug: 'the-digital-hq', accent: '#3D5AFE', accent2: '#3D5AFE', surface: 'blue', isLightAccent: false },
  'the-hype-engine': { slug: 'the-hype-engine', accent: '#C8F542', accent2: '#101010', surface: 'lime', isLightAccent: true },
  'kinetic-studio': { slug: 'kinetic-studio', accent: '#F97316', accent2: '#101010', surface: 'ink', isLightAccent: false },
  'growth-alchemy': { slug: 'growth-alchemy', accent: '#66DFC0', accent2: '#157468', surface: 'mint', isLightAccent: true },
  'synthetic-cinema': { slug: 'synthetic-cinema', accent: '#7657F6', accent2: '#3D5AFE', surface: 'violet', isLightAccent: false },
  'the-echo-system': { slug: 'the-echo-system', accent: '#FFC83D', accent2: '#157468', surface: 'yellow', isLightAccent: true },
}

/** Returns a readable text colour (#101010 or #FFFFFF) for a given hex bg. */
export function readableTextOn(hex: string): string {
  const c = hex.replace('#', '')
  if (c.length !== 6) return '#101010'
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? '#101010' : '#FFFFFF'
}
