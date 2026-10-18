// Figma `scrolling-row`: full-bleed band of words with Tranquility dots,
// scrolling left on a loop. Pure CSS (no Framer Motion needed). Stops for
// prefers-reduced-motion.

const REPEATS = 3; // enough copies of the word set to cover wide screens

export function Marquee({ words }: { words: readonly string[] }) {
  const items = Array.from({ length: REPEATS }, () => words).flat();

  return (
    <div className="overflow-hidden">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 items-center gap-16 pr-16 type-heading-lg uppercase"
          >
            {items.map((word, i) => (
              <li key={i} className="flex items-center gap-16">
                <span aria-hidden className="size-8 shrink-0 rounded-full bg-accent-tertiary" />
                {word}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
