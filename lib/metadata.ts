import { Metadata } from "next";

export const siteMetadata = {
  title: "Event Management Company in Jaipur | Stryper Events",
  description:
    "Premier event management company in Jaipur specializing in destination wedding planning, royal palace weddings, corporate conferences, sports events, and stage production across India.",
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
    "Fairmont Jaipur Wedding",
    "Taj Rambagh Palace Wedding",
  ],
  author: "Stryper Event Management Pvt Ltd",
  siteUrl: "https://www.stryperevent.com",
  image: "/og-image.jpg",
  locale: "en_IN",
};

export const generateMetadata = (): Metadata => {
  return {
    title: siteMetadata.title,
    description: siteMetadata.description,
    keywords: siteMetadata.keywords,
    authors: [{ name: siteMetadata.author }],
    creator: siteMetadata.author,
    publisher: siteMetadata.author,
    metadataBase: new URL(siteMetadata.siteUrl),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: siteMetadata.locale,
      url: siteMetadata.siteUrl,
      title: siteMetadata.title,
      description: siteMetadata.description,
      siteName: "Stryper Event Management",
      images: [
        {
          url: siteMetadata.image,
          width: 1200,
          height: 630,
          alt: "Event Management Company in Jaipur | Stryper Events",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteMetadata.title,
      description: siteMetadata.description,
      images: [siteMetadata.image],
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
  };
};
