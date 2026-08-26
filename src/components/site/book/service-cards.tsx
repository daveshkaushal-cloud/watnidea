'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
} from '@/components/site/primitives'
import { SERVICES } from '@/lib/siteContent'

/* ------------------------------------------------------------------ *
 * BookServiceCards — compact grid of all 7 services.
 * Lets visitors explore services before/after booking.
 * Each card: accent dot + name + tagline, links to the service route.
 * ------------------------------------------------------------------ */

export function BookServiceCards() {
  return (
    <Section surface="paper" ariaLabelledBy="explore-services-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel number="03" accent="#F13D32">
              Explore first
            </SectionLabel>
            <Reveal delay={0.08}>
              <EditorialHeading as="h2" id="explore-services-heading" className="mt-5 max-w-[20ch]">
                Not sure where you fit? Browse the seven.
              </EditorialHeading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-xs text-sm text-[#5D5A54]">
              Each one is a different way into the studio. Pick the route that
              feels closest — or send the brief and we’ll figure it out
              together.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={0.2 + i * 0.05}>
              <Link
                href={s.route}
                className="group flex h-full min-h-[150px] flex-col justify-between rounded-[18px] border border-[rgba(16,16,16,0.12)] bg-[#FFFDF8] p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(16,16,16,0.28)]"
                aria-label={`${s.name} — ${s.tagline}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ background: s.accent }}
                      aria-hidden
                    />
                    <span className="wn-caption text-[#5D5A54]">{s.number}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#101010] opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-semibold leading-tight text-[#101010]">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#5D5A54]">{s.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* 8th tile: a "skip the menu" CTA back to the form */}
          <Reveal delay={0.2 + SERVICES.length * 0.05}>
            <a
              href="#book-your-call"
              className="group flex h-full min-h-[150px] flex-col justify-between rounded-[18px] border border-[rgba(16,16,16,0.16)] bg-[#101010] p-5 text-white transition-transform duration-300 hover:-translate-y-1"
              aria-label="Skip exploring — jump back to the brief"
            >
              <div className="flex items-start justify-between">
                <span className="wn-caption text-[rgba(255,255,255,0.66)]">
                  Skip the menu
                </span>
                <ArrowUpRight className="h-4 w-4 text-[#FFC83D] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-semibold leading-tight">
                  Just send the brief
                </h3>
                <p className="mt-1 text-xs text-[rgba(255,255,255,0.66)]">
                  We’ll route you to the right service.
                </p>
              </div>
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
