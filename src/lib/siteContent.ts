/**
 * WatNidea — Central content registry.
 * ------------------------------------------------------------
 * Single source of truth for brand config, services, case studies,
 * testimonials, metrics and editorial content.
 *
 * Every "claim" object carries a `verified` flag.
 * Components MUST render ONLY items where `verified === true`.
 * Unverified / concept items may be surfaced, but ONLY behind an
 * explicit "Concept exploration" / "Selected work coming soon" label.
 *
 * Never invent client work, testimonials, employees, awards,
 * subscriber numbers or performance statistics. If you cannot point
 * to a real asset or a real signed-off result, leave it out.
 */

export const site = {
  name: 'watNidea',
  legalName: 'watNidea Creative Studio',
  tagline: 'Identity with Soul. Strategy with Teeth.',
  description: 'Creative Growth Agency',
  longDescription:
    'watNidea is a creative growth agency. We build brand identities, websites, content systems and performance campaigns — engineered to be memorable and to convert.',
  email: 'info@watnidea.com',
address:
  '2nd Floor, G-283, G Block, Sector 63, Noida, Chotpur, Uttar Pradesh 201309',
mapsUrl:
  'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwiQwOKQ3MCWAxUAAAAAHQAAAAAQCg..i&mstk=AUtExfDta55YsPbneSruIkc1Asce1Qz1tO6UQFTr-LVtWK9ULeX98u_eCF6ygpPkX0TKidYdT2PwANxEWWu4zx5qjRITaaxy97yQf6RTurirGDKwutTe5dIJctV_5DV_fooGXZTgc5zA426uPKJfSkbOqxQGb_0sDQDdT8yQvOGFIMhz3Tc&pvq=Cg0vZy8xMXl3XzNxeXhogAEBkAEB&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x390cef19454659d3:0xe66134d0fd05605d',
  // Owner must provide real social URLs before these become live links.
  social: {
    instagram: 'https://www.instagram.com/watnidea?igsi=MTM0YW9wYWlndW51Yw==',
    linkedin: 'https://www.linkedin.com/company/watnidea/',
    behance: '',
  },
  status: 'Now accepting selected projects',
  foundedYear: new Date().getFullYear(),
  // Real domain once owner confirms. Used for canonical URLs + OG.
  url: 'https://watnidea.com',
} as const

/* ------------------------------------------------------------------ *
 * 7 SERVICES
 * ------------------------------------------------------------------ */

export type ServiceSlug =
  | 'aura-architecture'
  | 'the-digital-hq'
  | 'the-hype-engine'
  | 'kinetic-studio'
  | 'growth-alchemy'
  | 'synthetic-cinema'
  | 'the-echo-system'

export type ServiceEntry = {
  number: string
  slug: ServiceSlug
  name: string
  shortName: string
  tagline: string
  description: string
  /** Primary accent colour (hex). */
  accent: string
  /** Secondary accent colour (hex) — used for stickers, tape, contrast. */
  accent2: string
  /** Short art-direction label used in the service mega-menu + cards. */
  mood: string
  route: `/${ServiceSlug}`
}

export const SERVICES: ServiceEntry[] = [
  {
    number: '01',
    slug: 'aura-architecture',
    name: 'Aura Architecture',
    shortName: 'Aura',
    tagline: 'Identity systems with a soul.',
    description:
      'Brand strategy, naming, visual identity, verbal identity and guidelines — built so a brand stays recognisable across every surface.',
    accent: '#F13D32',
    accent2: '#FF6B62',
    mood: 'Editorial · typographic · identity-led',
    route: '/aura-architecture',
  },
  {
    number: '02',
    slug: 'the-digital-hq',
    name: 'The Digital HQ',
    shortName: 'Digital HQ',
    tagline: 'Websites and product interfaces that perform.',
    description:
      'Design systems, marketing sites and product interfaces — fast, accessible, conversion-focused and built on a maintainable architecture.',
    accent: '#3D5AFE',
    accent2: '#3D5AFE',
    mood: 'Architectural grids · interface systems',
    route: '/the-digital-hq',
  },
  {
    number: '03',
    slug: 'the-hype-engine',
    name: 'The Hype Engine',
    shortName: 'Hype',
    tagline: 'Cultural and social content that earns attention.',
    description:
      'Social strategy, content engines and community building designed around how culture actually moves — not vanity metrics.',
    accent: '#C8F542',
    accent2: '#101010',
    mood: 'Cultural · social · energetic',
    route: '/the-hype-engine',
  },
  {
    number: '04',
    slug: 'kinetic-studio',
    name: 'Kinetic Studio',
    shortName: 'Kinetic',
    tagline: 'Film, motion and edit-led storytelling.',
    description:
      'Concept, direction, edit and motion — frame-based storytelling built for brand films, ads and content series.',
    accent: '#F97316',
    accent2: '#101010',
    mood: 'Cinematic · frame-based · motion-led',
    route: '/kinetic-studio',
  },
  {
    number: '05',
    slug: 'growth-alchemy',
    name: 'Growth Alchemy',
    shortName: 'Growth',
    tagline: 'Performance and conversion systems.',
    description:
      'Paid media, landing pages, funnels and analytics — set up as a system you can measure, optimise and scale.',
    accent: '#66DFC0',
    accent2: '#157468',
    mood: 'Clean data storytelling · conversion',
    route: '/growth-alchemy',
  },
  {
    number: '06',
    slug: 'synthetic-cinema',
    name: 'Synthetic Cinema',
    shortName: 'Cinema',
    tagline: 'AI-assisted concepting and visualisation.',
    description:
      'AI used to accelerate concepting, variations and visualisation — always under human creative direction, editing and commercial-rights review.',
    accent: '#7657F6',
    accent2: '#3D5AFE',
    mood: 'Futuristic · controlled · premium',
    route: '/synthetic-cinema',
  },
  {
    number: '07',
    slug: 'the-echo-system',
    name: 'The Echo System',
    shortName: 'Echo',
    tagline: 'Search, content and authority networks.',
    description:
      'SEO, content networks and authority building — so the brand is discoverable where audiences actually look.',
    accent: '#FFC83D',
    accent2: '#157468',
    mood: 'Connected knowledge · search · content',
    route: '/the-echo-system',
  },
]

