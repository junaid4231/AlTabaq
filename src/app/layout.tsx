import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CartProvider } from "@/context/CartContext";
import { getHomepageData } from "@/lib/sanityClient";
import CartTray from "@/components/CartTray";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://altabaq.com"),
  title: "Al Tabaq Restaurant | Authentic Pakistani Food in Ajman, UAE",
  description:
    "Al Tabaq Restaurant serves authentic halal Pakistani food in Ajman UAE. Fresh karahi, BBQ, handi, biryani and more. Order directly on WhatsApp.",
  keywords: [
    "Pakistani restaurant Ajman",
    "halal restaurant Ajman",
    "desi food Ajman",
    "karahi Ajman",
    "biryani Ajman",
    "BBQ Ajman",
    "Pakistani food UAE",
    "Al Tabaq restaurant",
    "restaurant Jurf Ajman",
    "Pakistani restaurant near me UAE",
  ],
  openGraph: {
    title: "Al Tabaq Restaurant | Authentic Pakistani Food in Ajman, UAE",
    description:
      "Authentic halal Pakistani food in Ajman UAE. Fresh karahi, BBQ, handi, biryani and more. Order directly on WhatsApp.",
    type: "website",
    url: "https://altabaq.com",
    siteName: "Al Tabaq Restaurant",
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Tabaq Restaurant | Authentic Pakistani Food in Ajman, UAE",
    description:
      "Authentic halal Pakistani food in Ajman UAE. Karahi, BBQ, handi, biryani and more. Order on WhatsApp.",
  },
  alternates: {
    canonical: "https://altabaq.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getHomepageData();
  const { settings } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: settings.restaurantName,
    image: "https://altabaq.com/logo.png",
    "@id": "https://altabaq.com",
    url: "https://altabaq.com",
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Ajman",
      addressRegion: "Ajman",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.3948",
      longitude: "55.5136",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    menu: "https://altabaq.com/menu",
    servesCuisine: ["Pakistani", "Desi", "Halal"],
    priceRange: "$$",
    currenciesAccepted: "AED",
    paymentAccepted: "Cash, Credit Card",
    areaServed: ["Ajman", "Dubai", "Sharjah"],
  };

  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8f6f2] text-[#1f1b16]">
        <CartProvider>
          {children}
          <CartTray settings={settings} />
        </CartProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}