import { defineArrayMember, defineField, defineType } from "sanity";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/* -------------------------------------------------------------------------- */
/*  Shared types                                                              */
/* -------------------------------------------------------------------------- */

export const blockContent = defineType({
  name: "blockContent",
  title: "Rich Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule) =>
                  Rule.required().uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              }),
            ],
          },
        ],
      },
    }),
  ],
  validation: (Rule) => Rule.required().min(1),
});

/* -------------------------------------------------------------------------- */
/*  Category                                                                  */
/* -------------------------------------------------------------------------- */

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Display name shown in navigation and product filters.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(80)
          .error("Category name must be between 2 and 80 characters."),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-"),
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug?.current) return "Slug is required.";
          if (!SLUG_REGEX.test(slug.current)) {
            return "Slug must be lowercase letters, numbers, and hyphens only.";
          }
          return true;
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Short copy for category landing pages and SEO.",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(500)
          .error("Description must be between 10 and 500 characters."),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current" },
  },
});

/* -------------------------------------------------------------------------- */
/*  Product                                                                   */
/* -------------------------------------------------------------------------- */

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "media", title: "Media" },
    { name: "inventory", title: "Inventory & Merchandising" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      group: "details",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(120)
          .error("Product name must be between 2 and 120 characters."),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "details",
      options: {
        source: "name",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-"),
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug?.current) return "Slug is required.";
          if (!SLUG_REGEX.test(slug.current)) {
            return "Slug must be lowercase letters, numbers, and hyphens only.";
          }
          return true;
        }),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "details",
      validation: (Rule) =>
        Rule.required().error("Every product must belong to a category."),
    }),
    defineField({
      name: "price",
      title: "Price (PKR)",
      type: "number",
      group: "details",
      description:
        "Standard retail price in Pakistani Rupees (Rs.), before any discount. Shown as USD to visitors outside Pakistan.",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Price must be a positive amount in Pakistani Rupees."),
    }),
    defineField({
      name: "discountPrice",
      title: "Discount Price (PKR)",
      type: "number",
      group: "details",
      description:
        "Optional sale price in Pakistani Rupees (Rs.). Must be lower than the standard price.",
      validation: (Rule) =>
        Rule.min(1)
          .custom((discountPrice, context) => {
            if (discountPrice == null) return true;
            const parent = context.parent as { price?: number };
            if (parent?.price == null) return true;
            if (discountPrice >= parent.price) {
              return "Discount price must be less than the standard price.";
            }
            return true;
          }),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) =>
            Rule.required().max(120).error("Alt text is required for accessibility."),
        }),
      ],
      validation: (Rule) => Rule.required().error("A main product image is required."),
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              validation: (Rule) => Rule.max(120),
            }),
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.max(20).error("Gallery cannot contain more than 20 images."),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      group: "details",
      rows: 3,
      description: "Concise summary for cards, search results, and cart.",
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(300)
          .error("Short description must be between 20 and 300 characters."),
    }),
    defineField({
      name: "detailedDescription",
      title: "Detailed Description",
      type: "blockContent",
      group: "details",
      description: "Full product story, tasting notes, and usage guidance.",
      validation: (Rule) =>
        Rule.required().min(1).error("Provide a detailed product description."),
    }),
    defineField({
      name: "stockLevel",
      title: "Stock Level",
      type: "number",
      group: "inventory",
      description: "Units available for sale. Whole numbers only.",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(0)
          .max(99999)
          .error("Stock level must be a whole number between 0 and 99,999."),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      group: "inventory",
      description: "Highlight on the homepage and promotional sections.",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.name",
      media: "mainImage",
      isFeatured: "isFeatured",
    },
    prepare({ title, subtitle, media, isFeatured }) {
      return {
        title,
        subtitle: [subtitle, isFeatured ? "★ Featured" : null]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
  orderings: [
    {
      title: "Name, A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Price, Low to High",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "isFeatured", direction: "desc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
});

/* -------------------------------------------------------------------------- */
/*  Variety                                                                   */
/* -------------------------------------------------------------------------- */

export const variety = defineType({
  name: "variety",
  title: "Olive Variety",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Variety Name",
      type: "string",
      description: "e.g. Koroneiki, Arbequina, Picual",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(80)
          .error("Variety name must be between 2 and 80 characters."),
    }),
    defineField({
      name: "origin",
      title: "Origin",
      type: "string",
      description: "Region or country of cultivation.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(120)
          .error("Origin must be between 2 and 120 characters."),
    }),
    defineField({
      name: "characteristics",
      title: "Characteristics",
      type: "text",
      rows: 5,
      description: "Flavor profile, aroma, and physical traits.",
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(1000)
          .error("Characteristics must be between 20 and 1,000 characters."),
    }),
    defineField({
      name: "bestUsedFor",
      title: "Best Used For",
      type: "string",
      description: "Recommended culinary applications.",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(200)
          .error("Best used for must be between 3 and 200 characters."),
    }),
    defineField({
      name: "image",
      title: "Variety Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) =>
            Rule.required().max(120).error("Alt text is required for accessibility."),
        }),
      ],
      validation: (Rule) => Rule.required().error("A variety image is required."),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "origin", media: "image" },
  },
});

