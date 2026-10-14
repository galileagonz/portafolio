import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type Tone = "default" | "surface" | "soft";

// Flat background options; all keep the regular ink text
const tones: Record<Tone, string> = {
  default: "bg-bg",
  surface: "bg-surface border-y border-line",
  soft: "bg-lila-soft",
};

type SectionProps = {
  id: string;
  title: string;
  eyebrow?: string;
  tone?: Tone;
  children?: ReactNode;
  className?: string;
};

// Page section with anchor id, eyebrow and fading heading
export function Section({ id, title, eyebrow, tone = "default", children, className = "" }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      className={`scroll-mt-20 px-4 py-24 text-ink sm:px-8 md:py-36 ${tones[tone]} ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          {eyebrow && (
            <p className="mb-4 font-mono text-label uppercase text-accent">
              {"// "}
              {eyebrow}
            </p>
          )}
          <h2 id={titleId} className="max-w-3xl font-display text-display font-bold">
            {title}
          </h2>
        </ScrollReveal>
        {children && <div className="mt-12 md:mt-16">{children}</div>}
      </div>
    </section>
  );
}
