// app/gtag-tracker.tsx
"use client";

import { GA_TRACKING_ID } from "@/lib/gtag";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function GTagTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
