// Server-only: reads case study pages from content/case-studies/<slug>.mdx.
// The frontmatter holds the whole page; orbit.mdx documents the block types.
// Only files with `published: true` get a page.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type CaseStudyImage = { src: string; alt: string; width: number; height: number };

export type GalleryScreen = CaseStudyImage & { key: string };
export type GalleryNote = { screen: string; text: string; arrowY: number };
export type GalleryGroup = { title: string; screens: string[]; note?: GalleryNote };
export type PaletteLabel = { text: string; side: "left" | "right"; y: number };

export type CaseStudyMedia =
  | ({ type: "image" } & CaseStudyImage)
  | { type: "video"; src: string; label: string; width: number; height: number }
  | { type: "subsections"; items: { title: string; body: string; image: CaseStudyImage }[] }
  | { type: "palette"; title: string; body: string; image: CaseStudyImage; labels: PaletteLabel[] }
  | { type: "pinned-gallery"; screens: GalleryScreen[]; groups: GalleryGroup[] };

type TextBlock = { eyebrow: string; title: string; body: string };

export type CaseStudyBlock =
  | ({ type: "section"; media?: CaseStudyMedia[] } & TextBlock)
  | { type: "cards"; items: TextBlock[] }
  | ({ type: "result" } & TextBlock);

export type CaseStudy = {
  slug: string;
  title: string;
  heroImage: { src: string; alt: string };
  skillTags: string[];
  overview: string;
  infoBoxes: { label: string; value: string }[];
  sections: CaseStudyBlock[];
};

const DIR = path.join(process.cwd(), "content", "case-studies");

export function getCaseStudy(slug: string): CaseStudy | null {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const data = matter(fs.readFileSync(file, "utf8")).data;
  // Trusts the frontmatter shape; a typo shows up as a broken page in dev.
  return data.published === true ? ({ slug, ...data } as CaseStudy) : null;
}

export function getCaseStudySlugs(): string[] {
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .filter((slug) => getCaseStudy(slug) !== null);
}
