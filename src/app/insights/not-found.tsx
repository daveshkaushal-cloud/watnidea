import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'

/* ------------------------------------------------------------------ *
 * /insights/not-found — honest 404 for the Insights segment.
 *
 * Rendered when a visitor hits /insights/<unknown-slug> or any other
 * non-existent path under /insights. Today, that includes every
 * article URL — because there are no verified articles yet.
 *
 * We never fake an article. We tell the visitor the truth: the essay
 * they are looking for does not exist yet, and point them back to the
 * Insights index and the strategy-call route.
 *
 * Uses the unified SiteHeader + SiteFooter (the Gen-Z studio zine shell)
 * — NOT the old dark Navbar/Footer.
 * ------------------------------------------------------------------ */

export default function InsightsNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />
      <main className="flex flex-1 items-center pt-[72px]">
        <div className="mx-auto w-full max-w-2xl px-5 py-24 text-center sm:px-8">
          <p className="wn-caption" style={{ color: '#F13D32' }}>
            No essay here — yet
          </p>
          <h1 className="mt-5 font-editorial text-4xl font-medium leading-tight tracking-[-0.01em] sm:text-5xl">
            We haven&rsquo;t published this essay.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#5D5A54] sm:text-lg">
            The {`/insights/[slug]`} route is wired up and ready, but no
            essays have been published yet. If you reached this page
            from a link, it may be pointing at a piece we haven&rsquo;t
            finished writing.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/insights"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F13D32] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d9342a] focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Back to Insights
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/book-strategy-call"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[rgba(16,16,16,0.22)] px-6 py-3 text-sm font-semibold text-[#101010] transition-colors hover:bg-[rgba(16,16,16,0.05)] focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
