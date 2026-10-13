"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { springPop } from "@/components/motion/transitions";
import { ui } from "@/data/content";

const tones = ["bg-lila", "bg-sky", "bg-leaf"];
const INTERVAL = 2600;

// Cycles through roles in a flipping sticker pill
export function RotatingRole({ roles }: { roles: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Advances the role on a timer unless paused or reduced
  useEffect(() => {
    if (reduce || paused || hovered) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [reduce, paused, hovered, roles.length]);

  return (
    <div className="flex items-center gap-3" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <p className="min-w-0 font-display text-title font-extrabold">
        <span className="sr-only">{roles.join(", ")}</span>
        {/* Static list replaces the rotation for reduced motion */}
        <span aria-hidden="true" className="hidden motion-reduce:inline">
          {roles.join(" · ")}
        </span>
        <span aria-hidden="true" className="inline-grid overflow-hidden pr-2 pb-2 motion-reduce:hidden">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={index}
              initial={{ y: "110%", rotate: 6, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: "-110%", rotate: -6, opacity: 0 }}
              transition={springPop}
              className={`col-start-1 row-start-1 inline-block rounded-2xl border-3 border-line px-4 py-1 text-on-accent shadow-hard-sm ${tones[index % tones.length]}`}
            >
              {roles[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </p>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-line bg-surface text-ink motion-reduce:hidden"
      >
        <span className="sr-only">{ui.rolesPause}</span>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="size-4" fill="currentColor">
          {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />}
        </svg>
      </button>
    </div>
  );
}
