import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "./FadeIn";

export function ClosingInvitation() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <div className="mx-auto mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-amber-500/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span className="h-px w-12 bg-amber-500/70" />
          </div>
          <h2 className="font-serif text-3xl leading-tight text-emerald-950 text-balance sm:text-4xl md:text-5xl">
            Taste the Legacy
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-slate-600 md:text-lg">
            Every bottle carries the soil, sun, and devotion of our estate in
            Maraji. Discover the oils our family has perfected since 2012.
          </p>
          <Link
            href="/shop"
            className="group mt-10 inline-flex items-center gap-3 rounded-sm border border-emerald-950 bg-emerald-950 px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-transparent hover:text-emerald-950"
          >
            Explore the Collection
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
