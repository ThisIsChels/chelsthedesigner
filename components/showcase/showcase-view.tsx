import { Container } from "@/components/layout/container";
import { ArtworkGallery } from "@/components/showcase/artwork-gallery";
import { Tag } from "@/components/ui/tag";
import { sectionGap } from "@/lib/layout";
import type { Showcase } from "@/lib/showcases";

// Body of a showcase page (Figma `/portfolio/digital-illustrations-showcase`):
// centered title, tags and description, then the gallery.
export function ShowcaseView({ showcase }: { showcase: Showcase }) {
  return (
    <Container className={`flex flex-col ${sectionGap}`}>
      <header className="flex flex-col items-center gap-6 text-center">
        <h1 className="type-display-sm">{showcase.title}</h1>
        <ul className="flex flex-wrap justify-center gap-3">
          {showcase.skillTags.map((tag) => (
            <li key={tag}>
              <Tag size="lg">{tag}</Tag>
            </li>
          ))}
        </ul>
        <p className="type-body-xl">{showcase.description}</p>
      </header>

      <ArtworkGallery rows={showcase.gallery} />
    </Container>
  );
}
