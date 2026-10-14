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
  // Extra content under the title; switches to a sticky two-column layout
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
};

// Page section with anchor id, eyebrow and fading heading
export function Section({ id, title, eyebrow, tone = "default", aside, children, className = "" }: SectionProps) {
  const titleId = `${id}-title`;

  const heading = (
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
      {aside && <div className="mt-8">{aside}</div>}
    </ScrollReveal>
  );

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      className={`scroll-mt-20 px-4 py-24 text-ink sm:px-8 md:py-36 ${tones[tone]} ${className}`}
    >
      {aside ? (
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Header stays pinned below the fixed nav while content scrolls */}
          <div className="lg:sticky lg:top-28 lg:self-start">{heading}</div>
          <div>{children}</div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl">
          {heading}
          {children && <div className="mt-12 md:mt-16">{children}</div>}
        </div>
      )}
    </section>
  );
}
