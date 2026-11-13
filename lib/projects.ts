// Server-only: reads project folders and .mdx frontmatter from disk.
//
// A project appears in the portfolio when its folder in /public has a
// thumbnail.webp. Title and tags come from content/<kind>/<slug>.mdx when
// that file exists; otherwise the title is made from the folder name.
// Case studies come first, then visual projects, each alphabetical.
// Projects without a published page are marked `published: false`; the
// portfolio lists them under "Coming soon" and "Keep exploring" skips them.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Category, Project } from "@/lib/project-categories";
import { readPublished, type ContentKind } from "@/lib/published";

const KINDS: { dir: ContentKind; category: Category }[] = [
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
          published: readPublished(dir, slug) !== null,
        };
      });
  });
}

/**
 * "Keep exploring" cards: the hand-picked slugs in order, or, without a
 * list, up to 3 other projects from the same category. Unpublished
 * ("coming soon") projects are never shown.
 */
export function getRelatedProjects(slug: string, picks?: string[]): Project[] {
  const projects = getProjects().filter((p) => p.published);
  if (picks?.length) {
    return picks.flatMap((pick) => projects.filter((p) => p.slug === pick));
  }
  const category = projects.find((p) => p.slug === slug)?.category;
  return projects.filter((p) => p.category === category && p.slug !== slug).slice(0, 3);
}
