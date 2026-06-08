"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/navbar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import type { SiteSettings } from "@/types/sanity";

interface SiteChromeProps {
  children: React.ReactNode;
  settings?: SiteSettings | null;
}

export function SiteChrome({ children, settings }: SiteChromeProps) {
  const pathname = usePathname();
  const hideChrome = pathname.startsWith("/admin");

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer settings={settings} />
      <CartDrawer />
    </>
  );
}
