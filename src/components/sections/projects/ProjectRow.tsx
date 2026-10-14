"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { fadeUp, reducedFade } from "@/components/motion/transitions";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ui, type Project } from "@/data/content";

// Shared columns so the panel lines up under the project name
const grid = "grid grid-cols-[2.5rem_1fr_auto] gap-x-3 px-2 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-6 sm:px-4";

const label = "font-mono text-label uppercase text-accent";

// Smooth height reveal; reduced motion jumps height and only fades
const expand = { ...fadeUp, duration: 0.35 };

// Accordion row: summary button plus collapsible project details
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = `${useId()}-panel`;
  const { title, summary, role, achievements, stack, links } = project;
  const hasLinks = Boolean(links.demo || links.repo);

  return (
    <>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className={`${grid} group w-full items-center py-6 text-left transition-colors duration-200 hover:bg-lila-soft sm:py-8`}
        >
          <span className="self-start pt-2 font-mono text-label text-ink-muted sm:pt-3">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0">
            <span className="block font-display text-title font-bold">{title}</span>
            <span className="mt-1 block font-sans text-body font-normal text-ink-muted">{summary}</span>
          </span>
          {/* Arrow nudges right on hover and turns down when open */}
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`size-6 text-accent transition-[translate,rotate] duration-200 group-hover:translate-x-1 ${open ? "rotate-90" : ""}`}
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </h3>

      <div id={panelId}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduce ? reducedFade : expand}
              className="overflow-hidden"
            >
              <div className={`${grid} pb-10`}>
                <div className="col-start-2 col-end-4 space-y-8 sm:col-end-3">
                  <div>
                    <h4 className={label}>{ui.projectRole}</h4>
                    <p className="mt-2">{role}</p>
                  </div>

                  <div>
                    <h4 className={label}>{ui.projectAchievements}</h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-accent">
                      {achievements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className={label}>{ui.projectStack}</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {stack.map((tech) => (
                        <li key={tech} className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-label">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {hasLinks && (
                    <div>
                      <h4 className={label}>{ui.projectLinks}</h4>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {links.demo && (
                          <ButtonLink href={links.demo} size="sm" external>
                            {ui.projectDemo}
                            <span className="sr-only">: {title}</span>
                          </ButtonLink>
                        )}
                        {links.repo && (
                          <ButtonLink href={links.repo} size="sm" variant="secondary" external>
                            {ui.projectRepo}
                            <span className="sr-only">: {title}</span>
                          </ButtonLink>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
