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
    </div>
  );
};

export default SectionDivider;
