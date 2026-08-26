import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Identity Agency in India | watNidea',
  description:
    'watNidea is a brand identity agency offering brand strategy, logo design, visual identity, guidelines, messaging, packaging, rebranding and brand collateral.',
  alternates: { canonical: '/aura-architecture' },
  openGraph: {
    title: 'Aura Architecture · watNidea',
    description: 'Identity systems with a soul.',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
