"use client";

import { motion } from "framer-motion";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const ClientLogos = () => {
  // Placeholder client logos - replace with actual client names
  const clients = [
    "Tata Motors",
    "Reliance",
    "Infosys",
    "Airtel",
    "HDFC Bank",
    "ICICI Bank",
    "LIC India",
    "Jaipur Rugs",
    "AU Bank",
    "Zomato",
  ];

  // Duplicate for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="OUR CLIENTS"
          title="Companies We Work With"
          align="center"
          className="mb-16"
        />

        {/* Infinite Scrolling Marquee */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary-black to-transparent z-10" />

          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: [0, -100 * clients.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
              className="flex gap-8 md:gap-12"
            >
              {duplicatedClients.map((client, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 w-36 h-20 md:w-48 md:h-24 glass rounded-xl flex items-center justify-center group cursor-pointer transition-all hover:glow-border"
                >
                  <span className="text-white/40 group-hover:text-white font-bold text-center px-4 transition-colors">
                    {client}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60">
            Trusted by <span className="text-accent-yellow font-bold">15+</span> happy clients
            and many more companies across India
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default ClientLogos;
