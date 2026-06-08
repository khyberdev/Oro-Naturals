import { Award, Droplets, Leaf } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProcessPillar {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processPillars: ProcessPillar[] = [
  {
    title: "Cold-Pressed",
    icon: Droplets,
    description:
      "Harvested olives are milled within hours and extracted below 27°C — never heated, never refined. This gentle mechanical process preserves polyphenols, aroma, and the vivid green character that defines true extra virgin oil.",
  },
  {
    title: "EVO Quality",
    icon: Award,
    description:
      "Every batch is tested for acidity, peroxide value, and sensory profile before it earns the extra virgin designation. We bottle only at peak freshness so what reaches your table reflects the grove at its finest.",
  },
  {
    title: "Sustainable Farming",
    icon: Leaf,
    description:
      "From water-conscious irrigation to zero-waste milling, our practices honour the land that sustains us. Healthy soil, balanced biodiversity, and responsible stewardship are woven into every stage of production.",
  },
];

export function ProcessPillars() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16 lg:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Our Standards
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Crafted with intention
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Three principles guide every drop — from the first harvest to the final seal.
          </p>
        </div>

        <div className="grid gap-10 sm:gap-12 md:grid-cols-3 lg:gap-16">
          {processPillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className="flex flex-col rounded-lg border border-border bg-card p-6 sm:p-8 lg:p-10"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>

                <h3 className="font-serif text-2xl text-foreground sm:text-3xl">
                  {pillar.title}
                </h3>

                <div className="mt-4 h-px w-12 bg-accent" aria-hidden />

                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
