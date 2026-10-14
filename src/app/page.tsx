import { About } from "@/components/sections/about/About";
import { Cv } from "@/components/sections/cv/Cv";
import { Hero } from "@/components/sections/hero/Hero";
import { Projects } from "@/components/sections/projects/Projects";
import { Section } from "@/components/ui/Section";
import { sections } from "@/data/content";

const contactMeta = sections.find((s) => s.id === "contacto")!;

// Temporary skeleton: Contacto is still a placeholder
export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Cv />
      <About />
      <Section
        id={contactMeta.id}
        eyebrow={contactMeta.label}
        title={contactMeta.title!}
        tone="soft"
        className="min-h-[70vh]"
      />
    </>
  );
}
