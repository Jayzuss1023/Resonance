"use client";

import { useRef, useState, useEffect } from "react";
import { Pause, Play, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { useIsMobile } from "@/hooks/use-mobile";

type VoicePreviewMobileVoiceProps = {
  id?: string;
  name: string;
};

export function VoicePreviewMobile({
  audioUrl,
  voice,
  text,
}: {
  audioUrl: string;
  voice: VoicePreviewMobileVoiceProps | null;
  text: string;
}) {
  const isMobile = useIsMobile();
  const selectedVoiceName = voice?.name ?? null;
  const selectedVoiceSeed = voice?.id ?? null;

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    audio.pause();
    audio.currentTime = 0;

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!isMobile) {
      audioRef.current?.pause();
    }
  }, [isMobile]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  };

  const handleDownload = () => {
    const safeName =
      text
        .slice(0, 50)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase() || "speech";

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${safeName}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="border-t lg:hidden p-4">
      <audio ref={audioRef} src={audioUrl} />
      <div className="grid grid-cols-[1fr_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{text}</p>
          {selectedVoiceName && (
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <VoiceAvatar
                seed={selectedVoiceSeed ?? selectedVoiceName}
                name={selectedVoiceName}
                className="shrink-0"
              />
              <span className="truncate">{selectedVoiceName}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleDownload}>
            <Download className="h-5 w-5" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="rounded-full"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="fill-background" />
            ) : (
              <Play className="fill-background" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
