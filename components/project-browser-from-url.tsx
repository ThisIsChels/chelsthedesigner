"use client";

// Client component: reads ?category= so links like "UX case studies" on
// /services open the portfolio with that filter already selected.
// Reading the URL makes this part request-specific, so the page wraps it in
// <Suspense> with the plain "All" grid as the instant fallback.

import { useSearchParams } from "next/navigation";
import { ProjectBrowser } from "@/components/project-browser";
import { CATEGORIES, type Category, type Project } from "@/lib/project-categories";

type Props = { projects: Project[]; emptyMessage: string };

export function ProjectBrowserFromUrl({ projects, emptyMessage }: Props) {
  const param = useSearchParams().get("category");
  const category = CATEGORIES.find((c) => c.id === param)?.id as Category | undefined;
  return <ProjectBrowser projects={projects} emptyMessage={emptyMessage} initialCategory={category ?? "all"} />;
}
