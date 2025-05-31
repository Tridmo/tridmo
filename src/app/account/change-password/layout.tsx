import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.changePassword,
};

export default function ChangePasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="change-password-layout">{children}</div>;
}
