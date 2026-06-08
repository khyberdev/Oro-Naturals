export type VideoSourceType = "youtube" | "vimeo" | "native";

export interface ParsedVideo {
  type: VideoSourceType;
  embedUrl?: string;
  src?: string;
}

const YOUTUBE_REGEX =
  /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([^&?#/]+)/;

const VIMEO_REGEX = /vimeo\.com\/(?:video\/)?(\d+)/;

const NATIVE_VIDEO_REGEX = /\.(mp4|webm|mov|m4v)(\?|#|$)/i;

/**
 * Parses a video URL into an embed (YouTube/Vimeo) or native stream source.
 * Supports external hosts and lightweight files in /public (e.g. /videos/process.mp4).
 */
export function parseVideoUrl(input: string | null | undefined): ParsedVideo | null {
  if (!input?.trim()) return null;

  const url = input.trim();
  const youtubeMatch = url.match(YOUTUBE_REGEX);

  if (youtubeMatch?.[1]) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeMatch[1]}?rel=0&modestbranding=1`,
    };
  }

  const vimeoMatch = url.match(VIMEO_REGEX);

  if (vimeoMatch?.[1]) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?dnt=1&title=0&byline=0&portrait=0`,
    };
  }

  if (
    NATIVE_VIDEO_REGEX.test(url) ||
    url.startsWith("/") ||
    url.startsWith("blob:")
  ) {
    return { type: "native", src: url };
  }

  // CDN or direct file URLs without a recognizable extension
  if (/^https?:\/\//i.test(url)) {
    return { type: "native", src: url };
  }

  return null;
}
