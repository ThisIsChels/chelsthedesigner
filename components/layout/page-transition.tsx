import { ViewTransition } from "react";

// Smooth page-to-page navigation using React's <ViewTransition> (the
// browser's View Transitions API). Next.js route changes are React
// transitions, so this plays automatically on every in-site link.
//
// Wrap everything on a page EXCEPT the SiteHeader — the header is anchored
// separately (see `view-transition-name: site-header` in globals.css) so it
// stays put while the content changes underneath. The animation itself
// (`page-enter` / `page-exit`) is defined in globals.css.
//
// Browsers without support just swap pages instantly, as before.
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
