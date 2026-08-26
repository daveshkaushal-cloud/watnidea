import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Performance Marketing Agency in India | watNidea',
  description:
    'watNidea is a performance marketing agency providing Google Ads, Meta advertising, PPC management, lead generation, conversion tracking and campaign optimization.',
  alternates: { canonical: '/growth-alchemy' },
  openGraph: {
    title: 'Performance Marketing Agency in India | watNidea',
    description:
      'watNidea is a performance marketing agency providing Google Ads, Meta advertising, PPC management, lead generation, conversion tracking and campaign optimization.',
    type: 'website',
    url: 'https://watnidea.com/growth-alchemy',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
