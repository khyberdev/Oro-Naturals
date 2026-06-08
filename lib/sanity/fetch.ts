import { client } from "./client";
import {
  ACCOLADES_QUERY,
  CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCTS_QUERY,
  SITE_SETTINGS_QUERY,
  VARIETIES_QUERY,
} from "./queries";
import type {
  Accolade,
  Category,
  ProductCard,
  ProductDetail,
  ProductSlug,
  SiteSettings,
  Variety,
} from "@/types/sanity";

export async function getProducts() {
  return client.fetch<ProductCard[]>(
    PRODUCTS_QUERY,
    {},
    { next: { revalidate: 300, tags: ["sanity:products"] } },
  );
}

export async function getFeaturedProducts() {
  return client.fetch<ProductCard[]>(
    FEATURED_PRODUCTS_QUERY,
    {},
    { next: { revalidate: 300, tags: ["sanity:products"] } },
  );
}

export async function getProductBySlug(slug: string) {
  return client.fetch<ProductDetail | null>(
    PRODUCT_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 300, tags: ["sanity:products", `sanity:product:${slug}`] } },
  );
}

export async function getProductSlugs() {
  return client.fetch<ProductSlug[]>(
    PRODUCT_SLUGS_QUERY,
    {},
    { next: { revalidate: 3600, tags: ["sanity:products"] } },
  );
}

export async function getProductsByCategory(categorySlug: string) {
  return client.fetch<ProductCard[]>(
    PRODUCTS_BY_CATEGORY_QUERY,
    { categorySlug },
    {
      next: {
        revalidate: 300,
        tags: ["sanity:products", `sanity:category:${categorySlug}`],
      },
    },
  );
}

export async function getCategories() {
  return client.fetch<Category[]>(
    CATEGORIES_QUERY,
    {},
    { next: { revalidate: 3600, tags: ["sanity:categories"] } },
  );
}

export async function getCategoryBySlug(slug: string) {
  return client.fetch<Category | null>(
    CATEGORY_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 3600, tags: ["sanity:categories", `sanity:category:${slug}`] } },
  );
}

export async function getSiteSettings() {
  return client.fetch<SiteSettings | null>(
    SITE_SETTINGS_QUERY,
    {},
    { next: { revalidate: 60, tags: ["sanity:site-settings"] } },
  );
}

export async function getVarieties() {
  return client.fetch<Variety[]>(
    VARIETIES_QUERY,
    {},
    { next: { revalidate: 3600, tags: ["sanity:varieties"] } },
  );
}

export async function getAccolades() {
  return client.fetch<Accolade[]>(
    ACCOLADES_QUERY,
    {},
    { next: { revalidate: 3600, tags: ["sanity:accolades"] } },
  );
}
