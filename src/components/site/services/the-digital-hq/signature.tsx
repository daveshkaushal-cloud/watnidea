'use client'

/* ------------------------------------------------------------------ *
 * DhqSignature — Studio signature for /the-digital-hq
 *
 * Inserted between deliverables (sand) and process (ink).
 * Surface = white (clean spec-sheet pause).
 *
 * Visual: a responsive interface/grid demonstration.
 *   - 3 stacked browser frames: Mobile (375) / Tablet (768) /
 *     Desktop (1440), each a simplified wireframe of the SAME layout.
 *   - Header bar, hero block, card grid (1/2/3 cols), footer bar.
 *   - Electric-blue accent on chrome + hero block.
 *
 * Lightweight: pure CSS wireframes. No images, no canvas.
 * Honest: same layout reflowing — proves the studio understands
 * responsive systems. NO fake metrics.
 * ------------------------------------------------------------------ */

import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Underline,
} from '@/components/site/primitives'

type Frame = {
  label: string
  width: string
  vp: string
  cols: 1 | 2 | 3
}

const FRAMES: Frame[] = [
  { label: 'Mobile', width: '375px', vp: 'sm', cols: 1 },
  { label: 'Tablet', width: '768px', vp: 'md', cols: 2 },
  { label: 'Desktop', width: '1440px', vp: 'lg', cols: 3 },
]

const COLS_CLASS: Record<1 | 2 | 3, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
}

function Wireframe({ cols }: { cols: 1 | 2 | 3 }) {
  return (
    <div className="space-y-2 p-3" aria-hidden>
      {/* Header bar — logo + 3 nav lines */}
      <div className="flex items-center justify-between">
        <div className="h-2 w-10 rounded-full bg-[#3D5AFE]" />
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-2 w-5 rounded-full bg-[rgba(16,16,16,0.18)]" />
          ))}
        </div>
      </div>
      {/* Hero block */}
      <div className="h-12 rounded-md bg-[rgba(61,90,254,0.16)] sm:h-14" />
      {/* Card grid */}
      <div className={`grid gap-2 ${COLS_CLASS[cols]}`}>
        {Array.from({ length: cols * 2 }).map((_, i) => (
          <div key={i} className="h-8 rounded-md bg-[rgba(16,16,16,0.07)]" />
        ))}
      </div>
      {/* Footer bar */}
      <div className="h-2.5 rounded-full bg-[rgba(16,16,16,0.12)]" />
    </div>
  )
}

export function DhqSignature() {
  return (
    <Section surface="white" ariaLabelledBy="dhq-signature-heading">
      <Container>
        <SectionLabel accent="#3D5AFE">Studio signature · Responsive</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading id="dhq-signature-heading" className="mt-5 max-w-[22ch]">
            One layout. <Underline>Three viewports</Underline>. Zero surprises.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5D5A54]">
            A marketing-site grid is a system, not a screenshot. The same
            hierarchy — header, hero, card grid, footer — reflows cleanly
            across mobile, tablet and desktop. Wireframes below; structure
            only.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col items-stretch gap-6">
          {FRAMES.map((f, i) => (
            <Reveal key={f.label} delay={0.24 + i * 0.08}>
              <figure
                className="mx-auto w-full max-w-[640px] overflow-hidden rounded-[16px] border border-[rgba(16,16,16,0.12)] bg-[#F7F2E8] shadow-[0_1px_0_rgba(16,16,16,0.04),0_12px_32px_-16px_rgba(16,16,16,0.20)]"
                style={{ maxWidth: f.label === 'Mobile' ? '320px' : f.label === 'Tablet' ? '520px' : '640px' }}
              >
                {/* Browser chrome */}
                <figcaption className="flex items-center justify-between gap-3 border-b border-[rgba(16,16,16,0.10)] bg-[#FFFDF8] px-4 py-2.5">
                  <div className="flex items-center gap-1.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B62]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFC83D]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#66DFC0]" />
                  </div>
                  <div className="flex h-5 flex-1 items-center rounded-full bg-[rgba(61,90,254,0.08)] px-3 text-[0.6rem] font-mono text-[#3D5AFE]">
                    watnidea.com
                  </div>
                  <span className="hidden shrink-0 items-center rounded-full bg-[#3D5AFE] px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white sm:inline-flex">
                    {f.vp} · {f.width}
                  </span>
                </figcaption>
                {/* Wireframe body */}
                <Wireframe cols={f.cols} />
                {/* Mobile-only caption row (since the sm badge is hidden) */}
                <div className="border-t border-[rgba(16,16,16,0.08)] bg-[#FFFDF8] px-4 py-2 text-[0.6rem] font-bold uppercase tracking-wider text-[#3D5AFE] sm:hidden">
                  {f.vp} · {f.width}
                </div>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.48}>
          <p className="mx-auto mt-10 max-w-md text-center text-xs leading-relaxed text-[#5D5A54]">
            Wireframe demonstration — same content hierarchy reflowing
            across viewports. Not a live page.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
