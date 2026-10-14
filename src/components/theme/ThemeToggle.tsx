"use client";

import { useId, useLayoutEffect } from "react";
import { ui } from "@/data/content";
import {
  applyTheme,
  getActiveTheme,
  readStoredTheme,
  storeTheme,
} from "@/lib/theme";

const morph = "transition-[scale,translate,rotate,opacity] duration-400 ease-out [transform-box:fill-box] origin-center";

// Round button that flips and saves the light/dark theme
export function ThemeToggle({ className = "" }: { className?: string }) {
  const maskId = `moon-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;

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

  // Moon in light theme, sun in dark; morph driven by the dark: variant
  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:bg-lila-soft ${className}`}
    >
      <span className="sr-only dark:hidden">{ui.themeToDark}</span>
      <span className="sr-only hidden dark:inline">{ui.themeToLight}</span>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="size-5">
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          {/* Bite that carves the crescent; slides away for the sun */}
          <circle cx="17" cy="7" r="6" fill="black" className={`${morph} dark:translate-x-[10px] dark:-translate-y-[10px]`} />
        </mask>
        <g mask={`url(#${maskId})`}>
          <circle cx="12" cy="12" r="5" fill="currentColor" className={`${morph} scale-160 dark:scale-100`} />
        </g>
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`${morph} scale-0 -rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100`}
        >
          <path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M4.6 19.4 6 18M18 6l1.4-1.4" />
        </g>
      </svg>
    </button>
  );
}
