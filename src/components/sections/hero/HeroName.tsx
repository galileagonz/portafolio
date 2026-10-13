"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { reducedFade, springPop } from "@/components/motion/transitions";
import { usePointer, type Pointer } from "@/hooks/usePointer";

// Cursor distance (px) where letters stop reacting
const REACH = 280;

type NameLetterProps = {
  char: string;
  index: number;
  variants: Variants;
  pointer: Pointer;
};

// One letter: intro pose, cursor reaction and touch wave layers
function NameLetter({ char, index, variants, pointer }: NameLetterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const proximity = useMotionValue(0);
  const smooth = useSpring(proximity, { stiffness: 220, damping: 18 });
  const y = useTransform(smooth, (v) => `${-v * 0.14}em`);
  const rotate = useTransform(smooth, (v) => v * (index % 2 ? 9 : -9));
  const scale = useTransform(smooth, [0, 1], [1, 1.1]);

  const { active, x: pointerX, y: pointerY } = pointer;

  // Recomputes closeness to the cursor whenever it moves
  useEffect(() => {
    if (!active) return;
    function update() {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const distance = Math.hypot(pointerX.get() - (r.left + r.width / 2), pointerY.get() - (r.top + r.height / 2));
      proximity.set(Math.max(0, 1 - distance / REACH));
    }
    const offX = pointerX.on("change", update);
    const offY = pointerY.on("change", update);
    return () => {
      offX();
      offY();
      proximity.set(0);
    };
  }, [active, pointerX, pointerY, proximity]);

  return (
    <motion.span custom={index} variants={variants} className="inline-block origin-bottom">
      <motion.span ref={ref} style={{ y, rotate, scale }} className="inline-block">
        <span
          className="relative inline-block touch:animate-letter-wave"
          style={{ animationDelay: `${1.4 + index * 0.12}s` }}
        >
          {char}
          {/* Accent copy fades in near the cursor */}
          <motion.span className="absolute inset-0 text-accent" style={{ opacity: smooth }}>
            {char}
          </motion.span>
        </span>
      </motion.span>
    </motion.span>
  );
}

// Giant first name with letter intro plus smaller last names
export function HeroName({ first, last }: { first: string; last: string }) {
  const reduce = useReducedMotion();
  const pointer = usePointer(!reduce);

  const container: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.15, staggerChildren: reduce ? 0 : 0.06 } },
  };

  // Letters tumble in from below, alternating tilt
  const letter: Variants = {
    hidden: (i: number) => ({ opacity: 0, y: "80%", rotate: i % 2 ? 20 : -20, scale: 0.4 }),
    visible: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: reduce ? reducedFade : springPop },
  };

  const lastLine: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: reduce ? reducedFade : springPop },
  };

  return (
    <motion.span aria-hidden="true" className="block" variants={container} initial="hidden" animate="visible">
      <span className="block font-display text-name font-extrabold whitespace-nowrap">
        {Array.from(first).map((char, i) => (
          <NameLetter key={i} char={char} index={i} variants={letter} pointer={pointer} />
        ))}
      </span>
      <motion.span variants={lastLine} className="mt-2 block font-display text-title font-extrabold text-accent">
        {last}
      </motion.span>
    </motion.span>
  );
}
