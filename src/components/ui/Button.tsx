"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonProps = Omit<HTMLMotionProps<"button">, "ref"> & {
  variant?: Variant;
  size?: Size;
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-kyuto-purple-600 to-kyuto-pink-500 text-white shadow-lg shadow-kyuto-purple-300/40 hover:shadow-xl hover:shadow-kyuto-pink-300/50",
  secondary:
    "bg-white text-kyuto-purple-800 border border-kyuto-purple-200 hover:bg-kyuto-purple-50",
  ghost:
    "bg-transparent text-kyuto-purple-700 hover:bg-kyuto-purple-50",
  outline:
    "bg-transparent text-kyuto-purple-700 border-2 border-kyuto-purple-400 hover:bg-kyuto-purple-50",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kyuto-purple-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
