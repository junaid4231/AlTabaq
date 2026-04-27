import { defineField, defineType } from "sanity";

export const dishType = defineType({
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isPopular",
      title: "Popular Dish",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "description", title: "Description", type: "string" }),
    defineField({
      name: "variants",
      title: "Price Variants (Optional)",
      description: "Add different sizes (Quarter, Half, Full) with their specific prices.",
      type: "array",
      of: [
        {
          type: "object",
          name: "variant",
          fields: [
            { name: "size", title: "Size", type: "string" },
            { name: "price", title: "Price", type: "number" },
          ],
          preview: {
            select: {
              title: "size",
              subtitle: "price",
            },
            prepare({ title, subtitle }) {
              return {
                title: title,
                subtitle: `AED ${subtitle}`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.name",
      media: "image",
    },
  },
});
