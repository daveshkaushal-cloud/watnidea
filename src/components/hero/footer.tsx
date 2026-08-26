'use client'

import Link from 'next/link'
import Image from 'next/image'
import { site, SERVICES } from '@/lib/siteContent'

/**
 * Global footer — a charcoal anchor used on every page.
 * Honest brand line: "watNidea — Creative Growth Agency".
 * No "Studio Namma", no "IT Solution · Digital Marketing", no href="#".
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="wn-dark relative z-[70] mt-auto border-t border-white/10 bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 md:py-16">
        {/* Top: logo + brand line + status */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Image
              src="/watnidea-logo-navbar.png"
              alt={`${site.name} — ${site.tagline}`}
              width={160}
              height={28}
              className="h-7 w-auto"
            />
            <p className="mt-4 font-editorial text-lg leading-snug text-white/85">
              {site.tagline}
            </p>
            <p className="mt-2 text-sm text-white/55">{site.longDescription}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/75">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8463A] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E8463A]" />
              </span>
              {site.status}
            </p>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="text-sm">
            <p className="wn-eyebrow mb-4">Services</p>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.route}
                    className="text-white/65 transition-colors hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="text-sm">
            <p className="wn-eyebrow mb-4">Studio</p>
            <ul className="space-y-2.5">
              <li><Link href="/work" className="text-white/65 transition-colors hover:text-white">Work</Link></li>
              <li><Link href="/about" className="text-white/65 transition-colors hover:text-white">About</Link></li>
              <li><Link href="/insights" className="text-white/65 transition-colors hover:text-white">Insights</Link></li>
              <li><Link href="/book-strategy-call" className="text-white/65 transition-colors hover:text-white">Book a Strategy Call</Link></li>
              <li><Link href="/privacy-policy" className="text-white/65 transition-colors hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/65 transition-colors hover:text-white">Terms</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <nav aria-label="Contact" className="text-sm">
            <p className="wn-eyebrow mb-4">Contact</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-white/85 underline-offset-4 transition-colors hover:text-[#E8463A] hover:underline"
                >
                  {site.email}
                </a>
              </li>
              {site.social.instagram ? (
                <li><a href={site.social.instagram} className="text-white/65 transition-colors hover:text-white" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              ) : null}
              {site.social.linkedin ? (
                <li><a href={site.social.linkedin} className="text-white/65 transition-colors hover:text-white" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              ) : null}
              {site.social.behance ? (
                <li><a href={site.social.behance} className="text-white/65 transition-colors hover:text-white" target="_blank" rel="noopener noreferrer">Behance</a></li>
              ) : null}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 pt-6 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>© {year} {site.legalName} · {site.description}</p>
          <p>
            <Link href="/privacy-policy" className="transition-colors hover:text-white/80">Privacy</Link>
            <span className="mx-2">·</span>
            <Link href="/terms" className="transition-colors hover:text-white/80">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
