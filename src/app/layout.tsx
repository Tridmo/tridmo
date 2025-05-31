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
        <script
          defer
          data-domain={domain}
          src={plausibleScriptUrl}
        ></script>
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
