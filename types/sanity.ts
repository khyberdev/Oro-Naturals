import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: { width: number; height: number; aspectRatio: number };
    lqip?: string;
  };
}

export interface SanityImage {
  asset?: SanityImageAsset | null;
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface CategorySummary {
  _id: string;
  name: string;
  slug: string;
}

export interface Category extends CategorySummary {
  description: string;
}

export interface ProductCard {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number | null;
  shortDescription: string;
  stockLevel: number;
  isFeatured: boolean;
  mainImage?: SanityImage | null;
  category?: CategorySummary | null;
}

export interface ProductDetail extends Omit<ProductCard, "category"> {
  detailedDescription: PortableTextBlock[];
  gallery?: SanityImage[] | null;
  category?: Category | null;
}

export interface ProductSlug {
  slug: string;
}

export interface SiteSettings {
  heroVideoUrl: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  ourStory: string;
}

export interface Variety {
  _id: string;
  name: string;
  origin: string;
  characteristics: string;
  bestUsedFor: string;
  image?: SanityImage | null;
}

export type AccoladeType = "Certificate" | "Press" | "VIP Visit";

export interface AccoladeDocumentAsset {
  _id: string;
  url: string;
  mimeType?: string;
  originalFilename?: string;
}

export interface Accolade {
  _id: string;
  type: AccoladeType;
  title: string;
  issuer: string;
  date: string;
  highlights?: string;
  externalLink?: string;
  documentOrImage?: {
    asset?: AccoladeDocumentAsset | null;
  } | null;
}
