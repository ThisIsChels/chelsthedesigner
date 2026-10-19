import Link from "next/link";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

// Standalone text link ("More about me", "View services"). Underlines on
// hover. Watercourse on Cararra, Pear on charcoal (CLAUDE.md → Accent text).
// size "md" = heading-sm (default); "sm" = body-lg (e.g. "See Orbit" in a
// divider item).

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  /** "inverse" = on a charcoal surface. */
  tone?: "default" | "inverse";
  size?: "md" | "sm";
  withArrow?: boolean;
  className?: string;
};

export function TextLink({ href, children, tone = "default", size = "md", withArrow, className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3",
        size === "md" ? "type-heading-sm" : "type-body-lg",
        tone === "default" ? "text-accent-primary" : "text-accent-secondary",
        className,
      )}
    >
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      {withArrow && <IconButton tone={tone === "default" ? "default" : "pear"} />}
    </Link>
  );
}
