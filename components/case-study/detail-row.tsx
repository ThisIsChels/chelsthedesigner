import { columnGap, labelColumn } from "@/components/case-study/section-header";
import { cn } from "@/lib/utils";

// Figma component `detail-row` (Project Details): caption label on the left,
// body-lg value on the right. Rows after the first get a 1px top line, so
// put them in a list with `[&>*+*]:border-t` (see the case study page).
export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={cn("flex flex-col py-4 md:flex-row", columnGap)}>
      <dt className={cn("type-caption uppercase", labelColumn)}>{label}</dt>
      <dd className="flex-1 type-body-lg">{value}</dd>
    </div>
  );
}
