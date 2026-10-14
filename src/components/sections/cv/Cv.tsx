import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import {
  certifications,
  contact,
  education,
  experience,
  languages,
  sections,
  skills,
  strengths,
  ui,
} from "@/data/content";
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
      eyebrow={meta.label}
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

        <CvBlock title={ui.cvEducation}>
          <ul className="space-y-6">
            {education.map((item) => (
              <li key={`${item.institution}-${item.start}`}>
                <h4 className="font-display text-lead font-bold">{item.degree}</h4>
                <p className="text-ink-muted">
                  {item.institution} · {item.detail}
                </p>
                <p className={`mt-1 ${dateText}`}>{item.periodLabel}</p>
              </li>
            ))}
          </ul>
        </CvBlock>

        <CvBlock title={ui.cvCertifications}>
          <ul className="space-y-6">
            {certifications.map((cert) => (
              <li key={cert.name}>
                <h4 className="font-display text-lead font-bold">{cert.name}</h4>
                <p className="text-ink-muted">{cert.issuer}</p>
                <p className={`mt-1 ${dateText}`}>
                  <time dateTime={cert.date}>{cert.dateLabel}</time>
                </p>
              </li>
            ))}
          </ul>
        </CvBlock>

        <CvBlock title={ui.cvSkills}>
          <div className="space-y-8">
            {skills.map((group) => (
              <div key={group.category}>
                <h4 className="font-display font-bold">{group.category}</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line px-3 py-1 font-mono text-label transition-colors duration-200 hover:border-violet hover:bg-lila-soft"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CvBlock>

        <div className="grid gap-16 sm:grid-cols-2 sm:gap-10">
          <CvBlock title={ui.cvLanguages}>
            <ul className="space-y-1">
              {languages.map((lang) => (
                <li key={lang.name}>
                  <span className="font-bold">{lang.name}</span>: {ui.cvSpoken} {lang.spoken} · {ui.cvWritten}{" "}
                  {lang.written}
                </li>
              ))}
            </ul>
          </CvBlock>

          <CvBlock title={ui.cvStrengths}>
            <p>{strengths.join(" · ")}</p>
          </CvBlock>
        </div>
      </div>
    </Section>
  );
}
