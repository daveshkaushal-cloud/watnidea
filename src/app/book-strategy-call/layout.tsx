import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact watNidea | Start a Creative Project',
  description:
    'Contact watNidea to discuss branding, websites, video production, social media, AEO, SEO, AI advertising, performance marketing and creative campaigns.',
  alternates: { canonical: '/book-strategy-call' },
  openGraph: {
    title: 'Contact watNidea | Start a Creative Project',
    description:
      'Contact watNidea to discuss branding, websites, video production, social media, AEO, SEO, AI advertising, performance marketing and creative campaigns.',
    type: 'website',
  },
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children
}
