const testimonials = [
  {
    name: "Ahmed Hassan",
    location: "Ajman",
    text: "The most authentic biryani I've had outside of home. Every spice is perfect.",
    rating: 5,
  },
  {
    name: "Fatima Khan",
    location: "Dubai",
    text: "Best karahi in the UAE. Fresh ingredients and incredible flavor. Highly recommend!",
    rating: 5,
  },
  {
    name: "Mohammed Ali",
    location: "Ajman",
    text: "Ordered for a family gathering. Everyone loved it. Will definitely order again!",
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold tracking-widest text-brand-cta uppercase">
          Loved by Customers
        </p>
        <h2 className="mt-3 font-heading text-4xl text-brand-text md:text-5xl">
          Voices of Satisfaction
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, idx) => (
          <article
            key={idx}
            className="rounded-xl border border-brand-border bg-brand-bg p-6 shadow-sm"
          >
            <div className="mb-4 flex gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-lg">
                  ⭐
                </span>
              ))}
            </div>

            <p className="mb-6 text-base leading-relaxed text-brand-muted">
              &quot;{testimonial.text}&quot;
            </p>

            <div className="border-t border-brand-border pt-4">
              <p className="font-semibold text-brand-text">
                {testimonial.name}
              </p>
              <p className="text-sm text-brand-muted">{testimonial.location}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
