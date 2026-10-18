"use client";

// Client component: the typing runs in the browser (timers, sessionStorage).
//
// Renders inside a heading — the heading keeps its own style, e.g.
//   <h1 className="type-display-xl"><Typewriter sequence={…} /></h1>
//
// Three layers:
// 1. sr-only final text → what screen readers read ("portfolio"), never the
//    half-typed or misspelled versions.
// 2. An invisible copy of the final text + cursor → reserves the exact space,
//    so nothing moves while typing.
// 3. The visible animated text + cursor, stacked on top of (2), aria-hidden.

import { finalText, useTypewriter, type TypewriterStep } from "@/hooks/use-typewriter";
import { cn } from "@/lib/utils";

type TypewriterProps = {
  sequence: TypewriterStep[];
  /** Optional. Set it (unique per use) to play only once per browser session;
   *  leave it out to play on every page load. */
  storageKey?: string;
  className?: string;
};

export function Typewriter({ sequence, storageKey, className }: TypewriterProps) {
  const { text, busy, animated } = useTypewriter(sequence, storageKey);
  const full = finalText(sequence);

  return (
    <span className={className}>
      <span className="sr-only">{full}</span>
      <span aria-hidden className="inline-grid">
        <span className="invisible col-start-1 row-start-1">
          {full}
          <Cursor />
        </span>
        <span className="col-start-1 row-start-1">
          {text}
          {/* No cursor when the animation was skipped: just the word. */}
          {animated && <Cursor blinking={!busy} />}
        </span>
      </span>
    </span>
  );
}

/** Thin bar, taller than the capitals like a text-field caret: it reaches
 *  a bit above the letters and dips a bit below the baseline. Solid while
 *  typing, blinks at rest. Negative vertical margins keep it from making
 *  the line taller, so the heading's height doesn't change. */
function Cursor({ blinking = false }: { blinking?: boolean }) {
  return (
    <span
      className={cn(
        "-my-[0.14em] ml-[0.06em] inline-block h-[1em] w-[0.06em] bg-current align-baseline",
        blinking && "animate-blink",
      )}
    />
  );
}
