import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeritageSection() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <figure className="relative">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(60% 55% at 50% 45%, rgba(197,162,83,0.12), transparent 70%)",
              }}
            />

            <div className="relative aspect-[4/5]">
              <Image
                src="/images/owners-portrait.png"
                alt="Salahuddin Khattak and Abdullah Khattak, the Oro Naturals family"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-bottom"
                priority
              />
            </div>

            <figcaption className="mt-2 text-center">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-amber-600">
                Father &amp; Son
              </p>
              <div className="mx-auto my-4 h-px w-10 bg-amber-500/60" />
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
                <div>
                  <p className="font-serif text-lg text-emerald-950">
                    Salahuddin Khattak
                  </p>
                  <p className="font-sans text-xs uppercase tracking-[0.15em] text-slate-500">
                    Founder &amp; Owner
                  </p>
                </div>
                <span className="hidden h-8 w-px bg-emerald-950/15 sm:block" />
                <div>
                  <p className="font-serif text-lg text-emerald-950">
                    Abdullah Khattak
                  </p>
                  <p className="font-sans text-xs uppercase tracking-[0.15em] text-slate-500">
                    Co-Founder
                  </p>
                </div>
              </div>
            </figcaption>
          </figure>

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
              rooted across two farms in Khyber Pakhtunkhwa — 43 acres in
              Nowshera and 81 acres in Kohat. Across these groves, every tree is
              tended by hand and every harvest honored with patience — uniting
              generations of devotion with an unwavering pursuit of purity in
              every golden drop.
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
