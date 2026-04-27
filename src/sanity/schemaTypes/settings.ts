import { defineField, defineType } from "sanity";

export const settingsType = defineType({
  name: "settings",
  title: "Restaurant Settings",
  type: "document",
  fields: [
    defineField({
      name: "restaurantName",
      title: "Restaurant Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "Authentic Pakistani Cuisine",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
      initialValue: "Welcome to Al Tabaq",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      initialValue: "Crafted with tradition. Served with pride. Every dish celebrates generations of culinary excellence.",
    }),
    defineField({
      name: "customerRating",
      title: "Customer Rating",
      type: "string",
      initialValue: "4.8★",
    }),
    defineField({
      name: "averageDeliveryTime",
      title: "Average Delivery Time",
      type: "string",
      initialValue: "30 min",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "eventsTitle",
      title: "Events Title",
      type: "string",
      initialValue: "Perfect for family gatherings and corporate dining",
    }),
    defineField({
      name: "eventsDescription",
      title: "Events Description",
      type: "text",
      initialValue: "Host your celebrations, team dinners, and special occasions with desi flavors, polished service, and a warm atmosphere tailored for diverse guests.",
    }),
    defineField({
      name: "cateringTitle",
      title: "Catering Title",
      type: "string",
      initialValue: "Royal flavors for memorable occasions",
    }),
    defineField({
      name: "cateringDescription",
      title: "Catering Description",
      type: "text",
      initialValue: "Weddings, birthdays, corporate lunches, and private functions with custom menu packages. Speak with us directly on WhatsApp for quick planning.",
    }),
    defineField({
      name: "menuDescription",
      title: "Menu Description",
      type: "text",
      initialValue: "Curated desi specialties with premium ingredients, handcrafted spice balance, and presentation that reflects the AlTabaq dining identity.",
    }),
    defineField({
      name: "logo",
      title: "Restaurant Logo",
      type: "image",
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Background Video",
      type: "file",
      options: {
        accept: "video/mp4",
      },
    }),
  ],
});
