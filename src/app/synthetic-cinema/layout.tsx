import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Advertising Agency in India | watNidea',
  description:
    'watNidea is an AI advertising agency combining human strategy with AI-assisted audience research, creative variation, personalization, automation and campaign analysis.',
  alternates: { canonical: '/synthetic-cinema' },
  openGraph: {
    title: 'Synthetic Cinema · watNidea',
    description: 'AI-assisted concepting and visualisation.',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
