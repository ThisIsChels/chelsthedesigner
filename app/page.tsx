import { CategoryCard } from "@/components/category-card";
import { Cta } from "@/components/cta";
import { AboutStrip } from "@/components/home/about-strip";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { sectionGap, sectionPadBottom, sectionPadY } from "@/lib/layout";

// All homepage text lives here so it can change without touching layout.
const CONTENT = {
  avatarAlt:
    "Illustration of Chelsey in a yellow crop top, round green sunglasses, and wide light-blue pants",
  marquee: ["Artist", "Designer", "Developer"],
  whatIMake: {
    heading: "What I make",
    button: "PORTFOLIO",
    cards: [
      {
        title: "UI/UX Design",
        description: "Case studies in product and interface design.",
        linkLabel: "View case studies",
        href: "/portfolio",
      },
      {
        title: "Visual & Illustration",
        description: "Brand work, posters, and digital illustration.",
        linkLabel: "View visual work",
        href: "/portfolio",
      },
      {
        title: "Shop",
        description: "Prints and art for your walls.",
        linkLabel: "Coming soon",
        href: "/shop",
      },
    ],
  },
  about: {
    heading: "Hi, I’m Chelsey",
    // [PLACEHOLDER: homepage bio]
    bio: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.",
    linkLabel: "More about me",
  },
} as const;

export default function Home() {
  const { whatIMake, about } = CONTENT;

  return (
    <>
      {/* Its resting height feeds --name-top in components/home/hero.tsx. */}
      <SiteHeader tone="inverse" />

      <PageTransition>
        <main>
          <Hero avatarAlt={CONTENT.avatarAlt}>
            <div className={`flex flex-col ${sectionGap} ${sectionPadY}`}>
              <Marquee words={CONTENT.marquee} />

              <Container className={`flex flex-col ${sectionGap}`}>
                <section className="flex flex-col gap-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="type-display-sm">{whatIMake.heading}</h2>
                    <Button href="/portfolio">{whatIMake.button}</Button>
                  </div>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {whatIMake.cards.map((card) => (
                      <CategoryCard key={card.title} {...card} />
                    ))}
                  </div>
                </section>

                <AboutStrip {...about} />
                <Cta showResume />
              </Container>
            </div>
          </Hero>
        </main>

        <Container className={sectionPadBottom}>
          <Footer />
        </Container>
      </PageTransition>
    </>
  );
}
