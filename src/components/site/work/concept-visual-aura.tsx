/**
 * ConceptVisualAura — art-directed brand-system specimen visual.
 *
 * Rendered inside the "Visual work" body section of the
 * `aura-brand-system-exploration` case study.
 *
 * Composition (all CSS/SVG — NO images, NO stock photos):
 *   - Outer specimen card (paper bg, halftone, corner tape, sticker)
 *   - Wordmark row — "watNidea" in Fraunces with red N + baseline rule
 *   - Split row:
 *       · Type-scale ladder (4 sizes of the sample word "Idea")
 *       · Accent-colour swatch row (red / coral / ink / paper)
 *   - Identity tokens grid (6 CSS-shape logo lockup variants)
 *
 * Honesty:
 *   - Explicit "Concept exploration" sticker + footer label.
 *   - NO invented clients, NO outcomes, NO metrics.
 *
 * Accessibility:
 *   - Decorative SVG / halftone / watermarks carry `aria-hidden`.
 *   - The whole visual is a `figure` with a single accessible caption.
 *
 * Responsive: 375 / 768 / 1024 / 1440. No horizontal overflow.
 */
import type { ReactNode } from 'react'
import { Reveal, Sticker } from '@/components/site/primitives'

/* ---- Tokens (mirror siteTokens so this file is self-contained) ---- */
const RED = '#F13D32'
const CORAL = '#FF6B62'
const INK = '#101010'
const PAPER = '#F7F2E8'
const SAND = '#EAE0D1'
const MUTED = '#5D5A54'

/* ---- Shared specimen frame (matches concept-visual-digital-hq) ---- */
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
      {/* Halftone overlay (decorative) */}
      <span aria-hidden className="pointer-events-none absolute inset-0 wn-halftone opacity-[0.18]" />
      {/* Corner tape (decorative) */}
      <span
        aria-hidden
        className="wn-tape"
        style={{ top: '-8px', left: '24px', transform: 'rotate(-3deg)' }}
      />
      {/* Header strip */}
      <figcaption
        className="relative flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(16,16,16,0.12)] px-5 py-3 sm:px-7"
      >
        <span className="wn-caption" style={{ color: MUTED }}>
          {issueLabel}
        </span>
        <Sticker accent={INK} textColor={RED} tilt="right" style={{ fontSize: '0.62rem' }}>
          Concept exploration
        </Sticker>
      </figcaption>

      {/* Body */}
      <div className="relative px-5 py-6 sm:px-7 sm:py-8">{children}</div>

      {/* Honesty footer */}
      <div className="relative border-t border-[rgba(16,16,16,0.12)] px-5 py-3 sm:px-7">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: RED }}>
          Concept exploration — not client work
        </p>
      </div>
    </figure>
  )
}

/* ---- Tiny "registration mark" SVG used as a corner flourish ---- */
function RegMark({ color = INK }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden focusable="false">
      <circle cx="7" cy="7" r="6" fill="none" stroke={color} strokeWidth="1" opacity="0.45" />
      <path d="M7 1 V13 M1 7 H13" stroke={color} strokeWidth="1" opacity="0.45" />
      <circle cx="7" cy="7" r="1.4" fill={color} />
    </svg>
  )
}

/* ---- Type-scale ladder: 4 sizes of the sample word "Idea" ---- */
const TYPE_LADDER = [
  { label: 'Display', size: 'clamp(2.5rem, 7vw, 3.75rem)', weight: 500, tracking: '-0.02em' },
  { label: 'Headline', size: 'clamp(1.75rem, 4vw, 2.25rem)', weight: 500, tracking: '-0.01em' },
  { label: 'Subhead', size: 'clamp(1.15rem, 2.5vw, 1.4rem)', weight: 600, tracking: '0' },
  { label: 'Body', size: 'clamp(0.95rem, 1.6vw, 1.05rem)', weight: 400, tracking: '0' },
]

/* ---- Swatch row ---- */
const SWATCHES = [
  { name: 'Signal', hex: RED, isLight: false },
  { name: 'Coral', hex: CORAL, isLight: true },
  { name: 'Ink', hex: INK, isLight: false },
  { name: 'Paper', hex: PAPER, isLight: true },
]

/* ---- Identity tokens — 6 logo lockup variants drawn as CSS shapes ---- */
type Token = {
  id: string
  label: string
  render: ReactNode
}

function MonogramMark({ color = INK, bg = SAND }: { color?: string; bg?: string }) {
  return (
    <span
      className="flex h-9 w-9 items-center justify-center rounded-[6px] font-editorial text-lg font-bold"
      style={{ background: bg, color, letterSpacing: '-0.05em' }}
      aria-hidden
    >
      wN
    </span>
  )
}

