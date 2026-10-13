import type { Transition } from "motion/react";

// Bouncy spring used for playful entrances
export const springPop: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 18,
  mass: 0.8,
};

// Reduced motion: transforms jump instantly, only opacity fades
export const reducedFade: Transition = {
  default: { duration: 0 },
  opacity: { duration: 0.4, ease: "easeOut" },
};
