"use client";

// Client component: on touch screens it watches when the card reaches the
// middle of the screen (Motion's useInView) to bring the thumbnail to color.
//
// Figma component `project-card` (CLAUDE.md → Project card structure).
// Hover (mouse only): 8px lift, arrow + tags invert, thumbnail goes from
// grayscale to color. Touch: color only, when the card is mid-screen.

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "motion/react";
import { IconButton } from "@/components/ui/icon-button";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/lib/project-categories";

type ProjectCardProps = { project: Project; preload?: boolean };

export function ProjectCard({ project, preload = false }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  // Shrink the viewport by 25% top and bottom → "in view" = middle ~50%.
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px" });

  return (
    <Link
      ref={ref}
      href={project.href}
      data-in-view={inView}
      className="group lift lift-lg isolate flex h-full flex-col rounded-lg"
    >
      <div className="relative z-10 -mb-3 aspect-4/3 overflow-hidden rounded-lg border border-text-primary">
        <Image
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          fill
          preload={preload}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
          className="object-cover grayscale transition-[filter] duration-300 ease-out group-hover:grayscale-0 [@media(hover:none)]:group-data-[in-view=true]:grayscale-0"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 rounded-b-lg border border-text-primary bg-surface-base px-3 pt-6 pb-3">
        {/* Figma has no gap here; the 8px below xl keeps wrapped titles off the arrow. */}
        <div className="flex items-start justify-between gap-2 xl:gap-0">
          <h3 className="min-w-0 type-card-title wrap-break-word">{project.title}</h3>
          <IconButton />
        </div>
        {project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
