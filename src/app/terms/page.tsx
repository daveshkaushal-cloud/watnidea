import type { Metadata } from 'next'
import { site } from '@/lib/siteContent'
import Navbar from '@/components/hero/navbar'
import Footer from '@/components/hero/footer'

export const metadata: Metadata = {
  title: 'Terms',
  description: `The terms on which ${site.name} makes this website and its content available to you.`,
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--wn-warm-white)] text-[var(--wn-body)]">
      <Navbar />
      <main className="relative z-40 flex flex-1 flex-col">
        <article className="mx-auto w-full max-w-3xl px-6 py-24 sm:px-8 md:py-32">
          <p className="wn-eyebrow mb-4 text-[var(--wn-red)]">Legal</p>
          <h1 className="font-editorial text-4xl font-semibold leading-tight md:text-5xl">
            Terms
          </h1>
          <p className="mt-4 text-sm text-[var(--wn-muted)]">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="mt-10 space-y-6 text-base leading-relaxed">
            <section>
              <h2 className="font-editorial text-2xl font-semibold">Using this site</h2>
              <p className="mt-2 text-[var(--wn-muted)]">
                This website is provided by {site.legalName} (&ldquo;{site.name}&rdquo;) for information
                about our studio and services. By using it you agree to do so in a way that does not
                damage, disable or impair the site, or interfere with anyone else&apos;s use of it.
              </p>
            </section>

            <section>
              <h2 className="font-editorial text-2xl font-semibold">Content &amp; intellectual property</h2>
              <p className="mt-2 text-[var(--wn-muted)]">
                The {site.name} name, logo and wordmark, and the visual identity, copy and design of this
                site, belong to {site.legalName}. Concept work shown on the Work page is clearly labelled
                and is not client work unless stated. Please do not copy, republish or redistribute
                content from this site without written permission.
              </p>
            </section>

            <section>
              <h2 className="font-editorial text-2xl font-semibold">No guarantee of results</h2>
              <p className="mt-2 text-[var(--wn-muted)]">
                Case studies and capabilities describe our approach. We do not promise any specific
                commercial outcome, and past results are not a guarantee of future performance. Any
                engagement will be governed by a separate written agreement.
              </p>
            </section>

            <section>
              <h2 className="font-editorial text-2xl font-semibold">Enquiries</h2>
              <p className="mt-2 text-[var(--wn-muted)]">
                Questions about these terms can be sent to <a className="text-[var(--wn-red)] underline-offset-4 hover:underline" href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
