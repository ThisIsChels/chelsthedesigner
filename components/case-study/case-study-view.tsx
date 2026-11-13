import Image from "next/image";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { DetailRow } from "@/components/case-study/detail-row";
import { Container } from "@/components/layout/container";
import { Tag } from "@/components/ui/tag";
import type { CaseStudy } from "@/lib/case-studies";

// Body of a case study page (Figma `/portfolio/orbit-caseStudy`): header,
// Project Details, then the mdx blocks. Blocks bring their own Container
// (see CaseStudySection) so the Final Designs gallery can run full width.

/** Between the header, Project Details and each block (Figma: 64). */
const articleGap = "gap-12 md:gap-16";

export function CaseStudyView({ study }: { study: CaseStudy }) {
  return (
    <article className={`flex flex-col ${articleGap}`}>
      <Container className={`flex flex-col ${articleGap}`}>
        {/* Header: stacks below md (image under the text). */}
        <header className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-24">
          <div className="flex flex-1 flex-col gap-8 md:gap-16">
            <div className="flex flex-col items-start gap-8">
              <h1 className="type-display-md">{study.title}</h1>
              <ul className="flex flex-wrap gap-2">
                {study.skillTags.map((tag) => (
                  <li key={tag}>
                    <Tag size="lg">{tag}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <p className="type-body-xl">{study.overview}</p>
          </div>
          {/* Figma: 421 × 316 (4:3). */}
          <div className="relative aspect-4/3 shrink-0 overflow-hidden rounded-lg border border-text-primary md:w-2/5 lg:w-[421px]">
            <Image
              src={study.heroImage.src}
              alt={study.heroImage.alt}
              fill
              preload
              sizes="(min-width: 1024px) 421px, (min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </header>

        {/* Project Details (Figma `detail-row`s, lines between rows). */}
        <dl className="flex flex-col [&>*+*]:border-t [&>*+*]:border-text-primary">
          {study.infoBoxes.map((box) => (
            <DetailRow key={box.label} label={box.label} value={box.value} />
          ))}
        </dl>
      </Container>

      {study.sections.map((block, i) => (
        <CaseStudySection key={i} block={block} />
      ))}
    </article>
  );
}
