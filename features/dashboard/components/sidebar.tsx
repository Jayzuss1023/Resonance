"use client";
import { SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { open } = useSidebar();
  return (
    <>
      <DashboardSidebar />
      <SidebarInset className="min-h-0 min-w-0">
        <main
          className={`min-h-screen transition-all duration-300 ease-in-out ${
            open
              ? "md:ml-5 xl:ml-10 max-xl:overflow-hidden max-xl:h-screen"
              : ""
          }`}
        >
          {children}
        </main>
      </SidebarInset>
    </>
  );
}
