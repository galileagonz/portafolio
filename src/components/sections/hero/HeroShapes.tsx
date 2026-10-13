"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { Blob, Circle, Sparkle, Star } from "@/components/ui/Shapes";
import { usePointer } from "@/hooks/usePointer";

const spring = { stiffness: 60, damping: 18, mass: 0.6 };

type LayerProps = {
  nx: MotionValue<number>;
  ny: MotionValue<number>;
  // Higher depth moves further, so it feels closer
  depth: number;
  floatDelay?: number;
  className: string;
  children: ReactNode;
};

// Shape that drifts against the cursor, floats on touch
function ParallaxLayer({ nx, ny, depth, floatDelay = 0, className, children }: LayerProps) {
  const x = useSpring(useTransform(nx, (v) => v * depth * -32), spring);
  const y = useSpring(useTransform(ny, (v) => v * depth * -32), spring);

  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      <div className="touch:animate-float" style={{ animationDelay: `${floatDelay}s` }}>
        {children}
      </div>
    </motion.div>
  );
}

// Decorative brand shapes kept clear of the hero text
export function HeroShapes() {
  const reduce = useReducedMotion();
  const { nx, ny } = usePointer(!reduce);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <ParallaxLayer nx={nx} ny={ny} depth={0.6} className="-top-24 -right-24 w-60 sm:w-80 lg:-top-36 lg:w-96">
        <Blob className="w-full animate-spin-slow text-lila [animation-duration:40s]" variant={0} />
      </ParallaxLayer>
      <ParallaxLayer nx={nx} ny={ny} depth={1.4} floatDelay={-1.5} className="hidden top-[50%] right-[9%] w-24 lg:block xl:w-28">
        <Star className="w-full animate-spin-slow text-sun" points={8} outlined />
      </ParallaxLayer>
      <ParallaxLayer nx={nx} ny={ny} depth={0.8} floatDelay={-3} className="hidden right-[24%] bottom-[22%] w-36 lg:block">
        <Blob className="w-full text-violet" variant={2} outlined />
      </ParallaxLayer>
      <ParallaxLayer nx={nx} ny={ny} depth={1.9} floatDelay={-2} className="hidden top-[34%] right-[30%] w-12 lg:block">
        <Sparkle className="w-full text-sky" outlined />
      </ParallaxLayer>
      <ParallaxLayer nx={nx} ny={ny} depth={1.1} floatDelay={-4} className="right-5 bottom-36 w-10 sm:right-10 lg:right-[4%] lg:bottom-[30%] lg:w-14">
        <Circle className="w-full text-leaf" outlined />
      </ParallaxLayer>
    </div>
  );
}
