import Image from "next/image";

import type { Dish } from "@/lib/sanityClient";

type GalleryProps = {
  dishes: Dish[];
};

export default function Gallery({ dishes }: GalleryProps) {
  const galleryItems = dishes.slice(0, 6);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.22em] text-brand-muted uppercase">
          Gallery
        </p>
        <h2 className="mt-2 font-heading text-3xl text-brand-text sm:text-4xl">
          Fresh From Our Kitchen
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {galleryItems.map((dish, index) => (
          <a
            key={dish._id}
            href={dish.imageUrl}
            target="_blank"
            rel="noreferrer"
            className={`group relative block overflow-hidden rounded-2xl ${
              index === 0
                ? "col-span-2 row-span-2 sm:col-span-1 sm:row-span-1"
                : ""
            }`}
          >
            <div className="relative aspect-square">
              <Image
                src={
                  dish.imageUrl ||
                  "https://images.unsplash.com/photo-1596797038530-2c107aa4e1fa?auto=format&fit=crop&w=900&q=80"
                }
                alt={dish.name}
                fill
                loading="lazy"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-85 transition group-hover:opacity-100" />
              <p className="absolute bottom-3 left-3 text-sm font-semibold text-white">
                {dish.name}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
