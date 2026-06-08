import { urlFor } from "@/sanity/lib/image";
import type { Accolade, SanityImage } from "@/types/sanity";

export function sanityImageUrl(
  image: SanityImage | null | undefined,
  width = 800,
) {
  if (!image?.asset?.url) return null;
  return urlFor(image).width(width).auto("format").quality(85).url();
}

/** @deprecated Use sanityImageUrl */
export const productImageUrl = sanityImageUrl;

export function sanityImageBlur(image: SanityImage | null | undefined) {
  return image?.asset?.metadata?.lqip;
}

/** @deprecated Use sanityImageBlur */
export const productImageBlur = sanityImageBlur;

export function accoladeImageUrl(accolade: Accolade, width = 400) {
  const asset = accolade.documentOrImage?.asset;
  if (!asset?.url || !asset.mimeType?.startsWith("image/")) return null;
  return `${asset.url}?w=${width}&auto=format`;
}
