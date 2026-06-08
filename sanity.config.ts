"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schema";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "oro-naturals",
  title: "Oro Naturals",
  basePath: "/admin",
  projectId,
  dataset,
  apiVersion,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
});
