import { Cv } from "@/components/sections/cv/Cv";
import { Hero } from "@/components/sections/hero/Hero";
import { Projects } from "@/components/sections/projects/Projects";
import { Section } from "@/components/ui/Section";
import { sections } from "@/data/content";

// Sections still pending, in nav order
const placeholders = sections.filter((s) => !["inicio", "proyectos", "cv"].includes(s.id));

// Soft tone alternates to separate sections without borders
const tones = ["default", "soft"] as const;

// Temporary skeleton: real sections replace these placeholders
export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Cv />
      {placeholders.map((s, i) => (
        <Section key={s.id} id={s.id} eyebrow={s.label} title={s.title!} tone={tones[i]} className="min-h-[70vh]" />
      ))}
    </>
  );
}
