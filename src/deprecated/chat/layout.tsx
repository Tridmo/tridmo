import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.chat,
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="chat-layout">{children}</div>;
}
