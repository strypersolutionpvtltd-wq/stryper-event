"use client";

import { motion } from "framer-motion";
import {
  Zap,
  CheckCircle,
  Users,
  Shield,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import React from "react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BENEFITS } from "@/constants";

const iconMap = {
  zap: Zap,
  "check-circle": CheckCircle,
  users: Users,
  shield: Shield,
  "message-circle": MessageCircle,
  "trending-up": TrendingUp,
};

const Benefits = () => {
  return (
    <section id="benefits" className="relative overflow-hidden py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-accent-gold/5 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          subtitle="BENEFITS"
          title="What You Get"
          align="center"
          className="mb-16"
        />

        {/* Benefits Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {BENEFITS.map((benefit, index) => {
            const IconComponent =
              iconMap[benefit.icon as keyof typeof iconMap] || Zap;

            return (
              <motion.div
                key={index}
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
                className="glass glow-border transition-smooth group relative overflow-hidden rounded-2xl p-8"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-glow-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-accent-yellow/30 bg-gradient-to-br from-accent-yellow/20 to-accent-gold/20 transition-colors group-hover:border-accent-yellow/60"
                  >
                    <IconComponent className="h-7 w-7 text-accent-yellow" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-accent-yellow">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed text-white/60">
                    {benefit.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-4 top-4 h-2 w-2 rounded-full bg-accent-yellow"
                />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Benefits;
