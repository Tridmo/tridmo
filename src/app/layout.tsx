import Providers from "@/components/providers";
import Footer from "@/components/views/footer";
import Navbar from "@/components/views/navbar";
import "@/styles/carousel.module.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import 'react-lazy-load-image-component/src/effects/blur.css';
import "./globals.css";

import { domain, metaTitle, pageLanguage, plausibleScriptUrl } from "@/constants";
import { GA_TRACKING_ID } from "@/lib/gtag";
import Script from "next/script";
import ClientWrapper from "../components/client_wrapper";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: metaTitle,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={pageLanguage}>
      <head>
        <Script defer data-domain={domain} src={plausibleScriptUrl}></Script>
        {/* Google Tag Manager - gtag.js */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <ClientWrapper>
            <main className="root_main">{children}</main>
            <Footer />
          </ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
