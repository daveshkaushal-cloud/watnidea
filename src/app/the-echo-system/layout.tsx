import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AEO and SEO Services in India | watNidea',
  description:
    'watNidea provides AEO and SEO services including keyword research, answer-focused content, on-page SEO, technical SEO, internal linking and AI search readiness.',
  alternates: { canonical: '/the-echo-system' },
  openGraph: {
    title: 'The Echo System · watNidea',
    description: 'Search, content and authority networks.',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
