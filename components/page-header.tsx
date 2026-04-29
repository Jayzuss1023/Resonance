import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  className?: string;
}

export function PageHeader({ title, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b px-4 py-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibol tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" asChild>
          <Link href="mailto:jesus.flo369@gmail.com">
            <ThumbsUp className="h-5 w-5" />
            <span className="hidden lg:block">Feedback</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="mailto:jesus.flo369@gmail.com">
            <Headphones className="h-5 w-5" />
            <span className="hidden lg:block">Need help?</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
