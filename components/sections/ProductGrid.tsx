import { ProductCard } from "@/components/ui/ProductCard";
import type { ProductCard as ProductCardType } from "@/types/sanity";

interface ProductGridProps {
  products: ProductCardType[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "No products found. Add products in the Sanity Studio at /admin.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-24 text-center font-sans text-oro-charcoal/60">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          priority={index < 3}
        />
      ))}
    </div>
  );
}
