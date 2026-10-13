// Scrolls to a section, updates the hash and moves focus there
export function scrollToSection(id: string, smooth: boolean) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  history.pushState(null, "", `#${id}`);
  target.focus({ preventScroll: true });
}
