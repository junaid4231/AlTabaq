import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isFeatured",
      title: "Showcase on Homepage",
      type: "boolean",
      description: "Select up to 5 categories to show in the gallery on the homepage.",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      description: "This image will be used in the homepage gallery.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
