import type { Metadata } from "next";
import { CategoryCard } from "@/components/category-card";
import { Cta } from "@/components/cta";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/nav-bar";
import { Button } from "@/components/ui/button";
import { ContactButton, ResumeButton, UpworkButton } from "@/components/ui/cta-buttons";
import { IconButton } from "@/components/ui/icon-button";
import { TextLink } from "@/components/ui/text-link";

// TEMPORARY component preview for review. Delete before launch.

export const metadata: Metadata = { title: "Component preview", robots: { index: false } };

const sizes = ["sm", "md", "lg", "xlg"] as const;
const tones = ["outlined", "pear", "tranquility", "watercourse", "charcoal"] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="type-heading-md-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function ComponentPreview() {
  return (
    <>
      <div className="surface-inverse pt-8 pb-12 md:pt-16">
        <Container>
          <NavBar tone="inverse" />
        </Container>
      </div>

      <Container className="flex flex-col gap-12 py-12 md:gap-16 lg:gap-24 lg:py-24">
        <NavBar />

        <Section title="Buttons">
          {tones.map((tone) => (
            <div key={tone} className="flex flex-wrap items-center gap-3">
              {sizes.map((size) => (
                <Button key={size} tone={tone} size={size}>BUTTON</Button>
              ))}
              {sizes.map((size) => (
                <Button key={size} tone={tone} size={size} shape="pill">Button</Button>
              ))}
            </div>
          ))}
          <div className="flex flex-wrap gap-3">
            <ContactButton />
            <UpworkButton />
            <ResumeButton />
          </div>
        </Section>

        <Section title="Icon button + text links">
          <div className="flex flex-wrap items-center gap-8">
            <IconButton />
            <TextLink href="/about">More about me</TextLink>
            <TextLink href="/services" withArrow>View services</TextLink>
          </div>
        </Section>

        <Section title="Category cards">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <CategoryCard
              title="UI/UX Design"
              description="Case studies in product and interface design."
              linkLabel="View case studies"
              href="/portfolio"
            />
            <CategoryCard
              title="Visual & Illustration"
              description="Brand work, posters, and digital illustration."
              linkLabel="View visual work"
              href="/portfolio"
            />
            <CategoryCard title="Shop" description="Prints and art for your walls." linkLabel="Coming soon" href="/shop" />
          </div>
        </Section>

        <Cta showResume />
        <Footer />
      </Container>
    </>
  );
}
