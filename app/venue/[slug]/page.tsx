"use client";

import { usePathname, notFound } from "next/navigation";
import React, { useState, useEffect } from "react";
import { VENUES, COMPANY_CONTACT } from "@/constants";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star, MapPin, CheckCircle2, Image as ImageIcon, Video, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function VenuePage({ params }: { params: { slug: string } }) {
  const venue = VENUES.find((v) => v.slug === params.slug);
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");

  if (!venue) {
    notFound();
  }

  return (
    <main className="pt-24 min-h-screen bg-primary-black">
      {/* Venue Header / Hero */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden border-b border-white/5">
        <img
          src={venue.image}
          alt={venue.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/40 to-transparent" />
        <Container className="absolute inset-0 flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-yellow text-primary-black w-fit">
              <Star size={14} className="fill-primary-black" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{venue.rating}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              {venue.name}
            </h1>
            <div className="flex items-center gap-2 text-white font-bold uppercase tracking-[0.3em] text-xs">
              <MapPin size={16} className="text-accent-yellow" />
              {venue.location}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Integrated Property Details & Lead Form */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-yellow/5 blur-[120px] rounded-full -translate-y-1/2" />
        
        <Container>
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <div className="w-12 h-1 bg-accent-yellow" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Royal Essence</h2>
                <p className="text-xl text-white/70 leading-relaxed font-medium">
                  {venue.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {venue.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-yellow/30 transition-all group">
                    <CheckCircle2 size={20} className="text-accent-yellow shrink-0" />
                    <span className="font-bold text-white/80 uppercase text-[10px] tracking-widest">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form - Elegant Integrated Card */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 p-8 md:p-10 rounded-[2.5rem] bg-[#111] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-accent-yellow" />
                
                <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Request Details</h3>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Get exclusive packages for {venue.name}</p>
                  </div>

                  <form className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Your Name</label>
                      <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold text-white focus:outline-none focus:border-accent-yellow transition-all" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="flex gap-2">
                        <div className="w-16 bg-white/5 border border-white/10 rounded-xl px-2 flex items-center justify-center text-[10px] font-black text-white">+91</div>
                        <input type="tel" placeholder="00000-00000" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold text-white focus:outline-none focus:border-accent-yellow transition-all" />
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-4">
                      <button type="submit" className="w-full bg-accent-yellow text-primary-black py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_rgba(250,204,21,0.2)] flex items-center justify-center gap-2">
                         Submit Inquiry <Send size={14} />
                      </button>
                    </div>
                  </form>

                  <div className="pt-6 border-t border-white/5 text-center">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em]">Or connect directly via WhatsApp below</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Media Gallery Section */}
      <section className="py-24 bg-white/[0.01]">
        <Container>
          <div className="flex flex-col items-center mb-16 space-y-12">
            <div className="text-center space-y-4">
              <span className="text-accent-yellow text-xs font-black uppercase tracking-[0.4em]">Visual Showcase</span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Experience Grandeur</h2>
            </div>
            
            {/* Tabs - Refined Style */}
            <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab("images")}
                className={cn(
                  "px-10 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                  activeTab === "images" ? "bg-accent-yellow text-primary-black shadow-lg" : "text-white/40 hover:text-white"
                )}
              >
                <ImageIcon size={14} /> Images
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={cn(
                  "px-10 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                  activeTab === "videos" ? "bg-accent-yellow text-primary-black shadow-lg" : "text-white/40 hover:text-white"
                )}
              >
                <Video size={14} /> Videos
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {activeTab === "images" ? (
                venue.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden glass hover-glow transition-all duration-500 group">
                    <img src={img} alt={`${venue.name} view ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                ))
              ) : (
                venue.videos.map((vid, idx) => (
                  <div key={idx} className="relative aspect-video rounded-[2rem] overflow-hidden glass border border-white/10">
                    <video src={vid} controls className="w-full h-full object-cover" />
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>
    </main>
  );
}
