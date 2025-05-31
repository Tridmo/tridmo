import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.profile,
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="profile-layout">{children}</div>;
}
