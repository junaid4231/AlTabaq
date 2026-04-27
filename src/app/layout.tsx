import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

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
  title: "AlTabaq Restaurant | Premium Pakistani Cuisine in Ajman",
  description:
    "AlTabaq Restaurant brings authentic Pakistani desi dishes in an elegant Ajman dining experience. Explore our menu and order directly on WhatsApp.",
  keywords: [
    "Pakistani restaurant Ajman",
    "Desi food Ajman",
    "Karahi Ajman",
    "Biryani Ajman",
    "AlTabaq Restaurant",
    "Best Pakistani Food UAE",
  ],
  openGraph: {
    title: "AlTabaq Restaurant | Premium Pakistani Cuisine",
    description:
      "Premium Pakistani restaurant in Ajman with elegant design, menu showcase, and instant WhatsApp ordering.",
    type: "website",
    url: "https://al-tabaq.vercel.app",
    siteName: "AlTabaq",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlTabaq Restaurant | Premium Pakistani Cuisine",
    description: "Authentic Pakistani dining experience in Ajman. Order via WhatsApp.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CartProvider } from "@/context/CartContext";
import { getHomepageData } from "@/lib/sanityClient";
import CartTray from "@/components/CartTray";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getHomepageData();
  const { settings } = data;
  const whatsapp = settings.whatsapp;

  // JSON-LD Restaurant Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": settings.restaurantName,
    "image": "https://al-tabaq.vercel.app/logo.png",
    "@id": "https://al-tabaq.vercel.app",
    "url": "https://al-tabaq.vercel.app",
    "telephone": settings.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings.address,
      "addressLocality": "Ajman",
      "addressCountry": "AE"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "11:00",
      "closes": "23:00"
    },
    "menu": "https://al-tabaq.vercel.app/menu",
    "servesCuisine": "Pakistani, Desi, Asian",
    "priceRange": "$$"
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
          <CartTray whatsappNumber={whatsapp} />
        </CartProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
