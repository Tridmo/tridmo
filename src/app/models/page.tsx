"use client"

import ModelsPage from "@/components/screens/models";
import { Suspense } from "react";

export default function Models() {
  return (
    <section style={{ background: "#fafafa" }}>
      <Suspense>
        <ModelsPage />
      </Suspense>
    </section>
  );
}
