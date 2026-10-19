import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { Section } from "@/components/ui/Section";
import { about, profile, sections, services, ui } from "@/data/content";
import { withBasePath } from "@/lib/paths";
import { serviceQuoteHref } from "@/lib/services";

const meta = sections.find((s) => s.id === "sobre-mi")!;

// Lila frame: photo when set, monogram placeholder otherwise
function PhotoFrame() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-lila-soft lg:max-w-none">
      {about.photo ? (
        <Image
          src={withBasePath(about.photo)}
          alt={about.photoAlt}
          fill
          sizes="(min-width: 1024px) 40vw, 24rem"
          className="object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-display text-display font-bold text-accent"
        >
          {ui.monogram}
        </span>
      )}
    </div>
  );
}

// Service list; "Cotizar" preselects that service in Contacto
function Services() {
  return (
    <ScrollReveal amount={0.2} className="mt-24 md:mt-32">
      <h3 className="font-display text-title font-bold">{about.servicesTitle}</h3>
      <p className="mt-2 text-lead text-ink-muted">{about.servicesIntro}</p>
      <ul className="mt-10 border-t border-line">
        {services.map((service) => (
          <li
            key={service.id}
            className="grid gap-x-8 gap-y-2 border-b border-line py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
          >
            <div>
              <h4 className="font-display text-lead font-bold">{service.title}</h4>
              <p className="mt-1 text-ink-muted">{service.description}</p>
            </div>
            <Link
              href={serviceQuoteHref(service.id)}
              className="group inline-flex items-center gap-1.5 justify-self-start font-medium text-accent underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-current"
            >
              {ui.serviceQuote}
              <span className="sr-only">: {service.title}</span>
              <span aria-hidden="true" className="transition-[translate] duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </ScrollReveal>
  );
}

// About: photo, bio, warm intro, quick facts and services
export function About() {
  return (
    <Section id={meta.id} eyebrow={meta.label} title={meta.title!}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <ScrollReveal amount={0.2}>
          <PhotoFrame />
        </ScrollReveal>

        <ScrollReveal amount={0.2} delay={0.1} className="space-y-6">
          <p className="text-lead">{profile.bio}</p>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-ink-muted">
              <HighlightedText text={paragraph} highlight={about.highlight} />
            </p>
          ))}

          <ul className="space-y-2 border-t border-line pt-6 font-mono text-label">
            {about.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-3">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-violet" />
                {fact}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>

      <Services />
    </Section>
  );
}
