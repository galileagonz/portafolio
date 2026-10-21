import { readFileSync } from "node:fs";
import path from "node:path";
import { siCoolify } from "simple-icons";
import type { ToolIconId } from "@/data/content";

// Full-color devicon "original" file, or a simple-icons fallback in brand color
type IconSource = { devicon: string } | { simple: { path: string; hex: string } };

const sources: Record<ToolIconId, IconSource> = {
  python: { devicon: "python/python-original.svg" },
  java: { devicon: "java/java-original.svg" },
  typescript: { devicon: "typescript/typescript-original.svg" },
  kotlin: { devicon: "kotlin/kotlin-original.svg" },
  php: { devicon: "php/php-original.svg" },
  html5: { devicon: "html5/html5-original.svg" },
  css: { devicon: "css3/css3-original.svg" },
  react: { devicon: "react/react-original.svg" },
  nextdotjs: { devicon: "nextjs/nextjs-original.svg" },
  tailwindcss: { devicon: "tailwindcss/tailwindcss-original.svg" },
  fastapi: { devicon: "fastapi/fastapi-original.svg" },
  nodedotjs: { devicon: "nodejs/nodejs-original.svg" },
  express: { devicon: "express/express-original.svg" },
  jetpackcompose: { devicon: "jetpackcompose/jetpackcompose-original.svg" },
  git: { devicon: "git/git-original.svg" },
  docker: { devicon: "docker/docker-original.svg" },
  // Not in devicon; single-color logo in its official purple
  coolify: { simple: siCoolify },
  digitalocean: { devicon: "digitalocean/digitalocean-original.svg" },
  cloudflare: { devicon: "cloudflare/cloudflare-original.svg" },
  wordpress: { devicon: "wordpress/wordpress-original.svg" },
  mysql: { devicon: "mysql/mysql-original.svg" },
  postman: { devicon: "postman/postman-original.svg" },
  vscode: { devicon: "vscode/vscode-original.svg" },
  androidstudio: { devicon: "androidstudio/androidstudio-original.svg" },
};

// Logos with black or very dark parts get a light tile in dark mode
export const plateInDark: ReadonlySet<ToolIconId> = new Set<ToolIconId>([
  "nextdotjs",
  "express",
  "coolify",
  "wordpress",
  "androidstudio",
  "jetpackcompose",
  "mysql",
]);

const deviconDir = path.join(process.cwd(), "node_modules", "devicon", "icons");

// Prefixes ids and their references so repeated logos don't clash
function prefixIds(svg: string, prefix: string) {
  return svg
    .replace(/id="([^"]+)"/g, `id="${prefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`);
}

// Reads a logo at build time as a decorative SVG string
export function toolIconSvg(id: ToolIconId, prefix: string) {
  const source = sources[id];
  const svg =
    "devicon" in source
      ? readFileSync(path.join(deviconDir, source.devicon), "utf8")
      : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${source.simple.hex}"><path d="${source.simple.path}"/></svg>`;
  return prefixIds(svg, `${prefix}-${id}`).replace("<svg ", '<svg aria-hidden="true" focusable="false" ');
}
