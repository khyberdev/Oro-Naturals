import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SiteSettings } from "@/types/sanity";

interface HeroSectionProps {
  settings: SiteSettings | null;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const storyExcerpt =
    settings?.ourStory ??
    "Premium, cold-pressed extra virgin olive oil from the heart of Khyber Pakhtunkhwa.";

  return (
    <section className="relative -mt-20 flex min-h-screen items-center justify-center overflow-hidden bg-primary pt-20">
      {settings?.heroVideoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        >
          <source src={settings.heroVideoUrl} />
        </video>
      ) : (
        <div className="absolute inset-0 bg-[url('/olive-pattern.svg')] opacity-5" />
      )}

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/85 to-primary/95" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-6 animate-fade-in text-xs font-medium uppercase tracking-[0.3em] text-accent sm:text-sm">
          Premium Quality Since 2012
        </p>

        <h1 className="mb-8 font-serif text-4xl leading-tight text-primary-foreground text-balance sm:text-5xl md:text-6xl lg:text-7xl">
          The Purest Expression
          <br />
          <span className="italic">of Nature</span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-primary-foreground/80 text-pretty sm:text-lg md:text-xl">
          {storyExcerpt}
        </p>

        <Link
          href="/shop"
          className="group inline-flex items-center gap-3 bg-accent px-8 py-4 text-sm font-medium uppercase tracking-wider text-accent-foreground transition-all duration-300 hover:bg-background hover:text-primary"
        >
          Shop Now
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-primary-foreground/50 pt-2">
            <div className="h-2 w-1 rounded-full bg-primary-foreground/70" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
