import { Hero } from "@/components/sections/hero/Hero";
import { Projects } from "@/components/sections/projects/Projects";
import { Section } from "@/components/ui/Section";
import { sections } from "@/data/content";

// Sections still pending, in nav order
const placeholders = sections.filter((s) => s.id !== "inicio" && s.id !== "proyectos");

// Soft tone alternates to separate sections without borders
const tones = ["surface", "default", "soft"] as const;

// Temporary skeleton: real sections replace these placeholders
export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      {placeholders.map((s, i) => (
        <Section key={s.id} id={s.id} eyebrow={s.label} title={s.title!} tone={tones[i]} className="min-h-[70vh]" />
      ))}
    </>
  );
}
