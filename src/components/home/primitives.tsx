import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ *
 * Reusable editorial primitives for the homepage.
 *
 * - Every interactive element is a real `<Link>` or real `<button>`.
 * - No `href="#"`, no `onClick={() => {}}`.
 * - Minimum 44px touch target enforced via `min-h-[44px]` + padding.
 * - Tailwind classes use the WatNidea CSS variables defined in globals.css
 *   so the same component reads correctly on light and dark backgrounds.
 * ------------------------------------------------------------------ */

type CommonLinkProps = {
  href: string
  children: ReactNode
  className?: string
  /** Optional trailing icon (e.g. arrow). */
  icon?: ReactNode
  /** Accessible label — falls back to the children's text. */
  'aria-label'?: string
}

/** Primary CTA — red pill on light OR dark backgrounds. */
export function PrimaryLink({
  href,
  children,
  className,
  icon,
  ...rest
}: CommonLinkProps) {
  const isExternal = href.startsWith('mailto:') || href.startsWith('http')
  const LinkTag = isExternal ? 'a' : Link
  return (
    <LinkTag
      href={href}
      className={cn(
        'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full',
        'bg-[var(--wn-red)] px-6 py-3 text-sm font-medium text-white',
        'transition-colors duration-200 hover:bg-[var(--wn-red-deep)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wn-red)]',
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {icon ? <span className="inline-flex">{icon}</span> : null}
    </LinkTag>
  )
}

/** Secondary CTA — subtle outline pill that adapts to surface. */
export function SecondaryLink({
  href,
  children,
  className,
  icon,
  ...rest
}: CommonLinkProps) {
  const isExternal = href.startsWith('mailto:') || href.startsWith('http')
  const LinkTag = isExternal ? 'a' : Link
  return (
    <LinkTag
      href={href}
      className={cn(
        'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full',
        'border border-[var(--wn-border-strong)] bg-transparent px-6 py-3 text-sm font-medium',
        'text-[var(--wn-fg)] transition-colors duration-200 hover:bg-[var(--wn-surface-2)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wn-red)]',
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {icon ? <span className="inline-flex">{icon}</span> : null}
    </LinkTag>
  )
}

/** Eyebrow label — uppercase, tracked. */
export function Eyebrow({
  children,
  className,
  as: Tag = 'p',
}: {
  children: ReactNode
  className?: string
  as?: 'p' | 'span' | 'div'
}) {
  return (
    <Tag className={cn('wn-eyebrow', className)}>{children}</Tag>
  )
}

/** Section heading — uses font-editorial (Fraunces). Renders as <h2>. */
export function SectionHeading({
  id,
  children,
  className,
  balance = true,
}: {
  id?: string
  children: ReactNode
  className?: string
  /** Use text-wrap: balance for tighter headline rag. */
  balance?: boolean
}) {
  return (
    <h2
      id={id}
      className={cn(
        'font-editorial text-3xl font-medium leading-[1.1] tracking-[-0.01em] text-[var(--wn-fg)] sm:text-4xl md:text-5xl',
        balance && 'text-balance',
        className,
      )}
    >
      {children}
    </h2>
  )
}

/** Container with consistent horizontal rhythm. */
export function SectionShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>
      {children}
    </div>
  )
}
