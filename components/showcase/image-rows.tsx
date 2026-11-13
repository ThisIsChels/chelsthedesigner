import Image from "next/image";
import { ImageFrame } from "@/components/image-frame";
import type { CaseStudyImage } from "@/lib/case-studies";

// Stacked rows of images, lg (24) apart (Who'd We Get?). Every image in a row
// comes out the same height: flex-grow follows each image's aspect ratio, so
// widths follow proportions and nothing is cropped. Rows stay side by side
// at every size. `frame` adds the ImageFrame border; unframed images (art
// with their own edges or transparent backgrounds) just get 8px corners.
// `maxWidth` (px) centers a narrower stack, e.g. the Upgrade cover at 610.

type ImageRowsProps = { rows: CaseStudyImage[][]; frame?: boolean; maxWidth?: number };

export function ImageRows({ rows, frame = false, maxWidth }: ImageRowsProps) {
  const width = maxWidth ?? 1256;
  return (
    <div className="mx-auto flex w-full flex-col gap-6" style={{ maxWidth }}>
      {rows.map((row, i) => {
        const totalRatio = row.reduce((sum, img) => sum + img.width / img.height, 0);
        return (
          <div key={i} className="flex gap-3 md:gap-6">
            {row.map((image) => {
              const ratio = image.width / image.height;
              // Share of the row's width, for next/image to pick a file size.
              const sizes = `(min-width: ${width}px) ${Math.round((width * ratio) / totalRatio)}px, ${Math.round((100 * ratio) / totalRatio)}vw`;
              return (
                // ×100: flex-grow values adding up to less than 1 (e.g. one portrait
                // image) would only fill part of the row.
                <div key={image.src} className="min-w-0" style={{ flex: `${ratio * 100} 1 0` }}>
                  {frame ? (
                    <ImageFrame image={image} sizes={sizes} />
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes={sizes}
                      className="block h-auto w-full rounded-lg"
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
