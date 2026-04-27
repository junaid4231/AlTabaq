import type { Settings } from "@/lib/sanityClient";

type ContactProps = {
  settings: Settings;
  whatsappNumber: string;
};

export default function Contact({ settings, whatsappNumber }: ContactProps) {
  const phoneHref = settings.phone.replace(/\s/g, "");

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-[1fr_1.2fr]">
        <article className="rounded-3xl border border-brand-border bg-brand-bg p-4 sm:p-8 shadow-[0_24px_55px_-35px_rgba(43,43,43,0.6)]">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-brand-muted uppercase">
            Contact
          </p>
          <h2 className="mt-1 font-heading text-lg sm:text-3xl text-brand-text leading-tight">
            Visit or Order
          </h2>

          <dl className="mt-4 space-y-3 sm:space-y-4">
            <div>
              <dt className="text-[10px] sm:text-sm font-semibold text-brand-text">Address</dt>
              <dd className="text-[10px] sm:text-sm text-brand-muted line-clamp-2">{settings.address}</dd>
            </div>
            <div>
              <dt className="text-[10px] sm:text-sm font-semibold text-brand-text">Phone</dt>
              <dd>
                <a
                  href={`tel:${phoneHref}`}
                  className="text-[10px] sm:text-sm text-brand-muted hover:text-brand-text"
                >
                  {settings.phone}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-col gap-2">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 sm:h-11 items-center justify-center rounded-lg sm:rounded-xl bg-brand-wa px-3 sm:px-5 text-[10px] sm:text-sm font-semibold text-white shadow-md shadow-brand-wa/30 transition hover:brightness-105"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${phoneHref}`}
              className="inline-flex h-9 sm:h-11 items-center justify-center rounded-lg sm:rounded-xl border border-brand-border bg-brand-bg px-3 sm:px-5 text-[10px] sm:text-sm font-semibold text-brand-text transition hover:bg-white"
            >
              Call Us
            </a>
          </div>
        </article>

        <div className="overflow-hidden rounded-3xl border border-brand-border shadow-[0_24px_55px_-35px_rgba(43,43,43,0.6)]">
          <iframe
            title="Restaurant location map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent("AL TABAQ RESTAURANT JURF2 OPP HAMRIYA FREE ZONE GATE 2 SALAAM CAMP AJMAN")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="h-full w-full min-h-[250px] sm:min-h-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
