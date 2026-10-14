import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile, ui } from "@/data/content";

// Static export: the year is fixed at build time
const year = new Date().getFullYear();

// Simple footer with credits, socials and a back-to-top link
export function Footer() {
  return (
    <footer className="border-t border-line bg-bg px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-label text-ink-muted">
          © {year} {profile.name} · {ui.footerMadeWith}
        </p>
        <SocialLinks />
        {/* Targets <main> so focus moves to the top too */}
        <a
          href="#contenido"
          className="inline-flex items-center gap-2 self-start font-medium text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-current md:self-auto"
        >
          {ui.backToTop}
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
