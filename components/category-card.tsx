"use client";

// Client component: on touch screens it watches when the card reaches the
// middle of the screen (Motion's useInView) to bring the image to color,
// same as ProjectCard.
//
// Figma component `category-card`. The whole card is one link with the 8px
// lift. Fills its grid cell's height so a row of cards always matches; the
// link line sits at the bottom. Image is grayscale until hover (mouse) or
// mid-screen (touch).

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "motion/react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

type CategoryCardProps = {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  /** Omit to show a grey placeholder. */
  image?: { src: string; alt: string };
};

export function CategoryCard({ title, description, linkLabel, href, image }: CategoryCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  // Shrink the viewport by 25% top and bottom → "in view" = middle ~50%.
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px" });

  return (
    <Link
      ref={ref}
      href={href}
      data-in-view={inView}
      className="group lift lift-lg flex h-full flex-col overflow-hidden rounded-lg border border-text-primary bg-surface-base"
    >
      <div className="relative -m-px aspect-5/3 overflow-hidden rounded-lg border border-text-primary">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover grayscale transition-[filter] duration-300 ease-out group-hover:grayscale-0 [@media(hover:none)]:group-data-[in-view=true]:grayscale-0"
          />
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
