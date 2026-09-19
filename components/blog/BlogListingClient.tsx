"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, User, Clock, ArrowRight, FileText } from "lucide-react";
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
}

const CATEGORIES = [
  "All",
  "Weddings",
  "Corporate Events",
  "Event Production",
  "Brand Activation",
  "Sports Events",
  "Event Planning",
];

export default function BlogListingClient() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    fetchPublishedBlogs();
  }, []);

  const fetchPublishedBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.blogs || [];
        setBlogs(list.filter((b: BlogItem) => b.status === "published"));
      }
    } catch (err) {
      console.error("Error loading published blogs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory =
      activeCategory === "All" || b.category.toLowerCase() === activeCategory.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      b.title.toLowerCase().includes(q) ||
      (b.excerpt || "").toLowerCase().includes(q) ||
      (b.content || "").toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const gridBlogs = filteredBlogs.slice(1, visibleCount);

  return (
    <Container>
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
          STRYPER ARTICLES & INSIGHTS
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
          Event Planning <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Guides & Articles</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg leading-relaxed">
          Expert insights, budget guides, venue reviews, and production blueprints for luxury destination weddings, corporate galas, and live entertainment events.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-6 mb-12">
        {/* Search Input */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles by title, keyword, or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 shadow-xl transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 scale-105"
                  : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-400 space-y-4">
          <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto" />
          <p>Loading published articles...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4 max-w-xl mx-auto">
          <FileText className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Articles Found</h3>
          <p className="text-slate-400 text-sm">
            There are currently no published articles matching &quot;{searchQuery}&quot;. Please check back soon or reset filters.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold text-sm hover:bg-amber-500/20 transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Featured Article Card */}
          {featuredBlog && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/90 border border-amber-500/20 rounded-3xl overflow-hidden shadow-2xl hover:border-amber-500/40 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[440px]">
                  <img
                    src={featuredBlog.coverImage || "/images/family.jpg"}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:hidden" />
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg">
                    Featured Article
                  </span>
                </div>

                <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                        {featuredBlog.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {featuredBlog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {featuredBlog.readTime || "5 min read"}
                      </span>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold text-white hover:text-amber-400 transition-colors leading-snug">
                      <Link href={`/blog/${featuredBlog.slug}`}>{featuredBlog.title}</Link>
                    </h2>

                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {featuredBlog.excerpt || featuredBlog.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>{featuredBlog.author}</span>
                    </div>

                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all hover:translate-x-1 shadow-lg shadow-amber-500/10"
                    >
                      Read Full Article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid of Articles */}
          {gridBlogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridBlogs.map((blog, idx) => (
                <motion.article
                  key={blog.id || blog._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-slate-900/70 border border-slate-800 hover:border-amber-500/30 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:shadow-amber-500/5 transition-all group"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-slate-950">
                      <img
                        src={blog.coverImage || "/images/corporate-new.jpg"}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-200 font-medium text-xs">
                        {blog.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          {blog.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          {blog.readTime || "5 min read"}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h3>

                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                        {blog.excerpt || blog.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-950/30 flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <User className="w-3 h-3 text-amber-400" /> {blog.author}
                    </span>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Read More <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredBlogs.length > visibleCount && (
            <div className="text-center pt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-8 py-3.5 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-amber-400 font-bold text-sm hover:bg-slate-800 transition-all shadow-xl"
              >
                Load More Articles ({filteredBlogs.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}