export function getService(slug: ServiceSlug): ServiceEntry | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

/* ------------------------------------------------------------------ *
 * CASE STUDIES
 * Only `verified: true` items are rendered as real client work.
 * Everything else MUST surface behind a "Concept exploration" label.
 * ------------------------------------------------------------------ */

export type CaseStudy = {
  slug: string
  title: string
  client: string
  category: string
  services: ServiceSlug[]
  year: number
  verified: boolean
  /** When verified=false, this label replaces any "client outcome" framing. */
  conceptLabel?: string
  summary: string
  cover: string
  overview: string
  challenge?: string
  approach?: string
  deliverables?: string[]
  /** Only include verified, attributable outcomes. Leave empty otherwise. */
  outcome?: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'aura-brand-system-exploration',
    title: 'Brand system exploration',
    client: 'Concept',
    category: 'Brand Identity',
    services: ['aura-architecture'],
    year: new Date().getFullYear(),
    verified: false,
    conceptLabel: 'Concept exploration',
    summary:
      'An exploratory identity system showing how a wordmark, type scale and accent palette behave across digital surfaces.',
    cover: '',
    overview:
      'A concept exploration of how a modular identity system could scale across web, social and product — focused on type, rhythm and a single controlled accent.',
  },
  {
    slug: 'digital-hq-marketing-site-concept',
    title: 'Marketing site architecture concept',
    client: 'Concept',
    category: 'Website',
    services: ['the-digital-hq'],
    year: new Date().getFullYear(),
    verified: false,
    conceptLabel: 'Concept exploration',
    summary:
      'A concept for a fast, accessible marketing site built on a component system, with a clear content hierarchy and conversion path.',
    cover: '',
    overview:
      'A structural concept for how a marketing site can stay fast and maintainable while giving editorial teams room to tell the brand story.',
  },
]

export function getVerifiedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((c) => c.verified)
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}

/* ------------------------------------------------------------------ *
 * TESTIMONIALS — only verified, attributable quotes are rendered.
 * No composite or representative testimonials.
 * ------------------------------------------------------------------ */

export type Testimonial = {
  verified: boolean
  quote: string
  name: string
  role: string
  company?: string
}

export const TESTIMONIALS: Testimonial[] = []

export function getVerifiedTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.verified)
}

/* ------------------------------------------------------------------ *
 * METRICS — only verified, attributable numbers.
 * Render final values directly in the HTML (no 0 → number animation).
 * ------------------------------------------------------------------ */

export type Metric = {
  verified: boolean
  value: string
  label: string
}

export const METRICS: Metric[] = [
  {
    verified: true,
    value: '7',
    label: 'Specialist services under one studio',
  },
  {
    verified: true,
    value: '1',
    label: 'Unified creative + growth team',
  },
]

export function getVerifiedMetrics(): Metric[] {
  return METRICS.filter((m) => m.verified)
}

/* ------------------------------------------------------------------ *
 * INSIGHTS — only verified, complete articles are rendered as cards.
 * Unverified items surface behind an "Insights launching soon" state.
 * ------------------------------------------------------------------ */

export type Article = {
  verified: boolean
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  body?: string
}

export const ARTICLES: Article[] = []

export function getVerifiedArticles(): Article[] {
  return ARTICLES.filter((a) => a.verified)
}

/* ------------------------------------------------------------------ *
 * CAPABILITIES — honest, non-numeric studio capabilities.
 * Used on About + homepage "what we can do" sections.
 * ------------------------------------------------------------------ */

export const CAPABILITIES: { title: string; description: string }[] = [
  {
    title: 'Brand identity systems',
    description: 'Strategy, naming, visual and verbal identity, guidelines.',
  },
  {
    title: 'Websites & product interfaces',
    description: 'Design systems, marketing sites and product UI — fast and accessible.',
  },
  {
    title: 'Content & social engines',
    description: 'Social strategy, content systems and community building.',
  },
  {
    title: 'Film & motion',
    description: 'Concept, direction, edit and motion for brand films and ads.',
  },
  {
    title: 'Performance & growth',
    description: 'Paid media, funnels, landing pages and analytics.',
  },
  {
    title: 'AI-assisted concepting',
    description: 'AI for variations and visualisation — directed by humans.',
  },
  {
    title: 'Search & content networks',
    description: 'SEO, content architecture and authority building.',
  },
]

/* ------------------------------------------------------------------ *
 * NAVIGATION — primary routes used across the site.
 * ------------------------------------------------------------------ */

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/book-strategy-call' },
]
