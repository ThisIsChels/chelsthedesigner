import Link from "next/link";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

// Standalone text link ("More about me", "View services"). Underlines on
// hover. Watercourse on cream, Pear on charcoal (CLAUDE.md → Accent text).

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  /** "inverse" = on a charcoal surface. */
  tone?: "default" | "inverse";
  withArrow?: boolean;
  className?: string;
};

export function TextLink({ href, children, tone = "default", withArrow, className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 type-heading-sm",
        tone === "default" ? "text-accent-primary" : "text-accent-secondary",
        className,
      )}
    >
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      {withArrow && <IconButton tone={tone === "default" ? "default" : "pear"} />}
    </Link>
  );
}
