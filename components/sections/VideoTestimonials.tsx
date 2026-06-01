"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import React, { useState } from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { VIDEO_TESTIMONIALS } from "@/constants";

const VideoTestimonials = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          subtitle="VOICE OF CLIENTS"
          title="Video Testimonials"
          align="center"
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEO_TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative cursor-pointer"
              onClick={() => setActiveVideo(testimonial.videoUrl)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 glass">
                <img
                  src={testimonial.thumbnail}
                  alt={testimonial.clientName}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-accent-yellow text-primary-black shadow-[0_0_30px_rgba(250,204,21,0.5)] transform transition-transform duration-500 group-hover:scale-110">
                    <Play fill="currentColor" size={24} className="ml-1" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 text-center">
                <h4 className="text-xl font-bold text-white group-hover:text-accent-yellow transition-colors">
                  {testimonial.clientName}
                </h4>
                <p className="text-white/50 text-sm">{testimonial.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white z-[110]"
              onClick={() => setActiveVideo(null)}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={activeVideo}
                className="w-full h-full object-contain"
                controls
                autoPlay
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoTestimonials;
