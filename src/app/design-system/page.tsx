import type { Metadata } from "next";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";

// Temporary dev page: labels and hex values document tokens, not site copy
export const metadata: Metadata = {
  title: "Sistema de diseño",
  robots: { index: false, follow: false },
};

const themed = [
  { name: "Fondo", token: "bg", light: "#FBF9FF", dark: "#110C20", className: "bg-bg" },
  { name: "Superficie", token: "surface", light: "#FFFFFF", dark: "#1B1432", className: "bg-surface" },
  { name: "Texto", token: "ink", light: "#1E1433", dark: "#F4F0FF", className: "bg-ink" },
  { name: "Texto suave", token: "ink-muted", light: "#5B4B7A", dark: "#B8A9D9", className: "bg-ink-muted" },
  { name: "Borde", token: "line", light: "#E3D9FF", dark: "#33275C", className: "bg-line" },
  { name: "Lila suave", token: "lila-soft", light: "#EDE6FF", dark: "#2A2050", className: "bg-lila-soft" },
  { name: "Violeta profundo", token: "accent", light: "#4C2A9E", dark: "#B79CFF", className: "bg-accent" },
];

const accents = [
  { name: "Lila", token: "lila", hex: "#B79CFF", className: "bg-lila text-on-accent" },
  { name: "Violeta", token: "violet", hex: "#7C4DFF", className: "bg-violet text-on-violet" },
  { name: "Amarillo", token: "sun", hex: "#FFD84D", className: "bg-sun text-on-accent" },
];

const typeScale = [
  { token: "text-name", className: "font-display text-name font-extrabold", sample: "Alexandra" },
  { token: "text-display", className: "font-display text-display font-bold", sample: "Lo que he construido" },
  { token: "text-menu", className: "font-display text-menu font-bold", sample: "Proyectos" },
  { token: "text-title", className: "font-display text-title font-bold", sample: "Título de tarjeta" },
  { token: "text-lead", className: "text-lead text-ink-muted", sample: "Construyo la web completa: del servidor al último píxel." },
  { token: "text-body", className: "text-body", sample: "Texto de cuerpo en DM Sans para párrafos largos." },
  { token: "text-label", className: "font-mono text-label uppercase text-accent", sample: "// etiqueta" },
];

// Swatch card with token name and value
function Swatch({ name, token, value, className }: { name: string; token: string; value: string; className: string }) {
  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className={`h-24 border-b border-line ${className}`} />
      <div className="p-4">
        <p className="font-display font-bold">{name}</p>
        <p className="font-mono text-label text-ink-muted">{token}</p>
        <p className="font-mono text-label text-ink-muted">{value}</p>
      </div>
    </li>
  );
}

// Living reference of tokens, type and base components
export default function DesignSystemPage() {
  return (
    <>
      <Section id="tokens" eyebrow="Paleta" title="Colores por tema" className="pt-32">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {themed.map((c) => (
            <Swatch key={c.token} name={c.name} token={c.token} value={`${c.light} / ${c.dark}`} className={c.className} />
          ))}
        </ul>

        <h3 className="mt-16 font-display text-title font-bold">Acentos</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {accents.map((c) => (
            <li key={c.token} className={`flex h-36 flex-col justify-end rounded-2xl p-5 ${c.className}`}>
              <p className="font-display text-lg font-bold">{c.name}</p>
              <p className="font-mono text-label">
                {c.token} · {c.hex}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="tipografia" eyebrow="Tipografía" title="Syne, DM Sans y Space Mono" tone="surface">
        <ul className="space-y-8">
          {typeScale.map((t) => (
            <li key={t.token} className="border-b border-line pb-8">
              <p className="mb-2 font-mono text-label text-ink-muted">{t.token}</p>
              <p className={t.className}>{t.sample}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="componentes" eyebrow="Componentes" title="Botones, enlaces y tarjetas">
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="#componentes">Botón primario</ButtonLink>
          <ButtonLink href="#componentes" variant="secondary">
            Botón secundario
          </ButtonLink>
          <ButtonLink href="#componentes" size="sm">
            Pequeño
          </ButtonLink>
          <a
            href="#componentes"
            className="font-medium text-accent underline decoration-1 underline-offset-4 transition-colors duration-200 hover:decoration-2"
          >
            Enlace de texto
          </a>
        </div>

        <p className="mt-10 max-w-2xl text-lead">
          El amarillo funciona como <mark className="marker">marcador</mark>, siempre con texto oscuro encima.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {["Tarjeta en superficie", "Tarjeta en lila suave"].map((title, i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <article className={`rounded-2xl border border-line p-8 ${i ? "bg-lila-soft" : "bg-surface"}`}>
                <p className="font-mono text-label uppercase text-accent">{"// proyecto"}</p>
                <h3 className="mt-3 font-display text-title font-bold">{title}</h3>
                <p className="mt-3 text-ink-muted">Borde de 1px, esquinas suaves y sin sombras.</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16">
          <ButtonLink href="/" variant="secondary">
            Volver al inicio
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
