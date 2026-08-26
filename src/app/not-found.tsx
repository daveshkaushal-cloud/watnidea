import Link from 'next/link'
import { ArrowRight, Home } from 'lucide-react'
import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { Container, IdeaStamp, Sticker } from '@/components/site/primitives'
import { site } from '@/lib/siteContent'

/**
 * Branded 404 — "Wrong turn. Right idea?"
 * Paper texture, red stamp, playful brand interaction.
 */

export const metadata = {
  title: '404 — Wrong turn. Right idea?',
  description: 'This page does not exist. Head back home or explore the studio.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />
      <main className="flex flex-1 items-center justify-center pt-[calc(72px+2rem)]">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 py-16 text-center">
            {/* Oversized 404 */}
            <div className="relative">
              <span className="font-editorial text-[clamp(5rem,18vw,11rem)] font-bold leading-none tracking-[-0.04em] text-[#101010]">
                4<span className="text-[#F13D32]">0</span>4
              </span>
              {/* Rotating red stamp */}
              <span className="absolute -right-4 -top-2 sm:-right-12">
                <IdeaStamp label="Wrong turn" size={88} color="#F13D32" />
              </span>
            </div>

            {/* Tape decoration */}
            <span aria-hidden className="wn-tape" style={{ left: '50%', top: '-12px', transform: 'translateX(-50%) rotate(-4deg)' }} />

            {/* Headline */}
            <h1 className="font-editorial text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
              Wrong turn. <span className="text-[#F13D32]">Right idea?</span>
            </h1>

            {/* Supporting copy */}
            <p className="max-w-md text-base leading-relaxed text-[#5D5A54]">
              This page does not exist — but the studio does. Head back home,
              or take a look at what we&apos;re building.
            </p>

            {/* Stickers */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Sticker accent="#FFC83D" textColor="#101010" tilt="left">
                Lost? Never.
              </Sticker>
              <Sticker accent="#3D5AFE" textColor="#FFFFFF" tilt="right">
                {site.status}
              </Sticker>
            </div>

            {/* CTAs */}
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F13D32] px-6 py-3 text-sm font-semibold text-white shadow-[0_3px_0_rgba(16,16,16,0.20)] transition-transform hover:-translate-y-0.5"
              >
                <Home className="h-4 w-4" />
                Return Home
              </Link>
              <Link
                href="/work"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[rgba(16,16,16,0.22)] bg-transparent px-6 py-3 text-sm font-semibold text-[#101010] transition-colors hover:bg-[rgba(16,16,16,0.05)]"
              >
                Explore the Work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </div>
  )
}
