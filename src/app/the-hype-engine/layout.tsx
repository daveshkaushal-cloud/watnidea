import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Social Media Agency in India | watNidea',
  description:
    'watNidea is a social media agency offering strategy, content creation, social media management, Instagram marketing, advertising, community management and analytics.',
  alternates: { canonical: '/the-hype-engine' },
  openGraph: {
    title: 'The Hype Engine · watNidea',
    description: 'Cultural and social content that earns attention.',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
