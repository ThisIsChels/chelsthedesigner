import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

// Figma component `section-header`: eyebrow + title in a 400px left column,
// body text on the right (max 720px). Stacks below md.

/** Left column width, shared with DetailRow so the two line up. */
export const labelColumn = "md:w-2/5 md:shrink-0 xl:w-[400px]";
export const columnGap = "gap-4 md:gap-12 xl:gap-16";

type SectionHeaderProps = { eyebrow?: string; title: string; body: string };

export function SectionHeader({ eyebrow, title, body }: SectionHeaderProps) {
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
