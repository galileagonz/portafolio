import { existsSync } from "node:fs";
import path from "node:path";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { projects, sections } from "@/data/content";
import { ProjectCard } from "./ProjectCard";
import { ToolsCarousel } from "./ToolsCarousel";

const meta = sections.find((s) => s.id === "proyectos")!;

// Only projects not marked published: false
const visibleProjects = projects.filter((project) => project.published !== false);

// Checks at build time whether a public/ image exists
function publicFileExists(src?: string) {
  return src ? existsSync(path.join(process.cwd(), "public", src)) : false;
}

// First section: tools carousel, then the project cards grid
export function Projects() {
  return (
    // Tighter top padding so content shows right below the fixed header
    <Section id={meta.id} title={meta.title!} className="pt-28 md:pt-32">
      <ToolsCarousel />
      <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, i) => (
          <li key={project.slug}>
            <ScrollReveal delay={(i % 3) * 0.08} amount={0.2} className="h-full">
              <ProjectCard project={project} hasImage={publicFileExists(project.image)} />
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
