import { motion } from "framer-motion";
import React from "react";

import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = "center",
  className,
}) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className={cn("space-y-4", alignmentClasses[align], className)}
    >
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="text-sm font-semibold uppercase tracking-wider text-accent-yellow"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2 variants={fadeInUp} className="text-heading-2 text-gradient">
        {title}
      </motion.h2>
    </motion.div>
  );
};

export default SectionHeading;
