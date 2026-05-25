import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  delay = 0,
}) => {
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
        "glass glow-border transition-smooth group rounded-2xl p-8",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
