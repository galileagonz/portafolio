// Single source of truth for all site copy (Spanish)

export type SectionId = "proyectos" | "cv" | "sobre-mi" | "contacto";

export type NavSection = {
  id: SectionId;
  label: string;
  title?: string;
};

export type Profile = {
  firstName: string;
  lastNames: string;
  name: string;
  shortName: string;
  role: string;
  bio: string;
};

export type Contact = {
  email: string;
  github: string;
  linkedin: string;
  spotifyProfile: string;
  // Path inside public/; wrap with withBasePath() when linking
  cv: string;
};

export type About = {
  // Path inside public/ (e.g. "/foto.jpg"); empty shows the placeholder
  paragraphs: string[];
  // Phrase inside paragraphs drawn with the yellow marker
  highlight: string;
  facts: string[];
};

export type Experience = {
  company: string;
  role: string;
  // ISO year-month for <time dateTime>; null end means current
  start: string;
  end: string | null;
  periodLabel: string;
  highlights: string[];
};

export type ProjectMetric = {
  value: string;
  label: string;
  // Where the number comes from, shown in small muted text
  source: string;
};

export type ProjectLinks = {
  site?: { url: string; label: "Ver sitio" | "Ver demo" };
  // Empty or missing hides the "Código" button
  code?: string;
};

// Image fields go together (path inside public/); without them the card shows a placeholder
type ProjectImage = { image: string; imageAlt: string } | { image?: undefined; imageAlt?: undefined };

export type Project = ProjectImage & {
  // Stable slug
  slug: string;
  title: string;
  // 1–2 everyday sentences: what it is or how it helps, no tech names
  description: string;
  metric?: ProjectMetric;
  links: ProjectLinks;
  // false hides the project; defaults to shown
  published?: boolean;
};

// Logos available in devicon (or simple-icons fallback); mapped in toolIcons.ts
export type ToolIconId =
  | "python"
  | "java"
  | "vscode"
  | "typescript"
  | "kotlin"
  | "php"
  | "html5"
  | "css"
  | "react"
  | "nextdotjs"
  | "tailwindcss"
  | "fastapi"
  | "nodedotjs"
  | "express"
  | "jetpackcompose"
  | "git"
  | "docker"
  | "coolify"
  | "digitalocean"
  | "cloudflare"
  | "wordpress"
  | "mysql"
  | "postman"
  | "androidstudio";

export type Tool = {
  name: string;
  // No icons renders a text-only pill
  icons?: ToolIconId[];
};

export type ToolGroup = {
  category: string;
  items: Tool[];
};

// Only the share image (og.png) uses this now
export type Hero = {
  eyebrow: string;
};

// Fill with your Spotify profile URL; empty hides it
export const SPOTIFY_PROFILE_URL = "";

// Example Formspree endpoint; replace the ID with your real form
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/tu-id-de-formulario";

// Public origin of the GitHub Pages site, without basePath
export const SITE_ORIGIN = "https://galileagonz.github.io";

const firstName = "Alexandra";
const lastNames = "Galilea González Arias";

export const profile: Profile = {
  firstName,
  lastNames,
  name: `${firstName} ${lastNames}`,
  shortName: "Galilea",
  role: "Desarrolladora full stack",
  bio: "Desarrolladora full stack apasionada por la tecnología, con experiencia en infraestructura, backend y frontend. Soy creativa, responsable y proactiva, y busco oportunidades para ampliar mis habilidades y conocimientos profesionales.",
};

export const contact: Contact = {
  email: "galileagonz40@gmail.com",
  github: "https://github.com/galileagonz",
  linkedin: "https://www.linkedin.com/in/alexandra-galilea-gonz%C3%A1lez-arias-b06584311",
  spotifyProfile: SPOTIFY_PROFILE_URL,
  cv: "/CV.pdf",
};

export const sections: NavSection[] = [
  { id: "proyectos", label: "Proyectos", title: "Proyectos recientes" },
  { id: "cv", label: "CV", title: "Mi camino" },
  { id: "sobre-mi", label: "Sobre mí", title: "Detrás del código" },
  { id: "contacto", label: "Contacto", title: "Hablemos" },
];

