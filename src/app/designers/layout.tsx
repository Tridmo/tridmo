import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.designers,
};

export default function DesignersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="designers-layout">{children}</div>;
}
