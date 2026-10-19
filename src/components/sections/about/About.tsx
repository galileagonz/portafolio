import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { Section } from "@/components/ui/Section";
import { about, profile, sections } from "@/data/content";

const meta = sections.find((s) => s.id === "sobre-mi")!;

// Quick facts under the sticky title, each with a violet dot
function QuickFacts() {
  return (
    <ul className="space-y-3 border-t border-line pt-6 font-mono text-label">
      {about.facts.map((fact) => (
        <li key={fact} className="flex items-center gap-3">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-violet" />
          {fact}
        </li>
      ))}
    </ul>
  );
}

// About: sticky title and facts left, bio and intro right
export function About() {
  return (
    <Section id={meta.id} title={meta.title!} aside={<QuickFacts />}>
      <ScrollReveal amount={0.2} className="max-w-2xl space-y-6">
        <p className="text-lead">{profile.bio}</p>
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-ink-muted">
            <HighlightedText text={paragraph} highlight={about.highlight} />
          </p>
        ))}
      </ScrollReveal>
    </Section>
  );
}
