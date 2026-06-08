import type { Metadata } from "next";
import { CinematicHero } from "@/components/sections/home/CinematicHero";
import { TrustBanner } from "@/components/sections/home/TrustBanner";
import { CuratedCategories } from "@/components/sections/home/CuratedCategories";
import { HeritageSection } from "@/components/sections/home/HeritageSection";
import { ArtOfExtraction } from "@/components/sections/home/ArtOfExtraction";
import { GlobalPrestige } from "@/components/sections/home/GlobalPrestige";

export const metadata: Metadata = {
  title: "Oro Naturals | Premium Extra Virgin Olive Oil",
  description:
    "The purest expression of nature. Premium, cold-pressed extra virgin olive oil from the heart of KPK — Nowshera & Kohat.",
};

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <TrustBanner />
      <CuratedCategories />
      <HeritageSection />
      <ArtOfExtraction />
      <GlobalPrestige />
    </>
  );
}
