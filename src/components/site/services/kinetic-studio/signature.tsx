'use client'

/* ------------------------------------------------------------------ *
 * KineticSignature — Studio signature for /kinetic-studio
 *
 * Inserted between deliverables (sand) and process (ink).
 * Surface = white (clean spec-sheet pause).
 *
 * Visual: a cinematic frame sequence / editable timeline motif.
 *   - Horizontal filmstrip of 5 frames (each a stylised scene mock
 *     with corner brackets + scene number + scene label).
 *   - Below: a timeline track with tick marks + playhead.
 *
 * Layout:
 *   - Mobile: horizontal scroll-snap filmstrip (overflow-x-auto).
 *   - sm+: 5-col grid filmstrip.
 *
 * Lightweight: CSS wireframes + 1 framer-motion playhead reveal.
 * Honest: scene labels only. NO fake runtime / budget / crew claims.
 * ------------------------------------------------------------------ */

import { motion } from 'framer-motion'
import { useReducedMotionSSR } from '@/components/site/use-reduced-motion-ssr'
import {
  Section,
  Container,
  SectionLabel,
  EditorialHeading,
  Reveal,
  Underline,
} from '@/components/site/primitives'

type Scene = {
  n: string
  label: string
  from: string
  to: string
}

const SCENES: Scene[] = [
  { n: 'S01', label: 'Opening', from: 'rgba(249,115,22,0.92)', to: 'rgba(16,16,16,0.92)' },
  { n: 'S02', label: 'Build', from: 'rgba(16,16,16,0.92)', to: 'rgba(249,115,22,0.65)' },
  { n: 'S03', label: 'Turn', from: 'rgba(255,107,98,0.78)', to: 'rgba(16,16,16,0.92)' },
  { n: 'S04', label: 'Payoff', from: 'rgba(249,115,22,0.92)', to: 'rgba(16,16,16,0.88)' },
  { n: 'S05', label: 'Tag', from: 'rgba(16,16,16,0.92)', to: 'rgba(249,115,22,0.80)' },
]

export function KineticSignature() {
  const reduce = useReducedMotionSSR()

  return (
    <Section surface="white" ariaLabelledBy="kinetic-signature-heading">
      <Container>
        <SectionLabel accent="#F97316">Studio signature · Edit</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading id="kinetic-signature-heading" className="mt-5 max-w-[22ch]">
            A film is a sequence of <Underline>decisions</Underline>.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5D5A54]">
            Five frames on a timeline. Each one earns its place — opening,
            build, turn, payoff, tag. The edit, not the footage, is where
            the story actually gets made.
          </p>
        </Reveal>

        {/* Filmstrip — horizontal scroll-snap on mobile, 5-col grid on sm+ */}
        <Reveal delay={0.24}>
          <div
            className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5"
            role="list"
            aria-label="Scene filmstrip"
          >
            {SCENES.map((s, i) => (
              <div
                key={s.n}
                role="listitem"
                className="relative aspect-[4/5] w-[68vw] shrink-0 snap-start sm:w-auto"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[14px] border border-[rgba(16,16,16,0.14)] bg-[#101010]">
                  {/* Gradient scene mock */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(150deg, ${s.from} 0%, ${s.to} 100%)` }}
                  />
                  <span aria-hidden className="wn-halftone-light absolute inset-0 opacity-30 mix-blend-overlay" />

                  {/* Corner brackets */}
                  <span aria-hidden className="pointer-events-none absolute inset-3">
                    <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[#F97316]" />
                    <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-[#F97316]" />
                    <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[#F97316]" />
                    <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[#F97316]" />
                  </span>

                  {/* Scene number top-left */}
                  <div className="absolute left-3 top-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F97316]">
                      {s.n}
                    </span>
                  </div>

                  {/* Scene label bottom-left */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="font-editorial text-lg font-semibold leading-tight text-white">
                      {s.label}
                    </span>
                    <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-wider text-[rgba(255,255,255,0.6)]">
                      Frame {String(i + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Timeline track below the filmstrip */}
        <Reveal delay={0.36}>
          <div className="mt-8 rounded-[12px] border border-[rgba(16,16,16,0.10)] bg-[#FFFDF8] p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="wn-caption text-[#5D5A54]">Edit timeline</span>
              <span className="wn-caption text-[#5D5A54]">5 cuts · structure only</span>
            </div>

            {/* Track */}
            <div className="relative mt-5 h-10" role="img" aria-label="Edit timeline with five scene markers and a playhead at scene 03">
              {/* Track base */}
              <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[rgba(16,16,16,0.10)]" />
              {/* Filled portion (left of playhead) */}
              <div className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#F97316]" style={{ width: '50%' }} />

              {/* Tick marks per scene */}
              <div className="absolute inset-0 flex items-center justify-between px-0">
                {SCENES.map((s, i) => {
                  const isAtPlayhead = i === 2 // playhead sits on scene 03
                  return (
                    <div key={s.n} className="flex flex-col items-center" aria-hidden>
                      <span
                        className={`h-3 w-3 rounded-full border-2 ${
                          isAtPlayhead
                            ? 'border-[#F97316] bg-[#F97316]'
                            : 'border-[rgba(16,16,16,0.30)] bg-[#FFFDF8]'
                        }`}
                      />
                      <span className="mt-1.5 font-mono text-[0.55rem] uppercase tracking-wider text-[#5D5A54]">
                        {s.n}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Playhead */}
              {!reduce && (
                <motion.div
                  aria-hidden
                  className="absolute top-0 bottom-0 w-px bg-[#F97316]"
                  style={{ left: '50%' }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#F97316]" />
                </motion.div>
              )}
              {reduce && (
                <div aria-hidden className="absolute top-0 bottom-0 w-px bg-[#F97316]" style={{ left: '50%' }}>
                  <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#F97316]" />
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-[0.65rem] font-mono uppercase tracking-wider text-[#5D5A54]">
              <span>Opening</span>
              <span>Playhead · Scene 03</span>
              <span>Tag</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.48}>
          <p className="mx-auto mt-10 max-w-md text-center text-xs leading-relaxed text-[#5D5A54]">
            Filmstrip mock — five stylised scenes on a timeline. No runtime
            or budget shown by design.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
