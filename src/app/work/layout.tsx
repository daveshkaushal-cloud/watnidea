import type { Metadata } from 'next'

/**
 * /work subtree layout.
 *
 * Provides a fallback metadata title for every route under /work
 * (i.e. /work itself and /work/[slug]). Individual pages still
 * override `title` via their own `metadata` / `generateMetadata`.
 *
 * Honesty note: nothing here fabricates client work — the layout is
 * presentational only, no data, no invented claims.
 */
export const metadata: Metadata = {
  title: 'Work',
  description:
    'Explore watNidea’s creative work and concept explorations across branding, digital, content, video, advertising and search.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Work · watNidea',
    description:
      'Creative work and concept explorations, clearly labelled.',
    type: 'website',
  },
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
