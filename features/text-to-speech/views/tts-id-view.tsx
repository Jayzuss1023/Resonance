"use client";

import { useSuspenseQueries } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import {
  TextToSpeechForm,
  type TTSFormValues,
} from "../components/text-to-speech-form";
import { VoicePreviewMobile } from "../components/voice-preview-mobile";
import { VoicePreviewPanel } from "../components/voice-preview-panel";
import { TTSVoicesProvider } from "../contexts/tts-voice-context";

export function TTSIdView({ id }: { id: string }) {
  const trpc = useTRPC();
  const [generationQuery, voicesQuery] = useSuspenseQueries({
    queries: [
      trpc.generations.getById.queryOptions({ id: id }),
      trpc.voices.getAll.queryOptions(),
    ],
  });

  const generationData = generationQuery.data;
  const { custom: customVoices, system: systemVoices } = voicesQuery.data;
  const allVoices = [...customVoices, ...systemVoices];

  const fallbackVoiceId = allVoices[0].id ?? "";

  // Fallback if voice does not exist in DB
  const resolvedVoiceId =
    generationData?.voiceId &&
    allVoices.some((v) => v.id === generationData.voiceId)
      ? generationData.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    text: generationData.text,
    voiceId: resolvedVoiceId,
    temperature: generationData.temperature,
    topP: generationData.topP,
    topK: generationData.topK,
    repetitionPenalty: generationData.repetitionPenalty,
  };

  const generationVoice = {
    id: generationData.voiceId ?? undefined,
    name: generationData.voiceName,
  };

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm key={id} defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col">
            <TextInputPanel />
            <VoicePreviewMobile
              audioUrl={generationData.audioUrl}
              voice={generationVoice}
              text={generationData.text}
            />
            <VoicePreviewPanel
              audioUrl={generationData.audioUrl}
              voice={generationVoice}
              text={generationData.text}
            />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
}
