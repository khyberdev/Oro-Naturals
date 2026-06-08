import { FadeIn } from "./FadeIn";

export function Genesis() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-gradient-to-br from-emerald-800 to-emerald-950">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/farm2.jpeg')" }}
                />
                <span className="pointer-events-none absolute bottom-6 left-6 font-serif text-sm italic text-white/60">
                  Maraji, Nowshera · Est. 2012
                </span>
              </div>
              <div className="absolute -bottom-5 -left-5 -z-10 h-full w-full rounded-sm border border-amber-500/60" />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-600">
                The Genesis · 2012
              </p>
              <h2 className="mb-8 font-serif text-3xl leading-tight text-emerald-950 sm:text-4xl md:text-5xl">
                Our Roots in Maraji
              </h2>
              <div className="space-y-5 font-sans text-base leading-relaxed text-slate-600 md:text-lg">
                <p>
                  In 2012, Oro Naturals began as a humble, family-owned estate
                  spread across 43 acres of fertile land in Maraji, Nowshera —
                  in the heart of Khyber Pakhtunkhwa. What started as a single
                  vision soon took root in the soil itself.
                </p>
                <p>
                  As our roots deepened, so did our ambition. The family planted
                  a second home for the olive in{" "}
                  <span className="font-medium text-emerald-900">Kohat</span> — a
                  sweeping 81-acre grove where nearly{" "}
                  <span className="font-medium text-emerald-900">
                    10,000 olive trees
                  </span>{" "}
                  now rise from the Pakhtunkhwa earth, doubling our devotion to
                  the land and the craft.
                </p>
                <p>
                  In those early years, our devotion to purity earned the trust
                  of discerning partners. We supplied our cold-pressed oils
                  through respected wholesale relationships with{" "}
                  <span className="font-medium text-emerald-900">
                    Khaiti Technologies
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-emerald-900">Siddiquis</span>{" "}
                  — partnerships that became the foundation of everything we are
                  today.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
