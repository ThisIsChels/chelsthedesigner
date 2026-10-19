import type { Metadata } from "next";
import Image from "next/image";
import { Cta } from "@/components/cta";
import { DividerItem } from "@/components/divider-item";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactButton, ResumeButton } from "@/components/ui/cta-buttons";
import { Typewriter } from "@/components/ui/typewriter";
import type { TypewriterStep } from "@/hooks/use-typewriter";
import { sectionGap, sectionPadBottom, sectionPadY } from "@/lib/layout";

// ---- Heading joke timing (ms). Typing/deleting speeds live in
// hooks/use-typewriter.ts. ----
/** The "wait… that's wrong" beat after typing the typo. */
const TYPO_PAUSE_MS = 750;
/** Short regroup after deleting, before typing the rest. */
const REGROUP_PAUSE_MS = 250;

// Types "abotu" (swapped last letters), notices, deletes back to "abo",
// then finishes "about".
const TITLE_SEQUENCE: TypewriterStep[] = [
  { type: "type", text: "abotu" },
  { type: "pause", ms: TYPO_PAUSE_MS },
  { type: "delete", count: 2 },
  { type: "pause", ms: REGROUP_PAUSE_MS },
  { type: "type", text: "ut" },
];

// All page text and photos live here so they can change without touching layout.
const CONTENT = {
  greeting: "Hey! I’m Chelsey LaPointe",
  bio: "I’m a UI/UX Designer & Developer from Saint Paul, Minnesota with a love for creativity and problem-solving. Whether I’m troubleshooting a stubborn computer, sketching out design ideas, chasing the top of a climbing wall, or starting my morning with Wordle, I’m always drawn to challenges that keep me thinking.",
  heroPhoto: {
    src: "/about/graduation.webp",
    // [PLACEHOLDER: check alt text]
    alt: "Chelsey in a graduation cap and gown, holding her diploma in front of a stone wall",
  },
  beyond: {
    heading: "Beyond the work",
    // [PLACEHOLDER: beyond the work paragraph]
    body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.",
    // [PLACEHOLDER: check alt text]
    photos: [
      { src: "/about/mexico.webp", alt: "Chelsey standing on a beach at sunset", position: "object-center" },
      { src: "/about/climbing-top.webp", alt: "Chelsey bouldering on an indoor climbing wall", position: "object-center" },
      { src: "/about/joshuatree.webp", alt: "Chelsey and a friend standing among desert boulders", position: "object-center" },
    ],
  },
  skills: {
    heading: "What I bring",
    note: "A few skills I bring to my work.",
    items: [
      {
        title: "Technical Literacy",
        description: "Comfortable bridging design and development and understanding how systems work under the hood.",
        link: { label: "See Orbit", href: "/portfolio/orbit" },
      },
      {
        title: "UI & Interaction Design",
        description: "Designing clear, intuitive interfaces with thoughtful user flows and interactions.",
        link: { label: "See SourceShoot", href: "/portfolio/sourceshoot" },
      },
      {
        title: "Prototyping & Iteration",
        description: "Exploring ideas through wireframes, mockups, and interactive prototypes to learn quickly.",
        link: { label: "See Digital Closet", href: "/portfolio/digital-closet" },
      },
      {
        title: "Digital Illustration",
        description: "Creating custom visuals and illustrations that support storytelling, branding, and interface design.",
        link: { label: "See Digital Illustrations", href: "/portfolio/digital-illustrations" },
      },
    ],
  },
  highlights: {
    heading: "Academic & Professional Highlights",
    columns: [
      { label: "Education", lines: ["Bachelor of Arts in Applied Computer Science", "Minor in Graphic Design"] },
      {
        label: "Honors",
        lines: ["Cum Laude", "Dean’s List (multiple semesters)", "Women in Technical Careers Scholarship Recipient"],
      },
      {
        label: "Experience",
        lines: ["Design Lead on startup project team, SourceShoot, LLC", "4+ years in Information Technology"],
      },
    ],
  },
  cta: {
    heading: "LET’S MAKE SOMETHING TOGETHER.",
    body: "Have a role or a project in mind? Let’s chat.",
  },
} as const;

export const metadata: Metadata = {
  title: "About — Chelsey LaPointe",
  description: "Chelsey LaPointe is a UI/UX designer and developer from Saint Paul, Minnesota.",
};

const photoFrame = "relative overflow-hidden rounded-lg border border-text-primary";

export default function AboutPage() {
  const { beyond, skills, highlights } = CONTENT;

  return (
    <>
      <SiteHeader />

      <PageTransition>
        <main>
          <Container className={`flex flex-col ${sectionGap} ${sectionPadY}`}>
            {/* Hero: stacks below md (photo under the text). */}
            <section className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-24">
              <div className="flex flex-1 flex-col items-start gap-8">
                <h1 className="type-display-xl">
                  <Typewriter sequence={TITLE_SEQUENCE} />
                </h1>
                <p className="type-heading-md-medium">{CONTENT.greeting}</p>
                <p className="type-body-xl">{CONTENT.bio}</p>
                <div className="flex flex-wrap gap-3">
                  <ContactButton />
                  <ResumeButton />
                </div>
              </div>
              {/* Square on phones; on md+ it stretches to the text's height. */}
              <div className={`${photoFrame} aspect-square md:aspect-auto md:w-[30%] md:shrink-0 md:self-stretch`}>
                <Image
                  src={CONTENT.heroPhoto.src}
                  alt={CONTENT.heroPhoto.alt}
                  fill
                  preload
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover object-[50%_23%]"
                />
              </div>
            </section>

            <section className="flex flex-col gap-8">
              <h2 className="type-heading-md-semibold">{beyond.heading}</h2>
              <p className="type-body-xl">{beyond.body}</p>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {beyond.photos.map((photo) => (
                  <div key={photo.src} className={`${photoFrame} aspect-[403/420]`}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className={`object-cover ${photo.position}`}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="type-heading-md-semibold">{skills.heading}</h2>
                <p className="type-body-lg">{skills.note}</p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {skills.items.map((item) => (
                  <DividerItem key={item.title} {...item} />
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-8">
              <h2 className="type-heading-md-semibold">{highlights.heading}</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {highlights.columns.map((column) => (
                  <div key={column.label} className="flex flex-col gap-3">
                    <h3 className="type-heading-sm text-accent-primary">{column.label}</h3>
                    <ul className="list-disc pl-6 type-body-xl">
                      {column.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

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
