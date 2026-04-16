"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

type Variant = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleUp";

const variants: Record<Variant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
};

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  variant?: Variant;
  delay?: number;
  duration?: number;
};

export function ScrollReveal({
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  children,
  ...rest
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants[variant]}
      transition={{ duration, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
