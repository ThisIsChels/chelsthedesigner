// Server-only: showcase pages (visual projects) from
// content/visual-projects/<slug>.mdx. digital-illustrations.mdx is the example.

import { publishedSlugs, readPublished } from "@/lib/published";

export type Artwork = {
  title: string;
  year: number;
  medium: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Showcase = {
  slug: string;
  title: string;
  skillTags: string[];
  description: string;
  /** Rows of artworks; each row sits at one height on desktop. */
  gallery: Artwork[][];
  /** "Keep exploring" project slugs. */
  related?: string[];
};

export function getShowcase(slug: string): Showcase | null {
  const data = readPublished("visual-projects", slug);
  // Trusts the frontmatter shape; a typo shows up as a broken page in dev.
  return data ? ({ slug, ...data } as Showcase) : null;
}

export const getShowcaseSlugs = () => publishedSlugs("visual-projects");
