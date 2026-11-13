import Link from "next/link";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

// Standalone text link ("More about me", "View services"). Underlines on
// hover. Watercourse on Cararra, Pear on charcoal (CLAUDE.md → Accent text).
// size "md" = heading-sm (default); "sm" = body-lg (e.g. "See Orbit" in a
// divider item). `external` opens in a new tab (e.g. a static .html doc).

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  /** "inverse" = on a charcoal surface. */
  tone?: "default" | "inverse";
  size?: "md" | "sm";
  withArrow?: boolean;
  /** A plain file or another site: opens in a new tab with a normal <a>. */
  external?: boolean;
  className?: string;
};

export function TextLink({ href, children, tone = "default", size = "md", withArrow, external, className }: TextLinkProps) {
  const Anchor = external ? "a" : Link;
  return (
    <Anchor
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={cn(
        "group inline-flex items-center gap-3",
        size === "md" ? "type-heading-sm" : "type-body-lg",
        tone === "default" ? "text-accent-primary" : "text-accent-secondary",
        className,
      )}
    >
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      {withArrow && <IconButton tone={tone === "default" ? "accent" : "pear"} />}
    </Anchor>
  );
}
