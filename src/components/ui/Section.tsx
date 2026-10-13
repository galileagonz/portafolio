import type { ReactNode } from "react";
import { RevealText } from "@/components/motion/RevealText";

type Tone = "default" | "surface" | "lila" | "violet" | "sky" | "leaf" | "sun";

// Accent tones force dark text, as required by the palette rules
const tones: Record<Tone, { block: string; eyebrow: string }> = {
  default: { block: "bg-bg text-ink", eyebrow: "text-accent" },
  surface: { block: "bg-surface text-ink", eyebrow: "text-accent" },
  lila: { block: "bg-lila text-on-accent", eyebrow: "text-on-accent" },
  violet: { block: "bg-violet text-on-accent", eyebrow: "text-on-accent" },
  sky: { block: "bg-sky text-on-accent", eyebrow: "text-on-accent" },
  leaf: { block: "bg-leaf text-on-accent", eyebrow: "text-on-accent" },
  sun: { block: "bg-sun text-on-accent", eyebrow: "text-on-accent" },
};

type SectionProps = {
  id: string;
  title: string;
  eyebrow?: string;
  tone?: Tone;
  children?: ReactNode;
  className?: string;
};

// Page section with anchor id and letter-reveal heading
export function Section({ id, title, eyebrow, tone = "default", children, className = "" }: SectionProps) {
  const titleId = `${id}-title`;
  const { block, eyebrow: eyebrowColor } = tones[tone];

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`relative scroll-mt-20 overflow-hidden px-4 py-20 sm:px-8 md:py-32 ${block} ${className}`}
    >
      <div className="relative mx-auto max-w-7xl">
        {eyebrow && (
          <p className={`mb-4 font-mono text-label font-bold uppercase ${eyebrowColor}`}>
            {"// "}
            {eyebrow}
          </p>
        )}
        <RevealText as="h2" id={titleId} text={title} className="font-display text-display font-extrabold" />
        {children && <div className="mt-10 md:mt-16">{children}</div>}
      </div>
    </section>
  );
}
