import Link from "next/link";
import { ProductGrid } from "@/components/sections/ProductGrid";
import type { ProductCard } from "@/types/sanity";

interface FeaturedProductsProps {
  products: ProductCard[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-accent">
              Curated selection
            </p>
            <h2 className="mt-2 font-serif text-4xl text-foreground">
              Featured oils
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden font-sans text-sm uppercase tracking-[0.15em] text-primary underline-offset-4 hover:text-accent hover:underline sm:inline"
          >
            View all
          </Link>
        </div>
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
