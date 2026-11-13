// Shared by the nav bar and the phone menu overlay so the logo and its
// padding line up exactly whether the menu is open or closed.
//
// Resting: Figma size (logo 156×80, top padding 3xl; xl on phones).
// Compact (scrolled): logo at half size (78×40), 16px above and below.

export const barPadding = (compact: boolean) =>
  compact ? "py-4" : "pt-8 md:pt-16";

export const logoSize = (compact: boolean) =>
  compact ? "h-10 w-19.5" : "h-20 w-39";

/** Space the resting bar takes up: top padding + 80px logo. */
export const barHeight = "h-28 md:h-36";
