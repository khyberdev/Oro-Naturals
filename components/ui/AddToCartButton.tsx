"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import type { ProductDetail } from "@/types/sanity";

interface AddToCartButtonProps {
  product: ProductDetail;
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [added, setAdded] = useState(false);
  const outOfStock = product.stockLevel <= 0;

  const handleAdd = () => {
    if (outOfStock) return;
    addItem(product, 1);
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={outOfStock}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 bg-oro-green px-8 py-4 font-sans text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-oro-charcoal disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
      {outOfStock ? "Out of stock" : added ? "Added to bag" : "Add to bag"}
    </button>
  );
}
