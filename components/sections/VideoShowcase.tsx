"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import React, { useState } from "react";

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
              className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-2 md:p-8"
              onClick={() => setSelectedVideo(null)}
            >
              {/* Enhanced Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                className="absolute top-6 right-6 md:top-10 md:right-10 z-[210] flex items-center gap-3 group"
                onClick={() => setSelectedVideo(null)}
              >
                <span className="hidden md:block text-white/40 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-white transition-colors">Close Video</span>
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
