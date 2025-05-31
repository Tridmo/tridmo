import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.editInterior,
};

export default function EditInteriorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="edit-interior-layout">{children}</div>;
}
