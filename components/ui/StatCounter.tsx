"use client";

import { motion } from "framer-motion";
import React from "react";

interface StatCounterProps {
  value: string;
  label: string;
  delay?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({
  value,
  label,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
        className="text-gradient mb-2 text-5xl font-bold md:text-6xl"
      >
        {value}
      </motion.div>
      <div className="text-sm text-white/60 md:text-base">{label}</div>
    </motion.div>
  );
};

export default StatCounter;
