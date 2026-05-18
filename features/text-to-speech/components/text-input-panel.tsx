"use client";

import { Coins } from "lucide-react";
import { useStore } from "@tanstack/react-form";

import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

import {
  COST_PER_UNIT,
  TEXT_MAX_LENGTH,
} from "@/features/text-to-speech/data/constants";
import { useState } from "react";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { TTSFormOptions } from "./text-to-speech-form";
import { GenerateButton } from "./generate-button";
import { PromptSuggestions } from "./prompt-suggestions";
import { VoiceSelectorButton } from "./voice-selector-button";
import { SettingsDrawer } from "./settings-drawer";

export function TextInputPanel() {
  const form = useTypedAppFormContext(TTSFormOptions);
  const text = useStore(form.store, (s) => s.values.text);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);
  const isValid = useStore(form.store, (s) => s.isValid);

  return (
    <div className="flex h-full min-h-0 flex-col flex-1">
      <div className="relative min-h-0 flex-1">
        <form.Field name="text">
          {(field) => (
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Start typing or paste your text here..."
              maxLength={TEXT_MAX_LENGTH}
              disabled={isSubmitting}
              className="absolute inset-0 resize-none border-0 bg-transparent p-4 lg:p-6 lg:pb-8 texst-base! leading-relaxed tracking-tight shadow-none wrap-break-word focus-visible:ring-0"
            />
          )}
        </form.Field>
        {/* Bottom fade overlay */}
        <div className="pointer-events-none bg-linear-to-t from-background to-transparent absolute inset-x-0 bottom-0 h-8" />
      </div>

      {/* Action Bar */}
      <div className="shrink-0 p-4 lg:p-6">
        {/* Mobile Layout */}
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="flex items-center gap-2">
            <SettingsDrawer>
              <VoiceSelectorButton />
            </SettingsDrawer>
          </div>
        </div>
        {/* Desktop Layout */}
        {text.length > 0 ? (
          <div className="hidden lg:flex items-center justify-between">
            <Badge variant="outline" className="gap-1.5 border-dashed">
              <Coins className="size-3 text-chart-5" />
              <span className="text-xs">
                <span className="tabular-nums">
                  ${(text.length * COST_PER_UNIT).toFixed(4)}
                </span>
                &nbsp; estimated
              </span>
            </Badge>
            <div>
              <p>
                {text.length.toLocaleString()}
                <span>
                  &nbsp;/&nbsp;{TEXT_MAX_LENGTH.toLocaleString()} characters
                </span>
              </p>
              <GenerateButton
                size="sm"
                disabled={isSubmitting || !isValid}
                isSubmitting={isSubmitting}
                onSubmit={() => form.handleSubmit()}
              />
            </div>
          </div>
        ) : (
          <div className="hidden lg:block">
            <PromptSuggestions
              onSelect={(prompt) => form.setFieldValue("text", prompt)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
