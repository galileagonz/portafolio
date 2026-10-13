"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type TargetAndTransition } from "motion/react";
import { reducedFade, springPop } from "./transitions";

type Direction = "up" | "left" | "right" | "pop";

// Starting pose for each entrance style
const offsets: Record<Direction, TargetAndTransition> = {
  up: { y: 64, rotate: -2 },
  left: { x: -96, rotate: -3 },
  right: { x: 96, rotate: 3 },
  pop: { scale: 0.5, rotate: -10 },
};

type ScrollRevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  amount?: number;
};

// Animates children in when they enter the viewport
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  amount = 0.3,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: reduce ? reducedFade : { ...springPop, delay },
      }}
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}
