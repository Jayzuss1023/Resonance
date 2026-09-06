import { PageHeader } from "@/components/page-header";
import { DashboardHeader } from "../components/dashboard-header";
import { HeroPattern } from "../components/hero-pattern";
import { QuickActionsPanel } from "../components/quick-actions-panel";
import { TextInputPanel } from "../components/text-inut-panel";

export function DashboardView() {
  return (
    <div className="relative">
      <PageHeader title="Dashboard" />
      <HeroPattern />
      <div className="relative space-y-8 p-4 lg:p-16">
        <DashboardHeader />
        <TextInputPanel />
        <QuickActionsPanel />
      </div>
    </div>
  );
}
