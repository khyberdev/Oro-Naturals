"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

// Paste your Cloudinary delivery URL here (use q_auto/f_auto like the hero).
const OWNER_VIDEO_URL =
  "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780892134/Olive_vtirdd.mp4";

type FoundersVideoProps = {
  src?: string;
};

export function FoundersVideo({ src = OWNER_VIDEO_URL }: FoundersVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) void video.play().catch(() => {});
  };

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-sm bg-emerald-950">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        controls
        preload="metadata"
        className="h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className={cn(
          "absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/75",
          muted ? "opacity-100" : "opacity-0 hover:opacity-100",
        )}
      >
        {muted ? (
          <>
            <VolumeX className="h-4 w-4" />
            Tap to unmute
          </>
        ) : (
          <>
            <Volume2 className="h-4 w-4" />
            Mute
          </>
        )}
      </button>
    </div>
  );
}
