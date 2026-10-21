import { PausableMarquee } from "@/components/motion/PausableMarquee";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { tools, ui, type Tool, type ToolIconId } from "@/data/content";
import { toolIcon } from "./toolIcons";

// Heading id that also names the logo list
const TITLE_ID = "tecnologias-title";

// Only tools with an icon appear in the carousel
const items = tools.flatMap((group) => group.items).filter((tool): tool is Tool & { icons: ToolIconId[] } => Boolean(tool.icons));

// Full-color logo; dark parts follow --logo-ink through currentColor
function Logo({ id, copy }: { id: ToolIconId; copy: number }) {
  const { svg, className, style } = toolIcon(id, `tool${copy}`);
  return (
    <span
      className={`block size-8 shrink-0 [&>svg]:size-full ${className}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// One copy of the logo row; the second copy is hidden from screen readers
function LogoRow({ copy }: { copy: number }) {
  const duplicate = copy > 0;
  return (
    <ul
      aria-labelledby={duplicate ? undefined : TITLE_ID}
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

// Titled, endless full-color logo carousel; pauses on hover, static with reduced motion
export function ToolsCarousel() {
  return (
    // Pulls up into Section's content gap: 32px mobile, 40px desktop
    <ScrollReveal amount={0.2} className="-mt-4 md:-mt-6">
      <h3 id={TITLE_ID} className="mb-8 font-display text-lead font-bold">
        {ui.toolsTitle}
      </h3>
      <PausableMarquee>
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none">
          <LogoRow copy={0} />
          <LogoRow copy={1} />
        </div>
      </PausableMarquee>
    </ScrollReveal>
  );
}
