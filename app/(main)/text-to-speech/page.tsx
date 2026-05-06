import { TextToSpeechView } from "@/features/text-to-speech/views/text-to-speech-view";
import { HydrateClient, prefretch, trpc } from "@/trpc/server";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Text to Speech" };

export default async function TextToSpeechPage({
  searchParams,
}: {
  searchParams: Promise<{ text?: string; voiceId?: string }>;
}) {
  const { text, voiceId } = await searchParams;

  prefretch(trpc.voices.getAll.queryOptions());

  return (
    <HydrateClient>
      <TextToSpeechView />
    </HydrateClient>
  );
}