// Interface strings: navigation, buttons and screen-reader labels
export const ui = {
  skipLink: "Saltar al contenido",
  monogram: "AG",
  homeLabel: "Alexandra González, ir al inicio",
  navLabel: "Principal",
  menuLabel: "Menú",
  menuOpen: "Abrir menú",
  menuClose: "Cerrar menú",
  headerCta: "Contacto",
  themeToDark: "Activar tema oscuro",
  themeToLight: "Activar tema claro",
  newTab: "(se abre en una pestaña nueva)",
  projectCode: "Código",
  toolsTitle: "Tecnologías utilizadas",  cvDownload: "Descargar CV (PDF)",
  cvExperience: "Experiencia",
  socialNav: "Redes y contacto",
  socialGithub: "GitHub de Alexandra",
  socialLinkedin: "LinkedIn de Alexandra",
  socialSpotify: "Spotify de Alexandra",
  socialEmail: "Escribir un correo a Alexandra",
  footerMadeWith: "Hecho con Next.js",
  backToTop: "Volver arriba",
};

// SEO and social sharing copy
export const site = {
  title: "Alexandra Galilea González · Desarrolladora full stack",
  description:
    "Portafolio de Alexandra Galilea González, desarrolladora full stack: sitios web, APIs, despliegue y apps Android.",
  ogAlt: "Alexandra Galilea González, desarrolladora full stack",
  locale: "es_MX",
};

// Copy for the 404 page
export const notFound = {
  metaTitle: "Página no encontrada",
  eyebrow: "Error 404",
  title: "Esta página no existe",
  text: "Puede que el enlace esté roto o que la página haya cambiado de lugar.",
  cta: "Volver al inicio",
};

// Copy for the contact section and form
export const contactSection = {
  intro: "Aquí te comparto mi contacto. Escríbeme cuando quieras y te respondo lo antes posible.",
  copyEmail: "Copiar correo:",
  copied: "¡Copiado!",
  copyFailed: "No se pudo copiar. Usa el enlace de abajo.",
  mailtoLabel: "O ábrelo en tu app de correo",
  formTitle: "Envíame un mensaje",
  requiredNote: "Los campos con * son obligatorios.",
  // Visual marker after required labels; inputs also carry `required`
  requiredMark: "*",
  fields: {
    name: "Nombre",
    email: "Correo",
    company: "Empresa (opcional)",
    message: "Mensaje",
  },
  // Fixed Formspree email subject (_subject)
  subject: "Mensaje desde mi portafolio",
  errors: {
    nameRequired: "Escribe tu nombre.",
    emailRequired: "Escribe tu correo.",
    emailInvalid: "Revisa el correo; debe verse como nombre@dominio.com.",
    messageRequired: "Escribe tu mensaje.",
    messageShort: "Cuéntame un poco más (al menos 10 caracteres).",
  },
  fixErrors: "Revisa los campos marcados.",
  submit: "Enviar mensaje",
  sending: "Enviando tu mensaje…",
  success: "¡Gracias por escribirme! Te respondo lo antes posible.",
  error: "No se pudo enviar el mensaje.",
  errorFallback: "Puedes escribirme directamente a mi correo:",
};

// Draft copy for the about section; rewrite freely
export const about: About = {
  paragraphs: [
    "Me encanta ver cómo una idea se convierte en algo que la gente puede usar. Disfruto cada parte del camino: pensar la arquitectura, conectar el backend con la interfaz y dejarlo todo funcionando en producción.",
    "Creo que la buena tecnología se siente sencilla, y trabajo para que cada proyecto se sienta así. Siempre estoy aprendiendo algo nuevo y me emociona colaborar con personas que quieren construir cosas útiles.",
  ],
  highlight: "la buena tecnología se siente sencilla",
  facts: ["UNAM · 9.º semestre", "Full stack en Varsa Studio"],
};

export const hero: Hero = {
  eyebrow: "Desarrolladora full stack",
};

