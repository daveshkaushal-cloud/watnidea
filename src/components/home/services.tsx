'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
  Eyebrow,
  SectionHeading,
  SectionShell,
} from './primitives'
import { Reveal } from './motion'
import { SERVICES, type ServiceEntry } from '@/lib/siteContent'

/* ------------------------------------------------------------------ *
 * Section 4 — Seven services (WARM-WHITE)
 *
 * Clean editorial grid of the 7 services from `SERVICES`.
 * Each card is a real <Link> to its route (e.g. /aura-architecture).
 * Card shows: number, accent dot, name, tagline. Distinct but
 * consistent.
 * ------------------------------------------------------------------ */

function ServiceCard({ service, index }: { service: ServiceEntry; index: number }) {
  return (
    <Reveal delay={Math.min(0.05 * index, 0.25)} as="div">
      <Link
        href={service.route}
        className="group relative flex h-full flex-col gap-4 rounded-2xl border border-[var(--wn-border-subtle)] bg-[var(--wn-surface)] p-6 transition-colors duration-200 hover:border-[var(--wn-border-strong)] hover:bg-[var(--wn-surface-2)]"
      >
        {/* Top row: number + accent dot */}
        <div className="flex items-center justify-between">
          <span className="font-editorial text-2xl font-medium text-[var(--wn-muted)]">
            {service.number}
          </span>
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: service.accent }}
          />
        </div>

        {/* Name + tagline */}
        <div>
          <h3 className="font-editorial text-xl font-medium leading-snug text-[var(--wn-body)]">
            {service.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--wn-muted)]">
            {service.tagline}
          </p>
        </div>

        {/* Footer: short name + arrow */}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-medium uppercase tracking-wider text-[var(--wn-body)]/70">
          {service.shortName}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </Reveal>
  )
}

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="wn-section bg-[var(--wn-warm-white)]"
    >
      <SectionShell>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>What we build</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeading id="services-heading" className="mt-4">
              Seven services.{' '}
              <span className="text-[var(--wn-muted)]">
                One creative direction.
              </span>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-[var(--wn-muted)]">
              Each service stands on its own — and each one is built to
              connect to the next, so the brand stays coherent across
              identity, site, content and growth.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <li key={s.slug} className="flex">
              <div className="w-full">
                <ServiceCard service={s} index={i} />
              </div>
            </li>
          ))}
        </ul>
      </SectionShell>
    </section>
  )
}
