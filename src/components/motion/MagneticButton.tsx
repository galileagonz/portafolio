"use client";

import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ui } from "@/data/content";

const MotionLink = motion.create(Link);

type Tone = "sun" | "lila" | "violet" | "sky" | "leaf" | "surface";

// Accents always carry dark text; surface follows the theme
const tones: Record<Tone, string> = {
  sun: "bg-sun text-on-accent",
  lila: "bg-lila text-on-accent",
  violet: "bg-violet text-on-accent",
  sky: "bg-sky text-on-accent",
  leaf: "bg-leaf text-on-accent",
  surface: "bg-surface text-ink",
};

const sizes = {
  md: "min-h-12 px-7 py-3 text-lg shadow-hard hover:shadow-hard-lg active:translate-x-1.5 active:translate-y-1.5",
  sm: "min-h-11 px-5 py-2 text-base shadow-hard-sm hover:shadow-hard active:translate-x-[3px] active:translate-y-[3px]",
};

type MagneticButtonProps = {
  children: ReactNode;
  tone?: Tone;
  size?: keyof typeof sizes;
  // Internal paths use next/link so basePath is applied
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  strength?: number;
  className?: string;
};

// Chunky button that drifts toward the mouse pointer
export function MagneticButton({
  children,
  tone = "sun",
  size = "md",
  href,
  external = false,
  onClick,
  type = "button",
  strength = 0.35,
  className = "",
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const spring = { stiffness: 220, damping: 15, mass: 0.4 };
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);
  // Label moves a bit further for a parallax wobble
  const labelX = useTransform(x, (v) => v * 0.4);
  const labelY = useTransform(y, (v) => v * 0.4);

  // Pulls the button toward the pointer, mouse only
  function handleMove(event: PointerEvent<HTMLElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const classes = `inline-flex items-center justify-center gap-2 rounded-full border-3 border-line font-display font-bold transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-none ${sizes[size]} ${tones[tone]} ${className}`;

  const shared = {
    className: classes,
    style: { x, y },
    onPointerMove: handleMove,
    onPointerLeave: reset,
  };

  const label = (
    <motion.span className="inline-flex items-center gap-2" style={{ x: labelX, y: labelY }}>
      {children}
    </motion.span>
  );

  if (href && href.startsWith("/") && !external) {
    return (
      <MotionLink href={href} {...shared}>
        {label}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...shared}
      >
        {label}
        {external && <span className="sr-only"> {ui.newTab}</span>}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} {...shared}>
      {label}
    </motion.button>
  );
}
