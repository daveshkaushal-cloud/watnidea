'use client'

import Link from 'next/link'
import { useEffect, useReducer, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays, Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SERVICES, site, type ServiceEntry } from '@/lib/siteContent'
import type { Surface } from '@/lib/siteTokens'
import { SURFACES } from '@/lib/siteTokens'
import SiteHeader from './site-header'
import SiteFooter from './site-footer'
import { useReducedMotionSSR } from './use-reduced-motion-ssr'

// Re-export so callers can import from one place.
export { useReducedMotionSSR } from './use-reduced-motion-ssr'

/* ============================================================
 * SHARED PRIMITIVES — "Editorial Digital Playground"
 * One set of reusable components used by every page so the site
 * reads as one recognisable system while pages keep personality.
 * ============================================================ */

/* ---- Reveal — short fade-up, respects reduced motion (hydration-safe)
 * Uses `whileInView` with a generous margin so content animates as it
 * approaches the viewport — but content is always in the DOM and never
 * creates empty space. Animations are fast (300ms) to avoid delays. ---- */
export function Reveal({
  children,
  delay = 0,
  y = 12,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotionSSR()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---- Section — surface-aware section wrapper ---- */
export function Section({
  surface = 'paper',
  className,
  children,
  id,
  ariaLabelledBy,
}: {
  surface?: Surface
  className?: string
  children: ReactNode
  id?: string
  ariaLabelledBy?: string
}) {
  const s = SURFACES[surface]
  const surfaceClass = `wn-surface-${surface}`
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn('wn-section wn-grain-paper', surfaceClass, className)}
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      {children}
    </section>
  )
}

/* ---- Container ---- */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12', className)}>{children}</div>
}

/* ---- SectionLabel — sticker-style numbered label ---- */
export function SectionLabel({
  number,
  children,
  accent = '#F13D32',
  className,
}: {
  number?: string
  children: ReactNode
  accent?: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {number && (
        <span
          className="font-editorial text-sm font-bold tracking-tight"
          style={{ color: accent }}
        >
          {number}
        </span>
      )}
      <span
        className="wn-caption"
        style={{ color: 'inherit', opacity: 0.7 }}
      >
        {children}
      </span>
      <span className="h-px flex-1 max-w-[60px]" style={{ background: 'currentColor', opacity: 0.25 }} />
    </div>
  )
}

