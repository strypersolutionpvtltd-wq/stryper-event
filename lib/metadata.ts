import { Metadata } from "next";

export const siteMetadata = {
  title: "Stryper Event Management | Premium Corporate Events in Jaipur",
  description:
    "Leading event management company in Jaipur specializing in corporate events, weddings, sports events, and brand promotions. Professional event production with 500+ successful events delivered.",
  keywords: [
    "event management",
    "corporate events",
    "wedding planning",
    "event production",
    "Jaipur events",
    "sports event management",
    "brand promotion",
    "exhibition setup",
    "award ceremonies",
    "event fabrication",
  ],
  author: "Stryper Event Management Pvt Ltd",
  siteUrl: "https://stryperevent.com",
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
          alt: "Stryper Event Management",
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
    verification: {
      google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
  };
};
