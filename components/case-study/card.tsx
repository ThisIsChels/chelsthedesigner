import { Eyebrow } from "@/components/ui/eyebrow";

// Figma component `card`: outlined panel with eyebrow, title and body
// (e.g. Development / Challenges & Learnings). Stretches to its row's height.
type CardProps = { eyebrow: string; title: string; body: string };

export function Card({ eyebrow, title, body }: CardProps) {
  return (
    <div className="flex h-full flex-col items-start gap-6 rounded-lg border border-text-primary p-6 md:p-8">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="type-heading-md-semibold">{title}</h2>
      <p className="type-body-xl">{body}</p>
    </div>
  );
}
