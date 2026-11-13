import Image from "next/image";
import { TextLink } from "@/components/ui/text-link";

// Figma `about-strip`: short intro + photo. Stacks below md.

type AboutStripProps = {
  heading: string;
  bio: string;
  linkLabel: string;
  photo: { src: string; alt: string };
};

export function AboutStrip({ heading, bio, linkLabel, photo }: AboutStripProps) {
  return (
    <section className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
      <div className="flex flex-1 flex-col items-start gap-6">
        <h2 className="type-heading-md-semibold">{heading}</h2>
        <p className="type-body-xl">{bio}</p>
        <TextLink href="/about">{linkLabel}</TextLink>
      </div>

      {/* Portrait photo cropped into the Figma frame: full width, framed from
          the cap down past the diploma (object-position 25% from the top). */}
      <div className="relative aspect-[403/360] overflow-hidden rounded-lg border border-text-primary md:w-1/3">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover object-[50%_25%]"
        />
      </div>
    </section>
  );
}
