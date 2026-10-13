"use client";

import { Fragment, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { Star } from "@/components/ui/Shapes";

type Tone = "sun" | "lila" | "violet" | "sky" | "leaf" | "ink";

const tones: Record<Tone, string> = {
  sun: "bg-sun text-on-accent",
  lila: "bg-lila text-on-accent",
  violet: "bg-violet text-on-accent",
  sky: "bg-sky text-on-accent",
  leaf: "bg-leaf text-on-accent",
  ink: "bg-ink text-bg",
};

type MarqueeProps = {
  items: string[];
  tone?: Tone;
  // Seconds for one full loop
  duration?: number;
  direction?: "left" | "right";
  // Tilts the band for extra energy
  tilt?: number;
  // Copies per half-track, so short lists still fill wide screens
  repeat?: number;
  className?: string;
};

// Infinite text band with pause control and reduced-motion fallback
export function Marquee({
  items,
  tone = "sun",
  duration = 24,
  direction = "left",
  tilt = 0,
  repeat = 3,
  className = "",
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  // Progress through one copy, 0 to 50 percent of the track
  const progress = useMotionValue(0);
  const x = useTransform(progress, (v) => `${-v}%`);

  // Advances the band each frame and wraps seamlessly
  useAnimationFrame((_, delta) => {
    if (reduce || paused || hovered) return;
    const step = (50 / (duration * 1000)) * delta;
    const next = progress.get() + (direction === "left" ? step : -step);
    progress.set(((next % 50) + 50) % 50);
  });

  const sequence = Array.from({ length: repeat }, () => items).flat();

  const copy = (
    <span className="flex shrink-0 items-center">
      {sequence.map((item, i) => (
        <Fragment key={i}>
          <span className="px-4 font-display text-title font-extrabold uppercase whitespace-nowrap sm:px-6">
            {item}
          </span>
          <Star className="size-7 shrink-0 animate-spin-slow sm:size-9" points={5} />
        </Fragment>
      ))}
    </span>
  );

  return (
    <div
      className={`relative overflow-hidden border-y-3 border-line py-3 sm:py-4 ${tones[tone]} ${className}`}
      style={tilt ? { rotate: `${tilt}deg` } : undefined}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <p className="sr-only">{items.join(" · ")}</p>
      <motion.div aria-hidden="true" className="flex w-max" style={{ x }}>
        {copy}
        {copy}
      </motion.div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-on-accent bg-surface text-ink motion-reduce:hidden"
      >
        <span className="sr-only">Pausar marquesina</span>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="size-4" fill="currentColor">
          {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />}
        </svg>
      </button>
    </div>
  );
}
