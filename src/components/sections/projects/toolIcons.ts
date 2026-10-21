import { readFileSync } from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import { siCoolify, siFastapi } from "simple-icons";
import type { ToolIconId } from "@/data/content";

// How a logo's dark parts are colored: untouched, --logo-ink, or brand in light / ink in dark
type Tone = "brand" | "ink" | { brandLight: string };

type Spec = { svg: () => string; tone: Tone };

const deviconDir = path.join(process.cwd(), "node_modules", "devicon", "icons");

// Reads one devicon SVG at build time
function devicon(file: string) {
  return readFileSync(path.join(deviconDir, file), "utf8");
}

// Swaps the given fills for currentColor; `root` also fills unfilled shapes
function toCurrentColor(svg: string, fills: string[], root = false) {
  let out = svg;
  for (const fill of fills) out = out.replace(new RegExp(`fill="${fill}"`, "gi"), 'fill="currentColor"');
  return root ? out.replace("<svg ", '<svg fill="currentColor" ') : out;
}

// First fill color in a single-color SVG, used as its brand color
function firstFill(svg: string) {
  return svg.match(/fill="(#[0-9a-f]{3,6})"/i)?.[1] ?? "currentColor";
}

// Next.js "N" only: no black circle, fading tail in the current color
function nextjsMark() {
  return devicon("nextjs/nextjs-original.svg")
    .replace(/<circle[^>]*\/>/, "")
    .replace(/stop-color="#fff"/g, 'stop-color="currentColor"')
    .replace('viewBox="0 0 128 128"', 'viewBox="24 24 80 80"');
}

// Official FastAPI mark (slanted bolt from simple-icons): teal circle, white bolt
function fastapiMark() {
  // Bolt subpath starts at the first "m", relative to the circle start
  const bolt = `M12 .0387${siFastapi.path.slice(siFastapi.path.indexOf("m"))}z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><circle cx="12" cy="12" r="12" fill="#${siFastapi.hex}"/><path fill="#fff" d="${bolt}"/></svg>`;
}

const mysqlSvg = () => devicon("mysql/mysql-original.svg");

const specs: Record<ToolIconId, Spec> = {
  python: { svg: () => devicon("python/python-original.svg"), tone: "brand" },
  java: { svg: () => devicon("java/java-original.svg"), tone: "brand" },
  typescript: { svg: () => devicon("typescript/typescript-original.svg"), tone: "brand" },
  kotlin: { svg: () => devicon("kotlin/kotlin-original.svg"), tone: "brand" },
  php: { svg: () => devicon("php/php-original.svg"), tone: "brand" },
  html5: { svg: () => devicon("html5/html5-original.svg"), tone: "brand" },
  css: { svg: () => devicon("css3/css3-original.svg"), tone: "brand" },
  react: { svg: () => devicon("react/react-original.svg"), tone: "brand" },
  nextdotjs: { svg: nextjsMark, tone: "ink" },
  tailwindcss: { svg: () => devicon("tailwindcss/tailwindcss-original.svg"), tone: "brand" },
  fastapi: { svg: fastapiMark, tone: "brand" },
  nodedotjs: { svg: () => devicon("nodejs/nodejs-original.svg"), tone: "brand" },
  // Black wordmark: drawn entirely in --logo-ink
  express: { svg: () => toCurrentColor(devicon("express/express-original.svg"), [], true), tone: "ink" },
  // Dark navy only in interior details; still readable in both themes
  jetpackcompose: { svg: () => devicon("jetpackcompose/jetpackcompose-original.svg"), tone: "brand" },
  git: { svg: () => devicon("git/git-original.svg"), tone: "brand" },
  docker: { svg: () => devicon("docker/docker-original.svg"), tone: "brand" },
  // Not in devicon; official purple in light mode, --logo-ink in dark mode
  coolify: {
    svg: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="${siCoolify.path}"/></svg>`,
    tone: { brandLight: `#${siCoolify.hex}` },
  },
  digitalocean: { svg: () => devicon("digitalocean/digitalocean-original.svg"), tone: "brand" },
  cloudflare: { svg: () => devicon("cloudflare/cloudflare-original.svg"), tone: "brand" },
  // Gray "W" mark (plain variant, no tiny wordmark) in --logo-ink
  wordpress: { svg: () => toCurrentColor(devicon("wordpress/wordpress-plain.svg"), ["#494949"]), tone: "ink" },
  // Dark blue dolphin: brand blue in light mode, --logo-ink in dark mode
  mysql: {
    svg: () => toCurrentColor(mysqlSvg(), [firstFill(mysqlSvg())]),
    tone: { brandLight: firstFill(mysqlSvg()) },
  },
  postman: { svg: () => devicon("postman/postman-original.svg"), tone: "brand" },
  vscode: { svg: () => devicon("vscode/vscode-original.svg"), tone: "brand" },
  // Navy outline is an interior detail; readable in both themes
  androidstudio: { svg: () => devicon("androidstudio/androidstudio-original.svg"), tone: "brand" },
};

// Prefixes ids and their references so repeated logos don't clash
function prefixIds(svg: string, prefix: string) {
  return svg
    .replace(/id="([^"]+)"/g, `id="${prefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`);
}

// Build-time SVG markup plus the color classes for its wrapper
export function toolIcon(id: ToolIconId, prefix: string): { svg: string; className: string; style?: CSSProperties } {
  const { svg, tone } = specs[id];
  const markup = prefixIds(svg(), `${prefix}-${id}`).replace("<svg ", '<svg aria-hidden="true" focusable="false" ');

  if (tone === "brand") return { svg: markup, className: "" };
  if (tone === "ink") return { svg: markup, className: "text-logo-ink" };
  return {
    svg: markup,
    className: "text-(--logo-brand) dark:text-logo-ink",
    style: { "--logo-brand": tone.brandLight } as CSSProperties,
  };
}
