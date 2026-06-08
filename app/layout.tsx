import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";
import { currencyForCountry, PKR_PER_USD } from "@/lib/currency";
import { getPkrPerUsd } from "@/lib/fx";
import { getSiteSettings } from "@/lib/sanity/fetch";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oro Naturals",
  description: "Premium luxury olive products",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const headerList = headers();
  const country =
    headerList.get("x-vercel-ip-country") ??
    headerList.get("cf-ipcountry") ??
    "PK";
  const currency = currencyForCountry(country);

  // Only hit the FX API when the visitor will actually see USD.
  const pkrPerUsd = currency === "USD" ? await getPkrPerUsd() : PKR_PER_USD;

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased">
        <CurrencyProvider currency={currency} pkrPerUsd={pkrPerUsd}>
          <SiteChrome settings={settings}>{children}</SiteChrome>
        </CurrencyProvider>
      </body>
    </html>
  );
}
