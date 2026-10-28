import { ContactModal } from "@/components/contact/contact-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { EXTERNAL } from "@/lib/links";
import { cn } from "@/lib/utils";

// Color-coded by destination (CLAUDE.md → CTA buttons). Use these instead of
// picking a tone by hand.

type PresetProps = {
  size?: "sm" | "md" | "lg" | "xlg";
  className?: string;
  children?: React.ReactNode;
};

export function UpworkButton({ size = "lg", className, children = "UPWORK" }: PresetProps) {
  return (
    <Button tone="pear" size={size} href={EXTERNAL.upwork} className={className}>
      {children}
    </Button>
  );
}

/** Opens the contact modal. */
export function ContactButton({ size = "lg", className, children = "CONTACT ME" }: PresetProps) {
  return (
    <ContactModal triggerClassName={cn(buttonVariants({ tone: "tranquility", size }), className)}>
      {children}
    </ContactModal>
  );
}

/** The one exception: the small outlined "contact me" in the footer. Also opens the modal. */
export function FooterContactButton() {
  return <ContactModal triggerClassName={buttonVariants({ tone: "outlined", size: "sm" })}>contact me</ContactModal>;
}

export function ResumeButton({ size = "lg", className, children = "RESUME" }: PresetProps) {
  return (
    <Button tone="watercourse" size={size} href={EXTERNAL.resume} className={className}>
      {children}
    </Button>
  );
}
