import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { contact, experience, sections, ui } from "@/data/content";
import { withBasePath } from "@/lib/paths";

const meta = sections.find((s) => s.id === "cv")!;

const dateText = "font-mono text-label text-ink-muted";

// Labeled CV block that fades in on scroll
function CvBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ScrollReveal amount={0.2}>
      <h3 className="mb-6 border-b border-line pb-3 font-mono text-label uppercase text-accent">{title}</h3>
      {children}
    </ScrollReveal>
  );
}

// Vertical timeline; the current job gets a yellow dot
function ExperienceTimeline() {
  return (
    <ol className="border-l border-line">
      {experience.map((job) => {
        const current = job.end === null;
        return (
          <li key={`${job.company}-${job.start}`} className="relative pb-10 pl-8 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute top-2 -left-[6px] size-[11px] rounded-full border ${
                current ? "border-ink bg-sun" : "border-violet bg-surface"
              }`}
            />
            <h4 className="font-display text-lead font-bold">{job.role}</h4>
            <p className="text-ink-muted">{job.company}</p>
            <p className={`mt-1 ${dateText}`}>{job.periodLabel}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 marker:text-accent">
              {job.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}

// Arrow-into-tray icon for the download button
function DownloadIcon() {
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
      className="size-5"
    >
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}

// Recruiter-friendly CV: sticky header left, details right
export function Cv() {
  return (
    <Section
      id={meta.id}
      title={meta.title!}
      tone="surface"
      aside={
        <ButtonLink href={withBasePath(contact.cv)} download>
          <DownloadIcon />
          {ui.cvDownload}
        </ButtonLink>
      }
    >
      <div className="space-y-16">
        <CvBlock title={ui.cvExperience}>
          <ExperienceTimeline />
        </CvBlock>
      </div>
    </Section>
  );
}
