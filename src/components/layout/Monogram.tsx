import type { MouseEvent } from "react";
import { ui } from "@/data/content";
import { Sparkle } from "@/components/ui/Shapes";
import { sectionHref } from "@/lib/paths";
import { handleSectionLink } from "@/lib/scroll";

// "AG" badge linking home; wobbles and sparkles on hover
export function Monogram({ onClick = handleSectionLink }: { onClick?: (event: MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <a href={sectionHref("inicio")} onClick={onClick} className="group relative inline-flex shrink-0 rounded-full">
      <span className="sr-only">{ui.homeLabel}</span>
      <span
        aria-hidden="true"
        className="flex size-11 items-center justify-center rounded-full border-3 border-ink bg-violet font-display text-lg font-extrabold tracking-tight text-on-violet transition-[rotate,scale] duration-300 ease-[cubic-bezier(.5,1.6,.4,1)] group-hover:-rotate-12 group-hover:scale-110"
      >
        {ui.monogram}
      </span>
      <Sparkle className="absolute -top-1.5 -right-1.5 size-4 scale-0 text-sun transition-[scale,rotate] duration-300 group-hover:scale-100 group-hover:rotate-90" outlined />
    </a>
  );
}
