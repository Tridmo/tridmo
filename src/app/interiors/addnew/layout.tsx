import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.newInterior,
};

export default function NewInteriorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="new-interior-layout">{children}</div>;
}
