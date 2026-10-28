// Server-only: showcase pages (visual projects) from
// content/visual-projects/<slug>.mdx. The block types are documented at the
// top of fifty-ways-to-have-fun.mdx and digital-illustrations.mdx.

import type { CaseStudyImage } from "@/lib/case-studies";
import { publishedSlugs, readPublished } from "@/lib/published";

export type Artwork = CaseStudyImage & { title: string; year: number; medium: string };

/** A framed image; `chip` adds a small label in its corner. */
export type FramedImage = CaseStudyImage & { chip?: string };

export type StampItem = { state: string; cocktail: string };

export type StampSet = {
  searchLabel: string;
  countLabel: string;
  /** Folder of <state-in-kebab-case>.webp files. */
  dir: string;
  width: number;
  height: number;
  items: StampItem[];
};

export type Booklet = {
  hint: string;
  /** Optional "View full booklet" link (needs both). */
  buttonLabel?: string;
  pdf?: string;
  pages: CaseStudyImage[];
};

export type ShowcaseMedia =
  | { type: "columns"; columns: FramedImage[][] }
  | ({ type: "stamps" } & StampSet)
  | ({ type: "booklet" } & Booklet);

export type ShowcaseBlock =
  | { type: "gallery"; rows: Artwork[][] }
  | { type: "details"; items: { label: string; value: string }[] }
  | ({ type: "image" } & CaseStudyImage)
  | { type: "section"; eyebrow: string; title: string; body: string; media?: ShowcaseMedia[] }
  | { type: "result"; eyebrow: string; title: string; paragraphs: string[]; signOff?: string };

export type Showcase = {
  slug: string;
  title: string;
  skillTags: string[];
  description: string;
  blocks: ShowcaseBlock[];
  /** "Keep exploring" project slugs. */
  related?: string[];
};

export function getShowcase(slug: string): Showcase | null {
  const data = readPublished("visual-projects", slug);
  // Trusts the frontmatter shape; a typo shows up as a broken page in dev.
  return data ? ({ slug, ...data } as Showcase) : null;
}

export const getShowcaseSlugs = () => publishedSlugs("visual-projects");
