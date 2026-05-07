"use client";

import { useTRPC } from "@/trpc/client";
import { TextInputPanel } from "../components/text-input-panel";
import {
  defaultTTSValues,
  TextToSpeechForm,
  TTSFormValues,
} from "../components/text-to-speech-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { TTSVoicesProvider } from "../contexts/tts-voice-context";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";
import { SettingsPanel } from "../components/settings-panel";

export function TextToSpeechView({
  initialValues,
}: {
  initialValues?: Partial<TTSFormValues>;
}) {
  const trpc = useTRPC();
  const { data: voices } = useSuspenseQuery(trpc.voices.getAll.queryOptions());
  const { custom: customVoices, system: systemVoices } = voices;
  const allVoices = [...customVoices, ...systemVoices];

  const fallbackVoiceId = allVoices[0]?.id ?? "";

  // If no voice exists, render first available voice
  const resolvedVoiceId =
    initialValues?.voiceId &&
    allVoices.some((v) => v.id === initialValues.voiceId)
      ? initialValues.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    ...defaultTTSValues,
    ...initialValues,
    voiceId: resolvedVoiceId,
  };
  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col">
            <TextInputPanel />
            <VoicePreviewPlaceholder />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
}
