"use client";

import { useLayoutEffect } from "react";
import {
  applyTheme,
  getActiveTheme,
  readStoredTheme,
  storeTheme,
} from "@/lib/theme";

// Sticker button that flips and saves the light/dark theme
export function ThemeToggle({ className = "" }: { className?: string }) {
  // Re-applies saved theme after dev Strict Mode resets <html>
  useLayoutEffect(() => {
    const stored = readStoredTheme();
    if (stored) applyTheme(stored);
  }, []);

  function toggle() {
    const next = getActiveTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    storeTheme(next);
  }

  // Icon and label swap via CSS, so server and client markup match
  return (
    <button
      type="button"
      onClick={toggle}
      className={`group inline-flex size-12 items-center justify-center rounded-full border-3 border-line bg-sun text-on-accent shadow-hard-sm transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${className}`}
    >
      <span className="sr-only dark:hidden">Activar tema oscuro</span>
      <span className="sr-only hidden dark:inline">Activar tema claro</span>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        className="size-6 transition-transform duration-500 group-hover:-rotate-20 dark:hidden"
        fill="currentColor"
      >
        <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
      </svg>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        className="hidden size-6 transition-transform duration-700 group-hover:rotate-90 dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        <path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
      </svg>
    </button>
  );
}
