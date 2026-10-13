import { MagneticButton } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/motion/Marquee";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { hero, profile, techStack } from "@/data/content";
import { HeroName } from "./HeroName";
import { HeroShapes } from "./HeroShapes";
import { RotatingRole } from "./RotatingRole";

// Pill badge with a pulsing availability dot
function AvailabilityBadge({ text }: { text: string }) {
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border-3 border-line bg-leaf px-4 py-1.5 font-mono text-label font-bold uppercase text-on-accent shadow-hard-sm">
      <span aria-hidden="true" className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-on-accent opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex size-2.5 rounded-full bg-on-accent" />
      </span>
      {text}
    </p>
  );
}

// Mouse-shaped link with a dropping dot, pointing to the next section
function ScrollHint() {
  return (
    <a
      href="#sobre-mi"
      className="group inline-flex flex-col items-center gap-2 rounded-2xl p-2 font-mono text-label font-bold uppercase"
    >
      <span aria-hidden="true" className="flex h-12 w-7 justify-center rounded-full border-3 border-line bg-surface pt-2 transition-[translate] group-hover:translate-y-1">
        <span className="size-1.5 animate-scroll-dot rounded-full bg-ink motion-reduce:animate-none" />
      </span>
      <span>
        {hero.scrollHint}
        <span className="sr-only"> {hero.scrollHintTarget}</span>
      </span>
    </a>
  );
}

// Landing hero: giant name, rotating role, CTAs and tech marquee
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-title"
      tabIndex={-1}
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <HeroShapes />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-28 pb-10 sm:px-8 md:pt-36">
        <ScrollReveal direction="pop">
          <AvailabilityBadge text={hero.availability} />
        </ScrollReveal>

        <h1 id="inicio-title" className="mt-6">
          <span className="sr-only">{profile.name}</span>
          <HeroName first={profile.firstName} last={profile.lastNames} />
        </h1>

        <ScrollReveal delay={0.9} className="mt-8 max-w-2xl space-y-6">
          <RotatingRole roles={hero.roles} />
          <p className="text-lead text-ink-muted">{profile.heroPhrase}</p>
        </ScrollReveal>

        <ScrollReveal delay={1.1} className="mt-10 flex flex-wrap gap-5">
          <MagneticButton tone="sun" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </MagneticButton>
          <MagneticButton tone="surface" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </MagneticButton>
        </ScrollReveal>
      </div>

      <div className="flex justify-center pb-6">
        <ScrollHint />
      </div>

      <Marquee items={techStack} tone="sun" tilt={-2} repeat={1} duration={70} className="-mx-[2%] mb-10 w-[104%]" />
    </section>
  );
}
