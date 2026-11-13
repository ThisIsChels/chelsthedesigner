import { BulletList } from "@/components/rich-text";
import { columnGap, labelColumn } from "@/components/section-header";
import type { DetailValue } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

// Figma component `detail-row` (Project Details): caption label on the left,
// body-lg value on the right. Rows after the first get a 1px top line, so
// put them in a list with `[&>*+*]:border-t` (see the case study page).
// A rich value (SourceShoot Role) has a bold title over a paragraph, with
// an optional bullet list beside it from lg (below it on smaller screens).
export function DetailRow({ label, value }: { label: string; value: string | DetailValue }) {
  return (
    <div className={cn("flex flex-col py-4 md:flex-row", columnGap)}>
      <dt className={cn("type-caption uppercase", labelColumn)}>{label}</dt>
      <dd className="flex-1 type-body-lg">
        {typeof value === "string" ? (
          value
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-16">
            <div className="flex flex-col gap-6 lg:flex-1">
              <p className="font-semibold">{value.title}</p>
              <p>{value.body}</p>
            </div>
            {value.list && <BulletList items={value.list} className="lg:flex-1" />}
          </div>
        )}
      </dd>
    </div>
  );
}
