import Image from "next/image";
import type { ReactNode } from "react";
import { siGithub } from "simple-icons";
import { buttonStyles } from "@/components/ui/ButtonLink";
import { ui, type Project } from "@/data/content";
import { withBasePath } from "@/lib/paths";

const iconClass = "size-4 shrink-0";

// Arrow leaving a box, marks links that open a new tab
function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconClass}
    >
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className={iconClass}>
      <path d={siGithub.path} />
    </svg>
  );
}

type ExternalButtonProps = {
  href: string;
  label: string;
  projectTitle: string;
  variant: "primary" | "secondary";
  icon: ReactNode;
};

// New-tab button; the accessible name starts with the visible label
function ExternalButton({ href, label, projectTitle, variant, icon }: ExternalButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${projectTitle} ${ui.newTab}`}
      className={buttonStyles(variant, "sm")}
    >
      {icon}
      {label}
    </a>
  );
}

// 16:10 cover with fixed size, or a lila placeholder with the title
function ProjectCover({ project, hasImage }: { project: Project; hasImage: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-lila-soft">
      {hasImage && project.image ? (
        <Image
          // encodeURI handles file names with spaces
          src={withBasePath(encodeURI(project.image))}
          alt={project.imageAlt}
          width={1600}
          height={1000}
          loading="lazy"
          sizes="(min-width: 1152px) 22rem, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="size-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center px-6 text-center font-display text-title font-bold text-accent"
        >
          {project.title}
        </span>
      )}
    </div>
  );
}

// Project card: cover, title, short description, visits and link buttons
export function ProjectCard({ project, hasImage }: { project: Project; hasImage: boolean }) {
  const { title, description, metric, links } = project;

  return (
    // Hover: lila border and a 2px lift; no lift with reduced motion
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-4 transition-[translate,border-color] duration-200 hover:-translate-y-0.5 hover:border-lila motion-reduce:hover:translate-y-0">
      <ProjectCover project={project} hasImage={hasImage} />

      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <h3 className="font-display text-title font-bold">{title}</h3>
        <p className="mt-2 text-ink-muted">{description}</p>

        {metric && (
          <div className="mt-5">
            <p className="font-display text-title font-bold">{metric.value}</p>
            <p className="text-ink-muted">{metric.label}</p>
            <p className="mt-1 text-label tracking-normal text-ink-muted">{metric.source}</p>
          </div>
        )}

        {/* mt-auto pins the buttons to the bottom across uneven cards */}
        {(links.site || links.code) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {links.site && (
              <ExternalButton
                href={links.site.url}
                label={links.site.label}
                projectTitle={title}
                variant="primary"
                icon={<ExternalIcon />}
              />
            )}
            {links.code && (
              <ExternalButton
                href={links.code}
                label={ui.projectCode}
                projectTitle={title}
                variant="secondary"
                icon={<GithubIcon />}
              />
            )}
          </div>
        )}
      </div>
    </article>
  );
}
