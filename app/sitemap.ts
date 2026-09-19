import { MetadataRoute } from "next";
import { SERVICES, VENUES, CASE_STUDIES } from "@/constants";
import fs from "fs";
import path from "path";

function getPublishedBlogSlugs(): { slug: string; date: string }[] {
  try {
    const filePath = path.join(process.cwd(), "data", "blogs.json");
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      return data
        .filter((b: any) => b.status === "published")
        .map((b: any) => ({
          slug: b.slug,
          date: b.date || new Date().toISOString(),
        }));
    }
  } catch (err) {
    console.error("Sitemap blog read error:", err);
  }
  return [];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl = envUrl && !envUrl.includes("localhost") ? envUrl : "https://www.stryperevent.com";

  // Individual Service Pages
  const serviceUrls: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Individual Venue Pages
  const venueUrls: MetadataRoute.Sitemap = VENUES.map((venue) => ({
    url: `${baseUrl}/venue/${venue.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Individual Case Study Pages
  const caseStudyUrls: MetadataRoute.Sitemap = CASE_STUDIES.map((study) => ({
    url: `${baseUrl}/events/case-studies/${study.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Published Blog Pages
  const publishedBlogs = getPublishedBlogSlugs();
  const blogUrls: MetadataRoute.Sitemap = publishedBlogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Static Core Route Pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/venue`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/clients`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/review`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tourism`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  return [...corePages, ...serviceUrls, ...venueUrls, ...caseStudyUrls, ...blogUrls];
}
