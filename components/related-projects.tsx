import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/project-categories";

// Figma `related-projects` ("Keep exploring") at the end of case study and
// showcase pages. Pick the cards with `related` in the project's .mdx.

const HEADING = "Keep exploring";

export function RelatedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="flex flex-col gap-8">
      <h2 className="type-heading-md-semibold">{HEADING}</h2>
      <ul className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
