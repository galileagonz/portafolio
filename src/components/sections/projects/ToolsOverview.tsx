import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { tools, type Tool } from "@/data/content";
import { toolIcons } from "./toolIcons";

// Icon(s) plus visible name; brands without an icon become a text pill
function ToolItem({ tool }: { tool: Tool }) {
  if (!tool.icons) {
    return <li className="rounded-full border border-line px-3 py-1">{tool.name}</li>;
  }

  return (
    <li className="inline-flex items-center gap-2 py-1">
      <span className="inline-flex gap-1 text-ink-muted">
        {tool.icons.map((id) => (
          <svg key={id} aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
            <path d={toolIcons[id].path} />
          </svg>
        ))}
      </span>
      {tool.name}
    </li>
  );
}

// Static grouped tool list shown above the project cards
export function ToolsOverview() {
  return (
    <div className="space-y-8">
      {tools.map((group, i) => (
        <ScrollReveal key={group.category} delay={i * 0.08} amount={0.2}>
          <div className="grid gap-3 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8">
            <h3 className="pt-1.5 font-mono text-label uppercase text-accent">{group.category}</h3>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {group.items.map((tool) => (
                <ToolItem key={tool.name} tool={tool} />
              ))}
            </ul>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
