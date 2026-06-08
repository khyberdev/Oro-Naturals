export type Currency = "PKR" | "USD";

/**
 * Exchange rate: how many PKR make up 1 USD.
 * Prices are authored in PKR in Sanity; visitors outside Pakistan see the
 * USD equivalent. Override at deploy time with NEXT_PUBLIC_PKR_PER_USD.
 */
export const PKR_PER_USD = Number(process.env.NEXT_PUBLIC_PKR_PER_USD) || 278;

/** Visitors inside Pakistan see PKR; everyone else sees USD. */
export function currencyForCountry(country: string | null | undefined): Currency {
  return country?.toUpperCase() === "PK" ? "PKR" : "USD";
}

/** Convert a PKR amount into the target currency's numeric value. */
export function convertFromPkr(
  amountPkr: number,
  currency: Currency,
  pkrPerUsd: number = PKR_PER_USD,
): number {
  return currency === "USD" ? amountPkr / pkrPerUsd : amountPkr;
}

/** Format a PKR-denominated amount for display in the given currency. */
export function formatMoney(
  amountPkr: number,
  currency: Currency,
  pkrPerUsd: number = PKR_PER_USD,
): string {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertFromPkr(amountPkr, "USD", pkrPerUsd));
  }

  const formatted = new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(Math.round(amountPkr));

  return `Rs. ${formatted}`;
}
