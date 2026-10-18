import { Button } from "@/components/ui/button";
import { EXTERNAL } from "@/lib/links";

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

// TODO: open the contact modal once it's built. Unlinked for now.
export function ContactButton({ size = "lg", className, children = "CONTACT ME" }: PresetProps) {
  return (
    <Button tone="tranquility" size={size} className={className}>
      {children}
    </Button>
  );
}

/** The one exception: the small outlined "contact me" in the footer. */
export function FooterContactButton() {
  return (
    <Button tone="outlined" size="sm">
      contact me
    </Button>
  );
}

export function ResumeButton({ size = "lg", className, children = "RESUME" }: PresetProps) {
  return (
    <Button tone="watercourse" size={size} href={EXTERNAL.resume} className={className}>
      {children}
    </Button>
  );
}
