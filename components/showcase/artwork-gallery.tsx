import { ArtworkCard } from "@/components/showcase/artwork-card";
import type { Artwork } from "@/lib/showcases";

// Figma `gallery` on showcase pages. From lg: one flex row per mdx row, each
// artwork's flex-grow set to its aspect ratio so the whole row comes out one
// height (nothing cropped). Below lg the rows dissolve (`display: contents`)
// into a 2-column grid, 1 column on phones.
export function ArtworkGallery({ rows }: { rows: Artwork[][] }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-2 lg:flex lg:flex-col lg:gap-12">
      {rows.map((row, i) => (
        <div key={i} className="contents lg:flex lg:items-start lg:gap-6">
          {row.map((artwork) => (
            <ArtworkCard
              key={artwork.src}
              artwork={artwork}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="lg:flex-[var(--ratio)_1_0]"
              style={{ "--ratio": artwork.width / artwork.height } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
