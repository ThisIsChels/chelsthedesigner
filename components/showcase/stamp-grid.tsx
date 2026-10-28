"use client";

// Client component: the searchable Fifty Stamps grid (Figma `section /
// stamps` + its interaction note).
// - A to Z grid: 5 columns on phones, 8 from md, 10 from lg.
// - Click a stamp to open it as a 2x2 block; the others reflow around it
//   (Motion layout animation, 250ms). One open at a time; click it again,
//   click another, or press Esc to close. A stamp in the last column opens
//   one column to the left so the block fits (the stamp before it moves to
//   the next row).
// - Search fades non-matching states to 25%; Enter with a single match
//   scrolls to it and opens it.
// - The closed grid loads small images; only the open stamp asks for a
//   large one (its `sizes` changes).

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Stamp } from "@/components/showcase/stamp";
import { SearchField } from "@/components/ui/search-field";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import type { StampSet } from "@/lib/showcases";
import { cn } from "@/lib/utils";

/** "New Hampshire" → "new-hampshire" (stamp file names). */
const kebab = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

const SIZES = {
  closed: "(min-width: 1024px) 10vw, (min-width: 768px) 12vw, 20vw",
  open: "(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 40vw",
};

/** Columns at the current width (matches the grid classes below). */
function useColumns() {
  const lg = useMediaQuery("(min-width: 1024px)");
  const md = useMediaQuery("(min-width: 768px)");
  return lg ? 10 : md ? 8 : 5;
}

export function StampGrid({ searchLabel, countLabel, dir, width, height, items }: StampSet) {
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const columns = useColumns();
  const reduceMotion = usePrefersReducedMotion();
  const buttons = useRef(new Map<string, HTMLButtonElement>());

  const search = query.trim().toLowerCase();
  const matches = items.filter((item) => item.state.toLowerCase().includes(search));
  const isMatch = (state: string) => !search || matches.some((m) => m.state === state);

  // Esc closes the open stamp.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const openFromSearch = () => {
    if (matches.length !== 1) return;
    const { state } = matches[0];
    setOpen(state);
    buttons.current.get(state)?.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchField
          label={searchLabel}
          value={query}
          onChange={setQuery}
          onSubmit={openFromSearch}
          className="w-full md:w-105"
        />
        <p className="type-body">{countLabel}</p>
        <p className="sr-only" aria-live="polite">
          {search ? `${matches.length} ${matches.length === 1 ? "stamp matches" : "stamps match"}` : ""}
        </p>
      </div>

      <ul className="grid grid-cols-5 gap-x-3 gap-y-4 md:grid-cols-8 lg:grid-cols-10">
        {items.map((item, index) => {
          const expanded = open === item.state;
          // The 2x2 block is pinned to the stamp's own row and column (1-based),
          // one column left if it's in the last column. Pinned items are placed
          // first, and the rest fill the free cells around it in A-Z order.
          const row = Math.floor(index / columns) + 1;
          const column = Math.min(index % columns, columns - 2) + 1;

          return (
            <motion.li
              key={item.state}
              layout
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
              style={expanded ? { gridColumn: `${column} / span 2`, gridRow: `${row} / span 2` } : undefined}
              className={cn(
                "transition-opacity duration-150 ease-out",
                isMatch(item.state) ? "opacity-100" : "opacity-25",
                expanded && "relative z-10",
              )}
            >
              <button
                ref={(el) => {
                  if (el) buttons.current.set(item.state, el);
                }}
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : item.state)}
                className={cn("group block w-full", expanded ? "cursor-zoom-out" : "cursor-zoom-in")}
              >
                <Stamp
                  src={`${dir}/${kebab(item.state)}.webp`}
                  alt={`${item.state} stamp: ${item.cocktail}`}
                  width={width}
                  height={height}
                  expanded={expanded}
                  sizes={expanded ? SIZES.open : SIZES.closed}
                />
              </button>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
