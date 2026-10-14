import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { hero, profile } from "@/data/content";

// Wraps the first match of the keyword in an animated marker
function HighlightedPhrase({ text, highlight }: { text: string; highlight: string }) {
  const start = text.indexOf(highlight);
  if (!highlight || start === -1) return text;

  return (
    <>
      {text.slice(0, start)}
      <mark className="marker-draw">{highlight}</mark>
      {text.slice(start + highlight.length)}
    </>
  );
}

// Quiet availability note with a yellow dot
function AvailabilityBadge({ text }: { text: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-label text-ink-muted">
      <span aria-hidden="true" className="size-2 rounded-full bg-sun" />
      {text}
    </p>
  );
}

// Landing hero: eyebrow, name, pitch, availability and two CTAs
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="inicio-title" tabIndex={-1} className="flex min-h-svh flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 pt-24 pb-16 text-center sm:px-8 md:items-start md:text-left">
        <ScrollReveal>
          <p className="font-mono text-label uppercase text-accent">{hero.eyebrow}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 id="inicio-title" className="mt-6">
            <span className="block font-display text-name font-extrabold">{profile.firstName}</span>
            <span className="mt-2 block font-display text-title font-bold text-ink-muted">{profile.lastNames}</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-8 max-w-2xl">
          <p className="text-lead">
            <HighlightedPhrase text={profile.heroPhrase} highlight={hero.highlight} />
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="mt-8">
          <AvailabilityBadge text={hero.availability} />
        </ScrollReveal>

        <ScrollReveal delay={0.4} className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
          <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
          <ButtonLink href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </ButtonLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
