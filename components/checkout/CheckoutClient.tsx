"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  CheckCircle2,
  Landmark,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { formatMoney } from "@/lib/currency";
import { effectivePrice } from "@/lib/format";
import { sanityImageUrl } from "@/lib/images";
import { cn } from "@/lib/utils";

type PaymentMethod = "bank" | "cod";

interface OrderResult {
  orderId: string;
  message: string;
  estimatedDelivery: string;
  paymentMethod: PaymentMethod;
}

const SHIPPING_FLAT_PKR = 250;
const FREE_SHIPPING_THRESHOLD_PKR = 5000;

const inputClass =
  "w-full rounded-sm border border-oro-charcoal/15 bg-white px-4 py-3 font-sans text-sm text-oro-charcoal transition-colors placeholder:text-oro-charcoal/40 focus:border-oro-green focus:outline-none focus:ring-1 focus:ring-oro-green/30";
const labelClass =
  "mb-1.5 block font-sans text-xs font-medium uppercase tracking-[0.12em] text-oro-charcoal/70";

const paymentOptions: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: typeof Landmark;
}[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Banknote,
  },
  {
    id: "bank",
    label: "Bank Transfer",
    description: "Direct transfer to our account",
    icon: Landmark,
  },
];

export function CheckoutClient() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const cartTotal = useCartStore((s) => s.cartTotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const { currency, pkrPerUsd } = useCurrency();

  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResult | null>(null);

  const [contact, setContact] = useState({ fullName: "", email: "", phone: "" });
  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
  });

  useEffect(() => setMounted(true), []);

  const subtotal = mounted ? cartTotal() : 0;
  const shippingCost =
    subtotal >= FREE_SHIPPING_THRESHOLD_PKR || subtotal === 0
      ? 0
      : SHIPPING_FLAT_PKR;
  const total = subtotal + shippingCost;

  const inquirySubject = useMemo(() => {
    if (!mounted || items.length === 0) return "your products";
    return items.map((i) => i.product.name).join(", ");
  }, [mounted, items]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact,
          shipping,
          paymentMethod: payment,
          items: items.map(({ product, quantity }) => ({
            productId: product._id,
            name: product.name,
            quantity,
            unitPricePkr: effectivePrice(product.price, product.discountPrice),
          })),
          currencyShown: currency,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult({
        orderId: data.orderId,
        message: data.message,
        estimatedDelivery: data.estimatedDelivery,
        paymentMethod: data.paymentMethod,
      });
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-oro-cream pt-28" />;
  }

  if (result) {
    return (
      <div className="min-h-screen bg-oro-cream px-6 pb-24 pt-32">
        <div className="mx-auto max-w-xl rounded-sm border border-oro-charcoal/10 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-oro-green/10">
            <CheckCircle2 className="h-8 w-8 text-oro-green" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl text-oro-green">
            Thank you for your order
          </h1>
          <p className="mt-3 font-sans text-sm leading-relaxed text-oro-charcoal/70">
            {result.message}
          </p>

          <div className="mt-8 space-y-3 rounded-sm bg-oro-cream/60 p-5 text-left">
            <div className="flex justify-between font-sans text-sm">
              <span className="text-oro-charcoal/60">Order number</span>
              <span className="font-medium text-oro-green">
                {result.orderId}
              </span>
            </div>
            <div className="flex justify-between font-sans text-sm">
              <span className="text-oro-charcoal/60">Estimated delivery</span>
              <span className="font-medium text-oro-charcoal">
                {result.estimatedDelivery}
              </span>
            </div>
            {result.paymentMethod === "bank" && (
              <div className="mt-2 border-t border-oro-charcoal/10 pt-3 font-sans text-xs leading-relaxed text-oro-charcoal/60">
                <p className="font-medium text-oro-charcoal/80">
                  Bank transfer details
                </p>
                <p>Bank: Oro Naturals (Placeholder Bank Ltd.)</p>
                <p>Account: 0000 1234 5678 9012</p>
                <p>
                  Reference: <span className="font-medium">{result.orderId}</span>
                </p>
              </div>
            )}
          </div>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center justify-center bg-oro-green px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-oro-charcoal"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-oro-cream px-6 pb-24 pt-32 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-oro-green/5">
          <ShoppingBag className="h-9 w-9 text-oro-green/40" strokeWidth={1.25} />
        </div>
        <h1 className="font-serif text-3xl text-oro-green">Your bag is empty</h1>
        <p className="mt-2 max-w-md font-sans text-sm text-oro-charcoal/60">
          Add a few of our cold-pressed oils before heading to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center justify-center bg-oro-green px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-oro-charcoal"
        >
          Browse the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-oro-cream px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.25em] text-oro-gold">
            Secure Checkout
          </p>
          <h1 className="font-serif text-4xl text-oro-green">Complete Your Order</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]"
        >
          <div className="space-y-8">
            <section className="rounded-sm border border-oro-charcoal/10 bg-white p-6 sm:p-8">
              <h2 className="mb-6 font-serif text-xl text-oro-green">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    value={contact.fullName}
                    onChange={(e) =>
                      setContact({ ...contact, fullName: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                    className={inputClass}
                    placeholder="+92 300 0000000"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-sm border border-oro-charcoal/10 bg-white p-6 sm:p-8">
              <h2 className="mb-6 font-serif text-xl text-oro-green">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="address">
                    Street Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    required
                    autoComplete="street-address"
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping({ ...shipping, address: e.target.value })
                    }
                    className={inputClass}
                    placeholder="House #, Street, Area"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="city">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    required
                    autoComplete="address-level2"
                    value={shipping.city}
                    onChange={(e) =>
                      setShipping({ ...shipping, city: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Nowshera"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="postalCode">
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    autoComplete="postal-code"
                    value={shipping.postalCode}
                    onChange={(e) =>
                      setShipping({ ...shipping, postalCode: e.target.value })
                    }
                    className={inputClass}
                    placeholder="24100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="country">
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    required
                    autoComplete="country-name"
                    value={shipping.country}
                    onChange={(e) =>
                      setShipping({ ...shipping, country: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Pakistan"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-sm border border-oro-charcoal/10 bg-white p-6 sm:p-8">
              <h2 className="mb-6 font-serif text-xl text-oro-green">
                Payment Method
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paymentOptions.map((option) => {
                  const active = payment === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setPayment(option.id)}
                      className={cn(
                        "flex flex-col items-start gap-2 rounded-sm border p-4 text-left transition-all",
                        active
                          ? "border-oro-green bg-oro-green/5 ring-1 ring-oro-green/30"
                          : "border-oro-charcoal/15 hover:border-oro-green/40",
                      )}
                    >
                      <option.icon
                        className={cn(
                          "h-5 w-5",
                          active ? "text-oro-green" : "text-oro-charcoal/50",
                        )}
                        strokeWidth={1.5}
                      />
                      <span className="font-sans text-sm font-medium text-oro-charcoal">
                        {option.label}
                      </span>
                      <span className="font-sans text-xs text-oro-charcoal/55">
                        {option.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              {payment === "bank" && (
                <div className="mt-6 rounded-sm bg-oro-cream/60 p-5 font-sans text-sm leading-relaxed text-oro-charcoal/70">
                  <p className="font-medium text-oro-charcoal/80">
                    Transfer to the following account
                  </p>
                  <p className="mt-2">Bank: Placeholder Bank Ltd.</p>
                  <p>Title: Oro Naturals</p>
                  <p>Account #: 0000 1234 5678 9012</p>
                  <p>IBAN: PK00 ORON 0000 0000 0000 0000</p>
                  <p className="mt-3 text-xs text-oro-charcoal/55">
                    Your order reference will be shown after you place the order.
                    Email the receipt to confirm dispatch.
                  </p>
                </div>
              )}

              {payment === "cod" && (
                <div className="mt-6 flex items-start gap-3 rounded-sm bg-oro-cream/60 p-5 font-sans text-sm text-oro-charcoal/70">
                  <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-oro-green" strokeWidth={1.5} />
                  <p>
                    Pay in cash to our courier upon delivery. Please keep the
                    exact amount ready. Available within Pakistan only.
                  </p>
                </div>
              )}
            </section>

            <div className="rounded-sm border border-oro-charcoal/10 bg-white p-6 sm:p-8">
              <p className="mb-4 font-sans text-sm text-oro-charcoal/70">
                Have a question before ordering? Talk to us directly.
              </p>
              <WhatsAppButton subject={inquirySubject} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-sm border border-oro-charcoal/10 bg-white p-6 sm:p-8">
              <h2 className="mb-6 font-serif text-xl text-oro-green">
                Order Summary
              </h2>

              <ul className="space-y-4">
                {items.map(({ product, quantity }) => {
                  const imageUrl = sanityImageUrl(product.mainImage, 120);
                  const unit = effectivePrice(
                    product.price,
                    product.discountPrice,
                  );
                  return (
                    <li key={product._id} className="flex gap-3">
                      <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden rounded-sm bg-oro-cream">
                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            alt={product.mainImage?.alt ?? product.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        )}
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-oro-green px-1 font-sans text-[10px] font-semibold text-white">
                          {quantity}
                        </span>
                      </div>
                      <div className="flex flex-1 items-center justify-between gap-2">
                        <p className="font-serif text-sm leading-snug text-oro-green">
                          {product.name}
                        </p>
                        <p className="font-sans text-sm font-medium text-oro-charcoal">
                          {formatMoney(unit * quantity, currency, pkrPerUsd)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 space-y-2 border-t border-oro-charcoal/10 pt-6 font-sans text-sm">
                <div className="flex justify-between text-oro-charcoal/70">
                  <span>Subtotal</span>
                  <span>{formatMoney(subtotal, currency, pkrPerUsd)}</span>
                </div>
                <div className="flex justify-between text-oro-charcoal/70">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0
                      ? "Free"
                      : formatMoney(shippingCost, currency, pkrPerUsd)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-oro-charcoal/10 pt-3 text-base font-medium text-oro-green">
                  <span>Total</span>
                  <span>{formatMoney(total, currency, pkrPerUsd)}</span>
                </div>
              </div>

              {error && (
                <p className="mt-4 rounded-sm bg-red-50 px-4 py-3 font-sans text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 flex w-full items-center justify-center gap-2 bg-oro-green px-8 py-4 font-sans text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-oro-charcoal disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Lock className="h-4 w-4" />
                {submitting
                  ? "Placing Order…"
                  : `Place Order · ${formatMoney(total, currency, pkrPerUsd)}`}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 font-sans text-xs text-oro-charcoal/50">
                <ShieldCheck className="h-4 w-4 text-oro-green/60" />
                Secure, encrypted checkout
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
