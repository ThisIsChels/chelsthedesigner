import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { DetailRow } from "@/components/case-study/detail-row";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { SiteHeader } from "@/components/layout/site-header";
import { ProjectCard } from "@/components/project-card";
import { Tag } from "@/components/ui/tag";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import { sectionGap, sectionPadBottom, sectionPadY } from "@/lib/layout";
import { getProjects } from "@/lib/projects";

// Figma frame `/portfolio/orbit-caseStudy`. Each case study's text and
// images come from content/case-studies/<slug>.mdx; this file is layout only.
// Server component: everything is read from disk at build time. Blocks bring
// their own Container (see CaseStudySection) so the Final Designs gallery can
// run full width.

const CONTENT = {
  relatedHeading: "You may also like",
} as const;

/** Between the header, Project Details and each block (Figma: 64). */
const articleGap = "gap-12 md:gap-16";

type PageProps = { params: Promise<{ slug: string }> };

// Pre-render every published case study; any other slug hits notFound().
export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  return study ? { title: `${study.title} — Chelsey LaPointe`, description: study.overview } : {};
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const related = getProjects().filter((p) => p.category === "ux" && p.slug !== slug);

  return (
    <>
      <SiteHeader />

      <PageTransition>
        <main className={`flex flex-col ${sectionGap} ${sectionPadY}`}>
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

          {related.length > 0 && (
            <Container>
              <section className="flex flex-col gap-8">
                <h2 className="type-heading-md-semibold">{CONTENT.relatedHeading}</h2>
                <ul className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
                  {related.map((project) => (
                    <li key={project.slug}>
                      <ProjectCard project={project} />
                    </li>
                  ))}
                </ul>
              </section>
            </Container>
          )}
        </main>

        <Container className={sectionPadBottom}>
          <Footer />
        </Container>
      </PageTransition>
    </>
  );
}
