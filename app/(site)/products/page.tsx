import type { Metadata } from "next";
import { CategoryFilter } from "@/components/sections/CategoryFilter";
import { ProductGrid } from "@/components/sections/ProductGrid";
import {
  getCategories,
  getCategoryBySlug,
  getProducts,
  getProductsByCategory,
} from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Shop | Oro Naturals",
  description: "Explore our collection of premium olive oils and natural products.",
};

interface ProductsPageProps {
  searchParams: { category?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const categorySlug = searchParams.category;
  const [categories, products, activeCategory] = await Promise.all([
    getCategories(),
    categorySlug ? getProductsByCategory(categorySlug) : getProducts(),
    categorySlug ? getCategoryBySlug(categorySlug) : Promise.resolve(null),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8">
      <header className="max-w-2xl">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-oro-gold">
          Collection
        </p>
        <h1 className="mt-2 font-serif text-5xl text-oro-green">
          {activeCategory ? activeCategory.name : "All products"}
        </h1>
        <p className="mt-4 font-sans text-oro-charcoal/70">
          {activeCategory?.description ??
            "Hand-selected olive oils and artisanal goods, crafted for the discerning table."}
        </p>
      </header>

      <div className="mt-10">
        <CategoryFilter categories={categories} activeSlug={categorySlug} />
      </div>

      <div className="mt-12">
        <ProductGrid
          products={products}
          emptyMessage={
            categorySlug
              ? "No products in this category yet."
              : undefined
          }
        />
      </div>
    </div>
  );
}
