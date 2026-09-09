import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import MobileBottomBar from "@/components/ui/MobileBottomBar";
import PageLoader from "@/components/ui/PageLoader";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { COMPANY_CONTACT } from "@/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Event Management Company in Jaipur | Stryper Events",
  description:
    "Leading event management company in Jaipur specializing in destination wedding planning, royal palace weddings, corporate conferences, sports events, and stage production across India.",
  keywords: [
    "Event Management Company in Jaipur",
    "Destination Wedding Planner in Jaipur",
    "Royal Wedding Planner",
    "Palace Wedding Planner",
    "Wedding Decor & Production",
    "Guest Management",
    "Hospitality Management",
    "Baraat Management",
    "Venue Coordination",
    "Wedding Entertainment",
    "Wedding Logistics",
    "Corporate Event Planner Jaipur",
    "Conference Management",
    "Product Launch Events",
    "Annual Corporate Events",
    "Stage Production",
    "Sound & Lighting",
    "AV Production",
    "Event Fabrication",
    "Sports Management",
    "Award Shows",
    "Brand Promotion",
  ],
  authors: [{ name: "Stryper Event Management" }],
  creator: "Stryper Event Management",
  publisher: "Stryper Event Management",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.stryperevent.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.stryperevent.com",
    title: "Event Management Company in Jaipur | Stryper Events",
    description:
      "Wedding, corporate, sports, and production event management across Jaipur and India. 500+ successful events delivered.",
    siteName: "Stryper Event Management",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Event Management Company in Jaipur | Stryper Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Management Company in Jaipur | Stryper Events",
    description:
      "Wedding, corporate, sports, and production event management across Jaipur and India.",
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
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventPlanningCompany",
  name: "Stryper Event Management",
  alternateName: "Stryper Events",
  url: "https://www.stryperevent.com",
  logo: "https://www.stryperevent.com/images/logo.png",
  image: "https://www.stryperevent.com/og-image.jpg",
  description:
    "Leading event management company in Jaipur specializing in destination wedding planning, royal palace weddings, corporate conferences, and stage production across India.",
  telephone: `+${COMPANY_CONTACT.whatsapp}`,
  email: COMPANY_CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jaipur",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "26.9124",
    longitude: "75.7873",
  },
  sameAs: [
    COMPANY_CONTACT.instagram,
    COMPANY_CONTACT.linkedin,
    COMPANY_CONTACT.facebook,
    COMPANY_CONTACT.twitter,
  ],
  priceRange: "$$",
  areaServed: [
    { "@type": "City", "name": "Jaipur" },
    { "@type": "State", "name": "Rajasthan" },
    { "@type": "Country", "name": "India" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
