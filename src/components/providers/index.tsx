"use client"

import { AuthProvider } from "@/components/providers/auth";
import store from "@/store";
import ThemeProviderWrapper from "@/theme/ThemeProvider";
import dynamic from "next/dynamic";
import React from "react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";

const WeavyProvider = dynamic(() => import("./weavy"), { ssr: false });

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <AuthProvider>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </AuthProvider>
      </CookiesProvider>
    </Provider>
  );
}