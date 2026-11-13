"use client";

// Client component: holds the filter selection and filters the grid.
// Rules from CLAUDE.md → Portfolio filters:
// - Category row is single-select; "All" on load.
// - Tag row only shows for a category. Multi-select, OR logic.
//   Its "All" is on while no tag is picked.
// - Changing the category resets the tags.

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProjectCard } from "@/components/project-card";
import { ResumeButton } from "@/components/ui/cta-buttons";
import { FilterChip } from "@/components/ui/filter-chip";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { CATEGORIES, type Category, type Project } from "@/lib/project-categories";
import { blockGap } from "@/lib/layout";
import { cn } from "@/lib/utils";

type Props = {
  projects: Project[];
  emptyMessage: string;
  /** Category selected on load (e.g. from /portfolio?category=ux). */
  initialCategory?: Category | "all";
};

// Filter animation (option B): cards fade + scale in, staggered 30ms by grid
// position so new cards arrive in a left-to-right wave. The wave stops
// growing after the first 8 cards so long lists don't feel slow. Leaving
// cards fade + scale out right away; cards that stay glide to their new spot.
// Reduced motion: everything is instant.
const DURATION = 0.25;
const STAGGER = 0.03;
const MAX_STAGGERED = 8;

const cardTransition = (index: number, reduceMotion: boolean | null) =>
  reduceMotion
    ? { duration: 0 }
    : {
        duration: DURATION,
        ease: "easeOut" as const,
        delay: Math.min(index, MAX_STAGGERED) * STAGGER,
        layout: { duration: DURATION, ease: "easeOut" as const },
      };

export function ProjectBrowser({ projects, emptyMessage, initialCategory = "all" }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const [category, setCategory] = useState<Category | "all">(initialCategory);
  const [tags, setTags] = useState<string[]>([]);

  // Next keeps a visited /portfolio alive in the background, so arriving
  // again via a link like /portfolio?category=ux reuses this component instead
  // of creating it fresh. Follow the URL whenever its category changes.
  // (React's "adjust state when a prop changes" pattern: done during render,
  // no effect needed.)
  const [urlCategory, setUrlCategory] = useState(initialCategory);
  if (initialCategory !== urlCategory) {
    setUrlCategory(initialCategory);
    setCategory(initialCategory);
    setTags([]);
  }

  const activeCategory = CATEGORIES.find((c) => c.id === category);

  const pickCategory = (next: Category | "all") => {
    setCategory(next);
    // Keep the URL in step so refreshing or sharing keeps the filter.
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(null, "", url);
    setTags([]);
  };
  const toggleTag = (tag: string) =>
    setTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]));

  const visible = projects.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (tags.length === 0 || p.tags.some((t) => tags.includes(t))),
  );

  return (
    <section aria-label="Projects" className={cn("flex flex-col", blockGap)}>
      {/* Below md the Resume button sits above the filters. */}
      <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
            <FilterChip kind="primary" selected={category === "all"} onClick={() => pickCategory("all")}>
              All
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip key={c.id} kind="primary" selected={category === c.id} onClick={() => pickCategory(c.id)}>
                {c.label}
              </FilterChip>
            ))}
          </div>

          {activeCategory && (
            <div role="group" aria-label="Tags" className="flex flex-wrap gap-2">
              <FilterChip kind="secondary" selected={tags.length === 0} onClick={() => setTags([])}>
                All
              </FilterChip>
              {activeCategory.tags.map((tag) => (
                <FilterChip key={tag} kind="secondary" selected={tags.includes(tag)} onClick={() => toggleTag(tag)}>
                  {tag}
                </FilterChip>
              ))}
            </div>
          )}
        </div>

        <ResumeButton />
      </div>

      <ul className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {/* initial={false}: no animation on page load, only on filter changes.
            popLayout: leaving cards drop out of the grid right away so the
            others can glide into place while the leaving ones fade. */}
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: cardTransition(0, reduceMotion) }}
              transition={cardTransition(i, reduceMotion)}
            >
              <ProjectCard project={project} preload={i < 4} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <AnimatePresence initial={false}>
        {visible.length === 0 && (
          <motion.p
            key="empty"
            role="status"
            className="type-body-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={cardTransition(0, reduceMotion)}
          >
            {emptyMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
