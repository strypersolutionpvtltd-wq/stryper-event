"use client";

import { motion } from "framer-motion";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const ClientLogos = () => {
  const clients = [
    { name: "Haus", url: "/images/logo.png" },
    { name: "Luxurient", url: "/images/logo.png" },
    { name: "Fru Bon", url: "/images/logo.png" },
    { name: "Yashoda Craft", url: "/images/logo.png" },
    { name: "Puno", url: "/images/logo.png" },
    { name: "Rufile", url: "/images/logo.png" },
    { name: "NO BROKER", url: "/images/logo.png" },
    { name: "MANKIND", url: "/images/logo.png" },
    { name: "MAGICPIN", url: "/images/logo.png" },
    { name: "SWIGGI", url: "/images/logo.png" },
    { name: "Health Decode", url: "/images/logo.png" },
    { name: "IT Pay", url: "/images/logo.png" },
  ];

  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section className="relative py-24 overflow-hidden bg-white/[0.01]">
      <Container className="relative z-10">
        <SectionHeading
          subtitle="TRUSTED BY"
          title="Companies We Work With"
          align="center"
          className="mb-16"
        />

        <div className="relative group">
          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: [0, -1200],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-12 md:gap-24 items-center"
            >
              {duplicatedClients.map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center px-8"
                >
                  <span className="text-2xl md:text-3xl font-bold text-white/50 hover:text-accent-yellow transition-colors duration-500 whitespace-nowrap cursor-default uppercase tracking-widest">
                    {client.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ClientLogos;
