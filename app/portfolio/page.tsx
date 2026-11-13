import type { Metadata } from "next";
import { Suspense } from "react";
import { ComingSoonProjects } from "@/components/coming-soon-projects";
import { Cta } from "@/components/cta";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { SiteHeader } from "@/components/layout/site-header";
import { ProjectBrowser } from "@/components/project-browser";
import { ProjectBrowserFromUrl } from "@/components/project-browser-from-url";
import { Typewriter } from "@/components/ui/typewriter";
import type { TypewriterStep } from "@/hooks/use-typewriter";
import { sectionGap, sectionPadBottom, sectionPadY } from "@/lib/layout";
import { getProjects } from "@/lib/projects";

// ---- Heading joke timing (ms). Typing/deleting speeds live in
// hooks/use-typewriter.ts. ----
/** The "wait… that's wrong" beat after typing the typo. */
const TYPO_PAUSE_MS = 750;
/** Short regroup after deleting, before typing the rest. */
const REGROUP_PAUSE_MS = 250;

// Types "porfo", notices, deletes back to "por", then finishes "portfolio".
const TITLE_SEQUENCE: TypewriterStep[] = [
  { type: "type", text: "porfo" },
  { type: "pause", ms: TYPO_PAUSE_MS },
  { type: "delete", count: 2 },
  { type: "pause", ms: REGROUP_PAUSE_MS },
  { type: "type", text: "tfolio" },
];

// All page text lives here so it can change without touching layout.
const CONTENT = {
  intro:
    "Apps, posters, illustrations, and everything in between. Different kinds of work, one designer behind all of it.",
  emptyMessage: "No projects match these filters yet.",
  // Projects without a published page; not affected by the filters.
  comingSoon: { heading: "Coming soon", tag: "Coming soon" },
  cta: {
    heading: "LET’S MAKE SOMETHING TOGETHER.",
    body: "Have a role or a project in mind? Let’s chat.",
  },
} as const;

export const metadata: Metadata = {
  title: "Portfolio — Chelsey LaPointe",
  description: "UI/UX case studies and visual design work by Chelsey LaPointe.",
};

// Server component: reads the project list from disk at build time, then
// hands it to the interactive filter + grid.
export default function PortfolioPage() {
  const all = getProjects();
  const projects = all.filter((p) => p.published);
  const upcoming = all.filter((p) => !p.published);

  return (
    <>
      <SiteHeader />

      <PageTransition>
        <main>
          <Container className={`flex flex-col ${sectionGap} ${sectionPadY}`}>
            <header className="flex flex-col gap-8">
              <h1 className="type-display-xl">
                <Typewriter sequence={TITLE_SEQUENCE} />
              </h1>
              <p className="type-body-xl">{CONTENT.intro}</p>
            </header>

            <Suspense fallback={<ProjectBrowser projects={projects} emptyMessage={CONTENT.emptyMessage} />}>
              <ProjectBrowserFromUrl projects={projects} emptyMessage={CONTENT.emptyMessage} />
            </Suspense>

            <ComingSoonProjects
              heading={CONTENT.comingSoon.heading}
              tagLabel={CONTENT.comingSoon.tag}
              projects={upcoming}
            />

            <Cta heading={CONTENT.cta.heading} body={CONTENT.cta.body} />
          </Container>
        </main>

        <Container className={sectionPadBottom}>
          <Footer />
        </Container>
      </PageTransition>
    </>
  );
}
