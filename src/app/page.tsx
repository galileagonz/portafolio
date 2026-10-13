import { MagneticButton } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/motion/Marquee";
import { RevealText } from "@/components/motion/RevealText";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { Blob, Circle, Sparkle, Squiggle, Star } from "@/components/ui/Shapes";
import { profile, sections, ui } from "@/data/content";

const swatches = [
  { name: "Lila", hex: "#B79CFF", className: "bg-lila" },
  { name: "Violeta", hex: "#8E6AFF", className: "bg-violet" },
  { name: "Cielo", hex: "#8EDBFF", className: "bg-sky" },
  { name: "Hoja", hex: "#86E3A3", className: "bg-leaf" },
  { name: "Sol", hex: "#FFD84D", className: "bg-sun" },
];

// Looks up a nav section's labels from content
const section = (id: (typeof sections)[number]["id"]) => sections.find((s) => s.id === id)!;

// Temporary skeleton: real sections replace these placeholders
export default function Home() {
  return (
    <>
      <section
        id="inicio"
        aria-labelledby="inicio-title"
        tabIndex={-1}
        className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-8 md:pt-44"
      >
        <Blob className="absolute -top-16 -right-20 w-64 animate-float text-lila sm:w-96" variant={0} />
        <Star className="absolute top-28 left-4 w-14 animate-spin-slow text-sun sm:w-20" outlined />
        <Sparkle className="absolute right-[12%] bottom-10 w-12 animate-float text-sky [animation-delay:-2s]" outlined />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 font-mono text-label font-bold uppercase text-accent">{`// ${profile.role}`}</p>
          <RevealText
            as="h1"
            id="inicio-title"
            trigger="mount"
            text={profile.heroPhrase}
            className="font-display text-display font-extrabold"
          />
          <Squiggle className="mt-4 w-48 text-violet sm:w-72" />
          <div className="mt-10 flex flex-wrap gap-5">
            <MagneticButton tone="sun" href="#contacto">
              {ui.headerCta}
            </MagneticButton>
          </div>
        </div>
      </section>

      <Marquee items={["Full stack", "Freelance", "Diseño + código", "Ideas con chispa"]} tilt={-2} />

      <Section id="sobre-mi" eyebrow={section("sobre-mi").label} title={section("sobre-mi").title!}>
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {swatches.map((s, i) => (
            <li key={s.name}>
              <ScrollReveal direction="pop" delay={i * 0.08}>
                <div
                  className={`flex aspect-square flex-col justify-end rounded-[2rem] border-3 border-line p-4 text-on-accent shadow-hard ${s.className}`}
                >
                  <p className="font-display text-xl font-extrabold">{s.name}</p>
                  <p className="font-mono text-label">{s.hex}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="servicios" eyebrow={section("servicios").label} title={section("servicios").title!} tone="sun" className="min-h-[80vh]" />

      <Section id="proyectos" eyebrow={section("proyectos").label} title={section("proyectos").title!} tone="surface">
        <div className="grid gap-8 md:grid-cols-2">
          <ScrollReveal direction="left">
            <article className="relative rounded-[2rem] border-3 border-line bg-lila p-8 text-on-accent shadow-hard-lg">
              <Circle className="absolute -top-5 -right-5 size-14 text-sun" outlined />
              <h3 className="font-display text-title font-extrabold">Tarjeta sticker</h3>
            </article>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.1}>
            <article className="relative rounded-[2rem] border-3 border-line bg-leaf p-8 text-on-accent shadow-hard-lg">
              <Star className="absolute -top-6 -left-6 size-16 animate-spin-slow text-sky" points={6} outlined />
              <h3 className="font-display text-title font-extrabold">Botones magnéticos</h3>
              <div className="mt-6 flex flex-wrap gap-4">
                <MagneticButton tone="violet">Violeta</MagneticButton>
                <MagneticButton tone="sky">Cielo</MagneticButton>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </Section>

      <Section id="cv" eyebrow={section("cv").label} title={section("cv").title!} className="min-h-[80vh]" />

      <Marquee items={["Disponible para proyectos", ui.headerCta]} tone="violet" direction="right" />

      <Section id="contacto" eyebrow={section("contacto").label} title={section("contacto").title!} tone="lila" className="min-h-[80vh]" />
    </>
  );
}
