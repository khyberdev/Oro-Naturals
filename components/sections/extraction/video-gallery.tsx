"use client";

import { useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { cn } from "@/lib/utils";

// Paste each step's Cloudinary delivery URL into `videoUrl` below.
// Leave a slot empty ("") to fall back to NEXT_PUBLIC_EXTRACTION_VIDEO_URL.
// `poster` is optional — leave it "" to auto-generate the thumbnail from the video.
const processSteps = [
  { id: 1, title: "Harvest Season", description: "Selecting perfectly ripe olives", videoUrl: "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780894823/1_ka8eh0.mp4", poster: "" },
  { id: 2, title: "Hand Picking", description: "Traditional methods, careful precision", videoUrl: "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780894819/2_ctmnw9.mp4", poster: "" },
  { id: 3, title: "Sorting Process", description: "Quality control at every step", videoUrl: "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780894820/3_ojjd2j.mp4", poster: "" },
  { id: 4, title: "Washing Station", description: "Pristine preparation for extraction", videoUrl: "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780894818/6_q4mxxl.mp4", poster: "" },
  { id: 5, title: "Cold Pressing", description: "Preserving natural flavors", videoUrl: "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780894818/5_u27dcg.mp4", poster: "" },
  { id: 6, title: "First Press", description: "The moment liquid gold emerges", videoUrl: "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780894823/4_pb7rf1.mp4", poster: "" },
  { id: 7, title: "Separation", description: "Achieving pure excellence", videoUrl: "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780894823/7_fop2jc.mp4", poster: "" },
  { id: 8, title: "Quality Testing", description: "Laboratory precision meets tradition", videoUrl: "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780894823/8_yhwych.mp4", poster: "" },
  { id: 9, title: "Bottling Line", description: "Sealed freshness in every bottle", videoUrl: "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780894824/10_uylnvk.mp4", poster: "" },
  { id: 10, title: "Final Inspection", description: "Our promise of perfection", videoUrl: "https://res.cloudinary.com/dbwfsmjol/video/upload/v1780894823/9_gqfmyj.mp4", poster: "" },
];

// Cloudinary serves a video frame as an image when you swap the extension to .jpg.
function getPoster(step: (typeof processSteps)[number]): string {
  if (step.poster) return step.poster;
  const url = step.videoUrl;
  if (url && /res\.cloudinary\.com\/.+\/video\/upload\//.test(url)) {
    return url.replace(/\.(mp4|webm|mov)(\?.*)?$/i, ".jpg$2");
  }
  return "";
}

interface VideoGalleryProps {
  videoUrl?: string | null;
}

export function VideoGallery({ videoUrl }: VideoGalleryProps) {
  const [selectedStep, setSelectedStep] = useState(processSteps[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 5;
  const totalPages = Math.ceil(processSteps.length / videosPerPage);

  const visibleSteps = processSteps.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage,
  );

  return (
    <section className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Behind The Scenes
          </span>
          <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl lg:text-5xl">
            The Journey of Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Now playing:{" "}
            <span className="font-medium text-foreground">{selectedStep.title}</span>
            {" — "}
            {selectedStep.description}
          </p>
        </div>

        <div className="mx-auto mb-8 max-w-5xl">
          <VideoPlayer
            key={selectedStep.id}
            url={selectedStep.videoUrl || videoUrl}
            poster={getPoster(selectedStep) || undefined}
            title={`Oro Naturals — ${selectedStep.title}`}
            className="rounded-lg shadow-2xl"
          />
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className={cn(
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300",
                currentPage === 0
                  ? "cursor-not-allowed opacity-30"
                  : "hover:border-primary hover:bg-primary hover:text-primary-foreground",
              )}
              aria-label="Previous steps"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {visibleSteps.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setSelectedStep(step)}
                  className={cn(
                    "relative aspect-video overflow-hidden rounded-md transition-all duration-300",
                    selectedStep.id === step.id
                      ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                      : "hover:ring-1 hover:ring-primary/50",
                  )}
                  aria-label={step.title}
                >
                  {getPoster(step) ? (
                    <img
                      src={getPoster(step)}
                      alt={step.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : null}
                  <div
                    className={cn(
                      "absolute inset-0 transition-colors duration-300",
                      getPoster(step)
                        ? selectedStep.id === step.id
                          ? "bg-black/20"
                          : "bg-black/40 hover:bg-black/30"
                        : selectedStep.id === step.id
                          ? "bg-primary"
                          : "bg-primary/80 hover:bg-primary/90",
                    )}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                        selectedStep.id === step.id
                          ? "bg-accent"
                          : "bg-primary-foreground/20 group-hover:bg-accent/80",
                      )}
                    >
                      <Play
                        className={cn(
                          "ml-0.5 h-3 w-3",
                          selectedStep.id === step.id
                            ? "fill-primary text-primary"
                            : "fill-primary-foreground text-primary-foreground",
                        )}
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-1 left-1 rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    {step.id}/{processSteps.length}
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
              }
              disabled={currentPage === totalPages - 1}
              className={cn(
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300",
                currentPage === totalPages - 1
                  ? "cursor-not-allowed opacity-30"
                  : "hover:border-primary hover:bg-primary hover:text-primary-foreground",
              )}
              aria-label="Next steps"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentPage(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  currentPage === i
                    ? "w-6 bg-accent"
                    : "w-2 bg-border hover:bg-primary/50",
                )}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
