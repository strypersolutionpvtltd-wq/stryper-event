"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import React, { useState, useEffect } from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const VideoShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 1,
      title: "Grand Wedding Highlights",
      thumbnail: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
      videoUrl: "/videos/gallery/WhatsApp Video 2026-06-02 at 2.51.15 AM.mp4",
      category: "Wedding",
    },
    {
      id: 2,
      title: "Corporate Excellence",
      thumbnail: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&w=800&q=80",
      videoUrl: "/videos/gallery/WhatsApp Video 2026-06-02 at 2.51.14 AM.mp4",
      category: "Corporate",
    },
    {
      id: 3,
      title: "Luxury Event Production",
      thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
      videoUrl: "/videos/gallery/WhatsApp Video 2026-06-02 at 2.51.16 AM.mp4",
      category: "Production",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white/[0.01] overflow-hidden">
      <Container>
        <SectionHeading
          subtitle="VIDEO SHOWCASE"
          title="See Us In Action"
          align="center"
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative aspect-video rounded-3xl overflow-hidden glass glow-border cursor-pointer"
              onClick={() => setSelectedVideo(video.videoUrl)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-accent-yellow rounded-full flex items-center justify-center text-primary-black shadow-2xl transform transition-transform group-hover:scale-110">
                  <Play size={24} fill="currentColor" />
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-accent-yellow text-[10px] font-black uppercase tracking-[0.2em] mb-1">{video.category}</p>
                  <h3 className="text-white font-bold text-lg">{video.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.button
                className="absolute top-8 right-8 text-white/50 hover:text-white"
                onClick={() => setSelectedVideo(null)}
              >
                <X size={40} />
              </motion.button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={selectedVideo}
                  className="w-full h-full object-contain"
                  autoPlay
                  controls
                  playsInline
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default VideoShowcase;
