"use client";

import { cn } from "@/lib/utils";
import { effectivePrice, isOnSale } from "@/lib/format";
import { formatMoney } from "@/lib/currency";
import { useCurrency } from "@/components/providers/CurrencyProvider";

interface PriceProps {
  price: number;
  discountPrice?: number | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Price({
  price,
  discountPrice,
  className,
  size = "md",
}: PriceProps) {
  const { currency, pkrPerUsd } = useCurrency();
  const onSale = isOnSale(price, discountPrice);
  const display = effectivePrice(price, discountPrice);

  const sizeClass = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  }[size];

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-sans font-medium text-oro-charcoal",
          sizeClass,
          onSale && "text-oro-green",
        )}
      >
        {formatMoney(display, currency, pkrPerUsd)}
      </span>
      {onSale && (
        <span
          className={cn(
            "font-sans text-oro-charcoal/50 line-through",
            size === "lg" ? "text-base" : "text-sm",
          )}
        >
          {formatMoney(price, currency, pkrPerUsd)}
        </span>
      )}
    </div>
  );
}
