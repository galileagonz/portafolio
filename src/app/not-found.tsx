import type { Metadata } from "next";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { notFound } from "@/data/content";

export const metadata: Metadata = {
  title: notFound.metaTitle,
  robots: { index: false, follow: true },
};

// 404 page: exported as 404.html, which GitHub Pages serves
export default function NotFound() {
  return (
    <section aria-labelledby="no-encontrada-title" className="flex min-h-svh items-center px-4 pt-24 pb-16 sm:px-8">
      <ScrollReveal className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-label uppercase text-accent">
          {"// "}
          {notFound.eyebrow}
        </p>
        <h1 id="no-encontrada-title" className="mt-4 max-w-3xl font-display text-display font-bold">
          {notFound.title}
        </h1>
        <p className="mt-6 max-w-xl text-lead text-ink-muted">{notFound.text}</p>
        <ButtonLink href="/" className="mt-10">
          {notFound.cta}
        </ButtonLink>
      </ScrollReveal>
    </section>
  );
}
