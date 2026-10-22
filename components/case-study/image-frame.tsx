import Image from "next/image";
import type { CaseStudyImage } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

// Figma component `image-frame`: 1px Charcoal border, 8px corners. Keeps the
// image's own proportions (never crops), so give it the file's pixel size.
type ImageFrameProps = { image: CaseStudyImage; sizes: string; className?: string };

export function ImageFrame({ image, sizes, className }: ImageFrameProps) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      className={cn("h-auto w-full rounded-lg border border-text-primary", className)}
    />
  );
}
