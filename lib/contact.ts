// Sends the contact form to Formspree (EXTERNAL.contactForm in lib/links.ts).
// Formspree field names: `email` becomes the reply-to address, `_subject` the
// email's subject line, and `_gotcha` is a honeypot: a hidden field people
// never fill in, so Formspree drops any submission that has it.

import { EXTERNAL } from "@/lib/links";

export type ContactMessage = { name: string; email: string; subject: string; message: string };

export async function sendContactMessage(data: ContactMessage, honeypot = ""): Promise<void> {
  const endpoint: string | undefined = EXTERNAL.contactForm;

  if (!endpoint) {
    // No endpoint yet: pretend it worked so the UI can be reviewed.
    console.warn("No contact form endpoint set — message was not sent.", data);
    await new Promise((resolve) => setTimeout(resolve, 600));
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...data, _subject: data.subject, _gotcha: honeypot }),
  });
  if (!response.ok) throw new Error(`Contact form failed: ${response.status}`);
}
