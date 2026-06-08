export function formatPrice(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function effectivePrice(price: number, discountPrice?: number | null) {
  return discountPrice != null && discountPrice < price ? discountPrice : price;
}

export function isOnSale(price: number, discountPrice?: number | null) {
  return discountPrice != null && discountPrice < price;
}

export function formatAccoladeDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
