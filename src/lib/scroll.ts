import type { MouseEvent } from "react";

// Scrolls to a section, updates the hash and moves focus there
export function scrollToSection(id: string, smooth: boolean) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  history.pushState(null, "", `#${id}`);
  target.focus({ preventScroll: true });
}

// True when the section exists on the current page
export function hasSection(id: string) {
  return document.getElementById(id) !== null;
}

// In-page jump for section links; other pages navigate normally
export function handleSectionLink(event: MouseEvent<HTMLAnchorElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const id = event.currentTarget.hash.slice(1);
  if (!hasSection(id)) return;
  event.preventDefault();
  scrollToSection(id, !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
