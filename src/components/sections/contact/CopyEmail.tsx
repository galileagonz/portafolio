"use client";

import { useRef, useState } from "react";
import { contact, contactSection } from "@/data/content";

type CopyState = "idle" | "copied" | "failed";

// How long the "copied" notice stays visible
const NOTICE_MS = 2500;

// Email button that copies to clipboard, with mailto fallback
export function CopyEmail() {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | undefined>(undefined);

  // Restarts the notice timer on every copy
  async function copy() {
    window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(contact.email);
      setState("copied");
      timer.current = window.setTimeout(() => setState("idle"), NOTICE_MS);
    } catch {
      setState("failed");
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={copy}
        className="group inline-flex max-w-full items-center gap-3 rounded-full border border-violet bg-surface px-5 py-3 text-left font-display font-bold break-all text-ink transition-colors duration-200 hover:bg-lila-soft"
      >
        <span className="sr-only">{contactSection.copyEmail} </span>
        {contact.email}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 shrink-0 text-accent"
        >
          {state === "copied" ? (
            <path d="m5 12 5 5 9-10" />
          ) : (
            <>
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V6a2 2 0 0 1 2-2h9" />
            </>
          )}
        </svg>
      </button>

      {/* Always mounted so screen readers hear each change */}
      <p aria-live="polite" className="min-h-6 font-mono text-label text-accent">
        {state === "copied" && contactSection.copied}
        {state === "failed" && contactSection.copyFailed}
      </p>

      <a
        href={`mailto:${contact.email}`}
        className="inline-block text-ink-muted underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-ink"
      >
        {contactSection.mailtoLabel}
      </a>
    </div>
  );
}
