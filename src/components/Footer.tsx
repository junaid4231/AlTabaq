import Link from "next/link";

type FooterProps = {
  restaurantName: string;
};

export default function Footer({ restaurantName }: FooterProps) {
  return (
    <footer className="bg-brand-text text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold">
              {restaurantName}
            </h3>
            <p className="max-w-xs text-sm text-white/75">
              Premium Pakistani cuisine crafted with tradition and served with
              pride. Experience authentic flavors in Ajman and Dubai.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-sm transition hover:bg-white/10"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-sm transition hover:bg-white/10"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-sm transition hover:bg-white/10"
                aria-label="WhatsApp"
              >
                WA
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="transition hover:text-white">
                  Menu
                </Link>
              </li>
              <li>
                <a href="#catering" className="transition hover:text-white">
                  Catering
                </a>
              </li>
              <li>
                <a href="#contact" className="transition hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wide">Services</h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <a href="#" className="transition hover:text-white">
                  Dine In
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Takeaway
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Private Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <a
                  href="tel:+971500000000"
                  className="transition hover:text-white"
                >
                  +971 50 000 0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@altabaq.com"
                  className="transition hover:text-white"
                >
                  info@altabaq.com
                </a>
              </li>
              <li>
                <p>Sheikh Ammar Rd</p>
                <p>Ajman, UAE</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-white/75">
            <p>© 2026 {restaurantName}. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
