"use client";

import { useEffect } from "react";
import { useMotionValue } from "motion/react";
import { useMediaQuery } from "./useMediaQuery";

const FAR_AWAY = -9999;

// Mouse position as motion values, only on hover-capable fine pointers
export function usePointer(enabled = true) {
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const active = enabled && canHover;
  // Client coordinates in px
  const x = useMotionValue(FAR_AWAY);
  const y = useMotionValue(FAR_AWAY);
  // Normalized -1..1 from the viewport center
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  useEffect(() => {
    if (!active) return;
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      nx.set((event.clientX / window.innerWidth) * 2 - 1);
      ny.set((event.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      x.set(FAR_AWAY);
      y.set(FAR_AWAY);
      nx.set(0);
      ny.set(0);
    };
  }, [active, x, y, nx, ny]);

  return { active, x, y, nx, ny };
}

export type Pointer = ReturnType<typeof usePointer>;
