/**
 * ConceptVisualDigitalHQ — art-directed marketing-site architecture visual.
 *
 * Rendered inside the "Visual work" body section of the
 * `digital-hq-marketing-site-concept` case study.
 *
 * Composition (all CSS/SVG — NO images, NO stock photos):
 *   - Outer specimen card (paper bg, halftone, corner tape, sticker)
 *   - Desktop browser frame (chrome + address bar) containing a
 *     simplified marketing-site wireframe: hero block, 3-column feature
 *     grid, CTA band.
 *   - Mobile browser frame showing the SAME layout reflowed at single
 *     column width — demonstrating responsive architecture.
 *
 * Honesty:
 *   - Explicit "Concept exploration" sticker + footer label.
 *   - NO invented clients, NO outcomes, NO traffic / ROAS / revenue
 *     numbers anywhere. All wireframe labels are structural ("Hero",
 *     "Feature 01", "CTA band"), not metric claims.
 *
 * Accessibility:
 *   - Decorative SVG / chrome / watermarks carry `aria-hidden`.
 *   - The whole visual is a `figure` with an accessible caption.
 *
 * Responsive: 375 / 768 / 1024 / 1440. No horizontal overflow.
 */
import type { ReactNode } from 'react'
import { Reveal, Sticker } from '@/components/site/primitives'

/* ---- Tokens (mirror siteTokens so this file is self-contained) ---- */
const BLUE = '#3D5AFE'
const INK = '#101010'
const PAPER = '#F7F2E8'
const SAND = '#EAE0D1'
const MUTED = '#5D5A54'

/* ---- Shared specimen frame (matches concept-visual-aura) ---- */
function SpecimenFrame({
  issueLabel,
  children,
}: {
  issueLabel: string
  children: ReactNode
}) {
  return (
    <figure
      className="relative w-full overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.18)] bg-[#F7F2E8] text-[#101010]"
      style={{ boxShadow: '0 1px 0 rgba(16,16,16,0.04), 0 14px 36px -20px rgba(16,16,16,0.28)' }}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 wn-halftone opacity-[0.18]" />
      {/* Corner tape (decorative) */}
      <span
        aria-hidden
        className="wn-tape"
        style={{ top: '-8px', left: '24px', transform: 'rotate(-3deg)', background: 'rgba(61,90,254,0.85)' }}
      />
      {/* Header strip */}
      <figcaption
        className="relative flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(16,16,16,0.12)] px-5 py-3 sm:px-7"
      >
        <span className="wn-caption" style={{ color: MUTED }}>
          {issueLabel}
        </span>
        <Sticker accent={INK} textColor={BLUE} tilt="right" style={{ fontSize: '0.62rem' }}>
          Concept exploration
        </Sticker>
      </figcaption>

      {/* Body */}
      <div className="relative px-5 py-6 sm:px-7 sm:py-8">{children}</div>

      {/* Honesty footer */}
      <div className="relative border-t border-[rgba(16,16,16,0.12)] px-5 py-3 sm:px-7">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: BLUE }}>
          Concept exploration — not client work
        </p>
      </div>
    </figure>
  )
}

/* ---- Browser chrome (decorative top bar) ---- */
function BrowserChrome({ url = 'concept.watnidea.com' }: { url?: string }) {
  return (
    <div
      aria-hidden
      className="flex items-center gap-2 border-b border-[rgba(16,16,16,0.10)] bg-[#FFFDF8] px-3 py-2"
    >
      <span className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#FF6B62' }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#FFC83D' }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#66DFC0' }} />
      </span>
      <span
        className="ml-1 flex-1 truncate rounded-[6px] border border-[rgba(16,16,16,0.10)] bg-[#F7F2E8] px-2 py-1 text-[0.6rem] font-medium"
        style={{ color: MUTED }}
      >
        {url}
      </span>
    </div>
  )
}

/* ---- Wireframe primitives (structural labels only, NO metrics) ---- */
function HeroBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[8px] border border-[rgba(16,16,16,0.10)] bg-[#FFFDF8] p-3">
      <span aria-hidden className="pointer-events-none absolute inset-0 wn-halftone opacity-[0.10]" />
      <div className="relative">
        <div
          className="rounded-[3px]"
          style={{
            height: compact ? 8 : 10,
            width: '12%',
            background: BLUE,
            marginBottom: 6,
          }}
        />
        <div
          className="rounded-[3px]"
          style={{ height: compact ? 12 : 16, width: '78%', background: INK, marginBottom: 4 }}
        />
        <div
          className="rounded-[3px]"
          style={{ height: compact ? 12 : 16, width: '58%', background: INK, marginBottom: 8 }}
        />
        <div className="flex items-center gap-2">
          <div
            className="rounded-full"
            style={{
              height: compact ? 14 : 18,
              width: compact ? 50 : 70,
              background: BLUE,
            }}
          />
          <div
            className="rounded-[3px]"
            style={{
              height: compact ? 8 : 10,
              width: compact ? 36 : 48,
              background: 'rgba(16,16,16,0.20)',
            }}
          />
        </div>
      </div>
      <span className="absolute right-2 top-2 text-[0.55rem] font-semibold uppercase tracking-[0.16em]" style={{ color: MUTED, opacity: 0.7 }}>
        Hero
      </span>
    </div>
  )
}

