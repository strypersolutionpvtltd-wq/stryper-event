"use client";

import { motion } from "framer-motion";
import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="glass glow-border transition-smooth group rounded-xl p-6"
    >
      <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-accent-yellow">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/60">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