export const experience: Experience[] = [
  {
    company: "Varsa Studio",
    role: "Desarrolladora Full Stack",
    start: "2026-05",
    end: null,
    periodLabel: "Mayo 2026 – actualidad",
    highlights: [
      "Construyo funcionalidades de frontend y backend, de la idea al despliegue.",
      "Pongo sitios y servicios en producción en servidores propios (VPS): dominios, SSL y DNS.",
      "Trabajo en equipo con Git y ramas, con entregas a plazos cortos y medianos.",
      "Documento procesos técnicos para que el equipo avance más rápido.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "varsa-studio",
    title: "Varsa Studio",
    description:
      "Agencia digital que ayuda a los negocios a destacar en línea con sitios web, apps, automatización, publicidad y SEO.",
    image: "/images/Varsa Studio.png",
    imageAlt: "Página de inicio del sitio de Varsa Studio",
    metric: { value: "4.6k", label: "visitas/mes", source: "según Cloudflare, últimos 30 días" },
    links: { site: { url: "https://varsastudio.com/", label: "Ver sitio" } },
  },
  {
    slug: "lucid-locations",
    title: "Lucid Locations",
    description:
      "Marketplace que conecta a dueños de propiedades con productoras y creadores de contenido que buscan locaciones únicas para grabaciones y eventos.",
    image: "/images/Lucid_Locations.png",
    imageAlt: "Página de inicio del sitio de Lucid Locations",
    metric: { value: "5.9k", label: "visitas/mes", source: "según Cloudflare, últimos 30 días" },
    links: { site: { url: "https://lucidlocations.com/", label: "Ver sitio" } },
  },
  {
    slug: "local-things",
    title: "Local Things",
    description:
      "Plataforma para descubrir qué hacer cerca de ti: reúne en un solo lugar los eventos de negocios y lugares populares de la zona.",
    image: "/images/Local Things.png",
    imageAlt: "Página de inicio de la plataforma Local Things",
    // Private repository, so no code link
    links: { site: { url: "https://develop.localthings.io/", label: "Ver demo" } },
  },
  {
    slug: "android-apps",
    title: "Apps Android",
    description:
      "Aplicaciones para celular Android desarrolladas en una materia de la universidad, con interfaces modernas.",
    image: "/images/Android_Studio.png",
    imageAlt: "Código de una de las apps Android abierto en Android Studio",
    // TODO: replace NOMBRE-DEL-REPO with the real repository name before deploying
    links: { code: "https://github.com/galileagonz/NOMBRE-DEL-REPO" },
    published: true,
  },
];

// Tools for the Projects carousel; items without icons are not shown
export const tools: ToolGroup[] = [
  {
    category: "Lenguajes",
    items: [
      { name: "Python", icons: ["python"] },
      { name: "Java", icons: ["java"] },
      { name: "TypeScript / JavaScript", icons: ["typescript"] },
      { name: "Kotlin", icons: ["kotlin"] },
      { name: "PHP", icons: ["php"] },
      { name: "HTML/CSS", icons: ["html5", "css"] },
      { name: "SQL" },
    ],
  },
  {
    category: "Frameworks y librerías",
    items: [
      { name: "React", icons: ["react"] },
      { name: "Next.js", icons: ["nextdotjs"] },
      { name: "Tailwind CSS", icons: ["tailwindcss"] },
      { name: "FastAPI", icons: ["fastapi"] },
      { name: "Node.js", icons: ["nodedotjs"] },
      { name: "Express", icons: ["express"] },
      { name: "Jetpack Compose", icons: ["jetpackcompose"] },
    ],
  },
  {
    category: "Herramientas y plataformas",
    items: [
      { name: "Git / GitHub", icons: ["git"] },
      { name: "Docker / Docker Compose", icons: ["docker"] },
      { name: "Coolify", icons: ["coolify"] },
      { name: "DigitalOcean", icons: ["digitalocean"] },
      { name: "Cloudflare", icons: ["cloudflare"] },
      { name: "WordPress (Headless)", icons: ["wordpress"] },
      { name: "MySQL Workbench", icons: ["mysql"] },
      { name: "Power BI" },
      { name: "Postman", icons: ["postman"] },
      { name: "Visual Studio Code", icons: ["vscode"] },
      { name: "Android Studio", icons: ["androidstudio"] },
    ],
  },
];
