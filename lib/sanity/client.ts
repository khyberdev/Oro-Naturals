import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET environment variables.",
  );
}

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

/**
 * Server-side Sanity client for published content.
 * Uses the CDN in production; optional read token bypasses CDN for fresher data.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production" && !process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});
