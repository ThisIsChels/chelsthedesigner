import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { SiteHeader } from "@/components/layout/site-header";
import { sectionPadBottom } from "@/lib/layout";

// Layout for single-message pages (coming soon, 404): pinned nav, one message
// centered in the screen space below the nav, footer just below the fold.
//
// The min-height is the viewport minus the resting nav bar
// (barHeight in components/layout/nav-sizes.ts: 7rem phones, 9rem md+).
export function MessagePage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />

      <PageTransition>
        <main>
          <Container className="flex min-h-[calc(100svh-7rem)] flex-col items-center justify-center py-12 text-center md:min-h-[calc(100svh-9rem)] md:py-16 lg:py-24">
            {children}
          </Container>
        </main>

        <Container className={sectionPadBottom}>
          <Footer />
        </Container>
      </PageTransition>
    </>
  );
}
