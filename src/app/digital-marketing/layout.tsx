import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Marketing Services in India | watNidea',
  description:
    'watNidea provides connected digital marketing services including SEO, AEO, social media, content, Google and Meta advertising, performance marketing and website marketing.',
  alternates: { canonical: '/digital-marketing' },
  openGraph: {
    title: 'Digital Marketing Services in India | watNidea',
    description:
      'watNidea provides connected digital marketing services including SEO, AEO, social media, content, Google and Meta advertising, performance marketing and website marketing.',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
