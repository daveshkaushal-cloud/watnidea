'use client'

import { Check } from 'lucide-react'
import { Eyebrow, SectionHeading, SectionShell } from './primitives'
import { Reveal } from './motion'
import { CAPABILITIES, getVerifiedMetrics } from '@/lib/siteContent'

/* ------------------------------------------------------------------ *
 * Section 6 — Capabilities / real proof (CREAM)
 *
 * Lists `CAPABILITIES` from siteContent + `getVerifiedMetrics()`.
 * Metric VALUES are rendered as final strings directly in the HTML
 * — never animated 0→number. No invented stats.
 * ------------------------------------------------------------------ */

export function CapabilitiesSection() {
  const metrics = getVerifiedMetrics()

  return (
    <section
      aria-labelledby="capabilities-heading"
      className="wn-section bg-[var(--wn-cream)]"
    >
      <SectionShell>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left — heading + metrics */}
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Real proof</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="capabilities-heading" className="mt-4">
                What we can do,{' '}
                <span className="text-[var(--wn-muted)]">today.</span>
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-[var(--wn-muted)]">
                Honest numbers only. No vanity metrics, no fabricated
                client outcomes, no inflated headcount. When we have a
                verified result to share, it lives here — and on the
                relevant case study.
              </p>
            </Reveal>

            {/* Metrics — final values rendered directly, no count-up */}
            {metrics.length > 0 ? (
              <Reveal delay={0.15}>
                <dl className="mt-10 grid grid-cols-2 gap-6">
                  {metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-[var(--wn-border-subtle)] bg-[var(--wn-surface)] p-6"
                    >
                      <dt className="sr-only">{m.label}</dt>
                      <dd>
                        <span className="font-editorial text-5xl font-medium leading-none text-[var(--wn-body)]">
                          {m.value}
                        </span>
                        <p className="mt-3 text-sm leading-snug text-[var(--wn-muted)]">
                          {m.label}
                        </p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}
          </div>

          {/* Right — capabilities checklist */}
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {CAPABILITIES.map((cap) => (
                  <li
                    key={cap.title}
                    className="flex items-start gap-3 rounded-xl border border-[var(--wn-border-subtle)] bg-[var(--wn-surface)] p-4 sm:p-5"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--wn-red)]/10 text-[var(--wn-red)]"
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <div>
                      <h3 className="text-sm font-medium text-[var(--wn-body)]">
                        {cap.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--wn-muted)]">
                        {cap.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </SectionShell>
    </section>
  )
}
