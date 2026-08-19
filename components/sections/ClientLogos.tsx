"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface ClientItem {
  id?: string | number;
  name: string;
  logo?: string;
  website?: string;
}

const defaultClients: ClientItem[] = [
  { name: "Haus" },
  { name: "Luxurient" },
  { name: "Fru Bon" },
  { name: "Yashoda Craft" },
  { name: "Puno" },
  { name: "Rufile" },
  { name: "NO BROKER" },
  { name: "MANKIND" },
  { name: "MAGICPIN" },
  { name: "SWIGGI" },
  { name: "Health Decode" },
  { name: "IT Pay" },
];

const ClientLogos = () => {
  const [clients, setClients] = useState<ClientItem[]>(defaultClients);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/clients");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setClients(data);
          }
        }
      } catch (err) {
        console.warn("Using default clients:", err);
      }
    };

    fetchClients();
  }, []);

  // Ensure enough items for continuous marquee loop
  const displayList = clients.length < 6 ? [...clients, ...clients, ...clients, ...clients] : [...clients, ...clients, ...clients];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white/[0.01]">
      <Container className="relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <SectionHeading
            subtitle="PROUDLY SERVED • TRUSTED BY"
            title="Companies We Proudly Serve"
            align="center"
            className="mb-3 md:mb-4"
          />
          <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto font-medium">
            We have proudly served &amp; powered unforgettable event experiences for these top companies, corporate giants, and industry leaders.
          </p>
        </div>

        <div className="relative group">
          {/* Gradient Masks for ultra smooth fade on left/right edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: [0, -1800],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-10 md:gap-20 items-center shrink-0"
            >
              {displayList.map((client, index) => {
                const hasLogo = client.logo && client.logo.trim().length > 0;

                const content = (
                  <div
                    key={`${client.id || client.name}-${index}`}
                    className="flex-shrink-0 flex items-center justify-center px-4 md:px-6 py-2 rounded-2xl transition-all duration-300 hover:scale-105"
                  >
                    {hasLogo ? (
                      <div className="h-10 md:h-14 w-28 md:w-40 relative flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500">
                        {client.logo?.startsWith("data:") || client.logo?.startsWith("http") ? (
                          <img
                            src={client.logo}
                            alt={client.name}
                            className="max-h-full max-w-full object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.05)]"
                          />
                        ) : (
                          <span className="text-xl md:text-2xl font-bold text-white/50 hover:text-accent-yellow transition-colors duration-500 whitespace-nowrap uppercase tracking-widest">
                            {client.name}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xl md:text-3xl font-bold text-white/50 hover:text-accent-yellow transition-colors duration-500 whitespace-nowrap cursor-default uppercase tracking-widest">
                        {client.name}
                      </span>
                    )}
                  </div>
                );

                if (client.website && client.website.trim().length > 0) {
                  return (
                    <a
                      key={`link-${client.id || client.name}-${index}`}
                      href={client.website.startsWith("http") ? client.website : `https://${client.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      {content}
                    </a>
                  );
                }

                return content;
              })}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ClientLogos;
