"use client"

import * as React from 'react';
import BrandsPage from '../../components/screens/brands';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Brands() {

  return (
    <>
      <section style={{ background: "#fafafa" }}>
        <React.Suspense>
          <BrandsPage />
        </React.Suspense>
      </section>
    </>
  )
}
