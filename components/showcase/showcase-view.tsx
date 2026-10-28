import { AutoScrollCarousel } from "@/components/auto-scroll-carousel";
import { ImageFrame } from "@/components/image-frame";
import { Container } from "@/components/layout/container";
import { OutcomeBox } from "@/components/outcome-box";
import { ProjectPageHeader } from "@/components/project-page-header";
import { SectionHeader } from "@/components/section-header";
import { ArtworkGallery } from "@/components/showcase/artwork-gallery";
import { DetailColumns } from "@/components/showcase/detail-columns";
import { FramedColumns } from "@/components/showcase/framed-columns";
import { StampGrid } from "@/components/showcase/stamp-grid";
import { buttonVariants } from "@/components/ui/button";
import { sectionGap } from "@/lib/layout";
import type { Showcase, ShowcaseBlock, ShowcaseMedia } from "@/lib/showcases";
import { cn } from "@/lib/utils";

// Body of a showcase page (Figma `/portfolio/digital-illustrations-showcase`,
// `/portfolio/fifty-ways-to-have-fun-showcase`): centered title, tags and
// description, then the .mdx blocks. Blocks bring their own Container so the
// booklet carousel can run to the screen edge.
export function ShowcaseView({ showcase }: { showcase: Showcase }) {
  return (
    <div className={`flex flex-col ${sectionGap}`}>
      <Container>
        <ProjectPageHeader title={showcase.title} tags={showcase.skillTags} description={showcase.description} />
      </Container>

      {showcase.blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ShowcaseBlock }) {
  switch (block.type) {
    case "gallery":
      return (
        <Container>
          <ArtworkGallery rows={block.rows} />
        </Container>
      );
    case "details":
      return (
        <Container>
          <DetailColumns items={block.items} />
        </Container>
      );
    case "image":
      // The cover sits just under the header, so it loads right away.
      return (
        <Container>
          <ImageFrame image={block} sizes="(min-width: 1512px) 1256px, 100vw" eager />
        </Container>
      );
    case "section":
      return (
        <section className="flex flex-col gap-12">
          <Container>
            <SectionHeader layout="inline" eyebrow={block.eyebrow} title={block.title} body={block.body} />
          </Container>
          {block.media?.map((media, i) => <Media key={i} media={media} />)}
        </section>
      );
    case "result":
      return (
        <Container>
          <OutcomeBox layout="centered" {...block} />
        </Container>
      );
  }
}

function Media({ media }: { media: ShowcaseMedia }) {
  switch (media.type) {
    case "columns":
      return (
        <Container>
          <FramedColumns columns={media.columns} />
        </Container>
      );
    case "stamps":
      return (
        <Container>
          <StampGrid {...media} />
        </Container>
      );
    case "booklet":
      return (
        <div className="flex flex-col gap-8">
          <AutoScrollCarousel images={media.pages} hint={media.hint} label="Booklet pages" />
          {media.pdf && media.buttonLabel && (
            <Container>
              <a
                href={media.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg", shape: "pill" }), "uppercase")}
              >
                {media.buttonLabel}
              </a>
            </Container>
          )}
        </div>
      );
  }
}
