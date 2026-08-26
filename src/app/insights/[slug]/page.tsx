import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { getVerifiedArticles } from '@/lib/siteContent'

/* ------------------------------------------------------------------ *
 * /insights/[slug] — article detail route.
 *
 * As of today there are NO verified articles (getVerifiedArticles()
 * returns []). This route exists and is READY for future articles:
 *
 *   - generateStaticParams() returns [] (no SSG paths yet)
 *   - With dynamicParams = false, any slug not in the static set
 *     automatically 404s. We additionally call notFound() as a
 *     defensive fallback at request time.
 *
 * We NEVER invent article bodies, authors, or dates. The author is
 * always "watNidea Editorial Team" — never invented employee names.
 *
 * When the studio is ready to publish, add a verified Article to
 * ARTICLES in src/lib/siteContent.ts; this route will start serving
 * it automatically (after rebuilding the static params list).
 * ------------------------------------------------------------------ */

export const dynamicParams = false

export function generateStaticParams() {
  // No verified articles yet — no SSG paths.
  return []
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Metadata {
  // We do not have any articles yet. Return a minimal, honest title
  // that points back at the Insights index (canonical: /insights) and
  // asks robots not to index a non-existent article URL.
  return {
    title: 'Insights',
    description:
      'Essays on brand, craft and growth from the watNidea studio.',
    alternates: { canonical: '/insights' },
    robots: { index: false, follow: true },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const article = getVerifiedArticles().find((a) => a.slug === slug)

  if (!article) {
    // No verified article matches this slug (including the current
    // state where there are no verified articles at all). Render the
    // not-found page instead of inventing one.
    notFound()
  }

  // Defensive: notFound() returns never, so this branch is unreachable
  // when no article is found — but TypeScript needs a fallback.
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />
      <main className="flex-1 pt-[72px]">
        <article className="wn-section mx-auto w-full max-w-3xl px-5 sm:px-8">
          <p className="wn-caption" style={{ color: '#F13D32' }}>
            {article!.category}
          </p>
          <h1 className="mt-4 font-editorial text-4xl font-medium leading-tight tracking-[-0.01em] sm:text-5xl">
            {article!.title}
          </h1>
          <p className="mt-3 text-sm text-[#5D5A54]">
            By watNidea Editorial Team · {article!.date} ·{' '}
            {article!.readTime}
          </p>
          {article!.excerpt && (
            <p className="mt-8 text-lg leading-relaxed text-[#5D5A54]">
              {article!.excerpt}
            </p>
          )}
          {article!.body && (
            <div className="mt-10 space-y-6 text-base leading-relaxed text-[#101010]">
              {article!.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
