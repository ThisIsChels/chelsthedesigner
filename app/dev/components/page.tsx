import type { Metadata } from "next";
import { CategoryCard } from "@/components/category-card";
import { Cta } from "@/components/cta";
import { DividerItem } from "@/components/divider-item";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/nav-bar";
import { ProcessStep } from "@/components/process-step";
import { ProjectBrowser } from "@/components/project-browser";
import { ProjectCard } from "@/components/project-card";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { ContactButton, ResumeButton, UpworkButton } from "@/components/ui/cta-buttons";
import { IconButton } from "@/components/ui/icon-button";
import { Tag } from "@/components/ui/tag";
import { TextLink } from "@/components/ui/text-link";
import { Typewriter } from "@/components/ui/typewriter";
import { getProjects } from "@/lib/projects";

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
  const projects = getProjects();

  return (
    <>
      <div className="surface-inverse pt-8 pb-12 md:pt-16">
        <Container>
          <NavBar tone="inverse" />
        </Container>
      </div>

      <Container className="flex flex-col gap-12 py-12 md:gap-16 lg:gap-24 lg:py-24">
        <NavBar />

        <Section title="Typewriter (plays on every load)">
          <h2 className="type-display-sm">
            <Typewriter
              sequence={[
                { type: "type", text: "porfo" },
                { type: "pause", ms: 750 },
                { type: "delete", count: 2 },
                { type: "pause", ms: 250 },
                { type: "type", text: "tfolio" },
              ]}
            />
          </h2>
        </Section>

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

        <Section title="Service card">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ServiceCard
              number="01"
              title="UI/UX Design"
              outcome="Clear, usable interfaces for websites and apps."
              deliverables={["Research and user flows", "Wireframes and prototypes", "Figma files ready for development"]}
            />
          </div>
        </Section>

        <Section title="Process steps">
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <ProcessStep number={1} title="Say hello" description="Tell me about your project, timeline, and budget." />
            <ProcessStep number={2} title="Quick call" description="We talk through goals and scope." />
          </ol>
        </Section>

        <Section title="Divider items">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <DividerItem
              title="Technical Literacy"
              description="Comfortable bridging design and development."
              link={{ label: "See Orbit", href: "/portfolio/orbit" }}
            />
            <DividerItem title="Without a link" description="The link is optional." />
          </div>
        </Section>

        <Section title="Tags">
          <div className="flex flex-wrap gap-2">
            <Tag>Mobile</Tag>
            <Tag>Development</Tag>
            <Tag>Website</Tag>
          </div>
        </Section>

        <Section title="Project card (hover for lift, inverted tags + arrow, color)">
          <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {projects.slice(0, 2).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>

        <Section title="Project filter + grid (click filters to see the animation)">
          <ProjectBrowser projects={projects} emptyMessage="No projects match these filters yet." />
        </Section>

        {/* The Contact Me buttons here (and in the footer) open the contact modal. */}
        <Cta showResume />
        <Footer />
      </Container>
    </>
  );
}
