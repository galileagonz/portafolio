import Link from "next/link";
import type { ReactNode } from "react";
import { ui } from "@/data/content";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border font-display font-bold underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-current";

// Primary is solid violet; secondary is outlined
const variants: Record<Variant, string> = {
  primary: "border-violet bg-violet text-on-violet",
  secondary: "border-violet bg-surface text-ink hover:bg-lila-soft",
};

const sizes = {
  md: "px-6 py-3",
  sm: "px-4 py-2 text-label",
};

// Shared classes so real <button>s match the link buttons
export function buttonStyles(variant: Variant = "primary", size: keyof typeof sizes = "md") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  external?: boolean;
  // File download from public/; pass href through withBasePath()
  download?: boolean;
  className?: string;
};

// Button-styled link; app paths go through next/link for basePath
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  download = false,
  className = "",
}: ButtonLinkProps) {
  const classes = `${buttonStyles(variant, size)} ${className}`;

  if (download) {
    return (
      <a href={href} download className={classes}>
        {children}
      </a>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
        <span className="sr-only"> {ui.newTab}</span>
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
