"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { formatMoney } from "@/lib/currency";
import { effectivePrice, isOnSale } from "@/lib/format";
import { sanityImageUrl } from "@/lib/images";
import { cn } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD_PKR = 5000;

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const cartTotal = useCartStore((s) => s.cartTotal);

  const { currency, pkrPerUsd } = useCurrency();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const subtotal = mounted ? cartTotal() : 0;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_PKR - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_PKR) * 100);
  const hasItems = mounted && items.length > 0;

  return (
    <>
      <div
        aria-hidden
        onClick={closeCart}
        className={cn(
          "fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={cn(
          "fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-oro-cream shadow-2xl transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-oro-charcoal/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-oro-green" strokeWidth={1.5} />
            <h2 className="font-serif text-xl text-oro-green">Your Bag</h2>
            {hasItems && (
              <span className="rounded-full bg-oro-green/10 px-2 py-0.5 font-sans text-xs font-medium text-oro-green">
                {items.reduce((n, i) => n + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="rounded-full p-1.5 text-oro-charcoal/60 transition-colors hover:bg-oro-charcoal/5 hover:text-oro-charcoal"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {hasItems && (
          <div className="border-b border-oro-charcoal/10 bg-white/50 px-6 py-4">
            {remaining > 0 ? (
              <p className="font-sans text-xs text-oro-charcoal/70">
                Add{" "}
                <span className="font-semibold text-oro-green">
                  {formatMoney(remaining, currency, pkrPerUsd)}
                </span>{" "}
                more for free shipping
              </p>
            ) : (
              <p className="font-sans text-xs font-medium text-oro-green">
                You&apos;ve unlocked free shipping
              </p>
            )}
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-oro-charcoal/10">
              <div
                className="h-full rounded-full bg-oro-gold transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!hasItems ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-oro-green/5">
                <ShoppingBag
                  className="h-9 w-9 text-oro-green/40"
                  strokeWidth={1.25}
                />
              </div>
              <p className="font-serif text-xl text-oro-green">
                Your bag is empty
              </p>
              <p className="mt-2 max-w-xs font-sans text-sm text-oro-charcoal/60">
                Discover our cold-pressed oils and curated collection.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-6 inline-flex items-center justify-center bg-oro-green px-7 py-3 font-sans text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-oro-charcoal"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-oro-charcoal/10">
              {items.map(({ product, quantity }) => {
                const imageUrl = sanityImageUrl(product.mainImage, 160);
                const unit = effectivePrice(product.price, product.discountPrice);
                const onSale = isOnSale(product.price, product.discountPrice);
                return (
                  <li key={product._id} className="flex gap-4 py-4">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={closeCart}
                      className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-white"
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.mainImage?.alt ?? product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center font-serif text-xs text-oro-charcoal/30">
                          No image
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          {product.category && (
                            <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-oro-gold">
                              {product.category.name}
                            </p>
                          )}
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={closeCart}
                            className="font-serif text-base leading-snug text-oro-green hover:text-oro-gold"
                          >
                            {product.name}
                          </Link>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(product._id)}
                          aria-label={`Remove ${product.name}`}
                          className="h-fit rounded p-1 text-oro-charcoal/40 transition-colors hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between pt-3">
                        <div className="flex items-center rounded-sm border border-oro-charcoal/15">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product._id, quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center text-oro-charcoal/70 transition-colors hover:bg-oro-charcoal/5 hover:text-oro-charcoal"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center font-sans text-sm text-oro-charcoal">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product._id, quantity + 1)
                            }
                            disabled={quantity >= product.stockLevel}
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center text-oro-charcoal/70 transition-colors hover:bg-oro-charcoal/5 hover:text-oro-charcoal disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p
                            className={cn(
                              "font-sans text-sm font-medium",
                              onSale ? "text-oro-green" : "text-oro-charcoal",
                            )}
                          >
                            {formatMoney(unit * quantity, currency, pkrPerUsd)}
                          </p>
                          {quantity > 1 && (
                            <p className="font-sans text-[11px] text-oro-charcoal/50">
                              {formatMoney(unit, currency, pkrPerUsd)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {hasItems && (
          <footer className="border-t border-oro-charcoal/10 bg-white px-6 py-5">
            <div className="flex items-center justify-between font-sans text-sm text-oro-charcoal/70">
              <span>Subtotal</span>
              <span className="text-base font-medium text-oro-green">
                {formatMoney(subtotal, currency, pkrPerUsd)}
              </span>
            </div>
            <p className="mt-1 font-sans text-xs text-oro-charcoal/50">
              Shipping &amp; taxes calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-4 flex items-center justify-center bg-oro-green px-8 py-4 font-sans text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-oro-charcoal"
            >
              Proceed to Checkout
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 w-full py-2 font-sans text-xs uppercase tracking-[0.18em] text-oro-charcoal/60 transition-colors hover:text-oro-green"
            >
              Continue Shopping
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
