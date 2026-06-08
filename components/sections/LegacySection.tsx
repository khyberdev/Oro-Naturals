import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SiteSettings } from "@/types/sanity";

interface LegacySectionProps {
  settings: SiteSettings | null;
}

export function LegacySection({ settings }: LegacySectionProps) {
  const story =
    settings?.ourStory ??
    "Since 2012, Oro Naturals has cultivated exceptional olives in Maraji, Nowshera — honoring heritage while crafting oils for the modern table.";

  return (
    <section id="story" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40">
                <div className="p-8 text-center">
                  <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-primary/20">
                    <svg
                      className="h-16 w-16 text-primary/60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-primary/70">
                    Oro Naturals Estate
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-lg border-2 border-accent" />
          </div>

          <div className="lg:pl-8">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Our Heritage
            </p>

            <h2 className="mb-8 font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
              The Oro Legacy
            </h2>

            <p className="leading-relaxed text-muted-foreground">{story}</p>

            {settings?.address && (
              <address className="mt-6 not-italic text-sm leading-relaxed text-muted-foreground">
                {settings.address}
              </address>
            )}

            <div className="mt-8 border-t border-border pt-8">
              <p className="mb-2 font-serif text-xl italic text-foreground">
                &ldquo;Every bottle tells our story&rdquo;
              </p>
              <p className="text-sm text-muted-foreground">
                — The Oro Naturals Family
              </p>
            </div>

            <Link
              href="/our-story"
              className="group mt-8 inline-flex items-center gap-2 font-medium tracking-wide text-primary transition-colors duration-300 hover:text-accent"
            >
              Read Full Story
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
