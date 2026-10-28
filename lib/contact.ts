// Sends the contact form. [PLACEHOLDER: form endpoint]
// Plan: Formspree. Once there's a form, put its endpoint in EXTERNAL.contactForm
// (lib/links.ts) and this posts to it.

import { EXTERNAL } from "@/lib/links";

export type ContactMessage = { name: string; email: string; subject: string; message: string };

export async function sendContactMessage(data: ContactMessage): Promise<void> {
  const endpoint: string | undefined = EXTERNAL.contactForm;

  if (!endpoint) {
    // No endpoint yet: pretend it worked so the UI can be reviewed.
    console.warn("[PLACEHOLDER] No contact form endpoint set — message was not sent.", data);
    await new Promise((resolve) => setTimeout(resolve, 600));
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Contact form failed: ${response.status}`);
}
