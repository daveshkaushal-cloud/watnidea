"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import Script from "next/script";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {/* Google Analytics Tag */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-TZ3BVFRJQ8"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TZ3BVFRJQ8');
          `,
        }}
      />

      {/* Hide Header on Admin Pages */}
      {!isAdmin && <SiteHeader />}

      {children}

      {/* Hide Footer on Admin Pages */}
      {!isAdmin && <SiteFooter />}
    </>
  );
}