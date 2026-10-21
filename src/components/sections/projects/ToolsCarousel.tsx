import { PausableMarquee } from "@/components/motion/PausableMarquee";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { tools, ui, type Tool, type ToolIconId } from "@/data/content";
import { plateInDark, toolIconSvg } from "./toolIcons";

// Only tools with an icon appear in the carousel
const items = tools.flatMap((group) => group.items).filter((tool): tool is Tool & { icons: ToolIconId[] } => Boolean(tool.icons));

// Full-color logo; dark ones sit on a light tile in dark mode without changing layout
function Logo({ id, copy }: { id: ToolIconId; copy: number }) {
  const plate = plateInDark.has(id) ? "dark:-m-1 dark:bg-logo-plate dark:p-1" : "";
  return (
    <span className={`inline-flex shrink-0 rounded-lg ${plate}`}>
      <span className="block size-8 [&>svg]:size-full" dangerouslySetInnerHTML={{ __html: toolIconSvg(id, `tool${copy}`) }} />
    </span>
  );
}

// One copy of the logo row; the second copy is hidden from screen readers
function LogoRow({ copy }: { copy: number }) {
  const duplicate = copy > 0;
  return (
    <ul
      aria-label={duplicate ? undefined : ui.toolsLabel}
      aria-hidden={duplicate || undefined}
      className={`flex shrink-0 items-center gap-16 pr-16 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-8 motion-reduce:pr-0 ${duplicate ? "motion-reduce:hidden" : ""}`}
    >
      {items.map((tool) => (
        <li key={tool.name}>
          {/* Each tool is one named image, even with two logos (HTML/CSS) */}
          <span
            role={duplicate ? undefined : "img"}
            aria-label={duplicate ? undefined : tool.name}
            className="flex items-center gap-16"
          >
            {tool.icons.map((id) => (
              <Logo key={id} id={id} copy={copy} />
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}

// Endless full-color logo carousel; pauses on hover, static with reduced motion
export function ToolsCarousel() {
  return (
    <ScrollReveal amount={0.2}>
      <PausableMarquee>
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none">
          <LogoRow copy={0} />
          <LogoRow copy={1} />
        </div>
      </PausableMarquee>
    </ScrollReveal>
  );
}
