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
    "Illustration of Chelsey mid-jump and waving, in a yellow crop top, round green sunglasses, wide light-blue pants and chunky white sneakers",
  marquee: ["Artist", "Designer", "Developer"],
  whatIMake: {
    heading: "What I make",
    button: "PORTFOLIO",
    cards: [
      {
        title: "UI/UX Design",
        description: "Case studies in product and interface design.",
        linkLabel: "View case studies",
        href: "/portfolio?category=ux",
        image: {
          src: "/case-studies/sourceshoot/thumbnail.webp",
          alt: "SourceShoot dashboard on a laptop next to a phone showing a text message",
        },
      },
      {
        title: "Visual & Illustration",
        description: "Brand work, posters, and digital illustration.",
        linkLabel: "View visual work",
        href: "/portfolio?category=visual",
        image: {
          src: "/visual-projects/whod-we-get/thumbnail.webp",
          alt: "Retro “Who’d We Get?” logo with a bowling ball knocking over pins",
        },
      },
      {
        title: "Shop",
        description: "Prints and art for your walls.",
        linkLabel: "Coming soon",
        href: "/shop",
        image: {
          src: "/visual-projects/digital-illustrations/thumbnail.webp",
          alt: "Digital illustration of a cyborg head topped with half a lime",
        },
      },
    ],
  },
  about: {
    heading: "Hey! I’m Chelsey LaPointe,",
    bio: "a designer who can’t stay in one lane. I design all kinds of things: apps, posters, illustrations, whatever the idea needs. I also build my own interfaces, so what I design is what actually ships. I aim to make my work stand out without losing sight of being useful!",
    linkLabel: "More about me",
    photo: {
      src: "/about/graduation.webp",
      alt: "Chelsey in a graduation cap and gown, holding her diploma",
    },
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
