"use client";

// Client component: needs a click handler to scroll smoothly.
//
// In-page jump button (Tranquility pill, lg), e.g. "Skip to final design".
// Smooth-scrolls to the target section (instant under prefers-reduced-motion;
// the section's scroll-mt clears the pinned nav), updates the URL hash, and
// moves keyboard focus there. Without JS it's a plain #anchor link.

import { buttonVariants } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type JumpButtonProps = { href: `#${string}`; children: React.ReactNode; className?: string };

export function JumpButton({ href, children, className }: JumpButtonProps) {
  const reducedMotion = usePrefersReducedMotion();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", href);
    // Focus without a second jump, so Tab continues from the section.
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(buttonVariants({ tone: "tranquility", shape: "pill" }), "uppercase", className)}
    >
      {children}
    </a>
  );
}
