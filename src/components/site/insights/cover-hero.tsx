'use client'

/* ------------------------------------------------------------------ *
 * InsightsCoverHero — Section 1 of /insights
 *
 * A Gen-Z studio zine "cover-story" hero on a paper surface.
 *
 *   - Single <h1>: "Insights, coming soon."
 *   - Eyebrow: "Issue 01"
 *   - Honest subtitle: essays on brand, craft and growth — from the
 *     watNidea studio. We're writing our first pieces now.
 *   - "Coming soon" Sticker (tilted).
 *   - IdeaStamp "What an idea" seal — top-right (rotating, decorative).
 *   - Big zine-style "ISSUE 01" graphical number — huge editorial
 *     display, used as a poster element.
 *
 * NO fake articles, NO fake authors, NO fake read counts.
 * Motion: short fade-up only, gated on prefers-reduced-motion.
 * Colour rhythm anchor: light surface (paper).
 * ------------------------------------------------------------------ */

import { motion } from 'framer-motion'
import { useReducedMotionSSR } from '@/components/site/use-reduced-motion-ssr'
import { CalendarDays, Mail } from 'lucide-react'
import {
  Section,
  Container,
  Reveal,
  CTAButton,
  Sticker,
  IdeaStamp,
  Underline,
} from '@/components/site/primitives'
import { site } from '@/lib/siteContent'

export function InsightsCoverHero() {
  const reduce = useReducedMotionSSR()
  const fade = (delay: number) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.42, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <Section
      surface="paper"
      ariaLabelledBy="insights-cover-heading"
      className="relative overflow-hidden pt-[calc(72px+2.5rem)] pb-16 sm:pt-[calc(72px+4rem)] sm:pb-24"
    >
      {/* Subtle accent blobs — purely decorative */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-24 top-8 h-[260px] w-[260px] rounded-full opacity-25 blur-[100px]"
          style={{ background: '#FF6B62' }}
        />
        <div
          className="absolute right-[12%] bottom-6 h-[240px] w-[240px] rounded-full opacity-15 blur-[110px]"
          style={{ background: '#FFC83D' }}
        />
      </div>

      <Container className="relative">
        {/* Top row — eyebrow + status + Coming soon sticker */}
        <motion.div {...fade(0.04)} className="flex flex-wrap items-center gap-3">
          <span className="wn-caption" style={{ color: '#F13D32' }}>
            Issue 01
          </span>
          <span className="h-px w-8" style={{ background: '#F13D32', opacity: 0.4 }} />
          <span className="wn-caption text-[#5D5A54]">
            From the {site.name} studio
          </span>
          <span className="ml-auto">
            <Sticker accent="#101010" textColor="#FFC83D" tilt="right">
              Coming soon
            </Sticker>
          </span>
        </motion.div>

        {/* Headline + rotating stamp + big ISSUE 01 graphical number */}
        <div className="relative mt-10">
          {/* Rotating idea stamp — top right, desktop only */}
          <div className="absolute -top-4 right-0 hidden lg:block">
            <IdeaStamp label="What an idea" size={132} color="#F13D32" />
          </div>

          {/* Big zine-style ISSUE 01 graphical number — poster element */}
          <motion.div
            {...fade(0.08)}
            className="pointer-events-none flex items-baseline gap-3 select-none"
            aria-hidden
          >
            <span
              className="wn-bignum text-[clamp(5rem,18vw,12rem)] leading-[0.8]"
              style={{ color: '#F13D32', opacity: 0.92 }}
            >
              01
            </span>
            <span
              className="font-editorial text-[clamp(1.25rem,3vw,2.25rem)] font-semibold uppercase tracking-[0.18em] text-[#101010]"
              style={{ writingMode: 'vertical-rl' }}
            >
              Issue
            </span>
          </motion.div>

          {/* Single <h1> on the page — the cover headline */}
          <motion.h1
            {...fade(0.16)}
            id="insights-cover-heading"
            className="relative mt-4 max-w-[16ch] font-editorial text-[clamp(2.75rem,8vw,6rem)] font-medium leading-[0.95] tracking-[-0.02em] text-[#101010]"
          >
            Insights,{' '}
            <span style={{ color: '#F13D32' }}>
              <Underline>coming soon.</Underline>
            </span>
          </motion.h1>
        </div>

        {/* Honest subtitle */}
        <motion.p
          {...fade(0.26)}
          className="mt-7 max-w-2xl text-base leading-relaxed text-[#101010] opacity-80 sm:text-lg"
        >
          Essays on brand, craft and growth — from the {site.name} studio.
          We&rsquo;re writing our first pieces now. No archive to browse
          yet, just an honest &ldquo;we&rsquo;re working on it&rdquo;.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(0.36)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CTAButton
            href="/book-strategy-call"
            icon={<CalendarDays className="h-4 w-4" />}
            aria-label="Book a strategy call"
          >
            Book a Strategy Call
          </CTAButton>
          <CTAButton
            href={`mailto:${site.email}`}
            variant="secondary"
            icon={<Mail className="h-4 w-4" />}
            aria-label={`Email ${site.email}`}
          >
            Email the studio
          </CTAButton>
        </motion.div>

        {/* Honest status row — quiet, no fake numbers */}
        <Reveal delay={0.42}>
          <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[rgba(16,16,16,0.12)] pt-6 text-xs">
            <span className="wn-caption text-[#5D5A54]">Now writing</span>
            <span className="text-[#101010]">Identity · Craft · Growth</span>
            <span className="text-[#F13D32]/60">•</span>
            <span className="inline-flex items-center gap-2 text-[#5D5A54]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F13D32] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F13D32]" />
              </span>
              {site.status}
            </span>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
