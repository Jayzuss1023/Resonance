import { TTSIdView } from "@/features/text-to-speech/views/tts-id-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export default async function TTSIDPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  prefetch(trpc.generations.getById.queryOptions({ id: id }));
  prefetch(trpc.voices.getAll.queryOptions());
  prefetch(trpc.generations.getAll.queryOptions());

  return (
    <HydrateClient>
      <TTSIdView id={id} />
    </HydrateClient>
  );
}
