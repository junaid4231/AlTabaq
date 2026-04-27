const trustItems = [
  { title: "4.6 Google Rating", subtitle: "Loved by diners", icon: "⭐" },
  {
    title: "Authentic Chefs",
    subtitle: "Traditional Pakistani recipes",
    icon: "👨‍🍳",
  },
  { title: "100% Halal", subtitle: "Fresh, trusted ingredients", icon: "🕌" },
  { title: "Fast Delivery", subtitle: "Avg. 30 minutes", icon: "🚚" },
];

export default function TrustSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-brand-border bg-brand-bg p-5 shadow-[0_20px_40px_-30px_rgba(43,43,43,0.45)]"
          >
            <p className="text-3xl">{item.icon}</p>
            <h3 className="mt-3 text-lg font-semibold text-brand-text">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-brand-muted">{item.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
