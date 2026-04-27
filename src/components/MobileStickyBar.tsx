type MobileStickyBarProps = {
  phone: string;
  whatsappNumber: string;
  mapsQuery: string;
};

export default function MobileStickyBar({
  phone,
  whatsappNumber,
  mapsQuery,
}: MobileStickyBarProps) {
  const cleanPhone = phone.replace(/\s/g, "");

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-border bg-brand-bg/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2">
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-wa text-sm font-semibold text-white"
        >
          WhatsApp
        </a>
        <a
          href={`tel:${cleanPhone}`}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-text text-sm font-semibold text-white"
        >
          Call
        </a>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(mapsQuery)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-brand-border bg-white text-sm font-semibold text-brand-text"
        >
          Location
        </a>
      </div>
    </div>
  );
}
