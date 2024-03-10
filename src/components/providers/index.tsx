"use client"

import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from '@/utils/auth'
import store from "@/store";
import ThemeProviderWrapper from '@/theme/ThemeProvider';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProviderWrapper>
            <CookiesProvider>

              {children}

            </CookiesProvider>
          </ThemeProviderWrapper>
        </AuthProvider>
      </Provider>
    </>
  );
}