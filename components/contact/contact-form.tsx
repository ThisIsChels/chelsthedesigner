"use client";

// Client component: holds what's typed, validation errors and send status.
// Validation (CLAUDE.md → Text fields), never on every keystroke:
// - "Please enter your …" (empty field) only appears once SEND has been
//   pressed; until then, leaving an empty field shows nothing.
// - Format problems (e.g. a bad email) show when the field loses focus.
// - After the first SEND attempt, every field is fully re-checked on blur.
// After a successful send it calls onSent(); the modal swaps to the success
// screen.

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { sendContactMessage, type ContactMessage } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Field = keyof ContactMessage;
type Status = "idle" | "sending" | "failed";

const FIELDS: { id: Field; label: string; type?: "email"; multiline?: boolean; autoComplete?: string }[] = [
  { id: "name", label: "Name", autoComplete: "name" },
  { id: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "subject", label: "Subject" },
  { id: "message", label: "Message", multiline: true },
];

const COPY = {
  send: "SEND",
  sending: "SENDING…",
  failed: "Something went wrong and your message didn’t send. Please try again.",
  required: (label: string) => `Please enter your ${label.toLowerCase()}.`,
  invalidEmail: "Please enter a valid email address.",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(field: Field, value: string, includeEmpty = true): string | undefined {
  const label = FIELDS.find((f) => f.id === field)!.label;
  if (!value.trim()) return includeEmpty ? COPY.required(label) : undefined;
  if (field === "email" && !EMAIL_PATTERN.test(value.trim())) return COPY.invalidEmail;
  return undefined;
}

const EMPTY: ContactMessage = { name: "", email: "", subject: "", message: "" };

export function ContactForm({ onSent }: { onSent: () => void }) {
  const [values, setValues] = useState<ContactMessage>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [triedToSend, setTriedToSend] = useState(false);

  const update = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Once a field is fixed, drop its error right away (but don't add new
    // errors while typing).
    if (errors[field] && !validate(field, value)) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const check = (field: Field) =>
    setErrors((e) => ({ ...e, [field]: validate(field, values[field], triedToSend) }));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTriedToSend(true);
    const found = Object.fromEntries(FIELDS.map(({ id }) => [id, validate(id, values[id])]));
    setErrors(found);
    const firstInvalid = FIELDS.find(({ id }) => found[id]);
    if (firstInvalid) {
      document.getElementById(firstInvalid.id)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await sendContactMessage(values);
      onSent();
    } catch {
      setStatus("failed");
    }
  };

  return (
    <form noValidate onSubmit={submit} className="flex flex-1 flex-col gap-4">
      {FIELDS.map((field) => (
        <TextField
          key={field.id}
          {...field}
          value={values[field.id]}
          onChange={(value) => update(field.id, value)}
          onBlur={() => check(field.id)}
          error={errors[field.id]}
          className={field.multiline ? "flex-1" : undefined}
        />
      ))}
      {status === "failed" && (
        <p role="alert" className="type-label-sm text-text-error">
          {COPY.failed}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(buttonVariants({ tone: "pear", size: "lg" }), "w-full disabled:opacity-60")}
      >
        {status === "sending" ? COPY.sending : COPY.send}
      </button>
    </form>
  );
}
