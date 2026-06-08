"use client";

import { createContext, useContext } from "react";
import { PKR_PER_USD, type Currency } from "@/lib/currency";

interface CurrencyContextValue {
  currency: Currency;
  pkrPerUsd: number;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "PKR",
  pkrPerUsd: PKR_PER_USD,
});

interface CurrencyProviderProps {
  currency: Currency;
  pkrPerUsd: number;
  children: React.ReactNode;
}

export function CurrencyProvider({
  currency,
  pkrPerUsd,
  children,
}: CurrencyProviderProps) {
  return (
    <CurrencyContext.Provider value={{ currency, pkrPerUsd }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  return useContext(CurrencyContext);
}
