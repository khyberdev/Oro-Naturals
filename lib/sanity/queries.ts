import { groq } from "next-sanity";

/** Reusable projection for product/variety images (pair with urlFor on the server). */
export const imageProjection = groq`
  asset->{
    _id,
    url,
    metadata { dimensions, lqip }
  },
  alt,
  hotspot,
  crop
`;

export const categoryProjection = groq`
  _id,
  name,
  "slug": slug.current,
  description
`;

const productCategoryProjection = groq`
  _id,
  name,
  "slug": slug.current
`;

export const productCardProjection = groq`
  _id,
  name,
  "slug": slug.current,
  price,
  discountPrice,
  shortDescription,
  stockLevel,
  isFeatured,
  mainImage { ${imageProjection} },
  category->{
    ${productCategoryProjection}
  }
`;

export const productDetailProjection = groq`
  _id,
  name,
  "slug": slug.current,
  price,
  discountPrice,
  shortDescription,
  detailedDescription,
  stockLevel,
  isFeatured,
  mainImage { ${imageProjection} },
  gallery[] { ${imageProjection} },
  category->{
    ${categoryProjection}
  }
`;

/** All products for the shop page — featured first, then alphabetical. */
export const PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(isFeatured desc, name asc) {
    ${productCardProjection}
  }
`;

/** Homepage featured products (max 6). */
export const FEATURED_PRODUCTS_QUERY = groq`
  *[_type == "product" && isFeatured == true] | order(name asc)[0...6] {
    ${productCardProjection}
  }
`;

/** Single product by slug for the product detail page. */
export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ${productDetailProjection}
  }
`;

/** Slugs for static generation of product pages. */
export const PRODUCT_SLUGS_QUERY = groq`
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const PRODUCTS_BY_CATEGORY_QUERY = groq`
  *[_type == "product" && category->slug.current == $categorySlug] | order(name asc) {
    ${productCardProjection}
  }
`;

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(name asc) {
    ${categoryProjection}
  }
`;

export const CATEGORY_BY_SLUG_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0] {
    ${categoryProjection}
  }
`;

/** Site-wide singleton settings. */
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    heroVideoUrl,
    contactEmail,
    phoneNumber,
    address,
    ourStory
  }
`;

/** All olive varieties for the varieties section. */
export const VARIETIES_QUERY = groq`
  *[_type == "variety"] | order(name asc) {
    _id,
    name,
    origin,
    characteristics,
    bestUsedFor,
    image { ${imageProjection} }
  }
`;

/** Accolades ordered newest first. */
export const ACCOLADES_QUERY = groq`
  *[_type == "accolade"] | order(date desc) {
    _id,
    type,
    title,
    issuer,
    date,
    highlights,
    externalLink,
    documentOrImage {
      asset->{
        _id,
        url,
        mimeType,
        originalFilename
      }
    }
  }
`;
