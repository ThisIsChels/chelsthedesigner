// Portfolio categories and the tags each one filters by (CLAUDE.md →
// Portfolio filters). Safe to import from client components.

export type Category = "ux" | "visual";

export const CATEGORIES: { id: Category; label: string; tags: string[] }[] = [
  { id: "ux", label: "UI/UX DESIGN", tags: ["Mobile", "Website", "Development"] },
  { id: "visual", label: "VISUAL DESIGN", tags: ["Branding", "Illustration", "Print", "Graphic"] },
];

export type Project = {
  slug: string;
  title: string;
  category: Category;
  tags: string[];
  thumbnail: string;
  thumbnailAlt: string;
  href: string;
};
