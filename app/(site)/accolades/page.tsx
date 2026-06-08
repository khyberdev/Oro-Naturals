import type { Metadata } from "next";
import { AccoladesHero } from "@/components/sections/Accolades/accolades-hero";
import { FeaturedFilm } from "@/components/sections/Accolades/featured-film";
import { PressRecognition } from "@/components/sections/Accolades/press-recognition";
import { CredentialsArchive } from "@/components/sections/Accolades/credentials-archive";

export const metadata: Metadata = {
  title: "Accolades | Oro Naturals",
  description:
    "International press, institutional recognition, and verified certifications documenting Oro Naturals' journey from Nowshera to the world stage.",
};

export default function AccoladesPage() {
  return (
    <>
      <AccoladesHero />
      <FeaturedFilm />
      <PressRecognition />
      <CredentialsArchive />
    </>
  );
}
