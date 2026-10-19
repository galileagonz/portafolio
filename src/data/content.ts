// Single source of truth for all site copy (Spanish)

export type AccentTone = "lila" | "violet" | "sun";

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
  heroPhrase: string;
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

export type Service = {
  // Stable slug used to preselect the service in the contact form
  id: string;
  title: string;
  description: string;
  includes: string[];
  tech: string[];
  tone: AccentTone;
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

export type ProjectStatus = "produccion" | "staging" | "academico";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  // Stable slug
  id: string;
  name: string;
  status: ProjectStatus;
  kind: string;
  // Keep under ~110 characters
  description: string;
  role?: string;
  challenge?: string;
  metrics?: [ProjectMetric] | [ProjectMetric, ProjectMetric];
  url?: string;
  linkLabel?: string;
  noLinkNote?: string;
  // src is a public/ path; missing files show a placeholder
  image: { src: string; alt: string };
};

// simple-icons available in the installed package; mapped in toolIcons.ts
export type ToolIconId =
  | "python"
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

export type CtaLink = {
  label: string;
  href: string;
};

export type Hero = {
  eyebrow: string;
  // Words inside profile.heroPhrase drawn with the yellow marker
  highlight: string;
  availability: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
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
  role: "Desarrolladora full stack y freelancer",
  heroPhrase: "Construyo la web completa: del servidor al último píxel.",
  bio: "Desarrolladora full stack apasionada por la tecnología, con experiencia en infraestructura, backend y frontend. Soy creativa, responsable y proactiva, y busco oportunidades para ampliar mis habilidades y conocimientos profesionales.",
};

export const contact: Contact = {
  email: "galileagonz40@gmail.com",
  github: "https://github.com/galileagonz",
  linkedin: "https://www.linkedin.com/in/alexandra-galilea-gonz%C3%A1lez-arias-b06584311",
  spotifyProfile: SPOTIFY_PROFILE_URL,
  cv: "/Alexandra_CV.pdf",
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
  homeLabel: "Alexandra Galilea González, ir al inicio",
  navLabel: "Principal",
  menuLabel: "Menú",
  menuOpen: "Abrir menú",
  menuClose: "Cerrar menú",
  headerCta: "Contacto",
  themeToDark: "Activar tema oscuro",
  themeToLight: "Activar tema claro",
  newTab: "(se abre en una pestaña nueva)",
  projectRole: "Mi rol",
  projectChallenge: "Reto técnico",
  projectMetrics: "Métricas",
  projectVisit: "Ver sitio",
  toolsLabel: "Herramientas que uso",
  projectStatus: {
    produccion: "En producción",
    staging: "En staging",
    academico: "Académico",
  },
  cvDownload: "Descargar CV (PDF)",
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
    "Portafolio de Alexandra Galilea González, desarrolladora full stack y freelancer: sitios web, APIs, despliegue y apps Android.",
  ogAlt: "Alexandra Galilea González, desarrolladora full stack y freelancer",
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
  intro: "¿Tienes un proyecto en mente o una vacante que encaje conmigo? Escríbeme y te respondo pronto.",
  copyEmail: "Copiar correo:",
  copied: "¡Copiado!",
  copyFailed: "No se pudo copiar. Usa el enlace de abajo.",
  mailtoLabel: "O ábrelo en tu app de correo",
  formTitle: "Envíame un mensaje",
  requiredNote: "Todos los campos son obligatorios.",
  fields: {
    name: "Nombre",
    email: "Correo",
    service: "Tipo de servicio",
    message: "Mensaje",
  },
  servicePlaceholder: "Elige una opción",
  serviceOther: "Otro o aún no lo sé",
  errors: {
    nameRequired: "Escribe tu nombre.",
    emailRequired: "Escribe tu correo.",
    emailInvalid: "Revisa el correo; debe verse como nombre@dominio.com.",
    serviceRequired: "Elige un tipo de servicio.",
    messageRequired: "Escribe tu mensaje.",
    messageShort: "Cuéntame un poco más (al menos 10 caracteres).",
  },
  fixErrors: "Revisa los campos marcados.",
  submit: "Enviar mensaje",
  sending: "Enviando tu mensaje…",
  success: "¡Gracias! Tu mensaje llegó. Te responderé muy pronto.",
  error: "No se pudo enviar el mensaje.",
  errorFallback: "Escríbeme directamente a",
};

// Draft copy for the about section; rewrite freely
export const about: About = {
  paragraphs: [
    "Me encanta ver cómo una idea se convierte en algo que la gente puede usar. Disfruto cada parte del camino: pensar la base de datos, darle forma a la interfaz y dejarlo todo funcionando en producción.",
    "Creo que la buena tecnología se siente sencilla, y trabajo para que cada proyecto se sienta así. Siempre estoy aprendiendo algo nuevo y me emociona colaborar con personas que quieren construir cosas útiles.",
  ],
  highlight: "la buena tecnología se siente sencilla",
  facts: ["UNAM · 9.º semestre", "Full stack en Varsa Studio"],
};

