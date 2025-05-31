import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.brands,
};

export default function BrandsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="brands-layout">{children}</div>;
}