/* -------------------------------------------------------------------------- */
/*  Accolade                                                                  */
/* -------------------------------------------------------------------------- */

const ACCOLADE_TYPES = [
  { title: "Certificate", value: "Certificate" },
  { title: "Press", value: "Press" },
  { title: "VIP Visit", value: "VIP Visit" },
] as const;

export const accolade = defineType({
  name: "accolade",
  title: "Accolade",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [...ACCOLADE_TYPES],
        layout: "dropdown",
      },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const allowed = ACCOLADE_TYPES.map((t) => t.value);
          if (!value || !allowed.includes(value as (typeof allowed)[number])) {
            return "Select a valid accolade type.";
          }
          return true;
        }),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(150)
          .error("Title must be between 3 and 150 characters."),
    }),
    defineField({
      name: "issuer",
      title: "Issuer",
      type: "string",
      description: "Organization, publication, or guest name.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(120)
          .error("Issuer must be between 2 and 120 characters."),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (Rule) =>
        Rule.required().max(new Date().toISOString().split("T")[0]),
    }),
    defineField({
      name: "documentOrImage",
      title: "Document or Image",
      type: "file",
      description: "Upload a certificate, press clipping, or photo (PDF, JPG, PNG).",
      options: {
        accept: "image/*,.pdf,.doc,.docx",
      },
      validation: (Rule) =>
        Rule.custom((file, context) => {
          const doc = context.document as {
            documentOrImage?: unknown;
            externalLink?: string;
          };
          if (!file && !doc?.externalLink) {
            return "Provide a document/image upload or an external link.";
          }
          return true;
        }),
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      description: "Optional link to press coverage or certificate verification.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }).custom((url, context) => {
          const doc = context.document as {
            documentOrImage?: unknown;
            externalLink?: string;
          };
          if (!url && !doc?.documentOrImage) {
            return "Provide an external link or upload a document/image.";
          }
          return true;
        }),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "text",
      rows: 4,
      description: "Key takeaways or quote for display on the site.",
      validation: (Rule) =>
        Rule.max(600).warning("Keep highlights under 600 characters for layout."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "issuer",
      type: "type",
      date: "date",
    },
    prepare({ title, subtitle, type, date }) {
      return {
        title,
        subtitle: [type, subtitle, date].filter(Boolean).join(" · "),
      };
    },
  },
  orderings: [
    {
      title: "Date, Newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});

/* -------------------------------------------------------------------------- */
/*  Site Settings (singleton)                                                 */
/* -------------------------------------------------------------------------- */

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroVideoUrl",
      title: "Hero Video URL",
      type: "url",
      description: "URL to the homepage hero background video (Vimeo, YouTube, or CDN).",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (Rule) =>
        Rule.required().email().error("Enter a valid contact email address."),
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(7)
          .max(30)
          .regex(
            /^[+]?[\d\s().-]{7,30}$/,
            "Enter a valid phone number (digits, spaces, +, -, parentheses).",
          ),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(300)
          .error("Address must be between 10 and 300 characters."),
    }),
    defineField({
      name: "ourStory",
      title: "Our Story",
      type: "text",
      rows: 6,
      description: "Short brand narrative for the About section and footer.",
      validation: (Rule) =>
        Rule.required()
          .min(50)
          .max(1200)
          .error("Our Story must be between 50 and 1,200 characters."),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});

