"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Heart,
  Video,
  Trophy,
  Award,
  Target,
  Layout,
  Box,
  Users,
} from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

const iconMap = {
  briefcase: Briefcase,
  heart: Heart,
  video: Video,
  trophy: Trophy,
  award: Award,
  target: Target,
  layout: Layout,
  box: Box,
  users: Users,
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  delay = 0,
}) => {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      className={cn(
        "glass glow-border transition-smooth group relative overflow-hidden rounded-2xl p-8"
      )}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-glow-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-accent-yellow/20 bg-accent-yellow/10 transition-colors group-hover:border-accent-yellow/50"
        >
          <IconComponent className="h-7 w-7 text-accent-yellow" />
        </motion.div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-accent-yellow">
          {title}
        </h3>

        {/* Description */}
        <p className="leading-relaxed text-white/60">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
