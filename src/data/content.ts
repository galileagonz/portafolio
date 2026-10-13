// Single source of truth for all site copy (Spanish)

export type AccentTone = "lila" | "violet" | "sky" | "leaf" | "sun";

export type SectionId = "inicio" | "sobre-mi" | "servicios" | "proyectos" | "cv" | "contacto";

export type NavSection = {
  id: SectionId;
  label: string;
  title?: string;
};

export type Profile = {
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
  spotifyPlaylist: string;
  // Path inside public/; wrap with withBasePath() when linking
  cv: string;
};

export type Service = {
  title: string;
  description: string;
  includes: string[];
  tech: string[];
  tone: AccentTone;
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

export type Education = {
  institution: string;
  degree: string;
  start: string;
  end: string | null;
  periodLabel: string;
  detail: string;
};

export type ProjectLinks = {
  demo: string;
  repo: string;
};

export type Project = {
  title: string;
  summary: string;
  role: string;
  stack: string[];
  achievements: string[];
  links: ProjectLinks;
  tone: AccentTone;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  dateLabel: string;
};

export type Language = {
  name: string;
  spoken: string;
  written: string;
};

// Fill these with your Spotify URLs; empty hides them
export const SPOTIFY_PROFILE_URL = "";
export const SPOTIFY_PLAYLIST_URL = "";

export const profile: Profile = {
  name: "Alexandra Galilea González Arias",
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
  spotifyPlaylist: SPOTIFY_PLAYLIST_URL,
  cv: "/Alexandra_CV.pdf",
};

export const sections: NavSection[] = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí", title: "Detrás del código" },
  { id: "servicios", label: "Servicios", title: "Cómo puedo ayudarte" },
  { id: "proyectos", label: "Proyectos", title: "Lo que he construido" },
  { id: "cv", label: "CV", title: "Mi camino" },
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
  headerCta: "Hablemos",
  themeToDark: "Activar tema oscuro",
  themeToLight: "Activar tema claro",
  marqueePause: "Pausar marquesina",
  newTab: "(se abre en una pestaña nueva)",
};

export const services: Service[] = [
  {
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
    title: "Puesta en producción y hosting",
    description: "Llevo tu proyecto del repositorio a internet, en un servidor estable y seguro.",
    includes: [
      "Configuración de servidores VPS",
      "Dominios, DNS y certificados SSL",
      "Contenedores con Docker",
      "CDN y protección con Cloudflare",
    ],
    tech: ["VPS", "Docker", "Cloudflare", "SSL", "DNS"],
    tone: "sky",
  },
  {
    title: "Migración de sitios",
    description: "Cambio tu sitio de casa sin perder contenido, o lo modernizo con una arquitectura headless.",
    includes: [
      "Cambio de proveedor de hosting",
      "Migración de WordPress a headless",
      "Traslado de imágenes y archivos a CDN",
      "Verificación de que todo siga funcionando",
    ],
    tech: ["WordPress headless", "Next.js", "Cloudflare"],
    tone: "leaf",
  },
  {
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

export const education: Education[] = [
  {
    institution: "UNAM",
    degree: "Ingeniería en Computación",
    start: "2022",
    end: null,
    periodLabel: "2022 – actualidad",
    detail: "Cursando el 9.º semestre",
  },
];

export const projects: Project[] = [
  {
    title: "Local Things",
    summary: "Plataforma para descubrir eventos locales.",
    role: "Frontend y despliegue",
    stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "FastAPI", "Docker", "Coolify"],
    achievements: [
      "Organicé el frontend en capas.",
      "Construí componentes interactivos.",
      "Reduje código repetido con hooks y componentes compartidos.",
      "Desplegué en DigitalOcean con Docker y Coolify.",
    ],
    links: { demo: "", repo: "" },
    tone: "sun",
  },
  {
    title: "Lucid Locations",
    summary: "Sitio inmobiliario que pasó a una arquitectura headless.",
    role: "Migración, infraestructura y frontend",
    stack: ["WordPress headless", "Next.js", "TypeScript", "Tailwind CSS", "Caddy", "PHP 8.3"],
    achievements: [
      "Migré el hosting de HostGator a DigitalOcean.",
      "Configuré el servidor.",
      "Moví las imágenes a un CDN.",
      "Desplegué el frontend en Cloudflare.",
    ],
    links: { demo: "", repo: "" },
    tone: "sky",
  },
  {
    title: "Apps Android",
    summary: "Interfaces modernas que consumen APIs.",
    role: "Desarrollo móvil",
    stack: ["Kotlin", "Jetpack Compose"],
    achievements: ["Interfaces modernas con Jetpack Compose.", "Consumo de APIs desde la app."],
    links: { demo: "", repo: "" },
    tone: "leaf",
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Backend",
    items: ["Python", "FastAPI", "Node.js", "Express", "PHP", "Java", "SQL"],
  },
  {
    category: "Infra y herramientas",
    items: [
      "Docker",
      "Coolify",
      "DigitalOcean",
      "Cloudflare",
      "Caddy",
      "Git/GitHub",
      "WordPress headless",
      "Postman",
      "VS Code",
      "Android Studio",
      "Power BI",
      "Workbench",
    ],
  },
  {
    category: "Móvil",
    items: ["Kotlin", "Jetpack Compose"],
  },
  {
    category: "Personales",
    items: [
      "Optimista",
      "Detallista",
      "Con iniciativa",
      "Responsable",
      "Honesta",
      "Solidaria",
      "Trabajo en equipo",
      "Capacidad de analizar información técnica",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "Cisco Certified Support Technician Cybersecurity",
    issuer: "Cisco",
    date: "2024-07",
    dateLabel: "Julio 2024",
  },
  {
    name: "Introducción a la IA moderna",
    issuer: "Cisco Networking Academy",
    date: "2025-11",
    dateLabel: "Noviembre 2025",
  },
  {
    name: "Database Foundations",
    issuer: "Oracle",
    date: "2024-05",
    dateLabel: "Mayo 2024",
  },
];

export const languages: Language[] = [{ name: "Inglés", spoken: "A2", written: "B1" }];
