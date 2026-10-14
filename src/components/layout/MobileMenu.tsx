"use client";

import { useEffect, useRef, type MouseEvent, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { reducedFade } from "@/components/motion/transitions";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { contact, sections, ui, type SectionId } from "@/data/content";
import { scrollToSection } from "@/lib/scroll";
import { Monogram } from "./Monogram";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  active: SectionId;
  returnFocusTo: RefObject<HTMLButtonElement | null>;
};

// Same links as the desktop nav; the monogram covers "Inicio"
const navLinks = sections.filter((s) => s.id !== "inicio");

// Full-screen modal menu with large section links
export function MobileMenu({ open, onClose, active, returnFocusTo }: MobileMenuProps) {
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  // Section to scroll to once the exit animation ends
  const pendingTarget = useRef<SectionId | null>(null);

  // Opens the native modal (traps focus) and locks page scroll
  useEffect(() => {
    const d = dialog.current;
    if (!open || !d || d.open) return;
    d.showModal();
    document.documentElement.style.overflow = "hidden";
    closeButton.current?.focus();
  }, [open]);

  // Closes the menu if the viewport grows to desktop size
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 48rem)");
    const handle = () => mq.matches && onClose();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, [open, onClose]);

  // Unlocks scroll if the header unmounts while open
  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  // After exit: close dialog, then go to target or refocus trigger
  function finishClose() {
    const d = dialog.current;
    if (d?.open) d.close();
    document.documentElement.style.overflow = "";
    const target = pendingTarget.current;
    pendingTarget.current = null;
    if (target) scrollToSection(target, !reduce);
    else returnFocusTo.current?.focus();
  }

  // Reads the target from the link hash, then closes before scrolling
  function handleNavigate(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    pendingTarget.current = event.currentTarget.hash.slice(1) as SectionId;
    onClose();
  }

  // Plain fade in and out
  const panel = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: reduce ? reducedFade : { duration: 0.25, ease: "easeOut" as const },
  };

  return (
    <dialog
      ref={dialog}
      id="mobile-menu"
      aria-label={ui.menuLabel}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={() => open && onClose()}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-transparent p-0 text-ink backdrop:bg-transparent"
    >
      <AnimatePresence onExitComplete={finishClose}>
        {open && (
          <motion.div
            key="panel"
            {...panel}
            className="flex min-h-dvh flex-col bg-bg pb-10"
          >
            <div className="flex h-16 items-center justify-between gap-4 border-b border-line px-4 sm:px-8">
              <Monogram onClick={handleNavigate} />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  ref={closeButton}
                  type="button"
                  onClick={onClose}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:bg-lila-soft"
                >
                  <span className="sr-only">{ui.menuClose}</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    className="size-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M5 5l14 14M19 5L5 19" />
                  </svg>
                </button>
              </div>
            </div>

            <nav aria-label={ui.navLabel} className="mt-10 flex-1 px-4 sm:px-8">
              <ul className="space-y-2">
                {navLinks.map((section, i) => {
                  const isActive = active === section.id;
                  return (
                    <li key={section.id}>
                      {/* Active link keeps a thin yellow underline */}
                      <a
                        href={`#${section.id}`}
                        onClick={handleNavigate}
                        aria-current={isActive ? "location" : undefined}
                        className="flex items-baseline gap-4 py-1 font-display text-menu font-bold"
                      >
                        <span className="w-7 shrink-0 font-mono text-label text-ink-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`underline decoration-2 underline-offset-8 transition-colors duration-200 ${
                            isActive ? "decoration-sun" : "decoration-transparent hover:decoration-current"
                          }`}
                        >
                          {section.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <a
              href={`mailto:${contact.email}`}
              className="mx-4 mt-8 self-start font-mono text-label break-all text-ink-muted underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-current sm:mx-8"
            >
              {contact.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
