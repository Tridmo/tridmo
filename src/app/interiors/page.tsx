"use client"

import { Suspense } from "react";
import InteriorsPage from "../../components/screens/interiors";

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Interiors() {
  return (
    <section style={{ background: "#fafafa" }}>
      <Suspense>
        <InteriorsPage />
      </Suspense>
    </section>
  );
}
