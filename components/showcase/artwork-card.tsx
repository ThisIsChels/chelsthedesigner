import Image from "next/image";
import type { Artwork } from "@/lib/showcases";
import { cn } from "@/lib/utils";

// Figma `illustration / …` on showcase pages: the artwork at its own
// proportions, then title + year and the medium underneath.
type ArtworkCardProps = { artwork: Artwork; sizes: string; className?: string; style?: React.CSSProperties };

export function ArtworkCard({ artwork, sizes, className, style }: ArtworkCardProps) {
  return (
    <figure className={cn("flex flex-col gap-3", className)} style={style}>
      <Image
        src={artwork.src}
        alt={artwork.alt}
        width={artwork.width}
        height={artwork.height}
        sizes={sizes}
        className="h-auto w-full rounded-lg border border-text-primary"
      />
      <figcaption className="flex flex-col gap-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className="type-body-lg">{artwork.title}</span>
          <span className="shrink-0 type-body">{artwork.year}</span>
        </span>
        <span className="type-caption uppercase">{artwork.medium}</span>
      </figcaption>
    </figure>
  );
}
