import Image from "next/image";

import type { Dish } from "@/lib/sanityClient";
import { useCart } from "@/context/CartContext";


type DishCardProps = {
  dish: Dish;
  whatsappNumber: string;
};
import Image from "next/image";

import type { Dish } from "@/lib/sanityClient";
import { useCart } from "@/context/CartContext";


type DishCardProps = {
  dish: Dish;
  whatsappNumber: string;
};

export default function DishCard({ dish, whatsappNumber }: DishCardProps) {
  const { addItem } = useCart();
  const orderText = encodeURIComponent(`Hi Al Tabaq! I'd like to order: ${dish.name} (Price: AED ${dish.price})`);

  return (
    <article className="group overflow-hidden rounded-[1.2rem] border border-brand-border/90 bg-brand-bg shadow-[0_12px_30px_-20px_rgba(43,43,43,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(43,43,43,0.55)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={
            dish.imageUrl ||
            "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1200&q=80"
          }
          alt={dish.name}
          fill
          loading="lazy"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute inset-x-2.5 bottom-2.5 flex flex-col justify-end gap-1">
          <h3 className="font-heading text-sm sm:text-xl leading-tight text-white drop-shadow-md">
            {dish.name}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <p className="line-clamp-1 text-[9px] sm:text-xs text-white/90">
              {dish.description || "Freshly prepared."}
            </p>
            <p className="whitespace-nowrap rounded-full bg-white/95 px-2 py-0.5 text-[10px] sm:text-sm font-black text-brand-text">
              AED {dish.price}
            </p>
          </div>
        </div>

        {dish.isPopular && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-cta px-2 py-0.5 text-[8px] sm:text-xs font-bold text-white shadow-lg">
            Popular
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-2.5 sm:p-4">
        <div className="flex items-center gap-1.5">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${orderText}`}
            target="_blank"
            rel="noreferrer"
            className="relative flex-1 inline-flex h-9 sm:h-12 items-center justify-center overflow-hidden rounded-lg bg-brand-wa text-[9px] sm:text-sm font-bold text-white shadow-lg transition-all duration-300 hover:brightness-110 active:scale-95"
          >
            <span className="cta-shimmer absolute inset-0" />
            <span className="relative">WhatsApp</span>
          </a>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (dish.variants && dish.variants.length > 0) {
                return; 
              }
              addItem({
                id: dish._id,
                name: dish.name,
                price: dish.price,
                imageUrl: dish.imageUrl
              });
            }}
            className="inline-flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg border-2 border-brand-cta/20 bg-white text-brand-cta transition hover:bg-brand-cta hover:text-white active:scale-90"
            title={dish.variants && dish.variants.length > 0 ? "Select Size" : "Add to Tray"}
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
