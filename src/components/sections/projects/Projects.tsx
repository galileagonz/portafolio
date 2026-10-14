import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { projects, sections } from "@/data/content";
import { ProjectRow } from "./ProjectRow";

const meta = sections.find((s) => s.id === "proyectos")!;

// Numbered, expandable list of every project in content.ts
export function Projects() {
  return (
    <Section id={meta.id} eyebrow={meta.label} title={meta.title!}>
      <ul className="border-t border-line">
        {projects.map((project, i) => (
          <li key={project.title} className="border-b border-line">
            <ScrollReveal delay={i * 0.08} amount={0.2}>
              <ProjectRow project={project} index={i} />
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
