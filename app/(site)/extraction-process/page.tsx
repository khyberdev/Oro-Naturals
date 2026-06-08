import type { Metadata } from "next";
import { ExtractionHero } from "@/components/sections/extraction/ExtractionHero";
import { ProcessPillars } from "@/components/sections/extraction/ProcessPillars";
import { VideoGallery } from "@/components/sections/extraction/video-gallery";

export const metadata: Metadata = {
  title: "Extraction Process | Oro Naturals",
  description:
    "Discover how Oro Naturals cold-presses extra virgin olive oil with EVO quality standards and sustainable farming practices.",
};

const extractionVideoUrl = process.env.NEXT_PUBLIC_EXTRACTION_VIDEO_URL;

export default function ExtractionProcessPage() {
  return (
    <>
      <ExtractionHero />
      <VideoGallery videoUrl={extractionVideoUrl} />
      <ProcessPillars />
    </>
  );
}
