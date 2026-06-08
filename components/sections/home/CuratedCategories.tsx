import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Extra Virgin Olive Oil",
    tagline: "The signature cold-pressed gold",
    href: "/shop",
    image: "/images/Extra%20Virgin%20Olive%20Oil.png",
  },
  {
    name: "Flavored Oils",
    tagline: "Infused with herbs & citrus",
    href: "/shop",
    image: "/images/Flavoured%20OIl.png",
  },
  {
    name: "Olive Vinegar",
    tagline: "Aged for depth & balance",
    href: "/shop",
    image: "/images/Olive%20Vinegar.png",
  },
  {
    name: "Olive Green Tea",
    tagline: "Leaves steeped in wellness",
    href: "/shop",
    image: "/images/Olive%20Green%20tea.png",
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
                className="absolute inset-0 scale-110 bg-emerald-950 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-125"
                style={{ backgroundImage: `url('${category.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20 transition-colors duration-500 group-hover:from-black/90" />

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
