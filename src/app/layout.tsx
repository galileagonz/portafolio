import type { Metadata } from "next";
import { DM_Sans, Space_Mono, Syne } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { profile, ui } from "@/data/content";
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

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.role}`,
  description: profile.bio,
};

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
          className="sr-only rounded-full bg-sun px-5 py-3 font-display font-bold text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
        >
          {ui.skipLink}
        </a>
        <Header />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
