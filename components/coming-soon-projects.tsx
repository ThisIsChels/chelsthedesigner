import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/lib/project-categories";

// "Coming soon" section on /portfolio: projects that have a thumbnail but no
// published page yet. Sits below the filtered grid and ignores the filters.
// Cards follow the `project-card` structure but aren't links (there's no page
// to open): no lift, no arrow, thumbnail stays grayscale, and a "Coming soon"
// tag takes the arrow's place.

type Props = { heading: string; tagLabel: string; projects: Project[] };

export function ComingSoonProjects({ heading, tagLabel, projects }: Props) {
  if (projects.length === 0) return null;

  return (
    <section className="flex flex-col gap-8">
      <h2 className="type-heading-md-semibold">{heading}</h2>
      <ul className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <ComingSoonCard project={project} tagLabel={tagLabel} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ComingSoonCard({ project, tagLabel }: { project: Project; tagLabel: string }) {
  return (
    <div className="isolate flex h-full flex-col rounded-lg">
      <div className="relative z-10 -mb-3 aspect-4/3 overflow-hidden rounded-lg border border-text-primary">
        <Image
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
          className="object-cover grayscale"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 rounded-b-lg border border-text-primary bg-surface-base px-3 pt-6 pb-3">
        <h3 className="min-w-0 type-card-title wrap-break-word">{project.title}</h3>
        <ul className="flex flex-wrap gap-2">
          <li>
            <Tag>{tagLabel}</Tag>
          </li>
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