const TOKENS: Token[] = [
  {
    id: 'monogram',
    label: 'Monogram',
    render: <MonogramMark color="#FFFFFF" bg={INK} />,
  },
  {
    id: 'horizontal',
    label: 'Horizontal lockup',
    render: (
      <span className="flex items-center gap-2" aria-hidden>
        <MonogramMark />
        <span className="font-editorial text-sm font-semibold tracking-tight" style={{ color: INK }}>
          wat<span style={{ color: RED }}>N</span>idea
        </span>
      </span>
    ),
  },
  {
    id: 'stacked',
    label: 'Stacked lockup',
    render: (
      <span className="flex flex-col items-center gap-1" aria-hidden>
        <MonogramMark />
        <span className="font-editorial text-[0.7rem] font-semibold uppercase tracking-[0.2em]" style={{ color: INK }}>
          wat<span style={{ color: RED }}>N</span>idea
        </span>
      </span>
    ),
  },
  {
    id: 'mark-only',
    label: 'Mark only',
    render: (
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-full"
        style={{ background: RED }}
      >
        <span className="font-editorial text-base font-bold text-white">N</span>
      </span>
    ),
  },
  {
    id: 'inverted',
    label: 'Inverted',
    render: (
      <span className="flex items-center gap-2" aria-hidden>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-[6px] font-editorial text-lg font-bold"
          style={{ background: PAPER, color: INK, border: `1.5px solid ${INK}` }}
        >
          wN
        </span>
        <span className="font-editorial text-sm font-semibold tracking-tight text-white">
          wat<span style={{ color: CORAL }}>N</span>idea
        </span>
      </span>
    ),
  },
  {
    id: 'mono',
    label: 'Monochrome',
    render: (
      <span className="flex items-center gap-2" aria-hidden>
        <MonogramMark color={INK} bg={INK} />
        <span
          className="font-editorial text-sm font-semibold tracking-tight"
          style={{ color: 'transparent', WebkitTextStroke: `1px ${INK}` }}
        >
          watNidea
        </span>
      </span>
    ),
  },
]

/* ---- Component ---- */
export function ConceptVisualAura() {
  return (
    <Reveal>
      <SpecimenFrame issueLabel="Brand system specimen · Aura · Studio concept">
        {/* ---- Wordmark row ---- */}
        <div className="relative">
          {/* Big reg marks top-right corner (decorative) */}
          <span className="absolute right-0 top-0 flex gap-1.5" aria-hidden>
            <RegMark color={INK} />
            <RegMark color={RED} />
          </span>

          <p className="wn-caption" style={{ color: MUTED }}>
            Wordmark
          </p>
          <div
            className="mt-2 font-editorial font-medium leading-none tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.75rem, 10vw, 4.5rem)', color: INK }}
            aria-label="watNidea wordmark — N in signal red"
          >
            wat<span style={{ color: RED }}>N</span>idea
          </div>
          {/* Baseline rule with tick marks (decorative) */}
          <svg
            aria-hidden
            className="mt-3 h-3 w-full"
            viewBox="0 0 400 12"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="6" x2="400" y2="6" stroke={INK} strokeWidth="1.5" opacity="0.35" />
            {[0, 100, 200, 300, 400].map((x) => (
              <line key={x} x1={x} y1="2" x2={x} y2="10" stroke={INK} strokeWidth="1" opacity="0.55" />
            ))}
          </svg>
        </div>

        {/* ---- Split row: type-scale ladder + swatch row ---- */}
        <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {/* Type-scale ladder */}
          <div>
            <p className="wn-caption" style={{ color: MUTED }}>
              Type scale · Fraunces
            </p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {TYPE_LADDER.map((t) => (
                <li key={t.label} className="flex items-baseline gap-3">
                  <span
                    className="font-editorial leading-none"
                    style={{
                      fontSize: t.size,
                      fontWeight: t.weight,
                      letterSpacing: t.tracking,
                      color: INK,
                    }}
                  >
                    Idea
                  </span>
                  <span className="wn-caption mt-1" style={{ color: MUTED, opacity: 0.85 }}>
                    {t.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Swatch row */}
          <div>
            <p className="wn-caption" style={{ color: MUTED }}>
              Accent palette
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2.5">
              {SWATCHES.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center gap-2.5 rounded-[10px] border border-[rgba(16,16,16,0.10)] bg-[rgba(255,253,248,0.6)] p-2"
                >
                  <span
                    aria-hidden
                    className="h-9 w-9 shrink-0 rounded-[6px]"
                    style={{
                      background: s.hex,
                      boxShadow: 'inset 0 0 0 1px rgba(16,16,16,0.10)',
                    }}
                  />
                  <span className="flex flex-col leading-tight">
                    <span className="text-xs font-semibold" style={{ color: INK }}>
                      {s.name}
                    </span>
                    <span className="text-[0.62rem] font-medium" style={{ color: MUTED }}>
                      {s.hex}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Identity tokens grid ---- */}
        <div className="mt-7">
          <p className="wn-caption" style={{ color: MUTED }}>
            Identity tokens · lockup variants
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {TOKENS.map((tk) => (
              <li
                key={tk.id}
                className="flex min-h-[78px] flex-col items-center justify-center gap-2 rounded-[12px] border border-[rgba(16,16,16,0.10)] p-3"
                style={{ background: tk.id === 'inverted' ? INK : '#FFFDF8' }}
              >
                {tk.render}
                <span
                  className="text-[0.6rem] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: tk.id === 'inverted' ? 'rgba(255,255,255,0.7)' : MUTED }}
                >
                  {tk.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Footer rule with caption ---- */}
        <div className="mt-7 flex items-center justify-between gap-4 border-t border-[rgba(16,16,16,0.12)] pt-4">
          <span className="wn-caption" style={{ color: MUTED }}>
            Specimen sheet · structure only
          </span>
          <span className="flex items-center gap-1.5" aria-hidden>
            <RegMark color={INK} />
            <RegMark color={RED} />
          </span>
        </div>
      </SpecimenFrame>
    </Reveal>
  )
}

export default ConceptVisualAura
