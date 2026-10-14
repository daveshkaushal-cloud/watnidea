import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { site } from "@/lib/siteContent";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper"; // We'll create this tiny wrapper

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  verification: {
    google: 'EM7JIBer6u03L0M18NQqLIRu4FY8hiYeSiBavFf_mUI',
  },
  title: "Branding & Creative Agency in Noida, Delhi NCR | watNidea",
  description: "Branding and creative agency in Noida, Delhi NCR for brand identity, websites, video, social media, performance marketing, AI advertising and SEO.",
  keywords: [
    site.name,
    "creative agency",
    "branding agency",
    "web design",
    "performance marketing",
    "content systems",
    "AI creative",
    "growth agency",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  applicationName: site.name,
  icons: {
    icon: "/watnidea-favicon.png",
    apple: "/watnidea-favicon-64.png",
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: `Branding & Creative Agency in Noida, Delhi NCR | watNidea`,
    description: "Branding and creative agency in Noida, Delhi NCR for brand identity, websites, video, social media, performance marketing, AI advertising and SEO.",
    siteName: site.name,
    type: "website",
    url: site.url,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Branding & Creative Agency in Noida, Delhi NCR | watNidea`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Branding & Creative Agency in Noida, Delhi NCR | watNidea`,
    description: "Branding and creative agency in Noida, Delhi NCR for brand identity, websites, video, social media, performance marketing, AI advertising and SEO.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  description: site.longDescription,
  slogan: site.tagline,
  serviceType: [
    "Brand Identity",
    "Websites & Product Interfaces",
    "Content & Social",
    "Film & Motion",
    "Performance Marketing",
    "AI-Assisted Creative",
    "Search & Content Networks",
  ],
  areaServed: "Worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased bg-[var(--wn-bg)] text-[var(--wn-fg)] overflow-x-hidden`}
      >
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}