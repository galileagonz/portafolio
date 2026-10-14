import { Hero } from "@/components/sections/hero/Hero";
import { Section } from "@/components/ui/Section";
import { sections } from "@/data/content";

// Content sections in nav order, skipping the hero
const pageSections = sections.filter((s) => s.id !== "inicio");

// Soft tone alternates to separate sections without borders
const tones = ["default", "surface", "default", "soft"] as const;

// Temporary skeleton: real sections replace these placeholders
export default function Home() {
  return (
    <>
      <Hero />
      {pageSections.map((s, i) => (
        <Section key={s.id} id={s.id} eyebrow={s.label} title={s.title!} tone={tones[i]} className="min-h-[70vh]" />
      ))}
    </>
  );
}
