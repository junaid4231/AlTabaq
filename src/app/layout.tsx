import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

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
  title: "AlTabaq Restaurant | Premium Pakistani Cuisine in Dubai",
  description:
    "AlTabaq Restaurant brings authentic Pakistani desi dishes in an elegant Dubai dining experience. Explore menu and order directly on WhatsApp.",
  keywords: [
    "Pakistani restaurant Dubai",
    "Desi food Dubai",
    "Karahi Dubai",
    "Biryani Dubai",
    "AlTabaq Restaurant",
  ],
  openGraph: {
    title: "AlTabaq Restaurant",
    description:
      "Premium Pakistani restaurant website with elegant design, menu showcase, and WhatsApp ordering.",
    type: "website",
  },
  alternates: {
    canonical: "/",
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
  const whatsapp = data.settings.whatsapp;

  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8f6f2] text-[#1f1b16]">
        <CartProvider>
          {children}
          <CartTray whatsappNumber={whatsapp} />
        </CartProvider>
      </body>
    </html>
  );
}
