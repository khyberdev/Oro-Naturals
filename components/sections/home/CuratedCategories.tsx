import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Extra Virgin Olive Oil",
    tagline: "The signature cold-pressed gold",
    href: "/shop",
    gradient: "from-emerald-800 to-emerald-950",
  },
  {
    name: "Flavored Oils",
    tagline: "Infused with herbs & citrus",
    href: "/shop",
    gradient: "from-amber-700 to-emerald-900",
  },
  {
    name: "Olive Vinegar",
    tagline: "Aged for depth & balance",
    href: "/shop",
    gradient: "from-emerald-900 to-stone-800",
  },
  {
    name: "Olive Green Tea",
    tagline: "Leaves steeped in wellness",
    href: "/shop",
    gradient: "from-emerald-700 to-emerald-950",
  },
];

export function CuratedCategories() {
  return (
    <section className="bg-slate-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-600">
            Our Collection
          </p>
          <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl md:text-5xl">
            Curated for the Discerning Palate
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-sm"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-transform duration-700 ease-out group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />

              <div className="relative z-10 p-7">
                <h3 className="font-serif text-xl text-white md:text-2xl">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-white/70">{category.tagline}</p>

                <span className="mt-4 inline-flex translate-y-2 items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-amber-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Shop
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
