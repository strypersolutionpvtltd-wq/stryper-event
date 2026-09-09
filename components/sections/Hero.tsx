"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMPANY_CONTACT } from "@/constants";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80", // Grand Gala
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=80", // Wedding Decor
  "https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&w=1920&q=80", // Corporate Stage
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1920&q=80", // Event Production
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1920&q=80", // Celebration
];

const Hero = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Absolute Clarity Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[currentIdx]}
              alt="Event Management Company in Jaipur - Stryper Events"
              fill
              priority={currentIdx === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>

      {/* Content - Highly Responsive Scaling & Strict SEO H1 */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl text-center space-y-6 md:space-y-8"
        >
          <div className="space-y-4 md:space-y-5">
            {/* Top Brand Tag */}
            <span className="inline-block text-[11px] sm:text-xs md:text-sm text-accent-yellow font-black uppercase tracking-[0.25em] sm:tracking-[0.4em] drop-shadow-md">
              Stryper Events • Luxury & Corporate
            </span>

            {/* Primary SEO H1 Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-[0.03em] sm:tracking-[0.08em] uppercase leading-tight drop-shadow-2xl">
              Event Management Company <br className="hidden sm:inline" />
              <span className="font-bold text-accent-yellow">in Jaipur</span>
            </h1>

            {/* Value Proposition Subheading */}
            <p className="text-xs sm:text-base md:text-lg text-white/80 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Wedding, corporate, sports, and production event management across Jaipur and India.
            </p>
          </div>

          <div className="pt-4 md:pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="w-full sm:w-auto inline-block px-8 py-4 md:px-10 md:py-4 bg-accent-yellow text-primary-black text-xs md:text-sm font-black uppercase tracking-[0.2em] rounded-full hover:bg-accent-gold transition-colors shadow-2xl"
            >
              Explore Services
            </Link>

            <motion.a
              href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-block px-8 py-4 md:px-10 md:py-4 bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-black uppercase tracking-[0.2em] rounded-full border border-white/20 backdrop-blur-md transition-colors"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Elegant minimalist indicator */}
      <div className="absolute bottom-24 md:bottom-10 left-0 right-0 flex justify-center gap-2 md:gap-3 z-20">
        {HERO_IMAGES.map((_, i) => (
          <div 
            key={i} 
            className={`h-[2px] transition-all duration-700 ${i === currentIdx ? "w-6 md:w-8 bg-accent-yellow" : "w-3 md:w-4 bg-white/30"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
