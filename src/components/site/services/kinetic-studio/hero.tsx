'use client'

/* ------------------------------------------------------------------ *
 * KineticHero — Section 1 of /kinetic-studio
 *
 * Art direction: cinematic, frame-based, motion-led. Surface = ink
 * (dark cinematic — the service's accent surface). IdeaStamp top-right
 * desktop in the service orange, multiple Stickers, big serif headline.
 *
 * Film-frame motifs: a "scene label" pill at the top, frame corners.
 * Recurring motifs (this page): IdeaStamp, Sticker, scene labels.
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

const svc = getService('kinetic-studio')!

export function KineticHero() {
  return (
    <div className="relative">
      <PageHero
        surface="ink"
        eyebrow={`${svc.number} · ${svc.name}`}
        accent="#F97316"
        title={
          <>
            Film, motion and
            <br />
            edit-led{' '}
            <Underline>storytelling</Underline>.
          </>
        }
        subtitle={svc.description}
      >
        {/* Scene label — film-frame motif */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.06)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.85)]">
          <span
            aria-hidden
            className="h-2 w-2 rounded-full bg-[#F97316]"
          />
          Scene 01 · Studio open
        </div>

        {/* Stickers — film-frame scene labels */}
        <div className="flex flex-wrap items-center gap-3">
          <Sticker accent="#F97316" textColor="#101010" tilt="left">
            {svc.mood}
          </Sticker>
          <Sticker accent="#FFFDF8" textColor="#101010" tilt="right">
            Concept to final cut
          </Sticker>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CTAButton
            href="/book-strategy-call"
            className="bg-[#F97316] text-white hover:bg-[#e96206]"
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

      {/* IdeaStamp — top-right, desktop only (orange on ink) */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-[96px] hidden lg:block xl:right-12"
      >
        <IdeaStamp label="What an idea" size={132} color="#F97316" />
      </span>
    </div>
  )
}
