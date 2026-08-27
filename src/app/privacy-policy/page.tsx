import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import SiteHeader from '@/components/site/site-header'
import SiteFooter from '@/components/site/site-footer'
import { Section, Container, Reveal } from '@/components/site/primitives'

export const metadata: Metadata = {
  title: 'Privacy Policy | watNidea',
  description: 'How watNidea Private Limited collects, uses and protects personal information.',
}

const EFFECTIVE_DATE = '14 January 2026'
const EMAIL = 'info@watnidea.com'
const ADDRESS = '2nd Floor, G-283, G Block, Sector 63, Noida, Chotpur, Uttar Pradesh 201309, India'

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F2E8] text-[#101010]">
      <SiteHeader tone="light" />
      <main className="flex-1">
        <Section surface="paper" className="!pt-[calc(72px+3rem)] pb-12 sm:!pt-[calc(72px+4rem)]" ariaLabelledBy="privacy-heading">
          <Container>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F13D32]">Legal · Privacy</p>
              <h1 id="privacy-heading" className="mt-4 max-w-[12ch] font-editorial text-[clamp(3rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em]">Privacy, explained clearly.</h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5D5A54]">This Privacy Policy explains how watNidea Private Limited (“watNidea”, “we”, “us” or “our”) collects, uses, shares and protects personal data when you visit our website, contact us or engage our services.</p>
              <p className="mt-4 text-sm font-semibold">Effective date: {EFFECTIVE_DATE}</p>
            </Reveal>
          </Container>
        </Section>

        <Section surface="white" ariaLabelledBy="privacy-content-heading" className="lg:!py-16">
          <Container>
            <h2 id="privacy-content-heading" className="sr-only">Privacy Policy details</h2>
            <div className="mx-auto max-w-4xl space-y-10">
              <PolicySection title="1. Who we are">
                <p>watNidea Private Limited is a creative, branding, web-development, marketing and AI-assisted content studio based in Noida, Uttar Pradesh, India.</p>
              </PolicySection>

              <PolicySection title="2. Information we collect">
                <p>Depending on how you interact with us, we may collect:</p>
                <ul>
                  <li>Contact information such as your name, business name, email address and telephone number.</li>
                  <li>Enquiry and project information you submit through forms, email, calls or meetings.</li>
                  <li>Commercial information such as proposals, contracts, invoices and payment status. We do not intentionally store full payment-card details.</li>
                  <li>Project materials you provide, including brand assets, content, audience information and access required to perform agreed services.</li>
                  <li>Technical information such as IP address, browser, device, referring page, pages viewed and approximate location, where collected through server logs, analytics or cookies.</li>
                  <li>Communications, feedback and records of support or business conversations.</li>
                </ul>
                <p>Please do not provide personal data that is unnecessary for your enquiry or project.</p>
              </PolicySection>

              <PolicySection title="3. How we use information">
                <p>We may use personal data to:</p>
                <ul>
                  <li>Respond to enquiries and arrange strategy calls.</li>
                  <li>Prepare proposals and provide contracted services.</li>
                  <li>Manage projects, accounts, billing, support and client relationships.</li>
                  <li>Operate, secure, troubleshoot and improve our website and services.</li>
                  <li>Measure website usage and understand how visitors find and use our content.</li>
                  <li>Send service-related communications and, where permitted, relevant marketing communications.</li>
                  <li>Comply with legal obligations, prevent misuse and establish or defend legal claims.</li>
                </ul>
                <p>We process personal data for lawful purposes, including with consent, to respond to information voluntarily provided by you, to perform or prepare a contract, and where necessary for applicable legal obligations.</p>
              </PolicySection>

              <PolicySection title="4. Cookies and analytics">
                <p>Our website may use necessary cookies and similar technologies for security, functionality and preferences. We may also use analytics tools to understand aggregated website activity. Where required, non-essential cookies should be used only after an appropriate choice or consent has been provided. You can restrict cookies through your browser, although parts of the website may not function correctly.</p>
              </PolicySection>

              <PolicySection title="5. Sharing and service providers">
                <p>We do not sell personal data. We may share limited information with service providers that help us operate our business, such as hosting, analytics, communications, project-management, cloud-storage, payment, accounting and professional-advisory providers. We may also share information:</p>
                <ul>
                  <li>With your instructions or consent.</li>
                  <li>When needed to provide an agreed service.</li>
                  <li>To comply with law, court orders or lawful government requests.</li>
                  <li>To protect rights, safety, systems or property.</li>
                  <li>During a genuine corporate transaction, subject to appropriate safeguards.</li>
                </ul>
              </PolicySection>

              <PolicySection title="6. Client data and advertising platforms">
                <p>When clients give us access to websites, advertising accounts, analytics, CRM systems or audience information, we use that access only for the agreed project and subject to the client’s instructions, applicable platform terms and law. Clients remain responsible for ensuring they have a lawful basis to provide personal data, audiences and permissions to us.</p>
              </PolicySection>

              <PolicySection title="7. AI-assisted tools">
                <p>Some services may use AI-assisted tools for research, concept exploration, content variation, production support or analysis. We apply human review and do not intentionally submit confidential or personal information to third-party AI tools unless this is appropriate for the project, permitted by our arrangements and authorised where required. Clients should identify confidential, restricted or regulated information before sharing project materials.</p>
              </PolicySection>

              <PolicySection title="8. International processing">
                <p>Some technology providers may process information outside India. Where this occurs, we take reasonable steps to use reputable providers and appropriate contractual or organisational safeguards, subject to applicable Indian restrictions on cross-border transfers.</p>
              </PolicySection>

              <PolicySection title="9. Retention">
                <p>We retain personal data only for as long as reasonably necessary for the purpose collected, ongoing client work, security, dispute resolution, accounting and legal requirements. Retention periods vary by record type. When information is no longer required, we will delete, anonymise or securely isolate it as reasonably practicable.</p>
              </PolicySection>

              <PolicySection title="10. Security">
                <p>We use reasonable technical and organisational measures intended to protect personal data. However, no internet transmission or storage system is completely secure, and we cannot guarantee absolute security.</p>
              </PolicySection>

              <PolicySection title="11. Your choices and rights">
                <p>Subject to applicable law, you may ask us to provide information about personal data we process about you, correct inaccurate or incomplete information, update it, request erasure, withdraw consent where consent is the basis of processing, or raise a grievance. Withdrawal does not affect processing already carried out lawfully and some records may need to be retained under law.</p>
                <p>To make a request, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We may need to verify your identity before completing a request.</p>
              </PolicySection>

              <PolicySection title="12. Children">
                <p>Our website and services are intended for businesses and adults. We do not knowingly collect personal data from children or direct behavioural advertising to children. If you believe a child has provided personal data to us, contact us so we can review and take appropriate action.</p>
              </PolicySection>

              <PolicySection title="13. Third-party links">
                <p>Our website may link to external websites and platforms. Their privacy practices are controlled by their respective operators, and this Privacy Policy does not apply to them.</p>
              </PolicySection>

              <PolicySection title="14. Updates to this policy">
                <p>We may update this Privacy Policy to reflect changes in our services, technology or legal requirements. The revised version will be posted on this page with an updated effective date. Material changes may also be communicated through another reasonable method.</p>
              </PolicySection>

              <PolicySection title="15. Contact and grievances">
                <p>For privacy questions, requests or grievances, contact:</p>
                <address className="not-italic">
                  <strong>watNidea Private Limited</strong><br />
                  {ADDRESS}<br />
                  Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </address>
              </PolicySection>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </div>
  )
}

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-[rgba(17,17,17,0.10)] pb-10 last:border-0">
      <h2 className="font-editorial text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-[#45423D] [&_a]:font-semibold [&_a]:text-[#157468] [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">{children}</div>
    </section>
  )
}
