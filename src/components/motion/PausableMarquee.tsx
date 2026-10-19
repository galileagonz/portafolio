import type { ReactNode } from "react";

// Faded-edge frame; children pause on hover via group-hover
export function PausableMarquee({ children }: { children: ReactNode }) {
  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] motion-reduce:[mask-image:none]">
      {children}
    </div>
  );
}
