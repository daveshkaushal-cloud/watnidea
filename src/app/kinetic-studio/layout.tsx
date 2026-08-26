import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video Production Company in India | watNidea',
  description:
    'watNidea is a video production company offering brand films, corporate videos, promotional videos, product videos, social content, editing and post-production.',
  alternates: { canonical: '/kinetic-studio' },
  openGraph: {
    title: 'Kinetic Studio · watNidea',
    description: 'Film, motion and edit-led storytelling.',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
