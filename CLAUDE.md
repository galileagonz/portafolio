@AGENTS.md

# Portfolio

Personal portfolio built with Next.js (App Router), TypeScript and Tailwind CSS,
deployed as a static site to GitHub Pages.

## Commands

- `pnpm dev`: dev server at http://localhost:3000/portafolio/
- `pnpm build`: static export to `out/` (must pass before committing)
- `pnpm lint`: run ESLint

## Project rules

- Use pnpm only.
- Static export (`output: "export"`): no API routes, middleware, server actions
  or other server-only features.
- `basePath` is `/portafolio`. Assets in `public/` must load under that prefix;
  verify them on the deployed site.
- Keep the `turbopack.rules` block in `next.config.ts`; removing it breaks Tailwind.

## Commits

- Conventional Commits in English: `type: description` (space after the colon).
- Types: `feat`, `fix`, `chore`, `ci`, `docs`, `style`, `refactor`.
- Small, focused commits.

## Accessibility

Apply these by default whenever writing or editing components:

- Meaningful `alt` on every `<img>` (`alt=""` if purely decorative).
- Use semantic elements (`<button>`, `<nav>`, `<header>`, `<main>`, `<footer>`,
  `<article>`) instead of generic `<div>`s. No `<div onClick>`.
- One `<h1>` per page; headings in order, never skipped for visual size.
- Everything interactive works with Tab/Enter/Space and has a visible focus
  style (never `outline: none` without a replacement).
- Contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text. Never rely on color alone.
- Every form input has a `<label>`; errors linked with `aria-describedby`.
- Prefer native HTML over ARIA. Keep `jsx-a11y` ESLint rules enabled and fix warnings.
- Respect `prefers-reduced-motion`.
- If something can't be made accessible cleanly, say so and flag the tradeoff.
