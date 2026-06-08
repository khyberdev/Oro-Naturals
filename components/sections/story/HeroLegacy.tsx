import { FadeIn } from "./FadeIn";

export function HeroLegacy() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-emerald-950">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: "url('/images/farm.jpeg')",
          backgroundPosition: "center 75%",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(197,162,83,0.25), transparent 45%), radial-gradient(circle at 75% 70%, rgba(255,255,255,0.08), transparent 40%)",
        }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-20 text-center">
        <FadeIn>
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-amber-500/70 sm:w-12" />
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-amber-500 sm:text-sm">
              Est. 2012 · Maraji, Nowshera
            </p>
            <span className="h-px w-10 bg-amber-500/70 sm:w-12" />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-serif text-4xl leading-[1.1] text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            Rooted in Tradition.
            <br />
            <span className="italic text-amber-400">Crafted with Passion.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            The Oro Naturals Legacy.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
