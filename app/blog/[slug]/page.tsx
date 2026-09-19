import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailClient from "@/components/blog/BlogDetailClient";
import { getBlogDataBySlug } from "@/lib/blogUtils";

export const dynamic = "force-dynamic";

interface BlogPageProps {
  params: Promise<{ slug: string }> | { slug: string };
  searchParams?: Promise<{ admin?: string }> | { admin?: string };
}

export async function generateMetadata(props: BlogPageProps): Promise<Metadata> {
  const resolvedParams = await props.params;
  const resolvedSearchParams = props.searchParams ? await props.searchParams : {};
  const isAdmin = resolvedSearchParams.admin === "true";
  const blog = await getBlogDataBySlug(resolvedParams.slug, isAdmin);

  if (!blog) {
    return {
      title: "Article Not Found | STRYPER EVENTS",
      description: "The requested blog article could not be found.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stryperevent.com";
  const pageTitle = blog.seoTitle || blog.title || "STRYPER EVENTS Blog";
  const pageDesc = blog.metaDescription || blog.excerpt || blog.subtitle || "Expert event planning insights from STRYPER EVENTS.";
  const coverImg = blog.coverImage || "/images/family.jpg";
  const canonical = blog.canonicalUrl || `${siteUrl}/blog/${blog.slug}`;

  return {
    title: `${pageTitle} | STRYPER EVENTS`,
    description: pageDesc,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: blog.ogTitle || pageTitle,
      description: blog.ogDescription || pageDesc,
      url: `${siteUrl}/blog/${blog.slug}`,
      siteName: "Stryper Events",
      images: [
        {
          url: blog.ogImage || coverImg,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author || "Stryper Editorial"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.ogTitle || pageTitle,
      description: blog.ogDescription || pageDesc,
      images: [blog.ogImage || coverImg],
    },
    robots: blog.status === "published" ? "index, follow" : "noindex, nofollow",
  };
}

export default async function BlogDetailPage(props: BlogPageProps) {
  const resolvedParams = await props.params;
  const resolvedSearchParams = props.searchParams ? await props.searchParams : {};
  const isAdmin = resolvedSearchParams.admin === "true";
  const blog = await getBlogDataBySlug(resolvedParams.slug, isAdmin);

  if (!blog) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stryperevent.com";

  // JSON-LD Schema for BlogPosting
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || blog.subtitle,
    image: blog.coverImage ? [blog.coverImage] : undefined,
    datePublished: blog.date,
    dateModified: blog.updated_at || blog.date,
    author: {
      "@type": "Person",
      name: blog.author || "Stryper Editorial",
    },
    publisher: {
      "@type": "Organization",
      name: "STRYPER EVENTS",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${blog.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient initialBlog={blog} />
    </main>
  );
}
