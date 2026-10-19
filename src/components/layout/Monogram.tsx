"use client";

import type { MouseEvent } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { reducedFade } from "@/components/motion/transitions";
import { ui } from "@/data/content";
import { Sparkle } from "@/components/ui/Shapes";
import { sectionHref } from "@/lib/paths";
import { handleSectionLink } from "@/lib/scroll";

// Toe centers in a 64x64 box, tilted outward
const toes = [
  { cx: 13, cy: 30, rotate: -24 },
  { cx: 25, cy: 18, rotate: -8 },
  { cx: 39, cy: 18, rotate: 8 },
  { cx: 51, cy: 30, rotate: 24 },
];

// Rounded heart-shaped main pad
const PAD = "M32 33c-9 0-17 9-17 17 0 6 5 9 10 8 3-.6 5-2 7-2s4 1.4 7 2c5 1 10-2 10-8 0-8-8-17-17-17z";

// Scale and wave from each shape's own center
const shapeOrigin = "[transform-box:fill-box] origin-center";

// Paw badge linking to the page top; toes pop in, then wave on hover
export function Monogram({ onClick = handleSectionLink }: { onClick?: (event: MouseEvent<HTMLAnchorElement>) => void }) {
  const reduce = useReducedMotion();
  const pop = { type: "spring" as const, stiffness: 420, damping: 14 };

  // Index-based stagger: toes 0-3, then the pad last
  const shape: Variants = {
    hidden: { scale: 0 },
    visible: (i: number) => ({ scale: 1, y: 0, transition: reduce ? reducedFade : { ...pop, delay: i * 0.08 } }),
    hover: (i: number) => ({
      y: [0, -2, 0],
      transition: reduce ? { duration: 0 } : { duration: 0.4, delay: i * 0.08, repeat: Infinity, repeatDelay: 0.4 },
    }),
  };

  const link: Variants = {
    hidden: { scale: 1 },
    visible: { scale: 1 },
    press: { scale: 0.92, transition: reduce ? reducedFade : { duration: 0.1 } },
  };

  return (
    <motion.a
      href={sectionHref("contenido")}
      onClick={onClick}
      aria-label={ui.homeLabel}
      variants={link}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileFocus="hover"
      whileTap="press"
      className="group relative inline-flex shrink-0 rounded-full"
    >
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-full border-3 border-ink bg-lila transition-[rotate,scale] duration-300 ease-[cubic-bezier(.5,1.6,.4,1)] group-hover:-rotate-12 group-hover:scale-110"
      >
        <svg aria-hidden="true" focusable="false" viewBox="0 0 64 64" className="size-7">
          {/* Yellow paw; colors alternate with lila on hover, static lila with reduced motion */}
          <g className="fill-sun group-hover:animate-paw-colors group-focus-visible:animate-paw-colors motion-reduce:group-hover:animate-none motion-reduce:group-hover:fill-lila-light motion-reduce:group-focus-visible:animate-none motion-reduce:group-focus-visible:fill-lila-light">
            {toes.map((toe, i) => (
              <g key={toe.cx} transform={`rotate(${toe.rotate} ${toe.cx} ${toe.cy})`}>
                <motion.ellipse
                  cx={toe.cx}
                  cy={toe.cy}
                  rx="5.5"
                  ry="7.5"
                  custom={i}
                  variants={shape}
                  className={shapeOrigin}
                />
              </g>
            ))}
            <motion.path d={PAD} custom={toes.length} variants={shape} className={shapeOrigin} />
          </g>
        </svg>
      </span>
      <Sparkle className="absolute -top-1.5 -right-1.5 size-4 scale-0 text-sun transition-[scale,rotate] duration-300 group-hover:scale-100 group-hover:rotate-90" outlined />
    </motion.a>
  );
}
