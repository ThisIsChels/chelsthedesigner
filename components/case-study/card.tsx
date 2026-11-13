import { BulletList, RichText } from "@/components/rich-text";
import { SectionHeader } from "@/components/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { CardItem } from "@/lib/case-studies";

// Figma component `card`: outlined panel with eyebrow, title and body
// (e.g. Development / Challenges & Learnings). Stretches to its row's height.
// - Body can be text, bullets, or both.
// - Without an eyebrow the title is a nested heading (heading-md-medium),
//   per Figma SourceShoot "What Was Tested".
// - `wide`: spans the row and uses the split section-header layout
//   (SourceShoot "Constraints").

export function Card({ eyebrow, title, body, list, wide }: CardItem) {
  if (wide) {
    return (
      <div className="rounded-lg border border-text-primary p-6 md:col-span-2 md:p-8">
        <SectionHeader eyebrow={eyebrow} title={title} body={body} list={list} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-start gap-6 rounded-lg border border-text-primary p-6 md:p-8">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {eyebrow ? (
        <h2 className="type-heading-md-semibold">{title}</h2>
      ) : (
        <h3 className="type-heading-md-medium">{title}</h3>
      )}
      {body && <RichText text={body} className="type-body-xl" />}
      {list && <BulletList items={list} className="type-body-xl" />}
    </div>
  );
}
