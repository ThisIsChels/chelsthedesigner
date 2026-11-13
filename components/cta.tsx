import { ContactButton, ResumeButton, UpworkButton } from "@/components/ui/cta-buttons";
import { TextLink } from "@/components/ui/text-link";

// Figma component `cta`. Always shows Contact me + Upwork.
// Figma note: turn off showViewServices on /services; showResume on home/about.

type CtaProps = {
  heading?: string;
  body?: string;
  showResume?: boolean;
  showViewServices?: boolean;
};

export function Cta({
  heading = "WANT TO START A NEW PROJECT?",
  body = "Tell me what you’re making and I’ll get back to you.",
  showResume = false,
  showViewServices = true,
}: CtaProps) {
  return (
    <section className="surface-inverse flex flex-col gap-6 rounded-lg p-8 md:p-16">
      <h2 className="type-heading-lg">{heading}</h2>
      <p className="type-body-xl">{body}</p>

      <div className="flex flex-col items-center gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap justify-center gap-3">
          <ContactButton />
          <UpworkButton />
          {showResume && <ResumeButton />}
        </div>
        {showViewServices && (
          <TextLink href="/services" tone="inverse" withArrow>
            View services
          </TextLink>
        )}
      </div>
    </section>
  );
}
