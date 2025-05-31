import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.interior,
};

export default function InteriorDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="interior-details-layout">{children}</div>;
}
