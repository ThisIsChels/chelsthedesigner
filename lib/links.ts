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
  // Google Drive file (sharing must stay "Anyone with the link").
  resume: "https://drive.google.com/file/d/1r_1zZq3qFMY3tdzD1YA8_2g0IB_wqq36/view",
  // Formspree form (messages go to the address set in the Formspree dashboard).
  contactForm: "https://formspree.io/f/xoedvkza",
} as const;
