"use client";

import React, { createContext, useContext } from "react";
import type { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

// Goes into voices, gets all voices from "custom" and pass index
type TTSVoiceItem =
  inferRouterOutputs<AppRouter>["voices"]["getAll"]["custom"][number];

interface TTSVoicesContextValue {
  customVoices: TTSVoiceItem[];
  systemVoices: TTSVoiceItem[];
  allVoices: TTSVoiceItem[];
}

const TTSVoicesContext = createContext<TTSVoicesContextValue | null>(null);

export function TTSVoicesProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TTSVoicesContextValue;
}) {
  return (
    <TTSVoicesContext.Provider value={value}>
      {children}
    </TTSVoicesContext.Provider>
  );
}

export function useTTSVoices() {
  const context = useContext(TTSVoicesContext);

  if (!context) {
    throw new Error("useTTSVoices must be used within a TTSVoicesProvider");
  }

  return context;
}
