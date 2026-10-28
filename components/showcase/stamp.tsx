import { useId } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Figma component `stamp` (State=Default / Hover / Expanded). Drawn inside the
// StampGrid's button, which carries the `group` class.
//
// Hover (mouse only, motion allowed): tilts 4°, a drop shadow follows the
// perforated edge, two gloss bands sweep across, and the bottom-right corner
// peels up to show the paper back. 200ms ease-out. Expanded: no tilt or
// peel, just a softer resting shadow.

type StampProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  expanded: boolean;
  sizes: string;
};

const hover = "motion-safe:group-hover:opacity-100";

export function Stamp({ src, alt, width, height, expanded, sizes }: StampProps) {
  const gradientId = useId();

  return (
    <span
      className={cn(
        "relative block transition-[rotate,filter] duration-200 ease-out",
        expanded
          ? "drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)]"
          : "motion-safe:group-hover:rotate-4 motion-safe:group-hover:drop-shadow-[0_10px_18px_rgba(0,0,0,0.28)]",
      )}
    >
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} draggable={false} className="block h-auto w-full" />

      {!expanded && (
        <>
          {/* Gloss bands, clipped to the stamp's own shape by its image. */}
          <span
            aria-hidden="true"
            className={cn("absolute inset-0 opacity-0 transition-opacity duration-200 ease-out", hover)}
            style={{
              backgroundImage:
                "linear-gradient(117.58deg, rgb(255 255 255 / 0) 30.5%, rgb(255 255 255 / 0.28) 34%, rgb(255 255 255 / 0) 37.6%, rgb(255 255 255 / 0) 46.1%, rgb(255 255 255 / 0.6) 51.8%, rgb(255 255 255 / 0) 58.9%)",
              maskImage: `url("${src}")`,
              maskSize: "100% 100%",
            }}
          />
          {/* Corner peel: page-colored cut + the folded-back paper. Sized to
              the stamp (Figma: 30px on a 115px stamp). */}
          <svg
            aria-hidden="true"
            viewBox="0 0 30 30"
            overflow="visible"
            className={cn(
              "absolute right-0 bottom-0 w-[26%] origin-bottom-right scale-0 opacity-0 transition-[scale,opacity] duration-200 ease-out",
              "motion-safe:group-hover:scale-100",
              hover,
            )}
          >
            <defs>
              {/* Paper back. Off-palette on purpose: it's part of the artwork. */}
              <linearGradient id={gradientId} x1="0" y1="0" x2="21.4" y2="21.4" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFAF0" />
                <stop offset="1" stopColor="#CCC7B8" />
              </linearGradient>
            </defs>
            <path d="M0 30H30V0Z" className="fill-surface-base" />
            <path
              d="M0 30L30 0H0Z"
              fill={`url(#${gradientId})`}
              style={{ filter: "drop-shadow(0 2px 2px rgb(0 0 0 / 0.3))" }}
            />
          </svg>
        </>
      )}
    </span>
  );
}
