// Server-only: reads project folders and .mdx frontmatter from disk.
//
// A project appears in the portfolio when its folder in /public has a
// thumbnail.webp. Title and tags come from content/<kind>/<slug>.mdx when
// that file exists; otherwise the title is made from the folder name.
// Case studies come first, then visual projects, each alphabetical.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Category, Project } from "@/lib/project-categories";

const KINDS: { dir: string; category: Category }[] = [
  { dir: "case-studies", category: "ux" },
  { dir: "visual-projects", category: "visual" },
];

const titleFromSlug = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function readFrontmatter(kind: string, slug: string): Record<string, unknown> {
  const file = path.join(process.cwd(), "content", kind, `${slug}.mdx`);
  return fs.existsSync(file) ? matter(fs.readFileSync(file, "utf8")).data : {};
}

export function getProjects(): Project[] {
  return KINDS.flatMap(({ dir, category }) => {
    const root = path.join(process.cwd(), "public", dir);
    return fs
      .readdirSync(root)
      .filter((slug) => fs.existsSync(path.join(root, slug, "thumbnail.webp")))
      .sort()
      .map((slug) => {
        const data = readFrontmatter(dir, slug);
        const title = typeof data.title === "string" ? data.title : titleFromSlug(slug);
        return {
          slug,
          title,
          category,
          tags: Array.isArray(data.skillTags) ? data.skillTags.map(String) : [],
          thumbnail: `/${dir}/${slug}/thumbnail.webp`,
          // [PLACEHOLDER: per-project alt text] — add `thumbnailAlt` to the .mdx
          thumbnailAlt: typeof data.thumbnailAlt === "string" ? data.thumbnailAlt : `${title} project thumbnail`,
          href: `/portfolio/${slug}`,
        };
      });
  });
}

/**
 * "Keep exploring" cards: the hand-picked slugs in order, or, without a
 * list, up to 3 other projects from the same category.
 */
export function getRelatedProjects(slug: string, picks?: string[]): Project[] {
  const projects = getProjects();
  if (picks?.length) {
    return picks.flatMap((pick) => projects.filter((p) => p.slug === pick));
  }
  const category = projects.find((p) => p.slug === slug)?.category;
  return projects.filter((p) => p.category === category && p.slug !== slug).slice(0, 3);
}
