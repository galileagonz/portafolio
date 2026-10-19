import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ui, type Project, type ProjectStatus } from "@/data/content";
import { withBasePath } from "@/lib/paths";

const label = "font-mono text-label uppercase text-accent";
const badge = "rounded-full px-3 py-1 font-mono text-label";

// Production is solid violet; the label always names the status
const statusStyles: Record<ProjectStatus, string> = {
  produccion: "bg-violet text-on-violet",
  staging: "bg-lila-soft text-ink",
  academico: "bg-lila-soft text-ink",
};

// 16:10 screenshot, or a lila placeholder with the project name
function ProjectImage({ project, hasImage }: { project: Project; hasImage: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl border-b border-line bg-lila-soft">
      {hasImage ? (
        <Image
          src={withBasePath(project.image.src)}
          alt={project.image.alt}
          fill
          loading="lazy"
          sizes="(min-width: 1152px) 24rem, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center px-6 text-center font-display text-title font-bold text-accent"
        >
          {project.name}
        </span>
      )}
    </div>
  );
}

// Project card: screenshot, badges, details, metrics and link
export function ProjectCard({ project, hasImage }: { project: Project; hasImage: boolean }) {
  const { name, status, kind, description, role, challenge, metrics, url, linkLabel, noLinkNote } = project;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface">
      <ProjectImage project={project} hasImage={hasImage} />

      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8 lg:p-6">
        <ul className="flex flex-wrap gap-2">
          <li className={`${badge} ${statusStyles[status]}`}>{ui.projectStatus[status]}</li>
          <li className={`${badge} border border-line text-ink-muted`}>{kind}</li>
        </ul>

        <div>
          <h3 className="font-display text-title font-bold">{name}</h3>
          <p className="mt-2 text-ink-muted">{description}</p>
        </div>

        {(role || challenge) && (
          <dl className="space-y-4">
            {role && (
              <div>
                <dt className={label}>{ui.projectRole}</dt>
                <dd className="mt-1">{role}</dd>
              </div>
            )}
            {challenge && (
              <div>
                <dt className={label}>{ui.projectChallenge}</dt>
                <dd className="mt-1">{challenge}</dd>
              </div>
            )}
          </dl>
        )}

        {/* Label comes first for screen readers, value shows on top */}
        {metrics && (
          <div className="border-t border-line pt-6">
            <h4 className="sr-only">{ui.projectMetrics}</h4>
            <dl className="grid grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse">
                  <dt className="mt-1 font-mono text-label text-ink-muted">{metric.label}</dt>
                  <dd className="font-display text-title font-bold">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {url ? (
          <div className="mt-auto pt-2">
            <ButtonLink href={url} variant="secondary" size="sm" external>
              {linkLabel ?? ui.projectVisit}
              <span className="sr-only">: {name}</span>
            </ButtonLink>
          </div>
        ) : (
          noLinkNote && <p className="mt-auto pt-2 text-ink-muted">{noLinkNote}</p>
        )}
      </div>
    </article>
  );
}
