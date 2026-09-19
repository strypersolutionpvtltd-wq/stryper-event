import React from "react";
import BlogListingClient from "@/components/blog/BlogListingClient";

export const metadata = {
  title: "Blog & Insights | STRYPER EVENTS - Royal Weddings & Event Management",
  description:
    "Expert insights on destination wedding costs, corporate conference planning, event production, brand activations, and venue selection in Jaipur & Pan-India.",
  openGraph: {
    title: "STRYPER EVENTS Blog & Event Insights",
    description:
      "Expert guides on royal wedding venues, corporate galas, concert sound setups, and event planning in Jaipur.",
    url: "https://stryperevent.com/blog",
    siteName: "Stryper Events",
    images: [
      {
        url: "/images/family.jpg",
        width: 1200,
        height: 630,
        alt: "Stryper Events Blog",
      },
    ],
    type: "website",
  },
};

export default function BlogListingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-28 pb-20">
      <BlogListingClient />
    </main>
  );
}
