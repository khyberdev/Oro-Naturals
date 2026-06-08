import Link from "next/link";
import { Droplets, ShieldCheck, Leaf, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: Droplets,
    title: "Cold-Pressed",
    description:
      "Extracted below 27°C to preserve every polyphenol, aroma, and note of the fresh-picked fruit.",
  },
  {
    icon: ShieldCheck,
    title: "EVO Quality",
    description:
      "Certified extra virgin — acidity held to the lowest thresholds for unrivaled purity.",
  },
  {
    icon: Leaf,
    title: "7 Distinct Varieties",
    description:
      "Arbequina, Koroneiki, and five more cultivars, each lending its own character to the blend.",
  },
];

export function ArtOfExtraction() {
  return (
    <section className="bg-emerald-950 py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-500">
            From Grove to Bottle
          </p>
          <h2 className="font-serif text-3xl text-white sm:text-4xl md:text-5xl">
            The Art of Extraction
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            A meticulous craft where modern precision meets time-honored
            patience — protecting the soul of the olive at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center md:text-left">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/40 md:mx-0">
                <pillar.icon className="h-6 w-6 text-amber-500" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 font-serif text-xl text-white md:text-2xl">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/65 md:text-base">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center md:mt-20">
          <Link
            href="/extraction-process"
            className="group inline-flex items-center gap-2 border-b border-amber-500 pb-1 text-sm font-medium uppercase tracking-[0.15em] text-amber-400 transition-colors duration-300 hover:border-white hover:text-white"
          >
            Watch Our Full Extraction Process
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
