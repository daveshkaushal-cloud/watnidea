'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, ArrowUpRight } from 'lucide-react'
import { site, SERVICES } from '@/lib/siteContent'

/**
 * SiteFooter — the ONE shared footer for every page.
 * Paper background, ink text, marquee of services, columns of links.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="wn-grain-paper border-t border-[rgba(17,17,17,0.10)] bg-[#FFF7E9] text-[#111111]">
      {/* Marquee strip */}
      <div className="wn-marquee border-b border-[rgba(17,17,17,0.10)] py-5">
        <div className="wn-marquee__track font-editorial text-2xl font-medium tracking-tight sm:text-3xl">
          {[0, 1].map((dup) => (
            <span key={dup} className="flex items-center gap-10" aria-hidden={dup === 1}>
              {SERVICES.map((s) => (
                <span key={s.slug} className="flex items-center gap-10">
                  <Link href={s.route} className="hover:text-[#F13D32]">
                    {s.name}
                  </Link>
                  <span className="text-[#F13D32]">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" aria-label={`${site.name} home`}>
              <Image
                src="/watnidea-logo-navbar.png"
                alt={`${site.name} logo`}
                width={180}
                height={31}
                className="h-[28px] w-auto sm:h-[31px]"
              />
            </Link>
            <p className="mt-3 max-w-sm font-editorial text-xl leading-snug text-[#111111]">
              {site.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm text-[#5D5A54]">
              {site.longDescription}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(17,17,17,0.16)] bg-white px-3 py-1.5 text-xs font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F13D32] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F13D32]" />
              </span>
              {site.status}
            </span>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="md:col-span-3">
            <p className="wn-caption mb-4">Services</p>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={s.route} className="text-[#111111] transition-colors hover:text-[#F13D32]">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Studio */}
          <nav aria-label="Studio" className="md:col-span-2">
            <p className="wn-caption mb-4">Studio</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/work" className="hover:text-[#F13D32]">Work</Link></li>
              <li><Link href="/about" className="hover:text-[#F13D32]">About</Link></li>
              <li><Link href="/book-strategy-call" className="hover:text-[#F13D32]">Contact</Link></li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal" className="md:col-span-2">
            <p className="wn-caption mb-4">Legal</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-[#F13D32]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#F13D32]">Terms</Link></li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1 hover:text-[#F13D32]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email us
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[rgba(17,17,17,0.10)] pt-6 text-xs text-[#5D5A54] sm:flex-row sm:items-center">
          <p>© {year} {site.legalName} · {site.description}</p>
          <p className="inline-flex items-center gap-1">
            Made by watNidea Creative Studio
            <ArrowUpRight className="h-3 w-3" />
          </p>
        </div>
      </div>
    </footer>
  )
}
