import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.interiors,
};

export default function InteriorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="interiors-layout">{children}</div>;
}
