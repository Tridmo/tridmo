"use client";

import * as React from "react";
import DesignersPage from "../../components/screens/designers";

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Designers() {
  return (
    <section style={{ background: "#fafafa" }}>
      <React.Suspense>
        <DesignersPage />
      </React.Suspense>
    </section>
  );
}
