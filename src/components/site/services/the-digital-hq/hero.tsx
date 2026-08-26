'use client'

/* ------------------------------------------------------------------ *
 * DhqHero — Section 1 of /the-digital-hq
 *
 * Art direction: grid-led, interface systems, "blueprint" feel.
 * Surface = blue (the service's accent block). IdeaStamp top-right
 * desktop (white), 2 Stickers, big serif headline.
 *
 * Recurring motifs (this page): IdeaStamp, Sticker, blueprint grid.
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

const svc = getService('the-digital-hq')!

export function DhqHero() {
  return (
    <div className="relative">
      <PageHero
        surface="blue"
        eyebrow={`${svc.number} · ${svc.name}`}
        accent="#FFFFFF"
        title={
          <>
            Websites and
            <br />
            interfaces that{' '}
            <Underline>perform</Underline>.
          </>
        }
        subtitle={svc.description}
      >
        {/* Stickers — visible on all viewports */}
        <div className="flex flex-wrap items-center gap-3">
          <Sticker accent="#FFFDF8" textColor="#3D5AFE" tilt="left">
            {svc.mood}
          </Sticker>
          <Sticker accent="#101010" textColor="#C8F542" tilt="right">
            Built to be maintained
          </Sticker>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CTAButton
            href="/book-strategy-call"
            className="bg-white text-[#3D5AFE] hover:bg-[#FFFDF8]"
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
