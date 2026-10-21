"use client";

import { useEffect, useRef, type MouseEvent, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { reducedFade } from "@/components/motion/transitions";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Blob, Sparkle, Star } from "@/components/ui/Shapes";
import { SlideText } from "@/components/ui/SlideText";
import { contact, sections, ui, type SectionId } from "@/data/content";
import { sectionHref } from "@/lib/paths";
import { hasSection, scrollToSection } from "@/lib/scroll";
import { Monogram } from "./Monogram";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  active: SectionId;
  returnFocusTo: RefObject<HTMLButtonElement | null>;
};

const ease: [number, number, number, number] = [0.7, 0, 0.3, 1];

// Full-screen modal menu with giant staggered links
export function MobileMenu({ open, onClose, active, returnFocusTo }: MobileMenuProps) {
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  // Section to scroll to once the exit animation ends
  const pendingTarget = useRef<string | null>(null);

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
    const mq = window.matchMedia("(min-width: 64rem)");
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

  // Closes first, then scrolls; off the home page it navigates normally
  function handleNavigate(event: MouseEvent<HTMLAnchorElement>) {
    const id = event.currentTarget.hash.slice(1);
    if (!hasSection(id)) return;
    event.preventDefault();
    pendingTarget.current = id;
    onClose();
  }

  // Circle wipe from the menu button; reduced motion only fades
  const panel = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: reducedFade }
    : {
        initial: { clipPath: "circle(0% at 92% 2.5rem)" },
        animate: { clipPath: "circle(150% at 92% 2.5rem)" },
        exit: { clipPath: "circle(0% at 92% 2.5rem)" },
        transition: { duration: 0.6, ease },
      };

  const list: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: reduce ? 0 : 0.25, staggerChildren: reduce ? 0 : 0.07 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: "90%", rotate: 4 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: reduce ? reducedFade : { duration: 0.6, ease } },
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
            className="relative flex min-h-dvh flex-col overflow-hidden bg-bg px-3 pt-3 pb-10 sm:px-6 sm:pt-4"
          >
            <Blob className="absolute -right-24 -bottom-24 w-80 animate-float text-violet" variant={1} />
            <Star className="absolute bottom-40 left-[-1.5rem] w-20 animate-spin-slow text-sun" outlined />
            <Sparkle className="absolute top-28 right-8 w-10 animate-float text-lila [animation-delay:-3s]" outlined />

            <div className="relative flex items-center justify-between gap-4 rounded-full border-3 border-ink bg-surface p-1.5 shadow-hard">
              <Monogram onClick={handleNavigate} />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  ref={closeButton}
                  type="button"
                  onClick={onClose}
                  className="group inline-flex size-11 items-center justify-center rounded-full border-3 border-ink bg-lila text-on-accent shadow-hard-sm transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                >
                  <span className="sr-only">{ui.menuClose}</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    className="size-5 transition-transform duration-300 group-hover:rotate-90"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <path d="M5 5l14 14M19 5L5 19" />
                  </svg>
                </button>
              </div>
            </div>

            <nav aria-label={ui.navLabel} className="relative mt-10 flex-1">
              <motion.ul variants={list} initial="hidden" animate="visible">
                {sections.map((section) => {
                  const isActive = active === section.id;
                  return (
                    <li key={section.id}>
                      <motion.a
                        variants={item}
                        href={sectionHref(section.id)}
                        onClick={handleNavigate}
                        aria-current={isActive ? "location" : undefined}
                        className="group flex items-baseline gap-3 rounded-2xl py-1 font-display text-menu font-extrabold"
                      >
                        <SlideText text={section.label} />
                        {isActive && <Star className="size-6 shrink-0 self-center text-sun" points={5} outlined />}
                      </motion.a>
                    </li>
                  );
                })}
              </motion.ul>
            </nav>

            <a
              href={`mailto:${contact.email}`}
              className="relative mt-8 self-start rounded-full border-3 border-ink bg-surface px-4 py-2 font-mono text-label font-bold break-all shadow-hard-sm"
            >
              {contact.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
}
