import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Development Agency in India | watNidea',
  description:
    'watNidea is a website development agency offering custom website design, UI/UX, responsive development, WordPress, e-commerce, redesign and website support.',
  alternates: { canonical: '/the-digital-hq' },
  openGraph: {
    title: 'The Digital HQ · watNidea',
    description: 'Websites and product interfaces that perform.',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
