"use client";

import { motion } from "framer-motion";
import React from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";
import { COMPANY_CONTACT } from "@/constants";

const SimpleHero = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Event Background"
          fill
          className="object-cover opacity-60 scale-105"
          priority
        />
        {/* Advanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="max-w-4xl">
          {/* Animated Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-1 bg-accent-yellow mb-8"
          />

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-accent-yellow font-black uppercase tracking-[0.3em] text-xs md:text-sm">
              Premium Event Management
            </span>
            <div className="h-px w-12 bg-white/20" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-6"
          >
            STRYPER <br />
            <span className="text-accent-yellow">EVENTS</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/70 text-base md:text-xl max-w-2xl leading-relaxed mb-10 border-l-2 border-white/10 pl-6"
          >
            From royal destination weddings to high-profile corporate galas, we don&apos;t just plan events—we create legacies in the heart of Jaipur.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <motion.a
              href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 px-8 py-4 bg-accent-yellow text-black rounded-full font-black uppercase tracking-widest text-xs md:text-xs shadow-[0_20px_50px_rgba(250,204,21,0.3)] transition-all hover:bg-white"
            >
              <MessageSquare size={18} fill="currentColor" />
              Start Planning
            </motion.a>
            
            <Link href="#services">
              <motion.button
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-[10px] md:text-xs group"
              >
                Explore Services
                <ArrowRight className="text-accent-yellow transition-transform group-hover:translate-x-2" size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Side Decorative Text */}
      <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 rotate-90 hidden xl:block">
        <span className="text-[80px] font-black text-white/5 uppercase tracking-tighter select-none">
          STRYPER
        </span>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent-yellow to-transparent" />
      </motion.div>
    </section>
  );
};

export default SimpleHero;
