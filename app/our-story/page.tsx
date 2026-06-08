import type { Metadata } from "next";
import { HeroLegacy } from "@/components/sections/story/HeroLegacy";
import { Genesis } from "@/components/sections/story/Genesis";
import { StatsBanner } from "@/components/sections/story/StatsBanner";
import { FoundersVision } from "@/components/sections/story/FoundersVision";
import { StoryPrestige } from "@/components/sections/story/StoryPrestige";
import { VarietiesCarousel } from "@/components/sections/story/VarietiesCarousel";
import { ClosingInvitation } from "@/components/sections/story/ClosingInvitation";

export const metadata: Metadata = {
  title: "Our Story | Oro Naturals",
  description:
    "A Legacy of Purity — discover the heritage of Oro Naturals, a family-owned olive estate established in 2012 across 43 acres in Nowshera and 81 acres in Kohat, Khyber Pakhtunkhwa.",
};

export default function OurStoryPage() {
  return (
    <>
      <HeroLegacy />
      <Genesis />
      <StatsBanner />
      <FoundersVision />
      <StoryPrestige />
      <VarietiesCarousel />
      <ClosingInvitation />
    </>
  );
}
