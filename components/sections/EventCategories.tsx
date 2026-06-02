"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import React from "react";
import Image from "next/image";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { EVENT_CATEGORIES, COMPANY_CONTACT } from "@/constants";

const EventCategories = () => {
  return (
    <section id="events" className="relative overflow-hidden py-24 md:py-32">
      {/* Background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-yellow/10 blur-[120px]"
      />

      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="EVENT TYPES"
          title="Events We Handle"
          align="center"
          className="mb-16"
        />

        {/* Horizontal Showcase Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EVENT_CATEGORIES.map((category, index) => (
            <motion.a
              key={index}
              href={`https://wa.me/${COMPANY_CONTACT.whatsapp.replace(/[^0-9]/g, "")}?text=Hi, I am interested in ${category.title}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="glass glow-border transition-smooth group relative cursor-pointer overflow-hidden rounded-2xl h-full min-h-[320px]"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-yellow/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-glow-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Image Background */}
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-end p-8">
                <div className="space-y-3">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-accent-yellow">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed text-white/70">
                    {category.description}
                  </p>

                  {/* Arrow replaced with WhatsApp icon */}
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 pt-2 text-accent-yellow opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <span className="text-sm font-black uppercase tracking-widest">Contact Us</span>
                    <MessageSquare size={16} fill="currentColor" />
                  </motion.div>
                </div>
              </div>

              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(250, 204, 21, 0.3), transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "200% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default EventCategories;
