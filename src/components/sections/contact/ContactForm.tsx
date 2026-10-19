"use client";

import { Suspense, useId, useState, type FormEvent } from "react";
import { buttonStyles } from "@/components/ui/ButtonLink";
import { contact, contactSection, FORMSPREE_ENDPOINT, services } from "@/data/content";
import { ServiceSelect, ServiceSelectField } from "./ServiceSelect";

type FieldName = "name" | "email" | "service" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "invalid" | "sending" | "success" | "error";

const FIELD_ORDER: FieldName[] = ["name", "email", "service", "message"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE = 10;

const { fields, errors: messages } = contactSection;

// Returns the error message for one field, or undefined
function validateField(name: FieldName, raw: FormDataEntryValue | null): string | undefined {
  const value = typeof raw === "string" ? raw.trim() : "";
  switch (name) {
    case "name":
      return value ? undefined : messages.nameRequired;
    case "email":
      if (!value) return messages.emailRequired;
      return EMAIL_PATTERN.test(value) ? undefined : messages.emailInvalid;
    case "service":
      return value ? undefined : messages.serviceRequired;
    case "message":
      if (!value) return messages.messageRequired;
      return value.length >= MIN_MESSAGE ? undefined : messages.messageShort;
  }
}

const fieldBase =
  "mt-2 block w-full rounded-xl bg-surface px-4 py-3 text-ink transition-colors duration-200 placeholder:text-ink-muted";

// Violet border meets 3:1; thicker on error, not color alone
const fieldClass = (error?: string) => `${fieldBase} ${error ? "border-2 border-accent" : "border border-violet"}`;

const labelClass = "font-display font-bold";

// Error text linked to its field through aria-describedby
function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-label font-medium text-accent">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="mt-px size-4 shrink-0" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z" />
      </svg>
      {error}
    </p>
  );
}

// Contact form posting to Formspree with accessible validation
export function ContactForm() {
  const baseId = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const ids = Object.fromEntries(FIELD_ORDER.map((name) => [name, `${baseId}-${name}`])) as Record<FieldName, string>;
  const errorId = (name: FieldName) => `${ids[name]}-error`;
  const describedBy = (name: FieldName) => (errors[name] ? errorId(name) : undefined);

  // Re-validates flagged fields while editing so errors clear
  function handleChange(event: FormEvent<HTMLFormElement>) {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const name = target.name as FieldName;
    if (!errors[name]) return;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, target.value) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const found: Errors = {};
    for (const name of FIELD_ORDER) found[name] = validateField(name, data.get(name));
    setErrors(found);

    // Focuses the first invalid field so its error is read
    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      setStatus("invalid");
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    // Sends the readable service title instead of its slug
    const service = services.find((s) => s.id === data.get("service"));
    data.set("service", service ? service.title : contactSection.serviceOther);

    setStatus("sending");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form noValidate onSubmit={handleSubmit} onChange={handleChange} className="space-y-6">
      <p className="text-label text-ink-muted">{contactSection.requiredNote}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className={labelClass}>
            {fields.name}
          </label>
          <input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={fieldClass(errors.name)}
          />
          <FieldError id={errorId("name")} error={errors.name} />
        </div>

        <div>
          <label htmlFor={ids.email} className={labelClass}>
            {fields.email}
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={fieldClass(errors.email)}
          />
          <FieldError id={errorId("email")} error={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor={ids.service} className={labelClass}>
          {fields.service}
        </label>
        {/* Fallback in static HTML; URL preselect applies on the client */}
        <Suspense
          fallback={
            <ServiceSelectField
              id={ids.service}
              className={fieldClass(errors.service)}
              invalid={Boolean(errors.service)}
              describedBy={describedBy("service")}
              preselect=""
            />
          }
        >
          <ServiceSelect
            id={ids.service}
            className={fieldClass(errors.service)}
            invalid={Boolean(errors.service)}
            describedBy={describedBy("service")}
          />
        </Suspense>
        <FieldError id={errorId("service")} error={errors.service} />
      </div>

      <div>
        <label htmlFor={ids.message} className={labelClass}>
          {fields.message}
        </label>
        <textarea
          id={ids.message}
          name="message"
          rows={5}
          required
          minLength={MIN_MESSAGE}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={`${fieldClass(errors.message)} resize-y`}
        />
        <FieldError id={errorId("message")} error={errors.message} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          aria-disabled={sending}
          className={`${buttonStyles()} ${sending ? "cursor-wait" : ""}`}
        >
          {contactSection.submit}
        </button>
      </div>

      {/* Single live region announces every form state */}
      <div role="status" className="min-h-6">
        {status === "invalid" && <p className="text-accent">{contactSection.fixErrors}</p>}
        {status === "sending" && <p className="text-ink-muted">{contactSection.sending}</p>}
        {status === "success" && (
          <p className="rounded-xl bg-lila-soft px-4 py-3 font-medium text-ink">{contactSection.success}</p>
        )}
        {status === "error" && (
          <p className="rounded-xl border border-violet px-4 py-3 text-ink">
            {contactSection.error} {contactSection.errorFallback}{" "}
            <a
              href={`mailto:${contact.email}`}
              className="font-bold break-all text-accent underline underline-offset-4"
            >
              {contact.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
