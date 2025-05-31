import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.models,
};

export default function ModelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="models-layout">
      {children}
    </div>
  );
}
