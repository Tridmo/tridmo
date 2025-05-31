import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.aboutUs,
};

export default function AboutUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="about-us-layout">{children}</div>;
}
