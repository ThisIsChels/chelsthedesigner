// Server-only: case study pages from content/case-studies/<slug>.mdx.
// The frontmatter holds the whole page; orbit.mdx documents the block types.

import { publishedSlugs, readPublished } from "@/lib/published";

export type CaseStudyImage = { src: string; alt: string; width: number; height: number };

export type GalleryScreen = CaseStudyImage & { key: string };
/** A card: eyebrow and body/list are optional. `wide` = full row, split like a section header. */
export type CardItem = { eyebrow?: string; title: string; body?: string; list?: string[]; wide?: boolean };
export type GalleryNote = { screen: string; text: string; arrowY: number };
export type GalleryGroup = { title: string; screens: string[]; note?: GalleryNote };
export type PaletteLabel = { text: string; side: "left" | "right"; y: number };

export type CaseStudyMedia =
  | ({ type: "image"; frame?: boolean; panel?: "inverse" | "white" } & CaseStudyImage)
  | { type: "image-grid"; columns: number; images: CaseStudyImage[] }
  | { type: "video"; src: string; label: string; width: number; height: number }
  | { type: "subsections"; items: { title: string; body: string; image: CaseStudyImage }[] }
  | { type: "palette"; title: string; body: string; image: CaseStudyImage; labels: PaletteLabel[] }
  | { type: "pinned-gallery"; screens: GalleryScreen[]; groups: GalleryGroup[]; framed?: boolean }
  | { type: "cards"; items: CardItem[] }
  | { type: "text"; title: string; body: string; link?: { label: string; href: string } };

type TextBlock = { eyebrow: string; title: string; body: string };

export type CaseStudyBlock =
  | ({ type: "section"; media?: CaseStudyMedia[] } & TextBlock)
  | { type: "cards"; items: CardItem[] }
  | ({ type: "result" } & TextBlock);

export type DetailValue = { title: string; body: string; list?: string[] };

export type CaseStudy = {
  slug: string;
  title: string;
  heroImage: { src: string; alt: string };
  skillTags: string[];
  overview: string;
  /** `value` is plain text, or a title + paragraph with an optional bullet list beside it. */
  infoBoxes: { label: string; value: string | DetailValue }[];
  sections: CaseStudyBlock[];
  /** "Keep exploring" project slugs. */
  related?: string[];
};

export function getCaseStudy(slug: string): CaseStudy | null {
  const data = readPublished("case-studies", slug);
  // Trusts the frontmatter shape; a typo shows up as a broken page in dev.
  return data ? ({ slug, ...data } as CaseStudy) : null;
}

export const getCaseStudySlugs = () => publishedSlugs("case-studies");
