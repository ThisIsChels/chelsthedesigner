import Image from "next/image";
import { Card } from "@/components/case-study/card";
import { LoopingVideo } from "@/components/case-study/looping-video";
import { PinnedGallery } from "@/components/case-study/pinned-gallery";
import { ImageFrame } from "@/components/image-frame";
import { Container } from "@/components/layout/container";
import { OutcomeBox } from "@/components/outcome-box";
import { SectionHeader } from "@/components/section-header";
import type { CaseStudyBlock, CaseStudyMedia, PaletteLabel } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

// One block of a case study (see the block types at the top of orbit.mdx).
// Each block brings its own Container so the pinned gallery can run
// edge to edge while everything else stays in the 1256px column.

const fullWidth = "(min-width: 1512px) 1256px, 100vw";

export function CaseStudySection({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "section":
      return (
        <section className="flex flex-col gap-12">
          <Container>
            <div className="border-t border-text-primary pt-8">
              <SectionHeader eyebrow={block.eyebrow} title={block.title} body={block.body} />
            </div>
          </Container>
          {block.media?.map((media, i) =>
            media.type === "pinned-gallery" ? (
              <PinnedGallery key={i} screens={media.screens} groups={media.groups} />
            ) : (
              <Container key={i}>
                <Media media={media} />
              </Container>
            ),
          )}
        </section>
      );
    case "cards":
      return (
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {block.items.map((item) => (
              <Card key={item.title} {...item} />
            ))}
          </div>
        </Container>
      );
    case "result":
      return (
        <Container>
          <OutcomeBox layout="split" eyebrow={block.eyebrow} title={block.title} paragraphs={[block.body]} />
        </Container>
      );
  }
}

function Media({ media }: { media: Exclude<CaseStudyMedia, { type: "pinned-gallery" }> }) {
  switch (media.type) {
    case "image":
      return <ImageFrame image={media} sizes={fullWidth} />;
    case "video":
      return <LoopingVideo {...media} />;
    case "subsections":
      // Side by side from md. flex-grow follows each image's aspect ratio,
      // so both images come out the same height (Figma: 577 + 624 wide).
      return (
        <div className="flex flex-col gap-12 md:flex-row">
          {media.items.map(({ title, body, image }) => (
            <div
              key={title}
              className="flex flex-col gap-6 md:flex-[var(--ratio)_1_0]"
              style={{ "--ratio": image.width / image.height } as React.CSSProperties}
            >
              <ImageFrame image={image} sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="flex flex-col gap-3">
                <h3 className="type-heading-md-medium">{title}</h3>
                <p className="type-body-xl">{body}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "palette":
      return <Palette {...media} />;
  }
}

/** Figma `palette-row`: Color Scheme text beside the swatch column and its labels. */
function Palette({ title, body, image, labels }: Extract<CaseStudyMedia, { type: "palette" }>) {
  return (
    <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-24">
      <div className="flex flex-col gap-6 md:w-[541px] md:shrink">
        <h3 className="type-heading-md-medium">{title}</h3>
        <p className="type-body-xl">{body}</p>
      </div>
      <div className="flex justify-center gap-4 md:gap-8">
        <PaletteLabels labels={labels.filter((l) => l.side === "left")} align="right" />
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="232px"
          className="h-auto w-28 shrink-0 rounded-lg border border-text-primary md:w-58"
        />
        <PaletteLabels labels={labels.filter((l) => l.side === "right")} align="left" />
      </div>
    </div>
  );
}

/** Labels next to the swatches. `y` 0 = top-aligned, 0.5 = centered, 1 = bottom-aligned. */
function PaletteLabels({ labels, align }: { labels: PaletteLabel[]; align: "left" | "right" }) {
  return (
    // Width comes from an invisible copy of the labels; the real ones are positioned.
    <div className={cn("relative type-heading-sm", align === "right" && "text-right")}>
      <div className="invisible flex flex-col" aria-hidden="true">
        {labels.map((l) => (
          <span key={l.text} className="whitespace-nowrap">
            {l.text}
          </span>
        ))}
      </div>
      {labels.map((l) => (
        <span
          key={l.text}
          className="absolute inset-x-0 whitespace-nowrap"
          style={{ top: `${l.y * 100}%`, transform: `translateY(-${l.y * 100}%)` }}
        >
          {l.text}
        </span>
      ))}
    </div>
  );
}
