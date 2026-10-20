import type { Metadata } from "next";
import { Cta } from "@/components/cta";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { SiteHeader } from "@/components/layout/site-header";
import { ProcessStep } from "@/components/process-step";
import { ServiceCard } from "@/components/service-card";
import { ContactButton } from "@/components/ui/cta-buttons";
import { TextLink } from "@/components/ui/text-link";
import { Typewriter } from "@/components/ui/typewriter";
import type { TypewriterStep } from "@/hooks/use-typewriter";
import { sectionGap, sectionPadBottom, sectionPadY } from "@/lib/layout";

// ---- Heading joke timing (ms). Typing/deleting speeds live in
// hooks/use-typewriter.ts. ----
/** The "wait… that's wrong" beat after typing the typo. */
const TYPO_PAUSE_MS = 750;
/** Short regroup after deleting, before typing the rest. */
const REGROUP_PAUSE_MS = 250;

// Types "sevri" (v and r swapped), notices, deletes back to "se", then
// finishes "services".
const TITLE_SEQUENCE: TypewriterStep[] = [
  { type: "type", text: "sevri" },
  { type: "pause", ms: TYPO_PAUSE_MS },
  { type: "delete", count: 3 },
  { type: "pause", ms: REGROUP_PAUSE_MS },
  { type: "type", text: "rvices" },
];

// All page text lives here so it can change without touching layout.
const CONTENT = {
  intro:
    "I design and build websites, brands, and illustrations for small businesses and creators. From first sketch to a live, working site.",
  offer: {
    heading: "What I offer",
    services: [
      {
        number: "01",
        title: "UI/UX Design",
        outcome: "Clear, usable interfaces for websites and apps.",
        deliverables: ["Research and user flows", "Wireframes and prototypes", "Figma files ready for development"],
      },
      {
        number: "02",
        title: "Design + Build",
        outcome: "Figma designs shipped as a real, working site.",
        deliverables: ["React front-end build", "Responsive layouts", "Handoff and launch support"],
      },
      {
        number: "03",
        title: "Branding",
        outcome: "A look that holds together everywhere.",
        deliverables: ["Logo and brand marks", "Color and type system", "Brand kit and guidelines"],
      },
      {
        number: "04",
        title: "Illustration",
        outcome: "Custom art for your product, brand, or walls.",
        deliverables: [
          "Digital illustration commissions",
          "Stickers, posters, and prints",
          "Personal and commercial licensing",
        ],
      },
    ],
    alsoAvailable:
      "Also available: social media graphics, invitations, apparel, business cards, and marketing materials.",
  },
  work: {
    heading: "See the work first",
    links: [
      { label: "UX case studies", href: "/portfolio?category=ux" },
      { label: "Visual and illustration work", href: "/portfolio?category=visual" },
    ],
  },
  process: {
    heading: "How it works",
    steps: [
      { title: "Say hello", description: "Tell me about your project, timeline, and budget." },
      { title: "Quick call", description: "We talk through goals and scope, then I send a clear proposal." },
      { title: "Design and build", description: "Drafts, feedback rounds, and check-ins along the way." },
      { title: "Deliver", description: "Final files or a live site, handed off cleanly." },
    ],
  },
  goodToKnow: {
    heading: "Good to know",
    columns: [
      { label: "Pricing", body: "Projects are quoted individually. Share your scope and I’ll send a range." },
      { label: "Timeline", body: "Most projects take a few weeks, depending on scope and feedback speed." },
      { label: "Availability", body: "Taking on select freelance projects." },
    ],
  },
  cta: {
    heading: "LET’S MAKE SOMETHING TOGETHER.",
    body: "Have a role or a project in mind? Let’s chat.",
  },
} as const;

export const metadata: Metadata = {
  title: "Services — Chelsey LaPointe",
  description: "UI/UX design, design + build, branding, and illustration for small businesses and creators.",
};

export default function ServicesPage() {
  const { offer, work, process, goodToKnow } = CONTENT;

  return (
    <>
      <SiteHeader />

      <PageTransition>
        <main>
          <Container className={`flex flex-col ${sectionGap} ${sectionPadY}`}>
            <header className="flex flex-col items-start gap-8">
              <h1 className="type-display-xl">
                <Typewriter sequence={TITLE_SEQUENCE} />
              </h1>
              <p className="max-w-[780px] type-body-xl">{CONTENT.intro}</p>
              <ContactButton />
            </header>

            <section className="flex flex-col gap-8">
              <h2 className="type-heading-md-semibold">{offer.heading}</h2>
              <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {offer.services.map((service) => (
                  <li key={service.number}>
                    <ServiceCard {...service} />
                  </li>
                ))}
              </ul>
              <p className="type-body-lg">{offer.alsoAvailable}</p>
            </section>

            <section className="flex flex-col gap-8">
              <h2 className="type-heading-md-semibold">{work.heading}</h2>
              <div className="flex flex-col items-start gap-4 md:flex-row md:gap-12">
                {work.links.map((link) => (
                  <TextLink key={link.href} href={link.href}>
                    {link.label}
                  </TextLink>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-8">
              <h2 className="type-heading-md-semibold">{process.heading}</h2>
              <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {process.steps.map((step, i) => (
                  <ProcessStep key={step.title} number={i + 1} {...step} />
                ))}
              </ol>
            </section>

            <section className="flex flex-col gap-8">
              <h2 className="type-heading-md-semibold">{goodToKnow.heading}</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {goodToKnow.columns.map((column) => (
                  <div key={column.label} className="flex flex-col gap-3">
                    <h3 className="type-heading-sm">{column.label}</h3>
                    <p className="type-body-lg">{column.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <Cta heading={CONTENT.cta.heading} body={CONTENT.cta.body} showResume showViewServices={false} />
          </Container>
        </main>

        <Container className={sectionPadBottom}>
          <Footer />
        </Container>
      </PageTransition>
    </>
  );
}
