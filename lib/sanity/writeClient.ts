import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

/**
 * Server-only Sanity client with write access for creating orders.
 * Requires SANITY_API_WRITE_TOKEN (Editor permissions) in the environment.
 * Never import this into client components.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export const hasWriteToken = Boolean(process.env.SANITY_API_WRITE_TOKEN);
