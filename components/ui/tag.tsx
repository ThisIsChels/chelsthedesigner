import { cn } from "@/lib/utils";

// Small outlined pill (Figma `button`, sm / pill / outlined, used as a tag).
// Inside a `group` (e.g. a project card) it inverts to Charcoal fill with
// Cararra text when the group is hovered.
export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center rounded-full border border-text-primary bg-surface-base px-3 type-label-sm uppercase transition-colors",
        "group-hover:bg-surface-inverse group-hover:text-text-inverse",
        className,
      )}
    >
      {children}
    </span>
  );
}
