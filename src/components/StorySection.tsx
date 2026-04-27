export default function StorySection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Story Content */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold tracking-widest text-brand-cta uppercase">
              Our Heritage
            </p>
            <h2 className="mt-3 font-heading text-4xl leading-tight text-brand-text md:text-5xl">
              More Than a Meal.
              <br />A Tradition.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-relaxed text-brand-muted">
            <p>
              Founded with a simple yet powerful belief: authentic Pakistani
              cuisine deserves to be crafted with precision, served with pride,
              and shared with family.
            </p>
            <p>
              Every dish in our kitchen carries generations of culinary mastery.
              We source the finest ingredients, employ time-honored cooking
              techniques, and blend them with modern presentation—creating a
              dining experience that honors tradition while embracing
              contemporary excellence.
            </p>
            <p>
              From our family to yours: where every bite tells a story of
              dedication, heritage, and pure flavor.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="border-l-4 border-brand-cta pl-4">
              <p className="font-heading text-3xl font-bold text-brand-text">
                150+
              </p>
              <p className="text-sm text-brand-muted">Signature Dishes</p>
            </div>
            <div className="border-l-4 border-brand-wa pl-4">
              <p className="font-heading text-3xl font-bold text-brand-text">
                50K+
              </p>
              <p className="text-sm text-brand-muted">Happy Customers</p>
            </div>
            <div className="border-l-4 border-brand-accent pl-4">
              <p className="font-heading text-3xl font-bold text-brand-text">
                100%
              </p>
              <p className="text-sm text-brand-muted">Halal Certified</p>
            </div>
            <div className="border-l-4 border-brand-text pl-4">
              <p className="font-heading text-3xl font-bold text-brand-text">
                Ajman
              </p>
              <p className="text-sm text-brand-muted">Trusted Since Day 1</p>
            </div>
          </div>
        </div>

        {/* Story Image */}
        <div className="relative hidden lg:block">
          <div className="absolute -inset-8 rounded-3xl bg-linear-to-br from-brand-cta/20 to-brand-accent/10 blur-2xl" />
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-linear-to-br from-brand-cta/40 to-brand-accent/20 shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white/80">
                <p className="font-heading text-6xl">🍛</p>
                <p className="mt-4 text-sm tracking-wide">
                  Culinary Excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
