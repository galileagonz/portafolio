"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

// Thin lila-to-yellow bar showing page scroll progress
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Springy fill; reduced motion tracks scroll directly
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-1.5 origin-left bg-[linear-gradient(90deg,var(--lila),var(--violet),var(--sun))]"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}
