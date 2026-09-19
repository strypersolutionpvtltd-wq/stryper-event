"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Tag as TagIcon,
  ArrowRight,
} from "lucide-react";
import Container from "@/components/ui/Container";

interface BlogItem {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  subtitle?: string;
  excerpt?: string;
  category: string;
  tags?: string[];
  content: string;
  coverImage?: string;
  author: string;
  readTime?: string;
  date: string;
  status: "draft" | "published" | "archived";
  ctaText?: string;
  ctaUrl?: string;
}

interface BlogDetailClientProps {
  initialBlog: BlogItem;
}

export default function BlogDetailClient({ initialBlog }: BlogDetailClientProps) {
  const [blog] = useState<BlogItem>(initialBlog);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogItem[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchRelatedBlogs();
  }, [blog.slug, blog.category]);

  const fetchRelatedBlogs = async () => {
    try {
      const res = await fetch(
        `/api/blogs/related?slug=${blog.slug}&category=${encodeURIComponent(blog.category)}&limit=3`
      );
      if (res.ok) {
        const data = await res.json();
        setRelatedBlogs(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Fetch related blogs error:", err);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Basic Markdown Renderer for headings, lists, bold, links, and paragraphs
  const renderFormattedContent = (rawContent: string) => {
    if (!rawContent) return null;

    const lines = rawContent.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-2 my-4 text-slate-300">
            {currentList.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: parseInlineFormatting(item) }} />
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        currentList.push(trimmed.substring(2));
        return;
      } else {
        flushList();
      }

      if (trimmed.startsWith("## ")) {
        elements.push(
          <h2
            key={index}
            className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4 tracking-tight border-b border-amber-500/20 pb-2"
            dangerouslySetInnerHTML={{ __html: parseInlineFormatting(trimmed.substring(3)) }}
          />
        );
      } else if (trimmed.startsWith("### ")) {
        elements.push(
          <h3
            key={index}
            className="text-xl md:text-2xl font-bold text-amber-400 mt-8 mb-3 tracking-tight"
            dangerouslySetInnerHTML={{ __html: parseInlineFormatting(trimmed.substring(4)) }}
          />
        );
      } else if (trimmed.startsWith("> ")) {
        elements.push(
          <blockquote
            key={index}
            className="border-l-4 border-amber-500 bg-amber-500/10 p-4 my-6 rounded-r-xl text-amber-200 italic font-medium"
            dangerouslySetInnerHTML={{ __html: parseInlineFormatting(trimmed.substring(2)) }}
          />
        );
      } else if (trimmed.length > 0) {
        elements.push(
          <p
            key={index}
            className="text-slate-300 text-base md:text-lg leading-relaxed my-4"
            dangerouslySetInnerHTML={{ __html: parseInlineFormatting(trimmed) }}
          />
        );
      }
    });

    flushList();
    return elements;
  };

  const parseInlineFormatting = (text: string) => {
    let parsed = text
      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' class='text-amber-400 underline hover:text-amber-300 transition-colors font-medium'>$1</a>");
    return parsed;
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/blog" className="hover:text-amber-400 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 truncate max-w-xs">{blog.category}</span>
        </nav>

        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" /> Back to All Articles
        </Link>

        {/* Header Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-wider">
              {blog.category}
            </span>
            {blog.status === "draft" && (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase">
                Draft Preview
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            {blog.title}
          </h1>

          {(blog.subtitle || blog.excerpt) && (
            <p className="text-lg md:text-xl text-slate-300 font-normal leading-relaxed border-l-2 border-amber-500/40 pl-4">
              {blog.subtitle || blog.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <User className="w-4 h-4 text-amber-400" /> {blog.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" /> {blog.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" /> {blog.readTime || "5 min read"}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-amber-500/30 transition-all text-xs font-semibold"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              {copied ? "Link Copied!" : "Share Article"}
            </button>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
          <img
            src={blog.coverImage || "/images/family.jpg"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Article Content */}
        <article className="prose prose-invert max-w-none space-y-4">
          {renderFormattedContent(blog.content)}
        </article>

        {/* Tags list if available */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-800">
            <TagIcon className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
              Tags:
            </span>
            {blog.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Custom Call To Action Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 p-8 md:p-10 rounded-3xl text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
            STRYPER EVENT SERVICES
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
            Ready to Plan Your Exceptional Event?
          </h3>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            From royal destination weddings in Jaipur to grand corporate galas and live concerts, our event team handles everything from concept to flawless execution.
          </p>
          <div className="pt-2">
            <Link
              href={blog.ctaUrl || "/contact"}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
            >
              {blog.ctaText || "Book Your Consultation With Stryper Events"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                Related Articles
              </h3>
              <Link href="/blog" className="text-xs font-bold text-amber-400 hover:text-amber-300">
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rel) => (
                <Link
                  key={rel.id || rel._id}
                  href={`/blog/${rel.slug}`}
                  className="group bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 rounded-2xl overflow-hidden flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="aspect-video relative bg-slate-950 overflow-hidden">
                      <img
                        src={rel.coverImage || "/images/corporate-new.jpg"}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        {rel.category}
                      </span>
                      <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                  <div className="px-5 py-3 border-t border-slate-800/80 text-xs text-slate-400 flex justify-between items-center">
                    <span>{rel.date}</span>
                    <span className="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
