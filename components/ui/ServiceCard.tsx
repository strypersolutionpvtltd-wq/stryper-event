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
  image: string;
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
  image,
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
      className="group relative flex flex-col items-center text-center"
    >
      {/* Circular Image Container */}
      <div className="relative mb-6 h-48 w-48 md:h-56 md:w-56">
        {/* Animated Border/Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 rounded-full border border-dashed border-accent-yellow/30"
        />
        
        <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white/10 glass transition-smooth group-hover:border-accent-yellow/50 group-hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-20" />
          
          {/* Floating Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
             <div className="rounded-full bg-accent-yellow p-3 text-primary-black shadow-lg">
                <IconComponent size={24} />
             </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[280px]">
        <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-accent-yellow md:text-2xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-white/60 line-clamp-2 transition-colors group-hover:text-white/80 md:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