export const hero: Hero = {
  eyebrow: "Desarrolladora full stack · Freelancer",
  highlight: "la web completa",
  availability: "Disponible para proyectos freelance",
  primaryCta: { label: "Ver proyectos", href: "#proyectos" },
  secondaryCta: { label: "Hablemos", href: "#contacto" },
};

export const services: Service[] = [
  {
    id: "sitios-web",
    title: "Sitios web y landing pages a la medida",
    description: "Páginas rápidas, accesibles y con personalidad, pensadas para que tu proyecto destaque y convierta.",
    includes: [
      "Diseño adaptado a móvil, tablet y escritorio",
      "Animaciones e interacciones cuidadas",
      "Buenas prácticas de SEO y rendimiento",
      "Entrega lista para publicar",
    ],
    tech: ["Next.js", "React", "Tailwind CSS"],
    tone: "sun",
  },
  {
    id: "backend-apis",
    title: "Backend y APIs",
    description: "La lógica que mueve tu producto: datos bien organizados y servicios claros para conectar tus apps.",
    includes: [
      "Diseño de APIs y endpoints",
      "Modelado de bases de datos",
      "Autenticación y validación de datos",
      "Documentación para tu equipo",
    ],
    tech: ["FastAPI", "Node.js", "Express", "SQL"],
    tone: "lila",
  },
  {
    id: "produccion-hosting",
    title: "Puesta en producción y hosting",
    description: "Llevo tu proyecto del repositorio a internet, en un servidor estable y seguro.",
    includes: [
      "Configuración de servidores VPS",
      "Dominios, DNS y certificados SSL",
      "Contenedores con Docker",
      "CDN y protección con Cloudflare",
    ],
    tech: ["VPS", "Docker", "Cloudflare", "SSL", "DNS"],
    tone: "violet",
  },
  {
    id: "migracion",
    title: "Migración de sitios",
    description: "Cambio tu sitio de casa sin perder contenido, o lo modernizo con una arquitectura headless.",
    includes: [
      "Cambio de proveedor de hosting",
      "Migración de WordPress a headless",
      "Traslado de imágenes y archivos a CDN",
      "Verificación de que todo siga funcionando",
    ],
    tech: ["WordPress headless", "Next.js", "Cloudflare"],
    tone: "lila",
  },
  {
    id: "apps-android",
    title: "Apps móviles Android",
    description: "Aplicaciones nativas con interfaces modernas que se conectan a tus servicios.",
    includes: [
      "Interfaces con Jetpack Compose",
      "Conexión con APIs",
      "Navegación y manejo de estado",
    ],
    tech: ["Kotlin", "Jetpack Compose"],
    tone: "violet",
  },
];

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
      "Documento procesos técnicos en Markdown para que el equipo avance más rápido.",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "varsa",
    name: "Varsa Studio",
    status: "produccion",
    kind: "Empresa donde trabajo",
    description:
      "Agencia digital donde trabajo como desarrolladora full stack: web, apps, automatización y SEO.",
    // TODO: role and challenge pending from Alexandra
    metrics: [{ value: "~4.6k", label: "visitas/mes" }],
    url: "https://varsastudio.com",
    image: { src: "/projects/varsa.webp", alt: "Página de inicio de Varsa Studio" },
  },
  {
    id: "lucid-locations",
    name: "Lucid Locations",
    status: "produccion",
    kind: "Cliente de Varsa Studio",
    description:
      "Sitio inmobiliario que migré de HostGator a DigitalOcean y convertí en WordPress headless con Next.js.",
    role: "Migración de infraestructura y frontend en Next.js, en un equipo de 3 personas.",
    challenge:
      "Migrar WordPress (tema Houzez), mover las imágenes a un CDN (DO Spaces) y consumir la API REST de WordPress desde Next.js.",
    metrics: [{ value: "~5.9k", label: "visitas/mes" }],
    url: "https://lucidlocations.com",
    image: { src: "/projects/lucid-locations.webp", alt: "Página de inicio de Lucid Locations" },
  },
  {
    id: "local-things",
    name: "Local Things",
    status: "staging",
    kind: "Proyecto interno de Varsa Studio",
    description: "Plataforma de eventos y comunidad local, con frontend y API separados.",
    role: "Desarrollo full stack y despliegue.",
    challenge:
      "Evalué modelos de OCR y visión para extraer datos de eventos desde flyers con un límite de 4 GB de RAM.",
    url: "https://develop.localthings.io",
    linkLabel: "Ver staging",
    image: { src: "/projects/local-things.webp", alt: "Vista de la plataforma Local Things" },
  },
  {
    id: "android-apps",
    name: "Apps Android",
    status: "academico",
    kind: "Proyecto universitario",
    // TODO: add the course name and role
    description: "Apps desarrolladas para una materia de la universidad.",
    image: { src: "/projects/android-apps.webp", alt: "Capturas de las apps Android" },
  },
];

// Tools for the Projects carousel; items without icons are not shown
export const tools: ToolGroup[] = [
  {
    category: "Lenguajes",
    items: [
      { name: "Python", icons: ["python"] },
      { name: "Java" },
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
      { name: "Visual Studio Code" },
      { name: "Android Studio", icons: ["androidstudio"] },
    ],
  },
];
