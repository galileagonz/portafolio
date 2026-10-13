"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { reducedFade, springPop } from "./transitions";

type RevealTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
  className?: string;
  delay?: number;
  stagger?: number;
  // "mount" plays on load, "inView" when scrolled into view
  trigger?: "mount" | "inView";
};

// Splits text into letters for staggered reveal
export function RevealText({
  text,
  as: Tag = "span",
  id,
  className = "",
  delay = 0,
  stagger = 0.035,
  trigger = "inView",
}: RevealTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: reduce ? 0 : stagger,
      },
    },
  };

  // Same states for everyone; only the transition changes
  const letter: Variants = {
    hidden: { opacity: 0, y: "0.6em", rotate: 14, scale: 0.6 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: reduce ? reducedFade : springPop,
    },
  };

  const play =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: { once: true, amount: 0.5 } };

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline"
        variants={container}
        initial="hidden"
        {...play}
      >
        {words.map((word, w) => (
          <span key={w}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((char, c) => (
                <motion.span
                  key={c}
                  variants={letter}
                  className="inline-block origin-bottom-left will-change-transform"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {w < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
