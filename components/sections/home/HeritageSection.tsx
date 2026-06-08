import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeritageSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-slate-100">
              <Image
                src="/images/owners-portrait.png"
                alt="The Oro Naturals family estate"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-sm border border-amber-500/60" />
          </div>

          <div className="lg:pl-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-600">
              Our Heritage
            </p>

            <h2 className="mb-8 font-serif text-3xl leading-tight text-emerald-950 sm:text-4xl md:text-5xl">
              Rooted in Tradition,
              <br />
              Crafted with Passion.
            </h2>

            <p className="text-base leading-relaxed text-slate-600 md:text-lg">
              Established in 2012, Oro Naturals is a proud family-owned estate
              spanning 43 acres in Maraji, Nowshera. Across these groves, every
              tree is tended by hand and every harvest honored with patience —
              uniting generations of devotion with an unwavering pursuit of
              purity in every golden drop.
            </p>

            <Link
              href="/our-story"
              className="group mt-10 inline-flex items-center gap-2 border-b border-emerald-900 pb-1 text-sm font-medium uppercase tracking-[0.15em] text-emerald-900 transition-colors duration-300 hover:border-amber-600 hover:text-amber-600"
            >
              Read Our Story
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
