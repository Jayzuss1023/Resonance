import { cookies } from "next/headers";

import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import React, { PropsWithChildren } from "react";
import { Sidebar } from "@/features/dashboard/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="h-svh">
      <Sidebar children={children} />
    </SidebarProvider>
  );
}
