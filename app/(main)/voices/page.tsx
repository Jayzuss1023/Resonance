import { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import { prefetch, trpc, HydrateClient } from "@/trpc/server";
import { voicesSearchParamsCache } from "@/features/voices/lib/params";
import { VoicesView } from "@/features/voices/views/voices-view";

export const metadata: Metadata = { title: "Voices" };

export default async function VoicesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query } = await voicesSearchParamsCache.parse(searchParams);

  prefetch(trpc.voices.getAll.queryOptions({ query }));

  return (
    <HydrateClient>
      <VoicesView />
    </HydrateClient>
  );
}
