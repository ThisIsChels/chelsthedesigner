import { useSyncExternalStore } from "react";

// Live result of a CSS media query, e.g. useMediaQuery("(min-width: 1024px)").
// Re-renders when it changes. Always false while server rendering, so only
// use it for things that can settle after the page loads.
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * The visitor's prefers-reduced-motion setting. Use this rather than Motion's
 * useReducedMotion: that one didn't re-render the booklet carousel when the
 * setting was on, so its pause/play label showed the wrong state.
 */
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
