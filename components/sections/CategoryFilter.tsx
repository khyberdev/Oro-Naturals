import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/sanity";

interface CategoryFilterProps {
  categories: Category[];
  activeSlug?: string;
}

export function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/shop"
        className={cn(
          "border px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] transition-colors",
          !activeSlug
            ? "border-oro-green bg-oro-green text-white"
            : "border-oro-charcoal/20 text-oro-charcoal hover:border-oro-gold hover:text-oro-gold",
        )}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat._id}
          href={`/shop?category=${cat.slug}`}
          className={cn(
            "border px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] transition-colors",
            activeSlug === cat.slug
              ? "border-oro-green bg-oro-green text-white"
              : "border-oro-charcoal/20 text-oro-charcoal hover:border-oro-gold hover:text-oro-gold",
          )}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
