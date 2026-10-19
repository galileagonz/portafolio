import type { Metadata } from "next";
import { DM_Sans, Space_Mono, Syne } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { profile, site, SITE_ORIGIN, ui } from "@/data/content";
import { withBasePath } from "@/lib/paths";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const homeUrl = withBasePath("/");
const ogImage = { url: withBasePath("/og.png"), width: 1200, height: 630, alt: site.ogAlt };

// Relative URLs resolve against the origin; paths already carry basePath
export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: site.title, template: `%s · ${profile.name}` },
  description: site.description,
  authors: [{ name: profile.name }],
  alternates: { canonical: homeUrl },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: homeUrl,
    siteName: profile.name,
    title: site.title,
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [ogImage],
  },
};

// Root shell: fonts, theme script, skip link, header and footer
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <head>
        {/* Applies saved theme before first paint to avoid flashing */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only rounded-full border-3 border-ink bg-sun shadow-hard px-5 py-3 font-display font-bold text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
        >
          {ui.skipLink}
        </a>
        <Header />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
