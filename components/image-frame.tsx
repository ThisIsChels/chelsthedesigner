import Image from "next/image";
import type { CaseStudyImage } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

// Figma component `image-frame`: 1px Charcoal border, 8px corners, optional
// `chip` label in the bottom-left corner. Keeps the image's own proportions
// unless `fillFromMd` is set: then, from md, the image covers whatever height
// the frame is given (used to match a neighboring column's height).
type ImageFrameProps = {
  image: CaseStudyImage;
  sizes: string;
  chip?: string;
  fillFromMd?: boolean;
  /** Load right away (images visible without scrolling). */
  eager?: boolean;
  className?: string;
};

export function ImageFrame({ image, sizes, chip, fillFromMd = false, eager = false, className }: ImageFrameProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg border border-text-primary", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={eager ? "eager" : undefined}
        className={cn("block h-auto w-full", fillFromMd && "md:absolute md:inset-0 md:h-full md:object-cover")}
      />
      {chip && (
        <span className="absolute bottom-3 left-3 rounded-full bg-surface-base px-3 py-2 type-body">{chip}</span>
      )}
    </div>
  );
}
