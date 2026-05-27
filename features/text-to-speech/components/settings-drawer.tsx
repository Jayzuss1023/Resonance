import { Settings } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SettingsPanelSettings } from "./settings-panel-settings";

type SettingsDrawerProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
};

export function SettingsDrawer({
  open,
  onOpenChange,
  children,
}: SettingsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {children ?? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
        </DrawerHeader>
        <div>
          <SettingsPanelSettings />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
