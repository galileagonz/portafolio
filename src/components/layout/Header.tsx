"use client";

import { useCallback, useRef, useState } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SlideText } from "@/components/ui/SlideText";
import { sections, ui } from "@/data/content";
import { useActiveSection } from "@/hooks/useActiveSection";
import { sectionHref } from "@/lib/paths";
import { handleSectionLink } from "@/lib/scroll";
import { Monogram } from "./Monogram";
import { MobileMenu } from "./MobileMenu";

const sectionIds = sections.map((s) => s.id);
// Contacto is covered by the header CTA button on desktop
const navLinks = sections.filter((s) => s.id !== "contacto");

// Fixed sticker header with desktop links and mobile menu trigger
export function Header() {
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <ScrollProgress />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border-3 border-ink bg-surface p-1.5 shadow-hard">
        <Monogram />

        <nav aria-label={ui.navLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={sectionHref(link.id)}
                    onClick={handleSectionLink}
                    aria-current={isActive ? "location" : undefined}
                    className={`group inline-flex rounded-full border-2 px-4 py-2 font-display font-bold transition-colors duration-200 ${
                      isActive ? "border-ink bg-sun text-on-accent" : "border-transparent hover:border-ink"
                    }`}
                  >
                    <SlideText text={link.label} copyClassName={isActive ? "text-on-accent" : "text-accent"} />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* next/link adds basePath; handleSectionLink keeps in-page scroll + focus */}
          <MagneticButton
            href="/#contacto"
            onClick={handleSectionLink}
            tone="lila"
            size="sm"
            className="hidden lg:inline-flex"
          >
            {ui.headerCta}
          </MagneticButton>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="group inline-flex size-11 items-center justify-center rounded-full border-3 border-ink bg-lila text-on-accent shadow-hard-sm transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-[3px] active:translate-y-[3px] active:shadow-none lg:hidden"
          >
            <span className="sr-only">{ui.menuOpen}</span>
            <span aria-hidden="true" className="flex w-5 flex-col items-end gap-1.5">
              <span className="h-[3px] w-full rounded-full bg-current" />
              <span className="h-[3px] w-3/5 rounded-full bg-current transition-[width] duration-200 group-hover:w-full" />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        active={active}
        returnFocusTo={menuButton}
      />
    </header>
  );
}
