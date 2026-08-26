import type { Metadata } from 'next'
import { site } from '@/lib/siteContent'
import Navbar from '@/components/hero/navbar'
import Footer from '@/components/hero/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses and protects your information when you use our website and services.`,
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--wn-warm-white)] text-[var(--wn-body)]">
      <Navbar />
      <main className="relative z-40 flex flex-1 flex-col">
        <article className="mx-auto w-full max-w-3xl px-6 py-24 sm:px-8 md:py-32">
          <p className="wn-eyebrow mb-4 text-[var(--wn-red)]">Legal</p>
          <h1 className="font-editorial text-4xl font-semibold leading-tight md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[var(--wn-muted)]">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-[var(--wn-body)]">
            <section>
              <h2 className="font-editorial text-2xl font-semibold">Overview</h2>
              <p className="mt-2 text-[var(--wn-muted)]">
                {site.legalName} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your
                privacy. This policy explains what information we collect through this website, why we
                collect it, and how we handle it.
              </p>
            </section>

            <section>
              <h2 className="font-editorial text-2xl font-semibold">Information you give us</h2>
              <p className="mt-2 text-[var(--wn-muted)]">
                When you submit a Strategy Call request or subscribe to our newsletter, we collect the
                details you choose to provide — such as your name, email, business name, project type,
                message, and any optional contact details (website, phone, budget, preferred time).
              </p>
            </section>

            <section>
              <h2 className="font-editorial text-2xl font-semibold">How we use it</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-6 text-[var(--wn-muted)]">
                <li>To review and respond to your enquiry.</li>
                <li>To prepare for a potential engagement.</li>
                <li>To send newsletter updates, if you subscribed.</li>
                <li>To improve the quality and relevance of our content.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-editorial text-2xl font-semibold">How we store it</h2>
              <p className="mt-2 text-[var(--wn-muted)]">
                Submissions are stored securely in our database and are accessible only to authorised
                members of the studio. We do not sell or rent your personal information to anyone.
              </p>
            </section>

            <section>
              <h2 className="font-editorial text-2xl font-semibold">Your choices</h2>
              <p className="mt-2 text-[var(--wn-muted)]">
                You can ask to see, update or delete the information we hold about you at any time by
                emailing <a className="text-[var(--wn-red)] underline-offset-4 hover:underline" href={`mailto:${site.email}`}>{site.email}</a>.
                You can unsubscribe from the newsletter at any time using the link in any email.
              </p>
            </section>

            <section>
              <h2 className="font-editorial text-2xl font-semibold">Contact</h2>
              <p className="mt-2 text-[var(--wn-muted)]">
                Questions about this policy can be sent to <a className="text-[var(--wn-red)] underline-offset-4 hover:underline" href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
