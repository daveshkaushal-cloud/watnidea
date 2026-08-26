'use client'

import { Eyebrow, SectionHeading, SectionShell } from './primitives'
import { Reveal } from './motion'

/* ------------------------------------------------------------------ *
 * Section 5 — How watNidea works (SAND)
 *
 * 4-step process: Listen → Define → Make → Grow.
 * Honest, no fake metrics, no invented client numbers.
 * ------------------------------------------------------------------ */

type Step = {
  n: string
  title: string
  body: string
  accent: string
}

const steps: Step[] = [
  {
    n: '01',
    title: 'Listen',
    body:
      'We start with the brief, the market, the audience and the data — then pressure-test it against what we actually hear. No assumptions dressed up as strategy.',
    accent: 'var(--wn-amber)',
  },
  {
    n: '02',
    title: 'Define',
    body:
      'Positioning, narrative, identity and the success criteria — written down before any pixel is moved. Everyone knows what we are making and why.',
    accent: 'var(--wn-blue)',
  },
  {
    n: '03',
    title: 'Make',
    body:
      'Identity, site, content and campaigns — designed and shipped by the same team that defined them, so the work stays on-strategy from week one.',
    accent: 'var(--wn-red)',
  },
  {
    n: '04',
    title: 'Grow',
    body:
      'Performance media, analytics and content engines — set up as a system you can measure, optimise and scale, not a one-shot launch.',
    accent: 'var(--wn-teal)',
  },
]

export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="wn-section bg-[var(--wn-sand)]"
    >
      <SectionShell>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>How watNidea works</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeading id="process-heading" className="mt-4">
              A short, honest process.{' '}
              <span className="text-[var(--wn-muted)]">
                No 12-phase decks.
              </span>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-[var(--wn-muted)]">
              Four steps. The same team owns all four — so the strategy
              you approve is the strategy that ships, and the system
              that launches is the one that gets measured.
            </p>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.n}>
              <Reveal delay={Math.min(0.05 * i, 0.2)} as="div">
                <article className="flex h-full flex-col gap-4 rounded-2xl border border-[var(--wn-border-subtle)] bg-[var(--wn-surface)] p-6">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: step.accent }}
                    />
                    <span className="font-editorial text-sm font-medium tracking-wide text-[var(--wn-muted)]">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl font-medium leading-snug text-[var(--wn-body)]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--wn-muted)]">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </SectionShell>
    </section>
  )
}
