import { BulletList, RichText } from "@/components/rich-text";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

// Figma component `section-header`.
// - Layout=split (case studies): eyebrow + title in a 400px left column,
//   body on the right (max 720px). Stacks below md.
// - Layout=inline (showcases): eyebrow and title side by side, centered,
//   body centered underneath.
// Body text supports paragraphs and **bold** (RichText). Split only:
// - `sub`: a heading nested in a section (h3, heading-md-medium, no eyebrow),
//   e.g. SourceShoot "Results", "New Ping Creation".
// - `list`: bullets instead of (or after) the body, e.g. Constraints.
// - `aside`: pinned to the bottom of the left column from md (e.g. a link);
//   below md it follows the body.

/** Left column width, shared with DetailRow so the two line up. */
export const labelColumn = "md:w-2/5 md:shrink-0 xl:w-[400px]";
export const columnGap = "gap-4 md:gap-12 xl:gap-16";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  list?: string[];
  layout?: "split" | "inline";
  sub?: boolean;
  aside?: React.ReactNode;
};

export function SectionHeader({ eyebrow, title, body, list, layout = "split", sub = false, aside }: SectionHeaderProps) {
  if (layout === "inline") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="type-heading-md-semibold">{title}</h2>
        </div>
        {body && <RichText text={body} className="type-body-xl" />}
      </div>
    );
  }

  const Heading = sub ? "h3" : "h2";

  return (
    <div className={cn("flex flex-col md:flex-row", columnGap)}>
      <div className={cn("flex flex-col items-start gap-4 md:justify-between", labelColumn)}>
        <div className="flex flex-col items-start gap-4">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Heading className={sub ? "type-heading-md-medium" : "type-heading-md-semibold"}>{title}</Heading>
        </div>
        {aside && <div className="hidden md:block">{aside}</div>}
      </div>
      <div className="flex max-w-[720px] flex-1 flex-col gap-6 type-body-xl">
        {body && <RichText text={body} />}
        {list && <BulletList items={list} />}
        {aside && <div className="mt-2 md:hidden">{aside}</div>}
      </div>
    </div>
  );
}
