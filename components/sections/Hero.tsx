"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { COMPANY_STATS } from "@/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useGetStartedModal } from "@/hooks/useModal";
import Link from "next/link";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80", // Grand Gala
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=80", // Wedding Decor
  "https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&w=1920&q=80", // Corporate Stage
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1920&q=80", // Event Production
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1920&q=80", // Celebration
];

const Hero = () => {
  const { onOpen } = useGetStartedModal();
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Absolute Clarity Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={HERO_IMAGES[currentIdx]}
              alt="Luxury Event"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Invisible protection - only for text contrast */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content - Elegant & Non-Intrusive */}
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-7xl font-extralight text-white tracking-[0.2em] uppercase leading-none drop-shadow-lg">
              Stryper <span className="font-bold text-accent-yellow">Events</span>
            </h1>
            <p className="text-sm md:text-base text-white/80 font-bold uppercase tracking-[0.5em] drop-shadow-md">
              Jaipur&apos;s Premier Event Architects
            </p>
          </div>

          <div className="pt-8">
            <motion.button
              onClick={onOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-accent-yellow transition-colors shadow-2xl"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </Container>

      {/* Elegant minimalist indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
        {HERO_IMAGES.map((_, i) => (
          <div 
            key={i} 
            className={`h-[2px] transition-all duration-700 ${i === currentIdx ? "w-8 bg-accent-yellow" : "w-4 bg-white/30"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
