export { client, apiVersion } from "./sanity/client";
export {
  getAccolades,
  getCategories,
  getCategoryBySlug,
  getFeaturedProducts,
  getProductBySlug,
  getProductSlugs,
  getProducts,
  getProductsByCategory,
  getSiteSettings,
  getVarieties,
} from "./sanity/fetch";
export {
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
} from "./sanity/queries";
export { urlFor } from "@/sanity/lib/image";
