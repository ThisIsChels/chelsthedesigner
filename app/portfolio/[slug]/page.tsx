import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case-study/case-study-view";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { SiteHeader } from "@/components/layout/site-header";
import { RelatedProjects } from "@/components/related-projects";
import { ShowcaseView } from "@/components/showcase/showcase-view";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import { sectionGap, sectionPadBottom, sectionPadY } from "@/lib/layout";
import { getRelatedProjects } from "@/lib/projects";
import { getShowcase, getShowcaseSlugs } from "@/lib/showcases";

// One route for every project page. A slug with a published .mdx in
// content/case-studies renders a case study; one in content/visual-projects
// renders a showcase. Text and images live in the .mdx; this file is the
// shared page shell. Server component: everything is read at build time.

type PageProps = { params: Promise<{ slug: string }> };

// Pre-render every published project; any other slug hits notFound().
export function generateStaticParams() {
  return [...getCaseStudySlugs(), ...getShowcaseSlugs()].map((slug) => ({ slug }));
}

function getPage(slug: string) {
  const study = getCaseStudy(slug);
  if (study) return { study, showcase: null, title: study.title, description: study.overview, related: study.related };
  const showcase = getShowcase(slug);
  if (showcase)
    return { study: null, showcase, title: showcase.title, description: showcase.description, related: showcase.related };
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = getPage((await params).slug);
  return page ? { title: `${page.title} — Chelsey LaPointe`, description: page.description } : {};
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  return (
    <>
      <SiteHeader />

      <PageTransition>
        <main className={`flex flex-col ${sectionGap} ${sectionPadY}`}>
          {page.study && <CaseStudyView study={page.study} />}
          {page.showcase && <ShowcaseView showcase={page.showcase} />}

          <Container>
            <RelatedProjects projects={getRelatedProjects(slug, page.related)} />
          </Container>
        </main>

        <Container className={sectionPadBottom}>
          <Footer />
        </Container>
      </PageTransition>
    </>
  );
}
