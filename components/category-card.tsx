import Image from "next/image";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

// Figma component `category-card`. The whole card is one link with the 8px
// lift. Fills its grid cell's height so a row of cards always matches; the
// link line sits at the bottom.

type CategoryCardProps = {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  /** Omit to show a grey placeholder. */
  image?: { src: string; alt: string };
};

export function CategoryCard({ title, description, linkLabel, href, image }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="lift lift-lg flex h-full flex-col overflow-hidden rounded-lg border border-text-primary bg-surface-base"
    >
      <div className="relative -m-px aspect-5/3 overflow-hidden rounded-lg border border-text-primary">
        {image ? (
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="type-heading-md-medium">{title}</h3>
        <p className="type-body-lg">{description}</p>
        <p className="mt-auto type-body-lg text-accent-primary">{linkLabel}</p>
      </div>
    </Link>
  );
}
