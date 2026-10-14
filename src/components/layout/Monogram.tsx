import type { MouseEvent } from "react";
import { ui } from "@/data/content";

// "AG" badge linking home
export function Monogram({ onClick }: { onClick?: (event: MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <a href="#inicio" onClick={onClick} className="inline-flex shrink-0 rounded-full">
      <span className="sr-only">{ui.homeLabel}</span>
      <span
        aria-hidden="true"
        className="flex size-10 items-center justify-center rounded-full bg-violet font-display font-bold tracking-tight text-on-violet"
      >
        {ui.monogram}
      </span>
    </a>
  );
}
