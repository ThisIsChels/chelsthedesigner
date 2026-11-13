import { Fragment } from "react";
import { cn } from "@/lib/utils";

// Body copy from .mdx strings: a blank line ("\n\n") starts a new paragraph,
// and **double asterisks** make a word bold (Semibold: the site doesn't load
// Clash Bold). Paragraphs sit lg (24) apart.

export function RichText({ text, className }: { text: string; className?: string }) {
  const paragraphs = text.split(/\n\s*\n/);
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{bold(paragraph)}</p>
      ))}
    </div>
  );
}

/** Odd pieces of "a **b** c".split("**") are the bold ones. */
function bold(text: string) {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Disc bullets in the text color, indented lg (24), as on /about. */
export function BulletList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("list-disc pl-6", className)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
