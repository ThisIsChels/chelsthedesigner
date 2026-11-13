import { ImageFrame } from "@/components/image-frame";
import type { FramedImage } from "@/lib/showcases";

// Side-by-side columns of framed images (e.g. moodboard beside two
// Illustrator screenshots; poster beside its photo). A column with one image
// shows it whole and sets the row's height; a column with several stacks
// them and, from md, crops them to share that height. Stacked on phones.
// Columns are equal width by default. `proportional` (Upgrade): from md each
// column's width follows its images' aspect ratio (a stack counts as one tall
// image), so every column comes out the same height with almost no cropping.

/** Width ÷ height of a column; a stack's heights add up. */
const columnRatio = (images: FramedImage[]) => 1 / images.reduce((sum, img) => sum + img.height / img.width, 0);

type FramedColumnsProps = { columns: FramedImage[][]; proportional?: boolean };

export function FramedColumns({ columns, proportional = false }: FramedColumnsProps) {
  const sizes = `(min-width: 768px) ${Math.round(100 / columns.length)}vw, 100vw`;

  if (proportional) {
    return (
      <div className="flex flex-col gap-6 md:flex-row">
        {columns.map((images, i) => (
          <div
            key={i}
            className="flex min-w-0 flex-col gap-6 md:flex-[var(--ratio)_1_0]"
            // ×100 so the grow values never add up to less than 1 (that would leave the row partly empty).
            style={{ "--ratio": columnRatio(images) * 100 } as React.CSSProperties}
          >
            {images.length === 1 ? (
              <ImageFrame image={images[0]} chip={images[0].chip} sizes={sizes} />
            ) : (
              // In a stack each image's share of the height follows its own
              // proportions; it fills (and, given the gaps, barely crops) that share.
              images.map((image) => (
                <div
                  key={image.src}
                  className="min-h-0 md:flex-[var(--share)_1_0]"
                  style={{ "--share": (image.height / image.width) * 100 } as React.CSSProperties}
                >
                  <ImageFrame image={image} chip={image.chip} sizes={sizes} fillFromMd className="md:h-full" />
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:auto-cols-fr md:grid-flow-col">
      {columns.map((images, i) =>
        images.length === 1 ? (
          <ImageFrame key={i} image={images[0]} chip={images[0].chip} sizes={sizes} />
        ) : (
          <div key={i} className="flex flex-col gap-6">
            {images.map((image) => (
              <ImageFrame
                key={image.src}
                image={image}
                chip={image.chip}
                sizes={sizes}
                fillFromMd
                className="md:flex-1"
              />
            ))}
          </div>
        ),
      )}
    </div>
  );
}
