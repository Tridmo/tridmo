import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.designer,
};

export default function DesignerProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="designer-profile-layout">
      {children}
    </div>
  );
} 