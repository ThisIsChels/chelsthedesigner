import { cn } from "@/lib/utils";

// Figma component `callout`: an arrow pointing left at the screen before it,
// plus a short note. `arrowY` (0–1) is how far down the screen the arrow
// lands; the note's first line lines up with it.
//
// Open/close animation lives in globals.css (`.callout`): the width opens
// first, then the arrow draws in and the note fades up; closing reverses it.
// Rendered with `open` from the start, it just shows (no animation).

type CalloutProps = { text: string; arrowY: number; open: boolean; className?: string; group?: number };

export function Callout({ text, arrowY, open, className, group }: CalloutProps) {
  return (
    <div data-open={open} data-group={group} className={cn("callout relative shrink-0 self-stretch overflow-clip", className)}>
      <div
        className="absolute left-0 flex items-start gap-4 pl-8 type-heading-md-medium"
        style={{ top: `calc(${arrowY * 100}% - 0.6em)` }}
      >
        {/* Wrapper is one line tall so the arrow sits on the note's first line. */}
        <span className="flex h-[1.2em] items-center">
          <svg className="callout-arrow w-29 text-text-primary" viewBox="0 0 118 16" fill="none" aria-hidden="true">
            {/* Drawn right to left, so the arrow's tip appears last. */}
            <path
              d="M117 8H1.5M7.5 2L1.5 8l6 6"
              pathLength={1}
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="callout-note w-65">{text}</p>
      </div>
    </div>
  );
}
