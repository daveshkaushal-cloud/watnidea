'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from 'lucide-react'
import { site, SERVICES } from '@/lib/siteContent'

const MAPS_URL =
  'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwiQwOKQ3MCWAxUAAAAAHQAAAAAQCg..i&mstk=AUtExfDta55YsPbneSruIkc1Asce1Qz1tO6UQFTr-LVtWK9ULeX98u_eCF6ygpPkX0TKidYdT2PwANxEWWu4zx5qjRITaaxy97yQf6RTurirGDKwutTe5dIJctV_5DV_fooGXZTgc5zA426uPKJfSkbOqxQGb_0sDQDdT8yQvOGFIMhz3Tc&pvq=Cg0vZy8xMXl3XzNxeXhogAEBkAEB&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x390cef19454659d3:0xe66134d0fd05605d'

const ADDRESS =
  '2nd Floor, G-283, G Block, Sector 63, Noida, Chotpur, Uttar Pradesh 201309'

const EMAIL = 'info@watnidea.com'

const INSTAGRAM_URL = 'https://www.instagram.com/watnidea/'
const LINKEDIN_URL = 'https://www.linkedin.com/company/watnidea/'

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="wn-grain-paper border-t border-[rgba(17,17,17,0.10)] bg-[#FFF7E9] text-[#111111]">
      {/* Marquee strip */}
      <div className="wn-marquee border-b border-[rgba(17,17,17,0.10)] py-5">
        <div className="wn-marquee__track font-editorial text-2xl font-medium tracking-tight sm:text-3xl">
          {[0, 1].map((dup) => (
            <span
              key={dup}
              className="flex items-center gap-10"
              aria-hidden={dup === 1}
            >
              {SERVICES.map((service) => (
                <span
                  key={service.slug}
                  className="flex items-center gap-10"
                >
                  <Link
                    href={service.route}
                    className="hover:text-[#F13D32]"
                  >
                    {service.name}
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
          {/* Brand and contact details */}
          <div className="md:col-span-5">
            <Link href="/" aria-label={`${site.name} home`}>
              <Image
                src="/watnidea-logo-original.png"
                alt={`${site.name} logo`}
                width={200}
                height={49}
                className="h-[40px] w-auto"
                loading="lazy"
              />
            </Link>

            <p className="mt-3 max-w-sm font-editorial text-xl leading-snug text-[#111111]">
              {site.tagline}
            </p>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#5D5A54]">
              {site.longDescription}
            </p>

            {/* Address */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex max-w-md items-start gap-3 text-sm leading-relaxed text-[#5D5A54] transition-colors hover:text-[#F13D32]"
              aria-label="Open watNidea location in Google Maps"
            >
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-[#F13D32]"
                aria-hidden
              />

              <span>{ADDRESS}</span>
            </a>

            {/* Email and Instagram */}
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[rgba(17,17,17,0.15)] bg-white px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-[#F13D32] hover:text-[#F13D32]"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {EMAIL}
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[rgba(17,17,17,0.15)] bg-white px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-[#F13D32] hover:text-[#F13D32]"
                aria-label="Follow watNidea on Instagram"
              >
                <Instagram className="h-4 w-4" aria-hidden />
                
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[rgba(17,17,17,0.15)] bg-white px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-[#F13D32] hover:text-[#F13D32]"
                aria-label="Follow watNidea on LinkedIn"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
              </a>
            </div>

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
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.route}
                    className="text-[#111111] transition-colors hover:text-[#F13D32]"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Studio */}
          <nav aria-label="Studio" className="md:col-span-2">
            <p className="wn-caption mb-4">Studio</p>

            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/work"
                  className="hover:text-[#F13D32]"
                >
                  Work
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-[#F13D32]"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/book-strategy-call"
                  className="hover:text-[#F13D32]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal" className="md:col-span-2">
            <p className="wn-caption mb-4">Legal</p>

            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[#F13D32]"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#F13D32]"
                >
                  Terms
                </Link>
              </li>

              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-1 hover:text-[#F13D32]"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  Email us
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[rgba(17,17,17,0.10)] pt-6 text-xs text-[#5D5A54] sm:flex-row sm:items-center">
          <p>
            © {year} {site.legalName} · {site.description}
          </p>

          <p className="inline-flex items-center gap-1">
            Made by watNidea Creative Studio
            <ArrowUpRight className="h-3 w-3" aria-hidden />
          </p>
        </div>
      </div>
    </footer>
  )
}