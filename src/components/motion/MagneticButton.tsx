"use client";

import Link from "next/link";
import type { MouseEvent, PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ui } from "@/data/content";

const MotionLink = motion.create(Link);

type Tone = "sun" | "lila" | "violet" | "surface";

// Lila and yellow carry dark text, violet white; surface follows the theme
const tones: Record<Tone, string> = {
  sun: "bg-sun text-on-accent",
  lila: "bg-lila text-on-accent",
  violet: "bg-violet text-on-violet",
  surface: "bg-surface text-ink",
};

const sizes = {
  md: "min-h-12 px-7 py-3 text-lg shadow-hard hover:shadow-hard-lg active:translate-x-1.5 active:translate-y-1.5",
  sm: "min-h-11 px-5 py-2 text-base shadow-hard-sm hover:shadow-hard active:translate-x-[3px] active:translate-y-[3px]",
};

type MagneticButtonProps = {
  children: ReactNode;
  // Internal paths use next/link so basePath is applied
  href: string;
  tone?: Tone;
  size?: keyof typeof sizes;
  external?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  strength?: number;
  className?: string;
};

// Chunky link button that drifts toward the mouse pointer
export function MagneticButton({
  children,
  href,
  tone = "sun",
  size = "md",
  external = false,
  onClick,
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

  const classes = `inline-flex items-center justify-center gap-2 rounded-full border-3 border-ink font-display font-bold transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-none ${sizes[size]} ${tones[tone]} ${className}`;

  const shared = {
    className: classes,
    style: { x, y },
    onClick,
    onPointerMove: handleMove,
    onPointerLeave: reset,
  };

  const label = (
    <motion.span className="inline-flex items-center gap-2" style={{ x: labelX, y: labelY }}>
      {children}
    </motion.span>
  );

  if (href.startsWith("/") && !external) {
    return (
      <MotionLink href={href} {...shared}>
        {label}
      </MotionLink>
    );
  }

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
