import Providers from "@/components/providers";
import RightBar from "@/components/right_bar";
import Footer from "@/components/views/footer";
import Navbar from "@/components/views/navbar";
import '@/styles/carousel.module.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from 'react';
import "./globals.css";


import { Box } from '@mui/system';
import AlertWrapper from '../components/alert';

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Demod"
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ru">
      <head>
        <script defer data-domain="demod.uz" src="https://plausible.io/js/script.js"></script>
      </head>
      <body className={inter.className}>
        <Providers>
          <Box sx={{ position: 'realtive' }}>
            {/* <TopLoading /> */}
            <AlertWrapper />
          </Box>

          <Navbar />
          <RightBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
