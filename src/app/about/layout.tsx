import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About watNidea | Branding and Creative Agency',
  description:
    'Learn about watNidea, a branding and creative agency combining strategy, design, websites, video, social media, advertising, SEO and AEO to build distinctive brands.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About watNidea | Branding and Creative Agency',
    description:
      'Learn about watNidea, a branding and creative agency combining strategy, design, websites, video, social media, advertising, SEO and AEO to build distinctive brands.',
    type: 'website',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
