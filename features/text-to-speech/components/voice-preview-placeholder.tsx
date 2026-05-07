import Link from "next/link";
import { AudioLines, BookOpen, Sparkles, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function VoicePreviewPlaceholder() {
  return (
    <div className="hidden lg:flex flex-1 h-full flex-col items-center justify-center gap-6 border-t">
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex w-32 items-center justify-center">
          <div className="absolute left-0 -rotate-30 rounded-full bg-muted p-4">
            <Volume2 className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="relative z-10 bg-foreground rounded-full p-4">
            <Sparkles className="h-5 w-5 text-background" />
          </div>

          <div className="absolute right-0 -rotate-30 rounded-full bg-muted p-4">
            <AudioLines className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <p>Preview will appear here</p>

        <p>
          Once you generate, your audio result will appear here. Sit back and
          relax.
        </p>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href="mailto:jesus.flo369@gmail.com">
          <BookOpen />
          Don&apos;t know how?
        </Link>
      </Button>
    </div>
  );
}
