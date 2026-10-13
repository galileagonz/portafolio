import { MagneticButton } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/motion/Marquee";
import { RevealText } from "@/components/motion/RevealText";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { Blob, Circle, Sparkle, Squiggle, Star } from "@/components/ui/Shapes";

const swatches = [
  { name: "Lila", token: "lila", hex: "#B79CFF", className: "bg-lila" },
  { name: "Violeta", token: "violet", hex: "#8E6AFF", className: "bg-violet" },
  { name: "Cielo", token: "sky", hex: "#8EDBFF", className: "bg-sky" },
  { name: "Hoja", token: "leaf", hex: "#86E3A3", className: "bg-leaf" },
  { name: "Sol", token: "sun", hex: "#FFD84D", className: "bg-sun" },
];

// Temporary design system preview until real sections exist
export default function Home() {
  return (
    <main>
      <header className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-8 md:pt-36">
        <Blob className="absolute -top-16 -right-20 w-64 animate-float text-lila sm:w-96" variant={0} />
        <Star className="absolute top-24 left-4 w-14 animate-spin-slow text-sun sm:w-20" outlined />
        <Sparkle className="absolute right-[12%] bottom-10 w-12 animate-float text-sky [animation-delay:-2s]" outlined />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 font-mono text-label font-bold uppercase text-accent">{"// sistema de diseño"}</p>
          <RevealText
            as="h1"
            trigger="mount"
            text="Hola, mundo creativo"
            className="font-display text-mega font-extrabold"
          />
          <Squiggle className="mt-4 w-48 text-violet sm:w-72" />
          <p className="mt-8 max-w-2xl text-lead text-ink-muted">
            Vista previa temporal de tokens, tipografía y componentes animados. Se reemplaza al crear las secciones.
          </p>
          <div className="mt-10 flex flex-wrap gap-5">
            <MagneticButton tone="sun" href="#paleta">
              Ver paleta
            </MagneticButton>
            <MagneticButton tone="surface" href="#componentes">
              Componentes
            </MagneticButton>
          </div>
        </div>
      </header>

      <Marquee items={["Full stack", "Freelance", "Diseño + código", "Ideas con chispa"]} tilt={-2} />

      <Section id="paleta" eyebrow="paleta" title="Colores con actitud">
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {swatches.map((s, i) => (
            <li key={s.token}>
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

      <Section id="tipografia" eyebrow="tipografía" title="Letras gigantes" tone="sun">
        <ScrollReveal className="space-y-6">
          <p className="font-display text-title font-extrabold">Syne para títulos expresivos</p>
          <p className="max-w-2xl text-lead">DM Sans para el texto: legible, amable y con buen ritmo en pantallas pequeñas.</p>
          <p className="font-mono text-label font-bold uppercase">Space Mono para etiquetas y detalles</p>
        </ScrollReveal>
      </Section>

      <Section id="componentes" eyebrow="componentes" title="Piezas que se mueven" tone="surface">
        <div className="grid gap-8 md:grid-cols-2">
          <ScrollReveal direction="left">
            <article className="relative rounded-[2rem] border-3 border-line bg-lila p-8 text-on-accent shadow-hard-lg">
              <Circle className="absolute -top-5 -right-5 size-14 text-sun" outlined />
              <h3 className="font-display text-title font-extrabold">Tarjeta sticker</h3>
              <p className="mt-3">Borde grueso, sombra dura desplazada y bloque de color plano.</p>
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

      <Marquee items={["Disponible para proyectos", "Hablemos"]} tone="violet" direction="right" />
    </main>
  );
}
