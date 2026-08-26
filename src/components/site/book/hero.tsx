'use client'

import {
  Container,
  PageHero,
  Sticker,
  IdeaStamp,
  Reveal,
  CTAButton,
  Underline,
} from '@/components/site/primitives'
import { CalendarDays } from 'lucide-react'

/* ------------------------------------------------------------------ *
 * BookHero — bold youthful hero on paper.
 * PageHero gives us ONE <h1>, eyebrow, title, subtitle.
 * Decorations: IdeaStamp top-right (desktop), Sticker "Now accepting"
 * below subtitle, plus a small status ping + jump CTA.
 * ------------------------------------------------------------------ */

export function BookHero() {
  return (
    <PageHero
      surface="paper"
      eyebrow="Let’s talk"
      title={
        <>
          Tell us what <br className="hidden sm:block" />
          you’re <Underline>building</Underline>.
        </>
      }
      subtitle="A 30-minute call to see if we’re a fit. No pitch deck, no sales script — just a real conversation about your brand, your goals and where watNidea could help."
    >
      {/* Decorative idea stamp — desktop only */}
      <div className="pointer-events-none absolute right-4 top-[calc(72px+1.5rem)] hidden lg:block">
        <IdeaStamp label="What an idea" size={132} color="#F13D32" />
      </div>

      <Reveal delay={0.24}>
        <div className="flex flex-wrap items-center gap-3">
          <Sticker accent="#101010" textColor="#FFC83D" tilt="left">
            Now accepting
          </Sticker>
        </div>
      </Reveal>

      <Reveal delay={0.32}>
        <div className="mt-7">
          <CTAButton
            href="#book-your-call"
            icon={<CalendarDays className="h-4 w-4" />}
            aria-label="Jump to the strategy call form"
          >
            Start the brief
          </CTAButton>
        </div>
      </Reveal>
    </PageHero>
  )
}
