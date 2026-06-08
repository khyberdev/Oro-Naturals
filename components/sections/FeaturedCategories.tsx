import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types/sanity";

interface FeaturedCategoriesProps {
  categories: Category[];
}

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section id="shop" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Our Collection
          </p>
          <h2 className="mb-6 font-serif text-3xl text-foreground sm:text-4xl md:text-5xl">
            Featured Categories
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-muted-foreground">
            Discover our carefully curated selection of premium olive products,
            each crafted with generations of expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/shop?category=${category.slug}`}
              className="group relative rounded-lg border border-border bg-card p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-accent hover:shadow-xl"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-2xl font-serif text-primary transition-transform duration-500 group-hover:scale-110">
                {category.name.charAt(0)}
              </div>

              <h3 className="mb-2 font-serif text-xl text-foreground transition-colors duration-300 group-hover:text-primary">
                {category.name}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-3">
                {category.description}
              </p>

              <div className="absolute right-4 top-4 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5 text-accent" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
