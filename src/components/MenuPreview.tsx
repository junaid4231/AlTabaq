import type { Category } from "@/lib/sanityClient";

type MenuPreviewProps = {
  categories: Category[];
};

export default function MenuPreview({ categories }: MenuPreviewProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-7 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-brand-muted uppercase">
            Explore
          </p>
          <h2 className="mt-2 font-heading text-3xl text-brand-text sm:text-4xl">
            Menu Categories
          </h2>
        </div>
        <a
          href="/menu"
          className="text-sm font-semibold text-brand-cta hover:underline"
        >
          View Full Menu
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <a
            key={category._id}
            href={`/menu?category=${encodeURIComponent(category.name)}`}
            className="group rounded-2xl border border-brand-border bg-brand-bg p-5 shadow-[0_16px_35px_-28px_rgba(43,43,43,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_45px_-30px_rgba(43,43,43,0.6)]"
          >
            <p className="font-heading text-2xl text-brand-text">
              {category.name}
            </p>
            <p className="mt-2 text-sm text-brand-muted">
              Tap to browse chef specials
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-cta transition group-hover:translate-x-1">
              Explore
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
