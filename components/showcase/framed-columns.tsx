import { ImageFrame } from "@/components/image-frame";
import type { FramedImage } from "@/lib/showcases";

// Side-by-side columns of framed images (e.g. moodboard beside two
// Illustrator screenshots; poster beside its photo). A column with one image
// shows it whole and sets the row's height; a column with several stacks
// them and, from md, crops them to share that height. Stacked on phones.
export function FramedColumns({ columns }: { columns: FramedImage[][] }) {
  const sizes = `(min-width: 768px) ${Math.round(100 / columns.length)}vw, 100vw`;

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
