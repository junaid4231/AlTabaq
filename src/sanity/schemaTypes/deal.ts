import { defineField, defineType } from "sanity";

export const dealType = defineType({
  name: "deal",
  title: "Special Deals",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Deal Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Briefly explain what's included in this deal",
    }),
    defineField({
      name: "price",
      title: "Deal Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price (Optional)",
      type: "number",
      description: "Used to show a discount percentage or crossed-out price",
    }),
    defineField({
      name: "image",
      title: "Deal Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isLimitedTime",
      title: "Limited Time Offer",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `AED ${subtitle}` : "No price set",
        media,
      };
    },
  },
});
