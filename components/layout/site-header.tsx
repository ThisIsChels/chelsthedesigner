"use client";

// Client component: it listens to scroll to (1) switch the bar to compact and
// (2) match the bar's colors to whatever is underneath it.
//
// The bar is `fixed` (pinned to the top). The outer div is a placeholder that
// keeps the resting bar's height in the page flow, so shrinking the bar never
// moves the content underneath.
//
// Tone matching: full-width sections mark their background with
// `data-surface="inverse"` (charcoal) or `data-surface="base"` (Cararra). On
// scroll, the bar looks at the point just below its bottom edge and takes the
// nearest marked section's tone. Unmarked areas count as Cararra.

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import { NavBar } from "@/components/layout/nav-bar";
import { barHeight, barPadding } from "@/components/layout/nav-sizes";
import { cn } from "@/lib/utils";

type Tone = "default" | "inverse";

const surfaceClass = (tone: Tone) => (tone === "inverse" ? "surface-inverse" : "bg-surface-base");

// The border is always there (transparent unless scrolled on Cararra) so
// switching states never changes the bar's height by 1px.
const borderClass = (tone: Tone, compact: boolean) =>
  tone === "default" && compact ? "border-text-primary" : "border-transparent";

/** Tone of whatever sits just below the header's bottom edge. */
function toneBelow(header: HTMLElement): Tone {
  const y = header.getBoundingClientRect().bottom + 1;
  const below = document.elementsFromPoint(window.innerWidth / 2, y).find((el) => !header.contains(el));
  return below?.closest<HTMLElement>("[data-surface]")?.dataset.surface === "inverse" ? "inverse" : "default";
}

/** Tone of the page at the top. Usually "default"; the homepage hero is "inverse". */
export function SiteHeader({ tone: initialTone = "default" }: { tone?: Tone }) {
  const headerRef = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(false);
  const [tone, setTone] = useState<Tone>(initialTone);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncTone = () => setTone(toneBelow(header));
    const onScroll = () => {
      setCompact(window.scrollY > 0);
      syncTone();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // The bar's height animates when it goes compact; re-check once it settles.
    header.addEventListener("transitionend", syncTone);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      header.removeEventListener("transitionend", syncTone);
    };
  }, []);

  // Same re-check when there's no animation (reduced motion): runs after the
  // compact layout has rendered.
  useEffect(() => {
    if (headerRef.current) setTone(toneBelow(headerRef.current));
  }, [compact]);

  return (
    <div data-surface={initialTone === "inverse" ? "inverse" : "base"} className={cn(barHeight, surfaceClass(initialTone))}>
      <header
        ref={headerRef}
        // Named so page transitions keep the bar still (see globals.css).
        style={{ viewTransitionName: "site-header" }}
        className={cn("fixed inset-x-0 top-0 z-40 border-b transition-colors", surfaceClass(tone), borderClass(tone, compact))}
      >
        <Container className={cn("transition-[padding]", barPadding(compact))}>
          <NavBar tone={tone} compact={compact} />
        </Container>
      </header>
    </div>
  );
}
