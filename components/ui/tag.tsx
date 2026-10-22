import { cn } from "@/lib/utils";

// Outlined pill (Figma `button`, pill / outlined, used as a tag).
// sm: project cards (uppercase label-sm). lg: case study header (Figma
// `tag / type`, body-lg). Inside a `group` (e.g. a project card) it inverts
// to Charcoal fill with Cararra text when the group is hovered.
const sizes = {
  sm: "h-8 px-3 type-label-sm uppercase",
  lg: "h-12 px-4 type-body-lg",
};

type TagProps = { children: React.ReactNode; size?: keyof typeof sizes; className?: string };

export function Tag({ children, size = "sm", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-text-primary bg-surface-base transition-colors",
        "group-hover:bg-surface-inverse group-hover:text-text-inverse",
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
