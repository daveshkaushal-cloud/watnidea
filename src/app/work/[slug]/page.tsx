/**
 * /work/[slug] — dynamic case-study route.
 *
 * Honesty rules (NON-NEGOTIABLE):
 *   - generateStaticParams returns ONLY verified case-study slugs.
 *     Currently empty (no verified case studies in siteContent.ts).
 *   - Unverified concepts are rendered on demand (SSR) when a user
 *     navigates to /work/[slug] for a concept slug — behind an
 *     explicit "Concept exploration" label and with NO fake metrics.
 *   - Verified case studies render Overview, Challenge, Approach,
 *     Deliverables, Visual Work, Verified Outcome sections — sourced
 *     entirely from siteContent.ts.
 *   - NO invented clients, metrics, testimonials, or awards.
 *   - Exactly ONE <h1> on the page: the case-study title.
 *   - Navbar + Footer shared components.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import ConceptVisualAura from '@/components/site/work/concept-visual-aura'
import ConceptVisualDigitalHq from '@/components/site/work/concept-visual-digital-hq'
import {
  CASE_STUDIES,
  SERVICES,
  getCaseStudy,
  site,
  type CaseStudy,
} from '@/lib/siteContent'

/* ------------------------------------------------------------------ *
 * Static params + metadata
 * ------------------------------------------------------------------ */

