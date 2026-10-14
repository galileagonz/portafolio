import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { hero, profile } from "@/data/content";

// Yellow pill announcing freelance availability
function AvailabilityBadge({ text }: { text: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-sun px-3 py-1 font-mono text-label uppercase text-on-accent">
      <span aria-hidden="true" className="size-2 rounded-full bg-on-accent" />
      {text}
    </p>
  );
}

// Landing hero: name, roles, short pitch and two CTAs
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="inicio-title" tabIndex={-1} className="flex min-h-svh flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pt-32 pb-20 sm:px-8">
        <ScrollReveal>
          <AvailabilityBadge text={hero.availability} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 id="inicio-title" className="mt-8">
            <span className="block font-display text-name font-extrabold">{profile.firstName}</span>
            <span className="mt-2 block font-display text-title font-bold text-accent">{profile.lastNames}</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-10 max-w-2xl space-y-4">
          <p className="font-mono text-label uppercase text-ink-muted">{hero.roles.join(" · ")}</p>
          <p className="text-lead text-ink-muted">{profile.heroPhrase}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
          <ButtonLink href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </ButtonLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
