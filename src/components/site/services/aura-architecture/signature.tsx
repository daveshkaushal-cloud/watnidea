'use client'

/* ------------------------------------------------------------------ *
 * AuraSignature — Studio signature for /aura-architecture
 *
 * Inserted between deliverables (sand) and process (ink).
 * Surface = white (clean spec-sheet pause between warm + dark).
 *
 * Visual: an animated identity-system / typography specimen.
 *   - Wordmark specimen card (slow weight-shift + red color-block wipe)
 *   - Type-scale ladder (4 stops: Display / Headline / Body / Caption)
 *   - Accent-colour swatch row (4 swatches: red / coral / ink / paper)
 *
 * Lightweight: CSS + 2 framer-motion reveals. No images, no canvas.
 * Honest: NO fake metrics, NO invented client work. A real spec sheet.
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

const TYPE_SCALE: {
  label: string
  sample: string
  cls: string
  meta: string
}[] = [
  { label: 'Display', sample: 'Aa', cls: 'text-5xl font-bold', meta: 'Fraunces · 700' },
  { label: 'Headline', sample: 'Aa', cls: 'text-3xl font-semibold', meta: 'Fraunces · 600' },
  { label: 'Body', sample: 'Aa', cls: 'text-base font-normal', meta: 'Geist · 400' },
  { label: 'Caption', sample: 'Aa', cls: 'text-xs font-semibold uppercase tracking-wider', meta: 'Geist · 600' },
]

const SWATCHES: { name: string; hex: string; onLight: boolean }[] = [
  { name: 'Signal red', hex: '#F13D32', onLight: false },
  { name: 'Coral', hex: '#FF6B62', onLight: true },
  { name: 'Ink', hex: '#101010', onLight: false },
  { name: 'Paper', hex: '#F7F2E8', onLight: true },
]

export function AuraSignature() {
  const reduce = useReducedMotionSSR()

  return (
    <Section surface="white" ariaLabelledBy="aura-signature-heading">
      <Container>
        <SectionLabel accent="#F13D32">Studio signature · Specimen</SectionLabel>
        <Reveal delay={0.08}>
          <EditorialHeading id="aura-signature-heading" className="mt-5 max-w-[22ch]">
            An identity behaves as a <Underline>system</Underline>, not a logo.
          </EditorialHeading>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5D5A54]">
            One wordmark, one type scale, one accent palette — engineered so
            the brand stays recognisable whether it appears on a deck, a
            billboard or an app icon. Specimen below; structure only.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Wordmark specimen — large, with weight-shift + red wipe */}
          <Reveal delay={0.24} className="lg:col-span-7">
            <figure className="relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-[22px] border border-[rgba(16,16,16,0.10)] bg-[#F7F2E8] p-6 sm:p-8">
              <span aria-hidden className="wn-halftone absolute inset-0 opacity-10" />
              <figcaption className="relative flex items-center justify-between">
                <span className="wn-caption text-[#5D5A54]">Wordmark · Specimen 01</span>
                <span className="wn-caption text-[#5D5A54]">v1.0</span>
              </figcaption>

              <div className="relative">
                <motion.span
                  className="block font-editorial text-[clamp(3rem,9vw,6rem)] font-medium leading-none tracking-[-0.03em] text-[#101010]"
                  initial={reduce ? false : { fontWeight: 400, opacity: 0.85 }}
                  whileInView={reduce ? undefined : { fontWeight: 600, opacity: 1 }}
                  viewport={{ once: true, margin: '-12%' }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                >
                  watNidea
                </motion.span>

                {/* Red color-block wipe across the baseline */}
                {!reduce && (
                  <motion.span
                    aria-hidden
                    className="absolute bottom-[-2px] left-0 block h-[6px] bg-[#F13D32]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true, margin: '-12%' }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                {reduce && (
                  <span aria-hidden className="absolute bottom-[-2px] left-0 block h-[6px] w-full bg-[#F13D32]" />
                )}
              </div>

              <div className="relative flex items-center justify-between text-xs text-[#5D5A54]">
                <span>Fraunces · Editorial</span>
                <span>Tracking −0.03em</span>
              </div>
            </figure>
          </Reveal>

          {/* Type-scale ladder */}
          <Reveal delay={0.32} className="lg:col-span-5">
            <figure className="flex h-full flex-col rounded-[22px] border border-[rgba(16,16,16,0.10)] bg-[#FFFDF8] p-6 sm:p-8">
              <figcaption className="flex items-center justify-between">
                <span className="wn-caption text-[#5D5A54]">Type scale</span>
                <span className="wn-caption text-[#5D5A54]">4 stops</span>
              </figcaption>
              <ul className="mt-6 divide-y divide-[rgba(16,16,16,0.08)]">
                {TYPE_SCALE.map((s) => (
                  <li key={s.label} className="flex items-center justify-between gap-4 py-4">
                    <span className={`font-editorial text-[#101010] ${s.cls}`}>{s.sample}</span>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#101010]">
                        {s.label}
                      </span>
                      <span className="text-[0.65rem] font-mono text-[#5D5A54]">{s.meta}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </figure>
          </Reveal>

          {/* Accent palette swatches */}
          <Reveal delay={0.4} className="lg:col-span-12">
            <figure className="rounded-[22px] border border-[rgba(16,16,16,0.10)] bg-[#FFFDF8] p-6 sm:p-8">
              <figcaption className="flex items-center justify-between">
                <span className="wn-caption text-[#5D5A54]">Accent palette</span>
                <span className="wn-caption text-[#5D5A54]">4 swatches · structure only</span>
              </figcaption>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {SWATCHES.map((c) => (
                  <div key={c.name} className="flex flex-col gap-2">
                    <div
                      className="aspect-[4/3] w-full rounded-[12px] border border-[rgba(16,16,16,0.10)]"
                      style={{ background: c.hex }}
                      aria-hidden
                    />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#101010]">{c.name}</span>
                      <span className="font-mono text-[#5D5A54]">{c.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