/* -------------------------------------------------------------------------- */
/*  Order                                                                     */
/* -------------------------------------------------------------------------- */

const ORDER_STATUSES = [
  { title: "Pending Payment", value: "pending_payment" },
  { title: "Paid", value: "paid" },
  { title: "Processing", value: "processing" },
  { title: "Shipped", value: "shipped" },
  { title: "Delivered", value: "delivered" },
  { title: "Cancelled", value: "cancelled" },
] as const;

const PAYMENT_METHODS = [
  { title: "Cash on Delivery", value: "cod" },
  { title: "Bank Transfer", value: "bank" },
  { title: "Card", value: "card" },
] as const;

export const orderLineItem = defineType({
  name: "orderLineItem",
  title: "Order Line Item",
  type: "object",
  fields: [
    defineField({ name: "productId", title: "Product ID", type: "string" }),
    defineField({ name: "name", title: "Product Name", type: "string" }),
    defineField({ name: "quantity", title: "Quantity", type: "number" }),
    defineField({
      name: "unitPricePkr",
      title: "Unit Price (PKR)",
      type: "number",
    }),
    defineField({
      name: "lineTotalPkr",
      title: "Line Total (PKR)",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", quantity: "quantity", total: "lineTotalPkr" },
    prepare({ title, quantity, total }) {
      return {
        title: title ?? "Item",
        subtitle: `${quantity ?? 0} × · Rs. ${total ?? 0}`,
      };
    },
  },
});

export const order = defineType({
  name: "order",
  title: "Order",
  type: "document",
  groups: [
    { name: "summary", title: "Summary", default: true },
    { name: "customer", title: "Customer" },
    { name: "items", title: "Items" },
  ],
  fields: [
    defineField({
      name: "orderId",
      title: "Order Reference",
      type: "string",
      group: "summary",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "summary",
      options: { list: [...ORDER_STATUSES], layout: "dropdown" },
      initialValue: "pending_payment",
    }),
    defineField({
      name: "placedAt",
      title: "Placed At",
      type: "datetime",
      group: "summary",
      readOnly: true,
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      group: "summary",
      options: { list: [...PAYMENT_METHODS], layout: "radio" },
      readOnly: true,
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      group: "customer",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "customer",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "customer",
    }),
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      group: "customer",
      fields: [
        defineField({ name: "address", title: "Street Address", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "postalCode", title: "Postal Code", type: "string" }),
        defineField({ name: "country", title: "Country", type: "string" }),
      ],
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      group: "items",
      of: [defineArrayMember({ type: "orderLineItem" })],
    }),
    defineField({
      name: "subtotalPkr",
      title: "Subtotal (PKR)",
      type: "number",
      group: "summary",
      readOnly: true,
    }),
    defineField({
      name: "shippingPkr",
      title: "Shipping (PKR)",
      type: "number",
      group: "summary",
      readOnly: true,
    }),
    defineField({
      name: "totalPkr",
      title: "Total (PKR)",
      type: "number",
      group: "summary",
      readOnly: true,
    }),
    defineField({
      name: "currencyShown",
      title: "Currency Shown to Customer",
      type: "string",
      group: "summary",
      readOnly: true,
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      group: "summary",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      orderId: "orderId",
      name: "customerName",
      total: "totalPkr",
      status: "status",
    },
    prepare({ orderId, name, total, status }) {
      const label = ORDER_STATUSES.find((s) => s.value === status)?.title;
      return {
        title: `${orderId ?? "Order"} · ${name ?? "Customer"}`,
        subtitle: [label, total != null ? `Rs. ${total}` : null]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "placedAtDesc",
      by: [{ field: "placedAt", direction: "desc" }],
    },
  ],
});

/* -------------------------------------------------------------------------- */
/*  Schema export                                                             */
/* -------------------------------------------------------------------------- */

export const schemaTypes = [
  blockContent,
  category,
  product,
  variety,
  accolade,
  siteSettings,
  orderLineItem,
  order,
];
