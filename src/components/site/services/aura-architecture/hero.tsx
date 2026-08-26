'use client'

/* ------------------------------------------------------------------ *
 * AuraHero — Section 1 of /aura-architecture
 *
 * Art direction: editorial, typographic, identity-led. Surface = red
 * (the service's accent block). IdeaStamp top-right desktop (white),
 * 2 Stickers, big serif headline with a hand-drawn Underline.
 *
 * Recurring motifs (this page): IdeaStamp, Underline, Sticker.
 *
 * Honest copy — uses verbatim service tagline + description from
 * siteContent. NO fake metrics, NO fake clients.
 * ------------------------------------------------------------------ */

import { CalendarDays, ArrowUpRight } from 'lucide-react'
import {
  PageHero,
  Container,
  CTAButton,
  IdeaStamp,
  Sticker,
  Underline,
} from '@/components/site/primitives'
import { getService } from '@/lib/siteContent'

const svc = getService('aura-architecture')!

export function AuraHero() {
  return (
    <div className="relative">
      <PageHero
        surface="red"
        eyebrow={`${svc.number} · ${svc.name}`}
        accent="#FFFFFF"
        title={
          <>
            Identity systems
            <br />
            with a <Underline>soul</Underline>.
          </>
        }
        subtitle={svc.description}
      >
        {/* Stickers — visible on all viewports */}
        <div className="flex flex-wrap items-center gap-3">
          <Sticker accent="#FFFDF8" textColor="#F13D32" tilt="left">
            {svc.mood}
          </Sticker>
          <Sticker accent="#101010" textColor="#FFC83D" tilt="right">
            Now accepting selected projects
          </Sticker>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CTAButton
            href="/book-strategy-call"
            className="bg-white text-[#F13D32] hover:bg-[#FFFDF8]"
            icon={<CalendarDays className="h-4 w-4" />}
            aria-label="Book a strategy call"
          >
            Book a Strategy Call
          </CTAButton>
          <CTAButton
            href="/work"
            variant="secondary"
            className="border-white/40 text-white hover:bg-white/10"
            icon={<ArrowUpRight className="h-4 w-4" />}
            aria-label="See the concept board"
          >
            See the concept board
          </CTAButton>
        </div>
      </PageHero>

      {/* IdeaStamp — top-right, desktop only */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-[96px] hidden lg:block xl:right-12"
      >
        <IdeaStamp label="What an idea" size={132} color="#FFFFFF" />
      </span>
    </div>
  )
}
