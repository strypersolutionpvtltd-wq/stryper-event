"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Video as VideoIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface VideoItem {
  id: string | number;
  title: string;
  category: string;
  type: string;
  video?: string;
  image?: string;
}

const VideoShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultCategories = [
    { id: "all", label: "All" },
    { id: "corporate", label: "Corporate" },
    { id: "sports", label: "Sports" },
    { id: "weddings", label: "Weddings" },
    { id: "brand", label: "Promotion" },
    { id: "fabrication", label: "Fab" },
  ];

  const fallbackVideos: VideoItem[] = [
    {
      id: "fb-1",
      category: "weddings",
      title: "Grand Wedding Highlights",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM (1).mp4",
      type: "video",
    },
    {
      id: "fb-2",
      category: "corporate",
      title: "Corporate Excellence",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.12 PM.mp4",
      type: "video",
    },
    {
      id: "fb-3",
      category: "brand",
      title: "Luxury Event Production",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM.mp4",
      type: "video",
    },
    {
      id: "fb-4",
      category: "sports",
      title: "Sports Tournament Action",
      video: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.12 PM (1).mp4",
      type: "video",
    },
    {
      id: "fb-5",
      category: "fabrication",
      title: "Stage Construction & Fab",
      video: "/videos/gallery/WhatsApp Video 2026-06-02 at 2.51.15 AM (2).mp4",
      type: "video",
    },
  ];

  // Fetch dynamic video items from /api/events
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/events");
        if (res.ok) {
          const data = await res.json();
          // Filter ONLY video type items
          const videosOnly = data.filter((item: any) => item.type === "video");
          setVideoItems(videosOnly.length > 0 ? videosOnly : fallbackVideos);
        } else {
          setVideoItems(fallbackVideos);
        }
      } catch (err) {
        console.warn("Using fallback videos:", err);
        setVideoItems(fallbackVideos);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Dynamically build category list combining defaults and any custom categories in videoItems
  const categories = (() => {
    const cats = [...defaultCategories];
    videoItems.forEach((item) => {
      if (item.category) {
        const catLower = item.category.toLowerCase();
        if (!cats.some((c) => c.id.toLowerCase() === catLower)) {
          const label = item.category.charAt(0).toUpperCase() + item.category.slice(1);
          cats.push({ id: catLower, label });
        }
      }
    });
    return cats;
  })();

  const filteredVideos = videoItems.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section className="py-16 md:py-32 bg-white/[0.01] overflow-hidden px-4 md:px-0">
      <Container>
        {/* Section Heading */}
        <SectionHeading
          subtitle="VIDEO SHOWCASE"
          title="See Us In Action"
          align="center"
          className="mb-8 md:mb-12"
        />

        {/* Category Filter Buttons */}
        <div className="flex overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 md:overflow-visible md:pb-0 md:justify-center md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 shrink-0"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-accent-yellow text-primary-black shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                    : "bg-white/5 text-white/60 border border-white/10 hover:border-accent-yellow/50"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="relative aspect-video rounded-3xl bg-white/5 animate-pulse border border-white/10 flex items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 border-t-accent-yellow animate-spin" />
              </div>
            ))}
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-3xl">
            <VideoIcon size={48} className="mx-auto text-white/20 mb-3" />
            <p className="text-white/60 text-sm font-semibold">No videos found in this category.</p>
          </div>
        ) : (
          /* Video Grid */
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video, index) => {
                const videoSrc = video.video || "";
                return (
                  <motion.div
                    key={video.id || index}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -8 }}
                    className="group relative aspect-video rounded-3xl overflow-hidden glass glow-border cursor-pointer bg-black"
                    onClick={() => setSelectedVideo(video)}
                  >
                    {/* Video Element for Thumbnail & Preview */}
                    {videoSrc ? (
                      <video
                        src={videoSrc}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <VideoIcon size={40} className="text-white/20" />
                      </div>
                    )}

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all pointer-events-none" />

                    {/* Center Play Icon */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-accent-yellow rounded-full flex items-center justify-center text-primary-black shadow-2xl transform transition-transform group-hover:scale-110">
                        <Play size={24} className="ml-1" fill="currentColor" />
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                      <p className="text-accent-yellow text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                        {video.category} • VIDEO
                      </p>
                      <h3 className="text-white font-bold text-base md:text-lg leading-tight truncate">
                        {video.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Video Player Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-2 md:p-8"
              onClick={() => setSelectedVideo(null)}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-6 right-6 md:top-10 md:right-10 z-[210] flex items-center gap-3 group"
                onClick={() => setSelectedVideo(null)}
              >
                <span className="hidden md:block text-white/40 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                  Close Video
                </span>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all group-hover:rotate-90">
                  <X size={24} className="md:w-8 md:h-8" />
                </div>
              </motion.button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={selectedVideo.video}
                  className="w-full h-full object-contain"
                  autoPlay
                  controls
                  playsInline
                />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 pointer-events-none max-w-[75%] bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-2xl">
                  <p className="text-accent-yellow text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">
                    {selectedVideo.category} • VIDEO
                  </p>
                  <h3 className="text-sm md:text-lg font-bold text-white leading-tight truncate">{selectedVideo.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default VideoShowcase;
