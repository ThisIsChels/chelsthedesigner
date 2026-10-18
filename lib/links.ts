// Every URL the site links to, in one place.

export const NAV_LINKS = [
  { label: "portfolio", href: "/portfolio" },
  { label: "services", href: "/services" },
  { label: "about", href: "/about" },
  { label: "shop", href: "/shop" },
  { label: "notes", href: "/notes" },
] as const;

export const EXTERNAL = {
  instagram: "https://www.instagram.com/chelsthedesigner/",
  upwork: "https://www.upwork.com/freelancers/~01f7fffebfcf9109f6",
  linkedin: "https://www.linkedin.com/in/chelsey-lapointe-9950a41a4/",
  // [PLACEHOLDER: resume URL]
  resume: undefined,
} as const;
