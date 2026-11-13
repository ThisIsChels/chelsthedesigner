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

/** A Balance postcard. x/y = card center and rotate in Figma's 1256×950 table. */
export type Postcard = {
  /** File prefix: <dir>/<name>-front.webp and -back.webp. */
  name: string;
  /** The word on the front (used in its alt text). */
  word: string;
  /** The verse on the back (its alt text). */
  verse: string;
  x: number;
  y: number;
  rotate: number;
  /** Stacking order, 1 = bottom. */
  z: number;
};

export type Booklet = {
  hint: string;
  /** Optional "View full booklet" link (needs both). */
  buttonLabel?: string;
  pdf?: string;
  /** What screen readers call the carousel (default "Booklet pages"). */
  label?: string;
  pages: CaseStudyImage[];
};

export type ShowcaseMedia =
  /** `proportional`: column widths follow the images so every column is one height. */
  | { type: "columns"; columns: FramedImage[][]; proportional?: boolean }
  | ({ type: "stamps" } & StampSet)
  | ({ type: "booklet" } & Booklet)
  /** Stacked rows; each row shares one height, widths follow proportions. */
  | { type: "images"; rows: CaseStudyImage[][]; frame?: boolean; maxWidth?: number }
  | { type: "details"; items: { label: string; value: string }[] }
  | { type: "postcards"; dir: string; cards: Postcard[] };

export type ShowcaseBlock =
  | { type: "gallery"; rows: Artwork[][] }
  | { type: "details"; items: { label: string; value: string }[] }
  | ({ type: "image" } & CaseStudyImage)
  | {
      type: "section";
      /** Anchor for the header's jump button (e.g. "final-designs"). */
      id?: string;
      eyebrow: string;
      title: string;
      body?: string;
      media?: ShowcaseMedia[];
    }
  | { type: "result"; eyebrow: string; title: string; paragraphs: string[]; signOff?: string };

export type Showcase = {
  slug: string;
  title: string;
  skillTags: string[];
  /** Optional: the header skips the paragraph when it is missing. */
  description?: string;
  /** Optional header button that jumps down the page (e.g. "Skip to final design"). */
  jump?: { label: string; href: `#${string}` };
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
