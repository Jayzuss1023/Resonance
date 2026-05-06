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

export function TextInputPanel() {
  const form = useTypedAppFormContext(TTSFormOptions);
  const text = useStore(form.store, (s) => s.values.text);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);

  return (
    <div>
      <div>
        <form.Field name="text">
          {(field) => (
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Start typing or paste your text here..."
              maxLength={TEXT_MAX_LENGTH}
              disabled={isSubmitting}
            />
          )}
        </form.Field>
      </div>
    </div>
  );
}
