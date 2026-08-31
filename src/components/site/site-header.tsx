'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SERVICES, site } from '@/lib/siteContent'

/**
 * SiteHeader — the ONE shared header for every page.
 *
 * Adaptive to light/dark sections (transparent over hero, paper-blur on
 * scroll), fixed top, never overlaps content (pages add top padding to
 * clear it).
 *
 * Responsive rules (per brief):
 *   - Full nav (logo + links + status + CTA) from 1024px upward.
 *   - Status sentence hidden below 1440px; only a status dot shown.
 *   - Compact mobile menu below 1024px (full-screen overlay).
 *   - "Book Strategy Call" CTA visible from 1024px upward.
 *   - Services mega menu on hover (desktop) / expandable (mobile).
 *
 * Hard requirement: logo, nav links, status and CTA never overlap at any
 * tested viewport (375 / 430 / 768 / 1024 / 1366 / 1440).
 */

const NAV = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '#services', mega: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/book-strategy-call' },
]

export default function SiteHeader({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)

  // Scroll state — switch to paper-blur after 24px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body scroll lock when any overlay open.
  useEffect(() => {
    const lock = megaOpen || mobileOpen
    document.body.style.overflow = lock ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [megaOpen, mobileOpen])

  // Escape closes overlays.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Close menus on route change (ref-guard skips the first render so we
  // don't trigger a redundant setState during mount).
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMegaOpen(false)
    setMobileOpen(false)
  }, [pathname])

  // Outside-click closes the mega menu (desktop).
  const headerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!megaOpen) return
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [megaOpen])

  // The header ALWAYS uses the cream background + dark text.
  // Scrolling only adds a slightly stronger shadow — no colour theme change.
  // This prevents the transparent-over-light-hero contrast problem.
  const onDark = false

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-[90] transition-shadow duration-300',
        scrolled
          ? 'border-b border-[rgba(17,17,17,0.10)] bg-[rgba(255,247,233,0.95)] backdrop-blur-[12px] shadow-[0_4px_20px_-8px_rgba(17,17,17,0.12)]'
          : 'border-b border-[rgba(17,17,17,0.06)] bg-[rgba(255,247,233,0.95)] backdrop-blur-[12px]',
        mobileOpen && 'h-[100dvh] !bg-[#FFF7E9] !backdrop-blur-none lg:h-auto',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="flex shrink-0 items-center"
        >
          <Image
  src="/watnidea-logo-original.png"
  alt={`${site.name} logo`}
  width={180}
  height={44}
  priority
  className="h-[34px] w-auto sm:h-[36px] lg:h-[38px]"
/>
        </Link>

        {/* Desktop nav — lg+ (1024px). Natural width, sits between logo and right cluster. */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV.map((item) =>
            item.mega ? (
              <div
                key={item.label}
                className="relative"
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                  aria-label="Services — open menu"
                  onClick={() => setMegaOpen((o) => !o)}
                  className={cn(
                    'inline-flex min-h-[44px] items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors',
                    megaOpen ? 'bg-[rgba(17,17,17,0.06)]' : 'hover:bg-[rgba(17,17,17,0.05)]',
                  )}
                  style={{ color: '#111111' }}
                >
                  Services
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', megaOpen && 'rotate-180')} />
                </button>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'inline-flex min-h-[44px] items-center rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-[rgba(16,16,16,0.05)]',
                  pathname === item.href && 'bg-[rgba(16,16,16,0.06)]',
                )}
                style={{ color: '#111111' }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Right cluster — status + CTA + mobile trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status sentence — xl+ (1440px) only; dot below */}
          <span className="hidden items-center gap-2 text-xs font-medium xl:flex" style={{ color: '#555255' }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F13D32] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F13D32]" />
            </span>
            {site.status}
          </span>
          {/* Status dot — lg to xl */}
          <span
            className="hidden h-2 w-2 rounded-full bg-[#F13D32] lg:flex xl:hidden"
            aria-label={site.status}
            title={site.status}
          />

          {/* CTA — lg+. Icon-only below xl, full label at xl+. */}
          <Link
            href="/book-strategy-call"
            aria-label="Book Strategy Call"
            className="hidden min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-[#F13D32] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_2px_0_rgba(16,16,16,0.18)] transition-transform hover:-translate-y-0.5 lg:inline-flex xl:px-5"
          >
            <CalendarDays className="h-4 w-4" />
            <span className="hidden xl:inline">Book Strategy Call</span>
          </Link>

          {/* Mobile trigger — below lg */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(16,16,16,0.16)] bg-[rgba(255,253,248,0.6)] backdrop-blur-sm transition-colors hover:border-[#F13D32] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" style={{ color: '#111111' }} />
            ) : (
              <Menu className="h-5 w-5" style={{ color: '#111111' }} />
            )}
          </button>
        </div>
      </div>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full hidden lg:block"
          >
            <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
              <div className="wn-grain-paper overflow-hidden rounded-3xl border border-[rgba(16,16,16,0.12)] bg-[#FFFFFF] p-6 shadow-[0_24px_60px_-20px_rgba(16,16,16,0.30)]">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={s.route}
                      className="group flex flex-col gap-1 rounded-2xl border border-transparent p-3 transition-colors hover:border-[rgba(16,16,16,0.10)] hover:bg-[#FFF7E9]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="wn-caption text-[#5D5A54]">{s.number}</span>
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.accent }} aria-hidden />
                      </div>
                      <span className="font-editorial text-lg font-semibold text-[#111111]">{s.name}</span>
                      <span className="text-xs text-[#5D5A54]">{s.tagline}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 top-[72px] z-[100] bg-[#FFF7E9] lg:hidden"
          >
            <div className="flex h-full flex-col bg-[#FFF7E9]">
              <nav className="relative z-[101] flex flex-1 flex-col gap-1 overflow-y-auto bg-[#FFF7E9] px-5 pb-8 pt-4" aria-label="Mobile">
                <Link href="/work" className="rounded-2xl border-b border-black/10 px-4 py-4 font-editorial text-2xl font-semibold text-[#111111] hover:bg-white">
                  Work
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileServices((s) => !s)}
                  aria-expanded={mobileServices}
                  className="flex items-center justify-between rounded-2xl border-b border-black/10 px-4 py-4 font-editorial text-2xl font-semibold text-[#111111] hover:bg-white"
                >
                  Services
                  <ChevronDown className={cn('h-5 w-5 transition-transform', mobileServices && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {mobileServices && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 pl-4">
                        {SERVICES.map((s) => (
                          <Link
                            key={s.slug}
                            href={s.route}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-base text-[#111111] hover:bg-white"
                          >
                            <span className="h-2 w-2 rounded-full" style={{ background: s.accent }} aria-hidden />
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Link href="/about" className="rounded-2xl border-b border-black/10 px-4 py-4 font-editorial text-2xl font-semibold text-[#111111] hover:bg-white">
                  About
                </Link>
                <Link href="/book-strategy-call" className="rounded-2xl border-b border-black/10 px-4 py-4 font-editorial text-2xl font-semibold text-[#111111] hover:bg-white">
                  Contact
                </Link>

                <div className="mt-auto flex flex-col gap-3 pt-8">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#5D5A54]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F13D32] opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F13D32]" />
                    </span>
                    {site.status}
                  </span>
                  <Link
                    href="/book-strategy-call"
                    className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#F13D32] px-6 py-3 text-base font-semibold text-white"
                  >
                    Book Strategy Call
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
