"use client";

import { useCallback, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { sections, ui } from "@/data/content";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Monogram } from "./Monogram";
import { MobileMenu } from "./MobileMenu";

const sectionIds = sections.map((s) => s.id);
const navLinks = sections.filter((s) => s.id !== "inicio");

// Fixed top bar with desktop links and mobile menu trigger
export function Header() {
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <Monogram />

        <div className="flex items-center gap-3 md:gap-8">
          <nav aria-label={ui.navLabel} className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    {/* Active: ink text plus thin yellow underline, not color alone */}
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={`font-medium underline decoration-2 underline-offset-8 transition-colors duration-200 ${
                        isActive
                          ? "text-ink decoration-sun"
                          : "text-ink-muted decoration-transparent hover:text-ink hover:decoration-current"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:bg-lila-soft md:hidden"
          >
            <span className="sr-only">{ui.menuOpen}</span>
            <span aria-hidden="true" className="flex w-4 flex-col gap-1.5">
              <span className="h-0.5 w-full rounded-full bg-current" />
              <span className="h-0.5 w-full rounded-full bg-current" />
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
