import { quickActions } from "../data/quick-actions";
import { QuickActionCard } from "./quick-action.card";

export function QuickActionsPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Quick actions</h2>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((action) => (
          <QuickActionCard
            key={action.title}
            title={action.title}
            description={action.description}
            gradient={action.gradient}
            href={action.href}
          />
        ))}
      </div>
    </div>
  );
}
