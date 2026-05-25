"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import React, { useState, useEffect } from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const VIDEOS = [
  {
    title: "Corporate Excellence",
    src: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.11 PM (1).mp4",
    thumbnail: "/images/gallery/Award-shows-Host.jpg.jpeg",
  },
  {
    title: "Musical Nights",
    src: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.12 PM (2).mp4",
    thumbnail: "/images/gallery/concert.webp",
  },
  {
    title: "Grand Events",
    src: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.13 PM.mp4",
    thumbnail: "/images/gallery/1120880-ambiance-concert.jpg.jpeg",
  },
  {
    title: "Sports Action",
    src: "/videos/gallery/WhatsApp Video 2026-05-24 at 11.34.12 PM (1).mp4",
    thumbnail: "/images/gallery/IMG_1850.JPG.jpeg",
  },
];

const VideoShowcase = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % VIDEOS.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + VIDEOS.length) % VIDEOS.length);
    }
  };

  // Robust scroll lock logic for Video Modal
  useEffect(() => {
    if (activeIdx === null) {
      return;
    }
    
    const scrollY = window.scrollY;
    document.body.classList.add("no-scroll");
    document.body.style.top = `-${scrollY}px`;
    
    return () => {
      document.body.classList.remove("no-scroll");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [activeIdx]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIdx(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white/[0.01]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-accent-yellow/5 rounded-full blur-[150px]" />

      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="VIDEO SHOWCASE"
          title="Watch Our Events"
          align="center"
          className="mb-16"
        />

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {VIDEOS.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-video rounded-2xl overflow-hidden glass glow-border group cursor-pointer"
              onClick={() => setActiveIdx(index)}
            >
              {/* Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-transparent to-primary-black/20" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-accent-yellow rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.4)] group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-primary-black ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-accent-yellow text-xs font-bold tracking-widest uppercase mb-1">Highlight</p>
                <h3 className="text-xl font-bold text-white">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {activeIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary-black/98 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8 touch-none"
              onClick={() => setActiveIdx(null)}
            >
              {/* Top Bar (Close & Index) */}
              <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[110]">
                <div className="text-white/60 font-medium">
                  {activeIdx + 1} / {VIDEOS.length}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-xl"
                  onClick={() => setActiveIdx(null)}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Navigation Controls */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 z-[110] pointer-events-none">
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all pointer-events-auto backdrop-blur-sm border border-white/10"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={32} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all pointer-events-auto backdrop-blur-sm border border-white/10"
                  onClick={handleNext}
                >
                  <ChevronRight size={32} />
                </motion.button>
              </div>

              {/* Video Player Container */}
              <motion.div
                key={activeIdx}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 touch-auto overscroll-contain"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={VIDEOS[activeIdx].src}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
                
                {/* Info Overlay inside player */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {VIDEOS[activeIdx].title}
                  </h3>
                  <p className="text-accent-yellow/80 text-sm">Stryper Event Management</p>
                </div>
              </motion.div>

              {/* Bottom Instructions */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs hidden md:block">
                Press ESC to close • Use arrows to navigate
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default VideoShowcase;
