import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Oro Naturals")
    .items([
      S.listItem()
        .title("Orders")
        .id("orders")
        .schemaType("order")
        .child(
          S.documentTypeList("order")
            .title("Orders")
            .defaultOrdering([{ field: "placedAt", direction: "desc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          item.getId() !== "siteSettings" &&
          item.getId() !== "order",
      ),
    ]);
