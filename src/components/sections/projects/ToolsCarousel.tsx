import { PausableMarquee } from "@/components/motion/PausableMarquee";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { tools, ui, type ToolIconId } from "@/data/content";
import { inkLogos, toolIcons } from "./toolIcons";

// Only tools with an icon appear in the carousel
const items = tools.flatMap((group) => group.items).filter((tool) => tool.icons);
const logos = items.flatMap((tool) => tool.icons as ToolIconId[]);

// One copy of the logo row; reduced motion wraps it statically
function LogoRow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex shrink-0 items-center gap-16 pr-16 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-8 motion-reduce:pr-0 ${className}`}
    >
      {logos.map((id) => {
        const icon = toolIcons[id];
        const ink = inkLogos.has(id);
        // Brand hex comes from simple-icons data; dark logos switch to ink
        return (
          <svg
            key={id}
            focusable="false"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`size-8 shrink-0 ${ink ? "text-ink" : ""}`}
            style={ink ? undefined : { color: `#${icon.hex}` }}
          >
            <path d={icon.path} />
          </svg>
        );
      })}
    </div>
  );
}

// Endless logo carousel; names live in an sr-only list
export function ToolsCarousel() {
  return (
    <ScrollReveal amount={0.2}>
      <ul aria-label={ui.toolsLabel} className="sr-only">
        {items.map((tool) => (
          <li key={tool.name}>{tool.name}</li>
        ))}
      </ul>
      <PausableMarquee>
        {/* Pauses on hover; no animation with reduced motion */}
        <div
          aria-hidden="true"
          className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none"
        >
          <LogoRow />
          <LogoRow className="motion-reduce:hidden" />
        </div>
      </PausableMarquee>
    </ScrollReveal>
  );
}
