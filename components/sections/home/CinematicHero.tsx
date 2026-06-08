"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Droplet } from "lucide-react";

const HERO_VIDEO_URL =
  "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780884011/Video_Project_5_y8ermk.mp4";

export function CinematicHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = true;

    const restart = () => {
      video.currentTime = 0;
      void video.play().catch(() => {});
    };

    video.addEventListener("ended", restart);
    void video.play().catch(() => {});

    return () => video.removeEventListener("ended", restart);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-emerald-950">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10 bg-emerald-950/45" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/10 to-black/55" />

      <div className="relative z-20 mx-auto max-w-4xl px-6 pt-32 text-center">
        <p className="mb-6 animate-fade-in text-xs font-medium uppercase tracking-[0.35em] text-oro-gold sm:text-sm">
          Nature&apos;s Luxury · Since 2012
        </p>

        <h1 className="mb-8 font-serif text-4xl font-medium leading-[1.1] text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          The Purest Expression
          <br />
          <span className="italic text-oro-gold">of Nature.</span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-white/80 text-pretty sm:text-lg md:text-xl">
          Premium, Cold-Pressed Extra Virgin Olive Oil from the heart of KPK —
          Nowshera &amp; Kohat.
        </p>

        <Link
          href="/shop"
          className="group inline-flex items-center gap-3 rounded-sm border border-oro-gold bg-oro-gold px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-emerald-950 transition-all duration-300 hover:bg-transparent hover:text-oro-gold"
        >
          Explore the Collection
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <div className="mt-8 flex justify-center">
          <Droplet
            className="h-10 w-5 animate-bounce fill-oro-oil-deep text-oro-oil"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </section>
  );
}
