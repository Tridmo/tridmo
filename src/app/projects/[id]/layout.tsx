import { titles } from "@/constants";
import React from "react";

export const metadata = {
  title: titles.project,
};

export default function ProjectDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="project-details-layout">{children}</div>;
}
