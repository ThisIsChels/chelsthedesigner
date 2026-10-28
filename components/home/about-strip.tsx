import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { TextLink } from "@/components/ui/text-link";

// Figma `about-strip`: short intro + photo. Stacks below md.

type AboutStripProps = { heading: string; bio: string; linkLabel: string };

export function AboutStrip({ heading, bio, linkLabel }: AboutStripProps) {
  return (
    <section className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
      <div className="flex flex-1 flex-col items-start gap-6">
        <h2 className="type-heading-md-semibold">{heading}</h2>
        <p className="type-body-xl">{bio}</p>
        <TextLink href="/about">{linkLabel}</TextLink>
      </div>

      {/* [PLACEHOLDER: about photo] */}
      <div className="relative aspect-[403/360] overflow-hidden rounded-lg border border-text-primary md:w-1/3">
        <ImagePlaceholder />
      </div>
    </section>
  );
}
