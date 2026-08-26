/* ------------------------------------------------------------------ *
 * /book-strategy-call — Contact / Start-a-Project page.
 *
 * Positioning: both a project-enquiry page and an invitation to start
 * a conversation.
 *
 * 8 visible sections + Final CTA. Exactly ONE <h1> (the hero).
 * All section titles are <h2> via `EditorialHeading`.
 * The Final CTA renders its own <h2> (id="book-final-heading").
 *
 * Colour rhythm: paper (hero) → white (form) → sand (services) →
 *   ink (conversation — the ONE dark section) → paper (direct contact) →
 *   sand (FAQ) → red (final CTA).
 * ≈ 4 light + 1 dark + 1 colour block. Matches "one dark section maximum".
 *
 * Honesty:
 *   - NO invented email, phone, address, office, availability or response time.
 *   - Only verified contact info shown (hello@watnidea.com confirmed).
 *   - Phone + Location hidden (not verified).
 *   - NO "free", "guaranteed" or specific-time call claims.
 *   - Success shown only after confirmed DB delivery.
 *   - Form uses secure POST — lead data never in URLs.
 *
 * Uses ONLY shared primitives + the new section components in
 * `@/components/site/book-strategy-call/`.
 * ------------------------------------------------------------------ */

import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import {
  BookHero,
  BookServiceAreas,
  BookWhyConversation,
  BookDirectContact,
  BookFaq,
  BookFinalCta,
} from '@/components/site/book-strategy-call/sections'
import { ProjectForm } from '@/components/site/book-strategy-call/project-form'
import { BOOK_FAQS } from '@/lib/book-faq-data'
import { site } from '@/lib/siteContent'

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact watNidea | Start a Creative Project',
  url: `${site.url}/book-strategy-call`,
  description:
    'Contact watNidea to discuss branding, websites, video production, social media, AEO, SEO, AI advertising, performance marketing and creative campaigns.',
  mainEntity: {
    '@type': 'Organization',
    name: site.legalName,
    email: site.email,
    url: site.url,
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Contact',
      item: `${site.url}/book-strategy-call`,
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: BOOK_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function BookStrategyCallPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFF7E9] text-[#111111]">
      <SiteHeader tone="light" />

      <main className="flex-1">
        <BookHero />              {/* 1 · Hero (paper) */}
        <ProjectForm />           {/* 2 · Project Enquiry Form (white) */}
        <BookServiceAreas />     {/* 3 · What We Can Help You Create (sand) */}
        <BookWhyConversation />  {/* 4 · Why Start With a Conversation? (ink — ONE dark) */}
        <BookDirectContact />    {/* 5 · Direct Contact Information (paper) */}
        <BookFaq />               {/* 6 · Frequently Asked Questions (sand) */}
        <BookFinalCta />          {/* 7 · Final CTA (red) */}
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  )
}
