import { cn } from "@/lib/utils";

// Portfolio filter button (CLAUDE.md → Filters). "primary" = category row
// (rect, Pear when selected); "secondary" = tag row (pill, Tranquility when
// selected). Unselected chips are outlined. All get the 4px lift.

type FilterChipProps = {
  kind: "primary" | "secondary";
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export function FilterChip({ kind, selected, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "lift inline-flex h-12 items-center border px-4 type-body-lg whitespace-nowrap text-text-primary",
        kind === "primary" ? "rounded-[7px]" : "rounded-full",
        !selected && "border-text-primary bg-surface-base",
        selected && "border-transparent",
        selected && (kind === "primary" ? "bg-accent-secondary" : "bg-accent-tertiary"),
      )}
    >
      {children}
    </button>
  );
}
