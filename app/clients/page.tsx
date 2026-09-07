"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  Search,
  Sparkles,
  Building2,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
  MessageSquare,
  Award,
  X,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { COMPANY_CONTACT } from "@/constants";

interface ReviewItem {
  id?: string;
  name: string;
  company?: string;
  role?: string;
  eventName?: string;
  rating: number;
  text: string;
  created_at?: string;
}

interface ClientCompany {
  id?: string | number;
  name: string;
  logo?: string;
  website?: string;
}

const defaultClientsList: ClientCompany[] = [
  { name: "Haus" },
  { name: "Luxurient" },
  { name: "Fru Bon" },
  { name: "Yashoda Craft" },
  { name: "Puno" },
  { name: "Rufile" },
  { name: "NO BROKER" },
  { name: "MANKIND" },
  { name: "MAGICPIN" },
  { name: "SWIGGI" },
  { name: "Health Decode" },
  { name: "IT Pay" },
];

export default function ClientsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [clientCompanies, setClientCompanies] = useState<ClientCompany[]>(defaultClientsList);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "highest">("newest");

  // Fetch reviews & client companies
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [reviewsRes, clientsRes] = await Promise.all([
          fetch("/api/reviews"),
          fetch("/api/clients"),
        ]);

        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          if (Array.isArray(reviewsData) && reviewsData.length > 0) {
            setReviews(reviewsData);
          }
        }

        if (clientsRes.ok) {
          const clientsData = await clientsRes.json();
          if (Array.isArray(clientsData) && clientsData.length > 0) {
            setClientCompanies(clientsData);
          }
        }
      } catch (err) {
        console.warn("Error fetching clients data, using local fallbacks:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter & Search logic
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((rev) => {
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = rev.name?.toLowerCase().includes(query);
          const matchCompany = rev.company?.toLowerCase().includes(query);
          const matchEvent = rev.eventName?.toLowerCase().includes(query);
          const matchText = rev.text?.toLowerCase().includes(query);
          const matchRole = rev.role?.toLowerCase().includes(query);
          if (!matchName && !matchCompany && !matchEvent && !matchText && !matchRole) {
            return false;
          }
        }

        // Star rating filter
        if (selectedRating !== null) {
          if (selectedRating === 5 && rev.rating !== 5) return false;
          if (selectedRating === 4 && rev.rating < 4) return false;
        }

        // Category filter
        if (selectedCategory !== "all") {
          const eventLower = (rev.eventName || "").toLowerCase();
          const textLower = (rev.text || "").toLowerCase();
          const combined = `${eventLower} ${textLower}`;

          if (selectedCategory === "wedding" && !combined.includes("wedding") && !combined.includes("bride") && !combined.includes("groom") && !combined.includes("sangeet") && !combined.includes("mandap")) {
            return false;
          }
          if (selectedCategory === "corporate" && !combined.includes("corporate") && !combined.includes("conference") && !combined.includes("summit") && !combined.includes("tech") && !combined.includes("brand") && !combined.includes("partner") && !combined.includes("launch")) {
            return false;
          }
          if (selectedCategory === "sports" && !combined.includes("sport") && !combined.includes("tournament") && !combined.includes("festival") && !combined.includes("concert")) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "highest") {
          return (b.rating || 5) - (a.rating || 5);
        }
        // Default newest first (if created_at available, else fallback)
        if (a.created_at && b.created_at) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return 0;
      });
  }, [reviews, searchQuery, selectedRating, selectedCategory, sortBy]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return "5.0";
    const total = reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <main className="min-h-screen bg-primary-black text-white pt-28 md:pt-36 pb-24 relative overflow-hidden">
      {/* Ambience Background Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-yellow/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent-yellow/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header Section */}
      <section className="relative z-10 pb-16 border-b border-white/5">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow text-xs font-black uppercase tracking-[0.25em]"
            >
              <Sparkles size={14} /> Client Stories &amp; Testimonials
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white"
            >
              Trusted by Couples &amp;{" "}
              <span className="text-accent-yellow">Corporate Leaders</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              From royal palace weddings across Jaipur to high-impact national conferences, read
              authentic reviews and experiences shared by our esteemed clients.
            </motion.p>

            {/* Trust Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6"
            >
              <div className="glass glow-border rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-1 text-accent-yellow text-2xl font-black mb-1">
                  <Star className="w-5 h-5 fill-accent-yellow" />
                  <span>{averageRating}</span>
                </div>
                <p className="text-xs text-white/60 font-semibold uppercase tracking-wider">Average Rating</p>
              </div>

              <div className="glass glow-border rounded-2xl p-4 text-center">
                <div className="text-accent-yellow text-2xl font-black mb-1">
                  {reviews.length > 0 ? `${reviews.length}+` : "150+"}
                </div>
                <p className="text-xs text-white/60 font-semibold uppercase tracking-wider">Verified Reviews</p>
              </div>

              <div className="glass glow-border rounded-2xl p-4 text-center">
                <div className="text-accent-yellow text-2xl font-black mb-1">50+</div>
                <p className="text-xs text-white/60 font-semibold uppercase tracking-wider">Corporate Brands</p>
              </div>

              <div className="glass glow-border rounded-2xl p-4 text-center">
                <div className="text-accent-yellow text-2xl font-black mb-1">100%</div>
                <p className="text-xs text-white/60 font-semibold uppercase tracking-wider">Flawless Execution</p>
              </div>
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/review"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-yellow text-primary-black font-black uppercase tracking-wider text-sm rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <PlusCircle size={18} />
                Write a Review
              </Link>
              <a
                href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20Stryper%20Events,%20I%20am%20looking%20to%20plan%20an%20event.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-sm rounded-full border border-white/15 transition-all hover:scale-105 active:scale-95"
              >
                <MessageSquare size={18} />
                Talk to Our Team
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Corporate Brands Section */}
      <section className="py-16 border-b border-white/5 bg-white/[0.01]">
        <Container>
          <div className="text-center mb-8">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent-yellow">
              Industry Leaders &amp; Partners
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-white mt-1">
              Companies &amp; Brands We&apos;ve Served
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
            {clientCompanies.map((client, idx) => (
              <motion.div
                key={client.id || client.name || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="glass glow-border px-5 py-2.5 rounded-full flex items-center gap-2.5 hover:border-accent-yellow/50 transition-colors group"
              >
                <Building2 className="w-4 h-4 text-accent-yellow/60 group-hover:text-accent-yellow transition-colors" />
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
                  {client.name}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Reviews Hub Section */}
      <section className="py-16 md:py-24 relative z-10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-accent-yellow text-xs font-black uppercase tracking-[0.25em]">
                Authentic Experiences
              </span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mt-1">
                Client Testimonials &amp; Reviews
              </h2>
              <p className="text-sm text-white/60 mt-2 max-w-xl">
                Real feedback from wedding couples, corporate organizers, and event hosts who
                partnered with Stryper Events.
              </p>
            </div>

            {/* Direct write link on header */}
            <Link
              href="/review"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent-yellow hover:underline self-start md:self-auto"
            >
              Have you hosted with us? Submit your review <ChevronRight size={14} />
            </Link>
          </div>

          {/* Search and Filters Bar */}
          <div className="glass glow-border rounded-2xl p-4 md:p-6 mb-10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search input */}
              <div className="md:col-span-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search reviews by name, event, company, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent-yellow transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-accent-yellow transition-colors"
                >
                  <option value="all" className="bg-black text-white">All Event Types</option>
                  <option value="wedding" className="bg-black text-white">Royal Weddings &amp; Families</option>
                  <option value="corporate" className="bg-black text-white">Corporate &amp; Launches</option>
                  <option value="sports" className="bg-black text-white">Sports &amp; Concerts</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="md:col-span-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "newest" | "highest")}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-accent-yellow transition-colors"
                >
                  <option value="newest" className="bg-black text-white">Sort: Newest Reviews</option>
                  <option value="highest" className="bg-black text-white">Sort: Highest Rating (5★)</option>
                </select>
              </div>
            </div>

            {/* Quick Star Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white/40 font-bold uppercase tracking-wider text-[11px] mr-1">
                  Rating Filter:
                </span>
                <button
                  onClick={() => setSelectedRating(null)}
                  className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-all ${
                    selectedRating === null
                      ? "bg-accent-yellow text-primary-black"
                      : "bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  All Stars
                </button>
                <button
                  onClick={() => setSelectedRating(5)}
                  className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                    selectedRating === 5
                      ? "bg-accent-yellow text-primary-black"
                      : "bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  <Star size={12} className={selectedRating === 5 ? "fill-primary-black" : "fill-accent-yellow text-accent-yellow"} />
                  5 Stars Only
                </button>
                <button
                  onClick={() => setSelectedRating(4)}
                  className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                    selectedRating === 4
                      ? "bg-accent-yellow text-primary-black"
                      : "bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  <Star size={12} className={selectedRating === 4 ? "fill-primary-black" : "fill-accent-yellow text-accent-yellow"} />
                  4+ Stars
                </button>
              </div>

              <div className="text-white/40 font-medium">
                Showing <span className="text-accent-yellow font-bold">{filteredReviews.length}</span> reviews
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          {isLoading ? (
            <div className="py-20 text-center text-white/50 space-y-3">
              <div className="w-8 h-8 rounded-full border-2 border-accent-yellow border-t-transparent animate-spin mx-auto" />
              <p className="text-sm font-medium">Loading authentic client reviews...</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="glass glow-border rounded-3xl p-12 text-center max-w-xl mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-accent-yellow/10 flex items-center justify-center mx-auto mb-4 text-accent-yellow">
                <Search size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase text-white mb-2">No matching reviews found</h3>
              <p className="text-sm text-white/60 mb-6">
                We couldn&apos;t find any reviews matching your current filters. Try resetting the search or filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRating(null);
                  setSelectedCategory("all");
                }}
                className="px-6 py-2.5 bg-accent-yellow text-primary-black font-bold uppercase text-xs tracking-wider rounded-full hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredReviews.map((item, index) => (
                <motion.div
                  key={item.id || `${item.name}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 6) * 0.08 }}
                  className="glass glow-border rounded-2xl p-7 flex flex-col justify-between relative group hover:border-accent-yellow/40 transition-all duration-300"
                >
                  {/* Card Header & Quote Badge */}
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      {/* Rating Stars */}
                      <div className="flex gap-1">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-accent-yellow fill-accent-yellow drop-shadow-[0_0_6px_rgba(250,204,21,0.4)]"
                          />
                        ))}
                      </div>

                      {/* Verified Badge */}
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                        <CheckCircle2 size={11} /> Verified
                      </span>
                    </div>

                    {/* Event Tag */}
                    {item.eventName && (
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow text-[10px] font-black uppercase tracking-wider rounded-lg line-clamp-1">
                          {item.eventName}
                        </span>
                      </div>
                    )}

                    {/* Review Body */}
                    <div className="relative mb-6">
                      <Quote className="absolute -top-1 -left-1 w-6 h-6 text-accent-yellow/15 -z-0" />
                      <p className="text-white/85 text-sm md:text-[15px] leading-relaxed relative z-10 italic">
                        &quot;{item.text}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Client Info Footer */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-white/10 mt-auto">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent-yellow/20 via-accent-gold/10 to-transparent border border-accent-yellow/40 flex items-center justify-center flex-shrink-0 text-accent-yellow font-black text-base shadow-[0_0_15px_rgba(250,204,21,0.15)]">
                      {item.name ? item.name.charAt(0).toUpperCase() : "C"}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-sm truncate uppercase tracking-tight">
                        {item.name}
                      </h4>
                      <p className="text-white/50 text-xs truncate">
                        {[item.role, item.company].filter(Boolean).join(" • ") || "Client"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Write a Review Callout Section */}
      <section className="py-16 relative z-10">
        <Container>
          <div className="glass glow-border rounded-3xl p-8 md:p-14 relative overflow-hidden bg-gradient-to-r from-accent-yellow/[0.05] via-transparent to-accent-yellow/[0.02]">
            <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-accent-yellow/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
                <span className="inline-flex items-center gap-1.5 text-accent-yellow text-xs font-black uppercase tracking-[0.25em]">
                  <Award size={15} /> Your Feedback Matters
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                  Recently Celebrated an Event with Stryper?
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
                  Whether it was a majestic royal wedding, a corporate milestone, or a sports league,
                  your feedback inspires our team and guides future clients. Submit your review in less
                  than a minute!
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  href="/review"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-yellow text-primary-black font-black uppercase tracking-wider text-sm rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all hover:scale-105 active:scale-95"
                >
                  <PlusCircle size={18} />
                  Submit Your Review
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-xs rounded-full border border-white/10 transition-all text-center"
                >
                  Plan an Upcoming Event <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Clients Trust Us - Feature Grid */}
      <section className="py-16 border-t border-white/5 bg-white/[0.005]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent-yellow text-xs font-black uppercase tracking-[0.25em]">
              The Stryper Standard
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-white mt-1">
              Why Jaipur &amp; Pan-India Chooses Stryper
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass glow-border rounded-2xl p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent-yellow/10 flex items-center justify-center text-accent-yellow">
                <Award size={24} />
              </div>
              <h4 className="text-lg font-black uppercase text-white">Palatial Luxury &amp; Heritage</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Specialized in luxury destination venues including Fairmont, Taj Rambagh Palace, and Leela
                with bespoke regal decor.
              </p>
            </div>

            <div className="glass glow-border rounded-2xl p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent-yellow/10 flex items-center justify-center text-accent-yellow">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-lg font-black uppercase text-white">Zero-Stress Coordination</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Complete on-ground management, sound, stage, catering, and artist hospitality handled by
                dedicated event directors.
              </p>
            </div>

            <div className="glass glow-border rounded-2xl p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-accent-yellow/10 flex items-center justify-center text-accent-yellow">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-lg font-black uppercase text-white">Corporate Grade Precision</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Trusted by top giants like Swiggy, Magicpin, and Mankind for seamless branding and flawless
                audio-visual execution.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
