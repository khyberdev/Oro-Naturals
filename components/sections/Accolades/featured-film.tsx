"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

const FEATURE_VIDEO_URL =
  "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780895687/WhatsApp_Video_2026-05-22_at_3.27.11_AM_bv1z0m.mp4";

export function FeaturedFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    video.muted = false;
    void video.play().catch(() => {});
  };

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            As Featured By
          </p>
          <h2 className="font-serif text-3xl text-primary sm:text-4xl md:text-5xl">
            The European Union in Pakistan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-foreground/65">
            Our family estate in Nowshera was spotlighted by the European Union
            in Pakistan — a celebration of the partnership between Pakistani
            growers and European olive expertise.
          </p>
        </div>

        <div className="group relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-sm bg-primary shadow-2xl ring-1 ring-accent/20">
          <video
            ref={videoRef}
            playsInline
            controls={started}
            preload="metadata"
            className="h-full w-full object-cover"
          >
            <source src={FEATURE_VIDEO_URL} type="video/mp4" />
          </video>

          {!started && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play video"
              className="absolute inset-0 z-10 flex items-center justify-center bg-primary/40 transition-colors duration-300 hover:bg-primary/30"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/90 text-primary shadow-2xl ring-1 ring-white/30 transition-transform duration-300 hover:scale-110">
                <Play className="ml-1 h-8 w-8 fill-current" />
              </span>
            </button>
          )}
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center font-sans text-sm italic text-foreground/55">
          Featured on the European Union in Pakistan page — celebrating olive
          culture as a bridge between Italy and Pakistan.
        </p>
      </div>
    </section>
  );
}
