import { parseVideoUrl } from "@/lib/video";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  url?: string | null;
  title?: string;
  poster?: string;
  className?: string;
  /** Native `<video>` only — defaults to metadata preload to limit bandwidth. */
  preload?: "none" | "metadata" | "auto";
}

export function VideoPlayer({
  url,
  title = "Process video",
  poster,
  className,
  preload = "metadata",
}: VideoPlayerProps) {
  const parsed = parseVideoUrl(url);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-oro-charcoal/5 shadow-lg ring-1 ring-oro-charcoal/10",
        className,
      )}
    >
      <div className="relative aspect-video w-full">
        {!parsed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-oro-green/5 px-6 text-center">
            <p className="font-serif text-lg text-oro-green sm:text-xl">
              Process video coming soon
            </p>
            <p className="max-w-md font-sans text-sm leading-relaxed text-oro-charcoal/60">
              Add a YouTube, Vimeo, or compressed MP4 URL via{" "}
              <code className="rounded bg-oro-charcoal/5 px-1.5 py-0.5 text-xs">
                NEXT_PUBLIC_EXTRACTION_VIDEO_URL
              </code>
            </p>
          </div>
        ) : parsed.type === "native" && parsed.src ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            controls
            playsInline
            preload={preload}
            poster={poster}
            aria-label={title}
          >
            <source src={parsed.src} />
            Your browser does not support embedded video playback.
          </video>
        ) : parsed.embedUrl ? (
          <iframe
            src={parsed.embedUrl}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : null}
      </div>
    </div>
  );
}
