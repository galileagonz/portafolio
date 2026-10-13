import type { Metadata } from "next";
import { DM_Sans, Space_Mono, Syne } from "next/font/google";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
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
  title: "Portafolio",
  description: "Desarrolladora full stack y freelancer.",
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
        <ThemeToggle className="fixed top-4 right-4 z-50" />
        {children}
      </body>
    </html>
  );
}
