"use client";

// Client component: starts the muted loop after mount (skipped under
// prefers-reduced-motion) and gives it a pause/play button, which looping
// motion needs for accessibility.

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type LoopingVideoProps = { src: string; label: string; width: number; height: number };

export function LoopingVideo({ src, label, width, height }: LoopingVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {});
    // Also runs when Next hides this page after navigating away.
    return () => video.pause();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-text-primary">
      <video
        ref={ref}
        src={src}
        width={width}
        height={height}
        aria-label={label}
        muted
        loop
        playsInline
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block h-auto w-full"
      />
      <Button size="sm" onClick={toggle} className="absolute right-3 bottom-3">
        {playing ? "PAUSE" : "PLAY"}
      </Button>
    </div>
  );
}
