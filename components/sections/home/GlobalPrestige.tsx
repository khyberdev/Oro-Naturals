import Link from "next/link";
import { ArrowRight } from "lucide-react";

const mentions = [
  "Praised by French & Pakistani Press",
  "Exclusive IOC Executive Visit",
  "Featured in EU Culinary Media",
  "Gold Standard Cold-Pressed EVOO",
  "Recognized for Sustainable Farming",
  "Trusted by Michelin-Starred Kitchens",
];

export function GlobalPrestige() {
  const loop = [...mentions, ...mentions];

  return (
    <section className="bg-slate-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-600">
          Global Prestige
        </p>
        <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl md:text-5xl">
          Celebrated Across Continents
        </h2>
      </div>

      <div className="group relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent" />

        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {loop.map((mention, index) => (
            <div
              key={`${mention}-${index}`}
              className="flex items-center gap-3 rounded-sm border border-border bg-white px-8 py-5"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
              <span className="whitespace-nowrap font-serif text-lg text-emerald-950">
                {mention}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/accolades"
          className="group inline-flex items-center gap-3 rounded-sm bg-emerald-950 px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-amber-600"
        >
          Read More About It
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
