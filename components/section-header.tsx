import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

// Figma component `section-header`.
// - Layout=split (case studies): eyebrow + title in a 400px left column,
//   body on the right (max 720px). Stacks below md.
// - Layout=inline (showcases): eyebrow and title side by side, centered,
//   body centered underneath.

/** Left column width, shared with DetailRow so the two line up. */
export const labelColumn = "md:w-2/5 md:shrink-0 xl:w-[400px]";
export const columnGap = "gap-4 md:gap-12 xl:gap-16";

type SectionHeaderProps = { eyebrow?: string; title: string; body: string; layout?: "split" | "inline" };

export function SectionHeader({ eyebrow, title, body, layout = "split" }: SectionHeaderProps) {
  if (layout === "inline") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="type-heading-md-semibold">{title}</h2>
        </div>
        <p className="type-body-xl">{body}</p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col md:flex-row", columnGap)}>
      <div className={cn("flex flex-col items-start gap-4", labelColumn)}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="type-heading-md-semibold">{title}</h2>
      </div>
      <p className="max-w-[720px] flex-1 type-body-xl">{body}</p>
    </div>
  );
}