export function generateStaticParams() {
  // Only verified case studies are pre-rendered.
  return CASE_STUDIES.filter((c) => c.verified).map((c) => ({
    slug: c.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    return {
      title: 'Case Study',
      description: 'watNidea case study.',
      alternates: { canonical: '/work' },
    }
  }

  const title = study.verified
    ? `${study.title} · Case Study`
    : `${study.title} · Concept Exploration`
  const description = study.summary
  const canonical = `/work/${study.slug}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: `${site.url}${canonical}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${site.name}`,
      description,
    },
  }
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function serviceNames(slugs: CaseStudy['services']): string {
  return slugs
    .map((s) => SERVICES.find((svc) => svc.slug === s)?.shortName ?? s)
    .join(' · ')
}

function MetaRow({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="wn-eyebrow text-[var(--wn-muted)]/70">{label}</span>
      <span className="text-sm font-medium text-[var(--wn-body)]">
        {value}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Page sections
 * ------------------------------------------------------------------ */

function CaseStudyShell({
  study,
  children,
}: {
  study: CaseStudy
  children: React.ReactNode
}) {
  return (
    <section className="wn-section px-5 sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Back link */}
        <Link
          href="/work"
          className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[var(--wn-muted)] transition-colors hover:text-[var(--wn-red)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to Work
        </Link>

        {/* Concept / Selected-work label */}
        <div className="mt-8 flex items-center gap-2">
          <span
            aria-hidden
            className={
              'h-1.5 w-1.5 rounded-full ' +
              (study.verified
                ? 'bg-[var(--wn-red)]'
                : 'bg-[var(--wn-amber)]')
            }
          />
          <span
            className={
              'wn-eyebrow ' +
              (study.verified
                ? 'text-[var(--wn-red)]'
                : 'text-[var(--wn-muted)]')
            }
          >
            {study.verified ? 'Selected work' : 'Concept exploration'}
          </span>
        </div>

        {/* ONE h1 — the case study title */}
        <h1 className="mt-4 font-editorial text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.98] tracking-[-0.02em] text-[var(--wn-body)]">
          {study.title}
        </h1>

        {/* Summary */}
        <p className="mt-6 max-w-2xl font-editorial text-lg leading-relaxed text-[var(--wn-muted)] sm:text-xl">
          {study.summary}
        </p>

        {/* Meta grid */}
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-[var(--wn-border-subtle)] py-6 sm:grid-cols-4">
          <MetaRow label="Client" value={study.client} />
          <MetaRow label="Category" value={study.category} />
          <MetaRow label="Practice" value={serviceNames(study.services)} />
          <MetaRow label="Year" value={study.year} />
        </dl>

        {/* Body sections */}
        <div className="mt-12 space-y-16">{children}</div>

        {/* Closing strip */}
        <div className="mt-16 flex flex-col items-start gap-4 border-t border-[var(--wn-border-subtle)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--wn-muted)]">
            {study.verified
              ? 'Verified client work — outcome attributable and signed off.'
              : 'Concept exploration — not a signed-off client project.'}
          </p>
          <Link
            href="/book-strategy-call"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--wn-red)] px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[var(--wn-red-deep)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wn-red)]"
          >
            <span>Start a project</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function BodySection({
  id,
  label,
  title,
  children,
}: {
  id: string
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={id} className="scroll-mt-32">
      <p className="wn-eyebrow text-[var(--wn-red)]">{label}</p>
      <h2
        id={id}
        className="mt-3 font-editorial text-2xl font-medium leading-tight tracking-[-0.01em] text-[var(--wn-body)] sm:text-3xl"
      >
        {title}
      </h2>
      <div className="prose-wn mt-5 max-w-2xl text-base leading-relaxed text-[var(--wn-body)]/85 sm:text-lg">
        {children}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    notFound()
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-clip bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />
      <main className="relative z-10 flex flex-1 flex-col">
        <CaseStudyShell study={study}>
          {/* Overview — always rendered */}
          <BodySection
            id="overview"
            label="01 · Overview"
            title="Overview"
          >
            <p>{study.overview}</p>
          </BodySection>

          {study.verified ? (
            <>
              {/* Challenge */}
              {study.challenge ? (
                <BodySection
                  id="challenge"
                  label="02 · Challenge"
                  title="The challenge"
                >
                  <p>{study.challenge}</p>
                </BodySection>
              ) : null}

              {/* Approach */}
              {study.approach ? (
                <BodySection
                  id="approach"
                  label="03 · Approach"
                  title="The approach"
                >
                  <p>{study.approach}</p>
                </BodySection>
              ) : null}

              {/* Deliverables */}
              {study.deliverables && study.deliverables.length > 0 ? (
                <BodySection
                  id="deliverables"
                  label="04 · Deliverables"
                  title="What we shipped"
                >
                  <ul className="space-y-2">
                    {study.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--wn-red)]"
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </BodySection>
              ) : null}

              {/* Visual work */}
              {study.cover ? (
                <BodySection
                  id="visual-work"
                  label="05 · Visual work"
                  title="Visual work"
                >
                  <img
                    src={study.cover}
                    alt={`Visual work from ${study.title}`}
                    className="mt-2 w-full rounded-2xl border border-[var(--wn-border-strong)]"
                  />
                </BodySection>
              ) : null}

              {/* Verified outcome */}
              {study.outcome ? (
                <BodySection
                  id="outcome"
                  label="06 · Verified outcome"
                  title="Verified outcome"
                >
                  <div className="rounded-2xl border border-[var(--wn-red)]/40 bg-[var(--wn-surface)] p-6 sm:p-8">
                    <p className="font-editorial text-lg leading-relaxed text-[var(--wn-body)] sm:text-xl">
                      {study.outcome}
                    </p>
                  </div>
                </BodySection>
              ) : null}
            </>
          ) : (
            /* Concept exploration — NO fake metrics. */
            <>
              <BodySection
                id="concept-note"
                label="Note"
                title="A note on this concept"
              >
                <p>
                  This is an internal concept exploration, not a signed-off
                  client project. It is shared to show how the studio
                  thinks about identity systems and architecture — not to
                  imply an attributed outcome. When verified client work
                  is added to the registry, it will render here with a
                  Challenge, Approach, Deliverables, Visual Work, and
                  Verified Outcome section.
                </p>
              </BodySection>

              {/* Concept visual — art-directed specimen sheet.
               * 100% CSS/SVG — no images, no stock photos.
               * Rendered ONLY for the two real concept case studies
               * that have a designed visual companion. */}
              {slug === 'aura-brand-system-exploration' && (
                <BodySection
                  id="visual-work"
                  label="02 · Visual work"
                  title="Visual work — concept specimen"
                >
                  <p>
                    A specimen sheet showing how the wordmark, type scale,
                    accent palette and identity tokens behave together
                    across digital surfaces. Art-directed illustration —
                    not a render of a real client engagement.
                  </p>
                  <div className="mt-6">
                    <ConceptVisualAura />
                  </div>
                </BodySection>
              )}

              {slug === 'digital-hq-marketing-site-concept' && (
                <BodySection
                  id="visual-work"
                  label="02 · Visual work"
                  title="Visual work — concept architecture"
                >
                  <p>
                    A mock browser frame containing a simplified
                    marketing-site wireframe — hero block, 3-column
                    feature grid, CTA band — shown at desktop width, then
                    reflowed at mobile width to demonstrate the responsive
                    architecture. Art-directed illustration — not a render
                    of a real client engagement.
                  </p>
                  <div className="mt-6">
                    <ConceptVisualDigitalHq />
                  </div>
                </BodySection>
              )}
            </>
          )}
        </CaseStudyShell>
      </main>
      <SiteFooter />
    </div>
  )
}
