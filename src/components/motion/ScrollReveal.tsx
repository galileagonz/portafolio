"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUp, reducedFade, REVEAL_OFFSET } from "./transitions";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
};

// Fades children in with a short rise when they enter the viewport
export function ScrollReveal({ children, delay = 0, className = "", amount = 0.3 }: ScrollRevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: REVEAL_OFFSET }}
      whileInView={{ opacity: 1, y: 0, transition: reduce ? reducedFade : { ...fadeUp, delay } }}
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}
