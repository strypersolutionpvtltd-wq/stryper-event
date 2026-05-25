"use client";

import { motion } from "framer-motion";
import React from "react";

const SectionDivider: React.FC = () => {
  return (
    <div className="relative h-32 overflow-hidden">
      {/* Gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent-yellow/30 to-transparent"
      />

      {/* Glowing orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-yellow"
      >
        <div className="absolute inset-0 animate-ping rounded-full bg-accent-yellow opacity-75" />
      </motion.div>
    </div>
  );
};

export default SectionDivider;
