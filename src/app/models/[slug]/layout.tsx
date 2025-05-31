import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.model,
};

export default function ModelDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="model-details-layout">{children}</div>;
}
