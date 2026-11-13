// Server-only: reads project page content from content/<kind>/<slug>.mdx.
// Only files with `published: true` get a page; the rest show the 404.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentKind = "case-studies" | "visual-projects";

/** The page's frontmatter, or null when the file is missing or unpublished. */
export function readPublished(kind: ContentKind, slug: string): Record<string, unknown> | null {
  const file = path.join(process.cwd(), "content", kind, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const data = matter(fs.readFileSync(file, "utf8")).data;
  return data.published === true ? data : null;
}

export function publishedSlugs(kind: ContentKind): string[] {
  return fs
    .readdirSync(path.join(process.cwd(), "content", kind))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .filter((slug) => readPublished(kind, slug) !== null);
}
