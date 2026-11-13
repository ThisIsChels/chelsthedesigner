"use client";

// Client component: flips cards on click, watches the section for the
// one-time intro hint, and measures an open card to keep it on screen.
//
// Balance postcards (Figma `section / balance` + `annotation /
// balance-postcards`). Thirteen tilted cards scattered on a "table"; styles
// live in globals.css (.postcard*).
// - Hover (mouse): the card rises above the others, keeps its tilt.
// - Click / tap / Enter / Space: 3D flip to the back (600ms). One card open
//   at a time; the open card stays on top and is nudged into view if it
//   hangs off the screen. Esc or a second click flips it back.
// - First time the table is 40% visible, Futurism flips over and back once,
//   unless someone has already touched a card. Never under reduced motion.
// - Reduced motion: no turn, a quick crossfade between front and back.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import type { Postcard } from "@/lib/showcases";

/** Figma's table and card size (px); positions in the .mdx use this space. */
const TABLE = { width: 1256, height: 950 };
const CARD_WIDTH = 340;
/** Intro hint: how long the card stays turned before flipping back. */
const HINT_HOLD_MS = 900;
/** Keep an open card at least this far from the screen edge. */
const EDGE = 8;

type PostcardTableProps = { dir: string; cards: Postcard[] };

export function PostcardTable({ dir, cards }: PostcardTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const touched = useRef(false);
  const [open, setOpen] = useState<string | null>(null);
  // Sideways shift for the open card, tagged with its name so a stale value
  // never applies to a different card.
  const [nudge, setNudge] = useState<{ name: string; px: number } | null>(null);
  const nudgeRef = useRef(nudge);
  useEffect(() => {
    nudgeRef.current = nudge;
  });
  const reducedMotion = usePrefersReducedMotion();
  const hintZone = useInView(tableRef, { once: true, amount: 0.4 });

  const toggle = (name: string) => {
    touched.current = true;
    setOpen((current) => (current === name ? null : name));
  };

  // Intro hint, once.
  useEffect(() => {
    if (!hintZone || reducedMotion || touched.current) return;
    const first = cards[0]?.name;
    setOpen(first);
    const timer = setTimeout(() => {
      if (!touched.current) setOpen(null);
    }, 600 + HINT_HOLD_MS);
    return () => clearTimeout(timer);
    // Runs when the table first comes into view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hintZone]);

  // Esc flips the open card back.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Nudge an open card back onto the screen if it hangs off an edge.
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      const rect = cardRefs.current.get(open)?.getBoundingClientRect();
      if (!rect) return;
      // Measure from the card's own spot, without a nudge left over from
      // the last time it was open.
      const applied = nudgeRef.current?.name === open ? nudgeRef.current.px : 0;
      const left = rect.left - applied;
      const rightEdge = rect.right - applied;
      const right = document.documentElement.clientWidth - EDGE;
      if (left < EDGE) setNudge({ name: open, px: EDGE - left });
      else if (rightEdge > right) setNudge({ name: open, px: right - rightEdge });
      else setNudge(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  return (
    <div
      ref={tableRef}
      className="relative grid grid-cols-2 gap-3 md:block md:aspect-[1256/950]"
    >
      {cards.map((card) => {
        const isOpen = open === card.name;
        return (
          <button
            key={card.name}
            ref={(el) => {
              if (el) cardRefs.current.set(card.name, el);
            }}
            type="button"
            aria-pressed={isOpen}
            aria-label={isOpen ? `Postcard back: “${card.verse}”` : frontAlt(card.word)}
            onClick={() => toggle(card.name)}
            className="postcard"
            style={
              {
                "--x": `${(card.x / TABLE.width) * 100}%`,
                "--y": `${(card.y / TABLE.height) * 100}%`,
                "--w": `${(CARD_WIDTH / TABLE.width) * 100}%`,
                "--r": `${card.rotate}deg`,
                "--z": card.z,
                ...(isOpen && nudge?.name === card.name ? { "--nudge": `${nudge.px}px` } : {}),
              } as React.CSSProperties
            }
          >
            <span className="postcard-inner">
              <Face src={`${dir}/${card.name}-front.webp`} side="front" />
              <Face src={`${dir}/${card.name}-back.webp`} side="back" />
            </span>
          </button>
        );
      })}
    </div>
  );
}

const frontAlt = (word: string) => `Postcard front: a cracked-glass collage in teal and rust with “${word}” in large white letters`;

/** One side of a card. The button carries the description, so the image is decorative. */
function Face({ src, side }: { src: string; side: "front" | "back" }) {
  return (
    <span className="postcard-face" data-side={side}>
      <Image src={src} alt="" fill sizes="(min-width: 768px) 27vw, 50vw" className="object-cover" />
    </span>
  );
}
