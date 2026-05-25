import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", children, className, ...props },
    ref
  ) => {
    const baseStyles =
      "btn-base inline-flex items-center justify-center gap-2 font-semibold transition-smooth";

    const variants = {
      primary:
        "bg-accent-yellow text-primary-black hover:bg-accent-gold hover:scale-105 hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]",
      secondary:
        "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-accent-yellow/50",
      outline:
        "bg-transparent text-accent-yellow border-2 border-accent-yellow hover:bg-accent-yellow hover:text-primary-black",
      ghost: "bg-transparent text-white hover:bg-white/10",
    };

    const sizes = {
      sm: "px-6 py-2.5 text-sm",
      md: "px-8 py-4 text-base",
      lg: "px-10 py-5 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
