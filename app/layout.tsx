import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import MobileBottomBar from "@/components/ui/MobileBottomBar";
import PageLoader from "@/components/ui/PageLoader";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stryper Event Management | Event Planning Company in Jaipur",
  description:
    "We plan and manage events across India. Corporate events, weddings, sports events, and more. Based in Jaipur with 5+ years experience.",
  keywords: [
    "event management",
    "event planning",
    "corporate events",
    "wedding planning",
    "sports events",
    "event company Jaipur",
    "event management India",
    "brand promotion events",
  ],
  authors: [{ name: "Stryper Event Management" }],
  creator: "Stryper Event Management",
  publisher: "Stryper Event Management",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.stryperevent.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Stryper Event Management | Event Planning in Jaipur",
    description:
      "We plan and manage events across India. Corporate events, weddings, sports events, and more. Based in Jaipur with 5+ years experience.",
    siteName: "Stryper Event Management",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stryper Event Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stryper Event Management | Event Planning in Jaipur",
    description:
      "We plan and manage events across India. Corporate events, weddings, sports events, and more.",
    images: ["/og-image.jpg"],
    creator: "@stryperevent",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <ClientProviders>
          <PageLoader />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
          <MobileBottomBar />
        </ClientProviders>
      </body>
    </html>
  );
}