/* ---- EditorialHeading — oversized serif headline ---- */
export function EditorialHeading({
  children,
  as: Tag = 'h2',
  className,
  balance = true,
  id,
}: {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  balance?: boolean
  id?: string
}) {
  return (
    <Tag
      id={id}
      className={cn(
        'font-editorial font-medium leading-[1.02] tracking-[-0.02em]',
        Tag === 'h1' && 'text-[clamp(2.75rem,7vw,5.5rem)]',
        Tag === 'h2' && 'text-[clamp(2rem,4.5vw,3.75rem)]',
        Tag === 'h3' && 'text-[clamp(1.5rem,2.5vw,2.25rem)]',
        balance && 'text-balance',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

/* ---- Underline — hand-drawn red underline on a span ---- */
export function Underline({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('wn-underline-hand', className)}>{children}</span>
  )
}

/* ---- Sticker — sticker-like floating label ---- */
export function Sticker({
  children,
  accent = '#FFFDF8',
  textColor = '#101010',
  tilt = 'none',
  className,
  style,
}: {
  children: ReactNode
  accent?: string
  textColor?: string
  tilt?: 'none' | 'left' | 'right'
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <span
      className={cn(
        'wn-sticker',
        tilt === 'left' && 'wn-sticker--tilt-l',
        tilt === 'right' && 'wn-sticker--tilt-r',
        className,
      )}
      style={{ background: accent, color: textColor, borderColor: textColor, ...style }}
    >
      {children}
    </span>
  )
}

/* ---- IdeaStamp — rotating "WHAT AN IDEA" seal ---- */
export function IdeaStamp({
  label = 'What an idea',
  size = 120,
  color = '#F13D32',
  className,
}: {
  label?: string
  size?: number
  color?: string
  className?: string
}) {
  return (
    <span
      className={cn('wn-stamp', className)}
      style={{
        width: size,
        height: size,
        color,
        fontSize: size * 0.11,
        padding: '0 0.2em',
      }}
      aria-hidden
    >
      {label}
    </span>
  )
}

/* ---- CTAButton — primary/secondary, real Link ---- */
export function CTAButton({
  href,
  children,
  variant = 'primary',
  icon,
  className,
  'aria-label': ariaLabel,
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: ReactNode
  className?: string
  'aria-label'?: string
}) {
  const isExternal = href.startsWith('mailto:') || href.startsWith('http')
  const Tag = isExternal ? 'a' : Link
  const base =
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2'
  const variants = {
    primary: 'bg-[#F13D32] text-white shadow-[0_3px_0_rgba(16,16,16,0.20)] hover:-translate-y-0.5 hover:bg-[#d9342a]',
    secondary:
      'border border-[rgba(16,16,16,0.22)] bg-transparent text-[#101010] hover:bg-[rgba(16,16,16,0.05)]',
    ghost: 'text-[#101010] underline-offset-4 hover:underline',
  }
  return (
    <Tag
      href={href}
      aria-label={ariaLabel}
      className={cn(base, variants[variant], className)}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      {icon}
    </Tag>
  )
}

/* ---- Marquee — horizontal scrolling text ---- */
export function Marquee({
  items,
  className,
  separator = '✦',
}: {
  items: string[]
  className?: string
  separator?: string
}) {
  return (
    <div className={cn('wn-marquee', className)}>
      <div className="wn-marquee__track">
        {[0, 1].map((dup) => (
          <span key={dup} className="flex items-center gap-10" aria-hidden={dup === 1}>
            {items.map((it, i) => (
              <span key={i} className="flex items-center gap-10">
                <span>{it}</span>
                <span className="text-[#F13D32]">{separator}</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---- ServiceCard — colour-coded poster card ---- */
export function ServiceCard({ service }: { service: ServiceEntry }) {
  const s = service
  return (
    <Link
      href={s.route}
      className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.12)] p-5 transition-transform duration-300 hover:-translate-y-1"
      style={{ background: s.accent, color: isLightHex(s.accent) ? '#101010' : '#FFFFFF' }}
      aria-label={`${s.name} — ${s.tagline}`}
    >
      {/* Halftone overlay for depth */}
      <span
        aria-hidden
        className={cn('pointer-events-none absolute inset-0 opacity-30', isLightHex(s.accent) ? 'wn-halftone' : 'wn-halftone-light')}
      />
      <div className="relative flex items-start justify-between">
        <span className="wn-bignum text-5xl opacity-90">{s.number}</span>
        <ArrowUpRight className="h-5 w-5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <div className="relative">
        <h3 className="font-editorial text-2xl font-semibold leading-tight">{s.name}</h3>
        <p className="mt-1.5 text-sm opacity-80">{s.tagline}</p>
      </div>
    </Link>
  )
}

/* ---- ProjectCard — collectible magazine-cover concept card ---- */
export function ProjectCard({
  href,
  title,
  category,
  issue,
  accent,
  accent2,
  conceptLabel,
  children,
}: {
  href: string
  title: string
  category: string
  issue: string
  accent: string
  accent2: string
  conceptLabel?: string
  children?: ReactNode
}) {
  return (
    <Link
      href={href}
      className="wn-card group flex flex-col overflow-hidden rounded-[22px]"
      aria-label={`${title} — ${conceptLabel ?? category}`}
    >
      {/* Cover area */}
      <div
        className="relative aspect-[4/5] overflow-hidden"
        style={{ background: accent, color: isLightHex(accent) ? '#101010' : '#FFFFFF' }}
      >
        <span aria-hidden className={cn('absolute inset-0 opacity-25', isLightHex(accent) ? 'wn-halftone' : 'wn-halftone-light')} />
        {/* Issue sticker */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[rgba(255,253,248,0.9)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#101010]">
          {issue}
        </span>
        {/* Concept label sticker */}
        {conceptLabel && (
          <span
            className="absolute right-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider"
            style={{ background: accent2, color: isLightHex(accent2) ? '#101010' : '#FFFFFF' }}
          >
            {conceptLabel}
          </span>
        )}
        {/* Big title */}
        <div className="absolute inset-x-5 bottom-5">
          <span className="font-editorial text-4xl font-bold leading-[0.95] tracking-[-0.02em]">
            {title}
          </span>
        </div>
        {children}
      </div>
      {/* Meta strip */}
      <div className="flex items-center justify-between border-t border-[rgba(16,16,16,0.10)] px-5 py-3">
        <span className="wn-caption text-[#5D5A54]">{category}</span>
        <ArrowUpRight className="h-4 w-4 text-[#101010] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  )
}

/* ---- EndingCTA — full-colour page-ending CTA ---- */
export function EndingCTA({
  surface = 'ink',
  eyebrow = 'Let’s talk',
  title,
  body,
  primaryHref = '/book-strategy-call',
  primaryLabel = 'Book a Strategy Call',
  secondaryHref,
  secondaryLabel,
}: {
  surface?: Surface
  eyebrow?: string
  title: ReactNode
  body?: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}) {
  const s = SURFACES[surface]
  return (
    <section
      className={cn('wn-section wn-grain-paper', `wn-surface-${surface}`)}
      style={{ backgroundColor: s.bg, color: s.fg }}
      aria-labelledby="ending-cta-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="wn-caption mx-auto mb-5" style={{ opacity: 0.7 }}>
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="ending-cta-heading" className="font-editorial text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
              {title}
            </h2>
          </Reveal>
          {body && (
            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-xl text-base opacity-80 sm:text-lg">{body}</p>
            </Reveal>
          )}
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTAButton
                href={primaryHref}
                variant={s.isLight ? 'primary' : 'primary'}
                className={s.isLight ? '' : 'bg-white text-[#F13D32] hover:bg-[#FFFDF8]'}
                icon={<CalendarDays className="h-4 w-4" />}
              >
                {primaryLabel}
              </CTAButton>
              {secondaryHref && secondaryLabel && (
                <CTAButton
                  href={secondaryHref}
                  variant="secondary"
                  className={s.isLight ? '' : 'border-white/30 text-white hover:bg-white/10'}
                >
                  {secondaryLabel}
                </CTAButton>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* ---- FAQAccordion — accessible accordion ---- */
type FAQItem = { q: string; a: string }
export function FAQAccordion({
  items,
  accent = '#F13D32',
  onDark = false,
}: {
  items: FAQItem[]
  accent?: string
  /** When true, uses white-tinted dividers + idle icon container for dark surfaces. */
  onDark?: boolean
}) {
  const [open, toggle] = useReducer(
    (s: number, i: number) => (s === i ? -1 : i),
    -1,
  )
  const dividers = onDark
    ? 'divide-[rgba(255,255,255,0.12)] border-[rgba(255,255,255,0.12)]'
    : 'divide-[rgba(16,16,16,0.10)] border-[rgba(16,16,16,0.10)]'
  return (
    <div className={cn('divide-y border-y', dividers)}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-editorial text-lg font-semibold sm:text-xl">{it.q}</span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: isOpen ? accent : onDark ? 'rgba(255,255,255,0.08)' : 'rgba(16,16,16,0.06)',
                    color: isOpen ? '#FFFFFF' : onDark ? '#FFFFFF' : '#101010',
                  }}
                  aria-hidden
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-2xl pb-6 text-base leading-relaxed opacity-80">{it.a}</p>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

/* ---- FormField — label + input/textarea/select with error ---- */
export function FormField({
  id,
  label,
  children,
  error,
  required,
  optional,
}: {
  id: string
  label: string
  children: ReactNode
  error?: string
  required?: boolean
  optional?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-[#101010]">
        {label}
        {required && <span className="text-[#F13D32]" aria-hidden>*</span>}
        {optional && <span className="text-xs font-normal text-[#5D5A54]">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-[#F13D32]">
          {error}
        </p>
      )}
    </div>
  )
}

/* ---- PageHero — shared editorial hero for internal pages ---- */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  surface = 'paper',
  accent = '#F13D32',
  children,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  surface?: Surface
  accent?: string
  children?: ReactNode
}) {
  const s = SURFACES[surface]
  return (
    <section
      className={cn('wn-grain-paper relative overflow-hidden !pt-[calc(72px+2.75rem)] pb-12 sm:!pt-[calc(72px+3.25rem)] sm:pb-16', `wn-surface-${surface}`)}
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      <Container>
        {eyebrow && (
          <Reveal>
            <p className="wn-caption mb-3" style={{ color: accent }}>
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h1 className="font-editorial text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.02em]">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed opacity-80 sm:text-lg">
              {subtitle}
            </p>
          </Reveal>
        )}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </section>
  )
}

/* ---- Helper: is a hex colour "light" (for readable text) ---- */
function isLightHex(hex: string): boolean {
  const c = hex.replace('#', '')
  if (c.length !== 6) return false
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.6
}

/* ---- PageShell — wraps every page with header + footer + main ---- */
export function PageShell({
  children,
  headerTone = 'light',
}: {
  children: ReactNode
  headerTone?: 'light' | 'dark'
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone={headerTone} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

// Re-export the shared header/footer for convenience
export { default as SiteHeader } from './site-header'
export { default as SiteFooter } from './site-footer'
// (SiteHeader / SiteFooter are also imported at top of file for PageShell)
