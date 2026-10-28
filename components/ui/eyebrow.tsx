import { cn } from "@/lib/utils";

// Figma component `eyebrow`: small Pear pill above a section title
// (e.g. CONTEXT, PROCESS). Caption style, uppercase via CSS.
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full bg-accent-secondary px-3 py-2 type-caption text-text-primary uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
