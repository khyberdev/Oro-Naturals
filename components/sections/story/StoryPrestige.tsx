import { Building2, Landmark, Newspaper } from "lucide-react";
import { FadeIn } from "./FadeIn";

const honours = [
  {
    icon: Landmark,
    title: "Exclusive IOC Executive Visit",
    description:
      "The Executive Director of the International Olive Council paid a distinguished visit to our estate — a rare honour reserved for the world's finest groves.",
  },
  {
    icon: Building2,
    title: "Featured by the European Union",
    description:
      "Our cold-pressed extra virgin olive oil was spotlighted by the European Union, recognising its exceptional quality on a global stage.",
  },
  {
    icon: Newspaper,
    title: "Praised by French & Pakistani Press",
    description:
      "From Parisian culinary journals to national Pakistani media, our craft has been celebrated across continents and cultures.",
  },
];

export function StoryPrestige() {
  return (
    <section className="bg-emerald-950 py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-500">
            Global Prestige
          </p>
          <h2 className="font-serif text-3xl text-white sm:text-4xl md:text-5xl">
            Recognized by the World
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {honours.map((honour, i) => (
            <FadeIn key={honour.title} delay={i * 0.12}>
              <div className="flex h-full flex-col border-t border-amber-500/30 pt-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/40">
                  <honour.icon
                    className="h-6 w-6 text-amber-500"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mb-4 font-serif text-xl text-white md:text-2xl">
                  {honour.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-white/65 md:text-base">
                  {honour.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
