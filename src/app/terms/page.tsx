import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { Section, Container, Reveal } from '@/components/site/primitives'

export const metadata: Metadata = {
  title: 'Terms and Conditions | watNidea',
  description: 'Terms governing the watNidea website and enquiries for watNidea services.',
}

const EFFECTIVE_DATE = '14 January 2026'
const EMAIL = 'info@watnidea.com'
const ADDRESS = '2nd Floor, G-283, G Block, Sector 63, Noida, Chotpur, Uttar Pradesh 201309, India'

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />
      <main className="flex-1">
        <Section surface="paper" className="!pt-[calc(72px+3rem)] pb-12 sm:!pt-[calc(72px+4rem)]" ariaLabelledBy="terms-heading">
          <Container>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F13D32]">Legal · Website Terms</p>
              <h1 id="terms-heading" className="mt-4 max-w-[12ch] font-editorial text-[clamp(3rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em]">Terms without the fog.</h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5D5A54]">These Terms and Conditions govern your use of the watNidea website and your initial enquiries about our services. A signed proposal, statement of work or service agreement may contain additional project-specific terms.</p>
              <p className="mt-4 text-sm font-semibold">Effective date: {EFFECTIVE_DATE}</p>
            </Reveal>
          </Container>
        </Section>

        <Section surface="white" ariaLabelledBy="terms-content-heading" className="lg:!py-16">
          <Container>
            <h2 id="terms-content-heading" className="sr-only">Terms and Conditions details</h2>
            <div className="mx-auto max-w-4xl space-y-10">
              <TermsSection title="1. About these terms">
                <p>This website is operated by watNidea Private Limited (“watNidea”, “we”, “us” or “our”). By accessing or using the website, you agree to these Terms. If you do not agree, please do not use the website.</p>
              </TermsSection>

              <TermsSection title="2. Website purpose">
                <p>The website provides general information about our branding, design, web-development, social-media, video, performance-marketing, AI-assisted creative and search services. Website content is not a binding offer, professional legal advice, financial advice or a guarantee of any result.</p>
              </TermsSection>

              <TermsSection title="3. Enquiries and project agreements">
                <p>Submitting a form, emailing us or booking a call does not create a client relationship or require either party to proceed. A project begins only when the parties agree to the relevant scope, fees, timeline and other terms in writing. If a signed proposal, statement of work or service agreement conflicts with these website Terms, the signed project document controls for that project.</p>
              </TermsSection>

              <TermsSection title="4. Estimates, fees and payment">
                <p>Website prices, examples or package descriptions are indicative unless expressly stated otherwise. Final scope, fees, taxes, expenses, milestones, deposits, payment dates, revisions and cancellation terms will be set out in the applicable proposal or agreement. Overdue amounts and work suspension will be handled according to that agreement and applicable law.</p>
              </TermsSection>

              <TermsSection title="5. Client responsibilities">
                <p>For service engagements, clients are responsible for:</p>
                <ul>
                  <li>Providing accurate information, timely feedback, approvals and necessary access.</li>
                  <li>Ensuring they have rights and permissions to materials, data, trademarks, testimonials, audience lists and claims supplied to us.</li>
                  <li>Reviewing and approving deliverables before publication or campaign activation.</li>
                  <li>Ensuring their products, services, advertisements and instructions comply with applicable law and platform policies.</li>
                  <li>Maintaining secure control of their accounts and promptly revoking access when no longer required.</li>
                </ul>
              </TermsSection>

              <TermsSection title="6. Intellectual property">
                <p>The website, including its original text, design, layout, graphics, code, branding and other content, is owned by or licensed to watNidea and is protected by applicable intellectual-property laws. You may view the website for legitimate personal or business-evaluation purposes, but you may not copy, reproduce, scrape, sell, publish, modify or commercially exploit it without written permission.</p>
                <p>Ownership and permitted use of project deliverables, source files, third-party materials, licensed assets, fonts, stock media and pre-existing watNidea tools will be governed by the applicable project agreement. Unless that agreement states otherwise, no intellectual-property transfer occurs before all related fees are paid.</p>
              </TermsSection>

              <TermsSection title="7. Portfolio use and confidentiality">
                <p>Whether watNidea may identify a client or display completed work in its portfolio will be governed by the applicable agreement, written approval and any confidentiality commitments. Confidential information must not be publicly disclosed except as authorised or legally required.</p>
              </TermsSection>

              <TermsSection title="8. AI-assisted work">
                <p>Some services may use AI-assisted tools for research, ideation, variation, analysis or production support. AI output can contain errors, similarities, bias or unclear rights and therefore requires human review. We do not represent AI output as automatically accurate, unique, registrable, non-infringing or suitable for every use. Responsibilities for disclosure, review, approval and permitted use will depend on the project agreement and applicable law.</p>
              </TermsSection>

              <TermsSection title="9. Marketing and search results">
                <p>Creative, advertising, social-media, SEO, AEO and performance-marketing outcomes depend on many factors outside our control, including markets, competition, platforms, budgets, offers, websites, customer behaviour and client decisions. We do not guarantee rankings, traffic, featured snippets, AI citations, reach, leads, conversions, revenue, return on advertising spend or other business outcomes unless a separate written agreement expressly and lawfully states a specific commitment.</p>
              </TermsSection>

              <TermsSection title="10. Third-party platforms and materials">
                <p>Our website and services may rely on third-party platforms, hosting providers, advertising networks, analytics, plugins, software, stock assets or external links. Their availability, policies, pricing and conduct are outside our control. Your use of third-party products may be governed by separate terms and licences.</p>
              </TermsSection>

              <TermsSection title="11. Acceptable use">
                <p>You must not use the website to:</p>
                <ul>
                  <li>Break applicable law or infringe another person’s rights.</li>
                  <li>Transmit malware, interfere with security or attempt unauthorised access.</li>
                  <li>Scrape, overload, reverse engineer or disrupt the website except where law expressly permits.</li>
                  <li>Impersonate another person, submit false information or use our identity without permission.</li>
                  <li>Send unlawful, abusive, discriminatory, defamatory or harmful material.</li>
                </ul>
              </TermsSection>

              <TermsSection title="12. Website availability and accuracy">
                <p>We aim to keep website information useful and current, but it may contain errors or become outdated. We may change, suspend or remove any part of the website without notice. The website is provided on an “as available” basis to the extent permitted by law.</p>
              </TermsSection>

              <TermsSection title="13. Disclaimers">
                <p>To the maximum extent permitted by applicable law, we disclaim implied warranties relating to uninterrupted availability, error-free operation, fitness for a particular purpose and non-infringement. Nothing in these Terms excludes any warranty, right or liability that cannot lawfully be excluded.</p>
              </TermsSection>

              <TermsSection title="14. Limitation of liability">
                <p>To the maximum extent permitted by law, watNidea will not be liable for indirect, incidental, special, punitive or consequential loss arising from website use, including loss of profits, revenue, goodwill, opportunity or data. Liability relating to paid services will be governed by the applicable project agreement. Nothing limits liability that cannot legally be limited, including liability arising from fraud or wilful misconduct.</p>
              </TermsSection>

              <TermsSection title="15. Indemnity">
                <p>To the extent permitted by law, you agree to be responsible for losses or claims resulting from your unlawful misuse of the website, infringement of third-party rights, or material you submit in violation of these Terms. Any project-specific indemnity will be governed by the applicable agreement.</p>
              </TermsSection>

              <TermsSection title="16. Suspension and termination">
                <p>We may restrict website access where reasonably necessary to protect users, systems, legal rights or security. Service-project suspension and termination rights, including payment for completed work and committed costs, will be governed by the applicable agreement.</p>
              </TermsSection>

              <TermsSection title="17. Governing law and disputes">
                <p>These website Terms are governed by the laws of India. Subject to any mandatory law and any dispute process agreed in a signed project agreement, courts having jurisdiction in Gautam Buddha Nagar, Uttar Pradesh will have jurisdiction over disputes relating to these Terms.</p>
              </TermsSection>

              <TermsSection title="18. Changes to these terms">
                <p>We may update these Terms when our website, services or legal requirements change. The updated version will be posted here with a revised effective date. Continuing to use the website after an update means the revised Terms apply from their effective date.</p>
              </TermsSection>

              <TermsSection title="19. Contact">
                <address className="not-italic">
                  <strong>watNidea Private Limited</strong><br />
                  {ADDRESS}<br />
                  Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </address>
              </TermsSection>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </div>
  )
}

function TermsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-[rgba(17,17,17,0.10)] pb-10 last:border-0">
      <h2 className="font-editorial text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-[#45423D] [&_a]:font-semibold [&_a]:text-[#157468] [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">{children}</div>
    </section>
  )
}
