import { SectionHeader } from "@/components/section-header";
import { UsaForeverSeal } from "@/components/showcase/usa-forever-seal";
import { Eyebrow } from "@/components/ui/eyebrow";

// Closing note on a Charcoal panel at the end of a project page.
// - layout "split" (case studies, Figma `section / outcome`): section header
//   style, eyebrow + title on the left, text on the right.
// - layout "centered" (showcases, Figma `outcome-box`): everything centered,
//   with an optional sign-off (USA Forever seal + name).
type OutcomeBoxProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  layout?: "split" | "centered";
  signOff?: string;
};

export function OutcomeBox({ eyebrow, title, paragraphs, layout = "centered", signOff }: OutcomeBoxProps) {
  if (layout === "split") {
    return (
      <section className="surface-inverse rounded-lg p-8 md:p-16">
        <SectionHeader eyebrow={eyebrow} title={title} body={paragraphs.join("\n\n")} />
      </section>
    );
  }

  return (
    <section className="surface-inverse flex flex-col items-center gap-6 rounded-lg p-8 text-center md:p-16">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="type-heading-md-semibold">{title}</h2>
      </div>
      <div className="flex flex-col gap-6 type-body-xl">
        {paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
      {signOff && (
        <p className="flex items-center gap-4 type-caption uppercase">
          <UsaForeverSeal className="h-auto w-20" />
          {signOff}
        </p>
      )}
    </section>
  );
}
