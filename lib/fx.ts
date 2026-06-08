import { PKR_PER_USD } from "./currency";

const FX_ENDPOINT = "https://open.er-api.com/v6/latest/USD";

interface ErApiResponse {
  result?: string;
  rates?: Record<string, number>;
}

/**
 * Live PKR-per-USD rate, cached for one hour via the Next.js data cache.
 * Falls back to the PKR_PER_USD constant if the API is unavailable.
 */
export async function getPkrPerUsd(): Promise<number> {
  try {
    const res = await fetch(FX_ENDPOINT, {
      next: { revalidate: 3600, tags: ["fx-rates"] },
    });

    if (!res.ok) return PKR_PER_USD;

    const data = (await res.json()) as ErApiResponse;
    const rate = data.rates?.PKR;

    if (data.result === "success" && typeof rate === "number" && rate > 0) {
      return rate;
    }

    return PKR_PER_USD;
  } catch {
    return PKR_PER_USD;
  }
}
