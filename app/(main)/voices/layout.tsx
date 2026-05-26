import { PageHeader } from "@/components/page-header";
import React from "react";

export default function VoicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader title="Voices" />
      {children}
    </div>
  );
}
