import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.brand,
};

export default function BrandDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="brand-details-layout">{children}</div>;
}