function FeatureCard({ index }: { index: number }) {
  return (
    <div className="relative overflow-hidden rounded-[8px] border border-[rgba(16,16,16,0.10)] bg-[#FFFDF8] p-2.5">
      <div
        className="rounded-[3px]"
        style={{ height: 16, width: '32%', background: BLUE, marginBottom: 6, opacity: 0.85 }}
      />
      <div
        className="rounded-[3px]"
        style={{ height: 8, width: '88%', background: INK, marginBottom: 3 }}
      />
      <div
        className="rounded-[3px]"
        style={{ height: 6, width: '70%', background: 'rgba(16,16,16,0.30)', marginBottom: 2 }}
      />
      <div
        className="rounded-[3px]"
        style={{ height: 6, width: '60%', background: 'rgba(16,16,16,0.20)' }}
      />
      <span className="absolute right-1.5 top-1.5 font-editorial text-[0.7rem] font-bold" style={{ color: BLUE, opacity: 0.7 }}>
        0{index}
      </span>
    </div>
  )
}

function FeatureRow({ columns = 3 }: { columns?: 1 | 2 | 3 }) {
  return (
    <div
      className={
        columns === 1
          ? 'grid grid-cols-1 gap-2'
          : columns === 2
            ? 'grid grid-cols-2 gap-2'
            : 'grid grid-cols-3 gap-2'
      }
    >
      {[1, 2, 3].slice(0, columns).map((i) => (
        <FeatureCard key={i} index={i} />
      ))}
    </div>
  )
}

function CtaBand() {
  return (
    <div
      className="relative overflow-hidden rounded-[8px] p-3"
      style={{ background: BLUE }}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 wn-halftone-light opacity-[0.20]" />
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="rounded-[3px]" style={{ height: 10, width: '46%', background: '#FFFFFF', marginBottom: 4 }} />
          <div className="rounded-[3px]" style={{ height: 6, width: '32%', background: 'rgba(255,255,255,0.55)' }} />
        </div>
        <div
          className="rounded-full"
          style={{ height: 22, width: 64, background: '#FFFFFF' }}
        />
      </div>
      <span className="absolute right-2 top-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-white opacity-80">
        CTA band
      </span>
    </div>
  )
}

/* ---- Desktop browser frame ---- */
function DesktopFrame() {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="wn-caption" style={{ color: MUTED }}>
          Desktop · 12-col
        </p>
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em]" style={{ color: BLUE }}>
          ≥ 1024px
        </span>
      </div>
      <div
        className="mt-2 overflow-hidden rounded-[12px] border border-[rgba(16,16,16,0.18)] bg-[#F7F2E8]"
        style={{ boxShadow: '0 8px 24px -14px rgba(16,16,16,0.22)' }}
      >
        <BrowserChrome url="concept.watnidea.com" />
        <div className="space-y-3 bg-[#F7F2E8] p-3 sm:p-4">
          <HeroBlock />
          <FeatureRow columns={3} />
          <CtaBand />
        </div>
      </div>
    </div>
  )
}

/* ---- Mobile browser frame (same content, single column) ---- */
function MobileFrame() {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="wn-caption" style={{ color: MUTED }}>
          Mobile · 1-col reflow
        </p>
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em]" style={{ color: BLUE }}>
          &lt; 640px
        </span>
      </div>
      <div className="mt-2 flex justify-center">
        {/* Phone shell — narrow */}
        <div
          className="w-full max-w-[260px] overflow-hidden rounded-[18px] border border-[rgba(16,16,16,0.22)] bg-[#F7F2E8]"
          style={{ boxShadow: '0 8px 24px -14px rgba(16,16,16,0.30)' }}
        >
          <BrowserChrome url="concept.watnidea.com" />
          <div className="space-y-2.5 bg-[#F7F2E8] p-2.5">
            <HeroBlock compact />
            <FeatureRow columns={1} />
            <CtaBand />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- Component ---- */
export function ConceptVisualDigitalHq() {
  return (
    <Reveal>
      <SpecimenFrame issueLabel="Marketing site architecture · Digital HQ · Studio concept">
        {/* Desktop */}
        <DesktopFrame />

        {/* Responsive flow arrow (decorative) */}
        <div className="my-5 flex items-center justify-center gap-2" aria-hidden>
          <span className="h-px w-12" style={{ background: 'rgba(16,16,16,0.20)' }} />
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M2 7 H12 M8 3 L12 7 L8 11" fill="none" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em]" style={{ color: MUTED }}>
            Same system · reflows
          </span>
          <span className="h-px w-12" style={{ background: 'rgba(16,16,16,0.20)' }} />
        </div>

        {/* Mobile */}
        <MobileFrame />

        {/* Architecture note */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(16,16,16,0.12)] pt-4">
          <p className="max-w-md text-xs leading-relaxed" style={{ color: MUTED }}>
            One component system — hero, feature grid, CTA band — reflowed
            from a 12-column desktop grid into a single mobile column. No
            duplicated templates. Structural labels only.
          </p>
          <span className="flex items-center gap-2" aria-hidden>
            <span className="h-2 w-2 rounded-full" style={{ background: BLUE }} />
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em]" style={{ color: MUTED }}>
              Component-driven
            </span>
          </span>
        </div>
      </SpecimenFrame>
    </Reveal>
  )
}

export default ConceptVisualDigitalHq
