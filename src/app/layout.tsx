import Providers from "@/components/providers";
import RightBar from "@/components/right_bar";
import Footer from "@/components/views/footer";
import Navbar from "@/components/views/navbar";
import "@/styles/carousel.module.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Box } from "@mui/system";
import NextTopLoader from "nextjs-toploader";
import AlertWrapper from "../components/alert";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Demod",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          defer
          data-domain="demod.uz"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader
            color="#7210BE"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            zIndex={5001}
          />
          <Box sx={{ position: "realtive" }}>
            {/* <TopLoading /> */}
            <AlertWrapper />
          </Box>
          <Navbar />
          <RightBar />
          <Box pt={'80px'}>
          {children}
          </Box>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
