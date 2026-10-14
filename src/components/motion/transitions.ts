import type { Transition } from "motion/react";

// Distance (px) content rises while fading in
export const REVEAL_OFFSET = 16;

// Calm ease-out used for entrances
export const fadeUp: Transition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
};

// Reduced motion: transforms jump instantly, only opacity fades
export const reducedFade: Transition = {
  default: { duration: 0 },
  opacity: { duration: 0.3, ease: "easeOut" },
};
