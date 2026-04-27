export default function CateringSection() {
  return (
    <section className="bg-brand-text px-4 py-20 sm:px-8 sm:py-28 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 lg:order-2">
            <div>
              <p className="text-sm font-semibold tracking-widest text-brand-wa uppercase">
                Beyond Restaurant
              </p>
              <h2 className="mt-3 font-heading text-4xl leading-tight md:text-5xl">
                Premium Catering & Events
              </h2>
            </div>

            <p className="text-base leading-relaxed text-white/90">
              Bring the authentic taste of Pakistani cuisine to your special
              occasions. Our catering service delivers restaurant-quality
              dishes, impeccable presentation, and attentive service for events
              of any size.
            </p>

            <ul className="space-y-3">
              {[
                "Corporate Events & Conferences",
                "Weddings & Engagements",
                "Birthday Celebrations",
                "Family Gatherings",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-wa text-xs font-bold text-brand-text">
                    ✓
                  </span>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="mailto:catering@altabaq.com"
              className="inline-flex items-center justify-center rounded-full bg-brand-wa px-8 py-3 text-base font-semibold text-brand-text transition hover:brightness-90"
            >
              Inquire About Catering
            </a>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="aspect-square overflow-hidden rounded-2xl bg-linear-to-br from-brand-wa/30 to-brand-accent/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-heading text-6xl">🍽️</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
